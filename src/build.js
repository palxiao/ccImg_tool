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
        "cropper": "lib/cropper.min",
        "toBlob": "lib/canvas-to-blob.min"
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