import webapi from '../../../src/api/webapi'
import Qs from 'qs'

const interfaces ={
  // 获取验证码
  getVerifyCode:function(params,callback){
    var qsParams = Qs.stringify(params)// 解决后台接收参数错误问题
    webapi.post('appSend/sendmessage', qsParams, function (result) {
      callback(result)
    })
  },
}
export default interfaces;
