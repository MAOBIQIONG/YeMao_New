<template>
  <div class="">
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>分类</span>
    </div>
    <!--全部分类-->
    <div class="content content-p">
      <div class="fl-box" v-for="item in types" v-tap="{ methods:getOrderByTypeId , id:item._id }">
        <span class="fl-img"><img :src="item.img"/></span>
        <div class="zhezhao">{{item.type_name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        types: []
      }
    },
    created: function () {
      this.types = common.getProjectTypes();
    },
    methods: {
      goback () {
        this.$router.goBack();
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
      },
      // 根据类别id查询订单
      getOrderByTypeId (params) {
        this.$router.push({name: 'leibie', query: {id: params.id}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/index/fenlei.css";
</style>
