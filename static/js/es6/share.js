const myshare ={
  shares:{},
  msg:{
    href: '',
    title: '',
    content: '',
    thumbs: [],
  },
  callback:function(){},

  //检测数据
  isNull:function(ele){
    if( ele != null && ele != undefined )
      return false;
    else
      return true;
  },

  getShares: function () {
    plus.share.getServices(function(result) {
      if( result && result.length > 0 ) {
        var i=0,len=result.length;
        for( ; i<len; i++ ) {
          var obj = result[i];
          myshare.shares[obj.id] = obj;
        }
      }
    }, function() {
      alert("获取分享服务列表失败");
    });
  },

  init:function(params){
    console.log("分享")
    if(process.env.NODE_ENV === 'development'){ // production:生产环境,development:开发环境
      console.log("Now it's the development environment!");
      return;
    }
    // 初始化分享
    if( JSON.stringify(myshare.shares) === "{}" ){
      myshare.getShares();
    }
    if( params ){
      if( myshare.isNull(params.href) || myshare.isNull(params.title) ||
        myshare.isNull(params.content) || myshare.isNull(params.thumbs) ){
        alert("缺少分享参数!");
        return;
      }
      // 分享参数
      myshare.msg = {
        href: params.href,
        title: params.title,
        content: params.content,
        thumbs: params.thumbs,
      }
      console.log("myshare.msg:"+JSON.stringify(myshare.msg))
      // 回调函数
      if( !myshare.isNull(params.callback) ){
        myshare.callback = params.callback;
      }
      // 发起分享
      myshare.showActionSheet();
    }else{
      alert("分享参数错误!")
    }
  },

  showActionSheet:function () {
    var ids = [{
        id: "weixin",
        ex: "WXSceneSession"
      }, {
        id: "weixin",
        ex: "WXSceneTimeline"
      }, {
        id: "qq"
      }],
      bts = [{
        title: "发送给微信好友"
      }, {
        title: "分享到微信朋友圈"
      }, {
        title: "分享到QQ"
      }];
    plus.nativeUI.actionSheet({
      cancel: "取消",
      buttons: bts
    }, function(e) {
      var i = e.index;
      if(i > 0) {
        var s_id = ids[i - 1].id;
        var share = myshare.shares[s_id];
        if( share.authenticated ) {
          myshare.shareMessage(share, ids[i - 1].ex);
        } else {
          share.authorize(function() {
            myshare.shareMessage(share, ids[i - 1].ex);
          }, function(e) {
            alert("认证授权失败");
            // alert("认证授权失败：" + e.code + " - " + e.message);
          });
        }
      }
    });
  },

  shareMessage: function (share, ex) {
    myshare.msg.extra = { scene: ex };
    share.send(myshare.msg, function() {
      // console.log("分享到\"" + share.description + "\"成功！ ");
      alert("分享成功！ ");
      // alert("分享到\"" + share.description + "\"成功！ ");
      /**
       * 分享成功,可进行其他操作
       * **/
      myshare.callback();
    }, function(e) {
      // console.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
      alert("分享失败！ ");
      // alert("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
    });
  }

}

export default myshare;
