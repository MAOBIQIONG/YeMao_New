<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>平台认证</span>
      <div class="header-right" v-tap="{methods:submit}">下一步</div>
    </div>
    <div class="content content-p">
      <!--流程-->
      <div class="banner">
         <img src="../../../static/images/designer/renzheng_02.png"/>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>职称证书</span>
          </div>
          <div class="qdtime-right">
            <input v-model="user.certificate_name" type="text"placeholder="请输入证件名称" />
          </div>
        </div>
      </div>
      <div class="shangchuan" v-tap="{ methods:triggerFile }">
        <div class="sc"><img :src="getDefultImg(imgs[0].img)" /></div>
        <p>请上传职称证书</p>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  export default {
    components: {
      Toast
    },
    data () {
      return {
        user: {
          certificate_name:"",
          authenticating_state:3,
        },
        imgs:[{
          img:'',
          remark:'请上传职称证书',
          type:4,
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
        _self.user.certificate_name = _self.userInfo.certificate_name;
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
        return common.getAvatar(img,'./static/images/employer/j.png');
      },
      //上传图片
      triggerFile(param){
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
          where: {user_id: _self.user_id,type: 4}
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
        if( common.isNull(_self.user.certificate_name) ){
          _self.showToast('请输入证书职称！');
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
              _self.userInfo.certificate_name = _self.user.certificate_name;
              _self.userInfo.authenticating_state = _self.user.authenticating_state;
              common.setStorage("userInfo",_self.userInfo);
              setTimeout(function () {
                _self.toUrl('tijiaoshenhe');
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
</style>
