<template>
  <div class="huodong">
    <!--活动列表-->
    <div class="content">
      <div class="hd-list">
        <img src="../../../static/images/bj.jpg">
      </div>
      <div class="hd-list">
        <img src="../../../static/images/bj.jpg">
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
  @import '../../assets/css/my/mine-huodong.css';
</style>
