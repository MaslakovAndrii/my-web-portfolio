(() => {
  "use strict";
  function t(t) {
    this.type = t;
  }
  (t.prototype.init = function () {
    const t = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let t = 0; t < this.nodes.length; t++) {
      const e = this.nodes[t],
        o = e.dataset.da.trim().split(","),
        i = {};
      (i.element = e),
        (i.parent = e.parentNode),
        (i.destination = document.querySelector(o[0].trim())),
        (i.breakpoint = o[1] ? o[1].trim() : "767"),
        (i.place = o[2] ? o[2].trim() : "last"),
        (i.index = this.indexInParent(i.parent, i.element)),
        this.оbjects.push(i);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (t) {
          return (
            "(" + this.type + "-width: " + t.breakpoint + "px)," + t.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (t, e, o) {
          return Array.prototype.indexOf.call(o, t) === e;
        }
      ));
    for (let e = 0; e < this.mediaQueries.length; e++) {
      const o = this.mediaQueries[e],
        i = String.prototype.split.call(o, ","),
        s = window.matchMedia(i[0]),
        n = i[1],
        r = Array.prototype.filter.call(this.оbjects, function (t) {
          return t.breakpoint === n;
        });
      s.addListener(function () {
        t.mediaHandler(s, r);
      }),
        this.mediaHandler(s, r);
    }
  }),
    (t.prototype.mediaHandler = function (t, e) {
      if (t.matches)
        for (let t = 0; t < e.length; t++) {
          const o = e[t];
          (o.index = this.indexInParent(o.parent, o.element)),
            this.moveTo(o.place, o.element, o.destination);
        }
      else
        for (let t = e.length - 1; t >= 0; t--) {
          const o = e[t];
          o.element.classList.contains(this.daClassname) &&
            this.moveBack(o.parent, o.element, o.index);
        }
    }),
    (t.prototype.moveTo = function (t, e, o) {
      e.classList.add(this.daClassname),
        "last" === t || t >= o.children.length
          ? o.insertAdjacentElement("beforeend", e)
          : "first" !== t
          ? o.children[t].insertAdjacentElement("beforebegin", e)
          : o.insertAdjacentElement("afterbegin", e);
    }),
    (t.prototype.moveBack = function (t, e, o) {
      e.classList.remove(this.daClassname),
        void 0 !== t.children[o]
          ? t.children[o].insertAdjacentElement("beforebegin", e)
          : t.insertAdjacentElement("beforeend", e);
    }),
    (t.prototype.indexInParent = function (t, e) {
      const o = Array.prototype.slice.call(t.children);
      return Array.prototype.indexOf.call(o, e);
    }),
    (t.prototype.arraySort = function (t) {
      "min" === this.type
        ? Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? -1
                : "last" === t.place || "first" === e.place
                ? 1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          })
        : Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? 1
                : "last" === t.place || "first" === e.place
                ? -1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          });
    });
  new t("max").init();
  class e {
    constructor(t) {
      let e = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...e,
          ...t,
          classes: { ...e.classes, ...t?.classes },
          hashSettings: { ...e.hashSettings, ...t?.hashSettings },
          on: { ...e.on, ...t?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (t) {
          const e = t.target.closest(`[${this.options.attributeOpenButton}]`);
          if (e)
            return (
              t.preventDefault(),
              (this._dataValue = e.getAttribute(
                this.options.attributeOpenButton
              )
                ? e.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = e),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${e.classList}`
                  )
            );
          return t.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!t.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (t.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (t) {
            if (
              this.options.closeEsc &&
              27 == t.which &&
              "Escape" === t.code &&
              this.isOpen
            )
              return t.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == t.which &&
              this.isOpen &&
              this._focusCatch(t);
          }.bind(this)
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (t) {
              const e = t.detail.form.dataset.popupMessage;
              e && this.open(e);
            }.bind(this)
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(t) {
      if (
        (t &&
          "string" == typeof t &&
          "" !== t.trim() &&
          ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const t = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            e = document.createElement("iframe");
          e.setAttribute("allowfullscreen", "");
          const o = this.options.setAutoplayYoutube ? "autoplay;" : "";
          e.setAttribute("allow", `${o}; encrypted-media`),
            e.setAttribute("src", t),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(e);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : i(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(t) {
      t &&
        "string" == typeof t &&
        "" !== t.trim() &&
        (this.previousOpen.selector = t),
        this.isOpen &&
          o &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            i(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let t = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${t}"]`) &&
        t &&
        this.open(t);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(t) {
      const e = this.targetOpen.element.querySelectorAll(this._focusEl),
        o = Array.prototype.slice.call(e),
        i = o.indexOf(document.activeElement);
      t.shiftKey && 0 === i && (o[o.length - 1].focus(), t.preventDefault()),
        t.shiftKey || i !== o.length - 1 || (o[0].focus(), t.preventDefault());
    }
    _focusTrap() {
      const t = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : t[0].focus();
    }
    popupLogging(t) {
      this.options.logging &&
        (function (t) {
          setTimeout(() => {
            window.FLS && console.log(t);
          }, 0);
        })(`[Попапос]: ${t}`);
    }
  }
  let o = !0,
    i = (t = 500) => {
      document.documentElement.classList.contains("lock") ? s(t) : n(t);
    },
    s = (t = 500) => {
      let e = document.querySelector("body");
      if (o) {
        let i = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < i.length; t++) {
            i[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (o = !1),
          setTimeout(function () {
            o = !0;
          }, t);
      }
    },
    n = (t = 500) => {
      let e = document.querySelector("body");
      if (o) {
        let i = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < i.length; t++) {
          i[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (o = !1),
          setTimeout(function () {
            o = !0;
          }, t);
      }
    };
  let r = !1;
  setTimeout(() => {
    if (r) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0);
  const a = document.querySelector(".portfolio__container"),
    l = document.querySelector(".portfolio__list-cards");
  function c() {
    const t = a.getBoundingClientRect().width;
    const e = document.querySelectorAll(".placeholder"),
      o = document.querySelectorAll(".card-portfolio").length - e.length;
    function i(t) {
      const e = t - (o % t);
      for (let t = 0; t < e; t++)
        l.insertAdjacentHTML(
          "beforeend",
          '\n                        <div class="portfolio__card card-portfolio placeholder">\n                            <img src="img/portfolio/no_img.jpeg" alt="screen website" class="card-portfolio__image">\n                            <div class="card-portfolio__drawer drawer drawer_blank">\n                                <p>in developing</p>\n                            </div>\n                        </div>'
        );
    }
    e.forEach((t) => t.remove()),
      t > 767.98 && o % 3 && i(3),
      t <= 767.98 && t > 584.98 && o % 2 && i(2),
      t <= 584.98 && e.forEach((t) => t.remove());
  }
  const p = new (class {
    line = 0;
    count = 0;
    currentString = "";
    constructor(t) {
      (this.outHtml = document.querySelector(t)),
        (this.text = this.outHtml.textContent);
    }
    getRandomInt(t) {
      return Math.floor(Math.random() * Math.floor(t));
    }
    print() {
      let t = setTimeout(() => {
        if (
          ((this.currentString += this.text[this.line][this.count]),
          (this.outHtml.innerHTML = this.currentString + "|"),
          this.count++,
          this.count >= this.text[this.line].length &&
            ((this.count = 0), this.line++, this.line == this.text.length))
        )
          return (
            clearTimeout(t), (this.outHtml.innerHTML = this.currentString), !0
          );
        this.print();
      }, this.getRandomInt(this.getRandomInt(400 * 2.3)));
    }
  })(".start-screen__name");
  window.addEventListener("load", () => {
    c(), p.print();
  }),
    window.addEventListener("resize", () => {
      c();
    }),
    document.addEventListener("click", (t) => {
      !(function (t) {
        const e = document.querySelectorAll(".drawer_filled"),
          o = document.querySelectorAll(".drawer__arrow");
        t.target.closest(".drawer__arrow") && !t.target.closest(".active_arrow")
          ? (o.forEach((t) => {
              t.classList.remove("active_arrow");
            }),
            e.forEach((t) => {
              t.classList.remove("active_drawer");
            }),
            t.target.parentNode.classList.toggle("active_drawer"),
            t.target.classList.toggle("active_arrow"))
          : t.target.closest(".drawer__arrow") &&
            t.target.closest(".active_arrow") &&
            (o.forEach((t) => {
              t.classList.remove("active_arrow");
            }),
            e.forEach((t) => {
              t.classList.remove("active_drawer");
            }));
      })(t);
    }),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    new e({});
})();
