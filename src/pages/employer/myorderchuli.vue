<template>
  <div class="myorder-employer">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>我的订单</span>
      <div class="header-right" @click="toUrl('fabudingdan')"><img src="../../../static/images/employer/jiahao.png"></div>
    </div>
    <!--tab选项卡-->
        <tab :line-width=2 active-color='#fc378c' v-model="index" class="tabs">
            <tab-item 
                v-for="item in tabItems" 
                :key="item.id"
                @on-item-click="changeList"
            >
                {{item.title}}
            </tab-item>
        </tab>
        <component :is="currentView" ></component>
        <!-- <div>
            {{getCurrentView}}
        </div> -->
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  import MyOrder_dcl from '../../components/employer/myorder_dcl'
  import MyOrder_dzf from '../../components/employer/myorder_dzf'
  import MyOrder_djf from '../../components/employer/myorder_djf'
  import MyOrder_ywc from '../../componen ts/employer/myorder_ywc'
  export default {
    components: {
      Tab,
      TabItem,
      MyOrder_dcl,
      MyOrder_dzf,
      MyOrder_djf,
      MyOrder_ywc
    },
    data() {
      return {
        index: 0,
        myOrderList:{},
        pageNo:0,
        pageSize:10,
        orderList:[],
        currentView:'MyOrder_dcl',
        tabItems:[
            {id:0,title:'待处理'},
            {id:1,title:'待支付'},
            {id:2,title:'待交付'},
            {id:3,title:'已完成'}, 
        ],
        viewArray:['MyOrder_dcl','MyOrder_dzf','MyOrder_djf','MyOrder_ywc']
      }
    },
    created(){
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

    setData(data){
        this.orderList = data;
    },
    changeList(){
        this.currentView = this.viewArray[this.index]
    }

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
  .myorder-employer{
    font-size:16px;
  }
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

<style>
.xs-plugin-pullup-container{
    line-height:60px!important;
    font-size:14px;
}
.xs-plugin-pulldown-container{
    font-size:14px;
    margin-top:-0.21rem;
}
</style>
