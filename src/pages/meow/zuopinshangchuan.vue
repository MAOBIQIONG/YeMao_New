<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>作品上传</span>
      <div class="header-right" v-tap="{ methods:submit }">完成</div>
    </div>
    <!--编辑工作经历-->
    <div class="content content-p">
      <!--图片上传-->
      <div class="sctp">
        <div class="img-upload">
          <div class="img" v-for="(img,index) in base64Arr" :key="index" :style="{backgroundImage: 'url(' + img + ')'}">
            <div class="del-btn" v-tap="{methods:clearImgs,index:index}"></div>
          </div>
          <div class="upload-handle" v-if="base64Arr.length<9" v-tap="{ methods:triggerFile }"></div>
        </div>
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em" :time="1500"></toast>
    <loading :show="loadingShow" text="提交中"></loading>
  </div>
</template>

<script>
import {Toast,Loading} from "vux"
export default {
    components:{
        Toast,
        Loading
    },
    data: function () {
      return {
        base64Arr:[],
        // resumeParams:{},
        toastShow:false,
        toastText:"",
        dataParams:{},
        loadingShow:false,
        is_submit:false,
      }
    },
    created(){
        let _self = this;
        let user = common.getObjStorage('userInfo');
        if( !common.isNull(user._id) ){
            _self.user_id = user._id;
            _self.initData();
        } else {
            console.log('user_id is null');
            _self.$router.push({name:'login'});
        }
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
      mix(protoObject,ifNeedPropProto=false){
          let w =function(toObject){
              //以protoObject为原型以toObject属性为自有属性创建新的对象
              let d = Object.create(protoObject,Object.getOwnPropertyDescriptors(toObject))
              //将原型属性赋值于自有属性
              if(ifNeedPropProto){
                  for (var k in d){
                      d[k] = d[k]
                  }
              }
              return d;
          };
          return {
              w
          }
      },
      showToast(msg){
          this.toastShow = true;
          this.toastText = msg;
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
          setTimeout(()=>{_self.loadingShow = false},5000);
          // 避免多次点击提交按钮
          if( _self.is_submit == true ) return;
          _self.is_submit = true;
          if( _self.base64Arr.length == 0 ){
              _self.submit2();
          }else{
              uploadImg2.uploadImgs();
          }
      },
      submit2(){
          let _self = this;
          _self.dataParams.status = 1;
          _self.dataParams.is_del = 0;
          let params = {
              interfaceId:common.interfaceIds.saveDataFun,
              coll:common.collections.resumes,
              data:_self.dataParams
          };
          _self.$axios.post('/mongoApi', {
              params: params
              }, response => {
                  console.log(response);
                  var data = response.data;
                  if( data && response.code == '200' ){
                      _self.loadingShow = false;
                      _self.showToast('提交成功');
                      uploadImg2.clearImgArr(true);
                      // setTimeout(()=>{_self.toUrl('shouchangjianli');},1500)
                      setTimeout(()=>{
                        _self.$router.goBack(-4)
                      },1500)
                  } else {
                      _self.showToast('提交失败');
                  }
              });
       },
      triggerFile(){
          console.log("trigger:")
          var _self = this;
          // 首先清空图片数组
          _self.dataParams.works_imgs = [];
          // 调用相机、相册
          uploadImg2.init({
          callback:function (path) {
              console.log("path:"+path)
              _self.base64Arr.push(path);
          },
          successfun:function (path) {
              _self.dataParams.works_imgs.push(path);
              if( _self.dataParams.works_imgs.length == _self.base64Arr.length ){
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
        _self.dataParams.works_imgs.splice(index,1);
      },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/zuopinshangchuan.css';
</style>
