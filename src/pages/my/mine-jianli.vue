<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>人才详情</span>
      <div class="header-right"></div>
    </div>
    <div class="content content-p">
      <!--基本信息-->
      <div class="jbxx">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg" />
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
              <p>{{item.positions}}</p>
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
        <div class="fanhui" @click="toUrl('gerenzuoping')">
          <img src="../../../static/images/youhui.png" />
        </div>
        <div class="gzzp-content">
          <ul>
            <li>
              <img src="../../../static/images/bj.jpg" />
            </li>
            <li>
              <img src="../../../static/images/bj.jpg" />
            </li>
            <li>
              <img src="../../../static/images/bj.jpg" />
            </li>
            <li>
              <img src="../../../static/images/bj.jpg" />
            </li>
          </ul>
        </div>
      </div>
      <!--聊天-->
      <div class="mmlt">
        喵 喵 聊 天
      </div>
    </div>
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
        Loading
    },
    data () {
      return {
          loaded:false,
          resumeId:"",
          resume:{},
          loadingShow:false,
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
        if(resumeId){
            this.resumeId = resumeId;
            this.requestData();
        }
        if(isUserId){
            let user = common.getObjStorage("userInfo");
            if( !common.isNull(user._id) ){
                this.user_id = user._id;
                this.requestData2();
            } else {
                console.error('未获取用户参数');
            }            
        }
        
        
    },
    mounted: function () {
      this.dianzan();
    },

    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      // 收藏效果
      dianzan(){
        var lr=true
        $(".header-right").click(function(){
          if(lr==true){
            $(".header-right").addClass("hr-hover");
            lr=false
          }else if(lr==false){
            $(".header-right").removeClass("hr-hover");
            lr=true
          }
        });
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
                _id:_self.resumeId
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
                        console.log('noData');
                    }
                });
        },
        setData(data){
            let _self = this;
            _self.resume = data;
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
</style>
