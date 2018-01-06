<template>
  <div>
    <!--头部导航-->
    <div class="header header1">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
    </div>
    <div class="content">
      <div class="bottom">
          已结束
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {

      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
    }
  }
</script>
<style scoped>
.header1{
    background-color:transparent;
    border: none;
}
.bottom{
  position: fixed;
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  bottom: 0;
  left: 0;
  background-color: #ededed;
  font-size: 0.22rem;
  text-align: center;
  color: white;
}
</style>
