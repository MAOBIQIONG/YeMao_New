<template>
  <div class="header">
    <x-header :left-options="{backText: '',preventGoBack:true}" :title="title" @on-click-back="goback"></x-header>
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
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
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
    /*color: #f65aa6 !important;*/
    color: #f65aa6 !important;;
  }
</style>
