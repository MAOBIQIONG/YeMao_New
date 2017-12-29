const common = {
  /*****************1、验证*******************/
  //1.1、验证是否为空：返回boolean
  isNull:function (str){
    if( str=="" || str=="null" || str == null || str == undefined || str == "undefined" ){
      return true;
    } return false;
  },
  /**
   *1.2、判断对象是否是字符串
   * */
  isString:function (obj){
    return Object.prototype.toString.call(obj) === "[object String]";
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
  getProjectTypes(){
    var types = [ { "_id" : "5a4248b1160048792cd9d35a", "type_name" : "策划设计" },
                  { "_id" : "5a4248b1160048792cd9d35b", "type_name" : "规划设计" },
                  { "_id" : "5a4248b1160048792cd9d35c", "type_name" : "建筑设计" },
                  { "_id" : "5a4248b1160048792cd9d35d", "type_name" : "结构设计" },
                  { "_id" : "5a4248b1160048792cd9d35e", "type_name" : "给排水设计" },
                  { "_id" : "5a4248b1160048792cd9d35f", "type_name" : "电气设计" },
                  { "_id" : "5a4248b1160048792cd9d360", "type_name" : "暖通设计" },
                  { "_id" : "5a4248b1160048792cd9d361", "type_name" : "景观设计" },
                  { "_id" : "5a4248b1160048792cd9d362", "type_name" : "室内设计" },
                  { "_id" : "5a4248b1160048792cd9d363", "type_name" : "软装设计" },
                  { "_id" : "5a4248b1160048792cd9d364", "type_name" : "项目经理" },
                  { "_id" : "5a4248b1160048792cd9d365", "type_name" : "概预算" },
                  { "_id" : "5a4248b1160048792cd9d366", "type_name" : "审图" }];
    return types;
  },
  getNameByTypeId(id){
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

  getAvatar(path,local){
    if( common.isNull(path) == true ){
      return local;
    }else{
      return path;
    }
  },

}

common.op_localStorage = function() {
    let storage = window.localStorage;
    let show = function(){
        console.log(storage);
    };
    let set = function(key, value){
        storage.setItem(key,value);
    };
    let setArray = function(array){
        let i;
        for (i in array) {
            storage.setItem(array[i].key,array[i].value)
        }
    };
    let get = function(key){
        return storage.getItem(key);
    };
    let remove = function(key) {
        storage.removeItem(key);
    };
    let clear = function(){
        storage.clear();
    };
    let getStorage = function(){
        return storage
    }
    return {set,get,remove,setArray,show,getStorage,clear}
}

export default common;
