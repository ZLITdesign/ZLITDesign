//-------------------------------------------启用选项卡开始------------------------------------
layui.use(['element','layer'], function(){
  var element = layui.element;

  //监听左侧tab切换执行对应得方法
  element.on('tab(basics)', function(elem){
    var n = $(this).index();
    var catalog1 = $('.component_content>.layui-tab-item').eq(n).hasClass('form_box');
    var catalog2 = $('.component_content>.layui-tab-item').eq(n).hasClass('feedback_box');
    var catalog3 = $('.component_content>.layui-tab-item').eq(n).hasClass('other_box');
    if (catalog1){
      var floors = $('.form_floor');
      var navLis = $('.form_catalog ul li');
      var slider = $('.form_slider');
      catalogFun(floors,navLis,slider);
    }
    if (catalog2){
      var floors2 = $('.feedback_floor');
      var navLis2 = $('.feedback_catalog ul li');
      var slider2 = $('.feedback_slider');
      catalogFun(floors2,navLis2,slider2);
    }
    if (catalog3){
      var floors3 = $('.other_floor');
      var navLis3 = $('.other_catalog ul li');
      var slider3 = $('.other_slider');
      catalogFun(floors3,navLis3,slider3);
    }
  });
});
//-------------------------------------------启用选项卡结束------------------------------------


//------------------------------------导航开始---------------------------------------------
$('.head-nav-m ul li').click(function () {
  $(this).addClass('active').siblings().removeClass('active');
});
//------------------------------------导航结束---------------------------------------------


//------------------------------------侧边栏导航开始------------------------------------
//参数isOpen是否开启手风琴导航，默认关闭
function zlitNav(isOpen=false){
  $('.zlit-nav li').click(function(){
    var flag = true;  //防止点击过快
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
zlitNav();
//------------------------------------侧边栏导航结束------------------------------------


//-------------------------------------tab标签开始----------------------------------------
$('.tab-style-1 .layui-tab-title li').click(function () {
  var lefts = $(this).position().left;
  $('.tab-style-1 .layui-tab-title .slider').css({left:lefts+15});
});
//-------------------------------------tab标签结束----------------------------------------


//----------------------------------------分页开始---------------------------------------
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
var curr_page = Number($('.paging-44 .current_page').text());
var max_page = Number($('.paging-44 .max_page').text());
var prev_page = $('.paging-44 .prev_page');
var next_page = $('.paging-44 .next_page');
next_page.click(function () {
  curr_page++;
  if (curr_page<max_page){
    $('.paging-44 .current_page').text(curr_page);
    prev_page.removeClass('disabled');
  }else if(curr_page==max_page){
    $(this).addClass('disabled');
    $('.paging-44 .current_page').text(curr_page);
  }else if (curr_page>max_page){
    $('.paging-44 .current_page').text(max_page);
    $(this).addClass('disabled');
    curr_page = max_page;
  }
});
prev_page.click(function () {
  curr_page--;
  if (curr_page>1){
    $('.paging-44 .current_page').text(curr_page);
    next_page.removeClass('disabled');
  }else if(curr_page==1){
    $(this).addClass('disabled');
    $('.paging-44 .current_page').text(curr_page);
  }else if (curr_page<1){
    $('.paging-44 .current_page').text(1);
    $(this).addClass('disabled');
    curr_page = 1;
  }
});
//----------------------------------------分页结束---------------------------------------


//----------------------------------------菜单按钮开始---------------------------------------
function menuBtn(){
  var flag = true;
  $('.zlit-menu-btn-change').click(function (e) {
    //隐藏/显示按钮功能区
    e.stopPropagation();
    if (flag) {
      $('.zlit-menu-btn').addClass('layui-anim-scaleSpring').css({display:'block'});
      $(this).css({transform:'rotateZ(180deg)',top:'10px'});
      flag = false;
    }else{
      $('.zlit-menu-btn').removeClass('layui-anim-scaleSpring').css({display:'none'});
      $(this).css({transform:'rotateZ(0deg)',top:'12px'});
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
    $('.zlit-menu-btn-change').css({transform:'rotateZ(0deg)',top:'12px'});
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
menuBtn();
//----------------------------------------菜单按钮结束---------------------------------------


//-----------------------------------------表单开始--------------------------------------
layui.use('form', function(){
  var form = layui.form;
  //自定义规则
  $.validator.addMethod("define", function(value, element, param) {
    /*let reg = /^\d{4,10}$/;
    if (reg.test(value)){
      return value;
    }*/
    if (value.length>=param[0] && value.length<=param[1]){
      return value;
    }
  }, '格式不正确');
  $('#con_form').validate({   //以下init,error,finish,desc等为input的name值
    rules:{
      init:{
        required:true,
        maxlength:10,
        define:[2,10]    //自定义规则放在最后
      },
      error:{
        required:true,
        maxlength:10,
        define:[6,10],   //自定义规则放在最后
      },
      finish:{
        required:true
      },
      desc:{
        required:true,
        maxlength:100,
        define:[50,100],  //自定义规则放在最后
      }
    },
    messages:{
      init:{
        required:'此字段必须填写',
        maxlength: '最多{0}个字符',
        define:'至少也得输入{0}-{1}位字符啊'
      },
      error:{
        required:'此字段必须填写',
        maxlength: '最多{0}个字符',
        define:'至少也得输入{0}-{1}位字符啊'
      },
      finish:{
        required:'此字段必须填写'
      },
      desc:{
        required:'此字段必须填写',
        maxlength: '最多{0}个字符',
        define:'至少也得输入{0}-{1}位字符啊'
      }
    },
    highlight:function (element) {   //定义验证不通过的处理样式
      $(element).each(function (i,val) {
        $(val).addClass('validateError');
      })
    },
    unhighlight:function (element) {  //定义验证通过的处理样式
      $(element).each(function (i,val) {
        $(val).removeClass('validateError');
      })
    }
  });
  //监听提交
  form.on('submit(demo1)', function(data){
    if ($('#con_form').valid()){
      console.log(data.field);
      console.log(JSON.stringify(data.field));
    }
    return false;
  });
});
//数字输入
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
//滑块输入
layui.use('slider', function(){
  var slider = layui.slider;
  slider.render({
    elem: '#slideTest1',  //绑定元素
    theme: '#91D5FF',     //自定义主题色
    value: 25,            //设置初始值
  });
  slider.render({
    elem: '#slideTest2',  //绑定元素
    theme: '#91D5FF',     //自定义主题色
    input: true,          //开启输入框
    value: 25,            //设置初始值
  });

  slider.render({
    elem: '#slideTest3',  //绑定元素
    theme: '#91D5FF',     //自定义主题色
    step: 10,              //开启步进值
    value: 40,            //设置初始值
    showstep: true        //开启间断点
  });
  slider.render({
    elem: '#slideTest4',  //绑定元素
    theme: '#91D5FF',     //自定义主题色
    step: 10,              //开启步进值
    input: true,          //开启输入框
    value: 40,            //设置初始值
    showstep: true        //开启间断点
  });

  slider.render({
    elem: '#slideTest5',  //绑定元素
    theme: '#91D5FF',     //自定义主题色
    range: true,          //开启拖拽范围
    value: [5,55]        //设置初始值
  });
  var double = slider.render({
    elem: '#slideTest6',  //绑定元素
    theme: '#91D5FF',     //自定义主题色
    range: true,          //开启拖拽范围
    value: [5,55],        //设置初始值
    change: function(vals){
      $('.double-range-text').val(vals[0]+'-'+vals[1]);
    }
  });
  $('.double-range-text').val(double.config.value[0]+'-'+double.config.value[1]);
});
//标签
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
  div.animate({padding:'6px 35px 6px 10px'},200,function () {
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
//级联选择
layui.config({
  base: "./layui/lay/mymodules/"
}).use(['form',"cascader"], function(){
  var cascader = layui.cascader;
  var data = [
    {
      "id": "A",
      "name": "一级选项1",
      "children": [
        {
          "id": "AA1",
          "name": "二级选项1-1"
        },
        {
          "id": "AA2",
          "name": "二级选项1-2"
        }
      ]
    },
    {
      "id": "B",
      "name": "一级选项2",
      "children": [
        {
          "id": "BB1",
          "name": "二级选项2-1",
          "children": [
            {
              "id": "BBB1",
              "name": "三级选项2-1-1"
            },
            {
              "id": "BBB2",
              "name": "三级选项2-1-2"
            }
          ]
        },
        {
          "id": "BB2",
          "name": "二级选项2-2",
          "children": [
            {
              "id": "BBB3",
              "name": "三级选项2-2-1"
            },
            {
              "id": "BBB4",
              "name": "三级选项2-2-2"
            }
          ]
        }
      ]
    },
    {
      "id": "C",
      "name": "一级选项3"
    },
    {
      "id": "D",
      "name": "一级选项4"
    },
    {
      "id": "E",
      "name": "一级选项5"
    },
    {
      "id": "F",
      "name": "一级选项6"
    },
    {
      "id": "G",
      "name": "一级选项7"
    }
  ];
  /*后台参数返回格式：{
      "Data": data,
      "Code": 0,
      "Msg": "错误！！"
  }*/
  cascader({
    elem: "#cascade",             //绑定容器id
    data: data,                   //数据,json格式数组
    // url: "https://www.easy-mock.com/mock/5bdffa7aae524521410b1598/tableData/cascader",                //异步数据请求地址
    type: "get",                  //请求方式
    // triggerType: "change",     //处罚方式（鼠标点击或鼠标移入）
    // showLastLevels: true,      //是否显示最后一级
    // where: {                   //异步传送得参数
    //     a: "aaa"
    // },
    id: ["B", "BB1",'BBB1'],   //已选择得值
    changeOnSelect: true,         //开启可选择任意一级
    success: function (valData,labelData) {   //选择后的回调
      // valData  选项得值
      // labelData   页面选项显示得值
      console.log(valData,labelData);
    }
  });
});
//树选择
layui.config({
  base: './layui/lay/mymodules/'
}).extend({
  formSelects: 'formSelects-v4'
}).use(['formSelects'], function(){
  var formSelects = layui.formSelects;
  // local模式  data数据为本地定义
  layui.formSelects.data('example11_1', 'local', {   //example11_1为绑定元素的xm-select值
    arr: [
      {name: '分组1', type: 'optgroup'},
      {name: '北京', value: 1, children: [{name: '朝阳', disabled: true, value: 11}, {name: '海淀', value: 12}]},
      {name: '分组2', type: 'optgroup'},
      {name: '深圳', value: 2, children: [{name: '龙岗', value: 21},{name: '离石', value: 22}]},
    ]
  });
  formSelects.value('example11_1', [1,2],true);  //设置初始选中项
  $(".xm-select-dl ").mCustomScrollbar({
    autoHideScrollbar: false,   //滚动条是否隐藏
    theme: "my-theme",
  });

  //server模式  data数据为远程数据
  /*layui.formSelects.data('example11_1', 'server', {   //example11_1为绑定元素的xm-select值
    url: 'https://www.easy-mock.com/mock/5bdffa7aae524521410b1598/tableData/zlittree',
    success:function (id, url, val, result) {
      // id:       绑定容器的xm-select值
      // url:      数据请求的路径
      // val:      搜索的值
      // result:   返回的结果
      formSelects.value('example11_1',[12,17]);  ////设置初始选中项
    }
  });
  //监听事件获取实时选择数据
  formSelects.on('example11_1', function(id, vals, choice, isAdd, isDisabled){
    //id:           当前select的id
    //vals:         当前select已选中的值
    //choice:       当前select点击的值
    //isAdd:        当前操作选中or取消
    //isDisabled:   当前选项是否是disabled
    console.log(vals);
  }, true);*/
});
//日期选择
layui.use('laydate', function() {
  var laydate = layui.laydate;
  laydate.render({
    elem: '#date1',        //绑定容器
    format: 'yyyy/MM/dd',  //自定义格式
    theme: '#108EE9',      //自定义颜色主题
    eventElem: '.zlit-date-icon1',
    trigger: 'click',
    done: function(value, date){
      console.log(value); //得到日期生成的值，如：2017-08-18
      console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    }
  });

  laydate.render({
    elem: '#date2',        //绑定容器
    format: 'yyyy/MM',     //自定义格式
    theme: '#108EE9',      //自定义颜色主题
    type: 'month',         //月份选择
    eventElem: '.zlit-date-icon2',
    trigger: 'click',
    done: function(value, date){
      console.log(value); //得到日期生成的值，如：2017-08-18
      console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    }
  });

  laydate.render({
    elem: '#date3',        //绑定容器
    theme: '#108EE9',      //自定义颜色主题
    type: 'year',          //年份选择
    eventElem: '.zlit-date-icon3',
    trigger: 'click',
    done: function(value, date){
      console.log(value);  //得到日期生成的值，如：2017-08-18
      console.log(date);   //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    }
  });

  laydate.render({
    elem: '#date4',        //绑定容器
    theme: '#108EE9',      //自定义颜色主题
    range: true,           //开启日期选择范围
    format: 'yyyy/MM/dd',  //自定义格式
    eventElem: '.zlit-date-icon4',
    trigger: 'click',
    done: function(value, date, endDate){
      console.log(value); //得到日期生成的值，如：2017-08-18
      console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
      console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
    }
  });

  laydate.render({
    elem: '#time1',        //绑定容器
    theme: '#108EE9',      //自定义颜色主题
    format: 'HH:mm:ss',    //自定义格式
    type: 'time',          //时间选择
    eventElem: '.zlit-date-icon5',
    trigger: 'click',
    done: function(value, date){
      console.log(value); //得到日期生成的值，如：2017-08-18
      console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    }
  });
});
//文件上传样式一
//创建进度条监听函数
var xhrOnProgress=function(fun) {
  xhrOnProgress.onprogress = fun; //绑定监听
  //使用闭包实现监听绑
  return function() {
    //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
    var xhr = $.ajaxSettings.xhr();
    //判断监听函数是否为函数
    if (typeof xhrOnProgress.onprogress !== 'function')
      return xhr;
    //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
    if (xhrOnProgress.onprogress && xhr.upload) {
      xhr.upload.onprogress = xhrOnProgress.onprogress;
    }
    return xhr;
  }
}
layui.use('upload', function() {
  var upload = layui.upload;
  //多文件列表示例
  var demoListView = $('#demoList')
    ,uploadListIns = upload.render({
    elem: '#testList'  //绑定的容器
    ,method: 'post'
    ,url: './upload.class.php'   //请求的地址
    ,accept: 'file'    //限定文件格式images/file/video/audio
    ,multiple: true    //开启多选
    ,auto: false       //关闭自动上传
    ,drag: false       //关闭拖拽上传
    ,bindAction: '#testListAction'    //结合auto:false使用，指向另外一个按钮元素来执行上传动作
    ,choose: function(obj){
      var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
      //读取本地文件
      obj.preview(function(index, file, result){
        //判断选择的文件是否有重复
        var lis = $('.zlit-upload-list').find('li');
        if (lis.length>0){
          for (var i=0;i<lis.length;i++){
            var liName = $(lis[i]).data('filename');
            if (liName===file.name){
              layer.msg('不要重复选择');
              return delete files[index];
            }else{
              files = this.files = obj.pushFile();
            }
          }
        }

        //result值为文件的base64格式
        var li = $(['<li data-filename="'+ file.name +'" id="upload-'+ index +'">',
          '<i class="layui-icon layui-icon-note"></i>',
          '<span class="zlit-file-name"><em class="zlit-upload-msg">等待上传</em>，文件名称：'+file.name+'，文件大小：'+(file.size/1014).toFixed(1)+'kb</span>',
          '<div class="upload-ctrl"><i class="layui-icon layui-icon-refresh zlit-reload"></i><i class="layui-icon layui-icon-close zlit-delete"></i></div><div class="upload-progress"><div class="inner"></div></div></li>'
        ].join(''));

        //单个重传
        li.find('.zlit-reload').on('click', function(){
          obj.upload(index, file);
        });

        //删除
        li.find('.zlit-delete').on('click', function(){
          delete files[index]; //删除对应的文件
          li.remove();
          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
        });
        demoListView.append(li);
      });
    }
    ,xhr:xhrOnProgress
    ,progress:function(value){//上传进度回调 value进度值
      if (value<100){
        $('.zlit-upload-msg').html('<em class="zlit-upload-msg" style="color: #108ee9;">正在上传</em>');
      }
      $('.inner').css({width:value+'%'});
    }
    ,done: function(res, index, upload){
      if(res.code == 0){ //上传成功
        var li = demoListView.find('li#upload-'+ index)
          ,tds = li.children();
        tds.find('em').html('<em class="zlit-upload-msg" style="color: #5FB878;">上传成功</em>');
        tds.find('.zlit-reload').css({display:'none'});
        return delete this.files[index]; //删除文件队列已经上传成功的文件
      }
      this.error(index, upload);
    }
    ,error: function(index, upload){
      $('.inner').css({width:'50%',background:'#F5222D'});
      var li = demoListView.find('li#upload-'+ index)
        ,tds = li.children();
      tds.find('em').html('<em class="zlit-upload-msg" style="color: #F5222D;">上传失败</em>');
      tds.find('.zlit-reload').css({display:'inline'});
    }
  });
});
//文件上传样式二
layui.use(['upload','layer'], function() {
  var upload = layui.upload;
  var layer = layui.layer;
  upload.render({
    elem: '#upload1'    //制定容器
    ,url: './upload.class.php'   //上传地址
    ,method: 'post'
    ,multiple: true     //开启多传
    ,drag: false        //关闭拖拽上传
    ,auto: false        //关闭自动上传
    ,bindAction: '#uploadImg'
    ,choose:function (obj) {
      var files = this.files = obj.pushFile();
      //预读本地文件示例，不支持ie8
      obj.preview(function (index, file, result) {
        //判断选择的文件是否有重复
        var imgs = $('.zlit-img-view').find('img');
        if (imgs.length>0){
          for (var i=0;i<imgs.length;i++){
            var imgName = $(imgs[i]).attr('alt');
            if (imgName===file.name){
              layer.msg('不要重复选择');
              return delete files[index];
            }else{
              files = this.files = obj.pushFile();
            }
          }
        }

        var div = $('<div></div>'),img = $('<img/>');
        img.prop({src:result,alt:file.name});
        img.appendTo(div);
        div.insertBefore($('.zlit-upload-1btn'));
      })
    }
    ,done: function(res,index){
      //上传完毕
      layer.msg('图片上传成功', {
        time: 3000, icon: 1
      });
      return delete this.files[index]; //删除文件队列已经上传成功的文件
    }
  });
});
//文件上传样式三
layui.use(['upload','layer'], function() {
  var upload = layui.upload;
  var layer = layui.layer;
  upload.render({
    elem: '#uploadCon'   //绑定容器
    ,url: './upload.class.php'     //请求地址
    ,accept: 'file'      //文件格式
    ,auto: false         //关闭自动上传
    ,bindAction: '#uploadSub'   //结合auto:false使用，指向另外一个按钮元素来执行上传动作
    ,size: 1024*5        //限制文件最大5MB
    ,choose: function(obj){
      this.files = obj.pushFile();  //将每次选择的文件追加到文件队列,以便清除
      $('.zlit-upload-2-title span').css({color:'#108ee9'});
      obj.preview(function(index, file, result){
        $('.zlit-upload-2-title span').text(file.name);
      });
    }
    ,done: function(res,index){
      //上传完毕
      $('.zlit-upload-2-title span').css({color:'#5FB878'});
      layer.msg('上传成功', {
        time: 3000, icon: 1
      });
      return delete this.files[index]; //删除文件队列已经上传成功的文件
    }
    ,error: function(index, upload){
      $('.zlit-upload-2-title span').css({color:'#F5222D'});
    }
  });
});
// -----------------------------------------表单结束--------------------------------------


//---------------------------------------反馈开始----------------------------------------
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
      time: 0,
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
      time: 0,
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
      time: 0,
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
      time: 0,
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
      time: 0,
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
    var that = this;
    var index = layer.tips(`<div class="zlit-tips-box">
        <i class="layui-icon layui-icon-tips zlit-tips-icon"></i>
        <span class="zlit-tips-text">删除后数据不可恢复</span>
        <div class="zlit-tips-btn">
         <a href="#" class="zlit-tips-btn0">取消</a>
         <a href="#" class="zlit-tips-btn1">删除</a>
        </div>
      </div>`,that,{
      tips: [1,'#fff'],
      area: ['230px', '76px'],
      time: 0,
    });
    $('.zlit-tips-btn0').on('click',function () {
      //点击取消要做的事....
      layer.close(index);
    });
    $('.zlit-tips-btn1').on('click',function () {
      //点击删除要做的事....
      layer.close(index);
    });
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
//文字提示
function tooltips(){
//插件{白色背景}
  $('.w-tl').pt({
    position: 't',
    align: 'l',
    content: '信息提示上左对齐',
    leaveCloseTime: 2000  //鼠标离开关闭时间，默认500ms
  });
  $('.w-top').pt({
    position: 't',
    content: '信息提示上对齐'
  });
  $('.w-tr').pt({
    position: 't',
    align: 'r',
    content: '信息提示上右对齐'
  });
  $('.w-lt').pt({
    position: 'l',
    align: 't',
    content: '信息提示左上对齐信息提示左上对齐信息提示左上对齐',
    conAlign: 'left'
  });
  $('.w-left').pt({
    position: 'l',
    content: '信息提示左对齐信息提示左对齐信息提示左对齐',
    conAlign: 'left'
  });
  $('.w-lb').pt({
    position: 'l',
    align: 'b',
    content: '信息提示左下对齐信息提示左下对齐信息提示左下对齐',
    conAlign: 'left'
  });
  $('.w-rt').pt({
    position: 'r',
    align: 't',
    content: '信息提示右上对齐信息提示右上对齐信息提示右上对齐',
    conAlign: 'left'
  });
  $('.w-right').pt({
    position: 'r',
    content: '信息提示右对齐信息提示右对齐信息提示右对齐',
    conAlign: 'left'
  });
  $('.w-rb').pt({
    position: 'r',
    align: 'b',
    content: '信息提示右下对齐信息提示右下对齐信息提示右下对齐',
    conAlign: 'left'
  });
  $('.w-bl').pt({
    position: 'b',
    align: 'l',
    content: '信息提示下左对齐',
  });
  $('.w-bottom').pt({
    position: 'b',
    content: '信息提示下对齐',
  });
  $('.w-br').pt({
    position: 'b',
    align: 'r',
    content: '信息提示下右对齐',
  });

//插件{深色背景}
  $('.d-tl').dt({
    position: 't',
    align: 'l',
    content: '信息提示上左对齐',
    fontcolor:'#fff',
    leaveCloseTime: 2000  //鼠标离开关闭时间，默认500ms
  });
  $('.d-top').dt({
    position: 't',
    content: '信息提示上对齐',
    fontcolor:'#fff'
  });
  $('.d-tr').dt({
    position: 't',
    align: 'r',
    content: '信息提示上右对齐',
    fontcolor:'#fff'
  });
  $('.d-lt').dt({
    position: 'l',
    align: 't',
    content: '信息提示左上对齐信息提示左上对齐信息提示左上对齐',
    fontcolor:'#fff',
    conAlign: 'left'
  });
  $('.d-left').dt({
    position: 'l',
    content: '信息提示左对齐信息提示左对齐信息提示左对齐',
    fontcolor:'#fff',
    conAlign: 'left'
  });
  $('.d-lb').dt({
    position: 'l',
    align: 'b',
    content: '信息提示左下对齐信息提示左下对齐信息提示左下对齐',
    fontcolor:'#fff',
    conAlign: 'left'
  });
  $('.d-rt').dt({
    position: 'r',
    align: 't',
    content: '信息提示右上对齐信息提示右上对齐信息提示右上对齐',
    fontcolor:'#fff',
    conAlign: 'left'
  });
  $('.d-right').dt({
    position: 'r',
    content: '信息提示右对齐信息提示右对齐信息提示右对齐',
    fontcolor:'#fff',
    conAlign: 'left'
  });
  $('.d-rb').dt({
    position: 'r',
    align: 'b',
    content: '信息提示右下对齐信息提示右下对齐信息提示右下对齐',
    fontcolor:'#fff',
    conAlign: 'left'
  });
  $('.d-bl').dt({
    position: 'b',
    align: 'l',
    content: '信息提示下左对齐',
    fontcolor:'#fff'
  });
  $('.d-bottom').dt({
    position: 'b',
    content: '信息提示下对齐',
    fontcolor:'#fff'
  });
  $('.d-br').dt({
    position: 'b',
    align: 'r',
    content: '信息提示下右对齐',
    fontcolor:'#fff'
  });
}
tooltips();
//---------------------------------------反馈结束----------------------------------------


//---------------------------------------其他开始----------------------------------------
//直线进度条
layui.use('element', function(){
  var element = layui.element;
  //模拟loading
  $('.loadingBtn').click(function () {
    var i = $('<i class="layui-icon layui-icon-ok-circle"></i>');
    var progressNum = 0, timer = setInterval(function(){
      progressNum = progressNum + Math.random()*10|0;
      if(progressNum>100){
        progressNum = 100;
        clearInterval(timer);
        $('.lineDemo').addClass('zlit-progress-success1');
        $('.zlit-progress').find('span').html('');
        i.appendTo($('.zlit-progress'));
      }else{
        $('.lineDemo').removeClass('zlit-progress-success');
        $('.zlit-progress').find('i').remove();
        $('.zlit-progress').find('span').text(progressNum+'%');
      }
      element.progress('lineDemo', progressNum+'%');
    }, 300+Math.random()*1000);
  });
});
//圆形进度条
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
anchors();
// ---------------------------------------其他结束---------------------------------------










//底部翻页
paging();


//展示代码
showCode();

//目录楼层跳转
  //无滚轮事件
function catalogFun(floors,navLis,slider) {
  var isJump = true;
  navLis.click(function () {
    isJump = false;
    var index = $(this).index();
    var that = $(this);
    var t = floors.eq(index).position().top - 20;//获取每个楼层距离body的高度
    var tops = $(this).position().top;  //获取滑块距离父元素的高度
    $('.component_content').animate({scrollTop:t},function () {
      that.addClass('active').siblings().removeClass('active');
      slider.css({top:tops+8});
      isJump = true;
    });
  });
}
  //带滚滚轮事件
/*function catalogFun(floors,navLis,slider) {
  var clientH = $(window).height();
  var isJump = true;
  $('.component_content').scroll(function () {
    if (!isJump){
      return;
    }
    var floorTops = $('.component_content').scrollTop();
    floors.each(function (i) {
      if(floorTops>=floors.eq(i).position().top-clientH+10){
        navLis.eq(i).addClass('active').siblings().removeClass('active');
        var navTops = navLis.eq(i).position().top;
        slider.css({top:navTops+8});
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
      that.addClass('active').siblings().removeClass('active');
      slider.css({top:tops+8});
      isJump = true;
    });
  });
}*/
