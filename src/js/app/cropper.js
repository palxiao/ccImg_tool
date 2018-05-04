define([
  'lib/cropper'
], function (Cropper) {
  'use strict';
  var cropper, result, blobResult;
  var myCropper = function (src) {
    return new myCropper.prototype.init(src)
  }
  myCropper.prototype = {
    init: function (src) {
      if (!src) return
      this.creat()
      this.image = document.querySelector('#ccw_cropper_image');
      this.image.src = src
    },
    open: function (obj) {
      cropper = new Cropper(this.image, {
        aspectRatio: obj.aspectRatio || '', // 16/9 4/3 2/3 1/1
        ready: function () {
          this.cropper.setDragMode('move')
          if (obj.ok) result = obj.ok
          if (obj.toBlob) blobResult = obj.toBlob
        }
      });
      this.model('show')
    },
    crop: function () {
      var base64 = cropper.getCroppedCanvas().toDataURL('image/jpeg');
      result(base64);
      try {
        cropper.getCroppedCanvas().toBlob(function (blob) {
          blobResult(blob)
        })
      } catch (error) {
        // 当前浏览器将无法生成blob
      }
      this.model('hide', true)
    },
    model: function (type, flag) {
      if (type === 'show') {
        document.getElementById('ccw_cropprt_out').style.display = 'table'
      } else if ('hide') {
        document.getElementById('ccw_cropprt_out').style.display = 'none'
        if (cropper) cropper.destroy();
        cropper = null;
        if (!flag) result()
      }
    },
    creat: function () {
      var html_fragment
      html_fragment = '<div id="ccw_cropprt_out">' +
        '<div class="ccw_cropper_container">' +
        '<div><img id="ccw_cropper_image" class="ccw_cropper_image" src=""></div>' +
        '<div class="ccw_cropper_confirm" onclick="$cropper().crop()">确 认</div>' +
        '<div class="ccw_cropper_cancel" onclick="$cropper().model(\'hide\')">取 消</div>' +
        '</div>' +
        '</div>'
      if (document.querySelector("#ccw_cropprt_out")) return;
      document.body.insertAdjacentHTML('afterbegin', html_fragment);
      var wHeight = document.documentElement.clientHeight;
      document.getElementById("ccw_cropprt_out").style.height = wHeight + "px";
    }
  }

  myCropper.prototype.init.prototype = myCropper.prototype
  return myCropper
});