!function (e, t) {
    function n(e, t) {
        var n = e.createElement("p"), r = e.getElementsByTagName("head")[0] || e.documentElement;
        return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
    }

    function r() {
        var e = E.elements;
        return "string" == typeof e ? e.split(" ") : e
    }

    function a(e, t) {
        var n = E.elements;
        "string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), E.elements = n + " " + e, m(t)
    }

    function o(e) {
        var t = y[e[g]];
        return t || (t = {}, v++, e[g] = v, y[v] = t), t
    }

    function c(e, n, r) {
        if (n || (n = t), s)return n.createElement(e);
        r || (r = o(n));
        var a;
        return a = r.cache[e] ? r.cache[e].cloneNode() : p.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !a.canHaveChildren || h.test(e) || a.tagUrn ? a : r.frag.appendChild(a)
    }

    function i(e, n) {
        if (e || (e = t), s)return e.createDocumentFragment();
        n = n || o(e);
        for (var a = n.frag.cloneNode(), c = 0, i = r(), l = i.length; l > c; c++)a.createElement(i[c]);
        return a
    }

    function l(e, t) {
        t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
            return E.shivMethods ? c(n, e, t) : t.createElem(n)
        }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function (e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(E, t.frag)
    }

    function m(e) {
        e || (e = t);
        var r = o(e);
        return !E.shivCSS || u || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), s || l(e, r), e
    }

    var u, s, d = "3.7.3", f = e.html5 || {}, h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, g = "_html5shiv", v = 0, y = {};
    !function () {
        try {
            var e = t.createElement("a");
            e.innerHTML = "<xyz></xyz>", u = "hidden" in e, s = 1 == e.childNodes.length || function () {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                }()
        } catch (n) {
            u = !0, s = !0
        }
    }();
    var E = {
        elements: f.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
        version: d,
        shivCSS: f.shivCSS !== !1,
        supportsUnknownElements: s,
        shivMethods: f.shivMethods !== !1,
        type: "default",
        shivDocument: m,
        createElement: c,
        createDocumentFragment: i,
        addElements: a
    };
    e.html5 = E, m(t), "object" == typeof module && module.exports && (module.exports = E)
}("undefined" != typeof window ? window : this, document);
//# sourceMappingURL=maps/html5shiv.js.map