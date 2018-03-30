<template>
  <div>
    <div class="box">
      <!--头部导航-->
      <div class="header">
        <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      </div>
      <div class="anniu" v-tap="{ methods:toUrl , pagename:'shareregistration'}">
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
    background: url("../../../static/images/share/share1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .anniu {
    position: absolute;
    width: 2.5rem;
    height: 0.5rem;
    background: url("../../../static/images/share/djxq.png");
    background-size: 100%;
    background-repeat: no-repeat;
    bottom: .5rem;
    left: 2.5rem;
  }
</style>
