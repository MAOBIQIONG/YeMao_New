<template>
  <div class="liaotian">
    <div class="header p-static">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>昵称</span>
    </div>
    <!--  信息表-->
    <div class="content">
      <scroller lock-x height="" @on-scroll-bottom="onScrollBottom" @on-scroll="onScroll" ref="scrollerBottom">
        <div class="message">
        <ul>
          <li v-for="(message, index) in dataArray" :key="message.id" :class="message.direction==2?'an-move-right':'an-move-left'">
            <p class="time"> <span v-text="message.ctime"></span></p>
            <p class="time system" v-if="message.type==10000"> <span v-html="message.content">fgdfg</span> </p>
            <div :class="'main' + (message.direction==2?' self':'')" v-else>
              <img class="avatar" width="45" height="45" :src="message.direction==2? ownerAvatarUrl: contactAvatarUrl">
              <!-- 文本 -->
              <div class="text" v-emotion="message.content" v-if="message.type==1">
                <span>dgdfgdfg</span>
              </div>

              <!-- 图片 -->
              <div class="text" v-else-if="message.type==2">
                <img :src="message.content" class="image" alt="聊天图片">
              </div>

              <!-- 其他 -->
              <div class="text" v-else-if="message.type!=10000" v-text="'[暂未支持的消息类型:'+ message.type +']\n\r' + message.content">

              </div>
            </div>
          </li>

        </ul>
      </div>
      </scroller>
    </div>
    <div class="lt-bottom">
        <div class="lb-left">
           <input type="text" placeholder="请输入消息" />
        </div>
        <div class="lb-right">
            发送
        </div>
    </div>
  </div>
</template>

<script>
  import {LoadMore, Scroller,} from 'vux'
  export default {
    components: {
      Scroller,
      LoadMore
    },
    data () {
      return {
        loadtext: '上拉加载',
        loadmore: '上拉加载',
        loadrefresh: '正在加载...',
        loadnomore: '没有更多数据了',
        ownerAvatarUrl: './static/images/1.png',
        contactAvatarUrl: './static/images/2.png',
        dataArray: [
          {
            direction: 2,
            id: 1,
            type: 1,
            content: "你好!![呲牙]",
            ctime: new Date().toLocaleString()
          },
          {
            direction: 1,
            id: 2,
            type: 1,
            content: '你也好。[害羞]',
            ctime: new Date().toLocaleString()
          },
          {
            direction: 2,
            id: 3,
            type: 1,
            content: '这是我的简历头像：',
            ctime: new Date().toLocaleString()
          },
          {
            direction: 2,
            id: 4,
            type: 2,
            content: './static/images/2.png',
            ctime: new Date().toLocaleString()
          },
          {
            direction: 1,
            id: 5,
            type: 1,
            content: '你开心就好。[微笑]',
            ctime: new Date().toLocaleString()
          },
          ]

      }
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/employer/liaotian.css";
  .liaotian {
    width: 100%;
    background-color: #f2f2f2;
  }
  .message{
    width: 7.1rem;
    margin-left: 0.2rem;
    background-color: #f2f2f2;
    font-size: 0.3rem;
  }
  .message .self{
    position: relative;
  }
  .message>li {
    margin-bottom:0.3rem;
    width: 6.9rem;
    left:0;
    position: relative;
    display:inline-block;
  }
  .message .time {
    margin: 0.2rem 0;
    display:block;
    font-size: 0.28rem;
    text-align: center;
  }
  .message .text {
    display: inline-block;
    position: relative;
    max-width: calc(100% - 1.5rem);
    min-height: 0.7rem;
    /*font-size: 0.3rem;*/
    padding: 0.12rem 0.2rem;
    text-align: left;
    word-break: break-all;
    background-color: #fff;
    color: #000;
    border-radius: 0.08rem;
    box-shadow: 0px 1px 7px -5px #000;
  }
  .message .text span{
    display: inline-flex
  }
  .message .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
    background: #fff;
  }
  .message .time>span {
    display: inline-block;
    padding: 0 5px;
    font-size: 0.24rem;
    color: #fff;
    border-radius: 2px;
    background-color: #DADADA;
  }
  .message .text:before {
    content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #fff;
  }
  .message .self {
     text-align: right;
  }
  .message .self {
    text-align: right;
  }
  .message .self .avatar {
    float: right;
    display:inline-block;
    margin: 0 0 0 10px;
  }
  .message .self .text {
    background-color: #9EEA6A;
  }
  .message .self .text:before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #9EEA6A;
  }
  .message .image{
    max-width: 3rem;
  }
  img.static-emotion-gif, img.static-emotion {
    vertical-align: middle !important;
  }
  .an-move-left{
    left: 0;
    animation: moveLeft .7s ease;
     -webkit-animation:moveLeft .7s ease;
  }
  .an-move-right{
    /*left: 0;*/
    animation: moveRight .7s ease;
     -webkit-animation:moveRight .7s ease;
  }
  .bgnone{
    background: none;
  }
  @keyframes moveRight{
    0%{left:-20px; opacity: 0}
    100%{left:0; opacity: 1}
  }
  @-webkit-keyframes moveRight
  {
    0%{left:-20px; opacity: 0}
  100%{left:0px; opacity: 1}
  }
  @keyframes moveLeft{
    0%{left:20px; opacity: 0}
  100%{left:0px; opacity: 1}
  }

  @-webkit-keyframes moveLeft
  {
    0%{left:20px; opacity: 0}
  100%{left:0px; opacity: 1}
  }

  @media (max-width: 367px){
    .fzDInfo{width:82%;}
  }

</style>

