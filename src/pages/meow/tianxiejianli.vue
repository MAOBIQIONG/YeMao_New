<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>填写简历</span>
      <div class="header-right" @click="nextStep()">下一步</div>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
      <div class="touxiang">
           <div class="tu" v-tap="{ methods:modifyAvatar}" :style="{backgroundImage:`url(${checkAvatar(dataParams.img)})`}">
               <img src="../../../static/images/meow/xiangji.png" v-if="isNull(dataParams.img)"/>
            </div>
            <p>上传头像</p>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>姓名</span>
          </div>
          <div class="qdtime-right">
            <input v-model="dataParams.real_name" type="text" placeholder="请输入姓名" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>性别</span>
          </div>
          <div class="qdtime-right">
            <checker v-model="dataParams.gender" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected">
              <checker-item value="男">男</checker-item>
              <checker-item value="女">女</checker-item>
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
            <datetime v-model="dataParams.birthday" class="shijian" placeholder="请选择生日" style="padding-right:0" :min-year="1949"></datetime>
          </div>
        </div>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>毕业院校</span>
          </div>
          <div class="qdtime-right">
            <input v-model="dataParams.school_name" type="text" placeholder="请输入毕业院校" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>设计类型</span>
          </div>
          <div class="qdtime-right">
            <select class="xmlx-kuang" v-model="dataParams.type">
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
            <input v-model="dataParams.education" type="text" placeholder="请输入最高学历" />
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
          <div class="qdtime-right"style="line-height:normal">
            <x-input name="email" placeholder="请输入邮箱地址" is-type="email" text-align="right" v-model="dataParams.email"></x-input>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>所在城市</span>
          </div>
          <div class="qdtime-right">
            <group class="xmlx-kuang">
              <!-- <x-address :placeholder="'请选择城市'" @on-hide="logHide" @on-show="logShow" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="params.city" style="height:1rem;line-height:1rem;"></x-address> -->
                <x-address :placeholder="'请选择城市'" title="" :list="addressData" hide-district value-text-align="right" v-model="dataParams.city" style="height:1rem;line-height:1rem;"></x-address>
            </group>
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" maxlength="300" placeholder="请输入个人描述" v-model="dataParams.description"></textarea>
        <p class="xianzhi"><span class="zs">300</span>/<span>300</span></p>
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em"></toast>
    <loading :show="loadingShow" text="提交中"></loading>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data, Datetime, Group, Checker, CheckerItem, XInput ,Toast,Loading } from 'vux'
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
            value3: ['中山市'],
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
                city:[],
                description:"",
                status:0,
            },
            toastShow:false,
            toastText:"",
            loadingShow:false,
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
      this. wzxz()
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
            var picCamera = "data:image/gif;base64,R0lGODlhAQABAIAAAPLy8gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
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
                    }
                });
        },
        submit(){
          let _self = this;
          _self.loadingShow = true;
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
        }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/tianxiejianli.css';
  .shijian{
    width: 1.9rem;
    text-align:right;
  }
  /*性别选ze*/
  .demo1-item {
    text-align: center;
    width: 0.8rem;
    height: 0.8rem;
  }
  .demo1-item-selected {
    text-align: center;
    width:0.8rem;
    color: #f65aa6;
  }
  .xmlx-kuang.rtl{
        direction: rtl;

  }
    .weui-cell{
        padding-right:0!important;
    }
</style>


