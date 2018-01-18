<template>
  <div class="">
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png"/></div>
    </div>
    <div class="page">
      <img src="../../../static/images/shuju.png"/>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    created: function () {

    },
    methods: {
      goback() {
        this.$router.goBack();
      },
    }
  }
</script>

<style scoped>
.page{
  position: fixed;
  width: 4.5rem;
  left:1.5rem;
  top: 3rem;
}
.page img{
  width: 100%;
}
</style>
