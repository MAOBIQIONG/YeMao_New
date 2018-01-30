<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>学校详情</span>
      <div class="header-right"@click="toUrl('tongxunluhaoyou')">邀请</div>
    </div>
    <!--学校详情-->
    <div class="content content-p">
      <div class="xxmc">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg" />
        </div>
        <div class="mingcheng">
          <div class="xuexiao">{{alumni.school_name}}</div>
          <div class="jrxs"><span>+&nbsp;加入学校</span><span>+&nbsp;校友交流</span></div>
        </div>
      </div>
      <div class="xxjj">
        <p>学校简介</p>
        <div class="jianjie">
          {{alumni.school_description}}
        </div>
      </div>
      <div class="liebiao">
        <div class="list">
          <div class="xingxi">管理员</div>
          <div class="guanliyuan">
            <div class="gly">
              <div class="touxiang">
                <img src="../../../static/images/bj.jpg" />
              </div>
              <p class="nicheng">昵称</p>
            </div>
          </div>
          <!--<div class="list-right"><img src="../../../static/images/jiangou.png"></div>-->
        </div>
        <div class="list tz"@click="toUrl('dianzhan')">
          <div class="xingxi">校友成员</div>
          <div class="xycy">
            <div class="renshu">
              <span>234</span>人
            </div>
            <ul class="cylist">
              <li><img src="../../../static/images/bj.jpg" /></li>
              <li><img src="../../../static/images/bj.jpg" /></li>
              <li><img src="../../../static/images/bj.jpg" /></li>
              <li><img src="../../../static/images/bj.jpg" /></li>
              <li><img src="../../../static/images/bj.jpg" /></li>
            </ul>
          </div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
      </div>
    </div>
    <loading :show="loadingShow" text="加载中"></loading>
  </div>
</template>

<script>
import {Loading} from 'vux';
  export default {
    components:{
        Loading,
    },
    data: function () {
      return {
        loaded:false,
        alumni:{},
        loadingShow:false,
      }
    },
    watch:{
        loaded:{
            handler(val,oldval){
                if(val == true){
                    this.setData(this.data);
                }
            }
        }
    },
    created(){
        let itemId = this.$route.query.id;
        if(itemId){
            this.itemId = itemId;
            this.requestData();
        }
    },
    methods: {
        goback () {
            this.$router.goBack()
        },
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        requestData(){
            let _self = this;
            _self.loadingShow = true;
            let params = {
                interfaceId:common.interfaceIds.queryAlumniById,
                _id:_self.itemId
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                    let data = response.data.alumni
                    _self.data = data;
                    if (data) {
                        _self.loaded = true;                       
                        
                    } else {
                        console.log('noData');
                    }
                });
        },
        setData(data){
            console.log('set Data');
            console.log(data);
            let _self = this;
            _self.loadingShow = false;
            _self.alumni = data;
            console.log('数据设置完成');
        }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/xuexiaoxiangqing.css';
</style>
