<template>
  <div class="header">
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
  .vux-header{
    width: 100%;
    background-color: #fff !important;
    z-index: 666;
  }
  .vux-header-title{
    color: #f65aa6 !important;
  }
</style>
