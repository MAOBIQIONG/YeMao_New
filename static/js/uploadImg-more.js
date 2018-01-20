import webapi from '../../src/api/webapi'
import EXIF from './exif'
import Qs from 'qs'

const uploadImg2 ={
	maxLen:9,                                   //最大上传数量
	maxH:800,
	maxW:800,
  imgArr:[],                                  //图片数组
  imgBase64:[],                               //图片base64格式数据
	uploadPath:'appUploadImg/imgBase64',        //上传接口
	callback:function(){},
	successfun:function(){},
	//检测数据
	isNull:function(ele){
		if( ele != null && ele != undefined )
			return false;
		else
      return true;
	},
  init:function(param){
    if( param && !uploadImg2.isNull(param.maxLen) ){
      uploadImg2.maxLen = param.maxLen;
    }
    if( param && !uploadImg2.isNull(param.maxH)){
      uploadImg2.maxH = param.maxH;
    }
    if( param && !uploadImg2.isNull(param.maxW) ){
      uploadImg2.maxW = param.maxW;
    }
    if( param && !uploadImg2.isNull(param.uploadPath) ){
      uploadImg2.uploadPath = param.uploadPath;
    }
    if( param && !uploadImg2.isNull(param.callback) ){
      uploadImg2.callback = param.callback;
    }
    if( param && !uploadImg2.isNull(param.successfun) ){
      uploadImg2.successfun = param.successfun;
    }


    var a = [{
      title: "拍照"
    }, {
      title: "从手机相册选择"
    }];
    if (plus) {
			plus.nativeUI.actionSheet({
				title: "上传图片",
				cancel: "取消",
				buttons: a
			}, function(b) { /*actionSheet 按钮点击事件*/
				switch (b.index) {
					case 0:
						break;
					case 1:
						uploadImg2.getImage(); /*拍照*/
						break;
					case 2:
            uploadImg2.galleryImgs();
						break;
					default:
						break;
				}
			})
		}
  },

  //拍照
  getImage:function() {
    window.alert("getImage:");
		var c = plus.camera.getCamera();
		c.captureImage(function(e) {
			plus.io.resolveLocalFileSystemURL(e, function(entry) {
				//图片
				var s = entry.toLocalURL() + "?version=" + new Date().getTime();
				uploadImg2.getOrientation(s,0); /*图片修复*/
			}, function(e) {
				console.log("读取拍照文件错误：" + e.message);
			});
		}, function(s) {
			console.log("error" + s);
		}, {
			//filename: "_doc/head.png"
		})
	},

	//本地相册选择
	galleryImgs:function() {
    window.alert("galleryImgs:");
		plus.gallery.pick(function(e) {
			var files = e.files;
			if( files.length > uploadImg2.maxLen ){
        plus.nativeUI.alert("最多只能选择"+uploadImg2.maxLen+"张图片");
			}else{
				if( (uploadImg2.imgArr.length+files.length) <= uploadImg2.maxLen ){
					for (var i=0;i<files.length;i++) {
						plus.io.resolveLocalFileSystemURL(files[i],function(entry){
							//图片：entry.toLocalURL()
							uploadImg2.getOrientation(entry.toLocalURL(),0); /*图片修复*/
						})
					}
				}else{
          plus.nativeUI.alert("最多只能选择"+uploadImg2.maxLen+"张图片");
				}
			}
		}, function(error) {
			console.log("galleryBtn error: " + JSON.stringify(error));
		},{
			filter:"image",
			multiple:true,
			maximum:uploadImg2.maxLen-uploadImg2.imgArr.length,
			system:false,
			selected:uploadImg2.imgArr,
			onmaxed:function(){
        plus.nativeUI.alert("最多只能选择"+uploadImg2.maxLen+"张图片");
      }
		});
	},

	getOrientation:function (imgPath,flag){
    // window.alert("getOrientation:");
		// console.log("imgPath = " + imgPath);
		var Orientation = null;
		var image = new Image();
		image.src = imgPath;
	  image.onload = function() {
      //获取照片方向角属性，用户旋转控制
      EXIF.getData(image, function() {
        EXIF.getAllTags(this);
        Orientation = EXIF.getTag(this, 'Orientation');
        console.log("Orientation = " + Orientation);
        var imgData =  uploadImg2.getBase64ImageConvert(Orientation,image);
        if( flag == 0 ){
          var imgSuffix = imgPath.substr(imgPath.lastIndexOf("."));
          var fileName = uploadImg2.getFileName(imgSuffix);
          uploadImg2.saveBitmap(fileName,imgData);
        }else{
          uploadImg2.imgArr.push(imgPath);
          uploadImg2.imgBase64.push({"filePath":imgPath,"base64Data":imgData});
          uploadImg2.callback(imgPath);
        }
      });
		}
	},

	getBase64ImageConvert:function(Orientation,img) {
		var canvas = document.createElement("canvas");
		var width = img.width;
    var height = img.height;
    console.log("getBase64ImageConvert:width="+width+"<>height="+height)
    // 宽度等比例缩放 *=
    var MAX_HEIGHT = uploadImg2.maxH;
    var MAX_WIDTH = uploadImg2.maxW;
    if( height > width && height > MAX_HEIGHT ) {
			width *= MAX_HEIGHT/height;
			height = MAX_HEIGHT;
		}else if( width > height && width > MAX_WIDTH ){
			height *= MAX_WIDTH/width;
			width = MAX_WIDTH;
		}

		canvas.width = width;   /*设置新的图片的宽度*/
		canvas.height = height; /*设置新的图片的长度*/
		var ctx = canvas.getContext("2d");
    var base64 = null;
    //修复ios
    if (navigator.userAgent.match(/iphone/i)) {
      console.log('iphone');
      //如果方向角不为1，都需要进行旋转
      if(Orientation != "" && Orientation != undefined  && Orientation != 1){
        var degree = 0;
        var drawWidth = 0;
        var drawHeight = 0;
        switch(Orientation){
        //iphone横屏拍摄，此时home键在左侧
        case 3:
          degree=180;
          drawWidth=-width;
          drawHeight=-height;
          break;
        //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
        case 6:
          canvas.width=height;
          canvas.height=width;
          degree=90;
          drawWidth=width;
          drawHeight=-height;
          break;
        //iphone竖屏拍摄，此时home键在上方
        case 8:
          canvas.width=height;
          canvas.height=width;
          degree=270;
          drawWidth=-width;
          drawHeight=height;
          break;
        }
        ctx.rotate(degree*Math.PI/180);
        ctx.drawImage(img,0,0,drawWidth,drawHeight);
      }else{
        ctx.drawImage(img, 0, 0, width, height);
      }
      base64 = canvas.toDataURL("image/png", 1);
    }else if (navigator.userAgent.match(/Android/i)) {// 修复android
      ctx.drawImage(img, 0, 0, width, height);
        base64 = canvas.toDataURL("image/png", 1);
    }else{
        base64 = canvas.toDataURL("image/png", 1);
    }
    return base64.replace("data:image/png;base64,", "");
	},

	/**
	 * 保存图片参数:
	 * 1、
	 * 2、base64Data：去除前缀
	 * eg:
	  iVBORw0KGgoAAAANSUhEUgAAABgAAAAsCAYAAAB/nHhDAAAABHNCSVQICAgIfAhkiAAAAAlwSF
	  lzAAAKwwAACsMBNCkkqwAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yOC8xMqLz6JEAAAAcdEVYdFN
	  vZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAABJ0lEQVRYhe3Wv6rCMBQG8C/VN1AEd3HS
	  zuYO3jr4knkY0UE62xTBcp9A8A0uHhc72CZp/lQQyZmT7xfSJKeMiPDOSt6aHoEIRKAbkLKioqiCr
	  roWkLKi+51ARAhBlEAdXlcI0gLK8u8lPBRpAYvFjCUJUw72QZRbtFzOe0O0H7kvxHhM83yfhiJdF+
	  2c5/utCTmdLnS93rQQs2mZQogN59lOdbrqmk7HmExGrZVYAU9kzXl2cEWsgSfys1r9Hk1TmogTAAB
	  FcTFOaQJOr6mUlVO4E9B8n2zCrQHfcAAYmoKFEAPOs39dOGMMaTpXX5J6jGlTTSu3CQcsGk5IuBbo
	  K1wJ6BqOT7gS0DUcn3AlALR7gW84YHGKiOAd3gn0UV/+6xiBCHwG8AByzMrOPKV7sAAAAABJRU5ErkJggg==
	 * */
	getFileName:function (suf) {
	    var len = 32;
	    var radix=16;//16进制
	    var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
	    return uuid.join('')+suf;
	},

  // 保存图片至本地路径
	rootPath:"_doc/yemao/cache/img/",
	saveBitmap:function (filePath,base64Data){
    // window.alert("saveBitmap:");
		//拍照图片去除路径参数后缀
		var num = filePath.lastIndexOf("?");
		if( num >= 0 ){
			filePath = filePath.substr(0,num);
		}
		filePath = uploadImg2.rootPath + filePath;
		var bitmap = new plus.nativeObj.Bitmap();
	    // 加载Base64编码格式图片到Bitmap对象
	    bitmap.loadBase64Data(base64Data, function(){
        console.log("加载Base64图片数据成功");
	    }, function(){
        plus.nativeUI.alert("图片格式错误！");
        console.log('加载Base64图片数据失败：'+JSON.stringify(e));
	    } );
	    bitmap.save(filePath
	    ,{}
	    ,function(i){
	        console.log('保存图片成功：'+JSON.stringify(i));
	        uploadImg2.imgArr.push(i.target);
	        uploadImg2.imgBase64.push({"filePath":i.target,"base64Data":base64Data});
	        uploadImg2.callback(i.target);
	    }
	    ,function(e){
	        console.log('保存图片失败：'+JSON.stringify(e));
	    });
	},

	//上传图片base64
  uploadBase64:function(imgData){
    var params = Qs.stringify({ "img":imgData})// 解决后台接收参数错误问题
    webapi.post(uploadImg.uploadPath, params, function (data) {
      if( data && data.code == "01" ){
        uploadImg.callback(data.result);
        plus.nativeUI.alert("上传成功");
      }else{
        plus.nativeUI.alert("上传失败");
      }
    })
  },

	clearImgArr:function(path,flag) {
		if( flag == true ){//清空所有图片及缓存
			uploadImg2.imgArr = [];
			uploadImg2.imgBase64 = [];
		}else{
			var index = jQuery.inArray(path,uploadImg2.imgArr);
			if( index >= 0 ){
				uploadImg2.imgArr.splice(index,1);//清除图片路径
				uploadImg2.imgBase64.splice(index,1);//清除图片路径
			}
		}
	},
}
export default uploadImg2;
