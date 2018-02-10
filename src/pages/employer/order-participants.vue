<template>
  <div>
    <!--头部导航-->
    <xheader :title="title"></xheader>
    <!--主体内容-->
    <div class="content">
      <div class="od-condent content-e">
        <div class="od-list">
          <div class="qdsjs-list" v-for="item in bidders">
            <div class="qdsjs-time">
              <p>{{getStringDate(item.create_date, 'ymd')}}</p>
            </div>
            <div class="qdsjs-box">
              <div class="qb-top">
                <div class="qt-touxiang">
                  <img :src='checkAvatar(item.user.img)'>
                </div>
                <div class="qt-nichen">
                  <span>{{item.user.user_name}}</span>
                </div>
                <div class="chat"><img src='../../../static/images/employer/miaomiao.png'></div>
                <div class="qt-jiage">
                  <div class="qt-time"><span>{{item.taskTime}}小时</span></div>
                  <div class="qt-jingqian"><span>￥</span><span>{{item.quotation}}</span></div>
                </div>
              </div>
              <div class="qb-content">{{item.schemeExplains}}</div>
              <div class="qb-botton" v-if="user_id!=null&&user_id==uid" v-tap="{methods:confirmFun,uid:item.user_id}">
                选择设计师
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗-->
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="温馨提示"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">确认选择该设计师吗?</p>
      </confirm>
    </div>
  </div>
</template>
<script>
  import xheader from '../../components/header/xheader.vue'
  import {Confirm, Toast, TransferDomDirective as TransferDom} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      xheader,
      Toast,
      Confirm
    },
    data() {
      return {
        title: '选择设计师',
        cover: {
          backgroundImage: 'url(' + require('../../../static/images/bj.jpg') + ')'
        },
        order_id: null,
        uid: null,
        user_id: null,
        bidders: [],

        showMark: false,
        showMsg: "",
        show: false,
      }
    },
    created: function () {
      var _self = this;
      _self.order_id = _self.$route.query.id;
      _self.uid = _self.$route.query.uid;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.user_id = _self.userInfo._id || null;
      _self.initData();
    },
    destroyed(){
        common.delStorage('fromOrderDcl');
    },
    methods: {
      /**************************************/
      onCancel() {
        console.log('on cancel')
      },
      onConfirm(msg) {
        console.log('on confirm')
        this.chooseDesigner();
        // if (msg) {
        // alert(msg)
        // }
      },
      onHide() {
        console.log('on hide')
      },
      onShow() {
        console.log('on show')
      },
      showToast(msg) {
        this.showMark = true;
        this.showMsg = msg;
      },

      /**************************************/
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      //头像
      checkAvatar(path) {
        return common.getAvatar(path);
      },
      // 时间戳转字符串
      getStringDate(date, id) {
        return common.timeStamp2String(date, id)
      },

      // 选择设计师
      confirmFun(param) {
        this.show = true;
        this.project_winBidder = param.uid; // 项目中标人
      },

      /**************************************/
      initData() {
        var _self = this;
        if (common.isNull(_self.order_id) == true) {
          return;
        }
        var params = {
          interfaceId: common.interfaceIds.getBidders,
          order_id: _self.order_id
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if (data) {
            // console.log(response)
            // 参与人
            var orderBidders = data.orderBidders || [];
            var bidders = data.bidders || [];
            orderBidders.forEach(function (b, j) {
              if (_self.userInfo._id == b.user_id) {
                _self.isPart = true;
              }
              bidders.forEach(function (u, j) {
                if (b.user_id == u._id) {
                  b.user_name = u.user_name;
                  b.img = u.img;
                }
              })
            })
            _self.bidders = orderBidders;
          }
        })
      },

      // 选择设计师
      chooseDesigner() {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.updateData,
          coll: common.collections.orderList,
          wheredata: {
            _id: _self.order_id
          },
          data: {
            $set: {
              project_winBidder: _self.project_winBidder,
              project_state: 1, // 抢单中
            }
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response)
          var data = response.data;
          if (data.ok > 0) {
            _self.$store.state.indexRefreshMark = 1;
            _self.$store.state.employerRefreshMark = 1;
            _self.showToast('选择成功！');
            if(!common.isNull(common.getStorage('fromOrderDcl'))){
                setTimeout(function () {
                    _self.$router.go(-1)
                }, 1000)
            }else{
                setTimeout(function () {
                _self.$router.go(-2)
                }, 1000)
            }

          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
