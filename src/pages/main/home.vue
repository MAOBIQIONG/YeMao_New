<template>
  <div class="">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import tabbar from '../../components/tabs/tabbar.vue'
  export default {
    data () {
      return {
      }
    },
    created: function () {
      console.log('$route.meta.keepAlive:' + this.$route.meta.keepAlive)
      this.$router.push({name: 'index'}) // 页面加载时跳转
    },
    components: { tabbar },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
