layui.use('element', function(){
  var element = layui.element;
  
  //一些事件监听
  element.on('tab(test)', function(data){
    $(this).siblings().removeClass('hoverActive')
  });
});

$('.layui-tab-title li').hover(function() {
  $(this).addClass('hoverActive').siblings().not('.layui-this').removeClass('hoverActive')
}, function(){
  $(this).removeClass('hoverActive')
})
