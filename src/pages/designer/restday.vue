<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <div class="header-right" v-tap="{methods:submit}"><span>确定</span></div>
    </div>
    <div class="content content-p">
      <!--日历选取-->
      <div class="rili">
        <inline-calendar
          v-model="dates"
          :disable-past="disablePast"
          :return-six-rows="return6Rows" ref="calendar">
        </inline-calendar>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast, InlineCalendar } from 'vux'
  export default {
    components: {
      Toast,
      InlineCalendar,
    },
    data () {
      return {
        /**日历**/
        old_dates: [],
        dates: [],
        disablePast: true,
        return6Rows: true,
        isSubmit: false,
        /**toast**/
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      console.log("created:")
      var _self = this;
      var user = common.getObjStorage("userInfo") || {};
      if( !common.isNull(user._id) ){
        _self.user_id = user._id;
        _self.initData();
      }
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename,query: params.query || {}})
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      initData: function () {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.getRestDay,
          user_id: _self.user_id
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data ){
            _self.dates = data.days || [];
            _self.dates.forEach(function (item,index) {
              _self.old_dates.push(item);
            })
          }
        })
      },
      submit: function () {
        console.log("submit:")
        var _self = this;
        // 验证日期是否有改动
        if( JSON.stringify(_self.old_dates)==JSON.stringify(_self.dates) ){
          _self.goback();
          return;
        }
        // 避免多次提交
        if( _self.isSubmit == true ) return;
        _self.isSubmit = true;
        var params = {
          interfaceId: common.interfaceIds.setRestDay,
          user_id: _self.user_id,
          days: _self.dates
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data && data.code == 200 ){
            // 刷新设计师个人中心页面
            _self.$store.state.designerCenterMark=1;
            _self.showToast("提交成功！");
            setTimeout(function () {
              _self.goback();
            },1000)
          }else{
            _self.showToast("提交失败！");
          }
          setTimeout(function () {
            _self.isSubmit = false;
          },2000)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/sjsgeren.css';
</style>
