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
          <input type="search" class="sc" placeholder="搜索" v-model="searchText"/>
        </div>
      </div>
      <div class="dshy">
        <div class="dshy-left">
          <span>{{contactsArr.length}}</span>个通讯录好友
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
            <!-- <p class="name">{{item.user_name}}</p> -->
            <p class="name" v-if="!isNull(phoneNumbers)">{{item.phoneNumbers[0].value}}</p>
            <p class="xinge"><span>联系人：</span><span>{{item.displayName}}</span></p>
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
                // {
                //     //userInfo
                //     img:'',
                //     user_name:'****',
                //     //contact
                //     name:'***',
                //     phoneNumbers:[
                //         {value:'***********',type:'mobile'}
                //     ]
                // },

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
                },
            //test
                {
                    //userInfo
                    img:'',
                    user_name:'aaaa',
                    //contact
                    name:'aaaar',
                    phoneNumbers:[
                        {value:'1234',type:'mobile'}
                    ]
                },
                {
                    //userInfo
                    img:'',
                    user_name:'bbbb',
                    //contact
                    name:'bbbbr',
                    phoneNumbers:[
                        {value:'5678',type:'mobile'}
                    ]
                },
                {
                    //userInfo
                    img:'',
                    user_name:'cccc',
                    //contact
                    name:'ccccr',
                    phoneNumbers:[
                        {value:'9012',type:'mobile'},
                        {value:'901211',type:'mobile'}
                    ]
                },
            ],
            searchText:''
      }
    },
    watch:{
        //搜索
        searchText:{
            handler(val,oldval){
                var _self = this;
                // console.log(val,oldval);
                _self.contactsArr = [];
                //搜索框为空时显示所有
                if(_self.isNull(val)){
                    _self.contactsArr = _self.contactsArrData;
                    return;
                }
                //联系人数据源
                _self.contactsArrData.reduce(function(a1,c1,i1,arr1){
                    //跳出循环标志位
                    let continueState = 0;
                    //遍历每条记录的属性
                    Object.keys(c1).reduce(function(a2,c2,i2,arr2){                   
                        if(c2=="phoneNumbers"){
                            if(continueState == 1){
                                return;
                            }
                            // return;
                            //遍历电话号码数组
                            c1[c2].reduce(function(a3,c3,i3,arr3){
                                // console.log("phoneNumbers:"+c3.value);
                                if(!_self.isNull(c3.value)){
                                    if(c3.value.match(val)){
                                        _self.contactsArr.push(c1);
                                        continueState = 1;
                                    } 
                                }
                                
                            },undefined);
                        } else{
                            let pvalue = c1[c2];
                            // console.log("key:"+c2,',',"value:"+pvalue,',','continueState:'+continueState)
                            if(!_self.isNull(pvalue)){
                                if(pvalue.match(val)&&continueState == 0){
                                    _self.contactsArr.push(c1);
                                    continueState = 1;
                                }
                            }

                        }
                    },undefined)
                },undefined);
            }
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
                        _self.contactsArrData = contacts;
                        _self.contactsArr = contacts;
                        let phoneArr = [];
                        _self.contactsArrData.reduce(function(a,c,i,arr){
                            // console.log(a,c,i,arr);
                            c.phoneNumbers.forEach(function(item,index){
                                if(item.type=="mobile"){
                                    phoneArr.push(item.value.replace(/\s/g,''));
                                }
                            })
                        },undefined);
                        alert('phoneArr:')
                        alert(phoneArr);
                        alert(JSON.stringify(contacts));
                        alert(JSON.stringify(_self.contactsArrData));
                        alert(JSON.stringify(_self.contactsArr));
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
        isNull(a){
            return common.isNull(a);
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
                console.log(JSON.stringify(response));
                alert(JSON.stringify(response));
                var data = response.data
                if (data) {
                    
                }
            });
        },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/tongxunluhaoyou.css';
</style>
