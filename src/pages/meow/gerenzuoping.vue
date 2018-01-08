<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>作品展示</span>
    </div>
    <!--作品展示-->
    <div class="content">
        <div class="tupianlist">
          <img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" width="100" @click="show(index)">
          <div v-transfer-dom>
            <previewer :list="list" ref="previewer" :options="options"></previewer>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { Previewer, TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    data: function () {
      return {
        list: [
          {
          src: 'https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg',
          w: 1200,
          h: 700,
          },
          {
            src: 'https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          ],
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      show (index) {
        this.$refs.previewer.show(index)
      }
    }
  }
</script>
<style scoped>
  .content{
    margin-top: 1rem;
  }
  .tupianlist{
    width: 7.3rem;
    margin: auto;
  }
  .tupianlist img{
    width:1.8rem;
    height:1.8rem;
    margin: 0 0.01rem;
  }
</style>
