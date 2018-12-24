//侧边导航
function zlitNav(isOpen=false){
  var flag = true;  //防止点击过快
  $('.zlit-nav li').click(function(){
    var isHas = $(this).find('dl').is('dl');   //检测是否存在子级
    if (isHas){
      if (!flag){
        return;
      }
      flag = false;
      if ($(this).height()!==36){
        $(this).find('dl').stop().slideUp(300,function(){
          flag = true;
        }).end().find('i').css({transform:'rotateZ(0)'});
      }else{
        $(this).find('dl').stop().slideDown(300,function(){
          flag = true;
        }).end().find('i').css({transform:'rotateZ(90deg)'});
      }
      if (isOpen){
        $(this).siblings().find('dl').slideUp().end().find('i').css({transform:'rotateZ(0)'});
      }
    }else{
      $(this).addClass('active').siblings().removeClass('active').find('dd').removeClass('active');
    }
  });
  $('.zlit-nav-child dd').click(function(e){
    e.stopPropagation();
    $(this).addClass('active').siblings().removeClass('active').end().closest('li').siblings().find('dd').removeClass('active').end().removeClass('active');
  });
}

//tab选项卡
function tabNav() {
  $('.tab-style-1 .layui-tab-title li').click(function () {
    var lefts = $(this).position().left;
    $('.tab-style-1 .layui-tab-title .slider').css({left:lefts+15});
  });
}

//迷你样式分页
function miniPage() {
  var curr_page = Number($('.paging-44 .current_page').text());
  var max_page = Number($('.paging-44 .max_page').text());
  var prev_page = $('.paging-44 .prev_page');
  var next_page = $('.paging-44 .next_page');
  if (curr_page === 1 && max_page === 1) {
    prev_page.addClass('disabled');
    next_page.addClass('disabled');
    return;
  }
  next_page.click(function (e) {
    e.preventDefault();
    curr_page++;
    if (curr_page<max_page){
      $('.paging-44 .current_page').text(curr_page);
      prev_page.removeClass('disabled');
    }else if(curr_page==max_page){
      $(this).addClass('disabled');
      prev_page.removeClass('disabled');
      $('.paging-44 .current_page').text(curr_page);
    }else if (curr_page>max_page){
      $('.paging-44 .current_page').text(max_page);
      $(this).addClass('disabled');
      curr_page = max_page;
    }
  });
  prev_page.click(function (e) {
    e.preventDefault();
    curr_page--;
    if (curr_page>1){
      $('.paging-44 .current_page').text(curr_page);
      next_page.removeClass('disabled');
    }else if(curr_page==1){
      $(this).addClass('disabled');
      next_page.removeClass('disabled');
      $('.paging-44 .current_page').text(curr_page);
    }else if (curr_page<1){
      $('.paging-44 .current_page').text(1);
      $(this).addClass('disabled');
      curr_page = 1;
    }
  });
}

//菜单按钮
function menuBtn(){
  var flag = true;
  $('.zlit-menu-btn-change').click(function (e) {
    //隐藏/显示按钮功能区
    e.stopPropagation();
    if (flag) {
      $('.zlit-menu-btn').addClass('layui-anim-scaleSpring').css({display:'block'});
      $(this).css({transform:'rotateZ(180deg)'});
      flag = false;
    }else{
      $('.zlit-menu-btn').removeClass('layui-anim-scaleSpring').css({display:'none'});
      $(this).css({transform:'rotateZ(0deg)'});
      flag = true;
    }
  });
  $('.zlit-menu-btn li').on('click',function (e) {
    e.stopPropagation();
    var str,ids,strId;
    $(this).addClass('active').siblings().removeClass('active');
    str = $(this).text();
    ids = $(this).attr('data-id');
    $('.zlit-menu-btn-text').text(str);
    $('.zlit-menu-btn-box').prop('id',ids);
    $('.zlit-menu-btn').removeClass('layui-anim-scaleSpring').css({display:'none'});
    $('.zlit-menu-btn-change').css({transform:'rotateZ(0deg)'});
    flag = true;

    //切换按钮功能
    strId = $('.zlit-menu-btn-box').attr('id');
    if (strId==='files-img'){
      uploadFiles('#files-img');
    }else if(strId==='files-file'){
      uploadFiles('#files-file','file');
    }else if(strId==='files-zip'){
      uploadFiles('#files-zip','file','zip|rar|7z');
    }else if(strId==='files-video'){
      uploadFiles('#files-video','video');
    }else if(strId==='files-audio'){
      uploadFiles('#files-audio','audio');
    }

    $('.zlit-menu-btn-show').text('').find('span').css({display:'none'});
  });

  function uploadFiles(ele,accpets='images',exts='') {
    layui.use(['upload','layer'],function () {
      var upload = layui.upload;
      var layer = layui.layer;
      upload.render({
        elem: ele
        ,url: './upload.class.php'
        ,accept: accpets
        ,exts:exts
        ,choose: function(obj){
          obj.preview(function(index, file, result){
            $('.zlit-menu-btn-show').text(file.name);
          });
        }
        ,done: function(res,index){
          //上传完毕
          layer.msg('上传成功', {
            time: 3000, icon: 1
          });
          return delete this.files[index]; //删除文件队列已经上传成功的文件
        }
      });
    });
  }
}

//数字输入
function numInput() {
  $('.zlit-number-reduce').mousedown(function () {
    var val = Number($(this).next().val());
    val--;
    if (val<=0){
      $(this).next().val(0);
    }else{
      $(this).next().val(val);
    }
  });
  $('.zlit-number-add').mousedown(function () {
    var val = Number($(this).prev().val());
    val++;
    if (val>=999999){
      $(this).prev().val(999999);
    }else{
      $(this).prev().val(val);
    }
  });
}

//添加、修改、删除标签
function label() {
  //删除标签
  $('.zlit-label-box').on('click','.zlit-label-single i',function () {
    var that = $(this);
    $(this).closest('.zlit-label-single').animate({width:0,padding:'6px 0'},200,function () {
      that.closest('.zlit-label-single').remove();
    });
  });
//添加标签
  $('.zlit-label-box').on('click','.zlit-label-add', function () {
    var div = $('<div></div>'),
      input = $('<input>'),
      span = $('<span></span>'),
      i = $('<i></i>');
    div.css({padding:'6px 0',overflow:'hidden',whiteSpace:'nowrap'}).insertBefore($(this).closest('.zlit-label-add'));
    i.css({position:'absolute'}).addClass('layui-icon layui-icon-close');
    span.css({display:'none'}).appendTo(div);
    input.val('新标签').css({width:'48px'}).appendTo(div);
    input.select();
    div.animate({padding:'6px 30px 6px 10px'},200,function () {
      i.appendTo(div);
      div.addClass('zlit-label-single');
    });
    input.blur(function () {
      if (input.val()===''){
        span.css({display:'inline',color:'#333'}).text('新标签');
      }else{
        span.css({display:'inline',color:'#333'}).text(input.val());
      }
      $(this).remove();
    });
  });
//修改标签
  $('.zlit-label-box').on('click','.zlit-label-single span',function () {
    var w = $(this).width();
    var input = $('<input>');
    var that = $(this);
    input.val($(this).text()).css({color:'#333',width:w}).insertBefore($(this));
    $(this).css({display:'none'});
    input[0].focus();
    input.select();
    input.blur(function () {
      if (input.val()===''){
        that.css({display:'inline',color:'#333'}).text('新标签');
      }else{
        that.css({display:'inline',color:'#333'}).text(input.val());
      }
      $(this).remove();
    });
  });
}

//圆形进度条
function progress() {
  //进行中状态
  $(".circleChart#0").circleChart({
    size: 80,  // 滚动条大小
    value: 50,  //当前进度值
    text: 0,    //圆圈中间显示数字
    color: '#428EE9',   //进度条颜色
    // textSize: '16px',
    onDraw: function (el, circle) {
      circle.text(Math.round(circle.value) + "%");
      if (Math.round(circle.value)===100){
        circle.text('<i class="layui-icon layui-icon-ok" style="color: #87D068;font-size: 24px;"></i>');
      }
      if (Math.round(circle.value)<0){
        circle.text('<i class="layui-icon layui-icon-close" style="color: #EF5306;font-size: 24px;"></i>');
      }
    }
  });
  setInterval(function () {
    $("#0").circleChart({
      value: Math.random() * 100
    });
  }, 3000);
  //失败状态
  $(".circleChart#1").circleChart({
    size: 80,
    text: 0,
    value: 60,
    color: '#EF5306',
    onDraw: function (el, circle) {
      circle.text(Math.round(circle.value) + "%");
      if (Math.round(circle.value)<0){
        circle.text('<i class="layui-icon layui-icon-close" style="color: #EF5306;font-size: 24px;"></i>');
      }
    }
  });
  setTimeout(function () {
    $("#1").circleChart({
      value: -1
    });
  }, 3000);
  //100%成功状态
  $(".circleChart#2").circleChart({
    size: 80,
    text: 0,
    color: '#428EE9',
    onDraw: function (el, circle) {
      circle.text(Math.round(circle.value) + "%");
      if (Math.round(circle.value)===100){
        circle.text('<i class="layui-icon layui-icon-ok" style="color: #87D068;font-size: 24px;"></i>');
      }
    }
  });
}

//步骤条

//锚点定位
function anchors(){
  var navLis = $('.anchors_catalog ul li');
  var slider = $('.anchors_slider');
  navLis.click(function () {
    var tops = $(this).position().top;  //获取滑块距离父元素的高度
    $(this).addClass('active').siblings().removeClass('active');
    slider.css({top:tops+8});
  });
}

//步骤条
function stepFun(steps,stepCon,style,stepDesc,next=null,prev=null){
  /*steps     步骤条jQuery对象元素
  * stepCon   每一步对应的页面
  * style     字符串类型，传入‘left’则为水平步骤条，传入‘top’则为垂直步骤条
  * stepDesc  步骤条序号及文字区域的jQuery对象元素
  * next      下一步按钮，默认值null,即没有按钮可不传入
  * prev      上一步按钮，默认值null,即没有按钮可不传入
  * */
  var n = 0,          //依赖索引值
    flag = true;    //防止过快点击
  //下一步按钮
  if (next){
    next.click(function () {
      if (!flag){ return; }
      flag = false;
      n++;
      if (n!=0){ prev.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default'); }
      if (n>=steps.length){
        n = steps.length-1;
        flag = true;
        return;
      }
      if (steps.eq(n).index()===steps.length-1){
        $(this).removeClass('zlit-btn-default').addClass('layui-btn-disabled zlit-btn-disabled');
      }
      stepCon.eq(n).addClass('active').siblings().removeClass('active');
      steps.eq(n-1).find('.step-child').animate({[style]:0},function () {
        steps.eq(n).find('.step-circle').addClass('step-circle-active').end().find('.step-con').addClass('step-con-active').text('进行中');
        steps.eq(n-1).find('.step-circle').removeClass('step-circle-active').addClass('step-circle-end').find('i').text('').addClass('layui-icon-ok');
        steps.eq(n-1).find('.step-con').removeClass('step-con-active').text('已完成');
        flag = true;
      });
    });
  }
  //上一步按钮
  if (prev){
    prev.click(function () {
      if (!flag){ return; }
      flag = false;
      n--;
      if (n<=steps.length-1){ next.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default'); }
      if (n<0){
        n = 0;
        flag = true;
        return;
      }
      if (steps.eq(n).index()===0){ $(this).removeClass('zlit-btn-default').addClass('layui-btn-disabled zlit-btn-disabled'); }
      stepCon.eq(n).addClass('active').siblings().removeClass('active');
      steps.eq(n).find('.step-child').animate({[style]:-100+'%'},function () {
        steps.eq(n+1).find('.step-circle').removeClass('step-circle-active').end().find('.step-con').removeClass('step-con-active').text('待完成');
        steps.eq(n).find('.step-circle').removeClass('step-circle-end').addClass('step-circle-active').find('i').text(n+1).removeClass('layui-icon-ok');
        steps.eq(n).find('.step-con').addClass('step-con-active').text('进行中');
        flag = true;
      });
    });
  }

  //点击步骤序号及文字区域
  stepDesc.click(function () {
    if (!flag){ return; }
    flag = false;
    var k = $(this).closest('.step-single').index(),
      stepBox = $(this).closest('.step-single').siblings(),
      that = $(this);
    n = k;
    if (next && prev){
      if (n<steps.length-1 && n>0){
        next.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
        prev.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
      }else if (n===steps.length-1){
        next.removeClass('zlit-btn-default').addClass('layui-btn-disabled zlit-btn-disabled');
        prev.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
      }else if (n===0){
        next.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
        prev.removeClass('zlit-btn-default').addClass('layui-btn-disabled zlit-btn-disabled');
      }
    }
    setTimeout(function () {
      that.closest('.step-single').find('.step-circle').removeClass('step-circle-end').addClass('step-circle-active')
        .end().find('.step-con').addClass('step-con-active').text('进行中')
        .end().find('.step-child').animate({[style]:-100+'%'})
        .end().find('i').removeClass('layui-icon-ok').text(k+1);
      stepCon.eq(k).addClass('active').siblings().removeClass('active');
    },300);
    stepBox.each(function (i, val) {
      var j = $(val).index();
      if (j<k){
        $(val).find('.step-child').animate({[style]:0},function () {
          $(val).find('.step-circle').removeClass('step-circle-active').addClass('step-circle-end').find('i').text('').addClass('layui-icon-ok');
          $(val).find('.step-con').removeClass('step-con-active').text('已完成');
          flag = true;
        });
      }else if (j>k){
        $(val).find('.step-child').animate({[style]:-100+'%'},function () {
          flag = true;
        });
        setTimeout(function () {
          $(val).find('.step-circle').removeClass('step-circle-active step-circle-end').find('i').text(j+1).removeClass('layui-icon-ok');
          $(val).find('.step-con').removeClass('step-con-active').text('待完成');
        },300);
      }
    });
  });
}
//水平步骤条变量
var Hsteps = $('.test-step .horizontal-step .step-single'),
  HstepCon = $('.test-step .horizontal-con li'),
  HstepDesc = $('.test-step .horizontal-step .step-single .step-desc'),
  HprevBtn = $('.test-step .horizontal-btn button:first-child'),
  HnextBtn = $('.test-step .horizontal-btn button:last-child');
stepFun(Hsteps,HstepCon,'left',HstepDesc,HnextBtn,HprevBtn);
//垂直步骤条变量
var Vsteps = $('.test-step .vertical-step .step-single'),
  VstepCon = $('.test-step .vertical-con li'),
  VstepDesc = $('.test-step .vertical-step .step-single .step-desc'),
  VprevBtn = $('.test-step .vertical-btn button:first-child'),
  VnextBtn = $('.test-step .vertical-btn button:last-child');
stepFun(Vsteps,VstepCon,'top',VstepDesc,VnextBtn,VprevBtn);