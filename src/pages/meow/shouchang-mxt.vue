<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>喵学堂</span>
    </div>
    <!--问答专辑-->
    <div class="weida-list">
      <div class="weida"@click="toUrl('wzxq')">
        <div class="neirong">
          <div class="piapti">
            如果你无法简洁的表达你的想法，那只说明你还不够了解它。- 阿尔伯特·爱因斯坦?
          </div>
          <div class="tupian">
            <img src="../../../static/images/bj.jpg"/>
          </div>
          <div class="jieshao">
            如果你无法简洁的表达你的想法，那只说明你还不够了解它阿尔伯特·爱因斯坦如果你无法简洁的表达你的想法，那只说明你还不够了解它。- 阿尔伯特·爱因斯坦阿尔伯特
          </div>
        </div>
        <div class="pingjia">
          <span>100</span>赞同 · <span>100</span>评论
        </div>
      </div>
      <div class="weida">
        <div class="neirong">
          <div class="piapti">
            如果你无法简洁的表达你的想法，那只说明你还不够了解它。- 阿尔伯特·爱因斯坦?
          </div>
          <div class="tupian">
            <img src="../../../static/images/bj.jpg"/>
          </div>
          <div class="jieshao">
            如果你无法简洁的表达你的想法，那只说明你还不够了解它阿尔伯特·爱因斯坦如果你无法简洁的表达你的想法，那只说明你还不够了解它。- 阿尔伯特·爱因斯坦阿尔伯特
          </div>
        </div>
        <div class="pingjia">
          <span>100</span>赞同 · <span>100</span>评论
        </div>
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
  @import '../../assets/css/meow/shouchang-mxt.css';
</style>
