import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  count:0,
  // 首页底部导航栏页面状态
  pageIndex:0,
  // 首页页面刷新状态
  indexRefreshMark:0,
  // 页面订单详情刷新状态
  detailRefreshMark:0,

}

//这里的mutations是固定的写法，意思是改变的，要改变数据的方法，必须写在mutations里。
const mutations={
  modifyPageIndex(index){
    tabbar.pageIndex = index;
  },
}

//用export default 封装代码，让外部可以引用。
export default new Vuex.Store({
  state,
  mutations
});
