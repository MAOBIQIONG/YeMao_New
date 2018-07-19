<template>
  <div class="templete-body tianxiejianli-xiu">
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>填写简历</span>
      <div class="header-right" @click="nextStep()">下一步</div>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="flex-content">
        <div class="touxiang">
             <div class="tu" v-tap="{ methods:modifyAvatar}" :style="{backgroundImage:`url(${checkAvatar(dataParams.img)})`}">
                 <!-- <img src="../../../static/images/meow/xiangji.png" v-if="isNull(dataParams.img)"/> -->
              </div>
              <p class="bjtx"></p>
        </div>
        <div class="ys-time">
          <div class="qdtime">
            <div class="qdtime-left">
              <span>姓名</span>
            </div>
            <div class="qdtime-right">
              <input v-model="dataParams.real_name" type="text" placeholder="请输入姓名" maxlength="8" />
            </div>
          </div>
          <div class="qdtime">
            <div class="qdtime-left">
              <span>性别</span>
            </div>
            <div class="qdtime-right">
              <checker v-model="dataParams.gender" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item class="xiu-xuan" value="男">男</checker-item><checker-item class="xiu-xuan" value="女">女</checker-item>
              </checker>
              <!--<form action="" method="get">-->
                <!--<label><input name="Fruit" type="radio" value="男" />男 </label>-->
                <!--<label><input name="Fruit" type="radio" value="女" />女</label>-->
              <!--</form>-->
            </div>
          </div>
          <div class="qdtime">
            <div class="qdtime-left">
              <span>出生年月</span>
            </div>
            <div class="qdtime-right">
              <datetime class="shijian" placeholder="请选择生日"
                        :min-year="1949"
                        :end-date="getCurrDate()"
                        @on-change="onChange"
                        v-model="dataParams.birthday"></datetime>
            </div>
          </div>
        </div>
        <div class="ys-time">
          <div class="qdtime">
            <div class="qdtime-left">
              <span>毕业院校</span>
            </div>
            <div class="qdtime-right">
              <input v-model="dataParams.school_name" type="text" placeholder="请输入毕业院校" maxlength="10" />
            </div>
          </div>
          <div class="qdtime">
            <div class="qdtime-left">
              <span>设计类型</span>
            </div>
            <div class="qdtime-right qd-sel">
              <select class="xmlx-kuang rtl" v-model="dataParams.type">
                <option value="">请选择类型</option>
                <option v-for="item in typeList" :value="item._id">{{item.type_name}}</option>
              </select>
            </div>
          </div>
          <div class="qdtime">
            <div class="qdtime-left">
              <span>最高学历</span>
            </div>
            <div class="qdtime-right">
              <!-- <input v-model="dataParams.education" type="text" placeholder="请输入最高学历" maxlength="10" /> -->
              <select class="xmlx-kuang rtl" v-model="dataParams.education">
                <option value="" selected="selected">请选择学历</option>
                <option v-for="(item,index) in educationList" :value="item" :key="index">{{item}}</option>
              </select>
            </div>
          </div>
          <div class="qdtime">
            <div class="qdtime-left">
              <span>工作年限</span>
            </div>
              <div class="qdtime-right">
                  <select class="xmlx-kuang rtl" v-model="dataParams.working_year">
                      <option value="">请选择工作年限</option>
                      <option :value="item._id" v-for="(item,index) in workyearList" :key="index">{{item.type_name}}</option>
                  </select>
              </div>
          </div>
        </div>
        <div class="ys-time">
          <div class="qdtime">
            <div class="qdtime-left">
              <span>邮箱</span>
            </div>
            <div class="qdtime-right em" style="line-height:normal">
              <x-input name="email" placeholder="请输入邮箱地址" is-type="email" v-model="dataParams.email"></x-input>
            </div>
          </div>
          <div class="qdtime">
            <!--<div class="qdtime-left">-->
              <!--<span>所在城市</span>-->
            <!--</div>-->
            <!--<div class="qdtime-right">-->
              <!--<group class="xmlx-kuang">-->
                  <!--<x-address :placeholder="'请选择城市'" title="所在城市" :list="addressData" hide-district value-text-align="right" v-model="dataParams.city" class="crty"></x-address>-->
              <!--</group>-->
            <!--</div>-->
            <group label-width="2rem" label-align="left">
              <x-address title="所在城市" :placeholder="'请选择城市'" raw-value :list="addressData" hide-district value-text-align="left" v-model="dataParams.city" label-align="end"></x-address>
            </group>
            <!--<group label-width="3rem" label-align="left">-->
              <!--<x-address @on-hide="logHide" title="所在城市" raw-value :list="addressData" hide-district value-text-align="right" v-model="value3" label-align="end"></x-address>-->
            <!--</group>-->
          </div>
        </div>
        <!--留言-->
        <div class="pc-shuru">
          <p>描述</p>
          <div class="area-box">
            <textarea class="area" maxlength="300" placeholder="请输入个人描述" v-model="dataParams.description"></textarea>
          </div>
          <div class="xianzhi"><span class="zs">{{300-dataParams.description.length}}</span>/<span>300</span></div>
        </div>
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em"></toast>
    <loading :show="loadingShow" text="提交中"></loading>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data, Value2nameFilter as value2name, Datetime, Group, Checker, CheckerItem, XInput ,Toast,Loading } from 'vux'
  export default {
    components: {
      XAddress,
      Datetime,
      Group,
      Checker,
      CheckerItem,
      XInput,
      Toast,
      Loading
    },
    data(){
        return {
            demo1Required: '男',
            imgList:[],
            isShow:true,
            typeList:[],
            workyearList:[],
            subParams:{
                user_id:"",
                project_type:"",
                project_region:['上海市'],
            },
            addressData: ChinaAddressV4Data,
            value3: ['上海市'],
            value1: '2015-11-12',
            value2: '2015-10-12',
            value4: '2025-10-12',
            dataParams:{
                user_id:null,
                real_name:"",
                img:"",
                gender:"",
                birthday:"",
                school_name:"",
                type:"",
                education:"",
                working_year:"",
                email:"",
                city:"",
                description:"",
                status:0,
            },
            toastShow:false,
            toastText:"",
            loadingShow:false,
            educationList:[
              '博士','硕士','本科','大专','高中','中专','其他'
            ],
        }
    },
    created(){
        var _self = this;
        _self.typeList = common.getProjectTypes();
        _self.workyearList = common.getWorkyearsType();
        var user = common.getObjStorage("userInfo") || {};
        // var resumeParams1 = common.getObjStorage("resumeParams1")|| {};

        if( !common.isNull(user._id) ){
            _self.userInfo = user;
            _self.user_id = user._id;
            _self.dataParams.user_id = user._id;
            _self.initData();
        } else {
            console.log('user_id is null');
            _self.$router.push({name:'login'});
        }
        // _self.loadingShow = true;
        // setTimeout(()=>{_self.loadingShow = false},1500);
        // if(!common.isNull(resumeParams1) && common.getStorage('fromWorkExp')=='1'){
        //     _self.dataParams = resumeParams1;
        // }
    },
    mounted: function () {
      // this. wzxz()
      console.log("mounted!!",this.dataParams);
    },
    methods: {
        showToast(msg){
            this.toastShow = true;
            this.toastText = msg;
        },
        goback () {
            // common.delStorage("resumeId");
            // common.delStorage("fromWorkExp");
            // common.delStorage("resumeParams1");
            // common.delStorage("resumeParams2");
            // common.delStorage("resumeParams3");
            this.$router.goBack();
        },
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        getCurrDate(){
          var currTime = common.getCurrentTimeStamp();
          return common.timeStamp2String(currTime,'ymd');
        },
        onChange(date){
            console.log("date:"+date);
//            if( date ){
//              var currTime = common.getCurrentTimeStamp();
//              var dateTime = common.string2TimeStamp(date);
//              var sDate = new Date(currTime);
//              var eDate = new Date(dateTime);
//              var year = sDate.getYear()-eDate.getYear();
//              if( Math.abs(year) < 18 || Math.abs(year) > 65 ){
//                this.showToast("系统检测到您出生年月可能选择错误！");
//              }
//            }
        },
        //留言字数限制
        wzxz(){
            $(".area").bind("input propertychange",function(){
            var curlength=$(".area").val().length;
            if(curlength>300){
                var num=$(".area").val().substr(0,300);
                $('.area').val(num);
                alert("您输入的字数已超出");
            }
            else{
                $(".zs").text(300-$(".area").val().length)
            }
            })
        },
        isNull(data){
            return common.isNull(data);
        },
        // loading
        showLoading() {
            var _self = this;
            _self.loadingShow = true;
            setTimeout(() => {
            _self.loadingShow = false;
            }, 2000)
        },
        //头像
        checkAvatar (path) {
            //相机背景图片
            var picCamera = "../../../static/images/meow/xjbg.png";
            return common.getAvatar(path,picCamera)
        },
        // 修改头像
        modifyAvatar() {
            var _self = this;

            console.log("修改头像。。");
            if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
                uploadImg.init({
                    callback:function (path) {
                        _self.showLoading();
                        _self.dataParams.img = path;
                    }
                })
            }
        },


        // uploadAtavar (path) {
        //     var _self = this;
        //     var params = {
        //     interfaceId:common.interfaceIds.updateUserById,
        //     user_id: _self.user_id,
        //     data:{
        //         img: path
        //     }
        //     };
        //     _self.$axios.post('/mongoApi', {
        //     params: params
        //     }, response => {
        //     var data = response.data;
        //     if( data && data.code == 200 ){
        //         _self.dataParams.img = path;
        //     }else{
        //         _self.showToast('修改失败!');
        //     }
        //     });
        // },
        showPlugin () {
            this.$vux.datetime.show({
            cancelText: '取消',
            confirmText: '确定',
            format: 'YYYY-MM-DD HH',
            value: '2017-05-20 18',
            onConfirm (val) {
                console.log('plugin confirm', val)
            },
            })
        },
        // 地区
        getName (value) {
          return value2name(value, ChinaAddressV4Data)
        },
        // 地区
        logHide (str) {
          var obj = this;
          console.log('on-hide', str)
          if( str == true ){
            console.log('value', obj.value3)
            if( obj.value3[0] == '110000' || obj.value3[0] == '120000' ||
              obj.value3[0] == '310000' || obj.value3[0] == '500000' ){
              obj.value3[1] = '--';
            }else{
              obj.value3[0] = '--';
            }
          }
          var city = obj.getName(obj.value3);
          obj.dataParams.city = city.trim();
        },
        logShow (str) {
            console.log('on-show',str)
        },
        initData(){
            console.log('this is initData');
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.queryByUserId,
                coll:common.collections.resumes,
                user_id:_self.user_id
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                    let data = response.data.data
                    if(!common.isNull(data)) {
                        // common.setStorage("resumeId",data._id);
                        _self.dataParams.user_id = _self.user_id;
                        _self.dataParams = data;
                        if( !common.isNull(data.city) ){
                          _self.value3 = [data.city];
                        }
                    }
                });
        },
        submit(){
          let _self = this;
          _self.loadingShow = true;
          setTimeout(function () {
            _self.loadingShow = false;
          },5000);
          let params = {
              interfaceId:common.interfaceIds.saveDataFun,
              coll:common.collections.resumes,
              data:_self.dataParams,
          };
          _self.$axios.post('/mongoApi', {
                params: params
                }, response => {

                    console.log(response);
                    setTimeout(()=>{_self.loadingShow = false; _self.toUrl('gongzuojinli');},10)
                });
         },
        nextStep(){
            var _self = this;
            if( common.isNull(_self.dataParams.real_name) ){
                _self.showToast("请填写用户名");
                return;
            }
            if( common.isNull(_self.dataParams.gender) ){
                _self.showToast("请选择性别");
                return;
            }
            if( common.isNull(_self.dataParams.birthday) ){
                _self.showToast("请选择生日");
                return;
            }
            if( common.isNull(_self.dataParams.school_name) ){
                _self.showToast("请填写学校名称");
                return;
            }
            if( common.isNull(_self.dataParams.type) ){
                _self.showToast("请选择设计类别");
                return;
            }
            if( common.isNull(_self.dataParams.education) ){
                _self.showToast("请填写最高学历");
                return;
            }
            if( common.isNull(_self.dataParams.working_year) ){
                _self.showToast("请填写工作年限");
                return;
            }
            if( common.isNull(_self.dataParams.email) ){
                _self.showToast("请填写邮箱地址");
                return;
            }
            if( common.isNull(_self.dataParams.city) ){
                _self.showToast("请填写所在城市");
                return;
            }
            if( common.isNull(_self.dataParams.description) ){
                _self.showToast("请填写自我描述");
                return;
            }
            console.log(this.dataParams);
            _self.submit();
            // _self.toUrl('gongzuojinli')
        },
    }
  }
</script>
<style>
  .qdtime-right .shijian .weui-cell__ft{
    text-align: left !important;
    color: #4B4B4B ;
  }
  .em .weui-cell{
    padding: 10px 0px;
  }
  .weui-cells:before{
    border-top: none !important;
  }
  .weui-cells:after {
    border-bottom: none !important;
  }

  .tianxiejianli-xiu .weui-cell_access{
     display:flex!important;
     width:100%!important;
   }

  .tianxiejianli-xiu .vux-popup-picker-value {
    text-align:left!important;
    max-width:4rem!important;
  }
  .tianxiejianli-xiu .weui-cell {
    justify-content:space-between!important;
  }
</style>
<style scoped>
  @import '../../../static/css/meow/tianxiejianli.css';
  /*选择时间*/
  .shijian{
    width: 3rem;
  }
  /*性别选ze*/
  .demo1-item {
    text-align: center;
    width: 0.8rem;
    height: 0.8rem;
  }
  .demo1-item-selected {
    position: relative;
    text-align: center;
    width:0.8rem;
    color: #ffffff;
    background:#E83B8B !important;
    z-index: 3;
  }
  .xmlx-kuang{
    width: 2rem;
  }
  .xmlx-kuang.rtl{
    /*direction: rtl;*/
  }
  .content{
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }
  .flex-content{
    padding-top: 1.2rem;
  }
  /*2018/7.17页面优化*/
  .bjtx{
    width: 1.5rem !important;
    background: url("../../../static/images/meow/bjtx.png") no-repeat;
    background-size: 100%;
    background-position: center;
    margin: auto;
  }

  .xiu-xuan{
    width: 1.16rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background: #F0F0F6;
    border-radius: 0.4rem;
    margin-right: -0.4rem;
  }
  .crty{
    width: 4rem;
  }
</style>




