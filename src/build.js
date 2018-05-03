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
        'toBlob': 'lib/canvas-to-blob.min',
        'compress': 'app/compress'
    },

    shim: {
        'cropper': {
            deps: ['toBlob'],
            exports: 'cropper'
        }
    }
})