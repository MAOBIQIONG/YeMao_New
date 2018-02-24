<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
    </div>
    <div class="content content-p">
      <!--设计师基本信息模块-->
      <div class="xinximokuai">
        <div class="ximk-top">
          <div class="touxiang">
            <img :src="checkAvatar(user.img)" />
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
              <rater v-model="user.composite_score" star="<i class='icon iconfont icon-star-red'></i>" active-color="#FF9900" :disabled="true" :max="5" :margin="5" :font-size="14"></rater>
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
            <div @click="collect()">
                <div class="scsjs" v-if="collectFlag==0">
                    收藏设计师
                </div>
                <div class="scsjs ysc" v-else>
                    已收藏
                </div>
            </div>

            <div class="xiaoxi" v-tap="{methods:toUrl2,pagename:'liaotian',query:{id:user._id,name:user.user_name,img:user.img}}">
                <img src="../../../static/images/designer/xiangqing_liaotian.png" alt="">
            </div>
        </div>
      <!--日历选取-->
      <div class="rili">
        <inline-calendar
          ref="calendar"
          class="inline-calendar-demo"
          :disable-date-function="disableDateFunction">
        </inline-calendar>
      </div>
      <!--滑动轮播-->
      <div class="huadonglunpo">
        <tab :line-width=2 active-color='#fc378c' v-model="index">
          <tab-item class="vux-center" key="0">案列展示</tab-item>
          <tab-item class="vux-center" key="1">个人荣誉</tab-item>
          <tab-item class="vux-center" key="2">我的作品</tab-item>
        </tab>
      </div>
      <div class="lunpo">
        <swiper v-model="index" height="100%" :show-dots="false" @on-index-change="onIndexChange" class="swps">
          <swiper-item key="0">
            <div class="alzs-list" v-for="item in cases" v-tap="{methods:toUrl,pagename:'anliexq',id:item._id}">
              <div class="al-top">
                <div class="touxiang">
                  <img :src="getDefultImg(item.cover)" />
                </div>
                <div class="al-right">
                  <div class="ar-top">{{item.title}}</div>
                  <div class="nenrong">{{item.description}}</div>
                </div>
              </div>
              <div class="al-bottom">
                <div class="al-left">
                  <p><span><img src="../../../static/images/designer/anli_xihuan.png"></span><span>{{item.collection}}</span></p>
                  <p><span><img src="../../../static/images/designer/anli_liulan.png"></span><span>{{item.comments}}</span></p>
                </div>
                <div class="al-right">{{getStringDate(item.create_date)}}</div>
              </div>
            </div>
            <div class="more" v-if="cases.length==3" v-tap="{methods:toChws, flag:0}">查看更多</div>
          </swiper-item>
          <swiper-item key="1">
            <div class="alzs-list" v-for="item in honors" v-tap="{methods:toUrl,pagename:'anliexq',id:item._id}">
              <div class="al-top">
                <div class="touxiang">
                  <img :src="getDefultImg(item.cover)" />
                </div>
                <div class="al-right">
                  <div class="ar-top">{{item.title}}</div>
                  <div class="nenrong">{{item.description}}</div>
                </div>
              </div>
              <div class="al-bottom">
                <div class="al-left">
                  <p><span><img src="../../../static/images/designer/anli_xihuan.png"></span><span>{{item.collection}}</span></p>
                  <p><span><img src="../../../static/images/designer/anli_liulan.png"></span><span>{{item.comments}}</span></p>
                </div>
                <div class="al-right">{{getStringDate(item.create_date)}}</div>
              </div>
            </div>
            <div class="more" v-if="honors.length==3" v-tap="{methods:toChws, flag:1}">查看更多</div>
          </swiper-item>
          <swiper-item key="2">
            <div class="alzs-list" v-for="item in works" v-tap="{methods:toUrl,pagename:'anliexq',id:item._id}">
              <div class="al-top">
                <div class="touxiang">
                  <img :src="getDefultImg(item.cover)" />
                </div>
                <div class="al-right">
                  <div class="ar-top">{{item.title}}</div>
                  <div class="nenrong">{{item.description}}</div>
                </div>
              </div>
              <div class="al-bottom">
                <div class="al-left">
                  <p><span><img src="../../../static/images/designer/anli_xihuan.png"></span><span>{{item.collection}}</span></p>
                  <p><span><img src="../../../static/images/designer/anli_liulan.png"></span><span>{{item.comments}}</span></p>
                </div>
                <div class="al-right">{{getStringDate(item.create_date)}}</div>
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
  import {Tab, TabItem, Swiper, SwiperItem, InlineCalendar, Rater } from 'vux'
  export default {
    components: {
      InlineCalendar,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Rater
    },
    data () {
      return {
        index: 0,
        user:{},
        loadMark:1,
        cases: [],
        honors: [],
        works: [],
        collectFlag:0,
        // isLogin:false,
      }
    },
    activated: function () {
      var _self = this;
      if( _self.isInit == true  ){
        _self.user_id = this.$route.query.id;
        _self.index=0;
        _self.loadMark=1;
        _self.cases=[];
        _self.honors=[];
        _self.works=[];
        _self.collectFlag = 0;
        _self.initData();
      }
      _self.isInit = true;
    },
    created: function () {
        console.log("created:")
        var _self = this;
        _self.user_id = this.$route.query.id;
        _self.initData();
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            // _self.isLogin = true;
            _self.my_id = user._id
        }
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (param) {
        this.$router.push({name: param.pagename,query:{id:param.id}})
      },
      toUrl2: function (params) {
        this.$router.push({name: params.pagename,query:params.query || {}})
      },
      toChws: function (params) {
        var _self = this;
        _self.$router.push({name: 'anlielist', query:{flag:params.flag}})
      },
        checkLogin(){
            var _self = this;
            var user = common.getObjStorage("userInfo") || {};
            if(common.isNull(user._id)){
                console.log('没有获取用户信息');
                _self.$router.push({name:"login"});
                return false;
            }
            return true;
        },
      // 项目类型名称
      getNameById (id) {
        return common.getNameByTypeId(id)
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      // 默认图片
      getDefultImg (path) {
        return common.getAvatar(path,'./static/images/bj.jpg')
      },
      // 时间戳转字符串
      getStringDate(date,id){
        return common.timeStamp2String(date,id)
      },
      /*******************************************************/
      // 日历
      disableDateFunction (date) {
        // console.log("date:"+date)
        if (date.formatedDate === '2017-12-28') {
          return true
        }
      },

      // swiper
      onIndexChange (index) {
        console.log("index:"+index)
        var _self = this;
        if( index == _self.loadMark ){
          console.log("getChw:")
          _self.getChw();
        }
      },

      /*************************************************/
      // 初始化首页
      initData () {
        var _self = this;
        if( common.isNull(_self.user_id) ){
          return;
        }
        var params = {
          interfaceId: common.interfaceIds.prsonalCenter,
          user_id: _self.user_id,
          my_id: _self.my_id,
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response);
          var data = response.data
          if ( data ) {
            _self.user = data.user || {};
            _self.cases = data.cases || [];
            _self.collectFlag = data.collectFlag;
          }
        })
      },

      // 获取personalChw:
      getChw () {
        var _self = this;
        if( common.isNull(_self.user_id) ){
          return;
        }
        var params = {
          interfaceId: common.interfaceIds.getPersonalChw,
          pageNo:0,
          pageSize:3,
          where:{
            user_id: _self.user_id,
            type: _self.loadMark
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response);
          var data = response.data
          if ( data ) {
            if( _self.loadMark == 1 ){
              _self.honors = data.chws || [];
            }else if( _self.loadMark == 2 ){
              _self.works = data.chws || [];
            }
            _self.loadMark++;
          }
        })
      },
        // 收藏
        collect_dom(param){
            var _self = this;
            _self.collectFlag == 0 ? _self.collectFlag=1 : _self.collectFlag=0;
        },
        collect(){
            var _self = this;
            // if(_self.isLogin == false){
            //     _self.$router.push({name: 'login'});
            // }
            if(_self.checkLogin()){
                _self.collect_dom();
            } else {
                return;
            }

            console.log(this.collectFlag);
            // return;
            var params = {
                interfaceId:common.interfaceIds.collect,
                data:{
                    collect_type: 1,//设计师收藏
                    collect_id: _self.user._id,
                    user_id: _self.my_id,
                }
            }
            _self.$axios.post('/mongoApi', {
                params: params
            }, response => {
                var data = response.data;
                var tips = '';
                if( data && data.code == 200 ){
                tips = _self.chw.collectFlag == 0 ? '取消成功！' : '收藏成功！';
                }else{
                tips = _self.chw.collectFlag == 0 ? '取消失败！' : '收藏失败！';
                }
                _self.showToast(tips);
            })
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/sjsgeren.css';
  .xinximokuai{
   height: 4.8rem !important;
  }
  .content .rili{
    margin-top: 0.6rem !important;
  }
  .swps{
    height:8rem !important;
    overflow:auto !important;
  }
  .more{
    font-size: .3rem;
    color: #999;
    text-align: center;
    padding: .25rem;
  }
  .ysc{
      background:#999!important;
  }
</style>
