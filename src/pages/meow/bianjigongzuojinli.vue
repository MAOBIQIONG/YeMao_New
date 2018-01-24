<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>编辑工作经历</span>
      <div class="header-right" @click="saveData()">保存</div>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>企业名称</span>
          </div>
          <div class="qdtime-right">
            <input v-model="params.company_name" type="text" placeholder="请输入企业名称" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>职位</span>
          </div>
          <div class="qdtime-right">
            <input v-model="params.positions" type="text" placeholder="请输入职位" />
          </div>
        </div>
        <div class="qdtime zzsj">
          <div class="qdtime-left">
            <span>在职时间</span>
          </div>
          <div class="qdtime-right">
            <span><datetime v-model="params.start_time" class="shijian" placeholder="开始时间"></datetime></span> / <span><datetime v-model="params.end_time" class="shijian" placeholder="结束时间"></datetime></span>
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea v-model="params.description" class="area" maxlength="300" placeholder="请输入问题描述"></textarea>
        <p class="xianzhi"><span class="zs">300</span>/<span>300</span></p>
      </div>
      <div class="tjgzjl">
        删除此工作经历
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em"></toast>
  </div>
</template>

<script>
import {Datetime,Toast} from 'vux'
export default {
    components: {
      Datetime,
      Toast
    },
    data: function () {
      return {
        value2: '2015-10-12',
        value4: '2025-10-12',
        params:{
            user_id:"",
            company_name:"",
            positions:"",
            start_time:"",
            end_time:"",
            description:"",
        },
        toastShow:false,
        toastText:""
      }
    },
    created(){
        var _self = this;
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            _self.params.user_id = user._id;
            // _self.initData();
        } else {
            console.log('user_id is null');
            _self.$router.push({name:'login'});
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
        strToTimestamp(str){
            if(/\d{4}-\d{1,2}-\d{1,2}$/.test(str)){
                str.replace(/-/g,'/');
                return new Date(str);
            }else{
                console.log("传入日期参数格式有误");
            }
        },
        saveData(){
            let _self = this;
            if( common.isNull(_self.params.company_name) ){
                _self.showToast("请填写公司名称");
                return;
            }
            if( common.isNull(_self.params.positions) ){
                _self.showToast("请输入职位");
                return;
            }
            if( common.isNull(_self.params.start_time) ){
                _self.showToast("请选择在职开始时间");
                return;
            }
            if( common.isNull(_self.params.end_time) ){
                _self.showToast("请选择在职结束时间");
                return;
            }          
            if(_self.strToTimestamp(_self.params.start_time)>=_self.strToTimestamp(_self.params.end_time)){
                _self.showToast("结束时间必须大于开始时间");
                return;
            }
            if( common.isNull(_self.params.description) ){
                _self.showToast("请填写描述信息");
                return;
            }
            console.log(_self.params);
            let params = {
                interfaceId:common.interfaceIds.saveDataFun,
                coll:'workExperiences',
                data:_self.params,
            };
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                });
        }
    }
}
</script>
<style scoped>
  @import '../../../static/css/meow/bianjigongzuojinli.css';
  .shijian{
    width: 1.9rem;
  }
  .zzsj{
    width: 7.2rem !important;
    margin-left: 0.3rem !important;
  }
</style>
