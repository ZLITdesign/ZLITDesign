layui.use(['element','layer'], function(){
  var element = layui.element;
  var layer = layui.layer;

  $('.systemActive').click(function () {
    var content = [
      '<div class="layui-form-item systemBox">',
      '<h3>系统激活</h3>',
      '<label class="layui-form-label zlit-form-label">激活码</label><div class="layui-input-block">',
      '<input type="text" name="init" placeholder="请输入6位数字" class="layui-input">',
      '<button class="layui-btn zlit-btn-default zlit-btn-sm demoBtn1">确定</button>',
      '</div></div>'
    ].join('');
    layer.open({
      type: 0,
      title: false, //不显示标题
      btn: false,
      area:['390px','200px'],
      resize: false,
      content: content, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
    $('.demoBtn1').on('click',function () {
      //点击确定要做的事
      //模拟ajax
      layer.load();
      setTimeout(function () {
        layer.closeAll();
      },2000);
    })
  });
});



//底部翻页
paging();

//展示代码折叠面板
showCode();