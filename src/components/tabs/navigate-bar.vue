<template>
  <yd-tabbar fixed="true" activeColor="deeppink" color="#929292" class="tabs" active-class="clo-theme">
    <yd-tabbar-item title="首页" link="index" class="item-index" active></yd-tabbar-item>
    <yd-tabbar-item title="雇主" link="employer" class="item-employer"></yd-tabbar-item>
    <yd-tabbar-item title="喵喵圈" link="meow" class="item-meow"></yd-tabbar-item>
    <yd-tabbar-item title="设计师" link="designer" class="item-designer"></yd-tabbar-item>
    <yd-tabbar-item title="我的" link="my" class="item-my"></yd-tabbar-item>
  </yd-tabbar>
</template>

<script type="text/babel">
  import common from '../../../static/common.js'
  export default {
    name: 'navigate-bar',
    data () {
      return {}
    },
    method: {
      removeActive () {
        let items = document.getElementsByName('yd-tabbar-item')
        alert(items.length)
        if (items && items.length > 0) {
          for (let i = 0; i < items.length; i++) {
            common.removeClass(items[i], 'yd-tabbar-active')
          }
        }
      }
    }
  }
</script>

<style scoped>
  .clo-theme{color: deeppink !important;}
  .tabs{}
  .tabs .item-index{
    background: url('../../../static/images/index.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
  .tabs .item-employer{
    background: url('../../../static/images/employer.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
  .tabs .item-meow{
    background: url('../../../static/images/logo.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
  .tabs .item-designer{
    background: url('../../../static/images/designer.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
  .tabs .item-my{
    background: url('../../../static/images/logo.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
  /*.yd-tabbar-item.router-link-exact-active.router-link-active{*/
    /*color: red !important;}*/
  .tabs .clo-theme.item-index{
    background: url('../../../static/images/index-hover.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
  .tabs .clo-theme.item-employer{
    background: url('../../../static/images/employer-hover.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
  .tabs .clo-theme.item-meow{
    background: url('../../../static/images/logo.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
  .tabs .clo-theme.item-designer{
    background: url('../../../static/images/designer-hover.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
  .tabs .clo-theme.item-my{
    background: url('../../../static/images/logo.png') center top no-repeat;
    background-size: .54rem .54rem;
  }
</style>
