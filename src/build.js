({
    appDir: './',
    baseUrl: './js',
    dir: './dist',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        '$cropper': 'app/cropper',
        'cropper': 'lib/cropper',
        'compress': 'app/compress',
        'watermark': 'app/watermark',
        'isArray': 'app/is_array',
        'getLength': 'app/get_length',
        'base64toBlob': 'app/base64toBlob',
        'exif': 'lib/exif',
        'imgRotate': 'app/canvasImg_rotate',
        'gif': 'lib/gif'
    },

    shim: {
        'cropper': {
            // deps: ['base64toBlob'],
            exports: 'cropper'
        }
    }
})