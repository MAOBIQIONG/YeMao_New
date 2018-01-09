<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>订单详情</span>
    </div>
    <!--主体内容-->
    <div class="dcl-content">
      <div class="dcl-top">
        <img src="../../../static/images/employer/dcl.png" />
      </div>
      <div class="ddxq">
        <div class="ddxq-top">
          <div class="ddxq-img"@click="toUrl('emporderimgs')">
            <img src='../../../static/images/bj.jpg'>
            <div class="num">5</div>
          </div>
          <div class="ddxq-jianjie">
            <div class="jianjie-top">
              已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
            </div>
            <div class="jianjie-bottom">
              <div class="db-yushuan"><span>预算</span> <span class="yushuan">￥</span><span class="yushuan">5000</span></div>
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
              <span>建筑设计</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/05.png"/></span><span>设计面积：</span>
            </div>
            <div class="box-right">
              <span>500m²</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/leixin.png"/></span><span>预计完成：</span>
            </div>
            <div class="box-right">
              <span>2017-05-24</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/04.png"/></span><span>交易状态：</span>
            </div>
            <div class="box-right">
              <span>建筑设计</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/02.png"/></span><span>设计深度：</span>
            </div>
            <div class="box-right">
              <span>方案</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/03.png"/></span><span>工时：</span>
            </div>
            <div class="box-right">
              <span>20小时</span>
            </div>
          </div>
          <div class="ddxq-box" style="border: none;">
            <div class="box-left">
              <span><img src="../../../static/images/employer/06.png"/></span><span>地区：</span>
            </div>
            <div class="box-right">
              <span>上海</span>
            </div>
          </div>
        </div>
        <div class="ddxq-bottom">
          <div class="biaoqi">订单详情</div>
          <div class="neirong">
            已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成，已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成 ，再到建筑施工图都可以完成，已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成 已有多年建筑设计工作经验，从事建筑方案到效果图
          </div>
          <div class="chakangengduo">点击查看更多</div>
        </div>
      </div>
    </div>
    <!-- 底部按钮-->
    <div class="dcl-bottom">
      <div class="db-right">
        <div class="db-qxdd">取消订单</div>
        <div class="db-qrdd">选择设计师</div>
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
          imgSize
      }
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
  @import '../../assets/css/employer/daichulixq.css';
</style>
