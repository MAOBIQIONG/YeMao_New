<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>作品上传</span>
      <div class="header-right" @click="submit()">完成</div>
    </div>
    <!--编辑工作经历-->
    <div class="content content-p">
      <!--图片上传-->
      <div class="sctp">
        <div class="st-bottom">
          <img src="../../../static/images/employer/j.png" />
        </div>
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em" :time="1500"></toast>
    <loading :show="loadingShow" text="提交中"></loading>
  </div>
</template>

<script>
import {Toast} from "vux"
export default {
    components:{
        Toast
    },
    data: function () {
      return {
        resumeParams:{},
        toastShow:false,
        toastText:"",
        dataParams:{},
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
        console.log(_self.dataParams);  
        // console.log(resumeParams1,resumeParams3);
        // console.log('_self.resumeParams',_self.resumeParams);
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      mix(protoObject,ifNeedPropProto=false){
            let w =function(toObject){
                //以protoObject为原型以toObject属性为自有属性创建新的对象
                let d = Object.create(protoObject,Object.getOwnPropertyDescriptors(toObject))
                //将原型属性赋值于自有属性
                if(ifNeedPropProto){
                    for (var k in d){
                        d[k] = d[k]
                    }
                }              
                return d;
            };
            return {
                w
            }
        },
        showToast(msg){
            this.toastShow = true;
            this.toastText = msg;
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
                        // common.setStorage("resumeId",data._id);
                        _self.dataParams.user_id = _self.user_id;
                        _self.dataParams = data;
                    }
                });
        },
        submit(){
            let _self = this;
            _self.loadingShow = true;
            _self.dataParams.status = 1;
            _self.dataParams.is_del = 0;
            let params = {
                interfaceId:common.interfaceIds.saveDataFun,
                coll:common.collections.resumes,
                data:_self.dataParams
            };
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {                  
                    console.log(response);
                    _self.showToast('提交成功');
                    setTimeout(()=>{_self.loadingShow = false; _self.toUrl('shouchangjianli');},1500)
                });
         },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/zuopinshangchuan.css';
</style>
