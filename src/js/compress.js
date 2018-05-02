define([
    'toBlob'
], function () {
    'use strict';
    var compress = function (param, callback) {
        var img = new Image();
        img.addEventListener("load", function () {
            var that = this;
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = param.width || w;
            h = param.height || (w / scale);
            var scaleCount = Math.round(0.0014 * w);            
            if (scaleCount >= 1 && !param.original) {
                if (scaleCount <= 2) {
                    w = parseInt(w / 1.5);
                    h = parseInt(h / 1.5);
                } else if (scaleCount == 3) {
                    w = parseInt(w / 2);
                    h = parseInt(h / 2);
                } else {
                    w = parseInt(w / (scaleCount - 1.5));
                    h = parseInt(h / (scaleCount - 1.5));
                }
            }
            var quality = 0.5; // 默认图片质量
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // ctx.font = "28px sans-serif";
            // ctx.fillStyle = "#FFFFFF";
            // var txt = '零美云合';
            // ctx.fillText(txt, canvas.width - (txt.length * 32), canvas.height - 22);
            if (param.quality && param.quality <= 99 && param.quality > 0) {
                quality = param.quality;
            }
            var base64 = canvas.toDataURL('image/jpeg', quality/100);

            var image2 = new Image()
            image2.src = base64
            image2.onload = function () {
                var canvas2 = document.createElement("canvas");
                canvas2.width = image2.width;
                canvas2.height = image2.height;
                canvas2.getContext("2d").drawImage(image2, 0, 0);
                canvas2.toBlob(function (blob) {
                    callback(base64, blob);
                })
            }

        }, false);
        img.setAttribute("crossOrigin", 'Anonymous')
        img.src = param.src;
    }
    return compress
});
