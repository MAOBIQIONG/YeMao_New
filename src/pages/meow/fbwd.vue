<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>发布问题</span>
      <div class="header-right" @click="submit">完成</div>
    </div>
    <div class="set-content">
      <div class="xgnc">
        <div class="left"><input v-model="question.title" type="text" maxlength="20" placeholder="标题（最多20字）" class="btname" ref="title"></div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" ref="area" maxlength="300" placeholder="请输入问题描述" v-model="question.description"></textarea>
        <p class="xianzhi"><span class="zs">300</span>/<span>300</span></p>
      </div>
      <!--图片上传-->
      <div class="sctp">
        <div class="st-bottom">
          <img src="../../../static/images/employer/j.png" />
        </div>
      </div>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em"></toast>
  </div>
</template>

<script>
    import {Toast} from 'vux'
    export default {
        components:{
            Toast
        },
        data: function () {
            return {
                toastShow:false,
                toastText:'sss',
                question:{
                    title:'',
                    description:'',
                    user_id:null,
                    comments:0,
                    collection:0,
                    like:0,
                    type:4,//问答,
                    is_del:0
                },
            }
        },
        created(){
            var _slef = this;
            var user = common.getObjStorage("userInfo") || {};
            if( !common.isNull(user._id) ){
                _slef.question.user_id = user._id;
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
            showToast(msg){
                this.toastShow = true;
                this.toastText = msg;
            },
            submit(){
                let _self = this;
                let title = _self.$refs.title.value;
                let area = _self.$refs.area.value;
                if(common.isNull(title)) {
                    _self.showToast("请填写标题");
                    return;
                }
                if (common.isNull(area)) {
                    _self.showToast("请填写提问内容");
                    return;
                }


                let params = {
                    interfaceId:common.interfaceIds.insertData,
                    coll:common.collections.personalChw,               
                    data:_self.question,
                };
                _self.$axios.post('/mongoApi', {
                    params: params
                    }, response => {
                            console.log(response)
                            var data = response.data;
                            if( data && response.code == '200' ){
                                _self.showToast("发布成功！");

                                setTimeout(function () {
                                _self.goback();
                                },1000)
                            }else{
                                _self.showToast("发布失败！");
                            }
                        })
            }
        }
    }
</script>
<style scoped>
  @import '../../../static/css/meow/fbwd.css';
</style>
