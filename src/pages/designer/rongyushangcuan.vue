<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{ methods:goback }"><img src="../../../static/images/back.png" /></div>
      <span>荣誉上传</span>
      <div class="header-right" v-tap="{ methods:submit }"><span>上传</span></div>
    </div>
    <!--发布订单内容-->
    <div class="fb-content">
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
        <div class="st-bottom" v-if="isShow" v-tap="{ methods:triggerFile }">
          <img src="../../../static/images/employer/j.png" />
        </div>
        <div class="img-body" v-for="img in imgList">
          <img :src="img.src" />
        </div>
        <imageUpload :img-arr.sync="imgList"></imageUpload>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import imageUpload from '../../components/upload/image-upload.vue'
  import { Datetime, Toast } from 'vux'
  export default {
    components: {
      imageUpload,
      Datetime,
      Toast
    },
    data () {
      return {
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
          cover: "./static/images/img/1.jpg",
          imgs: ["./static/images/img/1.jpg","./static/images/img/2.jpg","./static/images/img/3.jpg"],
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
      //上传图片
      triggerFile(){
        console.log("trigger:")
        document.getElementById("img-upload").click();
      },
      // 提交
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
        console.log(_self.curr_date+":"+_self.data.date)
        if( common.dateCompare(_self.data.date,_self.curr_date) == false ){
          _self.showToast("请重新确认时间!");
          return
        }
        if( common.isNull(_self.data.description) == true ){
          _self.showToast("请详细描述你的荣誉!");
          return
        }
        var params = {
          //批量添加
          interfaceId:common.interfaceIds.insertData,
          coll:common.collections.personalChw,
          data:_self.data
        }
        console.log(JSON.stringify(params))
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(JSON.stringify(response))
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/rongyushangchuan.css';
</style>
