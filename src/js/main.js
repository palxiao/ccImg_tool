require.config({
  // baseUrl: "js",

  paths: {
    '$cropper': 'app/cropper',
    'cropper': 'lib/cropper',
    'toBlob': 'lib/canvas-to-blob.min',
    'compress': 'app/compress',
    'watermark': 'app/watermark',
    'isArray': 'app/is_array',
    'getLength': 'app/get_length',
    'base64toBlob': 'app/base64toBlob'
  },

  shim: {
    'cropper': {
      deps: ['toBlob'],
      exports: 'cropper'
    }
  }
});

require(['compress', 'watermark', '$cropper'], function (compress, watermark, myCropper) {
  $cropper = myCropper
  $compress = compress
  $watermark = watermark
})
