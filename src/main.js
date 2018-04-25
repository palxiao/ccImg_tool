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

require(['cropper'], function (Cropper) {
  window.addEventListener('DOMContentLoaded', function () {
    var image = document.querySelector('#image');
    var minAspectRatio = 0.5;
    var maxAspectRatio = 1.5;
    var cropper = new Cropper(image, {
      ready: function () {
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
      }
    });
  })
  
})