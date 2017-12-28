<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>签约设计师</span>
      <div class="header-right">提交</div>
    </div>
    <div class="content">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>所在城市</span>
          </div>
          <div class="qdtime-right">
            <group class="xmlx-kuang">
              <x-address @on-hide="logHide" @on-show="logShow" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="value3"></x-address>
            </group>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>电子邮箱</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入电子邮箱" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XAddress,ChinaAddressV4Data,} from 'vux'
  export default {
    components: {
      XAddress,
    },
    data () {
      return {
        addressData: ChinaAddressV4Data,
        value3: ['中山市'],
      }
    },
    mounted: function () {
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      // 地区
      logHide (str) {
        var obj = this;
        console.log('on-hide', str)
        if( str == true ){
          console.log('value', obj.value3)
          if( obj.value3[0] == '110000' || obj.value3[0] == '120000' ||
            obj.value3[0] == '310000' || obj.value3[0] == '500000' ){
            obj.value3[1] = '--';
          }else{
            obj.value3[0] = '--';
          }
        }
      },
      logShow (str) {
        console.log('on-show',str)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
<style scoped>
  @import '../../assets/css/designer/qianyuesjs.css';
  .xmlx-kuang{
    height: 0.8rem;
    border: none;
    display: block;
    border: none;
    font-size: 0.28rem;
    color: #999999;
    background: white;
    outline: medium;
    overflow: hidden;
  }
</style>
