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
      console.log("获取分享服务列表失败");
    });
  },

  init:function(params){
    // 初始化分享
    console.log("shares:"+JSON.stringify(myshare.shares))
    if( JSON.stringify(myshare.shares) === "{}" ){
      myshare.getShares();
    }
    console.log("shares:"+JSON.stringify(myshare.shares))
    if( params ){
      if( myshare.isNull(params.href) || myshare.isNull(params.title) ||
          myshare.isNull(params.content) || myshare.isNull(params.thumbs) ){
        console.log("缺少分享参数!");
        return;
      }
      // 分享参数
      myshare.msg = {
        href: myshare.href,
        title: myshare.title,
        content: myshare.content,
        thumbs: myshare.thumbs,
      }
      // 回调函数
      if( !myshare.isNull(params.callback) ){
        myshare.callback = params.callback;
      }
      // 发起分享
      myshare.showActionSheet();
    }else{
      console.log("分享参数错误!")
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
            console.log("认证授权失败：" + e.code + " - " + e.message);
          });
        }
      }
    });
  },

  shareMessage: function (share, ex) {
    myshare.msg.extra = { scene: ex };
    share.send(myshare.msg, function() {
      console.log("分享到\"" + share.description + "\"成功！ ");
      /**
       * 分享成功,可进行其他操作
       * **/
      myshare.callback();
    }, function(e) {
      console.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
    });
  }

}

export default myshare;
