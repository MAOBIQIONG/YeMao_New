<template>
  <div>
<div style="position:fixed;width:100%;z-index:999;">
    <!--头部导航-->
    <div class="header" style="position:static;">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>通讯录好友</span>
    </div>

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
</div>
    <div class="content" style="padding-top:3rem;">   
      <!--列表-->
      <div class="jl-list">
        <div class="jianli" v-for="(item,index) in contactsArr" :key="index"  v-if="!isNull(item.phoneNumbers)">
          <div class="touxiang" :style="{backgroundImage:`url(${checkAvatar(item.img)})`}">
            <!-- <img src="../../../static/images/bj.jpg" /> -->
          </div>
          <div class="jieshao">
            <!-- <p class="name">{{item.user_name}}</p> -->
            
            <p class="xinge"><span v-if="item.canJoin==1">夜猫用户：</span><span v-else>联系人：</span><span>{{item.user_name}}</span></p>
            <p class="name"><span>手机号：</span>{{item.phoneNumbers[0].value}}</p>
            <div class="biaoqian" v-if="item.canJoin==1"  v-tap="{methods:showConfirm,uid:item.uid,type:'addAlumnis'}">
              加入校友
            </div>
          </div>
        </div>
      </div>
    </div>
     <toast v-model="toastShow" :time="1000" type="text" width="5rem">{{toastMsg}}</toast>
    <div v-transfer-dom>
        <confirm v-model="confirmShow"
            @on-confirm = "compOnConfirm()"
        >
        <p style="text-align:center;">{{confirmMsg}}</p>
        </confirm>
    </div>
  </div>
</template>

<script>
import{Confirm,Toast,TransferDomDirective as TransferDom} from 'vux'
  export default {
    components:{
        Toast,
        Confirm
    },
    directives: {
        TransferDom
    },      
    data: function () {
        return {
            confirmShow:false,
            confirmType:'',//addAlumnis 校友会添加成员
            confirmMsg:'',
            toastShow:false,
            toastMsg:'',
            user_id:null,
            aa_id:'',
            //搜索数据源
            contactsArr:[],
            //数据源
            contactsArrData:[
                {
                    id:1,
                    //userInfo
                    img:'',
                    user_name:'****',
                    //contact
                    displayName:null,
                    name:null,
                    nickName:null,
                    phoneNumbers:[
                        {value:'***********',type:'mobile'}
                    ]
                },
            ],
            //处理后数据源
            contactsArrData1:[
            //test
                {
                    id:2,
                    img:'',
                    user_name:'aaa',
                    displayName:'aaar',
                    name:null,
                    nickName:null,
                    phoneNumbers:[
                        {value:'1234',type:'mobile'}
                    ],
                    canJoin:1
                },
                {
                    id:3,
                    img:'',
                    user_name:'bbb',
                    displayName:'bbbr',
                    name:null,
                    nickName:null,
                    phoneNumbers:[
                        {value:'9012',type:'mobile'}
                    ],
                    canJoin:1
                },
                {
                    id:4,
                    img:'',
                    user_name:'ccc',
                    displayName:'cccr',
                    name:null,
                    nickName:null,
                    phoneNumbers:[
                        {value:'3456',type:'mobile'}
                    ],
                    canJoin:1
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
                    _self.contactsArr = _self.contactsArrData1;
                    return;
                }
                //联系人数据源
                _self.contactsArrData1.reduce(function(a1,c1,i1,arr1){
                    //跳出循环标志位
                    let continueState = 0;
                    //遍历每条记录的属性
                    // console.log(Object.keys(c1));
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
                            // console.log("!pavlueIsNull:"+!_self.isNull(pvalue),"pavlue=='':" + (pvalue==''));
                            if(!_self.isNull(pvalue)){
                                if(new String(pvalue).match(val) && continueState == 0){
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
        let aa_id = _self .$route.query.aa_id;
        if(aa_id){
            this.aa_id = aa_id;
        }
        _self.user = common.getObjStorage("userInfo") || {};
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
                        // alert(contacts.length)
                        _self.contactsArrData = contacts;
                        let phoneArr = [];
                        _self.contactsArrData.reduce(function(a,c,i,arr){
                            // console.log(a,c,i,arr);
                            if(c.phoneNumbers.length!=0){
                                c.user_name = c.displayName;
                                c.canJoin = 0;
                                // console.log(JSON.stringify(c));
                                _self.contactsArrData1.push(c);
                            }
                            c.phoneNumbers.forEach(function(item,index){
                                if(item.type=="mobile"){
                                    phoneArr.push(item.value.replace(/\s/g,''));
                                }
                            });
                        },undefined);

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
        showToast(msg){
            this.toastShow = true;
            this.toastMsg = msg;
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
                // alert(JSON.stringify(response));
                var data = response.data
                if (data) {
                   _self.setData(data);
                }
            });
        },
        //排序函数
        //by函数接受一个成员名字符串和一个可选的次要比较函数做为参数
        //并返回一个可以用来包含该成员的对象数组进行排序的比较函数
        //当o[age] 和 p[age] 相等时，次要比较函数被用来决出高下
        by(name,minor){
            return function(o,p){
                var a,b;
                if(o && p && typeof o === 'object' && typeof p ==='object'){
                    a = o[name];
                    b = p[name];
                    if(a === b){
                    return typeof minor === 'function' ? minor(o,p):0;
                    }
                    if(typeof a === typeof b){
                    return a < b ? 1:-1;
                    }
                    return typeof a < typeof b ? -1 : 1;
                }else{
                    throw("error");
                }
            }
        },
        setData(data){
            let _self = this;
            // alert('start setData');
            _self.contactsArrData1.reduce(function(a1,c1,i1,arr1){
                data.reduce(function(a2,c2,i2,arr2){
                    // console.log('data-c2:'+JSON.stringify(c2));
                    c1.phoneNumbers.reduce(function(a3,c3,i3,arr3){
                        // console.log('phoneNumbers-c3:'+JSON.stringify(c3));
                        if(new String(c3.value).replace(/\s/g,'') == new String(c2.phone).replace(/\s/g,'')){
                            // console.log('data-c2.phone==phoneNumbers-c3');
                            c1.user_name = c2.user_name;
                            c1.canJoin = 1;
                            c1.uid=c2._id;
                            if(new String(c2.phone).replace(/\s/g,'')==_self.user.phone){
                                c1.canJoin = 0;
                            }
                        }
                    },undefined);             
                },undefined);
                // console.log('contactsArrData1-c1:'+JSON.stringify(c1));
            },undefined);
            _self.contactsArrData1.sort(this.by('canJoin',this.by('displayName')));
            _self.contactsArr = _self.contactsArrData1;
            // alert('end setData');
        },
        showConfirm(params){
            this.confirmShow = true;
            this.user_id = params.uid;
            this.confirmType = params.type
            if(params.type == "addAlumnis"){
                this.confirmMsg = "向校友会添加该用户吗？"
            } 
        },
        compOnConfirm(){
            if(this.confirmType=="addAlumnis"){
                this.addAlumnis();
            }
        },
        addAlumnis(){
            let _self = this;
            alert(_self.user_id);
            let params = {
                interfaceId: common.interfaceIds.addAlumnis,
                user_id:_self.user_id,
                aa_id:this.aa_id
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(JSON.stringify(response))
                    var data = response.data;

                     _self.showToast('已加入！');

                })            
        }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/tongxunluhaoyou.css';
</style>
