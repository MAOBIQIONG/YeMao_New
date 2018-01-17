<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>修改昵称</span>
      <div class="header-right"@click="submit">确定</div>
    </div>
    <div class="setp-content">
      <div class="ymm">
        <div class="left"><span>昵称</span></div>
        <div class="right"><input type="text" placeholder="输入新昵称"/></div>
      </div>
    </div>
    <toast v-model="showMark" type="text" text="提交成功"width="3rem"></toast>
  </div>
</template>

<script>
  import { Toast} from 'vux'
  export default {
    components: {
      Toast,
    },
    data () {
      return {
        showMark: false,
      }
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      //弹窗
      submit(){
        this.showMark = true;
        var _self = this;
        setTimeout(function () {
          _self.toUrl('my');
        },1000)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/set-nichen.css';
</style>
