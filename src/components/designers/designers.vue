<template>
  <div class="">
    <!-- 上拉加载 -->
    <scroller lock-x height="" @on-scroll-bottom="onScrollBottom" @on-scroll="onScroll" ref="scrollerBottom" :scroll-bottom-offst="100">
      <div>
        <div class="content" style="margin-top: 0rem;padding-bottom: 4.3rem;">
          <div class="sjs-list" v-for="item in designers">
            <div class="sjs-top" v-tap="{methods:toDetails, id:item._id}">
              <div class="st-touxiang">
                <img :src="checkAvatar(item.img)" />
              </div>
              <div class="st-neirong">
                <div class="sn-top">
                  <div class="st-nicheng">{{item.user_name}}</div>
                  <div class="st-pingxin" style="width: 2.5rem">
                    <rater v-model="item.composite_score" star="<i class='icon iconfont icon-star-red'></i>" active-color="#FF9900" :disabled="true" :max="5" :margin="5" :font-size="14"></rater>
                  </div>
                </div>
                <div class="sn-bottom">
                  <div class="sb-nianling">{{item.working_years}}年</div>
                  <div class="sb-qian" v-if="item.authenticating_state>5">签</div>
                  <div class="sb-ysm" v-if="item.authenticating_state>1">已实名</div>
                  <div class="sb-yrz" v-if="item.authenticating_state>3">已认证</div>
                </div>
              </div>
              <div class="st-jiageleixin">
                <div class="st-jiage"><span>￥</span><span>{{item.hourly_wage}}</span>/时</div>
                <div class="st-leixin"><span>{{getNameById(item.user_type)}}</span></div>
              </div>
            </div>
            <div class="sjs-content" v-tap="{methods:toDetails, id:item._id}">
              <div class="sc-jiesao">{{item.description}}</div>
            </div>
            <div class="sjs-bottom">
              <div class="sjs-yysj"v-tap="{methods:toUrl,pagename:'maintain'}">应邀设计</div>
              <div class="sjs-mmlt"v-tap="{methods:toUrl,pagename:'maintain'}">喵喵聊天</div>
            </div>
          </div>
        </div>
        <load-more :show-loading="showLoading" :tip="loadtext" background-color="#fbf9fe" style="margin-top: 30px"></load-more>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {LoadMore, Scroller, Rater  } from 'vux'
  export default {
    components: {
      Scroller,
      LoadMore,
      Rater
    },
    props:{
      value: String,              // 模糊查询字符串
      // sortMark: Number,           // 排序标识
    },
    data() {
      return {
        sortMark:0,
        designers: [],
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
    activated: function () {
      console.log("designers activated:")
      var drm = this.$store.state.designerRefreshMark;
      if ( drm > 0 ) {
        this.$store.state.designerRefreshMark = 0;
        this.pageNo = 0;
        this.pageSize = 10;
        this.onFetching = true;
        this.loadMore()
      }
    },
    created: function () {
      console.log("designers created:")
      this.loadMore()
    },
    mounted: function () {
      console.log("designers mounted:")
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      })
    },
    methods: {
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
      },
      // 详情页
      toDetails (param) {
        // console.log("param.id:"+param.id)
        this.$router.push({name: 'sjszxxq', query: {id: param.id}})
      },
      /*******************************************************/
      // 项目类型名称
      getNameById (id) {
        return common.getNameByTypeId(id)
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      // 滑动
      onScroll (sroll) {
        // console.log("onScroll:"+JSON.stringify(sroll))
      },

      // 下拉加载下拉加载
      onScrollBottom () {
        // console.log("onScrollBottom:")
        var _self = this
        if (_self.onFetching) {
          // do nothing
        } else {
          _self.onFetching = true
          setTimeout(() => {
            _self.loadMore()
          }, 100)
        }
      },

      // 加载更多
      loadMore () {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.getDesigners,
          pageNo: _self.pageNo,
          pageSize: _self.pageSize
        }
        //条件查询
        params.where = {};
        // 模糊查询
        if( !common.isNull(_self.value) ){
          params.where.user_name = {$regex : _self.value};
        }
        // 排序标识
        params.sort = {create_date:-1};
        var sortMark = common.checkInt(_self.sortMark);
        if( sortMark == 1 ){
          params.sort = {composite_score:-1} ;
        }else if( sortMark == 4 ){
          params.where.working_years = {$lte:1};
        }else if( sortMark == 5 ){
          params.where.working_years = {$lte:3, $gt:1};
        }else if( sortMark == 6 ){
          params.where.working_years = {$lte:5, $gt:3};
        }else if( sortMark == 7 ){
          params.where.working_years = {$gt:5};
        }else if( sortMark == 9 ){
          params.where.authenticating_state = {$gte:2};
        }else if( sortMark == 10 ){
          params.where.authenticating_state = {$gte:4};
        }else if( sortMark == 11 ){
          params.where.authenticating_state = 6;
        }
        //上拉加载
        _self.loadtext = _self.loadrefresh;
        _self.showLoading = true;
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response)
          var data = response.data
          if ( data ) {
            _self.setUserData(data);
          }
        })
      },

      setUserData(data){
        var _self = this;
        // 设计师
        var designers = data.designers || [];
        //判断页码是否为0
        if( _self.pageNo == 0 ){
          _self.designers = designers;
        }else{
          _self.designers = [..._self.designers, ...designers];
        }
        //重置页面滚动距离
        _self.$nextTick(() => {
          _self.$refs.scrollerBottom.reset()
        })
        //底部加载动画
        _self.showLoading = false;
        //判断数据是否有一页
        if ( designers.length < _self.pageSize ) {
          _self.loadtext = _self.loadnomore;
        } else {
          _self.loadtext = _self.loadmore;
          _self.onFetching = false
          _self.pageNo++;
        }
      },

      // 重新加载数据
      refreshData(mark){
        var _self = this;
        _self.pageNo = 0;
        _self.sortMark = mark;
        _self.loadMore();
      },

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../static/css/index/search-jieguo.css";
</style>
