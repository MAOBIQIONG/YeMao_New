<template>
  <div>
    <div class="box">
      <!--头部导航-->
      <div class="header">
        <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      </div>
      <div class="anniu" v-tap="{ methods:toUrl , pagename:'renzheng'}">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    components: {},
    mounted: function () {
    },
    methods: {
      goback() {
        this.$router.goBack()
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
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

  .box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../../static/images/share/carousel.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .anniu {
    position: absolute;
    width: 2.5rem;
    height: 1.2rem;
    background: url("../../../static/images/share/wszl.png");
    background-size: 100%;
    background-repeat: no-repeat;
    bottom: 1.4rem;
    left: 2.25rem;
  }
</style>
