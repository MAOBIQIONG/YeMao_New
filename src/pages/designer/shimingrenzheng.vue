<template>
  <div class="smrz">
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>实名认证</span>
      <div class="header-right" v-tap="{methods:submit}">提交</div>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>真实姓名</span>
          </div>
          <div class="qdtime-right">
            <input v-model="user.real_name" type="text" placeholder="请输入真实姓名" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>身份证号码</span>
          </div>
          <div class="qdtime-right">
            <input v-model="user.id_number" type="text"placeholder="请输入身份证号" />
          </div>
        </div>
      </div>

      <div class="shangchuan" v-for="(item,index) in imgs" v-tap="{ methods:triggerFile,index:index }">
        <div class="sc"> <img :src="getDefultImg(item.img)" /></div>
        <p>{{item.remark}}</p>
      </div>
      <!--<div class="shangchuan" v-tap="{ methods:triggerFile }">-->
        <!--<div class="sc"> <img src="../../../static/images/employer/j.png" /></div>-->
        <!--<p>请上传手持身份证正面照</p>-->
      <!--</div>-->
      <!--<div class="shangchuan" v-tap="{ methods:triggerFile }">-->
        <!--<div class="sc"> <img src="../../../static/images/employer/j.png" /></div>-->
        <!--<p>请上传身份证正面照</p>-->
      <!--</div>-->
      <!--<div class="shangchuan" v-tap="{ methods:triggerFile }">-->
        <!--<div class="sc"> <img src="../../../static/images/employer/j.png" /></div>-->
        <!--<p>请上传身份证背面照</p>-->
      <!--</div>-->
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  import uploadImg from "../../../static/js/es6/uploadImg";
  export default {
    components: {
      Toast
    },
    data () {
      return {
        imgIndex:0,
        user:{
          real_name:"",
          id_number:"",
          authenticating_state:1,
        },
        imgs:[{
          img:'',
          remark:'请上传手持身份证正面照',
          type:0,
        },{
          img:'',
          remark:'请上传身份证正面照',
          type:1,
        },{
          img:'',
          remark:'请上传身份证背面照',
          type:2,
        }],
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      // console.log("created:")
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      if( common.isNull(_self.userInfo._id) != true ){
        _self.user_id = _self.userInfo._id;
        _self.user.real_name = _self.userInfo.real_name;
        _self.user.id_number = _self.userInfo.id_number;
      }
      _self.initData();
    },
    methods: {
      /**************************************/
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      // 获取默认图片
      getDefultImg(img){
        return common.getDefultImg(img, './static/images/employer/j.png');
      },
      //上传图片
      triggerFile(params){
        var _self = this;
        uploadImg.init({
          callback: function (path) {
            if( params.index < 3 ){
              _self.imgs[params.index].img = path;
            }
          }
        })
      },

      /*************************************/
      // 初始化
      initData(){
        var _self = this;
        if( common.isNull(_self.user_id) ){
          return;
        }

        var params = {
          interfaceId:common.interfaceIds.queryData,
          coll:common.collections.userCertificates,
          where: {user_id: _self.user_id,type: {$lte :2}}
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response)
          var data = response.data
          if( data && data.length > 0 ){
            data.foreach(function (item,index) {
              if( index < 3 ){
                _self.imgs[index].img = data[index].img;
              }
            })
          }
        })
      },

      // 提交
      submit(){
        var _self = this;
        if( common.isNull(_self.user_id) ){
          return;
        }
        if( common.isNull(_self.user.real_name) ){
          _self.showToast('请输入真实姓名！');
          return;
        }
        if( common.isNull(_self.user.id_number) ){
          _self.showToast('请输入身份证号码！');
          return;
        }else if( !common.checkIdNumber(_self.user.id_number) ){
          _self.showToast('身份证号填写有误！');
          return;
        }
        if( common.isNull(_self.imgs[0].img) ){
          _self.showToast(_self.imgs[0].remark);
          return;
        }
        if( common.isNull(_self.imgs[1].img) ){
          _self.showToast(_self.imgs[1].remark);
          return;
        }
        if( common.isNull(_self.imgs[2].img) ){
          _self.showToast(_self.imgs[2].remark);
          return;
        }

        _self.imgs.forEach(function (item, index) {
          item.user_id = _self.user_id;
        });
        var params = {
          interfaceId:common.interfaceIds.setCertification,
          user_id:_self.user_id,
          user:_self.user,
          imgs:_self.imgs,
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response)
          var data = response.data
          if( data ){
            if( data.code==200 && data.code1==200 ){
              _self.showToast('提交成功！');
              _self.userInfo.real_name = _self.user.real_name;
              _self.userInfo.id_number = _self.user.id_number;
              _self.userInfo.authenticating_state = _self.user.authenticating_state;
              common.setStorage("userInfo",_self.userInfo);
              setTimeout(function () {
                _self.goback();
              },1000);
            }else{
              _self.showToast('提交失败！');
            }
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/shimingrenzheng.css';
  .smrz{
    background: #f2f2f2;
  }
</style>
