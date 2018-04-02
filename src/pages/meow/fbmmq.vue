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
        <textarea v-model="params.title" class="area" maxlength="300" placeholder="请输入动态"></textarea>
        <p class="xianzhi"><span class="zs">{{300-params.title.length}}</span>/<span>300</span></p>
      </div>
      <!--图片上传-->
      <div class="sctp">
        <div class="img-upload">
          <div class="img" v-for="(img,index) in base64Arr" :key="index" :style="{backgroundImage: 'url(' + img + ')'}" v-tap="{methods:toPreviewer,pagename:'uploadImgPreviewer',imgsrc:img  }">
            <div class="del-btn" v-tap="{methods:clearImgs,index:index}"></div>
          </div>
          <div class="upload-handle" v-if="base64Arr.length<9" v-tap="{ methods:triggerFile }"></div>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoad" :text="showLoadMsg"></loading>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast,Loading,TransferDomDirective as TransferDom } from 'vux'
  import store from '@/vuex/store'
  import uploadImg2 from "../../../static/js/es6/uploadImg-more";
  export default {
    directives: {
      TransferDom
    },
    components: {
      Toast,
      Loading
    },
    store,
    data: function () {
      return {
        base64Arr:[],
        params:{
          user_id: '',
          title: '',
          like: 0,
          comments: 0,
          is_del: 0,
          imgs:[]
        },
        is_submit: false,
        showMark:false,
        showMsg:"",
        showLoad: false,
        showLoadMsg: '...'
      }
    },
    created: function () {
      console.log("created:")
      // 用户信息
      var userInfo = common.getObjStorage("userInfo");
      this.params.user_id = userInfo._id;
      // 清除图片缓存
      uploadImg2.clearImgArr(true);
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toPreviewer(params){
        common.setStorage('imageUrl',params.imgsrc);
        this.$router.push({name: params.pagename})     
      },
      // toast
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      // loading
      showLoading() {
        var _self = this;
        _self.showLoad = true;
        setTimeout(() => {
          _self.showLoad = false;
        }, 2000)
      },
      //上传图片
      triggerFile(){
        console.log("trigger:")
        var _self = this;
        // 首先清空图片数组
        _self.params.imgs = [];
        // 调用相机、相册
        uploadImg2.init({
          callback:function (path) {
            console.log("path:"+path)
            _self.base64Arr.push(path);
          },
          successfun:function (path) {
            _self.params.imgs.push(path);
            console.log("path:"+path)
            if( _self.params.imgs.length == _self.base64Arr.length ){
              uploadImg2.clearImgArr(true);
              _self.submit2();
            }
          },
        });
      },
      // 清除
      clearImgs(params){
        var _self = this;
        var index = common.checkInt(params.index);
        console.log("clearImgs:"+index);
        uploadImg2.imgArr.splice(index,1);
        uploadImg2.imgBase64.splice(index,1);
        _self.base64Arr.splice(index,1);
        _self.params.imgs.splice(index,1);
      },

      submit(){
        console.log("submit:")
        var _self = this;

        if( common.isNull(_self.params.user_id) ){
          _self.showToast("未成功获取用户信息!");
          return
        }
        if( common.isNull(_self.params.title) ){
          _self.showToast("请输入动态!");
          return
        }
        // 避免多次点击提交按钮
        if( _self.is_submit == true ) return;
        _self.is_submit = true;
        // 设置加载动画
        _self.showLoad = true;
        setTimeout(function () {
          _self.showLoad = false;
        },5000)
        if( _self.base64Arr.length == 0 ){
          _self.submit2();
        }else{
          uploadImg2.uploadImgs();
        }
      },

      submit2(){
        var _self = this;
        var params = {
          //批量添加
          interfaceId: common.interfaceIds.insertData,
          coll: common.collections.meowCircle,
          data: _self.params
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // 取消加载动画
          _self.showLoad = false;
          // 提交标识
          _self.is_submit = true;
          // 返回数据
          var data = response.data;
          if( data ){
            // 刷新喵喵圈首页
            _self.$store.state.meowRefreshMark = 1;
            var result = data.result || {};
            if( result.ok>0 && result.n>0  ){
              _self.showToast("发布成功！");
              uploadImg2.clearImgArr(true);
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
  .pc-shuru{
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
</style>
