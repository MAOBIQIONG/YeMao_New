<template>
  <div>
    <div class="box">
      <!--头部导航-->
      <div class="header">
        <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
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
    components: {

    },
    mounted: function () {
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl(name){
        this.$router.push({name:name});
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    background: transparent;
    border-bottom: none;
  }
  .box{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../../static/images/share/feedback.png");
    background-size:100% 100%;
    background-repeat: no-repeat;
  }
</style>
