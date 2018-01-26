<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>期望工作</span>
      <div class="header-right" @click="nextStep()">下一步</div>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>职位</span>
          </div>
          <div class="qdtime-right">
            <input v-model="dataParams.expected_positions" type="text"placeholder="请输入职位" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>期望月薪</span>
          </div>
          <div class="qdtime-right">
            <input v-model="dataParams.expected_salary" type="text"placeholder="请输入期望月薪" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>期望城市</span>
          </div>
          <div class="qdtime-right">
            <group class="xmlx-kuang">
              <x-address placeholder="请选择城市"   title="" :list="addressData" hide-district value-text-align="right" v-model="dataParams.expected_city" style="height:0.8rem;line-height:0.8rem;"></x-address>
            </group>
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea v-model="dataParams.expected_description" class="area" maxlength="300" placeholder="对于期望工作的描述"></textarea>
        <p class="xianzhi"><span class="zs">300</span>/<span>300</span></p>
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em"></toast>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data,Group,Toast} from 'vux'
  export default {
    components: {
      XAddress,
      Group,
      Toast
    },
    data: function () {
      return {
        addressData: ChinaAddressV4Data,
        subParams:{
          project_region:['上海市'],
        },
        dataParams:{
            expected_positions:"",
            expected_salary:"",
            expected_city:[],
            expected_description:"",
        },
        toastShow:false,
        toastText:"",
      }
    },
    created(){
        let _self = this;
        var resumeParams3 = common.getObjStorage("resumeParams3")|| {};
        console.log(resumeParams3);
        if(!common.isNull(resumeParams3)){
            _self.dataParams = resumeParams3;
        }
    },
    mounted: function () {
      this. wzxz()
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
        nextStep(){
            var _self = this;
            if( common.isNull(_self.dataParams.expected_positions) ){
                _self.showToast("请填写期望职位");
                return;
            }
            if( common.isNull(_self.dataParams.expected_salary) ){
                _self.showToast("请填写期望薪资");
                return;
            }
            if( common.isNull(_self.dataParams.expected_city) ){
                _self.showToast("请填写期望工作城市");
                return;
            }
            if( common.isNull(_self.dataParams.expected_description) ){
                _self.showToast("请填写期望工作描述");
                return;
            }
            common.setStorage('resumeParams3',_self.dataParams);
            this.toUrl('zuopinshangchuan');

        },
        //留言字数限制
        wzxz(){
            $(".area").bind("input propertychange",function(){
            var curlength=$(".area").val().length;
            if(curlength>300){
                var num=$(".area").val().substr(0,300);
                $('.area').val(num);
                alert("您输入的字数已超出");
            }
            else{
                $(".zs").text(300-$(".area").val().length)
            }
            })
        },
        // 地区
        logHide (str) {
            var obj = this;
            console.log('on-hide', str)
            if( str == true ){
            console.log('value', obj.value3)
            if( obj.value3[0] == '110000' || obj.value3[0] == '120000' ||
                obj.value3[0] == '310000' || obj.value3[0] == '500000' ){
                obj.value3[1] = '--';
            }else{
                obj.value3[0] = '--';
            }
            }
        },
        logShow (str) {
            console.log('on-show',str)
        },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/bianjigongzuojinli.css';
</style>
