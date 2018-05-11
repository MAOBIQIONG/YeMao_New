<template>
  <div>
    <!--头部导航-->
    <div class="header p-static">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>创建校友会</span>
      <div class="header-right" @click="submit()">提交</div>
    </div>
    <!--发布订单内容-->
    <div class="content p-static">
      <div class="touxiang">
        <div class="tu" v-tap="{ methods:triggerFile }" style="overflow: hidden;background-position:center center;backgroundSize:cover" :style="{backgroundImage:`url(${getAvatar(logo)})`}">
          <!-- <img :src="getAvatar(logo)" style="width: 100%;margin-top: 0rem;"/> -->
        </div>
        <p>上传图片</p>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>学校名称</span>
          </div>
          <div class="qdtime-right">
            <input v-model="dataParams.school_name" type="text" placeholder="请输入学校名称,20字以内" maxlength="20"/>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>选择学校地区</span>
          </div>
          <div class="qdtime-right">
            <group class="xmlx-kuang">
              <x-address placeholder="请选择学校地区" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="dataParams.school_address" style="height:0.8rem;line-height:0.8rem;"></x-address>
            </group>
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea v-model="dataParams.school_description" class="area" placeholder="填写学校简介,200字以内" maxlength="200"></textarea>
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em" :time="1500"></toast>
    <loading :show="loadingShow" text="提交中"></loading>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data,Group,Toast,Loading} from 'vux'
  export default {
    components: {
      XAddress,
      Group,
      Toast,
      Loading
    },
    data: function () {
      return {
        addressData: ChinaAddressV4Data,
        subParams: {
          project_region:['上海市'],
        },
        user_id: '',
        logo: './static/images/meow/xiangji.png',
        dataParams:{
            user_id: '',
            school_logo: '',
            school_name: '',
            school_address: [],
            school_description: '',
            school_admin: '',//"管理员"，
            school_members: 0,//"校友成员数量",
            is_del: 0,
        },
        toastShow: false,
        toastText: '',
        loadingShow: false,
      }
    },
    created(){
      var _self = this;
      var user = common.getObjStorage("userInfo") || {};
      // var resumeParams1 = common.getObjStorage("resumeParams1")|| {};

      if( !common.isNull(user._id) ){
          _self.user_id = user._id;
          _self.dataParams.user_id = user._id;
          _self.dataParams.school_admin = user._id;
          _self.initData();
      } else {
          console.log('user_id is null');
          _self.$router.push({name:'login'});
      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      showToast(msg){
        this.toastShow = true;
        this.toastText = msg;
      },
      getAvatar(path){
        return common.getAvatar(path)
      },
      //上传图片
      triggerFile(){
        console.log("trigger:")
        var _self = this;
        if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
          uploadImg.init({
            callback:function (path) {
              _self.dataParams.school_logo = path;
              _self.logo = _self.getAvatar(_self.dataParams.school_logo);
            }
          });
        }else{
          console.log("Now it's the development environment!")
        }
      },
      initData(){
        console.log('this is initData');
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.queryByUserId,
          coll:common.collections.alumnis,
          user_id:_self.user_id
        }
        _self.$axios.post('/mongoApi', {
          params: params
          }, response => {
            console.log(response);
            let data = response.data.data
            if(!common.isNull(data)) {
              _self.dataParams = data;
              if( !common.isNull(_self.dataParams.school_logo) ){
                _self.logo = _self.getAvatar(_self.dataParams.school_logo);
              }
            }
          });
      },
      submit(){
        var _self = this;
        if( common.isNull(_self.dataParams.school_name) ){
          _self.showToast("请填写学校名称");
          return;
        }
        if( common.isNull(_self.dataParams.school_address) ){
          _self.showToast("请填写学校地址");
          return;
        }
        if( common.isNull(_self.dataParams.school_description) ){
          _self.showToast("请填写描述信息");
          return;
        }
        console.log(_self.dataParams);
        // return;
        _self.loadingShow = true;
        let params = {
          interfaceId:common.interfaceIds.addAA,
          data:_self.dataParams
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
            setTimeout(()=>{_self.loadingShow = false; _self.toUrl('xiaoyouhui');},1500)
        });
      },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/bianjigongzuojinli.css';
</style>
