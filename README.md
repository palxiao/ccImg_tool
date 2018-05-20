#### Demo预览

[http://palxp.com/ccimg/](http://palxp.com/ccimg/)

#### 安装说明

下载本项目，将`dist`文件下的 js 引入页面

`<script data-main="../js/main" src="../js/lib/require.js"></script>`

使用到图片裁剪工具时需引入 css

`<link rel="stylesheet" type="text/css" href="../css/cropper.css" />`

#### npm引入方式
	npm install ccimg
web项目中使用，目前只支持压缩和水印功能：

	var ccimg = require('ccimg')
	ccimg.compress // 使用等于下面的 $compress
	ccimg.watermark // 使用等于下面的 $watermark

#### 使用说明

## 1. 图片裁剪

传入参数：
> src: 图片地址
> 
> aspectRatio: 裁剪框比例，不传为自由变换 eg: 16/9 4/3 2/3 1/1

示例：

	$cropper(src).open({
		aspectRatio: 1,
		ok: function (base64) {
		  // 确认回调函数，返回裁剪后图片。
		},
		toBlob: function (blob) {
		  // 确认回调函数，返回裁剪后图片，转换成用于传输到后台的格式，使用formData接收。
		  // var formData = new FormData();
		  // formData.append('croppedImage', blob);
		}
	})

## 2. 图片压缩

传入参数：
> src：(string/array) 单个图片地址，或者多个图片地址的数组
> 
> width / height：(number) 自定义压缩后宽高，可不传
> 
> quality：(1~99) 压缩质量 数值越大质量越高
> 
> original: (boolean) 传true压缩后分辨率接近或与原始分辨率一致

	$compress({
	    src: document.getElementById('xxx').src,
	    width: 100, 
	    height: 100,
	    quality: 40,
	    ok: function (base64) {
	        // 返回的压缩图片，如果传递数组则返回数组：
	        // base64.forEach(function (item) {})
	    },
	    toBlob: function (blob) {
	    	// 返回转换为blob的格式
	    }
	})
	
## 3. 图片底部加水印

传入参数：
> src: 图片地址
> 
> text: 水印文字
> 
> fontSize: 字体大小，不传或者为0则自适应

	var src = document.getElementById('xxx').src
	$watermark(src).add({
	    text: '文字',
	    fontSize: 18,
	    ok: function (base64) {
	        // 完成后回调函数
	    }
	})
