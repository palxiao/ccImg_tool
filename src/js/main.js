require.config({
  // baseUrl: "js",

  paths: {
    '$cropper': 'app/cropper',
    'cropper': 'lib/cropper',
    'compress': 'app/compress',
    'watermark': 'app/watermark',
    'isArray': 'app/is_array',
    'getLength': 'app/get_length',
    'base64toBlob': 'app/base64toBlob'
  },

  shim: {
    'cropper': {
      // deps: ['base64toBlob'],
      exports: 'cropper'
    }
  }
});

require(['compress', 'watermark', '$cropper'], function (compress, watermark, myCropper) {
  $cropper = myCropper
  $compress = compress
  $watermark = watermark
})
