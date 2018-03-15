<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>学校详情</span>
      <div class="header-right" v-tap="{methods:toPhoneList,aa_id:this.itemId}">邀请</div>
    </div>
    <!--学校详情-->
    <div class="content content-p">
      <div class="xxmc">
        <div class="touxiang" :style="{backgroundImage:`url(${checkAvatar(alumni.school_logo)})`}">
          <!-- <img src="../../../static/images/bj.jpg" /> -->
          
        </div>
        <div class="mingcheng">
          <div class="xuexiao">{{alumni.school_name}}</div>
          <!--  v-tap="{methods:toUrl2,pagename:'groupchat',query:{id:'343647591',name:'内部群001',img:'./static/images/logo.png'}}" -->
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
        <div class="list tz" v-tap="{methods:toUrlAfterLogin,pagename:'alumniList'}">
          <div class="xingxi">校友成员</div>
          <div class="xycy">
            <div class="renshu">
              <span v-if="alumniList.length>0">{{alumniList.length}}</span>
              <span v-else>0</span>人
            </div>
            <ul class="cylist" v-for="(item,index) in alumniList.slice(0,7)" :key="index">
              <li><img :src="checkAvatar(item.user.img)" /></li>
            </ul>
          </div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
      </div>
    </div>
    <loading :show="loadingShow" text="加载中"></loading>
    <div v-transfer-dom>
        <confirm v-model="confirmShow"
            @on-confirm = "compOnConfirm()"
        >
        <p style="text-align:center;">{{confirmMsg}}</p>
        </confirm>
    </div>
  </div>
</template>

<script>
import {Loading,Confirm,TransferDomDirective as TransferDom} from 'vux';
  export default {
    components:{
        Loading,
        Confirm
    },
    directives: {
        TransferDom
    },
    data: function () {
      return {
        loaded:false,
        alumni:{},
        loadingShow:false,
        confirmShow:false,
        confirmType:'',//addAlumnis 校友会添加成员
        confirmMsg:'',
        user_id:null,
        alumniList:[],
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
        this.user = common.getObjStorage("userInfo") || {};
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
        // 头像
        checkAvatar (path) {
            return common.getAvatar(path)
        },
        checkImg(path){
            return common.getDefultImg(path);
        },       
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        toUrl2: function (params) {
          console.log("params.pagename:"+params.pagename)
          this.$router.push({name: params.pagename, query: params.query})
        },
        toUrlAfterLogin(params){
            var _self = this;
            if( !common.isNull(_self.user._id) ){
                _self.toUrl2(params);
            } else {
                console.log('没有获取用户信息');
                _self.toUrl2({pagename:"login"});
            }
         },
        toPhoneList(param){
            var _self = this;
            if( !common.isNull(_self.user._id) ){
                 _self.$router.push({name:'tongxunluhaoyou',query:{aa_id:param.aa_id}})
            } else {
                console.log('没有获取用户信息');
                _self.toUrl2({pagename:"login"});
            }
        },
        // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      checkImg(path){
        return common.getDefultImg(path);
      },    
        requestData(){
            let _self = this;
            _self.loadingShow = true;
            setTimeout(()=>{_self.loadingShow = false},2000);
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
            this.getAlumnis();
        },
        getAlumnis(){
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.getAlumnis,
                aa_id:_self.itemId
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    let data = response.data.alumnis
                    common.setStorage('alumnisList',data);
                    if (data) {
                        _self.alumniList = data;
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
        },
        showConfirm(params){
            this.confirmShow = true;
            this.user_id = params.uid;
            this.confirmType = params.type
            if(params.type == "addAlumnis"){
                this.confirmMsg = "校友会添加该用户吗？"
            } 
        },
        compOnConfirm(){
            if(this.confirmType=="addAlumnis"){
                this.addAlumnis();
            }
        },
        addAlumnis(){}
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/xuexiaoxiangqing.css';
.touxiang{
    background-size:cover!important;
    background-position:center center;
  }
</style>
