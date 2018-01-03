<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>订单详情</span>
      <div class="header-right" v-tap="{ methods:submit }"><span>发布</span></div>
    </div>
    <!--发布订单内容-->
    <div class="fb-content">
      <div class="xmlx">
        <div class="xmlx-left">
          <span>项目类型</span>
        </div>
        <div class="xmlx-right">
          <select class="xmlx-kuang" v-model="subParams.project_type">
            <option value="">请选择类型</option>
            <option v-for="item in typeList" :value="item._id">{{item.type_name}}</option>
          </select>
        </div>
      </div>
      <div class="xmlx">
        <div class="xmlx-left">
          <span>项目地区</span>
        </div>
        <div class="xmlx-right">
          <group class="xmlx-kuang">
            <x-address @on-hide="logHide" @on-show="logShow" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="subParams.project_region"></x-address>
          </group>
        </div>
      </div>
      <div class="xmbt">
        <div class="xmbt-top">
          <div class="xt-left"><span>项目标题</span></div>
          <div class="xt-right"><input type="text" placeholder="请输入项目标题" v-model="subParams.project_title" maxlength="20"/></div>
        </div>
        <div class="xmbt-bottom">
          <textarea class="xt-txt" placeholder="请详细描述一下项目的内容" v-model="subParams.project_describe" maxlength="200"></textarea>
        </div>
      </div>
      <div class="ys-time">
        <div class="ys">
          <div class="ys-left">
            <span>预算</span>
          </div>
          <div class="ys-right">
            <input type="text" placeholder="请输入预算金额" v-model="subParams.project_budget"/>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>抢单截止日期</span>
          </div>
          <div class="qdtime-right">
              <datetime v-model="subParams.project_deadLine"></datetime>
          </div>
        </div>
      </div>
      <div class="bt-mj-gs">
        <div class="xmbt">
          <div class="xmbt-left">
            <span>设计单位</span>
          </div>
          <div class="xmbt-right">
            <input type="text" placeholder="请输入设计单位" v-model="subParams.project_unit"/>
          </div>
        </div>
        <div class="xmmj">
          <div class="xmbt-left">
            <span>设计面积</span>
          </div>
          <div class="xmbt-right">
            <input type="text"placeholder="请输入设计面积" v-model="subParams.project_area"/>
          </div>
        </div>
        <div class="sjsd">
          <div class="sjsd-top">设计深度</div>
          <div class="sjsd-bottom">
            <div class="fanan">
              <checker
                type="checkbox"
                selected-item-class="demo5-item-selected"
                @on-change="onChange" v-model="subParams.project_depth">
                <checker-item key="0" value="0" class="fa">方案</checker-item>
                <checker-item key="1" value="1" class="fa">扩出</checker-item>
                <checker-item key="2" value="2" class="fa">施工</checker-item>
              </checker>
            </div>
          </div>
        </div>
        <div class="gongshi">
          <div class="gs">
            <div class="xmbt-left">
              <span>工时</span>
            </div>
            <div class="xmbt-right">
              <input type="text"placeholder="请输入工时" v-model="subParams.project_workHours"/>
            </div>
          </div>
          <div class="gsh-bottom">
            <div class="gb-left">
              <span>设计起止时间</span>
            </div>
            <div class="gb-right">
              <span><datetime v-model="subParams.project_startTime" class="shijian"></datetime></span> / <span><datetime v-model="subParams.project_endTime" class="shijian"></datetime></span>
            </div>
          </div>
        </div>
      </div>
      <div class="sctp">
        <div class="sc-top">上传图片</div>
        <div class="st-bottom" v-if="isShow" v-tap="{ methods:triggerFile }">
          <img src="../../../static/images/employer/j.png" />
        </div>
        <div class="img-body" v-for="img in imgList">
          <img :src="img.src" />
        </div>
        <imageUpload :img-arr.sync="imgList"></imageUpload>
      </div>
    </div>
    <!--弹窗-->
    <div class="tishikuang">
      <div class="tisi">
        发布成功
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import imageUpload from '../../components/upload/image-upload.vue'
  import { XAddress, ChinaAddressV4Data, Datetime, Group, Checker, CheckerItem, Toast } from 'vux'
  import store from '@/vuex/store'

  export default {
    components: {
      XAddress,
      Datetime,
      Group,
      Checker,
      CheckerItem,
      imageUpload,
      Toast
    },
    store,
    data () {
      return {
        userInfo:{},
        imgList:[],
        isShow:true,
        typeList:[],
        subParams:{
          user_id:"",
          project_type:"",
          project_region:['上海市'],
          project_title:"",
          project_describe:"",
          project_budget:"",
          project_deadLine:"",
          project_unit:"",
          project_area:"",
          project_depth:[],
          project_workHours:"",
          project_startTime:"",
          project_endTime:"",
          project_participants:0,
          project_winBidder:"",
          imgs:[]
        },
        showMark:false,
        showMsg:"",
        addressData: ChinaAddressV4Data,
      }
    },
    created: function () {
      console.log("fbdd created:")
      this.userInfo = common.getObjStorage("userInfo");
      this.subParams.user_id = this.userInfo._id;

      var timeStamp = common.getCurrentTimeStamp();
      var dateStr = common.timeStamp2String(timeStamp,"ymd");
      this.subParams.project_deadLine=dateStr;
      this.subParams.project_startTime=dateStr;
      this.subParams.project_endTime=dateStr;

      this.typeList = common.getProjectTypes();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      // 地区
      logHide (str) {
        var obj = this;
        console.log('on-hide', str)
        if( str == true ){
          console.log('value', obj.subParams.project_region)
          if( obj.subParams.project_region[0] == '110000' || obj.subParams.project_region[0] == '120000' ||
            obj.subParams.project_region[0] == '310000' || obj.subParams.project_region[0] == '500000' ){
            obj.subParams.project_region[1] = '--';
          }else{
            obj.subParams.project_region[0] = '--';
          }
        }
      },
      logShow (str) {
        console.log('on-show',str)
      },

      /**************************************/
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      //上传图片
      triggerFile(){
        console.log("trigger:")
        document.getElementById("img-upload").click();
      },

      onChange(val){
        console.log("onChange："+val)
      },

      submit(){
        console.log("submit:")
        var _self = this;
        if( common.isNull(_self.subParams.user_id) == true ){
          _self.showToast("未成功获取用户信息!");
          return
        }
        if( common.isNull(_self.subParams.project_type) == true ){
          _self.showToast("请选择项目类型!");
          return
        }
        if( _self.subParams.project_region.length < 2 ){
          _self.showToast("请选择项目地区!");
          return
        }else{

        }
        if( common.isNull(_self.subParams.project_title) == true ){
          _self.showToast("请输入项目标题!");
          return
        }
        if( common.isNull(_self.subParams.project_describe) == true ){
          _self.showToast("请输入项目描述!");
          return
        }
        if( common.isNull(_self.subParams.project_budget) == true ){
          _self.showToast("请输入预算金额!");
          return
        }
        if( common.isNull(_self.subParams.project_unit) == true ){
          _self.showToast("请输入设计单位!");
          return
        }
        if( common.isNull(_self.subParams.project_area) == true ){
          _self.showToast("请选择设计面积!");
          return
        }
        if( _self.subParams.project_depth.length == 0 ){
          _self.showToast("请选择设计深度!");
          return
        }
        if( common.isNull(_self.subParams.project_workHours) == true ){
          _self.showToast("请输入工时!");
          return
        }
        if( common.dateCompare(_self.subParams.project_deadLine,_self.subParams.project_startTime) == false ){
          _self.showToast("开始时间不能小于抢单截止日期!");
          return
        }
        if( common.dateCompare(_self.subParams.project_startTime,_self.subParams.project_endTime) == false ){
          _self.showToast("截止时间不能小于开始日期!");
          return
        }
        var params = {
        //批量添加
        interfaceId:common.interfaceIds.insertData,
          coll:common.collections.orderList,
          data:_self.subParams
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(JSON.stringify(response))
          var data = response.data;
          if( data && response.code == '200' ){
            this.$store.state.indexRefreshMark = 1;
            this.$store.state.employerRefreshMark = 1;
            _self.showToast("发布成功！");
            setTimeout(function () {
              _self.toUrl('releaseSuccess');
            },1000)
          }else{
            _self.showToast("发布失败！");
          }
        })
      }

    }
  }
</script>
<style>
  /*地区*/
  .vux-no-group-title {
    margin-top:0 !important;
    font-size: 0.28rem !important;
  }
  .weui-cells{
    background: transparent !important;
  }
  .weui-cell_access {
    padding:0 !important;
    width: 2.9rem;
    height: 0.8rem;
    display:inline-block!important;
  }
  .weui-cell_access .weui-cell__ft{
    position: static !important;
    line-height: 0.8rem;
  }
  .vux-cell-value{
    color: #999999;
  }
  .vux-cell-primary vux-popup-picker-select-box{
    width: 100%;
  }
  .vux-popup-picker-value{
    width: 2.9rem;
    display:block;
    text-align: left;
    height: 0.8rem !important;
    line-height: 0.8rem !important;
    overflow:hidden;
    padding-left: 0.1rem;
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    text-overflow:ellipsis;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/employer/fabudingdan.css';
  .shijian{
    width: 1.8rem;
  }
  .demo5-item-selected {
    background: #f65aa6;
    color:#fff;
  }
  /*提示框*/
  .tishikuang .tisi {
    position: fixed;
    width: 2rem;
    height: 1.2rem;
    border-radius: 0.1rem;
    background: #8d8d8d;
    text-align: center;
    line-height: 1.2rem;
    color: white;
    left:2.75rem;
    top: 30%;
    font-size: 0.32rem;
    display: none;
  }
</style>
