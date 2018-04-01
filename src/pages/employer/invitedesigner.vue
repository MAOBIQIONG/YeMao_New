<template>
  <div class="templete-body designer">
    <!--头部导航-->
    <div class="header p-absolute">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>设计师</span>
    </div>
    <div class="top-menu">
      <!--智能排序-->
      <div class="sanxuan" style="margin-top:0">
        <div class="sx-cont">
          <ul>
            <li v-tap="{ methods:showArea, areaMark:0 }" :class="areaMark==0&&showMark==true ? 'up' : ''">
              <p>{{sortName0}}</p>
            </li>
            <li v-tap="{ methods:showArea, areaMark:1 }" :class="areaMark==1&&showMark==true ? 'up' : ''">
              <p>{{sortName1}}</p>
            </li>
            <li v-tap="{ methods:showArea, areaMark:2 }" :class="areaMark==2&&showMark==true ? 'up' : ''">
              <p style="border-right: none;">{{sortName2}}</p>
            </li>
          </ul>
          <div class="sort-filter">
            <div class="area" :class="areaMark==0&&showMark==true ? 'on' : ''">
              <ul>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:0 }"
                    :class="sortMark==0||sortMark>2?'active':''">智能排序
                </li>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:1 }" :class="sortMark==1?'active':''">人气最高</li>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:2 }" :class="sortMark==2?'active':''">最新发布</li>
              </ul>
            </div>
            <div class="area" :class="areaMark==1&&showMark==true ? 'on' : ''">
              <ul>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:3 }"
                    :class = "sortMark<=3||sortMark>7?'active':''">不限
                </li>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:4 }" :class="sortMark==4?'active':''">一年以下</li>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:5 }" :class="sortMark==5?'active':''">1-3年</li>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:6 }" :class="sortMark==6?'active':''">3-5年</li>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:7 }" :class="sortMark==7?'active':''">5年以上</li>
              </ul>
            </div>
            <div class="area" :class="areaMark==2&&showMark==true ? 'on' : ''">
              <ul>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:8 }" :class="sortMark<=8?'active':''">不限</li>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:9 }" :class="sortMark==9?'active':''">已实名</li>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:10 }" :class="sortMark==10?'active':''">已认证
                </li>
                <li class="bg" v-tap="{ methods:chooseSortType, sortMark:11 }" :class="sortMark==11?'active':''">已签约
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!--设计师列表-->
      <designers ref="design" :blank="height" :pulldownTop="top"></designers>
    </div>
  </div>
</template>

<script>
  import designers from '../../components/designers/designers.vue'

  export default {
    components: {
      designers
    },
    data() {
      return {
        areaMark: 0,               // 选择显示排序区域
        showMark: false,           // 排序区域显示标识
        sortName0: '智能排序',      // 排序名称
        sortName1: '年限',         // 排序名称
        sortName2: '认证',         // 排序名称
        sortMark: 0,               // 排序标识
        height:'2.3rem',             // 数据离屏幕高度的间隔
        top:'2.85rem',             // 下拉提示框距离顶部的高度
      }
    },
    activated: function () {
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
    },
    created: function () {
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
    },
    mounted(){
      this.$refs.design.resizeScroller();
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toWhere: function (params) {
        var user = common.getObjStorage('userInfo') || {};
        if (common.isNull(user._id) == true) {
          this.$router.push({name: 'login'})
        } else {
          this.$router.push({name: params.pagename})
        }
      },
      toMyOrder(params){
        var user = common.getObjStorage('userInfo') || {};
        if (common.isNull(user._id) == true) {
          this.$router.push({name: 'login'})
        } else {
          this .$store.commit("changeIndexOrder",{index:0});
          this.$router.push({name: params.pagename})
        }
      },
      showArea(param) {
        var _self = this;
        var mark = param.areaMark;
        if (mark == _self.areaMark) {
          _self.showMark = _self.showMark == false ? true : false;
        } else {
          _self.areaMark = mark;
          _self.showMark = true;
        }
      },
      chooseSortType(param) {
        var _self = this;
        _self.showMark = _self.showMark == false ? true : false;
        var mark = param.sortMark
        if (_self.sortMark != mark) {
          _self.sortMark = mark;
          var name = event.target.innerText;
          _self.sortName0 = '智能排序';
          _self.sortName1 = '年限';
          _self.sortName2 = '认证';
          if (mark < 3) {
            _self.sortName0 = name;
          } else if (mark > 7) {
            _self.sortName2 = name;
          } else {
            _self.sortName1 = name;
          }
          this.$refs.design.refreshData(_self.sortMark);
        }
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/designer.css';
  .designer {
    /*background-color: #f2f2f2;*/
    width: 100%;
    /*position: fixed;*/
  }
  .header .header-right .hongdian {
    width: 0.1rem;
    height: 0.1rem;
    background: red;
    border-radius: 50%;
    position: absolute;
    right: 0rem;
    top: 0.1rem;
  }
  .sx-cont .area {
    position: absolute;
    width: 100%;
    top: 0.9rem;
    left: 0;
    background: #fefefe;
    z-index: 999;
    display: none;
  }
  .sx-cont .area ul li {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    color: #8d8d8d;
    border-top: 1px solid #f2f2f2;
  }

  .bg {
    background: #fefefe;
  }

  .bg.active {
    background: #f3f3f3;
  }

  .sanxuan .sx-cont ul .up p:after {
    margin-top: 0;
    -webkit-transform: rotate(-45deg);
  }

  .sanxuan .sx-cont ul .st p:after {
    margin-top: -0.1rem;
    -webkit-transform: rotate(135deg);
  }

  .on {
    display: block !important;
    top: 0.8rem !important;
  }
</style>
