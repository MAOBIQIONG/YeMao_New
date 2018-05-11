<template>
  <div class="fbwd">
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:showFun}"><img src="../../../static/images/back.png" /></div>
      <span>发布问题</span>
      <div class="header-right" v-tap="{methods:submit}">完成</div>
    </div>
    <div class="content content-p">
      <div class="xgnc">
        <div class="left"><input v-model="params.title" type="text" maxlength="20" placeholder="标题（最多20字）" class="btname" ref="title"></div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" ref="area" maxlength="300" placeholder="请输入问题描述" v-model="params.description"></textarea>
        <p class="xianzhi"><span class="zs">300</span>/<span>300</span></p>
      </div>
      <!--图片上传-->
      <div class="sctp">
        <div class="img-upload">
          <div class="img" v-for="(img,index) in base64Arr" :key="index" :style="{backgroundImage: 'url(' + img + ')'}" v-tap="{methods:toPreviewer,pagename:'uploadImgPreviewer',src:img,index:index  }">
            <div class="del-btn" v-tap="{methods:clearImgs,index:index}"></div>
          </div>
          <div class="upload-handle" v-if="base64Arr.length<1" v-tap="{ methods:triggerFile }"></div>
          <!-- <div  v-tap="{methods:toPreviewer,pagename:'uploadImgPreviewer',src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522829879013&di=71a628cfbf77aeae198fdcc46bd40753&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D307475008%2C2549700829%26fm%3D214%26gp%3D0.jpg',index:0  }" :style="{position:'absolute',zIndex:'9',width:'50px',height:'50px',backgroundImage: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522829879013&di=71a628cfbf77aeae198fdcc46bd40753&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D307475008%2C2549700829%26fm%3D214%26gp%3D0.jpg)'}"></div> -->
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoad" :text="showLoadMsg"></loading>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" width="4em"></toast>
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
    import { Confirm,Toast,Loading,TransferDomDirective as TransferDom } from 'vux'
    import uploadImg2 from "../../../static/js/es6/uploadImg-more";
    export default {
        directives: {
            TransferDom
        },
        components: {
            Toast,
            Loading,
            Confirm,
        },
        data: function () {
            return {
                base64Arr:[],
                is_submit: false,
                toastShow:false,
                toastText:'sss',
                showLoad: false,
                showLoadMsg: '正在提交',
                params:{
                    title:'',
                    description:'',
                    user_id:null,
                    comments:0,
                    collection:0,
                    like:0,
                    type:4,//问答,
                    is_del:0,
                    imgs:[]
                },
                show:false,
            }
        },
        created(){
            var _self = this;
            var user = common.getObjStorage("userInfo") || {};
            if( !common.isNull(user._id) ){
                _self.params.user_id = user._id;
            } else {
                console.log('没有获取用户信息');
                // _self.$router.push({name:"login"});
            }
          // 清除图片缓存
          uploadImg2.clearImgArr(true);
          //接收来自预览页操作后传回的数据；
          var dataFromPreviewer = _self.$store.state.dataFromPreviewer;
          if(!common.isNull(dataFromPreviewer)){
            console.log(dataFromPreviewer);
            uploadImg2.imgArr=dataFromPreviewer.uploadImg2.imgArr;
            uploadImg2.imgBase64=dataFromPreviewer.uploadImg2.imgBase64;
            _self.base64Arr=dataFromPreviewer.self.imgBase64;
            _self.params.imgs=dataFromPreviewer.self.imgArr;
            _self.params.title = dataFromPreviewer.text.title;
            _self.params.description = dataFromPreviewer.text.description;
          }
        },
        destroyed(){
          this.$store.state.dataFromPreviewer=null;
        },
        mounted: function () {
            this.wzxz();
            // this.showLoad = true;
        },
        methods: {
            goback () {
                this.$router.goBack()
            },
            toUrl: function (pagename) {
                this.$router.push({name: pagename})
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
            toPreviewer(p){
              let _self = this;
              _self.$store.state.dataToPreviewer = {
                  imgsrc:p.src,
                  imageIndex:p.index,
                  text:{
                    title: _self.params.title,
                    description:_self.params.description
                  },
                  uploadImg2:{
                    imgArr:uploadImg2.imgArr,
                    imgBase64:uploadImg2.imgBase64,
                  },
                  self:{
                    imgArr: _self.params.imgs,
                    imgBase64:_self.base64Arr,
                  }
              }
              this.$router.push({name: p.pagename})
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
                if( common.isNull(_self.params.user_id) ){
                    _self.showToast("未成功获取用户信息!");
                    return;
                }
                if(common.isNull(title)) {
                    _self.showToast("请填写标题");
                    return;
                }
                if (common.isNull(area)) {
                    _self.showToast("请填写提问内容");
                    return;
                }
                // 避免多次点击提交按钮
                if( _self.is_submit == true ) return;
                _self.is_submit = true;
                // 设置加载动画
                _self.showLoad = true;
                setTimeout(()=>{_self.showLoad =false},5000);
                if( _self.base64Arr.length == 0 ){
                    _self.submit2();
                }else{
                    uploadImg2.uploadImgs();
                }
            },
            submit2(){
                let _self = this;
                let params = {
                    interfaceId:common.interfaceIds.insertData,
                    coll:common.collections.personalChw,
                    data:_self.params,
                };
                _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    // 取消加载动画
                    _self.showLoad = false;
                    // 提交标识
                    _self.is_submit = true;
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
            },
            triggerFile(){
              console.log("trigger:")
              var _self = this;
              // 调用相机、相册
              uploadImg2.init({
                maxLen:1,
                callback:function (path) {
                  console.log("path:"+path)
                  _self.base64Arr.push(path);
                },
                successfun:function (path) {
                  _self.params.imgs.push(path);
                  if( _self.params.imgs.length == _self.base64Arr.length ){
                    uploadImg2.clearImgArr(true);
                    _self.submit2();
                  }
                },
              });
            },

            // 清除
            clearImgs(params){
              var _self = this;
              var index = common.checkInt(params.index);
              console.log("clearImgs:"+index);
              uploadImg2.imgArr.splice(index,1);
              uploadImg2.imgBase64.splice(index,1);
              _self.base64Arr.splice(index,1);
              _self.params.imgs.splice(index,1);
            },
        }
    }
</script>
<style scoped>
  @import '../../../static/css/meow/fbwd.css';
  .fbwd{
    position: fixed;
  }
</style>
