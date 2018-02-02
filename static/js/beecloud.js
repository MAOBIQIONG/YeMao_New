import Qs from 'qs'
import api from '../../src/api/wxapi.js'

// 7dd519fe-2651-4a07-817d-599fe2066180
var appid = '7dd519fe-2651-4a07-817d-599fe2066180';
const beecloud ={
  /*[{"id":"alipay","description":"支付宝","serviceReady":true},
    {"id":"wxpay","description":"微信","serviceReady":true}];*/
  channels: null,
  showWaiting: null,
  payReq: function(data, cbsuccess, cberror) {
    console.log("beecloud payReq:")
    if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
      data.app_id = appid;
      beecloud.doPay(data, cbsuccess, cberror);
    }else{
      console.log("Now is the development of the environment!!")
    }
  },
  genBillNo: function() {
    console.log("beecloud genBillNo:")
    var d = new Date();
    var vYear = d.getFullYear();
    var vMon = d.getMonth() + 1;
    var vDay = d.getDate();
    var h = d.getHours();
    var m = d.getMinutes();
    var se = d.getSeconds();
    var ms = d.getMilliseconds();
    var billno = "" + vYear + (vMon < 10 ? "0" + vMon : vMon) + (vDay < 10 ? "0" + vDay : vDay) + (h < 10 ? "0" + h : h) + (m < 10 ? "0" + m : m) + (se < 10 ? "0" + se : se) + ms;
    return billno;
  },

  init: function() {
    console.log("beecloud init:")
    // console.log("beecloud bill:"+beecloud.genBillNo())
    if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
      //配置业务支持的支付通道，支付需要服务端支持，在BeeCloud上支持支付宝支付和微信支付；
      plus.payment.getChannels(function(s) {
        beecloud.channels = s;
      }, function(e) {
        console.log("获取支付渠道信权限失败:" + e.message);
      });
    }
  },

  getRandomHost: function () {
    var hosts = ['https://apibj.beecloud.cn',
      'https://apihz.beecloud.cn',
      'https://apisz.beecloud.cn',
      'https://apiqd.beecloud.cn'
    ];
    return "" + hosts[parseInt(3 * Math.random())] + "/2/rest/app/bill";
  },

  /**
   * 获取支付通道
   *
   */
  getPayChannel: function (bc_channel) {
    var dc_channel_id = '';
    //alert(bc_channel=="ALI_APP");
    if(bc_channel=="ALI_APP"){
      dc_channel_id = 'alipay';
    }else if(bc_channel=="WX_APP"){
      dc_channel_id = 'wxpay';
    }
    var channels = beecloud.channels;
    for (var i in channels) {
      if (channels[i].id == dc_channel_id) {
        return channels[i];
      }
    }
    return null;
  },

  doPay: function (payData, cbsuccess, cberror) {
    console.log("beecloud doPay:")
    if (beecloud.showWaiting) return;
    beecloud.showWaiting = plus.nativeUI.showWaiting();
    api.post(
      '/2/rest/app/bill',
      payData,
      function(data) {
        console.log("beecloud doPay success:"+JSON.stringify(data))
        beecloud.showWaiting.close();
        beecloud.showWaiting = null;
        var paySrc = '';
        console.log("result_code:"+data.result_code)
        if (data.result_code == 0) {
          var payChannel = beecloud.getPayChannel(payData.channel);
          console.log("payChannel:"+JSON.stringify(payChannel))
          if (payChannel) {
            if (payChannel.id === 'alipay') {
              paySrc = data.order_string;
            } else if (payChannel.id === 'wxpay') {
              var statement = {};
              statement.appid = data.app_id;
              statement.noncestr = data.nonce_str;
              statement.package = data.package;
              statement.partnerid = data.partner_id;
              statement.prepayid = data.prepay_id;
              statement.timestamp = parseInt(data.timestamp);
              statement.sign = data.pay_sign;
              paySrc = JSON.stringify(statement);
            }
            plus.payment.request(payChannel, paySrc, cbsuccess, cberror);
          } else {
            console.log("支付方式错误!")
          }
        } else {
          var bcError = {};
          bcError.code = data.result_code;
          bcError.message = data.result_msg + ":" + data.err_detail;
          cberror(bcError);
        }
      },
      function(xhr, errorType, error) {
        console.log("beecloud doPay xhr:"+JSON.stringify(xhr))
        console.log("beecloud doPay errorType:"+JSON.stringify(errorType))
        console.log("beecloud doPay error:"+JSON.stringify(error))
        beecloud.showWaiting.close();
        beecloud.showWaiting = null;
        cberror(error);
      });
  }
}

export default beecloud;
