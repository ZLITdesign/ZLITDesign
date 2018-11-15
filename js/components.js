//启用选项卡
layui.use(['element','layer'], function(){
  var element = layui.element;

  //监听左侧tab切换执行对应得方法
  element.on('tab(basics)', function(elem){
    var n = $(this).index();
    var catalog1 = $('.component_content>.layui-tab-item').eq(n).hasClass('form_box');
    var catalog2 = $('.component_content>.layui-tab-item').eq(n).hasClass('feedback_box');
    var catalog3 = $('.component_content>.layui-tab-item').eq(n).hasClass('other_box');
    if (catalog2){
      feedback();
    }
    if (catalog3){
      other();
    }
  });

  //监听导航点击
  element.on('nav(demo)', function(elem){
    // console.log(elem.text())
    var index = layer.msg(elem.text(), {
      offset: '30px',
      anim: 1,
      time: 2000,
    });
    layer.style(index,{
      background:'#49A9EE'
    })
  });
});


//导航
$('.head-nav-m ul li').click(function () {
  $(this).addClass('active').siblings().removeClass('active');
});


//tab标签
$('.tab-style-1 .layui-tab-title li').click(function () {
  var lefts = $(this).position().left;
  $('.tab-style-1 .layui-tab-title .slider').css({left:lefts+15});
});


//分页
//标准样式完整功能
layui.use('laypage', function(){
  var laypage = layui.laypage;
  //完整功能
  laypage.render({
    elem: 'paging-1',
    count: 100,
    theme: '#108EE9',
    prev: '<em style="font-family: SimSun">&lt;</em>',
    next: '<em style="font-family: SimSun">&gt;</em>',
    layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
    jump: function(obj){
      console.log(obj)
    }
  });
});

//简易样式
layui.use('laypage', function(){
  var laypage = layui.laypage;
  laypage.render({
    elem: 'paging-2',
    count: 70, //数据总数
    theme: '#108EE9',
    groups: 10,
    prev: '<em style="font-family: SimSun">&lt;</em>',
    next: '<em style="font-family: SimSun">&gt;</em>',
  });
  laypage.render({
    elem: 'paging-3',
    count: 70, //数据总数
    theme: '#fff',
    groups: 10,
    prev: '<em style="font-family: SimSun">&lt;</em>',
    next: '<em style="font-family: SimSun">&gt;</em>',
  });
});

//迷你样式
var curr_page = Number($('.paging-4 .current_page').text());
var max_page = Number($('.paging-4 .max_page').text());
var prev_page = $('.paging-4 .prev_page');
var next_page = $('.paging-4 .next_page');
next_page.click(function () {
  curr_page++;
  if (curr_page<max_page){
    $('.paging-4 .current_page').text(curr_page);
    prev_page.removeClass('disabled');
  }else if(curr_page==max_page){
    $(this).addClass('disabled');
    $('.paging-4 .current_page').text(curr_page);
  }else if (curr_page>max_page){
    $('.paging-4 .current_page').text(max_page);
    $(this).addClass('disabled');
    curr_page = max_page;
  }
});
prev_page.click(function () {
  curr_page--;
  if (curr_page>1){
    $('.paging-4 .current_page').text(curr_page);
    next_page.removeClass('disabled');
  }else if(curr_page==1){
    $(this).addClass('disabled');
    $('.paging-4 .current_page').text(curr_page);
  }else if (curr_page<1){
    $('.paging-4 .current_page').text(1);
    $(this).addClass('disabled');
    curr_page = 1;
  }
});


//反馈目录楼层跳转
function feedback(){
  var floors = $('.feedback_floor');
  var navLis = $('.feedback_catalog ul li');
  var clientH = $(window).height();
  var isJump = true;
  $('.component_content').scroll(function () {
    if (!isJump){
      return;
    }
    var floorTops = $('.component_content').scrollTop();
    floors.each(function (i) {
      if(floorTops>=floors.eq(i).position().top-clientH+80){
        navLis.eq(i).addClass('active').siblings().removeClass('active');
        var navTops = navLis.eq(i).position().top;
        $('.feedback_slider').css({top:navTops+8});
      }
    });
  });

  navLis.click(function () {
    isJump = false;
    var index = $(this).index();
    var that = $(this);
    var t = floors.eq(index).position().top - 20;//获取每个楼层距离body的高度
    var tops = $(this).position().top;  //获取滑块距离父元素的高度
    $('.component_content').animate({scrollTop:t},function () {
      isJump = true;
      that.addClass('active').siblings().removeClass('active');
      $('.feedback_slider').css({top:tops+8});
    });
  });
}
//反馈
layui.use('layer', function(){
  var layer = layui.layer;
  //-----------------------------toast提示--------------------------------
  //白色背景
  $('.toast_box .whiteBg .layui-btn').on('click', function(){
    var arr = ['',1,2,0,4],
        brr = ['','使用时页面顶部居中显示','默认3s消失，可自定义时长。不要超过15个字','这是全局提示，用于操作反馈','字多的时候要延长展示时间'];
    var n = $(this).index();
    var index = layer.msg(brr[n], {
      offset: '24px',
      anim: 1,
      time: 3000,
      icon: arr[n]
    });
    layer.style(index,{
      background:'#fff',
      color:'rgba(0,0,0,0.6)',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.2)',
      borderRadius:'4px',
      fontSize: '14px'
    });
  });

  //深色背景
  $('.toast_box .darkBg .layui-btn').on('click', function(){
    var arr = ['',1,2,0,4],
      brr = ['','使用时页面顶部居中显示','默认3s消失，可自定义时长。不要超过15个字','这是全局提示，用于操作反馈','字多的时候要延长展示时间'];
    var n = $(this).index();
    var index = layer.msg(brr[n], {
      offset: '24px',
      anim: 1,
      time: 3000,
      icon: arr[n]
    });
    layer.style(index,{
      background:'rgba(0,0,0,0.6)',
      color:'#fff',
      borderRadius:'4px',
      fontSize: '14px'
    })
  });

  //-------------------------------警告提示----------------------------------
  //系统全局警告提示
  $('.warning_box .whiteBg .system_btn').click(function () {
    var clientW = $(window).width();
    var index = layer.msg('系统全局公告，放置于页面导航顶部。', {
      offset: 'lt',
      anim: 1,
      time: 3000,
      icon: 0,
      fixed: false,
      closeBtn: 1
    });
    layer.style(index,{
      background:'#FFFBE6',
      color:'rgba(0,0,0,0.6)',
      borderRadius:'4px',
      fontSize: '14px',
      width: clientW,
      border: '1px solid #FFE58F',
      boxSizing: 'border-box'
    })
  });

  //成功提示
  $('.warning_box .whiteBg .success_btn').click(function () {
    var index = layer.msg('成功提示的文案。', {
      offset: '24px',
      anim: 1,
      time: 3000,
      icon: 1,
      closeBtn: 1
    });
    layer.style(index,{
      background:'#F6FFED',
      color:'rgba(0,0,0,0.6)',
      borderRadius:'4px',
      fontSize: '14px',
      border: '1px solid #B7EB8F',
      boxSizing: 'border-box'
    })
  });

  //失败提示
  $('.warning_box .whiteBg .fail_btn').click(function () {
    var index = layer.msg('失败提示的文案。', {
      offset: '24px',
      anim: 1,
      time: 3000,
      icon: 2,
      closeBtn: 1
    });
    layer.style(index,{
      background:'#FFF2F1',
      color:'rgba(0,0,0,0.6)',
      borderRadius:'4px',
      fontSize: '14px',
      border: '1px solid #FFA39E',
      boxSizing: 'border-box'
    })
  });

  //警告提示
  $('.warning_box .whiteBg .warning_btn').click(function () {
    var index = layer.msg('警告提示的文案。', {
      offset: '24px',
      anim: 1,
      time: 3000,
      icon: 0,
      closeBtn: 1
    });
    layer.style(index,{
      background:'#FFFBE6',
      color:'rgba(0,0,0,0.6)',
      borderRadius:'4px',
      fontSize: '14px',
      border: '1px solid #FFE58F',
      boxSizing: 'border-box'
    })
  });

  //普通文案提示
  $('.warning_box .whiteBg .tips_btn').click(function () {
    var index = layer.msg('信息提示的文案。', {
      offset: '24px',
      anim: 1,
      time: 3000,
      icon: 4,
      closeBtn: 1
    });
    layer.style(index,{
      background:'#E6F7FF',
      color:'rgba(0,0,0,0.6)',
      borderRadius:'4px',
      fontSize: '14px',
      border: '1px solid #91D5FF',
      boxSizing: 'border-box'
    })
  });

  //-------------------------------操作确认框--------------------------------
  //提交
  $('.confirm_submit').click(function () {
    var index = layer.open({
      type: 0,
      icon: 4,
      title:'普通操作标题',
      offset: 'auto',
      content: '继续此操作的一些提示文字信息',
      btn: ['提交','取消'],
      yes: function(){
        layer.closeAll();
      }
    });
    layer.style(index,{
      borderRadius:'6px',
      overflow:'hidden',
    });
  });
  //删除
  $('.confirm_delete').click(function () {
    var index = layer.open({
      type: 0,
      icon: 0,
      title:'普通操作标题',
      offset: 'auto',
      content: '继续此操作的一些提示文字信息',
      btn: ['删除','取消'],
      yes: function(){
        layer.closeAll();
      }
    });
    layer.style(index,{
      borderRadius:'6px',
      overflow:'hidden',
    });
  });
  //成功
  $('.confirm_success').click(function () {
    var index = layer.open({
      type: 0,
      icon: 1,
      title:'普通操作标题',
      offset: 'auto',
      time: 5000,
      content: '继续此操作的一些提示文字信息，5秒后自动关闭',
      btn: ['关闭'],
      yes: function(){
        layer.closeAll();
      }
    });
    layer.style(index,{
      borderRadius:'6px',
      overflow:'hidden',
    });
  });
  //失败
  $('.confirm_fail').click(function () {
    var index = layer.open({
      type: 0,
      icon: 2,
      title:'普通操作标题',
      offset: 'auto',
      content: '继续此操作的一些提示文字信息',
      btn: ['关闭'],
      yes: function(){
        layer.closeAll();
      }
    });
    layer.style(index,{
      borderRadius:'6px',
      overflow:'hidden',
    });
  });
  //气泡提示
  $('.tips_del').click(function () {
    console.log(1);
  });

  //-------------------------------通知提醒框--------------------------------
  $('.mess-btn1').click(function () {
    var index = layer.open({
      type: 1,
      offset: 't',
      title:'普通类提醒标题',
      content:'<div id="mess-btn1"><p>顶部居中显示，这是一些辅助文字</p><div><button id="sub" class="layui-btn layui-btn-primary zlit-btn-main layui-btn-sm">操作一</button><button class="layui-btn layui-btn-primary zlit-btn-main layui-btn-sm">操作二</button></div></div>',
      shade:0,
      area:['276px','140px']
    });
  });

  $('.mess-btn2').click(function () {
    var index = layer.open({
      type: 1,
      offset: 't',
      title: ['警示类提醒标题','color:#fff;background:rgba(255,0,0,0.5);border-color:rgba(255,0,0,0.5)'],
      content:'<div id="mess-btn2"><p>顶部居中显示，这是一些辅助文字</p><div><button class="layui-btn layui-btn-primary zlit-btn-main layui-btn-sm">操作一</button><button class="layui-btn layui-btn-primary zlit-btn-main layui-btn-sm">操作二</button></div></div>',
      shade:0,
      area:['276px','140px']
    });
    layer.style(index,{
      background:'rgba(255,0,0,0.7)'
    });
  });
});
//-------------------------------文字提示--------------------------------
//插件{白色背景}
$('.w-tl').pt({
  position: 't',
  align: 'l',
  content: '信息提示上左对齐',
  time:2000
});
$('.w-top').pt({
  position: 't',
  content: '信息提示上对齐',
  time:2000
});
$('.w-tr').pt({
  position: 't',
  align: 'r',
  content: '信息提示上右对齐',
  time:2000
});
$('.w-lt').pt({
  position: 'l',
  align: 't',
  content: '信息提示左上对齐信息提示左上对齐信息提示左上对齐',
  time:2000
});
$('.w-left').pt({
  position: 'l',
  content: '信息提示左对齐信息提示左对齐信息提示左对齐',
  time:2000
});
$('.w-lb').pt({
  position: 'l',
  align: 'b',
  content: '信息提示左下对齐信息提示左下对齐信息提示左下对齐',
  time:2000
});
$('.w-rt').pt({
  position: 'r',
  align: 't',
  content: '信息提示右上对齐信息提示右上对齐信息提示右上对齐',
  time:2000
});
$('.w-right').pt({
  position: 'r',
  content: '信息提示右对齐信息提示右对齐信息提示右对齐',
  time:2000
});
$('.w-rb').pt({
  position: 'r',
  align: 'b',
  content: '信息提示右下对齐信息提示右下对齐信息提示右下对齐',
  time:2000
});
$('.w-bl').pt({
  position: 'b',
  align: 'l',
  content: '信息提示下左对齐',
  time:2000
});
$('.w-bottom').pt({
  position: 'b',
  content: '信息提示下对齐',
  time:2000
});
$('.w-br').pt({
  position: 'b',
  align: 'r',
  content: '信息提示下右对齐',
  time: 2000
});

//插件{深色背景}
$('.d-tl').dt({
  position: 't',
  align: 'l',
  content: '信息提示上左对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-top').dt({
  position: 't',
  content: '信息提示上对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-tr').dt({
  position: 't',
  align: 'r',
  content: '信息提示上右对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-lt').dt({
  position: 'l',
  align: 't',
  content: '信息提示左上对齐信息提示左上对齐信息提示左上对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-left').dt({
  position: 'l',
  content: '信息提示左对齐信息提示左对齐信息提示左对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-lb').dt({
  position: 'l',
  align: 'b',
  content: '信息提示左下对齐信息提示左下对齐信息提示左下对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-rt').dt({
  position: 'r',
  align: 't',
  content: '信息提示右上对齐信息提示右上对齐信息提示右上对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-right').dt({
  position: 'r',
  content: '信息提示右对齐信息提示右对齐信息提示右对齐',
  time:2000
});
$('.d-rb').dt({
  position: 'r',
  align: 'b',
  content: '信息提示右下对齐信息提示右下对齐信息提示右下对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-bl').dt({
  position: 'b',
  align: 'l',
  content: '信息提示下左对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-bottom').dt({
  position: 'b',
  content: '信息提示下对齐',
  time:2000,
  fontcolor:'#fff'
});
$('.d-br').dt({
  position: 'b',
  align: 'r',
  content: '信息提示下右对齐',
  time: 2000,
  fontcolor:'#fff'
});



//其他
//反馈目录楼层跳转
function other(){
  var floors = $('.other_floor');
  var navLis = $('.other_catalog ul li');
  var clientH = $(window).height();
  var isJump = true;
  $('.component_content').scroll(function () {
    if (!isJump){
      return;
    }
    var floorTops = $('.component_content').scrollTop();
    floors.each(function (i) {
      if(floorTops>=floors.eq(i).position().top-clientH+80){
        navLis.eq(i).addClass('active').siblings().removeClass('active');
        var navTops = navLis.eq(i).position().top;
        $('.other_slider').css({top:navTops+8});
      }
    });
  });

  navLis.click(function () {
    isJump = false;
    var index = $(this).index();
    var that = $(this);
    var t = floors.eq(index).position().top - 20;//获取每个楼层距离body的高度
    var tops = $(this).position().top;  //获取滑块距离父元素的高度
    $('.component_content').animate({scrollTop:t},function () {
      isJump = true;
      that.addClass('active').siblings().removeClass('active');
      $('.other_slider').css({top:tops+8});
    });
  });
}












//底部翻页
paging();


//展示代码
showCode();
