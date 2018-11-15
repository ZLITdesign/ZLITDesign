//底部切换页面按钮
function paging() {
  var prevPage = $('.page_box p:first-child');
  var nextPage = $('.page_box p:last-child');
  prevPage.click(function () {
    var i = $(this).closest('.side_box>.layui-tab>.layui-tab-content>.layui-tab-item').index();
    if (i===0){
      return;
    }else{
      $('.side_box>.layui-tab>.layui-tab-content>.layui-tab-item').eq(i-1).addClass('layui-show').siblings().removeClass('layui-show');
      $('.side_box>.layui-tab>.layui-tab-title li').eq(i-1).addClass('layui-this').siblings().removeClass('layui-this');
    }
  });
  nextPage.click(function () {
    var i = $(this).closest('.side_box>.layui-tab>.layui-tab-content>.layui-tab-item').index();
    var len = $('.side_box>.layui-tab>.layui-tab-content>.layui-tab-item').length;
    if (i>=len){
      return;
    }else{
      $('.side_box>.layui-tab>.layui-tab-content>.layui-tab-item').eq(i+1).addClass('layui-show').siblings().removeClass('layui-show');
      $('.side_box>.layui-tab>.layui-tab-title li').eq(i+1).addClass('layui-this').siblings().removeClass('layui-this');
    }
  });
}

//代码展示折叠面板
function showCode(){
  $('.open_code').click(function () {
    var flag = true;
    var that = $(this);
    if (flag){
      $(this).prev().slideDown(300,function () {
        flag = false;
        that.find('span').text('关闭');
      });
    }
    if (!flag){
      $(this).prev().slideUp(300,function () {
        flag = true;
        that.find('span').text('展开');
      });
    }
  });
  layui.use('code', function(){ //加载code模块
    layui.code({about: false}); //引用code方法
  });
}
