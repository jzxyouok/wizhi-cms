(function (e, t) {
    "use strict";
    var n = n || function (n) {
            var a = {
                element: null,
                dragger: null,
                disable: "none",
                addBodyClasses: !0,
                hyperextensible: !0,
                resistance: .5,
                flickThreshold: 50,
                transitionSpeed: .3,
                easing: "ease",
                maxPosition: 266,
                minPosition: -266,
                tapToClose: !0,
                touchToDrag: !0,
                slideIntent: 40,
                minDragDistance: 5
            }, s = {
                simpleStates: {
                    opening: null,
                    towards: null,
                    hyperExtending: null,
                    halfway: null,
                    flick: null,
                    translation: {absolute: 0, relative: 0, sinceDirectionChange: 0, percentage: 0}
                }
            }, r = {}, i = {
                hasTouch: "ontouchstart" in t.documentElement || e.navigator.msPointerEnabled,
                eventType: function (e) {
                    var t = {
                        down: i.hasTouch ? "touchstart" : "mousedown",
                        move: i.hasTouch ? "touchmove" : "mousemove",
                        up: i.hasTouch ? "touchend" : "mouseup",
                        out: i.hasTouch ? "touchcancel" : "mouseout"
                    };
                    return t[e]
                },
                page: function (e, t) {
                    return i.hasTouch && t.touches.length && t.touches[0] ? t.touches[0]["page" + e] : t["page" + e]
                },
                klass: {
                    has: function (e, t) {
                        return -1 !== e.className.indexOf(t)
                    }, add: function (e, t) {
                        !i.klass.has(e, t) && a.addBodyClasses && (e.className += " " + t)
                    }, remove: function (e, t) {
                        a.addBodyClasses && (e.className = e.className.replace(t, "").replace(/^\s+|\s+$/g, ""))
                    }
                },
                dispatchEvent: function (e) {
                    return "function" == typeof r[e] ? r[e].call() : void 0
                },
                vendor: function () {
                    var e, n = t.createElement("div"), a = "webkit Moz O ms".split(" ");
                    for (e in a)if ("undefined" != typeof n.style[a[e] + "Transition"])return a[e]
                },
                transitionCallback: function () {
                    return "Moz" === s.vendor || "ms" === s.vendor ? "transitionend" : s.vendor + "TransitionEnd"
                },
                canTransform: function () {
                    return "undefined" != typeof a.element.style[s.vendor + "Transform"]
                },
                deepExtend: function (e, t) {
                    var n;
                    for (n in t)t[n] && t[n].constructor && t[n].constructor === Object ? (e[n] = e[n] || {}, i.deepExtend(e[n], t[n])) : e[n] = t[n];
                    return e
                },
                angleOfDrag: function (e, t) {
                    var n, a;
                    return a = Math.atan2(-(s.startDragY - t), s.startDragX - e), 0 > a && (a += 2 * Math.PI), n = Math.floor(a * (180 / Math.PI) - 180), 0 > n && n > -180 && (n = 360 - Math.abs(n)), Math.abs(n)
                },
                events: {
                    addEvent: function (e, t, n) {
                        return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : void 0
                    }, removeEvent: function (e, t, n) {
                        return e.addEventListener ? e.removeEventListener(t, n, !1) : e.attachEvent ? e.detachEvent("on" + t, n) : void 0
                    }, prevent: function (e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1
                    }
                },
                parentUntil: function (e, t) {
                    for (var n = "string" == typeof t; e.parentNode;) {
                        if (n && e.getAttribute && e.getAttribute(t))return e;
                        if (!n && e === t)return e;
                        e = e.parentNode
                    }
                    return null
                }
            }, o = {
                translate: {
                    get: {
                        matrix: function (t) {
                            if (i.canTransform()) {
                                var n = e.getComputedStyle(a.element)[s.vendor + "Transform"].match(/\((.*)\)/), r = 8;
                                return n ? (n = n[1].split(","), 16 === n.length && (t += r), parseInt(n[t], 10)) : 0
                            }
                            return parseInt(a.element.style.left, 10)
                        }
                    }, easeCallback: function () {
                        a.element.style[s.vendor + "Transition"] = "", s.translation = o.translate.get.matrix(4), s.easing = !1, clearInterval(s.animatingInterval), 0 === s.easingTo && (i.klass.remove(t.body, "snapjs-right"), i.klass.remove(t.body, "snapjs-left")), i.dispatchEvent("animated"), i.events.removeEvent(a.element, i.transitionCallback(), o.translate.easeCallback)
                    }, easeTo: function (e) {
                        i.canTransform() ? (s.easing = !0, s.easingTo = e, a.element.style[s.vendor + "Transition"] = "all " + a.transitionSpeed + "s " + a.easing, s.animatingInterval = setInterval(function () {
                            i.dispatchEvent("animating")
                        }, 1), i.events.addEvent(a.element, i.transitionCallback(), o.translate.easeCallback), o.translate.x(e)) : (s.translation = e, o.translate.x(e)), 0 === e && (a.element.style[s.vendor + "Transform"] = "")
                    }, x: function (n) {
                        if (!("left" === a.disable && n > 0 || "right" === a.disable && 0 > n))if (a.hyperextensible || (n === a.maxPosition || n > a.maxPosition ? n = a.maxPosition : (n === a.minPosition || n < a.minPosition) && (n = a.minPosition)), n = parseInt(n, 10), isNaN(n) && (n = 0), i.canTransform()) {
                            var r = "translate3d(" + n + "px, 0,0)";
                            a.element.style[s.vendor + "Transform"] = r
                        } else a.element.style.width = (e.innerWidth || t.documentElement.clientWidth) + "px", a.element.style.left = n + "px", a.element.style.right = ""
                    }
                }, drag: {
                    listen: function () {
                        s.translation = 0, s.easing = !1, i.events.addEvent(a.element, i.eventType("down"), o.drag.startDrag), i.events.addEvent(a.element, i.eventType("move"), o.drag.dragging), i.events.addEvent(a.element, i.eventType("up"), o.drag.endDrag)
                    }, stopListening: function () {
                        i.events.removeEvent(a.element, i.eventType("down"), o.drag.startDrag), i.events.removeEvent(a.element, i.eventType("move"), o.drag.dragging), i.events.removeEvent(a.element, i.eventType("up"), o.drag.endDrag)
                    }, startDrag: function (e) {
                        var t = e.target ? e.target : e.srcElement, n = i.parentUntil(t, "data-snap-ignore");
                        if (n)return void i.dispatchEvent("ignore");
                        if (a.dragger) {
                            var r = i.parentUntil(t, a.dragger);
                            if (!r && s.translation !== a.minPosition && s.translation !== a.maxPosition)return
                        }
                        i.dispatchEvent("start"), a.element.style[s.vendor + "Transition"] = "", s.isDragging = !0, s.hasIntent = null, s.intentChecked = !1, s.startDragX = i.page("X", e), s.startDragY = i.page("Y", e), s.dragWatchers = {
                            current: 0,
                            last: 0,
                            hold: 0,
                            state: ""
                        }, s.simpleStates = {
                            opening: null,
                            towards: null,
                            hyperExtending: null,
                            halfway: null,
                            flick: null,
                            translation: {absolute: 0, relative: 0, sinceDirectionChange: 0, percentage: 0}
                        }
                    }, dragging: function (e) {
                        if (s.isDragging && a.touchToDrag) {
                            var n, r = i.page("X", e), l = i.page("Y", e), d = s.translation, c = o.translate.get.matrix(4), g = r - s.startDragX, h = c > 0, p = g;
                            if (s.intentChecked && !s.hasIntent)return;
                            if (a.addBodyClasses && (c > 0 ? (i.klass.add(t.body, "snapjs-left"), i.klass.remove(t.body, "snapjs-right")) : 0 > c && (i.klass.add(t.body, "snapjs-right"), i.klass.remove(t.body, "snapjs-left"))), s.hasIntent === !1 || null === s.hasIntent) {
                                var m = i.angleOfDrag(r, l), u = m >= 0 && m <= a.slideIntent || 360 >= m && m > 360 - a.slideIntent, f = m >= 180 && m <= 180 + a.slideIntent || 180 >= m && m >= 180 - a.slideIntent;
                                s.hasIntent = f || u ? !0 : !1, s.intentChecked = !0
                            }
                            if (a.minDragDistance >= Math.abs(r - s.startDragX) || s.hasIntent === !1)return;
                            i.events.prevent(e), i.dispatchEvent("drag"), s.dragWatchers.current = r, s.dragWatchers.last > r ? ("left" !== s.dragWatchers.state && (s.dragWatchers.state = "left", s.dragWatchers.hold = r), s.dragWatchers.last = r) : s.dragWatchers.last < r && ("right" !== s.dragWatchers.state && (s.dragWatchers.state = "right", s.dragWatchers.hold = r), s.dragWatchers.last = r), h ? (a.maxPosition < c && (n = (c - a.maxPosition) * a.resistance, p = g - n), s.simpleStates = {
                                opening: "left",
                                towards: s.dragWatchers.state,
                                hyperExtending: a.maxPosition < c,
                                halfway: c > a.maxPosition / 2,
                                flick: Math.abs(s.dragWatchers.current - s.dragWatchers.hold) > a.flickThreshold,
                                translation: {
                                    absolute: c,
                                    relative: g,
                                    sinceDirectionChange: s.dragWatchers.current - s.dragWatchers.hold,
                                    percentage: c / a.maxPosition * 100
                                }
                            }) : (a.minPosition > c && (n = (c - a.minPosition) * a.resistance, p = g - n), s.simpleStates = {
                                opening: "right",
                                towards: s.dragWatchers.state,
                                hyperExtending: a.minPosition > c,
                                halfway: c < a.minPosition / 2,
                                flick: Math.abs(s.dragWatchers.current - s.dragWatchers.hold) > a.flickThreshold,
                                translation: {
                                    absolute: c,
                                    relative: g,
                                    sinceDirectionChange: s.dragWatchers.current - s.dragWatchers.hold,
                                    percentage: c / a.minPosition * 100
                                }
                            }), o.translate.x(p + d)
                        }
                    }, endDrag: function (e) {
                        if (s.isDragging) {
                            i.dispatchEvent("end");
                            var t = o.translate.get.matrix(4);
                            if (0 === s.dragWatchers.current && 0 !== t && a.tapToClose)return i.dispatchEvent("close"), i.events.prevent(e), o.translate.easeTo(0), s.isDragging = !1, void(s.startDragX = 0);
                            "left" === s.simpleStates.opening ? s.simpleStates.halfway || s.simpleStates.hyperExtending || s.simpleStates.flick ? s.simpleStates.flick && "left" === s.simpleStates.towards ? o.translate.easeTo(0) : (s.simpleStates.flick && "right" === s.simpleStates.towards || s.simpleStates.halfway || s.simpleStates.hyperExtending) && o.translate.easeTo(a.maxPosition) : o.translate.easeTo(0) : "right" === s.simpleStates.opening && (s.simpleStates.halfway || s.simpleStates.hyperExtending || s.simpleStates.flick ? s.simpleStates.flick && "right" === s.simpleStates.towards ? o.translate.easeTo(0) : (s.simpleStates.flick && "left" === s.simpleStates.towards || s.simpleStates.halfway || s.simpleStates.hyperExtending) && o.translate.easeTo(a.minPosition) : o.translate.easeTo(0)), s.isDragging = !1, s.startDragX = i.page("X", e)
                        }
                    }
                }
            }, l = function (e) {
                e.element && (i.deepExtend(a, e), s.vendor = i.vendor(), o.drag.listen())
            };
            this.open = function (e) {
                i.dispatchEvent("open"), i.klass.remove(t.body, "snapjs-expand-left"), i.klass.remove(t.body, "snapjs-expand-right"), "left" === e ? (s.simpleStates.opening = "left", s.simpleStates.towards = "right", i.klass.add(t.body, "snapjs-left"), i.klass.remove(t.body, "snapjs-right"), o.translate.easeTo(a.maxPosition)) : "right" === e && (s.simpleStates.opening = "right", s.simpleStates.towards = "left", i.klass.remove(t.body, "snapjs-left"), i.klass.add(t.body, "snapjs-right"), o.translate.easeTo(a.minPosition))
            }, this.close = function () {
                i.dispatchEvent("close"), o.translate.easeTo(0)
            }, this.expand = function (n) {
                var a = e.innerWidth || t.documentElement.clientWidth;
                "left" === n ? (i.dispatchEvent("expandLeft"), i.klass.add(t.body, "snapjs-expand-left"), i.klass.remove(t.body, "snapjs-expand-right")) : (i.dispatchEvent("expandRight"), i.klass.add(t.body, "snapjs-expand-right"), i.klass.remove(t.body, "snapjs-expand-left"), a *= -1), o.translate.easeTo(a)
            }, this.on = function (e, t) {
                return r[e] = t, this
            }, this.off = function (e) {
                r[e] && (r[e] = !1)
            }, this.enable = function () {
                i.dispatchEvent("enable"), o.drag.listen()
            }, this.disable = function () {
                i.dispatchEvent("disable"), o.drag.stopListening()
            }, this.settings = function (e) {
                i.deepExtend(a, e)
            }, this.state = function () {
                var e, t = o.translate.get.matrix(4);
                return e = t === a.maxPosition ? "left" : t === a.minPosition ? "right" : "closed", {
                    state: e,
                    info: s.simpleStates
                }
            }, l(n)
        };
    "undefined" != typeof module && module.exports && (module.exports = n), "undefined" == typeof ender && (this.Snap = n), "function" == typeof define && define.amd && define("snap", [], function () {
        return n
    })
}).call(this, window, document);
//# sourceMappingURL=maps/snap.js.map