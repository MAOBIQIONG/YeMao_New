<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>作品上传</span>
      <div class="header-right"@click="submit()">完成</div>
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
      }
    },
    created(){
        let _self = this;
        let resumeParams1 =common.getObjStorage('resumeParams1');
        let resumeParams3 =common.getObjStorage('resumeParams3');
        if(!common.isNull(resumeParams1) && !common.isNull(resumeParams3)){
            let r = _self.mix(resumeParams3).w(resumeParams1);
            for(var i in r)  {
                _self.resumeParams[i]= r[i];
            }
            // console.log(_self.resumeParams);
        }
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
      submit(){
          let _self = this;
          let params = {
              interfaceId:common.interfaceIds.saveDataFun,
              coll:common.collections.resumes,
              data:_self.resumeParams
          };
          _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                    _self.showToast('提交成功待审核');
                    setTimeout(()=>{_self.toUrl('ddsh')},1500)           
                });
      }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/zuopinshangchuan.css';
</style>
