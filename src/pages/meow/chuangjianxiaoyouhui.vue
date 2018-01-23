<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>创建校友会</span>
      <div class="header-right">提交</div>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
      <div class="touxiang">
        <div class="tu"><img src="../../../static/images/meow/xiangji.png" /></div>
        <p>上传图片</p>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>学校名称</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入学校名称" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>选择学校地区</span>
          </div>
          <div class="qdtime-right">
            <group class="xmlx-kuang">
              <x-address @on-hide="logHide" @on-show="logShow" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="subParams.project_region"></x-address>
            </group>
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" placeholder="填写学校简介"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data,Group,} from 'vux'
  export default {
    components: {
      XAddress,
      Group,
    },
    data: function () {
      return {
        addressData: ChinaAddressV4Data,
        subParams:{
          project_region:['上海市'],
        },
      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/bianjigongzuojinli.css';
</style>
