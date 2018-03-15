<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp vux-previewer" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe.
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides.
        PhotoSwipe keeps only 3 of them in the DOM to save memory.
        Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="indicator">
            <span class="indicator__sign" v-for="(item,i) in indicator" :key="i" :class="{'indicator__sign--active':item==1}"></span>
            {{index}}
          </div>
          <div class="pswp__counter"></div>
          <slot name="button-after"></slot>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <slot name="button-before"></slot>

          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from 'x-photoswipe/dist/photoswipe'
import UI from 'x-photoswipe/dist/photoswipe-ui-default'
import objectAssign from 'object-assign'

export default {
  name: 'previewer',
  computed: {
    imgs () {
      return this.list.map(one => {
        if (!one.msrc) {
          one.msrc = one.src
        }
        if (typeof one.w === 'undefined') {
          one.w = 0
          one.h = 0
        }
        return one
      })
    },
    indicator(){
      let arr = [];
      let indicatorNum = 9;
      let currentNum =  this.index;
      for(let i = 0; i < indicatorNum; i++) {
        if(i === currentNum){
          arr.push(1);
        } else {
          arr.push(0);
        }
      };
      return arr;
    }
  },
//   created(){
//     console.log('previewer2__created__index',this.index);
//   },
//   mounted(){
//     console.log('previewer2__mounted__index',this.index);
//   },
//   updated(){
//     console.log('previewer2__updated__index',this.index);
//   },
  // data(){
  //   return{
  //   }
  // },
  watch: {
    imgs (newVal, oldVal) {
      console.log("previewer2__watch__imgs");
      // console.log("new:"+JSON.stringify(newVal));
      // console.log("old:"+JSON.stringify(oldVal));
      console.log('previewer2__watch__photoswipe',this.photoswipe);
      if (!this.photoswipe) {
        return
      }
      this.imgList = newVal;
      if (newVal.length && newVal.length - oldVal.length === -1) {
          console.log('newVal.length - oldVal.length === -1!!!!!!!!!');
        const index = this.photoswipe.getCurrentIndex()
        this.photoswipe.invalidateCurrItems()
        this.photoswipe.items.splice(index, 1)
        let goToIndex = index
        if (goToIndex > this.photoswipe.items.length - 1) {
          goToIndex = 0
        }
        this.photoswipe.goTo(goToIndex)
        this.photoswipe.updateSize(true)
        this.photoswipe.ui.update()
      } else if(newVal.length && newVal.length < oldVal.length){
        console.log('newVal.length<oldVal.length!!!!!!!!!');

      } else if (!newVal.length) {
        this.close()
      }
    },
  },
  methods: {
    init (index) {
      console.log('previewer2__init__index',index);
      console.log('previewer2__init__imgs',this.imgs);
      const self = this
      const showItem = this.imgs[index]
      if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
        const img = new Image()
        img.onload = function () {
          showItem.w = this.width
          showItem.h = this.height
          self.doInit(index)
        }
        img.src = showItem.src
      } else {
        this.doInit(index)
      }
    },
    doInit (index) {
      // console.log('doInit__thisImgs',this.imgs);
      const self = this
      let options = objectAssign({
        closeEl:false,
        arrowEl: false,
        history: false,
        shareEl: false,
        zoomEl: false,
        fullscreenEl: false,
        tapToClose: true,
        counterEl: false,
        showHideOpacity:false,
        index: index
      }, this.options)
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.imgs, options)

      this.photoswipe.listen('gettingData', function (index, item) {
        // console.log("doInit__item",item);
        if (!item.w || !item.h || item.w < 1 || item.h < 1) {
          const img = new Image()
          img.onload = function () {
            item.w = this.width
            item.h = this.height
            self.photoswipe.updateSize(true)
          }
          img.src = item.src
        }
      })

      this.photoswipe.init()
      this.photoswipe.listen('close', () => {
        this.$emit('on-close')
      })
    },
    show (index) {
      console.log('previewer2__showIndex', index);
      this.init(index)
    },
    getCurrentIndex () {
      return this.photoswipe.getCurrentIndex()
    },
    getNumItemsFn() {
      return this.photoswipe.options.getNumItemsFn();
    },
    close () {
      this.photoswipe.close()
    },
    goTo (index) {
      this.photoswipe.goTo(index)
    },
    prev () {
      this.photoswipe.prev()
    },
    next () {
      this.photoswipe.next()
    },
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style src="x-photoswipe/dist/photoswipe.css"></style>
<style src="x-photoswipe/dist/default-skin/default-skin.css"></style>
<style> 
.indicator{
  width:4rem;
  height:1rem;
  margin:0 auto;
  text-align:center;
}
.indicator__sign{
  display:inline-block;
  vertical-align:28%;
  width:0.2rem;
  height:0.2rem;
  background:#aaa;
  border-radius:50%;
  margin:0 0.1rem;
}
.indicator__sign--active{
  background:#fff;
}
</style>
