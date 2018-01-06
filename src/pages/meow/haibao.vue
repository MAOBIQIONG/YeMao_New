<template>
  <div>
    <!--头部导航-->
    <div class="header header1">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <div class="header-right fx"><img src="../../../static/images/fx.png" /></div>
    </div>
    <div class="content">
      <div class="bottom">
        <div class="anniu">
          已结束
        </div>
        <p class="ckxq"@click="toUrl('haibaoxq')"><a>查看详情></a></p>
        <p><span>0</span>人已报名</p>
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
.fx{
    width:0.6rem;
    height: 0.6rem;
    margin-top: 0.11rem;
    background-color: rgba(0,0,0,.3);
    border-radius:50%;
}
.fx img{
  margin-left: 0;
  margin-bottom: 0.05rem;
}
.content{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url("../../../static/images/bj.jpg");
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
}
.bottom{
  position: fixed;
  width: 100%;
  height: 2.4rem;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.7);
  font-size: 0.22rem;
  text-align: center;
  color: white;
}
.anniu{
  width: 2rem;
  height: 0.6rem;
  border-radius: 0.1rem;
  line-height: 0.6rem;
  background-color: #ececec;
  margin:0.3rem auto;
}
.ckxq a{
  text-decoration:underline ;
}
.bottom p{
  line-height: 0.5rem;
}
</style>
