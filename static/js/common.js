var root = 'http://101.132.96.90:8080/upload/img/';
const common = {
  /*****************1.0、验证(返回值:boolean)*******************/
  /**
   *1.0.1、判断对象是否是字符串
   * */
  isString:function (obj){
    return Object.prototype.toString.call(obj) === "[object String]";
  },

  //1.0.2、验证是否为空：
  isNull:function (str){
    if( str=="" || str=="null" || str == null || str == undefined || str == "undefined" ){
      return true;
    } return false;
  },

  //1.0.3、验证数字：
  isNumber: function (nubmer){
    var text = /^[0-9]+.?[0-9]*$/;
    if (!text.test(nubmer)){
      return false;
    } return true;
  },

  /*****************1.1、验证(返回值:对应类型)*******************/
  //1.1.1、验证是否为空：返回String
  checkNull:function (str){
    if( str=="" || str=="null" || str == null || str == undefined || str == "undefined" ){
      return "";
    } return str;
  },

  //1.1.2、验证是否为int：返回int
  checkInt:function (str){
    if( str=="" || str=="null" || str == null || str == undefined || str == "undefined" ){
      return 0;
    } return parseInt(str);
  },

  //1.1.3、验证是否为Float：返回Float
  checkFloat:function (str){
    if( common.isNumber(str) ){

      return parseFloat(str);
    }

  },

  /*****************1.2、验证(返回值:对应类型)*******************/
  // 1.2.1、验证身份证号码
  checkIdNumber: function(idNo){
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!regIdNo.test(idNo)){
      return false;
    } return true;
  },


  //1.1.2、验证是否为汉字：
  isChn:function (str) {
    var reg = /^[\u4E00-\u9FA5]+$/;
    if (!reg.test(str)) {
      return false;
    } return true;
  },

  /**
   * 1.1.3、注册验证
   * */
  checkReg:function (val,index){
    var reg;
    switch(index){
      case 0:
        reg = /^[A-Za-z0-9]{5,20}$/;//字母、数字、5-25（账号）
        break;
      case 1:
        reg = /^[A-Za-z0-9]{6,16}$/;//字母、数字、6-16（密码）
        break;
      case 2:
        reg = /^[\u4E00-\u9FA5A-Za-z]{2,10}$/;//中英文、2-5（真实姓名）
        break;
      case 3:
        reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;//email
        break;
      case 4:
        reg = /^1[34578]\d{9}$/;//手机号码
        break;
    }
    return reg.test(val);
  },

  /*****************2、localStorage*******************/
  //2.1、localStorage存值永久有效
  setStorage :function  (key,val) {
    if( common.isString(val) ){
      localStorage.setItem(key,val);
    }else{
      localStorage.setItem(key,JSON.stringify(val));
    }
  },
  //2.2、localStorage取值：（返回结果：JSON字符串）
  getStorage:function (key){
    return localStorage.getItem(key);
  },
  //2.3、localStorage取值（返回结果：对象）
  getObjStorage:function (key){
    return JSON.parse(localStorage.getItem(key));
  },
  //2.4、localStorage删除指定键对应的值
  delStorage:function (key){
    localStorage.removeItem(key);
  },

  /*****************date*******************/
  //3.1、获取当前时间戳：
  getCurrentTimeStamp:function (){
    return new Date().getTime();
  },
  //3.2、时间处理-时间轴=>年月日格式
  timeStamp2String:function (time, id) {
    if( common.isNull(time) == true ){
      return "";
    }
    //y=年;ymd=年月日;ymdhm年月日时分;ymdhms年月日时分秒
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var month2 = datetime.getMonth() + 1 < 10 ? datetime.getMonth() + 1 : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var date2 = datetime.getDate() < 10 ? datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    if (id == "y") {
      return year;
    } else if (id == "ym") {
      return year + "-" + month;
    } else if (id == "ym2") {
      return year + "年" + month + "月";
    }else if (id == "ymd") {
      return year + "-" + month + "-" + date;
    }  else if (id == "ymd2") {
      return year + "年" + month + "月" + date + "日";
    } else if (id == "ymdhm") {
      return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    } else if (id == "ymdhms") {
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    } else if (id == "md") {
      return month + "-" + date;
    } else if (id == "hm") {
      return hour + ":" + minute;
    } else if (id == "xs") {
      return hour + ":" + hour;
    } else if (id == "md2") {
      return month2 + "月" + date2 + "日";
    } else if (!id) {
      return year + "-" + month + "-" + date;
    } else if (id == "mdhm") {
      return month + "-" + date + " " + hour + ":" + minute;
    } else if (id == "md3" ) {
      //仿微信
      return "<span>"+month2+"  </span><span style='font-size:.7em;'>"+date2+"日</span>";
    }
  },
  //3.3、时间比较
  dateCompare:function (start,end){
    var a = new Date(start.replace(/-/g,"/"));
    var b = new Date(end.replace(/-/g,"/"));
    if(a<=b){
      return true;
    }else{
      return false;
    }
  },
  //3.4、根据指定数获取日期：0或不传值：当天，-1：明天，1：昨天
  getSomeday:function (num){
    if( common.isNull(num) ){
      num = common.checkInt(num);
    }
    var timeStamp = 1000 * 60 * 60 * 24 * num;
    var currdate = new Date();
    var resultdate = new Date(currdate-timeStamp);
    return common.timeStamp2String(resultdate.getTime(),"ymd");
  },

  //6.3、根据时间戳获取发布时间
  getDateDiff: function (dateTimeStamp){
    var result = '';
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){return;}
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    //if(monthC>=1){
    //  result="" + parseInt(monthC) + "月前";
    //}
    //else if(weekC>=1){
    //  result="" + parseInt(weekC) + "周前";
    //}
    //else if(dayC>=1){
    //  result=""+ parseInt(dayC) +"天前";
    //}
    if(dayC>=1){
      result= common.timeStamp2String(dateTimeStamp,'ymd');
    }
    else if(hourC>=1){
      result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
      result=""+ parseInt(minC) +"分钟前";
    }else
      result="刚刚";
    return result;
  },

  /*****************4、原生js操作方法*******************/
  //4.1、检测是否有某class
  hasClass: function (ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  },
  //4.2、为指定的dom元素添加样式
  addClass: function (ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += '' + cls
  },
  //4.3、删除指定dom元素的样式
  removeClass: function (ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      ele.className = ele.className.replace(reg, '')
    }
  },
  //4.4、如果存在(不存在)，就删除(添加)一个样式
  toggleClass: function (ele, cls) {
    if (this.hasClass(ele, cls)) {
      this.removeClass(ele, cls)
    } else {
      this.addClass(ele, cls)
    }
  },
  //14、计算行内文字最大个数
  /**
   * 计算行内文字个数 =（屏幕宽度-（行宽+内外边框））/ 文字尺码
   * param：
   * 1、width：行宽+内外边框
   * 2、size：文字尺码
   * 3、lines：行数
   * */
  getMaxlenInlineNum:function (width,size,lines) {
    var maxWith = 7.5; // 最大宽度7.5rem
    var num = (maxWith-width)/size;
    return common.isNull(lines) ? Math.floor(num) : Math.floor(num)*lines;
  },

  /*****************5、字典表数据转换*******************/
  //1、项目类型
  getProjectTypes: function (){
    var types = [ { "_id" : "5a4248b1160048792cd9d35a", "type_name" : "策划设计", "img":"./static/images/index/c_cehua_01_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35b", "type_name" : "规划设计", "img":"./static/images/index/c_guihua_02_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35c", "type_name" : "建筑设计", "img":"./static/images/index/c_jianzhu_03_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35d", "type_name" : "结构设计", "img":"./static/images/index/c_jiegou_04_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35e", "type_name" : "给排水设计", "img":"./static/images/index/c_jipaishui_05_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35f", "type_name" : "电气设计", "img":"./static/images/index/c_dianqi_06_03.png" },
                  { "_id" : "5a4248b1160048792cd9d360", "type_name" : "暖通设计", "img":"./static/images/index/c_nuantong_07_03.png" },
                  { "_id" : "5a4248b1160048792cd9d361", "type_name" : "景观设计", "img":"./static/images/index/c_jingguan_08_03.png" },
                  { "_id" : "5a4248b1160048792cd9d362", "type_name" : "室内设计", "img":"./static/images/index/c_shinei_09_03.png" },
                  { "_id" : "5a4248b1160048792cd9d363", "type_name" : "软装设计", "img":"./static/images/index/c_ruanzhuang_10_03.png" },
                  { "_id" : "5a4248b1160048792cd9d364", "type_name" : "项目经理", "img":"./static/images/index/c_xiangmujingli_11_03.png" },
                  { "_id" : "5a4248b1160048792cd9d365", "type_name" : "概预算", "img":"./static/images/index/c_gaiyusuan_12_03.png" },
                  { "_id" : "5a4248b1160048792cd9d366", "type_name" : "审图", "img":"./static/images/index/c_shentu_13_03.png" }];
    return types;
  },

  getNameByTypeId: function (id){
    var name = "";
    var types = common.getProjectTypes();
    var i=0,len=types.length;
    for(;i<len;i++){
      if( id == types[i]._id ){
        name = types[i].type_name;
      }
    }
    return name;
  },

  getProjectStateName: function (state) {
    var name = '';
    name = state==0 ? '抢单中' : state==1 ? '待完善' : state==2 ? '完善中' :
      state==3 ? '待支付' : state==4 ? '代交付' : state==5 ? '交付中' :
        state==6 ? '审核中' : state==7 ? '已完成' : state==8 ? '已结束' :
          state==9 ? '已取消' :  '';
    return name;
  },

  // 用户头像验证
  getAvatar: function (path,local){
    if( common.isNull(local) == true ){
      local = './static/images/bj.jpg';
    }
    if( common.isNull(path) == true ){
      path = local;
    }else if( path.indexOf("http") < 0 && path.indexOf("base64,") < 0 && path.indexOf("./") < 0 ) {
      path = root + path;
    }
    return path;
  },

  // 默认图片
  getDefultImg: function (path,local){
    if( common.isNull(local) == true ){
      local = './static/images/bj.jpg';
    }
    if( common.isNull(path) == true ){
      path = local;
    }else if( path.indexOf("http") < 0 && path.indexOf("base64,") < 0 && path.indexOf("./") < 0 ) {
      path = root + path;
    }
    return path;
  },

<<<<<<< HEAD
  getWorkyearsType:function(){
      var type = [
          {"_id":"1","type_name":"1-3年"},
          {"_id":"2","type_name":"3-5年"},
          {"_id":"3","type_name":"5-10年"},
          {"_id":"4","type_name":"10年以上"}
      ];
      return type;
  },
  getWorkyearsName:function(id){
    var name = "";
    var types = common.getWorkyearsType();
    var i=0,len=types.length;
    for(;i<len;i++){
        if( id == types[i]._id ){
            name = types[i].type_name;
        }
    }
    return name;
  },
=======
  // 获取随机数
  getRandomNum: function (minNum,maxNum){
    return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
  },

  // 获取随机头像
  getRandomAvatar: function () {
    var num = common.getRandomNum(1,8);
    var avatar = './static/images/avatar/'+num+'.png';
    return avatar;
  },

>>>>>>> de48beae9c458d96376f1f6bfda4776747c05839
  uuid:function () {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
  },
  // 集合
  collections:{
    users:'users',                                 // 用户
    indexImgList:'indexImgList',                   // 轮播突破
    indexNoticeList:'indexNoticeList',             // 首页通知轮播内容
    orderList:'orderList',                         // 订单列表
    orderParts:'orderParts',                       // 订单参与人
    collects:'collects',                           // 收藏
    projectTypes:'projectTypes',                   // 项目类型(字典表)
    userCertificates:'userCertificates',           // 用户证件图片
    personalChw:'personalChw',                     // 案例展示、个人荣誉、我的作品(personalChw:personal、Case, honor, work)
    balancePayments:'balancePayments',             // 收支记录
    withdrawalsRecords:'withdrawalsRecords',       // 提现记录
    meowCircle:'meowCircle',                       // 喵喵圈
    comments:'comments',                           // 评论
    likes:'likes',                                 // 点赞
    resumeList:'resumeList',                       // 人才简历
    activitys:'activitys',                         // 活动
    resumes:'resumes',                             // 简历
    workExperiences:'workExperiences',             // 工作经历
    alumnis:'alumniAssociations',                  // 校友会

  },

  // 接口
  interfaceIds:{
    insertData:'insertData',                       // 插入一条
    insertMany:'insertMany',                       // 插入多条
    saveData:'saveData',                           // 保存（数据存在更新，不存在则保存）
    updateData:'updateData',                       // 更新
    queryData:'queryData',                         // 查询多条
    queryOne:'queryOne',                           // 查询一条
    removeData:'removeData',                       // 删除
    getIndexInfo:'getIndexInfo',                   // 查询首页
    getOrderList:'getOrderList',                   // 获取订单列表
    getProjectDetail:'getProjectDetail',           // 查询订单详情
    getBidders:'getBidders',                       // 查询参与人
    competiteAnOrder:'competiteAnOrder',           // 抢单
    getHotSearch:'getHotSearch',                   // 获取热门搜索内容
    getDesigners:'getDesigners',                   // 设计师列表
    collect:'collect',                             // 收藏
    setCertification:'setCertification',           // 认证
    getCertification:'getCertification',           // 查询认证
    getPersonalChw:'getPersonalChw',               // 获取personalChw
    getPChwDetails:'getPChwDetails',               // 获取personalChw详情
    prsonalCenter:'prsonalCenter',                 // 个人中心
    getMyPurse:'getMyPurse',                       // 我的钱包
    getPayments:'getPayments',                     // 收支明细
    addWithdrawalsRecord:'addWithdrawalsRecord',   // 添加提现记录
    getMeowList:'getMeowList',                     // 获取喵喵圈信息
    getMeowDetails:'getMeowDetails',               // 获取喵喵圈动态详情
    getComments:'getComments',                     // 获取评论列表
    getLikes:'getLikes',                           // 获取点赞列表
    like:'like',                                   // 点赞
    addComments:'addComments',                     // 评论
    getCollects:'getCollects',                     // 收藏列表
    getCollectsPage:'getCollectsPage',             // 我的收藏
    getActivitys:'getActivitys',                   // 活动
    getActDetails:'getActivityDetails',            // 活动详情
    partInActivity:'partInActivity',               // 参加活动
    addOrders:'addOrders',                         // 发布订单
    refreshOrders:'refreshOrders',                 // 刷新订单
    getDesignerOrders:'getDesignerOrders',         // 查询设计师未处理订单
    saveDataFun:'saveDataFun',                     // 保存数据，有则修改，无则保存
    queryByUserId:'queryByUserId',                 // 根据user_id查询单个集合数据
    queryList:'queryList',                         // 分页查询数据
    queryResumeById:'queryResumeById',             // 人才简历详情
    queryWEById:'queryWEById',                     // 工作经历详情
    queryAlumniById:'queryAlumniById',             // 校友会详情
    checkUser:'checkUser',                         // 根据手机号码检测该用户是否存在
    registerUser:'registerUser',                   // 注册
    updateUserById:'updateUserById',               // 修改用户信息
    checkUserName:'checkUserName',                 // 检测用户昵称重复
    login:"login",                                 // 登录
    updateUserPwd:'updateUserPwd',                 // 修改密码
  },

}

common.op_localStorage = function() {
    var storage = window.localStorage;
    var show = function(){
        console.log(storage);
    };
    var set = function(key, value){
        storage.setItem(key,value);
    };
    var setArray = function(array){
        var i;
        for (i in array) {
            storage.setItem(array[i].key,array[i].value)
        }
    };
    var get = function(key){
        return storage.getItem(key);
    };
    var remove = function(key) {
        storage.removeItem(key);
    };
    var clear = function(){
        storage.clear();
    };
    var getStorage = function(){
        return storage
    }
    return {
        set:set,
        get:get,
        remove:remove,
        setArray:setArray,
        show:show,
        getStorage:getStorage,
        clear:clear
    }
}

// isType方法: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
<<<<<<< HEAD
var names = ['Arguments', 'Function','Number', 'Date', 'RegExp'];
=======
var names = ['Arguments', 'Function', 'Number', 'Date', 'RegExp'];//, 'String'
>>>>>>> de48beae9c458d96376f1f6bfda4776747c05839
for (var i = 0; i < names.length; i++) {
(function(common,i){
	common['is' + names[i]] = function(obj) {
        console.log(names,i,names[i])
        console.log(Object.prototype.toString.call(obj),'[object ' + names[i] + ']');
		return toString.call(obj) == '[object ' + names[i] + ']';
	};
})(common,i)

}
common['isArray'] =  Array.isArray || function(obj) {
    return toString.call(obj) == '[object Array]';
};


export default common;
