!
  function (e) {
    var fs = 100
    var w = 750
    var t = e.document,
      n = t.documentElement,
      i = "orientationchange" in e ? "orientationchange" : "resize",
      a = function e() {
        var t = n.getBoundingClientRect().width;
        return n.style.fontSize = t / w * fs + "px",
          e
      }();
    n.setAttribute("data-dpr", e.navigator.appVersion.match(/iphone/gi) ? e.devicePixelRatio : 1),
    /iP(hone|od|ad)/.test(e.navigator.userAgent) && (t.documentElement.classList.add("ios"), parseInt(e.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8 && t.documentElement.classList.add("hairline")),
    t.addEventListener && (e.addEventListener(i, a, !1), t.addEventListener("DOMContentLoaded", a, !1))
  }(window);