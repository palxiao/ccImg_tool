require.config({
  baseUrl: "js",

  paths: {
    "cropper": "plugins/cropper",
    "toBlob": "plugins/canvas-to-blob.min"
  },

  shim: {
    // 'cropper': {
    //   // deps: [''],
    //   exports: 'cropper'
    // }
  }
});

var c
var image = document.querySelector('#image');
var Cropper

require(['cropper', 'toBlob'], function (myCropper) {
  var minAspectRatio = 0.5;
  var maxAspectRatio = 1.5;
  Cropper = myCropper
})
var result = document.querySelector('#result');
var download = document.getElementById('download');
var outImg = document.getElementById('outImg')
var input = document.getElementById('chooseImg');
function crop() {
  var image = new Image();
  // image.setAttribute("crossOrigin", 'Anonymous')
  image.crossOrigin = 'Anonymous';
  var can = c.getCroppedCanvas();
  image.src = can.toDataURL('image/jpeg')
  c.getCroppedCanvas().toBlob(function (blob) {
    var formData = new FormData();
    formData.append('croppedImage', blob);
  })
  // result.innerHTML=''
  // result.appendChild(image);
  outImg.src = can.toDataURL('image/jpeg');
  download.href = c.getCroppedCanvas().toDataURL('image/jpeg')
  model('hide')
}

function selectImg(file) {
  if (!file.files || !file.files[0]) {
    return;
  }
  
  var reader = new FileReader();
  reader.onload = function (evt) {
    var replaceSrc = evt.target.result;
    // c.replace(replaceSrc);
    input.value = '';
    image.src = replaceSrc
    c = new Cropper(image, {
      aspectRatio: '',
      ready: function () {
        // c.setAspectRatio('') // 16/9 4/3 2/3 1/1
        this.cropper.setDragMode('move')
      }
    });
  }
  reader.readAsDataURL(file.files[0]);

  model('show')
}

function model(type) {
  if (type === 'show') {
    // document.getElementById('main').style.display = 'none'
    document.getElementById('out').style.display = 'table'
  } else if ('hide') {
    document.getElementById('main').style.display = ''
    document.getElementById('out').style.display = 'none'
    c.destroy();
    c = null;
  }
}
