<template>
  <div>
    <div class="header-static"></div>
    <div class="msg-content">
      <div class="tab_box">
        <!--通知列表-->
        <div class="tongzhi">
          <div class="tongzhi-list" v-tap="{ methods:toUrl , pagename:'systemnotice'}">
            <div class="tl-touxiang hd"></div>
            <div class="tl-right">系统通知</div>
            <div class="tl-left">
              <div class="badge" v-if="notice.system>0">{{notice.system}}</div>
            </div>
          </div>
          <div class="tongzhi-list" v-tap="{ methods:toUrl , pagename:'activitynotice'}">
            <div class="tl-touxiang xt"></div>
            <div class="tl-right">活动通知</div>
            <div class="tl-left">
              <div class="badge" v-if="notice.activity>0">{{notice.activity}}</div>
            </div>
          </div>
        </div>
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
        notice: {
          system: 0,
          activity: 0,
        },
      }
    },
    activated: function () {
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
      if( !common.isNull(_self.user._id) ){
        _self.loadData();
      }
    },
    created: function () {
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
      if( !common.isNull(_self.user._id) ){
        _self.loadData();
      }
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
      },
      getDataStr(date){
        return common.timeStamp2String(date,'ymdhm');
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      //获取数据
      loadData(){
        let _self = this;
        if( common.isNull(_self.user._id) ){
          return;
        }
        let params = {
          interfaceId:common.interfaceIds.getNoticeIndex,
          user_id: _self.user._id,
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          var data = response.data;
          if( data ){
            _self.notice = data;
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/index/message.css';
</style>
