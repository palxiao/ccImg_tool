require.config({
  baseUrl: "js",

  paths: {
    "cropper": "plugins/cropper"
  },

  shim: {
    // 'cropper': {
    //   // deps: [''],
    //   exports: 'cropper'
    // }
  }
});

var c

require(['cropper'], function (Cropper) {
    var image = document.querySelector('#image');
    var minAspectRatio = 0.5;
    var maxAspectRatio = 1.5;
    var cropper = new Cropper(image, {
      ready: function () {
        c = this.cropper
        var cropper = this.cropper;
        var containerData = cropper.getContainerData();
        var cropBoxData = cropper.getCropBoxData();
        var aspectRatio = cropBoxData.width / cropBoxData.height;
        var newCropBoxWidth;

        if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
          newCropBoxWidth = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);

          cropper.setCropBoxData({
            left: (containerData.width - newCropBoxWidth) / 2,
            width: newCropBoxWidth
          });
        }
        cropper.setAspectRatio(1/1)
        cropper.setDragMode('move')
      },
      cropmove: function () {
        var cropper = this.cropper;
        var cropBoxData = cropper.getCropBoxData();
        var aspectRatio = cropBoxData.width / cropBoxData.height;

        if (aspectRatio < minAspectRatio) {
          cropper.setCropBoxData({
            width: cropBoxData.height * minAspectRatio
          });
        } else if (aspectRatio > maxAspectRatio) {
          cropper.setCropBoxData({
            width: cropBoxData.height * maxAspectRatio
          });
        }
      },
      crop: function (e) {
        
      }
    });
})
var result = document.querySelector('#result');
var download = document.getElementById('download');
function crop() {
  var image = new Image();
  // image.setAttribute("crossOrigin", 'Anonymous')
  image.crossOrigin = 'Anonymous';
  var can = c.getCroppedCanvas();
  image.src = can.toDataURL('image/jpeg')
  // c.getCroppedCanvas().toBlob(function (blob) {
  //   var formData = new FormData();
  //   formData.append('croppedImage', blob);
  //   console.log(formData.get('croppedImage'));
  // })
  result.innerHTML=''
  result.appendChild(image);
  download.href = c.getCroppedCanvas().toDataURL('image/jpeg')
}

function selectImg(file) {
  if (!file.files || !file.files[0]) {
    return;
  }
  
  var reader = new FileReader();
  reader.onload = function (evt) {
    var replaceSrc = evt.target.result;
    c.replace(replaceSrc);
  }
  reader.readAsDataURL(file.files[0]);
}