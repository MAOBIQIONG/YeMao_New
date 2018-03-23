import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  // 页面跳转方向：0、向前，1、向后。
  direction: 0,
  // 首页底部导航栏页面状态
  pageIndex: 0,
  // 首页页面刷新状态
  indexRefreshMark: 0,
  // 订单详情页面刷新状态
  detailRefreshMark: 0,
  // 雇主首页刷新状态
  employerRefreshMark: 0,
  // 喵喵圈首页刷新状态
  meowRefreshMark: 0,
  // 设计师首页刷新状态
  designerRefreshMark: 0,
  //我的订单tab状态
  orderTabIndex:0,
  //我的订单页面动画方向
  directionOrderTab:0,
  //案例列表刷新状态
  caseRefreshMark:0,

}

//这里的mutations是固定的写法，意思是改变的，要改变数据的方法，必须写在mutations里。
const mutations={
    modifyPageIndex(index){
        tabbar.pageIndex = index;
    },
    //改变我的订单tab状态
    changeIndexOrder(state,payload){
        state.orderTabIndex=payload.index;
    },

}

//用export default 封装代码，让外部可以引用。
export default new Vuex.Store({
  state,
  mutations
});
