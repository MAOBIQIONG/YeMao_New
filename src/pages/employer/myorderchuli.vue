<template>
  <div class="">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>我的订单</span>
      <div class="header-right"@click="toUrl('fabudingdan')"><img src="../../../static/images/employer/jiahao.png"></div>
    </div>
    <!--tab选项卡-->
        <tab :line-width=2 active-color='#fc378c' v-model="index" class="tabs">
            <tab-item class="vux-center" key="0">待处理</tab-item>
            <tab-item class="vux-center" key="1">待支付</tab-item>
            <tab-item class="vux-center" key="2">待交付</tab-item>
            <tab-item class="vux-center" key="3">已完成</tab-item>
        </tab>
        <designers :is="'designers'" :value="searchValue"></designers>
 
  </div>
</template>

<script>
  import {Tab, TabItem, Swiper, SwiperItem} from 'vux'
  import designers from '../../components/designers/designers.vue'
  import orders from '../../components/index/orders.vue'
  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      designers,
      orders
    },
    data() {
      return {
        index: 0,
        myOrderList:{},
        pageNo:0,
        pageSize:10,
        orderList:[]
      }
    },
    created(){
        this.initData();
        console.log("myorderComponent created");
    },
    methods: {
      goback() {
        // this.$router.goBack();
        if(common.op_localStorage().get("fromRS")){common.op_localStorage().remove("fromRS"); this.$router.push({name:"index"});}
        else{this.$router.goBack();}
      },
      toUrl(name) {
        this.$router.push({name: name});
      },
      switchList(){
          switch(this.index) {
            case 0:
                console.log(0);
                return "order";
            case 1:
                console.log(1);
                return "order";
            case 2:
                console.log(2);
                return "order"
            case 3:
                console.log(3);
                return "order"
          }
      },

    setData(data){
        this.orderList = data;
    },
    initData(){
        let _self = this;
        let user_info=JSON.parse(common.op_localStorage().get('userInfo'));
        let user_id = user_info._id;
        let params = {
            interfaceId:common.interfaceIds.getOrderList,
            user_id,
            pageNo: _self.pageNo,
            pageSize: _self.pageSize
        }
        // console.log("user_id",user_id);
        // console.log("user_info",user_info);
        this.$axios.post('/mongoApi',{
            params
        },(response)=>{
            console.log("+++++++++++++");
            console.log(response);
            console.log("=============");
            _self.setData(response.data.orderList)
            console.log("-------------");
            
        })
    },

    }
  }
</script>
<!--<style>-->
  <!--.vux-slider > .vux-swiper{-->
    <!--height: 100% !important;-->
    <!--overflow:auto !important;-->
  <!--}-->
  <!--.vux-swiper-item{-->
    <!--height:auto !important;-->
    <!--background: #f2f2f2 !important;-->
  <!--}-->
<!--</style>-->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
      position:static;
  }
  .content{
    background: #F2F2F2;
    margin-top: 0.8rem;
  }
  .tabs{
    width: 100%;
    /* position: fixed;
    top: 0.88rem;
    left: 0; */
    background: white;
    z-index: 999;
  }
  .swps{
    margin-top: 1.74rem;
    height:14rem !important;
    overflow:auto !important;
  }
</style>
