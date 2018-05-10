define([
    'exif'
], function () {
    'use strict';
    var rotateImg = function (img, canvas, custom, untiles) {
        var Orientation;
        EXIF.getData(img, function () {
            EXIF.getAllTags(this);
            Orientation = EXIF.getTag(this, 'Orientation');
        });
        var ctx = canvas.getContext("2d");

        if (custom) {
            img.width = custom.width
            img.height = custom.height
        }
        switch (Orientation) {
            case 6:
                canvas.width = img.height
                canvas.height = img.width
                ctx.save()
                ctx.rotate(Math.PI / 2);
                if (!untiles) {
                    tiles(canvas, ctx, img, function (istiles) {
                        if (!istiles) {
                            ctx.drawImage(img, 0, -img.height, canvas.height, canvas.width)
                        }
                        ctx.restore()
                    })
                } else {
                    ctx.drawImage(img, 0, -img.height, canvas.height, canvas.width)
                    ctx.restore()
                }
                break;
            case 3:
                ctx.save()
                ctx.rotate(Math.PI);
                if (!untiles) {
                    tiles(canvas, ctx, img, function (istiles) {
                        if (!istiles) {
                            ctx.drawImage(img, 0, 0, -img.width, -img.height);
                        }
                        ctx.restore()
                    })
                } else {
                    ctx.drawImage(img, 0, 0, -img.width, -img.height);
                    ctx.restore()
                }
                // ctx.drawImage(img, 0, 0, -img.width, -img.height);
                // ctx.restore()
                break;
            case 8:
                canvas.width = img.height;
                canvas.height = img.width;
                ctx.save()
                ctx.rotate(Math.PI * 3 / 2);
                if (!untiles) {
                    tiles(canvas, ctx, img, function (istiles) {
                        if (!istiles) {
                            ctx.drawImage(img, 0, 0, -img.width, img.height);
                        }
                        ctx.restore()
                    })
                } else {
                    ctx.drawImage(img, 0, 0, -img.width, img.height);
                    ctx.restore()
                }
                // ctx.drawImage(img, 0, 0, -img.width, img.height);
                // ctx.restore()
                break;
            default:
                if (!untiles) {
                    tiles(canvas, ctx, img, function (istiles) {
                        if (!istiles) {
                            ctx.drawImage(img, 0, 0, img.width, img.height);
                        }
                    })
                } else {
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                }
                break;
        }
    }
    var tiles = function (canvas, ctx, img, isDone) {
        var width = img.width;
        var height = img.height;

        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
        var ratio;
        if ((ratio = width * height / 4000000) > 1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        } else {
            ratio = 1;
        }

        //如果图片像素大于100万则使用瓦片绘制
        var count;
        if ((count = width * height / 1000000) > 1) {
            canvas.width = width
            canvas.height = height
            count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
            //计算每块瓦片的宽和高  
            var nw = ~~(width / count);
            var nh = ~~(height / count);

            var tCanvas = document.createElement('canvas')
            tCanvas.width = nw;
            tCanvas.height = nh;
            var tctx = tCanvas.getContext('2d')

            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
            isDone(true)
            rotateImg(img, canvas, {
                width: width,
                height: height
            }, true)
        } else {
            isDone()
        }
    }
    return rotateImg
});