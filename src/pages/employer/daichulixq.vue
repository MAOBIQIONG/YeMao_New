<template>
  <div class="">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>订单详情</span>
    </div>
    <!--主体内容-->
    <div class="dcl-content">
      <div class="dcl-top">
        <img v-if="order.project_state>=0&&order.project_state<3" src="../../../static/images/employer/dcl.png" />
        <img v-if="order.project_state==3" src="../../../static/images/employer/dzf.png" />
        <img v-if="order.project_state>3&&order.project_state<7" src="../../../static/images/employer/djf.png" />
        <img v-if="order.project_state==7" src="../../../static/images/employer/ywc.png" />
      </div>
      <div class="ddxq">
        <div class="ddxq-top">
          <div class="ddxq-img" @click="toUrl('emporderimgs')">
            <img :src="order.imgs[0]" v-if="imgSize>0">
            <div class="num">{{imgSize}}</div>
          </div>
          <div class="ddxq-jianjie">
            <div class="jianjie-top">
              {{order.project_title}}
            </div>
            <div class="jianjie-bottom">
              <div class="db-yushuan"><span>预算</span> <span class="yushuan">￥</span><span class="yushuan">{{order.project_budget}}</span></div>
              <div class="db-miaomiao"><span><img src='../../../static/images/employer/miaomiao.png'></span><span>喵喵</span></div>
            </div>
          </div>
        </div>
        <div class="ddxq-list">
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/07.png"/></span><span>订单类型：</span>
            </div>
            <div class="box-right">
              <span>{{order.project_type | designType}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/05.png"/></span><span>设计面积：</span>
            </div>
            <div class="box-right">
              <span>{{order.project_area}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/leixin.png"/></span><span>预计完成：</span>
            </div>
            <div class="box-right">
              <span>{{order.project_endTime}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/04.png"/></span><span>交易状态：</span>
            </div>
            <div class="box-right">
              <span>{{order.project_state | getStateName}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/02.png"/></span><span>设计深度：</span>
            </div>
            <div class="box-right">
              <span :key="index" v-for="(item,index) in order.project_depth">{{item | getDepthName}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/03.png"/></span><span>工时：</span>
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
              <span>{{order.project_region}}</span>
            </div>
          </div>
        </div>
        <div class="ddxq-bottom">
          <div class="biaoqi">订单详情</div>
          <div class="neirong">
            <span ref="project_describe">{{getMaxlen(order.project_describe)}}</span>
          </div>
          <div class="chakangengduo" v-tap="{methods:viewMoreFun}">{{viewText}}</div>
        </div>
      </div>
    </div>
    <!-- 底部按钮-->
    <div class="dcl-bottom">
      <div class="db-right">
        <div class="db-qxdd">取消订单</div>
        <div class="db-qrdd" v-tap="{ methods:toParts, id: order._id, uid: order.user_id }">选择设计师</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
        return {
            order_id:null,
            user_id:null,
            userInfo:null,
            order:{},
            hasBidder:false,
            bidders:[],
            imgSize:0,
            viewMore:false,
            viewText:'点击查看更多',
        }
    },
    filters:{
        designType(id){
            for (let item of common.getProjectTypes()){
                if (id == item._id) {
                    return item.type_name
                }
            }
        },
        getStringDate(date,id){
            return common.timeStamp2String(date,id)
        },
        // 项目状态
        getStateName(state){
            return common.getProjectStateName(state);
        },
         // 项目深度
        getDepthName(num){
            return num==0?"方案":num==1?"扩出":num==2?"施工":"";
        },
    },
    computed:{
        uuid(){
            console.log(11);
            return common.uuid();
        },
    },
    created(){
      var _self = this;
      _self.order_id = _self.$route.query.id;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.user_id = _self.userInfo._id || null;
      _self.initData();
      console.log(_self.userInfo);
    },
    mounted: function () {
      this.zhishu();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toParts: function (param) {
        this.$router.push({name: 'emporderparts', query: {id: param.id, uid: param.uid}})
      },
//      订单详情字数限制
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
        // 订单详情字数限制
        getMaxlen(text){
        var width = 0.5,fontSize=0.3,lines=3;// margin:.5,font-size:.3,行数:3;
        var num = common.getMaxlenInlineNum(width,fontSize,lines);
        if( text && text.length > num ){
            text = text.substring(0,num-2) + '...';
        }
        return text;
        },
      // 订单详情查看\收起
        viewMoreFun () {
            var _self = this;
            _self.viewMore = _self.viewMore==false ? true : false;
            _self.viewText = _self.viewMore==false ? '点击查看更多' : '收起';
            var desc = _self.viewMore==false ? _self.getMaxlen(_self.order.project_describe) : _self.order.project_describe;
            _self.$refs.project_describe.innerHTML = desc;
        },
      //数据初始化
        initData(){
            let _self = this;
            if( common.isNull(_self.order_id) == true ){
            return;
            }
            var params = {
                interfaceId:common.interfaceIds.getProjectDetail,
                order_id:_self.order_id,
                user_id:_self.user_id
            }
            _self.$axios.post('/mongoApi', {
                    params: params
                }, response => {
                    let data = response.data;
                    if(!data) return;
                    let order = data.order || {};
                    let orderBidders = data.orderBidders || [];
                    let bidders = data.bidders || [];
                    for(let m1 of orderBidders){
                        if(_self.user_id == m1.user_id){
                            _self.hasBidder = true;
                        }
                        for(let m2 of bidders) {
                            if(m1._id == m2._id){
                                m1.user_name = m2.user_name;
                                m1.img = m2.img
                            }
                        }
                    }
                    _self.bidder = orderBidders;
                    _self.order = order;
                    if( _self.order.imgs ){
                        _self.imgSize = _self.order.imgs.length;
                    }
                });
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/employer/daichulixq.css';
</style>
