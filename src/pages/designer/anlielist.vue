<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>{{title}}</span>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <!-- 上拉加载 -->
      <scroller lock-x height="" @on-scroll-bottom="onScrollBottom" @on-scroll="onScroll" ref="scrollerBottom" :scroll-bottom-offst="100">
        <div>
          <div class="alzs-list" v-for="item in chws" v-tap="{methods:toUrl,pagename:'anliexq',id:item._id}">
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
          <load-more :show-loading="showLoading" :tip="loadtext" background-color="#fbf9fe" style="margin-top: 30px"></load-more>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  import { LoadMore, Scroller } from 'vux'
  import common from "../../../static/js/common";
  export default {
    components: {
      Scroller,
      LoadMore
    },
    data () {
      return {
        title:'',
        type: 0,
        user_id: '',
        chws:[],

        pageNo: 0,
        pageSize: 10,
        onFetching: true,
        showLoading: false,
        loadtext: '上拉加载',
        loadmore: '上拉加载',
        loadrefresh: '正在加载...',
        loadnomore: '没有更多数据了'
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      })
    },
    activated: function () {
      console.log("anlielist activated:")
      var _self = this;
      if( _self.isInit == true  ){
        var userInfo = common.getObjStorage("userInfo") || {};
        if( common.isNull(userInfo._id) != true ){
          _self.user_id = userInfo._id;
        }
        _self.type = _self.$route.query.flag;
        _self.title = _self.type==0 ? '案例展示' : _self.type==1 ? '个人荣誉' : _self.type==2 ? '我的作品' :'';
        _self.initData();
      }
      _self.isInit = true;
    },
    created: function () {
      console.log("anlielist created:")
      var _self = this;
      var userInfo = common.getObjStorage("userInfo") || {};
      if( common.isNull(userInfo._id) != true ){
        _self.user_id = userInfo._id;
      }
      _self.type = _self.$route.query.flag;
      _self.title = _self.type==0 ? '案例展示' : _self.type==1 ? '个人荣誉' : _self.type==2 ? '我的作品' :'';
      _self.initData();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (param) {
        this.$router.push({name: param.pagename,query:{id:param.id}})
      },
      // 默认图片
      getDefultImg (path) {
        return common.getAvatar(path,'./static/images/bj.jpg')
      },
      // 时间戳转字符串
      getStringDate(date,id){
        return common.timeStamp2String(date,id)
      },
      /*************************************************/
      // 滑动
      onScroll: function (sroll) {
      },
      // 下拉加载下拉加载
      onScrollBottom: function () {
        var _self = this
        if (_self.onFetching) {
          // do nothing
        } else {
          _self.onFetching = true
          setTimeout(() => {
            _self.initData()
          }, 100)
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
          interfaceId: common.interfaceIds.queryData,
          coll: common.collections.personalChw,
          where: {
            user_id: _self.user_id,
            type: common.checkInt(_self.type)
          },
          other: {
            skip: _self.pageNo*_self.pageSize,
            limit:_self.pageSize
          }
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response);
          var data = response.data
          if ( data ) {
            //判断页码是否为0
            if( _self.pageNo == 0 ){
              _self.chws = data;
            }else{
              _self.chws = [..._self.chws, ...data];
            }
            //重置页面滚动距离
            _self.$nextTick(() => {
              _self.$refs.scrollerBottom.reset()
            })
            //底部加载动画
            _self.showLoading = false;
            //判断数据是否有一页
            if ( data.length < _self.pageSize ) {
              _self.loadtext = _self.loadnomore;
            } else {
              _self.loadtext = _self.loadmore;
              _self.onFetching = false
              _self.pageNo++;
            }
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/anlielist.css';
</style>
