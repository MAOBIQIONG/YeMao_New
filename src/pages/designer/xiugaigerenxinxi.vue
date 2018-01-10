<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>个人信息</span>
      <div class="header-right" v-tap="{ methods:submit }"><span>确定</span></div>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="xmlx">
        <div class="xmlx-left">
          <span>类别</span>
        </div>
        <div class="xmlx-right">
          <select class="xmlx-kuang" v-model="user.user_type">
            <option value="0">请选择类型</option>
            <option v-for="item in types" :value="item._id">{{item.type_name}}</option>
          </select>
        </div>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>工作年限</span>
          </div>
          <div class="qdtime-right">
            <input v-model="years" type="number" placeholder="请输入工作年限" ref="workyears"/>
          </div>
        </div>
        <div class="ys">
          <div class="ys-left">
            <span>时薪</span>
          </div>
          <div class="ys-right">
            <input v-model="money" type="number" placeholder="请输入时薪" ref="hourlywage"/>
          </div>
        </div>

      </div>
      <div class="liebiao">
        <div class="list"@click="toUrl('jianjiexiugai')">
          <div class="xingxi">个人简介</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list tz"@click="toUrl('rongyushangcuan')">
          <div class="xingxi">上传荣誉</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list"@click="toUrl('zuopingshangchuan')">
          <div class="xingxi">上传作品</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  import store from '@/vuex/store'
  export default {
    components: {
      Toast
    },
    store,
    data () {
      return {
        types: [],
        user_id: null,
        user:{
          user_type: 0,
          working_years: 0,
          hourly_wage: 0
        },
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      var _slef = this;
      _slef.types = common.getProjectTypes();
      var user = common.getObjStorage("userInfo") || {};
      if( !common.isNull(user._id) ){
        _slef.userInfo = user;
        _slef.user_id = user._id;
        _slef.user.user_type = user.user_type;
        _slef.user.working_years = user.working_years;
        _slef.user.hourly_wage = user.hourly_wage;
      }
    },
    methods: {
      /**************************************/
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },

      /********************************/
      // 修改用户信息
      submit(){
        var _self = this;
        if( common.isNull(_self.user_id) ){
          _self.showToast("未成功获取用户信息!");
          return
        }
        if( _self.user.user_type == 0 || common.isNull(_self.user.user_type) ){
          _self.showToast("请选择项目类型!");
          return
        }
        if( common.isNull(_self.user.working_years) ){
          _self.showToast("请输入工作年限!");
          return
        }
        if( common.isNull(_self.user.hourly_wage) ){
          _self.showToast("请输入时薪!");
          return
        }
        var params = {
          interfaceId:common.interfaceIds.updateData,
          coll:common.collections.users,
          wheredata:{_id:_self.user_id},
          data:{$set: _self.user}
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data && response.code == '200' ){
            _self.showToast("修改成功！");
            _self.$store.state.designerRefreshMark = 1;
            _self.userInfo.user_type = _self.user.user_type;
            _self.userInfo.working_years = _self.user.working_years;
            _self.userInfo.hourly_wage = _self.user.hourly_wage;
            common.setStorage("userInfo",_self.userInfo);
          }else{
            _self.showToast("修改失败！");
          }
        })
      }
    },
    computed: {
      // 计算属性的 getter
      years: {
        // getter
        get: function () {
          return this.user.working_years;
        },
        // setter
        set: function (newValue) {
          var _self = this;
          if( newValue >= 100 ){
            newValue = newValue.substring(0,2);
            _self.$refs.workyears.value = newValue;
          }
          var reg = /^[0-9]+([.][0-9]{1}){0,1}$/;// 验证数字,保留一位小数
          if ( !reg.test(newValue) ){
            newValue = newValue.substring(0,newValue.length-1);
            _self.$refs.workyears.value = newValue;
          }
          _self.user.working_years = common.checkFloat(newValue);
        }
      },

      money: {
        // getter
        get: function () {
          return this.user.hourly_wage;
        },
        // setter
        set: function (newValue) {
          var _self = this;
          var reg = /^[0-9]\d*$|^[0-9]\d*\.\d{1,2}$/;
          if( newValue >= 100000000 ){
            newValue = newValue.substring(0,9);
            _self.$refs.hourlywage.value = newValue;
          }
          if ( !reg.test(newValue) ){
            newValue = newValue.substring(0,newValue.length-1);
            _self.$refs.hourlywage.value = newValue;
          }
          _self.user.hourly_wage = common.checkFloat(newValue);
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/xiugaigerenxinxi.css';
</style>
