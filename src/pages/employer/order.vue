<template>
  <div>
    <!--头部导航-->
    <xheader2 :title="title" :rightClass="rightClass" :collectFlag="collectFlag"></xheader2>
    <!--主体内容-->
    <div class="od-condent">
      <!--订单确认后详情页-->
      <div class="ddxq">
        <div class="ddxq-top">
          <div class="ddxq-img" @click="toViewImgs(order.imgs)">
            <img v-if="imgSize>0" :src='order.imgs[0]'>
            <div class="num">{{imgSize}}</div>
          </div>
          <div class="ddxq-jianjie">
            <div class="jianjie-top">{{order.project_title}}</div>
            <div class="jianjie-bottom">
              <div class="db-mianji"><span>{{getNameById(order.project_type)}}</span>/<span class="mianji">500</span><span class="mianji">m²</span></div>
              <div class="db-yushuan"><span>预算</span><span class="jiage">￥</span><span class="jiage">{{order.project_budget}}</span></div>
            </div>
          </div>
        </div>
        <div class="ddxq-list">
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src='../../../static/images/employer/leixin.png'></span><span>预计完成：</span>
            </div>
            <div class="box-right">
              <span>{{order.project_endTime}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src='../../../static/images/employer/04.png'></span><span>交易状态：</span>
            </div>
            <div class="box-right">
              <span>建筑设计</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src='../../../static/images/employer/02.png'></span><span>设计深度：</span>
            </div>
            <div class="box-right">
              <span v-for="item in order.project_depth">{{getDepthName(item)}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
                <span><img src='../../../static/images/employer/03.png'></span><span>工时：</span>
            </div>
            <div class="box-right">
              <span>{{order.project_workHours}}小时</span>
            </div>
          </div>
          <div class="ddxq-box" style="border: none;">
            <div class="box-left">
              <span><img src="../../../static/images/employer/06.png"/></span><span>地区：</span>
            </div>
            <div class="box-right">
              <span>{{getCityName(order.project_region)}}</span>
            </div>
          </div>
        </div>
        <div class="ddxq-bottom">
          <div class="biaoqi">订单详情</div>
          <div class="neirong">
            <span>{{order.project_describe}}</span>
          </div>
          <div class="chakangengduo">点击查看更多</div>
        </div>
      </div>
      <!--抢单列表设计师-->
      <div class="od-renshu">
        <div class="tu"></div>
        <p v-if="bidders.length>0">已有<span>{{bidders.length}}</span>位设计师抢单</p>
        <p v-if="bidders.length==0">还没有设计师抢单</p>
        <div class="gengduo" v-tap="{ methods:toUrl, pagename:'emporderparts' }"></div>
      </div>

      <div class="od-list">
        <div class="qdsjs-list"  v-for="bid in bidders" >
          <div class="qdsjs-time">
            <p>{{bid.create_date}}</p>
          </div>
          <div class="qdsjs-box">
            <div class="qb-top">
              <div class="qt-touxiang">
                <img :src='checkAvatar(bid.img)'>
              </div>
              <div class="qt-nichen">
                <span>{{bid.user_name}}</span>
              </div>
              <div class="chat"><img src='../../../static/images/employer/miaomiao.png'></div>
              <div class="qt-jiage">
                <div class="qt-time"><span>{{bid.taskTime}}小时</span></div>
                <div class="qt-jingqian"><span>￥</span><span>{{bid.quotation}}</span></div>
              </div>
            </div>
            <div class="qb-content">{{bid.schemeExplains}}</div>
            <div class="qb-botton">选择设计师</div>
          </div>
        </div>

      </div>
    </div>
    <!--底部-->
    <div class="od-botton" v-if="userInfo._id!=order.user_id">
      <div class="mmliaotian">
        <span><img src='../../../static/images/employer/miaomiao.png'></span>
        <span>喵喵聊天</span>
      </div>
      <div v-if="isPart==false" class="lijiqiangdan" v-tap="{ methods:toUrl, pagename:'orderqiangdan' }">立即抢单</div>
      <div v-if="isPart==true" class="lijiqiangdan" v-tap="{ methods:canclePart }">取消抢单</div>
    </div>
    <!--弹窗-->
    <div class="tishikuang">
      <div class="tisi">
        收藏成功
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import xheader2 from '../../components/header/xheader2.vue'
  import { Toast } from 'vux'
  export default {
    components: {
      xheader2,
      Toast
    },
    data () {
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
        collectFlag: 0,
        order: {},
        bidders: [],
        imgSize: 0,

        showMark:false,
        showMsg:"",
      }
    },
    activated: function () {
      var _self = this;
      if( _self.isInit == true ){
        _self.order_id = _self.$route.query.id;
        _self.initData();
      }
      _self.isInit = true;
    },
    created: function () {
      var _self = this;
      _self.order_id = _self.$route.query.id;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.user_id = _self.userInfo._id;
      _self.zhishu();
      _self.initData();
    },
    mounted: function () {
    },
    methods: {
      /**************************************/
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      toUrl: function (param) {
        this.$router.push({name: param.pagename,query:{id:this.order_id}})
      },
      toViewImgs: function (imgs) {
        common.setStorage("viewImgs",imgs);
        this.$router.push({name:'emporderimgs',query:{id:this.order_id}})
      },
      getCityName(region){
        var name = "";
        if( region && region.length > 0 ){
          name = region[0];
        }
        return name;
      },
      //项目类型名称
      getNameById(id){
        return common.getNameByTypeId(id);
      },
      //头像
      checkAvatar(path){
        return common.getAvatar(path);
      },
      // 项目深度
      getDepthName(num){
        return num==0?"方案":num==1?"扩出":num==2?"施工":"";
      },
      // 订单详情字数限制
      zhishu () {
       var neirong = $(".neirong").text();
          $(".neirong").each(function() {
            var maxwidth = 80;
            if($(this).text().length > maxwidth) {
              $(this).text($(this).text().substring(0, maxwidth));
              $(this).html($(this).html() + '...');
            }
          });
        //点击查看更多
        var flag = true
        $('.ddxq-bottom .chakangengduo').click(function() {
          if(flag == true) {
            $(this).html('点击查看更多')
            $(".neirong").each(function() {
             let maxwidth = 80;
              if($(this).text().length > maxwidth) {
                $(this).text($(this).text().substring(0, maxwidth));
                $(this).html($(this).html() + '...');
              }
            });
            flag = false;
          } else {
            $(this).html('收起')
            $(".neirong").html(neirong)
            flag = true;
          }
        });
      },

      initData(){
        var _self = this;
        if( common.isNull(_self.order_id) == true ){
          return;
        }
        var params = {
          interfaceId:common.interfaceIds.getProjectDetail,
          order_id:_self.order_id,
          user_id:_self.user_id
        }
        // console.log("params:"+JSON.stringify(params))
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data ){
            _self.collectFlag = data.collectFlag;
            //订单
            var order = data.order || {};
            var orderBidders = data.orderBidders || [];
            var bidders = data.bidders || [];
            orderBidders.forEach(function (b,j) {
              if( _self.userInfo._id == b.user_id ){
                _self.isPart = true;
              }
              bidders.forEach(function (u,j) {
                if( b.user_id == u._id ){
                  b.user_name = u.user_name;
                  b.img = u.img;
                }
              })
            })
            _self.bidders = orderBidders;
            _self.order = order;
            if( _self.order.imgs ){
              _self.imgSize = _self.order.imgs.length;
            }
          }
        })
      },

      canclePart(){
        var _self = this;
        var params = {
          interfaceId:common.interfaceIds.competiteAnOrder,
          data:{
            order_id: _self.order_id,
            user_id: _self.user_id,
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data && data.code == 200 ){
            _self.$store.state.indexRefreshMark = 1;
            _self.isPart=false;
            _self.bidders.forEach(function (item,index) {
              if( _self.user_id == item.user_id ){
                _self.bidders.splice(index,1);
              }
            })
            _self.showToast("取消成功！");
          }else{
            _self.showToast("取消失败！");
          }
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/employer/order.css';
  .od-condent .od-renshu .tu {
    background: url('../../../static/images/timer.png') left center no-repeat;
    background-size: .5rem .5rem;
  }
  .od-condent .od-renshu .gengduo {
    background: url('../../../static/images/more.png') center center no-repeat;
    background-size: .5rem .5rem;
  }
  .tishikuang .tisi {
    position: fixed;
    width: 2rem;
    height: 1.2rem;
    border-radius: 0.1rem;
    background: #8d8d8d;
    text-align: center;
    line-height: 1.2rem;
    color: white;
    left:2.75rem;
    top: 30%;
    font-size: 0.32rem;
    display: none;
  }
</style>
