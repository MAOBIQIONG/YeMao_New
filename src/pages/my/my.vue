<template>
  <div class="my">
    <!--<div v-tap="{ methods:cgLink , pagename:'vuxtest' }" class="msg">{{ msg }}</div>-->
    <!--头部-->
    <div class="mine-top">
      <div class="shezhi" v-tap="{ methods:toSet }">
          <img src="../../../static/images/my/shezhi1.png" />
      </div>
      <div class="tu-nicheng">
        <div class="touxiang" v-tap="{ methods:modifyAvatar }">
          <img :src="checkAvatar(userInfo.img)" />
        </div>
        <div class="nicheng"><span>{{userInfo.user_name || tips}}</span></div>
      </div>
    </div>
    <!--消息栏-->
    <div class="msage-top">
      <ul>
        <li @click="toUrl('message')">
          <p>
            <img src="../../../static/images/my/xiaoxi.png" />
          </p>
          <p>消息</p>
        </li>
        <li @click="toUrlAfterLogin('mineshouchang')">
          <p>
            <img src="../../../static/images/my/shouchang.png" />
          </p>
          <p>收藏</p>
        </li>
        <li @click="toUrl('minepinlun')">
          <p>
            <img src="../../../static/images/my/pinglun.png" />
          </p>
          <p>评论中心</p>
        </li>
        <li @click="toUrl('miaomiaoquan')">
          <p>
            <img src="../../../static/images/my/miaomiao.png" />
          </p>
          <p>喵喵圈</p>
        </li>
      </ul>
    </div>
    <!--我的消息-->
    <div class="my-msg">
      <div class="liebiao">
        <div class="list"@click="toUrl('minehuodong')">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">我参与的活动</div>
          <div class="list-right"></div>
        </div>
        <div class="list tz" @click="toMyResume()">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">简历中心</div>
          <div class="list-right"></div>
        </div>
        <div class="list"@click="toUrl('minewenda')">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">我的问答</div>
          <div class="list-right"></div>
        </div>
      </div>
    </div>
    <!--意见反馈-->
    <div class="yijian">
      <div class="liebiao">
        <div class="list"@click="toUrl('maintain')">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">客服中心</div>
          <div class="list-right"></div>
        </div>
        <div class="list"@click="toUrl('yijian')">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">意见反馈</div>
          <div class="list-right"></div>
        </div>
        <!--<div class="list" v-tap="{methods:showClearCachePop}">-->
          <!--&lt;!&ndash;<div class="tupiao"></div>&ndash;&gt;-->
          <!--<div class="xingxi">清除缓存</div>-->
          <!--<div class="list-right"><span>{{cacheSize}}</span></div>-->
        <!--</div>-->
        <div class="list"@click="toUrl('mineguanyu')">
          <!--<div class="tupiao"></div>-->
          <div class="xingxi">关于夜猫</div>
          <div class="list-right"></div>
        </div>
      </div>
    </div>
    <!-- 清除缓存弹窗-->
    <div class="pop" v-if="showPop==true">
      <div class="pop-bottom">
        <div class="anniu" v-tap="{methods:clearCache}"><span>清除缓存</span></div>
        <div class="anniu" v-tap="{methods:hideClearCachePop}"><span style="color: #0076ff;">取消</span></div>
      </div>
    </div>
    <toast v-model="showMark" type="text" :text="showMsg" width="5rem"></toast>
    <div v-transfer-dom>
      <loading :show="showLoad" :text="showLoadMsg"></loading>
    </div>
  </div>
</template>

<script>
  import { Toast,Loading,TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom,
    },
    components: {
      Toast,
      Loading
    },
    data () {
      return {
        userInfo:{},
        tips:"点击登录",
        cacheSize: '',
        showPop:false,
        showMark: false,
        showMsg: '',
        showLoad: false,
        showLoadMsg: ''
      }
    },
    created: function () {
        var _self = this;
        var user = common.getObjStorage("userInfo") || {};        
        if( !common.isNull(user._id) ){
            _self.user_id = user._id;
        } else {
            _self.$router.push({name:'login'});
        }
    },
    activated: function () {
      console.log("activated:")
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      // _self.initCalcCache();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl (pagename) {
        this.$router.push({name: pagename})
      },
      toMyResume(){
          this.$router.push({name:"minejianli",query:{isUserId:1}});
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      toUrlAfterLogin(pagename){
        var _self = this;
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            _self.toUrl(pagename);
        } else {
            console.log('没有获取用户信息');
            _self.$router.push({name:"login"});
        }   
      },
      // loading
      showLoading() {
        var _self = this;
        _self.showLoad = true;
        setTimeout(() => {
          _self.showLoad = false;
        }, 2000)
      },
      //头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      toSet () {
        var _self = this;
        if( _self.userInfo._id != null ){
          _self.toUrl('set');
        }else{
          _self.toUrl('login');
        }
      },
      //		弹窗
      showClearCachePop() {
        this.showPop = true;
      },
      hideClearCachePop() {
        this.showPop = false;
      },
      clearCache() {
        var _self = this;
        /*if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
          common.clearCache(function () {
            _self.showToast('清除成功！')
            _self.initCalcCache();
          });
        }*/
        _self.showPop = false;
      },

      // 计算缓存
      initCalcCache(){
        var _self = this;
        console.log("process.env.NODE_ENV:"+process.env.NODE_ENV)
        if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
          common.calcCache(function (size) {
            _self.cacheSize = size;
          });
        }
      },

      // 修改头像
      modifyAvatar() {
        var _self = this;
        if( _self.userInfo._id != null ){
          console.log("修改头像。。")
          if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
            uploadImg.init({
              callback:function (path) {
                _self.showLoading();
                _self.uploadAtavar(path);
              }
            })
          }
        }else{
          _self.toUrl('login');
        }
      },

      // 加载更多
      uploadAtavar (path) {
          var _self = this;
          var params = {
            interfaceId:common.interfaceIds.updateUserById,
            user_id: _self.userInfo._id,
            data:{
              img: path
            }
          };
          _self.$axios.post('/mongoApi', {
            params: params
          }, response => {
            var data = response.data;
            if( data && data.code == 200 ){
              _self.userInfo.img = path;
              common.setStorage("userInfo",_self.userInfo);
            }else{
              _self.showToast('修改失败!');
            }
          });
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/mine.css';
</style>
