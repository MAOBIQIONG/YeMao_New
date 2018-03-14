import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import employer from '@/pages/employer/employer'
import emporder from '@/pages/employer/order'
import emporderimgs from '@/pages/employer/order-preview-imgs'
import emporderparts from '@/pages/employer/order-participants'
import meow from '@/pages/meow/meow'
import designer from '@/pages/designer/designer'
import my from '@/pages/my/my'
import home from '@/pages/main/home'
import zhlogin from '@/pages/login/login'
import wjmm from '@/pages/login/wjmm'
import login from '@/pages/login/zhlogin'
import zhuche from '@/pages/login/zhuche'
import zhuche2 from '@/pages/login/zhuche2'
import register from '@/pages/login/register'
import fenlei from '@/pages/index/fenlei'
import informxitong from '@/pages/index/informxitong'
import activitynotice from '@/pages/index/activity-notice'
import systemnotice from '@/pages/index/system-notice'
import leibie from '@/pages/index/leibie'
import message from '@/pages/index/message'
import search from '@/pages/index/search'
import searchjieguo from '@/pages/index/searchjieguo'
import searchresults from '@/pages/index/search-results'
import daichulixq from '@/pages/employer/daichulixq'
import fabudingdan from '@/pages/employer/fabudingdan'
import myorderchuli from '@/pages/employer/myorderchuli'
import orderpingjia from '@/pages/employer/orderpingjia'
import orderqiangdan from '@/pages/employer/orderqiangdan'
import shoucangsjs from '@/pages/employer/shoucangsjs'
import zfcg from '@/pages/employer/zfcg'
import payment from '@/pages/employer/payment'
import liaotian from '@/pages/chat/liaotian'
import groupchat from '@/pages/chat/group_chat'
import daizhifu from '@/pages/employer/daizhifu'
import daijiaofu from '@/pages/employer/daijiaofu'
import yiwancheng from '@/pages/employer/yiwancheng'
import yijianhuisheng from '@/pages/employer/yijianhuisheng'
import releaseSuccess from '@/pages/employer/releaseSuccess'
import sjszxxq from '@/pages/designer/sjszx-xq'
import myorderdesigner from '@/pages/designer/myorder-designer'
import shejishigerenzhongxin from '@/pages/designer/shejishigerenzhongxin'
import xiugaigerenxinxi from '@/pages/designer/xiugaigerenxinxi'
import restday from '@/pages/designer/restday'
import jianjiexiugai from '@/pages/designer/jianjiexiugai'
import rongyushangcuan from '@/pages/designer/rongyushangcuan'
import zuopingshangchuan from '@/pages/designer/zuopingshangchuan'
import mymoney from '@/pages/designer/mymoney'
import shouzhiminxi from '@/pages/designer/shouzhiminxi'
import tixian from '@/pages/designer/tixian'
import renzheng from '@/pages/designer/renzheng'
import shimingrenzheng from '@/pages/designer/shimingrenzheng'
import pingtairenzheng from '@/pages/designer/pingtairenzheng'
import qianyuesjs from '@/pages/designer/qianyuesjs'
import zhichengrenzheng from '@/pages/designer/zhichengrenzheng'
import tijiaoshenhe from '@/pages/designer/tijiaoshenhe'
import anliexq from '@/pages/designer/anliexq'
import tixianchenggong from '@/pages/designer/tixianchenggong'
import renzhengchenggong from '@/pages/designer/renzhengchenggong'
import competiteSuccess from '@/pages/designer/competiteSuccess'
import anlielist from '@/pages/designer/anlielist'
import set from '@/pages/my/set'
import setnicheng from '@/pages/my/set-nicheng'
import setnum from '@/pages/my/set-num'
import setpassword from '@/pages/my/set-password'
import mineguanyu from '@/pages/my/mine-guanyu'
import minehuodong from '@/pages/my/mine-huodong'
import minejianli from '@/pages/my/mine-jianli'
import minepinlun from '@/pages/my/mine-pinlun'
import mineshouchang from '@/pages/my/mine-shouchang'
import minewenda from '@/pages/my/mine-wenda'
import collectionDesigner from '@/pages/my/collection_designer'
import collectionMxt from '@/pages/my/collection_mxt'
import collectionOrder from '@/pages/my/collection_order'
import collectionQa from '@/pages/my/collection_qa'
import collectionResume from '@/pages/my/collection_resume'
import yijian from '@/pages/my/yijian'
import miaomiaoquan from '@/pages/my/miaomiaoquan'
import fenxiang from '@/pages/my/fenxiang'
import uploadImg from '@/pages/designer/uploadImg'
import fbmmq from '@/pages/meow/fbmmq'
import bianjigongzuojinli from '@/pages/meow/bianjigongzuojinli'
import chuangjianxiaoyouhui from '@/pages/meow/chuangjianxiaoyouhui'
import ddsh from '@/pages/meow/ddsh'
import dianzhan from '@/pages/meow/dianzhan'
import alumniList from '@/pages/meow/alumniList'
import gongzuojinli from '@/pages/meow/gongzuojinli'
import fbwd from '@/pages/meow/fbwd'
import pengyouquanxq from '@/pages/meow/pengyouquanxq'
import pinlunxiangqing from '@/pages/meow/pinlunxiangqing'
import qiwanggongzuo from '@/pages/meow/qiwanggongzuo'
import shouchangjianli from '@/pages/meow/shouchang-jianli'
import shouchangmxt from '@/pages/meow/shouchang-mxt'
import shouchangweida from '@/pages/meow/shouchang-weida'
import tianxiejianli from '@/pages/meow/tianxiejianli'
import tongxunluhaoyou from '@/pages/meow/tongxunluhaoyou'
import wdxq from '@/pages/meow/wdxq'
import wzxq from '@/pages/meow/wzxq'
import xiaoyouhui from '@/pages/meow/xiaoyouhui'
import xuexiaoxiangqing from '@/pages/meow/xuexiaoxiangqing'
import zuopinshangchuan from '@/pages/meow/zuopinshangchuan'
import haibao from '@/pages/meow/haibao'
import haibaoxq from '@/pages/meow/haibaoxq'
import gerenzuoping from '@/pages/meow/gerenzuoping'
import guide from '@/pages/main/guide'
import maintain from '@/pages/main/maintain'


Vue.use(Router)

Router.prototype.goBack = function (num) {
  if( num == null || num == undefined ){
    num = -1;
  }
  this.isBack = true
  window.history.go(num)
}

const routeArray = [
  // 1、打包后，浏览器运行首页空白
  {
    path: '/dist/index.html',
    redirect: '/home/index'
  },
  {
    path: '/dist',
    redirect: '/home/index'
  },
  {
    path: '/',
    redirect: '/home/index'
  },
  // 引导页
  {
    path: '/guide',
    name: 'guide',
    component: guide,
  },
  {
    path: '/maintain',
    name: 'maintain',
    component: maintain,
  },
  // 嵌套路由(router-view)：配置子路由
  {
    path: '/home',
    component: home,
    meta: { keepAlive: true },
    children: [
      {
        path: 'index',
        name: 'index',
        component: index,
        meta: { keepAlive: true }
      },
      {
        path: 'employer',
        name: 'employer',
        component: employer,
        meta: { keepAlive: true }
      },
      {
        path: 'meow',
        name: 'meow',
        component: meow,
        meta: { keepAlive: true }
      },
      {
        path: 'designer',
        name: 'designer',
        component: designer,
        meta: { keepAlive: true }
      },
      {
        path: 'my',
        name: 'my',
        component: my,
        meta: { keepAlive: true }
      }
    ]
  },
  // 雇主订单
  {
    path: '/emporder',
    name: 'emporder',
    component: emporder,
    meta: { keepAlive: true }
  },
  // 雇主订单预览图片页面
  {
    path: '/emporderimgs',
    name: 'emporderimgs',
    component: emporderimgs
  },
  // 雇主订单已参与人员列表
  {
    path: '/emporderparts',
    name: 'emporderparts',
    component: emporderparts
  },
  //meow模块
  { path: '/gerenzuoping',
    name: 'gerenzuoping',
    component: gerenzuoping
  },
  { path: '/haibao',
    name: 'haibao',
    component: haibao
  },
  { path: '/haibaoxq',
    name: 'haibaoxq',
    component: haibaoxq
  },
  { path: '/xiaoyouhui',
    name: 'xiaoyouhui',
    component: xiaoyouhui
  },
  { path: '/xuexiaoxiangqing',
    name: 'xuexiaoxiangqing',
    component: xuexiaoxiangqing
  },
  { path: '/zuopinshangchuan',
    name: 'zuopinshangchuan',
    component: zuopinshangchuan
  },
  { path: '/tongxunluhaoyou',
    name: 'tongxunluhaoyou',
    component: tongxunluhaoyou
  },
  { path: '/wdxq',
    name: 'wdxq',
    component: wdxq
  },
  { path: '/wzxq',
    name: 'wzxq',
    component: wzxq
  },
  { path: '/tianxiejianli',
    name: 'tianxiejianli',
    component: tianxiejianli
  },
  { path: '/shouchangweida',
    name: 'shouchangweida',
    component: shouchangweida
  },
  { path: '/shouchangmxt',
    name: 'shouchangmxt',
    component: shouchangmxt
  },
  { path: '/shouchangjianli',
    name: 'shouchangjianli',
    component: shouchangjianli
  },
  { path: '/qiwanggongzuo',
    name: 'qiwanggongzuo',
    component: qiwanggongzuo
  },
  { path: '/pinlunxiangqing',
    name: 'pinlunxiangqing',
    component: pinlunxiangqing
  },
  { path: '/pengyouquanxq',
    name: 'pengyouquanxq',
    component: pengyouquanxq
  },
  { path: '/fbwd',
    name: 'fbwd',
    component: fbwd
  },
  { path: '/gongzuojinli',
    name: 'gongzuojinli',
    component: gongzuojinli
  },
  { path: '/dianzhan',
    name: 'dianzhan',
    component: dianzhan
  },
    {
        path: '/alumniList',
        name: 'alumniList',
        component: alumniList
    },
  { path: '/ddsh',
    name: 'ddsh',
    component: ddsh
  },
  { path: '/chuangjianxiaoyouhui',
    name: 'chuangjianxiaoyouhui',
    component: chuangjianxiaoyouhui
  },
  { path: '/bianjigongzuojinli',
    name: 'bianjigongzuojinli',
    component: bianjigongzuojinli
  },
  { path: '/fbmmq',
    name: 'fbmmq',
    component: fbmmq
  },
  // my模块
  { path: '/fenxiang',
    name: 'fenxiang',
    component: fenxiang
  },
  { path: '/miaomiaoquan',
    name: 'miaomiaoquan',
    component: miaomiaoquan
  },
  { path: '/yijian',
    name: 'yijian',
    component: yijian
  },
  { path: '/mineguanyu',
    name: 'mineguanyu',
    component: mineguanyu
  },
  { path: '/minehuodong',
    name: 'minehuodong',
    component: minehuodong
  },
  { path: '/minejianli',
    name: 'minejianli',
    component: minejianli
  },
  { path: '/minepinlun',
    name: 'minepinlun',
    component: minepinlun
  },
  { path: '/mineshouchang',
    name: 'mineshouchang',
    component: mineshouchang
  },
  { path: '/minewenda',
    name: 'minewenda',
    component: minewenda
  },
  { path: '/setpassword',
    name: 'setpassword',
    component: setpassword
  },
  { path: '/setnum',
    name: 'setnum',
    component: setnum
  },
  { path: '/setnicheng',
    name: 'setnicheng',
    component: setnicheng
  },
  { path: '/set',
    name: 'set',
    component: set
  },
  // 设计师模块
  {
    path: '/myorderdesigner',
    name: 'myorderdesigner',
    component:myorderdesigner
  },
  { path: '/anlielist',
    name: 'anlielist',
    component: anlielist,
    meta: { keepAlive: true }
  },
  { path: '/renzhengchenggong',
    name: 'renzhengchenggong',
    component: renzhengchenggong
  },
  { path: '/competiteSuccess',
    name: 'competiteSuccess',
    component: competiteSuccess
  },
  { path: '/tixianchenggong',
    name: 'tixianchenggong',
    component: tixianchenggong
  },
  { path: '/pingtairenzheng',
    name: 'pingtairenzheng',
    component: pingtairenzheng
  },
  { path: '/qianyuesjs',
    name: 'qianyuesjs',
    component: qianyuesjs
  },
  { path: '/zhichengrenzheng',
    name: 'zhichengrenzheng',
    component: zhichengrenzheng
  },
  { path: '/tijiaoshenhe',
    name: 'tijiaoshenhe',
    component: tijiaoshenhe
  },
  { path: '/anliexq',
    name: 'anliexq',
    component: anliexq
  },
  { path: '/mymoney',
    name: 'mymoney',
    component: mymoney
  },
  { path: '/shouzhiminxi',
    name: 'shouzhiminxi',
    component: shouzhiminxi
  },
  { path: '/tixian',
    name: 'tixian',
    component: tixian
  },
  { path: '/renzheng',
    name: 'renzheng',
    component: renzheng
  },
  { path: '/shimingrenzheng',
    name: 'shimingrenzheng',
    component: shimingrenzheng
  },
  { path: '/shejishigerenzhongxin',
    name: 'shejishigerenzhongxin',
    component: shejishigerenzhongxin,
    meta: { keepAlive: true }
  },
  { path: '/sjszxxq',
    name: 'sjszxxq',
    component: sjszxxq,
    meta: { keepAlive: true }
  },
  { path: '/xiugaigerenxinxi',
    name: 'xiugaigerenxinxi',
    component: xiugaigerenxinxi
  },
  { path: '/restday',
    name: 'restday',
    component: restday
  },
  { path: '/jianjiexiugai',
    name: 'jianjiexiugai',
    component: jianjiexiugai
  },
  { path: '/rongyushangcuan',
    name: 'rongyushangcuan',
    component: rongyushangcuan
  },
  { path: '/zuopingshangchuan',
    name: 'zuopingshangchuan',
    component: zuopingshangchuan
  },
  { path: '/uploadImg',
    name: 'uploadImg',
    component: uploadImg
  },
  // 雇主模块
  { path: '/yijianhuisheng',
    name: 'yijianhuisheng',
    component: yijianhuisheng
  },
  { path: '/daizhifu',
    name: 'daizhifu',
    component: daizhifu
  },
  { path: '/daijiaofu',
    name: 'daijiaofu',
    component: daijiaofu
  },
  { path: '/yiwancheng',
    name: 'yiwancheng',
    component: yiwancheng
  },
  { path: '/daichulixq',
    name: 'daichulixq',
    component: daichulixq
  },
  { path: '/fabudingdan',
    name: 'fabudingdan',
    component: fabudingdan
  },
  {
    path: '/releaseSuccess',
    name: 'releaseSuccess',
    component: releaseSuccess
  },
  { path: '/myorderchuli',
    name: 'myorderchuli',
    component: myorderchuli
  },
  { path: '/orderpingjia',
    name: 'orderpingjia',
    component: orderpingjia
  },
  { path: '/orderqiangdan',
    name: 'orderqiangdan',
    component: orderqiangdan
  },
  { path: '/shoucangsjs',
    name: 'shoucangsjs',
    component: shoucangsjs
  },
  { path: '/zfcg',
    name: 'zfcg',
    component: zfcg
  },
  { path: '/payment',
    name: 'payment',
    component: payment
  },
  { path: '/liaotian',
    name: 'liaotian',
    component: liaotian
  },
  { path: '/groupchat',
    name: 'groupchat',
    component: groupchat
  },
  // index模块
  { path: '/fenlei',
    name: 'fenlei',
    component: fenlei
  },
  { path: '/informxitong',
    name: 'informxitong',
    component: informxitong
  },
  { path: '/activitynotice',
    name: 'activitynotice',
    component: activitynotice
  },
  { path: '/systemnotice',
    name: 'systemnotice',
    component: systemnotice
  },
  { path: '/leibie',
    name: 'leibie',
    component: leibie
  },
  { path: '/message',
    name: 'message',
    component: message,
    meta: { keepAlive: true }
  },
  { path: '/search',
    name: 'search',
    component: search
  },
  { path: '/searchjieguo',
    name: 'searchjieguo',
    component: searchjieguo
  },
  { path: '/searchresults',
    name: 'searchresults',
    component: searchresults
  },
  // 登录模块
  { path: '/login',
    name: 'login',
    component: login
  },
  { path: '/wjmm',
    name: 'wjmm',
    component: wjmm
  },
  { path: '/zhlogin',
    name: 'zhlogin',
    component: zhlogin
  },
  { path: '/zhuche',
    name: 'zhuche',
    component: zhuche
  },
  { path: '/zhuche2',
    name: 'zhuche2',
    component: zhuche2
  },
  { path: '/register',
    name: 'register',
    component: register
  },
    {
        path: '/collectionDesigner',
        name: 'collectionDesigner',
        component: collectionDesigner
    },
    {
        path: '/collectionMxt',
        name: 'collectionMxt',
        component: collectionMxt
    },
    {
        path: '/collectionOrder',
        name: 'collectionOrder',
        component: collectionOrder
    },
    {
        path: '/collectionQa',
        name: 'collectionQa',
        component: collectionQa
    },
    {
        path: '/collectionResume',
        name: 'collectionResume',
        component: collectionResume
    },
  //其他url重定向
  {
    path:'*',
    name:"others",
    redirect:'/home/index'
  }

]

export default new Router({
  // mode: 'history',
  routes: routeArray,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
