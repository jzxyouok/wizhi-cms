!function (e) {
    var t = {
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
    e.fn.bxSlider = function (n) {
        if (0 === this.length)return this;
        if (this.length > 1)return this.each(function () {
            e(this).bxSlider(n)
        }), this;
        var s = {}, o = this, r = e(window).width(), a = e(window).height(), l = function () {
            s.settings = e.extend({}, t, n), s.settings.slideWidth = parseInt(s.settings.slideWidth), s.children = o.children(s.settings.slideSelector), s.children.length < s.settings.minSlides && (s.settings.minSlides = s.children.length), s.children.length < s.settings.maxSlides && (s.settings.maxSlides = s.children.length), s.settings.randomStart && (s.settings.startSlide = Math.floor(Math.random() * s.children.length)), s.active = {index: s.settings.startSlide}, s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1 ? !0 : !1, s.carousel && (s.settings.preloadImages = "all"), s.minThreshold = s.settings.minSlides * s.settings.slideWidth + (s.settings.minSlides - 1) * s.settings.slideMargin, s.maxThreshold = s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin, s.working = !1, s.controls = {}, s.interval = null, s.animProp = "vertical" === s.settings.mode ? "top" : "left", s.usingCSS = s.settings.useCSS && "fade" !== s.settings.mode && function () {
                    var e = document.createElement("div"), t = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in t)if (void 0 !== e.style[t[i]])return s.cssPrefix = t[i].replace("Perspective", "").toLowerCase(), s.animProp = "-" + s.cssPrefix + "-transform", !0;
                    return !1
                }(), "vertical" === s.settings.mode && (s.settings.maxSlides = s.settings.minSlides), o.data("origStyle", o.attr("style")), o.children(s.settings.slideSelector).each(function () {
                e(this).data("origStyle", e(this).attr("style"))
            }), d()
        }, d = function () {
            o.wrap('<div class="' + s.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), s.viewport = o.parent(), s.loader = e('<div class="bx-loading" />'), s.viewport.prepend(s.loader), o.css({
                width: "horizontal" === s.settings.mode ? 1e3 * s.children.length + 215 + "%" : "auto",
                position: "absolute"
            }), s.usingCSS && s.settings.easing ? o.css("-" + s.cssPrefix + "-transition-timing-function", s.settings.easing) : s.settings.easing || (s.settings.easing = "swing");
            v();
            s.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            }), s.viewport.parent().css({maxWidth: u()}), s.settings.pager || s.settings.controls || s.viewport.parent().css({margin: "0 auto 0px"}), s.children.css({
                "float": "horizontal" === s.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
            }), s.children.css("width", h()), "horizontal" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginRight", s.settings.slideMargin), "vertical" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginBottom", s.settings.slideMargin), "fade" === s.settings.mode && (s.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }), s.children.eq(s.settings.startSlide).css({
                zIndex: s.settings.slideZIndex,
                display: "block"
            })), s.controls.el = e('<div class="bx-controls" />'), s.settings.captions && P(), s.active.last = s.settings.startSlide === f() - 1, s.settings.video && o.fitVids();
            var t = s.children.eq(s.settings.startSlide);
            ("all" === s.settings.preloadImages || s.settings.ticker) && (t = s.children), s.settings.ticker ? s.settings.pager = !1 : (s.settings.controls && C(), s.settings.auto && s.settings.autoControls && T(), s.settings.pager && w(), (s.settings.controls || s.settings.autoControls || s.settings.pager) && s.viewport.after(s.controls.el)), c(t, g)
        }, c = function (t, i) {
            var n = t.find('img:not([src=""]), iframe').length;
            if (0 === n)return void i();
            var s = 0;
            t.find('img:not([src=""]), iframe').each(function () {
                e(this).one("load error", function () {
                    ++s === n && i()
                }).each(function () {
                    this.complete && e(this).load()
                })
            })
        }, g = function () {
            if (s.settings.infiniteLoop && "fade" !== s.settings.mode && !s.settings.ticker) {
                var t = "vertical" === s.settings.mode ? s.settings.minSlides : s.settings.maxSlides, i = s.children.slice(0, t).clone(!0).addClass("bx-clone"), n = s.children.slice(-t).clone(!0).addClass("bx-clone");
                o.append(i).prepend(n)
            }
            s.loader.remove(), m(), "vertical" === s.settings.mode && (s.settings.adaptiveHeight = !0), s.viewport.height(p()), o.redrawSlider(), s.settings.onSliderLoad(s, s.active.index), s.initialized = !0, s.settings.responsive && e(window).bind("resize", Z), s.settings.auto && s.settings.autoStart && (f() > 1 || s.settings.autoSlideForOnePage) && A(), s.settings.ticker && H(), s.settings.pager && I(s.settings.startSlide), s.settings.controls && W(), s.settings.touchEnabled && !s.settings.ticker && O(), s.settings.keyboardEnabled && !s.settings.ticker && e(document).keydown(N)
        }, p = function () {
            var t = 0, n = e();
            if ("vertical" === s.settings.mode || s.settings.adaptiveHeight)if (s.carousel) {
                var o = 1 === s.settings.moveSlides ? s.active.index : s.active.index * x();
                for (n = s.children.eq(o), i = 1; i <= s.settings.maxSlides - 1; i++)n = n.add(o + i >= s.children.length ? s.children.eq(i - 1) : s.children.eq(o + i))
            } else n = s.children.eq(s.active.index); else n = s.children;
            return "vertical" === s.settings.mode ? (n.each(function (i) {
                t += e(this).outerHeight()
            }), s.settings.slideMargin > 0 && (t += s.settings.slideMargin * (s.settings.minSlides - 1))) : t = Math.max.apply(Math, n.map(function () {
                return e(this).outerHeight(!1)
            }).get()), "border-box" === s.viewport.css("box-sizing") ? t += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom")) + parseFloat(s.viewport.css("border-top-width")) + parseFloat(s.viewport.css("border-bottom-width")) : "padding-box" === s.viewport.css("box-sizing") && (t += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom"))), t
        }, u = function () {
            var e = "100%";
            return s.settings.slideWidth > 0 && (e = "horizontal" === s.settings.mode ? s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin : s.settings.slideWidth), e
        }, h = function () {
            var e = s.settings.slideWidth, t = s.viewport.width();
            return 0 === s.settings.slideWidth || s.settings.slideWidth > t && !s.carousel || "vertical" === s.settings.mode ? e = t : s.settings.maxSlides > 1 && "horizontal" === s.settings.mode && (t > s.maxThreshold || t < s.minThreshold && (e = (t - s.settings.slideMargin * (s.settings.minSlides - 1)) / s.settings.minSlides)), e
        }, v = function () {
            var e = 1;
            if ("horizontal" === s.settings.mode && s.settings.slideWidth > 0)if (s.viewport.width() < s.minThreshold)e = s.settings.minSlides; else if (s.viewport.width() > s.maxThreshold)e = s.settings.maxSlides; else {
                var t = s.children.first().width() + s.settings.slideMargin;
                e = Math.floor((s.viewport.width() + s.settings.slideMargin) / t)
            } else"vertical" === s.settings.mode && (e = s.settings.minSlides);
            return e
        }, f = function () {
            var e = 0;
            if (s.settings.moveSlides > 0)if (s.settings.infiniteLoop)e = Math.ceil(s.children.length / x()); else for (var t = 0, i = 0; t < s.children.length;)++e, t = i + v(), i += s.settings.moveSlides <= v() ? s.settings.moveSlides : v(); else e = Math.ceil(s.children.length / v());
            return e
        }, x = function () {
            return s.settings.moveSlides > 0 && s.settings.moveSlides <= v() ? s.settings.moveSlides : v()
        }, m = function () {
            var e;
            if (s.children.length > s.settings.maxSlides && s.active.last && !s.settings.infiniteLoop) {
                if ("horizontal" === s.settings.mode) {
                    var t = s.children.last();
                    e = t.position(), S(-(e.left - (s.viewport.width() - t.outerWidth())), "reset", 0)
                } else if ("vertical" === s.settings.mode) {
                    var i = s.children.length - s.settings.minSlides;
                    e = s.children.eq(i).position(), S(-e.top, "reset", 0)
                }
            } else e = s.children.eq(s.active.index * x()).position(), s.active.index === f() - 1 && (s.active.last = !0), void 0 !== e && ("horizontal" === s.settings.mode ? S(-e.left, "reset", 0) : "vertical" === s.settings.mode && S(-e.top, "reset", 0))
        }, S = function (e, t, i, n) {
            if (s.usingCSS) {
                var r = "vertical" === s.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)";
                o.css("-" + s.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" === t ? setTimeout(function () {
                    o.css(s.animProp, r), 0 === e ? q() : o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                        o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), q()
                    })
                }, 0) : "reset" === t ? o.css(s.animProp, r) : "ticker" === t && (o.css("-" + s.cssPrefix + "-transition-timing-function", "linear"), o.css(s.animProp, r), o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), S(n.resetValue, "reset", 0), L()
                }))
            } else {
                var a = {};
                a[s.animProp] = e, "slide" === t ? o.animate(a, i, s.settings.easing, function () {
                    q()
                }) : "reset" === t ? o.css(s.animProp, e) : "ticker" === t && o.animate(a, speed, "linear", function () {
                    S(n.resetValue, "reset", 0), L()
                })
            }
        }, b = function () {
            for (var t = "", i = f(), n = 0; i > n; n++) {
                var o = "";
                s.settings.buildPager && e.isFunction(s.settings.buildPager) || s.settings.pagerCustom ? (o = s.settings.buildPager(n), s.pagerEl.addClass("bx-custom-pager")) : (o = n + 1, s.pagerEl.addClass("bx-default-pager")), t += '<div class="bx-pager-item"><a href="" data-slide-index="' + n + '" class="bx-pager-link">' + o + "</a></div>"
            }
            s.pagerEl.html(t)
        }, w = function () {
            s.settings.pagerCustom ? s.pagerEl = e(s.settings.pagerCustom) : (s.pagerEl = e('<div class="bx-pager" />'), s.settings.pagerSelector ? e(s.settings.pagerSelector).html(s.pagerEl) : s.controls.el.addClass("bx-has-pager").append(s.pagerEl), b()), s.pagerEl.on("click touchend", "a", z)
        }, C = function () {
            s.controls.next = e('<a class="bx-next" href="">' + s.settings.nextText + "</a>"), s.controls.prev = e('<a class="bx-prev" href="">' + s.settings.prevText + "</a>"), s.controls.next.bind("click touchend", E), s.controls.prev.bind("click touchend", y), s.settings.nextSelector && e(s.settings.nextSelector).append(s.controls.next), s.settings.prevSelector && e(s.settings.prevSelector).append(s.controls.prev), s.settings.nextSelector || s.settings.prevSelector || (s.controls.directionEl = e('<div class="bx-controls-direction" />'), s.controls.directionEl.append(s.controls.prev).append(s.controls.next), s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl))
        }, T = function () {
            s.controls.start = e('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + s.settings.startText + "</a></div>"), s.controls.stop = e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + s.settings.stopText + "</a></div>"), s.controls.autoEl = e('<div class="bx-controls-auto" />'), s.controls.autoEl.on("click", ".bx-start", k), s.controls.autoEl.on("click", ".bx-stop", M), s.settings.autoControlsCombine ? s.controls.autoEl.append(s.controls.start) : s.controls.autoEl.append(s.controls.start).append(s.controls.stop), s.settings.autoControlsSelector ? e(s.settings.autoControlsSelector).html(s.controls.autoEl) : s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl), D(s.settings.autoStart ? "stop" : "start")
        }, P = function () {
            s.children.each(function (t) {
                var i = e(this).find("img:first").attr("title");
                void 0 !== i && ("" + i).length && e(this).append('<div class="bx-caption"><span>' + i + "</span></div>")
            })
        }, E = function (e) {
            e.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && o.stopAuto(), o.goToNextSlide())
        }, y = function (e) {
            e.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && o.stopAuto(), o.goToPrevSlide())
        }, k = function (e) {
            o.startAuto(), e.preventDefault()
        }, M = function (e) {
            o.stopAuto(), e.preventDefault()
        }, z = function (t) {
            if (t.preventDefault(), !s.controls.el.hasClass("disabled")) {
                s.settings.auto && o.stopAuto();
                var i = e(t.currentTarget);
                if (void 0 !== i.attr("data-slide-index")) {
                    var n = parseInt(i.attr("data-slide-index"));
                    n !== s.active.index && o.goToSlide(n)
                }
            }
        }, I = function (t) {
            var i = s.children.length;
            return "short" === s.settings.pagerType ? (s.settings.maxSlides > 1 && (i = Math.ceil(s.children.length / s.settings.maxSlides)), void s.pagerEl.html(t + 1 + s.settings.pagerShortSeparator + i)) : (s.pagerEl.find("a").removeClass("active"), void s.pagerEl.each(function (i, n) {
                e(n).find("a").eq(t).addClass("active")
            }))
        }, q = function () {
            if (s.settings.infiniteLoop) {
                var e = "";
                0 === s.active.index ? e = s.children.eq(0).position() : s.active.index === f() - 1 && s.carousel ? e = s.children.eq((f() - 1) * x()).position() : s.active.index === s.children.length - 1 && (e = s.children.eq(s.children.length - 1).position()), e && ("horizontal" === s.settings.mode ? S(-e.left, "reset", 0) : "vertical" === s.settings.mode && S(-e.top, "reset", 0))
            }
            s.working = !1, s.settings.onSlideAfter(s.children.eq(s.active.index), s.oldIndex, s.active.index)
        }, D = function (e) {
            s.settings.autoControlsCombine ? s.controls.autoEl.html(s.controls[e]) : (s.controls.autoEl.find("a").removeClass("active"), s.controls.autoEl.find("a:not(.bx-" + e + ")").addClass("active"))
        }, W = function () {
            1 === f() ? (s.controls.prev.addClass("disabled"), s.controls.next.addClass("disabled")) : !s.settings.infiniteLoop && s.settings.hideControlOnEnd && (0 === s.active.index ? (s.controls.prev.addClass("disabled"), s.controls.next.removeClass("disabled")) : s.active.index === f() - 1 ? (s.controls.next.addClass("disabled"), s.controls.prev.removeClass("disabled")) : (s.controls.prev.removeClass("disabled"), s.controls.next.removeClass("disabled")))
        }, A = function () {
            if (s.settings.autoDelay > 0) {
                setTimeout(o.startAuto, s.settings.autoDelay)
            } else o.startAuto(), e(window).focus(function () {
                o.startAuto()
            }).blur(function () {
                o.stopAuto()
            });
            s.settings.autoHover && o.hover(function () {
                s.interval && (o.stopAuto(!0), s.autoPaused = !0)
            }, function () {
                s.autoPaused && (o.startAuto(!0), s.autoPaused = null)
            })
        }, H = function () {
            var t = 0;
            if ("next" === s.settings.autoDirection)o.append(s.children.clone().addClass("bx-clone")); else {
                o.prepend(s.children.clone().addClass("bx-clone"));
                var i = s.children.first().position();
                t = "horizontal" === s.settings.mode ? -i.left : -i.top
            }
            if (S(t, "reset", 0), s.settings.pager = !1, s.settings.controls = !1, s.settings.autoControls = !1, s.settings.tickerHover)if (s.usingCSS) {
                var n, r = "horizontal" == s.settings.mode ? 4 : 5;
                s.viewport.hover(function () {
                    var e = o.css("-" + s.cssPrefix + "-transform");
                    n = parseFloat(e.split(",")[r]), S(n, "reset", 0)
                }, function () {
                    var t = 0;
                    s.children.each(function (i) {
                        t += "horizontal" == s.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                    });
                    var i = s.settings.speed / t, o = ("horizontal" == s.settings.mode ? "left" : "top", i * (t - Math.abs(parseInt(n))));
                    L(o)
                })
            } else s.viewport.hover(function () {
                o.stop()
            }, function () {
                var t = 0;
                s.children.each(function (i) {
                    t += "horizontal" == s.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                });
                var i = s.settings.speed / t, n = "horizontal" == s.settings.mode ? "left" : "top", r = i * (t - Math.abs(parseInt(o.css(n))));
                L(r)
            });
            L()
        }, L = function (e) {
            speed = e ? e : s.settings.speed;
            var t = {left: 0, top: 0}, i = {left: 0, top: 0};
            "next" === s.settings.autoDirection ? t = o.find(".bx-clone").first().position() : i = s.children.first().position();
            var n = "horizontal" === s.settings.mode ? -t.left : -t.top, r = "horizontal" === s.settings.mode ? -i.left : -i.top, a = {resetValue: r};
            S(n, "ticker", speed, a)
        }, F = function (t) {
            var i = e(window), n = {top: i.scrollTop(), left: i.scrollLeft()};
            n.right = n.left + i.width(), n.bottom = n.top + i.height();
            var s = t.offset();
            return s.right = s.left + t.outerWidth(), s.bottom = s.top + t.outerHeight(), !(n.right < s.left || n.left > s.right || n.bottom < s.top || n.top > s.bottom)
        }, N = function (e) {
            var t = document.activeElement.tagName.toLowerCase(), i = "input|textarea", n = new RegExp(t, ["i"]), s = n.exec(i);
            if (null == s && F(o)) {
                if (39 == e.keyCode)return E(e), !1;
                if (37 == e.keyCode)return y(e), !1
            }
        }, O = function () {
            s.touch = {
                start: {x: 0, y: 0},
                end: {x: 0, y: 0}
            }, s.viewport.bind("touchstart MSPointerDown pointerdown", X), s.viewport.on("click", ".bxslider a", function (e) {
                s.viewport.hasClass("click-disabled") && (e.preventDefault(), s.viewport.removeClass("click-disabled"))
            })
        }, X = function (e) {
            if (s.controls.el.addClass("disabled"), s.working)e.preventDefault(), s.controls.el.removeClass("disabled"); else {
                s.touch.originalPos = o.position();
                var t = e.originalEvent, i = "undefined" != typeof t.changedTouches ? t.changedTouches : [t];
                s.touch.start.x = i[0].pageX, s.touch.start.y = i[0].pageY, s.viewport.get(0).setPointerCapture && (s.pointerId = t.pointerId, s.viewport.get(0).setPointerCapture(s.pointerId)), s.viewport.bind("touchmove MSPointerMove pointermove", R), s.viewport.bind("touchend MSPointerUp pointerup", V), s.viewport.bind("MSPointerCancel pointercancel", Y)
            }
        }, Y = function (e) {
            S(s.touch.originalPos.left, "reset", 0), s.controls.el.removeClass("disabled"), s.viewport.unbind("MSPointerCancel pointercancel", Y), s.viewport.unbind("touchmove MSPointerMove pointermove", R), s.viewport.unbind("touchend MSPointerUp pointerup", V), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId)
        }, R = function (e) {
            var t = e.originalEvent, i = "undefined" != typeof t.changedTouches ? t.changedTouches : [t], n = Math.abs(i[0].pageX - s.touch.start.x), o = Math.abs(i[0].pageY - s.touch.start.y);
            if (3 * n > o && s.settings.preventDefaultSwipeX ? e.preventDefault() : 3 * o > n && s.settings.preventDefaultSwipeY && e.preventDefault(), "fade" !== s.settings.mode && s.settings.oneToOneTouch) {
                var r = 0, a = 0;
                "horizontal" === s.settings.mode ? (a = i[0].pageX - s.touch.start.x, r = s.touch.originalPos.left + a) : (a = i[0].pageY - s.touch.start.y, r = s.touch.originalPos.top + a), S(r, "reset", 0)
            }
        }, V = function (e) {
            s.viewport.unbind("touchmove MSPointerMove pointermove", R), s.controls.el.removeClass("disabled");
            var t = e.originalEvent, i = "undefined" != typeof t.changedTouches ? t.changedTouches : [t], n = 0, r = 0;
            s.touch.end.x = i[0].pageX, s.touch.end.y = i[0].pageY, "fade" === s.settings.mode ? (r = Math.abs(s.touch.start.x - s.touch.end.x), r >= s.settings.swipeThreshold && (s.touch.start.x > s.touch.end.x ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto())) : ("horizontal" === s.settings.mode ? (r = s.touch.end.x - s.touch.start.x, n = s.touch.originalPos.left) : (r = s.touch.end.y - s.touch.start.y, n = s.touch.originalPos.top), !s.settings.infiniteLoop && (0 === s.active.index && r > 0 || s.active.last && 0 > r) ? S(n, "reset", 200) : Math.abs(r) >= s.settings.swipeThreshold ? (0 > r ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto()) : S(n, "reset", 200)), s.viewport.unbind("touchend MSPointerUp pointerup", V), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId)
        }, Z = function (t) {
            if (s.initialized)if (s.working)window.setTimeout(Z, 10); else {
                var i = e(window).width(), n = e(window).height();
                (r !== i || a !== n) && (r = i, a = n, o.redrawSlider(), s.settings.onSliderResize.call(o, s.active.index))
            }
        };
        return o.goToSlide = function (t, i) {
            if (!s.working && s.active.index !== t) {
                s.working = !0, s.oldIndex = s.active.index, s.active.index = 0 > t ? f() - 1 : t >= f() ? 0 : t;
                var n = !0;
                if (n = s.settings.onSlideBefore(s.children.eq(s.active.index), s.oldIndex, s.active.index), "undefined" != typeof n && !n)return s.active.index = s.oldIndex, void(s.working = !1);
                if ("next" === i ? s.settings.onSlideNext(s.children.eq(s.active.index), s.oldIndex, s.active.index) || (n = !1) : "prev" === i && (s.settings.onSlidePrev(s.children.eq(s.active.index), s.oldIndex, s.active.index) || (n = !1)), "undefined" != typeof n && !n)return s.active.index = s.oldIndex, void(s.working = !1);
                if (s.active.last = s.active.index >= f() - 1, (s.settings.pager || s.settings.pagerCustom) && I(s.active.index), s.settings.controls && W(), "fade" === s.settings.mode)s.settings.adaptiveHeight && s.viewport.height() !== p() && s.viewport.animate({height: p()}, s.settings.adaptiveHeightSpeed), s.children.filter(":visible").fadeOut(s.settings.speed).css({zIndex: 0}), s.children.eq(s.active.index).css("zIndex", s.settings.slideZIndex + 1).fadeIn(s.settings.speed, function () {
                    e(this).css("zIndex", s.settings.slideZIndex), q()
                }); else {
                    s.settings.adaptiveHeight && s.viewport.height() !== p() && s.viewport.animate({height: p()}, s.settings.adaptiveHeightSpeed);
                    var r = 0, a = {left: 0, top: 0}, l = null;
                    if (!s.settings.infiniteLoop && s.carousel && s.active.last)if ("horizontal" === s.settings.mode)l = s.children.eq(s.children.length - 1), a = l.position(), r = s.viewport.width() - l.outerWidth(); else {
                        var d = s.children.length - s.settings.minSlides;
                        a = s.children.eq(d).position()
                    } else if (s.carousel && s.active.last && "prev" === i) {
                        var c = 1 === s.settings.moveSlides ? s.settings.maxSlides - x() : (f() - 1) * x() - (s.children.length - s.settings.maxSlides);
                        l = o.children(".bx-clone").eq(c), a = l.position()
                    } else if ("next" === i && 0 === s.active.index)a = o.find("> .bx-clone").eq(s.settings.maxSlides).position(), s.active.last = !1; else if (t >= 0) {
                        var g = t * x();
                        a = s.children.eq(g).position()
                    }
                    if ("undefined" != typeof a) {
                        var u = "horizontal" === s.settings.mode ? -(a.left - r) : -a.top;
                        S(u, "slide", s.settings.speed)
                    }
                }
            }
        }, o.goToNextSlide = function () {
            if (s.settings.infiniteLoop || !s.active.last) {
                var e = parseInt(s.active.index) + 1;
                o.goToSlide(e, "next")
            }
        }, o.goToPrevSlide = function () {
            if (s.settings.infiniteLoop || 0 !== s.active.index) {
                var e = parseInt(s.active.index) - 1;
                o.goToSlide(e, "prev")
            }
        }, o.startAuto = function (e) {
            s.interval || (s.interval = setInterval(function () {
                "next" === s.settings.autoDirection ? o.goToNextSlide() : o.goToPrevSlide()
            }, s.settings.pause), s.settings.autoControls && e !== !0 && D("stop"))
        }, o.stopAuto = function (e) {
            s.interval && (clearInterval(s.interval), s.interval = null, s.settings.autoControls && e !== !0 && D("start"))
        }, o.getCurrentSlide = function () {
            return s.active.index
        }, o.getCurrentSlideElement = function () {
            return s.children.eq(s.active.index)
        }, o.getSlideCount = function () {
            return s.children.length
        }, o.isWorking = function () {
            return s.working
        }, o.redrawSlider = function () {
            s.children.add(o.find(".bx-clone")).outerWidth(h()), s.viewport.css("height", p()), s.settings.ticker || m(), s.active.last && (s.active.index = f() - 1), s.active.index >= f() && (s.active.last = !0), s.settings.pager && !s.settings.pagerCustom && (b(), I(s.active.index))
        }, o.destroySlider = function () {
            s.initialized && (s.initialized = !1, e(".bx-clone", this).remove(), s.children.each(function () {
                void 0 !== e(this).data("origStyle") ? e(this).attr("style", e(this).data("origStyle")) : e(this).removeAttr("style")
            }), void 0 !== e(this).data("origStyle") ? this.attr("style", e(this).data("origStyle")) : e(this).removeAttr("style"), e(this).unwrap().unwrap(), s.controls.el && s.controls.el.remove(), s.controls.next && s.controls.next.remove(), s.controls.prev && s.controls.prev.remove(), s.pagerEl && s.settings.controls && !s.settings.pagerCustom && s.pagerEl.remove(), e(".bx-caption", this).remove(), s.controls.autoEl && s.controls.autoEl.remove(), clearInterval(s.interval), s.settings.responsive && e(window).unbind("resize", Z), s.settings.keyboardEnabled && e(document).unbind("keydown", N))
        }, o.reloadSlider = function (e) {
            void 0 !== e && (n = e), o.destroySlider(), l()
        }, l(), this
    }
}(jQuery), !function (e) {
    var t = {
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
    e.fn.bxSlider = function (n) {
        if (0 === this.length)return this;
        if (this.length > 1)return this.each(function () {
            e(this).bxSlider(n)
        }), this;
        var s = {}, o = this, r = e(window).width(), a = e(window).height(), l = function () {
            s.settings = e.extend({}, t, n), s.settings.slideWidth = parseInt(s.settings.slideWidth), s.children = o.children(s.settings.slideSelector), s.children.length < s.settings.minSlides && (s.settings.minSlides = s.children.length), s.children.length < s.settings.maxSlides && (s.settings.maxSlides = s.children.length), s.settings.randomStart && (s.settings.startSlide = Math.floor(Math.random() * s.children.length)), s.active = {index: s.settings.startSlide}, s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1 ? !0 : !1, s.carousel && (s.settings.preloadImages = "all"), s.minThreshold = s.settings.minSlides * s.settings.slideWidth + (s.settings.minSlides - 1) * s.settings.slideMargin, s.maxThreshold = s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin, s.working = !1, s.controls = {}, s.interval = null, s.animProp = "vertical" === s.settings.mode ? "top" : "left", s.usingCSS = s.settings.useCSS && "fade" !== s.settings.mode && function () {
                    var e = document.createElement("div"), t = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in t)if (void 0 !== e.style[t[i]])return s.cssPrefix = t[i].replace("Perspective", "").toLowerCase(), s.animProp = "-" + s.cssPrefix + "-transform", !0;
                    return !1
                }(), "vertical" === s.settings.mode && (s.settings.maxSlides = s.settings.minSlides), o.data("origStyle", o.attr("style")), o.children(s.settings.slideSelector).each(function () {
                e(this).data("origStyle", e(this).attr("style"))
            }), d()
        }, d = function () {
            o.wrap('<div class="' + s.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), s.viewport = o.parent(), s.loader = e('<div class="bx-loading" />'), s.viewport.prepend(s.loader), o.css({
                width: "horizontal" === s.settings.mode ? 1e3 * s.children.length + 215 + "%" : "auto",
                position: "absolute"
            }), s.usingCSS && s.settings.easing ? o.css("-" + s.cssPrefix + "-transition-timing-function", s.settings.easing) : s.settings.easing || (s.settings.easing = "swing"), v(), s.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            }), s.viewport.parent().css({maxWidth: u()}), s.settings.pager || s.settings.controls || s.viewport.parent().css({margin: "0 auto 0px"}), s.children.css({
                "float": "horizontal" === s.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
            }), s.children.css("width", h()), "horizontal" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginRight", s.settings.slideMargin), "vertical" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginBottom", s.settings.slideMargin), "fade" === s.settings.mode && (s.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }), s.children.eq(s.settings.startSlide).css({
                zIndex: s.settings.slideZIndex,
                display: "block"
            })), s.controls.el = e('<div class="bx-controls" />'), s.settings.captions && P(), s.active.last = s.settings.startSlide === f() - 1, s.settings.video && o.fitVids();
            var t = s.children.eq(s.settings.startSlide);
            ("all" === s.settings.preloadImages || s.settings.ticker) && (t = s.children), s.settings.ticker ? s.settings.pager = !1 : (s.settings.controls && C(), s.settings.auto && s.settings.autoControls && T(), s.settings.pager && w(), (s.settings.controls || s.settings.autoControls || s.settings.pager) && s.viewport.after(s.controls.el)), c(t, g)
        }, c = function (t, i) {
            var n = t.find('img:not([src=""]), iframe').length;
            if (0 === n)return void i();
            var s = 0;
            t.find('img:not([src=""]), iframe').each(function () {
                e(this).one("load error", function () {
                    ++s === n && i()
                }).each(function () {
                    this.complete && e(this).load()
                })
            })
        }, g = function () {
            if (s.settings.infiniteLoop && "fade" !== s.settings.mode && !s.settings.ticker) {
                var t = "vertical" === s.settings.mode ? s.settings.minSlides : s.settings.maxSlides, i = s.children.slice(0, t).clone(!0).addClass("bx-clone"), n = s.children.slice(-t).clone(!0).addClass("bx-clone");
                o.append(i).prepend(n)
            }
            s.loader.remove(), m(), "vertical" === s.settings.mode && (s.settings.adaptiveHeight = !0), s.viewport.height(p()), o.redrawSlider(), s.settings.onSliderLoad(s, s.active.index), s.initialized = !0, s.settings.responsive && e(window).bind("resize", Z), s.settings.auto && s.settings.autoStart && (f() > 1 || s.settings.autoSlideForOnePage) && A(), s.settings.ticker && H(), s.settings.pager && I(s.settings.startSlide), s.settings.controls && W(), s.settings.touchEnabled && !s.settings.ticker && O(), s.settings.keyboardEnabled && !s.settings.ticker && e(document).keydown(N)
        }, p = function () {
            var t = 0, n = e();
            if ("vertical" === s.settings.mode || s.settings.adaptiveHeight)if (s.carousel) {
                var o = 1 === s.settings.moveSlides ? s.active.index : s.active.index * x();
                for (n = s.children.eq(o), i = 1; i <= s.settings.maxSlides - 1; i++)n = n.add(s.children.eq(o + i >= s.children.length ? i - 1 : o + i))
            } else n = s.children.eq(s.active.index); else n = s.children;
            return "vertical" === s.settings.mode ? (n.each(function () {
                t += e(this).outerHeight()
            }), s.settings.slideMargin > 0 && (t += s.settings.slideMargin * (s.settings.minSlides - 1))) : t = Math.max.apply(Math, n.map(function () {
                return e(this).outerHeight(!1)
            }).get()), "border-box" === s.viewport.css("box-sizing") ? t += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom")) + parseFloat(s.viewport.css("border-top-width")) + parseFloat(s.viewport.css("border-bottom-width")) : "padding-box" === s.viewport.css("box-sizing") && (t += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom"))), t
        }, u = function () {
            var e = "100%";
            return s.settings.slideWidth > 0 && (e = "horizontal" === s.settings.mode ? s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin : s.settings.slideWidth), e
        }, h = function () {
            var e = s.settings.slideWidth, t = s.viewport.width();
            return 0 === s.settings.slideWidth || s.settings.slideWidth > t && !s.carousel || "vertical" === s.settings.mode ? e = t : s.settings.maxSlides > 1 && "horizontal" === s.settings.mode && (t > s.maxThreshold || t < s.minThreshold && (e = (t - s.settings.slideMargin * (s.settings.minSlides - 1)) / s.settings.minSlides)), e
        }, v = function () {
            var e = 1;
            if ("horizontal" === s.settings.mode && s.settings.slideWidth > 0)if (s.viewport.width() < s.minThreshold)e = s.settings.minSlides; else if (s.viewport.width() > s.maxThreshold)e = s.settings.maxSlides; else {
                var t = s.children.first().width() + s.settings.slideMargin;
                e = Math.floor((s.viewport.width() + s.settings.slideMargin) / t)
            } else"vertical" === s.settings.mode && (e = s.settings.minSlides);
            return e
        }, f = function () {
            var e = 0;
            if (s.settings.moveSlides > 0)if (s.settings.infiniteLoop)e = Math.ceil(s.children.length / x()); else for (var t = 0, i = 0; t < s.children.length;)++e, t = i + v(), i += s.settings.moveSlides <= v() ? s.settings.moveSlides : v(); else e = Math.ceil(s.children.length / v());
            return e
        }, x = function () {
            return s.settings.moveSlides > 0 && s.settings.moveSlides <= v() ? s.settings.moveSlides : v()
        }, m = function () {
            var e;
            if (s.children.length > s.settings.maxSlides && s.active.last && !s.settings.infiniteLoop) {
                if ("horizontal" === s.settings.mode) {
                    var t = s.children.last();
                    e = t.position(), S(-(e.left - (s.viewport.width() - t.outerWidth())), "reset", 0)
                } else if ("vertical" === s.settings.mode) {
                    var i = s.children.length - s.settings.minSlides;
                    e = s.children.eq(i).position(), S(-e.top, "reset", 0)
                }
            } else e = s.children.eq(s.active.index * x()).position(), s.active.index === f() - 1 && (s.active.last = !0), void 0 !== e && ("horizontal" === s.settings.mode ? S(-e.left, "reset", 0) : "vertical" === s.settings.mode && S(-e.top, "reset", 0))
        }, S = function (e, t, i, n) {
            if (s.usingCSS) {
                var r = "vertical" === s.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)";
                o.css("-" + s.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" === t ? setTimeout(function () {
                    o.css(s.animProp, r), 0 === e ? q() : o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                        o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), q()
                    })
                }, 0) : "reset" === t ? o.css(s.animProp, r) : "ticker" === t && (o.css("-" + s.cssPrefix + "-transition-timing-function", "linear"), o.css(s.animProp, r), o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), S(n.resetValue, "reset", 0), L()
                }))
            } else {
                var a = {};
                a[s.animProp] = e, "slide" === t ? o.animate(a, i, s.settings.easing, function () {
                    q()
                }) : "reset" === t ? o.css(s.animProp, e) : "ticker" === t && o.animate(a, speed, "linear", function () {
                    S(n.resetValue, "reset", 0), L()
                })
            }
        }, b = function () {
            for (var t = "", i = f(), n = 0; i > n; n++) {
                var o = "";
                s.settings.buildPager && e.isFunction(s.settings.buildPager) || s.settings.pagerCustom ? (o = s.settings.buildPager(n), s.pagerEl.addClass("bx-custom-pager")) : (o = n + 1, s.pagerEl.addClass("bx-default-pager")), t += '<div class="bx-pager-item"><a href="" data-slide-index="' + n + '" class="bx-pager-link">' + o + "</a></div>";

            }
            s.pagerEl.html(t)
        }, w = function () {
            s.settings.pagerCustom ? s.pagerEl = e(s.settings.pagerCustom) : (s.pagerEl = e('<div class="bx-pager" />'), s.settings.pagerSelector ? e(s.settings.pagerSelector).html(s.pagerEl) : s.controls.el.addClass("bx-has-pager").append(s.pagerEl), b()), s.pagerEl.on("click touchend", "a", z)
        }, C = function () {
            s.controls.next = e('<a class="bx-next" href="">' + s.settings.nextText + "</a>"), s.controls.prev = e('<a class="bx-prev" href="">' + s.settings.prevText + "</a>"), s.controls.next.bind("click touchend", E), s.controls.prev.bind("click touchend", y), s.settings.nextSelector && e(s.settings.nextSelector).append(s.controls.next), s.settings.prevSelector && e(s.settings.prevSelector).append(s.controls.prev), s.settings.nextSelector || s.settings.prevSelector || (s.controls.directionEl = e('<div class="bx-controls-direction" />'), s.controls.directionEl.append(s.controls.prev).append(s.controls.next), s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl))
        }, T = function () {
            s.controls.start = e('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + s.settings.startText + "</a></div>"), s.controls.stop = e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + s.settings.stopText + "</a></div>"), s.controls.autoEl = e('<div class="bx-controls-auto" />'), s.controls.autoEl.on("click", ".bx-start", k), s.controls.autoEl.on("click", ".bx-stop", M), s.settings.autoControlsCombine ? s.controls.autoEl.append(s.controls.start) : s.controls.autoEl.append(s.controls.start).append(s.controls.stop), s.settings.autoControlsSelector ? e(s.settings.autoControlsSelector).html(s.controls.autoEl) : s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl), D(s.settings.autoStart ? "stop" : "start")
        }, P = function () {
            s.children.each(function () {
                var t = e(this).find("img:first").attr("title");
                void 0 !== t && ("" + t).length && e(this).append('<div class="bx-caption"><span>' + t + "</span></div>")
            })
        }, E = function (e) {
            e.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && o.stopAuto(), o.goToNextSlide())
        }, y = function (e) {
            e.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && o.stopAuto(), o.goToPrevSlide())
        }, k = function (e) {
            o.startAuto(), e.preventDefault()
        }, M = function (e) {
            o.stopAuto(), e.preventDefault()
        }, z = function (t) {
            if (t.preventDefault(), !s.controls.el.hasClass("disabled")) {
                s.settings.auto && o.stopAuto();
                var i = e(t.currentTarget);
                if (void 0 !== i.attr("data-slide-index")) {
                    var n = parseInt(i.attr("data-slide-index"));
                    n !== s.active.index && o.goToSlide(n)
                }
            }
        }, I = function (t) {
            var i = s.children.length;
            return "short" === s.settings.pagerType ? (s.settings.maxSlides > 1 && (i = Math.ceil(s.children.length / s.settings.maxSlides)), void s.pagerEl.html(t + 1 + s.settings.pagerShortSeparator + i)) : (s.pagerEl.find("a").removeClass("active"), void s.pagerEl.each(function (i, n) {
                e(n).find("a").eq(t).addClass("active")
            }))
        }, q = function () {
            if (s.settings.infiniteLoop) {
                var e = "";
                0 === s.active.index ? e = s.children.eq(0).position() : s.active.index === f() - 1 && s.carousel ? e = s.children.eq((f() - 1) * x()).position() : s.active.index === s.children.length - 1 && (e = s.children.eq(s.children.length - 1).position()), e && ("horizontal" === s.settings.mode ? S(-e.left, "reset", 0) : "vertical" === s.settings.mode && S(-e.top, "reset", 0))
            }
            s.working = !1, s.settings.onSlideAfter(s.children.eq(s.active.index), s.oldIndex, s.active.index)
        }, D = function (e) {
            s.settings.autoControlsCombine ? s.controls.autoEl.html(s.controls[e]) : (s.controls.autoEl.find("a").removeClass("active"), s.controls.autoEl.find("a:not(.bx-" + e + ")").addClass("active"))
        }, W = function () {
            1 === f() ? (s.controls.prev.addClass("disabled"), s.controls.next.addClass("disabled")) : !s.settings.infiniteLoop && s.settings.hideControlOnEnd && (0 === s.active.index ? (s.controls.prev.addClass("disabled"), s.controls.next.removeClass("disabled")) : s.active.index === f() - 1 ? (s.controls.next.addClass("disabled"), s.controls.prev.removeClass("disabled")) : (s.controls.prev.removeClass("disabled"), s.controls.next.removeClass("disabled")))
        }, A = function () {
            s.settings.autoDelay > 0 ? setTimeout(o.startAuto, s.settings.autoDelay) : (o.startAuto(), e(window).focus(function () {
                o.startAuto()
            }).blur(function () {
                o.stopAuto()
            })), s.settings.autoHover && o.hover(function () {
                s.interval && (o.stopAuto(!0), s.autoPaused = !0)
            }, function () {
                s.autoPaused && (o.startAuto(!0), s.autoPaused = null)
            })
        }, H = function () {
            var t = 0;
            if ("next" === s.settings.autoDirection)o.append(s.children.clone().addClass("bx-clone")); else {
                o.prepend(s.children.clone().addClass("bx-clone"));
                var i = s.children.first().position();
                t = "horizontal" === s.settings.mode ? -i.left : -i.top
            }
            if (S(t, "reset", 0), s.settings.pager = !1, s.settings.controls = !1, s.settings.autoControls = !1, s.settings.tickerHover)if (s.usingCSS) {
                var n, r = "horizontal" == s.settings.mode ? 4 : 5;
                s.viewport.hover(function () {
                    var e = o.css("-" + s.cssPrefix + "-transform");
                    n = parseFloat(e.split(",")[r]), S(n, "reset", 0)
                }, function () {
                    var t = 0;
                    s.children.each(function () {
                        t += "horizontal" == s.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                    });
                    var i = s.settings.speed / t, o = ("horizontal" == s.settings.mode ? "left" : "top", i * (t - Math.abs(parseInt(n))));
                    L(o)
                })
            } else s.viewport.hover(function () {
                o.stop()
            }, function () {
                var t = 0;
                s.children.each(function () {
                    t += "horizontal" == s.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                });
                var i = s.settings.speed / t, n = "horizontal" == s.settings.mode ? "left" : "top", r = i * (t - Math.abs(parseInt(o.css(n))));
                L(r)
            });
            L()
        }, L = function (e) {
            speed = e ? e : s.settings.speed;
            var t = {left: 0, top: 0}, i = {left: 0, top: 0};
            "next" === s.settings.autoDirection ? t = o.find(".bx-clone").first().position() : i = s.children.first().position();
            var n = "horizontal" === s.settings.mode ? -t.left : -t.top, r = "horizontal" === s.settings.mode ? -i.left : -i.top, a = {resetValue: r};
            S(n, "ticker", speed, a)
        }, F = function (t) {
            var i = e(window), n = {top: i.scrollTop(), left: i.scrollLeft()};
            n.right = n.left + i.width(), n.bottom = n.top + i.height();
            var s = t.offset();
            return s.right = s.left + t.outerWidth(), s.bottom = s.top + t.outerHeight(), !(n.right < s.left || n.left > s.right || n.bottom < s.top || n.top > s.bottom)
        }, N = function (e) {
            var t = document.activeElement.tagName.toLowerCase(), i = "input|textarea", n = new RegExp(t, ["i"]), s = n.exec(i);
            if (null == s && F(o)) {
                if (39 == e.keyCode)return E(e), !1;
                if (37 == e.keyCode)return y(e), !1
            }
        }, O = function () {
            s.touch = {
                start: {x: 0, y: 0},
                end: {x: 0, y: 0}
            }, s.viewport.bind("touchstart MSPointerDown pointerdown", X), s.viewport.on("click", ".bxslider a", function (e) {
                s.viewport.hasClass("click-disabled") && (e.preventDefault(), s.viewport.removeClass("click-disabled"))
            })
        }, X = function (e) {
            if (s.controls.el.addClass("disabled"), s.working)e.preventDefault(), s.controls.el.removeClass("disabled"); else {
                s.touch.originalPos = o.position();
                var t = e.originalEvent, i = "undefined" != typeof t.changedTouches ? t.changedTouches : [t];
                s.touch.start.x = i[0].pageX, s.touch.start.y = i[0].pageY, s.viewport.get(0).setPointerCapture && (s.pointerId = t.pointerId, s.viewport.get(0).setPointerCapture(s.pointerId)), s.viewport.bind("touchmove MSPointerMove pointermove", R), s.viewport.bind("touchend MSPointerUp pointerup", V), s.viewport.bind("MSPointerCancel pointercancel", Y)
            }
        }, Y = function () {
            S(s.touch.originalPos.left, "reset", 0), s.controls.el.removeClass("disabled"), s.viewport.unbind("MSPointerCancel pointercancel", Y), s.viewport.unbind("touchmove MSPointerMove pointermove", R), s.viewport.unbind("touchend MSPointerUp pointerup", V), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId)
        }, R = function (e) {
            var t = e.originalEvent, i = "undefined" != typeof t.changedTouches ? t.changedTouches : [t], n = Math.abs(i[0].pageX - s.touch.start.x), o = Math.abs(i[0].pageY - s.touch.start.y);
            if (3 * n > o && s.settings.preventDefaultSwipeX ? e.preventDefault() : 3 * o > n && s.settings.preventDefaultSwipeY && e.preventDefault(), "fade" !== s.settings.mode && s.settings.oneToOneTouch) {
                var r = 0, a = 0;
                "horizontal" === s.settings.mode ? (a = i[0].pageX - s.touch.start.x, r = s.touch.originalPos.left + a) : (a = i[0].pageY - s.touch.start.y, r = s.touch.originalPos.top + a), S(r, "reset", 0)
            }
        }, V = function (e) {
            s.viewport.unbind("touchmove MSPointerMove pointermove", R), s.controls.el.removeClass("disabled");
            var t = e.originalEvent, i = "undefined" != typeof t.changedTouches ? t.changedTouches : [t], n = 0, r = 0;
            s.touch.end.x = i[0].pageX, s.touch.end.y = i[0].pageY, "fade" === s.settings.mode ? (r = Math.abs(s.touch.start.x - s.touch.end.x), r >= s.settings.swipeThreshold && (s.touch.start.x > s.touch.end.x ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto())) : ("horizontal" === s.settings.mode ? (r = s.touch.end.x - s.touch.start.x, n = s.touch.originalPos.left) : (r = s.touch.end.y - s.touch.start.y, n = s.touch.originalPos.top), !s.settings.infiniteLoop && (0 === s.active.index && r > 0 || s.active.last && 0 > r) ? S(n, "reset", 200) : Math.abs(r) >= s.settings.swipeThreshold ? (0 > r ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto()) : S(n, "reset", 200)), s.viewport.unbind("touchend MSPointerUp pointerup", V), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId)
        }, Z = function () {
            if (s.initialized)if (s.working)window.setTimeout(Z, 10); else {
                var t = e(window).width(), i = e(window).height();
                (r !== t || a !== i) && (r = t, a = i, o.redrawSlider(), s.settings.onSliderResize.call(o, s.active.index))
            }
        };
        return o.goToSlide = function (t, i) {
            if (!s.working && s.active.index !== t) {
                s.working = !0, s.oldIndex = s.active.index, s.active.index = 0 > t ? f() - 1 : t >= f() ? 0 : t;
                var n = !0;
                if (n = s.settings.onSlideBefore(s.children.eq(s.active.index), s.oldIndex, s.active.index), "undefined" != typeof n && !n)return s.active.index = s.oldIndex, void(s.working = !1);
                if ("next" === i ? s.settings.onSlideNext(s.children.eq(s.active.index), s.oldIndex, s.active.index) || (n = !1) : "prev" === i && (s.settings.onSlidePrev(s.children.eq(s.active.index), s.oldIndex, s.active.index) || (n = !1)), "undefined" != typeof n && !n)return s.active.index = s.oldIndex, void(s.working = !1);
                if (s.active.last = s.active.index >= f() - 1, (s.settings.pager || s.settings.pagerCustom) && I(s.active.index), s.settings.controls && W(), "fade" === s.settings.mode)s.settings.adaptiveHeight && s.viewport.height() !== p() && s.viewport.animate({height: p()}, s.settings.adaptiveHeightSpeed), s.children.filter(":visible").fadeOut(s.settings.speed).css({zIndex: 0}), s.children.eq(s.active.index).css("zIndex", s.settings.slideZIndex + 1).fadeIn(s.settings.speed, function () {
                    e(this).css("zIndex", s.settings.slideZIndex), q()
                }); else {
                    s.settings.adaptiveHeight && s.viewport.height() !== p() && s.viewport.animate({height: p()}, s.settings.adaptiveHeightSpeed);
                    var r = 0, a = {left: 0, top: 0}, l = null;
                    if (!s.settings.infiniteLoop && s.carousel && s.active.last)if ("horizontal" === s.settings.mode)l = s.children.eq(s.children.length - 1), a = l.position(), r = s.viewport.width() - l.outerWidth(); else {
                        var d = s.children.length - s.settings.minSlides;
                        a = s.children.eq(d).position()
                    } else if (s.carousel && s.active.last && "prev" === i) {
                        var c = 1 === s.settings.moveSlides ? s.settings.maxSlides - x() : (f() - 1) * x() - (s.children.length - s.settings.maxSlides);
                        l = o.children(".bx-clone").eq(c), a = l.position()
                    } else if ("next" === i && 0 === s.active.index)a = o.find("> .bx-clone").eq(s.settings.maxSlides).position(), s.active.last = !1; else if (t >= 0) {
                        var g = t * x();
                        a = s.children.eq(g).position()
                    }
                    if ("undefined" != typeof a) {
                        var u = "horizontal" === s.settings.mode ? -(a.left - r) : -a.top;
                        S(u, "slide", s.settings.speed)
                    }
                }
            }
        }, o.goToNextSlide = function () {
            if (s.settings.infiniteLoop || !s.active.last) {
                var e = parseInt(s.active.index) + 1;
                o.goToSlide(e, "next")
            }
        }, o.goToPrevSlide = function () {
            if (s.settings.infiniteLoop || 0 !== s.active.index) {
                var e = parseInt(s.active.index) - 1;
                o.goToSlide(e, "prev")
            }
        }, o.startAuto = function (e) {
            s.interval || (s.interval = setInterval(function () {
                "next" === s.settings.autoDirection ? o.goToNextSlide() : o.goToPrevSlide()
            }, s.settings.pause), s.settings.autoControls && e !== !0 && D("stop"))
        }, o.stopAuto = function (e) {
            s.interval && (clearInterval(s.interval), s.interval = null, s.settings.autoControls && e !== !0 && D("start"))
        }, o.getCurrentSlide = function () {
            return s.active.index
        }, o.getCurrentSlideElement = function () {
            return s.children.eq(s.active.index)
        }, o.getSlideCount = function () {
            return s.children.length
        }, o.isWorking = function () {
            return s.working
        }, o.redrawSlider = function () {
            s.children.add(o.find(".bx-clone")).outerWidth(h()), s.viewport.css("height", p()), s.settings.ticker || m(), s.active.last && (s.active.index = f() - 1), s.active.index >= f() && (s.active.last = !0), s.settings.pager && !s.settings.pagerCustom && (b(), I(s.active.index))
        }, o.destroySlider = function () {
            s.initialized && (s.initialized = !1, e(".bx-clone", this).remove(), s.children.each(function () {
                void 0 !== e(this).data("origStyle") ? e(this).attr("style", e(this).data("origStyle")) : e(this).removeAttr("style")
            }), void 0 !== e(this).data("origStyle") ? this.attr("style", e(this).data("origStyle")) : e(this).removeAttr("style"), e(this).unwrap().unwrap(), s.controls.el && s.controls.el.remove(), s.controls.next && s.controls.next.remove(), s.controls.prev && s.controls.prev.remove(), s.pagerEl && s.settings.controls && !s.settings.pagerCustom && s.pagerEl.remove(), e(".bx-caption", this).remove(), s.controls.autoEl && s.controls.autoEl.remove(), clearInterval(s.interval), s.settings.responsive && e(window).unbind("resize", Z), s.settings.keyboardEnabled && e(document).unbind("keydown", N))
        }, o.reloadSlider = function (e) {
            void 0 !== e && (n = e), o.destroySlider(), l()
        }, l(), this
    }
}(jQuery);
//# sourceMappingURL=maps/customizer.js.map