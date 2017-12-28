<template>
  <div>
    <!--头部导航-->
    <xheader :title="title"></xheader>
    <!--主体内容-->
    <div class="od-condent">
      <div class="od-list">
        <div class="qdsjs-list">
          <div class="qdsjs-time">
            <p>2017-10-10</p>
          </div>
          <div class="qdsjs-box">
            <div class="qb-top">
              <div class="qt-touxiang">
                <img src='../../../static/images/bj.jpg'>
              </div>
              <div class="qt-nichen">
                <span>设计师小A</span>
              </div>
              <div class="chat"><img src='../../../static/images/employer/miaomiao.png'></div>
              <div class="qt-jiage">
                <div class="qt-time"><span>20小时</span></div>
                <div class="qt-jingqian"><span>￥</span><span>5000</span></div>
              </div>
            </div>
            <div class="qb-content">
              已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成 再到建筑施工图都可以完成，再到建筑施工图都可以完成，再到建筑施工图都可以完成，
            </div>
            <div class="qb-botton">
              选择设计师
            </div>
          </div>
        </div>
        <div class="qdsjs-list">
          <div class="qdsjs-time">
            <p>2017-10-10</p>
          </div>
          <div class="qdsjs-box">
            <div class="qb-top">
              <div class="qt-touxiang">
                <img src='../../../static/images/bj.jpg'>
              </div>
              <div class="qt-nichen">
                <span>设计师小B</span>
              </div>
              <div class="chat"><img src='../../../static/images/employer/miaomiao.png'></div>
              <div class="qt-jiage">
                <div class="qt-time"><span>20小时</span></div>
                <div class="qt-jingqian"><span>￥</span><span>5000</span></div>
              </div>
            </div>
            <div class="qb-content">
              已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成 再到建筑施工图都可以完成，再到建筑施工图都可以完成，再到建筑施工图都可以完成，
            </div>
            <div class="qb-botton">
              选择设计师
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import xheader from '../../components/header/xheader.vue'
  export default {
    components: {
      xheader
    },
    data () {
      return {
        title: '选择设计师',
        cover: {
          backgroundImage: 'url(' + require('../../../static/images/bj.jpg') + ')'
        }
      }
    },
    methods: {
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
