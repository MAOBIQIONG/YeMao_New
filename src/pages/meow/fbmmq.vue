<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>发表动态</span>
      <div class="header-right" v-tap="{ methods:submit }">发布</div>
    </div>
    <div class="content content-p">
      <!--留言-->
      <div class="pc-shuru">
        <textarea v-model="params.title" class="area" maxlength="300" placeholder="请输入问题描述"></textarea>
        <p class="xianzhi"><span class="zs">{{300-params.title.length}}</span>/<span>300</span></p>
      </div>
      <!--图片上传-->
      <div class="sctp">
        <div class="img-upload">
          <div class="img" v-for="img in params.imgs" :style="{backgroundImage: 'url(' + img + ')'}"></div>
          <div class="upload-handle" v-if="params.imgs.length<9" v-tap="{ methods:triggerFile }"></div>
        </div>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  import store from '@/vuex/store'
  export default {
    components: {
      Toast
    },
    data: function () {
      return {
        params:{
          user_id: '',
          title: '',
          like: 0,
          comments: 0,
          is_del: 0,
          imgs:['./static/images/bj.jpg','./static/images/bj.jpg','./static/images/bj.jpg']
        },
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      console.log("created:")
      // 用户信息
      var userInfo = common.getObjStorage("userInfo");
      this.params.user_id = userInfo._id;
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      // toalst
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      //上传图片
      triggerFile(){
        console.log("trigger:")
        var _self = this;
        uploadImg2.init({
          callback:function (path) {
            console.log("path:"+path)
            _self.imgs.push(path);
          }
        });
      },

      submit(){
        console.log("submit:")
        var _self = this;
        if( common.isNull(_self.params.user_id) ){
          _self.showToast("未成功获取用户信息!");
          return
        }
        if( common.isNull(_self.params.title) ){
          _self.showToast("请输入问题描述!");
          return
        }

        var params = {
          //批量添加
          interfaceId: common.interfaceIds.insertData,
          coll: common.collections.meowCircle,
          data: _self.params
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(JSON.stringify(response))
          var data = response.data;
          if( data ){
            // this.$store.state.indexRefreshMark = 1;
            var result = data.result || {};
            if( result.ok>0 && result.n>0  ){
              _self.showToast("发布成功！");
              setTimeout(function () {
                _self.goback();
              },1000)
            }else{
              _self.showToast("发布失败！");
            }
          }
        })
      }

    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/fbwd.css';
  .img-upload{
    width: 6.9rem;
    margin: 0 auto;
  }
</style>
