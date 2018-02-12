<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>通讯录好友</span>
    </div>
    <div class="content content-p">
      <!--搜索-->
      <div class="shousuo">
        <div class="sskuang">
          <input type="search" class="sc" placeholder="搜索" />
        </div>
      </div>
      <div class="dshy">
        <div class="dshy-left">
          共<span>6</span>个通讯录好友
        </div>
        <div class="dshy-right">
          全部加入
        </div>
      </div>
      <!--列表-->
      <div class="jl-list">
        <div class="jianli" v-for="(item,index) in contactsArr" :key="index">
          <div class="touxiang" :style="{backgroundImage:`url(${checkAvatar(item.img)})`}">
            <!-- <img src="../../../static/images/bj.jpg" /> -->
          </div>
          <div class="jieshao">
            <p class="name">{{item.user_name}}</p>
            <p class="xinge"><span>联系人：</span><span>{{item.name}}</span></p>
            <div class="biaoqian">
              加入校友
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
        return {
            contactsArr:[
                {
                    //userInfo
                    img:'',
                    user_name:'****',
                    //contact
                    name:'***',
                    phoneNumbers:[
                        {value:'***********',type:'mobile'}
                    ]
                }
            ],
            contactsArrData:[
                {
                    //userInfo
                    img:'',
                    user_name:'****',
                    //contact
                    name:'***',
                    phoneNumbers:[
                        {value:'***********',type:'mobile'}
                    ]
                }
            ],
      }
    },
    created(){
        let _self = this;
        console.log('tongxunluhaoyouCreated');
        // let item = {};
        if(process.env.NODE_ENV === 'production'){
            if(plus){
                // 扩展API加载完毕，现在可以正常调用扩展API
                plus.contacts.getAddressBook( plus.contacts.ADDRESSBOOK_PHONE, function( addressbook ) {
                    // contactsArrData = [];
                    // 可通过addressbook进行通讯录操作
                    addressbook.find(["displayName","phoneNumbers"],function(contacts){
                        // item.name = contacts.name;
                        // item.phoneNumbers = contacts.phoneNumbers;
                        // _self.contactsArrData.push(item);
                        _self.contactsArrData = contacts
                        let phoneArr = [];
                        _self.contactsArrData.reduce(function(a,c,i,arr){
                            console.log(a,c,i,arr);
                            c.phoneNumbers.forEach(function(item,index){
                                phoneArr.push(item.value);
                            })
                        },undefined);
                        console.log(phoneArr);
                        alert(JSON.stringify(contacts));
                        _self.getUsers(phoneArr);
                    }, function () {
                        alert("查找通讯录失败");
                    },{multiple:true});
                }, function ( e ) {
                    alert( "获取通讯录失败" + e.message );
                });
            }       
        }


    },
    mounted(){
        console.log('tongxunluhaoyouMounted');   
    },
    methods: {
        goback () {
            this.$router.goBack()
        },
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        // 头像
        checkAvatar (path) {
            return common.getAvatar(path)
        },
        getUsers(phoneArr){
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.getUsersByPhone,
                phones:phoneArr,
            }
            _self.$axios.post('/mongoApi', {
                params: params
            }, response => {
                console.log(response);
                var data = response.data
                if ( data ) {
                    
                }
            });
        }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/tongxunluhaoyou.css';
</style>
