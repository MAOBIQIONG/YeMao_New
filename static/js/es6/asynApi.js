import api from '../../../src/api/api.js'

const asyn ={
  refreshUserInfo : function () {
    console.log("refreshUserInfo:")
    var user = common.getObjStorage("userInfo") || {};
    console.log("refreshUserInfo:"+user._id)
    if( common.isNull(user._id) ){
      return;
    }
    var params = {
      //批量添加
      interfaceId: common.interfaceIds.queryUserById,
      user_id: user._id
    }
    api.post('/mongoApi', {
      params: params
    }, response => {
      // console.log(response)
      var data = response.data
      if ( data ) {
        common.setStorage("userInfo",data);
      }
    })
  }
}

export default asyn;
