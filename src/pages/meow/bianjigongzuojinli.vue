<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:showFun}"><img src="../../../static/images/back.png" /></div>
      <span>编辑工作经历</span>
      <div class="header-right" v-tap="{methods:saveData}">保存</div>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>企业名称</span>
          </div>
          <div class="qdtime-right">
            <input v-model="dataParams.company_name" type="text" placeholder="请输入企业名称" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>职位</span>
          </div>
          <div class="qdtime-right">
            <input v-model="dataParams.positions" type="text" placeholder="请输入职位" />
          </div>
        </div>
        <div class="qdtime zzsj">
          <div class="qdtime-left">
            <span>在职时间</span>
          </div>
          <div class="qdtime-right">
            <span><datetime v-model="dataParams.start_time" class="shijian" placeholder="开始时间" :min-year="1978"></datetime></span> / <span><datetime v-model="dataParams.end_time" class="shijian" placeholder="结束时间"  :min-year="1978"></datetime></span>
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea v-model="dataParams.description" class="area" :maxlength="limitNum" placeholder="请输入工作描述"></textarea>
        <p class="xianzhi"><span class="zs">{{300-dataParams.description.length}}</span>/<span>{{limitNum}}</span></p>
      </div>
      <div class="tjgzjl" @click="removeData()">
        删除此工作经历
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em" :time="1000"></toast>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="温馨提示"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">确认放弃编辑?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import {Datetime,Toast, Confirm, TransferDomDirective as TransferDom } from 'vux'
export default {
    directives: {
      TransferDom
    },
    components: {
      Datetime,
      Toast,
      Confirm
    },
    data: function () {
      return {
        limitNum: 300,
        value2: '2015-10-12',
        value4: '2025-10-12',
        dataParams:{
            user_id:"",
            company_name:"",
            positions:"",
            start_time:"",
            end_time:"",
            description:"",
        },
        toastShow:false,
        toastText:"",
        isEdit:false,
        show: false,
      }
    },
    created(){
        var _self = this;
        console.log(_self.$route.query);
        if(_self.$route.query){
            if(_self.$route.query.id){
                _self.we_id = _self.$route.query.id;
                _self.isEdit = true;
                _self.initData();
            }
        }
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            _self.dataParams.user_id = user._id;
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
        onCancel () {
          console.log('on cancel')
        },
        onConfirm (msg) {
          console.log('on confirm')
          // if (msg) {
          // alert(msg)
          // }
          this.$router.goBack()
        },
        onHide () {
          console.log('on hide')
        },
        onShow () {
          console.log('on show')
        },
        showFun(){
            this.show=true;
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
        initData(){
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.queryWEById,
                _id:_self.we_id
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    // console.log(response);
                    var data = response.data.we;
                    _self.dataParams = data;
                });
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
            if( common.isNull(_self.dataParams.company_name) ){
                _self.showToast("请填写公司名称");
                return;
            }
            if( common.isNull(_self.dataParams.positions) ){
                _self.showToast("请输入职位");
                return;
            }
            if( common.isNull(_self.dataParams.start_time) ){
                _self.showToast("请选择在职开始时间");
                return;
            }
            if( common.isNull(_self.dataParams.end_time) ){
                _self.showToast("请选择在职结束时间");
                return;
            }
            if(_self.strToTimestamp(_self.dataParams.start_time)>=_self.strToTimestamp(_self.dataParams.end_time)){
                _self.showToast("结束时间必须大于开始时间");
                return;
            }
            if( common.isNull(_self.dataParams.description) ){
                _self.showToast("请填写描述信息");
                return;
            }
            console.log(_self.dataParams);
            let params = {
                interfaceId:common.interfaceIds.saveDataFun,
                coll:'workExperiences',
                data:_self.dataParams,
            };
            if(_self.isEdit) {
                params._id = _self.we_id;
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    // console.log(response);
                    _self.showToast("保存成功！")
                    setTimeout(()=>{_self.$router.goBack()},1000);

                });
        },
        removeData(){
            let _self = this;
            var params = {
            interfaceId:common.interfaceIds.updateData,
            coll:'workExperiences',
            wheredata:{"_id":_self.we_id},
            data:{
                $set:{
                    is_del: 1
                }
            }
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    // console.log(response);
                    _self.showToast("删除成功！")
                    setTimeout(()=>{_self.$router.goBack()},1000);
                });
        }
    }
}
</script>
<style scoped>
  @import '../../../static/css/meow/bianjigongzuojinli.css';
  .shijian{
    width: 1.6rem;
  }
  .zzsj{
    width: 6.9rem !important;
    margin-left: 0.3rem !important;
  }
</style>
