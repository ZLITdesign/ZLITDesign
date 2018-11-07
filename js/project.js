//目录楼层跳转
var floors = $('.project_items');
var navLis = $('.catalog ul li');
var clientH = $(window).height();
console.log(clientH);
var isJump = true;
$('body').scroll(function () {
  if (!isJump){
    return;
  }
  var floorTops = $('body').scrollTop();
  floors.each(function (i) {
    if(floorTops>=floors.eq(i).position().top-clientH+80){
      navLis.eq(i).addClass('active').siblings().removeClass('active');
      var navTops = navLis.eq(i).position().top;
      $('.catalog_slider').css({top:navTops});
    }
  });
});

navLis.click(function () {
  isJump = false;
  var index = $(this).index();
  var that = $(this);
  var t = floors.eq(index).position().top - 20;//获取每个楼层距离body的高度
  var tops = $(this).position().top;  //获取滑块距离父元素的高度
  $('html,body').animate({scrollTop:t},function () {
    isJump = true;
    that.addClass('active').siblings().removeClass('active');
    $('.catalog_slider').css({top:tops});
  });
});