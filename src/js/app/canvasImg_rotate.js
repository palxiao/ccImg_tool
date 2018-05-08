define([
    'exif'
], function () {
    'use strict';
    var rotateImg = function (img, canvas, custom) {
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
                ctx.drawImage(img, 0, 0, 0, -img.height)
                ctx.restore()
                break;
            case 3:
                ctx.save()
                ctx.rotate(Math.PI);
                ctx.drawImage(img, 0, 0, -img.width, -img.height);
                ctx.restore()
                break;
            case 8:
                canvas.width = img.height;
                canvas.height = img.width;
                ctx.save()
                ctx.rotate(Math.PI * 3 / 2);
                ctx.drawImage(img, 0, 0, -img.width, img.height);
                ctx.restore()
                break;
            default:
                ctx.drawImage(img, 0, 0, img.width, img.height);
                break;
        }
    }
    return rotateImg
});