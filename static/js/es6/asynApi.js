const asyn ={
  refreshUserInfo : function () {
    var _self = this;
    var params = {
      //批量添加
      interfaceId: common.interfaceIds.insertData,
      coll: common.collections.meowCircle,
      data: _self.params
    }
    _self.$axios.post('/mongoApi', {
      params: params
    }, response => {
      // 取消加载动画
      _self.showLoad = false;
      // 提交标识
      _self.is_submit = true;
      // 返回数据
      var data = response.data;
      if( data ){
        // 刷新喵喵圈首页
        _self.$store.state.meowRefreshMark = 1;
        var result = data.result || {};
        if( result.ok>0 && result.n>0  ){
          _self.showToast("发布成功！");
          uploadImg2.clearImgArr(true);
          setTimeout(function () {
            _self.goback();
          },1000)
        }else{
          _self.showToast("发布失败！");
        }
      }
    })
  }
}

export default asyn;
