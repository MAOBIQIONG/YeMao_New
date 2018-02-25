<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>订单详情</span>
      <div v-if="improve" class="header-right" v-tap="{ methods:update }"><span>完善</span></div>
      <div v-else class="header-right" v-tap="{ methods:submit }"><span>发布</span></div>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
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
            <x-address @on-hide="logHide" @on-show="logShow" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="city"></x-address>
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
            <input type="text" placeholder="请输入预算金额" v-model="budget" ref="budget"/>
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>抢单截止日期</span>
          </div>
          <div class="qdtime-right">
              <datetime v-model="deadLine"class="shijian"></datetime>
          </div>
        </div>
      </div>
      <div class="bt-mj-gs">
        <div class="xmbt">
          <div class="xmbt-left">
            <span>设计单位</span>
          </div>
          <div class="xmbt-right">
            <input type="text" placeholder="请输入设计单位" v-model="unit" ref="unit"/>
          </div>
        </div>
        <div class="xmmj">
          <div class="xmbt-left">
            <span>设计面积</span>
          </div>
          <div class="xmbt-right">
            <input type="text"placeholder="请输入设计面积" v-model="area" ref="area"/>
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
                <checker-item key="1" value="1" class="fa">扩初</checker-item>
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
              <input type="text" placeholder="请输入工时" v-model="hours" ref="hours"/>
            </div>
          </div>
          <div class="gsh-bottom">
            <div class="gb-left">
              <span>设计起止时间</span>
            </div>
            <div class="gb-right">
              <span><datetime v-model="startTime" class="shijian"></datetime></span> / <span><datetime v-model="endTime" class="shijian"></datetime></span>
            </div>
          </div>
        </div>
      </div>
      <div class="sctp">
        <div class="sc-top">上传图片</div>
        <div class="img-body" v-for="img in subParams.imgs">
          <img :src="getDefultImg(img.src)" />
        </div>
        <div class="st-bottom" v-if="isShow" v-tap="{ methods:triggerFile }">
          <img src="../../../static/images/employer/j.png" />
        </div>
      </div>
    </div>
    </div>
    <!--弹窗-->
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data, Value2nameFilter as value2name, Datetime, Group, Checker, CheckerItem, Toast } from 'vux'
  import store from '@/vuex/store'

  export default {
    components: {
      XAddress,
      Datetime,
      Group,
      Checker,
      CheckerItem,
      Toast
    },
    store,
    data () {
      return {
        isInvited: false,
        userInfo: {},
        improve: 0,
        order_id: null,
        isShow: true,
        typeList: [],
        city: ['上海市'],
        deadLine: common.getSomeday(),
        startTime: common.getSomeday(-1),
        endTime: common.getSomeday(-2),
        subParams:{
          user_id: '',
          project_type: '',
          project_region:"上海市",
          project_title: '',
          project_describe: '',
          project_budget: '',
          project_deadLine: 0,
          project_unit: '',
          project_area: '',
          project_depth: [],
          project_workHours: '',
          project_startTime: 0,
          project_endTime: 0,
          project_participants: 0,
          project_winBidder: '',
          project_state: 0,
          imgs: []
        },
        is_submit: false,
        showMark: false,
        showMsg: '',
        addressData: ChinaAddressV4Data,
      }
    },
    created: function () {
      console.log("fbdd created:")
      var _self = this;
      // 用户信息
      _self.userInfo = common.getObjStorage("userInfo");
      _self.subParams.user_id = _self.userInfo._id;
      // 项目类型
      _self.typeList = common.getProjectTypes();
      //判断是否页面来自于设计师完善
      _self.order_id = _self.$route.query.id;
      _self.improve = _self.$route.query.improve;
      if(_self.$route.query.improve && !common.isNull(_self.order_id)) {
        _self.loadData();
      }
      //判断页面是否来自于邀请
      let invitation = _self.$route.query.invitation;
      let designerid = _self.$route.query.designerid;
      if(invitation && designerid) {
        _self.isInvited=true;
      }
    },
    destroyed(){
        common.delStorage('fromMyOrderDetail');
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      //上传图片
      triggerFile(){
        console.log("trigger:")
        var _self = this;
        uploadImg.init({
          callback:function (path) {
            console.log("path："+path)
            _self.subParams.imgs.push({src:path});
          }
        });
      },
      /**************************************/
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      getDefultImg(path){
        return common.getAvatar(path)
      },
      // 地区
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      },
      logHide (str) {
        var _self = this;
        console.log('on-hide', str)
        if( str == true ){
          if( _self.city[0] == '110000' || _self.city[0] == '120000' ||
            _self.city[0] == '310000' || _self.city[0] == '500000' ){
            _self.city[1] = '--';
          }else{
            _self.city[0] = '--';
          }
          var city = _self.getName(_self.city);
          _self.subParams.project_region = city.trim();
          // console.log('project_region', _self.subParams.project_region)
        }
      },
      logShow (str) {
        console.log('on-show',str)
      },
      // 设计深度
      onChange(val){
        console.log("onChange："+val)
      },
    loadData(){
        var _self = this;
        var params = {
            interfaceId:common.interfaceIds.getProjectDetail,
            order_id:this.order_id,
            user_id:_self.subParams.user_id
        }
        _self.$axios.post('/mongoApi', {
            params: params
        }, response => {
            console.log(response)
            var data = response.data;
            if(data){
                // this.subParams = data.order;
                let objectKeys = Object.keys(_self.subParams);
                objectKeys.reduce(
                    (accumulator,currentValue,currentIndex,array)=>{
                        // console.log(currentValue,accumulator);
                        _self.subParams[currentValue] = data.order[currentValue];
                    },0
                );
                // _self.subParams.user_id = "5a55a3a3565a966d3b6a932e"
                console.log(_self.subParams);
            }
        });
    },
    update(){
        //updateData
        var _self = this;
        if(!_self.validate(1)) return;
        console.log('完善验证完成');
        // return;
        _self.subParams.project_state=2;// 将状态置为待支付
        var params = {
            interfaceId:common.interfaceIds.modifyOrders,
            coll:common.collections.orderList,
            data:_self.subParams,
            wheredata:{
                _id:_self.order_id,
            },
        };

        _self.$axios.post('/mongoApi', {
            params: params
        }, response => {
            console.log(response)
            var data = response.data;
            if( data.code == 200 ){
              _self.showToast("完善成功!");
              setTimeout(function () {
                if(!common.isNull('fromMyOrderDetail')){
                    _self.$router.go(-2);
                    return;
                }
                _self.goback();
              },1000)
            }else{
              _self.showToast("完善失败!");
            }
        });
    },

    validate(improve){
      var _self = this;
      if(improve){
          if( common.isNull(_self.userInfo) == true ){
              _self.showToast("未成功获取用户信息!");
              return false
          }
      }else {
          if( common.isNull(_self.subParams.user_id) == true ){
              _self.showToast("未成功获取用户信息!");
              return false
          }
      }

      if( common.isNull(_self.subParams.project_type) == true ){
        _self.showToast("请选择项目类型!");
        return false
      }
      if( common.isNull(_self.subParams.project_region) == true ){
        _self.showToast("请选择项目地区!");
        return false
      }
      if( common.isNull(_self.subParams.project_title) == true ){
        _self.showToast("请输入项目标题!");
        return false
      }
      if( common.isNull(_self.subParams.project_describe) == true ){
        _self.showToast("请输入项目描述!");
        return false
      }
      if( common.isNull(_self.subParams.project_budget) == true ){
        _self.showToast("请输入预算金额!");
        return false
      }
      var currdate = common.getSomeday();
      if( !common.dateCompare(currdate,_self.deadLine) ){
        _self.showToast("抢单截止日期不能小于当前日期!");
        return false
      }
      if( common.isNull(_self.subParams.project_unit) == true ){
        _self.showToast("请输入设计单位!");
        return false
      }
      if( common.isNull(_self.subParams.project_area) == true ){
        _self.showToast("请选择设计面积!");
        return false
      }
      if( _self.subParams.project_depth.length == 0 ){
        _self.showToast("请选择设计深度!");
        return false
      }
      if( common.isNull(_self.subParams.project_workHours) == true ){
        _self.showToast("请输入工时!");
        return false
      }
      if( !common.dateCompare(_self.deadLine,_self.startTime) ){
        _self.showToast("开始时间不能小于抢单截止日期!");
        return false
      }
      if( !common.dateCompare(_self.startTime,_self.endTime) ){
        _self.showToast("截止时间不能小于开始日期!");
        return false
      }
      return true;
    },
      submit(){
        console.log("submit:")
        var _self = this;
        //验证输入
        if(!_self.validate()) return;
        // 避免多次点击提交按钮
        if( _self.is_submit == true ) return;
        _self.is_submit = true;
        // 字符串转时间戳
        _self.subParams.project_deadLine = common.string2TimeStamp(_self.deadLine);
        _self.subParams.project_startTime = common.string2TimeStamp(_self.startTime);
        _self.subParams.project_endTime = common.string2TimeStamp(_self.endTime);
        // 参数
        var params = {
          interfaceId:common.interfaceIds.addOrders,
          data:_self.subParams
        }
        // 邀请设计师
        params.data.project_winBidder = _self.isInvited==true ? _self.designerid : '';
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // 提交标识
          _self.is_submit = true;
          // 返回数据
          var data = response.data;
          if( data && data.code == 200 ){
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

    },

    computed: {
      // 计算属性的 getter
      hours: {
        // getter
        get: function () {
          return this.subParams.project_workHours;
        },
        // setter
        set: function (newValue) {
          var _self = this;
          newValue = common.checkMoney(newValue,100000000,2);
          _self.$refs.hours.value = newValue;
          _self.subParams.project_workHours = newValue;
        }
      },

      unit: {
        // getter
        get: function () {
          return this.subParams.project_unit
        },
        // setter
        set: function (newValue) {
          var _self = this;
          newValue = common.checkMoney(newValue,100000000,2);
          _self.$refs.unit.value = newValue;
          _self.subParams.project_unit = newValue;
        }
      },

      area: {
        // getter
        get: function () {
          return this.subParams.project_area
        },
        // setter
        set: function (newValue) {
          var _self = this;
          newValue = common.checkMoney(newValue,100000000,2);
          _self.$refs.area.value = newValue;
          _self.subParams.project_area = newValue;
        }
      },

      budget: {
        // getter
        get: function () {
          return this.subParams.project_budget
        },
        // setter
        set: function (newValue) {
          var _self = this;
          newValue = common.checkMoney(newValue,100000000,2);
          _self.$refs.budget.value = newValue;
          _self.subParams.project_budget = newValue;
        }
      },
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
    /*width: 1.8rem;*/
    height: 0.8rem;
    display:inline-block!important;
  }
  .weui-cell_access .weui-cell__ft{
    position: static !important;
    line-height: 0.8rem;
    padding-right: 0 !important;
  }
  .vux-cell-value{
    color: #999999;
  }
  .vux-cell-primary vux-popup-picker-select-box{
    width: 100%;
  }
  .vux-popup-picker-value{
    /*width: 2.9rem;*/
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
  @import '../../../static/css/employer/fabudingdan.css';
  .shijian{
    width: 1.6rem;
  }
  .demo5-item-selected {
    background: #f65aa6;
    color:#fff;
  }
</style>
