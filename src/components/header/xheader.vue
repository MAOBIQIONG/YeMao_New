<template>
  <div class="header-box">
    <x-header :left-options="{backText: ''}" :title="title"></x-header>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    directives: {
      XHeader
    },
    components: {
      XHeader
    },
    props: {
      title: String
    },
    data () {
      return {
      }
    }
  }
</script>

<style>
  .header-box{
    height: 46px;
  }
  .vux-header{
    width: 100%;
    background-color: #fff !important;
    -webkit-box-shadow: 0 1px 6px #f2f2f2;
    box-shadow: 0 1px 6px #f2f2f2;
    position: fixed !important;
    top: 0;
    left:  0;
    z-index: 666;
  }
  .vux-header .vux-header-left .left-arrow:before{
    border-left: 1px solid #f65aa6 !important;
    border-top: 1px solid #f65aa6 !important;
  }
  .vux-header-title{
    color: #f65aa6 !important;
  }
</style>
