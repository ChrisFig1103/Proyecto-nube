const AWS = require('aws-sdk');
exports.handler = async (event) => {
    
   let response = {};
        let body = event;
        console.log(body)
        const bufferValidacion = await Buffer.from(body.imgvalidacion.replace(/^data:image\/\w+;base64,/, ""), "base64");
        console.log("FOTO 2");
        var params_ = {
          CollectionId: "tucoleccion", 
          FaceMatchThreshold: 95, 
          Image:  { Bytes: bufferValidacion }, 
          MaxFaces: 5
         };
        var rekognition = new AWS.Rekognition();
       let similutud = -1;;
        let compareFacesResponse = {};
        try {
          compareFacesResponse = await rekognition.searchFacesByImage(params_, async function (errarchivo, dataarchivo) {
            if (!errarchivo) {
              console.log("se valido BIOMETRIA!\n", { dataarchivo });
              similutud = 0;
            } else {
              console.log("Error en validacion Biometria!\n", errarchivo);
              similutud =  -1;
            }
          }).promise();
        } catch (error) {
        return      response = {
        statusCode: 200,
        body: error,
       };
          
        }
    var resultado ={};
    if (similutud === 0 && compareFacesResponse !== null && compareFacesResponse.FaceMatches !== null && compareFacesResponse.FaceMatches[0] != null && compareFacesResponse.FaceMatches[0].Face.ExternalImageId !== null) {
      resultado={"codigo":0,"descripcion":"Validacion Biometrica Exitosa ", "similutud": compareFacesResponse.FaceMatches[0].Face.ExternalImageId };
    } else {
      resultado={"codigo":1,"descripcion":"Validacion Biometrica Erronea ", "similutud": similutud};
    }

     response = {
        statusCode: 200,
        body: resultado,
    };

    return response;
};
