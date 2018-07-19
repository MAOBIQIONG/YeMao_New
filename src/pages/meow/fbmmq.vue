<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:showFun}"><img src="../../../static/images/back.png" /></div>
      <span>发表动态</span>
      <div class="header-right" v-tap="{ methods:submit }">发布</div>
    </div>
    <div class="content content-p">
      <!--留言-->
      <div class="pc-shuru2">
        <textarea v-model="params.title" class="area" maxlength="300" placeholder="请输入动态"></textarea>
        <p class="xianzhi"><span class="zs">{{300-params.title.length}}</span>/<span>300</span></p>
      </div>
      <!--图片上传-->
      <div class="sctp">
        <div class="img-upload">
          <div class="img" v-for="(img,index) in base64Arr" :key="index" :style="{backgroundImage: 'url(' + img + ')'}" v-tap="{methods:toPreviewer,pagename:'uploadImgPreviewer',src:img,index:index  }">
            <div class="del-btn" v-tap="{methods:clearImgs,index:index}"></div>
          </div>
          <div class="upload-handle" v-if="base64Arr.length<9" v-tap="{ methods:triggerFile}"></div>
          <!-- <div  v-tap="{methods:toPreviewer,pagename:'uploadImgPreviewer',src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522829879013&di=71a628cfbf77aeae198fdcc46bd40753&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D307475008%2C2549700829%26fm%3D214%26gp%3D0.jpg',index:0  }" :style="{position:'absolute',zIndex:'9',width:'50px',height:'50px',backgroundImage: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522829879013&di=71a628cfbf77aeae198fdcc46bd40753&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D307475008%2C2549700829%26fm%3D214%26gp%3D0.jpg)'}"></div> -->
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoad" :text="showLoadMsg"></loading>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="温馨提示"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">确认放弃编辑?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { Confirm,Toast,Loading,TransferDomDirective as TransferDom } from 'vux'
  import store from '@/vuex/store'
  import uploadImg2 from "../../../static/js/es6/uploadImg-more";
  export default {
    directives: {
      TransferDom
    },
    components: {
      Toast,
      Loading,
      Confirm
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
        showLoadMsg: '...',
        show:false,
      }
    },
    created: function () {
      var _self = this;
      console.log("created:")
      // 用户信息
      var userInfo = common.getObjStorage("userInfo");
      this.params.user_id = userInfo._id;
      // 清除图片缓存
      uploadImg2.clearImgArr(true);
      //接收来自预览页操作后传回的数据；
      var dataFromPreviewer = _self.$store.state.dataFromPreviewer;
      if(!common.isNull(dataFromPreviewer)){
        console.log(dataFromPreviewer);
        uploadImg2.imgArr=dataFromPreviewer.uploadImg2.imgArr;
        uploadImg2.imgBase64=dataFromPreviewer.uploadImg2.imgBase64;
        _self.base64Arr=dataFromPreviewer.self.imgBase64;
        _self.params.imgs=dataFromPreviewer.self.imgArr;
        _self.params.title = dataFromPreviewer.text;
      }
    },
    destroyed(){
      this.$store.state.dataFromPreviewer=null;
    },
    methods: {
      goback () {
        this.$router.goBack();
        setTimeout(function () {
          document.activeElement.blur();
        },100)
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toPreviewer(p){
        let _self = this;
        _self.$store.state.dataToPreviewer = {
            imgsrc:p.src,
            imageIndex:p.index,
            text:_self.params.title,
            uploadImg2:{
              imgArr:uploadImg2.imgArr,
              imgBase64:uploadImg2.imgBase64,
            },
            self:{
              imgArr: _self.params.imgs,
              imgBase64:_self.base64Arr,
            }
        }
        this.$router.push({name: p.pagename})
      },
      // toast
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        // if (msg) {
        // alert(msg)
        // }
        this.$router.goBack()
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      showFun(){
        this.show=true;
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
  /*2018/7.17页面样式重写*/
  .pc-shuru2{
    position: relative;
    width: 6.5rem !important;
    height: 3.4rem;
    margin: auto;
    margin-top: 0.2rem;
    border-bottom: 1px solid #EFEFEF;
  }
  .pc-shuru2 .area{
    width: 100%;
    height: 2.7rem;
    border: none;
    outline: medium;
    resize: none;
    color: #4B4B4B;
    font-size: 0.34rem;
  }
  .pc-shuru2 .xianzhi{
    position: absolute;
    background: #F1F1F1;
    right: 0.1rem;
    bottom: 0.2rem;
    width: 1.26rem;
    height: 0.48rem;
    line-height: 0.48rem;
    font-size:0.22rem;
    color: #5D5D5D;
    text-align: center;
    border-radius: 0.48rem;
  }
</style>
