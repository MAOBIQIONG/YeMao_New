<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>人才详情</span>
      <div class="header-right">编辑</div>
    </div>
    <div class="content">
      <!--基本信息-->
      <div class="jbxx">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg" />
        </div>
        <p>基本信息</p>
        <p class="xingmin"><span>史珂</span>/<span>女</span>/<span>24岁</span>/<span>朝阳区</span></p>
        <div class="xq">
          <div class="xinxi-list">
            <div class="xx-left">
              工作年限：
            </div>
            <div class="xx-right">
              3
            </div>
          </div>
          <div class="xinxi-list">
            <div class="xx-left">
              学 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：
            </div>
            <div class="xx-right">

            </div>
          </div>
          <div class="xinxi-list">
            <div class="xx-left">
              邮 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：
            </div>
            <div class="xx-right">

            </div>
          </div>
          <div class="xinxi-list">
            <div class="xx-left">
              毕业院校：
            </div>
            <div class="xx-right">

            </div>
          </div>
          <div class="xinxi-list">
            <div class="xx-left">
              设计类型：
            </div>
            <div class="xx-right">

            </div>
          </div>
        </div>
      </div>
      <!--期望工作-->
      <div class="qwgz">
        <div class="left">
        </div>
        <div class="qwgz-top">
          <p class="biaoti">期望工作</p>
          <p class="zhiwei"><span>设计师助理</span>/<span>全职</span>/<span>5k-6k</span></p>
        </div>
        <div class="right">
        </div>
        <div class="qwgz-bottom">
          <p>补充说明: 本人热爱建筑设计，擅长手绘，熟练运用PS CDR SAl及办公软件，性格开随和，工作踏实认真。</p>
        </div>
      </div>
      <!--工作经历-->
      <div class="gzjl">
        <div class="gzjl-top">
          <div class="left">
          </div>
          <div class="right">
          </div>
          工作经历
        </div>
        <div class="gzjl-content">
          <div class="gc-list">
            <div class="yuan"></div>
            <div class="neirong">
              <p>2017-07-2017-09</p>
              <p>宏晖文化发展有限公司/3</p>
              <p class="gznr">工作内容</p>
              <div class="list-neirong">
                应季开发产品和可承印物，图案设计
                应季开发产品和可承印物，图案设计
                应季开发产品和可承印物，图案设计
              </div>
            </div>
          </div>
          <div class="gc-list">
            <div class="yuan"></div>
            <div class="neirong">
              <p>2017-07-2017-09</p>
              <p>宏晖文化发展有限公司/3</p>
              <p class="gznr">工作内容</p>
              <div class="list-neirong">
                应季开发产品和可承印物，图案设计
                应季开发产品和可承印物，图案设计
                应季开发产品和可承印物，图案设计
              </div>
            </div>
          </div>

        </div>
      </div>
      <!--自我描述-->
      <div class="zwms">
        <div class="zwms-top">
          <div class="left">
          </div>
          <div class="right">
          </div>
          自我描述
        </div>
        <div class="zwms-content">
          本人热爱服装设计，擅长手绘，熟练运用PS CDR SAl及办公软件，熟悉运用Brother绣花机，擅长打版缝制，成衣样衣制作，性格开朗随和，工作踏实认真。平时的爱好是摄影，唱歌，有一定审美能力，做过微信运营，婚礼策划，对自己的能力很肯定，比较全面。
        </div>
      </div>
      <!--个人作品-->
      <div class="grzp">
        <div class="grzp-top">
          <div class="left">
          </div>
          <div class="right">
          </div>
          个人作品
        </div>
        <div class="fanhui">
          >
        </div>
        <div class="gzzp-content">
          <ul>
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
  @import '../../assets/css/my/mine-jianli.css';
</style>
