require.config({
  baseUrl: "js",

  paths: {
    '$cropper': 'cropper',
    'cropper': 'lib/cropper',
    'toBlob': 'lib/canvas-to-blob.min'
  },

  shim: {
    'cropper': {
      deps: ['toBlob'],
      exports: 'cropper'
    }
  }
});

var c
var Cropper

require(['$cropper'], function () {
  
  // $cropper.init({
  //   aspectRatio: 1,
  //   ok: function (res) {
      
  //   }
  // })
})



// function crop() {
//   var image = new Image();
//   // image.setAttribute("crossOrigin", 'Anonymous')
//   image.crossOrigin = 'Anonymous';
//   var can = c.getCroppedCanvas();
//   image.src = can.toDataURL('image/jpeg')
//   c.getCroppedCanvas().toBlob(function (blob) {
//     var formData = new FormData();
//     formData.append('croppedImage', blob);
//   })
//   outImg.src = can.toDataURL('image/jpeg');
//   download.href = c.getCroppedCanvas().toDataURL('image/jpeg')
//   model('hide')
// }



function model(type) {
  // if (type === 'show') {
  //   document.getElementById('out').style.display = 'table'
  // } else if ('hide') {
  //   document.getElementById('out').style.display = 'none'
  //   if (c) c.destroy();
  //   c = null;
  // }
}


