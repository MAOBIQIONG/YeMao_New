<template>
  <div >
    <!--头部导航-->
    <div class="header p-static">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>我的评论</span>
    </div>
    <mycomments></mycomments>
    <!--&lt;!&ndash;评论列表&ndash;&gt;-->
    <!--<div class="content content-p">-->
      <!--<swipeout class="vux-1px-tb">-->
        <!--<swipeout-item transition-mode="follow" v-for="i in 3" :key="i">-->
          <!--<div slot="right-menu">-->
            <!--<swipeout-button type="warn">删除</swipeout-button>-->
          <!--</div>-->
          <!--<div slot="content" :class="{'vux-1px-b': i !== 3, 'vux-1px-t': i === 1}">-->
             <!--<div class="pinglun-list">-->
              <!--<div class="pl-left">-->
                <!--<img src="../../../static/images/bj.jpg" />-->
              <!--</div>-->
              <!--<div class="pl-content">-->
                <!--<p>昵称</p>-->
                <!--<p>这个设计非常不错，我感觉非常好</p>-->
                <!--<p class="time">2017-09-08 08：23</p>-->
              <!--</div>-->
              <!--<div class="pl-right">-->
                <!--&lt;!&ndash;这个设计非常不错，我感觉非常好&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</swipeout-item>-->
      <!--</swipeout>-->
    <!--</div>-->
  </div>
</template>

<script>
//  import {Swipeout, SwipeoutItem, SwipeoutButton,} from 'vux'
  import mycomments from '../../components/my/mycomments.vue';
  export default {
    components: {
//      Swipeout,
//      SwipeoutItem,
//      SwipeoutButton,
      mycomments
    },
    data () {
      return {
        disabled: false
      }
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
//      onButtonClick (type) {
//        alert('on button click ' + type)
//      },
//      handleEvents (type) {
//        console.log('event: ', type)
//      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/mine-pinlun.css';
  /*.pinglun-list .pl-right{*/
    /*background: url("/static/images/bj.jpg");*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: cover;*/
  /*}*/
</style>
