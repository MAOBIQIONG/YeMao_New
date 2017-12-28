<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>修改昵称</span>
      <div class="header-right">确定</div>
    </div>
    <div class="setp-content">
      <div class="ymm">
        <div class="left"><span>昵称</span></div>
        <div class="right"><input type="text" placeholder="输入新昵称"/></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/my/set-nichen.css';
</style>
