<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>个人信息</span>
      <div class="header-right" v-tap="{methods:submit}"><span>确定</span></div>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
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
            <input v-model="years" type="text" placeholder="请输入工作年限" ref="workyears"/>
          </div>
        </div>
        <div class="ys">
          <div class="ys-left">
            <span>时薪</span>
          </div>
          <div class="ys-right">
            <input v-model="money" type="text" placeholder="请输入时薪" ref="hourlywage"/>
          </div>
        </div>
      </div>
      <div class="liebiao">
        <div class="list" v-tap="{methods:toUrl,pagename:'restday'}">
          <div class="xingxi">休息日</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list" v-tap="{methods:toUrl,pagename:'jianjiexiugai'}">
          <div class="xingxi">个人简介</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list tz" v-tap="{methods:toUrl,pagename:'rongyushangcuan'}">
          <div class="xingxi">上传荣誉</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list" v-tap="{methods:toUrl,pagename:'zuopingshangchuan'}">
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
          working_years: '',
          hourly_wage: ''
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
      toUrl: function (params) {
        console.log("params.pagename:"+params.pagename)
        this.$router.push({name: params.pagename,query: params.query || {}})
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
        }else if( !common.isMoney(_self.user.working_years) ){
          _self.showToast("请重新确认工作年限!");
          return
        }
        if( common.isNull(_self.user.hourly_wage) ){
          _self.showToast("请输入时薪!");
          return
        }else if( !common.isMoney(_self.user.hourly_wage) ){
          _self.showToast("请重新确认时薪!");
          return
        }
        _self.user.hourly_wage = common.checkFloat(_self.user.hourly_wage);
        _self.user.working_years = common.checkFloat(_self.user.working_years);
        var params = {
          interfaceId: common.interfaceIds.updateUserById,
          user_id: _self.user_id,
          data: _self.user
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data && response.code == '200' ){
            _self.showToast("修改成功！");
            _self.$store.state.designerRefreshMark = 1;
            // 刷新设计师个人中心页面
            _self.$store.state.designerCenterMark=1;
            _self.userInfo.user_type = _self.user.user_type;
            _self.userInfo.working_years = _self.user.working_years;
            _self.userInfo.hourly_wage = _self.user.hourly_wage;
            common.setStorage("userInfo",_self.userInfo);
            setTimeout(function () {
              _self.goback();
            },1600)
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
          newValue = newValue.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
          newValue = newValue.replace(/^\./g,"");  //验证第一个字符是数字而不是.
          newValue = newValue.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.
          newValue = newValue.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
          newValue = newValue>=100 ? newValue.substring(0,2) : newValue;
          newValue = newValue.indexOf('.')>0 ? newValue.substring(0,newValue.indexOf('.')+2) : newValue;
          _self.$refs.workyears.value = newValue;
          _self.user.working_years = newValue;
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
          newValue = newValue.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
          newValue = newValue.replace(/^\./g,"");  //验证第一个字符是数字而不是.
          newValue = newValue.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.
          newValue = newValue.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
          newValue = newValue>=100000000 ? newValue.substring(0,9) : newValue;
          newValue = newValue.indexOf('.')>0 ? newValue.substring(0,newValue.indexOf('.')+3) : newValue;
          _self.$refs.hourlywage.value = newValue;
          _self.user.hourly_wage = newValue;
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/xiugaigerenxinxi.css';
</style>
