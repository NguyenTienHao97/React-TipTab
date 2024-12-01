var nn = Object.defineProperty;
var rn = (e, t, n) => t in e ? nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var st = (e, t, n) => rn(e, typeof t != "symbol" ? t + "" : t, n);
import Le from "tippy.js";
import { P as H, a as _, N as tt, S as W, f as sn, c as Wt, T as on, l as an, b as ln, d as I, e as cn, g as dn, j as un, h as pn, i as hn, k as fn, m as Re, n as mn, o as gn, p as yn, q as vn, r as bn, s as Mn, t as Sn, u as kn, v as wn, w as En, x as Tn, y as ne, z as Cn, A as dt, F as ut, B as xn, C as An, D as On, E as Ln, G as Rn, H as Pn, I as Pe, J as xt, R as Hn, K as _n, L as $n, M as In, O as Dn, Q as Nn, U as Bn, V as re, W as He, X as jn, Y as Fn, Z as zn, _ as Wn, $ as Vn, a0 as Kn, a1 as ht, a2 as Vt, a3 as qn, a4 as Un, a5 as Gn, a6 as Jn, a7 as Yn, a8 as Xn, a9 as Qn, aa as Zn, ab as se, ac as oe, ad as ie, ae as tr, af as er, ag as ae, ah as nr, ai as _e, aj as rr, ak as sr } from "./vendor-BeapTPDe.js";
import L, { forwardRef as or, createContext as $e, useState as Kt, useEffect as qt, useRef as ir, useDebugValue as Ie, useContext as De } from "react";
import ar, { flushSync as lr } from "react-dom";
function yt(e) {
  const { state: t, transaction: n } = e;
  let { selection: r } = n, { doc: s } = n, { storedMarks: o } = n;
  return {
    ...t,
    apply: t.apply.bind(t),
    applyTransaction: t.applyTransaction.bind(t),
    plugins: t.plugins,
    schema: t.schema,
    reconfigure: t.reconfigure.bind(t),
    toJSON: t.toJSON.bind(t),
    get storedMarks() {
      return o;
    },
    get selection() {
      return r;
    },
    get doc() {
      return s;
    },
    get tr() {
      return r = n.selection, s = n.doc, o = n.storedMarks, n;
    }
  };
}
class vt {
  constructor(t) {
    this.editor = t.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = t.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: t, editor: n, state: r } = this, { view: s } = n, { tr: o } = r, i = this.buildProps(o);
    return Object.fromEntries(Object.entries(t).map(([a, c]) => [a, (...u) => {
      const d = c(...u)(i);
      return !o.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(o), d;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(t, n = !0) {
    const { rawCommands: r, editor: s, state: o } = this, { view: i } = s, a = [], c = !!t, l = t || o.tr, u = () => (!c && n && !l.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(l), a.every((p) => p === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([p, h]) => [p, (...m) => {
        const g = this.buildProps(l, n), y = h(...m)(g);
        return a.push(y), d;
      }])),
      run: u
    };
    return d;
  }
  createCan(t) {
    const { rawCommands: n, state: r } = this, s = !1, o = t || r.tr, i = this.buildProps(o, s);
    return {
      ...Object.fromEntries(Object.entries(n).map(([c, l]) => [c, (...u) => l(...u)({ ...i, dispatch: void 0 })])),
      chain: () => this.createChain(o, s)
    };
  }
  buildProps(t, n = !0) {
    const { rawCommands: r, editor: s, state: o } = this, { view: i } = s, a = {
      tr: t,
      editor: s,
      view: i,
      state: yt({
        state: o,
        transaction: t
      }),
      dispatch: n ? () => {
      } : void 0,
      chain: () => this.createChain(t, n),
      can: () => this.createCan(t),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([c, l]) => [c, (...u) => l(...u)(a)]));
      }
    };
    return a;
  }
}
class cr {
  constructor() {
    this.callbacks = {};
  }
  on(t, n) {
    return this.callbacks[t] || (this.callbacks[t] = []), this.callbacks[t].push(n), this;
  }
  emit(t, ...n) {
    const r = this.callbacks[t];
    return r && r.forEach((s) => s.apply(this, n)), this;
  }
  off(t, n) {
    const r = this.callbacks[t];
    return r && (n ? this.callbacks[t] = r.filter((s) => s !== n) : delete this.callbacks[t]), this;
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function S(e, t, n) {
  return e.config[t] === void 0 && e.parent ? S(e.parent, t, n) : typeof e.config[t] == "function" ? e.config[t].bind({
    ...n,
    parent: e.parent ? S(e.parent, t, n) : null
  }) : e.config[t];
}
function bt(e) {
  const t = e.filter((s) => s.type === "extension"), n = e.filter((s) => s.type === "node"), r = e.filter((s) => s.type === "mark");
  return {
    baseExtensions: t,
    nodeExtensions: n,
    markExtensions: r
  };
}
function Ne(e) {
  const t = [], { nodeExtensions: n, markExtensions: r } = bt(e), s = [...n, ...r], o = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return e.forEach((i) => {
    const a = {
      name: i.name,
      options: i.options,
      storage: i.storage,
      extensions: s
    }, c = S(i, "addGlobalAttributes", a);
    if (!c)
      return;
    c().forEach((u) => {
      u.types.forEach((d) => {
        Object.entries(u.attributes).forEach(([p, h]) => {
          t.push({
            type: d,
            name: p,
            attribute: {
              ...o,
              ...h
            }
          });
        });
      });
    });
  }), s.forEach((i) => {
    const a = {
      name: i.name,
      options: i.options,
      storage: i.storage
    }, c = S(i, "addAttributes", a);
    if (!c)
      return;
    const l = c();
    Object.entries(l).forEach(([u, d]) => {
      const p = {
        ...o,
        ...d
      };
      typeof (p == null ? void 0 : p.default) == "function" && (p.default = p.default()), p != null && p.isRequired && (p == null ? void 0 : p.default) === void 0 && delete p.default, t.push({
        type: i.name,
        name: u,
        attribute: p
      });
    });
  }), t;
}
function $(e, t) {
  if (typeof e == "string") {
    if (!t.nodes[e])
      throw Error(`There is no node type named '${e}'. Maybe you forgot to add the extension?`);
    return t.nodes[e];
  }
  return e;
}
function x(...e) {
  return e.filter((t) => !!t).reduce((t, n) => {
    const r = { ...t };
    return Object.entries(n).forEach(([s, o]) => {
      if (!r[s]) {
        r[s] = o;
        return;
      }
      if (s === "class") {
        const a = o ? o.split(" ") : [], c = r[s] ? r[s].split(" ") : [], l = a.filter((u) => !c.includes(u));
        r[s] = [...c, ...l].join(" ");
      } else if (s === "style") {
        const a = o ? o.split(";").map((u) => u.trim()).filter(Boolean) : [], c = r[s] ? r[s].split(";").map((u) => u.trim()).filter(Boolean) : [], l = /* @__PURE__ */ new Map();
        c.forEach((u) => {
          const [d, p] = u.split(":").map((h) => h.trim());
          l.set(d, p);
        }), a.forEach((u) => {
          const [d, p] = u.split(":").map((h) => h.trim());
          l.set(d, p);
        }), r[s] = Array.from(l.entries()).map(([u, d]) => `${u}: ${d}`).join("; ");
      } else
        r[s] = o;
    }), r;
  }, {});
}
function ft(e, t) {
  return t.filter((n) => n.type === e.type.name).filter((n) => n.attribute.rendered).map((n) => n.attribute.renderHTML ? n.attribute.renderHTML(e.attrs) || {} : {
    [n.name]: e.attrs[n.name]
  }).reduce((n, r) => x(n, r), {});
}
function Be(e) {
  return typeof e == "function";
}
function T(e, t = void 0, ...n) {
  return Be(e) ? t ? e.bind(t)(...n) : e(...n) : e;
}
function dr(e = {}) {
  return Object.keys(e).length === 0 && e.constructor === Object;
}
function ur(e) {
  return typeof e != "string" ? e : e.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(e) : e === "true" ? !0 : e === "false" ? !1 : e;
}
function le(e, t) {
  return "style" in e ? e : {
    ...e,
    getAttrs: (n) => {
      const r = e.getAttrs ? e.getAttrs(n) : e.attrs;
      if (r === !1)
        return !1;
      const s = t.reduce((o, i) => {
        const a = i.attribute.parseHTML ? i.attribute.parseHTML(n) : ur(n.getAttribute(i.name));
        return a == null ? o : {
          ...o,
          [i.name]: a
        };
      }, {});
      return { ...r, ...s };
    }
  };
}
function ce(e) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(e).filter(([t, n]) => t === "attrs" && dr(n) ? !1 : n != null)
  );
}
function pr(e, t) {
  var n;
  const r = Ne(e), { nodeExtensions: s, markExtensions: o } = bt(e), i = (n = s.find((l) => S(l, "topNode"))) === null || n === void 0 ? void 0 : n.name, a = Object.fromEntries(s.map((l) => {
    const u = r.filter((y) => y.type === l.name), d = {
      name: l.name,
      options: l.options,
      storage: l.storage,
      editor: t
    }, p = e.reduce((y, k) => {
      const b = S(k, "extendNodeSchema", d);
      return {
        ...y,
        ...b ? b(l) : {}
      };
    }, {}), h = ce({
      ...p,
      content: T(S(l, "content", d)),
      marks: T(S(l, "marks", d)),
      group: T(S(l, "group", d)),
      inline: T(S(l, "inline", d)),
      atom: T(S(l, "atom", d)),
      selectable: T(S(l, "selectable", d)),
      draggable: T(S(l, "draggable", d)),
      code: T(S(l, "code", d)),
      whitespace: T(S(l, "whitespace", d)),
      defining: T(S(l, "defining", d)),
      isolating: T(S(l, "isolating", d)),
      attrs: Object.fromEntries(u.map((y) => {
        var k;
        return [y.name, { default: (k = y == null ? void 0 : y.attribute) === null || k === void 0 ? void 0 : k.default }];
      }))
    }), f = T(S(l, "parseHTML", d));
    f && (h.parseDOM = f.map((y) => le(y, u)));
    const m = S(l, "renderHTML", d);
    m && (h.toDOM = (y) => m({
      node: y,
      HTMLAttributes: ft(y, u)
    }));
    const g = S(l, "renderText", d);
    return g && (h.toText = g), [l.name, h];
  })), c = Object.fromEntries(o.map((l) => {
    const u = r.filter((g) => g.type === l.name), d = {
      name: l.name,
      options: l.options,
      storage: l.storage,
      editor: t
    }, p = e.reduce((g, y) => {
      const k = S(y, "extendMarkSchema", d);
      return {
        ...g,
        ...k ? k(l) : {}
      };
    }, {}), h = ce({
      ...p,
      inclusive: T(S(l, "inclusive", d)),
      excludes: T(S(l, "excludes", d)),
      group: T(S(l, "group", d)),
      spanning: T(S(l, "spanning", d)),
      code: T(S(l, "code", d)),
      attrs: Object.fromEntries(u.map((g) => {
        var y;
        return [g.name, { default: (y = g == null ? void 0 : g.attribute) === null || y === void 0 ? void 0 : y.default }];
      }))
    }), f = T(S(l, "parseHTML", d));
    f && (h.parseDOM = f.map((g) => le(g, u)));
    const m = S(l, "renderHTML", d);
    return m && (h.toDOM = (g) => m({
      mark: g,
      HTMLAttributes: ft(g, u)
    })), [l.name, h];
  }));
  return new Pe({
    topNode: i,
    nodes: a,
    marks: c
  });
}
function At(e, t) {
  return t.nodes[e] || t.marks[e] || null;
}
function de(e, t) {
  return Array.isArray(t) ? t.some((n) => (typeof n == "string" ? n : n.name) === e.name) : t;
}
const hr = (e, t = 500) => {
  let n = "";
  const r = e.parentOffset;
  return e.parent.nodesBetween(Math.max(0, r - t), r, (s, o, i, a) => {
    var c, l;
    const u = ((l = (c = s.type.spec).toText) === null || l === void 0 ? void 0 : l.call(c, {
      node: s,
      pos: o,
      parent: i,
      index: a
    })) || s.textContent || "%leaf%";
    n += s.isAtom && !s.isText ? u : u.slice(0, Math.max(0, r - o));
  }), n;
};
function Ut(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
class Mt {
  constructor(t) {
    this.find = t.find, this.handler = t.handler;
  }
}
const fr = (e, t) => {
  if (Ut(t))
    return t.exec(e);
  const n = t(e);
  if (!n)
    return null;
  const r = [n.text];
  return r.index = n.index, r.input = e, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(n.replaceWith)), r;
};
function ot(e) {
  var t;
  const { editor: n, from: r, to: s, text: o, rules: i, plugin: a } = e, { view: c } = n;
  if (c.composing)
    return !1;
  const l = c.state.doc.resolve(r);
  if (
    // check for code node
    l.parent.type.spec.code || !((t = l.nodeBefore || l.nodeAfter) === null || t === void 0) && t.marks.find((p) => p.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = hr(l) + o;
  return i.forEach((p) => {
    if (u)
      return;
    const h = fr(d, p.find);
    if (!h)
      return;
    const f = c.state.tr, m = yt({
      state: c.state,
      transaction: f
    }), g = {
      from: r - (h[0].length - o.length),
      to: s
    }, { commands: y, chain: k, can: b } = new vt({
      editor: n,
      state: m
    });
    p.handler({
      state: m,
      range: g,
      match: h,
      commands: y,
      chain: k,
      can: b
    }) === null || !f.steps.length || (f.setMeta(a, {
      transform: f,
      from: r,
      to: s,
      text: o
    }), c.dispatch(f), u = !0);
  }), u;
}
function mr(e) {
  const { editor: t, rules: n } = e, r = new H({
    state: {
      init() {
        return null;
      },
      apply(s, o) {
        const i = s.getMeta(r);
        if (i)
          return i;
        const a = s.getMeta("applyInputRules");
        return !!a && setTimeout(() => {
          const { from: l, text: u } = a, d = l + u.length;
          ot({
            editor: t,
            from: l,
            to: d,
            text: u,
            rules: n,
            plugin: r
          });
        }), s.selectionSet || s.docChanged ? null : o;
      }
    },
    props: {
      handleTextInput(s, o, i, a) {
        return ot({
          editor: t,
          from: o,
          to: i,
          text: a,
          rules: n,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (s) => (setTimeout(() => {
          const { $cursor: o } = s.state.selection;
          o && ot({
            editor: t,
            from: o.pos,
            to: o.pos,
            text: "",
            rules: n,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(s, o) {
        if (o.key !== "Enter")
          return !1;
        const { $cursor: i } = s.state.selection;
        return i ? ot({
          editor: t,
          from: i.pos,
          to: i.pos,
          text: `
`,
          rules: n,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function gr(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function it(e) {
  return gr(e) !== "Object" ? !1 : e.constructor === Object && Object.getPrototypeOf(e) === Object.prototype;
}
function St(e, t) {
  const n = { ...e };
  return it(e) && it(t) && Object.keys(t).forEach((r) => {
    it(t[r]) && it(e[r]) ? n[r] = St(e[r], t[r]) : n[r] = t[r];
  }), n;
}
class D {
  constructor(t = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...t
    }, this.name = this.config.name, t.defaultOptions && Object.keys(t.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = T(S(this, "addOptions", {
      name: this.name
    }))), this.storage = T(S(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(t = {}) {
    return new D(t);
  }
  configure(t = {}) {
    const n = this.extend({
      ...this.config,
      addOptions: () => St(this.options, t)
    });
    return n.name = this.name, n.parent = this.parent, n;
  }
  extend(t = {}) {
    const n = new D(t);
    return n.parent = this, this.child = n, n.name = t.name ? t.name : n.parent.name, t.defaultOptions && Object.keys(t.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = T(S(n, "addOptions", {
      name: n.name
    })), n.storage = T(S(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
  static handleExit({ editor: t, mark: n }) {
    const { tr: r } = t.state, s = t.state.selection.$from;
    if (s.pos === s.end()) {
      const i = s.marks();
      if (!!!i.find((l) => (l == null ? void 0 : l.type.name) === n.name))
        return !1;
      const c = i.find((l) => (l == null ? void 0 : l.type.name) === n.name);
      return c && r.removeStoredMark(c), r.insertText(" ", s.pos), t.view.dispatch(r), !0;
    }
    return !1;
  }
}
function yr(e) {
  return typeof e == "number";
}
class je {
  constructor(t) {
    this.find = t.find, this.handler = t.handler;
  }
}
const vr = (e, t, n) => {
  if (Ut(t))
    return [...e.matchAll(t)];
  const r = t(e, n);
  return r ? r.map((s) => {
    const o = [s.text];
    return o.index = s.index, o.input = e, o.data = s.data, s.replaceWith && (s.text.includes(s.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), o.push(s.replaceWith)), o;
  }) : [];
};
function br(e) {
  const { editor: t, state: n, from: r, to: s, rule: o, pasteEvent: i, dropEvent: a } = e, { commands: c, chain: l, can: u } = new vt({
    editor: t,
    state: n
  }), d = [];
  return n.doc.nodesBetween(r, s, (h, f) => {
    if (!h.isTextblock || h.type.spec.code)
      return;
    const m = Math.max(r, f), g = Math.min(s, f + h.content.size), y = h.textBetween(m - f, g - f, void 0, "￼");
    vr(y, o.find, i).forEach((b) => {
      if (b.index === void 0)
        return;
      const v = m + b.index + 1, E = v + b[0].length, M = {
        from: n.tr.mapping.map(v),
        to: n.tr.mapping.map(E)
      }, C = o.handler({
        state: n,
        range: M,
        match: b,
        commands: c,
        chain: l,
        can: u,
        pasteEvent: i,
        dropEvent: a
      });
      d.push(C);
    });
  }), d.every((h) => h !== null);
}
const Mr = (e) => {
  var t;
  const n = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (t = n.clipboardData) === null || t === void 0 || t.setData("text/html", e), n;
};
function Sr(e) {
  const { editor: t, rules: n } = e;
  let r = null, s = !1, o = !1, i = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, a = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  const c = ({ state: u, from: d, to: p, rule: h, pasteEvt: f }) => {
    const m = u.tr, g = yt({
      state: u,
      transaction: m
    });
    if (!(!br({
      editor: t,
      state: g,
      from: Math.max(d - 1, 0),
      to: p.b - 1,
      rule: h,
      pasteEvent: f,
      dropEvent: a
    }) || !m.steps.length))
      return a = typeof DragEvent < "u" ? new DragEvent("drop") : null, i = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
  };
  return n.map((u) => new H({
    // we register a global drag handler to track the current drag source element
    view(d) {
      const p = (h) => {
        var f;
        r = !((f = d.dom.parentElement) === null || f === void 0) && f.contains(h.target) ? d.dom.parentElement : null;
      };
      return window.addEventListener("dragstart", p), {
        destroy() {
          window.removeEventListener("dragstart", p);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (d, p) => (o = r === d.dom.parentElement, a = p, !1),
        paste: (d, p) => {
          var h;
          const f = (h = p.clipboardData) === null || h === void 0 ? void 0 : h.getData("text/html");
          return i = p, s = !!(f != null && f.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (d, p, h) => {
      const f = d[0], m = f.getMeta("uiEvent") === "paste" && !s, g = f.getMeta("uiEvent") === "drop" && !o, y = f.getMeta("applyPasteRules"), k = !!y;
      if (!m && !g && !k)
        return;
      if (k) {
        const { from: E, text: M } = y, C = E + M.length, A = Mr(M);
        return c({
          rule: u,
          state: h,
          from: E,
          to: { b: C },
          pasteEvt: A
        });
      }
      const b = p.doc.content.findDiffStart(h.doc.content), v = p.doc.content.findDiffEnd(h.doc.content);
      if (!(!yr(b) || !v || b === v.b))
        return c({
          rule: u,
          state: h,
          from: b,
          to: v,
          pasteEvt: i
        });
    }
  }));
}
function kr(e) {
  const t = e.filter((n, r) => e.indexOf(n) !== r);
  return Array.from(new Set(t));
}
class Z {
  constructor(t, n) {
    this.splittableMarks = [], this.editor = n, this.extensions = Z.resolve(t), this.schema = pr(this.extensions, n), this.setupExtensions();
  }
  /**
   * Returns a flattened and sorted extension list while
   * also checking for duplicated extensions and warns the user.
   * @param extensions An array of Tiptap extensions
   * @returns An flattened and sorted array of Tiptap extensions
   */
  static resolve(t) {
    const n = Z.sort(Z.flatten(t)), r = kr(n.map((s) => s.name));
    return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((s) => `'${s}'`).join(", ")}]. This can lead to issues.`), n;
  }
  /**
   * Create a flattened array of extensions by traversing the `addExtensions` field.
   * @param extensions An array of Tiptap extensions
   * @returns A flattened array of Tiptap extensions
   */
  static flatten(t) {
    return t.map((n) => {
      const r = {
        name: n.name,
        options: n.options,
        storage: n.storage
      }, s = S(n, "addExtensions", r);
      return s ? [n, ...this.flatten(s())] : n;
    }).flat(10);
  }
  /**
   * Sort extensions by priority.
   * @param extensions An array of Tiptap extensions
   * @returns A sorted array of Tiptap extensions by priority
   */
  static sort(t) {
    return t.sort((r, s) => {
      const o = S(r, "priority") || 100, i = S(s, "priority") || 100;
      return o > i ? -1 : o < i ? 1 : 0;
    });
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((t, n) => {
      const r = {
        name: n.name,
        options: n.options,
        storage: n.storage,
        editor: this.editor,
        type: At(n.name, this.schema)
      }, s = S(n, "addCommands", r);
      return s ? {
        ...t,
        ...s()
      } : t;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: t } = this, n = Z.sort([...this.extensions].reverse()), r = [], s = [], o = n.map((i) => {
      const a = {
        name: i.name,
        options: i.options,
        storage: i.storage,
        editor: t,
        type: At(i.name, this.schema)
      }, c = [], l = S(i, "addKeyboardShortcuts", a);
      let u = {};
      if (i.type === "mark" && S(i, "exitable", a) && (u.ArrowRight = () => D.handleExit({ editor: t, mark: i })), l) {
        const m = Object.fromEntries(Object.entries(l()).map(([g, y]) => [g, () => y({ editor: t })]));
        u = { ...u, ...m };
      }
      const d = Pn(u);
      c.push(d);
      const p = S(i, "addInputRules", a);
      de(i, t.options.enableInputRules) && p && r.push(...p());
      const h = S(i, "addPasteRules", a);
      de(i, t.options.enablePasteRules) && h && s.push(...h());
      const f = S(i, "addProseMirrorPlugins", a);
      if (f) {
        const m = f();
        c.push(...m);
      }
      return c;
    }).flat();
    return [
      mr({
        editor: t,
        rules: r
      }),
      ...Sr({
        editor: t,
        rules: s
      }),
      ...o
    ];
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return Ne(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: t } = this, { nodeExtensions: n } = bt(this.extensions);
    return Object.fromEntries(n.filter((r) => !!S(r, "addNodeView")).map((r) => {
      const s = this.attributes.filter((c) => c.type === r.name), o = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: t,
        type: $(r.name, this.schema)
      }, i = S(r, "addNodeView", o);
      if (!i)
        return [];
      const a = (c, l, u, d, p) => {
        const h = ft(c, s);
        return i()({
          // pass-through
          node: c,
          view: l,
          getPos: u,
          decorations: d,
          innerDecorations: p,
          // tiptap-specific
          editor: t,
          extension: r,
          HTMLAttributes: h
        });
      };
      return [r.name, a];
    }));
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    this.extensions.forEach((t) => {
      var n;
      this.editor.extensionStorage[t.name] = t.storage;
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: At(t.name, this.schema)
      };
      t.type === "mark" && (!((n = T(S(t, "keepOnSplit", r))) !== null && n !== void 0) || n) && this.splittableMarks.push(t.name);
      const s = S(t, "onBeforeCreate", r), o = S(t, "onCreate", r), i = S(t, "onUpdate", r), a = S(t, "onSelectionUpdate", r), c = S(t, "onTransaction", r), l = S(t, "onFocus", r), u = S(t, "onBlur", r), d = S(t, "onDestroy", r);
      s && this.editor.on("beforeCreate", s), o && this.editor.on("create", o), i && this.editor.on("update", i), a && this.editor.on("selectionUpdate", a), c && this.editor.on("transaction", c), l && this.editor.on("focus", l), u && this.editor.on("blur", u), d && this.editor.on("destroy", d);
    });
  }
}
class P {
  constructor(t = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...t
    }, this.name = this.config.name, t.defaultOptions && Object.keys(t.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = T(S(this, "addOptions", {
      name: this.name
    }))), this.storage = T(S(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(t = {}) {
    return new P(t);
  }
  configure(t = {}) {
    const n = this.extend({
      ...this.config,
      addOptions: () => St(this.options, t)
    });
    return n.name = this.name, n.parent = this.parent, n;
  }
  extend(t = {}) {
    const n = new P({ ...this.config, ...t });
    return n.parent = this, this.child = n, n.name = t.name ? t.name : n.parent.name, t.defaultOptions && Object.keys(t.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = T(S(n, "addOptions", {
      name: n.name
    })), n.storage = T(S(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
}
function Fe(e, t, n) {
  const { from: r, to: s } = t, { blockSeparator: o = `

`, textSerializers: i = {} } = n || {};
  let a = "";
  return e.nodesBetween(r, s, (c, l, u, d) => {
    var p;
    c.isBlock && l > r && (a += o);
    const h = i == null ? void 0 : i[c.type.name];
    if (h)
      return u && (a += h({
        node: c,
        pos: l,
        parent: u,
        index: d,
        range: t
      })), !1;
    c.isText && (a += (p = c == null ? void 0 : c.text) === null || p === void 0 ? void 0 : p.slice(Math.max(r, l) - l, s - l));
  }), a;
}
function ze(e) {
  return Object.fromEntries(Object.entries(e.nodes).filter(([, t]) => t.spec.toText).map(([t, n]) => [t, n.spec.toText]));
}
const wr = P.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new H({
        key: new _("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: e } = this, { state: t, schema: n } = e, { doc: r, selection: s } = t, { ranges: o } = s, i = Math.min(...o.map((u) => u.$from.pos)), a = Math.max(...o.map((u) => u.$to.pos)), c = ze(n);
            return Fe(r, { from: i, to: a }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: c
            });
          }
        }
      })
    ];
  }
}), Er = () => ({ editor: e, view: t }) => (requestAnimationFrame(() => {
  var n;
  e.isDestroyed || (t.dom.blur(), (n = window == null ? void 0 : window.getSelection()) === null || n === void 0 || n.removeAllRanges());
}), !0), Tr = (e = !1) => ({ commands: t }) => t.setContent("", e), Cr = () => ({ state: e, tr: t, dispatch: n }) => {
  const { selection: r } = t, { ranges: s } = r;
  return n && s.forEach(({ $from: o, $to: i }) => {
    e.doc.nodesBetween(o.pos, i.pos, (a, c) => {
      if (a.type.isText)
        return;
      const { doc: l, mapping: u } = t, d = l.resolve(u.map(c)), p = l.resolve(u.map(c + a.nodeSize)), h = d.blockRange(p);
      if (!h)
        return;
      const f = an(h);
      if (a.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        t.setNodeMarkup(h.start, m);
      }
      (f || f === 0) && t.lift(h, f);
    });
  }), !0;
}, xr = (e) => (t) => e(t), Ar = () => ({ state: e, dispatch: t }) => ln(e, t), Or = (e, t) => ({ editor: n, tr: r }) => {
  const { state: s } = n, o = s.doc.slice(e.from, e.to);
  r.deleteRange(e.from, e.to);
  const i = r.mapping.map(t);
  return r.insert(i, o.content), r.setSelection(new I(r.doc.resolve(i - 1))), !0;
}, Lr = () => ({ tr: e, dispatch: t }) => {
  const { selection: n } = e, r = n.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const s = e.selection.$anchor;
  for (let o = s.depth; o > 0; o -= 1)
    if (s.node(o).type === r.type) {
      if (t) {
        const a = s.before(o), c = s.after(o);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Rr = (e) => ({ tr: t, state: n, dispatch: r }) => {
  const s = $(e, n.schema), o = t.selection.$anchor;
  for (let i = o.depth; i > 0; i -= 1)
    if (o.node(i).type === s) {
      if (r) {
        const c = o.before(i), l = o.after(i);
        t.delete(c, l).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Pr = (e) => ({ tr: t, dispatch: n }) => {
  const { from: r, to: s } = e;
  return n && t.delete(r, s), !0;
}, Hr = () => ({ state: e, dispatch: t }) => cn(e, t), _r = () => ({ commands: e }) => e.keyboardShortcut("Enter"), $r = () => ({ state: e, dispatch: t }) => dn(e, t);
function mt(e, t, n = { strict: !0 }) {
  const r = Object.keys(t);
  return r.length ? r.every((s) => n.strict ? t[s] === e[s] : Ut(t[s]) ? t[s].test(e[s]) : t[s] === e[s]) : !0;
}
function It(e, t, n = {}) {
  return e.find((r) => r.type === t && mt(r.attrs, n));
}
function Ir(e, t, n = {}) {
  return !!It(e, t, n);
}
function Gt(e, t, n = {}) {
  if (!e || !t)
    return;
  let r = e.parent.childAfter(e.parentOffset);
  if ((!r.node || !r.node.marks.some((l) => l.type === t)) && (r = e.parent.childBefore(e.parentOffset)), !r.node || !r.node.marks.some((l) => l.type === t))
    return;
  const s = It([...r.node.marks], t, n);
  if (!s)
    return;
  let o = r.index, i = e.start() + r.offset, a = o + 1, c = i + r.node.nodeSize;
  for (It([...r.node.marks], t, n); o > 0 && s.isInSet(e.parent.child(o - 1).marks); )
    o -= 1, i -= e.parent.child(o).nodeSize;
  for (; a < e.parent.childCount && Ir([...e.parent.child(a).marks], t, n); )
    c += e.parent.child(a).nodeSize, a += 1;
  return {
    from: i,
    to: c
  };
}
function K(e, t) {
  if (typeof e == "string") {
    if (!t.marks[e])
      throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`);
    return t.marks[e];
  }
  return e;
}
const Dr = (e, t = {}) => ({ tr: n, state: r, dispatch: s }) => {
  const o = K(e, r.schema), { doc: i, selection: a } = n, { $from: c, from: l, to: u } = a;
  if (s) {
    const d = Gt(c, o, t);
    if (d && d.from <= l && d.to >= u) {
      const p = I.create(i, d.from, d.to);
      n.setSelection(p);
    }
  }
  return !0;
}, Nr = (e) => (t) => {
  const n = typeof e == "function" ? e(t) : e;
  for (let r = 0; r < n.length; r += 1)
    if (n[r](t))
      return !0;
  return !1;
};
function Jt(e) {
  return e instanceof I;
}
function j(e = 0, t = 0, n = 0) {
  return Math.min(Math.max(e, t), n);
}
function We(e, t = null) {
  if (!t)
    return null;
  const n = W.atStart(e), r = W.atEnd(e);
  if (t === "start" || t === !0)
    return n;
  if (t === "end")
    return r;
  const s = n.from, o = r.to;
  return t === "all" ? I.create(e, j(0, s, o), j(e.content.size, s, o)) : I.create(e, j(t, s, o), j(t, s, o));
}
function kt() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const Br = (e = null, t = {}) => ({ editor: n, view: r, tr: s, dispatch: o }) => {
  t = {
    scrollIntoView: !0,
    ...t
  };
  const i = () => {
    kt() && r.dom.focus(), requestAnimationFrame(() => {
      n.isDestroyed || (r.focus(), t != null && t.scrollIntoView && n.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && e === null || e === !1)
    return !0;
  if (o && e === null && !Jt(n.state.selection))
    return i(), !0;
  const a = We(s.doc, e) || n.state.selection, c = n.state.selection.eq(a);
  return o && (c || s.setSelection(a), c && s.storedMarks && s.setStoredMarks(s.storedMarks), i()), !0;
}, jr = (e, t) => (n) => e.every((r, s) => t(r, { ...n, index: s })), Fr = (e, t) => ({ tr: n, commands: r }) => r.insertContentAt({ from: n.selection.from, to: n.selection.to }, e, t), Ve = (e) => {
  const t = e.childNodes;
  for (let n = t.length - 1; n >= 0; n -= 1) {
    const r = t[n];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? e.removeChild(r) : r.nodeType === 1 && Ve(r);
  }
  return e;
};
function at(e) {
  const t = `<body>${e}</body>`, n = new window.DOMParser().parseFromString(t, "text/html").body;
  return Ve(n);
}
function gt(e, t, n) {
  n = {
    slice: !0,
    parseOptions: {},
    ...n
  };
  const r = typeof e == "object" && e !== null, s = typeof e == "string";
  if (r)
    try {
      if (Array.isArray(e) && e.length > 0)
        return ut.fromArray(e.map((a) => t.nodeFromJSON(a)));
      const i = t.nodeFromJSON(e);
      return n.errorOnInvalidContent && i.check(), i;
    } catch (o) {
      if (n.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", e, "Error:", o), gt("", t, n);
    }
  if (s) {
    if (n.errorOnInvalidContent) {
      let i = !1, a = "";
      const c = new Pe({
        topNode: t.spec.topNode,
        marks: t.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: t.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (l) => (i = !0, a = typeof l == "string" ? l : l.outerHTML, null)
              }
            ]
          }
        })
      });
      if (n.slice ? xt.fromSchema(c).parseSlice(at(e), n.parseOptions) : xt.fromSchema(c).parse(at(e), n.parseOptions), n.errorOnInvalidContent && i)
        throw new Error("[tiptap error]: Invalid HTML content", { cause: new Error(`Invalid element found: ${a}`) });
    }
    const o = xt.fromSchema(t);
    return n.slice ? o.parseSlice(at(e), n.parseOptions).content : o.parse(at(e), n.parseOptions);
  }
  return gt("", t, n);
}
function zr(e, t, n) {
  const r = e.steps.length - 1;
  if (r < t)
    return;
  const s = e.steps[r];
  if (!(s instanceof Hn || s instanceof _n))
    return;
  const o = e.mapping.maps[r];
  let i = 0;
  o.forEach((a, c, l, u) => {
    i === 0 && (i = u);
  }), e.setSelection(W.near(e.doc.resolve(i), n));
}
const Wr = (e) => !("type" in e), Vr = (e, t, n) => ({ tr: r, dispatch: s, editor: o }) => {
  var i;
  if (s) {
    n = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...n
    };
    let a;
    try {
      a = gt(t, o.schema, {
        parseOptions: {
          preserveWhitespace: "full",
          ...n.parseOptions
        },
        errorOnInvalidContent: (i = n.errorOnInvalidContent) !== null && i !== void 0 ? i : o.options.enableContentCheck
      });
    } catch (f) {
      return o.emit("contentError", {
        editor: o,
        error: f,
        disableCollaboration: () => {
          o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      }), !1;
    }
    let { from: c, to: l } = typeof e == "number" ? { from: e, to: e } : { from: e.from, to: e.to }, u = !0, d = !0;
    if ((Wr(a) ? a : [a]).forEach((f) => {
      f.check(), u = u ? f.isText && f.marks.length === 0 : !1, d = d ? f.isBlock : !1;
    }), c === l && d) {
      const { parent: f } = r.doc.resolve(c);
      f.isTextblock && !f.type.spec.code && !f.childCount && (c -= 1, l += 1);
    }
    let h;
    u ? (Array.isArray(t) ? h = t.map((f) => f.text || "").join("") : typeof t == "object" && t && t.text ? h = t.text : h = t, r.insertText(h, c, l)) : (h = a, r.replaceWith(c, l, h)), n.updateSelection && zr(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", { from: c, text: h }), n.applyPasteRules && r.setMeta("applyPasteRules", { from: c, text: h });
  }
  return !0;
}, Kr = () => ({ state: e, dispatch: t }) => un(e, t), qr = () => ({ state: e, dispatch: t }) => pn(e, t), Ur = () => ({ state: e, dispatch: t }) => hn(e, t), Gr = () => ({ state: e, dispatch: t }) => fn(e, t), Jr = () => ({ state: e, dispatch: t, tr: n }) => {
  try {
    const r = Re(e.doc, e.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
  } catch {
    return !1;
  }
}, Yr = () => ({ state: e, dispatch: t, tr: n }) => {
  try {
    const r = Re(e.doc, e.selection.$from.pos, 1);
    return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
  } catch {
    return !1;
  }
}, Xr = () => ({ state: e, dispatch: t }) => mn(e, t), Qr = () => ({ state: e, dispatch: t }) => gn(e, t);
function Ke() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Zr(e) {
  const t = e.split(/-(?!$)/);
  let n = t[t.length - 1];
  n === "Space" && (n = " ");
  let r, s, o, i;
  for (let a = 0; a < t.length - 1; a += 1) {
    const c = t[a];
    if (/^(cmd|meta|m)$/i.test(c))
      i = !0;
    else if (/^a(lt)?$/i.test(c))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(c))
      s = !0;
    else if (/^s(hift)?$/i.test(c))
      o = !0;
    else if (/^mod$/i.test(c))
      kt() || Ke() ? i = !0 : s = !0;
    else
      throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (n = `Alt-${n}`), s && (n = `Ctrl-${n}`), i && (n = `Meta-${n}`), o && (n = `Shift-${n}`), n;
}
const ts = (e) => ({ editor: t, view: n, tr: r, dispatch: s }) => {
  const o = Zr(e).split(/-(?!$)/), i = o.find((l) => !["Alt", "Ctrl", "Meta", "Shift"].includes(l)), a = new KeyboardEvent("keydown", {
    key: i === "Space" ? " " : i,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), c = t.captureTransaction(() => {
    n.someProp("handleKeyDown", (l) => l(n, a));
  });
  return c == null || c.steps.forEach((l) => {
    const u = l.map(r.mapping);
    u && s && r.maybeStep(u);
  }), !0;
};
function rt(e, t, n = {}) {
  const { from: r, to: s, empty: o } = e.selection, i = t ? $(t, e.schema) : null, a = [];
  e.doc.nodesBetween(r, s, (d, p) => {
    if (d.isText)
      return;
    const h = Math.max(r, p), f = Math.min(s, p + d.nodeSize);
    a.push({
      node: d,
      from: h,
      to: f
    });
  });
  const c = s - r, l = a.filter((d) => i ? i.name === d.node.type.name : !0).filter((d) => mt(d.node.attrs, n, { strict: !1 }));
  return o ? !!l.length : l.reduce((d, p) => d + p.to - p.from, 0) >= c;
}
const es = (e, t = {}) => ({ state: n, dispatch: r }) => {
  const s = $(e, n.schema);
  return rt(n, s, t) ? yn(n, r) : !1;
}, ns = () => ({ state: e, dispatch: t }) => vn(e, t), rs = (e) => ({ state: t, dispatch: n }) => {
  const r = $(e, t.schema);
  return bn(r)(t, n);
}, ss = () => ({ state: e, dispatch: t }) => Mn(e, t);
function wt(e, t) {
  return t.nodes[e] ? "node" : t.marks[e] ? "mark" : null;
}
function ue(e, t) {
  const n = typeof t == "string" ? [t] : t;
  return Object.keys(e).reduce((r, s) => (n.includes(s) || (r[s] = e[s]), r), {});
}
const os = (e, t) => ({ tr: n, state: r, dispatch: s }) => {
  let o = null, i = null;
  const a = wt(typeof e == "string" ? e : e.name, r.schema);
  return a ? (a === "node" && (o = $(e, r.schema)), a === "mark" && (i = K(e, r.schema)), s && n.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (l, u) => {
      o && o === l.type && n.setNodeMarkup(u, void 0, ue(l.attrs, t)), i && l.marks.length && l.marks.forEach((d) => {
        i === d.type && n.addMark(u, u + l.nodeSize, i.create(ue(d.attrs, t)));
      });
    });
  }), !0) : !1;
}, is = () => ({ tr: e, dispatch: t }) => (t && e.scrollIntoView(), !0), as = () => ({ tr: e, commands: t }) => t.setTextSelection({
  from: 0,
  to: e.doc.content.size
}), ls = () => ({ state: e, dispatch: t }) => Sn(e, t), cs = () => ({ state: e, dispatch: t }) => kn(e, t), ds = () => ({ state: e, dispatch: t }) => wn(e, t), us = () => ({ state: e, dispatch: t }) => En(e, t), ps = () => ({ state: e, dispatch: t }) => Tn(e, t);
function Dt(e, t, n = {}, r = {}) {
  return gt(e, t, {
    slice: !1,
    parseOptions: n,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const hs = (e, t = !1, n = {}, r = {}) => ({ editor: s, tr: o, dispatch: i, commands: a }) => {
  var c, l;
  const { doc: u } = o;
  if (n.preserveWhitespace !== "full") {
    const d = Dt(e, s.schema, n, {
      errorOnInvalidContent: (c = r.errorOnInvalidContent) !== null && c !== void 0 ? c : s.options.enableContentCheck
    });
    return i && o.replaceWith(0, u.content.size, d).setMeta("preventUpdate", !t), !0;
  }
  return i && o.setMeta("preventUpdate", !t), a.insertContentAt({ from: 0, to: u.content.size }, e, {
    parseOptions: n,
    errorOnInvalidContent: (l = r.errorOnInvalidContent) !== null && l !== void 0 ? l : s.options.enableContentCheck
  });
};
function Yt(e, t) {
  const n = K(t, e.schema), { from: r, to: s, empty: o } = e.selection, i = [];
  o ? (e.storedMarks && i.push(...e.storedMarks), i.push(...e.selection.$head.marks())) : e.doc.nodesBetween(r, s, (c) => {
    i.push(...c.marks);
  });
  const a = i.find((c) => c.type.name === n.name);
  return a ? { ...a.attrs } : {};
}
function fs(e, t) {
  const n = new on(e);
  return t.forEach((r) => {
    r.steps.forEach((s) => {
      n.step(s);
    });
  }), n;
}
function ms(e) {
  for (let t = 0; t < e.edgeCount; t += 1) {
    const { type: n } = e.edge(t);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
function vi(e, t) {
  const n = [];
  return e.descendants((r, s) => {
    t(r) && n.push({
      node: r,
      pos: s
    });
  }), n;
}
function gs(e, t, n) {
  const r = [];
  return e.nodesBetween(t.from, t.to, (s, o) => {
    n(s) && r.push({
      node: s,
      pos: o
    });
  }), r;
}
function qe(e, t) {
  for (let n = e.depth; n > 0; n -= 1) {
    const r = e.node(n);
    if (t(r))
      return {
        pos: n > 0 ? e.before(n) : 0,
        start: e.start(n),
        depth: n,
        node: r
      };
  }
}
function Xt(e) {
  return (t) => qe(t.$from, e);
}
function ys(e, t) {
  const n = $n.fromSchema(t).serializeFragment(e), s = document.implementation.createHTMLDocument().createElement("div");
  return s.appendChild(n), s.innerHTML;
}
function vs(e, t) {
  const n = {
    from: 0,
    to: e.content.size
  };
  return Fe(e, n, t);
}
function bs(e, t) {
  const n = $(t, e.schema), { from: r, to: s } = e.selection, o = [];
  e.doc.nodesBetween(r, s, (a) => {
    o.push(a);
  });
  const i = o.reverse().find((a) => a.type.name === n.name);
  return i ? { ...i.attrs } : {};
}
function Ue(e, t) {
  const n = wt(typeof t == "string" ? t : t.name, e.schema);
  return n === "node" ? bs(e, t) : n === "mark" ? Yt(e, t) : {};
}
function Ms(e, t = JSON.stringify) {
  const n = {};
  return e.filter((r) => {
    const s = t(r);
    return Object.prototype.hasOwnProperty.call(n, s) ? !1 : n[s] = !0;
  });
}
function Ss(e) {
  const t = Ms(e);
  return t.length === 1 ? t : t.filter((n, r) => !t.filter((o, i) => i !== r).some((o) => n.oldRange.from >= o.oldRange.from && n.oldRange.to <= o.oldRange.to && n.newRange.from >= o.newRange.from && n.newRange.to <= o.newRange.to));
}
function ks(e) {
  const { mapping: t, steps: n } = e, r = [];
  return t.maps.forEach((s, o) => {
    const i = [];
    if (s.ranges.length)
      s.forEach((a, c) => {
        i.push({ from: a, to: c });
      });
    else {
      const { from: a, to: c } = n[o];
      if (a === void 0 || c === void 0)
        return;
      i.push({ from: a, to: c });
    }
    i.forEach(({ from: a, to: c }) => {
      const l = t.slice(o).map(a, -1), u = t.slice(o).map(c), d = t.invert().map(l, -1), p = t.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: p
        },
        newRange: {
          from: l,
          to: u
        }
      });
    });
  }), Ss(r);
}
function Qt(e, t, n) {
  const r = [];
  return e === t ? n.resolve(e).marks().forEach((s) => {
    const o = n.resolve(e), i = Gt(o, s.type);
    i && r.push({
      mark: s,
      ...i
    });
  }) : n.nodesBetween(e, t, (s, o) => {
    !s || (s == null ? void 0 : s.nodeSize) === void 0 || r.push(...s.marks.map((i) => ({
      from: o,
      to: o + s.nodeSize,
      mark: i
    })));
  }), r;
}
function pt(e, t, n) {
  return Object.fromEntries(Object.entries(n).filter(([r]) => {
    const s = e.find((o) => o.type === t && o.name === r);
    return s ? s.attribute.keepOnSplit : !1;
  }));
}
function Nt(e, t, n = {}) {
  const { empty: r, ranges: s } = e.selection, o = t ? K(t, e.schema) : null;
  if (r)
    return !!(e.storedMarks || e.selection.$from.marks()).filter((d) => o ? o.name === d.type.name : !0).find((d) => mt(d.attrs, n, { strict: !1 }));
  let i = 0;
  const a = [];
  if (s.forEach(({ $from: d, $to: p }) => {
    const h = d.pos, f = p.pos;
    e.doc.nodesBetween(h, f, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const y = Math.max(h, g), k = Math.min(f, g + m.nodeSize), b = k - y;
      i += b, a.push(...m.marks.map((v) => ({
        mark: v,
        from: y,
        to: k
      })));
    });
  }), i === 0)
    return !1;
  const c = a.filter((d) => o ? o.name === d.mark.type.name : !0).filter((d) => mt(d.mark.attrs, n, { strict: !1 })).reduce((d, p) => d + p.to - p.from, 0), l = a.filter((d) => o ? d.mark.type !== o && d.mark.type.excludes(o) : !0).reduce((d, p) => d + p.to - p.from, 0);
  return (c > 0 ? c + l : c) >= i;
}
function ws(e, t, n = {}) {
  if (!t)
    return rt(e, null, n) || Nt(e, null, n);
  const r = wt(t, e.schema);
  return r === "node" ? rt(e, t, n) : r === "mark" ? Nt(e, t, n) : !1;
}
function pe(e, t) {
  const { nodeExtensions: n } = bt(t), r = n.find((i) => i.name === e);
  if (!r)
    return !1;
  const s = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, o = T(S(r, "group", s));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function Et(e, { checkChildren: t = !0, ignoreWhitespace: n = !1 } = {}) {
  var r;
  if (n) {
    if (e.type.name === "hardBreak")
      return !0;
    if (e.isText)
      return /^\s*$/m.test((r = e.text) !== null && r !== void 0 ? r : "");
  }
  if (e.isText)
    return !e.text;
  if (e.isAtom || e.isLeaf)
    return !1;
  if (e.content.childCount === 0)
    return !0;
  if (t) {
    let s = !0;
    return e.content.forEach((o) => {
      s !== !1 && (Et(o, { ignoreWhitespace: n, checkChildren: t }) || (s = !1));
    }), s;
  }
  return !1;
}
function Ge(e) {
  return e instanceof tt;
}
function Es(e, t, n) {
  const s = e.state.doc.content.size, o = j(t, 0, s), i = j(n, 0, s), a = e.coordsAtPos(o), c = e.coordsAtPos(i, -1), l = Math.min(a.top, c.top), u = Math.max(a.bottom, c.bottom), d = Math.min(a.left, c.left), p = Math.max(a.right, c.right), h = p - d, f = u - l, y = {
    top: l,
    bottom: u,
    left: d,
    right: p,
    width: h,
    height: f,
    x: d,
    y: l
  };
  return {
    ...y,
    toJSON: () => y
  };
}
function Ts(e, t, n) {
  var r;
  const { selection: s } = t;
  let o = null;
  if (Jt(s) && (o = s.$cursor), o) {
    const a = (r = e.storedMarks) !== null && r !== void 0 ? r : o.marks();
    return !!n.isInSet(a) || !a.some((c) => c.type.excludes(n));
  }
  const { ranges: i } = s;
  return i.some(({ $from: a, $to: c }) => {
    let l = a.depth === 0 ? e.doc.inlineContent && e.doc.type.allowsMarkType(n) : !1;
    return e.doc.nodesBetween(a.pos, c.pos, (u, d, p) => {
      if (l)
        return !1;
      if (u.isInline) {
        const h = !p || p.type.allowsMarkType(n), f = !!n.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(n));
        l = h && f;
      }
      return !l;
    }), l;
  });
}
const Cs = (e, t = {}) => ({ tr: n, state: r, dispatch: s }) => {
  const { selection: o } = n, { empty: i, ranges: a } = o, c = K(e, r.schema);
  if (s)
    if (i) {
      const l = Yt(r, c);
      n.addStoredMark(c.create({
        ...l,
        ...t
      }));
    } else
      a.forEach((l) => {
        const u = l.$from.pos, d = l.$to.pos;
        r.doc.nodesBetween(u, d, (p, h) => {
          const f = Math.max(h, u), m = Math.min(h + p.nodeSize, d);
          p.marks.find((y) => y.type === c) ? p.marks.forEach((y) => {
            c === y.type && n.addMark(f, m, c.create({
              ...y.attrs,
              ...t
            }));
          }) : n.addMark(f, m, c.create(t));
        });
      });
  return Ts(r, n, c);
}, xs = (e, t) => ({ tr: n }) => (n.setMeta(e, t), !0), As = (e, t = {}) => ({ state: n, dispatch: r, chain: s }) => {
  const o = $(e, n.schema);
  return o.isTextblock ? s().command(({ commands: i }) => ne(o, t)(n) ? !0 : i.clearNodes()).command(({ state: i }) => ne(o, t)(i, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Os = (e) => ({ tr: t, dispatch: n }) => {
  if (n) {
    const { doc: r } = t, s = j(e, 0, r.content.size), o = tt.create(r, s);
    t.setSelection(o);
  }
  return !0;
}, Ls = (e) => ({ tr: t, dispatch: n }) => {
  if (n) {
    const { doc: r } = t, { from: s, to: o } = typeof e == "number" ? { from: e, to: e } : e, i = I.atStart(r).from, a = I.atEnd(r).to, c = j(s, i, a), l = j(o, i, a), u = I.create(r, c, l);
    t.setSelection(u);
  }
  return !0;
}, Rs = (e) => ({ state: t, dispatch: n }) => {
  const r = $(e, t.schema);
  return Cn(r)(t, n);
};
function he(e, t) {
  const n = e.storedMarks || e.selection.$to.parentOffset && e.selection.$from.marks();
  if (n) {
    const r = n.filter((s) => t == null ? void 0 : t.includes(s.type.name));
    e.tr.ensureMarks(r);
  }
}
const Ps = ({ keepMarks: e = !0 } = {}) => ({ tr: t, state: n, dispatch: r, editor: s }) => {
  const { selection: o, doc: i } = t, { $from: a, $to: c } = o, l = s.extensionManager.attributes, u = pt(l, a.node().type.name, a.node().attrs);
  if (o instanceof tt && o.node.isBlock)
    return !a.parentOffset || !dt(i, a.pos) ? !1 : (r && (e && he(n, s.extensionManager.splittableMarks), t.split(a.pos).scrollIntoView()), !0);
  if (!a.parent.isBlock)
    return !1;
  const d = c.parentOffset === c.parent.content.size, p = a.depth === 0 ? void 0 : ms(a.node(-1).contentMatchAt(a.indexAfter(-1)));
  let h = d && p ? [
    {
      type: p,
      attrs: u
    }
  ] : void 0, f = dt(t.doc, t.mapping.map(a.pos), 1, h);
  if (!h && !f && dt(t.doc, t.mapping.map(a.pos), 1, p ? [{ type: p }] : void 0) && (f = !0, h = p ? [
    {
      type: p,
      attrs: u
    }
  ] : void 0), r) {
    if (f && (o instanceof I && t.deleteSelection(), t.split(t.mapping.map(a.pos), 1, h), p && !d && !a.parentOffset && a.parent.type !== p)) {
      const m = t.mapping.map(a.before()), g = t.doc.resolve(m);
      a.node(-1).canReplaceWith(g.index(), g.index() + 1, p) && t.setNodeMarkup(t.mapping.map(a.before()), p);
    }
    e && he(n, s.extensionManager.splittableMarks), t.scrollIntoView();
  }
  return f;
}, Hs = (e, t = {}) => ({ tr: n, state: r, dispatch: s, editor: o }) => {
  var i;
  const a = $(e, r.schema), { $from: c, $to: l } = r.selection, u = r.selection.node;
  if (u && u.isBlock || c.depth < 2 || !c.sameParent(l))
    return !1;
  const d = c.node(-1);
  if (d.type !== a)
    return !1;
  const p = o.extensionManager.attributes;
  if (c.parent.content.size === 0 && c.node(-1).childCount === c.indexAfter(-1)) {
    if (c.depth === 2 || c.node(-3).type !== a || c.index(-2) !== c.node(-2).childCount - 1)
      return !1;
    if (s) {
      let y = ut.empty;
      const k = c.index(-1) ? 1 : c.index(-2) ? 2 : 3;
      for (let A = c.depth - k; A >= c.depth - 3; A -= 1)
        y = ut.from(c.node(A).copy(y));
      const b = c.indexAfter(-1) < c.node(-2).childCount ? 1 : c.indexAfter(-2) < c.node(-3).childCount ? 2 : 3, v = {
        ...pt(p, c.node().type.name, c.node().attrs),
        ...t
      }, E = ((i = a.contentMatch.defaultType) === null || i === void 0 ? void 0 : i.createAndFill(v)) || void 0;
      y = y.append(ut.from(a.createAndFill(null, E) || void 0));
      const M = c.before(c.depth - (k - 1));
      n.replace(M, c.after(-b), new xn(y, 4 - k, 0));
      let C = -1;
      n.doc.nodesBetween(M, n.doc.content.size, (A, w) => {
        if (C > -1)
          return !1;
        A.isTextblock && A.content.size === 0 && (C = w + 1);
      }), C > -1 && n.setSelection(I.near(n.doc.resolve(C))), n.scrollIntoView();
    }
    return !0;
  }
  const h = l.pos === c.end() ? d.contentMatchAt(0).defaultType : null, f = {
    ...pt(p, d.type.name, d.attrs),
    ...t
  }, m = {
    ...pt(p, c.node().type.name, c.node().attrs),
    ...t
  };
  n.delete(c.pos, l.pos);
  const g = h ? [
    { type: a, attrs: f },
    { type: h, attrs: m }
  ] : [{ type: a, attrs: f }];
  if (!dt(n.doc, c.pos, 2))
    return !1;
  if (s) {
    const { selection: y, storedMarks: k } = r, { splittableMarks: b } = o.extensionManager, v = k || y.$to.parentOffset && y.$from.marks();
    if (n.split(c.pos, 2, g).scrollIntoView(), !v || !s)
      return !0;
    const E = v.filter((M) => b.includes(M.type.name));
    n.ensureMarks(E);
  }
  return !0;
}, Ot = (e, t) => {
  const n = Xt((i) => i.type === t)(e.selection);
  if (!n)
    return !0;
  const r = e.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
  if (r === void 0)
    return !0;
  const s = e.doc.nodeAt(r);
  return n.node.type === (s == null ? void 0 : s.type) && Wt(e.doc, n.pos) && e.join(n.pos), !0;
}, Lt = (e, t) => {
  const n = Xt((i) => i.type === t)(e.selection);
  if (!n)
    return !0;
  const r = e.doc.resolve(n.start).after(n.depth);
  if (r === void 0)
    return !0;
  const s = e.doc.nodeAt(r);
  return n.node.type === (s == null ? void 0 : s.type) && Wt(e.doc, r) && e.join(r), !0;
}, _s = (e, t, n, r = {}) => ({ editor: s, tr: o, state: i, dispatch: a, chain: c, commands: l, can: u }) => {
  const { extensions: d, splittableMarks: p } = s.extensionManager, h = $(e, i.schema), f = $(t, i.schema), { selection: m, storedMarks: g } = i, { $from: y, $to: k } = m, b = y.blockRange(k), v = g || m.$to.parentOffset && m.$from.marks();
  if (!b)
    return !1;
  const E = Xt((M) => pe(M.type.name, d))(m);
  if (b.depth >= 1 && E && b.depth - E.depth <= 1) {
    if (E.node.type === h)
      return l.liftListItem(f);
    if (pe(E.node.type.name, d) && h.validContent(E.node.content) && a)
      return c().command(() => (o.setNodeMarkup(E.pos, h), !0)).command(() => Ot(o, h)).command(() => Lt(o, h)).run();
  }
  return !n || !v || !a ? c().command(() => u().wrapInList(h, r) ? !0 : l.clearNodes()).wrapInList(h, r).command(() => Ot(o, h)).command(() => Lt(o, h)).run() : c().command(() => {
    const M = u().wrapInList(h, r), C = v.filter((A) => p.includes(A.type.name));
    return o.ensureMarks(C), M ? !0 : l.clearNodes();
  }).wrapInList(h, r).command(() => Ot(o, h)).command(() => Lt(o, h)).run();
}, $s = (e, t = {}, n = {}) => ({ state: r, commands: s }) => {
  const { extendEmptyMarkRange: o = !1 } = n, i = K(e, r.schema);
  return Nt(r, i, t) ? s.unsetMark(i, { extendEmptyMarkRange: o }) : s.setMark(i, t);
}, Is = (e, t, n = {}) => ({ state: r, commands: s }) => {
  const o = $(e, r.schema), i = $(t, r.schema), a = rt(r, o, n);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), a ? s.setNode(i, c) : s.setNode(o, { ...c, ...n });
}, Ds = (e, t = {}) => ({ state: n, commands: r }) => {
  const s = $(e, n.schema);
  return rt(n, s, t) ? r.lift(s) : r.wrapIn(s, t);
}, Ns = () => ({ state: e, dispatch: t }) => {
  const n = e.plugins;
  for (let r = 0; r < n.length; r += 1) {
    const s = n[r];
    let o;
    if (s.spec.isInputRules && (o = s.getState(e))) {
      if (t) {
        const i = e.tr, a = o.transform;
        for (let c = a.steps.length - 1; c >= 0; c -= 1)
          i.step(a.steps[c].invert(a.docs[c]));
        if (o.text) {
          const c = i.doc.resolve(o.from).marks();
          i.replaceWith(o.from, o.to, e.schema.text(o.text, c));
        } else
          i.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, Bs = () => ({ tr: e, dispatch: t }) => {
  const { selection: n } = e, { empty: r, ranges: s } = n;
  return r || t && s.forEach((o) => {
    e.removeMark(o.$from.pos, o.$to.pos);
  }), !0;
}, js = (e, t = {}) => ({ tr: n, state: r, dispatch: s }) => {
  var o;
  const { extendEmptyMarkRange: i = !1 } = t, { selection: a } = n, c = K(e, r.schema), { $from: l, empty: u, ranges: d } = a;
  if (!s)
    return !0;
  if (u && i) {
    let { from: p, to: h } = a;
    const f = (o = l.marks().find((g) => g.type === c)) === null || o === void 0 ? void 0 : o.attrs, m = Gt(l, c, f);
    m && (p = m.from, h = m.to), n.removeMark(p, h, c);
  } else
    d.forEach((p) => {
      n.removeMark(p.$from.pos, p.$to.pos, c);
    });
  return n.removeStoredMark(c), !0;
}, Fs = (e, t = {}) => ({ tr: n, state: r, dispatch: s }) => {
  let o = null, i = null;
  const a = wt(typeof e == "string" ? e : e.name, r.schema);
  return a ? (a === "node" && (o = $(e, r.schema)), a === "mark" && (i = K(e, r.schema)), s && n.selection.ranges.forEach((c) => {
    const l = c.$from.pos, u = c.$to.pos;
    r.doc.nodesBetween(l, u, (d, p) => {
      o && o === d.type && n.setNodeMarkup(p, void 0, {
        ...d.attrs,
        ...t
      }), i && d.marks.length && d.marks.forEach((h) => {
        if (i === h.type) {
          const f = Math.max(p, l), m = Math.min(p + d.nodeSize, u);
          n.addMark(f, m, i.create({
            ...h.attrs,
            ...t
          }));
        }
      });
    });
  }), !0) : !1;
}, zs = (e, t = {}) => ({ state: n, dispatch: r }) => {
  const s = $(e, n.schema);
  return An(s, t)(n, r);
}, Ws = (e, t = {}) => ({ state: n, dispatch: r }) => {
  const s = $(e, n.schema);
  return On(s, t)(n, r);
};
var Vs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: Er,
  clearContent: Tr,
  clearNodes: Cr,
  command: xr,
  createParagraphNear: Ar,
  cut: Or,
  deleteCurrentNode: Lr,
  deleteNode: Rr,
  deleteRange: Pr,
  deleteSelection: Hr,
  enter: _r,
  exitCode: $r,
  extendMarkRange: Dr,
  first: Nr,
  focus: Br,
  forEach: jr,
  insertContent: Fr,
  insertContentAt: Vr,
  joinBackward: Ur,
  joinDown: qr,
  joinForward: Gr,
  joinItemBackward: Jr,
  joinItemForward: Yr,
  joinTextblockBackward: Xr,
  joinTextblockForward: Qr,
  joinUp: Kr,
  keyboardShortcut: ts,
  lift: es,
  liftEmptyBlock: ns,
  liftListItem: rs,
  newlineInCode: ss,
  resetAttributes: os,
  scrollIntoView: is,
  selectAll: as,
  selectNodeBackward: ls,
  selectNodeForward: cs,
  selectParentNode: ds,
  selectTextblockEnd: us,
  selectTextblockStart: ps,
  setContent: hs,
  setMark: Cs,
  setMeta: xs,
  setNode: As,
  setNodeSelection: Os,
  setTextSelection: Ls,
  sinkListItem: Rs,
  splitBlock: Ps,
  splitListItem: Hs,
  toggleList: _s,
  toggleMark: $s,
  toggleNode: Is,
  toggleWrap: Ds,
  undoInputRule: Ns,
  unsetAllMarks: Bs,
  unsetMark: js,
  updateAttributes: Fs,
  wrapIn: zs,
  wrapInList: Ws
});
const Ks = P.create({
  name: "commands",
  addCommands() {
    return {
      ...Vs
    };
  }
}), qs = P.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new H({
        key: new _("tiptapDrop"),
        props: {
          handleDrop: (e, t, n, r) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: t,
              slice: n,
              moved: r
            });
          }
        }
      })
    ];
  }
}), Us = P.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new H({
        key: new _("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), Gs = P.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: e } = this;
    return [
      new H({
        key: new _("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (t, n) => {
              e.isFocused = !0;
              const r = e.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
              return t.dispatch(r), !1;
            },
            blur: (t, n) => {
              e.isFocused = !1;
              const r = e.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
              return t.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), Js = P.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const e = () => this.editor.commands.first(({ commands: i }) => [
      () => i.undoInputRule(),
      // maybe convert first text block node to default node
      () => i.command(({ tr: a }) => {
        const { selection: c, doc: l } = a, { empty: u, $anchor: d } = c, { pos: p, parent: h } = d, f = d.parent.isTextblock && p > 0 ? a.doc.resolve(p - 1) : d, m = f.parent.type.spec.isolating, g = d.pos - d.parentOffset, y = m && f.parent.childCount === 1 ? g === d.pos : W.atStart(l).from === p;
        return !u || !h.type.isTextblock || h.textContent.length || !y || y && d.parent.type.name === "paragraph" ? !1 : i.clearNodes();
      }),
      () => i.deleteSelection(),
      () => i.joinBackward(),
      () => i.selectNodeBackward()
    ]), t = () => this.editor.commands.first(({ commands: i }) => [
      () => i.deleteSelection(),
      () => i.deleteCurrentNode(),
      () => i.joinForward(),
      () => i.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: i }) => [
        () => i.newlineInCode(),
        () => i.createParagraphNear(),
        () => i.liftEmptyBlock(),
        () => i.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: e,
      "Mod-Backspace": e,
      "Shift-Backspace": e,
      Delete: t,
      "Mod-Delete": t,
      "Mod-a": () => this.editor.commands.selectAll()
    }, s = {
      ...r
    }, o = {
      ...r,
      "Ctrl-h": e,
      "Alt-Backspace": e,
      "Ctrl-d": t,
      "Ctrl-Alt-Backspace": t,
      "Alt-Delete": t,
      "Alt-d": t,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return kt() || Ke() ? o : s;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new H({
        key: new _("clearDocument"),
        appendTransaction: (e, t, n) => {
          const r = e.some((m) => m.docChanged) && !t.doc.eq(n.doc), s = e.some((m) => m.getMeta("preventClearDocument"));
          if (!r || s)
            return;
          const { empty: o, from: i, to: a } = t.selection, c = W.atStart(t.doc).from, l = W.atEnd(t.doc).to;
          if (o || !(i === c && a === l) || !Et(n.doc))
            return;
          const p = n.tr, h = yt({
            state: n,
            transaction: p
          }), { commands: f } = new vt({
            editor: this.editor,
            state: h
          });
          if (f.clearNodes(), !!p.steps.length)
            return p;
        }
      })
    ];
  }
}), Ys = P.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new H({
        key: new _("tiptapPaste"),
        props: {
          handlePaste: (e, t, n) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: t,
              slice: n
            });
          }
        }
      })
    ];
  }
}), Xs = P.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new H({
        key: new _("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class J {
  get name() {
    return this.node.type.name;
  }
  constructor(t, n, r = !1, s = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = t, this.editor = n, this.currentNode = s;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var t;
    return (t = this.actualDepth) !== null && t !== void 0 ? t : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(t) {
    let n = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      n = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: n, to: r }, t);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const t = this.resolvedPos.start(this.resolvedPos.depth - 1), n = this.resolvedPos.doc.resolve(t);
    return new J(n, this.editor);
  }
  get before() {
    let t = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.from - 3)), new J(t, this.editor);
  }
  get after() {
    let t = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.to + 3)), new J(t, this.editor);
  }
  get children() {
    const t = [];
    return this.node.content.forEach((n, r) => {
      const s = n.isBlock && !n.isTextblock, o = n.isAtom && !n.isText, i = this.pos + r + (o ? 0 : 1), a = this.resolvedPos.doc.resolve(i);
      if (!s && a.depth <= this.depth)
        return;
      const c = new J(a, this.editor, s, s ? n : null);
      s && (c.actualDepth = this.depth + 1), t.push(new J(a, this.editor, s, s ? n : null));
    }), t;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const t = this.children;
    return t[t.length - 1] || null;
  }
  closest(t, n = {}) {
    let r = null, s = this.parent;
    for (; s && !r; ) {
      if (s.node.type.name === t)
        if (Object.keys(n).length > 0) {
          const o = s.node.attrs, i = Object.keys(n);
          for (let a = 0; a < i.length; a += 1) {
            const c = i[a];
            if (o[c] !== n[c])
              break;
          }
        } else
          r = s;
      s = s.parent;
    }
    return r;
  }
  querySelector(t, n = {}) {
    return this.querySelectorAll(t, n, !0)[0] || null;
  }
  querySelectorAll(t, n = {}, r = !1) {
    let s = [];
    if (!this.children || this.children.length === 0)
      return s;
    const o = Object.keys(n);
    return this.children.forEach((i) => {
      r && s.length > 0 || (i.node.type.name === t && o.every((c) => n[c] === i.node.attrs[c]) && s.push(i), !(r && s.length > 0) && (s = s.concat(i.querySelectorAll(t, n, r))));
    }), s;
  }
  setAttribute(t) {
    const { tr: n } = this.editor.state;
    n.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...t
    }), this.editor.view.dispatch(n);
  }
}
const Qs = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function Zs(e, t, n) {
  const r = document.querySelector("style[data-tiptap-style]");
  if (r !== null)
    return r;
  const s = document.createElement("style");
  return t && s.setAttribute("nonce", t), s.setAttribute("data-tiptap-style", ""), s.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(s), s;
}
class to extends cr {
  constructor(t = {}) {
    super(), this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: n }) => {
        throw n;
      },
      onPaste: () => null,
      onDrop: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(t), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("contentError", this.options.onContentError), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: n, slice: r, moved: s }) => this.options.onDrop(n, r, s)), this.on("paste", ({ event: n, slice: r }) => this.options.onPaste(n, r)), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && document && (this.css = Zs(Qs, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(t = {}) {
    this.options = {
      ...this.options,
      ...t
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(t, n = !0) {
    this.setOptions({ editable: t }), n && this.emit("update", { editor: this, transaction: this.state.tr });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   * @returns The new editor state
   */
  registerPlugin(t, n) {
    const r = Be(n) ? n(t, [...this.state.plugins]) : [...this.state.plugins, t], s = this.state.reconfigure({ plugins: r });
    return this.view.updateState(s), s;
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKeyToRemove The plugins name
   * @returns The new editor state or undefined if the editor is destroyed
   */
  unregisterPlugin(t) {
    if (this.isDestroyed)
      return;
    const n = this.state.plugins;
    let r = n;
    if ([].concat(t).forEach((o) => {
      const i = typeof o == "string" ? `${o}$` : o.key;
      r = n.filter((a) => !a.key.startsWith(i));
    }), n.length === r.length)
      return;
    const s = this.state.reconfigure({
      plugins: r
    });
    return this.view.updateState(s), s;
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var t, n;
    const s = [...this.options.enableCoreExtensions ? [
      Us,
      wr.configure({
        blockSeparator: (n = (t = this.options.coreExtensionOptions) === null || t === void 0 ? void 0 : t.clipboardTextSerializer) === null || n === void 0 ? void 0 : n.blockSeparator
      }),
      Ks,
      Gs,
      Js,
      Xs,
      qs,
      Ys
    ].filter((o) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[o.name] !== !1 : !0) : [], ...this.options.extensions].filter((o) => ["extension", "node", "mark"].includes(o == null ? void 0 : o.type));
    this.extensionManager = new Z(s, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new vt({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView() {
    let t;
    try {
      t = Dt(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
    } catch (o) {
      if (!(o instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(o.message))
        throw o;
      this.emit("contentError", {
        editor: this,
        error: o,
        disableCollaboration: () => {
          this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((i) => i.name !== "collaboration"), this.createExtensionManager();
        }
      }), t = Dt(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
    }
    const n = We(t, this.options.autofocus);
    this.view = new Ln(this.options.element, {
      ...this.options.editorProps,
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: Rn.create({
        doc: t,
        selection: n || void 0
      })
    }), this.view.dom.setAttribute("role", "textbox"), this.view.dom.getAttribute("aria-label") || this.view.dom.setAttribute("aria-label", "Rich-Text Editor");
    const r = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(r), this.createNodeViews(), this.prependClass();
    const s = this.view.dom;
    s.editor = this;
  }
  /**
   * Creates all node views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(t) {
    this.isCapturingTransaction = !0, t(), this.isCapturingTransaction = !1;
    const n = this.capturedTransaction;
    return this.capturedTransaction = null, n;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(t) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = t;
        return;
      }
      t.steps.forEach((i) => {
        var a;
        return (a = this.capturedTransaction) === null || a === void 0 ? void 0 : a.step(i);
      });
      return;
    }
    const n = this.state.apply(t), r = !this.state.selection.eq(n.selection);
    this.emit("beforeTransaction", {
      editor: this,
      transaction: t,
      nextState: n
    }), this.view.updateState(n), this.emit("transaction", {
      editor: this,
      transaction: t
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: t
    });
    const s = t.getMeta("focus"), o = t.getMeta("blur");
    s && this.emit("focus", {
      editor: this,
      event: s.event,
      transaction: t
    }), o && this.emit("blur", {
      editor: this,
      event: o.event,
      transaction: t
    }), !(!t.docChanged || t.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: t
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(t) {
    return Ue(this.state, t);
  }
  isActive(t, n) {
    const r = typeof t == "string" ? t : null, s = typeof t == "string" ? n : t;
    return ws(this.state, r, s);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return ys(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(t) {
    const { blockSeparator: n = `

`, textSerializers: r = {} } = t || {};
    return vs(this.state.doc, {
      blockSeparator: n,
      textSerializers: {
        ...ze(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return Et(this.state.doc);
  }
  /**
   * Get the number of characters for the current document.
   *
   * @deprecated
   */
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    if (this.emit("destroy"), this.view) {
      const t = this.view.dom;
      t && t.editor && delete t.editor, this.view.destroy();
    }
    this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var t;
    return !(!((t = this.view) === null || t === void 0) && t.docView);
  }
  $node(t, n) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelector(t, n)) || null;
  }
  $nodes(t, n) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelectorAll(t, n)) || null;
  }
  $pos(t) {
    const n = this.state.doc.resolve(t);
    return new J(n, this);
  }
  get $doc() {
    return this.$pos(0);
  }
}
function Y(e) {
  return new Mt({
    find: e.find,
    handler: ({ state: t, range: n, match: r }) => {
      const s = T(e.getAttributes, void 0, r);
      if (s === !1 || s === null)
        return null;
      const { tr: o } = t, i = r[r.length - 1], a = r[0];
      if (i) {
        const c = a.search(/\S/), l = n.from + a.indexOf(i), u = l + i.length;
        if (Qt(n.from, n.to, t.doc).filter((h) => h.mark.type.excluded.find((m) => m === e.type && m !== h.mark.type)).filter((h) => h.to > l).length)
          return null;
        u < n.to && o.delete(u, n.to), l > n.from && o.delete(n.from + c, l);
        const p = n.from + c + i.length;
        o.addMark(n.from + c, p, e.type.create(s || {})), o.removeStoredMark(e.type);
      }
    }
  });
}
function Je(e) {
  return new Mt({
    find: e.find,
    handler: ({ state: t, range: n, match: r }) => {
      const s = T(e.getAttributes, void 0, r) || {}, { tr: o } = t, i = n.from;
      let a = n.to;
      const c = e.type.create(s);
      if (r[1]) {
        const l = r[0].lastIndexOf(r[1]);
        let u = i + l;
        u > a ? u = a : a = u + r[1].length;
        const d = r[0][r[0].length - 1];
        o.insertText(d, i + r[0].length - 1), o.replaceWith(u, a, c);
      } else if (r[0]) {
        const l = e.type.isInline ? i : i - 1;
        o.insert(l, e.type.create(s)).delete(o.mapping.map(i), o.mapping.map(a));
      }
      o.scrollIntoView();
    }
  });
}
function Bt(e) {
  return new Mt({
    find: e.find,
    handler: ({ state: t, range: n, match: r }) => {
      const s = t.doc.resolve(n.from), o = T(e.getAttributes, void 0, r) || {};
      if (!s.node(-1).canReplaceWith(s.index(-1), s.indexAfter(-1), e.type))
        return null;
      t.tr.delete(n.from, n.to).setBlockType(n.from, n.from, e.type, o);
    }
  });
}
function et(e) {
  return new Mt({
    find: e.find,
    handler: ({ state: t, range: n, match: r, chain: s }) => {
      const o = T(e.getAttributes, void 0, r) || {}, i = t.tr.delete(n.from, n.to), c = i.doc.resolve(n.from).blockRange(), l = c && sn(c, e.type, o);
      if (!l)
        return null;
      if (i.wrap(c, l), e.keepMarks && e.editor) {
        const { selection: d, storedMarks: p } = t, { splittableMarks: h } = e.editor.extensionManager, f = p || d.$to.parentOffset && d.$from.marks();
        if (f) {
          const m = f.filter((g) => h.includes(g.type.name));
          i.ensureMarks(m);
        }
      }
      if (e.keepAttributes) {
        const d = e.type.name === "bulletList" || e.type.name === "orderedList" ? "listItem" : "taskList";
        s().updateAttributes(d, o).run();
      }
      const u = i.doc.resolve(n.from - 1).nodeBefore;
      u && u.type === e.type && Wt(i.doc, n.from - 1) && (!e.joinPredicate || e.joinPredicate(r, u)) && i.join(n.from - 1);
    }
  });
}
class R {
  constructor(t = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...t
    }, this.name = this.config.name, t.defaultOptions && Object.keys(t.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = T(S(this, "addOptions", {
      name: this.name
    }))), this.storage = T(S(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(t = {}) {
    return new R(t);
  }
  configure(t = {}) {
    const n = this.extend({
      ...this.config,
      addOptions: () => St(this.options, t)
    });
    return n.name = this.name, n.parent = this.parent, n;
  }
  extend(t = {}) {
    const n = new R(t);
    return n.parent = this, this.child = n, n.name = t.name ? t.name : n.parent.name, t.defaultOptions && Object.keys(t.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = T(S(n, "addOptions", {
      name: n.name
    })), n.storage = T(S(n, "addStorage", {
      name: n.name,
      options: n.options
    })), n;
  }
}
function eo() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
class no {
  constructor(t, n, r) {
    this.isDragging = !1, this.component = t, this.editor = n.editor, this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...r
    }, this.extension = n.extension, this.node = n.node, this.decorations = n.decorations, this.innerDecorations = n.innerDecorations, this.view = n.view, this.HTMLAttributes = n.HTMLAttributes, this.getPos = n.getPos, this.mount();
  }
  mount() {
  }
  get dom() {
    return this.editor.view.dom;
  }
  get contentDOM() {
    return null;
  }
  onDragStart(t) {
    var n, r, s, o, i, a, c;
    const { view: l } = this.editor, u = t.target, d = u.nodeType === 3 ? (n = u.parentElement) === null || n === void 0 ? void 0 : n.closest("[data-drag-handle]") : u.closest("[data-drag-handle]");
    if (!this.dom || !((r = this.contentDOM) === null || r === void 0) && r.contains(u) || !d)
      return;
    let p = 0, h = 0;
    if (this.dom !== d) {
      const y = this.dom.getBoundingClientRect(), k = d.getBoundingClientRect(), b = (s = t.offsetX) !== null && s !== void 0 ? s : (o = t.nativeEvent) === null || o === void 0 ? void 0 : o.offsetX, v = (i = t.offsetY) !== null && i !== void 0 ? i : (a = t.nativeEvent) === null || a === void 0 ? void 0 : a.offsetY;
      p = k.x - y.x + b, h = k.y - y.y + v;
    }
    (c = t.dataTransfer) === null || c === void 0 || c.setDragImage(this.dom, p, h);
    const f = this.getPos();
    if (typeof f != "number")
      return;
    const m = tt.create(l.state.doc, f), g = l.state.tr.setSelection(m);
    l.dispatch(g);
  }
  stopEvent(t) {
    var n;
    if (!this.dom)
      return !1;
    if (typeof this.options.stopEvent == "function")
      return this.options.stopEvent({ event: t });
    const r = t.target;
    if (!(this.dom.contains(r) && !(!((n = this.contentDOM) === null || n === void 0) && n.contains(r))))
      return !1;
    const o = t.type.startsWith("drag"), i = t.type === "drop";
    if ((["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(r.tagName) || r.isContentEditable) && !i && !o)
      return !0;
    const { isEditable: c } = this.editor, { isDragging: l } = this, u = !!this.node.type.spec.draggable, d = tt.isSelectable(this.node), p = t.type === "copy", h = t.type === "paste", f = t.type === "cut", m = t.type === "mousedown";
    if (!u && d && o && t.preventDefault(), u && o && !l)
      return t.preventDefault(), !1;
    if (u && c && !l && m) {
      const g = r.closest("[data-drag-handle]");
      g && (this.dom === g || this.dom.contains(g)) && (this.isDragging = !0, document.addEventListener("dragend", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("drop", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("mouseup", () => {
        this.isDragging = !1;
      }, { once: !0 }));
    }
    return !(l || i || p || h || f || m && d);
  }
  /**
   * Called when a DOM [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or a selection change happens within the view.
   * @return `false` if the editor should re-read the selection or re-parse the range around the mutation
   * @return `true` if it can safely be ignored.
   */
  ignoreMutation(t) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: t }) : this.node.isLeaf || this.node.isAtom ? !0 : t.type === "selection" || this.dom.contains(t.target) && t.type === "childList" && (kt() || eo()) && this.editor.isFocused && [
      ...Array.from(t.addedNodes),
      ...Array.from(t.removedNodes)
    ].every((r) => r.isContentEditable) ? !1 : this.contentDOM === t.target && t.type === "attributes" ? !0 : !this.contentDOM.contains(t.target);
  }
  /**
   * Update the attributes of the prosemirror node.
   */
  updateAttributes(t) {
    this.editor.commands.command(({ tr: n }) => {
      const r = this.getPos();
      return typeof r != "number" ? !1 : (n.setNodeMarkup(r, void 0, {
        ...this.node.attrs,
        ...t
      }), !0);
    });
  }
  /**
   * Delete the node.
   */
  deleteNode() {
    const t = this.getPos();
    if (typeof t != "number")
      return;
    const n = t + this.node.nodeSize;
    this.editor.commands.deleteRange({ from: t, to: n });
  }
}
function V(e) {
  return new je({
    find: e.find,
    handler: ({ state: t, range: n, match: r, pasteEvent: s }) => {
      const o = T(e.getAttributes, void 0, r, s);
      if (o === !1 || o === null)
        return null;
      const { tr: i } = t, a = r[r.length - 1], c = r[0];
      let l = n.to;
      if (a) {
        const u = c.search(/\S/), d = n.from + c.indexOf(a), p = d + a.length;
        if (Qt(n.from, n.to, t.doc).filter((f) => f.mark.type.excluded.find((g) => g === e.type && g !== f.mark.type)).filter((f) => f.to > d).length)
          return null;
        p < n.to && i.delete(p, n.to), d > n.from && i.delete(n.from + u, d), l = n.from + u + a.length, i.addMark(n.from + u, l, e.type.create(o || {})), i.removeStoredMark(e.type);
      }
    }
  });
}
function ro(e) {
  return e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function bi(e) {
  return new je({
    find: e.find,
    handler({ match: t, chain: n, range: r, pasteEvent: s }) {
      const o = T(e.getAttributes, void 0, t, s), i = T(e.getContent, void 0, o);
      if (o === !1 || o === null)
        return null;
      const a = { type: e.type.name, attrs: o };
      i && (a.content = i), t.input && n().deleteRange(r).insertContentAt(r.from, a);
    }
  });
}
const so = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, oo = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, io = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, ao = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, Mi = D.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (e) => e.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (e) => e.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (e) => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["strong", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: e }) => e.setMark(this.name),
      toggleBold: () => ({ commands: e }) => e.toggleMark(this.name),
      unsetBold: () => ({ commands: e }) => e.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      Y({
        find: so,
        type: this.type
      }),
      Y({
        find: io,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      V({
        find: oo,
        type: this.type
      }),
      V({
        find: ao,
        type: this.type
      })
    ];
  }
});
class lo {
  constructor({ editor: t, element: n, view: r, tippyOptions: s = {}, updateDelay: o = 250, shouldShow: i }) {
    this.preventHide = !1, this.shouldShow = ({ view: a, state: c, from: l, to: u }) => {
      const { doc: d, selection: p } = c, { empty: h } = p, f = !d.textBetween(l, u).length && Jt(c.selection), m = this.element.contains(document.activeElement);
      return !(!(a.hasFocus() || m) || h || f || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: a }) => {
      var c;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      a != null && a.relatedTarget && (!((c = this.element.parentNode) === null || c === void 0) && c.contains(a.relatedTarget)) || this.hide();
    }, this.tippyBlurHandler = (a) => {
      this.blurHandler({ event: a });
    }, this.handleDebouncedUpdate = (a, c) => {
      const l = !(c != null && c.selection.eq(a.state.selection)), u = !(c != null && c.doc.eq(a.state.doc));
      !l && !u || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(a, l, u, c);
      }, this.updateDelay));
    }, this.updateHandler = (a, c, l, u) => {
      var d, p, h;
      const { state: f, composing: m } = a, { selection: g } = f;
      if (m || !c && !l)
        return;
      this.createTooltip();
      const { ranges: k } = g, b = Math.min(...k.map((M) => M.$from.pos)), v = Math.max(...k.map((M) => M.$to.pos));
      if (!((d = this.shouldShow) === null || d === void 0 ? void 0 : d.call(this, {
        editor: this.editor,
        view: a,
        state: f,
        oldState: u,
        from: b,
        to: v
      }))) {
        this.hide();
        return;
      }
      (p = this.tippy) === null || p === void 0 || p.setProps({
        getReferenceClientRect: ((h = this.tippyOptions) === null || h === void 0 ? void 0 : h.getReferenceClientRect) || (() => {
          if (Ge(f.selection)) {
            let M = a.nodeDOM(b);
            const C = M.dataset.nodeViewWrapper ? M : M.querySelector("[data-node-view-wrapper]");
            if (C && (M = C.firstChild), M)
              return M.getBoundingClientRect();
          }
          return Es(a, b, v);
        })
      }), this.show();
    }, this.editor = t, this.element = n, this.view = r, this.updateDelay = o, i && (this.shouldShow = i), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = s, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: t } = this.editor.options, n = !!t.parentElement;
    this.tippy || !n || (this.tippy = Le(t, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(t, n) {
    const { state: r } = t, s = r.selection.from !== r.selection.to;
    if (this.updateDelay > 0 && s) {
      this.handleDebouncedUpdate(t, n);
      return;
    }
    const o = !(n != null && n.selection.eq(t.state.selection)), i = !(n != null && n.doc.eq(t.state.doc));
    this.updateHandler(t, o, i, n);
  }
  show() {
    var t;
    (t = this.tippy) === null || t === void 0 || t.show();
  }
  hide() {
    var t;
    (t = this.tippy) === null || t === void 0 || t.hide();
  }
  destroy() {
    var t, n;
    !((t = this.tippy) === null || t === void 0) && t.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (n = this.tippy) === null || n === void 0 || n.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Ye = (e) => new H({
  key: typeof e.pluginKey == "string" ? new _(e.pluginKey) : e.pluginKey,
  view: (t) => new lo({ view: t, ...e })
});
P.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Ye({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
function co(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var jt = { exports: {} }, Rt = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fe;
function uo() {
  if (fe) return Rt;
  fe = 1;
  var e = L;
  function t(d, p) {
    return d === p && (d !== 0 || 1 / d === 1 / p) || d !== d && p !== p;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, s = e.useEffect, o = e.useLayoutEffect, i = e.useDebugValue;
  function a(d, p) {
    var h = p(), f = r({ inst: { value: h, getSnapshot: p } }), m = f[0].inst, g = f[1];
    return o(function() {
      m.value = h, m.getSnapshot = p, c(m) && g({ inst: m });
    }, [d, h, p]), s(function() {
      return c(m) && g({ inst: m }), d(function() {
        c(m) && g({ inst: m });
      });
    }, [d]), i(h), h;
  }
  function c(d) {
    var p = d.getSnapshot;
    d = d.value;
    try {
      var h = p();
      return !n(d, h);
    } catch {
      return !0;
    }
  }
  function l(d, p) {
    return p();
  }
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : a;
  return Rt.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : u, Rt;
}
var Pt = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var me;
function po() {
  return me || (me = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = L, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function n(b) {
      {
        for (var v = arguments.length, E = new Array(v > 1 ? v - 1 : 0), M = 1; M < v; M++)
          E[M - 1] = arguments[M];
        r("error", b, E);
      }
    }
    function r(b, v, E) {
      {
        var M = t.ReactDebugCurrentFrame, C = M.getStackAddendum();
        C !== "" && (v += "%s", E = E.concat([C]));
        var A = E.map(function(w) {
          return String(w);
        });
        A.unshift("Warning: " + v), Function.prototype.apply.call(console[b], console, A);
      }
    }
    function s(b, v) {
      return b === v && (b !== 0 || 1 / b === 1 / v) || b !== b && v !== v;
    }
    var o = typeof Object.is == "function" ? Object.is : s, i = e.useState, a = e.useEffect, c = e.useLayoutEffect, l = e.useDebugValue, u = !1, d = !1;
    function p(b, v, E) {
      u || e.startTransition !== void 0 && (u = !0, n("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var M = v();
      if (!d) {
        var C = v();
        o(M, C) || (n("The result of getSnapshot should be cached to avoid an infinite loop"), d = !0);
      }
      var A = i({
        inst: {
          value: M,
          getSnapshot: v
        }
      }), w = A[0].inst, O = A[1];
      return c(function() {
        w.value = M, w.getSnapshot = v, h(w) && O({
          inst: w
        });
      }, [b, M, v]), a(function() {
        h(w) && O({
          inst: w
        });
        var B = function() {
          h(w) && O({
            inst: w
          });
        };
        return b(B);
      }, [b]), l(M), M;
    }
    function h(b) {
      var v = b.getSnapshot, E = b.value;
      try {
        var M = v();
        return !o(E, M);
      } catch {
        return !0;
      }
    }
    function f(b, v, E) {
      return v();
    }
    var m = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", g = !m, y = g ? f : p, k = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y;
    Pt.useSyncExternalStore = k, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Pt;
}
process.env.NODE_ENV === "production" ? jt.exports = uo() : jt.exports = po();
var Tt = jt.exports;
const ho = (...e) => (t) => {
  e.forEach((n) => {
    typeof n == "function" ? n(t) : n && (n.current = t);
  });
}, fo = ({ contentComponent: e }) => {
  const t = Tt.useSyncExternalStore(e.subscribe, e.getSnapshot, e.getServerSnapshot);
  return L.createElement(L.Fragment, null, Object.values(t));
};
function mo() {
  const e = /* @__PURE__ */ new Set();
  let t = {};
  return {
    /**
     * Subscribe to the editor instance's changes.
     */
    subscribe(n) {
      return e.add(n), () => {
        e.delete(n);
      };
    },
    getSnapshot() {
      return t;
    },
    getServerSnapshot() {
      return t;
    },
    /**
     * Adds a new NodeView Renderer to the editor.
     */
    setRenderer(n, r) {
      t = {
        ...t,
        [n]: ar.createPortal(r.reactElement, r.element, n)
      }, e.forEach((s) => s());
    },
    /**
     * Removes a NodeView Renderer from the editor.
     */
    removeRenderer(n) {
      const r = { ...t };
      delete r[n], t = r, e.forEach((s) => s());
    }
  };
}
class go extends L.Component {
  constructor(t) {
    var n;
    super(t), this.editorContentRef = L.createRef(), this.initialized = !1, this.state = {
      hasContentComponentInitialized: !!(!((n = t.editor) === null || n === void 0) && n.contentComponent)
    };
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  init() {
    const t = this.props.editor;
    if (t && !t.isDestroyed && t.options.element) {
      if (t.contentComponent)
        return;
      const n = this.editorContentRef.current;
      n.append(...t.options.element.childNodes), t.setOptions({
        element: n
      }), t.contentComponent = mo(), this.state.hasContentComponentInitialized || (this.unsubscribeToContentComponent = t.contentComponent.subscribe(() => {
        this.setState((r) => r.hasContentComponentInitialized ? r : {
          hasContentComponentInitialized: !0
        }), this.unsubscribeToContentComponent && this.unsubscribeToContentComponent();
      })), t.createNodeViews(), this.initialized = !0;
    }
  }
  componentWillUnmount() {
    const t = this.props.editor;
    if (!t || (this.initialized = !1, t.isDestroyed || t.view.setProps({
      nodeViews: {}
    }), this.unsubscribeToContentComponent && this.unsubscribeToContentComponent(), t.contentComponent = null, !t.options.element.firstChild))
      return;
    const n = document.createElement("div");
    n.append(...t.options.element.childNodes), t.setOptions({
      element: n
    });
  }
  render() {
    const { editor: t, innerRef: n, ...r } = this.props;
    return L.createElement(
      L.Fragment,
      null,
      L.createElement("div", { ref: ho(n, this.editorContentRef), ...r }),
      (t == null ? void 0 : t.contentComponent) && L.createElement(fo, { contentComponent: t.contentComponent })
    );
  }
}
const yo = or((e, t) => {
  const n = L.useMemo(() => Math.floor(Math.random() * 4294967295).toString(), [e.editor]);
  return L.createElement(go, {
    key: n,
    innerRef: t,
    ...e
  });
}), Si = L.memo(yo);
var vo = function e(t, n) {
  if (t === n) return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor) return !1;
    var r, s, o;
    if (Array.isArray(t)) {
      if (r = t.length, r != n.length) return !1;
      for (s = r; s-- !== 0; )
        if (!e(t[s], n[s])) return !1;
      return !0;
    }
    if (t instanceof Map && n instanceof Map) {
      if (t.size !== n.size) return !1;
      for (s of t.entries())
        if (!n.has(s[0])) return !1;
      for (s of t.entries())
        if (!e(s[1], n.get(s[0]))) return !1;
      return !0;
    }
    if (t instanceof Set && n instanceof Set) {
      if (t.size !== n.size) return !1;
      for (s of t.entries())
        if (!n.has(s[0])) return !1;
      return !0;
    }
    if (ArrayBuffer.isView(t) && ArrayBuffer.isView(n)) {
      if (r = t.length, r != n.length) return !1;
      for (s = r; s-- !== 0; )
        if (t[s] !== n[s]) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
    if (o = Object.keys(t), r = o.length, r !== Object.keys(n).length) return !1;
    for (s = r; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, o[s])) return !1;
    for (s = r; s-- !== 0; ) {
      var i = o[s];
      if (!(i === "_owner" && t.$$typeof) && !e(t[i], n[i]))
        return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
}, bo = /* @__PURE__ */ co(vo), Ft = { exports: {} }, Ht = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ge;
function Mo() {
  if (ge) return Ht;
  ge = 1;
  var e = L, t = Tt;
  function n(l, u) {
    return l === u && (l !== 0 || 1 / l === 1 / u) || l !== l && u !== u;
  }
  var r = typeof Object.is == "function" ? Object.is : n, s = t.useSyncExternalStore, o = e.useRef, i = e.useEffect, a = e.useMemo, c = e.useDebugValue;
  return Ht.useSyncExternalStoreWithSelector = function(l, u, d, p, h) {
    var f = o(null);
    if (f.current === null) {
      var m = { hasValue: !1, value: null };
      f.current = m;
    } else m = f.current;
    f = a(function() {
      function y(M) {
        if (!k) {
          if (k = !0, b = M, M = p(M), h !== void 0 && m.hasValue) {
            var C = m.value;
            if (h(C, M)) return v = C;
          }
          return v = M;
        }
        if (C = v, r(b, M)) return C;
        var A = p(M);
        return h !== void 0 && h(C, A) ? C : (b = M, v = A);
      }
      var k = !1, b, v, E = d === void 0 ? null : d;
      return [function() {
        return y(u());
      }, E === null ? void 0 : function() {
        return y(E());
      }];
    }, [u, d, p, h]);
    var g = s(l, f[0], f[1]);
    return i(function() {
      m.hasValue = !0, m.value = g;
    }, [g]), c(g), g;
  }, Ht;
}
var _t = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ye;
function So() {
  return ye || (ye = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = L, t = Tt;
    function n(u, d) {
      return u === d && (u !== 0 || 1 / u === 1 / d) || u !== u && d !== d;
    }
    var r = typeof Object.is == "function" ? Object.is : n, s = t.useSyncExternalStore, o = e.useRef, i = e.useEffect, a = e.useMemo, c = e.useDebugValue;
    function l(u, d, p, h, f) {
      var m = o(null), g;
      m.current === null ? (g = {
        hasValue: !1,
        value: null
      }, m.current = g) : g = m.current;
      var y = a(function() {
        var E = !1, M, C, A = function(F) {
          if (!E) {
            E = !0, M = F;
            var X = h(F);
            if (f !== void 0 && g.hasValue) {
              var q = g.value;
              if (f(q, X))
                return C = q, q;
            }
            return C = X, X;
          }
          var U = M, z = C;
          if (r(U, F))
            return z;
          var G = h(F);
          return f !== void 0 && f(z, G) ? z : (M = F, C = G, G);
        }, w = p === void 0 ? null : p, O = function() {
          return A(d());
        }, B = w === null ? void 0 : function() {
          return A(w());
        };
        return [O, B];
      }, [d, p, h, f]), k = y[0], b = y[1], v = s(u, k, b);
      return i(function() {
        g.hasValue = !0, g.value = v;
      }, [v]), c(v), v;
    }
    _t.useSyncExternalStoreWithSelector = l, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), _t;
}
process.env.NODE_ENV === "production" ? Ft.exports = Mo() : Ft.exports = So();
var ko = Ft.exports;
class wo {
  constructor(t) {
    this.transactionNumber = 0, this.lastTransactionNumber = 0, this.subscribers = /* @__PURE__ */ new Set(), this.editor = t, this.lastSnapshot = { editor: t, transactionNumber: 0 }, this.getSnapshot = this.getSnapshot.bind(this), this.getServerSnapshot = this.getServerSnapshot.bind(this), this.watch = this.watch.bind(this), this.subscribe = this.subscribe.bind(this);
  }
  /**
   * Get the current editor instance.
   */
  getSnapshot() {
    return this.transactionNumber === this.lastTransactionNumber ? this.lastSnapshot : (this.lastTransactionNumber = this.transactionNumber, this.lastSnapshot = { editor: this.editor, transactionNumber: this.transactionNumber }, this.lastSnapshot);
  }
  /**
   * Always disable the editor on the server-side.
   */
  getServerSnapshot() {
    return { editor: null, transactionNumber: 0 };
  }
  /**
   * Subscribe to the editor instance's changes.
   */
  subscribe(t) {
    return this.subscribers.add(t), () => {
      this.subscribers.delete(t);
    };
  }
  /**
   * Watch the editor instance for changes.
   */
  watch(t) {
    if (this.editor = t, this.editor) {
      const n = () => {
        this.transactionNumber += 1, this.subscribers.forEach((s) => s());
      }, r = this.editor;
      return r.on("transaction", n), () => {
        r.off("transaction", n);
      };
    }
  }
}
function Eo(e) {
  var t;
  const [n] = Kt(() => new wo(e.editor)), r = ko.useSyncExternalStoreWithSelector(n.subscribe, n.getSnapshot, n.getServerSnapshot, e.selector, (t = e.equalityFn) !== null && t !== void 0 ? t : bo);
  return qt(() => n.watch(e.editor), [e.editor, n]), Ie(r), r;
}
const ve = process.env.NODE_ENV !== "production", zt = typeof window > "u", To = zt || !!(typeof window < "u" && window.next);
class Co {
  constructor(t) {
    this.editor = null, this.subscriptions = /* @__PURE__ */ new Set(), this.isComponentMounted = !1, this.previousDeps = null, this.instanceId = "", this.options = t, this.subscriptions = /* @__PURE__ */ new Set(), this.setEditor(this.getInitialEditor()), this.scheduleDestroy(), this.getEditor = this.getEditor.bind(this), this.getServerSnapshot = this.getServerSnapshot.bind(this), this.subscribe = this.subscribe.bind(this), this.refreshEditorInstance = this.refreshEditorInstance.bind(this), this.scheduleDestroy = this.scheduleDestroy.bind(this), this.onRender = this.onRender.bind(this), this.createEditor = this.createEditor.bind(this);
  }
  setEditor(t) {
    this.editor = t, this.instanceId = Math.random().toString(36).slice(2, 9), this.subscriptions.forEach((n) => n());
  }
  getInitialEditor() {
    if (this.options.current.immediatelyRender === void 0)
      return zt || To ? (ve && console.warn("Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches."), null) : this.createEditor();
    if (this.options.current.immediatelyRender && zt && ve)
      throw new Error("Tiptap Error: SSR has been detected, and `immediatelyRender` has been set to `true` this is an unsupported configuration that may result in errors, explicitly set `immediatelyRender` to `false` to avoid hydration mismatches.");
    return this.options.current.immediatelyRender ? this.createEditor() : null;
  }
  /**
   * Create a new editor instance. And attach event listeners.
   */
  createEditor() {
    const t = {
      ...this.options.current,
      // Always call the most recent version of the callback function by default
      onBeforeCreate: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onBeforeCreate) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onBlur: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onBlur) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onCreate: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onCreate) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onDestroy: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onDestroy) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onFocus: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onFocus) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onSelectionUpdate: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onSelectionUpdate) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onTransaction: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onTransaction) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onUpdate: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onUpdate) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onContentError: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onContentError) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onDrop: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onDrop) === null || o === void 0 ? void 0 : o.call(s, ...r);
      },
      onPaste: (...r) => {
        var s, o;
        return (o = (s = this.options.current).onPaste) === null || o === void 0 ? void 0 : o.call(s, ...r);
      }
    };
    return new to(t);
  }
  /**
   * Get the current editor instance.
   */
  getEditor() {
    return this.editor;
  }
  /**
   * Always disable the editor on the server-side.
   */
  getServerSnapshot() {
    return null;
  }
  /**
   * Subscribe to the editor instance's changes.
   */
  subscribe(t) {
    return this.subscriptions.add(t), () => {
      this.subscriptions.delete(t);
    };
  }
  /**
   * On each render, we will create, update, or destroy the editor instance.
   * @param deps The dependencies to watch for changes
   * @returns A cleanup function
   */
  onRender(t) {
    return () => (this.isComponentMounted = !0, clearTimeout(this.scheduledDestructionTimeout), this.editor && !this.editor.isDestroyed && t.length === 0 ? this.editor.setOptions({
      ...this.options.current,
      editable: this.editor.isEditable
    }) : this.refreshEditorInstance(t), () => {
      this.isComponentMounted = !1, this.scheduleDestroy();
    });
  }
  /**
   * Recreate the editor instance if the dependencies have changed.
   */
  refreshEditorInstance(t) {
    if (this.editor && !this.editor.isDestroyed) {
      if (this.previousDeps === null) {
        this.previousDeps = t;
        return;
      }
      if (this.previousDeps.length === t.length && this.previousDeps.every((r, s) => r === t[s]))
        return;
    }
    this.editor && !this.editor.isDestroyed && this.editor.destroy(), this.setEditor(this.createEditor()), this.previousDeps = t;
  }
  /**
   * Schedule the destruction of the editor instance.
   * This will only destroy the editor if it was not mounted on the next tick.
   * This is to avoid destroying the editor instance when it's actually still mounted.
   */
  scheduleDestroy() {
    const t = this.instanceId, n = this.editor;
    this.scheduledDestructionTimeout = setTimeout(() => {
      if (this.isComponentMounted && this.instanceId === t) {
        n && n.setOptions(this.options.current);
        return;
      }
      n && !n.isDestroyed && (n.destroy(), this.instanceId === t && this.setEditor(null));
    }, 1);
  }
}
function ki(e = {}, t = []) {
  const n = ir(e);
  n.current = e;
  const [r] = Kt(() => new Co(n)), s = Tt.useSyncExternalStore(r.subscribe, r.getEditor, r.getServerSnapshot);
  return Ie(s), qt(r.onRender(t)), Eo({
    editor: s,
    selector: ({ transactionNumber: o }) => e.shouldRerenderOnTransaction === !1 ? null : e.immediatelyRender && o === 0 ? 0 : o + 1
  }), s;
}
const Xe = $e({
  editor: null
});
Xe.Consumer;
const xo = () => De(Xe), wi = (e) => {
  const [t, n] = Kt(null), { editor: r } = xo();
  return qt(() => {
    var s;
    if (!t || !((s = e.editor) === null || s === void 0) && s.isDestroyed || r != null && r.isDestroyed)
      return;
    const { pluginKey: o = "bubbleMenu", editor: i, tippyOptions: a = {}, updateDelay: c, shouldShow: l = null } = e, u = i || r;
    if (!u) {
      console.warn("BubbleMenu component is not rendered inside of an editor component or does not have editor prop.");
      return;
    }
    const d = Ye({
      updateDelay: c,
      editor: u,
      element: t,
      pluginKey: o,
      shouldShow: l,
      tippyOptions: a
    });
    return u.registerPlugin(d), () => {
      u.unregisterPlugin(o);
    };
  }, [e.editor, r, t]), L.createElement("div", { ref: n, className: e.className, style: { visibility: "hidden" } }, e.children);
}, Qe = $e({
  onDragStart: void 0
}), Ze = () => De(Qe), Ei = (e) => {
  const t = e.as || "div", { nodeViewContentRef: n } = Ze();
  return (
    // @ts-ignore
    L.createElement(t, { ...e, ref: n, "data-node-view-content": "", style: {
      whiteSpace: "pre-wrap",
      ...e.style
    } })
  );
}, Ti = L.forwardRef((e, t) => {
  const { onDragStart: n } = Ze(), r = e.as || "div";
  return (
    // @ts-ignore
    L.createElement(r, { ...e, ref: t, "data-node-view-wrapper": "", onDragStart: n, style: {
      whiteSpace: "normal",
      ...e.style
    } })
  );
});
function Ao(e) {
  return !!(typeof e == "function" && e.prototype && e.prototype.isReactComponent);
}
function Oo(e) {
  var t;
  return typeof e == "object" && ((t = e.$$typeof) === null || t === void 0 ? void 0 : t.toString()) === "Symbol(react.forward_ref)";
}
class Lo {
  /**
   * Immediately creates element and renders the provided React component.
   */
  constructor(t, { editor: n, props: r = {}, as: s = "div", className: o = "" }) {
    this.ref = null, this.id = Math.floor(Math.random() * 4294967295).toString(), this.component = t, this.editor = n, this.props = r, this.element = document.createElement(s), this.element.classList.add("react-renderer"), o && this.element.classList.add(...o.split(" ")), this.editor.isInitialized ? lr(() => {
      this.render();
    }) : this.render();
  }
  /**
   * Render the React component.
   */
  render() {
    var t;
    const n = this.component, r = this.props, s = this.editor;
    (Ao(n) || Oo(n)) && (r.ref = (o) => {
      this.ref = o;
    }), this.reactElement = L.createElement(n, r), (t = s == null ? void 0 : s.contentComponent) === null || t === void 0 || t.setRenderer(this.id, this);
  }
  /**
   * Re-renders the React component with new props.
   */
  updateProps(t = {}) {
    this.props = {
      ...this.props,
      ...t
    }, this.render();
  }
  /**
   * Destroy the React component.
   */
  destroy() {
    var t;
    const n = this.editor;
    (t = n == null ? void 0 : n.contentComponent) === null || t === void 0 || t.removeRenderer(this.id);
  }
  /**
   * Update the attributes of the element that holds the React component.
   */
  updateAttributes(t) {
    Object.keys(t).forEach((n) => {
      this.element.setAttribute(n, t[n]);
    });
  }
}
class Ro extends no {
  /**
   * Setup the React component.
   * Called on initialization.
   */
  mount() {
    const t = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
      view: this.view,
      selected: !1,
      extension: this.extension,
      HTMLAttributes: this.HTMLAttributes,
      getPos: () => this.getPos(),
      updateAttributes: (l = {}) => this.updateAttributes(l),
      deleteNode: () => this.deleteNode()
    };
    if (!this.component.displayName) {
      const l = (u) => u.charAt(0).toUpperCase() + u.substring(1);
      this.component.displayName = l(this.extension.name);
    }
    const s = { onDragStart: this.onDragStart.bind(this), nodeViewContentRef: (l) => {
      l && this.contentDOMElement && l.firstChild !== this.contentDOMElement && l.appendChild(this.contentDOMElement);
    } }, o = this.component, i = L.memo((l) => L.createElement(Qe.Provider, { value: s }, L.createElement(o, l)));
    i.displayName = "ReactNodeView", this.node.isLeaf ? this.contentDOMElement = null : this.options.contentDOMElementTag ? this.contentDOMElement = document.createElement(this.options.contentDOMElementTag) : this.contentDOMElement = document.createElement(this.node.isInline ? "span" : "div"), this.contentDOMElement && (this.contentDOMElement.dataset.nodeViewContentReact = "", this.contentDOMElement.style.whiteSpace = "inherit");
    let a = this.node.isInline ? "span" : "div";
    this.options.as && (a = this.options.as);
    const { className: c = "" } = this.options;
    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this), this.editor.on("selectionUpdate", this.handleSelectionUpdate), this.renderer = new Lo(i, {
      editor: this.editor,
      props: t,
      as: a,
      className: `node-${this.node.type.name} ${c}`.trim()
    }), this.updateElementAttributes();
  }
  /**
   * Return the DOM element.
   * This is the element that will be used to display the node view.
   */
  get dom() {
    var t;
    if (this.renderer.element.firstElementChild && !(!((t = this.renderer.element.firstElementChild) === null || t === void 0) && t.hasAttribute("data-node-view-wrapper")))
      throw Error("Please use the NodeViewWrapper component for your node view.");
    return this.renderer.element;
  }
  /**
   * Return the content DOM element.
   * This is the element that will be used to display the rich-text content of the node.
   */
  get contentDOM() {
    return this.node.isLeaf ? null : this.contentDOMElement;
  }
  /**
   * On editor selection update, check if the node is selected.
   * If it is, call `selectNode`, otherwise call `deselectNode`.
   */
  handleSelectionUpdate() {
    const { from: t, to: n } = this.editor.state.selection, r = this.getPos();
    if (typeof r == "number")
      if (t <= r && n >= r + this.node.nodeSize) {
        if (this.renderer.props.selected)
          return;
        this.selectNode();
      } else {
        if (!this.renderer.props.selected)
          return;
        this.deselectNode();
      }
  }
  /**
   * On update, update the React component.
   * To prevent unnecessary updates, the `update` option can be used.
   */
  update(t, n, r) {
    const s = (o) => {
      this.renderer.updateProps(o), typeof this.options.attrs == "function" && this.updateElementAttributes();
    };
    if (t.type !== this.node.type)
      return !1;
    if (typeof this.options.update == "function") {
      const o = this.node, i = this.decorations, a = this.innerDecorations;
      return this.node = t, this.decorations = n, this.innerDecorations = r, this.options.update({
        oldNode: o,
        oldDecorations: i,
        newNode: t,
        newDecorations: n,
        oldInnerDecorations: a,
        innerDecorations: r,
        updateProps: () => s({ node: t, decorations: n, innerDecorations: r })
      });
    }
    return t === this.node && this.decorations === n && this.innerDecorations === r || (this.node = t, this.decorations = n, this.innerDecorations = r, s({ node: t, decorations: n, innerDecorations: r })), !0;
  }
  /**
   * Select the node.
   * Add the `selected` prop and the `ProseMirror-selectednode` class.
   */
  selectNode() {
    this.renderer.updateProps({
      selected: !0
    }), this.renderer.element.classList.add("ProseMirror-selectednode");
  }
  /**
   * Deselect the node.
   * Remove the `selected` prop and the `ProseMirror-selectednode` class.
   */
  deselectNode() {
    this.renderer.updateProps({
      selected: !1
    }), this.renderer.element.classList.remove("ProseMirror-selectednode");
  }
  /**
   * Destroy the React component instance.
   */
  destroy() {
    this.renderer.destroy(), this.editor.off("selectionUpdate", this.handleSelectionUpdate), this.contentDOMElement = null;
  }
  /**
   * Update the attributes of the top-level element that holds the React component.
   * Applying the attributes defined in the `attrs` option.
   */
  updateElementAttributes() {
    if (this.options.attrs) {
      let t = {};
      if (typeof this.options.attrs == "function") {
        const n = this.editor.extensionManager.attributes, r = ft(this.node, n);
        t = this.options.attrs({ node: this.node, HTMLAttributes: r });
      } else
        t = this.options.attrs;
      this.renderer.updateAttributes(t);
    }
  }
}
function Ci(e, t) {
  return (n) => n.editor.contentComponent ? new Ro(e, n, t) : {};
}
function Zt(e, t, n) {
  const r = [], s = e.node(0);
  n = typeof n == "number" && n >= 0 ? n : e.sameParent(t) ? Math.max(0, e.sharedDepth(t.pos) - 1) : e.sharedDepth(t.pos);
  const o = new Bn(e, t, n), i = o.depth === 0 ? 0 : s.resolve(o.start).posAtIndex(0);
  return o.parent.forEach((a, c) => {
    const l = i + c, u = l + a.nodeSize;
    if (l < o.start || l >= o.end)
      return;
    const d = new In(s.resolve(l), s.resolve(u));
    r.push(d);
  }), r;
}
class te {
  constructor(t, n) {
    st(this, "anchor");
    st(this, "head");
    this.anchor = t, this.head = n;
  }
  map(t) {
    return new te(t.map(this.anchor), t.map(this.head));
  }
  resolve(t) {
    const n = t.resolve(this.anchor), r = t.resolve(this.head);
    return new N(n, r);
  }
}
class N extends W {
  constructor(n, r, s, o = 1) {
    const { doc: i } = n, a = n === r, c = n.pos === i.content.size && r.pos === i.content.size, l = a && !c ? i.resolve(r.pos + (o > 0 ? 1 : -1)) : r, u = a && c ? i.resolve(n.pos - (o > 0 ? 1 : -1)) : n, d = Zt(u.min(l), u.max(l), s);
    super(l.pos >= n.pos ? d[0].$from : d[d.length - 1].$to, l.pos >= n.pos ? d[d.length - 1].$to : d[0].$from, d);
    st(this, "depth");
    this.depth = s;
  }
  get $to() {
    return this.ranges[this.ranges.length - 1].$to;
  }
  eq(n) {
    return n instanceof N && n.$from.pos === this.$from.pos && n.$to.pos === this.$to.pos;
  }
  map(n, r) {
    const s = n.resolve(r.map(this.anchor)), o = n.resolve(r.map(this.head));
    return new N(s, o);
  }
  toJSON() {
    return { type: "nodeRange", anchor: this.anchor, head: this.head };
  }
  get isForwards() {
    return this.head >= this.anchor;
  }
  get isBackwards() {
    return !this.isForwards;
  }
  extendBackwards() {
    const { doc: n } = this.$from;
    if (this.isForwards && this.ranges.length > 1) {
      const o = this.ranges.slice(0, -1), i = o[0].$from, a = o[o.length - 1].$to;
      return new N(i, a, this.depth);
    }
    const r = this.ranges[0], s = n.resolve(Math.max(0, r.$from.pos - 1));
    return new N(this.$anchor, s, this.depth);
  }
  extendForwards() {
    const { doc: n } = this.$from;
    if (this.isBackwards && this.ranges.length > 1) {
      const o = this.ranges.slice(1), i = o[0].$from, a = o[o.length - 1].$to;
      return new N(a, i, this.depth);
    }
    const r = this.ranges[this.ranges.length - 1], s = n.resolve(Math.min(n.content.size, r.$to.pos + 1));
    return new N(this.$anchor, s, this.depth);
  }
  static fromJSON(n, r) {
    return new N(n.resolve(r.anchor), n.resolve(r.head));
  }
  static create(n, r, s, o, i = 1) {
    return new this(n.resolve(r), n.resolve(s), o, i);
  }
  getBookmark() {
    return new te(this.anchor, this.head);
  }
}
function Po(e) {
  const t = e.cloneNode(!0), n = [e, ...Array.from(e.getElementsByTagName("*"))], r = [t, ...Array.from(t.getElementsByTagName("*"))];
  return n.forEach((s, o) => {
    r[o].style.cssText = function(i) {
      let a = "";
      const c = getComputedStyle(i);
      for (let l = 0; l < c.length; l += 1)
        a += `${c[l]}:${c.getPropertyValue(c[l])};`;
      return a;
    }(s);
  }), t;
}
function lt(e, t) {
  return window.getComputedStyle(e)[t];
}
function Ho(e = 0, t = 0, n = 0) {
  return Math.min(Math.max(e, t), n);
}
function be(e) {
  e.parentNode !== null && e.parentNode !== void 0 && e.parentNode.removeChild(e);
}
const tn = (e) => {
  const { x: t, y: n, direction: r, editor: s } = e;
  let o = null, i = null, a = null, c = t;
  for (; i === null && c < window.innerWidth && c > 0; ) {
    const l = document.elementsFromPoint(c, n), u = l.findIndex((p) => p.classList.contains("ProseMirror")), d = l.slice(0, u);
    if (d.length > 0) {
      const p = d[0];
      if (o = p, a = s.view.posAtDOM(p, 0), a >= 0) {
        i = s.state.doc.nodeAt(Math.max(a - 1, 0)), (i === null || i.isText) && (i = s.state.doc.nodeAt(Math.max(a - 1, 0))), i || (i = s.state.doc.nodeAt(Math.max(a, 0)));
        break;
      }
    }
    r === "left" ? c -= 1 : c += 1;
  }
  return { resultElement: o, resultNode: i, pos: a !== null ? a : null };
};
function _o(e, t) {
  const { doc: n } = t.view.state, r = tn({ editor: t, x: e.clientX, y: e.clientY, direction: "right" });
  if (!r.resultNode || r.pos === null)
    return [];
  const s = e.clientX, o = function(u, d, p) {
    const h = parseInt(lt(u.dom, "paddingLeft"), 10), f = parseInt(lt(u.dom, "paddingRight"), 10), m = parseInt(lt(u.dom, "borderLeftWidth"), 10), g = parseInt(lt(u.dom, "borderLeftWidth"), 10), y = u.dom.getBoundingClientRect();
    return { left: Ho(d, y.left + h + m, y.right - f - g), top: p };
  }(t.view, s, e.clientY), i = t.view.posAtCoords(o);
  if (!i)
    return [];
  const { pos: a } = i;
  if (!n.resolve(a).parent)
    return [];
  const c = n.resolve(r.pos), l = n.resolve(r.pos + 1);
  return Zt(c, l, 0);
}
const Me = (e, t) => {
  const n = e.resolve(t), { depth: r } = n;
  return r === 0 ? t : n.pos - n.parentOffset - 1;
}, Se = (e, t) => {
  const n = e.nodeAt(t), r = e.resolve(t);
  let { depth: s } = r, o = n;
  for (; s > 0; ) {
    const i = r.node(s);
    s -= 1, s === 0 && (o = i);
  }
  return o;
}, $t = (e, t) => {
  const n = Dn.getState(e);
  return n ? Nn(t, n.type, n.binding.mapping) : null;
}, ke = (e, t) => {
  let n = t;
  for (; n && n.parentNode && n.parentNode !== e.dom; )
    n = n.parentNode;
  return n;
}, $o = new _("dragHandle"), xi = ({ pluginKey: e = $o, element: t, editor: n, tippyOptions: r, onNodeChange: s }) => {
  const o = document.createElement("div");
  let i = null, a = !1, c = null, l = -1;
  return t.addEventListener("dragstart", (u) => {
    const { view: d } = n;
    if (!u.dataTransfer)
      return;
    const { empty: p, $from: h, $to: f } = d.state.selection, m = _o(u, n), g = Zt(h, f, 0), y = g.some((w) => m.find((O) => O.$from === w.$from && O.$to === w.$to)), k = p || !y ? m : g;
    if (!k.length)
      return;
    const { tr: b } = d.state, v = document.createElement("div"), E = k[0].$from.pos, M = k[k.length - 1].$to.pos, C = N.create(d.state.doc, E, M), A = C.content();
    k.forEach((w) => {
      const O = Po(d.nodeDOM(w.$from.pos));
      v.append(O);
    }), v.style.position = "absolute", v.style.top = "-10000px", document.body.append(v), u.dataTransfer.clearData(), u.dataTransfer.setDragImage(v, 0, 0), d.dragging = { slice: A, move: !0 }, b.setSelection(C), d.dispatch(b), document.addEventListener("drop", () => be(v), { once: !0 }), setTimeout(() => {
      t && (t.style.pointerEvents = "none");
    }, 0);
  }), t.addEventListener("dragend", () => {
    t && (t.style.pointerEvents = "auto");
  }), new H({
    key: typeof e == "string" ? new _(e) : e,
    state: {
      init: () => ({ locked: !1 }),
      apply(u, d, p, h) {
        const f = u.getMeta("lockDragHandle"), m = u.getMeta("hideDragHandle");
        if (f !== void 0 && (a = f), m && i)
          return i.hide(), a = !1, c = null, l = -1, s == null || s({ editor: n, node: null, pos: -1 }), d;
        if (u.docChanged && l !== -1 && t && i) {
          const g = u.mapping.map(l);
          g !== l && (l = g, $t(h, l));
        }
        return d;
      }
    },
    view: (u) => {
      var d;
      return t.draggable = !0, t.style.pointerEvents = "auto", (d = n.view.dom.parentElement) === null || d === void 0 || d.appendChild(o), o.appendChild(t), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.top = "0", o.style.left = "0", i = Le(u.dom, {
        getReferenceClientRect: null,
        interactive: !0,
        trigger: "manual",
        placement: "left-start",
        hideOnClick: !1,
        duration: 100,
        zIndex: 10,
        popperOptions: {
          modifiers: [
            { name: "flip", enabled: !1 },
            { name: "preventOverflow", options: { rootBoundary: "document", mainAxis: !1 } }
          ]
        },
        ...r,
        appendTo: o,
        content: t
      }), {
        update(p, h) {
          if (!t || !i || (t.draggable = !a, u.state.doc.eq(h.doc) || l === -1))
            return;
          let f = u.nodeDOM(l);
          if (f = ke(u, f), f === u.dom || (f == null ? void 0 : f.nodeType) !== 1)
            return;
          const m = u.posAtDOM(f, 0), g = Se(n.state.doc, m);
          if (g !== c) {
            const y = Me(n.state.doc, m);
            c = g, l = y, $t(u.state, l), s == null || s({ editor: n, node: c, pos: l }), i.setProps({ getReferenceClientRect: () => f.getBoundingClientRect() }), i.show();
          }
        },
        destroy() {
          i == null || i.destroy(), t && be(o);
        }
      };
    },
    props: {
      handleDOMEvents: {
        mouseleave: (u, d) => (a || d.target && !o.contains(d.relatedTarget) && (i == null || i.hide(), c = null, l = -1, s == null || s({ editor: n, node: null, pos: -1 })), !1),
        mousemove(u, d) {
          if (!t || !i || a)
            return !1;
          const p = tn({ x: d.clientX, y: d.clientY, direction: "right", editor: n });
          if (!p.resultElement)
            return !1;
          let h = p.resultElement;
          if (h = ke(u, h), h === u.dom || (h == null ? void 0 : h.nodeType) !== 1)
            return !1;
          const f = u.posAtDOM(h, 0), m = Se(n.state.doc, f);
          if (m !== c) {
            const g = Me(n.state.doc, f);
            c = m, l = g, $t(u.state, l), s == null || s({ editor: n, node: c, pos: l }), i.setProps({ getReferenceClientRect: () => h.getBoundingClientRect() }), i.show();
          }
          return !1;
        }
      }
    }
  });
}, Io = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, Do = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, No = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, Bo = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, Ai = D.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (e) => e.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (e) => e.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["em", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: e }) => e.setMark(this.name),
      toggleItalic: () => ({ commands: e }) => e.toggleMark(this.name),
      unsetItalic: () => ({ commands: e }) => e.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      Y({
        find: Io,
        type: this.type
      }),
      Y({
        find: No,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      V({
        find: Do,
        type: this.type
      }),
      V({
        find: Bo,
        type: this.type
      })
    ];
  }
}), Oi = D.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (e) => e.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["u", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: e }) => e.setMark(this.name),
      toggleUnderline: () => ({ commands: e }) => e.toggleMark(this.name),
      unsetUnderline: () => ({ commands: e }) => e.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
}), jo = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, Fo = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, Li = D.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (e) => e.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["s", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: e }) => e.setMark(this.name),
      toggleStrike: () => ({ commands: e }) => e.toggleMark(this.name),
      unsetStrike: () => ({ commands: e }) => e.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      Y({
        find: jo,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      V({
        find: Fo,
        type: this.type
      })
    ];
  }
}), zo = /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))$/, Wo = /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))/g, Ri = D.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["code", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands: e }) => e.setMark(this.name),
      toggleCode: () => ({ commands: e }) => e.toggleMark(this.name),
      unsetCode: () => ({ commands: e }) => e.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      Y({
        find: zo,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      V({
        find: Wo,
        type: this.type
      })
    ];
  }
}), Vo = /^```([a-z]+)?[\s\n]$/, Ko = /^~~~([a-z]+)?[\s\n]$/, Pi = R.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      defaultLanguage: null,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: (e) => {
          var t;
          const { languageClassPrefix: n } = this.options, o = [...((t = e.firstElementChild) === null || t === void 0 ? void 0 : t.classList) || []].filter((i) => i.startsWith(n)).map((i) => i.replace(n, ""))[0];
          return o || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    return [
      "pre",
      x(this.options.HTMLAttributes, t),
      [
        "code",
        {
          class: e.attrs.language ? this.options.languageClassPrefix + e.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (e) => ({ commands: t }) => t.setNode(this.name, e),
      toggleCodeBlock: (e) => ({ commands: t }) => t.toggleNode(this.name, "paragraph", e)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: e, $anchor: t } = this.editor.state.selection, n = t.pos === 1;
        return !e || t.parent.type.name !== this.name ? !1 : n || !t.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // exit node on triple enter
      Enter: ({ editor: e }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: t } = e, { selection: n } = t, { $from: r, empty: s } = n;
        if (!s || r.parent.type !== this.type)
          return !1;
        const o = r.parentOffset === r.parent.nodeSize - 2, i = r.parent.textContent.endsWith(`

`);
        return !o || !i ? !1 : e.chain().command(({ tr: a }) => (a.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: e }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: t } = e, { selection: n, doc: r } = t, { $from: s, empty: o } = n;
        if (!o || s.parent.type !== this.type || !(s.parentOffset === s.parent.nodeSize - 2))
          return !1;
        const a = s.after();
        return a === void 0 ? !1 : r.nodeAt(a) ? e.commands.command(({ tr: l }) => (l.setSelection(W.near(r.resolve(a))), !0)) : e.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      Bt({
        find: Vo,
        type: this.type,
        getAttributes: (e) => ({
          language: e[1]
        })
      }),
      Bt({
        find: Ko,
        type: this.type,
        getAttributes: (e) => ({
          language: e[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new H({
        key: new _("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (e, t) => {
            if (!t.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const n = t.clipboardData.getData("text/plain"), r = t.clipboardData.getData("vscode-editor-data"), s = r ? JSON.parse(r) : void 0, o = s == null ? void 0 : s.mode;
            if (!n || !o)
              return !1;
            const { tr: i, schema: a } = e.state, c = a.text(n.replace(/\r\n?/g, `
`));
            return i.replaceSelectionWith(this.type.create({ language: o }, c)), i.selection.$from.parent.type !== this.type && i.setSelection(I.near(i.doc.resolve(Math.max(0, i.selection.from - 2)))), i.setMeta("paste", !0), e.dispatch(i), !0;
          }
        }
      })
    ];
  }
}), Hi = D.create({
  name: "textStyle",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (e) => e.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["span", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: e, commands: t }) => {
        const n = Yt(e, this.type);
        return Object.entries(n).some(([, s]) => !!s) ? !0 : t.unsetMark(this.name);
      }
    };
  }
}), _i = P.create({
  name: "fontFamily",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: (e) => {
              var t;
              return (t = e.style.fontFamily) === null || t === void 0 ? void 0 : t.replace(/['"]+/g, "");
            },
            renderHTML: (e) => e.fontFamily ? {
              style: `font-family: ${e.fontFamily}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontFamily: (e) => ({ chain: t }) => t().setMark("textStyle", { fontFamily: e }).run(),
      unsetFontFamily: () => ({ chain: e }) => e().setMark("textStyle", { fontFamily: null }).removeEmptyTextStyle().run()
    };
  }
}), $i = R.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((e) => ({
      tag: `h${e}`,
      attrs: { level: e }
    }));
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    return [`h${this.options.levels.includes(e.attrs.level) ? e.attrs.level : this.options.levels[0]}`, x(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.setNode(this.name, e) : !1,
      toggleHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.toggleNode(this.name, "paragraph", e) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((e, t) => ({
      ...e,
      [`Mod-Alt-${t}`]: () => this.editor.commands.toggleHeading({ level: t })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((e) => Bt({
      find: new RegExp(`^(#{1,${e}})\\s$`),
      type: this.type,
      getAttributes: {
        level: e
      }
    }));
  }
}), Ii = P.create({
  name: "textAlign",
  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left"
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (e) => {
              const t = e.style.textAlign || this.options.defaultAlignment;
              return this.options.alignments.includes(t) ? t : this.options.defaultAlignment;
            },
            renderHTML: (e) => e.textAlign === this.options.defaultAlignment ? {} : { style: `text-align: ${e.textAlign}` }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlign: (e) => ({ commands: t }) => this.options.alignments.includes(e) ? this.options.types.map((n) => t.updateAttributes(n, { textAlign: e })).every((n) => n) : !1,
      unsetTextAlign: () => ({ commands: e }) => this.options.types.map((t) => e.resetAttributes(t, "textAlign")).every((t) => t)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
      "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
      "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
      "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify")
    };
  }
}), Di = P.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (e) => {
              var t;
              return (t = e.style.color) === null || t === void 0 ? void 0 : t.replace(/['"]+/g, "");
            },
            renderHTML: (e) => e.color ? {
              style: `color: ${e.color}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (e) => ({ chain: t }) => t().setMark("textStyle", { color: e }).run(),
      unsetColor: () => ({ chain: e }) => e().setMark("textStyle", { color: null }).removeEmptyTextStyle().run()
    };
  }
}), qo = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/, Uo = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g, Ni = D.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: !1,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return this.options.multicolor ? {
      color: {
        default: null,
        parseHTML: (e) => e.getAttribute("data-color") || e.style.backgroundColor,
        renderHTML: (e) => e.color ? {
          "data-color": e.color,
          style: `background-color: ${e.color}; color: inherit`
        } : {}
      }
    } : {};
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["mark", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHighlight: (e) => ({ commands: t }) => t.setMark(this.name, e),
      toggleHighlight: (e) => ({ commands: t }) => t.toggleMark(this.name, e),
      unsetHighlight: () => ({ commands: e }) => e.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      Y({
        find: qo,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      V({
        find: Uo,
        type: this.type
      })
    ];
  }
}), Go = "listItem", we = "textStyle", Ee = /^\s*([-+*])\s$/, Bi = R.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["ul", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Go, this.editor.getAttributes(we)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let e = et({
      find: Ee,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (e = et({
      find: Ee,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(we),
      editor: this.editor
    })), [
      e
    ];
  }
}), Jo = "listItem", Te = "textStyle", Ce = /^(\d+)\.\s$/, ji = R.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (e) => e.hasAttribute("start") ? parseInt(e.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: void 0,
        parseHTML: (e) => e.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    const { start: t, ...n } = e;
    return t === 1 ? ["ol", x(this.options.HTMLAttributes, n), 0] : ["ol", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Jo, this.editor.getAttributes(Te)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let e = et({
      find: Ce,
      type: this.type,
      getAttributes: (t) => ({ start: +t[1] }),
      joinPredicate: (t, n) => n.childCount + n.attrs.start === +t[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (e = et({
      find: Ce,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (t) => ({ start: +t[1], ...this.editor.getAttributes(Te) }),
      joinPredicate: (t, n) => n.childCount + n.attrs.start === +t[1],
      editor: this.editor
    })), [
      e
    ];
  }
}), Yo = /^\s*(\[([( |x])?\])\s$/, Fi = R.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: !1,
      HTMLAttributes: {},
      taskListTypeName: "taskList"
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: !0,
  addAttributes() {
    return {
      checked: {
        default: !1,
        keepOnSplit: !1,
        parseHTML: (e) => {
          const t = e.getAttribute("data-checked");
          return t === "" || t === "true";
        },
        renderHTML: (e) => ({
          "data-checked": e.checked
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    return [
      "li",
      x(this.options.HTMLAttributes, t, {
        "data-type": this.name
      }),
      [
        "label",
        [
          "input",
          {
            type: "checkbox",
            checked: e.attrs.checked ? "checked" : null
          }
        ],
        ["span"]
      ],
      ["div", 0]
    ];
  },
  addKeyboardShortcuts() {
    const e = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    return this.options.nested ? {
      ...e,
      Tab: () => this.editor.commands.sinkListItem(this.name)
    } : e;
  },
  addNodeView() {
    return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
      const s = document.createElement("li"), o = document.createElement("label"), i = document.createElement("span"), a = document.createElement("input"), c = document.createElement("div");
      return o.contentEditable = "false", a.type = "checkbox", a.addEventListener("mousedown", (l) => l.preventDefault()), a.addEventListener("change", (l) => {
        if (!r.isEditable && !this.options.onReadOnlyChecked) {
          a.checked = !a.checked;
          return;
        }
        const { checked: u } = l.target;
        r.isEditable && typeof n == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: d }) => {
          const p = n();
          if (typeof p != "number")
            return !1;
          const h = d.doc.nodeAt(p);
          return d.setNodeMarkup(p, void 0, {
            ...h == null ? void 0 : h.attrs,
            checked: u
          }), !0;
        }).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(e, u) || (a.checked = !a.checked));
      }), Object.entries(this.options.HTMLAttributes).forEach(([l, u]) => {
        s.setAttribute(l, u);
      }), s.dataset.checked = e.attrs.checked, e.attrs.checked && a.setAttribute("checked", "checked"), o.append(a, i), s.append(o, c), Object.entries(t).forEach(([l, u]) => {
        s.setAttribute(l, u);
      }), {
        dom: s,
        contentDOM: c,
        update: (l) => l.type !== this.type ? !1 : (s.dataset.checked = l.attrs.checked, l.attrs.checked ? a.setAttribute("checked", "checked") : a.removeAttribute("checked"), !0)
      };
    };
  },
  addInputRules() {
    return [
      et({
        find: Yo,
        type: this.type,
        getAttributes: (e) => ({
          checked: e[e.length - 1] === "x"
        })
      })
    ];
  }
}), zi = R.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["ul", x(this.options.HTMLAttributes, e, { "data-type": this.name }), 0];
  },
  addCommands() {
    return {
      toggleTaskList: () => ({ commands: e }) => e.toggleList(this.name, this.options.itemTypeName)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
    };
  }
}), Xo = /^\s*>\s$/, Wi = R.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["blockquote", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: e }) => e.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: e }) => e.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: e }) => e.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      et({
        find: Xo,
        type: this.type
      })
    ];
  }
});
function Qo(e) {
  return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function Zo(e) {
  return new H({
    key: new _("autolink"),
    appendTransaction: (t, n, r) => {
      const s = t.some((l) => l.docChanged) && !n.doc.eq(r.doc), o = t.some((l) => l.getMeta("preventAutolink"));
      if (!s || o)
        return;
      const { tr: i } = r, a = fs(n.doc, [...t]);
      if (ks(a).forEach(({ newRange: l }) => {
        const u = gs(r.doc, l, (h) => h.isTextblock);
        let d, p;
        if (u.length > 1 ? (d = u[0], p = r.doc.textBetween(d.pos, d.pos + d.node.nodeSize, void 0, " ")) : u.length && r.doc.textBetween(l.from, l.to, " ", " ").endsWith(" ") && (d = u[0], p = r.doc.textBetween(d.pos, l.to, void 0, " ")), d && p) {
          const h = p.split(" ").filter((y) => y !== "");
          if (h.length <= 0)
            return !1;
          const f = h[h.length - 1], m = d.pos + p.lastIndexOf(f);
          if (!f)
            return !1;
          const g = jn(f).map((y) => y.toObject(e.defaultProtocol));
          if (!Qo(g))
            return !1;
          g.filter((y) => y.isLink).map((y) => ({
            ...y,
            from: m + y.start + 1,
            to: m + y.end + 1
          })).filter((y) => r.schema.marks.code ? !r.doc.rangeHasMark(y.from, y.to, r.schema.marks.code) : !0).filter((y) => e.validate(y.value)).forEach((y) => {
            Qt(y.from, y.to, r.doc).some((k) => k.mark.type === e.type) || i.addMark(y.from, y.to, e.type.create({
              href: y.href
            }));
          });
        }
      }), !!i.steps.length)
        return i;
    }
  });
}
function ti(e) {
  return new H({
    key: new _("handleClickLink"),
    props: {
      handleClick: (t, n, r) => {
        var s, o;
        if (r.button !== 0 || !t.editable)
          return !1;
        let i = r.target;
        const a = [];
        for (; i.nodeName !== "DIV"; )
          a.push(i), i = i.parentNode;
        if (!a.find((p) => p.nodeName === "A"))
          return !1;
        const c = Ue(t.state, e.type.name), l = r.target, u = (s = l == null ? void 0 : l.href) !== null && s !== void 0 ? s : c.href, d = (o = l == null ? void 0 : l.target) !== null && o !== void 0 ? o : c.target;
        return l && u ? (window.open(u, d), !0) : !1;
      }
    }
  });
}
function ei(e) {
  return new H({
    key: new _("handlePasteLink"),
    props: {
      handlePaste: (t, n, r) => {
        const { state: s } = t, { selection: o } = s, { empty: i } = o;
        if (i)
          return !1;
        let a = "";
        r.content.forEach((l) => {
          a += l.textContent;
        });
        const c = He(a, { defaultProtocol: e.defaultProtocol }).find((l) => l.isLink && l.value === a);
        return !a || !c ? !1 : (e.editor.commands.setMark(e.type, {
          href: c.href
        }), !0);
      }
    }
  });
}
const ni = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;
function xe(e, t) {
  const n = ["http", "https", "ftp", "ftps", "mailto", "tel", "callto", "sms", "cid", "xmpp"];
  return t && t.forEach((r) => {
    const s = typeof r == "string" ? r : r.scheme;
    s && n.push(s);
  }), !e || e.replace(ni, "").match(new RegExp(`^(?:(?:${n.join("|")}):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))`, "i"));
}
const Vi = D.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  exitable: !0,
  onCreate() {
    this.options.protocols.forEach((e) => {
      if (typeof e == "string") {
        re(e);
        return;
      }
      re(e.scheme, e.optionalSlashes);
    });
  },
  onDestroy() {
    Fn();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: (e) => !!e
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(e) {
          return e.getAttribute("href");
        }
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [{
      tag: "a[href]",
      getAttrs: (e) => {
        const t = e.getAttribute("href");
        return !t || !xe(t, this.options.protocols) ? !1 : null;
      }
    }];
  },
  renderHTML({ HTMLAttributes: e }) {
    return xe(e.href, this.options.protocols) ? ["a", x(this.options.HTMLAttributes, e), 0] : ["a", x(this.options.HTMLAttributes, { ...e, href: "" }), 0];
  },
  addCommands() {
    return {
      setLink: (e) => ({ chain: t }) => t().setMark(this.name, e).setMeta("preventAutolink", !0).run(),
      toggleLink: (e) => ({ chain: t }) => t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run(),
      unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      V({
        find: (e) => {
          const t = [];
          if (e) {
            const { validate: n } = this.options, r = He(e).filter((s) => s.isLink && n(s.value));
            r.length && r.forEach((s) => t.push({
              text: s.value,
              data: {
                href: s.href
              },
              index: s.start
            }));
          }
          return t;
        },
        type: this.type,
        getAttributes: (e) => {
          var t;
          return {
            href: (t = e.data) === null || t === void 0 ? void 0 : t.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const e = [];
    return this.options.autolink && e.push(Zo({
      type: this.type,
      defaultProtocol: this.options.defaultProtocol,
      validate: this.options.validate
    })), this.options.openOnClick === !0 && e.push(ti({
      type: this.type
    })), this.options.linkOnPaste && e.push(ei({
      editor: this.editor,
      defaultProtocol: this.options.defaultProtocol,
      type: this.type
    })), e;
  }
}), Ki = R.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["hr", x(this.options.HTMLAttributes, e)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: e, state: t }) => {
        const { selection: n } = t, { $from: r, $to: s } = n, o = e();
        return r.parentOffset === 0 ? o.insertContentAt({
          from: Math.max(r.pos - 1, 0),
          to: s.pos
        }, {
          type: this.name
        }) : Ge(n) ? o.insertContentAt(s.pos, {
          type: this.name
        }) : o.insertContent({ type: this.name }), o.command(({ tr: i, dispatch: a }) => {
          var c;
          if (a) {
            const { $to: l } = i.selection, u = l.end();
            if (l.nodeAfter)
              l.nodeAfter.isTextblock ? i.setSelection(I.create(i.doc, l.pos + 1)) : l.nodeAfter.isBlock ? i.setSelection(tt.create(i.doc, l.pos)) : i.setSelection(I.create(i.doc, l.pos));
            else {
              const d = (c = l.parent.type.contentMatch.defaultType) === null || c === void 0 ? void 0 : c.create();
              d && (i.insert(u, d), i.setSelection(I.create(i.doc, u + 1)));
            }
            i.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      Je({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), qi = P.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: e, dispatch: t }) => zn(e, t),
      redo: () => ({ state: e, dispatch: t }) => Wn(e, t)
    };
  },
  addProseMirrorPlugins() {
    return [
      Vn(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), Ui = P.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      mode: "textSize",
      textCounter: (e) => e.length,
      wordCounter: (e) => e.split(" ").filter((t) => t !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (e) => {
      const t = (e == null ? void 0 : e.node) || this.editor.state.doc;
      if (((e == null ? void 0 : e.mode) || this.options.mode) === "textSize") {
        const r = t.textBetween(0, t.content.size, void 0, " ");
        return this.options.textCounter(r);
      }
      return t.nodeSize;
    }, this.storage.words = (e) => {
      const t = (e == null ? void 0 : e.node) || this.editor.state.doc, n = t.textBetween(0, t.content.size, " ", " ");
      return this.options.wordCounter(n);
    };
  },
  addProseMirrorPlugins() {
    return [
      new H({
        key: new _("characterCount"),
        filterTransaction: (e, t) => {
          const n = this.options.limit;
          if (!e.docChanged || n === 0 || n === null || n === void 0)
            return !0;
          const r = this.storage.characters({ node: t.doc }), s = this.storage.characters({ node: e.doc });
          if (s <= n || r > n && s > n && s <= r)
            return !0;
          if (r > n && s > n && s > r || !e.getMeta("paste"))
            return !1;
          const i = e.selection.$head.pos, a = s - n, c = i - a, l = i;
          return e.deleteRange(c, l), !(this.storage.characters({ node: e.doc }) > n);
        }
      })
    ];
  }
}), Gi = P.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      Kn(this.options)
    ];
  }
}), Ji = P.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new H({
        key: new _("focus"),
        props: {
          decorations: ({ doc: e, selection: t }) => {
            const { isEditable: n, isFocused: r } = this.editor, { anchor: s } = t, o = [];
            if (!n || !r)
              return ht.create(e, []);
            let i = 0;
            this.options.mode === "deepest" && e.descendants((c, l) => {
              if (c.isText)
                return;
              if (!(s >= l && s <= l + c.nodeSize - 1))
                return !1;
              i += 1;
            });
            let a = 0;
            return e.descendants((c, l) => {
              if (c.isText || !(s >= l && s <= l + c.nodeSize - 1))
                return !1;
              if (a += 1, this.options.mode === "deepest" && i - a > 0 || this.options.mode === "shallowest" && a > 1)
                return this.options.mode === "deepest";
              o.push(Vt.node(l, l + c.nodeSize, {
                class: this.options.className
              }));
            }), ht.create(e, o);
          }
        }
      })
    ];
  }
}), Yi = P.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      qn()
    ];
  },
  extendNodeSchema(e) {
    var t;
    const n = {
      name: e.name,
      options: e.options,
      storage: e.storage
    };
    return {
      allowGapCursor: (t = T(S(e, "allowGapCursor", n))) !== null && t !== void 0 ? t : null
    };
  }
}), Xi = R.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["br", x(this.options.HTMLAttributes, e)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: e, chain: t, state: n, editor: r }) => e.first([
        () => e.exitCode(),
        () => e.command(() => {
          const { selection: s, storedMarks: o } = n;
          if (s.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: i } = this.options, { splittableMarks: a } = r.extensionManager, c = o || s.$to.parentOffset && s.$from.marks();
          return t().insertContent({ type: this.name }).command(({ tr: l, dispatch: u }) => {
            if (u && c && i) {
              const d = c.filter((p) => a.includes(p.type.name));
              l.ensureMarks(d);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), Qi = R.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["li", x(this.options.HTMLAttributes, e), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), Zi = R.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["p", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: e }) => e.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), ta = P.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new H({
        key: new _("placeholder"),
        props: {
          decorations: ({ doc: e, selection: t }) => {
            const n = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: r } = t, s = [];
            if (!n)
              return null;
            const o = this.editor.isEmpty;
            return e.descendants((i, a) => {
              const c = r >= a && r <= a + i.nodeSize, l = !i.isLeaf && Et(i);
              if ((c || !this.options.showOnlyCurrent) && l) {
                const u = [this.options.emptyNodeClass];
                o && u.push(this.options.emptyEditorClass);
                const d = Vt.node(a, a + i.nodeSize, {
                  class: u.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: i,
                    pos: a,
                    hasAnchor: c
                  }) : this.options.placeholder
                });
                s.push(d);
              }
              return this.options.includeChildren;
            }), ht.create(e, s);
          }
        }
      })
    ];
  }
}), ea = R.create({
  name: "text",
  group: "inline"
}), na = R.create({
  name: "doc",
  topNode: !0,
  content: "block+"
}), ra = D.create({
  name: "subscript",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "sub"
      },
      {
        style: "vertical-align",
        getAttrs(e) {
          return e !== "sub" ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["sub", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setSubscript: () => ({ commands: e }) => e.setMark(this.name),
      toggleSubscript: () => ({ commands: e }) => e.toggleMark(this.name),
      unsetSubscript: () => ({ commands: e }) => e.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-,": () => this.editor.commands.toggleSubscript()
    };
  }
}), sa = D.create({
  name: "superscript",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "sup"
      },
      {
        style: "vertical-align",
        getAttrs(e) {
          return e !== "super" ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["sup", x(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setSuperscript: () => ({ commands: e }) => e.setMark(this.name),
      toggleSuperscript: () => ({ commands: e }) => e.toggleMark(this.name),
      unsetSuperscript: () => ({ commands: e }) => e.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-.": () => this.editor.commands.toggleSuperscript()
    };
  }
});
function ri(e) {
  var t;
  const { char: n, allowSpaces: r, allowedPrefixes: s, startOfLine: o, $position: i } = e, a = ro(n), c = new RegExp(`\\s${a}$`), l = o ? "^" : "", u = r ? new RegExp(`${l}${a}.*?(?=\\s${a}|$)`, "gm") : new RegExp(`${l}(?:^)?${a}[^\\s${a}]*`, "gm"), d = ((t = i.nodeBefore) === null || t === void 0 ? void 0 : t.isText) && i.nodeBefore.text;
  if (!d)
    return null;
  const p = i.pos - d.length, h = Array.from(d.matchAll(u)).pop();
  if (!h || h.input === void 0 || h.index === void 0)
    return null;
  const f = h.input.slice(Math.max(0, h.index - 1), h.index), m = new RegExp(`^[${s == null ? void 0 : s.join("")}\0]?$`).test(f);
  if (s !== null && !m)
    return null;
  const g = p + h.index;
  let y = g + h[0].length;
  return r && c.test(d.slice(y - 1, y + 1)) && (h[0] += " ", y += 1), g < i.pos && y >= i.pos ? {
    range: {
      from: g,
      to: y
    },
    query: h[0].slice(n.length),
    text: h[0]
  } : null;
}
const si = new _("suggestion");
function oi({ pluginKey: e = si, editor: t, char: n = "@", allowSpaces: r = !1, allowedPrefixes: s = [" "], startOfLine: o = !1, decorationTag: i = "span", decorationClass: a = "suggestion", command: c = () => null, items: l = () => [], render: u = () => ({}), allow: d = () => !0, findSuggestionMatch: p = ri }) {
  let h;
  const f = u == null ? void 0 : u(), m = new H({
    key: e,
    view() {
      return {
        update: async (g, y) => {
          var k, b, v, E, M, C, A;
          const w = (k = this.key) === null || k === void 0 ? void 0 : k.getState(y), O = (b = this.key) === null || b === void 0 ? void 0 : b.getState(g.state), B = w.active && O.active && w.range.from !== O.range.from, F = !w.active && O.active, X = w.active && !O.active, q = !F && !X && w.query !== O.query, U = F || B && q, z = q || B, G = X || B && q;
          if (!U && !z && !G)
            return;
          const Q = G && !U ? w : O, ee = g.dom.querySelector(`[data-decoration-id="${Q.decorationId}"]`);
          h = {
            editor: t,
            range: Q.range,
            query: Q.query,
            text: Q.text,
            items: [],
            command: (nt) => c({
              editor: t,
              range: Q.range,
              props: nt
            }),
            decorationNode: ee,
            // virtual node for popper.js or tippy.js
            // this can be used for building popups without a DOM node
            clientRect: ee ? () => {
              var nt;
              const { decorationId: en } = (nt = this.key) === null || nt === void 0 ? void 0 : nt.getState(t.state), Ct = g.dom.querySelector(`[data-decoration-id="${en}"]`);
              return (Ct == null ? void 0 : Ct.getBoundingClientRect()) || null;
            } : null
          }, U && ((v = f == null ? void 0 : f.onBeforeStart) === null || v === void 0 || v.call(f, h)), z && ((E = f == null ? void 0 : f.onBeforeUpdate) === null || E === void 0 || E.call(f, h)), (z || U) && (h.items = await l({
            editor: t,
            query: Q.query
          })), G && ((M = f == null ? void 0 : f.onExit) === null || M === void 0 || M.call(f, h)), z && ((C = f == null ? void 0 : f.onUpdate) === null || C === void 0 || C.call(f, h)), U && ((A = f == null ? void 0 : f.onStart) === null || A === void 0 || A.call(f, h));
        },
        destroy: () => {
          var g;
          h && ((g = f == null ? void 0 : f.onExit) === null || g === void 0 || g.call(f, h));
        }
      };
    },
    state: {
      // Initialize the plugin's internal state.
      init() {
        return {
          active: !1,
          range: {
            from: 0,
            to: 0
          },
          query: null,
          text: null,
          composing: !1
        };
      },
      // Apply changes to the plugin state from a view transaction.
      apply(g, y, k, b) {
        const { isEditable: v } = t, { composing: E } = t.view, { selection: M } = g, { empty: C, from: A } = M, w = { ...y };
        if (w.composing = E, v && (C || t.view.composing)) {
          (A < y.range.from || A > y.range.to) && !E && !y.composing && (w.active = !1);
          const O = p({
            char: n,
            allowSpaces: r,
            allowedPrefixes: s,
            startOfLine: o,
            $position: M.$from
          }), B = `id_${Math.floor(Math.random() * 4294967295)}`;
          O && d({
            editor: t,
            state: b,
            range: O.range,
            isActive: y.active
          }) ? (w.active = !0, w.decorationId = y.decorationId ? y.decorationId : B, w.range = O.range, w.query = O.query, w.text = O.text) : w.active = !1;
        } else
          w.active = !1;
        return w.active || (w.decorationId = null, w.range = { from: 0, to: 0 }, w.query = null, w.text = null), w;
      }
    },
    props: {
      // Call the keydown hook if suggestion is active.
      handleKeyDown(g, y) {
        var k;
        const { active: b, range: v } = m.getState(g.state);
        return b && ((k = f == null ? void 0 : f.onKeyDown) === null || k === void 0 ? void 0 : k.call(f, { view: g, event: y, range: v })) || !1;
      },
      // Setup decorator on the currently active suggestion.
      decorations(g) {
        const { active: y, range: k, decorationId: b } = m.getState(g);
        return y ? ht.create(g.doc, [
          Vt.inline(k.from, k.to, {
            nodeName: i,
            class: a,
            "data-decoration-id": b
          })
        ]) : null;
      }
    }
  });
  return m;
}
const ii = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, oa = R.create({
  name: "image",
  addOptions() {
    return {
      inline: !1,
      allowBase64: !1,
      HTMLAttributes: {}
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: !0,
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["img", x(this.options.HTMLAttributes, e)];
  },
  addCommands() {
    return {
      setImage: (e) => ({ commands: t }) => t.insertContent({
        type: this.name,
        attrs: e
      })
    };
  },
  addInputRules() {
    return [
      Je({
        find: ii,
        type: this.type,
        getAttributes: (e) => {
          const [, , t, n, r] = e;
          return { src: n, alt: t, title: r };
        }
      })
    ];
  }
}), ia = R.create({
  name: "tableRow",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "(tableCell | tableHeader)*",
  tableRole: "row",
  parseHTML() {
    return [
      { tag: "tr" }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["tr", x(this.options.HTMLAttributes, e), 0];
  }
});
function Ae(e, t, n, r, s, o) {
  let i = 0, a = !0, c = t.firstChild;
  const l = e.firstChild;
  for (let u = 0, d = 0; u < l.childCount; u += 1) {
    const { colspan: p, colwidth: h } = l.child(u).attrs;
    for (let f = 0; f < p; f += 1, d += 1) {
      const m = s === d ? o : h && h[f], g = m ? `${m}px` : "";
      i += m || r, m || (a = !1), c ? (c.style.width !== g && (c.style.width = g), c = c.nextSibling) : t.appendChild(document.createElement("col")).style.width = g;
    }
  }
  for (; c; ) {
    const u = c.nextSibling;
    c.parentNode.removeChild(c), c = u;
  }
  a ? (n.style.width = `${i}px`, n.style.minWidth = "") : (n.style.width = "", n.style.minWidth = `${i}px`);
}
class ai {
  constructor(t, n) {
    this.node = t, this.cellMinWidth = n, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.colgroup = this.table.appendChild(document.createElement("colgroup")), Ae(t, this.colgroup, this.table, n), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(t) {
    return t.type !== this.node.type ? !1 : (this.node = t, Ae(t, this.colgroup, this.table, this.cellMinWidth), !0);
  }
  ignoreMutation(t) {
    return t.type === "attributes" && (t.target === this.table || this.colgroup.contains(t.target));
  }
}
function li(e, t, n, r) {
  let s = 0, o = !0;
  const i = [], a = e.firstChild;
  if (!a)
    return {};
  for (let d = 0, p = 0; d < a.childCount; d += 1) {
    const { colspan: h, colwidth: f } = a.child(d).attrs;
    for (let m = 0; m < h; m += 1, p += 1) {
      const g = n === p ? r : f && f[m], y = g ? `${g}px` : "";
      s += g || t, g || (o = !1), i.push(["col", y ? { style: `width: ${y}` } : {}]);
    }
  }
  const c = o ? `${s}px` : "", l = o ? "" : `${s}px`;
  return { colgroup: ["colgroup", {}, ...i], tableWidth: c, tableMinWidth: l };
}
function Oe(e, t) {
  return e.createAndFill();
}
function ci(e) {
  if (e.cached.tableNodeTypes)
    return e.cached.tableNodeTypes;
  const t = {};
  return Object.keys(e.nodes).forEach((n) => {
    const r = e.nodes[n];
    r.spec.tableRole && (t[r.spec.tableRole] = r);
  }), e.cached.tableNodeTypes = t, t;
}
function di(e, t, n, r, s) {
  const o = ci(e), i = [], a = [];
  for (let l = 0; l < n; l += 1) {
    const u = Oe(o.cell);
    if (u && a.push(u), r) {
      const d = Oe(o.header_cell);
      d && i.push(d);
    }
  }
  const c = [];
  for (let l = 0; l < t; l += 1)
    c.push(o.row.createChecked(null, r && l === 0 ? i : a));
  return o.table.createChecked(null, c);
}
function ui(e) {
  return e instanceof _e;
}
const ct = ({ editor: e }) => {
  const { selection: t } = e.state;
  if (!ui(t))
    return !1;
  let n = 0;
  const r = qe(t.ranges[0].$from, (o) => o.type.name === "table");
  return r == null || r.node.descendants((o) => {
    if (o.type.name === "table")
      return !1;
    ["tableCell", "tableHeader"].includes(o.type.name) && (n += 1);
  }), n === t.ranges.length ? (e.commands.deleteTable(), !0) : !1;
}, aa = R.create({
  name: "table",
  // @ts-ignore
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: !1,
      handleWidth: 5,
      cellMinWidth: 25,
      // TODO: fix
      View: ai,
      lastColumnResizable: !0,
      allowTableNodeSelection: !1
    };
  },
  content: "tableRow+",
  tableRole: "table",
  isolating: !0,
  group: "block",
  parseHTML() {
    return [{ tag: "table" }];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    const { colgroup: n, tableWidth: r, tableMinWidth: s } = li(e, this.options.cellMinWidth);
    return [
      "table",
      x(this.options.HTMLAttributes, t, {
        style: r ? `width: ${r}` : `min-width: ${s}`
      }),
      n,
      ["tbody", 0]
    ];
  },
  addCommands() {
    return {
      insertTable: ({ rows: e = 3, cols: t = 3, withHeaderRow: n = !0 } = {}) => ({ tr: r, dispatch: s, editor: o }) => {
        const i = di(o.schema, e, t, n);
        if (s) {
          const a = r.selection.from + 1;
          r.replaceSelectionWith(i).scrollIntoView().setSelection(I.near(r.doc.resolve(a)));
        }
        return !0;
      },
      addColumnBefore: () => ({ state: e, dispatch: t }) => Un(e, t),
      addColumnAfter: () => ({ state: e, dispatch: t }) => Gn(e, t),
      deleteColumn: () => ({ state: e, dispatch: t }) => Jn(e, t),
      addRowBefore: () => ({ state: e, dispatch: t }) => Yn(e, t),
      addRowAfter: () => ({ state: e, dispatch: t }) => Xn(e, t),
      deleteRow: () => ({ state: e, dispatch: t }) => Qn(e, t),
      deleteTable: () => ({ state: e, dispatch: t }) => Zn(e, t),
      mergeCells: () => ({ state: e, dispatch: t }) => se(e, t),
      splitCell: () => ({ state: e, dispatch: t }) => oe(e, t),
      toggleHeaderColumn: () => ({ state: e, dispatch: t }) => ie("column")(e, t),
      toggleHeaderRow: () => ({ state: e, dispatch: t }) => ie("row")(e, t),
      toggleHeaderCell: () => ({ state: e, dispatch: t }) => tr(e, t),
      mergeOrSplit: () => ({ state: e, dispatch: t }) => se(e, t) ? !0 : oe(e, t),
      setCellAttribute: (e, t) => ({ state: n, dispatch: r }) => er(e, t)(n, r),
      goToNextCell: () => ({ state: e, dispatch: t }) => ae(1)(e, t),
      goToPreviousCell: () => ({ state: e, dispatch: t }) => ae(-1)(e, t),
      fixTables: () => ({ state: e, dispatch: t }) => (t && nr(e), !0),
      setCellSelection: (e) => ({ tr: t, dispatch: n }) => {
        if (n) {
          const r = _e.create(t.doc, e.anchorCell, e.headCell);
          t.setSelection(r);
        }
        return !0;
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.goToNextCell() ? !0 : this.editor.can().addRowAfter() ? this.editor.chain().addRowAfter().goToNextCell().run() : !1,
      "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
      Backspace: ct,
      "Mod-Backspace": ct,
      Delete: ct,
      "Mod-Delete": ct
    };
  },
  addProseMirrorPlugins() {
    return [
      ...this.options.resizable && this.editor.isEditable ? [
        rr({
          handleWidth: this.options.handleWidth,
          cellMinWidth: this.options.cellMinWidth,
          View: this.options.View,
          lastColumnResizable: this.options.lastColumnResizable
        })
      ] : [],
      sr({
        allowTableNodeSelection: this.options.allowTableNodeSelection
      })
    ];
  },
  extendNodeSchema(e) {
    const t = {
      name: e.name,
      options: e.options,
      storage: e.storage
    };
    return {
      tableRole: T(S(e, "tableRole", t))
    };
  }
}), la = R.create({
  name: "tableCell",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (e) => {
          const t = e.getAttribute("colwidth");
          return t ? t.split(",").map((r) => parseInt(r, 10)) : null;
        }
      }
    };
  },
  tableRole: "cell",
  isolating: !0,
  parseHTML() {
    return [
      { tag: "td" }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["td", x(this.options.HTMLAttributes, e), 0];
  }
}), ca = R.create({
  name: "tableHeader",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (e) => {
          const t = e.getAttribute("colwidth");
          return t ? t.split(",").map((r) => parseInt(r, 10)) : null;
        }
      }
    };
  },
  tableRole: "header_cell",
  isolating: !0,
  parseHTML() {
    return [
      { tag: "th" }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["th", x(this.options.HTMLAttributes, e), 0];
  }
}), pi = new _("mention"), da = R.create({
  name: "mention",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      renderText({ options: e, node: t }) {
        var n;
        return `${e.suggestion.char}${(n = t.attrs.label) !== null && n !== void 0 ? n : t.attrs.id}`;
      },
      deleteTriggerWithBackspace: !1,
      renderHTML({ options: e, node: t }) {
        var n;
        return [
          "span",
          x(this.HTMLAttributes, e.HTMLAttributes),
          `${e.suggestion.char}${(n = t.attrs.label) !== null && n !== void 0 ? n : t.attrs.id}`
        ];
      },
      suggestion: {
        char: "@",
        pluginKey: pi,
        command: ({ editor: e, range: t, props: n }) => {
          var r, s, o;
          const i = e.view.state.selection.$to.nodeAfter;
          ((r = i == null ? void 0 : i.text) === null || r === void 0 ? void 0 : r.startsWith(" ")) && (t.to += 1), e.chain().focus().insertContentAt(t, [
            {
              type: this.name,
              attrs: n
            },
            {
              type: "text",
              text: " "
            }
          ]).run(), (o = (s = e.view.dom.ownerDocument.defaultView) === null || s === void 0 ? void 0 : s.getSelection()) === null || o === void 0 || o.collapseToEnd();
        },
        allow: ({ state: e, range: t }) => {
          const n = e.doc.resolve(t.from), r = e.schema.nodes[this.name];
          return !!n.parent.type.contentMatch.matchType(r);
        }
      }
    };
  },
  group: "inline",
  inline: !0,
  selectable: !1,
  atom: !0,
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (e) => e.getAttribute("data-id"),
        renderHTML: (e) => e.id ? {
          "data-id": e.id
        } : {}
      },
      label: {
        default: null,
        parseHTML: (e) => e.getAttribute("data-label"),
        renderHTML: (e) => e.label ? {
          "data-label": e.label
        } : {}
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`
      }
    ];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    if (this.options.renderLabel !== void 0)
      return console.warn("renderLabel is deprecated use renderText and renderHTML instead"), [
        "span",
        x({ "data-type": this.name }, this.options.HTMLAttributes, t),
        this.options.renderLabel({
          options: this.options,
          node: e
        })
      ];
    const n = { ...this.options };
    n.HTMLAttributes = x({ "data-type": this.name }, this.options.HTMLAttributes, t);
    const r = this.options.renderHTML({
      options: n,
      node: e
    });
    return typeof r == "string" ? [
      "span",
      x({ "data-type": this.name }, this.options.HTMLAttributes, t),
      r
    ] : r;
  },
  renderText({ node: e }) {
    return this.options.renderLabel !== void 0 ? (console.warn("renderLabel is deprecated use renderText and renderHTML instead"), this.options.renderLabel({
      options: this.options,
      node: e
    })) : this.options.renderText({
      options: this.options,
      node: e
    });
  },
  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr: e, state: t }) => {
        let n = !1;
        const { selection: r } = t, { empty: s, anchor: o } = r;
        return s ? (t.doc.nodesBetween(o - 1, o, (i, a) => {
          if (i.type.name === this.name)
            return n = !0, e.insertText(this.options.deleteTriggerWithBackspace ? "" : this.options.suggestion.char || "", a, a + i.nodeSize), !1;
        }), n) : !1;
      })
    };
  },
  addProseMirrorPlugins() {
    return [
      oi({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
});
export {
  aa as $,
  Gi as A,
  wi as B,
  Ri as C,
  xi as D,
  Si as E,
  _i as F,
  Yi as G,
  $i as H,
  Ai as I,
  Ui as J,
  Zi as K,
  Vi as L,
  Xi as M,
  Ti as N,
  ji as O,
  ta as P,
  Qi as Q,
  Ci as R,
  Li as S,
  Ii as T,
  Oi as U,
  Hi as V,
  ra as W,
  sa as X,
  oi as Y,
  Lo as Z,
  oa as _,
  R as a,
  ia as a0,
  ca as a1,
  la as a2,
  da as a3,
  yr as a4,
  bi as b,
  ws as c,
  $o as d,
  Mi as e,
  vi as f,
  Ei as g,
  Pi as h,
  pe as i,
  P as j,
  Di as k,
  Ni as l,
  x as m,
  Je as n,
  Bi as o,
  zi as p,
  Fi as q,
  Wi as r,
  Gt as s,
  Ki as t,
  ki as u,
  qi as v,
  na as w,
  Xt as x,
  Ji as y,
  ea as z
};
