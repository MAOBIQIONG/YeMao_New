import SDK from '../../src/sdk/NIM_Web_NIM_v4.3.0.js'
import emoji from './emoji.js'

const im = {
  appKey : '2958171ede0551ca697dd37373e52808',
  data : {},
  nim : null,
  init : function (params) {
    if( common.isNull(params.account) || common.isNull(params.token) ){
      return;
    }
    im.nim = SDK.getInstance({
      //debug: true,
      appKey: im.appKey,
      account: params.account,
      token: params.token,
      onconnect: im.onConnect,
      onwillreconnect: im.onWillReconnect,
      ondisconnect: im.onDisconnect,
      onerror: im.onError,
      //消息监听
      onroamingmsgs: im.onRoamingMsgs,
      onofflinemsgs: im.onOfflineMsgs,
      onmsg: im.onMsg
    });
  },
  logout : function () {//登出
    console.log('登出 SDK');
    if( im.nim != null ){
      im.nim.disconnect();
      im.nim = null;
    }
  },
  onConnect : function () {
    console.log('连接成功');
  },
  onWillReconnect : function (obj) {
    // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
    console.log('即将重连');
    //console.log(obj.retryCount);
    //console.log(obj.duration);
  },
  onDisconnect : function (error) {
    // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
    console.log('丢失连接');
    //console.log(error);
    if (error) {
      switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
          break;
        // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
        case 417:
          break;
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
          break;
        default:
          break;
      }
    }
  },
  onError : function (error) {
    console.log(error);
  },

  //消息监听
  onRoamingMsgs : function (obj) {
    //console.log('收到漫游消息', JSON.stringify(obj));
    im.pushMsg(obj.msgs);
  },
  onOfflineMsgs : function (obj) {
    //console.log('收到离线消息', JSON.stringify(obj));
    im.pushMsg(obj.msgs);
  },
  onMsg : function (msg) {
    //我的模块首页创建本地通知消息
    // console.log('收到消息', msg.scene, msg.type, JSON.stringify(msg));
    im.afterReceiveMsg(msg);
    im.pushMsg(msg);
    switch (msg.type) {
      case 'custom':
        im.onCustomMsg(msg);
        break;
      case 'notification':
        // 处理群通知消息
        im.onTeamNotificationMsg(msg);
        break;
      default:
        break;
    }
  },
  pushMsg : function (msgs) {
    if (!Array.isArray(msgs)) { msgs = [msgs]; }
    var sessionId = msgs[0].sessionId;
    im.data.msgs = im.data.msgs || {};
    im.data.msgs[sessionId] = im.nim.mergeMsgs(im.data.msgs[sessionId], msgs);
  },
  onCustomMsg : function (msg) {
    // 处理自定义消息
  },
  // 处理群通知消息
  onTeamNotificationMsg : function (msg) {
    console.log("msg:"+JSON.stringify(msg))
  },

  //发送文字消息
  sendTextMsg : function (to,content,callback,scene) {
    if( scene == null || scene == undefined ){
      scene = 'p2p';
    }
    // 设置返回函数
    im.callback = callback;
    var msg = im.nim.sendText({
      scene: scene,
      to: to,
      text: content,
      isPushable:true,
      done: im.sendMsgDone
    });
    //console.log('正在发送p2p text消息, id=' + msg.idClient);
    im.pushMsg(msg);
    // console.log("send:"+JSON.stringify(msg))
  },
  sendMsgDone : function (error, msg) {
    console.log(error);
    console.log(msg);
    //console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);
    im.pushMsg(msg);
    if(!error){//发送成功
      //我的模块首页保存消息
      console.log("发送成功,保存消息！");
      if( im.callback ){
        im.callback(msg);
      }
    }else{//发送失败
      console.log("发送消息失败，请重试！");
    }
  },

  /******************************************/
  callback:function (msg) {
    console.log("init msg:"+JSON.stringify(msg))
  },
  afterReceiveMsg : function (massage) {
    im.callback(massage);//监听接收消息,聊天页面回调函数
    if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
      // 接受到消息，创建 本地通知
      var appStatus = common.getStorage('appStatus');
      if( common.checkInt(appStatus) == 1 ){//app后台运行时
        var msg = {"content":massage.text,"title":massage.fromNick};
        im.createLocalPushMsg(msg);
      }else{
        // 震动
        plus.device.vibrate( 50 );
        // 蜂鸣
        // plus.device.beep();
      }
    }else{
      console.log("Now it's the development environment!")
    }
  },
  //创建本地消息
  createLocalPushMsg : function (msg){
    var options = {cover:false};//title:msg.title,
    var content = msg.content;
    var content = msg.title+":"+im.filterImgs(content);
    var payload = {"type":"chat"};
    if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
      plus.push.createMessage(content, JSON.stringify(payload), options);
    }else{
      console.log("Now it's the development environment!")
    }
  },
  // 过滤
  filterEmoji:function (showText) {
    if (/\[[^\]]+\]/.test(showText)) {
      var emojiItems = showText.match(/\[[^\]]+\]/g);
      emojiItems.forEach(function (text) {
        var emojiCnt = emoji.emojiList.emoji;
        if( text.indexOf(".png") >= 0 ){
          var path = text.substring(1,text.length-1);
          showText = showText.replace(text, '<img class="emoji-thumbnail" src="' + common.getAvatar(path) + '">');
        }else if (emojiCnt[text]) {
          showText = showText.replace(text, '<img class="emoji-small" src="' + emojiCnt[text].img + '">');
        }
      });
    }
    // console.log("showText:"+showText)
    return showText;
  },
  // 过滤
  filterEmoji2:function (showText) {
    if (/\[[^\]]+\]/.test(showText)) {
      var emojiItems = showText.match(/\[[^\]]+\]/g);
      emojiItems.forEach(function (text) {
        var emojiCnt = emoji.emojiList.emoji;
       if( text.indexOf(".png") >= 0 ){
          var path = text.substring(1,text.length-1);
          showText = showText.replace(path, '图片');
        }else if (emojiCnt[text]) {
          showText = showText.replace(text, '<img class="emoji-small" src="' + emojiCnt[text].img + '">');
        }
      });
    }
    // console.log("showText:"+showText)
    return showText;
  },
  // 过滤图片
  filterImgs:function (showText){
    if (/\[[^\]]+\]/.test(showText)) {
      var emojiItems = showText.match(/\[[^\]]+\]/g);
      emojiItems.forEach(function (text) {
        var emojiCnt = emoji.emojiList.emoji;
        if ( emojiCnt[text] || text.indexOf(".png")>=0 ) {
          showText = showText.replace(text, '[图片]');
        }
      });
    }
    // console.log("showText:"+showText)
    return showText;
  }
}
export default im;
