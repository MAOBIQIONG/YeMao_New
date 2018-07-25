<template>
  <div>
    <!--头部导航-->
    <xheader2 :title="title" :rightClass="rightClass" :collectFlag="collectFlag" @upup="collectFun"></xheader2>
    <!--主体内容-->
    <div class="content">
      <div class="od-condent content-e">
        <!--订单确认后详情页-->
        <div class="ddxq">
          <div class="ddxq-top xiugai-top">
            <div class="ddxq-img xiugai-ddxq-img" @click="toViewImgs(order.imgs)">
              <!--<img v-if="order.imgs" :src='checkImg(order.imgs[0])'>-->
              <!--<img v-else :src='checkImg("")'>-->
              <!--<div class="num">{{imgSize}}</div>-->
              <swiper height="3.8rem" :list="imgList" @on-index-change="onIndexChange" ></swiper>
            </div>
            <div class="ddxq-jianjie">
              <div class="jianjie-top">
                <p>{{order.project_title}}</p>
                <p>
                  <span>{{getNameById(order.project_type)}}</span>/<span class="mianji">{{order.project_area}}</span>
                  <span class="mianji">m²</span>
                </p>
              </div>
              <div class="jianjie-bottom">
                <!--<div class="db-mianji">-->
                  <!--<span>{{getNameById(order.project_type)}}</span>/<span class="mianji">{{order.project_area}}</span>-->
                  <!--<span class="mianji">m²</span>-->
                <!--</div>-->
                <div class="db-yushuan"><span>预算</span><span class="jiage">￥</span><span class="jiage">{{order.project_budget}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="ddxq-bottom">
            <div class="biaoqi">项目概况</div>
            <div class="neirong" :class="viewMore?'':'lastline-space-ellipsis'" :title="order.project_describe"
                 ref="project_describe">
              {{order.project_describe}}
            </div>
            <div class="chakangengduo" v-tap="{methods:viewMoreFun}" v-if="shoViewMore==true">{{viewText}}</div>
            <!--<div class="lastline-space-ellipsis" :title="order.project_describe">{{order.project_describe}}</div>-->
          </div>

          <div class="ddxq-list">
            <div class="xiu-box">
              <div class="ddxq-box">
                <div class="box-left">
                  <!--<span><img src='../../../static/images/employer/leixin.png'></span>-->
                  <span>预计完成：</span>
                </div>
                <div class="box-right">
                  <span>{{getStringDate(order.project_endTime,'ymd')}}</span>
                </div>
              </div>
              <div class="ddxq-box">
                <div class="box-left">
                  <!--<span><img src='../../../static/images/employer/04.png'></span>-->
                  <span>交易状态：</span>
                </div>
                <div class="box-right">
                  <span>{{getStateName(order.project_state)}}</span>
                </div>
              </div>
              <div class="ddxq-box">
                <div class="box-left">
                  <!--<span><img src='../../../static/images/employer/02.png'></span>-->
                  <span>设计深度：</span>
                </div>
                <div class="box-right">
                  <span v-for="item in order.project_depth">{{getDepthName(item)}}</span>
                </div>
              </div>
              <div class="ddxq-box">
                <div class="box-left">
                  <!--<span><img src='../../../static/images/employer/03.png'></span>-->
                  <span>工时：</span>
                </div>
                <div class="box-right">
                  <span>{{order.project_workHours}}小时</span>
                </div>
              </div>
              <div class="ddxq-box">
                <div class="box-left">
                  <!--<span><img src="../../../static/images/employer/06.png"/></span>-->
                  <span>地区：</span>
                </div>
                <div class="box-right">
                  <span>{{order.project_region}}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!--抢单列表设计师-->
        <div class="od-renshu">
          <!--<div class="tu"></div>-->
          <div class="xiu-od-title">抢单情况</div>
          <p v-if="bidders.length>0">已有<span>{{bidders.length}}</span>位设计师抢单</p>
          <p v-if="bidders.length==0">还没有设计师抢单</p>
          <!-- <div class="gengduo" v-tap="{ methods:toParts, id: order._id, uid: order.user_id }"></div> -->
        </div>

        <div class="od-list">
          <div class="qdsjs-list" v-for="(bid,index) in bidders">
            <div class="qdsjs-time">
              <p>{{getStringDate(bid.create_date,'ymd')}}</p>
            </div>
             <div class="xiu-list">
               <div class="yuan">{{index}}</div>
               <div class="qdsjs-box">
                 <div class="qb-top">
                   <div class="qt-touxiang" v-tap="{methods:toUrl2,pagename:'sjszxxq',query:{id:bid.user._id}}">
                     <img :src='checkAvatar(bid.user.img)'>
                   </div>
                   <div class="qt-nichen" v-tap="{methods:toUrl2,pagename:'sjszxxq',query:{id:bid.user._id}}">
                     <span>{{bid.user.user_name}}</span>
                   </div>
                   <div class="chat"
                        v-tap="{methods:toUrlWUI,pagename:'liaotian',query:{id:bid.user._id,name:bid.user.user_name,img:bid.user.img}}">
                     <img src='../../../static/images/employer/miaomiao2.png'>
                   </div>
                   <div class="qt-jiage">
                     <div class="qt-time"><span>{{bid.taskTime}}小时</span></div>
                     <div class="qt-jingqian"><span>￥</span><span>{{bid.quotation}}</span></div>
                   </div>
                 </div>
                 <div class="qb-content">{{bid.schemeExplains}}</div>
                 <div class="qb-botton" v-if="user_id!=null&&user_id==order.user_id&&order.project_state==0"
                      v-tap="{methods:confirmFun,uid:bid.user_id}">选择设计师
                 </div>
                 <div class="qb-botton" v-else-if="order.project_state>0&&bid.user._id==order.project_winBidder">已选中</div>
                 <div class="qb-botton1" v-else>未选中</div>
               </div>
             </div>

          </div>

        </div>
      </div>
    </div>
    <!--底部-->
    <div class="od-botton" v-if="userInfo._id!=order.user_id">
      <div class="mmliaotian"
           v-tap="{methods:toUrlWUI,pagename:'liaotian',query:{id:order.user._id,name:order.user.user_name,img:order.user.img}}">
        <span><img src='../../../static/images/employer/miaomiao2.png'></span>
        <span>喵喵聊天</span>
      </div>
      <div v-if="isPart==false" class="lijiqiangdan" v-tap="{ methods:toGrabOrder }">立即抢单</div>
      <div v-if="isPart==true" class="lijiqiangdan" v-tap="{ methods:canclePart }">取消抢单</div>
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
  import xheader2 from '../../components/header/xheader2.vue'
  import {Swiper, SwiperItem,Confirm, Toast, TransferDomDirective as TransferDom} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      xheader2,
      Toast,
      Confirm,
      Swiper,
      SwiperItem,
    },
    data() {
      return {
        title: '订单详情',
        rightClass: 'collect',
        cover: {
          backgroundImage: 'url(' + require('../../../static/images/bj.jpg') + ')'
        },
        order_id: null,
        user_id: null,
        isInit: false,
        isPart: false,
        imgList: [],
        imgIndex: 0,
        collectFlag: 0,
        order: {
          user: {}
        },
        bidders: [],
        imgSize: 0,
        shoViewMore: false,
        viewMore: false,
        viewText: '点击查看更多',
        showMark: false,
        showMsg: "",
        show: false,
      }
    },
    activated: function () {
      var _self = this;
      if (_self.isInit == true) {
        _self.isPart = false;
        _self.order_id = _self.$route.query.id;
        _self.userInfo = common.getObjStorage("userInfo") || {};
        _self.user_id = _self.userInfo._id || null;
        _self.imgList =[];
        _self.initData();
      }
      _self.isInit = true;
    },
    created: function () {
      var _self = this;
      _self.order_id = _self.$route.query.id;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.user_id = _self.userInfo._id || null;
      _self.initData();
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
      onIndexChange (index) {
        this.imgIndex = index
      },
      /**************************/
      goback() {
        this.$router.goBack()
      },
      toUrl: function (param) {
        this.$router.push({name: param.pagename, query: {id: this.order_id}})
      },
      toUrl2: function (params) {
        this.$router.push({name: params.pagename, query: params.query || {}})
      },
      toUrlWUI: function (params) { // toUrlWidthUserInfo
        var user = common.getObjStorage("userInfo") || {};
        if (!common.isNull(user._id)) {
          this.$router.push({name: params.pagename, query: params.query || {}})
        } else {
          this.$router.push({name: 'login'})
        }
      },
      toParts: function (param) {
        this.$router.push({name: 'emporderparts', query: {id: param.id, uid: param.uid}})
      },
      toViewImgs: function (imgs) {
        if (imgs.length == 0) return;
        common.setStorage("viewImgs", imgs);
        this.$router.push({name: 'emporderimgs', query: {id: this.order_id}})
      },
      checkImg(path) {
        return common.getDefultImg(path);
      },
      // 抢单
      toGrabOrder() {
        var userInfo = common.getObjStorage('userInfo') || {};
        if (common.isNull(userInfo._id) == true) { // 未登录
          this.$router.push({name: 'login'})
        } else {
          this.$router.push({name: 'orderqiangdan', query: {id: this.order_id}});
        }
      },
      // 时间戳转字符串
      getStringDate(date, id) {
        return common.timeStamp2String(date, id)
      },
      //项目类型名称
      getNameById(id) {
        return common.getNameByTypeId(id);
      },
      //头像
      checkAvatar(path) {
        return common.getAvatar(path);
      },
      getDefultImg(path){
        return common.getDefultImg(path)
      },
      // 项目深度
      getDepthName(num) {
        return num == 0 ? "方案" : num == 1 ? "扩初" : num == 2 ? "施工" : "";
      },
      // 项目状态
      getStateName(state) {
        return common.getProjectStateName(state);
      },

      // 订单详情字数限制
      getMaxlen(text) {
        var _self = this;
        var width = 2.18, fontSize = 0.28, lines = 3;// margin:.5、查看更多按钮长度：1.68,font-size:.3,行数:3;
        var num = common.getMaxlenInlineNum(width, fontSize, lines);
        var len = common.getStringLength(text);
        if (len > num) {
          _self.shoViewMore = true;
        } else {
          _self.shoViewMore = false;
        }
      },

      // 订单详情查看\收起
      viewMoreFun() {
        var _self = this;
        _self.viewMore = _self.viewMore == false ? true : false;
        _self.viewText = _self.viewMore == false ? '展开' : '收起';
      },
      // 项目深度
      collectFun(flag) {
        this.collectFlag = flag;
        this.collect();
      },
      // 选择设计师
      confirmFun(param) {
        this.show = true;
        this.project_winBidder = param.uid; // 项目中标人
      },

      /*******************************/
      // 初始化数据
      initData() {
        var _self = this;
        if (common.isNull(_self.order_id) == true) {
          return;
        }
        var params = {
          interfaceId: common.interfaceIds.getProjectDetail,
          order_id: _self.order_id,
          user_id: _self.user_id
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response)
          var data = response.data;
          if (data) {
            _self.collectFlag = common.checkInt(data.collectFlag);
            //订单
            var order = data.order || {};
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
            _self.order = order;
            if (_self.order.imgs) {
              _self.imgSize = _self.order.imgs.length;
            }
            var imgs = _self.order.imgs || [];// 图片
            console.log(imgs.length)
            if( imgs.length>0 ){
              imgs.forEach(function (item,i) {
                _self.imgList.push({img: _self.getDefultImg(item)});
              })
            }else {
              _self.imgList.push({img: _self.getDefultImg("")});
            }
            // 重置订单详情
            _self.shoViewMore = false;
            _self.viewMore = false;
            _self.viewText = '展开';
            _self.getMaxlen(_self.order.project_describe);
          }
        })
      },

      // 取消抢单
      canclePart() {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.competiteAnOrder,
          data: {
            order_id: _self.order_id,
            user_id: _self.user_id,
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if (data && data.code == 200) {
            _self.$store.state.indexRefreshMark = 1;
            _self.isPart = false;
            _self.bidders.forEach(function (item, index) {
              if (_self.user_id == item.user_id) {
                _self.bidders.splice(index, 1);
              }
            })
            _self.showToast("取消成功！");
          } else {
            _self.showToast("取消失败！");
          }
        })
      },

      // 收藏
      collect() {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.collect,
          data: {
            collect_type: 0,
            collect_id: _self.order_id,
            user_id: _self.user_id,
            is_del: _self.collectFlag
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          var tips = '';
          if (data && data.code == 200) {
            tips = _self.collectFlag == 0 ? '取消成功！' : '收藏成功！';
          } else {
            tips = _self.collectFlag == 0 ? '取消失败！' : '收藏失败！';
          }
          _self.showToast(tips);
        })
      },

      // 选择设计师
      chooseDesigner() {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.chooseDesigner,
          order_id: _self.order_id,
          project_winBidder: _self.project_winBidder
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response)
          var data = response.data;
          if (data && data.code == 200) {
            _self.order.project_state = 1;
            _self.order.project_winBidder = _self.project_winBidder;
            _self.$store.state.indexRefreshMark = 1;
            _self.$store.state.employerRefreshMark = 1;
            _self.showToast('选择成功！');
            setTimeout(function () {
              _self.goback();
            }, 1000)
          } else {
            _self.showToast('选择失败！');
          }
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/employer/order.css';


  .od-condent .od-renshu .tu {
    background: url('../../../static/images/timer.png') left center no-repeat;
    background-size: .5rem .5rem;
  }

  .od-condent .od-renshu .gengduo {
    background: url('../../../static/images/more.png') center center no-repeat;
    background-size: .5rem .5rem;
  }

  .lastline-space-ellipsis {
    position: relative;
    max-height: 1.5rem; /*用像素表示，不要用em，以免造成不同浏览器下计算出现小数点取舍不同导致1像素的差距【行高*截取行数】*/
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all; /*强制打散字符*/
    line-height: 0.5rem;
    color: #fff; /*同背景色*/
  }

  .lastline-space-ellipsis::before, .lastline-space-ellipsis::after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    color: #585858; /*实际文本颜色*/
    content: attr(title);
  }

  .lastline-space-ellipsis::before {
    display: block;
    z-index: 1; /*显示在最上面，展示前面的(截取行数-1)行字符*/
    max-height: 1rem; /*根据行高和截取行数调整，值为[(截取行数-1)*行高]*/
    overflow: hidden;
    background-color: #fff; /*同背景色*/
  }

  .lastline-space-ellipsis::after {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-line-clamp: 3; /*截取行数*/
    text-indent: -1.68rem; /*行首缩进字符数，值为[-(截取行数-1)*尾部留空字符数]，取负值把每行多padding-right的部分给缩进回去*/
    padding-right: 1.68rem; /*尾部留空字符数: '查看更多按钮宽度'*/
  }

  /*2018/7.18 页面优化更改*/
  .xiugai-top{
    height:5.4rem;
    border-bottom: none;
  }
  .ddxq .ddxq-top .xiugai-ddxq-img{
    width: 100%;
    height: 3.8rem;
    float: none;
    background-color: #CCCCCC;
    margin:0;
  }
  .ddxq .ddxq-top .ddxq-jianjie {
    float:none;
    width:100%;
    padding: 0 0.34rem;
    height: 1.5rem;
    line-height: 0.4rem;
    margin:0px;
  }
  .mianji{
    color: #FFB02F;
  }
  .ddxq .ddxq-top .ddxq-jianjie .jianjie-top {
    width:auto;
    height: 1rem;
    float: left;
    margin-top: 0.2rem;
    font-size: 0.3rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #585858;
  }

  .ddxq .ddxq-top .jianjie-top p{
    line-height: 0.5rem;
  }
  .ddxq .ddxq-top .ddxq-jianjie .jianjie-bottom {
    width: auto;
    float: right;
    height: 0.6rem;
    margin-top: 0.3rem;
    font-size: 0.28rem;
  }
  .ddxq .ddxq-bottom .neirong {
    width: 6.9rem;
    margin-left: 0.3rem;
    line-height: 0.5rem;
    word-wrap: break-word;
  }
  .ddxq .ddxq-bottom {
    width: 100%;
    font-size: 0.28rem;
    margin-top: 0rem;
    background: white;
    position: relative;
  }
  .ddxq .ddxq-bottom .biaoqi {
    width: 6.82rem;
    height: 1rem;
    margin: auto;
    border-top: 1px solid #E4E4E4;
    line-height: 1rem;
    font-size: 0.32rem;
    color: #2D2D2D;
  }
  .ddxq .ddxq-list {
    width: 100%;
    padding-top: 0.2rem;
    background-color: white;
  }
  .ddxq .ddxq-list .ddxq-box {
    border-bottom: none;
    height: 0.8rem;
    width: 6.9rem;
    margin-left: 0;
  }
  .xiu-box{
    width: 6.9rem;
    margin: auto;
    padding: 0.2rem 0;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
  }
  .od-condent .od-renshu{
    height: 1rem;
    line-height: 1rem;
    margin: 0 0.3rem;
  }
  .xiu-od-title{
    float: left;
    font-size: 0.32rem;
    color:#2D2D2D;
  }
  .od-condent .od-renshu p{
    float: right;
    font-size: 0.26rem;
    color: #A2A2A2;
    line-height: 1rem;
  }
  .qdsjs-list .qdsjs-time {
    height: 0.8rem;
    border-left: none;
    margin-left: 0.3rem;
    font-size: 0.24rem;
    line-height: 0.8rem;
  }
  .qdsjs-list .qdsjs-time p {
    margin-left: 0rem;
    color: #797979;
  }
  .od-list{
    padding-bottom: 0.2rem;
  }
  .qdsjs-list {
    width: 100%;
    padding: 0;
  }
  .xiu-list{
    width: 100%;
    position: relative;
    display: inline-block;
  }
  .xiu-list .yuan{
    position: absolute;
    top: 45%;
    float: left;
    width: 0.32rem;
    height: 0.32rem;
    line-height:0.32rem;
    font-size: 0.24rem;
    text-align: center;
    margin:auto 0.3rem;
    color: white;
    background:#FFC140;
    border-radius: 50%;
  }
  .qdsjs-list .qdsjs-box {
    float: right;
    width: 6.2rem;
    padding-bottom: 0.2rem;
    background: white;
    margin-right: 0.3rem;
    border-radius: 0.06rem;
    box-shadow:none;
    border: 1px solid #D7D7D7;
  }
  .qdsjs-list .qdsjs-box .qb-top {
    width: 5.8rem;
    height: 0.8rem;
    margin-left: 0.2rem;
    border-bottom: 1px solid #CCCCCC;
  }
  .qdsjs-list .qdsjs-box .qb-content {
    width: 5.8rem;
    font-size: 0.28rem;
    margin-left: 0.12rem;
    margin-top: 0.24rem;
    line-height: 0.46rem;
  }
  .qdsjs-list .qdsjs-box .qb-top .qt-jiage .qt-time {
    float: left;
    padding:0;
    border: none;
    border-radius: 0;
    color: #A2A2A2;
    font-size: 0.24rem;
    display: block;
    margin: 0.2rem 0.06rem;
  }
  .qdsjs-list .qdsjs-box .qb-top .qt-jiage .qt-jingqian {
    float: right;
    font-size: 0.28rem;
    color: #f64097;
    line-height: 0.8rem;
  }

  .od-botton .mmliaotian {
    width: 2rem;
    height: 1rem;
    line-height: 1rem;
    padding-right: 0;
    font-size: 0.24rem;
    text-align: center;
    color: #A2A2A2;
    border-top:1px solid #F0F0F0;
    background-color: white;
  }
  .od-botton .mmliaotian span{
    display: block;
    height: 0.25rem;
    float:none;
  }
  .od-botton .mmliaotian img{
    width: 0.47rem;
    margin: auto;
  }
</style>
