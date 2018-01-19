<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>填写简历</span>
      <div class="header-right"@click="toUrl('gongzuojinli')">下一步</div>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>姓名</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入姓名" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>性别</span>
          </div>
          <div class="qdtime-right">
            <form action="" method="get">
              <label><input name="Fruit" type="radio" value="男" />男 </label>
              <label><input name="Fruit" type="radio" value="女" />女</label>
            </form>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>出生年月</span>
          </div>
          <div class="qdtime-right">
            <datetime v-model="value1"class="shijian"></datetime>
          </div>
        </div>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>毕业院校</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入毕业院校" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>设计类型</span>
          </div>
          <div class="qdtime-right">
            <select class="xmlx-kuang" v-model="subParams.project_type">
              <option value="">请选择类型</option>
              <option v-for="item in typeList" :value="item._id">{{item.type_name}}</option>
            </select>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>最高学历</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入最高学历" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>工作年限</span>
          </div>
          <div class="qdtime-right">
            <select class="xmlx-kuang">
              <option value="">请选择工作年限</option>
              <option value="">1-3</option>
              <option value="">3-5</option>
              <option value="">5-10</option>
              <option value="">10以上</option>
            </select>
          </div>
        </div>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>邮箱</span>
          </div>
          <div class="qdtime-right"style="line-height:normal">
            <x-input name="email" placeholder="请输入邮箱地址" is-type="email"text-align="right"></x-input>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>所在城市</span>
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
        <textarea class="area" maxlength="300" placeholder="请输入问题描述"></textarea>
        <p class="xianzhi"><span class="zs">300</span>/<span>300</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data, Datetime, Group, Checker, CheckerItem, XInput } from 'vux'
  export default {
    components: {
      XAddress,
      Datetime,
      Group,
      Checker,
      CheckerItem,
      XInput,
    },
    data: function () {
      return {
        imgList:[],
        isShow:true,
        typeList:[],
        subParams:{
          user_id:"",
          project_type:"",
          project_region:['上海市'],
        },
        addressData: ChinaAddressV4Data,
        value3: ['中山市'],
        value1: '2015-11-12',
        value2: '2015-10-12',
        value4: '2025-10-12',
      }
    },
    mounted: function () {
      this. wzxz()
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      //留言字数限制
      wzxz(){
        $(".area").bind("input propertychange",function(){
          var curlength=$(".area").val().length;
          if(curlength>300){
            var num=$(".area").val().substr(0,300);
            $('.area').val(num);
            alert("您输入的字数已超出");
          }
          else{
            $(".zs").text(300-$(".area").val().length)
          }
        })
      },
      showPlugin () {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD HH',
          value: '2017-05-20 18',
          onConfirm (val) {
            console.log('plugin confirm', val)
          },
        })
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
<style scoped>
  @import '../../../static/css/meow/tianxiejianli.css';
  .shijian{
    width: 1.9rem;
  }
  .content{
    padding-top: 1.2rem;
  }
</style>
