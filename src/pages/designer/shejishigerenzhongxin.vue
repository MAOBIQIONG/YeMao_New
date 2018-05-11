<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      <span>个人详情</span>
      <div class="header-right" v-tap="{methods:toUrl, pagename:'xiugaigerenxinxi'}">设置</div>
    </div>
    <div class="content content-p">
      <!--设计师基本信息模块-->
      <div class="xinximokuai">
        <div class="ximk-top">
          <div class="touxiang">
            <img :src="checkAvatar(user.img)"/>
          </div>
          <div class="xiright">
            <div class="nicheng">
              <span class="name">{{user.user_name}}</span><span class="leixin">{{getNameById(user.user_type)}}</span>
            </div>
            <div class="nianxian">
              <span class="nian">{{user.working_years}}</span>年 &nbsp;<span class="xuexiao">{{user.school_name}}</span>
            </div>
            <div class="zhicheng">
              <span class="zc">{{user.certificate_name}}</span>&nbsp;&nbsp;
              <!--<span class="pinxin">☆ ☆ ☆ ☆</span>-->
              <rater v-model="user.composite_score" star="<i class='icon iconfont icon-star-red'></i>"
                     active-color="#FF9900" :disabled="true" :max="5" :margin="5" :font-size="14"></rater>
            </div>
          </div>
        </div>
        <div class="nenrong">{{user.description}}</div>
        <div class="danshu">
          <ul>
            <li>
              <p class="shumu">{{user.orders_number}}</p>
              <p>接单数</p>
            </li>
            <li>
              <p class="shumu">{{user.working_hours}}</p>
              <p>总工时</p>
            </li>
            <li>
              <p class="shumu">{{user.hourly_wage}}</p>
              <p>时薪</p>
            </li>
          </ul>
        </div>
      </div>
      <!--日历选取-->
      <div class="rili">
        <div class="rln">
          <inline-calendar
            v-model="dates"
            :return-six-rows="return6Rows"
            :disable-date-function="disableDateFunction"
            class="inline-calendar-demo" ref="calendar">
          </inline-calendar>
        </div>
      </div>
      <!--滑动轮播-->
      <div class="huadonglunpo">
        <tab :line-width=3 active-color='#fc378c' @on-item-click="onIndexChange" v-model="index">
          <tab-item class="vux-center" key="0">案例展示</tab-item>
          <tab-item class="vux-center" key="1">个人荣誉</tab-item>
          <tab-item class="vux-center" key="2">我的作品</tab-item>
        </tab>
      </div>
      <div class="lunpo">
        <swiper v-model="index" height="100%" :show-dots="false" @on-index-change="onIndexChange" class="swps">
          <swiper-item key="0">
            <div v-if="cases.length==0" class="noData">暂无数据</div>
            <div class="alzs-list" v-for="item in cases" v-tap="{methods:toUrl,pagename:'anliexq',query:{id:item._id,page:1}}">
              <div class="al-top">
                <div class="touxiang">
                  <img :src="getDefultImg(item.cover)"/>
                </div>
                <div class="al-right">
                  <div class="ar-top">{{item.title}}</div>
                  <div class="nenrong">{{item.description}}</div>
                </div>
              </div>
              <div class="al-bottom">
                <div class="al-left">
                  <p><span><img
                    src="../../../static/images/designer/anli_xihuan.png"></span><span>{{item.like}}</span></p>
                  <p><span><img
                    src="../../../static/images/designer/anli_liulan.png"></span><span>{{item.comments}}</span></p>
                </div>
                <div class="al-right">{{getStringDate(item.create_date)}}</div>
              </div>
            </div>
            <div class="more" v-if="cases.length==3" v-tap="{methods:toChws, flag:0}">查看更多</div>
          </swiper-item>
          <swiper-item key="1">
            <div v-if="honors.length==0" class="noData">暂无数据</div>
            <div class="alzs-list" v-for="item in honors" v-tap="{methods:toUrl,pagename:'anliexq',query:{id:item._id,page:1}}">
              <div class="al-top">
                <div class="touxiang">
                  <img :src="getDefultImg(item.cover)"/>
                </div>
                <div class="al-right">
                  <div class="ar-top">{{item.title}}</div>
                  <div class="nenrong">{{item.description}}</div>
                </div>
              </div>
              <div class="al-bottom">
                <div class="al-left">
                  <p><span><img
                    src="../../../static/images/designer/anli_xihuan.png"></span><span>{{item.like}}</span></p>
                  <p><span><img
                    src="../../../static/images/designer/anli_liulan.png"></span><span>{{item.comments}}</span></p>
                </div>
                <div class="al-right">{{item.date}}</div>
              </div>
            </div>
            <div class="more" v-if="honors.length==3" v-tap="{methods:toChws, flag:1}">查看更多</div>
          </swiper-item>
          <swiper-item key="2">
            <div v-if="works.length==0" class="noData">暂无数据</div>
            <div class="alzs-list" v-for="item in works" v-tap="{methods:toUrl,pagename:'anliexq',query:{id:item._id,page:1}}">
              <div class="al-top">
                <div class="touxiang">
                  <img :src="getDefultImg(item.cover)"/>
                </div>
                <div class="al-right">
                  <div class="ar-top">{{item.title}}</div>
                  <div class="nenrong">{{item.description}}</div>
                </div>
              </div>
              <div class="al-bottom">
                <div class="al-left">
                  <p><span><img
                    src="../../../static/images/designer/anli_xihuan.png"></span><span>{{item.like}}</span></p>
                  <p><span><img
                    src="../../../static/images/designer/anli_liulan.png"></span><span>{{item.comments}}</span></p>
                </div>
                <div class="al-right">{{item.date}}</div>
              </div>
            </div>
            <div class="more" v-if="works.length==3" v-tap="{methods:toChws, flag:2}">查看更多</div>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, Swiper, SwiperItem, InlineCalendar, Rater} from 'vux'

  export default {
    components: {
      InlineCalendar,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Rater
    },
    data() {
      return {
        index: 0,
        user: {},
        typeIndex: 1,
        pageOne: false,
        pageTwo: false,
        cases: [],
        honors: [],
        works: [],
        /**日历**/
        dates: [],
        return6Rows: true,
        disableDateFunction(date) {
          return true
          // var dateStr = common.getSomeday();
          // if (date.formatedDate === dateStr) {
          //   return true
          // }
        },
      }
    },
    activated: function () {
      var _self = this;
      var rcm = _self.$store.state.designerCenterMark;
      var userInfo = common.getObjStorage("userInfo") || {};
      if ( !common.isNull(userInfo._id) && !common.isNull(_self.user_id) &&
         (userInfo._id!=_self.user_id || rcm>0 ) ) {
        console.log("刷新设计师个人中心页面:")
        _self.$store.state.designerCenterMark=0;
        _self.user_id = userInfo._id;
        _self.index = 0;
        _self.cases = [];
        _self.honors = [];
        _self.works = [];
        _self.typeIndex = 1;
        _self.pageOne = false;
        _self.pageTwo = false;
        _self.initData();
      }
    },
    created: function () {
      var _self = this;
      var userInfo = common.getObjStorage("userInfo") || {};
      if( !common.isNull(userInfo._id) ) {
        _self.user_id = userInfo._id;
        _self.initData();
      }
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename, query: params.query})
      },
      toChws: function (params) {
        this.$router.push({name: 'anlielist', query: {flag: params.flag}})
      },
      // 项目类型名称
      getNameById(id) {
        return common.getNameByTypeId(id)
      },
      // 头像
      checkAvatar(path) {
        return common.getAvatar(path)
      },
      // 默认图片
      getDefultImg(path) {
        return common.getDefultImg(path)
      },
      // 时间戳转字符串
      getStringDate(date, id) {
        return common.timeStamp2String(date, id)
      },
      /*******************************************************/
      // 日历
      // swiper
      onIndexChange(index) {
        console.log("index:" + index)
        var _self = this;
        if( index==1 && _self.pageOne==false ){
          _self.pageOne=true;
          _self.typeIndex=index;
          _self.getChw();
        }else if( index==2 && _self.pageTwo==false ){
          _self.pageTwo=true;
          _self.typeIndex=index;
          _self.getChw();
        }
      },

      /*************************************************/
      // 初始化首页
      initData() {
        var _self = this;
        if (common.isNull(_self.user_id)) {
          return;
        }
        var params = {
          interfaceId: common.interfaceIds.prsonalCenter,
          user_id: _self.user_id
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data
          if (data) {
            _self.user = data.user || {};
            _self.cases = data.cases || [];
            _self.dates = data.restDay || [];
          }
        })
      },

      // 获取personalChw:
      getChw() {
        console.log("getChw：")
        var _self = this;
        if ( common.isNull(_self.user_id) ) {
          return;
        }
        var params = {
          interfaceId: common.interfaceIds.getPersonalChw,
          pageNo: 0,
          pageSize: 3,
          where: {
            user_id: _self.user_id,
            type: _self.typeIndex
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data
          if (data) {
            if (_self.typeIndex == 1) {
              _self.honors = data.chws || [];
            } else if (_self.typeIndex == 2) {
              _self.works = data.chws || [];
            }
          }
        })
      },

      // 刷新案例、荣誉、作品点赞、评论数量。
      refreshNum(){
//        var _self = this;
//        var chwCache = common.getObjStorage("chwCache");
//        if( chwCache ){ // _id/like/comments/type
//          var del = common.checkInt(chwCache.del);   // 删除
//          var type = common.checkInt(chwCache.type); // 类型
//          var arr = type==0 ? _self.cases :type==1 ? _self.honors : type==2 ? _self.works : [];
//          arr.forEach(function (item,index) {
//            if( item._id==chwCache._id && !common.isNull(chwCache._id) ){
//              console.log("del:"+del)
//              if( del==1 ){
//                arr.splice(index,1);
//              }else{
//                item.like += chwCache.like;
//                item.comments += chwCache.comments;
//              }
//              common.setStorage("chwCache",null);
//            }
//          })
//        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .calendar-title {
    color: #666 !important;
  }

  .inline-calendar th {
    color: #666 !important;
  }

  .inline-calendar table {
    color: #666 !important;
  }
  .inline-calendar td > span.vux-calendar-each-date {
    border-radius: inherit !important;
  }
  /*.vux-tab .vux-tab-item{*/
    /*background: none !important;*/
  /*}*/
</style>
<style scoped>
  @import '../../../static/css/designer/sjsgeren.css';
  .swps {
    height: 8rem !important;
    overflow: auto !important;
  }
  .more {
    font-size: .3rem;
    color: #999;
    text-align: center;
    padding: .25rem;
  }
  .header {
      border-bottom: none;
    }
  .noData{
      font-size:0.28rem;
      text-align:center;
      padding:1rem;
  }
</style>
