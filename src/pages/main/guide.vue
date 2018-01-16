<template>
  <!-- 制作一个框架包裹slider -->
  <div style="width:100%;height:100%">
    <!-- 配置slider组件 -->
    <slider :pages="pages" :sliderinit="sliderinit" @slide='slide'>
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
              background:'url(../../../static/images/1.png)'
            }
          },
          {
            html: '',
            style: {
              background:'url(../../../static/images/2.png)'
            }
          },
          {
            html: '<div class="animate">立即体验</div>',
            style: {
              background:'url(../../../static/images/3.png)'
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
    methods: {
      // Listener event
      slide (data) {
        console.log(data)
      },
      onTap (data) {
        console.log(data)
      },
      onInit (data) {
        console.log(data)
      }
    }
  }
</script>
<style>
  .slider-pagination-bullet-active {
    background: #000000 none repeat scroll 0 0;
    opacity: 1;
  }
  .animate{
    width: 2rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    position: fixed;
    bottom: 2rem;
    left: auto;
  }
</style>
