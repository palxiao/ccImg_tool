require.config({
  baseUrl: "js",

  paths: {
    '$cropper': 'cropper',
    'cropper': 'lib/cropper',
    'toBlob': 'lib/canvas-to-blob.min'
  },

  shim: {
    'cropper': {
      deps: ['toBlob'],
      exports: 'cropper'
    }
  }
});