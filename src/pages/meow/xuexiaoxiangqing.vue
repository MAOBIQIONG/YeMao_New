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
        <div class="touxiang" :style="{backgroundImage:`url(${checkAvatar(alumni.school_logo)})`}"></div>
        <div class="mingcheng">
          <div class="xuexiao">{{alumni.school_name}}</div>
        </div>
      </div>
      <div class="xxjj">
        <p>学校简介</p>
        <div class="jianjie">
          {{alumni.school_description}}
        </div>
      </div>

      <div class="liebiao">
        <!--<div class="list">-->
          <!--<div class="xingxi">管理员</div>-->
          <!--<div class="guanliyuan" v-tap="{methods:toDetails,id:alumni.user_id}">-->
            <!--<div class="gly">-->
              <!--<div class="touxiang" v-if="alumni.user!=null&&alumni.user!=undefined">-->
                <!--&lt;!&ndash;<img :src="checkAvatar(alumni.user.img)" />&ndash;&gt;-->
                <!--<div class="img" :style="{backgroundImage: 'url(' + checkAvatar(alumni.user.img) + ')'}"></div>-->
              <!--</div>-->
              <!--<div class="touxiang" v-else>-->
                <!--&lt;!&ndash;<img src="../../../static/images/bj.jpg" />&ndash;&gt;-->
                <!--<div class="img default"></div>-->
              <!--</div>-->
              <!--<p class="nicheng" v-if="alumni.user!=null&&alumni.user!=undefined">{{alumni.user.user_name}}</p>-->
              <!--<p class="nicheng" v-else>昵称</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;<div class="list-right"><img src="../../../static/images/jiangou.png"></div>&ndash;&gt;-->
        <!--</div>-->
        <div class="list tz" v-tap="{methods:toUrlAfterLogin,pagename:'alumniList'}">
          <div class="xingxi">校友成员</div>
          <div class="xycy">
            <div class="renshu">
              <span v-if="alumniList.length>0">{{alumniList.length}}</span>
              <span v-else>0</span>人
            </div>
            <ul class="cylist" v-for="(item,index) in alumniList.slice(0,7)" :key="index">
              <li>
                <!--<img :src="checkAvatar(item.user.img)" />-->
                <div class="img" :style="{backgroundImage: 'url(' + checkAvatar(item.user.img) + ')'}"></div>
              </li>
            </ul>
          </div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
      </div>
      <div class="jrxs">
        <span v-if="alumni.addMark==0" v-tap="{methods:joinAlumnis}">加入学校</span>
        <span v-if="alumni.addMark==1" v-tap="{methods:toUrl2,pagename:'groupchat',query:{id:alumni.group.tid,name:alumni.group.tname,img:alumni.group.icon}}">校友交流</span>
      </div>
    </div>
    <loading :show="loadingShow" text="加载中"></loading>
    <div v-transfer-dom>
      <confirm v-model="confirmShow" @on-confirm = "compOnConfirm()">
        <p style="text-align:center;">{{confirmMsg}}</p>
      </confirm>
    </div>
    <toast v-model="toastShow" :time="1000" type="text" width="5rem">{{toastMsg}}</toast>
  </div>
</template>

<script>
import {Loading,Confirm,TransferDomDirective as TransferDom,Toast} from 'vux';
  export default {
    components:{
      Loading,
      Confirm,
      Toast
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
        confirmType:'', //addAlumnis 校友会添加成员
        confirmMsg:'',
        user_id:null,
        alumniList:[],
        toastShow:false,
        toastMsg:'',
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
      console.log("xxxq created:")
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
      showToast(msg){
        this.toastShow = true;
        this.toastMsg = msg;
      },
      // 详情页
      toDetails (param) {
        var _self = this;
        if( !common.isNull(_self.user._id) && _self.user._id==param.id ){
          _self.$router.push({name: 'shejishigerenzhongxin'});
        } else {
          _self.$router.push({name: 'sjszxxq', query: {id: param.id}});
        }
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
          _id: _self.itemId,
          user_id: _self.user._id
        }
        _self.$axios.post('/mongoApi', {
            params: params
        }, response => {
          // console.log(response);
          _self.loadingShow = false;
          let data = response.data.alumni;
          _self.data = data;
          if (data) {
            _self.loaded = true;
            _self.getAlumnis();
          } else {
            console.log('noData');
          }
        });
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
        // console.log(data);
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
      // 加入校友会
      joinAlumnis(){
        let _self = this;
        let params = {
          interfaceId: common.interfaceIds.addAlumnis,
          user_id: _self.user._id,
          aa_id: _self.itemId,
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data && data.code==200 ){
            _self.showToast('加入成功！');
            var alumnis = {
              authenticating_state: _self.user.authenticating_state,
              img: _self.user.img,
              user_name: _self.user.user_name,
              _id: _self.user._id
            }
            _self.alumniList.unshift({user:alumnis});
            _self.alumni.addMark = 1; // 0、为加入，1、已加入。
          }else{
            var msg = common.isNull(data.msg) ? '加入失败！' : data.msg;
            _self.showToast(msg);
          }
        })
      }
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
