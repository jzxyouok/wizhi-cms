function _gambit_microtime() {
    return (new Date).getTime() / 1e3
}
if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");
+function ($) {
    "use strict";
    var t = $.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), +function ($) {
    "use strict";
    function t(t) {
        var e, i = t.attr("data-target") || (e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
        return $(i)
    }

    function e(t) {
        return this.each(function () {
            var e = $(this), a = e.data("bs.collapse"), r = $.extend({}, i.DEFAULTS, e.data(), "object" == typeof t && t);
            !a && r.toggle && "show" == t && (r.toggle = !1), a || e.data("bs.collapse", a = new i(this, r)), "string" == typeof t && a[t]()
        })
    }

    var i = function (t, e) {
        this.$element = $(t), this.options = $.extend({}, i.DEFAULTS, e), this.$trigger = $(this.options.trigger).filter('[href="#' + t.id + '"], [data-target="#' + t.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 350, i.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    }, i.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, i.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, a = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(a && a.length && (t = a.data("bs.collapse"), t && t.transitioning))) {
                var r = $.Event("show.bs.collapse");
                if (this.$element.trigger(r), !r.isDefaultPrevented()) {
                    a && a.length && (e.call(a, "hide"), t || a.data("bs.collapse", null));
                    var n = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[n](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var s = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[n](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!$.support.transition)return s.call(this);
                    var o = $.camelCase(["scroll", n].join("-"));
                    this.$element.one("bsTransitionEnd", $.proxy(s, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[n](this.$element[0][o])
                }
            }
        }
    }, i.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = $.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var e = this.dimension();
                this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var a = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return $.support.transition ? void this.$element[e](0).one("bsTransitionEnd", $.proxy(a, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : a.call(this)
            }
        }
    }, i.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, i.prototype.getParent = function () {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (e, i) {
            var a = $(i);
            this.addAriaAndCollapsedClass(t(a), a)
        }, this)).end()
    }, i.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var a = $.fn.collapse;
    $.fn.collapse = e, $.fn.collapse.Constructor = i, $.fn.collapse.noConflict = function () {
        return $.fn.collapse = a, this
    }, $(document).on("click.bs.collapse.data-api", '.sandwich [data-toggle="collapse"]', function (i) {
        var a = $(this);
        a.attr("data-target") || i.preventDefault();
        var r = t(a), n = r.data("bs.collapse"), s = n ? "toggle" : $.extend({}, a.data(), {trigger: this});
        e.call(r, s)
    })
}(jQuery), +function ($) {
    "use strict";
    function t() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e)if (void 0 !== t.style[i])return {end: e[i]};
        return !1
    }

    $.fn.emulateTransitionEnd = function (t) {
        var e = !1, i = this;
        $(this).one("bsTransitionEnd", function () {
            e = !0
        });
        var a = function () {
            e || $(i).trigger($.support.transition.end)
        };
        return setTimeout(a, t), this
    }, $(function () {
        $.support.transition = t(), $.support.transition && ($.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function (t) {
                return $(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), jQuery(document).ready(function ($) {
    jQuery(".pbsandwich_column [class*=col-]").fitVids()
}), jQuery(document).ready(function ($) {
    var t = function () {
        "use strict";
        var $ = jQuery;
        $(".pbsandwich_column[data-break-out]").each(function () {
            var t = $(this);
            if (0 != t.length && "undefined" != typeof $(this).attr("data-break-out")) {
                var e = parseInt($(this).attr("data-break-out"));
                if (!isNaN(e)) {
                    for (var i = t.parent(), a = 0; e > a && !i.is("html"); a++)i = i.parent();
                    "undefined" == typeof t.attr("data-orig-margin-left") ? (t.attr("data-orig-margin-left", t.css("marginLeft")), t.attr("data-orig-padding-left", t.css("paddingLeft")), t.attr("data-orig-margin-right", t.css("marginRight")), t.attr("data-orig-padding-right", t.css("paddingRight"))) : (t[0].style.removeProperty("margin-left"), t[0].style.removeProperty("padding-left"), t[0].style.removeProperty("margin-right"), t[0].style.removeProperty("padding-right"), t[0].style.setProperty("margin-left", t.attr("data-orig-margin-left"), "important"), t[0].style.setProperty("padding-left", t.attr("data-orig-padding-left"), "important"), t[0].style.setProperty("margin-right", t.attr("data-orig-margin-right"), "important"), t[0].style.setProperty("padding-right", t.attr("data-orig-padding-right"), "important"));
                    var r = i.width() + parseInt(i.css("paddingLeft")) + parseInt(i.css("paddingRight")), n = t.width() + parseInt(t.css("paddingLeft")) + parseInt(t.css("paddingRight")), s = t.offset().left - i.offset().left, o = i.offset().left + r - (t.offset().left + n), d = parseFloat(t.css("marginLeft")), l = parseFloat(t.css("marginRight")), p = parseFloat(t.css("paddingLeft")), h = parseFloat(t.css("paddingRight"));
                    d -= s, p += s, l -= o, h += o, t[0].style.removeProperty("margin-left"), t[0].style.removeProperty("padding-left"), t[0].style.removeProperty("margin-right"), t[0].style.removeProperty("padding-right"), t[0].style.setProperty("margin-left", d + "px", "important"), t[0].style.setProperty("padding-left", p + "px", "important"), t[0].style.setProperty("margin-right", l + "px", "important"), t[0].style.setProperty("padding-right", h + "px", "important"), t.addClass("broke-out broke-out-" + e)
                }
            }
        })
    };
    $(window).resize(t), t()
}), function ($) {
    "use strict";
    $.fn.fitVids = function (t) {
        var e = {customSelector: null, ignore: null};
        if (!document.getElementById("fit-vids-style")) {
            var i = document.head || document.getElementsByTagName("head")[0], a = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}", r = document.createElement("div");
            r.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>", i.appendChild(r.childNodes[1])
        }
        return t && $.extend(e, t), this.each(function () {
            var t = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            e.customSelector && t.push(e.customSelector);
            var i = ".fitvidsignore";
            e.ignore && (i = i + ", " + e.ignore);
            var a = $(this).find(t.join(","));
            a = a.not("object object"), a = a.not(i), a.each(function (t) {
                var e = $(this);
                if (!(e.parents(i).length > 0 || "embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    e.css("height") || e.css("width") || !isNaN(e.attr("height")) && !isNaN(e.attr("width")) || (e.attr("height", 9), e.attr("width", 16));
                    var a = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height(), r = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10), n = a / r;
                    if (!e.attr("id")) {
                        var s = "fitvid" + t;
                        e.attr("id", s)
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * n + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto);