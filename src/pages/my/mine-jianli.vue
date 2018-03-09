<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>人才详情</span>
      <div v-if="isMyResume == false" class="header-right" :class="{'hr-hover':resume.collectFlag==1}" @click="collect()"></div>
    </div>
    <!-- 我的简历无数据 -->
    <div v-if="noResume">
        <!-- <div style="padding:0.1rem 0;background:transparent;width:2rem;font-size:0.4rem;text-align:center;margin:50%  auto 0 auto">暂无简历</div> -->
        <div class="imgNoData">
            <img src="../../../static/images/shuju.png"/>
        </div>
    </div>
    <!-- 我的简历有数据 -->
    <div class="content content-p" v-else>
      <!--基本信息-->
      <div class="jbxx">
        <div class="touxiang" :style="{backgroundImage:`url(${checkAvatar(resume.img)})`}">
          <!-- <img src="../../../static/images/bj.jpg" /> -->
        </div>
        <p>基本信息</p>
        <p class="xingmin"><span>{{resume.real_name}}</span>/<span>{{resume.gender}}</span>/<span>{{getAge(resume.birthday)}}岁</span>/<span>{{getCityName(resume.city)}}</span></p>
        <div class="xq">
          <div class="xinxi-list">
            <div class="xx-left">
              工作年限：
            </div>
            <div class="xx-right">
              {{getWorkYears(resume.working_year)}}
            </div>
          </div>
          <div class="xinxi-list">
            <div class="xx-left">
              学 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：
            </div>
            <div class="xx-right">
                {{resume.education}}
            </div>
          </div>
          <div class="xinxi-list">
            <div class="xx-left">
              邮 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：
            </div>
            <div class="xx-right">
                {{resume.email}}
            </div>
          </div>
          <div class="xinxi-list">
            <div class="xx-left">
              毕业院校：
            </div>
            <div class="xx-right">
                {{resume.school_name}}
            </div>
          </div>
          <div class="xinxi-list">
            <div class="xx-left">
              设计类型：
            </div>
            <div class="xx-right">
                {{getTypeName(resume.type)}}
            </div>
          </div>
        </div>
      </div>
      <!--期望工作-->
      <div class="qwgz">
        <div class="left">
        </div>
        <div class="qwgz-top">
          <p class="biaoti">期望工作</p>
          <p class="zhiwei"><span>{{resume.expected_positions}}</span>/<span>￥{{resume.expected_salary}}</span></p>
        </div>
        <div class="right">
        </div>
        <div class="qwgz-bottom">
          <p>{{resume.expected_description}}</p>
        </div>
      </div>
      <!--工作经历-->
      <div class="gzjl">
        <div class="gzjl-top">
          <div class="left">
          </div>
          <div class="right">
          </div>
          工作经历
        </div>
        <div class="gzjl-content">
          <div class="gc-list" v-for="(item,index) in resume.wes" :key="index">
            <div class="yuan"></div>
            <div class="neirong">
              <p>{{item.start_time}}~{{item.end_time}}</p>
              <p>{{item.company_name}}</p>
              <!--<p>{{item.positions}}</p>-->
              <p class="gznr">工作内容</p>
              <div class="list-neirong">
                {{item.description}}
              </div>
            </div>
          </div>


        </div>
      </div>
      <!--自我描述-->
      <div class="zwms">
        <div class="zwms-top">
          <div class="left">
          </div>
          <div class="right">
          </div>
          自我描述
        </div>
        <div class="zwms-content">
          {{resume.description}}
        </div>
      </div>
      <!--个人作品-->
      <div class="grzp">
        <div class="grzp-top">
          <div class="left">
          </div>
          <div class="right">
          </div>
          个人作品
        </div>
        <div class="fanhui" @click="toUrl('gerenzuoping')" v-if="resume.works_imgs">
          <img src="../../../static/images/youhui.png" />
        </div>
        <div class="gzzp-content">
          <ul  v-if="resume.works_imgs">
            <li v-for="(path,index) in resume.works_imgs.slice(0,4)" :key="index">
                <div class="image" :style="{backgroundImage:`url(${checkImg(path)})`}"></div>
              <!-- <img :src="checkImg(path)" /> -->
            </li>
          </ul>
          <div v-else style="font-size:0.3rem;text-align:center;margin-top:1rem;">暂无个人作品</div>
        </div>
      </div>
      <!--聊天-->
      <div class="mmlt" v-tap="{methods:toUrlWUI,pagename:'liaotian',query:{id:resume.user_id,name:resume.real_name,img:resume.img}}">喵 喵 聊 天</div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    <loading :show="loadingShow" text="加载中"></loading>
  </div>
</template>

<script>
import {Scroller,LoadMore,Toast,Loading,Value2nameFilter as value2name,ChinaAddressV4Data} from 'vux'
  export default {
    components:{
        Scroller,
        LoadMore,
        Toast,
        Loading,
    },
    data () {
        return {
            loaded:false,
            resumeId:"",
            resume:{
                collectFlag:0
            },
            loadingShow:false,
            isMyResume:false,
            noResume:false,
            //toast
            showMark:false,
            showMsg:"",
        }
    },
    watch:{
        pullUpDownStatus:{
            handler:function(val,oldval){
                if(val.pullupStatus=="loading"){
                    this.loadMoreStatus.show=true;
                    if(this.hasMore == false){
                        this.loadMoreStatus.showLoading=false;
                    } else {
                        this.loadMoreStatus.showLoading=true;
                    }
                }
            }
        },
        loaded:{
            handler(val,oldval){
                // console.log(val,oldval);
                if(val == true){
                    this.setData(this.data);
                }
            }
        }
    },
    created(){
        let resumeId = this.$route.query.id;
        let isUserId = this.$route.query.isUserId;
        let user = common.getObjStorage("userInfo");
        if( !common.isNull(user._id) ){
            this.user_id = user._id;
        } else {
            console.log('未获取用户参数');
        }
        if(resumeId){
            this.resumeId = resumeId;
            let resume_user_id = common.getStorage('resume_user_id');
            if(resume_user_id==this.user_id){
                this.isMyResume = true;
            }
            common.delStorage('resume_user_id');
            this.requestData();
        }
        if(isUserId){
            this.isMyResume = true;
            this.requestData2();
        }


    },
    mounted: function () {
    //   this.dianzan();
    },

    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toUrl2: function (params) {
        this.$router.push({name: params.pagename,query:params.query || {}})
      },
      toUrlWUI: function (params) { // toUrlWidthUserInfo
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
          this.$router.push({name: params.pagename,query:params.query || {}})
        }else{
          this.$router.push({name: 'login'})
        }
      },
        // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      checkImg(path){
        return common.getDefultImg(path);
      },

        showToast(msg){
            this.showMark = true;
            this.showMsg = msg;
        },
        checkLogin(){
            var _self = this;
            var user = common.getObjStorage("userInfo") || {};
            if(common.isNull(user._id)){
                console.log('没有获取用户信息');
                _self.$router.push({name:"login"});
                return false;
            }
            return true;
        },
        collect_dom(param){
            var _self = this;
            _self.resume.collectFlag == 0 ? _self.resume.collectFlag=1 : _self.resume.collectFlag=0;
        },
        collect(){
            var _self = this;
            if(_self.checkLogin()){
                _self.collect_dom();
            } else {
                return;
            }

            console.log(this.resume.collectFlag);
            // return;
            var params = {
                interfaceId:common.interfaceIds.collect,
                data:{
                    collect_type: 4,//人才
                    collect_id:_self.resumeId,
                    user_id: _self.user_id,
                }
            }
            _self.$axios.post('/mongoApi', {
                params: params
            }, response => {
                var data = response.data;
                var tips = '';
                if( data && data.code == 200 ){
                tips = _self.resume.collectFlag == 0 ? '取消成功！' : '收藏成功！';
                }else{
                tips = _self.resume.collectFlag == 0 ? '取消失败！' : '收藏失败！';
                }
                _self.showToast(tips);
            })
        },
        getCityName (value) {
            if(!value) return;
            return value2name(value, ChinaAddressV4Data);
        },
        getTypeName(value){
            return common.getNameByTypeId(value);
        },
        getWorkYears(value){
            return common.getWorkyearsName(value);
        },
        //strBirthday:yyyy-mm-dd
        getAge(strBirthday){
            if(!common.isString(strBirthday)){
                // console.error("参数需要字符串");
                return;
            }
            var returnAge;
            var strBirthdayArr=strBirthday.split("-");
            var birthYear = strBirthdayArr[0];
            var birthMonth = strBirthdayArr[1];
            var birthDay = strBirthdayArr[2];

            var d = new Date();
            var nowYear = d.getFullYear();
            var nowMonth = d.getMonth() + 1;
            var nowDay = d.getDate();

            if(nowYear == birthYear){
                returnAge = 0;//同年 则为0岁
            }
            else{
                var ageDiff = nowYear - birthYear ; //年之差
                if(ageDiff > 0){
                    if(nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay;//日之差
                        if(dayDiff < 0)
                        {
                            returnAge = ageDiff - 1;
                        }
                        else
                        {
                            returnAge = ageDiff ;
                        }
                    }
                    else
                    {
                        var monthDiff = nowMonth - birthMonth;//月之差
                        if(monthDiff < 0)
                        {
                            returnAge = ageDiff - 1;
                        }
                        else
                        {
                            returnAge = ageDiff ;
                        }
                    }
                }
                else
                {
                    returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                }
            }

            return returnAge;//返回周岁年龄
        },
        requestData(){
            let _self = this;
            _self.loadingShow = true;
            let params = {
                interfaceId:common.interfaceIds.queryResumeById,
                _id:_self.resumeId,
                user_id:_self.user_id
            };
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                    let data = response.data.resume;
                    _self.data = data;
                    if (data) {
                        _self.loaded = true;
                        console.log('数据设置完成');
                    } else {
                        console.log('noData');
                    }
                });
        },
        requestData2(){
            let _self = this;
            _self.loadingShow = true;
            let params = {
                interfaceId:common.interfaceIds.queryResumeById,
                user_id:_self.user_id
            };
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                    let data = response.data.resume;
                    _self.data = data;
                    if (data) {
                        _self.loaded = true;
                        console.log('数据设置完成');
                    } else {
                        _self.noResume = true;
                        _self.loadingShow = false;
                        console.log('noData');
                    }
                });
        },
        setData(data){
            let _self = this;
            _self.resume = data;
            common.setStorage('works_imgs',data.works_imgs);
            _self.loadingShow = false;
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/mine-jianli.css';
  .header-right{
    width: 0.88rem;
    height: 0.88rem;
    background: url("../../../static/images/xin.png") no-repeat;
    background-size: 0.6rem 0.6rem;
    background-position: center right;

  }
  .hr-hover{
    width: 0.88rem;
    height: 0.88rem;
    background: url("../../../static/images/xinghove.png") no-repeat;
    background-size: 0.6rem 0.6rem;
    background-position: center right;
  }
    .imgNoData{
        position: fixed;
        width: 4.5rem;
        left:1.5rem;
        top: 3rem;
    }
    .imgNoData img{
        width: 100%;
    }
</style>
