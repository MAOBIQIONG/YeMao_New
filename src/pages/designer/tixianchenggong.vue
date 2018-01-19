<template>
  <div >
    <tixianchenggong :tixianchenggong="recommendArray" heading="提现成功"></tixianchenggong>
  </div>
</template>

<script>
  import tixianchenggong from '../../components/tixianchenggong/tixianchenggong.vue'
  export default {
    // 引入组件
    components:{
      tixianchenggong,
    },
    data () {
      return {
        recommendArray:'提现成功',
      }
    },
    mounted: function () {
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
  @import '../../../static/css/designer/tixianchenggong.css';
</style>
