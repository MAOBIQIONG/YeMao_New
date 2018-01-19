<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>平台认证</span>
      <div class="header-right" v-tap="{methods:submit}">下一步</div>
    </div>
    <!--发布订单内容-->
    <div class="content wrz">
      <!--流程-->
      <div class="banner">
         <img src="../../../static/images/designer/renzheng_01.png"/>
      </div>
      <div class="tixin" v-if="hide==false">
        <div class="tx-left">
          <img src="../../../static/images/designer/gantan.png"/>
        </div>
        <span>我们将保护你的隐私，请务必确保真实有效的信息</span>
        <div class="tx-right" v-tap="{methods:hideFun}">
          <img src="../../../static/images/designer/x.png"/>
        </div>
      </div>
      <div class="ys-time">
        <!--<div class="qdtime">-->
          <!--<div class="qdtime-left">-->
            <!--<span>手机号码</span>-->
          <!--</div>-->
          <!--<div class="qdtime-right">-->
            <!--<input type="text"placeholder="请输入手机号" />-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="qdtime">-->
          <!--<div class="qdtime-left">-->
            <!--<span>真实姓名</span>-->
          <!--</div>-->
          <!--<div class="qdtime-right">-->
            <!--<input type="text"placeholder="名字" />-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="qdtime">-->
          <!--<div class="qdtime-left">-->
            <!--<span>身份证号</span>-->
          <!--</div>-->
          <!--<div class="qdtime-right">-->
            <!--<input type="text"placeholder="请输入身份证号" />-->
          <!--</div>-->
        <!--</div>-->
        <div class="qdtime">
          <div class="qdtime-left">
            <span>学校名称</span>
          </div>
          <div class="qdtime-right">
            <input v-model="user.school_name" type="text" placeholder="请输入学校名称" />
          </div>
        </div>
      </div>
      <div class="shangchuan" v-tap="{ methods:triggerFile }">
        <div class="sc"> <img :src="getDefultImg(imgs[0].img)" /></div>
        <p>请上传学历证书</p>
      </div>
    </div>
    <uploadSingle @upup="change"></uploadSingle>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  import uploadSingle from '../../components/upload/image-upload-single.vue'
  export default {
    components: {
      uploadSingle,
      Toast
    },
    data () {
      return {
        hide: false,
        user: {
          school_name:"",
        },
        imgs:[{
          img:'',
          remark:'请上传学历证书',
          type:3,
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
        _self.user.school_name = _self.userInfo.school_name;
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
      // 点击x隐藏
      hideFun(){
        this.hide=true;
      },
      // 获取默认图片
      getDefultImg(img){
        return common.getAvatar(img,'./static/images/employer/j.png');
      },
      //上传图片
      triggerFile(param){
        document.getElementById("upload").click();
      },

      // 选择图片回调
      change(path){
        // console.log("change path:"+path);
        var _self = this;
        _self.imgs[0].img = path;
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
          where: {user_id: _self.user_id,type: 3}
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response)
          var data = response.data
          if( data && data.length > 0 ){
            _self.imgs = data;
          }
        })
      },

      // 提交
      submit(){
        var _self = this;
        if( common.isNull(_self.user_id) ){
          return;
        }
        if( common.isNull(_self.user.school_name) ){
          _self.showToast('请输入学校名称！');
          return;
        }
//        if( common.isNull(_self.imgs[0].img) ){
//          _self.showToast(_self.imgs[0].remark);
//          return;
//        }
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
              _self.userInfo.school_name = _self.user.school_name;
              common.setStorage("userInfo",_self.userInfo);
              setTimeout(function () {
                _self.toUrl('zhichengrenzheng');
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
  @import '../../../static/css/designer/pingtairenzheng.css';
  .content{
    padding-top: 1.2rem;
  }
</style>
