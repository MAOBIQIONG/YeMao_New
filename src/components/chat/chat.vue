<template>
  <div>
    <div class="emoji-box" v-if="emojiFlag==true">
      <img class="emoji-small" v-for="item in emojis" v-tap="{methods:getAttrName,name:item.name}" :src="item.img">
    </div>
    <!-- 评论输入框 -->
    <div class="input-box">
      <div class="input">
        <input v-model="comment_text" type="text" :placeholder="comment_placeholder" ref="commentInput">
      </div>
      <div class="emoji">
        <div class="left" v-tap="{methods:showEmoji}"></div>
        <div class="right" v-tap="{methods:triggerFile}"></div>
      </div>
      <div class="send-btn" :class="is_submit?'hover':''">
        <div class="btn" v-tap="{methods:sendMsg}">发送</div>
      </div>
    </div>
    <!--弹窗-->
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  import emoji from '../../../static/js/emoji.js'
  export default {
    components: {
      Toast
    },
    props:{
      to: String,              // 发送人/群id
      scene: String,           // 聊天场景:p2p,team
    },
    data () {
      return {
        emojis:[],
        emojiFlag:false,
        is_submit:false,
        comment_placeholder:'填写评论',
        comment_id:'',
        comment_text:'',
        showMark:false,
        showMsg:"",
      }
    },
    watch:{
      comment_text:{
        handler:function(val,oldval){
          var _self = this;
          if( _self.is_submit==false && val.length > 0 ){
            _self.is_submit = true;
          }else if( val.length == 0 ){
            _self.is_submit = false;
          }
        }
      }
    },
    created(){
      var _self = this;
      // emoji
      var emojiObj = emoji.emojiList.emoji;
      for (var i in emojiObj) {
        var obj = {img:emojiObj[i].img,name:i};
        _self.emojis.push(obj);
      }
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      getAttrName(params){
        var _self = this;
        _self.comment_text += params.name;
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      showEmoji(){
        var _self = this;
        console.log("emojiFlag:"+_self.emojiFlag)
        _self.emojiFlag = _self.emojiFlag==false ? true : false;
      },
      //上传图片
      triggerFile(){
        console.log("trigger:")
        var _self = this;
        if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
          uploadImg.init({
            callback:function (path) {
              var newPath = '['+path+']';
              _self.sendMsg({path:newPath});
            }
          });
        }
      },
      // 发送消息
      sendMsg(params){
        var _self = this;
        if( common.isNull(_self.to) ){
          _self.showToast('请重新确认聊天对象!');
          return;
        }
        var text = common.isNull(params.path) ? _self.comment_text : params.path;
        wyim.sendTextMsg(_self.to,text,function (msg) {
          // console.log("chat msg:"+JSON.stringify(msg))
          _self.emojiFlag = false;
          _self.comment_text = '';
          _self.saveChatRecord(msg);
        },_self.scene);
      },

      saveChatRecord(msg){
        var _self = this;
        var scene = _self.scene=='team' ? 1 : 0;
        let params = {
          interfaceId:common.interfaceIds.addChatRecord,
          sender: msg.from,
          recipient: msg.to,
          content: msg.text,
          scene: scene
        };
        _self.$axios.post('/mongoApi',{
          params
        },(response)=>{
          console.log(response);
          var data = response.data;
          if( data.code == 200 ){
            _self.$emit('upup', msg)// 主动触发upup方法，'hehe'为向父组件传递的数据
          }
        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

