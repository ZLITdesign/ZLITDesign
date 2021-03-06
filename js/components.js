//-------------------------------------------启用选项卡开始------------------------------------
layui.use(['element', 'layer'], function () {
  var element = layui.element;

  //监听左侧tab切换执行对应得方法
  element.on('tab(basics)', function (elem) {
    var n = $(this).index();
    var catalog1 = $('.component_content>.layui-tab-item').eq(n).hasClass('form_box');
    var catalog2 = $('.component_content>.layui-tab-item').eq(n).hasClass('feedback_box');
    var catalog3 = $('.component_content>.layui-tab-item').eq(n).hasClass('other_box');
    if (catalog1) {
      var floors = $('.form_floor');
      var navLis = $('.form_catalog ul li');
      var slider = $('.form_slider');
      catalogFun(floors, navLis, slider);
    }
    if (catalog2) {
      var floors2 = $('.feedback_floor');
      var navLis2 = $('.feedback_catalog ul li');
      var slider2 = $('.feedback_slider');
      catalogFun(floors2, navLis2, slider2);
    }
    if (catalog3) {
      var floors3 = $('.other_floor');
      var navLis3 = $('.other_catalog ul li');
      var slider3 = $('.other_slider');
      catalogFun(floors3, navLis3, slider3);
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
$('.zlit-nav1').zlitExtend('zlitSlideNav');
$('.zlit-nav2').zlitExtend('zlitSlideNav', {
  isOpen: true     //参数isOpen是否开启手风琴导航，默认关闭
});
//------------------------------------侧边栏导航结束------------------------------------


//-------------------------------------tab标签开始----------------------------------------
$('.tab-style-1').zlitExtend('zlitTabNav');
$('.tab-style-2').zlitExtend('zlitTabNav');
//-------------------------------------tab标签结束----------------------------------------


//----------------------------------------分页开始---------------------------------------
//标准样式完整功能
layui.use('laypage', function () {
  var laypage = layui.laypage;
  //完整功能
  laypage.render({
    elem: 'paging-1',
    count: 100,
    theme: '#108EE9',
    prev: '<em style="font-family: SimSun">&lt;</em>',
    next: '<em style="font-family: SimSun">&gt;</em>',
    layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
    jump: function (obj) {
      console.log(obj)
    }
  });
});

//简易样式
layui.use('laypage', function () {
  var laypage = layui.laypage;
  //简易样式一
  laypage.render({
    elem: 'paging-2',
    count: 70, //数据总数
    theme: '#108EE9',
    groups: 10,
    prev: '<em style="font-family: SimSun">&lt;</em>',
    next: '<em style="font-family: SimSun">&gt;</em>',
  });

  //简易样式二
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
$('.paging-4').zlitExtend('zlitMiniPage', {
  limit: 5,     //一页显示几条数据
  count: 25     //总过多少条数据
});
//----------------------------------------分页结束---------------------------------------


//----------------------------------------菜单按钮开始---------------------------------------
$('.zlit-menu-btn-box').zlitExtend('zlitMenuBtn', {
  uploadFiles: uploadFiles
});

function uploadFiles(ele, accpets = 'images', exts = '') {
  layui.use(['upload', 'layer'], function () {
    var upload = layui.upload;
    var layer = layui.layer;
    upload.render({
      elem: ele,
      url: './upload.class.php',
      accept: accpets,
      exts: exts,
      choose: function (obj) {
        obj.preview(function (index, file, result) {
          $('.zlit-menu-btn-show').text(file.name);
        });
      },
      done: function (res, index) {
        //上传完毕
        layer.msg('上传成功', {
          time: 3000, icon: 1
        });
        return delete this.files[index]; //删除文件队列已经上传成功的文件
      }
    });
  });
}

//----------------------------------------菜单按钮结束---------------------------------------


//-----------------------------------------表单开始--------------------------------------
layui.use('form', function () {
  var form = layui.form;
  //自定义规则
  $.validator.addMethod("define", function (value, element, param) {
    /*let reg = /^\d{4,10}$/;
    if (reg.test(value)){
      return value;
    }*/
    if (value.length >= param[0] && value.length <= param[1]) {
      return value;
    }
  }, '格式不正确');
  $('#con_form').validate({   //以下init,error,finish,desc等为input的name值
    rules: {
      init: {
        required: true,
        maxlength: 10,
        define: [2, 10]    //自定义规则放在最后
      },
      error: {
        required: true,
        maxlength: 10,
        define: [6, 10],   //自定义规则放在最后
      },
      finish: {
        required: true
      },
      desc: {
        required: true,
        maxlength: 100,
        define: [50, 100],  //自定义规则放在最后
      }
    },
    messages: {
      init: {
        required: '此字段必须填写',
        maxlength: '最多{0}个字符',
        define: '至少也得输入{0}-{1}位字符啊'
      },
      error: {
        required: '此字段必须填写',
        maxlength: '最多{0}个字符',
        define: '至少也得输入{0}-{1}位字符啊'
      },
      finish: {
        required: '此字段必须填写'
      },
      desc: {
        required: '此字段必须填写',
        maxlength: '最多{0}个字符',
        define: '至少也得输入{0}-{1}位字符啊'
      }
    },
    highlight: function (element) {   //定义验证不通过的处理样式
      $(element).each(function (i, val) {
        $(val).addClass('validateError');
      })
    },
    unhighlight: function (element) {  //定义验证通过的处理样式
      $(element).each(function (i, val) {
        $(val).removeClass('validateError');
      })
    }
  });
  //监听提交
  form.on('submit(demo1)', function (data) {
    if ($('#con_form').valid()) {
      console.log(data.field);
      console.log(JSON.stringify(data.field));
    }
    return false;
  });
});
//数字输入
$('.zlit-number-1').zlitExtend('zlitNumInput');
$('.zlit-number-2').zlitExtend('zlitNumInput');
//滑块输入
layui.use('slider', function () {
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
    value: [5, 55]        //设置初始值
  });
  var double = slider.render({
    elem: '#slideTest6',  //绑定元素
    theme: '#91D5FF',     //自定义主题色
    range: true,          //开启拖拽范围
    value: [5, 55],        //设置初始值
    change: function (vals) {
      $('.double-range-text').val(vals[0] + '-' + vals[1]);
    }
  });
  $('.double-range-text').val(double.config.value[0] + '-' + double.config.value[1]);
});
//添加、修改、删除标签
$('.zlit-label-box').zlitExtend('zlitLabel');
//级联选择
layui.config({
  base: "./layui/lay/mymodules/"
}).use(['form', "cascader"], function () {
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
    id: ["B", "BB1", 'BBB1'],   //已选择得值
    changeOnSelect: true,         //开启可选择任意一级
    success: function (valData, labelData) {   //选择后的回调
      // valData  选项得值
      // labelData   页面选项显示得值
      console.log(valData, labelData);
    }
  });
});
//树选择
layui.config({
  base: './layui/lay/mymodules/'
}).extend({
  formSelects: 'formSelects-v4'
}).use(['formSelects'], function () {
  var formSelects = layui.formSelects;
  // local模式  data数据为本地定义
  //disabled设置是否禁用，true则禁用，false则启用
  //selected设置是否选中，true则选中，false则未选中
  var dataArr = [
    {name: '分组1', type: 'optgroup'},
    {
      name: '北京', value: 1, children: [
        {name: '朝阳', disabled: false, value: 11},
        {name: '海淀', value: 12, selected: false}
      ]
    },
    {name: '分组2', type: 'optgroup'},
    {
      name: '山西', value: 2, children: [
        {name: '太原', value: 21},
        {
          name: '吕梁', value: 22, children: [
            {name: '离石', value: 31},
            {name: '柳林', value: 32},
            {name: '中阳', value: 33}
          ]
        }, {name: '晋城', value: 23}
      ]
    },
  ];
  layui.formSelects.data('example11_1', 'local', {   //example11_1为绑定元素的xm-select值
    arr: dataArr
  });
  // formSelects.value('example11_1', [1, 2], true);  //设置初始选中项
  formSelects.btns('example11_1', ['remove'], {show: ''});
  formSelects.on('example11_1', function (id, vals, choice, isSelected, isDisabled) {
    //id:           当前select的id
    //vals:         当前select已选中的值
    //choice:       当前select点击的值
    //isSelected:   当前操作选中or取消
    //isDisabled:   当前选项是否是disabled
    if (choice.XM_TREE_FOLDER && isSelected) {
      selArray('example11_1', choice.children, true);    //全选
    } else if (choice.XM_TREE_FOLDER && !isSelected) {
      selArray('example11_1', choice.children, false);   //取消全选
    }
    //点击父级的递归判断
    function selArray(ele, data, flag) {
      /*
      * ele   下拉树容器的xm-select值
      * data  当前点击的数据
      * falg  全选(true)或取消全选(false)
      * */
      var arr = [];
      for (var i in data) {
        arr.push(data[i].value);
        if (flag) {  //如果当前点击的值选中则子元素全选中
          formSelects.value(ele, arr, true);
        } else {     //如果当前点击的值取消选中则子元素全取消选中
          formSelects.value(ele, arr, false);
        }
        if (data[i].XM_TREE_FOLDER) {
          selArray(ele, data[i].children, flag);
        }
      }
    }

    var selArr = formSelects.value('example11_1');    //当前总共已选择几条数据
    var parId, parVal;
    if (choice.XM_PID_VALUE){
      parId = JSON.parse( choice.XM_PID_VALUE ).join('-');
      parId = parId.substring(0,parId.lastIndexOf('-'));
      parVal = Number($('dd[tree-id='+ parId +']').attr('lay-value'));
      selSingle('example11_1', dataArr, parVal, selArr, parId);
    }
    //点击子级的递归判断
    function selSingle(ele,data,parVal,selArr,parId) {
      /*
      * ele     下拉树容器的xm-select值
      * data    ajax获取的所有数据
      * parVal  当前选择数据的父级的value值
      * selArr  当前总共选择了几条数据
      * parId   当前点击选择数据的父级
      * */
      var arr = [];   //存储已选子级数据，以便进行比较
      for (var i in data) {
        if (data[i].value && parVal){
          if (data[i].value === parVal){
            for (var j=0;j<data[i].children.length;j++){
              for (var k=0;k<selArr.length;k++){
                if (data[i].children[j].name===selArr[k].name){
                  arr.push(selArr[k]);
                  if (data[i].children.length===arr.length){
                    formSelects.value(ele,[parVal],true);
                  }else{
                    formSelects.value(ele,[parVal],false);
                    if (parId.includes('-')){
                      var parIds = parId.substring(0,parId.lastIndexOf('-'));
                      var parVals = Number($('dd[tree-id='+ parIds +']').attr('lay-value'));
                      formSelects.value(ele,[parVals],false);
                    }
                  }
                }
              }
            }
            break;
          }else{
            selSingle(ele, data[i].children, parVal, selArr, parId);
          }
        }
      }
    }
  }, true);
  // 获取值
  $('#demoSel').click(function () {
    console.log(formSelects.value('example11_1'));
    console.log(formSelects.value('example11_1', 'val'));
    console.log(formSelects.value('example11_1', 'valStr'));
    console.log(formSelects.value('example11_1', 'name'));
    console.log(formSelects.value('example11_1', 'nameStr'));
  })
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
    //isSelected:   当前操作选中or取消
    //isDisabled:   当前选项是否是disabled
    console.log(vals);        //获取当前选中的值
    console.log(formSelects.value('example11_1'));   //获取选中的所有值
  }, true);*/
});
//日期选择
layui.use('laydate', function () {
  var laydate = layui.laydate;
  laydate.render({
    elem: '#date1',        //绑定容器
    format: 'yyyy/MM/dd',  //自定义格式
    theme: '#108EE9',      //自定义颜色主题
    eventElem: '.zlit-date-icon1',
    trigger: 'click',
    done: function (value, date) {
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
    done: function (value, date) {
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
    done: function (value, date) {
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
    done: function (value, date, endDate) {
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
    done: function (value, date) {
      console.log(value); //得到日期生成的值，如：2017-08-18
      console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    }
  });
});
//文件上传样式一
//创建进度条监听函数
var xhrOnProgress = function (fun) {
  xhrOnProgress.onprogress = fun; //绑定监听
  //使用闭包实现监听绑
  return function () {
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
layui.use('upload', function () {
  var upload = layui.upload;
  //多文件列表示例
  var demoListView = $('#demoList');
  var uploadListIns = upload.render({
    elem: '#testList',  //绑定的容器
    method: 'post',
    url: './upload.class.php',   //请求的地址
    accept: 'file',    //限定文件格式images/file/video/audio
    multiple: true,    //开启多选
    auto: false,       //关闭自动上传
    drag: false,       //关闭拖拽上传
    bindAction: '#testListAction',    //结合auto:false使用，指向另外一个按钮元素来执行上传动作
    choose: function (obj) {
      var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
      //读取本地文件
      obj.preview(function (index, file, result) {
        //判断选择的文件是否有重复
        var lis = $('.zlit-upload-list').find('li');
        if (lis.length > 0) {
          for (var i = 0; i < lis.length; i++) {
            var liName = $(lis[i]).data('filename');
            if (liName === file.name) {
              layer.msg('不要重复选择');
              return delete files[index];
            } else {
              files = this.files = obj.pushFile();
            }
          }
        }

        //result值为文件的base64格式
        var li = $(['<li data-filename="' + file.name + '" id="upload-' + index + '">',
          '<i class="layui-icon layui-icon-note"></i>',
          '<span class="zlit-file-name"><em class="zlit-upload-msg">等待上传</em>，文件名称：' + file.name + '，文件大小：' + (file.size / 1014).toFixed(1) + 'kb</span>',
          '<div class="upload-ctrl"><i class="layui-icon layui-icon-refresh zlit-reload"></i><i class="layui-icon layui-icon-close zlit-delete"></i></div><div class="upload-progress"><div class="inner"></div></div></li>'
        ].join(''));

        //单个重传
        li.find('.zlit-reload').on('click', function () {
          obj.upload(index, file);
        });

        //删除
        li.find('.zlit-delete').on('click', function () {
          delete files[index]; //删除对应的文件
          li.remove();
          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
        });
        demoListView.append(li);
      });
    }
    , xhr: xhrOnProgress
    , progress: function (value) {//上传进度回调 value进度值
      if (value < 100) {
        $('.zlit-upload-msg').html('<em class="zlit-upload-msg" style="color: #108ee9;">正在上传</em>');
      }
      $('.inner').css({width: value + '%'});
    }
    , done: function (res, index, upload) {
      if (res.code == 0) { //上传成功
        var li = demoListView.find('li#upload-' + index)
          , tds = li.children();
        tds.find('em').html('<em class="zlit-upload-msg" style="color: #5FB878;">上传成功</em>');
        tds.find('.zlit-reload').css({display: 'none'});
        return delete this.files[index]; //删除文件队列已经上传成功的文件
      }
      this.error(index, upload);
    }
    , error: function (index, upload) {
      $('.inner').css({width: '50%', background: '#F5222D'});
      var li = demoListView.find('li#upload-' + index)
        , tds = li.children();
      tds.find('em').html('<em class="zlit-upload-msg" style="color: #F5222D;">上传失败</em>');
      tds.find('.zlit-reload').css({display: 'inline'});
    }
  });
});
//文件上传样式二
layui.use(['upload', 'layer'], function () {
  var upload = layui.upload;
  var layer = layui.layer;
  var uploadListIns = upload.render({
    elem: '#upload'    //制定容器
    , url: './upload.class.php'   //上传地址
    , method: 'post'
    , multiple: true     //开启多传
    , drag: false        //关闭拖拽上传
    , auto: false        //关闭自动上传
    , bindAction: '#uploadImg'
    , choose: function (obj) {
      var files = this.files = obj.pushFile();
      //预读本地文件示例，不支持ie8
      obj.preview(function (index, file, result) {
        //判断选择的文件是否有重复
        var imgs = $('.zlit-img-view').find('img');
        if (imgs.length > 0) {
          for (var i = 0; i < imgs.length; i++) {
            var imgName = $(imgs[i]).attr('alt');
            if (imgName === file.name) {
              layer.msg('不要重复选择');
              return delete files[index];
            } else {
              files = this.files = obj.pushFile();
            }
          }
        }

        //预览列表
        var div = $('<div class="img" data-magnify="gallery" data-group="g1" data-src="' + result + '" data-caption="' + file.name + '"></div>'),
          img = $('<img/>'),
          p = $('<p>删除</p>');
        img.prop({alt: file.name});
        img.appendTo(div);
        div.css({backgroundImage: 'url("' + result + '")'});
        p.appendTo(div);
        div.insertBefore($('.zlit-upload-1btn'));
        //大图预览
        div.Magnify({
          Toolbar: ['prev', 'next', 'rotateLeft', 'rotateRight', 'zoomIn', 'actualSize', 'zoomOut'],
          keyboard: true,
          draggable: true,
          movable: true,
          // bigView: true,
          // modalSize: [1024, 768],
        });

        //删除
        div.find('p').on('click', function (e) {
          e.stopPropagation();
          delete files[index]; //删除对应的文件
          $(this).closest('.img').animate({width: 0}, 100, function () {
            $(this).closest('.img').remove();
            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
          });
        });
      })
    }
    , done: function (res, index) {
      //上传完毕
      layer.msg('图片上传成功', {
        time: 3000, icon: 1
      });
      return delete this.files[index]; //删除文件队列已经上传成功的文件
    }
  });
});
//文件上传样式三
layui.use(['upload', 'layer'], function () {
  var upload = layui.upload;
  var layer = layui.layer;
  upload.render({
    elem: '#uploadCon'   //绑定容器
    , url: './upload.class.php'     //请求地址
    , accept: 'file'      //文件格式
    , auto: false         //关闭自动上传
    , bindAction: '#uploadSub'   //结合auto:false使用，指向另外一个按钮元素来执行上传动作
    , size: 1024 * 5        //限制文件最大5MB
    , choose: function (obj) {
      this.files = obj.pushFile();  //将每次选择的文件追加到文件队列,以便清除
      $('.zlit-upload-2-title span').css({color: '#108ee9'});
      obj.preview(function (index, file, result) {
        $('.zlit-upload-2-title span').text(file.name);
      });
    }
    , done: function (res, index) {
      //上传完毕
      $('.zlit-upload-2-title span').css({color: '#5FB878'});
      layer.msg('上传成功', {
        time: 3000, icon: 1
      });
      return delete this.files[index]; //删除文件队列已经上传成功的文件
    }
    , error: function (index, upload) {
      $('.zlit-upload-2-title span').css({color: '#F5222D'});
    }
  });
});
// -----------------------------------------表单结束--------------------------------------


//---------------------------------------反馈开始----------------------------------------
layui.use('layer', function () {
  var layer = layui.layer;
  //-----------------------------toast提示--------------------------------
  //白色背景
  $('.toast_box .whiteBg .layui-btn').on('click', function () {
    var arr = ['', 1, 2, 0, 4],
      brr = ['', '使用时页面顶部居中显示', '默认3s消失，可自定义时长。不要超过15个字', '这是全局提示，用于操作反馈', '字多的时候要延长展示时间'];
    var n = $(this).index();
    var index = layer.msg(brr[n], {
      offset: '24px',
      anim: 1,
      time: 3000,
      icon: arr[n]
    });
    layer.style(index, {
      background: '#fff',
      color: 'rgba(0,0,0,0.6)',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.2)',
      borderRadius: '4px',
      fontSize: '14px'
    });
  });

  //深色背景
  $('.toast_box .darkBg .layui-btn').on('click', function () {
    var arr = ['', 1, 2, 0, 4],
      brr = ['', '使用时页面顶部居中显示', '默认3s消失，可自定义时长。不要超过15个字', '这是全局提示，用于操作反馈', '字多的时候要延长展示时间'];
    var n = $(this).index();
    var index = layer.msg(brr[n], {
      offset: '24px',
      anim: 1,
      time: 3000,
      icon: arr[n]
    });
    layer.style(index, {
      background: 'rgba(0,0,0,0.6)',
      color: '#fff',
      borderRadius: '4px',
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
      closeBtn: 1
    });
    layer.style(index, {
      background: '#FFFBE6',
      color: 'rgba(0,0,0,0.6)',
      borderRadius: '4px',
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
    layer.style(index, {
      background: '#F6FFED',
      color: 'rgba(0,0,0,0.6)',
      borderRadius: '4px',
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
    layer.style(index, {
      background: '#FFF2F1',
      color: 'rgba(0,0,0,0.6)',
      borderRadius: '4px',
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
    layer.style(index, {
      background: '#FFFBE6',
      color: 'rgba(0,0,0,0.6)',
      borderRadius: '4px',
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
    layer.style(index, {
      background: '#E6F7FF',
      color: 'rgba(0,0,0,0.6)',
      borderRadius: '4px',
      fontSize: '14px',
      border: '1px solid #91D5FF',
      boxSizing: 'border-box'
    })
  });

  //-------------------------------操作确认框--------------------------------
  //提交
  $('.confirm_submit').click(function () {
    var content = [
      '<i class="zlit-layer-icon iconfont icon-tijiao"></i>',
      '<h3>普通操作标题</h3>',
      '<p>继续此操作的一些提示文字信息</p>'
    ].join('');
    var index = layer.open({
      type: 0,
      closeBtn: 0,
      resize: false,
      title: false,
      offset: 'auto',
      content: content,
      btn: ['提交', '取消'],
      area: ['390px', '200px'],
      success: function (layero, index) {
        layero.addClass('zlit-layer zlit-layer-submit');
      },
      yes: function () {  //按钮1的回调
        layer.closeAll();
      }
    });
    layer.style(index, {
      borderRadius: '6px',
      overflow: 'hidden',
    });
  });
  //删除
  $('.confirm_delete').click(function () {
    var content = [
      '<i class="zlit-layer-icon iconfont icon-shanchu"></i>',
      '<h3>危险操作标题</h3>',
      '<p>如删除退出等，操作按钮文字为删除退出</p>'
    ].join('');
    var index = layer.open({
      type: 0,
      closeBtn: 0,
      resize: false,
      title: false,
      offset: 'auto',
      content: content,
      btn: ['删除', '取消'],
      area: ['390px', '200px'],
      success: function (layero, index) {
        layero.addClass('zlit-layer zlit-layer-delete');
      },
      yes: function () {   //按钮1的回调
        layer.closeAll();
      }
    });
    layer.style(index, {
      borderRadius: '6px',
      overflow: 'hidden',
    });
  });
  //成功
  $('.confirm_success').click(function () {
    var content = [
      '<i class="zlit-layer-icon iconfont icon-chenggong"></i>',
      '<h3>操作成功标题</h3>',
      '<p>操作成功的结果提示信息</p>',
      '<span><em>5</em>秒后自动关闭</span>'
    ].join('');
    var t = '', nub = 5;
    var index = layer.open({
      type: 0,
      closeBtn: 0,
      resize: false,
      title: false,
      offset: 'auto',
      time: 5000,
      content: content,
      btn: ['关闭'],
      area: ['390px', '200px'],
      success: function (layero, index) {
        layero.addClass('zlit-layer zlit-layer-success');
        t = setInterval(function () {
          nub--;
          layero.find('em').text(nub);
        }, 1000);
      },
      yes: function () {   //按钮1的回调
        layer.closeAll();
      },
      end: function () {
        clearInterval(t);
      }
    });
    layer.style(index, {
      borderRadius: '6px',
      overflow: 'hidden',
    });
  });
  //失败
  $('.confirm_fail').click(function () {
    var content = [
      '<i class="zlit-layer-icon iconfont icon-shibai"></i>',
      '<h3>操作失败标题</h3>',
      '<p>操作失败的原因提示或解决方法</p>'
    ].join('');
    var index = layer.open({
      type: 0,
      closeBtn: 0,
      resize: false,
      title: false,
      offset: 'auto',
      content: content,
      btn: ['关闭'],
      area: ['390px', '200px'],
      success: function (layero, index) {
        layero.addClass('zlit-layer zlit-layer-fail');
      },
      yes: function () {   //按钮1的回调
        layer.closeAll();
      }
    });
    layer.style(index, {
      borderRadius: '6px',
      overflow: 'hidden',
    });
  });
  //气泡提示
  $('.tips_del').click(function () {
    var that = this;
    var tips = [
      '<div class="zlit-tips-box"><i class="iconfont icon-shanchu zlit-tips-icon"></i>',
      '<span class="zlit-tips-text">删除后数据不可恢复</span><div class="zlit-tips-btn">',
      '<em class="zlit-tips-btn0">取消</em><em class="zlit-tips-btn1">删除</em></div></div>'
    ].join('');
    var index = layer.tips(tips, that, {
      tips: [1, '#fff'],
      area: ['230px', '76px'],
      time: 0,
    });
    $('.zlit-tips-btn0').on('click', function () {
      //点击取消要做的事....
      layer.close(index);
    });
    $('.zlit-tips-btn1').on('click', function () {
      //点击删除要做的事....
      layer.close(index);
    });
  });

  //-------------------------------通知提醒框--------------------------------
  var toastNub1 = 0;
  $('.mess-btn1').click(function () {
    if (!toastNub1) {
      toastNub1 = layer.open({
        type: 1,        //弹窗类型
        closeBtn: 0,    //关闭右上角x号按钮
        offset: 't',    //弹窗位置
        resize: false,  //不允许窗口缩放
        title: ['普通类提醒标题', 'color:#333;border:none;text-align:center;padding:0;background:transparent;'],
        content: '<div id="mess-btn1"><p>顶部居中显示，这是一些辅助文字</p><div><button class="ctrlBtn1 layui-btn layui-btn-primary zlit-btn-main layui-btn-sm">操作一</button><button class="ctrlBtn2 layui-btn layui-btn-primary zlit-btn-main layui-btn-sm">操作二</button></div></div>',
        shade: 0,        //无背景遮罩
        anim: 1,         //动画类型
        area: ['276px', '124px'],    //弹框宽高
        end: function () {
          toastNub1 = 0;
        }
      });
      $('#mess-btn1 .ctrlBtn1').on('click', function () {    //操作一按钮点击
        layer.close(toastNub1);
      });
      $('#mess-btn1 .ctrlBtn2').on('click', function () {    //操作二按钮点击
        layer.close(toastNub1);
      });
    }
  });

  var toastNub2 = 0;
  $('.mess-btn2').click(function () {
    if (!toastNub2) {
      toastNub2 = layer.open({
        type: 1,        //弹窗类型
        offset: 't',    //弹窗位置
        closeBtn: 0,    //关闭右上角x号按钮
        resize: false,  //不允许窗口缩放
        title: ['警示类提醒标题', 'color:#fff;border:none;text-align:center;padding:0;background:transparent;'],
        content: '<div id="mess-btn2"><p>顶部居中显示，这是一些辅助文字</p><div><button class="ctrlBtn1 layui-btn layui-btn-primary zlit-btn-main layui-btn-sm">操作一</button><button class="ctrlBtn2 layui-btn layui-btn-primary zlit-btn-main layui-btn-sm">操作二</button></div></div>',
        shade: 0,        //无背景遮罩
        anim: 1,         //动画类型
        area: ['276px', '124px'],      //弹框宽高
        end: function () {
          toastNub2 = 0;
        }
      });
      layer.style(toastNub2, {
        background: 'rgba(255,0,0,0.7)'
      });
      $('#mess-btn2 .ctrlBtn1').on('click', function () {    //操作一按钮点击
        layer.close(toastNub2);
      });
      $('#mess-btn2 .ctrlBtn2').on('click', function () {    //操作二按钮点击
        layer.close(toastNub2);
      });
    }
  });
});

//文字提示
function tooltips() {
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
    fontcolor: '#fff',
    leaveCloseTime: 2000  //鼠标离开关闭时间，默认500ms
  });
  $('.d-top').dt({
    position: 't',
    content: '信息提示上对齐',
    fontcolor: '#fff'
  });
  $('.d-tr').dt({
    position: 't',
    align: 'r',
    content: '信息提示上右对齐',
    fontcolor: '#fff'
  });
  $('.d-lt').dt({
    position: 'l',
    align: 't',
    content: '信息提示左上对齐信息提示左上对齐信息提示左上对齐',
    fontcolor: '#fff',
    conAlign: 'left'
  });
  $('.d-left').dt({
    position: 'l',
    content: '信息提示左对齐信息提示左对齐信息提示左对齐',
    fontcolor: '#fff',
    conAlign: 'left'
  });
  $('.d-lb').dt({
    position: 'l',
    align: 'b',
    content: '信息提示左下对齐信息提示左下对齐信息提示左下对齐',
    fontcolor: '#fff',
    conAlign: 'left'
  });
  $('.d-rt').dt({
    position: 'r',
    align: 't',
    content: '信息提示右上对齐信息提示右上对齐信息提示右上对齐',
    fontcolor: '#fff',
    conAlign: 'left'
  });
  $('.d-right').dt({
    position: 'r',
    content: '信息提示右对齐信息提示右对齐信息提示右对齐',
    fontcolor: '#fff',
    conAlign: 'left'
  });
  $('.d-rb').dt({
    position: 'r',
    align: 'b',
    content: '信息提示右下对齐信息提示右下对齐信息提示右下对齐',
    fontcolor: '#fff',
    conAlign: 'left'
  });
  $('.d-bl').dt({
    position: 'b',
    align: 'l',
    content: '信息提示下左对齐',
    fontcolor: '#fff'
  });
  $('.d-bottom').dt({
    position: 'b',
    content: '信息提示下对齐',
    fontcolor: '#fff'
  });
  $('.d-br').dt({
    position: 'b',
    align: 'r',
    content: '信息提示下右对齐',
    fontcolor: '#fff'
  });
}

tooltips();
//---------------------------------------反馈结束----------------------------------------


//---------------------------------------其他开始----------------------------------------
//直线进度条
layui.use('element', function () {
  var element = layui.element;
  //模拟loading
  $('.loadingBtn').click(function () {
    var i = $('<i class="layui-icon layui-icon-ok-circle"></i>');
    var progressNum = 0, timer = setInterval(function () {
      progressNum = progressNum + Math.random() * 10 | 0;
      if (progressNum > 100) {
        progressNum = 100;
        clearInterval(timer);
        $('.lineDemo').addClass('zlit-progress-success1');
        $('.zlit-progress').find('span').html('');
        i.appendTo($('.zlit-progress'));
      } else {
        $('.lineDemo').removeClass('zlit-progress-success');
        $('.zlit-progress').find('i').remove();
        $('.zlit-progress').find('span').text(progressNum + '%');
      }
      element.progress('lineDemo', progressNum + '%');
    }, 300 + Math.random() * 1000);
  });
});
//圆形进度条
//进行中状态
$(".circleChart#0").zlitExtend('zlitCircleChart', {
  size: 80,  // 滚动条大小
  value: 100,  //当前进度值
  // textSize: '16px',
  onDraw: function (el, circle) {
    circle.text(Math.round(circle.value) + "%");
    //进度条100%时的状态色及文字提示
    if (Math.round(circle.value) === 100) {
      circle.text('<i class="layui-icon layui-icon-ok" style="color: #87D068;font-size: 24px;"></i>');
    }
    //失败时的状态色及文字提示
    if (Math.round(circle.value) < 0) {
      circle.text('<i class="layui-icon layui-icon-close" style="color: #EF5306;font-size: 24px;"></i>');
    }
  }
});
setInterval(function () {
  $(".circleChart#0").zlitExtend('zlitCircleChart', {
    value: Math.random() * 100
  });
}, 3000);
//失败状态如下：（value小于0时即为失败）
$(".circleChart#1").zlitExtend('zlitCircleChart', {
  size: 80,
  value: 60,
  onDraw: function (el, circle) {
    circle.text(Math.round(circle.value) + "%");
    if (Math.round(circle.value) < 0) {
      circle.text('<i class="layui-icon layui-icon-close" style="color: #EF5306;font-size: 24px;"></i>');
    }
  }
});
//模拟失败
setTimeout(function () {
  $(".circleChart#1").zlitExtend('zlitCircleChart', {
    value: -1
  });
}, 3000);
//100%成功状态如下：
$(".circleChart#2").zlitExtend('zlitCircleChart', {
  size: 80,
  onDraw: function (el, circle) {
    circle.text(Math.round(circle.value) + "%");
    if (Math.round(circle.value) === 100) {
      circle.text('<i class="layui-icon layui-icon-ok" style="color: #87D068;font-size: 24px;"></i>');
    }
  }
});

//步骤条
//水平
$('.test-step .horizontal-pro').zlitExtend('zlitStep', {
  style: 'left',
  //上一步、下一步按钮不是必须，如果没有可不传入-->
  nextBtn: $('.horizontal-btn button:last-child'),
  prevBtn: $('.horizontal-btn button:first-child')
});
//垂直
$('.test-step .vertical-pro').zlitExtend('zlitStep', {
  style: 'top',
  //上一步、下一步按钮不是必须，如果没有可不传入-->
  nextBtn: $('.vertical-btn button:last-child'),
  prevBtn: $('.vertical-btn button:first-child')
});
//锚点定位
$('.anchors_catalog').zlitExtend('zlitAnchor');
// ---------------------------------------其他结束---------------------------------------


//底部翻页
paging();


//展示代码
showCode();

//目录楼层跳转
//无滚轮事件
function catalogFun(floors, navLis, slider) {
  var isJump = true;
  navLis.click(function () {
    isJump = false;
    var index = $(this).index();
    var that = $(this);
    var t = floors.eq(index).position().top - 20;//获取每个楼层距离body的高度
    var tops = $(this).position().top;  //获取滑块距离父元素的高度
    $('html,body').animate({scrollTop: t}, function () {
      that.addClass('active').siblings().removeClass('active');
      slider.css({top: tops + 8});
      isJump = true;
    });
  });
}

//带滚滚轮事件
/*function catalogFun(floors,navLis,slider) {
  var clientH = $(window).height();
  var isJump = true;
  $(window).scroll(function () {
    if (!isJump){
      return;
    }
    var floorTops = $('html,body').scrollTop();
    console.log(floorTops);
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
    $('html,body').animate({scrollTop:t},function () {
      that.addClass('active').siblings().removeClass('active');
      slider.css({top:tops+8});
      isJump = true;
    });
  });
}*/
