<template>
  <div class="miaomiao">
    <!--  喵喵列表  -->
    <div class="mm-list miao">
      <scroller
        v-model="pullUpDownStatus"
        :height="height"
        :lock-x="lockX"
        :lock-y="lockY"
        :use-pulldown="true"
        :use-pullup="true"
        :pulldown-config="pulldownConfig"
        :pullup-config = "pullupConfig"
        @on-scroll="scroll"
        @on-scroll-bottom="onScrollBottom"
        @on-pulldown-loading="pullDownLoading"
        @on-pullup-loading="pullUpLoading"
        ref="scroller"
      >
        <div>
          <!--<div class="blank"></div>-->
          <div class="sjse-list" v-for="(item,index) in meows" v-tap="{methods:toUrl,pagename:'pengyouquanxq',id:item._id}">
            <div class="sjs-top">
              <div class="st-touxiang" v-tap="{methods:toUrl,pagename:'sjszxxq',id:item.user_id}">
                <img :src="checkAvatar(item.user.img)"/>
              </div>
              <div class="st-neirong">
                <div class="sn-top">
                  <div class="st-nicheng">{{item.user.user_name}}</div>
                  <div class="st-pingxin"></div>
                </div>
                <div class="sn-bottom">
                  <div class="sb-qian" v-if="item.user.authenticating_state>5">签</div>
                  <div class="sb-ysm" v-if="item.user.authenticating_state>1">已实名</div>
                  <div class="sb-yrz" v-if="item.user.authenticating_state>3">已认证</div>
                </div>
              </div>
              <div class="st-jiageleixin">
                <div class="st-jiage">{{timeStamp2String(item.create_date)}}</div>
              </div>
            </div>
            <div class="sjs-content">
              <div class="sc-jiesao">{{item.title}}</div>
            </div>
            <div class="sjs-bottom">
              <ul>
                <li v-for="(img, i) in item.imgs" v-tap="{methods:show,index:index,i:i}">
                  <div class="previewer-img" :class="'previewer'+index" :style="'background-image:url('+checkImg(img)+')'"></div>
                </li>
              </ul>
            </div>
            <div class="pinjia">
              <p class="dz" :class="item.likeFlag==1?'hover':''" v-tap="{methods:dianzan,index:index,id:item._id}"><span>{{item.like}}</span></p>
              <p class="comments"><span></span><span>{{item.comments}}</span></p>
              <!--<div class="more more-icon"></div>-->
            </div>
          </div>
          <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>
      </scroller>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
  import { Previewer, TransferDom, Scroller, LoadMore, Toast } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      Scroller,
      LoadMore,
      Toast
    },
    props: {
      height:String
    },
    data() {
      return {
        userInfo:{},
        meows:[],
        list: [],
        options: {
          previewer:'previewer0',
          getThumbBoundsFn:function (index) {
            console.log("getThumbBoundsFn:"+this.previewer)
            // find thumbnail element
            let thumbnail = document.querySelectorAll(this.previewer)[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },

        lockX:true,
        lockY:false,
        // height:"",
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        pullUpDownStatus: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        pulldownConfig:{
          content: '下拉刷新',
          height: 60,
          autoRefresh: false,
          downContent: '下拉刷新',
          upContent: '放开刷新',
          loadingContent: '刷新中...',
          clsPrefix: 'xs-plugin-pulldown-'
        },
        pullupConfig:{
          content: '上拉加载',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '放开加载',
          upContent: '上拉加载',
          loadingContent: '',
          clsPrefix: 'xs-plugin-pullup-'
        },
        loadMoreStatus:{
          tip:"正在加载",
          tipNoData:"没有更多数据了",
          tipLoading:"正在加载",
          showLoading:true,
          show:true,
        },
        hasMore:true,
        showMark:false,
        showMsg:"",
      }
    },
    created(){
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.loadData();
    },
    mounted(){
      this.$nextTick(
        ()=>{
          this.$refs.scroller.disablePullup();
          this.$refs.scroller.reset({top:0});
        }
      );
    },
    watch:{
      pullUpDownStatus:{
        handler:function(val,oldval){
          if(val.pullupStatus=="loading"){
            this.loadMoreStatus.show=true;
            if(this.hasMore == false){
              this.loadMoreStatus.showLoading=false;
            } else {
              this.loadMoreStatus.showLoading=true;
            }
          }
        }
      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (param) {
        this.$router.push({name: param.pagename,query:{id:param.id}})
        param.event.cancelBubble = true;
        // param.event.preventDefault=true;//阻止默认事件（原生方法）
        param.event.stop;//阻止冒泡（原声方法）
        return false
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      checkImg(path){
        return common.getDefultImg(path);
      },
      timeStamp2String(time){
        return common.timeStamp2String(time,'ymd');
      },
      // 点赞效果
      dianzan(param){
        var _self = this;
        var index = param.index;
        if( common.isNull(_self.userInfo._id) ){
          _self.$router.push({name: 'login'});
        }else{
          _self.like(param.id,param.index);
        }
        param.event.cancelBubble = true;//阻止冒泡（原声方法）
        param.event.stop;//阻止冒泡（原声方法）
        return false
      },

      show (param) {
        var _self = this;
        _self.list = [];
        _self.options.previewer = '.previewer'+param.index;
        var imgs = _self.meows[param.index].imgs || [];
        imgs.forEach(function (img, j) {
          _self.list.push({src:_self.checkImg(img)})
        })
        console.log("imgs:"+JSON.stringify(_self.list))
        _self.$refs.previewer.show(param.i)
        param.event.cancelBubble = true;
        // param.event.preventDefault=true;//阻止默认事件（原生方法）
        param.event.stop;//阻止冒泡（原声方法）
        return false
      },
      //下拉刷新
      refreshPageDate(){
        let _self = this
        _self.pagination.pageNo = 0;
        _self.hasMore = true;
        _self.loadMoreStatus.show=false;
        _self.$refs.scroller.donePullup();
        _self.loadData();
      },
      //上拉加载
      loadMore(){
        let _self = this;
        _self.loadData();
      },
      scroll(position){
        // console.log("on-scroll",position);
      },
      pullDownLoading(){
        console.log('on-pull-down-loading');
        this.refreshPageDate();
      },
      pullUpLoading(){
        console.log('on-pull-up-loading');
        this.loadMore();
      },
      onScrollBottom(){
        console.log('on-scroll-bottom');
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
      //获取数据
      loadData(){
        let _self = this;
        if( common.isNull(_self.userInfo._id) ){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          return;
        }
        _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
        let params = {
          interfaceId:common.interfaceIds.getMeowList,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          where:{
            user_id: _self.userInfo._id
          }
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          console.log(response);
          let data = response.data;
          _self.setData(data);
        })
      },

      setData(data){
        let _self = this;
        _self.$refs.scroller.enablePullup();
        // 订单
        let meows = data.meows || [];
        //判断页码是否为0
        if(_self.pagination.pageNo == 0) {
          _self.meows = meows;
        } else {
          _self.meows.push(...data.meows);
        }
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if(meows.length < _self.pagination.pageSize){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.onFetching = false;
          _self.pagination.pageNo++
          _self.loadMoreStatus.show=false;
        }
      },

      //点赞
      like(id,index){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.like,
          data: {
            like_id: id,
            user_id: _self.userInfo._id,
            like_type: 0
          }
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          // console.log(response)
          let data = response.data;
          if( data.code == 200 ){
            _self.meows[index].likeFlag = _self.meows[index].likeFlag==1? 0 : 1;
            _self.meows[index].like += _self.meows[index].likeFlag==1? 1 : -1;
          }else{
            _self.showToast("操作失败!")
          }
        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/meow/miaomiao.css';
  .cur{
    border-bottom: 1px solid #f65aa6;
  }
  .sjs-bottom ul li {
    float: left;
    width: 2.4rem;
    height: 2.4rem;
    background: #CCCCCC;
    margin: 0.05rem;
    text-align: center;
    overflow: hidden;
    /*background: url("../../../static/images/bj.jpg");*/
    /*background-position: center center;*/
    /*background-repeat: no-repeat;*/
  }
  .sjs-bottom ul li img{
    height: 100%;
  }
  .dz{
    height: 0.9rem;
    line-height: 0.9;
    display: inline-block;
    background-image: url("../../../static/images/collect.png");
    background-size: 0.4rem 0.4rem;
    background-position-y:0.25rem;
    background-repeat: no-repeat;
    padding-left: 0.5rem;
  }
  .dz.hover{
    background-image: url("../../../static/images/collect-hover.png");
  }
  .comments{
    height: 0.9rem;
    line-height: 0.9;
    display: inline-block;
    background: url("../../../static/images/liulan.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position-y:0.25rem;
    padding-left: 0.5rem;
  }

  .tianjia{
    position: fixed;
    width:1rem;
    height: 1rem;
    bottom: 1.3rem;
    right: 0.2rem;
    border-radius: 50%;
    background: url("../../../static/images/meow/jiah.png");
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .previewer-img{
      width:100%;
      height:100%;
      background-repeat: no-repeat;
      background-position:center center;
      background-size: cover
  }

  /**样式重写**/
  .blank{
    margin-top: 2.7rem;
  }
  .blank_bottom{
    padding-bottom: 1.2rem;
  }
  .bankuai{
    position: fixed;
    top: 0;
    z-index: 10;
  }

</style>
