<template>
  <div>
    <div  style="height: 44px;line-height: 44px;width: 100%;background: #000;color: #fff;text-align: left;">
      <span @click="goback" style="padding: 0px 15px;">返回</span>
    </div>
    <group>
      <cell is-link title="pullup" link="details">{{content}}</cell>
    </group>

    <x-button type="primary">show another list</x-button>
  </div>
</template>



<script>
  import { XButton, Group, Cell } from 'vux'

  export default {
    data () {
      return {
        content: 'indexDetails'
      }
    },
    components: {
      XButton,
      Group,
      Cell
    },
    methods: {
      goback () {
        this.$router.goBack()
      }
    }
//    ,
//    activated () { // 请求数据
//      // this.doSomething()
//      console.log(this.$route.fullPath)
//      console.log(this.$route.meta.keepAlive)
//      this.content = 'indexDetails'
//    }
  }
</script>

<style scoped>
  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }
</style>
