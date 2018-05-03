define([
    'compress',
    'getLength'
], function (Compress, getLength) {
    'use strict';
    var Watermark = function (src) {
        return new Watermark.prototype.init(src)
    }
    Watermark.prototype = {
        init: function (src) {
            if (!src) return
            this.src = src
        },
        add: function (obj, func) {
            var img = new Image();
            img.addEventListener("load", function () {
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                var fontSize = obj.fontSize >= 1 ? obj.fontSize : parseInt(this.height / 14)
                ctx.font = fontSize + "px sans-serif";
                ctx.fillStyle = "#FFFFFF";
                var txt = obj.text || obj;
                ctx.fillText(txt, canvas.width - ((getLength(txt) + 0.5) * fontSize), canvas.height - fontSize / 2);
                var base64 = canvas.toDataURL('image/jpeg');
                if (obj.ok) obj.ok(base64)
                if (func) func(base64)
            }, false);
            img.crossOrigin = 'Anonymous';
            img.src = this.src;
        }
    }
    Watermark.prototype.init.prototype = Watermark.prototype
    return Watermark
});