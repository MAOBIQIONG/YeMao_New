<template>
  <div class="page">
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>收藏专辑</span>
    </div>
    <div class="content content-p">
      <div
        v-if="collects.usersCount==0&&collects.ordersCount==0&&collects.qasCount==0&&collects.mxtsCount==0&&collects.resumeCount==0">
        <div class="imgNoData">
          <img src="../../../static/images/shuju.png"/>
        </div>
      </div>
      <!--设计师专辑-->
      <div class="sjszj" v-if="collects.usersCount!=0">
        <div class="sjszj-top">
          <span>设计师专辑</span><span>:{{collects.usersCount}}</span>
        </div>
        <div class="noData" v-if="collects.users.length==0">暂无收藏记录</div>
        <ul class="renyuan" v-else @click="toUrl('collectionDesigner')">
          <li v-for="(item,index) in collects.users" :key="index">
            <p class="touxiang" :style="{backgroundImage:`url(${checkAvatar(item.img)})`}">
            </p>
            <p class="nicheng">{{item.user_name}}</p>
          </li>
        </ul>
      </div>
      <!--项目专辑-->
      <div class="xmzj" v-if="collects.ordersCount!=0">
        <div class="xm-top">
          <span>项目专辑</span><span>:{{collects.ordersCount}}</span>
        </div>
        <div class="noData" v-if="collects.orders.length==0">暂无收藏记录</div>
        <ul class="renyuan" v-else @click="toUrl('collectionOrder')">
          <li v-for="(item,index) in collects.orders" :key="index">
            <img v-if="item.imgs&&item.imgs.length>0" :src="checkImg(item.imgs[0])"/>
            <img v-else :src="checkImg('')"/>
          </li>
        </ul>
      </div>
      <!--问答专辑-->
      <div class="xmzj" v-if="collects.qasCount!=0">
        <div class="xm-top">
          <span>问答专辑</span><span>:{{collects.qasCount}}</span>
        </div>
        <div class="noData" v-if="collects.qas.length==0">暂无收藏记录</div>
        <ul class="renyuan" v-else @click="toUrl('collectionQa')">
          <li v-for="(item,index) in collects.qas" :key="index">
            <img v-if="item.imgs&&item.imgs.length>0" :src="checkImg(item.imgs[0])"/>
            <img v-else :src="checkImg('')"/>
          </li>
        </ul>
      </div>
      <!--喵学堂专辑-->
      <div class="xmzj" v-if="collects.mxtsCount!=0">
        <div class="xm-top">
          <span>喵学堂专辑</span><span>:{{collects.mxtsCount}}</span>
        </div>
        <div class="noData" v-if="collects.mxts.length==0">暂无收藏记录</div>
        <ul class="renyuan" v-else @click="toUrl('collectionMxt')">
          <li v-for="(item,index) in collects.mxts" :key="index">
            <img v-if="item.imgs&&item.imgs.length>0" :src="checkImg(item.imgs[0])"/>
            <img v-else :src="checkImg('')"/>
          </li>
        </ul>
      </div>
      <!--设计师专辑-->
      <div class="sjszj jianli" v-if="collects.resumeCount!=0">
        <div class="sjszj-top">
          <span>简历专辑</span><span>:{{collects.resumeCount}}</span>
        </div>
        <div class="noData" v-if="collects.resumes.length==0">暂无收藏记录</div>
        <ul class="renyuan" v-else @click="toUrl('collectionResume')">
          <li v-for="(item,index) in collects.resumes" :key="index">
            <p class="touxiang" :style="{backgroundImage:`url(${checkAvatar(item.img)})`}">
              <!-- <img src="../../../static/images/bj.jpg" /> -->
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false,
        collects: {
          users: [],
          orders: [],
          qas: [],
          mxts: [],
          resumes: []
        },
      }
    },
    created() {
      let user = common.getObjStorage("userInfo");
      if (!common.isNull(user._id)) {
        this.user_id = user._id;
        this.requestData();
      } else {
        this.$router.push({name: "login"})
        console.error('未获取用户参数');
      }
    },
    watch: {
      loaded: {
        handler(val, oldval) {
          if (val == true) {
            this.setData(this.data);
          }
        }
      }
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      requestData() {
        let _self = this;
        _self.loadingShow = true;
        let params = {
          interfaceId: common.interfaceIds.getCollectsPage,
          user_id: _self.user_id
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response);
          let data = response.data;
          _self.data = data;
          if (data) {
            _self.loaded = true;
            console.log('数据设置完成');
          } else {
            console.log('noData');
          }
        });
      },
      // 头像
      checkAvatar(path) {
        return common.getAvatar(path)
      },
      checkImg(path) {
        return common.getDefultImg(path);
      },
      setData(data) {
        let _self = this;
        _self.collects = data;
        _self.loadingShow = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/mine-shouchang.css';

  .noData {
    width: 2.5rem;
    margin: 0.3rem auto 0 auto;
    text-align: center;
  }

  .page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .imgNoData {
    width: 4.5rem;
    margin: 0 auto;
    margin-top: 30%
  }

  .imgNoData img {
    width: 100%;
  }
</style>
