<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>签约设计师</span>
      <div class="header-right" v-tap="{methods:submit}">提交</div>
    </div>
    <div class="content content-p">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>所在城市</span>
          </div>
          <div class="qdtime-right XAddress">
            <group class="xmlx-kuang">
              <x-address @on-hide="logHide" @on-show="logShow" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="value"></x-address>
            </group>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>电子邮箱</span>
          </div>
          <div class="qdtime-right">
            <input v-model="user.email" type="text" placeholder="请输入电子邮箱" />
          </div>
        </div>
      </div>
      <div class="suoming">
        请发送你的作品及简历至官方邮箱：jianlianyemao@163.com
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import {XAddress, ChinaAddressV4Data, Value2nameFilter as value2name, Toast} from 'vux'
  export default {
    components: {
      XAddress,
      Toast
    },
    data () {
      return {
        addressData: ChinaAddressV4Data,
        value:  [],
        user:{
          city:  "",
          email: "",
          authenticating_state: 5
        },
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      // console.log("created:")
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      if( !common.isNull(_self.userInfo._id) ){
        _self.user_id = _self.userInfo._id;
        if( !common.isNull(_self.userInfo.city) ){
          _self.value.push(_self.userInfo.city);
          _self.user.city = _self.userInfo.city;
        }else{
          _self.value.push("上海市");
          _self.user.city = "上海市";
        }
      }
    },
    methods: {
      /**************************************/
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      // 地区
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      },
      logHide (str) {
        var _self = this;
        console.log('on-hide', str)
        if( str == true ){
          if( _self.value[0] == '110000' || _self.value[0] == '120000' ||
            _self.value[0] == '310000' || _self.value[0] == '500000' ){
            _self.value[1] = '--';
          }else{
            _self.value[0] = '--';
          }
          var city = _self.getName(_self.value);
          _self.user.city = city.trim();
          // console.log('city', _self.user.city)
        }
      },
      logShow (str) {
        console.log('on-show',str)
      },

      // 提交
      submit(){
        var _self = this;
        if( common.isNull(_self.user_id) ){
          return;
        }
        if( common.isNull(_self.user.city) ){
          _self.showToast('请选择所在城市！');
          return;
        }
        if( common.isNull(_self.user.email) ){
          _self.showToast('请输入电子邮箱！');
          return;
        }else if( !common.checkReg(_self.user.email,3) ){
          _self.showToast('电子邮箱填写有误！');
          return;
        }

        var params = {
          interfaceId:common.interfaceIds.updateData,
          coll: common.collections.users,
          wheredata:{_id:_self.user_id},
          data:{$set: _self.user},
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response)
          var data = response.data
          if( data && data.ok>0 ){
              _self.showToast('提交成功！');
              _self.userInfo.city = _self.user.city;
              _self.userInfo.email = _self.user.email;
              _self.userInfo.authenticating_state = _self.user.authenticating_state;
              common.setStorage("userInfo",_self.userInfo);
              setTimeout(function () {
                _self.goback();
              },1000);
          }else{
            _self.showToast('提交失败！');
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
<style scoped>
  @import '../../../static/css/designer/qianyuesjs.css';
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
