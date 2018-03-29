<template>
  <div class="">
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
    </div>
    <div class="zc-piaoti">
      <span>欢迎注册成为夜猫会员</span>
    </div>
    <div class="register-box">
      <div class="moudle-box" :class="tabIndex==0?'':'transform-right'">
        <div class="register-moudle1" ref="moudle1">
          <register1 @upup="upup"></register1>
        </div>
        <div class="register-moudle2" ref="moudle2">
          <register2 @upup="upup"></register2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入子组件
  import register1 from '../../components/my/register1';
  import register2 from '../../components/my/register2';
  export default {
    components: {  // 声明子组件
      register1,
      register2
    },
    data () {
      return {
        tabIndex: 0,
      }
    },
    methods: {
      goback() {
        var _self = this;
        if( _self.tabIndex == 0 ){
          _self.$router.goBack();
        }else{
          _self.tabIndex = 0;
        }
      },
      toUrl(name){
        this.$router.push({name:name});
      },
      upup(index){
        console.log("upup:"+index)
        this.tabIndex = index==0 ? 1 : 0;
      }

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .zc-piaoti {
    width: 100%;
    height: 1.9rem;
    display: inline-block;
    margin-top: 0.8rem;
  }

  .zc-piaoti span {
    width: 2.1rem;
    font-size: 0.44rem;
    margin-top: 0.54rem;
    color: #f64299;
    margin-left: 0.6rem;
  }
  /************/
  .register-box{
    width: 100%;
    overflow: hidden;
  }
  .moudle-box{
    height: 8rem;
    width: 200%;
    transform: translate3d(0px, 0px, 0px); transition: 300ms;
  }
  .register-moudle1 {
    float: left;
    width: 50%;
    height: 100%;
    padding-top: .5rem;
  }
  .register-moudle2 {
    float: right;
    width: 50%;
    height: 100%;
    padding-top: .5rem;
  }
  .transform-left{
    transform: translate3d(50%, 0px, 0px); transition: 300ms;
  }
  .transform-right{
    transform: translate3d(-50%, 0px, 0px); transition: 300ms;
  }
</style>
