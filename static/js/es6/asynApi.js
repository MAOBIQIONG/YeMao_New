const asyn ={
  refreshUserInfo : function () {
    var user = common.getStorage("usreInfo") || {};
    if( common.isNull(user._id) ){
      return;
    }
    var _self = this;
    var params = {
      //批量添加
      interfaceId: common.interfaceIds.queryUserById,
      user_id: user._id
    }
    _self.$axios.post('/mongoApi', {
      params: params
    }, response => {
      console.log(response)
    })
  }
}

export default asyn;
