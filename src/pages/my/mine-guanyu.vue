<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>关于夜猫</span>
    </div>
    <div class="content content-p">
      <div class="log clear">
        <div class="log-img">
          <img src="../../../static/images/logo.png"/>
        </div>
        <p v-if="version!=''">版本号：{{version}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        version:''
      }
    },
    created:function () {
      var _self = this;
      if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
        // 获取本地应用资源版本号
        plus.runtime.getProperty(plus.runtime.appid,function(inf){
          _self.version = inf.version;
        });
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
  @import '../../../static/css/my/mine-guanyu.css';
</style>
