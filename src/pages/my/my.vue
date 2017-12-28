<template>
  <div class="my">
    <!--<div v-tap="{ methods:cgLink , pagename:'vuxtest' }" class="msg">{{ msg }}</div>-->
    <!--头部-->
    <div class="mine-top">
      <div class="shezhi" v-tap="{ methods:toSet }"></div>
      <div class="tu-nicheng">
        <div class="touxiang" v-tap="{ methods:modifyAvatar }">
          <img :src="userInfo.img || defultAvatar" />
        </div>
        <div class="nicheng"><span>{{userInfo.user_name || tips}}</span></div>
      </div>
    </div>
    <!--消息栏-->
    <div class="msage-top">
      <ul>
        <li>
          <p>
            <img src="../../../static/images/designer/jianzhusheji.png" />
          </p>
          <p>消息</p>
        </li>
        <li @click="toUrl('mineshouchang')">
          <p>
            <img src="../../../static/images/designer/jianzhusheji.png" />
          </p>
          <p>收藏</p>
        </li>
        <li @click="toUrl('minepinlun')">
          <p>
            <img src="../../../static/images/designer/jianzhusheji.png" />
          </p>
          <p>评论中心</p>
        </li>
        <li>
          <p>
            <img src="../../../static/images/designer/jianzhusheji.png" />
          </p>
          <p>喵喵圈</p>
        </li>
      </ul>
    </div>
    <!--我的消息-->
    <div class="my-msg">
      <div class="liebiao">
        <div class="list"@click="toUrl('minehuodong')">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">我参与的活动</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list tz"@click="toUrl('minejianli')">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">简历中心</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list"@click="toUrl('minewenda')">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">我的问答</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
      </div>
    </div>
    <!--意见反馈-->
    <div class="yijian">
      <div class="liebiao">
        <div class="list">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">客服中心</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">意见反馈</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div id="qchc" class="list">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">清除缓存</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list"@click="toUrl('mineguanyu')">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">关于夜猫</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
      </div>
    </div>
    <!-- 清除缓存弹窗-->
    <div class="pop">
      <div class="pop-bottom">
        <div class="anniu"><span>清除缓存</span></div>
        <div id="qx" class="anniu"><span style="color: #0076ff;">取消</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../../static/common';
  export default {
    data () {
      return {
        userInfo:{},
        defultAvatar:"../../../static/images/bj.jpg",
        tips:"点击登录"
      }
    },
    created: function () {
      console.log("created:")
      this.tanchuang();
    },
    activated: function () {
      console.log("activated:")
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo");
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toSet: function () {
        var _self = this;
        if( _self.userInfo._id != null ){
          _self.toUrl('set');
        }else{
          _self.toUrl('login');
        }
      },
      //		弹窗
      tanchuang(){
        $("#qchc").click(function(){
          $(".pop").show();
        });
        $("#qx").click(function(){
          $(".pop").hide();
        });
      },

      modifyAvatar: function () {
        var _self = this;
        console.log("_self.userInfo:"+_self.userInfo._id)
        if( _self.userInfo._id != null ){
          console.log("修改头像。。")
        }else{
          _self.toUrl('login');
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/my/mine.css';
</style>
