define([
  'lib/cropper'
], function (Cropper) {
  'use strict';
  var myCropper = function (obj) {
    return new myCropper.prototype.init(obj)
  }
  myCropper.prototype.init = function (obj) {
    var image = document.querySelector('#outImg');
    console.log(obj);
    
    
    var cropper = new Cropper(image, {
      aspectRatio: obj.aspectRatio || '',
      ready: function () {
        // c.setAspectRatio('') // 16/9 4/3 2/3 1/1
        this.cropper.setDragMode('move')
        obj.ok('done')
      }
    });
  }
  
  myCropper.prototype.init.prototype = myCropper.prototype
  return myCropper
});