<template>
  <!-- 制作一个框架包裹slider -->
  <div style="width:100%;height:100%" ontouchstart>
    <!-- 配置slider组件 -->
    <slider :pages="pages" :sliderinit="sliderinit">
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>
  </div>
</template>
<script>
  import slider from 'vue-concise-slider'// import slider components
  export default {
    data () {
      return {
        pages:[
          {
            html: '',
            style: {
              background:'url(./static/images/1.png)'
            }
          },
          {
            html: '',
            style: {
              background:'url(./static/images/2.png)'
            }
          },
          {
            html: '<div class="animate">立即体验</div>',
            style: {
              background:'url(./static/images/3.png)'
            }
          },
        ],
        //Sliding configuration [obj]
        sliderinit: {
          currentPage: 0,
          thresholdDistance:'100',
          loop:false,
          infinite:1,
          slidesToScroll:1
        }
      }
    },
    components: {
      slider
    },
    mounted:function(){
      this.toUrl()
    },
    methods: {
      toUrl:function () {
        var lod=true
        var _self=this
        $('.animate').on('touchstart',function () {
          if (lod == true) {
            _self.$router.push('index');
            lod = false
          }
      })
      },
    }
  }
</script>
<style>
  .slider-pagination-bullet-active {
    background: #000000 none repeat scroll 0 0 !important;
    opacity: 1;
  }
  .animate{
    width: 2.5rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    position:absolute;
    bottom: 3.2rem;
    left:2.5rem;
    color: #ffffff;
    border-radius: 0.05rem;
    font-size: 0.24rem;
    background: #f74f9c;
    z-index: 999999999;
  }
</style>
