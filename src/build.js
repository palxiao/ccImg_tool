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
        "cropper": "plugins/cropper.min",
        "toBlob": "plugins/canvas-to-blob.min"
    },
    shim: {
        'toBlob': {
            exports: 'toBlob'
        },
        'cropper': {
            deps: ['toBlob'],
            exports: 'cropper'
        }
    }
})