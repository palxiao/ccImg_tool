require.config({
  // baseUrl: "js",

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
});

require(['compress', '$cropper'], function (compress) {
  $compress = compress
})
