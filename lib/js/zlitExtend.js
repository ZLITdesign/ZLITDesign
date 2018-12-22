/*
* 扩展/修改layui常用功能
* By SunYQ  2018/12/21
* */
(function ($) {
  var methods = {
    /*
    * 初始化函数，提示用户需要传入参数执行对应的方法
    * */
    init: function (options) {
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.ready(function () {
          var index = layer.msg('参数啥也没有传入，你到底想让我干嘛，怎么这么的皮中皮！！！！！！！', {
            shade: 0.3
          });
          layer.style(index, {
            background: '#fff',
            color: '#333'
          });
        });
      });
    },

    /*
    * 侧边导航
    * isOpen   :   是否开启手风琴导航效果，默认关闭，Boolean类型
    * */
    zlitSlideNav: function (options) {
      var setting = $.extend({
        isOpen: false
      }, options);
      var flag = true;  //防止点击过快
      this.find('li').click(function () {
        var isHas = $(this).find('dl').is('dl');   //检测是否存在子级
        if (isHas) {
          if (!flag) {
            return;
          }
          flag = false;
          if ($(this).height() !== 36) {
            $(this).find('dl').stop().slideUp(300, function () {
              flag = true;
            }).end().find('i').css({transform: 'rotateZ(0)'});
          } else {
            $(this).find('dl').stop().slideDown(300, function () {
              flag = true;
            }).end().find('i').css({transform: 'rotateZ(90deg)'});
          }
          if (setting.isOpen) {
            $(this).siblings().find('dl').slideUp().end().find('i').css({transform: 'rotateZ(0)'});
          }
        } else {
          $(this).addClass('active').siblings().removeClass('active').find('dd').removeClass('active');
        }
      });
      this.find('.zlit-nav-child dd').click(function (e) {
        e.stopPropagation();
        $(this).addClass('active').siblings().removeClass('active').end().closest('li').siblings().find('dd').removeClass('active').end().removeClass('active');
      });
    },

    /*
    * tab选项卡
    * */
    zlitTabNav: function () {
      //启用选项卡
      layui.use('element', function () {
        var element = layui.element;
      });
      if (this.hasClass('tab-style-1')) {
        //tab标签导航滑块
        this.find('.layui-tab-title li').click(function () {
          var lefts = $(this).position().left;
          $('.tab-style-1 .layui-tab-title .slider').css({left: lefts + 15});
        });
      }
    },

    /*
    * 标准分页器、简易分页器请直接使用layui中的分页器
    * 此插件为迷你分页器样式
    * limit   :   一页显示几条数据，默认10，Number类型
    * count   :   总共多少条数据，默认10，Number类型
    * */
    zlitMiniPage: function (options) {
      var setting = $.extend({
        limit: 10,
        count: 10
      }, options);

      var that = this;
      var curr_page = 1;    //当前页码
      var max_page = Math.ceil(setting.count / setting.limit);    //总页码
      var prev_page = this.find('.prev_page');     //上一页
      var next_page = this.find('.next_page');     //下一页
      this.find('.current_page').text(curr_page);
      this.find('.max_page').text(max_page);

      //如果只显示一页数据，按钮不可点击
      if (curr_page === 1 && max_page === 1) {
        prev_page.addClass('disabled');
        next_page.addClass('disabled');
        return;
      }

      //下一页
      next_page.click(function () {
        curr_page++;
        if (curr_page < max_page) {
          that.find('.current_page').text(curr_page);
          prev_page.removeClass('disabled');
        } else if (curr_page === max_page) {
          $(this).addClass('disabled');
          prev_page.removeClass('disabled');
          that.find('.current_page').text(curr_page);
        } else if (curr_page > max_page) {
          that.find('.current_page').text(max_page);
          $(this).addClass('disabled');
          curr_page = max_page;
        }
      });

      //上一页
      prev_page.click(function () {
        curr_page--;
        if (curr_page > 1) {
          that.find('.current_page').text(curr_page);
          next_page.removeClass('disabled');
        } else if (curr_page === 1) {
          $(this).addClass('disabled');
          next_page.removeClass('disabled');
          that.find('.current_page').text(curr_page);
        } else if (curr_page < 1) {
          that.find('.current_page').text(1);
          $(this).addClass('disabled');
          curr_page = 1;
        }
      });
    },

    /*
    * 菜单按钮
    * uploadFiles   :   layui上传方法,必传参数
    * */
    zlitMenuBtn: function (options) {
      var flag = true;   //防止点击过快
      var that = this;
      var setting = $.extend({
        uploadFiles: function () {
        }
      }, options);

      this.find('.zlit-menu-btn-change').click(function (e) {
        //隐藏/显示按钮功能区
        e.stopPropagation();   //组织冒泡事件流
        if (flag) {
          that.find('.zlit-menu-btn').addClass('layui-anim-scaleSpring').css({display: 'block'});
          $(this).css({transform: 'rotateZ(180deg)'});
          flag = false;
        } else {
          that.find('.zlit-menu-btn').removeClass('layui-anim-scaleSpring').css({display: 'none'});
          $(this).css({transform: 'rotateZ(0deg)'});
          flag = true;
        }
      });
      this.find('.zlit-menu-btn li').on('click', function (e) {
        e.stopPropagation();   //组织冒泡事件流
        var str, ids, strId;
        $(this).addClass('active').siblings().removeClass('active');
        str = $(this).text();
        ids = $(this).attr('data-id');
        that.find('.zlit-menu-btn-text').text(str);
        that.prop('id', ids);
        that.find('.zlit-menu-btn').removeClass('layui-anim-scaleSpring').css({display: 'none'});
        that.find('.zlit-menu-btn-change').css({transform: 'rotateZ(0deg)'});
        flag = true;
        //切换按钮功能
        strId = that.attr('id');
        if (strId === 'files-imgs') {
          setting.uploadFiles('#files-imgs');                   //图片上传
        } else if (strId === 'files-file') {
          setting.uploadFiles('#files-file', 'file');            //普通文件上传
        } else if (strId === 'files-zip') {
          setting.uploadFiles('#files-zip', 'file', 'zip|rar|7z');//压缩文件上传
        } else if (strId === 'files-video') {
          setting.uploadFiles('#files-video', 'video');          //视频上传
        } else if (strId === 'files-audio') {
          setting.uploadFiles('#files-audio', 'audio');          //音频上传
        }
        that.find('.zlit-menu-btn-show').text('').find('span').css({display: 'none'});
      });
    },

    /*
    * 数字输入
    * */
    zlitNumInput: function () {
      this.find('.zlit-number-reduce').mousedown(function () {
        var val = Number($(this).next().val());
        val--;
        if (val <= 0) {
          $(this).next().val(0);
        } else {
          $(this).next().val(val);
        }
      });
      this.find('.zlit-number-add').mousedown(function () {
        var val = Number($(this).prev().val());
        val++;
        if (val >= 999999) {
          $(this).prev().val(999999);
        } else {
          $(this).prev().val(val);
        }
      });
    },

    /*
    * 添加、删除、修改标签
    * 数据请求待确认
    *
    * */
    zlitLabel: function (options) {
      /*var setting = $.extend({
        name: '',
        delUrl: '',
        addUrl: '',
        updateUrl: '',
        delSuccess: function () {
        },
        addSuccess: function () {
        },
        updateSuccess: function () {
        },
      }, options);*/

      //删除标签
      this.on('click', '.zlit-label-single i', function () {
        var that = $(this);
        $(this).closest('.zlit-label-single').animate({width: 0, padding: '6px 0'}, 200, function () {
          that.closest('.zlit-label-single').remove();
        });
      });
      //添加标签
      this.on('click', '.zlit-label-add', function () {
        var div = $('<div></div>'),
          input = $('<input>'),
          span = $('<span></span>'),
          i = $('<i></i>');
        div.css({
          padding: '6px 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }).insertBefore($(this).closest('.zlit-label-add'));
        i.css({position: 'absolute'}).addClass('layui-icon layui-icon-close');
        span.css({display: 'none'}).appendTo(div);
        input.val('新标签').css({width: '48px'}).appendTo(div);
        input.select();
        div.animate({padding: '6px 30px 6px 10px'}, 200, function () {
          i.appendTo(div);
          div.addClass('zlit-label-single');
        });
        input.blur(function () {
          if (input.val() === '') {
            span.css({display: 'inline', color: '#333'}).text('新标签');
          } else {
            span.css({display: 'inline', color: '#333'}).text(input.val());
          }
          $(this).remove();
        });
      });
      //修改标签
      this.on('click', '.zlit-label-single span', function () {
        var w = $(this).width();
        var input = $('<input>');
        var that = $(this);
        input.val($(this).text()).css({color: '#333', width: w}).insertBefore($(this));
        $(this).css({display: 'none'});
        input[0].focus();
        input.select();
        input.blur(function () {
          if (input.val() === '') {
            that.css({display: 'inline', color: '#333'}).text('新标签');
          } else {
            that.css({display: 'inline', color: '#333'}).text(input.val());
          }
          $(this).remove();
        });
      });
    },

    /*
    * 圆形进度条
    * color              :  进度条颜色
    * backgroundColor    :  进度条背景色
    * background         :  进度条背景色是否开启，默认开启
    * speed              :  动画速度
    * widthRatio         :  宽度比例
    * value              :  进度条的值
    * unit               :  单位，默认percent
    * counterclockwise   :  进度条逆时针动画方向，默认false，即顺时针
    * size               :  进度条大小
    * startAngle         :  进度条起点角度
    * animate            :  是否开启动画，默认true开启
    * backgroundFix      :  消除锯齿
    * lineCap            :  进度条长度值四舍五入
    * animation          :  动画方式
    * text               :  显示进度值文字，默认true，显示
    * redraw             :  是否每次进行重绘进度条
    * cAngle             :  从距离起点位置的角度开始绘制进度条
    * textCenter         :  进度条的文字描述，默认在圆环内居中显示
    * textSize           :  固定文字字体大小，不随进度条大小发生改变，默认false
    * textWeight         :  文字字体加粗样式，默认normal不加粗
    * textFamily         :  文字字体
    * relativeTextSize   :  文字随进度条大小改变的比例
    * autoCss            :  css样式开启或关闭，默认开启
    * onDraw             :  进度条回调函数
    * */
    zlitCircleChart: function (options) {
      var defaults = {
        color: "#428EE9",
        backgroundColor: "#e6e6e6",
        background: true,
        speed: 2000,
        widthRatio: 0.2,
        value: 66,
        unit: 'percent',
        counterclockwise: false,
        size: 110,
        startAngle: 0,
        animate: true,
        backgroundFix: true,
        lineCap: "round",
        animation: "easeInOutCubic",
        text: true,
        redraw: false,
        cAngle: 0,
        textCenter: true,
        textSize: false,
        textWeight: 'normal',
        textFamily: 'sans-serif',
        relativeTextSize: 1 / 7,
        autoCss: true,
        onDraw: false
      };

      //进度条计算方法
      Math.linearTween = function (t, b, c, d) {
        return c * t / d + b;
      };
      Math.easeInQuad = function (t, b, c, d) {
        t /= d;
        return c * t * t + b;
      };
      Math.easeOutQuad = function (t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
      };
      Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return c / 2 * t * t + b;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };
      Math.easeInCubic = function (t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
      };
      Math.easeOutCubic = function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
      };
      Math.easeInOutCubic = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return c / 2 * t * t * t + b;
        }
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      };
      Math.easeInQuart = function (t, b, c, d) {
        t /= d;
        return c * t * t * t * t + b;
      };
      Math.easeOutQuart = function (t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
      };
      Math.easeInOutQuart = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return c / 2 * t * t * t * t + b;
        }
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
      };
      Math.easeInQuint = function (t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
      };
      Math.easeOutQuint = function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
      };
      Math.easeInOutQuint = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return c / 2 * t * t * t * t * t + b;
        }
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
      };
      //定义动画计算方法
      Math.easeInSine = function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
      };
      Math.easeOutSine = function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b
      };
      Math.easeInOutSine = function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
      };
      Math.easeInExpo = function (t, b, c, d) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
      };
      Math.easeOutExpo = function (t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b
      };
      Math.easeInOutExpo = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
      };
      Math.easeInCirc = function (t, b, c, d) {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
      };
      Math.easeOutCubic = function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
      };
      Math.easeInOutCubic = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return c / 2 * t * t * t + b;
        }
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      };
      Math.easeOutCirc = function (t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t * t) + b;
      };
      Math.easeInOutCirc = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }
        t -= 2;
        return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
      };

      var Circle = function (pos, bAngle, eAngle, cAngle, radius, lineWidth, sAngle, settings) {
        var circles = Object.create(Circle.prototype);
        circles.pos = pos;
        circles.bAngle = bAngle;
        circles.eAngle = eAngle;
        circles.cAngle = cAngle;
        circles.radius = radius;
        circles.lineWidth = lineWidth;
        circles.sAngle = sAngle;
        circles.settings = settings;
        return circles;
      };

      Circle.prototype = {
        onDraw: function (el) {
          if (this.settings.onDraw !== false) {
            var copy = Object.assign({}, this);

            var units = {
              'percent': rToP,
              'rad': function (e) {
                return e
              },
              'default': rToD
            };

            copy.value = (units[this.settings.unit] || units['default'])(copy.cAngle);
            copy.text = function (text) {
              return setCircleText(el, text)
            };
            copy.settings.onDraw(el, copy);

            if (Math.round(copy.value) === 100) {  //百分百的颜色
              copy.settings.color = '#87D068';
            } else if (Math.round(copy.value) < 100 && Math.round(copy.value) >= 0) {
              copy.settings.color = '#428EE9';
            }
            if (Math.round(copy.value) < 0) {  //失败的颜色
              copy.settings.color = '#EF5306';
            }
          }
        },
        drawBackground: function (ctx) {
          ctx.beginPath();
          ctx.arc(this.pos, this.pos, this.settings.backgroundFix
            ? this.radius * 0.9999
            : this.radius, 0, 2 * Math.PI);

          //ctx.lineWidth  进度条宽度
          ctx.lineWidth = this.settings.backgroundFix
            ? this.lineWidth * 0.7
            : this.lineWidth;
          ctx.strokeStyle = this.settings.backgroundColor;
          ctx.stroke();
        },
        draw: function (ctx) {
          ctx.beginPath();
          if (this.settings.counterclockwise) {
            var k = 2 * Math.PI;
            ctx.arc(this.pos, this.pos, this.radius, k - this.bAngle, k - (this.bAngle + this.cAngle), this.settings.counterclockwise);
          } else {
            ctx.arc(this.pos, this.pos, this.radius, this.bAngle, this.bAngle + this.cAngle, this.settings.counterclockwise);
          }
          ctx.lineWidth = .7 * this.lineWidth;
          ctx.lineCap = this.settings.lineCap;
          ctx.strokeStyle = this.settings.color;
          ctx.stroke();
        },
        animate: function (el, ctx, time, startTime, move/* 逆时针方向移动 */) {
          var mspf = new Date().getTime() - time; //动画帧
          if (mspf < 1) {
            mspf = 1;
          }
          if ((time - startTime < this.settings.speed * 1.05)/* 时间不超过 */ && (!move && (this.cAngle) * 1000 <= Math.floor((this.eAngle) * 1000)/* 顺时针方向移动 */ || move && (this.cAngle) * 1000 >= Math.floor((this.eAngle) * 1000)/* 逆时针方向移动 */)) {
            this.cAngle = Math[this.settings.animation]((time - startTime) / mspf, this.sAngle, this.eAngle - this.sAngle, this.settings.speed / mspf);
            ctx.clearRect(0, 0, this.settings.size, this.settings.size);
            if (this.settings.background) {
              this.drawBackground(ctx);
            }
            this.draw(ctx);
            this.onDraw(el);
            time = new Date().getTime();
            var that = this;
            rAF(
              function () {
                return that.animate(el, ctx, time, startTime, move);
              }
            );
          } else {
            this.cAngle = this.eAngle;
            ctx.clearRect(0, 0, this.settings.size, this.settings.size);
            if (this.settings.background) {
              this.drawBackground(ctx);
            }
            this.draw(ctx);
            this.setCurrentAnglesData(el);
          }
        },
        setCurrentAnglesData: function (el) {
          var units = {
            'percent': rToP,
            'rad': function (e) {
              return e;
            },
            'default': rToD
          };

          var f = (units[this.settings.unit] || units['default']);

          el.data("current-c-angle", f(this.cAngle));
          el.data("current-start-angle", f(this.bAngle));
        }
      };


      var setCircleText = function (el, text) {
        el.data("text", text);
        $(".circleChart_text", el).html(text);
      }

      var rToD = function (rad) {
        return rad / Math.PI * 180
      };
      var dToR = function (deg) {
        return deg / 180 * Math.PI
      };
      var pToR = function (percent) {
        return dToR(percent / 100 * 360)
      };
      var rToP = function (rad) {
        return rToD(rad) / 360 * 100
      };

      var rAF = (
        function (c) {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(c, 1000 / 60);
          }
        })();

      return this.each(function (idx, element) {
        var el = $(element);
        var cache = {};
        var _data = el.data();
        for (var key in _data) {
          if (_data.hasOwnProperty(key) && key.indexOf('_cache_') === 0) {
            if (defaults.hasOwnProperty(key.substring(7))) {
              cache[key.substring(7)] = _data[key];
            }
          }
        }

        var settings = Object.assign({}, defaults, cache, _data, options);
        for (var key in settings) {
          if (key.indexOf('_cache_') !== 0)
            el.data('_cache_' + key, settings[key]);
        }
        if (!$("canvas.circleChart_canvas", el).length) {
          el.append(function () {
            return $('<canvas/>', {'class': 'circleChart_canvas'})
              .prop({width: settings.size, height: settings.size})
              .css(settings.autoCss ? {
                "margin-left": "auto",
                "margin-right": "auto",
                "display": "block"
              } : {});
          });
        }
        if (!$("p.circleChart_text", el).length) {
          if (settings.text !== false) {
            el.append("<p class='circleChart_text'>" + settings.text + "</p>");
            if (settings.autoCss) {
              if (settings.textCenter) {
                $("p.circleChart_text", el).css({
                  "position": "absolute",
                  "line-height": (settings.size + "px"),
                  "top": 0,
                  "width": "100%",
                  "margin": 0,
                  "padding": 0,
                  "text-align": "center",
                  "font-size": settings.textSize !== false
                    ? settings.textSize
                    : settings.size * settings.relativeTextSize,
                  "font-weight": settings.textWeight,
                  "font-family": settings.textFamily
                });
              } else {
                $("p.circleChart_text", el).css({
                  "padding-top": "5px",
                  "text-align": "center",
                  "font-weight": settings.textWeight,
                  "font-family": settings.textFamily,
                  "font-size": settings.textSize !== false
                    ? settings.textSize
                    : settings.size * settings.relativeTextSize
                });
              }
            }
          }
        }

        if (settings.autoCss) {
          el.css("position", "relative");
        }

        if (!settings.redraw) {
          settings.cAngle = settings.currentCAngle
            ? settings.currentCAngle
            : settings.cAngle;
          settings.startAngle = settings.currentStartAngle
            ? settings.currentStartAngle
            : settings.startAngle;
        }

        var c = $("canvas", el).get(0);
        var ctx = c.getContext("2d");

        var units = {
          'percent': pToR,
          'rad': function (e) {
            return e
          },
          'default': dToR
        };

        var f = (units[settings.unit] || units['default']);

        var bAngle = f(settings.startAngle);
        var eAngle = f(settings.value);
        var cAngle = f(settings.cAngle);

        var pos = settings.size / 2;
        var radius = pos * (1 - settings.widthRatio / 2);
        var lineWidth = radius * settings.widthRatio;
        var circle = Circle(pos, bAngle, eAngle, cAngle, radius, lineWidth, cAngle, settings);
        el.data("size", settings.size);
        if (!settings.animate) {
          circle.cAngle = circle.eAngle;
          rAF(function () {
            if (settings.background) {
              circle.drawBackground(ctx);
            }
            if (settings.value !== 0) {
              circle.draw(ctx);
              circle.onDraw(el);
              circle.setCurrentAnglesData(el);
            } else {
              ctx.clearRect(0, 0, this.settings.size, this.settings.size);
              if (circle.settings.background) {
                circle.drawBackground(ctx);
              }
            }
          });
        } else {
          if (settings.value !== 0) {
            circle.animate(el, ctx, new Date().getTime(), new Date().getTime(), cAngle > eAngle);
          } else {
            rAF(function () {
              ctx.clearRect(0, 0, this.settings.size, this.settings.size);
              if (circle.settings.background) {
                circle.drawBackground(ctx);
              }
            });
          }
        }
      });
    },

    /*
    * 步骤条
    * steps     :   步骤条，jQuery对象元素
    * stepCon   :   每一步对应的页面，jQuery对象元素
    * style     :   字符串类型，传入‘left’则为水平步骤条，传入‘top’则为垂直步骤条
    * stepDesc  :   步骤条序号及文字区域的，jQuery对象元素
    * next      :   下一步按钮，默认值null,即没有按钮可不传入，jQuery对象元素
    * prev      :   上一步按钮，默认值null,即没有按钮可不传入，jQuery对象元素
    * */
    zlitStep: function (options) {
      var setting = $.extend({
        steps: '',
        stepCon: '',
        style: 'left',
        stepDesc: '',
        next: null,
        prev: null
      }, options);

      var n = 0,          //依赖索引值
        flag = true;    //防止过快点击
      //下一步按钮
      if (setting.next) {
        setting.next.click(function () {
          if (!flag) {
            return;
          }
          flag = false;
          n++;
          if (n != 0) {
            setting.prev.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
          }
          if (n >= setting.steps.length) {
            n = setting.steps.length - 1;
            flag = true;
            return;
          }
          if (setting.steps.eq(n).index() === setting.steps.length - 1) {
            $(this).removeClass('zlit-btn-default').addClass('layui-btn-disabled zlit-btn-disabled');
          }
          setting.stepCon.eq(n).addClass('active').siblings().removeClass('active');
          setting.steps.eq(n - 1).find('.step-child').animate({[setting.style]: 0}, function () {
            setting.steps.eq(n).find('.step-circle').addClass('step-circle-active').end().find('.step-con').addClass('step-con-active').text('进行中');
            setting.steps.eq(n - 1).find('.step-circle').removeClass('step-circle-active').addClass('step-circle-end').find('i').text('').addClass('layui-icon-ok');
            setting.steps.eq(n - 1).find('.step-con').removeClass('step-con-active').text('已完成');
            flag = true;
          });
        });
      }
      //上一步按钮
      if (setting.prev) {
        setting.prev.click(function () {
          if (!flag) {
            return;
          }
          flag = false;
          n--;
          if (n <= setting.steps.length - 1) {
            setting.next.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
          }
          if (n < 0) {
            n = 0;
            flag = true;
            return;
          }
          if (setting.steps.eq(n).index() === 0) {
            $(this).removeClass('zlit-btn-default').addClass('layui-btn-disabled zlit-btn-disabled');
          }
          setting.stepCon.eq(n).addClass('active').siblings().removeClass('active');
          setting.steps.eq(n).find('.step-child').animate({[setting.style]: -100 + '%'}, function () {
            setting.steps.eq(n + 1).find('.step-circle').removeClass('step-circle-active').end().find('.step-con').removeClass('step-con-active').text('待完成');
            setting.steps.eq(n).find('.step-circle').removeClass('step-circle-end').addClass('step-circle-active').find('i').text(n + 1).removeClass('layui-icon-ok');
            setting.steps.eq(n).find('.step-con').addClass('step-con-active').text('进行中');
            flag = true;
          });
        });
      }
      //点击步骤序号及文字区域
      setting.stepDesc.click(function () {
        if (!flag) {
          return;
        }
        flag = false;
        var k = $(this).closest('.step-single').index(),
          stepBox = $(this).closest('.step-single').siblings(),
          that = $(this);
        n = k;
        if (setting.next && setting.prev) {
          if (n < setting.steps.length - 1 && n > 0) {
            setting.next.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
            setting.prev.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
          } else if (n === setting.steps.length - 1) {
            setting.next.removeClass('zlit-btn-default').addClass('layui-btn-disabled zlit-btn-disabled');
            setting.prev.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
          } else if (n === 0) {
            setting.next.removeClass('layui-btn-disabled zlit-btn-disabled').addClass('zlit-btn-default');
            setting.prev.removeClass('zlit-btn-default').addClass('layui-btn-disabled zlit-btn-disabled');
          }
        }
        setTimeout(function () {
          that.closest('.step-single').find('.step-circle').removeClass('step-circle-end').addClass('step-circle-active')
            .end().find('.step-con').addClass('step-con-active').text('进行中')
            .end().find('.step-child').animate({[setting.style]: -100 + '%'})
            .end().find('i').removeClass('layui-icon-ok').text(k + 1);
          setting.stepCon.eq(k).addClass('active').siblings().removeClass('active');
        }, 300);
        stepBox.each(function (i, val) {
          var j = $(val).index();
          if (j < k) {
            $(val).find('.step-child').animate({[setting.style]: 0}, function () {
              $(val).find('.step-circle').removeClass('step-circle-active').addClass('step-circle-end').find('i').text('').addClass('layui-icon-ok');
              $(val).find('.step-con').removeClass('step-con-active').text('已完成');
              flag = true;
            });
          } else if (j > k) {
            $(val).find('.step-child').animate({[setting.style]: -100 + '%'}, function () {
              flag = true;
            });
            setTimeout(function () {
              $(val).find('.step-circle').removeClass('step-circle-active step-circle-end').find('i').text(j + 1).removeClass('layui-icon-ok');
              $(val).find('.step-con').removeClass('step-con-active').text('待完成');
            }, 300);
          }
        });
      });
    },

    /*
    * 锚点定位
    * */
    zlitAnchor: function () {
      var navLis = this.find('ul.anchors li');
      var slider = this.find('.anchors_slider');
      navLis.click(function () {
        var tops = $(this).position().top;  //获取滑块距离父元素的高度
        $(this).addClass('active').siblings().removeClass('active');
        slider.css({top:tops+8});
      });
    }
  };
  $.fn.zlitExtend = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method' + method + 'does not exist on jQuery.tooltip');
    }
  }
})(jQuery);
