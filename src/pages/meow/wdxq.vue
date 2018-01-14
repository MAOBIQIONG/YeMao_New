<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <div class="header-right"><img src="../../../static/images/fx1.png" /></div>
    </div>
    <!--文章详情-->
    <div class="content">
      <div class="piaoti">
        {{chw.title}}
      </div>
        <!-- <div class="xc-banner">
            <swiper height="4.8rem" :list="imgs" @on-index-change="onIndexChange"></swiper>
        </div> -->
      <div class="nichengshijian">
        <div class="ns-left">
          <span><img :src="checkAvatar(null)"/></span><span>{{chw.user.user_name}}</span>
        </div>
        <div class="tm-right">
          <span>发布时间</span> <span>{{chw.create_date | dateToString}}</span>
        </div>
      </div>
      <div class="neirongshijian">
          {{chw.description}}
        <div class="bottom">
          <div class="bottom-zan">
            <span id="praise"><img src="../../../static/images/zan1.png"/></span>
            <span id="praise-txt">100</span>
          </div>
          <div class="bottom-sz">
            <span id="xinxin"><img src="../../../static/images/xin1.png"/></span><span>收藏</span>
          </div>
        </div>
      </div>
    </div>

    <!--评论详情-->
    <div class="pinglun">
      <div class="dsr">
        <ul>
          <li><img src="../../../static/images/bj.jpg"/></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class="dianzhan"@click="toUrl('dianzhan')">
          <span>100</span>人点赞
        </div>
      </div>
      <p>热门评论</p>
      <div class="pinlunlist">
        <div class="top-pinlun">
          <div class="tp-left">
            <span><img src="../../../static/images/bj.jpg"/></span><span>用户昵称</span>
          </div>
          <div class="tp-right">
            <span>100</span><span><img src="../../../static/images/zan.png"/></span>
          </div>
        </div>
        <div class="neirong">
          评论内容评论内容评论内容评论内容评论内容评 评论内容评论内容评论内容评论内容评论内容评
        </div>
        <div class="bottom">
          <div class="left-bt">
            2017-01-01
          </div>
          <div class="right-bt">
            100条回复
          </div>
        </div>
      </div>
      <div class="pinlunlist">
        <div class="top-pinlun">
          <div class="tp-left">
            <span><img src="../../../static/images/bj.jpg"/></span><span>用户昵称</span>
          </div>
          <div class="tp-right">
            <span>100</span><span><img src="../../../static/images/zan.png"/></span>
          </div>
        </div>
        <div class="neirong">
          评论内容评论内容评论内容评论内容评论内容评 评论内容评论内容评论内容评论内容评论内容评
        </div>
        <div class="bottom">
          <div class="left-bt">
            2017-01-01
          </div>
          <div class="right-bt">
            100条回复
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Swiper,Scroller,LoadMore,Toast} from 'vux'
export default {
    components: {
        Swiper,
        Scroller,
        LoadMore,
        Toast
    },
    data: function () {
        return {
            item_id:null,
            chw:{},
            comments:[],
            user_id:null,
            imgs:[],
            index:0
        }
    },
    filters:{
        //eg:2018-12-12
        dateToString(data){
            let d = new Date(data);
            // console.log(d.toISOString());
            // return d.toISOString().replace(/T[\w:.]+/,'');
            let rs = /[\w-]+(?=T)/.exec(d.toISOString())
            return rs[0];
        }
    },
    created(){
        let _self = this;
        let userInfo = common.getObjStorage("userInfo") || {};
        if( !common.isNull(userInfo._id) ){
            _self.user_id = userInfo._id;
        }
        _self.item_id = _self.$route.query.id;
        _self.initData();
        
    },
    mounted: function () {
        this.dianzan();
        this.$nextTick(()=>{
            
        });
    },
    methods: {
        goback () {
            this.$router.goBack()
        },
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        dianzan (){
            var off=true;
            $("#praise").click(function(){
            var praise_txt = $("#praise-txt");
            var num=parseInt(praise_txt.text());
            if(off==true){
                $(this).html("<img src='../../../static/images/zan2.png'style='width: 0.5rem;height: 0.5rem;vertical-align:middle;display: inline-block'/>");
                praise_txt.css('color','#f65aa6')
                num +=1;
                praise_txt.text(num)
            }
            });
            $("#xinxin").click(function(){
            if(off==true){
                $(this).html("<img src='../../../static/images/xing.png'style='width: 0.5rem;height: 0.5rem;vertical-align:middle;display: inline-block'/>");
                $(".bottom-sz").css('color','#f65aa6')
            }
            });
        },
        onIndexChange(index) {
            this.index = index
        },
        // 头像
        checkAvatar (path) {
            console.log(path);
            return common.getAvatar(path)
        },
        //数据初始化
        initData(){
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.getPChwDetails,
                user_id:_self.user_id,
                where:{
                    _id: _self.item_id
                }
            };
            this.$axios.post('/mongoApi',{
                params
            },(response)=>{
                console.log(response)
                let data = response.data;
                _self.setInitData(data);
                console.log(data);
            })
        },
        setInitData(data){
            let _self = this;
            _self.chw = data.chw || {};
            var imgs = _self.chw.imgs || [];// 图片
            imgs.forEach(function (item,index) {
            _self.imgs.push({img:item});
            })

            // // 评论
            // _self.comments = data.comments || [];
            // if(_self.comments.length < _self.pagination.pageSize){
            // _self.hasMore = false;
            // _self.loadMoreStatus.show=true;
            // _self.loadMoreStatus.showLoading=false;
            // _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
            // _self.$refs.scroller.disablePullup();
            // } else {
            // _self.pagination.pageNo++
            // }
        },
    }
}
</script>
<style scoped>
  @import '../../../static/css/meow/wzxq.css';
</style>
