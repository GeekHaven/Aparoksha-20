"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-backgroundblendmode-setclasses !*/
!function (e, n, t) {
  function r(e, n) {
    return (typeof e === "undefined" ? "undefined" : _typeof(e)) === n;
  }function o() {
    var e, n, t, o, i, s, a;for (var f in y) {
      if (y.hasOwnProperty(f)) {
        if (e = [], n = y[f], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }for (o = r(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) {
          s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), g.push((o ? "" : "no-") + a.join("-"));
        }
      }
    }
  }function i(e) {
    var n = x.className,
        t = Modernizr._config.classPrefix || "";if (_ && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");n = n.replace(r, "$1" + t + "js$2");
    }Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), _ ? x.className.baseVal = n : x.className = n);
  }function s(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
      return n + t.toUpperCase();
    }).replace(/^-/, "");
  }function a(e, n) {
    return !!~("" + e).indexOf(n);
  }function f() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : _ ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }function l(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }function u(e, n, t) {
    var o;for (var i in e) {
      if (e[i] in n) return t === !1 ? e[i] : (o = n[e[i]], r(o, "function") ? l(o, t || n) : o);
    }return !1;
  }function d(e) {
    return e.replace(/([A-Z])/g, function (e, n) {
      return "-" + n.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }function p() {
    var e = n.body;return e || (e = f(_ ? "svg" : "body"), e.fake = !0), e;
  }function c(e, t, r, o) {
    var i,
        s,
        a,
        l,
        u = "modernizr",
        d = f("div"),
        c = p();if (parseInt(r, 10)) for (; r--;) {
      a = f("div"), a.id = o ? o[r] : u + (r + 1), d.appendChild(a);
    }return i = f("style"), i.type = "text/css", i.id = "s" + u, (c.fake ? c : d).appendChild(i), c.appendChild(d), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)), d.id = u, c.fake && (c.style.background = "", c.style.overflow = "hidden", l = x.style.overflow, x.style.overflow = "hidden", x.appendChild(c)), s = t(d, e), c.fake ? (c.parentNode.removeChild(c), x.style.overflow = l, x.offsetHeight) : d.parentNode.removeChild(d), !!s;
  }function m(n, r) {
    var o = n.length;if ("CSS" in e && "supports" in e.CSS) {
      for (; o--;) {
        if (e.CSS.supports(d(n[o]), r)) return !0;
      }return !1;
    }if ("CSSSupportsRule" in e) {
      for (var i = []; o--;) {
        i.push("(" + d(n[o]) + ":" + r + ")");
      }return i = i.join(" or "), c("@supports (" + i + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == getComputedStyle(e, null).position;
      });
    }return t;
  }function v(e, n, o, i) {
    function l() {
      d && (delete N.style, delete N.modElem);
    }if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
      var u = m(e, o);if (!r(u, "undefined")) return u;
    }for (var d, p, c, v, h, g = ["modernizr", "tspan", "samp"]; !N.style && g.length;) {
      d = !0, N.modElem = f(g.shift()), N.style = N.modElem.style;
    }for (c = e.length, p = 0; c > p; p++) {
      if (v = e[p], h = N.style[v], a(v, "-") && (v = s(v)), N.style[v] !== t) {
        if (i || r(o, "undefined")) return l(), "pfx" == n ? v : !0;try {
          N.style[v] = o;
        } catch (y) {}if (N.style[v] != h) return l(), "pfx" == n ? v : !0;
      }
    }return l(), !1;
  }function h(e, n, t, o, i) {
    var s = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + S.join(s + " ") + s).split(" ");return r(n, "string") || r(n, "undefined") ? v(a, n, o, i) : (a = (e + " " + E.join(s + " ") + s).split(" "), u(a, n, t));
  }var g = [],
      y = [],
      C = { _version: "3.3.1", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {
      var t = this;setTimeout(function () {
        n(t[e]);
      }, 0);
    }, addTest: function addTest(e, n, t) {
      y.push({ name: e, fn: n, options: t });
    }, addAsyncTest: function addAsyncTest(e) {
      y.push({ name: null, fn: e });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = C, Modernizr = new Modernizr();var x = n.documentElement,
      _ = "svg" === x.nodeName.toLowerCase(),
      w = "Moz O ms Webkit",
      S = C._config.usePrefixes ? w.split(" ") : [];C._cssomPrefixes = S;var b = function b(n) {
    var r,
        o = prefixes.length,
        i = e.CSSRule;if ("undefined" == typeof i) return t;if (!n) return !1;if (n = n.replace(/^@/, ""), r = n.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + n;for (var s = 0; o > s; s++) {
      var a = prefixes[s],
          f = a.toUpperCase() + "_" + r;if (f in i) return "@-" + a.toLowerCase() + "-" + n;
    }return !1;
  };C.atRule = b;var E = C._config.usePrefixes ? w.toLowerCase().split(" ") : [];C._domPrefixes = E;var z = { elem: f("modernizr") };Modernizr._q.push(function () {
    delete z.elem;
  });var N = { style: z.elem.style };Modernizr._q.unshift(function () {
    delete N.style;
  }), C.testAllProps = h;var P = C.prefixed = function (e, n, t) {
    return 0 === e.indexOf("@") ? b(e) : (-1 != e.indexOf("-") && (e = s(e)), n ? h(e, n, t) : h(e, "pfx"));
  };Modernizr.addTest("backgroundblendmode", P("backgroundBlendMode", "text")), o(), i(g), delete C.addTest, delete C.addAsyncTest;for (var k = 0; k < Modernizr._q.length; k++) {
    Modernizr._q[k]();
  }e.Modernizr = Modernizr;
}(window, document);
//# sourceMappingURL=modernizr.js.map
