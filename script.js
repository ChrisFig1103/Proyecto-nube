const $video = document.querySelector('#video');
const $canvas = document.querySelector('#canvas');
const $boton = document.querySelector('#boton');
const $estado = document.querySelector('#estado');
let stream;

const tieneSoporteUserMedia = () =>
  !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia);
const _getUserMedia = (...arguments) =>
  (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);

const mostrarStream = () => {
  _getUserMedia({
      video: true
    },
    (streamObtenido) => {
      stream = streamObtenido;
      $video.srcObject = stream;
      $video.play();
    }, (error) => {
      console.log("Permiso denegado o error: ", error);
      $estado.innerHTML = "No se puede acceder a la cámara, o no diste permiso.";
    });
};

$boton.addEventListener("click", function() {
  $video.pause();
  let contexto = $canvas.getContext("2d");
  $canvas.width = $video.videoWidth;
  $canvas.height = $video.videoHeight;
  contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);

  let foto = $canvas.toDataURL();
  let enlace = document.createElement('a');
  enlace.download = "foto_parzibyte.me.png";
  enlace.href = foto;
  enlace.click();
  $video.play();
});

if (tieneSoporteUserMedia()) {
  mostrarStream();
} else {
  alert("Lo siento. Tu dispositivo no soporta esta característica");
  $estado.innerHTML = "Parece que tu dispositivo no soporta la característica de getUserMedia";
}
