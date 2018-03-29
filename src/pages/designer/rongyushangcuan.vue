<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{ methods:goback }"><img src="../../../static/images/back.png" /></div>
      <span>荣誉上传</span>
      <div class="header-right" v-tap="{ methods:submit }"><span>上传</span></div>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
      <div class="xmlx">
        <div class="xmlx-left">
          <span>荣誉名称</span>
        </div>
        <div class="xmlx-right">
          <input v-model="data.title" type="text" placeholder="请输入荣誉名称" maxlength="25"/>
        </div>
      </div>
      <div class="xmbt">
        <div class="xmbt-top">
          <div class="xt-left"><span>获得荣誉时间</span></div>
          <div class="xt-right">
            <!--<input type="text"placeholder="请输入荣誉时间" />-->
            <datetime v-model="data.date"class="shijian"></datetime>
          </div>
        </div>
        <div class="xmbt-bottom">
          <textarea v-model="data.description" class="xt-txt" placeholder="详细描述你的荣誉"></textarea>
        </div>
      </div>
      <div class="sctp">
        <div class="sc-top">上传图片</div>
        <div class="img-upload">
          <div class="img" v-for="(img,index) in base64Arr" :key="index" :style="{backgroundImage: 'url(' + img + ')'}">
            <div class="del-btn" v-tap="{methods:clearImgs,index:index}"></div>
          </div>
          <div class="upload-handle" v-if="base64Arr.length<9" v-tap="{ methods:triggerFile }"></div>
        </div>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Datetime, Toast } from 'vux'
  export default {
    components: {
      Datetime,
      Toast
    },
    data () {
      return {
        base64Arr:[],
        imgList:[],
        isShow:true,
        data: {
          user_id: '',
          title: '',
          description: '',
          date: '',
          like:0,
          collection: 0,
          comments: 0,
          type: 1,
          cover: '',
          imgs: [],
          is_del:0
        },
        curr_date:'',
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      // 用户信息
      this.userInfo = common.getObjStorage("userInfo");
      this.data.user_id = this.userInfo._id;
      // 初始化日期
      var timeStamp = common.getCurrentTimeStamp();
      var dateStr = common.timeStamp2String(timeStamp,"ymd");
      this.data.date=dateStr;
      this.curr_date = dateStr;
      // 清除图片缓
      uploadImg2.clearImgArr(true);
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      getDefultImg(path){
        return common.getDefultImg(path)
      },
      //上传图片
      triggerFile(){
        console.log("trigger:")
        var _self = this;
        // 首先清空图片数组
        _self.data.imgs = [];
        // 调用相机、相册
        uploadImg2.init({
          callback:function (path) {
            console.log("path:"+path)
            _self.base64Arr.push(path);
          },
          successfun:function (path) {
            _self.data.imgs.push(path);
            console.log("path:"+path)
            if( _self.data.imgs.length == _self.base64Arr.length ){
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
        _self.data.imgs.splice(index,1);
      },
      // 提交图片
      submit(){
        console.log("submit:")
        var _self = this;
        if( common.isNull(_self.data.user_id) ){
          _self.showToast("未成功获取用户信息!");
          return
        }
        if( common.isNull(_self.data.title) ){
          _self.showToast("请输入荣誉名称!");
          return
        }
        if( common.isNull(_self.data.date) ){
          _self.showToast("请选择获取荣誉时间!");
          return
        }
        if( common.dateCompare(_self.data.date,_self.curr_date) == false ){
          _self.showToast("请重新确认时间!");
          return
        }
        if( common.isNull(_self.data.description) == true ){
          _self.showToast("请详细描述你的荣誉!");
          return
        }
        // 避免多次点击提交按钮
        if( _self.is_submit == true ) return;
        _self.is_submit = true;
        if( _self.base64Arr.length == 0 ){
          _self.submit2();
        }else{
          uploadImg2.uploadImgs();
        }
      },
      // 提交荣誉
      submit2(){
        console.log("submit2:")
        var _self = this;
        if( _self.data.imgs.length > 0 ){
          _self.data.cover = _self.data.imgs[0];
        }
        var params = {
          //批量添加
          interfaceId:common.interfaceIds.insertData,
          coll:common.collections.personalChw,
          data:_self.data
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // 提交标识
          _self.is_submit = true;
          var data = response.data;
          if( data && response.code == '200' ){
            // this.$store.state.employerRefreshMark = 1;
            _self.showToast("上传成功！");
            setTimeout(function () {
              _self.goback();
            },1000)
          }else{
            _self.showToast("上传失败！");
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/rongyushangchuan.css';
  .shijian{
    width: 1.9rem;
  }
</style>
