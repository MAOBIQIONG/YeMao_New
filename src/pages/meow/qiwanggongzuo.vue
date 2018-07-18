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
            <span>期望职位</span>
          </div>
          <div class="qdtime-right">
            <input v-model="dataParams.expected_positions" type="text" placeholder="请输入职位,20字以内" maxlength="20" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>期望月薪</span>
          </div>
          <div class="qdtime-right">
            <input v-model="salary" type="text" placeholder="请输入期望月薪"  ref="expectedSalary"/>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>期望城市</span>
          </div>
          <div class="qdtime-right">
            <group class="xmlx-kuang">
              <x-address @on-hide="logHide" placeholder="请选择城市" title="" :list="addressData" hide-district value-text-align="right" v-model="value3" style="height:0.8rem;line-height:0.8rem;"></x-address>
            </group>
          </div>
        </div>
      </div>
      <div class="xian"></div>
      <!--留言-->
      <div class="pc-shuru">
        <p>描述</p>
        <div class="area-box">
           <textarea v-model="dataParams.expected_description" class="area" maxlength="300" placeholder="对于期望工作的描述"></textarea>
        </div>
        <p class="xianzhi"><span class="zs">{{300-dataParams.expected_description.length}}</span>/<span>300</span></p>
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em"></toast>
    <loading :show="loadingShow" text="提交中"></loading>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data,Value2nameFilter as value2name,Group,Toast,Loading} from 'vux'
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
        subParams:{
          project_region:['上海市'],
        },
        value3:['上海市'],
        dataParams:{
            expected_positions:"",
            expected_salary: 0,
            expected_city:"",
            expected_description:"",
        },
        toastShow:false,
        toastText:"",
        loadingShow:false,
      }
    },
    created(){
        let _self = this;
        let user = common.getObjStorage('userInfo');
        if( !common.isNull(user._id) ){
            _self.user_id = user._id;
            _self.initData();
        } else {
            console.log('user_id is null');
            _self.$router.push({name:'login'});
        }
        // var resumeParams3 = common.getObjStorage("resumeParams3")|| {};
        // console.log(resumeParams3);
        // if(!common.isNull(resumeParams3)){
        //     _self.dataParams = resumeParams3;
        // }
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
            var salary = _self.dataParams.expected_salary;
            if( common.isNull(_self.dataParams.expected_salary) ){
                _self.showToast("请填写期望薪资");
                return;
            }
            if( salary.indexOf(".")==salary.length-1 ){
              _self.dataParams.expected_salary = salary.substring(0,salary.length-1);
            }
            if( common.isNull(_self.dataParams.expected_city) ){
                _self.showToast("请填写期望工作城市");
                return;
            }
            if( common.isNull(_self.dataParams.expected_description) ){
                _self.showToast("请填写期望工作描述");
                return;
            }
            // common.setStorage('resumeParams3',_self.dataParams);
            _self.submit();
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
        getName (value) {
          return value2name(value, ChinaAddressV4Data)
        },
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
          var city = obj.getName(obj.value3);
          obj.dataParams.expected_city = city.trim();
        },
        logShow (str) {
            console.log('on-show',str)
        },
        initData(){
            console.log('this is initData');
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.queryByUserId,
                coll:common.collections.resumes,
                user_id:_self.user_id
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                    let data = response.data.data
                    if(!common.isNull(data)) {
                      _self.dataParams = data;
                      if( !common.isNull(data.expected_city) ){
                        _self.value3 = [data.expected_city];
                      }
                    }
                });
        },
        submit(){
            let _self = this;
            _self.loadingShow = true;
            let params = {
                interfaceId:common.interfaceIds.saveDataFun,
                coll:common.collections.resumes,
                data:_self.dataParams
            };
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {

                    console.log(response);
                    setTimeout(()=>{_self.loadingShow = false; _self.toUrl('zuopinshangchuan');},10)
                });
         },
    },
    computed: {
      // 计算属性的 getter
      salary: {
        // getter
        get: function () {
          return this.dataParams.expected_salary;
        },
        // setter
        set: function (newValue) {
          var _self = this;
          newValue = newValue.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
          newValue = newValue.replace(/^\./g,"");  //验证第一个字符是数字而不是.
          newValue = newValue.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.
          newValue = newValue.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
          newValue = newValue>=1000000 ? newValue.substring(0,7) : newValue;
          newValue = newValue.indexOf('.')>0 ? newValue.substring(0,newValue.indexOf('.')+3) : newValue;
          _self.$refs.expectedSalary.value = newValue;
          _self.dataParams.expected_salary = newValue;
        }
      },
    }
  }
</script>

<style>

</style>
<style scoped>
  @import '../../../static/css/meow/bianjigongzuojinli.css';
   /*2018/7/18页面优化*/
  .content{
    background: white;
  }
  .xian{
    width: 100%;
    height: 0.2rem;
    background: #F2F2F2;
  }
  .content .ys-time{
    width: 100%;
    background: white;
    margin-bottom:0rem;
  }
  .content .ys-time .qdtime .qdtime-left{
    color: #4B4B4B;
    line-height: 0.78rem;
  }
  .content .ys-time .qdtime .qdtime-right {
    float: right;
    height: 0.8rem;
    width: 4.6rem;
    min-width: 1.2rem;
  }
  .content .ys-time .qdtime .qdtime-right input{
    border: none;
    font-size: 0.28rem;
    outline: medium;
    text-align: left;
  }

  .content .pc-shuru p{
    line-height: 0.6rem;
    padding-left: 0.3rem;
  }
</style>
