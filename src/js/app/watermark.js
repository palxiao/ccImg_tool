define([
    'getLength',
    'imgRotate'
], function (getLength, imgRotate) {
    // 'use strict';
    var Watermark = function (obj) {
        return new Watermark.prototype.init(obj)
    }
    Watermark.prototype = {
        init: function (obj) {
            if (!obj) return
            if (typeof obj == 'object') {
                this.add(obj)
            } else {
                this.src = obj
            }
        },
        add: function (obj) {
            var img = new Image();
            img.addEventListener("load", function () {
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;
                var ctx = canvas.getContext("2d");
                var fontSize = obj.fontSize >= 1 ? obj.fontSize : parseInt(this.height / 14)
                var txt = obj.text || obj;
                imgRotate(img, canvas);
                ctx.font = fontSize + "px sans-serif";
                ctx.fillStyle = "#FFFFFF";
                ctx.fillText(txt, canvas.width - ((getLength(txt) + 0.5) * fontSize), canvas.height - fontSize / 2);
                var base64 = canvas.toDataURL('image/jpeg');
                if (obj.ok) obj.ok(base64)
            }, false);
            img.crossOrigin = 'Anonymous';
            obj.src ? img.src = obj.src : img.src = this.src
        }
    }
    Watermark.prototype.init.prototype = Watermark.prototype
    return Watermark
});