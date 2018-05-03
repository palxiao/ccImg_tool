define([
    'isArray',
    'toBlob'
], function (isArray) {
    'use strict';
    var params
    var Compress = function (obj) {
        return new Compress.prototype.init(obj)
    }
    Compress.prototype = {
        init: function (obj) {
            params = obj
            if (isArray(params.src)) {
                var dispose = this.dispose
                var a = 0
                var result = []
                thumb()
                function thumb() {
                    if (params.src[a]) {
                        dispose(params.src[a], function (base64) {
                            a++
                            result.push(base64)
                            thumb()
                        })
                    } else {
                        params.ok(result)
                    }
                }
            } else {
                this.dispose(params.src, function (base64) {
                    if (params.ok) params.ok(base64)
                }, function (blob) {
                    if (params.toBlob) params.toBlob(blob)
                })
            }
        },
        dispose: function (path, result, toBlob) {
            var img = new Image();
            img.addEventListener("load", function () {
                var that = this;
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w = params.width || w;
                h = params.height || (w / scale);
                var scaleCount = Math.round(0.0014 * w);
                if (scaleCount >= 1 && !params.original) {
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
                if (params.quality && params.quality <= 99 && params.quality > 0) {
                    quality = params.quality;
                }
                var base64 = canvas.toDataURL('image/jpeg', quality / 100);
                if (result) result(base64)
                if (toBlob) {
                    var image2 = new Image()
                    image2.src = base64
                    image2.onload = function () {
                        var canvas2 = document.createElement("canvas");
                        canvas2.width = image2.width;
                        canvas2.height = image2.height;
                        canvas2.getContext("2d").drawImage(image2, 0, 0);
                        canvas2.toBlob(function (blob) {
                            toBlob(blob);
                        })
                    }
                }
            }, false);
            img.crossOrigin = 'Anonymous';
            img.src = path;
        }
    }
    Compress.prototype.init.prototype = Compress.prototype
    return Compress
});