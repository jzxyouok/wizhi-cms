!function (t) {
    var e = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        keyboardEnabled: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        autoHover: !1,
        autoDelay: 0,
        autoSlideForOnePage: !1,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function () {
            return !0
        },
        onSlideBefore: function () {
            return !0
        },
        onSlideAfter: function () {
            return !0
        },
        onSlideNext: function () {
            return !0
        },
        onSlidePrev: function () {
            return !0
        },
        onSliderResize: function () {
            return !0
        }
    };
    t.fn.bxSlider = function (n) {
        if (0 === this.length)return this;
        if (this.length > 1)return this.each(function () {
            t(this).bxSlider(n)
        }), this;
        var s = {}, o = this, r = t(window).width(), a = t(window).height(), l = function () {
            s.settings = t.extend({}, e, n), s.settings.slideWidth = parseInt(s.settings.slideWidth), s.children = o.children(s.settings.slideSelector), s.children.length < s.settings.minSlides && (s.settings.minSlides = s.children.length), s.children.length < s.settings.maxSlides && (s.settings.maxSlides = s.children.length), s.settings.randomStart && (s.settings.startSlide = Math.floor(Math.random() * s.children.length)), s.active = {index: s.settings.startSlide}, s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1 ? !0 : !1, s.carousel && (s.settings.preloadImages = "all"), s.minThreshold = s.settings.minSlides * s.settings.slideWidth + (s.settings.minSlides - 1) * s.settings.slideMargin, s.maxThreshold = s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin, s.working = !1, s.controls = {}, s.interval = null, s.animProp = "vertical" === s.settings.mode ? "top" : "left", s.usingCSS = s.settings.useCSS && "fade" !== s.settings.mode && function () {
                    var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in e)if (void 0 !== t.style[e[i]])return s.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), s.animProp = "-" + s.cssPrefix + "-transform", !0;
                    return !1
                }(), "vertical" === s.settings.mode && (s.settings.maxSlides = s.settings.minSlides), o.data("origStyle", o.attr("style")), o.children(s.settings.slideSelector).each(function () {
                t(this).data("origStyle", t(this).attr("style"))
            }), d()
        }, d = function () {
            o.wrap('<div class="' + s.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), s.viewport = o.parent(), s.loader = t('<div class="bx-loading" />'), s.viewport.prepend(s.loader), o.css({
                width: "horizontal" === s.settings.mode ? 1e3 * s.children.length + 215 + "%" : "auto",
                position: "absolute"
            }), s.usingCSS && s.settings.easing ? o.css("-" + s.cssPrefix + "-transition-timing-function", s.settings.easing) : s.settings.easing || (s.settings.easing = "swing");
            g();
            s.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            }), s.viewport.parent().css({maxWidth: p()}), s.settings.pager || s.settings.controls || s.viewport.parent().css({margin: "0 auto 0px"}), s.children.css({
                "float": "horizontal" === s.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
            }), s.children.css("width", f()), "horizontal" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginRight", s.settings.slideMargin), "vertical" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginBottom", s.settings.slideMargin), "fade" === s.settings.mode && (s.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }), s.children.eq(s.settings.startSlide).css({
                zIndex: s.settings.slideZIndex,
                display: "block"
            })), s.controls.el = t('<div class="bx-controls" />'), s.settings.captions && k(), s.active.last = s.settings.startSlide === v() - 1, s.settings.video && o.fitVids();
            var e = s.children.eq(s.settings.startSlide);
            ("all" === s.settings.preloadImages || s.settings.ticker) && (e = s.children), s.settings.ticker ? s.settings.pager = !1 : (s.settings.controls && S(), s.settings.auto && s.settings.autoControls && C(), s.settings.pager && y(), (s.settings.controls || s.settings.autoControls || s.settings.pager) && s.viewport.after(s.controls.el)), c(e, h)
        }, c = function (e, i) {
            var n = e.find('img:not([src=""]), iframe').length;
            if (0 === n)return void i();
            var s = 0;
            e.find('img:not([src=""]), iframe').each(function () {
                t(this).one("load error", function () {
                    ++s === n && i()
                }).each(function () {
                    this.complete && t(this).load()
                })
            })
        }, h = function () {
            if (s.settings.infiniteLoop && "fade" !== s.settings.mode && !s.settings.ticker) {
                var e = "vertical" === s.settings.mode ? s.settings.minSlides : s.settings.maxSlides, i = s.children.slice(0, e).clone(!0).addClass("bx-clone"), n = s.children.slice(-e).clone(!0).addClass("bx-clone");
                o.append(i).prepend(n)
            }
            s.loader.remove(), w(), "vertical" === s.settings.mode && (s.settings.adaptiveHeight = !0), s.viewport.height(u()), o.redrawSlider(), s.settings.onSliderLoad(s, s.active.index), s.initialized = !0, s.settings.responsive && t(window).bind("resize", U), s.settings.auto && s.settings.autoStart && (v() > 1 || s.settings.autoSlideForOnePage) && q(), s.settings.ticker && W(), s.settings.pager && I(s.settings.startSlide), s.settings.controls && D(), s.settings.touchEnabled && !s.settings.ticker && j(), s.settings.keyboardEnabled && !s.settings.ticker && t(document).keydown(L)
        }, u = function () {
            var e = 0, n = t();
            if ("vertical" === s.settings.mode || s.settings.adaptiveHeight)if (s.carousel) {
                var o = 1 === s.settings.moveSlides ? s.active.index : s.active.index * m();
                for (n = s.children.eq(o), i = 1; i <= s.settings.maxSlides - 1; i++)n = n.add(o + i >= s.children.length ? s.children.eq(i - 1) : s.children.eq(o + i))
            } else n = s.children.eq(s.active.index); else n = s.children;
            return "vertical" === s.settings.mode ? (n.each(function (i) {
                e += t(this).outerHeight()
            }), s.settings.slideMargin > 0 && (e += s.settings.slideMargin * (s.settings.minSlides - 1))) : e = Math.max.apply(Math, n.map(function () {
                return t(this).outerHeight(!1)
            }).get()), "border-box" === s.viewport.css("box-sizing") ? e += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom")) + parseFloat(s.viewport.css("border-top-width")) + parseFloat(s.viewport.css("border-bottom-width")) : "padding-box" === s.viewport.css("box-sizing") && (e += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom"))), e
        }, p = function () {
            var t = "100%";
            return s.settings.slideWidth > 0 && (t = "horizontal" === s.settings.mode ? s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin : s.settings.slideWidth), t
        }, f = function () {
            var t = s.settings.slideWidth, e = s.viewport.width();
            return 0 === s.settings.slideWidth || s.settings.slideWidth > e && !s.carousel || "vertical" === s.settings.mode ? t = e : s.settings.maxSlides > 1 && "horizontal" === s.settings.mode && (e > s.maxThreshold || e < s.minThreshold && (t = (e - s.settings.slideMargin * (s.settings.minSlides - 1)) / s.settings.minSlides)), t
        }, g = function () {
            var t = 1;
            if ("horizontal" === s.settings.mode && s.settings.slideWidth > 0)if (s.viewport.width() < s.minThreshold)t = s.settings.minSlides; else if (s.viewport.width() > s.maxThreshold)t = s.settings.maxSlides; else {
                var e = s.children.first().width() + s.settings.slideMargin;
                t = Math.floor((s.viewport.width() + s.settings.slideMargin) / e)
            } else"vertical" === s.settings.mode && (t = s.settings.minSlides);
            return t
        }, v = function () {
            var t = 0;
            if (s.settings.moveSlides > 0)if (s.settings.infiniteLoop)t = Math.ceil(s.children.length / m()); else for (var e = 0, i = 0; e < s.children.length;)++t, e = i + g(), i += s.settings.moveSlides <= g() ? s.settings.moveSlides : g(); else t = Math.ceil(s.children.length / g());
            return t
        }, m = function () {
            return s.settings.moveSlides > 0 && s.settings.moveSlides <= g() ? s.settings.moveSlides : g()
        }, w = function () {
            var t;
            if (s.children.length > s.settings.maxSlides && s.active.last && !s.settings.infiniteLoop) {
                if ("horizontal" === s.settings.mode) {
                    var e = s.children.last();
                    t = e.position(), x(-(t.left - (s.viewport.width() - e.outerWidth())), "reset", 0)
                } else if ("vertical" === s.settings.mode) {
                    var i = s.children.length - s.settings.minSlides;
                    t = s.children.eq(i).position(), x(-t.top, "reset", 0)
                }
            } else t = s.children.eq(s.active.index * m()).position(), s.active.index === v() - 1 && (s.active.last = !0), void 0 !== t && ("horizontal" === s.settings.mode ? x(-t.left, "reset", 0) : "vertical" === s.settings.mode && x(-t.top, "reset", 0))
        }, x = function (t, e, i, n) {
            if (s.usingCSS) {
                var r = "vertical" === s.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)";
                o.css("-" + s.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" === e ? setTimeout(function () {
                    o.css(s.animProp, r), 0 === t ? z() : o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                        o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), z()
                    })
                }, 0) : "reset" === e ? o.css(s.animProp, r) : "ticker" === e && (o.css("-" + s.cssPrefix + "-transition-timing-function", "linear"), o.css(s.animProp, r), o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), x(n.resetValue, "reset", 0), H()
                }))
            } else {
                var a = {};
                a[s.animProp] = t, "slide" === e ? o.animate(a, i, s.settings.easing, function () {
                    z()
                }) : "reset" === e ? o.css(s.animProp, t) : "ticker" === e && o.animate(a, speed, "linear", function () {
                    x(n.resetValue, "reset", 0), H()
                })
            }
        }, b = function () {
            for (var e = "", i = v(), n = 0; i > n; n++) {
                var o = "";
                s.settings.buildPager && t.isFunction(s.settings.buildPager) || s.settings.pagerCustom ? (o = s.settings.buildPager(n), s.pagerEl.addClass("bx-custom-pager")) : (o = n + 1, s.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + n + '" class="bx-pager-link">' + o + "</a></div>"
            }
            s.pagerEl.html(e)
        }, y = function () {
            s.settings.pagerCustom ? s.pagerEl = t(s.settings.pagerCustom) : (s.pagerEl = t('<div class="bx-pager" />'), s.settings.pagerSelector ? t(s.settings.pagerSelector).html(s.pagerEl) : s.controls.el.addClass("bx-has-pager").append(s.pagerEl), b()), s.pagerEl.on("click touchend", "a", M)
        }, S = function () {
            s.controls.next = t('<a class="bx-next" href="">' + s.settings.nextText + "</a>"), s.controls.prev = t('<a class="bx-prev" href="">' + s.settings.prevText + "</a>"), s.controls.next.bind("click touchend", T), s.controls.prev.bind("click touchend", E), s.settings.nextSelector && t(s.settings.nextSelector).append(s.controls.next), s.settings.prevSelector && t(s.settings.prevSelector).append(s.controls.prev), s.settings.nextSelector || s.settings.prevSelector || (s.controls.directionEl = t('<div class="bx-controls-direction" />'), s.controls.directionEl.append(s.controls.prev).append(s.controls.next), s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl))
        }, C = function () {
            s.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + s.settings.startText + "</a></div>"), s.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + s.settings.stopText + "</a></div>"), s.controls.autoEl = t('<div class="bx-controls-auto" />'), s.controls.autoEl.on("click", ".bx-start", $), s.controls.autoEl.on("click", ".bx-stop", P), s.settings.autoControlsCombine ? s.controls.autoEl.append(s.controls.start) : s.controls.autoEl.append(s.controls.start).append(s.controls.stop), s.settings.autoControlsSelector ? t(s.settings.autoControlsSelector).html(s.controls.autoEl) : s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl), A(s.settings.autoStart ? "stop" : "start")
        }, k = function () {
            s.children.each(function (e) {
                var i = t(this).find("img:first").attr("title");
                void 0 !== i && ("" + i).length && t(this).append('<div class="bx-caption"><span>' + i + "</span></div>")
            })
        }, T = function (t) {
            t.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && o.stopAuto(), o.goToNextSlide())
        }, E = function (t) {
            t.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && o.stopAuto(), o.goToPrevSlide())
        }, $ = function (t) {
            o.startAuto(), t.preventDefault()
        }, P = function (t) {
            o.stopAuto(), t.preventDefault()
        }, M = function (e) {
            if (e.preventDefault(), !s.controls.el.hasClass("disabled")) {
                s.settings.auto && o.stopAuto();
                var i = t(e.currentTarget);
                if (void 0 !== i.attr("data-slide-index")) {
                    var n = parseInt(i.attr("data-slide-index"));
                    n !== s.active.index && o.goToSlide(n)
                }
            }
        }, I = function (e) {
            var i = s.children.length;
            return "short" === s.settings.pagerType ? (s.settings.maxSlides > 1 && (i = Math.ceil(s.children.length / s.settings.maxSlides)), void s.pagerEl.html(e + 1 + s.settings.pagerShortSeparator + i)) : (s.pagerEl.find("a").removeClass("active"), void s.pagerEl.each(function (i, n) {
                t(n).find("a").eq(e).addClass("active")
            }))
        }, z = function () {
            if (s.settings.infiniteLoop) {
                var t = "";
                0 === s.active.index ? t = s.children.eq(0).position() : s.active.index === v() - 1 && s.carousel ? t = s.children.eq((v() - 1) * m()).position() : s.active.index === s.children.length - 1 && (t = s.children.eq(s.children.length - 1).position()), t && ("horizontal" === s.settings.mode ? x(-t.left, "reset", 0) : "vertical" === s.settings.mode && x(-t.top, "reset", 0))
            }
            s.working = !1, s.settings.onSlideAfter(s.children.eq(s.active.index), s.oldIndex, s.active.index)
        }, A = function (t) {
            s.settings.autoControlsCombine ? s.controls.autoEl.html(s.controls[t]) : (s.controls.autoEl.find("a").removeClass("active"), s.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
        }, D = function () {
            1 === v() ? (s.controls.prev.addClass("disabled"), s.controls.next.addClass("disabled")) : !s.settings.infiniteLoop && s.settings.hideControlOnEnd && (0 === s.active.index ? (s.controls.prev.addClass("disabled"), s.controls.next.removeClass("disabled")) : s.active.index === v() - 1 ? (s.controls.next.addClass("disabled"), s.controls.prev.removeClass("disabled")) : (s.controls.prev.removeClass("disabled"), s.controls.next.removeClass("disabled")))
        }, q = function () {
            if (s.settings.autoDelay > 0) {
                setTimeout(o.startAuto, s.settings.autoDelay)
            } else o.startAuto(), t(window).focus(function () {
                o.startAuto()
            }).blur(function () {
                o.stopAuto()
            });
            s.settings.autoHover && o.hover(function () {
                s.interval && (o.stopAuto(!0), s.autoPaused = !0)
            }, function () {
                s.autoPaused && (o.startAuto(!0), s.autoPaused = null)
            })
        }, W = function () {
            var e = 0;
            if ("next" === s.settings.autoDirection)o.append(s.children.clone().addClass("bx-clone")); else {
                o.prepend(s.children.clone().addClass("bx-clone"));
                var i = s.children.first().position();
                e = "horizontal" === s.settings.mode ? -i.left : -i.top
            }
            if (x(e, "reset", 0), s.settings.pager = !1, s.settings.controls = !1, s.settings.autoControls = !1, s.settings.tickerHover)if (s.usingCSS) {
                var n, r = "horizontal" == s.settings.mode ? 4 : 5;
                s.viewport.hover(function () {
                    var t = o.css("-" + s.cssPrefix + "-transform");
                    n = parseFloat(t.split(",")[r]), x(n, "reset", 0)
                }, function () {
                    var e = 0;
                    s.children.each(function (i) {
                        e += "horizontal" == s.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                    });
                    var i = s.settings.speed / e, o = ("horizontal" == s.settings.mode ? "left" : "top", i * (e - Math.abs(parseInt(n))));
                    H(o)
                })
            } else s.viewport.hover(function () {
                o.stop()
            }, function () {
                var e = 0;
                s.children.each(function (i) {
                    e += "horizontal" == s.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                });
                var i = s.settings.speed / e, n = "horizontal" == s.settings.mode ? "left" : "top", r = i * (e - Math.abs(parseInt(o.css(n))));
                H(r)
            });
            H()
        }, H = function (t) {
            speed = t ? t : s.settings.speed;
            var e = {left: 0, top: 0}, i = {left: 0, top: 0};
            "next" === s.settings.autoDirection ? e = o.find(".bx-clone").first().position() : i = s.children.first().position();
            var n = "horizontal" === s.settings.mode ? -e.left : -e.top, r = "horizontal" === s.settings.mode ? -i.left : -i.top, a = {resetValue: r};
            x(n, "ticker", speed, a)
        }, O = function (e) {
            var i = t(window), n = {top: i.scrollTop(), left: i.scrollLeft()};
            n.right = n.left + i.width(), n.bottom = n.top + i.height();
            var s = e.offset();
            return s.right = s.left + e.outerWidth(), s.bottom = s.top + e.outerHeight(), !(n.right < s.left || n.left > s.right || n.bottom < s.top || n.top > s.bottom)
        }, L = function (t) {
            var e = document.activeElement.tagName.toLowerCase(), i = "input|textarea", n = new RegExp(e, ["i"]), s = n.exec(i);
            if (null == s && O(o)) {
                if (39 == t.keyCode)return T(t), !1;
                if (37 == t.keyCode)return E(t), !1
            }
        }, j = function () {
            s.touch = {
                start: {x: 0, y: 0},
                end: {x: 0, y: 0}
            }, s.viewport.bind("touchstart MSPointerDown pointerdown", N), s.viewport.on("click", ".bxslider a", function (t) {
                s.viewport.hasClass("click-disabled") && (t.preventDefault(), s.viewport.removeClass("click-disabled"))
            })
        }, N = function (t) {
            if (s.controls.el.addClass("disabled"), s.working)t.preventDefault(), s.controls.el.removeClass("disabled"); else {
                s.touch.originalPos = o.position();
                var e = t.originalEvent, i = "undefined" != typeof e.changedTouches ? e.changedTouches : [e];
                s.touch.start.x = i[0].pageX, s.touch.start.y = i[0].pageY, s.viewport.get(0).setPointerCapture && (s.pointerId = e.pointerId, s.viewport.get(0).setPointerCapture(s.pointerId)), s.viewport.bind("touchmove MSPointerMove pointermove", F), s.viewport.bind("touchend MSPointerUp pointerup", B), s.viewport.bind("MSPointerCancel pointercancel", Q)
            }
        }, Q = function (t) {
            x(s.touch.originalPos.left, "reset", 0), s.controls.el.removeClass("disabled"), s.viewport.unbind("MSPointerCancel pointercancel", Q), s.viewport.unbind("touchmove MSPointerMove pointermove", F), s.viewport.unbind("touchend MSPointerUp pointerup", B), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId)
        }, F = function (t) {
            var e = t.originalEvent, i = "undefined" != typeof e.changedTouches ? e.changedTouches : [e], n = Math.abs(i[0].pageX - s.touch.start.x), o = Math.abs(i[0].pageY - s.touch.start.y);
            if (3 * n > o && s.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * o > n && s.settings.preventDefaultSwipeY && t.preventDefault(), "fade" !== s.settings.mode && s.settings.oneToOneTouch) {
                var r = 0, a = 0;
                "horizontal" === s.settings.mode ? (a = i[0].pageX - s.touch.start.x, r = s.touch.originalPos.left + a) : (a = i[0].pageY - s.touch.start.y, r = s.touch.originalPos.top + a), x(r, "reset", 0)
            }
        }, B = function (t) {
            s.viewport.unbind("touchmove MSPointerMove pointermove", F), s.controls.el.removeClass("disabled");
            var e = t.originalEvent, i = "undefined" != typeof e.changedTouches ? e.changedTouches : [e], n = 0, r = 0;
            s.touch.end.x = i[0].pageX, s.touch.end.y = i[0].pageY, "fade" === s.settings.mode ? (r = Math.abs(s.touch.start.x - s.touch.end.x), r >= s.settings.swipeThreshold && (s.touch.start.x > s.touch.end.x ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto())) : ("horizontal" === s.settings.mode ? (r = s.touch.end.x - s.touch.start.x, n = s.touch.originalPos.left) : (r = s.touch.end.y - s.touch.start.y, n = s.touch.originalPos.top), !s.settings.infiniteLoop && (0 === s.active.index && r > 0 || s.active.last && 0 > r) ? x(n, "reset", 200) : Math.abs(r) >= s.settings.swipeThreshold ? (0 > r ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto()) : x(n, "reset", 200)), s.viewport.unbind("touchend MSPointerUp pointerup", B), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId)
        }, U = function (e) {
            if (s.initialized)if (s.working)window.setTimeout(U, 10); else {
                var i = t(window).width(), n = t(window).height();
                (r !== i || a !== n) && (r = i, a = n, o.redrawSlider(), s.settings.onSliderResize.call(o, s.active.index))
            }
        };
        return o.goToSlide = function (e, i) {
            if (!s.working && s.active.index !== e) {
                s.working = !0, s.oldIndex = s.active.index, s.active.index = 0 > e ? v() - 1 : e >= v() ? 0 : e;
                var n = !0;
                if (n = s.settings.onSlideBefore(s.children.eq(s.active.index), s.oldIndex, s.active.index), "undefined" != typeof n && !n)return s.active.index = s.oldIndex, void(s.working = !1);
                if ("next" === i ? s.settings.onSlideNext(s.children.eq(s.active.index), s.oldIndex, s.active.index) || (n = !1) : "prev" === i && (s.settings.onSlidePrev(s.children.eq(s.active.index), s.oldIndex, s.active.index) || (n = !1)), "undefined" != typeof n && !n)return s.active.index = s.oldIndex, void(s.working = !1);
                if (s.active.last = s.active.index >= v() - 1, (s.settings.pager || s.settings.pagerCustom) && I(s.active.index), s.settings.controls && D(), "fade" === s.settings.mode)s.settings.adaptiveHeight && s.viewport.height() !== u() && s.viewport.animate({height: u()}, s.settings.adaptiveHeightSpeed), s.children.filter(":visible").fadeOut(s.settings.speed).css({zIndex: 0}), s.children.eq(s.active.index).css("zIndex", s.settings.slideZIndex + 1).fadeIn(s.settings.speed, function () {
                    t(this).css("zIndex", s.settings.slideZIndex), z()
                }); else {
                    s.settings.adaptiveHeight && s.viewport.height() !== u() && s.viewport.animate({height: u()}, s.settings.adaptiveHeightSpeed);
                    var r = 0, a = {left: 0, top: 0}, l = null;
                    if (!s.settings.infiniteLoop && s.carousel && s.active.last)if ("horizontal" === s.settings.mode)l = s.children.eq(s.children.length - 1), a = l.position(), r = s.viewport.width() - l.outerWidth(); else {
                        var d = s.children.length - s.settings.minSlides;
                        a = s.children.eq(d).position()
                    } else if (s.carousel && s.active.last && "prev" === i) {
                        var c = 1 === s.settings.moveSlides ? s.settings.maxSlides - m() : (v() - 1) * m() - (s.children.length - s.settings.maxSlides);
                        l = o.children(".bx-clone").eq(c), a = l.position()
                    } else if ("next" === i && 0 === s.active.index)a = o.find("> .bx-clone").eq(s.settings.maxSlides).position(), s.active.last = !1; else if (e >= 0) {
                        var h = e * m();
                        a = s.children.eq(h).position()
                    }
                    if ("undefined" != typeof a) {
                        var p = "horizontal" === s.settings.mode ? -(a.left - r) : -a.top;
                        x(p, "slide", s.settings.speed)
                    }
                }
            }
        }, o.goToNextSlide = function () {
            if (s.settings.infiniteLoop || !s.active.last) {
                var t = parseInt(s.active.index) + 1;
                o.goToSlide(t, "next")
            }
        }, o.goToPrevSlide = function () {
            if (s.settings.infiniteLoop || 0 !== s.active.index) {
                var t = parseInt(s.active.index) - 1;
                o.goToSlide(t, "prev")
            }
        }, o.startAuto = function (t) {
            s.interval || (s.interval = setInterval(function () {
                "next" === s.settings.autoDirection ? o.goToNextSlide() : o.goToPrevSlide()
            }, s.settings.pause), s.settings.autoControls && t !== !0 && A("stop"))
        }, o.stopAuto = function (t) {
            s.interval && (clearInterval(s.interval), s.interval = null, s.settings.autoControls && t !== !0 && A("start"))
        }, o.getCurrentSlide = function () {
            return s.active.index
        }, o.getCurrentSlideElement = function () {
            return s.children.eq(s.active.index)
        }, o.getSlideCount = function () {
            return s.children.length
        }, o.isWorking = function () {
            return s.working
        }, o.redrawSlider = function () {
            s.children.add(o.find(".bx-clone")).outerWidth(f()), s.viewport.css("height", u()), s.settings.ticker || w(), s.active.last && (s.active.index = v() - 1), s.active.index >= v() && (s.active.last = !0), s.settings.pager && !s.settings.pagerCustom && (b(), I(s.active.index))
        }, o.destroySlider = function () {
            s.initialized && (s.initialized = !1, t(".bx-clone", this).remove(), s.children.each(function () {
                void 0 !== t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
            }), void 0 !== t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), s.controls.el && s.controls.el.remove(), s.controls.next && s.controls.next.remove(), s.controls.prev && s.controls.prev.remove(), s.pagerEl && s.settings.controls && !s.settings.pagerCustom && s.pagerEl.remove(), t(".bx-caption", this).remove(), s.controls.autoEl && s.controls.autoEl.remove(), clearInterval(s.interval), s.settings.responsive && t(window).unbind("resize", U), s.settings.keyboardEnabled && t(document).unbind("keydown", L))
        }, o.reloadSlider = function (t) {
            void 0 !== t && (n = t), o.destroySlider(), l()
        }, l(), this
    }
}(jQuery), !function (t) {
    var e = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        keyboardEnabled: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        autoHover: !1,
        autoDelay: 0,
        autoSlideForOnePage: !1,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function () {
            return !0
        },
        onSlideBefore: function () {
            return !0
        },
        onSlideAfter: function () {
            return !0
        },
        onSlideNext: function () {
            return !0
        },
        onSlidePrev: function () {
            return !0
        },
        onSliderResize: function () {
            return !0
        }
    };
    t.fn.bxSlider = function (n) {
        if (0 === this.length)return this;
        if (this.length > 1)return this.each(function () {
            t(this).bxSlider(n)
        }), this;
        var s = {}, o = this, r = t(window).width(), a = t(window).height(), l = function () {
            s.settings = t.extend({}, e, n), s.settings.slideWidth = parseInt(s.settings.slideWidth), s.children = o.children(s.settings.slideSelector), s.children.length < s.settings.minSlides && (s.settings.minSlides = s.children.length), s.children.length < s.settings.maxSlides && (s.settings.maxSlides = s.children.length), s.settings.randomStart && (s.settings.startSlide = Math.floor(Math.random() * s.children.length)), s.active = {index: s.settings.startSlide}, s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1 ? !0 : !1, s.carousel && (s.settings.preloadImages = "all"), s.minThreshold = s.settings.minSlides * s.settings.slideWidth + (s.settings.minSlides - 1) * s.settings.slideMargin, s.maxThreshold = s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin, s.working = !1, s.controls = {}, s.interval = null, s.animProp = "vertical" === s.settings.mode ? "top" : "left", s.usingCSS = s.settings.useCSS && "fade" !== s.settings.mode && function () {
                    var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in e)if (void 0 !== t.style[e[i]])return s.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), s.animProp = "-" + s.cssPrefix + "-transform", !0;
                    return !1
                }(), "vertical" === s.settings.mode && (s.settings.maxSlides = s.settings.minSlides), o.data("origStyle", o.attr("style")), o.children(s.settings.slideSelector).each(function () {
                t(this).data("origStyle", t(this).attr("style"))
            }), d()
        }, d = function () {
            o.wrap('<div class="' + s.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), s.viewport = o.parent(), s.loader = t('<div class="bx-loading" />'), s.viewport.prepend(s.loader), o.css({
                width: "horizontal" === s.settings.mode ? 1e3 * s.children.length + 215 + "%" : "auto",
                position: "absolute"
            }), s.usingCSS && s.settings.easing ? o.css("-" + s.cssPrefix + "-transition-timing-function", s.settings.easing) : s.settings.easing || (s.settings.easing = "swing"), g(), s.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            }), s.viewport.parent().css({maxWidth: p()}), s.settings.pager || s.settings.controls || s.viewport.parent().css({margin: "0 auto 0px"}), s.children.css({
                "float": "horizontal" === s.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
            }), s.children.css("width", f()), "horizontal" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginRight", s.settings.slideMargin), "vertical" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginBottom", s.settings.slideMargin), "fade" === s.settings.mode && (s.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }), s.children.eq(s.settings.startSlide).css({
                zIndex: s.settings.slideZIndex,
                display: "block"
            })), s.controls.el = t('<div class="bx-controls" />'), s.settings.captions && k(), s.active.last = s.settings.startSlide === v() - 1, s.settings.video && o.fitVids();
            var e = s.children.eq(s.settings.startSlide);
            ("all" === s.settings.preloadImages || s.settings.ticker) && (e = s.children), s.settings.ticker ? s.settings.pager = !1 : (s.settings.controls && S(), s.settings.auto && s.settings.autoControls && C(), s.settings.pager && y(), (s.settings.controls || s.settings.autoControls || s.settings.pager) && s.viewport.after(s.controls.el)), c(e, h)
        }, c = function (e, i) {
            var n = e.find('img:not([src=""]), iframe').length;
            if (0 === n)return void i();
            var s = 0;
            e.find('img:not([src=""]), iframe').each(function () {
                t(this).one("load error", function () {
                    ++s === n && i()
                }).each(function () {
                    this.complete && t(this).load()
                })
            })
        }, h = function () {
            if (s.settings.infiniteLoop && "fade" !== s.settings.mode && !s.settings.ticker) {
                var e = "vertical" === s.settings.mode ? s.settings.minSlides : s.settings.maxSlides, i = s.children.slice(0, e).clone(!0).addClass("bx-clone"), n = s.children.slice(-e).clone(!0).addClass("bx-clone");
                o.append(i).prepend(n)
            }
            s.loader.remove(), w(), "vertical" === s.settings.mode && (s.settings.adaptiveHeight = !0), s.viewport.height(u()), o.redrawSlider(), s.settings.onSliderLoad(s, s.active.index), s.initialized = !0, s.settings.responsive && t(window).bind("resize", U), s.settings.auto && s.settings.autoStart && (v() > 1 || s.settings.autoSlideForOnePage) && q(), s.settings.ticker && W(), s.settings.pager && I(s.settings.startSlide), s.settings.controls && D(), s.settings.touchEnabled && !s.settings.ticker && j(), s.settings.keyboardEnabled && !s.settings.ticker && t(document).keydown(L)
        }, u = function () {
            var e = 0, n = t();
            if ("vertical" === s.settings.mode || s.settings.adaptiveHeight)if (s.carousel) {
                var o = 1 === s.settings.moveSlides ? s.active.index : s.active.index * m();
                for (n = s.children.eq(o), i = 1; i <= s.settings.maxSlides - 1; i++)n = n.add(s.children.eq(o + i >= s.children.length ? i - 1 : o + i))
            } else n = s.children.eq(s.active.index); else n = s.children;
            return "vertical" === s.settings.mode ? (n.each(function () {
                e += t(this).outerHeight()
            }), s.settings.slideMargin > 0 && (e += s.settings.slideMargin * (s.settings.minSlides - 1))) : e = Math.max.apply(Math, n.map(function () {
                return t(this).outerHeight(!1)
            }).get()), "border-box" === s.viewport.css("box-sizing") ? e += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom")) + parseFloat(s.viewport.css("border-top-width")) + parseFloat(s.viewport.css("border-bottom-width")) : "padding-box" === s.viewport.css("box-sizing") && (e += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom"))), e
        }, p = function () {
            var t = "100%";
            return s.settings.slideWidth > 0 && (t = "horizontal" === s.settings.mode ? s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin : s.settings.slideWidth), t
        }, f = function () {
            var t = s.settings.slideWidth, e = s.viewport.width();
            return 0 === s.settings.slideWidth || s.settings.slideWidth > e && !s.carousel || "vertical" === s.settings.mode ? t = e : s.settings.maxSlides > 1 && "horizontal" === s.settings.mode && (e > s.maxThreshold || e < s.minThreshold && (t = (e - s.settings.slideMargin * (s.settings.minSlides - 1)) / s.settings.minSlides)), t
        }, g = function () {
            var t = 1;
            if ("horizontal" === s.settings.mode && s.settings.slideWidth > 0)if (s.viewport.width() < s.minThreshold)t = s.settings.minSlides; else if (s.viewport.width() > s.maxThreshold)t = s.settings.maxSlides; else {
                var e = s.children.first().width() + s.settings.slideMargin;
                t = Math.floor((s.viewport.width() + s.settings.slideMargin) / e)
            } else"vertical" === s.settings.mode && (t = s.settings.minSlides);
            return t
        }, v = function () {
            var t = 0;
            if (s.settings.moveSlides > 0)if (s.settings.infiniteLoop)t = Math.ceil(s.children.length / m()); else for (var e = 0, i = 0; e < s.children.length;)++t, e = i + g(), i += s.settings.moveSlides <= g() ? s.settings.moveSlides : g(); else t = Math.ceil(s.children.length / g());
            return t
        }, m = function () {
            return s.settings.moveSlides > 0 && s.settings.moveSlides <= g() ? s.settings.moveSlides : g()
        }, w = function () {
            var t;
            if (s.children.length > s.settings.maxSlides && s.active.last && !s.settings.infiniteLoop) {
                if ("horizontal" === s.settings.mode) {
                    var e = s.children.last();
                    t = e.position(), x(-(t.left - (s.viewport.width() - e.outerWidth())), "reset", 0)
                } else if ("vertical" === s.settings.mode) {
                    var i = s.children.length - s.settings.minSlides;
                    t = s.children.eq(i).position(), x(-t.top, "reset", 0)
                }
            } else t = s.children.eq(s.active.index * m()).position(), s.active.index === v() - 1 && (s.active.last = !0), void 0 !== t && ("horizontal" === s.settings.mode ? x(-t.left, "reset", 0) : "vertical" === s.settings.mode && x(-t.top, "reset", 0))
        }, x = function (t, e, i, n) {
            if (s.usingCSS) {
                var r = "vertical" === s.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)";
                o.css("-" + s.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" === e ? setTimeout(function () {
                    o.css(s.animProp, r), 0 === t ? z() : o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                        o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), z()
                    })
                }, 0) : "reset" === e ? o.css(s.animProp, r) : "ticker" === e && (o.css("-" + s.cssPrefix + "-transition-timing-function", "linear"), o.css(s.animProp, r), o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), x(n.resetValue, "reset", 0), H()
                }))
            } else {
                var a = {};
                a[s.animProp] = t, "slide" === e ? o.animate(a, i, s.settings.easing, function () {
                    z()
                }) : "reset" === e ? o.css(s.animProp, t) : "ticker" === e && o.animate(a, speed, "linear", function () {
                    x(n.resetValue, "reset", 0), H()
                })
            }
        }, b = function () {
            for (var e = "", i = v(), n = 0; i > n; n++) {
                var o = "";
                s.settings.buildPager && t.isFunction(s.settings.buildPager) || s.settings.pagerCustom ? (o = s.settings.buildPager(n), s.pagerEl.addClass("bx-custom-pager")) : (o = n + 1, s.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + n + '" class="bx-pager-link">' + o + "</a></div>";

            }
            s.pagerEl.html(e)
        }, y = function () {
            s.settings.pagerCustom ? s.pagerEl = t(s.settings.pagerCustom) : (s.pagerEl = t('<div class="bx-pager" />'), s.settings.pagerSelector ? t(s.settings.pagerSelector).html(s.pagerEl) : s.controls.el.addClass("bx-has-pager").append(s.pagerEl), b()), s.pagerEl.on("click touchend", "a", M)
        }, S = function () {
            s.controls.next = t('<a class="bx-next" href="">' + s.settings.nextText + "</a>"), s.controls.prev = t('<a class="bx-prev" href="">' + s.settings.prevText + "</a>"), s.controls.next.bind("click touchend", T), s.controls.prev.bind("click touchend", E), s.settings.nextSelector && t(s.settings.nextSelector).append(s.controls.next), s.settings.prevSelector && t(s.settings.prevSelector).append(s.controls.prev), s.settings.nextSelector || s.settings.prevSelector || (s.controls.directionEl = t('<div class="bx-controls-direction" />'), s.controls.directionEl.append(s.controls.prev).append(s.controls.next), s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl))
        }, C = function () {
            s.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + s.settings.startText + "</a></div>"), s.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + s.settings.stopText + "</a></div>"), s.controls.autoEl = t('<div class="bx-controls-auto" />'), s.controls.autoEl.on("click", ".bx-start", $), s.controls.autoEl.on("click", ".bx-stop", P), s.settings.autoControlsCombine ? s.controls.autoEl.append(s.controls.start) : s.controls.autoEl.append(s.controls.start).append(s.controls.stop), s.settings.autoControlsSelector ? t(s.settings.autoControlsSelector).html(s.controls.autoEl) : s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl), A(s.settings.autoStart ? "stop" : "start")
        }, k = function () {
            s.children.each(function () {
                var e = t(this).find("img:first").attr("title");
                void 0 !== e && ("" + e).length && t(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
            })
        }, T = function (t) {
            t.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && o.stopAuto(), o.goToNextSlide())
        }, E = function (t) {
            t.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && o.stopAuto(), o.goToPrevSlide())
        }, $ = function (t) {
            o.startAuto(), t.preventDefault()
        }, P = function (t) {
            o.stopAuto(), t.preventDefault()
        }, M = function (e) {
            if (e.preventDefault(), !s.controls.el.hasClass("disabled")) {
                s.settings.auto && o.stopAuto();
                var i = t(e.currentTarget);
                if (void 0 !== i.attr("data-slide-index")) {
                    var n = parseInt(i.attr("data-slide-index"));
                    n !== s.active.index && o.goToSlide(n)
                }
            }
        }, I = function (e) {
            var i = s.children.length;
            return "short" === s.settings.pagerType ? (s.settings.maxSlides > 1 && (i = Math.ceil(s.children.length / s.settings.maxSlides)), void s.pagerEl.html(e + 1 + s.settings.pagerShortSeparator + i)) : (s.pagerEl.find("a").removeClass("active"), void s.pagerEl.each(function (i, n) {
                t(n).find("a").eq(e).addClass("active")
            }))
        }, z = function () {
            if (s.settings.infiniteLoop) {
                var t = "";
                0 === s.active.index ? t = s.children.eq(0).position() : s.active.index === v() - 1 && s.carousel ? t = s.children.eq((v() - 1) * m()).position() : s.active.index === s.children.length - 1 && (t = s.children.eq(s.children.length - 1).position()), t && ("horizontal" === s.settings.mode ? x(-t.left, "reset", 0) : "vertical" === s.settings.mode && x(-t.top, "reset", 0))
            }
            s.working = !1, s.settings.onSlideAfter(s.children.eq(s.active.index), s.oldIndex, s.active.index)
        }, A = function (t) {
            s.settings.autoControlsCombine ? s.controls.autoEl.html(s.controls[t]) : (s.controls.autoEl.find("a").removeClass("active"), s.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
        }, D = function () {
            1 === v() ? (s.controls.prev.addClass("disabled"), s.controls.next.addClass("disabled")) : !s.settings.infiniteLoop && s.settings.hideControlOnEnd && (0 === s.active.index ? (s.controls.prev.addClass("disabled"), s.controls.next.removeClass("disabled")) : s.active.index === v() - 1 ? (s.controls.next.addClass("disabled"), s.controls.prev.removeClass("disabled")) : (s.controls.prev.removeClass("disabled"), s.controls.next.removeClass("disabled")))
        }, q = function () {
            s.settings.autoDelay > 0 ? setTimeout(o.startAuto, s.settings.autoDelay) : (o.startAuto(), t(window).focus(function () {
                o.startAuto()
            }).blur(function () {
                o.stopAuto()
            })), s.settings.autoHover && o.hover(function () {
                s.interval && (o.stopAuto(!0), s.autoPaused = !0)
            }, function () {
                s.autoPaused && (o.startAuto(!0), s.autoPaused = null)
            })
        }, W = function () {
            var e = 0;
            if ("next" === s.settings.autoDirection)o.append(s.children.clone().addClass("bx-clone")); else {
                o.prepend(s.children.clone().addClass("bx-clone"));
                var i = s.children.first().position();
                e = "horizontal" === s.settings.mode ? -i.left : -i.top
            }
            if (x(e, "reset", 0), s.settings.pager = !1, s.settings.controls = !1, s.settings.autoControls = !1, s.settings.tickerHover)if (s.usingCSS) {
                var n, r = "horizontal" == s.settings.mode ? 4 : 5;
                s.viewport.hover(function () {
                    var t = o.css("-" + s.cssPrefix + "-transform");
                    n = parseFloat(t.split(",")[r]), x(n, "reset", 0)
                }, function () {
                    var e = 0;
                    s.children.each(function () {
                        e += "horizontal" == s.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                    });
                    var i = s.settings.speed / e, o = ("horizontal" == s.settings.mode ? "left" : "top", i * (e - Math.abs(parseInt(n))));
                    H(o)
                })
            } else s.viewport.hover(function () {
                o.stop()
            }, function () {
                var e = 0;
                s.children.each(function () {
                    e += "horizontal" == s.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                });
                var i = s.settings.speed / e, n = "horizontal" == s.settings.mode ? "left" : "top", r = i * (e - Math.abs(parseInt(o.css(n))));
                H(r)
            });
            H()
        }, H = function (t) {
            speed = t ? t : s.settings.speed;
            var e = {left: 0, top: 0}, i = {left: 0, top: 0};
            "next" === s.settings.autoDirection ? e = o.find(".bx-clone").first().position() : i = s.children.first().position();
            var n = "horizontal" === s.settings.mode ? -e.left : -e.top, r = "horizontal" === s.settings.mode ? -i.left : -i.top, a = {resetValue: r};
            x(n, "ticker", speed, a)
        }, O = function (e) {
            var i = t(window), n = {top: i.scrollTop(), left: i.scrollLeft()};
            n.right = n.left + i.width(), n.bottom = n.top + i.height();
            var s = e.offset();
            return s.right = s.left + e.outerWidth(), s.bottom = s.top + e.outerHeight(), !(n.right < s.left || n.left > s.right || n.bottom < s.top || n.top > s.bottom)
        }, L = function (t) {
            var e = document.activeElement.tagName.toLowerCase(), i = "input|textarea", n = new RegExp(e, ["i"]), s = n.exec(i);
            if (null == s && O(o)) {
                if (39 == t.keyCode)return T(t), !1;
                if (37 == t.keyCode)return E(t), !1
            }
        }, j = function () {
            s.touch = {
                start: {x: 0, y: 0},
                end: {x: 0, y: 0}
            }, s.viewport.bind("touchstart MSPointerDown pointerdown", N), s.viewport.on("click", ".bxslider a", function (t) {
                s.viewport.hasClass("click-disabled") && (t.preventDefault(), s.viewport.removeClass("click-disabled"))
            })
        }, N = function (t) {
            if (s.controls.el.addClass("disabled"), s.working)t.preventDefault(), s.controls.el.removeClass("disabled"); else {
                s.touch.originalPos = o.position();
                var e = t.originalEvent, i = "undefined" != typeof e.changedTouches ? e.changedTouches : [e];
                s.touch.start.x = i[0].pageX, s.touch.start.y = i[0].pageY, s.viewport.get(0).setPointerCapture && (s.pointerId = e.pointerId, s.viewport.get(0).setPointerCapture(s.pointerId)), s.viewport.bind("touchmove MSPointerMove pointermove", F), s.viewport.bind("touchend MSPointerUp pointerup", B), s.viewport.bind("MSPointerCancel pointercancel", Q)
            }
        }, Q = function () {
            x(s.touch.originalPos.left, "reset", 0), s.controls.el.removeClass("disabled"), s.viewport.unbind("MSPointerCancel pointercancel", Q), s.viewport.unbind("touchmove MSPointerMove pointermove", F), s.viewport.unbind("touchend MSPointerUp pointerup", B), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId)
        }, F = function (t) {
            var e = t.originalEvent, i = "undefined" != typeof e.changedTouches ? e.changedTouches : [e], n = Math.abs(i[0].pageX - s.touch.start.x), o = Math.abs(i[0].pageY - s.touch.start.y);
            if (3 * n > o && s.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * o > n && s.settings.preventDefaultSwipeY && t.preventDefault(), "fade" !== s.settings.mode && s.settings.oneToOneTouch) {
                var r = 0, a = 0;
                "horizontal" === s.settings.mode ? (a = i[0].pageX - s.touch.start.x, r = s.touch.originalPos.left + a) : (a = i[0].pageY - s.touch.start.y, r = s.touch.originalPos.top + a), x(r, "reset", 0)
            }
        }, B = function (t) {
            s.viewport.unbind("touchmove MSPointerMove pointermove", F), s.controls.el.removeClass("disabled");
            var e = t.originalEvent, i = "undefined" != typeof e.changedTouches ? e.changedTouches : [e], n = 0, r = 0;
            s.touch.end.x = i[0].pageX, s.touch.end.y = i[0].pageY, "fade" === s.settings.mode ? (r = Math.abs(s.touch.start.x - s.touch.end.x), r >= s.settings.swipeThreshold && (s.touch.start.x > s.touch.end.x ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto())) : ("horizontal" === s.settings.mode ? (r = s.touch.end.x - s.touch.start.x, n = s.touch.originalPos.left) : (r = s.touch.end.y - s.touch.start.y, n = s.touch.originalPos.top), !s.settings.infiniteLoop && (0 === s.active.index && r > 0 || s.active.last && 0 > r) ? x(n, "reset", 200) : Math.abs(r) >= s.settings.swipeThreshold ? (0 > r ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto()) : x(n, "reset", 200)), s.viewport.unbind("touchend MSPointerUp pointerup", B), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId)
        }, U = function () {
            if (s.initialized)if (s.working)window.setTimeout(U, 10); else {
                var e = t(window).width(), i = t(window).height();
                (r !== e || a !== i) && (r = e, a = i, o.redrawSlider(), s.settings.onSliderResize.call(o, s.active.index))
            }
        };
        return o.goToSlide = function (e, i) {
            if (!s.working && s.active.index !== e) {
                s.working = !0, s.oldIndex = s.active.index, s.active.index = 0 > e ? v() - 1 : e >= v() ? 0 : e;
                var n = !0;
                if (n = s.settings.onSlideBefore(s.children.eq(s.active.index), s.oldIndex, s.active.index), "undefined" != typeof n && !n)return s.active.index = s.oldIndex, void(s.working = !1);
                if ("next" === i ? s.settings.onSlideNext(s.children.eq(s.active.index), s.oldIndex, s.active.index) || (n = !1) : "prev" === i && (s.settings.onSlidePrev(s.children.eq(s.active.index), s.oldIndex, s.active.index) || (n = !1)), "undefined" != typeof n && !n)return s.active.index = s.oldIndex, void(s.working = !1);
                if (s.active.last = s.active.index >= v() - 1, (s.settings.pager || s.settings.pagerCustom) && I(s.active.index), s.settings.controls && D(), "fade" === s.settings.mode)s.settings.adaptiveHeight && s.viewport.height() !== u() && s.viewport.animate({height: u()}, s.settings.adaptiveHeightSpeed), s.children.filter(":visible").fadeOut(s.settings.speed).css({zIndex: 0}), s.children.eq(s.active.index).css("zIndex", s.settings.slideZIndex + 1).fadeIn(s.settings.speed, function () {
                    t(this).css("zIndex", s.settings.slideZIndex), z()
                }); else {
                    s.settings.adaptiveHeight && s.viewport.height() !== u() && s.viewport.animate({height: u()}, s.settings.adaptiveHeightSpeed);
                    var r = 0, a = {left: 0, top: 0}, l = null;
                    if (!s.settings.infiniteLoop && s.carousel && s.active.last)if ("horizontal" === s.settings.mode)l = s.children.eq(s.children.length - 1), a = l.position(), r = s.viewport.width() - l.outerWidth(); else {
                        var d = s.children.length - s.settings.minSlides;
                        a = s.children.eq(d).position()
                    } else if (s.carousel && s.active.last && "prev" === i) {
                        var c = 1 === s.settings.moveSlides ? s.settings.maxSlides - m() : (v() - 1) * m() - (s.children.length - s.settings.maxSlides);
                        l = o.children(".bx-clone").eq(c), a = l.position()
                    } else if ("next" === i && 0 === s.active.index)a = o.find("> .bx-clone").eq(s.settings.maxSlides).position(), s.active.last = !1; else if (e >= 0) {
                        var h = e * m();
                        a = s.children.eq(h).position()
                    }
                    if ("undefined" != typeof a) {
                        var p = "horizontal" === s.settings.mode ? -(a.left - r) : -a.top;
                        x(p, "slide", s.settings.speed)
                    }
                }
            }
        }, o.goToNextSlide = function () {
            if (s.settings.infiniteLoop || !s.active.last) {
                var t = parseInt(s.active.index) + 1;
                o.goToSlide(t, "next")
            }
        }, o.goToPrevSlide = function () {
            if (s.settings.infiniteLoop || 0 !== s.active.index) {
                var t = parseInt(s.active.index) - 1;
                o.goToSlide(t, "prev")
            }
        }, o.startAuto = function (t) {
            s.interval || (s.interval = setInterval(function () {
                "next" === s.settings.autoDirection ? o.goToNextSlide() : o.goToPrevSlide()
            }, s.settings.pause), s.settings.autoControls && t !== !0 && A("stop"))
        }, o.stopAuto = function (t) {
            s.interval && (clearInterval(s.interval), s.interval = null, s.settings.autoControls && t !== !0 && A("start"))
        }, o.getCurrentSlide = function () {
            return s.active.index
        }, o.getCurrentSlideElement = function () {
            return s.children.eq(s.active.index)
        }, o.getSlideCount = function () {
            return s.children.length
        }, o.isWorking = function () {
            return s.working
        }, o.redrawSlider = function () {
            s.children.add(o.find(".bx-clone")).outerWidth(f()), s.viewport.css("height", u()), s.settings.ticker || w(), s.active.last && (s.active.index = v() - 1), s.active.index >= v() && (s.active.last = !0), s.settings.pager && !s.settings.pagerCustom && (b(), I(s.active.index))
        }, o.destroySlider = function () {
            s.initialized && (s.initialized = !1, t(".bx-clone", this).remove(), s.children.each(function () {
                void 0 !== t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
            }), void 0 !== t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), s.controls.el && s.controls.el.remove(), s.controls.next && s.controls.next.remove(), s.controls.prev && s.controls.prev.remove(), s.pagerEl && s.settings.controls && !s.settings.pagerCustom && s.pagerEl.remove(), t(".bx-caption", this).remove(), s.controls.autoEl && s.controls.autoEl.remove(), clearInterval(s.interval), s.settings.responsive && t(window).unbind("resize", U), s.settings.keyboardEnabled && t(document).unbind("keydown", L))
        }, o.reloadSlider = function (t) {
            void 0 !== t && (n = t), o.destroySlider(), l()
        }, l(), this
    }
}(jQuery), jQuery(document).ready(function (t) {
    (new WOW).init(), t(".main-navigation").dropdowns(), t(document).on("scroll", function () {
        t(document).scrollTop() > 20 ? t(".site-header").addClass("small") : t(".site-header").removeClass("small")
    }), t(".ui-hover li").each(function () {
        t(this).hover(function () {
            t(this).find(".hide").fadeIn("slow")
        }, function () {
            t(this).find(".hide").fadeOut("fast")
        })
    }), t("#sidebar-wrap").simplerSidebar({
        opener: "#toggle-sidebar",
        sidebar: {align: "right", width: 300, closingLinks: ".close-sidebar"}
    }), t("#check-all").click(function (e) {
        this.checked ? t(".ck-item").prop("checked", !0) : t(".ck-item").prop("checked", !1)
    }), t(".widget_nav_menu .menu").accordion({
        accordion: !0,
        speed: 300,
        closedSign: "▸",
        openedSign: "▾"
    }), t(function () {
        t("#btn-so").click(function () {
            t("#search-box").slideToggle("fast")
        }), t("#mobile-so").click(function () {
            t("#search-box").slideToggle("fast").css({display: "block"})
        })
    }), t(".bxslider2").bxSlider({
        pagerCustom: "#bx-pager",
        auto: !0
    }), t(".ui-tabs .tab-title .tab-title-item a").hover(function () {
        var e = t(this), i = e.closest(".ui-tabs"), n = e.attr("href");
        return i.find(".tab-title-item").removeClass("active"), e.closest("li").addClass("active"), i.find(".tab-content-pane").hide(), i.find(n).show(), !1
    });
    var e = t(".accordion > dd");
    e.hide(), t(".accordion > dt > a").click(function () {
        "#" === t(this).attr("href") && t(this).click(function () {
            return !1
        });
        var i = t(this).parent().next();
        i.is(":visible") ? e.slideUp("fast") : (e.slideUp(), i.slideDown("fast"))
    });
    var i = t(".toggle > dd");
    i.hide(), t(".toggle > dt > a").click(function () {
        "#" === t(this).attr("href") && t(this).click(function () {
            return !1
        });
        var e = t(this).parent().next();
        e.is(":visible") ? e.slideUp("fast") : e.slideDown("fast")
    });
    var n = t("#gotop");
    0 !== t(window).scrollTop() && n.fadeIn(1200), t(window).scroll(function () {
        0 === t(window).scrollTop() ? t(n).fadeOut(350) : t(n).fadeIn(1200)
    }), t("#add-row").on("click", function () {
        var e = t(".repeatable-fieldset:last").clone(!0);
        return e.addClass("new-row"), e.insertAfter(".repeatable-fieldset:last"), !1
    }), t(".remove-row").on("click", function () {
        return t(this).parents("tr.new-row").remove(), !1
    }), t(function () {
        t(function () {
            t(".cs-div").css({top: 200 + t(window).scrollTop(), right: "0"}), t(window).scroll(function () {
                var e = 200 + t(window).scrollTop() + "px";
                t(".cs-div").animate({top: e, right: "0"}, {duration: 500, queue: !1})
            }), t(window).resize(function () {
                var e = 200 + t(window).scrollTop() + "px";
                t(".cs-div").animate({top: e, right: "0"}, {duration: 500, queue: !1})
            }), t("#cs-close").click(function () {
                t(".cs-inner").toggle(), t(".cs-div").toggleClass("cs-bar")
            })
        })
    })
}), function (t) {
    t.fn.extend({
        accordion: function (e) {
            var i = {
                accordion: "true",
                speed: 300,
                closedSign: "[+]",
                openedSign: "[-]"
            }, n = t.extend(i, e), s = t(this);
            s.find("li").each(function () {
                0 !== t(this).find("ul").size() && (t(this).prepend("<span>" + n.closedSign + "</span>"), "#" === t(this).find("a:first").attr("href") && t(this).find("a:first").click(function () {
                    return !1
                })), (t(this).hasClass("current-cat-parent") || t(this).hasClass("current-menu-parent")) && (t(this).find("ul").show(), t(this).parent().show(), t(this).find("span:first").remove(), t(this).prepend("<span>" + n.openedSign + "</span>")), (t(this).hasClass("current-cat") || t(this).hasClass("current-menu-item")) && t(this).find("ul").show()
            }), s.find("li.active").each(function () {
                t(this).parents("ul").slideDown(n.speed), t(this).parents("ul").parent("li").find("span:first").html(n.openedSign)
            }), s.find("li span").click(function () {
                0 !== t(this).parent().find("ul").size() && (n.accordion && (t(this).parent().find("ul").is(":visible") || (parents = t(this).parent().parents("ul"), visible = s.find("ul:visible"), visible.each(function (e) {
                    var i = !0;
                    parents.each(function (t) {
                        return parents[t] === visible[e] ? (i = !1, !1) : void 0
                    }), i && t(this).parent().find("ul") !== visible[e] && t(visible[e]).slideUp(n.speed, function () {
                        t(this).parent("li").find("span:first").html(n.closedSign)
                    })
                }))), t(this).parent().find("ul:first").is(":visible") ? t(this).parent().find("ul:first").slideUp(n.speed, function () {
                    t(this).parent("li").find("span:first").delay(n.speed).html(n.closedSign)
                }) : t(this).parent().find("ul:first").slideDown(n.speed, function () {
                    t(this).parent("li").find("span:first").delay(n.speed).html(n.openedSign)
                }))
            })
        }
    })
}(jQuery), !function (t) {
    "use strict";
    t(function () {
        t.support.transition = function () {
            var t = function () {
                var t, e = document.createElement("bootstrap"), i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (t in i)if (void 0 !== e.style[t])return i[t]
            }();
            return t && {end: t}
        }()
    })
}(window.jQuery), !function (t) {
    "use strict";
    function e(e) {
        0 === l.length && t(window).bind("scroll resize", function () {
            for (var t = 0, e = l.length; e > t; t++)l[t]()
        }), l.push(e)
    }

    function i() {
        var e = this, i = setTimeout(function () {
            e.$element.off(t.support.transition.end), n.call(e)
        }, 500);
        this.$element.one(t.support.transition.end, function () {
            clearTimeout(i), n.call(e)
        })
    }

    function n(t) {
        this.$element.hide().trigger("hidden"), s.call(this)
    }

    function s(e) {
        var i = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var n = t.support.transition && i;
            this.$backdrop = t('<div class="modal-backdrop ' + i + '"></div>').appendTo(document.body);
            var s = t(document).height(), r = t(window).height(), a = t(".modal-backdrop"), l = Math.max(s, r);
            a.length && a.height(l), "static" != this.options.backdrop && this.$backdrop.click(t.proxy(this.hide, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), n ? this.$backdrop.one(t.support.transition.end, e) : e()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, t.proxy(o, this)) : o.call(this)) : e && e()
    }

    function o() {
        this.$backdrop.remove(), this.$backdrop = null
    }

    function r() {
        var e = this;
        this.isShown && this.options.keyboard ? t(document).on("keyup.dismiss.modal", function (t) {
            27 == t.which && e.hide()
        }) : this.isShown || t(document).off("keyup.dismiss.modal")
    }

    var a = function (e, i) {
        this.options = i, this.$element = t(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", t.proxy(this.hide, this)), this.isPushSetPosQueue = !1
    };
    a.prototype = {
        constructor: a, toggle: function (t) {
            return this[this.isShown ? "hide" : "show"](t)
        }, setPos: function (e) {
            e || (e = this.$element);
            var i = e[0].ownerDocument, n = i.defaultView || i.parentWindow, s = t(i).scrollTop(), o = t(n).height(), r = t(n).width(), a = e.height(), l = e.width();
            e.css({
                "margin-left": -(r > l ? parseInt(l / 2, 10) : 0) + "px",
                "margin-top": -(o > a ? parseInt(a / 2) : 0) + "px",
                top: (o > a ? parseInt(o / 2) + s : s) + "px",
                left: (r > l ? 50 : 0) + "%"
            })
        }, show: function (i) {
            var n = this;
            this.isShown || (t("body").addClass("modal-open").append(n.$element), this.setPos(n.$element), n.isPushSetPosQueue || (n.isPushSetPosQueue = !0, e(function () {
                n.setPos(n.$element)
            })), i && (i.setPos = this.setPos), this.isShown = !0, this.$element.trigger("show", i), r.call(this), s.call(this, function () {
                var e = t.support.transition && n.$element.hasClass("fade");
                !n.$element.parent().length && n.$element.appendTo(document.body), n.$element.show(), e && n.$element[0].offsetWidth, n.$element.addClass("in"), e ? n.$element.one(t.support.transition.end, function () {
                    n.$element.trigger("shown")
                }) : n.$element.trigger("shown", i)
            }))
        }, hide: function (e) {
            if (e && e.preventDefault && e.preventDefault(), this.isShown) {
                this.isShown = !1, t("body").removeClass("modal-open"), r.call(this), this.$element.trigger("hide").removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? i.call(this) : n.call(this)
            }
        }
    };
    var l = [];
    t.fn.modal = function (e, i) {
        return this.each(function () {
            var n = t(this), s = n.data("modal"), o = t.extend({}, t.fn.modal.defaults, n.data(), "object" == typeof e && e);
            s || n.data("modal", s = new a(this, o)), "string" == typeof e ? s[e](i) : o.show && s.show(i)
        })
    }, t.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, t.fn.modal.Constructor = a, t(function () {
        t("body").on("click.modal.data-api", '[data-toggle="modal"]', function (e) {
            var i, n = t(this), s = t(n.attr("data-target") || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")), o = s.data("modal") ? "toggle" : t.extend({}, s.data());
            e.preventDefault(), s.modal(o, n.data())
        })
    })
}(window.jQuery), !function (t) {
    "use strict";
    function e() {
        t(n).each(function () {
            i(t(this)).removeClass("open")
        })
    }

    function i(e) {
        var i, n = e.attr("data-target");
        return n || (n = e.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), i = n && t(n), i && i.length || (i = e.parent()), i
    }

    var n = "[data-toggle=dropdown]", s = function (e) {
        var i = t(e).on("click.dropdown.data-api", this.toggle);
        t("html").on("click.dropdown.data-api", function () {
            i.parent().removeClass("open")
        })
    };
    s.prototype = {
        constructor: s, toggle: function (n) {
            var s, o, r = t(this);
            if (!r.is(".disabled, :disabled"))return s = i(r), o = s.hasClass("open"), e(), o || s.toggleClass("open"), r.focus(), !1
        }, keydown: function (e) {
            var s, o, r, a, l;
            if (/(38|40|27)/.test(e.keyCode) && (s = t(this), e.preventDefault(), e.stopPropagation(), !s.is(".disabled, :disabled"))) {
                if (r = i(s), a = r.hasClass("open"), !a || a && 27 == e.keyCode)return 27 == e.which && r.find(n).focus(), s.click();
                o = t("[role=menu] li:not(.divider):visible a", r), o.length && (l = o.index(o.filter(":focus")), 38 == e.keyCode && l > 0 && l--, 40 == e.keyCode && l < o.length - 1 && l++, ~l || (l = 0), o.eq(l).focus())
            }
        }
    };
    var o = t.fn.dropdown;
    t.fn.dropdown = function (e) {
        return this.each(function () {
            var i = t(this), n = i.data("dropdown");
            n || i.data("dropdown", n = new s(this)), "string" == typeof e && n[e].call(i)
        })
    }, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = o, this
    }, t(document).on("click.dropdown.data-api", e).on("click.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.dropdown-menu", function (t) {
        t.stopPropagation()
    }).on("click.dropdown.data-api", n, s.prototype.toggle).on("keydown.dropdown.data-api", n + ", [role=menu]", s.prototype.keydown)
}(window.jQuery), !function (t) {
    "use strict";
    function e(e, i) {
        var n, s = t.proxy(this.process, this), o = t(t(e).is("body") ? window : e);
        this.options = t.extend({}, t.fn.scrollspy.defaults, i), this.$scrollElement = o.on("scroll.scroll-spy.data-api", s), this.selector = (this.options.target || (n = t(e).attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = t("body"), this.refresh(), this.process()
    }

    e.prototype = {
        constructor: e, refresh: function () {
            var e, i = this;
            this.offsets = t([]), this.targets = t([]), e = this.$body.find(this.selector).map(function () {
                var e = t(this), n = e.data("target") || e.attr("href"), s = /^#\w/.test(n) && t(n);
                return s && s.length && [[s.position().top + (!t.isWindow(i.$scrollElement.get(0)) && i.$scrollElement.scrollTop()), n]] || null
            }).sort(function (t, e) {
                return t[0] - e[0]
            }).each(function () {
                i.offsets.push(this[0]), i.targets.push(this[1])
            })
        }, process: function () {
            var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, n = i - this.$scrollElement.height(), s = this.offsets, o = this.targets, r = this.activeTarget;
            if (e >= n)return r != (t = o.last()[0]) && this.activate(t);
            for (t = s.length; t--;)r != o[t] && e >= s[t] && (!s[t + 1] || e <= s[t + 1]) && this.activate(o[t])
        }, activate: function (e) {
            var i, n;
            this.activeTarget = e, t(this.selector).parent(".active").removeClass("active"), n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', i = t(n).parent("li").addClass("active"), i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate")
        }
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("scrollspy"), o = "object" == typeof i && i;
            s || n.data("scrollspy", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.defaults = {offset: 10}, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = i, this
    }, t(window).on("load", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            e.scrollspy(e.data())
        })
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e) {
        this.element = t(e)
    };
    e.prototype = {
        constructor: e, show: function () {
            var e, i, n, s = this.element, o = s.closest("ul:not(.dropdown-menu)"), r = s.attr("data-target");
            r || (r = s.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), s.parent("li").hasClass("active") || (e = o.find(".active:last a")[0], n = t.Event("show", {relatedTarget: e}), s.trigger(n), n.isDefaultPrevented() || (i = t(r), this.activate(s.parent("li"), o), this.activate(i, i.parent(), function () {
                s.trigger({type: "shown", relatedTarget: e})
            })))
        }, activate: function (e, i, n) {
            function s() {
                o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
            }

            var o = i.find("> .active"), r = n && t.support.transition && o.hasClass("fade");
            r ? o.one(t.support.transition.end, s) : s(), o.removeClass("in")
        }
    };
    var i = t.fn.tab;
    t.fn.tab = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("tab");
            s || n.data("tab", s = new e(this)), "string" == typeof i && s[i]()
        })
    }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function () {
        return t.fn.tab = i, this
    }, t(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
        e.preventDefault(), t(this).tab("show")
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (t, e) {
        this.init("tooltip", t, e)
    };
    e.prototype = {
        constructor: e, init: function (e, i, n) {
            var s, o, r, a, l;
            for (this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.enabled = !0, r = this.options.trigger.split(" "), l = r.length; l--;)a = r[l], "click" == a ? this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)) : "manual" != a && (s = "hover" == a ? "mouseenter" : "focus", o = "hover" == a ? "mouseleave" : "blur", this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(o + "." + this.type, this.options.selector, t.proxy(this.leave, this)));
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (e) {
            return e = t.extend({}, t.fn[this.type].defaults, this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        }, enter: function (e) {
            var i, n = t.fn[this.type].defaults, s = {};
            return this._options && t.each(this._options, function (t, e) {
                n[t] != e && (s[t] = e)
            }, this), i = t(e.currentTarget)[this.type](s).data(this.type), i.options.delay && i.options.delay.show ? (clearTimeout(this.timeout), i.hoverState = "in", void(this.timeout = setTimeout(function () {
                "in" == i.hoverState && i.show()
            }, i.options.delay.show))) : i.show()
        }, leave: function (e) {
            var i = t(e.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), i.options.delay && i.options.delay.hide ? (i.hoverState = "out", void(this.timeout = setTimeout(function () {
                "out" == i.hoverState && i.hide()
            }, i.options.delay.hide))) : i.hide()
        }, show: function () {
            var e, i, n, s, o, r, a = t.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(a), a.isDefaultPrevented())return;
                switch (e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), o = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, e.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element), i = this.getPosition(), n = e[0].offsetWidth, s = e[0].offsetHeight, o) {
                    case"bottom":
                        r = {top: i.top + i.height, left: i.left + i.width / 2 - n / 2};
                        break;
                    case"top":
                        r = {top: i.top - s, left: i.left + i.width / 2 - n / 2};
                        break;
                    case"left":
                        r = {top: i.top + i.height / 2 - s / 2, left: i.left - n};
                        break;
                    case"right":
                        r = {top: i.top + i.height / 2 - s / 2, left: i.left + i.width}
                }
                this.applyPlacement(r, o), this.$element.trigger("shown")
            }
        }, applyPlacement: function (t, e) {
            var i, n, s, o, r = this.tip(), a = r[0].offsetWidth, l = r[0].offsetHeight;
            r.offset(t).addClass("tooltip-" + e).addClass("in"), i = r[0].offsetWidth, n = r[0].offsetHeight, "top" == e && n != l && (t.top = t.top + l - n, o = !0), "bottom" == e || "top" == e ? (s = 0, t.left < 0 && (s = -2 * t.left, t.left = 0, r.offset(t), i = r[0].offsetWidth, n = r[0].offsetHeight), this.replaceArrow(s - a + i, i, "left")) : this.replaceArrow(n - l, n, "top"), o && r.offset(t)
        }, replaceArrow: function (t, e, i) {
            this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
        }, setContent: function () {
            var t = this.tip(), e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        }, hide: function () {
            function e() {
                var e = setTimeout(function () {
                    i.off(t.support.transition.end).detach()
                }, 500);
                i.one(t.support.transition.end, function () {
                    clearTimeout(e), i.detach()
                })
            }

            var i = this.tip(), n = t.Event("hide");
            return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (i.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? e() : i.detach(), this.$element.trigger("hidden"), this)
        }, fixTitle: function () {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function () {
            var e = this.$element[0];
            return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
                width: e.offsetWidth,
                height: e.offsetHeight
            }, this.$element.offset())
        }, getTitle: function () {
            var t, e = this.$element, i = this.options;
            return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
        }, tip: function () {
            return this.$tip = this.$tip || t(this.options.template)
        }, arrow: function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (e) {
            var i = e ? t(e.currentTarget)[this.type](this._options).data(this.type) : this;
            i.tip().hasClass("in") ? i.hide() : i.show()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("tooltip"), o = "object" == typeof i && i;
            s || n.data("tooltip", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = i, this
    }
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (t, e) {
        this.init("popover", t, e)
    };
    e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype, {
        constructor: e, setContent: function () {
            var t = this.tip(), e = this.getTitle(), i = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content")[this.options.html ? "html" : "text"](i), t.removeClass("fade top bottom left right in")
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var t, e = this.$element, i = this.options;
            return t = ("function" == typeof i.content ? i.content.call(e[0]) : i.content) || e.attr("data-content")
        }, tip: function () {
            return this.$tip || (this.$tip = t(this.options.template)), this.$tip
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var i = t.fn.popover;
    t.fn.popover = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("popover"), o = "object" == typeof i && i;
            s || n.data("popover", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.defaults = t.extend({}, t.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), t.fn.popover.noConflict = function () {
        return t.fn.popover = i, this
    }
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.options = t.extend({}, t.fn.affix.defaults, i), this.$window = t(window).on("scroll.affix.data-api", t.proxy(this.checkPosition, this)).on("click.affix.data-api", t.proxy(function () {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = t(e), this.checkPosition()
    };
    e.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e, i = t(document).height(), n = this.$window.scrollTop(), s = this.$element.offset(), o = this.options.offset, r = o.bottom, a = o.top, l = "affix affix-top affix-bottom";
            "object" != typeof o && (r = a = o), "function" == typeof a && (a = o.top()), "function" == typeof r && (r = o.bottom()), e = null != this.unpin && n + this.unpin <= s.top ? !1 : null != r && s.top + this.$element.height() >= i - r ? "bottom" : null != a && a >= n ? "top" : !1, this.affixed !== e && (this.affixed = e, this.unpin = "bottom" == e ? s.top - n : null, this.$element.removeClass(l).addClass("affix" + (e ? "-" + e : "")))
        }
    };
    var i = t.fn.affix;
    t.fn.affix = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("affix"), o = "object" == typeof i && i;
            s || n.data("affix", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.affix.Constructor = e, t.fn.affix.defaults = {offset: 0}, t.fn.affix.noConflict = function () {
        return t.fn.affix = i, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var e = t(this), i = e.data();
            i.offset = i.offset || {}, i.offsetBottom && (i.offset.bottom = i.offsetBottom), i.offsetTop && (i.offset.top = i.offsetTop), e.affix(i)
        })
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = '[data-dismiss="alert"]', i = function (i) {
        t(i).on("click", e, this.close)
    };
    i.prototype.close = function (e) {
        function i() {
            n.trigger("closed").remove()
        }

        var n, s = t(this), o = s.attr("data-target");
        o || (o = s.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), n = t(o), e && e.preventDefault(), n.length || (n = s.hasClass("alert") ? s : s.parent()), n.trigger(e = t.Event("close")), e.isDefaultPrevented() || (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.on(t.support.transition.end, i) : i())
    };
    var n = t.fn.alert;
    t.fn.alert = function (e) {
        return this.each(function () {
            var n = t(this), s = n.data("alert");
            s || n.data("alert", s = new i(this)), "string" == typeof e && s[e].call(n)
        })
    }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function () {
        return t.fn.alert = n, this
    }, t(document).on("click.alert.data-api", e, i.prototype.close)
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, t.fn.button.defaults, i)
    };
    e.prototype.setState = function (t) {
        var e = "disabled", i = this.$element, n = i.data(), s = i.is("input") ? "val" : "html";
        t += "Text", n.resetText || i.data("resetText", i[s]()), i[s](n[t] || this.options[t]), setTimeout(function () {
            "loadingText" == t ? i.addClass(e).attr(e, e) : i.removeClass(e).removeAttr(e)
        }, 0)
    }, e.prototype.toggle = function () {
        var t = this.$element.closest('[data-toggle="buttons-radio"]');
        t && t.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var i = t.fn.button;
    t.fn.button = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("button"), o = "object" == typeof i && i;
            s || n.data("button", s = new e(this, o)), "toggle" == i ? s.toggle() : i && s.setState(i)
        })
    }, t.fn.button.defaults = {loadingText: "loading..."}, t.fn.button.Constructor = e, t.fn.button.noConflict = function () {
        return t.fn.button = i, this
    }, t(document).on("click.button.data-api", "[data-toggle^=button]", function (e) {
        var i = t(e.target);
        i.hasClass("btn") || (i = i.closest(".btn")), i.button("toggle")
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, t.fn.collapse.defaults, i), this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.prototype = {
        constructor: e, dimension: function () {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        }, show: function () {
            var e, i, n, s;
            if (!this.transitioning && !this.$element.hasClass("in")) {
                if (e = this.dimension(), i = t.camelCase(["scroll", e].join("-")), n = this.$parent && this.$parent.find("> .accordion-group > .in"), n && n.length) {
                    if (s = n.data("collapse"), s && s.transitioning)return;
                    n.collapse("hide"), s || n.data("collapse", null)
                }
                this.$element[e](0), this.transition("addClass", t.Event("show"), "shown"), t.support.transition && this.$element[e](this.$element[0][i])
            }
        }, hide: function () {
            var e;
            !this.transitioning && this.$element.hasClass("in") && (e = this.dimension(), this.reset(this.$element[e]()), this.transition("removeClass", t.Event("hide"), "hidden"), this.$element[e](0))
        }, reset: function (t) {
            var e = this.dimension();
            return this.$element.removeClass("collapse")[e](t || "auto")[0].offsetWidth, this.$element[null !== t ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function (e, i, n) {
            var s = this, o = function () {
                "show" == i.type && s.reset(), s.transitioning = 0, s.$element.trigger(n)
            };
            this.$element.trigger(i), i.isDefaultPrevented() || (this.transitioning = 1, this.$element[e]("in"), t.support.transition && this.$element.hasClass("collapse") ? this.$element.one(t.support.transition.end, o) : o())
        }, toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var i = t.fn.collapse;
    t.fn.collapse = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("collapse"), o = t.extend({}, t.fn.collapse.defaults, n.data(), "object" == typeof i && i);
            s || n.data("collapse", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.collapse.defaults = {toggle: !0}, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = i, this
    }, t(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (e) {
        var i, n = t(this), s = n.attr("data-target") || e.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""), o = t(s).data("collapse") ? "toggle" : n.data();
        n[t(s).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), t(s).collapse(o)
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.prototype = {
        cycle: function (e) {
            return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, getActiveIndex: function () {
            return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
        }, to: function (e) {
            var i = this.getActiveIndex(), n = this;
            if (!(e > this.$items.length - 1 || 0 > e))return this.sliding ? this.$element.one("slid", function () {
                n.to(e)
            }) : i == e ? this.pause().cycle() : this.slide(e > i ? "next" : "prev", t(this.$items[e]))
        }, pause: function (e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition.end && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
        }, next: function () {
            return this.sliding ? void 0 : this.slide("next")
        }, prev: function () {
            return this.sliding ? void 0 : this.slide("prev")
        }, slide: function (e, i) {
            var n, s = this.$element.find(".item.active"), o = i || s[e](), r = this.interval, a = "next" == e ? "left" : "right", l = "next" == e ? "first" : "last", d = this;
            if (this.sliding = !0, r && this.pause(), o = o.length ? o : this.$element.find(".item")[l](), n = t.Event("slide", {
                    relatedTarget: o[0],
                    direction: a
                }), !o.hasClass("active")) {
                if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
                        var e = t(d.$indicators.children()[d.getActiveIndex()]);
                        e && e.addClass("active")
                    })), t.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(n), n.isDefaultPrevented())return;
                    o.addClass(e), o[0].offsetWidth, s.addClass(a), o.addClass(a), this.$element.one(t.support.transition.end, function () {
                        o.removeClass([e, a].join(" ")).addClass("active"), s.removeClass(["active", a].join(" ")), d.sliding = !1, setTimeout(function () {
                            d.$element.trigger("slid")
                        }, 0)
                    })
                } else {
                    if (this.$element.trigger(n), n.isDefaultPrevented())return;
                    s.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                }
                return r && this.cycle(), this
            }
        }
    };
    var i = t.fn.carousel;
    t.fn.carousel = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("carousel"), o = t.extend({}, t.fn.carousel.defaults, "object" == typeof i && i), r = "string" == typeof i ? i : o.slide;
            s || n.data("carousel", s = new e(this, o)), "number" == typeof i ? s.to(i) : r ? s[r]() : o.interval && s.pause().cycle()
        })
    }, t.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = i, this
    }, t(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function (e) {
        var i, n, s = t(this), o = t(s.attr("data-target") || (i = s.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")), r = t.extend({}, o.data(), s.data());
        o.carousel(r), (n = s.attr("data-slide-to")) && o.data("carousel").pause().to(n).cycle(), e.preventDefault()
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, t.fn.typeahead.defaults, i), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = t(this.options.menu), this.shown = !1, this.listen()
    };
    e.prototype = {
        constructor: e, select: function () {
            var t = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(t)).change(), this.hide()
        }, updater: function (t) {
            return t
        }, show: function () {
            var e = t.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
            return this.$menu.insertAfter(this.$element).css({
                top: e.top + e.height,
                left: e.left
            }).show(), this.shown = !0, this
        }, hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        }, lookup: function (e) {
            var i;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (i = t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source, i ? this.process(i) : this)
        }, process: function (e) {
            var i = this;
            return e = t.grep(e, function (t) {
                return i.matcher(t)
            }), e = this.sorter(e), e.length ? this.render(e.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        }, matcher: function (t) {
            return ~t.toLowerCase().indexOf(this.query.toLowerCase())
        }, sorter: function (t) {
            for (var e, i = [], n = [], s = []; e = t.shift();)e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? n.push(e) : s.push(e) : i.push(e);
            return i.concat(n, s)
        }, highlighter: function (t) {
            var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return t.replace(new RegExp("(" + e + ")", "ig"), function (t, e) {
                return "<strong>" + e + "</strong>"
            })
        }, render: function (e) {
            var i = this;
            return e = t(e).map(function (e, n) {
                return e = t(i.options.item).attr("data-value", n), e.find("a").html(i.highlighter(n)), e[0]
            }), e.first().addClass("active"), this.$menu.html(e), this
        }, next: function (e) {
            var i = this.$menu.find(".active").removeClass("active"), n = i.next();
            n.length || (n = t(this.$menu.find("li")[0])), n.addClass("active")
        }, prev: function (t) {
            var e = this.$menu.find(".active").removeClass("active"), i = e.prev();
            i.length || (i = this.$menu.find("li").last()), i.addClass("active")
        }, listen: function () {
            this.$element.on("focus", t.proxy(this.focus, this)).on("blur", t.proxy(this.blur, this)).on("keypress", t.proxy(this.keypress, this)).on("keyup", t.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", t.proxy(this.keydown, this)), this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", "li", t.proxy(this.mouseenter, this)).on("mouseleave", "li", t.proxy(this.mouseleave, this))
        }, eventSupported: function (t) {
            var e = t in this.$element;
            return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e
        }, move: function (t) {
            if (this.shown) {
                switch (t.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        t.preventDefault();
                        break;
                    case 38:
                        t.preventDefault(), this.prev();
                        break;
                    case 40:
                        t.preventDefault(), this.next()
                }
                t.stopPropagation()
            }
        }, keydown: function (e) {
            this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
        }, keypress: function (t) {
            this.suppressKeyPressRepeat || this.move(t)
        }, keyup: function (t) {
            switch (t.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown)return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown)return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            t.stopPropagation(), t.preventDefault()
        }, focus: function (t) {
            this.focused = !0
        }, blur: function (t) {
            this.focused = !1, !this.mousedover && this.shown && this.hide()
        }, click: function (t) {
            t.stopPropagation(), t.preventDefault(), this.select(), this.$element.focus()
        }, mouseenter: function (e) {
            this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active")
        }, mouseleave: function (t) {
            this.mousedover = !1, !this.focused && this.shown && this.hide()
        }
    };
    var i = t.fn.typeahead;
    t.fn.typeahead = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("typeahead"), o = "object" == typeof i && i;
            s || n.data("typeahead", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function () {
        return t.fn.typeahead = i, this
    }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (e) {
        var i = t(this);
        i.data("typeahead") || i.typeahead(i.data())
    })
}(window.jQuery), ~function (t) {
    t.fn.hoverClass = function (e) {
        var i = this;
        i.on("mouseenter", function () {
            t(this).addClass(e)
        }), i.on("mouseleave", function () {
            t(this).removeClass(e), t(this).css("display")
        })
    }
}(jQuery), $.fn.queryComplete = function (t, e, i) {
    return this.length && this.each && this.each(function () {
        cityEnglishName = e || "", categoryBase = t || "", i = i || "", $(this).autocomplete({
            source: function (t, e) {
                var n;
                n = "root" == categoryBase ? "/suggest" : "/ajax/tag/autocomplete/?category=" + categoryBase + "&cityEnglishName=" + cityEnglishName + "&key=" + i, $.getJSON(n, t, function (t, i, n) {
                    $.isArray(t) && e(t)
                })
            }, select: function (t, e) {
                var i = e.item;
                i && ("root" === categoryBase ? window.location.assign("http://" + cityEnglishName + ".baixing.com/" + i.category + "/?query=" + i.value) : i.id && window.location.assign("http://" + cityEnglishName + ".baixing.com/" + categoryBase + "/" + i.id + "/"))
            }, autoFocus: !0
        }).data("autocomplete")._renderItem = function (t, e) {
            return $("<li></li>").data("item.autocomplete", e).append("<a>" + e.label + "</a>").appendTo(t)
        }
    }), this
}, ~function () {
    var t, e, i = 0;
    t = function (t, e, i) {
        if (t.indexOf("@") > 0) {
            var n = t.split("@");
            e = $.grep(e, function (t) {
                return !n[1] || t.indexOf(n[1]) > 0
            }), t = n[0]
        }
        return $.map(e, function (e) {
            return "prefix" === i ? e + t : t + e
        })
    }, e = {
        method: "keyup",
        source: [],
        placement: "subfix",
        container: $('<ul class="fillup"></ul>'),
        hoverClass: "hover"
    }, $.fn.fillUp = function (n) {
        var s = this, n = $.extend(1, e, n);
        return n.container.closest("html").length || s.after(n.container), s.on(n.method, function (e) {
            var o, r, a, l = s.val();
            if (r = n.container.hide().html(""), l) {
                o = t.call(this, l, n.source, n.placement), a = n.hoverClass, 40 == e.which ? i++ : 38 == e.which && i--, i = Math.min(o.length - 1, Math.max(0, i)), s.data("value", o[i]), $.each(o, function (t, e) {
                    r.append($("<li />").addClass(e == o[i] ? a : "").text(e))
                });
                var d = r.offsetParent().offset();
                r.data("styled") ? r.show() : r.css({
                    left: s.offset().left - d.left,
                    top: s.offset().top - d.top + s.outerHeight()
                }).show(), r.on("click", "li", function () {
                    s.val($(this).text()), r.hide()
                }), r.on("mouseenter", "li", function () {
                    $(this).addClass(a)
                }), r.on("mouseleave", "li", function () {
                    $(this).removeClass(a)
                })
            }
        }), s
    }
}(jQuery), function (t, e, i) {
    function n(t) {
        var e = {}, n = /^jQuery\d+$/;
        return i.each(t.attributes, function (t, i) {
            i.specified && !n.test(i.name) && (e[i.name] = i.value)
        }), e
    }

    function s(t, n) {
        var s = this, o = i(s);
        if (s.value == o.attr("placeholder") && o.hasClass("placeholder"))if (o.data("placeholder-password")) {
            if (o = o.hide().next().show().attr("id", o.removeAttr("id").data("placeholder-id")), t === !0)return o[0].value = n;
            o.focus()
        } else s.value = "", o.removeClass("placeholder"), s == e.activeElement && s.select()
    }

    function o() {
        var t, e = this, o = i(e), r = this.id;
        if ("" == e.value) {
            if ("password" == e.type) {
                if (!o.data("placeholder-textinput")) {
                    try {
                        t = o.clone().attr({type: "text"})
                    } catch (a) {
                        t = i("<input>").attr(i.extend(n(this), {type: "text"}))
                    }
                    t.removeAttr("name").data({
                        "placeholder-password": !0,
                        "placeholder-id": r
                    }).bind("focus.placeholder", s), o.data({"placeholder-textinput": t, "placeholder-id": r}).before(t)
                }
                o = o.removeAttr("id").hide().prev().attr("id", r).show()
            }
            o.addClass("placeholder"), o[0].value = o.attr("placeholder")
        } else o.removeClass("placeholder")
    }

    var r, a, l = "placeholder" in e.createElement("input"), d = "placeholder" in e.createElement("textarea"), c = i.fn, h = i.valHooks;
    l && d ? (a = c.placeholder = function () {
        return this
    }, a.input = a.textarea = !0) : (a = c.placeholder = function () {
        var t = this;
        return t.filter((l ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
            "focus.placeholder": s,
            "blur.placeholder": o
        }).data("placeholder-enabled", !0).each(o), t
    }, a.input = l, a.textarea = d, r = {
        get: function (t) {
            var e = i(t);
            return e.data("placeholder-enabled") && e.hasClass("placeholder") ? "" : t.value
        }, set: function (t, n) {
            var r = i(t);
            return r.data("placeholder-enabled") ? ("" == n ? (t.value = n, t != e.activeElement && o.call(t)) : r.hasClass("placeholder") ? s.call(t, !0, n) || (t.value = n) : t.value = n, r) : t.value = n
        }
    }, l || (h.input = r), d || (h.textarea = r), i(function () {
        i(e).delegate("form", "submit.placeholder", function () {
            var t = i(".placeholder", this).each(s);
            setTimeout(function () {
                t.each(o)
            }, 10)
        })
    }), i(t).bind("beforeunload.placeholder", function () {
        i(".placeholder").each(function () {
            this.value = ""
        })
    })), i(function () {
        i("input, textarea").placeholder()
    })
}(this, document, jQuery), !function () {
    $.fn.more = function (t) {
        void 0 === t && (t = {});
        var e = t.threshold;
        void 0 === e && (e = 10);
        var i = t.visible;
        void 0 === i && (i = e - 1);
        var n = t.skip;
        void 0 === n && (n = "strong"), $(this).each(function () {
            var t = $(this).children();
            if (t.size() > e) {
                var s = $('<a href="javascript:void(0)">更多»</a>');
                s.on("click", function () {
                    t.show(), $(this).hide()
                }), t.eq(i - 1).nextAll().not(n).hide(), t.last().after(s)
            }
        })
    }
}(), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.init("tip", e, i);
        var n = this;
        this.$element.on("shown", function () {
            n.tip().on("click", '[data-dismiss="tip"]', t.proxy(n.destroy, n))
        })
    };
    e.prototype = t.extend({}, t.fn.popover.Constructor.prototype, {
        constructor: e, setContent: function () {
            var t = this.tip(), e = (this.getTitle(), this.getContent());
            t.find(".tip-content")[this.options.html ? "html" : "text"](e), t.removeClass("fade top bottom left right in")
        }, applyPlacement: function (e, i) {
            var n = this.tip(), s = this.getPosition(), o = n[0].offsetWidth, r = n[0].offsetHeight;
            switch (i) {
                case"top-left":
                    e = {top: s.top - r, left: s.left}, this.arrow().css("left", s.width / 2 + "px");
                    break;
                case"top-right":
                    e = {top: s.top - r, left: s.left + s.width - o}, this.arrow().css("right", s.width / 2 + "px");
                    break;
                case"bottom-left":
                    e = {top: s.top + s.height, left: s.left}, this.arrow().css("left", s.width / 2 + "px");
                    break;
                case"bottom-right":
                    e = {
                        top: s.top + s.height,
                        left: s.left + s.width - o
                    }, this.arrow().css("right", s.width / 2 + "px")
            }
            t.fn.popover.Constructor.prototype.applyPlacement.call(this, e, i)
        }, arrow: function () {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        }
    });
    var i = t.fn.tip;
    t.fn.tip = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("tip"), o = "object" == typeof i && i;
            s || n.data("tip", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.tip.Constructor = e, t.fn.tip.defaults = t.extend({}, t.fn.popover.defaults, {
        trigger: "manual",
        template: '<div class="tip"><div class="arrow"></div><button type="button" class="close" data-dismiss="tip">&times;</button><div class="tip-content"></div></div>'
    }), t.fn.tip.noConflict = function () {
        return t.fn.tip = i, this
    }
}(window.jQuery), function (t) {
    t.fn.dropdowns = function (e) {
        var i = {toggleWidth: 768}, n = t.extend(i, e), s = document.body.clientWidth, o = function () {
            t(".nav li a").each(function () {
                t(this).next().length > 0 && t(this).addClass("parent")
            })
        }, r = function () {
            s < n.toggleWidth ? (t(".toggleMenu").css("display", "inline-block"), t("#site-navigation").removeClass("pure-menu-horizontal").addClass("pure-menu-vertical"), t(".toggleMenu").hasClass("active") ? t(".nav").show() : t(".nav").hide(), t(".nav li").unbind("mouseenter mouseleave"), t(".nav li a.parent").unbind("click").bind("click", function (e) {
                e.preventDefault(), t(this).parent("li").toggleClass("pure-menu-active")
            })) : s >= n.toggleWidth && (t(".toggleMenu").css("display", "none"), t("#site-navigation").addClass("pure-menu-horizontal").removeClass("pure-menu-vertical"), t(".nav").show(), t(".nav li a").unbind("click"), t(".nav li").unbind("mouseenter mouseleave").bind("mouseenter mouseleave", function () {
                t(this).toggleClass("pure-menu-active")
            }))
        };
        return this.each(function () {
            t(".toggleMenu").click(function (e) {
                e.preventDefault(), t(this).toggleClass("active"), t(this).next(".nav").toggle(), r()
            }), r(), o(), t(window).bind("resize orientationchange", function () {
                s = document.body.clientWidth, r()
            })
        })
    }
}(jQuery), function (t) {
    t.fn.scrollbox = function (e) {
        var i = {
            linear: !1,
            startDelay: 2,
            delay: 3,
            step: 5,
            speed: 32,
            switchItems: 1,
            direction: "vertical",
            distance: "auto",
            autoPlay: !0,
            onMouseOverPause: !0,
            paused: !1,
            queue: null,
            listElement: "ul",
            listItemElement: "li"
        };
        return e = t.extend(i, e), e.scrollOffset = "vertical" === e.direction ? "scrollTop" : "scrollLeft", e.queue && (e.queue = t("#" + e.queue)), this.each(function () {
            var i, n, s, o, r, a, l, d, c = t(this), h = null, u = null, p = !1;
            e.onMouseOverPause && (c.bind("mouseover", function () {
                p = !0
            }), c.bind("mouseout", function () {
                p = !1
            })), i = c.children(e.listElement + ":first-child"), r = function () {
                if (!p) {
                    var t, n, o, r, a;
                    if (t = i.children(e.listItemElement + ":first-child"), r = "auto" !== e.distance ? e.distance : "vertical" === e.direction ? t.outerHeight(!0) : t.outerWidth(!0), e.linear ? o = Math.min(c[0][e.scrollOffset] + e.step, r) : (a = Math.max(3, parseInt(.3 * (r - c[0][e.scrollOffset]), 10)), o = Math.min(c[0][e.scrollOffset] + a, r)), c[0][e.scrollOffset] = o, o >= r) {
                        for (n = 0; n < e.switchItems; n++)e.queue && e.queue.find(e.listItemElement).length > 0 ? (i.append(e.queue.find(e.listItemElement)[0]), i.children(e.listItemElement + ":first-child").remove()) : i.append(i.children(e.listItemElement + ":first-child"));
                        c[0][e.scrollOffset] = 0, clearInterval(h), e.autoPlay && (u = setTimeout(s, 1e3 * e.delay))
                    }
                }
            }, a = function () {
                if (!p) {
                    var t, n, o, r, a, l;
                    if (0 === c[0][e.scrollOffset]) {
                        for (o = i.children(e.listItemElement).length, n = 0; n < e.switchItems; n++)i.children(e.listItemElement + ":last-child").insertBefore(i.children(e.listItemElement + ":first-child"));
                        t = i.children(e.listItemElement + ":first-child"), a = "auto" !== e.distance ? e.distance : "vertical" === e.direction ? t.height() : t.width(), c[0][e.scrollOffset] = a
                    }
                    e.linear ? r = Math.max(c[0][e.scrollOffset] - e.step, 0) : (l = Math.max(3, parseInt(.3 * c[0][e.scrollOffset], 10)), r = Math.max(c[0][e.scrollOffset] - l, 0)), c[0][e.scrollOffset] = r, 0 === r && (clearInterval(h), e.autoPlay && (u = setTimeout(s, 1e3 * e.delay)))
                }
            }, s = function () {
                clearInterval(h), h = setInterval(r, e.speed)
            }, l = function () {
                e.autoPlay = !0, p = !1, clearInterval(h), h = setInterval(r, e.speed)
            }, d = function () {
                p = !0
            }, n = function () {
                clearInterval(h), h = setInterval(a, e.speed)
            }, o = function (t) {
                e.delay = t || e.delay, clearTimeout(u), e.autoPlay && (u = setTimeout(s, 1e3 * e.delay))
            }, e.autoPlay && (u = setTimeout(s, 1e3 * e.startDelay)), c.bind("resetClock", function (t) {
                o(t)
            }), c.bind("forward", function () {
                clearTimeout(u), s()
            }), c.bind("pauseHover", function () {
                d()
            }), c.bind("forwardHover", function () {
                l()
            }), c.bind("backward", function () {
                clearTimeout(u), n()
            }), c.bind("speedUp", function (t) {
                "undefined" == typeof t && (t = Math.max(1, parseInt(e.speed / 2, 10))), e.speed = t
            }), c.bind("speedDown", function (t) {
                "undefined" == typeof t && (t = 2 * e.speed), e.speed = t
            }), c.bind("updateConfig", function (i, n) {
                e = t.extend(e, n)
            })
        })
    }
}(jQuery), function (t) {
    t.fn.simplerSidebar = function (e) {
        var i = t.extend(!0, t.fn.simplerSidebar.settings, e);
        return this.each(function () {
            var e, n, s, o, r, a, l = i.attr, d = t(this), c = t(i.opener), h = i.sidebar.closingLinks, u = i.animation.duration, p = i.sidebar.width, f = i.sidebar.gap, g = p + f, v = t(window).width(), m = {}, w = {}, x = function () {
                t("body, html").css("overflow", "hidden")
            }, b = function () {
                t("body, html").css("overflow", "auto")
            }, y = {duration: u, easing: i.animation.easing, complete: x}, S = {
                duration: u,
                easing: i.animation.easing,
                complete: b
            }, C = function () {
                d.animate(m, y).attr("data-" + l, "active"), E.fadeIn(u)
            }, k = function () {
                d.animate(w, S).attr("data-" + l, "disabled"), E.fadeOut(u)
            }, T = function () {
                var t = d.attr("data-" + l), i = d.width();
                w[e] = -i, "active" === t && k()
            }, E = t("<div>").attr("data-" + l, "mask");
            void 0 === i.sidebar.align || "right" === i.sidebar.align ? e = "right" : "left" === i.sidebar.align && (e = "left"), n = g > v ? v - f : p, s = {
                position: "fixed",
                top: i.top,
                bottom: 0,
                width: n
            }, s[e] = -n, m[e] = 0, o = t.extend(!0, s, i.sidebar.css), d.css(o).attr("data-" + l, "disabled"), r = {
                position: "fixed",
                top: i.top,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: i.sidebar.css.zIndex - 1,
                display: "none"
            }, a = t.extend(!0, r, i.mask.css), !0 === i.mask.display && E.appendTo("body").css(a), c.click(function () {
                var t = d.attr("data-" + l), i = d.width();
                w[e] = -i, "disabled" === t ? C() : "active" === t && k()
            }), E.click(T), d.on("click", h, T), t(window).resize(function () {
                var i, n, s = d.attr("data-" + l), o = t(window).width();
                i = g > o ? o - f : p, n = {width: i}, "disabled" === s ? (n[e] = -i, d.css(n)) : "active" === s && d.css(n)
            })
        })
    }, t.fn.simplerSidebar.settings = {
        attr: "simplersidebar",
        top: 0,
        animation: {duration: 500, easing: "swing"},
        sidebar: {width: 300, gap: 64, closingLinks: "a", css: {zIndex: 3e3}},
        mask: {display: !0, css: {backgroundColor: "black", opacity: .5, filter: "Alpha(opacity=50)"}}
    }
}(jQuery), function () {
    var t, e, i, n, s, o = function (t, e) {
        return function () {
            return t.apply(e, arguments)
        }
    }, r = [].indexOf || function (t) {
            for (var e = 0, i = this.length; i > e; e++)if (e in this && this[e] === t)return e;
            return -1
        };
    e = function () {
        function t() {
        }

        return t.prototype.extend = function (t, e) {
            var i, n;
            for (i in e)n = e[i], null == t[i] && (t[i] = n);
            return t
        }, t.prototype.isMobile = function (t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.createEvent = function (t, e, i, n) {
            var s;
            return null == e && (e = !1), null == i && (i = !1), null == n && (n = null), null != document.createEvent ? (s = document.createEvent("CustomEvent"), s.initCustomEvent(t, e, i, n)) : null != document.createEventObject ? (s = document.createEventObject(), s.eventType = t) : s.eventName = t, s
        }, t.prototype.emitEvent = function (t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }, t.prototype.addEvent = function (t, e, i) {
            return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
        }, t.prototype.removeEvent = function (t, e, i) {
            return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
        }, t.prototype.innerHeight = function () {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), i = this.WeakMap || this.MozWeakMap || (i = function () {
            function t() {
                this.keys = [], this.values = []
            }

            return t.prototype.get = function (t) {
                var e, i, n, s, o;
                for (o = this.keys, e = n = 0, s = o.length; s > n; e = ++n)if (i = o[e], i === t)return this.values[e]
            }, t.prototype.set = function (t, e) {
                var i, n, s, o, r;
                for (r = this.keys, i = s = 0, o = r.length; o > s; i = ++s)if (n = r[i], n === t)return void(this.values[i] = e);
                return this.keys.push(t), this.values.push(e)
            }, t
        }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
            function t() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }

            return t.notSupported = !0, t.prototype.observe = function () {
            }, t
        }()), n = this.getComputedStyle || function (t, e) {
            return this.getPropertyValue = function (e) {
                var i;
                return "float" === e && (e = "styleFloat"), s.test(e) && e.replace(s, function (t, e) {
                    return e.toUpperCase()
                }), (null != (i = t.currentStyle) ? i[e] : void 0) || null
            }, this
        }, s = /(\-([a-z]){1})/g, this.WOW = function () {
        function s(t) {
            null == t && (t = {}), this.scrollCallback = o(this.scrollCallback, this), this.scrollHandler = o(this.scrollHandler, this), this.resetAnimation = o(this.resetAnimation, this), this.start = o(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), null != t.scrollContainer && (this.config.scrollContainer = document.querySelector(t.scrollContainer)), this.animationNameCache = new i, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }

        return s.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, s.prototype.init = function () {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, s.prototype.start = function () {
            var e, i, n, s;
            if (this.stopped = !1, this.boxes = function () {
                    var t, i, n, s;
                    for (n = this.element.querySelectorAll("." + this.config.boxClass), s = [], t = 0, i = n.length; i > t; t++)e = n[t], s.push(e);
                    return s
                }.call(this), this.all = function () {
                    var t, i, n, s;
                    for (n = this.boxes, s = [], t = 0, i = n.length; i > t; t++)e = n[t], s.push(e);
                    return s
                }.call(this), this.boxes.length)if (this.disabled())this.resetStyle(); else for (s = this.boxes, i = 0, n = s.length; n > i; i++)e = s[i], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function (t) {
                return function (e) {
                    var i, n, s, o, r;
                    for (r = [], i = 0, n = e.length; n > i; i++)o = e[i], r.push(function () {
                        var t, e, i, n;
                        for (i = o.addedNodes || [], n = [], t = 0, e = i.length; e > t; t++)s = i[t], n.push(this.doSync(s));
                        return n
                    }.call(t));
                    return r
                }
            }(this)).observe(document.body, {childList: !0, subtree: !0}) : void 0
        }, s.prototype.stop = function () {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, s.prototype.sync = function (e) {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, s.prototype.doSync = function (t) {
            var e, i, n, s, o;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (t = t.parentNode || t, s = t.querySelectorAll("." + this.config.boxClass), o = [], i = 0, n = s.length; n > i; i++)e = s[i], r.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), o.push(this.scrolled = !0)) : o.push(void 0);
                return o
            }
        }, s.prototype.show = function (t) {
            return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t
        }, s.prototype.applyStyle = function (t, e) {
            var i, n, s;
            return n = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), s = t.getAttribute("data-wow-iteration"), this.animate(function (o) {
                return function () {
                    return o.customStyle(t, e, n, i, s)
                }
            }(this))
        }, s.prototype.animate = function () {
            return "requestAnimationFrame" in window ? function (t) {
                return window.requestAnimationFrame(t)
            } : function (t) {
                return t()
            }
        }(), s.prototype.resetStyle = function () {
            var t, e, i, n, s;
            for (n = this.boxes, s = [], e = 0, i = n.length; i > e; e++)t = n[e], s.push(t.style.visibility = "visible");
            return s
        }, s.prototype.resetAnimation = function (t) {
            var e;
            return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement, e.className = e.className.replace(this.config.animateClass, "").trim()) : void 0
        }, s.prototype.customStyle = function (t, e, i, n, s) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {animationDuration: i}), n && this.vendorSet(t.style, {animationDelay: n}), s && this.vendorSet(t.style, {animationIterationCount: s}), this.vendorSet(t.style, {animationName: e ? "none" : this.cachedAnimationName(t)}), t
        }, s.prototype.vendors = ["moz", "webkit"], s.prototype.vendorSet = function (t, e) {
            var i, n, s, o;
            n = [];
            for (i in e)s = e[i], t["" + i] = s, n.push(function () {
                var e, n, r, a;
                for (r = this.vendors, a = [], e = 0, n = r.length; n > e; e++)o = r[e], a.push(t["" + o + i.charAt(0).toUpperCase() + i.substr(1)] = s);
                return a
            }.call(this));
            return n
        }, s.prototype.vendorCSS = function (t, e) {
            var i, s, o, r, a, l;
            for (a = n(t), r = a.getPropertyCSSValue(e), o = this.vendors, i = 0, s = o.length; s > i; i++)l = o[i], r = r || a.getPropertyCSSValue("-" + l + "-" + e);

            return r
        }, s.prototype.animationName = function (t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (i) {
                e = n(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, s.prototype.cacheAnimationName = function (t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, s.prototype.cachedAnimationName = function (t) {
            return this.animationNameCache.get(t)
        }, s.prototype.scrollHandler = function () {
            return this.scrolled = !0
        }, s.prototype.scrollCallback = function () {
            var t;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                var e, i, n, s;
                for (n = this.boxes, s = [], e = 0, i = n.length; i > e; e++)t = n[e], t && (this.isVisible(t) ? this.show(t) : s.push(t));
                return s
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, s.prototype.offsetTop = function (t) {
            for (var e; void 0 === t.offsetTop;)t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;)e += t.offsetTop;
            return e
        }, s.prototype.isVisible = function (t) {
            var e, i, n, s, o;
            return i = t.getAttribute("data-wow-offset") || this.config.offset, o = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, s = o + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, n = this.offsetTop(t), e = n + t.clientHeight, s >= n && e >= o
        }, s.prototype.util = function () {
            return null != this._util ? this._util : this._util = new e
        }, s.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, s
    }()
}.call(this);
//# sourceMappingURL=maps/main.js.map