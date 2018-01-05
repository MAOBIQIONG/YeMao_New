var root = 'http://47.100.34.193:3000/';
const common = {
  /*****************1、验证(返回值:boolean)*******************/
  /**
   *1.1、判断对象是否是字符串
   * */
  isString:function (obj){
    return Object.prototype.toString.call(obj) === "[object String]";
  },

  //1.2、验证是否为空：
  isNull:function (str){
    if( str=="" || str=="null" || str == null || str == undefined || str == "undefined" ){
      return true;
    } return false;
  },

  /*****************1.1、验证(返回值:对应类型)*******************/
  //1.1、验证是否为空：返回String
  checkNull:function (str){
    if( str=="" || str=="null" || str == null || str == undefined || str == "undefined" ){
      return "";
    } return str;
  },

  //1.2、验证是否为int：返回int
  checkInt:function (str){
    if( str=="" || str=="null" || str == null || str == undefined || str == "undefined" ){
      return 0;
    } return parseInt(str);
  },

  //1.3、验证是否为Float：返回Float
  checkFloat:function (str){
    if(str==""||str=="null"||str==null||!checkNum(str)||str==undefined){
      return 0;
    } return parseFloat(str);
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
    } else if (id == "ymd") {
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

  /*****************5、字典表数据转换*******************/
  //1、项目类型
  getProjectTypes: function (){
    var types = [ { "_id" : "5a4248b1160048792cd9d35a", "type_name" : "策划设计", "img":"../../../static/images/index/c_cehua_01_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35b", "type_name" : "规划设计", "img":"../../../static/images/index/c_guihua_02_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35c", "type_name" : "建筑设计", "img":"../../../static/images/index/c_jianzhu_03_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35d", "type_name" : "结构设计", "img":"../../../static/images/index/c_jiegou_04_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35e", "type_name" : "给排水设计", "img":"../../../static/images/index/c_jipaishui_05_03.png" },
                  { "_id" : "5a4248b1160048792cd9d35f", "type_name" : "电气设计", "img":"../../../static/images/index/c_dianqi_06_03.png" },
                  { "_id" : "5a4248b1160048792cd9d360", "type_name" : "暖通设计", "img":"../../../static/images/index/c_nuantong_07_03.png" },
                  { "_id" : "5a4248b1160048792cd9d361", "type_name" : "景观设计", "img":"../../../static/images/index/c_jingguan_08_03.png" },
                  { "_id" : "5a4248b1160048792cd9d362", "type_name" : "室内设计", "img":"../../../static/images/index/c_shinei_09_03.png" },
                  { "_id" : "5a4248b1160048792cd9d363", "type_name" : "软装设计", "img":"../../../static/images/index/c_ruanzhuang_10_03.png" },
                  { "_id" : "5a4248b1160048792cd9d364", "type_name" : "项目经理", "img":"../../../static/images/index/c_xiangmujingli_11_03.png" },
                  { "_id" : "5a4248b1160048792cd9d365", "type_name" : "概预算", "img":"../../../static/images/index/c_gaiyusuan_12_03.png" },
                  { "_id" : "5a4248b1160048792cd9d366", "type_name" : "审图", "img":"../../../static/images/index/c_shentu_13_03.png" }];
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
    }else if( path.indexOf("http") < 0 ) {
      path = root + path;
    }
    return path;
  },

  // 集合
  collections:{
    users:'users',                                 // 用户
    indexImgList:'indexImgList',                   // 轮播突破
    indexNoticeList:'indexNoticeList',             // 首页通知轮播内容
    orderList:'orderList',                         // 订单列表
    orderParts:'orderParts',                       // 订单参与人
    collects:'collects',                           // 收藏
    projectTypes:'projectTypes'                    // 项目类型(字典表)
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
        set:this.set,
        get:this.get,
        remove:this.remove,
        setArray:this.setArray,
        show:this.show,
        getStorage:this.getStorage,
        clear:this.clear
    }
}

export default common;
