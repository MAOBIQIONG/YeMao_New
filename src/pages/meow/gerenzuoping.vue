<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>作品展示</span>
    </div>
    <!--作品展示-->
    <div class="content content-p">
        <div class="tupianlist">
          <!-- <img class="previewer-img" v-for="(item, index) in list" :key="index" :src="item.src" width="100" @click="show(index)"> -->
         <div class="previewer-img" :style="{backgroundImage:`url(${item.src})`}" v-for="(item, i) in list" v-tap="{methods:show,index:i}" :key="i"></div>
          <div v-transfer-dom>
            <previewer2 :list="list" ref="previewer" :options="options"></previewer2>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { Previewer, TransferDom } from 'vux'
  import Previewer2 from '@/components/meow/previewer2'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      Previewer2
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
            let thumbnail = document.querySelectorAll('.previewer-img')[index]
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
      show (params) {
        this.$refs.previewer.show(params.index)
      },
      checkImg(path){
        return common.getDefultImg(path);
      },
    },
    created(){
        // console.log(this.list);
        let works_imgs = common.getObjStorage('works_imgs');

        if(works_imgs){
            let imgArr = [];
            for(let item of works_imgs){
                item = {"src":this.checkImg(item)};
                //    console.log(item);
                imgArr.push(item);
            }
            //    console.log('imgArr',imgArr);
            this.list = imgArr;
            //    console.log(this.list);
        }

    },
    destroyed(){
        common.delStorage('works_imgs');
    }
  }
</script>
<style scoped>
  .tupianlist{
    width: 7.3rem;
    margin: auto;
  }
  .tupianlist img{
    width:1.8rem;
    height:1.8rem;
    margin: 0 0.01rem;
  }
  .previewer-img{
        width:1.8rem;
        height:1.8rem;
        margin: 0 0.01rem;
        display:inline-block;
        background-size:cover;
        background-position:center center
  }
</style>
