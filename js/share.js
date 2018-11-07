//底部切换页面按钮
function paging() {
  var prevPage = $('.page_box p:first-child');
  var nextPage = $('.page_box p:last-child');
  prevPage.click(function () {
    var i = $(this).closest('.layui-tab-item').index();
    if (i===0){
      return;
    }else{
      $('.layui-tab-item').eq(i-1).addClass('layui-show').siblings().removeClass('layui-show');
      $('.layui-tab-title li').eq(i-1).addClass('layui-this').siblings().removeClass('layui-this');
    }
  });
  nextPage.click(function () {
    var i = $(this).closest('.layui-tab-item').index();
    var len = $('.layui-tab-item').length;
    if (i>=len){
      return;
    }else{
      $('.layui-tab-item').eq(i+1).addClass('layui-show').siblings().removeClass('layui-show');
      $('.layui-tab-title li').eq(i+1).addClass('layui-this').siblings().removeClass('layui-this');
    }
  });
}