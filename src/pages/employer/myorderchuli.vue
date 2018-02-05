<template>
  <div class="myorder-employer p-fixed">
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
                @on-item-click="itemClick"
            >
                {{item.title}}
            </tab-item>
        </tab>
        <transition :name="`vux-pop-${$store.state.directionOrderTab==0?'in':'out'}`">
            <component 
                :is="currentView" 
                :lock-x="lockX"
                @on-slide-previous="onSlidePrevious"
                @on-slide-next="onSlideNext"
            >
            </component>
        </transition>


  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  import MyOrder_dcl from '../../components/employer/myorder_dcl'
  import MyOrder_dzf from '../../components/employer/myorder_dzf'
  import MyOrder_djf from '../../components/employer/myorder_djf'
  import MyOrder_ywc from '../../components/employer/myorder_ywc'
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
        lockX:false,
        lockY:false,
        //若初始值为0，刚进入页面时watch监控不到变化所以设为-9
        index:-9,
        myOrderList:{},
        pageNo:0,
        pageSize:10,
        orderList:[],
        currentView:'',
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
        console.log("myorderchuli created");
        
    },
    mounted(){
        let _self = this;
        let index = _self.$store.state.orderTabIndexEmployer;
        _self.$nextTick(()=>{
            _self.index = index;
        });
    },
    watch:{
        //监控index数值改变回调changeList方法
        index:{
            handler(val,oldval){
                if(val>=0 && val<this.tabItems.length){
                    this.changeList();
                }            
            }
        }
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
        itemClick(){
            console.log('itemClick');
        },
        changeList(){
            // console.log('changeList',this.index,this.currentView,this.viewArray[this.index],this.isChanged);
            this.currentView = this.viewArray[this.index];         
        },
        changeList2(type){
            console.log('changeList2',type);
            if(type=="previous"){
                this.index--;
                console.log(this.index);
                if(this.index===-1){
                    console.log('this.index',this.tabItems.length-1);
                    this.index = 0;
                    console.log('this.index',this.tabItems.length-1);
                }           
            }
            if(type=="next"){
                this.index++;
                console.log('next:index',this.index);
                if(this.index===this.tabItems.length){
                    this.index = this.tabItems.length-1;
                }           
            }
            
        },
        onSlidePrevious(){
            console.log('previous');
            this.$store.state.directionOrderTab = 1
            this.changeList2('previous')
        },
        onSlideNext(){
            console.log('next');
            this.$store.state.directionOrderTab = 0
             this.changeList2('next')
        }
    }
  }
</script>
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
  .od-renshu.myorder{
      position:relative;
      font-size:12px;
      background:red;
      width:30%;
      bottom:10px;
  }
  .od-renshu.myorder>p{
        position: absolute;
        top:20px;
        padding:0 5px;
  }
.xs-plugin-pullup-container{
    line-height:60px!important;
    font-size:14px;
}
.xs-plugin-pulldown-container{
    font-size:14px;
    margin-top:-0.21rem;
}
  .vux-pop-out-enter-active,
  /*.vux-pop-out-leave-active,*/
  .vux-pop-in-enter-active
  /*.vux-pop-in-leave-active*/
  {
    height: 100%;
    width: 100%;
    top: 0;
    /* position: absolute; */
    transition: all 90ms;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-backface-visibility: hidden; /* Firefox */
  }

  /**上一页返回**/
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  /**上一页离开**/
  .vux-pop-out-leave-active {
    opacity: 0;
    /*transform: translate3d(100%, 0, 0);*/
  }

  /**下一页进入**/
  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  /**下一页离开**/
  .vux-pop-in-leave-active {
    opacity: 0;
    /*transform: translate3d(-100%, 0, 0);*/
  }
</style>
