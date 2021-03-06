var $ = require('zepto');
if (!model) var model = function () {
    function a() {
        var a = this.options.open.minZIndex;
        return $(".ltCont .ltLayer").each(function () {
            var b = parseInt($(this).css("z-index"));
            b > a && (a = b)
        }), a
    }
    var b = function () {
        var a = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var b in a) if (void 0 !== document.documentElement.style[b]) return a[b]
    }(),
        c = {
            is_options_valid: function (a) {
                return a && a.model && 1 === a.model[0].nodeType ? !0 : !1
            },
            switchClass: function (a, b) {
                this.removeClass(a).addClass(b)
            }
        }, d = {
            model: null,
            dimens: {
                height: "auto",
                width: "auto"
            },
            resetForm: !1,
            fixed: !1,
            zLayer: !0,
            open: {
                minZIndex: 999,
                success: function () {},
                event: "click",
                selector: null,
                anim: ""
            },
            close: {
                esc: !0,
                layer: !0,
                nodes: {
                    target: "",
                    event: "click",
                    selector: ""
                },
                success: function () {},
                returnFocus: !0,
                anim: ""
            }
        }, e = function () {
            var a = $('<div class="ltCont close"></div>').attr("tabIndex", 0),
                b = $('<div class="ltLayer close"></div>');
            return a.append(b), $(window).on("resize", function () {
                if (e.stack.length) {
                    var a = e.stack[0];
                    a.resize()
                }
            }), $("html").keydown(function (a) {
                27 === a.keyCode && e.stack.length && e.stack[0].options.close.esc && e.stack[0].close()
            }), b.click(function (a) {
                a.stopPropagation(), e.stack[0].close_target = this, e.stack.length && e.stack[0].options.close.layer && e.stack[0].close()
            }), {
                stack: [],
                cont: a,
                layer: b
            }
        }();
    $("body").append(e.cont);
    var f = function () {
        this.options.model.css({
            position: this.options.fixed ? "fixed" : "absolute",
            width: this.options.dimens.width,
            height: this.options.dimens.height
        })
    }, g = function (a) {
        this.options = $.extend(!0, {}, this.default_opt, a)
    }, h = function () {
        var a = this.options.model.parent();
        a.hasClass("ltCont") || e.cont.append(this.options.model)
    }, i = {
        open: function () {
            var a = [this.options.close.anim, this.options.open.anim];
            c.switchClass.apply(this.options.model, a)
        },
        close: function () {
            var a = [this.options.open.anim, this.options.close.anim];
            c.switchClass.apply(this.options.model, a)
        }
    }, j = function () {
        var a = document.documentElement.scrollTop,
            b = this.options.open.firstFocus;
        b ? b.focus() : e.cont.focus(), document.documentElement.scrollTop = a
    }, k = function () {
        if (this.options.resetForm) for (var a = this.options.model.find("form"), b = 0; b < a.length; b++) a[b].reset()
    }, l = function () {
        if (!e.stack.length) {
            var a = this.options.close.returnFocus;
            a === !0 ? this.options.trigger.focus() : $(a).focus()
        }
    }, m = function () {
        if (this.options.model.removeClass("model_open"), e.stack.length) {
            var a = e.stack[0];
            this.options.zLayer && e.layer.css("zIndex", a.options.model.css("zIndex"))
        } else e.cont.addClass("close");
        l.call(this), k.call(this), this.options.close.success.call(this, this.close_target)
    }, n = function () {
        var a = this;
        a.state = "close", this.openEventHandler = function () {
            a.open()
        }, this.options.trigger.on(this.options.open.event + "." + this.pluginName, this.options.open.selector, this.openEventHandler), o.call(this, this.options.close.nodes)
    }, o = function (a) {
        var b = this;
        this.close_target = null;
        var c = null;
        "array" === $.type(a) ? (c = $.extend({}, this.default_opt.close.nodes), c.target = a) : c = {
            target: $(a.target),
            event: a.event,
            selector: a.selector
        }, c.target.on(c.event, c.selector, function () {
            b.close()
        })
    }, p = function (a) {
        g.call(this, a), this.init_structure(), f.call(this), n.call(this), this.options.model.addClass(this.options.close.anim)
    }, q = function () {
        this.options.trigger.off(this.options.open.event + "." + this.pluginName)
    }, r = function () {
        this.options.trigger.off(this.options.open.event, this.openEventHandler)
    }, s = function () {
        this.options.trigger.on(this.options.open.event, this.openEventHandler)
    }, t = function () {
        model.lt.cont.css({
            width: "auto",
            height: "auto"
        });
        var a = $(document).height(),
            b = $(document).width();
        model.lt.cont.css({
            width: b + "px",
            height: a + "px"
        })
    }, u = function () {
        this.state = "open", this.options.model.addClass("model_open"), this.options.model[0].model = this;
        var b = a.call(this);
        this.options.zLayer && e.layer.css("zIndex", b + 3), "drawer" != this.pluginName && this.options.model.css("zIndex", b + 3), e.stack.length || (e.cont.css("zIndex", b + 1), this.util.switchClass.call(e.layer, "close", "open"), e.cont.removeClass("close")), k.call(this), -1 === $.inArray(this, e.stack) && e.stack.unshift(this), this.resize(), i.open.call(this), j.call(this), this.options.open.success.call(this)
    }, v = function (a, c) {
        a = a || $(e.stack).index(this), !e.stack.length || 0 > a || (this.state = "close", this.options.model[0].model = this, e.stack.splice(a, 1), b && !c && this.options.open.anim ? i.close.call(this) : m.call(this), e.stack.length || this.util.switchClass.call(e.layer, "open", "close"))
    }, w = function (a) {
        function b(a, b) {
            var c = b.data("model");
            c && c.options && c.options.model[0] === a.model[0] && q.call(this), a.trigger = b, p.call(this, a)
        }
        var c = function () {};
        c.prototype = model;
        var d = new c;
        return d.pluginName = a, b.prototype = d, b
    };
    return {
        isTransitionEndSupported: b,
        pluginName: "",
        state: "close",
        util: c,
        lt: e,
        reInit: q,
        close_returnFocus: l,
        getNewModel: w,
        open: u,
        close: v,
        on: s,
        off: r,
        resize: t,
        default_opt: d,
        init_structure: h,
        closeTransEnd_cb: m
    }
}();
! function (a) {
    var b = "drawer",
        c = {
            dir: "right",
            open: {
                anim: "sideIn"
            },
            zLayer: !1,
            close: {
                anim: "sideOut"
            }
        }, d = model.getNewModel(b);
    d.prototype.default_opt = a.extend(!0, {}, model.default_opt, c), d.prototype.init_structure = function () {
        model.init_structure.call(this), this.options.model.addClass(this.options.dir)
    }, d.prototype.resize = function () {
        parseInt(a("body").css("minHeight") || 0);
        model.lt.cont.css({
            width: "auto",
            height: "auto"
        });
        var b = a(window).height(),
            c = a(document).width();
        model.lt.cont.css({
            width: c + "px",
            height: b + "px"
        })
    };
    var e = function () {
        model.open.call(this), a("html,body").addClass("drawerDisableScroll")
    }, f = function () {
        model.close.call(this), 0 == model.lt.stack.length && a("html,body").removeClass("drawerDisableScroll")
    };
    a.fn.drawer = function (b) {
        var c = null,
            g = null;
        if (model.util.is_options_valid(b)) {
            a.each(this, function (h, i) {
                var j = a(i);
                c = new d(b, j), c.open = function () {
                    e.call(c)
                }, c.close = function () {
                    f.call(c)
                }, g = {
                    open: c.open,
                    close: c.close,
                    on: function () {
                        c.on()
                    },
                    off: function () {
                        c.off()
                    }
                }, j[0].model = g
            });
            var h = b.model;
            h.on(model.isTransitionEndSupported, function () {
                h.hasClass(c.options.close.anim) && model.closeTransEnd_cb.call(h[0].model)
            })
        }
        return this[0].model || c
    }
}(Zepto);

/*End of Drawer Model*/

