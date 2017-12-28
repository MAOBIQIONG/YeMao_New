<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>收藏专辑</span>
    </div>
    <div class="content">
      <!--设计师专辑-->
      <div class="sjszj">
        <div class="sjszj-top">
          <span>设计师专辑</span><span>:100</span>
        </div>
        <ul class="renyuan">
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
            <p class="nicheng">昵称</p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
            <p class="nicheng">昵称</p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
            <p class="nicheng">昵称</p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
            <p class="nicheng">昵称</p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
            <p class="nicheng">昵称</p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
            <p class="nicheng">昵称</p>
          </li>
        </ul>
      </div>
      <!--项目专辑-->
      <div class="xmzj">
        <div class="xm-top">
          <span>项目专辑</span><span>:100</span>
        </div>
        <ul class="renyuan">
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
        </ul>
      </div>
      <!--问答专辑-->
      <div class="xmzj">
        <div class="xm-top">
          <span>问答专辑</span><span>:100</span>
        </div>
        <ul class="renyuan">
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
        </ul>
      </div>
      <!--喵学堂专辑-->
      <div class="xmzj">
        <div class="xm-top">
          <span>喵学堂专辑</span><span>:100</span>
        </div>
        <ul class="renyuan">
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
          <li>
            <img src="../../../static/images/bj.jpg" />
          </li>
        </ul>
      </div>
      <!--设计师专辑-->
      <div class="sjszj jianli">
        <div class="sjszj-top">
          <span>简历专辑</span><span>:100</span>
        </div>
        <ul class="renyuan">
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
          </li>
          <li>
            <p class="touxiang">
              <img src="../../../static/images/bj.jpg" />
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

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
  @import '../../assets/css/my/mine-shouchang.css';
</style>
