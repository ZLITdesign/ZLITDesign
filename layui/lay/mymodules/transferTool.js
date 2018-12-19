/**
 * Created by 陈熠 on 2017/6/21
 * Update by Li on 2018/8/19
 * Update by SunYQ on 2018/12/13
 * email   :  228112142@qq.com
 * q群      ：     275846351
 * 穿梭框
 */
layui.define(['element', 'form', ], function (exports)
{
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form;

    var config = {
        elem: undefined,
        url: undefined,  //url
        codeName: undefined,
        enumName: undefined,
        name: "",  //form表单获取的结果值
        disabledValue: "",  //不可选,变量逗号隔开
        seletedValue: "",  //已选,变量逗号隔开
        cascade:false,  //级联
    };

    var transferTool = {

        transferToolSelectedDataId: "",
        transferToolSelectedDataTitle: "",
        transferToolUnSelectedDataId: "",
        transferToolUnSelectedDataTitle: "",
        /* 入口函数 */
        init: function (data)
        {
            var that = this;
            config = data;
            if (config.elem == undefined || config.elem == "")
            {
                layui.hint().error('初始化失败:请配置容器ID.');
                return;
            }

            if (config.url == undefined || config.url == "")
            {
                layui.hint().error('初始化失败:请配置url.');
                return;
            }
            //如果是通过表码取值
            if (config.codeName != undefined && config.codeName != "")
            {
                that.initDataByCode();
            }
            //如果是从后台获取数据
            if (config.url != undefined && config.url != "")
            {
                that.initDataByUrl();
            }
            //如果是从枚举获取数据
            if (config.enumName != undefined && config.enumName != "")
            {
                that.initDataByEnum();
            }
        },

        /**通过url获取数据 by chenyi 2017/7/5*/
        initDataByUrl: function ()
        {
            var that = this;
            $.ajax({
                url: config.url,
                type: 'get',
                dataType: "json",
                success: function (R)
                {
                    if (R.code == 0)
                    {
                        that.renderData(R);
                    } else
                    {
                        layer.alert(R.msg);
                    }
                }
            });
        },
        /**获取数据 by chenyi 2017/7/5*/
        initDataByCode: function (codeName)
        {
            /**localStorage是否已存在该数据*/
            var data = $t.getStorageItem(codeName);
            if (!data)
            {
                $.ajax({
                    url: '/getData/getCodeValues',//字典获取接口
                    data: { codeName: codeName },
                    type: 'post',
                    dataType: "json",
                    success: function (R)
                    {
                        if (R.code == 0)
                        {
                            that.renderData(R);
                            /**设置localStorage缓存*/
                            $t.setStorageItem(codeName, data);
                        } else
                        {
                            data = {};
                            alert(R.msg);
                        }
                    }
                });

            }

            return data;
        },
        /**获取数据 by chenyi 2017/7/19*/
        initDataByEnum: function (enumName)
        {
            /**localStorage是否已存在该数据*/
            var data = $t.getStorageItem(enumName);
            if (!data)
            {
                $.ajax({
                    url: '/getData/getEnum',//使用枚举渲染  可联系作者q 228112142
                    type: 'post',
                    data: { enumName: enumName },
                    dataType: "json",
                    success: function (R)
                    {
                        if (R.code == 0)
                        {
                            that.renderData(R);
                            /**设置localStorage缓存*/
                            $t.setStorageItem(enumName, data);
                        } else
                        {
                            data = {};
                            alert(R.msg);
                        }
                    }
                });
            }
            return data;
        },
        /**渲染数据 by chenyi 2017/6/21*/
        renderData: function (R)
        {
            var cyProps = config;

            //获取下拉控件的name
            var _name = config.name;

            if (_name == "")
            {
                _name = "default[]";
            }
            if (_name.indexOf("[") == -1)
            {
                _name += "[]";
            }

            //获取下拉控件的默认值
            var _value = config.seletedValue || "";
            var _values = _value.split(",");

            //获取复选框禁用的值
            var _disabled = config.disabledValue || "";
            var _disableds = _disabled.split(",");

            //是否开启级联(如果是数据源必须指定为url)
            var _cascade = config.cascade || false;
            //查询款/级联父级
            var _searchHtml = "";
            //如果开启级联
            if (_cascade === true)  //待完善
            {
                if (!config.url)
                {
                    layer.hint().error("级联模式下,请将数据源配置为url");
                } else
                {
                    _searchHtml = [
                        '<dd lay-value="" class="transfer-search-div">',
                        '<div  cyType="selectTool" cyProps="url:\'' + cyProps.url + '\'"></div>',
                        '</dd>'
                    ].join("");
                }
            }

            if (_cascade === false)
            {
                _searchHtml = [
                    '<dd lay-value="" class="transfer-search-div zlit-input-block" style="height:26px!important">',
                    '<span href="#" class="selectAll"><input type="checkbox" lay-filter="transferLeftCheckedAll" title="列表一" class="selectAllLeft" style="float:left;max-width:30px;" lay-skin="primary"></span>',
                    '<i class="layui-icon  drop-search-btn layui-icon-search"></i>',
                    '<input class="layui-input search_condition" style="width:200px;" placeholder="关键字搜索">',
                    '<i class="layui-icon  clear-btn search-clear-btn">&#x1006;</i>',
                    '<p class="selNumber"><span class="selNum"></span> / <span class="totalNum"></span></p>', /** 数据条数统计 by SunYQ  2018/12/13 */
                    '</dd>'
                ].join("");
            }

            var data = R.data;
            //选中列表
            var leftList = "";
            //未选中列表
            var rightList = "";

            if (data !== undefined)
            {
                for (var i = 0; i < data.length; i++)
                {
                    //设置默认值(向左侧侧插入元素)
                    if (_values.indexOf(data[i].id) == -1)
                    {
                        var _input = '<dd lay-value="' + data[i].id + '" lay-title="' + data[i].value + '"><input type="checkbox" lay-filter="transferLeftChecked" title="' + data[i].value + '" lay-skin="primary"></dd>';
                        //设置禁用
                        if (_disableds.indexOf(data[i].id) != -1)
                        {
                            _input = _input.replace("<input", "<input disabled ")
                        }
                        leftList += _input;
                    }
                        //向右侧插入元素
                    else
                    {
                        var _input = '<dd lay-value="' + data[i].id + '"  lay-title="' + data[i].value + '"><input type="hidden" name="' + _name + '" value="' + data[i].id + '"><input lay-filter="transferRightChecked"   type="checkbox"  title="' + data[i].value + '" lay-skin="primary"></dd>';
                        //设置禁用
                        if (_disableds.indexOf(data[i].id) != -1)
                        {
                            _input = _input.replace("<input", "<input disabled ")
                        }
                        rightList += _input;
                    }
                    $(config.elem).append(_input);
                }
            }
            /** 渲染结果**/
            var outHtml =
                $(config.elem).html([
                    '<div class="transfer-content" style="width: 810px;height: 500px;position: relative">',
                    '<div class="transfer-panel transfer-panel-left">',
                    _searchHtml,
                    '<div class="transfer-div zlit-input-block">',
                    leftList,
                    '</div>',
                    '</div>',
                    '<div class="transfer-btn transfer-to-right">',
                    '<a title="右移" lay-name="' + _name + '" class="layui-btn layui-btn-normal layui-btn-sm layui-btn-disabled"><i class="layui-icon layui-icon-right"></i></a>',
                    '</div>',
                    '<div class="transfer-btn  transfer-to-left">',
                    '<a title="左移" lay-name="' + _name + '"  class="layui-btn layui-btn-normal layui-btn-sm layui-btn-disabled"><i class="layui-icon layui-icon-left"></i></a>',
                    '</div>',
                    '<div class="transfer-panel transfer-panel-right">',

                    '<dd lay-value="" class="transfer-search-div">',
                    '<span  class="transfer-title zlit-input-block" >',
                    '<input type="checkbox" lay-filter="transferRightCheckedAll" title="列表二" class="selectAllRight" lay-skin="primary">',                       //2018/8/19 添加全选 by li
                    '</span>',
                    '<p class="selNumber"><span class="selNum"></span> / <span class="totalNum"></span></p>',  /** 数据条数统计 by SunYQ  2018/12/13 */
                    '</dd>',
                    '<div class="transfer-div zlit-input-block">',
                    rightList,
                    '</div>',
                    '</div>',
                    '</div>'
                ].join(""));
            $(config.elem).append(outHtml);

            /** 修复子数据项没有时顶部全选按钮可点击 by SunYQ  2018/12/13 */
            //当右侧没有数据时右侧全选按钮不可点击
            var rLength = $('.transfer-panel-right .transfer-div').children().length;
            if (rLength===0){
                //禁用右侧全选按钮
                $('.selectAllRight').prop({disabled:true});
            }else{
                //启用右侧全选按钮
                $('.selectAllRight').removeProp('disabled');
            }
            //当左侧没有数据时左侧全选按钮不可点击
            var Llength = $('.transfer-panel-left .transfer-div').children().length;
            if (Llength===0){
                //禁用左侧全选按钮
                $('.selectAllLeft').prop({disabled:true});
            }else{
                //启用左侧全选按钮
                $('.selectAllLeft').removeProp('disabled');
            }

            /** 数据条数统计 by SunYQ  2018/12/13 */
            //统计已选未选数据项条数
            $('.transfer-panel-right .selNumber span.totalNum').text(rLength);
            $('.transfer-panel-left .selNumber span.totalNum').text(Llength);
            $('.transfer-panel-left .selNumber span.selNum').text('0');
            $('.transfer-panel-right .selNumber span.selNum').text('0');

            form.render();

            updataValue();
        },

        getSelectedDataId: function ()
        {
            return transferTool.transferToolSelectedDataId;
        },
        getUnSelectedDataId: function ()
        {
            return transferTool.transferToolUnSelectedDataId;
        },
        getSelectedDataTitle: function ()
        {
            return transferTool.transferToolSelectedDataTitle;
        },
        getUnSelectedDataTitle: function ()
        {
            return transferTool.transferToolUnSelectedDataTitle;
        }
    }

    //穿梭框选中监听
    //左侧选中
    form.on('checkbox(transferLeftChecked)', function (data)
    {
        var $this = $(data.othis);
        var _parent = $this.parents(".transfer-content");
        var inputs = $this.parents(".transfer-div").find("dd input[type='checkbox']");
        //去掉顶部全选
        var selectAllLeft = _parent.find(".selectAllLeft");
        if (selectAllLeft.length > 0)
            if (selectAllLeft[0].checked)
            {
                selectAllLeft[0].click();
                form.render();
            }

        for (var i = 0; i < inputs.length; i++)
        {
            if ($(inputs[i]).is(':checked'))
            {
                _parent.find(".transfer-to-right a").removeClass("layui-btn-disabled");
                break;
            }
            _parent.find(".transfer-to-right a").addClass("layui-btn-disabled");
        }

        /** 数据条数统计 by SunYQ  2018/12/13 */
        //已选几条数据项
        var sLength = $('.transfer-panel-left input:checked').length;
        $('.transfer-panel-left .selNumber span.selNum').text(sLength);

        /** 修复子数据项全选中时，顶部全选按钮未选中 by SunYQ 2018/12/13 */
        //如果每一个都选中则全选按钮选中
        if (sLength===inputs.length) {
            $('.transfer-panel-left .selectAllLeft').prop({checked:true});
        }else{
            $('.transfer-panel-left .selectAllLeft').prop({checked:false});
        }
        form.render();
    });

    //右侧选中
    form.on('checkbox(transferRightChecked)', function (data)
    {
        var $this = $(data.othis);
        var _parent = $this.parents(".transfer-content");
        var inputs = $this.parents(".transfer-div").find("dd input[type='checkbox']");

        //去掉顶部全选
        var selectAllRight = _parent.find(".selectAllRight");
        if (selectAllRight.length > 0)
            if (selectAllRight[0].checked)
            {
                selectAllRight[0].click();
                form.render();
            }


        for (var i = 0; i < inputs.length; i++)
        {
            if ($(inputs[i]).is(':checked'))
            {
                _parent.find(".transfer-to-left a").removeClass("layui-btn-disabled");
                break;
            }
            _parent.find(".transfer-to-left a").addClass("layui-btn-disabled");
        }

        /** 数据条数统计 by SunYQ  2018/12/13 */
        //已选几条数据项
        var sLength = $('.transfer-panel-right input:checked').length;
        $('.transfer-panel-right .selNumber span.selNum').text(sLength);

        /** 修复子数据项全选中时，顶部全选按钮未选中 by SunYQ 2018/12/13 */
        //如果每一个都选中则全选按钮选中
        if (sLength===inputs.length) {
            $('.transfer-panel-right .selectAllRight').prop({checked:true});
        }else{
            $('.transfer-panel-right .selectAllRight').prop({checked:false});
        }
        form.render();
    });

    /**右侧全选    add by li 2018/8/19**/
    form.on('checkbox(transferRightCheckedAll)', function (data)
    {
        var $this = $(this);

        var _name = $this.attr("lay-name") || "";
        var $parent = $this.parents(".transfer-content");
        var inputs = $parent.find(".transfer-panel-right .transfer-div").find("dd input[type='checkbox']");
        var flag = false;
        for (var i = 0; i < inputs.length; i++)
        {
            if (data.elem.checked)  //全选
            {
                flag = true;
                if (!$(inputs[i]).is(':checked'))
                {
                    $(inputs[i]).click();
                }

                /** 数据条数统计 by SunYQ  2018/12/13 */
                //已选几条数据
                $('.transfer-panel-right .selNumber span.selNum').text(inputs.length);
            }
            else //反选
            {
                if ($(inputs[i]).is(':checked'))
                {
                    $(inputs[i]).click();
                }

                /** 数据条数统计 by SunYQ  2018/12/13 */
                //已选几条数据
                $('.transfer-panel-right .selNumber span.selNum').text('0');
            }
        }
        form.render();

        if (flag)
        {
            $parent.find(".transfer-to-left a").removeClass("layui-btn-disabled");
        }
        else
        {
            $parent.find(".transfer-to-left a").addClass("layui-btn-disabled");
        }
    });

    /**左全选    add by li 2018/8/19**/
    form.on('checkbox(transferLeftCheckedAll)', function (data)
    {
        var $this = $(this);

        var _name = $this.attr("lay-name") || "";
        var $parent = $this.parents(".transfer-content");
        var inputs = $parent.find(".transfer-panel-left .transfer-div").find("dd input[type='checkbox']");
        var flag = false;
        for (var i = 0; i < inputs.length; i++)
        {
            if (data.elem.checked)  //全选
            {
                flag = true;
                if (!$(inputs[i]).is(':checked'))
                {
                    $(inputs[i]).click();
                }

                /** 数据条数统计 by SunYQ  2018/12/13 */
                //已选几条数据
                $('.transfer-panel-left .selNumber span.selNum').text(inputs.length);
            }
            else //反选
            {
                if ($(inputs[i]).is(':checked'))
                {
                    $(inputs[i]).click();
                }

                /** 数据条数统计 by SunYQ  2018/12/13 */
                //已选几条数据
                $('.transfer-panel-left .selNumber span.selNum').text('0');
            }
        }
        form.render();

        if (flag)
        {
            $parent.find(".transfer-to-right a").removeClass("layui-btn-disabled");
        }
        else
        {
            $parent.find(".transfer-to-right a").addClass("layui-btn-disabled");
        }
    });

    //右移监听
    $(document).on("click", ".transfer-to-right a", function ()
    {
        var $this = $(this);
        var _name = $this.attr("lay-name") || "";
        var $parent = $this.parents(".transfer-content");
        var inputs = $parent.find(".transfer-panel-left .transfer-div").find("dd input[type='checkbox']");

        //去掉顶部全选
        var selectAllLeft = $parent.find(".selectAllLeft");
        if (selectAllLeft.length > 0)
            if (selectAllLeft[0].checked)
                selectAllLeft[0].click();

        for (var i = 0; i < inputs.length; i++)
        {
            if ($(inputs[i]).is(':checked'))
            {
                //右侧添加
                var _value = $(inputs[i]).parents("dd").attr("lay-value");
                var _title = $(inputs[i]).parents("dd").attr("lay-title");
                var _input = ['<dd lay-value="' + _value + '" lay-title="' + _title + '"><input type="hidden" name="' + _name + '" value="' + _value + '">',
                    '<input lay-filter="transferRightChecked"  ',
                    ' type="checkbox"  title="' + _title + '" lay-skin="primary"></dd>'
                ].join("");
                _value && _title && $parent.find(".transfer-panel-right .transfer-div").append(_input);
                //左侧删除
                $(inputs[i]).parents("dd").remove();
            }
        }

        updataValue();

        /** 全选/数据条数统计 by SunYQ  2018/12/13  */
        //启用右侧全选按钮
        $('.selectAllRight').removeProp('disabled');

        //如果左侧已经没有数据则禁用左侧全选按钮
        var rLength = $('.transfer-panel-right .transfer-div').children().length;
        var lLength = $('.transfer-panel-left .transfer-div').children().length;
        if (lLength===0){
            //禁用左侧侧全选按钮
            $('.selectAllLeft').prop({disabled:true});
        }else{
            //启用左侧全选按钮
            $('.selectAllLeft').removeProp('disabled');
        }

        // 剩余数据项条数
        $('.transfer-panel-left .selNumber span.totalNum').text(lLength);
        $('.transfer-panel-right .selNumber span.totalNum').text(rLength);

        //已选条数清零/保留
        var sLength = $('.transfer-panel-right input:checked').length;
        if (sLength===0){
            $('.transfer-panel-right .selNumber span.selNum').text('0');
        }else{
            $('.transfer-panel-right .selNumber span.selNum').text(sLength);
        }
        $('.transfer-panel-left .selNumber span.selNum').text('0');

         //重置按钮禁用
        $parent.find(".transfer-to-right a").addClass("layui-btn-disabled");

        form.render('checkbox');

    });

    //左移监听
    $(document).on("click", ".transfer-to-left a", function ()
    {
        var $this = $(this);
        var $parent = $this.parents(".transfer-content");
        var inputs = $parent.find(".transfer-panel-right .transfer-div").find("dd input[type='checkbox']");

        //去掉顶部全选
        var selectAllRight = $parent.find(".selectAllRight");
        if (selectAllRight.length > 0)
            if (selectAllRight[0].checked)
                selectAllRight[0].click();

        for (var i = 0; i < inputs.length; i++)
        {
            if ($(inputs[i]).is(':checked'))
            {
                //右侧添加
                var _value = $(inputs[i]).parents("dd").attr("lay-value");
                var _title = $(inputs[i]).parents("dd").attr("lay-title");
                var _input = ['<dd lay-value="' + _value + '" lay-title="' + _title + '">',
                    '<input lay-filter="transferLeftChecked"  ',
                    ' type="checkbox"  title="' + _title + '" lay-skin="primary"></dd>'
                ].join("");
                _value && _title && $parent.find(".transfer-panel-left .transfer-div").append(_input);
                //右侧删除
                $(inputs[i]).parents("dd").remove();
            }
        }
        updataValue();

        /** 全选/数据条数统计 by SunYQ  2018/12/13 */
        //启用左侧侧全选按钮
        $('.selectAllLeft').removeProp('disabled');

        //如果右侧已经没有数据则禁用右侧全选按钮
        var lLength = $('.transfer-panel-left .transfer-div').children().length;
        var rLength = $('.transfer-panel-right .transfer-div').children().length;
        if (rLength===0){
            //禁用右侧全选按钮
            $('.selectAllRight').prop({disabled:true});
        }else{
            //启用右侧全选按钮
            $('.selectAllRight').removeProp('disabled');
        }

        // 右侧剩余数据项条数
        $('.transfer-panel-left .selNumber span.totalNum').text(lLength);
        $('.transfer-panel-right .selNumber span.totalNum').text(rLength);

        //已选条数清零/保留
        var sLength = $('.transfer-panel-left input:checked').length;
        if (sLength===0){
            $('.transfer-panel-left .selNumber span.selNum').text('0');
        }else{
            $('.transfer-panel-left .selNumber span.selNum').text(sLength);
        }
        $('.transfer-panel-right .selNumber span.selNum').text('0');

        //重置按钮禁用
        $parent.find(".transfer-to-left a").addClass("layui-btn-disabled");

        form.render('checkbox');

    });

      //更新选中和未选中的值
      function updataValue()
      {
          var parent = $(config.elem);
          transferTool.transferToolSelectedDataId = "";
          transferTool.transferToolSelectedDataTitle = "";
          transferTool.transferToolUnSelectedDataId = "";
          transferTool.transferToolUnSelectedDataTitle = "";

          var selList = parent.find(".transfer-panel-right .transfer-div dd");
          if (selList.length == 0)
          {
              transferTool.transferToolSelectedDataId = "";
              transferTool.transferToolSelectedDataTitle = "";
          }
          else
          {
              for (var i = 0; i < selList.length; i++)
              {
                  var _value = $(selList[i]).attr("lay-value");
                  var _title = $(selList[i]).attr("lay-title");
                  transferTool.transferToolSelectedDataId +=_value+",";
                  transferTool.transferToolSelectedDataTitle +=_title+",";
              }
          }

          var unSelList = parent.find(".transfer-panel-left .transfer-div dd");
          if (unSelList.length == 0)
          {
             transferTool.transferToolUnSelectedDataId = "";
             transferTool.transferToolUnSelectedDataTitle = "";
          }
          else
          {
              for (var i = 0; i < unSelList.length; i++)
              {
                  var _value = $(unSelList[i]).attr("lay-value");
                  var _title = $(unSelList[i]).attr("lay-title");
                  transferTool.transferToolUnSelectedDataId +=_value+",";
                  transferTool.transferToolUnSelectedDataTitle +=_title+",";
              }
          }
      }

    /**搜索监听回车  **/
    $(document).on("keypress", " .transfer-search-div .search_condition", function (e)
    {
        e.stopPropagation();
        //是否为Enter键
        if (/^13$/.test(e.keyCode))
        {
            searchData($(this));
        }
    });


    /**搜索监听输入和复制  add by li 2018/8/19**/
    $(document).on("keyup paste", " .transfer-search-div .search_condition", function (e)
    {
        e.stopPropagation();
        searchData($(this));
    });

    /**清空搜索条件**/
    $(document).on("click", ".transfer-search-div .search-clear-btn", function (event)
    {
        $(this).prev().val("");
        searchData($(this));
    });
    /**获取搜索后的数据  **/
    function searchData($this)
    {
        var value = $($this).val();
        var $parent = $this.parents(".transfer-content");
        var dds = $parent.find(".transfer-panel-left .transfer-div").find("dd");
        //显示搜索结果菜单
        var k = value;

        /** 去除特殊字符匹配 by SunYQ  2018/12/13  */
        //去除特殊字符串
        function stripscript(str) {
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
            var result = "";
            for (var i = 0; i < str.length; i++) {
                result = result+str.substr(i, 1).replace(pattern, null);
            }
            return result;
        }
        k = stripscript(k);
        var patt = new RegExp(k);

        /** 没有数据项匹配到时进行有请提示，提高交互性。 by SunYQ  2018/12/13  */
        var dd = $('<dd class="notFound" style="text-align:center;color: #ccc;">无匹配项</dd>');
        for (var i = 0; i < dds.length; i++)
        {
            if (k == "")
            {
                $(dds[i]).show();
                $('.notFound').remove();
            }
            else if (patt.test($(dds[i]).attr("lay-title")) && $(dds[i]).attr("lay-title")!==undefined)
            {
                $(dds[i]).show();
                $('.notFound').text('搜索完毕');
            }
            else
            {
                $('.notFound').remove();  //先执行移除，以防多次加载无用dom元素
                $(dds[i]).hide();
                dd.appendTo(".transfer-panel-left .transfer-div");
            }

            /** 关闭了拼音搜索，当拼音所搜开启时，无匹配项时友情提示存在bug，所以屏蔽了拼音搜索，还请大神修正。 by SunYQ  2018/12/13  */
            /*if (PinyinMatch != undefined)  //拼音匹配,需要引入PinyinMatch.js
            {
                if (PinyinMatch.match($(dds[i]).attr("lay-title"), k)){
                    $(dds[i]).show();
                }
            }*/
        }


    }

    //输出test接口
    exports('transferTool', transferTool);
});
