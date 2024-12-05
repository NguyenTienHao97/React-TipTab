var Xn = Object.defineProperty;
var Zn = (e, t, i) => t in e ? Xn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var ue = (e, t, i) => Zn(e, typeof t != "symbol" ? t + "" : t, i);
import { jsxs as m, jsx as r, Fragment as K } from "react/jsx-runtime";
import * as $ from "react";
import Le, { useState as p, useRef as Y, useEffect as z, useCallback as A, useMemo as D, Fragment as st, forwardRef as At, useImperativeHandle as Lt } from "react";
import "@radix-ui/react-toast";
import { ChevronRight as Yn, Check as ri, Circle as Jn, ChevronDown as St, ChevronUp as Qi, HelpCircle as en, Pencil as tn, Trash2 as nn, X as Qn, Plus as rn, Bold as er, LoaderCircle as tr, Italic as ir, Underline as nr, Quote as rr, Strikethrough as ar, Minus as or, Eraser as cr, PaintRoller as sr, Redo2 as lr, Undo2 as dr, Subscript as hr, Superscript as ur, Code as mr, CodeXml as fr, Type as gr, IndentIncrease as xr, IndentDecrease as br, List as pr, ListOrdered as wr, ListTodo as _r, Link as vr, ImageUp as yr, Video as kr, Maximize as Cr, Minimize as Nr, Table as Tr, Sparkles as Ar, Unlink as Lr, BetweenHorizonalEnd as Sr, BetweenHorizonalStart as Mr, BetweenVerticalStart as Ir, BetweenVerticalEnd as zr, TableCellsMerge as Er, TableCellsSplit as Hr, Trash as Rr, Replace as Ti, ChevronsUpDown as Or, Heading1 as Pr, Heading2 as Dr, Heading3 as Br, Heading4 as $r, Heading5 as Vr, Heading6 as Fr, Columns2 as Ai, Columns3 as jr, Columns4 as Ur, GripVertical as Wr, Copy as an, Clipboard as Kr, PanelLeft as qr, PanelRight as Gr, Frame as Xr, SmilePlus as Zr, SmilePlusIcon as Yr, Sigma as Jr, BookMarked as Qr, ZoomIn as ea, ZoomOut as ta, Settings as ia, Eye as na, Paperclip as ra, CropIcon as aa, FlipVertical as oa, FlipHorizontal as ca, CopyCheck as sa, Clock3 as la, Laugh as da, LucideTableProperties as ha, LucideSheet as ua, LucideImage as ma, LucideFile as fa, LucideVideo as ga, LucideAudioLines as xa } from "lucide-react";
import { B as ce, N as ae, a as he, m as ne, R as ge, n as ai, b as ba, u as pa, E as wa, i as _a, D as va, d as ya, c as ka, e as Ca, I as Na, U as Ta, S as Aa, C as La, f as at, g as Sa, h as Ma, F as Ia, H as za, T as Ea, j as Z, k as Ha, l as Ra, o as Oa, O as Pa, p as Da, q as Ba, r as $a, L as Va, s as Fa, t as ja, v as Ua, w as Wa, x as kt, P as Ka, y as qa, z as Ga, G as Xa, A as Za, J as Ya, K as Ja, M as Qa, Q as eo, V as to, W as on, X as cn, Y as sn, Z as oi, _ as ci, $ as io, a0 as no, a1 as ro, a2 as ao, a3 as oo, a4 as Li } from "./tiptap-CIicz144.js";
import { al as co, am as ee, an as si, ao as li, ap as so, aq as ln, ar as lo, as as Se, e as Mt, d as Me, at as dn, au as ho, P as pe, a as we, a1 as Fe, a2 as Ue, av as di, aw as uo, ax as Ct, ay as hn, ai as mo } from "./vendor-DCd8XlAt.js";
import { bundledThemes as un, bundledLanguages as mn, createHighlighter as fo } from "shiki";
import { u as V, C as go, E as xo, l as j, B as bo, I as Nt, V as Kt, M as po, D as fn, a as wo, b as _o, c as Si, d as gn, e as vo, f as We, g as Ke, h as hi, T as gt, i as xt, j as bt } from "./locales-DTWTZIeg.js";
import * as X from "@radix-ui/react-select";
import { Slot as ui } from "@radix-ui/react-slot";
import { HexColorPicker as yo } from "react-colorful";
import mi, { sticky as ko } from "tippy.js";
import { flushSync as qe } from "react-dom";
import Co from "react-image-crop";
import { proxy as It, useSnapshot as zt } from "valtio";
import * as qt from "@radix-ui/react-checkbox";
import fi from "scroll-into-view-if-needed";
import * as Ie from "@radix-ui/react-tabs";
import { defaultNodes as Ce, DocxSerializer as No, defaultMarks as To } from "prosemirror-docx";
import { Packer as Ao } from "docx";
import Tt from "mermaid";
import * as oe from "@radix-ui/react-dialog";
import gi from "katex";
import * as ot from "@radix-ui/react-popover";
import * as xn from "@radix-ui/react-label";
import { Resizable as bn } from "re-resizable";
import * as pn from "@radix-ui/react-separator";
import { Tweet as Lo } from "react-tweet";
import { TextAlignCenterIcon as So, TextAlignJustifyIcon as Mo, TextAlignLeftIcon as Io, TextAlignRightIcon as zo } from "@radix-ui/react-icons";
import * as Gt from "@radix-ui/react-switch";
import * as q from "@radix-ui/react-dropdown-menu";
import * as lt from "@radix-ui/react-tooltip";
import * as wn from "@radix-ui/react-toggle";
let Dt;
function Bt() {
  return Dt === void 0 && (Dt = navigator.platform.includes("Mac")), Dt;
}
function Et(e) {
  return `${e}`.toLowerCase() === "mod" ? Bt() ? "⌘" : "Ctrl" : `${e}`.toLowerCase() === "alt" ? Bt() ? "⌥" : "Alt" : `${e}`.toLowerCase() === "shift" ? Bt() ? "⇧" : "Shift" : e;
}
function Ht(e) {
  return e.map(Et).join(" ");
}
function P(...e) {
  return co(ee(e));
}
const _ = Le.forwardRef(
  (e, t) => {
    const {
      icon: i = void 0,
      // title = undefined,
      tooltip: n = void 0,
      disabled: a = !1,
      customClass: o = "",
      // color = undefined,
      // loading = false,
      shortcutKeys: c = void 0,
      tooltipOptions: s = {},
      action: d = void 0,
      isActive: l = void 0,
      children: h,
      asChild: u = !1,
      upload: f = !1,
      ...g
    } = e, x = mt[i];
    return /* @__PURE__ */ m(Je, { children: [
      /* @__PURE__ */ r(Qe, { asChild: !0, children: /* @__PURE__ */ m(
        u ? ui : ut,
        {
          ref: t,
          size: "sm",
          className: P("richtext-w-[32px] richtext-h-[32px]", o),
          disabled: a,
          onClick: (y) => {
            d == null || d(), console.log("action-title", e == null ? void 0 : e.title), y.preventDefault(), y.stopPropagation();
          },
          onMouseDown: (y) => {
            y.preventDefault(), y.stopPropagation();
          },
          "data-state": l != null && l() ? "on" : "off",
          ...g,
          children: [
            x && /* @__PURE__ */ r(x, { className: "richtext-w-4 richtext-h-4" }),
            h
          ]
        }
      ) }),
      n && /* @__PURE__ */ r(Ee, { ...s, children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-flex-col richtext-items-center richtext-text-center richtext-max-w-24", children: [
        /* @__PURE__ */ r("div", { children: n }),
        !!(c != null && c.length) && /* @__PURE__ */ r("span", { children: Ht(c) })
      ] }) })
    ] });
  }
), xi = Le.forwardRef(
  ({ asChild: e, ...t }, i) => {
    var o;
    const n = mt[t.icon];
    return /* @__PURE__ */ m(Je, { children: [
      /* @__PURE__ */ r(Qe, { asChild: !0, children: /* @__PURE__ */ r(
        e ? ui : U,
        {
          ref: i,
          className: "richtext-h-[32px] richtext-px-[5px] richtext-py-0 richtext-min-w-24  richtext-overflow-hidden",
          variant: "ghost",
          disabled: t == null ? void 0 : t.disabled,
          ...t,
          children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-h-full richtext-font-normal", children: [
            (t == null ? void 0 : t.title) && /* @__PURE__ */ r("div", { className: "richtext-flex-grow richtext-text-sm richtext-text-left richtext-truncate", children: t == null ? void 0 : t.title }),
            n && /* @__PURE__ */ r(n, { className: "richtext-flex-shrink-0 richtext-w-3 richtext-h-3 richtext-ml-1 richtext-text-zinc-500" })
          ] })
        }
      ) }),
      /* @__PURE__ */ r(Ee, { children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-flex-col richtext-items-center richtext-text-center richtext-max-w-24", children: [
        (t == null ? void 0 : t.tooltip) && /* @__PURE__ */ r("div", { children: t == null ? void 0 : t.tooltip }),
        /* @__PURE__ */ r("div", { className: "richtext-flex", children: !!((o = t == null ? void 0 : t.shortcutKeys) != null && o.length) && /* @__PURE__ */ r("span", { children: Ht(t == null ? void 0 : t.shortcutKeys) }) })
      ] }) })
    ] });
  }
);
function Ye(e, t) {
  const { state: i } = t, n = i.selection.$anchor;
  let a = !1;
  if (n.depth)
    for (let o = n.depth; o > 0; o--)
      n.node(o).type.name === e && (t.dispatchTransaction && t.dispatchTransaction(i.tr.delete(n.before(o), n.after(o)).scrollIntoView()), a = !0);
  else {
    const o = i.selection.node;
    o && o.type.name === e && (t.chain().deleteSelection().run(), a = !0);
  }
  if (!a) {
    const o = n.pos;
    if (o) {
      const c = i.tr.doc.nodeAt(o);
      c && c.type.name === e && (t.dispatchTransaction && t.dispatchTransaction(i.tr.delete(o, o + c.nodeSize)), a = !0);
    }
  }
  return a;
}
function Eo(e) {
  return e;
}
function dt(e, t, i, n) {
  const a = Eo, [o, c] = p(a(i)), s = Y(o);
  return z(() => {
    const d = () => {
      const l = { ...i, ...e.getAttributes(t) };
      Object.keys(l).forEach((u) => {
        (l[u] === null || l[u] === void 0) && (l[u] = i ? i[u] : null);
      });
      const h = a(l);
      si(s.current, h) || (c(h), s.current = h);
    };
    return e.on("selectionUpdate", d), e.on("transaction", d), () => {
      e.off("selectionUpdate", d), e.off("transaction", d);
    };
  }, [e, i, t, a]), o;
}
const ht = $.forwardRef(
  ({ className: e, ...t }, i) => /* @__PURE__ */ r(
    "textarea",
    {
      className: P(
        "richtext-flex richtext-min-h-[80px] richtext-w-full richtext-rounded-md !richtext-border richtext-border-input richtext-bg-background richtext-px-3 richtext-py-2 richtext-text-sm richtext-ring-offset-background placeholder:richtext-text-muted-foreground focus-visible:richtext-outline-none focus-visible:richtext-ring-2 focus-visible:richtext-ring-ring focus-visible:richtext-ring-offset-2 disabled:richtext-cursor-not-allowed disabled:richtext-opacity-50",
        e
      ),
      ref: i,
      ...t
    }
  )
);
ht.displayName = "Textarea";
const Ho = li(
  "richtext-inline-flex richtext-items-center richtext-justify-center richtext-whitespace-nowrap richtext-rounded-md richtext-text-sm richtext-font-medium richtext-ring-offset-background richtext-transition-colors focus-visible:richtext-outline-none focus-visible:richtext-ring-2 focus-visible:richtext-ring-ring focus-visible:richtext-ring-offset-2 disabled:richtext-pointer-events-none disabled:richtext-opacity-50",
  {
    variants: {
      variant: {
        default: "!richtext-bg-primary !richtext-text-primary-foreground hover:!richtext-bg-primary/90",
        destructive: "richtext-bg-destructive richtext-text-destructive-foreground hover:richtext-bg-destructive/90",
        outline: "richtext-border richtext-border-input richtext-bg-background hover:richtext-bg-accent hover:richtext-text-accent-foreground",
        secondary: "richtext-bg-secondary richtext-text-secondary-foreground hover:richtext-bg-secondary/80",
        ghost: "hover:richtext-bg-accent hover:richtext-text-accent-foreground",
        link: "richtext-text-primary richtext-underline-offset-4 hover:richtext-underline"
      },
      size: {
        default: "richtext-h-10 richtext-px-4 richtext-py-2",
        sm: "richtext-h-9 richtext-rounded-md richtext-px-3",
        lg: "richtext-h-11 richtext-rounded-md richtext-px-8",
        icon: "richtext-h-10 richtext-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), U = $.forwardRef(
  ({ className: e, variant: t, size: i, asChild: n = !1, ...a }, o) => /* @__PURE__ */ r(
    n ? ui : "button",
    {
      className: P(Ho({ variant: t, size: i, className: e })),
      ref: o,
      ...a
    }
  )
);
U.displayName = "Button";
const _e = q.Root, ve = q.Trigger, Mi = q.Portal, Ii = q.Sub, Xt = $.forwardRef(({ className: e, inset: t, children: i, ...n }, a) => /* @__PURE__ */ m(
  q.SubTrigger,
  {
    ref: a,
    className: P(
      "richtext-flex richtext-cursor-default richtext-select-none richtext-items-center richtext-rounded-sm richtext-px-2 richtext-py-1.5 richtext-text-sm richtext-outline-none focus:richtext-bg-accent data-[state=open]:richtext-bg-accent",
      t && "richtext-pl-8",
      e
    ),
    ...n,
    children: [
      i,
      /* @__PURE__ */ r(Yn, { className: "richtext-ml-auto richtext-h-4 richtext-w-4" })
    ]
  }
));
Xt.displayName = q.SubTrigger.displayName;
const Zt = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  q.SubContent,
  {
    ref: i,
    className: P(
      "richtext-z-50 richtext-min-w-[8rem] richtext-overflow-hidden richtext-rounded-md !richtext-border richtext-bg-popover richtext-p-1 richtext-text-popover-foreground richtext-shadow-lg data-[state=open]:richtext-animate-in data-[state=closed]:richtext-animate-out data-[state=closed]:richtext-fade-out-0 data-[state=open]:richtext-fade-in-0 data-[state=closed]:richtext-zoom-out-95 data-[state=open]:richtext-zoom-in-95 data-[side=bottom]:richtext-slide-in-from-top-2 data-[side=left]:richtext-slide-in-from-right-2 data-[side=right]:richtext-slide-in-from-left-2 data-[side=top]:richtext-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Zt.displayName = q.SubContent.displayName;
const xe = $.forwardRef(({ className: e, sideOffset: t = 4, ...i }, n) => /* @__PURE__ */ r(q.Portal, { children: /* @__PURE__ */ r(
  q.Content,
  {
    ref: n,
    sideOffset: t,
    className: P(
      "richtext-z-50 richtext-min-w-[8rem] richtext-overflow-hidden richtext-rounded-md !richtext-border richtext-bg-popover richtext-p-1 richtext-text-popover-foreground richtext-shadow-md data-[state=open]:richtext-animate-in data-[state=closed]:richtext-animate-out data-[state=closed]:richtext-fade-out-0 data-[state=open]:richtext-fade-in-0 data-[state=closed]:richtext-zoom-out-95 data-[state=open]:richtext-zoom-in-95 data-[side=bottom]:richtext-slide-in-from-top-2 data-[side=left]:richtext-slide-in-from-right-2 data-[side=right]:richtext-slide-in-from-left-2 data-[side=top]:richtext-slide-in-from-bottom-2",
      e
    ),
    ...i
  }
) }));
xe.displayName = q.Content.displayName;
const de = $.forwardRef(({ className: e, inset: t, ...i }, n) => /* @__PURE__ */ r(
  q.Item,
  {
    ref: n,
    className: P(
      "richtext-relative richtext-flex richtext-cursor-default richtext-select-none richtext-items-center richtext-rounded-sm richtext-px-2 richtext-py-1.5 richtext-text-sm richtext-outline-none richtext-transition-colors focus:richtext-bg-accent focus:richtext-text-accent-foreground data-[disabled]:richtext-pointer-events-none data-[disabled]:richtext-opacity-50",
      t && "richtext-pl-8",
      e
    ),
    ...i
  }
));
de.displayName = q.Item.displayName;
const ze = $.forwardRef(({ className: e, children: t, checked: i, ...n }, a) => /* @__PURE__ */ m(
  q.CheckboxItem,
  {
    ref: a,
    className: P(
      "richtext-relative richtext-flex richtext-cursor-default richtext-select-none richtext-items-center richtext-rounded-sm richtext-py-1.5 richtext-pl-8 richtext-pr-2 richtext-text-sm richtext-outline-none richtext-transition-colors focus:richtext-bg-accent focus:richtext-text-accent-foreground data-[disabled]:richtext-pointer-events-none data-[disabled]:richtext-opacity-50",
      e
    ),
    checked: i,
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "richtext-absolute richtext-left-2 richtext-flex richtext-h-3.5 richtext-w-3.5 richtext-items-center richtext-justify-center", children: /* @__PURE__ */ r(q.ItemIndicator, { children: /* @__PURE__ */ r(ri, { className: "richtext-h-4 richtext-w-4" }) }) }),
      t
    ]
  }
));
ze.displayName = q.CheckboxItem.displayName;
const Ro = $.forwardRef(({ className: e, children: t, ...i }, n) => /* @__PURE__ */ m(
  q.RadioItem,
  {
    ref: n,
    className: P(
      "richtext-relative richtext-flex richtext-cursor-default richtext-select-none richtext-items-center richtext-rounded-sm richtext-py-1.5 richtext-pl-8 richtext-pr-2 richtext-text-sm richtext-outline-none richtext-transition-colors focus:richtext-bg-accent focus:richtext-text-accent-foreground data-[disabled]:richtext-pointer-events-none data-[disabled]:richtext-opacity-50",
      e
    ),
    ...i,
    children: [
      /* @__PURE__ */ r("span", { className: "richtext-absolute richtext-left-2 richtext-flex richtext-h-3.5 richtext-w-3.5 richtext-items-center richtext-justify-center", children: /* @__PURE__ */ r(q.ItemIndicator, { children: /* @__PURE__ */ r(Jn, { className: "richtext-h-2 richtext-w-2 richtext-fill-current" }) }) }),
      t
    ]
  }
));
Ro.displayName = q.RadioItem.displayName;
const Oo = $.forwardRef(({ className: e, inset: t, ...i }, n) => /* @__PURE__ */ r(
  q.Label,
  {
    ref: n,
    className: P(
      "richtext-px-2 richtext-py-1.5 richtext-text-sm richtext-font-semibold",
      t && "richtext-pl-8",
      e
    ),
    ...i
  }
));
Oo.displayName = q.Label.displayName;
const Rt = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  q.Separator,
  {
    ref: i,
    className: P("richtext--mx-1 richtext-my-1 richtext-h-px richtext-bg-muted", e),
    ...t
  }
));
Rt.displayName = q.Separator.displayName;
function _n({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: P("richtext-ml-auto richtext-text-xs richtext-tracking-widest richtext-opacity-60", e),
      ...t
    }
  );
}
_n.displayName = "DropdownMenuShortcut";
const te = $.forwardRef(
  ({ className: e, type: t, ...i }, n) => /* @__PURE__ */ r(
    "input",
    {
      type: t,
      className: P(
        "richtext-flex richtext-h-10 richtext-w-full richtext-rounded-md !richtext-border richtext-border-input richtext-bg-background richtext-px-3 richtext-py-2 richtext-text-sm richtext-ring-offset-background file:richtext-border-0 file:richtext-bg-transparent file:richtext-text-sm file:richtext-font-medium placeholder:richtext-text-muted-foreground focus-visible:richtext-outline-none  disabled:richtext-cursor-not-allowed disabled:richtext-opacity-50",
        e
      ),
      ref: n,
      ...i
    }
  )
);
te.displayName = "Input";
const Po = li(
  "richtext-text-sm richtext-font-medium richtext-leading-none peer-disabled:richtext-cursor-not-allowed peer-disabled:richtext-opacity-70"
), ie = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  xn.Root,
  {
    ref: i,
    className: P(Po(), e),
    ...t
  }
));
ie.displayName = xn.Root.displayName;
const se = ot.Root, le = ot.Trigger, re = $.forwardRef(({ className: e, align: t = "center", sideOffset: i = 4, ...n }, a) => /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
  ot.Content,
  {
    ref: a,
    align: t,
    sideOffset: i,
    className: P(
      "richtext-z-50 richtext-w-72 richtext-rounded-md !richtext-border richtext-bg-popover richtext-p-4 richtext-text-popover-foreground richtext-shadow-md richtext-outline-none data-[state=open]:richtext-animate-in data-[state=closed]:richtext-animate-out data-[state=closed]:richtext-fade-out-0 data-[state=open]:richtext-fade-in-0 data-[state=closed]:richtext-zoom-out-95 data-[state=open]:richtext-zoom-in-95 data-[side=bottom]:richtext-slide-in-from-top-2 data-[side=left]:richtext-slide-in-from-right-2 data-[side=right]:richtext-slide-in-from-left-2 data-[side=top]:richtext-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
re.displayName = ot.Content.displayName;
const fe = $.forwardRef(
  ({ className: e, orientation: t = "horizontal", decorative: i = !0, ...n }, a) => /* @__PURE__ */ r(
    pn.Root,
    {
      ref: a,
      decorative: i,
      orientation: t,
      className: P(
        "richtext-shrink-0 richtext-bg-border",
        t === "horizontal" ? "richtext-h-[1px] richtext-w-full" : "richtext-h-full richtext-w-[1px]",
        e
      ),
      ...n
    }
  )
);
fe.displayName = pn.Root.displayName;
const bi = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  Gt.Root,
  {
    className: P(
      "richtext-peer richtext-inline-flex richtext-h-6 richtext-w-11 richtext-shrink-0 richtext-cursor-pointer richtext-items-center richtext-rounded-full richtext-border-2 richtext-border-transparent richtext-transition-colors focus-visible:richtext-outline-none focus-visible:richtext-ring-2 focus-visible:richtext-ring-ring focus-visible:richtext-ring-offset-2 focus-visible:richtext-ring-offset-background disabled:richtext-cursor-not-allowed disabled:richtext-opacity-50 data-[state=checked]:richtext-bg-primary data-[state=unchecked]:richtext-bg-input",
      e
    ),
    ...t,
    ref: i,
    children: /* @__PURE__ */ r(
      Gt.Thumb,
      {
        className: P(
          "richtext-pointer-events-none richtext-block richtext-h-5 richtext-w-5 richtext-rounded-full richtext-bg-background richtext-shadow-lg richtext-ring-0 richtext-transition-transform data-[state=checked]:richtext-translate-x-5 data-[state=unchecked]:richtext-translate-x-0"
        )
      }
    )
  }
));
bi.displayName = Gt.Root.displayName;
const pi = Ie.Root, Ot = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  Ie.List,
  {
    ref: i,
    className: P(
      "richtext-inline-flex richtext-h-10 richtext-items-center richtext-justify-center richtext-rounded-md richtext-bg-muted richtext-p-1 richtext-text-muted-foreground",
      e
    ),
    ...t
  }
));
Ot.displayName = Ie.List.displayName;
const Ge = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  Ie.Trigger,
  {
    ref: i,
    className: P(
      "richtext-inline-flex richtext-items-center richtext-justify-center richtext-whitespace-nowrap richtext-rounded-sm richtext-px-3 richtext-py-1.5 richtext-text-sm richtext-font-medium richtext-ring-offset-background richtext-transition-all focus-visible:richtext-outline-none focus-visible:richtext-ring-2 focus-visible:richtext-ring-ring focus-visible:richtext-ring-offset-2 disabled:richtext-pointer-events-none disabled:richtext-opacity-50 data-[state=active]:richtext-bg-background data-[state=active]:richtext-text-foreground data-[state=active]:richtext-shadow-sm",
      e
    ),
    ...t
  }
));
Ge.displayName = Ie.Trigger.displayName;
const Xe = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  Ie.Content,
  {
    ref: i,
    className: P(
      "richtext-mt-2 richtext-ring-offset-background focus-visible:richtext-outline-none focus-visible:richtext-ring-2 focus-visible:richtext-ring-ring focus-visible:richtext-ring-offset-2",
      e
    ),
    ...t
  }
));
Xe.displayName = Ie.Content.displayName;
const Do = li(
  "richtext-inline-flex richtext-items-center richtext-justify-center richtext-rounded-md richtext-text-sm richtext-font-medium richtext-ring-offset-background richtext-transition-colors hover:richtext-bg-muted hover:richtext-text-muted-foreground focus-visible:richtext-outline-none focus-visible:richtext-ring-2 focus-visible:richtext-ring-ring focus-visible:richtext-ring-offset-2 disabled:richtext-pointer-events-none disabled:richtext-opacity-50 data-[state=on]:richtext-bg-accent data-[state=on]:richtext-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "richtext-bg-transparent",
        outline: "richtext-border richtext-border-input richtext-bg-transparent hover:richtext-bg-accent hover:richtext-text-accent-foreground"
      },
      size: {
        default: "richtext-h-10 richtext-px-3",
        sm: "richtext-h-9 richtext-px-2",
        lg: "richtext-h-11 richtext-px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ut = $.forwardRef(({ className: e, variant: t, size: i, ...n }, a) => /* @__PURE__ */ r(
  wn.Root,
  {
    ref: a,
    className: P(Do({ variant: t, size: i, className: e })),
    ...n
  }
));
ut.displayName = wn.Root.displayName;
const Bo = lt.Provider, Je = lt.Root, Qe = lt.Trigger, Ee = $.forwardRef(({ className: e, sideOffset: t = 4, ...i }, n) => /* @__PURE__ */ r(
  lt.Content,
  {
    ref: n,
    sideOffset: t,
    className: P(
      "richtext-z-50 richtext-overflow-hidden richtext-rounded-md !richtext-border richtext-bg-popover richtext-px-3 richtext-py-1.5 richtext-text-sm richtext-text-popover-foreground richtext-shadow-md richtext-animate-in richtext-fade-in-0 richtext-zoom-in-95 data-[side=bottom]:richtext-slide-in-from-top-2 data-[side=left]:richtext-slide-in-from-right-2 data-[side=right]:richtext-slide-in-from-left-2 data-[side=top]:richtext-slide-in-from-bottom-2",
      e
    ),
    ...i
  }
));
Ee.displayName = lt.Content.displayName;
const $o = X.Root, Vo = X.Value, vn = $.forwardRef(({ className: e, children: t, ...i }, n) => /* @__PURE__ */ m(
  X.Trigger,
  {
    ref: n,
    className: P(
      "richtext-flex richtext-h-10 richtext-w-full richtext-items-center richtext-justify-between richtext-rounded-md richtext-border richtext-border-input richtext-bg-background richtext-px-3 richtext-py-2 richtext-text-sm richtext-ring-offset-background placeholder:richtext-text-muted-foreground focus:richtext-outline-none focus:richtext-ring-2 focus:richtext-ring-ring focus:richtext-ring-offset-2 disabled:richtext-cursor-not-allowed disabled:richtext-opacity-50 [&>span]:richtext-line-clamp-1",
      e
    ),
    ...i,
    children: [
      t,
      /* @__PURE__ */ r(X.Icon, { asChild: !0, children: /* @__PURE__ */ r(St, { className: "richtext-h-4 richtext-w-4 richtext-opacity-50" }) })
    ]
  }
));
vn.displayName = X.Trigger.displayName;
const yn = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  X.ScrollUpButton,
  {
    ref: i,
    className: P(
      "richtext-flex richtext-cursor-default richtext-items-center richtext-justify-center richtext-py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(Qi, { className: "richtext-h-4 richtext-w-4" })
  }
));
yn.displayName = X.ScrollUpButton.displayName;
const kn = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  X.ScrollDownButton,
  {
    ref: i,
    className: P(
      "richtext-flex richtext-cursor-default richtext-items-center richtext-justify-center richtext-py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(St, { className: "richtext-h-4 richtext-w-4" })
  }
));
kn.displayName = X.ScrollDownButton.displayName;
const Cn = $.forwardRef(({ className: e, children: t, position: i = "popper", ...n }, a) => /* @__PURE__ */ r(X.Portal, { children: /* @__PURE__ */ m(
  X.Content,
  {
    ref: a,
    className: P(
      "richtext-relative richtext-z-50 richtext-max-h-60 richtext-overflow-y-auto richtext-min-w-[8rem] richtext-overflow-hidden richtext-rounded-md richtext-border richtext-bg-popover richtext-text-popover-foreground richtext-shadow-md data-[state=open]:richtext-animate-in data-[state=closed]:richtext-animate-out data-[state=closed]:richtext-fade-out-0 data-[state=open]:richtext-fade-in-0 data-[state=closed]:richtext-zoom-out-95 data-[state=open]:richtext-zoom-in-95 data-[side=bottom]:richtext-slide-in-from-top-2 data-[side=left]:richtext-slide-in-from-right-2 data-[side=right]:richtext-slide-in-from-left-2 data-[side=top]:richtext-slide-in-from-bottom-2",
      i === "popper" && "data-[side=bottom]:richtext-translate-y-1 data-[side=left]:richtext--translate-x-1 data-[side=right]:richtext-translate-x-1 data-[side=top]:richtext--translate-y-1",
      e
    ),
    position: i,
    ...n,
    children: [
      /* @__PURE__ */ r(yn, {}),
      /* @__PURE__ */ r(
        X.Viewport,
        {
          className: P(
            "richtext-p-1",
            i === "popper" && "richtext-h-[var(--radix-select-trigger-height)] richtext-w-full richtext-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ r(kn, {})
    ]
  }
) }));
Cn.displayName = X.Content.displayName;
const Fo = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  X.Label,
  {
    ref: i,
    className: P("richtext-py-1.5 richtext-pl-8 richtext-pr-2 richtext-text-sm richtext-font-semibold", e),
    ...t
  }
));
Fo.displayName = X.Label.displayName;
const Yt = $.forwardRef(({ className: e, children: t, ...i }, n) => /* @__PURE__ */ m(
  X.Item,
  {
    ref: n,
    className: P(
      "richtext-relative richtext-flex richtext-w-full richtext-cursor-default richtext-select-none richtext-items-center richtext-rounded-sm richtext-py-1.5 richtext-pl-8 richtext-pr-2 richtext-text-sm richtext-outline-none focus:richtext-bg-accent focus:richtext-text-accent-foreground data-[disabled]:richtext-pointer-events-none data-[disabled]:richtext-opacity-50",
      e
    ),
    ...i,
    children: [
      /* @__PURE__ */ r("span", { className: "richtext-absolute richtext-left-2 richtext-flex richtext-h-3.5 richtext-w-3.5 richtext-items-center richtext-justify-center", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(ri, { className: "richtext-h-4 richtext-w-4" }) }) }),
      /* @__PURE__ */ r(X.ItemText, { children: t })
    ]
  }
));
Yt.displayName = X.Item.displayName;
const jo = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  X.Separator,
  {
    ref: i,
    className: P("richtext--mx-1 richtext-my-1 richtext-h-px richtext-bg-muted", e),
    ...t
  }
));
jo.displayName = X.Separator.displayName;
const Nn = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  qt.Root,
  {
    ref: i,
    className: P(
      "!richtext-peer !richtext-h-4 !richtext-w-4 !richtext-p-0 !richtext-shrink-0 !richtext-rounded-sm !richtext-border !richtext-border-primary !richtext-ring-offset-background focus-visible:!richtext-outline-none focus-visible:!richtext-ring-2 focus-visible:!richtext-ring-ring focus-visible:!richtext-ring-offset-2 disabled:!richtext-cursor-not-allowed disabled:!richtext-opacity-50 data-[state=checked]:!richtext-bg-primary data-[state=checked]:!richtext-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(
      qt.Indicator,
      {
        className: P("!richtext-flex !richtext-p-0 !richtext-items-center !richtext-justify-center !richtext-text-current"),
        children: /* @__PURE__ */ r(ri, { className: "!richtext-h-4 !richtext-w-4" })
      }
    )
  }
));
Nn.displayName = qt.Root.displayName;
function Uo({ editor: e, ...t }) {
  const i = dt(e, Ve.name, {
    text: "",
    defaultShowPicker: !1
  }), { text: n, defaultShowPicker: a } = i, [o, c] = p(""), [s, d] = p(!1), l = A(() => e.isActive(Ve.name), [e]), h = A(() => Ye(Ve.name, e), [e]), u = A(() => {
    e.chain().focus().setKatex({ text: o }).run(), d(!1);
  }, [e, o]);
  z(() => {
    a && (d(!0), e.chain().updateAttributes(Ve.name, { defaultShowPicker: !1 }).focus().run());
  }, [e, a, d]), z(() => {
    s && c(n || "");
  }, [s]);
  const f = D(() => {
    try {
      return gi.renderToString(`${o}`);
    } catch {
      return o;
    }
  }, [o]), g = D(
    () => `${o}`.trim() ? /* @__PURE__ */ r("span", { contentEditable: !1, dangerouslySetInnerHTML: { __html: f || "" } }) : null,
    [o, f]
  );
  return /* @__PURE__ */ r(
    ce,
    {
      editor: e,
      pluginKey: "Katex-bubble-menu",
      shouldShow: l,
      tippyOptions: {
        popperOptions: {
          modifiers: [{ name: "flip", enabled: !1 }]
        },
        placement: "bottom-start",
        offset: [-2, 16],
        zIndex: 9999,
        onHidden: () => {
          d(!1);
        }
      },
      children: t != null && t.disabled ? /* @__PURE__ */ r(K, {}) : /* @__PURE__ */ r("div", { className: "richtext-p-2 richtext-bg-white !richtext-border richtext-rounded-lg richtext-shadow-sm dark:richtext-bg-black richtext-border-neutral-200 dark:richtext-border-neutral-800", children: s ? /* @__PURE__ */ m(K, { children: [
        /* @__PURE__ */ r(
          ht,
          {
            value: o,
            onChange: (x) => c(x.target.value),
            autoFocus: !0,
            placeholder: "Formula text",
            rows: 3,
            defaultValue: n,
            style: { marginBottom: 8 }
          }
        ),
        g && /* @__PURE__ */ r("div", { className: "richtext-my-[10px] richtext-p-[10px] richtext-rounded-[6px] !richtext-border-[1px] richtext-whitespace-nowrap richtext-overflow-auto", children: g }),
        /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-justify-between richtext-gap-[6px]", children: [
          /* @__PURE__ */ r(U, { onClick: u, className: "richtext-flex-1", children: "Submit" }),
          /* @__PURE__ */ r("a", { href: "https://katex.org/docs/supported", target: "_blank", rel: "noreferrer noopener", children: /* @__PURE__ */ r(en, { size: 16 }) })
        ] })
      ] }) : /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-justify-center richtext-gap-[6px]", children: [
        /* @__PURE__ */ r(_, { tooltip: "Edit", action: () => d(!s), children: /* @__PURE__ */ r(tn, { size: 16 }) }),
        /* @__PURE__ */ r(_, { tooltip: "Delete", action: h, children: /* @__PURE__ */ r(nn, { size: 16 }) })
      ] }) })
    }
  );
}
function Wo(e) {
  return e = e || /* @__PURE__ */ new Map(), {
    /**
     * A Map of event names to registered handler functions.
     */
    all: e,
    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on(t, i) {
      const n = e.get(t);
      n ? n.push(i) : e.set(t, [i]);
    },
    /**
     * Remove an event handler for the given type.
     * If `handler` is omitted, all handlers of the given type are removed.
     * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
     * @param {Function} [handler] Handler function to remove
     * @memberOf mitt
     */
    off(t, i) {
      const n = e.get(t);
      n && (i ? n.splice(n.indexOf(i) >>> 0, 1) : e.set(t, []));
    },
    /**
     * Invoke all handlers for the given type.
     * If present, `'*'` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing '*' handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit(t, i) {
      let n = e.get(t);
      n && [...n].map((a) => {
        a(i);
      }), n = e.get("*"), n && [...n].map((a) => {
        a(t, i);
      });
    }
  };
}
const Ko = { padding: "0 12px 12px" }, Tn = ({ width: e, maxWidth: t, height: i, onOk: n, children: a }) => {
  const { t: o } = V(), [c, s] = p({
    width: "",
    height: "",
    maxWidth: ""
  });
  z(() => {
    s({
      width: e,
      height: i,
      maxWidth: t
    });
  }, [i, t, e]);
  function d(l) {
    l.preventDefault(), l.stopPropagation(), n(c);
  }
  return /* @__PURE__ */ m(se, { modal: !0, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: a }),
    /* @__PURE__ */ r(re, { children: /* @__PURE__ */ r("div", { style: Ko, children: /* @__PURE__ */ m("form", { className: "richtext-flex richtext-flex-col richtext-gap-2", onSubmit: d, children: [
      /* @__PURE__ */ r(ie, { className: "mb-[6px]", children: "Width" }),
      /* @__PURE__ */ r("div", { className: "richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5", children: /* @__PURE__ */ r("div", { className: "richtext-relative richtext-items-center richtext-w-full richtext-max-w-sm", children: /* @__PURE__ */ r(
        te,
        {
          type: "number",
          value: c.width,
          required: !0,
          onChange: (l) => s({ ...c, width: l.target.value })
        }
      ) }) }),
      /* @__PURE__ */ r(ie, { className: "mb-[6px]", children: "Max Width" }),
      /* @__PURE__ */ r("div", { className: "richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5", children: /* @__PURE__ */ r("div", { className: "richtext-relative richtext-items-center richtext-w-full richtext-max-w-sm", children: /* @__PURE__ */ r(
        te,
        {
          type: "number",
          value: c.maxWidth,
          required: !0,
          onChange: (l) => s({ ...c, maxWidth: l.target.value })
        }
      ) }) }),
      /* @__PURE__ */ r(ie, { className: "mb-[6px]", children: "Height" }),
      /* @__PURE__ */ r("div", { className: "richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5", children: /* @__PURE__ */ r("div", { className: "richtext-relative richtext-items-center richtext-w-full richtext-max-w-sm", children: /* @__PURE__ */ r(
        te,
        {
          type: "number",
          value: c.height,
          required: !0,
          onChange: (l) => s({ ...c, height: l.target.value })
        }
      ) }) }),
      /* @__PURE__ */ r(U, { type: "submit", className: "richtext-self-end richtext-mt-2", children: o("editor.link.dialog.button.apply") })
    ] }) }) })
  ] });
}, qo = "_wrap_15k3c_1", Go = "_renderWrap_15k3c_7", Xo = "_title_15k3c_14", Zo = "_icon_15k3c_20", Yo = "_handlerWrap_15k3c_30", tt = {
  wrap: qo,
  renderWrap: Go,
  title: Xo,
  icon: Zo,
  handlerWrap: Yo
};
function An(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
const Jo = (e) => typeof e == "number", Qo = (e) => typeof e == "string", ec = (e) => typeof e == "function";
function tc(e, t = "px") {
  if (!e)
    return e;
  const i = Jo(e) ? String(e) : e, n = Number.parseFloat(i), a = i.match(/[a-z%]+$/i), o = a ? a[0] : t;
  return Number.isNaN(n) ? e : n + o;
}
function ic(e, t) {
  if (!e)
    return !1;
  const { extensions: i = [] } = (e == null ? void 0 : e.extensionManager) ?? {};
  return !!i.find((a) => a.name === t);
}
function Jt(e) {
  return e.map((t) => Qo(t) ? { value: t, name: t } : t);
}
const nc = 10, rc = 200, zi = 15, Ei = { width: "100%", height: "100%", maxWidth: "100%" };
function ac({ editor: e, node: t, updateAttributes: i }) {
  const n = Y(null), a = e.isActive(De.name), { data: o, width: c, height: s } = t.attrs, [d, l] = p(null), [h, u] = p(!0), [f, g] = p(null), [x, b] = p(!1), [y, T] = p(100), v = A(
    (N) => {
      N && b(!0);
    },
    [b]
  ), w = A((N) => () => {
    T(
      (I) => An(N === "minus" ? I - zi : I + zi, nc, rc)
    );
  }, []);
  z(() => {
    let N = !1;
    return import("@excalidraw/excalidraw").then((I) => {
      N || (n.current = I.exportToSvg);
    }).catch((I) => !N && g(I)).finally(() => !N && u(!1)), () => {
      N = !0;
    };
  }, [u, o]), z(() => {
    let N = !1;
    return (async () => {
      if (N || h || f || !x || !o)
        return;
      const O = await n.current(o);
      N || (O.setAttribute("width", "100%"), O.setAttribute("height", "100%"), O.setAttribute("display", "block"), l(O));
    })(), () => {
      N = !0;
    };
  }, [o, h, f, x]);
  const k = (N) => {
    i({ width: N.width, height: N.height });
  };
  return /* @__PURE__ */ r(ae, { className: ee(tt.wrap, a && tt.isActive), children: /* @__PURE__ */ r(so, { onChange: v, children: /* @__PURE__ */ r(
    bn,
    {
      size: { width: Number.parseInt(c), height: Number.parseInt(s) },
      onResizeStop: (N, I, O, M) => {
        k({
          width: Number.parseInt(c) + M.width,
          height: Number.parseInt(s) + M.height
        });
      },
      children: /* @__PURE__ */ m(
        "div",
        {
          className: ee(tt.renderWrap, "render-wrapper"),
          style: { ...Ei, overflow: "hidden" },
          children: [
            f && /* @__PURE__ */ r("div", { style: Ei, children: /* @__PURE__ */ r("p", { children: f.message || f }) }),
            h && /* @__PURE__ */ r("p", { children: "Loading..." }),
            !h && !f && x && /* @__PURE__ */ r(
              "div",
              {
                style: {
                  height: "100%",
                  maxHeight: "100%",
                  padding: 24,
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: `scale(${y / 100})`,
                  transition: "all ease-in-out .3s"
                },
                dangerouslySetInnerHTML: { __html: (d == null ? void 0 : d.outerHTML) ?? "" }
              }
            ),
            /* @__PURE__ */ r("div", { className: tt.title }),
            /* @__PURE__ */ m("div", { className: tt.handlerWrap, children: [
              /* @__PURE__ */ r(
                _,
                {
                  icon: "ZoomOut",
                  action: w("minus"),
                  tooltip: "Zoom Out"
                }
              ),
              /* @__PURE__ */ r(
                _,
                {
                  icon: "ZoomIn",
                  action: w("plus"),
                  tooltip: "Zoom In"
                }
              )
            ] })
          ]
        }
      )
    }
  ) }) });
}
const oc = Le.memo(ac, (e, t) => !!si(e.node.attrs, t.node.attrs));
function cc(e, t = "{}") {
  try {
    return JSON.stringify(e);
  } catch {
    return t;
  }
}
function sc(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return JSON.stringify({});
  }
}
function Q(e, t = !1) {
  return (i) => {
    const n = e.startsWith("data-") ? e : `data-${e}`;
    let a = decodeURIComponent(i.getAttribute(n));
    if (a == null || typeof a == "string" && a === "null")
      try {
        const s = i.outerHTML.match(/([\s\S])+?="([\s\S])+?"/g);
        s && s.length && (a = (s.map((l) => l.trim()).reduce((l, h) => {
          const u = h.indexOf("="), f = [h.slice(0, u), h.slice(u + 1).slice(1, -1)];
          return l[f[0]] = f[1], l;
        }, {})[e.toLowerCase()] || "").replaceAll("&quot;", '"'));
      } catch (c) {
        console.error("Error getDatasetAttribute ", c.message, i);
      }
    if (t)
      try {
        return JSON.parse(a);
      } catch {
        return {};
      }
    if (a.includes("%") || a.includes("auto"))
      return a;
    const o = Number.parseInt(a);
    return o !== o ? a : o;
  };
}
function lc(e) {
  const { attrs: t } = e;
  return Object.keys(t).reduce((i, n) => {
    const a = t[n];
    if (a == null)
      return i;
    let o = "";
    return typeof a == "object" ? o = sc(a) : o = a, i[n] = o, i;
  }, /* @__PURE__ */ Object.create(null));
}
const He = oe.Root, Re = oe.Trigger, dc = oe.Portal, Ln = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  oe.Overlay,
  {
    ref: i,
    className: P(
      "richtext-fixed richtext-inset-0 richtext-z-50 richtext-bg-black/80 richtext- data-[state=open]:richtext-animate-in data-[state=closed]:richtext-animate-out data-[state=closed]:richtext-fade-out-0 data-[state=open]:richtext-fade-in-0",
      e
    ),
    ...t
  }
));
Ln.displayName = oe.Overlay.displayName;
const ye = $.forwardRef(({ className: e, children: t, ...i }, n) => /* @__PURE__ */ m(dc, { children: [
  /* @__PURE__ */ r(Ln, {}),
  /* @__PURE__ */ m(
    oe.Content,
    {
      ref: n,
      className: P(
        "richtext-dialog-content richtext-fixed richtext-left-[50%] richtext-top-[50%] richtext-z-50 richtext-grid richtext-w-full richtext-max-w-lg richtext-translate-x-[-50%] richtext-translate-y-[-50%] richtext-gap-4 richtext-border richtext-bg-background richtext-p-6 richtext-shadow-lg richtext-duration-200 data-[state=open]:richtext-animate-in data-[state=closed]:richtext-animate-out data-[state=closed]:richtext-fade-out-0 data-[state=open]:richtext-fade-in-0 data-[state=closed]:richtext-zoom-out-95 data-[state=open]:richtext-zoom-in-95 data-[state=closed]:richtext-slide-out-to-left-1/2 data-[state=closed]:richtext-slide-out-to-top-[48%] data-[state=open]:richtext-slide-in-from-left-1/2 data-[state=open]:richtext-slide-in-from-top-[48%] sm:richtext-rounded-lg",
        e
      ),
      ...i,
      children: [
        t,
        /* @__PURE__ */ m(oe.Close, { className: "richtext-absolute richtext-right-4 richtext-top-4 richtext-rounded-sm richtext-opacity-70 richtext-ring-offset-background richtext-transition-opacity hover:richtext-opacity-100 focus:richtext-outline-none focus:richtext-ring-2 focus:richtext-ring-ring focus:richtext-ring-offset-2 disabled:richtext-pointer-events-none data-[state=open]:richtext-bg-accent data-[state=open]:richtext-text-muted-foreground", children: [
          /* @__PURE__ */ r(Qn, { className: "richtext-h-4 richtext-w-4" }),
          /* @__PURE__ */ r("span", { className: "richtext-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
ye.displayName = oe.Content.displayName;
function Sn({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: P(
        "richtext-flex richtext-flex-col richtext-space-y-1.5 richtext-text-center sm:richtext-text-left",
        e
      ),
      ...t
    }
  );
}
Sn.displayName = "DialogHeader";
function et({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: P(
        "richtext-flex richtext-flex-col-reverse sm:richtext-flex-row sm:richtext-justify-end sm:richtext-space-x-2",
        e
      ),
      ...t
    }
  );
}
et.displayName = "DialogFooter";
const ke = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  oe.Title,
  {
    ref: i,
    className: P(
      "richtext-text-lg richtext-font-semibold richtext-leading-none richtext-tracking-tight",
      e
    ),
    ...t
  }
));
ke.displayName = oe.Title.displayName;
const hc = $.forwardRef(({ className: e, ...t }, i) => /* @__PURE__ */ r(
  oe.Description,
  {
    ref: i,
    className: P("richtext-text-sm richtext-text-muted-foreground", e),
    ...t
  }
));
hc.displayName = oe.Description.displayName;
let $t;
function wi() {
  try {
    return $t || ($t = Wo()), $t;
  } catch {
    throw new Error("Error EventEmitter");
  }
}
const Qt = "OPEN_EXCALIDRAW_SETTING_MODAL";
function uc(e, t) {
  wi().on(e, t);
}
function mc(e, t) {
  wi().off(e, t);
}
function fc(e) {
  wi().emit(Qt, e);
}
const gc = ({ editor: e }) => {
  const [t, i] = p(null), [n, a] = p({}), [o, c] = p({ elements: [], appState: { isLoading: !1 }, files: null }), [s, d] = p(!1), [l, h] = p(!0), [u, f] = p(null), g = A(
    (T) => {
      T && import("@excalidraw/excalidraw").then((v) => {
        i(v.Excalidraw);
      }).catch(f).finally(() => h(!1));
    },
    [h]
  ), x = A((T) => {
    setTimeout(() => {
      T.refresh();
    });
  }, []), b = A((T, v, w) => {
    a({
      elements: T,
      appState: { isLoading: !1 },
      files: w
    });
  }, []), y = A(() => {
    if (!t) {
      d(!1);
      return;
    }
    e.chain().focus().setExcalidraw({ data: n }).run(), d(!1);
  }, [t, e, n, d]);
  return z(() => {
    const T = (v) => {
      d(!0), v && c(v.data);
    };
    return uc(Qt, T), () => {
      mc(Qt, T);
    };
  }, [e, d]), /* @__PURE__ */ m(
    He,
    {
      open: s,
      onOpenChange: d,
      children: [
        /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ r(
          _,
          {
            icon: "Excalidraw",
            tooltip: "Excalidraw",
            action: () => d(!0)
          }
        ) }),
        /* @__PURE__ */ m(ye, { className: "!richtext-max-w-[1300px] richtext-z-[99999]", children: [
          /* @__PURE__ */ r(ke, { children: "Excalidraw" }),
          /* @__PURE__ */ m("div", { style: { height: "100%", borderWidth: 1 }, children: [
            l && /* @__PURE__ */ r("p", { children: "Loading..." }),
            u && /* @__PURE__ */ r("p", { children: u && u.message || "Error" }),
            /* @__PURE__ */ r("div", { style: { width: "100%", height: 600 }, ref: g, children: !l && !u && t ? /* @__PURE__ */ r(t, { ref: x, onChange: b, langCode: "en", initialData: o }) : null })
          ] }),
          /* @__PURE__ */ r(et, { children: /* @__PURE__ */ r(
            U,
            {
              type: "button",
              onClick: y,
              children: "Save changes"
            }
          ) })
        ] })
      ]
    }
  );
}, Hi = { elements: [] }, De = he.create({
  name: "excalidraw",
  group: "block",
  selectable: !0,
  atom: !0,
  draggable: !0,
  inline: !1,
  addAttributes() {
    return {
      defaultShowPicker: {
        default: !1
      },
      createUser: {
        default: null
      },
      width: {
        default: "100%",
        parseHTML: Q("width")
      },
      height: {
        default: 240,
        parseHTML: Q("height")
      },
      data: {
        default: Hi,
        parseHTML: Q("data", !0)
      }
    };
  },
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      HTMLAttributes: {
        class: "excalidraw"
      },
      button: ({ editor: t }) => ({
        component: gc,
        componentProps: {
          editor: t
        }
      })
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[class=excalidraw]"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e, node: t }) {
    return ["div", ne(this.options.HTMLAttributes, e, lc(t))];
  },
  addCommands() {
    return {
      setExcalidraw: (e) => ({ tr: t, commands: i, chain: n }) => {
        var a, o, c;
        return e = e || {}, e.data = e.data || Hi, ((c = (o = (a = t.selection) == null ? void 0 : a.node) == null ? void 0 : o.type) == null ? void 0 : c.name) == this.name ? i.updateAttributes(this.name, e) : n().insertContent({
          type: this.name,
          attrs: e
        }).run();
      }
    };
  },
  addNodeView() {
    return ge(oc);
  },
  addInputRules() {
    return [
      ai({
        find: /^\$excalidraw\$$/,
        type: this.type,
        getAttributes: () => ({ width: "100%" })
      })
    ];
  }
}), Ne = /* @__PURE__ */ new Map();
function xc(e) {
  const t = e.options.element;
  Ne.has("width") || Ne.set("width", t.clientWidth), Ne.has("width") && Ne.get("width") <= 0 && Ne.set("width", t.clientWidth);
  const i = { attributes: !0, childList: !0, subtree: !0 }, n = function() {
    Ne.set("width", t.clientWidth);
  }, a = new MutationObserver(n);
  return a.observe(t, i), e.on("destroy", () => {
    a.disconnect();
  }), { width: Ne.get("width") };
}
function bc({ editor: e }) {
  const { t } = V(), { width: i } = xc(e), n = dt(e, De.name, {
    defaultShowPicker: !1,
    createUser: "",
    width: 0,
    height: 0
  }), { defaultShowPicker: a, createUser: o, width: c, height: s } = n, d = A(
    (f) => {
      e.chain().updateAttributes(De.name, f).setNodeSelection(e.state.selection.from).focus().run();
    },
    [e]
  ), l = A(() => {
    fc(n);
  }, [e, n]), h = A(() => e.isActive(De.name), [e]), u = A(() => Ye(De.name, e), [e]);
  return z(() => {
    a && (l(), e.chain().updateAttributes(De.name, { defaultShowPicker: !1 }).focus().run());
  }, [o, a, e, l]), /* @__PURE__ */ r(
    ce,
    {
      className: "bubble-menu",
      editor: e,
      pluginKey: "excalidraw-bubble-menu",
      shouldShow: h,
      tippyOptions: {
        popperOptions: {
          modifiers: [{ name: "flip", enabled: !1 }]
        },
        placement: "bottom-start",
        offset: [-2, 16],
        zIndex: 9999
        // onHidden: () => {
        //   toggleVisible(false)
        // },
      },
      children: /* @__PURE__ */ m("div", { className: "richtext-w-auto richtext-px-3 richtext-py-2 richtext-transition-all !richtext-border richtext-rounded-sm richtext-shadow-sm richtext-pointer-events-auto richtext-select-none richtext-border-neutral-200 dark:richtext-border-neutral-800 richtext-bg-background", children: [
        /* @__PURE__ */ r(
          _,
          {
            icon: "Pencil",
            action: l,
            tooltip: t("editor.edit")
          }
        ),
        /* @__PURE__ */ r(Tn, { width: c, maxWidth: i, height: s, onOk: d, children: /* @__PURE__ */ r(
          _,
          {
            icon: "Settings",
            tooltip: t("editor.settings")
          }
        ) }),
        /* @__PURE__ */ r(
          _,
          {
            icon: "Trash2",
            action: u,
            tooltip: t("editor.delete")
          }
        )
      ] })
    }
  );
}
const pc = "_wrap_5y04w_1", wc = "_handlerWrap_5y04w_11", _c = "_innerWrap_5y04w_15", vc = "_emptyWrap_5y04w_23", Ri = {
  wrap: pc,
  handlerWrap: wc,
  innerWrap: _c,
  emptyWrap: vc
}, Mn = It({
  disable: !1
});
function Pt() {
  return zt(Mn).disable;
}
const yc = {
  setDisable: (e) => {
    Mn.disable = e;
  }
};
function kc({ editor: e, node: t, updateAttributes: i }) {
  const n = Pt(), { url: a, width: o, height: c } = t.attrs, [s, d] = p("");
  function l() {
    s && e.chain().updateAttributes(Be.name, {
      url: s
    }).setNodeSelection(e.state.selection.from).focus().run();
  }
  const h = A(
    (u) => {
      i({ width: u.width, height: u.height });
    },
    [i]
  );
  return /* @__PURE__ */ m(ae, { children: [
    !a && /* @__PURE__ */ m("div", { className: "richtext-max-w-[600px] richtext-mx-[auto] richtext-my-[12px] richtext-flex richtext-items-center richtext-justify-center richtext-gap-[10px] richtext-p-[10px] richtext-border-[1px] richtext-border-solid richtext-border-[#ccc] richtext-rounded-[12px]", children: [
      /* @__PURE__ */ r(
        te,
        {
          value: s,
          onInput: (u) => d(u.target.value),
          type: "url",
          className: "richtext-flex-1",
          autoFocus: !0,
          placeholder: "Enter link"
        }
      ),
      /* @__PURE__ */ r(U, { className: "richtext-w-[60px]", onClick: l, children: "OK" })
    ] }),
    a && /* @__PURE__ */ r(
      bn,
      {
        size: { width: Number.parseInt(o), height: Number.parseInt(c) },
        onResizeStop: (u, f, g, x) => {
          h({
            width: Number.parseInt(o) + x.width,
            height: Number.parseInt(c) + x.height
          });
        },
        children: /* @__PURE__ */ r("div", { className: ee(Ri.wrap, "render-wrapper"), children: /* @__PURE__ */ r("div", { className: Ri.innerWrap, style: { pointerEvents: n ? "none" : "auto" }, children: /* @__PURE__ */ r(
          "iframe",
          {
            src: a,
            className: "richtext-my-[12px] "
          }
        ) }) })
      }
    )
  ] });
}
const Be = he.create({
  name: "iframe",
  content: "",
  marks: "",
  group: "block",
  selectable: !0,
  atom: !0,
  draggable: !0,
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      HTMLAttributes: {
        class: "iframe"
      },
      button: ({
        editor: t,
        extension: i,
        t: n
      }) => ({
        component: _,
        componentProps: {
          action: (a) => t.commands.setIframe(a),
          upload: i.options.upload,
          disabled: !t.can().setIframe({}),
          icon: "Iframe",
          tooltip: n("editor.iframe.tooltip")
        }
      })
    };
  },
  addAttributes() {
    return {
      width: {
        default: 600,
        parseHTML: Q("width")
      },
      height: {
        default: 300,
        parseHTML: Q("height")
      },
      url: {
        default: null,
        parseHTML: Q("url")
      },
      defaultShowPicker: {
        default: !1
      },
      frameborder: {
        default: 0
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "iframe"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["iframe", ne(this.options.HTMLAttributes, e)];
  },
  addCommands() {
    return {
      setIframe: (e) => ({ tr: t, commands: i, chain: n }) => {
        var o, c, s;
        if (((s = (c = (o = t.selection) == null ? void 0 : o.node) == null ? void 0 : c.type) == null ? void 0 : s.name) == this.name)
          return i.updateAttributes(this.name, e);
        const a = e || { url: "" };
        return n().insertContent({
          type: this.name,
          attrs: a
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      ai({
        find: /^\$iframe\$$/,
        type: this.type,
        getAttributes: () => ({ width: "100%" })
      })
    ];
  },
  addNodeView() {
    return ge(kc);
  }
});
function Cc({ editor: e }) {
  const { t } = V(), { width: i, height: n, url: a } = dt(e, Be.name, {
    width: 0,
    height: 0,
    url: "",
    defaultShowPicker: !1
  }), [o, c] = p(!1), [s, d] = p(""), l = A(() => {
    c(!1);
  }, [c]);
  z(() => {
    o && d(a);
  }, [o, a]);
  const h = A(() => {
    e.chain().updateAttributes(Be.name, {
      url: s
    }).setNodeSelection(e.state.selection.from).focus().run(), c(!1);
  }, [e, s, c]), u = A(() => {
    window.open(a, "_blank");
  }, [a]), f = A(() => {
    c(!0);
  }, [c]), g = A(
    (y) => {
      e.chain().updateAttributes(Be.name, y).setNodeSelection(e.state.selection.from).focus().run();
    },
    [e]
  ), x = A(() => e.isActive(Be.name) && !a, [e, a]), b = A(() => Ye(Be.name, e), [e]);
  return /* @__PURE__ */ m(K, { children: [
    /* @__PURE__ */ r(
      ce,
      {
        className: "bubble-menu",
        editor: e,
        pluginKey: "iframe-bubble-menu",
        shouldShow: x,
        tippyOptions: {
          popperOptions: {
            modifiers: [{ name: "flip", enabled: !1 }]
          },
          placement: "bottom-start",
          offset: [-2, 16],
          zIndex: 9999
          // onHidden: () => {
          //   toggleVisible(false)
          // },
        },
        children: /* @__PURE__ */ m("div", { className: "richtext-w-auto richtext-px-3 richtext-py-2 richtext-transition-all !richtext-border richtext-rounded-sm richtext-shadow-sm richtext-pointer-events-auto richtext-select-none richtext-border-neutral-200 dark:richtext-border-neutral-800 richtext-bg-background", children: [
          /* @__PURE__ */ r(
            _,
            {
              action: u,
              icon: "Eye",
              tooltip: "Visit Link"
            }
          ),
          /* @__PURE__ */ r(
            _,
            {
              action: f,
              icon: "Pencil",
              tooltip: "Open Edit Link"
            }
          ),
          /* @__PURE__ */ r(Tn, { width: i, height: n, onOk: g, children: /* @__PURE__ */ r(
            _,
            {
              icon: "Settings",
              tooltip: t("editor.settings")
            }
          ) }),
          /* @__PURE__ */ r(
            _,
            {
              action: b,
              icon: "Trash2",
              tooltip: t("editor.delete")
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ m(
      He,
      {
        open: o,
        onOpenChange: c,
        children: [
          /* @__PURE__ */ r(Re, {}),
          /* @__PURE__ */ m(ye, { children: [
            /* @__PURE__ */ r(Sn, { children: /* @__PURE__ */ r(ke, { children: "Edit Link Iframe" }) }),
            /* @__PURE__ */ r(
              te,
              {
                value: s,
                onInput: (y) => d(y.target.value),
                type: "url",
                autoFocus: !0,
                placeholder: "Enter link"
              }
            ),
            /* @__PURE__ */ m(et, { children: [
              /* @__PURE__ */ r(U, { onClick: l, children: "Cancel" }),
              /* @__PURE__ */ r(U, { onClick: h, children: "OK" })
            ] })
          ] })
        ]
      }
    )
  ] });
}
function In(e = 8) {
  return Math.random().toString(36).substring(2, e + 2);
}
function Nc(e) {
  return e.replace(/^.*\/|\..+$/g, "");
}
function Tc(e) {
  return e.split(".").pop();
}
function Ac(e) {
  return e < 1024 ? `${e} Byte` : e < 1024 * 1024 ? `${(e / 1024).toFixed(2)} KB` : `${(e / 1024 / 1024).toFixed(2)} MB`;
}
function Lc(e) {
  return e ? e === "application/pdf" ? "pdf" : e.startsWith("application/") && [".document", "word"].some((t) => e.includes(t)) ? "word" : e.startsWith("application/") && ["presentation"].some((t) => e.includes(t)) ? "excel" : e.startsWith("application/") && ["sheet"].some((t) => e.includes(t)) ? "ppt" : e.startsWith("image") ? "image" : e.startsWith("audio") ? "audio" : e.startsWith("video") ? "video" : "file" : "file";
}
function Sc(e) {
  return new Promise((t) => {
    const i = new FileReader();
    i.addEventListener(
      "load",
      () => {
        t({
          alt: e.name,
          src: i.result
        });
      },
      !1
    ), i.readAsDataURL(e);
  });
}
function _i(e, t) {
  const i = e.split(","), n = i[0].match(/:(.*?);/)[1], a = atob(i[i.length - 1]);
  let o = a.length;
  const c = new Uint8Array(o);
  for (; o--; )
    c[o] = a.charCodeAt(o);
  return new File([c], t, { type: n });
}
const Oi = `graph TB
a-->b`, Mc = ({ editor: e, attrs: t, extension: i }) => {
  const { alt: n, align: a } = t, [o, c] = p(decodeURIComponent(n ?? Oi)), [s, d] = p(""), [l, h] = p(!1), u = Y(null), f = i == null ? void 0 : i.options.upload, g = async (y) => {
    try {
      const { svg: T } = await Tt.render("mermaid-svg", y);
      d(T);
    } catch {
      d("");
    }
  }, x = () => {
    Tt.initialize({
      darkMode: !1,
      startOnLoad: !1,
      // fontFamily:'',
      fontSize: 12,
      theme: "base"
    }), g(o);
  };
  return z(() => {
    l && x();
  }, [l]), z(() => {
    l && g(o);
  }, [o]), /* @__PURE__ */ m(
    He,
    {
      open: l,
      onOpenChange: h,
      children: [
        /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ r(
          _,
          {
            icon: "Pencil",
            tooltip: "Edit Mermaid",
            action: () => h(!0)
          }
        ) }),
        /* @__PURE__ */ m(ye, { className: "!richtext-max-w-[1300px] richtext-z-[99999]", children: [
          /* @__PURE__ */ r(ke, { children: "Edit Mermaid" }),
          /* @__PURE__ */ r("div", { style: { height: "100%", border: "1px solid hsl(var(--border))" }, children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-gap-[10px] richtext-rounded-[10px] richtext-p-[10px]", children: [
            /* @__PURE__ */ r(
              ht,
              {
                className: "richtext-flex-1",
                value: o,
                onChange: (y) => c(y.target.value),
                autoFocus: !0,
                required: !0,
                rows: 10,
                defaultValue: Oi,
                placeholder: "Text",
                style: {
                  color: "hsl(var(--richtext-foreground))"
                }
              }
            ),
            /* @__PURE__ */ r(
              "div",
              {
                className: "richtext-flex-1 richtext-flex richtext-items-center richtext-justify-center richtext-rounded-[10px] richtext-p-[10px]",
                style: { height: "100%", border: "1px solid hsl(var(--border))", minHeight: 500, background: "#fff" },
                ref: u,
                dangerouslySetInnerHTML: { __html: s }
              }
            )
          ] }) }),
          /* @__PURE__ */ r(et, { children: /* @__PURE__ */ r(
            U,
            {
              type: "button",
              onClick: async () => {
                if (o !== "") {
                  if (o) {
                    const y = u.current.querySelector("svg"), { width: T, height: v } = y.getBoundingClientRect(), w = `mermaid-${In()}.svg`;
                    let k = ln(y.outerHTML);
                    if (f) {
                      const N = _i(k, w);
                      k = await f(N);
                    }
                    e == null || e.chain().focus().setMermaid(
                      {
                        type: "mermaid",
                        src: k,
                        alt: encodeURIComponent(o),
                        width: T,
                        height: v
                      },
                      !!o
                    ).run(), e == null || e.commands.setAlignImageMermaid(a);
                  }
                  h(!1);
                }
              },
              children: "Save changes"
            }
          ) })
        ] })
      ]
    }
  );
};
function Ic(e, t) {
  const [i, n] = p(void 0);
  return z(() => {
    const a = () => {
      const o = e.extensionManager.extensions.find((c) => c.name === t);
      o && n(o);
    };
    return e.on("selectionUpdate", a), e.on("transaction", a), () => {
      e.off("selectionUpdate", a), e.off("transaction", a);
    };
  }, [e, t]), i;
}
const zc = {
  maxWidth: "auto",
  zIndex: 20,
  appendTo: "parent",
  moveTransition: "transform 0.1s ease-out"
};
function Ec({ item: e, disabled: t, editor: i }) {
  var a;
  const n = e.component;
  return n ? /* @__PURE__ */ r(st, { children: e.type === "divider" ? /* @__PURE__ */ r(fe, { orientation: "vertical", className: "!richtext-mx-1 !richtext-my-2 !richtext-h-[16px]" }) : /* @__PURE__ */ r(
    n,
    {
      ...e.componentProps,
      editor: i,
      disabled: t || ((a = e == null ? void 0 : e.componentProps) == null ? void 0 : a.disabled)
    }
  ) }) : /* @__PURE__ */ r(K, {});
}
function Hc(e) {
  return e.type.name === "mermaid";
}
function Rc(e) {
  const { lang: t } = V(), i = dt(e.editor, Ji.name), n = Ic(e.editor, Ji.name), a = ({ editor: c }) => {
    const { selection: s } = c.view.state, { $from: d, to: l } = s;
    let h = !1;
    return c.view.state.doc.nodesBetween(d.pos, l, (u) => {
      if (Hc(u))
        return h = !0, !1;
    }), h;
  }, o = D(() => e.disabled ? [] : Ls(e.editor), [e.disabled, e.editor, t]);
  return /* @__PURE__ */ r(K, { children: /* @__PURE__ */ r(
    ce,
    {
      shouldShow: a,
      editor: e == null ? void 0 : e.editor,
      tippyOptions: zc,
      children: o != null && o.length ? /* @__PURE__ */ r("div", { className: "richtext-w-auto richtext-px-3 richtext-py-2 richtext-transition-all !richtext-border richtext-rounded-sm richtext-shadow-sm richtext-pointer-events-auto richtext-select-none richtext-border-neutral-200 dark:richtext-border-neutral-800 richtext-bg-background", children: /* @__PURE__ */ r("div", { className: "richtext-flex richtext-items-center richtext-flex-nowrap richtext-whitespace-nowrap richtext-h-[26px] richtext-justify-start richtext-relative", children: o == null ? void 0 : o.map((c, s) => c.type === "edit" && (i != null && i.src) ? /* @__PURE__ */ r(
        Mc,
        {
          editor: e.editor,
          attrs: i,
          extension: n
        },
        `bubbleMenu-mermaid-${s}`
      ) : /* @__PURE__ */ r(
        Ec,
        {
          item: c,
          disabled: e.disabled,
          editor: e.editor
        },
        `bubbleMenu-mermaid-${s}`
      )) }) }) : /* @__PURE__ */ r(K, {})
    }
  ) });
}
function Oc({ node: e }) {
  var n;
  const t = ((n = e == null ? void 0 : e.attrs) == null ? void 0 : n.src) || "", i = t == null ? void 0 : t.split("/").pop();
  return i ? /* @__PURE__ */ r(ae, { children: /* @__PURE__ */ r("div", { "data-twitter": "", children: /* @__PURE__ */ r(Lo, { id: i }) }) }) : null;
}
function Pc(e) {
  function t(i) {
    e.action && e.action(i);
  }
  return /* @__PURE__ */ m(se, { modal: !0, children: [
    /* @__PURE__ */ r(le, { disabled: e == null ? void 0 : e.disabled, asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        tooltip: e == null ? void 0 : e.tooltip,
        isActive: e == null ? void 0 : e.isActive,
        disabled: e == null ? void 0 : e.disabled,
        children: /* @__PURE__ */ r(F, { name: e == null ? void 0 : e.icon })
      }
    ) }),
    /* @__PURE__ */ r(re, { hideWhenDetached: !0, className: "richtext-w-full", align: "start", side: "bottom", children: /* @__PURE__ */ r(zn, { editor: e.editor, onSetLink: t }) })
  ] });
}
const Dc = /(https?:\/\/)?(www\.)?x\.com\/(\w{1,15})(\/status\/(\d+))?(\/\S*)?/g, Bc = /^https?:\/\/(www\.)?x\.com\/(\w{1,15})(\/status\/(\d+))?(\/\S*)?$/;
function Pi(e) {
  return e.match(Bc);
}
const ei = he.create({
  name: "twitter",
  draggable: !0,
  selectable: !0,
  addOptions() {
    return {
      addPasteHandler: !0,
      HTMLAttributes: {},
      inline: !1,
      origin: "",
      button: ({ editor: e, t }) => ({
        component: Pc,
        componentProps: {
          action: (i) => {
            e.commands.setTweet({ src: i });
          },
          isActive: () => !1,
          disabled: !1,
          icon: "Twitter",
          tooltip: t("editor.twitter.tooltip"),
          editor: e
        }
      })
    };
  },
  addNodeView() {
    return ge(Oc, { attrs: this.options.HTMLAttributes });
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  addAttributes() {
    return {
      src: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-twitter]"
      }
    ];
  },
  addCommands() {
    return {
      setTweet: (e) => ({ commands: t }) => Pi(e.src) ? t.insertContent({
        type: this.name,
        attrs: e
      }) : !1,
      updateTweet: (e) => ({ commands: t }) => Pi(e.src) ? t.updateAttributes(this.name, { src: e.src }) : !1
    };
  },
  addPasteRules() {
    return this.options.addPasteHandler ? [
      ba({
        find: Dc,
        type: this.type,
        getAttributes: (e) => ({ src: e.input })
      })
    ] : [];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["div", ne({ "data-twitter": "" }, e)];
  }
});
function zn(e) {
  const { t } = V(), [i, n] = p("");
  z(() => {
    var o;
    if (e != null && e.editor) {
      const { src: c } = (o = e.editor) == null ? void 0 : o.getAttributes(ei.name);
      c && n(c);
    }
  }, [e == null ? void 0 : e.editor]);
  function a(o) {
    o.preventDefault(), o.stopPropagation(), e == null || e.onSetLink(i);
  }
  return /* @__PURE__ */ r("div", { className: "richtext-p-2 richtext-bg-white !richtext-border richtext-rounded-lg richtext-shadow-sm dark:richtext-bg-black border-neutral-200 dark:richtext-border-neutral-800", children: /* @__PURE__ */ m("form", { className: "richtext-flex richtext-flex-col richtext-gap-2", onSubmit: a, children: [
    /* @__PURE__ */ r(ie, { className: "mb-[6px]", children: t("editor.link.dialog.text") }),
    /* @__PURE__ */ r("div", { className: "richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5 richtext-mb-[10px]", children: /* @__PURE__ */ r("div", { className: "richtext-relative richtext-items-center richtext-w-full richtext-max-w-sm", children: /* @__PURE__ */ r(
      te,
      {
        type: "text",
        value: i,
        required: !0,
        className: "richtext-w-80",
        placeholder: "Text",
        onChange: (o) => n(o.target.value)
      }
    ) }) }),
    /* @__PURE__ */ r(U, { type: "submit", className: "richtext-self-end richtext-mt-2", children: t("editor.link.dialog.button.apply") })
  ] }) });
}
function $c({ editor: e, disabled: t }) {
  const [i, n] = p(!1), { t: a } = V(), o = A(({ editor: d }) => d.isActive(ei.name), []), c = (d) => {
    e.commands.updateTweet({ src: d }), n(!1);
  }, s = A(() => Ye(ei.name, e), [e]);
  return /* @__PURE__ */ r(K, { children: /* @__PURE__ */ r(
    ce,
    {
      editor: e,
      shouldShow: o,
      tippyOptions: {
        popperOptions: {
          modifiers: [{ name: "flip", enabled: !1 }]
        },
        placement: "bottom-start",
        offset: [-2, 16],
        zIndex: 9999,
        onHidden: () => {
          n(!1);
        }
      },
      children: t ? /* @__PURE__ */ r(K, {}) : /* @__PURE__ */ r(K, { children: i ? /* @__PURE__ */ r(
        zn,
        {
          onSetLink: c,
          editor: e
        }
      ) : /* @__PURE__ */ r("div", { className: "richtext-flex richtext-items-center richtext-gap-2 richtext-p-2 richtext-bg-white !richtext-border richtext-rounded-lg richtext-shadow-sm dark:richtext-bg-black richtext-border-neutral-200 dark:richtext-border-neutral-800", children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-flex-nowrap", children: [
        /* @__PURE__ */ r(
          _,
          {
            icon: "Pencil",
            tooltip: a("editor.link.edit.tooltip"),
            action: () => {
              n(!0);
            },
            tooltipOptions: { sideOffset: 15 }
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            icon: "Trash",
            tooltip: a("editor.delete"),
            action: s,
            tooltipOptions: { sideOffset: 15 }
          }
        )
      ] }) }) })
    }
  ) });
}
function Vc({ editor: e, disabled: t, bubbleMenu: i }) {
  const n = e.extensionManager.extensions.map((o) => o.name), a = () => {
    var o, c, s, d, l, h, u, f, g, x, b, y, T;
    return [
      n.includes("columns") && !((o = i == null ? void 0 : i.columnConfig) != null && o.hidden) ? /* @__PURE__ */ r(Ks, { editor: e }, "columns") : null,
      n.includes("table") && !((c = i == null ? void 0 : i.tableConfig) != null && c.hidden) ? /* @__PURE__ */ r(Ps, { editor: e }, "table") : null,
      n.includes("link") && !((s = i == null ? void 0 : i.linkConfig) != null && s.hidden) ? /* @__PURE__ */ r(Bs, { editor: e, disabled: t }, "link") : null,
      n.includes("image") && !((d = i == null ? void 0 : i.imageConfig) != null && d.hidden) ? /* @__PURE__ */ r(js, { editor: e, disabled: t }, "image") : null,
      n.includes(Gn.name) && !((l = i == null ? void 0 : i.imageGifConfig) != null && l.hidden) ? /* @__PURE__ */ r(Us, { editor: e, disabled: t }, "imageGif") : null,
      n.includes("video") && !((h = i == null ? void 0 : i.videoConfig) != null && h.hidden) ? /* @__PURE__ */ r(Ws, { editor: e, disabled: t }, "video") : null,
      n.includes("katex") && !((u = i == null ? void 0 : i.katexConfig) != null && u.hidden) ? /* @__PURE__ */ r(Uo, { editor: e, disabled: t }, "katex") : null,
      n.includes("excalidraw") && !((f = i == null ? void 0 : i.excalidrawConfig) != null && f.hidden) ? /* @__PURE__ */ r(bc, { editor: e, disabled: t }, "excalidraw") : null,
      n.includes("mermaid") && !((g = i == null ? void 0 : i.mermaidConfig) != null && g.hidden) ? /* @__PURE__ */ r(Rc, { editor: e, disabled: t }, "mermaid") : null,
      n.includes("iframe") && !((x = i == null ? void 0 : i.iframeConfig) != null && x.hidden) ? /* @__PURE__ */ r(Cc, { editor: e, disabled: t }, "iframe") : null,
      n.includes("twitter") && !((b = i == null ? void 0 : i.twitterConfig) != null && b.hidden) ? /* @__PURE__ */ r($c, { editor: e, disabled: t }, "twitter") : null,
      (y = i == null ? void 0 : i.floatingMenuConfig) != null && y.hidden ? null : /* @__PURE__ */ r(Es, { editor: e, disabled: t }, "content"),
      (T = i == null ? void 0 : i.textConfig) != null && T.hidden ? null : /* @__PURE__ */ r(Os, { editor: e, disabled: t }, "text")
    ];
  };
  return i != null && i.render ? i.render({ editor: e, disabled: t || !1, bubbleMenu: i }, a()) : a().filter(Boolean);
}
function Di() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("path", { fill: "currentColor", d: "M18 14c0-4-6-10.8-6-10.8s-1.33 1.51-2.73 3.52l8.59 8.59c.09-.42.14-.86.14-1.31m-.88 3.12L12.5 12.5L5.27 5.27L4 6.55l3.32 3.32C6.55 11.32 6 12.79 6 14c0 3.31 2.69 6 6 6c1.52 0 2.9-.57 3.96-1.5l2.63 2.63l1.27-1.27z" }) });
}
function En(e) {
  const { t } = V(), {
    highlight: i = !1,
    disabled: n = !1,
    selectedColor: a,
    setSelectedColor: o,
    onChange: c,
    colors: s = go
  } = e, d = D(() => {
    const g = s, x = [];
    for (let b = 0; b < g.length; b += 10)
      x.push(g.slice(b, b + 10));
    return x;
  }, [s]), [l, h] = p([]), u = (g) => {
    const x = [...l], b = x.indexOf(g);
    b !== -1 && x.splice(b, 1), x.unshift(g), x.length > 10 && x.pop(), h(x);
  };
  function f(g) {
    if (g === void 0) {
      o == null || o(g), c == null || c(g);
      return;
    }
    /^#([\da-f]{3}){1,2}$/i.test(g) && (o == null || o(g), c == null || c(g), u(g));
  }
  return /* @__PURE__ */ m(se, { modal: !0, children: [
    /* @__PURE__ */ r(le, { className: "!richtext-p-0", disabled: n, asChild: !0, children: e == null ? void 0 : e.children }),
    /* @__PURE__ */ r(re, { hideWhenDetached: !0, className: "richtext-w-full richtext-h-full richtext-p-2", align: "start", side: "bottom", children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-flex-col", children: [
      i ? /* @__PURE__ */ m(
        "div",
        {
          className: "richtext-flex richtext-items-center richtext-p-1 richtext-cursor-pointer rd-1 richtext-gap-[4px] hover:richtext-bg-accent",
          onClick: () => f(void 0),
          children: [
            /* @__PURE__ */ r(Di, {}),
            /* @__PURE__ */ r("span", { className: "richtext-ml-1 richtext-text-sm", children: t("editor.nofill") })
          ]
        }
      ) : /* @__PURE__ */ m(
        "div",
        {
          className: "richtext-flex richtext-items-center richtext-p-1 richtext-cursor-pointer rd-1 richtext-gap-[4px] hover:richtext-bg-accent",
          onClick: () => {
            f(void 0);
          },
          children: [
            /* @__PURE__ */ r(Di, {}),
            /* @__PURE__ */ r("span", { className: "richtext-ml-1 richtext-text-sm", children: t("editor.default") })
          ]
        }
      ),
      d.map((g, x) => /* @__PURE__ */ r("span", { className: "richtext-relative richtext-flex richtext-w-full richtext-h-auto richtext-p-0 last:richtext-pb-2", children: g.map((b, y) => /* @__PURE__ */ r(
        "span",
        {
          className: "richtext-w-6 richtext-h-6 richtext-p-0.5 richtext-inline-block richtext-rounded-sm !richtext-border richtext-border-transparent richtext-flex-[0_0_auto] richtext-cursor-pointer hover:richtext-border-border hover:richtext-shadow-sm",
          onClick: () => f(b),
          children: /* @__PURE__ */ r(
            "span",
            {
              style: {
                backgroundColor: b
              },
              className: "richtext-relative richtext-w-[18px] richtext-h-[18px] richtext-block richtext-rounded-[2px] richtext-border-transparent",
              children: b === a ? /* @__PURE__ */ r(
                "svg",
                {
                  className: "richtext-absolute richtext-block richtext-top-[-1px] richtext-left-[1px] richtext-w-3 richtext-h-3",
                  viewBox: "0 0 18 18",
                  style: {
                    fill: "rgb(255, 255, 255)"
                  },
                  children: /* @__PURE__ */ r("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" })
                }
              ) : /* @__PURE__ */ r(
                "svg",
                {
                  viewBox: "0 0 18 18",
                  style: {
                    fill: "rgb(255, 255, 255)",
                    display: "none"
                  },
                  children: /* @__PURE__ */ r("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" })
                }
              )
            }
          )
        },
        `sub-color-${y}`
      )) }, x)),
      /* @__PURE__ */ m("div", { children: [
        /* @__PURE__ */ r("div", { className: "richtext-my-1 richtext-text-sm", children: t("editor.recent") }),
        /* @__PURE__ */ r("span", { className: "richtext-relative richtext-flex richtext-w-full richtext-h-auto richtext-p-0 last:richtext-pb-2", children: l == null ? void 0 : l.map((g, x) => /* @__PURE__ */ r(
          "span",
          {
            className: "richtext-w-6 richtext-h-6 richtext-p-0.5 richtext-inline-block richtext-rounded-sm !richtext-border richtext-border-transparent richtext-flex-[0_0_auto] richtext-cursor-pointer hover:richtext-border-border hover:richtext-shadow-sm",
            onClick: () => f(g),
            children: /* @__PURE__ */ r(
              "span",
              {
                className: "richtext-relative richtext-w-[18px] richtext-h-[18px] richtext-block richtext-rounded-[2px] richtext-border-transparent",
                style: {
                  backgroundColor: g
                },
                children: /* @__PURE__ */ r(
                  "svg",
                  {
                    viewBox: "0 0 18 18",
                    style: {
                      fill: "rgb(255, 255, 255)",
                      display: "none"
                    },
                    children: /* @__PURE__ */ r("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" })
                  }
                )
              }
            )
          },
          `sub-color-recent-${x}`
        )) })
      ] }),
      /* @__PURE__ */ r(Fc, { setColor: f })
    ] }) })
  ] });
}
function Fc({ setColor: e }) {
  const [t, i] = p("#000000"), [n, a] = p(!1), { t: o } = V();
  return z(() => () => {
    a(!1);
  }, []), /* @__PURE__ */ m(se, { open: n, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ m(
      "div",
      {
        onClick: (c) => {
          c.preventDefault(), a(!0);
        },
        className: "richtext-text-sm hover:richtext-cursor-pointer hover:richtext-bg-accent richtext-py-1.5 richtext-px-1.5",
        children: [
          o("editor.color.more"),
          "..."
        ]
      }
    ) }),
    /* @__PURE__ */ m(re, { children: [
      /* @__PURE__ */ m("div", { className: "richtext-flex richtext-flex-col richtext-items-center richtext-justify-center", children: [
        /* @__PURE__ */ r(yo, { color: t, onChange: i }),
        /* @__PURE__ */ r(
          te,
          {
            className: "richtext-mt-[8px] richtext-w-full",
            type: "text",
            onChange: (c) => {
              c.preventDefault(), i(`#${c.target.value}`);
            },
            value: t.slice(1)
          }
        )
      ] }),
      /* @__PURE__ */ r(fe, { className: "richtext-my-[10px]" }),
      /* @__PURE__ */ r(
        U,
        {
          onClick: (c) => {
            c.preventDefault(), e(t), a(!1);
          },
          className: "richtext-w-full",
          children: /* @__PURE__ */ r(rn, { size: 16 })
        }
      )
    ] })
  ] });
}
const jc = `
.reactjs-tiptap-editor, .richtext-dialog-content {
  button,
  input:where([type=button]),
  input:where([type=reset]),
  input:where([type=submit]) {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none
  }

  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
  }

  button {
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
  }
}

.reactjs-tiptap-editor,
.richtext-dialog-content,
div[data-radix-popper-content-wrapper],
div[data-tippy-root] {
*,
:before,
:after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: hsl(var(--richtext-border));
}

background-color: hsl(var(--richtext-background));
color: hsl(var(--richtext-foreground));


html,
:host {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
  font-feature-settings: normal;
  font-variation-settings: normal;
  -webkit-tap-highlight-color: transparent
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px
}

a {
  color: inherit;
  text-decoration: inherit
}

b,
strong {
  font-weight: bolder
}

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  font-feature-settings: normal;
  font-variation-settings: normal;
  font-size: 1em
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse
}

input, textarea {
  border-width: 1px;
}

textarea {
  resize: vertical
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  color: #9ca3af
}

button, input, textarea {
  cursor: pointer;
  color: inherit;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle
}

img,
video {
  max-width: 100%;
  height: auto
}
}
`, Hn = It({
  theme: "light"
});
function Uc() {
  return zt(Hn).theme;
}
const Wc = {
  setTheme: (e) => {
    Hn.theme = e;
  }
}, Bi = "data-rc-order", $i = "data-rc-priority", Kc = "rc-util-key", ti = /* @__PURE__ */ new Map();
function qc(e, t) {
  if (!e)
    return !1;
  if (e.contains)
    return e.contains(t);
  let i = t;
  for (; i; ) {
    if (i === e)
      return !0;
    i = i.parentNode;
  }
  return !1;
}
function Rn({ mark: e } = {}) {
  return e ? e.startsWith("data-") ? e : `data-${e}` : Kc;
}
function vi(e) {
  return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function Gc(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function On(e) {
  return [...(ti.get(e) || e).children].filter(
    (t) => t.tagName === "STYLE"
  );
}
function Pn(e, t = {}) {
  const { csp: i, prepend: n, priority: a = 0 } = t, o = Gc(n), c = o === "prependQueue", s = document.createElement("style");
  s.setAttribute(Bi, o), c && a && s.setAttribute($i, `${a}`), i != null && i.nonce && (s.nonce = i == null ? void 0 : i.nonce), s.innerHTML = e;
  const d = vi(t), { firstChild: l } = d;
  if (n) {
    if (c) {
      const h = On(d).filter((u) => {
        if (!["prepend", "prependQueue"].includes(u.getAttribute(Bi)))
          return !1;
        const f = Number(u.getAttribute($i) || 0);
        return a >= f;
      });
      if (h.length > 0)
        return d.insertBefore(s, h.at(-1).nextSibling), s;
    }
    l.before(s);
  } else
    d.append(s);
  return s;
}
function Dn(e, t = {}) {
  const i = vi(t);
  return On(i).find((n) => n.getAttribute(Rn(t)) === e);
}
function Xc(e, t = {}) {
  const i = Dn(e, t);
  i && i.remove();
}
function Zc(e, t) {
  const i = ti.get(e);
  if (!i || !qc(document, i)) {
    const n = Pn("", t), { parentNode: a } = n;
    ti.set(e, a), n.remove();
  }
}
function Yc(e, t, i = {}) {
  var c, s, d;
  const n = vi(i);
  Zc(n, i);
  const a = Dn(t, i);
  if (a)
    return (c = i.csp) != null && c.nonce && a.nonce !== ((s = i.csp) == null ? void 0 : s.nonce) && (a.nonce = (d = i.csp) == null ? void 0 : d.nonce), a.innerHTML !== e && (a.innerHTML = e), a;
  const o = Pn(e, i);
  return o.setAttribute(Rn(i), t), o;
}
function Jc(e, t) {
  const { content: i, extensions: n, useEditorOptions: a = {} } = e, o = D(() => {
    const l = lo(n, n, "name");
    return [...n.map((u) => {
      const f = n.find((g) => g.name === u.name);
      return f ? u.configure(f.options) : u;
    }), ...l].map((u, f) => u.configure({ sort: f }));
  }, [n]), c = Se((l) => {
    var u;
    const h = d(l, e.output);
    (u = e == null ? void 0 : e.onChangeContent) == null || u.call(e, h);
  }, xo), s = pa({
    extensions: o,
    content: i,
    onUpdate: ({ editor: l }) => {
      console.log("edtiorxxxx", l), "virtualKeyboard" in navigator && navigator != null && navigator.virtualKeyboard && (navigator == null || navigator.virtualKeyboard.show()), c && c(l);
    },
    ...a
  });
  Lt(t, () => ({
    editor: s
  })), z(() => {
    document.documentElement.classList.toggle("dark", e.dark), Wc.setTheme(e.dark ? "dark" : "light");
  }, [e.dark]), z(() => {
    s == null || s.setEditable(!(e != null && e.disabled)), yc.setDisable(!(e != null && e.disabled));
  }, [s, e == null ? void 0 : e.disabled]), z(() => ((e == null ? void 0 : e.resetCSS) !== !1 && Yc(jc, "react-tiptap-reset"), () => {
    Xc("react-tiptap-reset");
  }), [e == null ? void 0 : e.resetCSS]);
  function d(l, h) {
    return e != null && e.removeDefaultWrapper ? h === "html" ? l.isEmpty ? "" : l.getHTML() : h === "json" ? l.isEmpty ? {} : l.getJSON() : h === "text" ? l.isEmpty ? "" : l.getText() : "" : h === "html" ? l.getHTML() : h === "json" ? l.getJSON() : h === "text" ? l.getText() : "";
  }
  return z(() => () => {
    var l;
    (l = s == null ? void 0 : s.destroy) == null || l.call(s);
  }, []), s ? /* @__PURE__ */ r("div", { style: { background: "#E1ECFE" }, className: "reactjs-tiptap-editor", children: /* @__PURE__ */ m(Bo, { delayDuration: 0, disableHoverableContent: !0, children: [
    /* @__PURE__ */ r("div", { className: "richtext-overflow-hidden", children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-flex-col richtext-max-h-full", children: [
      /* @__PURE__ */ r(
        wa,
        {
          className: `richtext-relative ${(e == null ? void 0 : e.contentClass) || ""}`,
          editor: s
        }
      ),
      !(e != null && e.hideBubble) && /* @__PURE__ */ r(
        Vc,
        {
          bubbleMenu: e == null ? void 0 : e.bubbleMenu,
          editor: s,
          disabled: e == null ? void 0 : e.disabled
        }
      )
    ] }) }),
    /* @__PURE__ */ r("div", { style: { height: 60 } }),
    !(e != null && e.hideToolbar) && /* @__PURE__ */ r(es, { editor: s, disabled: !!(e != null && e.disabled) })
  ] }) }) : /* @__PURE__ */ r(K, {});
}
const Gh = At(Jc);
function Qc() {
  const [e, t] = p(!1), [i, n] = p(0);
  return z(() => {
    const a = () => {
      if (window.visualViewport) {
        const { height: o, offsetTop: c } = window.visualViewport, s = window.innerHeight;
        o < s ? (t(!0), n(s - o - c)) : (t(!1), n(0));
      }
    };
    return window.visualViewport && (window.visualViewport.addEventListener("resize", a), window.visualViewport.addEventListener("scroll", a), a()), () => {
      window.visualViewport && (window.visualViewport.removeEventListener("resize", a), window.visualViewport.removeEventListener("scroll", a));
    };
  }, []), { isKeyboardVisible: e, keyboardOffset: i };
}
function es({ editor: e, disabled: t }) {
  const { t: i } = V(), { isKeyboardVisible: n } = Qc(), a = D(
    () => [
      "Undo2",
      "Redo2",
      "Bold",
      "Italic",
      "Type",
      "KatexIcon",
      "List",
      "ListOrdered",
      "Code2",
      "Attachment",
      "ImageUp",
      "Video"
    ],
    []
  ), o = D(() => {
    const l = [...e.extensionManager.extensions].sort((u, f) => {
      const g = u.options.sort ?? -1, x = f.options.sort ?? -1;
      return g - x;
    });
    let h = [];
    for (const u of l) {
      const {
        button: f,
        divider: g = !1,
        spacer: x = !1,
        toolbar: b = !0
      } = u.options;
      if (!f || !ec(f) || !b)
        continue;
      const y = f({
        editor: e,
        extension: u,
        t: i
      });
      if (Array.isArray(y)) {
        const T = y.map((v, w) => ({
          button: v,
          divider: w === y.length - 1 ? g : !1,
          spacer: w === 0 ? x : !1
        }));
        h = [...h, ...T];
        continue;
      }
      h.push({ button: y, divider: g, spacer: x });
    }
    return h;
  }, [e, i]), c = D(
    () => o.filter(
      (d) => {
        var l;
        return a.includes((l = d.button.componentProps) == null ? void 0 : l.icon);
      }
    ),
    [o, a]
  ), s = A((d) => {
    d.preventDefault(), d.stopPropagation();
  }, []);
  return /* @__PURE__ */ r(
    "div",
    {
      onMouseDown: s,
      onClick: s,
      style: {
        pointerEvents: t ? "none" : "auto",
        opacity: t ? 0.5 : 1,
        position: "fixed",
        height: 50,
        bottom: 0,
        width: "100%",
        overflowX: "scroll",
        scrollbarWidth: "none",
        msOverflowX: "hidden",
        background: "#F6F6F8",
        display: "flex",
        alignItems: "center"
      },
      children: /* @__PURE__ */ r(
        "div",
        {
          onMouseDown: s,
          onClick: s,
          className: "richtext-flex richtext-gap-x-1",
          children: c.map((d, l) => {
            var h, u, f;
            if (a.includes((h = d.button.componentProps) == null ? void 0 : h.icon)) {
              const g = d.button.component;
              return /* @__PURE__ */ m(
                "div",
                {
                  onClick: s,
                  onMouseDown: s,
                  className: "richtext-flex richtext-items-center",
                  children: [
                    (d == null ? void 0 : d.spacer) && /* @__PURE__ */ r(
                      fe,
                      {
                        orientation: "vertical",
                        className: "!richtext-h-[16px] !richtext-mx-[10px]"
                      }
                    ),
                    /* @__PURE__ */ r(
                      g,
                      {
                        ...d.button.componentProps,
                        disabled: t || ((f = (u = d == null ? void 0 : d.button) == null ? void 0 : u.componentProps) == null ? void 0 : f.disabled)
                      }
                    ),
                    (d == null ? void 0 : d.divider) && /* @__PURE__ */ r(
                      fe,
                      {
                        orientation: "vertical",
                        className: "!richtext-h-auto !richtext-mx-2"
                      }
                    )
                  ]
                },
                `toolbar-item-${l}`
              );
            }
            return /* @__PURE__ */ r(Le.Fragment, {}, `toolbar-item-${l}`);
          })
        }
      )
    }
  );
}
function ts(e) {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ r(
    "path",
    {
      fill: "currentColor",
      d: "M19 12h-2v3h-3v2h5zM7 9h3V7H5v5h2zm14-6H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H3V5h18z"
    }
  ) });
}
function is(e) {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ r(
    "path",
    {
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M6 15h15m0 4H6m9-8h6m0-4h-6M9 9h1a1 1 0 1 1-1 1V7.5a2 2 0 0 1 2-2M3 9h1a1 1 0 1 1-1 1V7.5a2 2 0 0 1 2-2"
    }
  ) });
}
function ns() {
  return /* @__PURE__ */ r(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      "aria-hidden": "true",
      role: "img",
      className: "richtext-w-4 richtext-h-4",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ r(
        "path",
        {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "1.5",
          d: "M5.5 3c1.404 0 2.107 0 2.611.38c.219.164.406.375.552.62C9 4.568 9 5.358 9 6.938v10.125c0 1.58 0 2.37-.337 2.937a2.1 2.1 0 0 1-.552.621c-.504.38-1.207.38-2.611.38s-2.107 0-2.611-.38a2.1 2.1 0 0 1-.552-.62C2 19.432 2 18.642 2 17.062V6.938c0-1.58 0-2.37.337-2.938a2.1 2.1 0 0 1 .552-.62C3.393 3 4.096 3 5.5 3M20 11.938v5.124c0 1.58 0 2.37-.337 2.938a2.1 2.1 0 0 1-.552.62c-.504.38-1.207.38-2.611.38s-2.107 0-2.611-.38a2.1 2.1 0 0 1-.552-.62C13 19.433 13 18.642 13 17.063V6.938c0-1.58 0-2.37.337-2.938M22 9l-6-6m6 0l-6 6",
          color: "currentColor"
        }
      )
    }
  );
}
function rs() {
  return /* @__PURE__ */ r(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      "aria-hidden": "true",
      role: "img",
      className: "richtext-w-4 richtext-h-4",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ r(
        "path",
        {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "1.5",
          d: "M21 18.5c0 1.404 0 2.107-.38 2.611a2.1 2.1 0 0 1-.62.552c-.567.337-1.358.337-2.937.337H6.938c-1.58 0-2.37 0-2.938-.337a2.1 2.1 0 0 1-.62-.552C3 20.607 3 19.904 3 18.5s0-2.107.38-2.611c.163-.218.374-.406.62-.552C4.567 15 5.357 15 6.938 15h10.125c1.58 0 2.37 0 2.937.337c.246.146.457.334.62.552c.38.504.38 1.207.38 2.611M12.063 4H6.937C5.358 4 4.568 4 4 4.337a2.1 2.1 0 0 0-.62.552C3 5.393 3 6.096 3 7.5s0 2.107.38 2.611c.163.218.374.406.62.552C4.567 11 5.357 11 6.938 11h10.125c1.58 0 2.37 0 2.937-.337M21 8l-6-6m6 0l-6 6",
          color: "currentColor"
        }
      )
    }
  );
}
function as(e) {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ r(
    "path",
    {
      fill: "currentColor",
      d: "M14 2H6a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V8zm4 18H6V4h7v5h5zm-.65-10l-2.1 9h-1.4l-1.8-6.79l-1.8 6.79h-1.4l-2.2-9h1.5l1.4 6.81l1.8-6.81h1.3l1.8 6.81l1.4-6.81z"
    }
  ) });
}
function F(e) {
  const t = mt[e.name];
  return t ? /* @__PURE__ */ r(t, { onClick: e == null ? void 0 : e.onClick, className: `richtext-w-4 richtext-h-4 ${(e == null ? void 0 : e.className) || ""}` }) : null;
}
function os(e) {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ r(
    "path",
    {
      fill: "currentColor",
      d: "M21 22H3v-2h18zm0-18H3V2h18zm-11 9.7h4l-2-5.4zM11.2 6h1.7l4.7 12h-2l-.9-2.6H9.4L8.5 18h-2z"
    }
  ) });
}
function Bn(e) {
  return /* @__PURE__ */ r(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      "aria-hidden": "true",
      role: "img",
      width: "1em",
      height: "1em",
      viewBox: "0 0 48 48",
      ...e,
      children: /* @__PURE__ */ r(
        "path",
        {
          fill: "currentColor",
          stroke: "currentColor",
          strokeLinejoin: "round",
          strokeWidth: 4,
          d: "M36 19L24 31L12 19z"
        }
      )
    }
  );
}
function cs(e) {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ r("path", { fill: "currentColor", d: "M9 7v10h6v-2h-4V7z" }) });
}
function ss(e) {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ r(
    "path",
    {
      fill: "currentColor",
      d: "M9 7c-1.1 0-2 .9-2 2v8h2V9h2v7h2V9h2v8h2V9a2 2 0 0 0-2-2z"
    }
  ) });
}
function ls(e) {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ r(
    "path",
    {
      fill: "currentColor",
      d: "M11 7c-1.1 0-2 .9-2 2v2a2 2 0 0 0 2 2h2v2H9v2h4c1.11 0 2-.89 2-2v-2a2 2 0 0 0-2-2h-2V9h4V7z"
    }
  ) });
}
function ds() {
  return /* @__PURE__ */ r(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      "aria-hidden": "true",
      role: "img",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ r(
        "path",
        {
          fill: "currentColor",
          d: "M14 2H6a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V8zm4 18H6V4h7v5h5zm-.65-10l-2.1 9h-1.4l-1.8-6.79l-1.8 6.79h-1.4l-2.2-9h1.5l1.4 6.81l1.8-6.81h1.3l1.8 6.81l1.4-6.81z"
        }
      )
    }
  );
}
function $n() {
  return /* @__PURE__ */ m("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 32 32", children: [
    /* @__PURE__ */ r("path", { fill: "currentColor", d: "M30 18v-2h-6v10h2v-4h3v-2h-3v-2zm-11 8h-4V16h4a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3m-2-2h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2zm-6-8H6v10h2v-3h3a2.003 2.003 0 0 0 2-2v-3a2 2 0 0 0-2-2m-3 5v-3h3l.001 3z" }),
    /* @__PURE__ */ r("path", { fill: "currentColor", d: "M22 14v-4a.91.91 0 0 0-.3-.7l-7-7A.9.9 0 0 0 14 2H4a2.006 2.006 0 0 0-2 2v24a2 2 0 0 0 2 2h16v-2H4V4h8v6a2.006 2.006 0 0 0 2 2h6v2Zm-8-4V4.4l5.6 5.6Z" })
  ] });
}
function Vn() {
  return /* @__PURE__ */ m(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      className: "icon",
      viewBox: "0 0 1024 1024",
      children: [
        /* @__PURE__ */ r(
          "path",
          {
            fill: "currentColor",
            d: "M679.253 402.364 618.77 561.015l-60.348-158.651a30.04 30.04 0 0 0-30.447-18.637 29.76 29.76 0 0 0-30.447 18.637l-60.416 158.651-60.416-158.651a30.515 30.515 0 0 0-38.843-17.272 28.945 28.945 0 0 0-17.954 37.547l88.815 233.267c4.369 11.469 15.7 19.115 28.398 19.115a30.31 30.31 0 0 0 28.468-19.115l62.395-163.908 62.396 163.84c4.437 11.605 15.701 19.183 28.4 19.183a30.31 30.31 0 0 0 28.466-19.115l88.747-233.267a28.945 28.945 0 0 0-17.886-37.547 30.447 30.447 0 0 0-38.912 17.272zm219.478 395.605-51.883-29.218c-28.672-16.18-52.224-3.072-52.224 29.082v.273H643.209a29.833 29.833 0 0 0-30.31 29.354c0 16.18 13.584 29.218 30.31 29.218h151.825c1.092 30.516 24.03 43.077 52.224 27.648l51.063-27.989c29.013-15.906 29.15-42.189.41-58.368"
          }
        ),
        /* @__PURE__ */ r(
          "path",
          {
            fill: "currentColor",
            d: "m810.667 913.135-.478.068H201.796c-19.865 0-36.727-11.673-36.727-25.6v-618.36h154.965c51.268 0 92.911-39.39 92.911-87.858v-87.86H810.19c19.797 0 36.522 11.742 36.522 25.669V739.26h61.987V119.262c0-46.421-44.169-84.241-98.51-84.241H328.364l-225.28 194.56v658.09c0 46.285 44.236 84.105 98.713 84.105H810.19c43.759 0 80.554-24.713 93.32-58.573h-92.842zM350.89 94.89v86.562c0 16.11-13.858 29.286-30.925 29.286H216.815L350.959 94.891z"
          }
        )
      ]
    }
  );
}
function hs() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m-9 8h4m-2-2v4" }) });
}
function us() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m9 8h4m-2-2v4" }) });
}
function ms() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("path", { fill: "currentColor", d: "M23.943 19.806a.2.2 0 0 0-.168-.034c-1.26-1.855-2.873-3.61-4.419-5.315l-.252-.284c-.001-.073-.067-.12-.134-.15l-.084-.084c-.05-.1-.169-.167-.286-.1c-.47.234-.907.585-1.327.919c-.554.434-1.109.87-1.63 1.354a5 5 0 0 0-.588.618c-.084.117-.017.217.084.267c-.37.368-.74.736-1.109 1.12a.2.2 0 0 0-.05.134c0 .05.033.1.067.117l.655.502v.016c.924.92 2.554 2.173 4.285 3.527c.251.201.52.402.773.602c.117.134.234.285.335.418c.05.066.169.084.236.033c.033.034.084.067.118.1a.24.24 0 0 0 .1.034a.15.15 0 0 0 .135-.066a.24.24 0 0 0 .033-.1c.017 0 .017.016.034.016a.2.2 0 0 0 .134-.05l3.058-3.327c.12-.116.014-.267 0-.267m-7.628-.134l-1.546-1.17l-.15-.1c-.035-.017-.068-.05-.102-.067l-.117-.1c.66-.66 1.33-1.308 2-1.956c-.488.484-1.463 1.906-1.261 2.373c.002 0 .018.042.067.084zm4.1 3.126l-1.277-.97a27 27 0 0 0-1.58-1.504c.69.518 1.277.97 1.361 1.053c.673.585.638.485 1.093.87l.554.4c-.074.103-.151.148-.151.151m.336.25l-.034-.016a1 1 0 0 0 .152-.117zM.588 3.476c.033.217.084.435.117.636c.201 1.103.403 2.106.772 2.858l.152.568c.05.217.134.485.219.552a67 67 0 0 0 3.578 2.942a.18.18 0 0 0 .219 0s0 .016.016.016a.15.15 0 0 0 .118.05a.2.2 0 0 0 .134-.05c1.798-1.989 3.142-3.627 4.1-4.998c.068-.066.084-.167.084-.25c.067-.067.118-.151.185-.201c.067-.067.067-.184 0-.235l-.017-.016c0-.033-.017-.084-.05-.1c-.42-.401-.722-.685-1.042-.986a94 94 0 0 1-2.352-2.273c-.017-.017-.034-.034-.067-.034c-.336-.117-1.025-.234-1.882-.385c-1.277-.216-3.008-.517-4.57-.986c0 0-.101 0-.118.017l-.05.05C.05.714.022.707 0 .718c.017.1.017.167.05.284c0 .033.068.301.068.334zm7.19 4.78l-.033.034a.036.036 0 0 1 .033-.034M6.553 2.238c.101.1.521.502.622.585c-.437-.2-1.529-.702-2.034-.869c.505.1 1.194.201 1.412.284M.79 1.403c.252.434.454 1.939.655 3.41c-.118-.469-.201-.936-.302-1.372C.992 2.673.84 1.988.638 1.386c.124 0 .152.021.152.017m-.286-.369c0-.016 0-.033-.017-.033c.085 0 .135.017.202.05c0 .006-.145-.017-.185-.017m23.17-.217c.017-.066-.336-.367-.219-.384c.253-.017.253-.401 0-.401c-.335.017-.688.1-1.008.15c-.587.117-1.192.234-1.78.367a80 80 0 0 0-3.949.937c-.403.117-.857.2-1.243.401c-.135.067-.118.2-.05.284c-.034.017-.051.017-.085.034c-.117.017-.218.034-.335.05c-.102.017-.152.1-.135.2c0 .017.017.05.017.067c-.706.936-1.496 1.923-2.353 2.976c-.84.969-1.73 1.989-2.62 3.042c-2.84 3.31-6.05 7.07-9.594 10.38a.16.16 0 0 0 0 .234c.016.016.033.033.05.033c-.05.05-.101.085-.152.134q-.05.05-.05.1a.4.4 0 0 0-.067.084c-.067.067-.067.184.017.234c.067.066.185.066.235-.017c.017-.017.017-.033.033-.033a.265.265 0 0 1 .37 0c.202.217.404.435.588.618l-.42-.35c-.067-.067-.184-.05-.234.016c-.068.066-.051.184.016.234l4.469 3.727c.034.034.067.034.118.034a.15.15 0 0 0 .117-.05l.101-.1c.017.016.05.016.067.016c.05 0 .084-.016.118-.05c6.049-6.05 10.922-10.614 16.5-14.693c.05-.033.067-.1.067-.15c.067 0 .118-.05.15-.117c1.026-3.125 1.228-5.9 1.295-7.27c0-.059.016-.038.016-.068c.017-.033.017-.05.017-.05a.98.98 0 0 0-.067-.619m-10.82 4.915c.268-.301.537-.619.806-.903c-1.73 2.273-4.603 5.767-8.67 9.929c2.773-3.059 5.562-6.218 7.864-9.026M5.14 23.466c-.016-.017-.016-.017 0-.017zm2.504-2.156c.135-.15.27-.284.42-.434c0 0 0 .016.017.016c-.224.198-.433.418-.437.418m.69-.668c.099-.1.14-.173.284-.318c.992-1.02 2.017-2.04 3.059-3.076l.016-.016c.252-.2.555-.418.824-.619a228 228 0 0 0-4.184 4.029M14.852 3.91c-.554.719-1.176 1.671-1.697 2.423c-1.646 2.374-6.94 8.174-7.057 8.274a1190 1190 0 0 1-4.839 4.597l-.1.1c-.085-.1-.085-.25.016-.334C8.652 11.966 13.19 6.133 15.021 3.576c-.05.116-.084.216-.168.334zm2.906 3.427c-.671-.386-.99-.987-.806-1.572l.05-.2a.8.8 0 0 1 .085-.167a1.9 1.9 0 0 1 .756-.703c.016 0 .033 0 .05-.016c-.017-.034-.017-.084-.017-.134c.017-.1.085-.167.202-.167c.202 0 .824.184 1.059.384c.067.05.134.117.202.184c.084.1.218.268.285.401c.034.017.067.184.118.268c.033.134.067.284.05.418c-.017.016 0 .116-.017.116a1.6 1.6 0 0 1-.218.619c-.03.03.006.012-.05.067a1.2 1.2 0 0 1-.32.334a1.49 1.49 0 0 1-1.26.234a2 2 0 0 0-.169-.066m4.37 1.403c0 .017-.017.05 0 .067c-.034 0-.05.017-.085.034a110 110 0 0 0-3.915 3.025c1.11-.986 2.218-1.989 3.378-2.975c.336-.301.571-.686.638-1.12l.168-1.003v-.033c.085-.201.404-.118.353.1c-.004-.001-.173.795-.537 1.905" }) });
}
function fs() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 21v-4m0-4V9m0-4V3m-2 18h4M8 5v4h11l2-2l-2-2zm6 8v4H6l-2-2l2-2z" }) });
}
function gs() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 20 20", children: /* @__PURE__ */ r("path", { fill: "currentColor", d: "M6.5 3a.75.75 0 0 1 .697.471l3 7.5a.75.75 0 0 1-1.393.557L7.992 9.5H5.008l-.811 2.028a.75.75 0 0 1-1.393-.556l3-7.5A.75.75 0 0 1 6.5 3m0 2.77L5.608 8h1.784zm8.28-1.55a.75.75 0 1 0-1.06 1.06l.72.72h-3.69a.75.75 0 0 0 0 1.5h3.69l-.72.72a.75.75 0 0 0 1.06 1.06l2-2a.75.75 0 0 0 0-1.06zm0 7.5a.75.75 0 1 0-1.06 1.06l.72.72H3.75a.75.75 0 0 0 0 1.5h10.69l-.72.72a.75.75 0 1 0 1.06 1.06l2-2a.75.75 0 0 0 0-1.06z" }) });
}
function xs() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 20 20", children: /* @__PURE__ */ r("path", { fill: "currentColor", d: "M13.5 3a.75.75 0 0 0-.697.471l-3 7.5a.75.75 0 0 0 1.393.557l.812-2.028h2.984l.811 2.028a.75.75 0 0 0 1.393-.556l-3-7.5A.75.75 0 0 0 13.5 3m0 2.77L14.392 8h-1.784zM5.22 4.22a.75.75 0 0 1 1.06 1.06L5.56 6h3.69a.75.75 0 0 1 0 1.5H5.56l.72.72a.75.75 0 0 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06zm0 7.5a.75.75 0 0 1 1.06 1.06l-.72.72h10.69a.75.75 0 0 1 0 1.5H5.56l.72.72a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06z" }) });
}
function bs() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", children: /* @__PURE__ */ m("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", color: "currentColor", children: [
    /* @__PURE__ */ r("path", { d: "M14.86 22h-4.312c-3.291 0-4.937 0-6.08-.798a4.2 4.2 0 0 1-.863-.805c-.855-1.066-.855-2.6-.855-5.67v-2.545c0-2.963 0-4.445.473-5.628c.761-1.903 2.37-3.403 4.41-4.113C8.9 2 10.49 2 13.667 2c1.816 0 2.723 0 3.448.252c1.166.406 2.085 1.263 2.52 2.35c.27.676.27 1.523.27 3.216V10" }),
    /* @__PURE__ */ r("path", { d: "M2.75 12c0-1.84 1.506-3.333 3.364-3.333c.672 0 1.464.116 2.117-.057a1.67 1.67 0 0 0 1.19-1.179c.174-.647.057-1.432.057-2.098C9.478 3.493 10.984 2 12.84 2m.002 16h2.523m-4.949-4.15c-.126-.8-.281-.801-1.61-.85h-1.01c-.557 0-1.009.448-1.009 1v3c0 .552.452 1 1.01 1h1.816c.39 0 .803-.313.803-.7v-1.1c0-.11-.113-.304-.224-.304H9.068M12.842 13h1.261m0 0h1.262m-1.262 0v4.875M21.251 13h-2.523c-.557 0-1.009.448-1.009 1v1.5m0 0V18m0-2.5h2.523" })
  ] }) });
}
function ps() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 48 48", children: /* @__PURE__ */ m("g", { fill: "none", stroke: "currentColor", strokeWidth: "4", children: [
    /* @__PURE__ */ r("circle", { cx: "10", cy: "24", r: "4" }),
    /* @__PURE__ */ r("circle", { cx: "38", cy: "10", r: "4" }),
    /* @__PURE__ */ r("circle", { cx: "38", cy: "24", r: "4" }),
    /* @__PURE__ */ r("circle", { cx: "38", cy: "38", r: "4" }),
    /* @__PURE__ */ r("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M34 38H22V10h12M14 24h20" })
  ] }) });
}
function ws() {
  return /* @__PURE__ */ r("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "m3 21l7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548", color: "currentColor" }) });
}
const mt = {
  Bold: er,
  LoaderCircle: tr,
  Italic: ir,
  Underline: nr,
  Quote: rr,
  TextQuote: is,
  Strikethrough: ar,
  Minus: or,
  Eraser: cr,
  PaintRoller: sr,
  Redo2: lr,
  Undo2: dr,
  AlignCenter: So,
  AlignJustify: Mo,
  AlignLeft: Io,
  AlignRight: zo,
  ChevronDown: St,
  Subscript: hr,
  Superscript: ur,
  Code: mr,
  Code2: fr,
  Type: gr,
  IndentIncrease: xr,
  IndentDecrease: br,
  List: pr,
  ListOrdered: wr,
  ListTodo: _r,
  Link: vr,
  ImageUp: yr,
  Video: kr,
  Maximize: Cr,
  Minimize: Nr,
  Table: Tr,
  Sparkles: Ar,
  Pencil: tn,
  Unlink: Lr,
  BetweenHorizonalEnd: Sr,
  BetweenHorizonalStart: Mr,
  BetweenVerticalStart: Ir,
  BetweenVerticalEnd: zr,
  TableCellsMerge: Er,
  TableCellsSplit: Hr,
  Trash2: nn,
  Trash: Rr,
  Replace: Ti,
  ChevronsUpDown: Or,
  LineHeight: os,
  Word: as,
  Heading1: Pr,
  Heading2: Dr,
  Heading3: Br,
  Heading4: $r,
  Heading5: Vr,
  Heading6: Fr,
  Columns2: Ai,
  Columns3: jr,
  Columns4: Ur,
  Plus: rn,
  Grip: Wr,
  Copy: an,
  Clipboard: Kr,
  PanelLeft: qr,
  PanelRight: Gr,
  Columns: Ai,
  Iframe: Xr,
  MenuDown: Bn,
  SizeS: ls,
  SizeM: ss,
  SizeL: cs,
  AspectRatio: ts,
  Emoji: Zr,
  DeleteColumn: ns,
  DeleteRow: rs,
  SearchAndReplace: Ti,
  EmojiIcon: Yr,
  KatexIcon: Jr,
  ExportPdf: $n,
  ExportWord: Vn,
  ImportWord: ds,
  ColumnAddLeft: hs,
  ColumnAddRight: us,
  BookMarked: Qr,
  Excalidraw: ms,
  ZoomIn: ea,
  ZoomOut: ta,
  Settings: ia,
  Eye: na,
  TextDirection: fs,
  LeftToRight: gs,
  RightToLeft: xs,
  Attachment: ra,
  GifIcon: bs,
  ChevronUp: Qi,
  Crop: aa,
  Mermaid: ps,
  Twitter: ws,
  FlipX: oa,
  FlipY: ca
};
function _s(e) {
  const t = ["size-small", "size-medium", "size-large"], i = [
    "SizeS",
    "SizeM",
    "SizeL"
  ];
  return t.map((n, a) => ({
    type: `image-${n}`,
    component: _,
    componentProps: {
      tooltip: j.t(`editor.${n.replace("-", ".")}.tooltip`),
      icon: i[a],
      action: () => e.commands.updateImage({ width: Nt[n] }),
      isActive: () => e.isActive("image", { width: Nt[n] })
    }
  }));
}
function vs(e) {
  const t = ["size-small", "size-medium", "size-large"], i = [
    "SizeS",
    "SizeM",
    "SizeL"
  ];
  return t.map((n, a) => ({
    type: `image-${n}`,
    component: _,
    componentProps: {
      tooltip: j.t(`editor.${n.replace("-", ".")}.tooltip`),
      icon: i[a],
      action: () => e.commands.updateImageGif({ width: Nt[n] }),
      isActive: () => e.isActive("image", { width: Nt[n] })
    }
  }));
}
function ys(e) {
  const t = ["left", "center", "right"], i = {
    left: "AlignLeft",
    center: "AlignCenter",
    right: "AlignRight"
  };
  return t.map((n) => ({
    type: `image-${n}`,
    component: _,
    componentProps: {
      tooltip: j.t(`editor.textalign.${n}.tooltip`),
      icon: i[n],
      action: () => {
        var a, o;
        return (o = (a = e.commands) == null ? void 0 : a.setAlignImage) == null ? void 0 : o.call(a, n);
      },
      isActive: () => e.isActive({ align: n }) || !1,
      disabled: !1
    }
  }));
}
function ks(e) {
  const t = ["left", "center", "right"], i = {
    left: "AlignLeft",
    center: "AlignCenter",
    right: "AlignRight"
  };
  return t.map((n) => ({
    type: `image-${n}`,
    component: _,
    componentProps: {
      tooltip: j.t(`editor.textalign.${n}.tooltip`),
      icon: i[n],
      action: () => {
        var a, o;
        return (o = (a = e.commands) == null ? void 0 : a.setAlignImageGif) == null ? void 0 : o.call(a, n);
      },
      isActive: () => e.isActive({ align: n }) || !1,
      disabled: !1
    }
  }));
}
function Cs(e) {
  const t = ["left", "center", "right"], i = {
    left: "AlignLeft",
    center: "AlignCenter",
    right: "AlignRight"
  };
  return t.map((n) => ({
    type: `image-${n}`,
    component: _,
    componentProps: {
      tooltip: j.t(`editor.textalign.${n}.tooltip`),
      icon: i[n],
      action: () => {
        var a, o;
        return (o = (a = e.commands) == null ? void 0 : a.setAlignImageMermaid) == null ? void 0 : o.call(a, n);
      },
      isActive: () => e.isActive({ align: n }) || !1,
      disabled: !1
    }
  }));
}
function Ns(e) {
  const t = ["size-small", "size-medium", "size-large"], i = [
    "SizeS",
    "SizeM",
    "SizeL"
  ];
  return t.map((n, a) => ({
    type: `video-${n}`,
    component: _,
    componentProps: {
      tooltip: j.t(`editor.${n.replace("-", ".")}.tooltip`),
      icon: i[a],
      action: () => e.commands.updateVideo({ width: Kt[n] }),
      isActive: () => e.isActive("video", { width: Kt[n] })
    }
  }));
}
function Ts(e) {
  return [
    {
      type: "flipX",
      component: _,
      componentProps: {
        editor: e,
        tooltip: j.t("editor.tooltip.flipX"),
        icon: "FlipX",
        action: () => {
          const t = e.getAttributes("image"), { flipX: i } = t;
          e.chain().focus(void 0, { scrollIntoView: !1 }).updateImage({
            flipX: !i
          }).run();
        }
      }
    },
    {
      type: "flipY",
      component: _,
      componentProps: {
        editor: e,
        tooltip: j.t("editor.tooltip.flipY"),
        icon: "FlipY",
        action: () => {
          const t = e.getAttributes("image"), { flipY: i } = t;
          e.chain().focus(void 0, { scrollIntoView: !1 }).updateImage({
            flipY: !i
          }).run();
        }
      }
    },
    ..._s(e),
    ...ys(e),
    {
      type: "remove",
      component: _,
      componentProps: {
        editor: e,
        tooltip: j.t("editor.remove"),
        icon: "Trash2",
        action: () => {
          const { state: t, dispatch: i } = e.view;
          Mt(t, i);
        }
      }
    }
  ];
}
function As(e) {
  return [
    ...vs(e),
    ...ks(e),
    {
      type: "remove",
      component: _,
      componentProps: {
        editor: e,
        tooltip: j.t("editor.remove"),
        icon: "Trash2",
        action: () => {
          const { state: t, dispatch: i } = e.view;
          Mt(t, i);
        }
      }
    }
  ];
}
function Ls(e) {
  return [
    ...Cs(e),
    {
      type: "edit",
      component: _,
      componentProps: {
        editor: e,
        tooltip: j.t("editor.edit"),
        icon: "Pencil",
        action: () => {
        }
      }
    },
    {
      type: "remove",
      component: _,
      componentProps: {
        editor: e,
        tooltip: j.t("editor.remove"),
        icon: "Trash2",
        action: () => {
          const { state: t, dispatch: i } = e.view;
          Mt(t, i);
        }
      }
    }
  ];
}
function Ss(e) {
  return [
    ...Ns(e),
    {
      type: "remove",
      component: _,
      componentProps: {
        editor: e,
        tooltip: j.t("editor.remove"),
        icon: "Trash2",
        action: () => {
          const { state: t, dispatch: i } = e.view;
          Mt(t, i);
        }
      }
    }
  ];
}
function Ms(e, t) {
  return bo.reduce((i, n) => {
    if (n === "divider" && i.length > 0)
      return [...i, {
        type: "divider",
        component: void 0,
        componentProps: {}
      }];
    const a = e.extensionManager.extensions.find((o) => o.name === n);
    return a ? [...i, a.configure().options.button({ editor: e, t, extension: a })] : i;
  }, []);
}
var Ae = /* @__PURE__ */ ((e) => (e[e.max = 7] = "max", e[e.min = 0] = "min", e[e.more = 1] = "more", e[e.less = -1] = "less", e))(Ae || {});
function Is(e, t, i) {
  return e < t ? t : e > i ? i : e;
}
function zs(e, t, i, n) {
  const { doc: a, selection: o } = e;
  if (!a || !o || !(o instanceof Me || o instanceof dn))
    return e;
  const { from: c, to: s } = o;
  return a.nodesBetween(c, s, (d, l) => {
    const h = d.type;
    return i.includes(h.name) ? (e = ii(e, l, t), !1) : !_a(d.type.name, n.extensionManager.extensions);
  }), e;
}
function ii(e, t, i) {
  if (!e.doc)
    return e;
  const n = e.doc.nodeAt(t);
  if (!n)
    return e;
  const c = Is((n.attrs.indent || 0) + i, 0, 7);
  if (c === n.attrs.indent)
    return e;
  const s = {
    ...n.attrs,
    indent: c
  };
  return e.setNodeMarkup(t, n.type, s, n.marks);
}
function Vi({ delta: e, types: t }) {
  return ({ state: i, dispatch: n, editor: a }) => {
    const { selection: o } = i;
    let { tr: c } = i;
    return c = c.setSelection(o), c = zs(c, e, t, a), c.docChanged ? (n && n(c), !0) : !1;
  };
}
function Es(e) {
  var M, S, L;
  const { pluginKey: t = ya } = e, { t: i } = V(), [n, a] = p(null), [o, c] = p(-1), s = Y(null), d = Y(null), [l, h] = p(!1), u = e.editor.extensionManager.extensions.some((C) => C.name === "textAlign"), f = e.editor.extensionManager.extensions.some((C) => C.name === "indent"), g = e.editor.extensionManager.extensions.some((C) => C.name === "clear");
  z(() => {
    s.current && !e.editor.isDestroyed && (d.current = va({
      editor: e.editor,
      element: s.current,
      pluginKey: "ContentItemMenu",
      tippyOptions: {
        offset: [-2, 16],
        zIndex: 99,
        moveTransition: "transform 0.15s ease-out"
      },
      onNodeChange: N
    }), e.editor.registerPlugin(d.current));
  }, [e.editor, s]);
  function x() {
    const C = e.editor.chain();
    C.setNodeSelection(o).unsetAllMarks(), (n == null ? void 0 : n.type.name) !== "paragraph" && C.setParagraph(), C.run();
  }
  function b() {
    e.editor.chain().focus().setNodeSelection(o).run(), document.execCommand("copy");
  }
  function y() {
    e.editor.commands.setNodeSelection(o);
    const { $anchor: C } = e.editor.state.selection, B = C.node(1) || e.editor.state.selection.node;
    e.editor.chain().setMeta("hideDragHandle", !0).insertContentAt(o + ((n == null ? void 0 : n.nodeSize) || 0), B.toJSON()).run();
  }
  function T(C) {
    e.editor.commands.setTextAlign(C);
  }
  function v() {
    const C = ii(e.editor.state.tr, o, 1);
    C.setMeta("hideDragHandle", !0), e.editor.view.dispatch && e.editor.view.dispatch(C);
  }
  function w() {
    const C = ii(e.editor.state.tr, o, -1);
    e.editor.view.dispatch && e.editor.view.dispatch(C);
  }
  function k() {
    e.editor.chain().setMeta("hideDragHandle", !0).setNodeSelection(o).deleteSelection().run();
  }
  function N(C) {
    C.node && a(C.node), c(C.pos);
  }
  function I() {
    var C;
    if (o !== -1) {
      const B = (n == null ? void 0 : n.nodeSize) || 0, R = o + B, H = (n == null ? void 0 : n.type.name) === "paragraph" && ((C = n == null ? void 0 : n.content) == null ? void 0 : C.size) === 0, E = H ? o + 2 : R + 2;
      e.editor.chain().command(({ dispatch: G, tr: J, state: ft }) => G ? (H ? J.insertText("/", o, o + 1) : J.insert(
        R,
        ft.schema.nodes.paragraph.create(null, [ft.schema.text("/")])
      ), G(J)) : !0).focus(E).run();
    }
  }
  z(() => (l ? e.editor.commands.setMeta("lockDragHandle", !0) : e.editor.commands.setMeta("lockDragHandle", !1), () => {
    e.editor.commands.setMeta("lockDragHandle", !1);
  }), [l]), z(() => () => {
    d.current && (e.editor.unregisterPlugin(t), d.current = null);
  }, []), z(() => {
    var C;
    (C = e.editor) != null && C.isDestroyed && d.current && (e.editor.unregisterPlugin(t), d.current = null);
  }, [(M = e.editor) == null ? void 0 : M.isDestroyed]);
  const O = (C) => {
    e != null && e.disabled || h(C);
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: `drag-handle [transition-property:top,_left] richtext-ease-in-out richtext-duration-200 ${e == null ? void 0 : e.className}`,
      style: {
        opacity: e != null && e.disabled ? 0 : 1,
        width: 300,
        overflowX: "auto"
      },
      ref: s,
      children: /* @__PURE__ */ m(
        "div",
        {
          style: {
            width: 300,
            overflowX: "auto"
          },
          className: "richtext-flex richtext-items-center richtext-gap-0.5 [transition-property:top,_left] richtext-ease-in-out richtext-duration-200",
          children: [
            /* @__PURE__ */ r(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: "richtext-w-7 richtext-h-7 richtext-cursor-grab",
                disabled: e == null ? void 0 : e.disabled,
                onClick: I,
                type: "button",
                children: /* @__PURE__ */ r(F, { name: "Plus", className: "richtext-text-lg richtext-text-neutral-600 dark:richtext-text-neutral-200" })
              }
            ),
            /* @__PURE__ */ m(_e, { open: l, onOpenChange: O, children: [
              /* @__PURE__ */ m("div", { className: "richtext-relative richtext-flex richtext-flex-col", children: [
                /* @__PURE__ */ m(Je, { children: [
                  /* @__PURE__ */ r(Qe, { asChild: !0, disabled: e == null ? void 0 : e.disabled, children: /* @__PURE__ */ r(
                    U,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "richtext-w-7 richtext-h-7 richtext-cursor-grab richtext-relative richtext-z-[1]",
                      disabled: e == null ? void 0 : e.disabled,
                      onMouseUp: (C) => {
                        C.preventDefault(), !(e != null && e.disabled) && h(!0);
                      },
                      type: "button",
                      children: /* @__PURE__ */ r(F, { name: "Grip", className: "richtext-text-sm dark:richtext-text-neutral-200 richtext-text-neutral-600" })
                    }
                  ) }),
                  /* @__PURE__ */ r(Ee, { children: i("editor.draghandle.tooltip") })
                ] }),
                /* @__PURE__ */ r(ve, { className: "richtext-absolute richtext-top-0 richtext-left-0 richtext-w-[28px] richtext-h-[28px] richtext-z-0" })
              ] }),
              /* @__PURE__ */ m(xe, { className: "richtext-w-48", align: "start", side: "bottom", sideOffset: 0, children: [
                /* @__PURE__ */ m(
                  de,
                  {
                    onClick: k,
                    className: "richtext-flex richtext-gap-3 focus:richtext-text-red-500 focus:richtext-bg-red-400 hover:richtext-bg-red-400 dark:hover:richtext-text-red-500 richtext-bg-opacity-10 hover:richtext-bg-opacity-20 focus:richtext-bg-opacity-30 dark:hover:richtext-bg-opacity-20",
                    children: [
                      /* @__PURE__ */ r(F, { name: "Trash2" }),
                      /* @__PURE__ */ r("span", { children: i("editor.remove") })
                    ]
                  }
                ),
                g ? /* @__PURE__ */ m(de, { className: "richtext-flex richtext-gap-3", onClick: x, children: [
                  /* @__PURE__ */ r(F, { name: "PaintRoller" }),
                  /* @__PURE__ */ r("span", { children: i("editor.clear.tooltip") })
                ] }) : null,
                /* @__PURE__ */ m(de, { className: "richtext-flex richtext-gap-3", onClick: b, children: [
                  /* @__PURE__ */ r(F, { name: "Clipboard" }),
                  /* @__PURE__ */ r("span", { children: i("editor.copyToClipboard") })
                ] }),
                /* @__PURE__ */ m(de, { className: "richtext-flex richtext-gap-3", onClick: y, children: [
                  /* @__PURE__ */ r(F, { name: "Copy" }),
                  /* @__PURE__ */ r("span", { children: i("editor.copy") })
                ] }),
                u || f ? /* @__PURE__ */ r(Rt, {}) : null,
                u ? /* @__PURE__ */ m(Ii, { children: [
                  /* @__PURE__ */ m(Xt, { className: "richtext-flex richtext-gap-3", children: [
                    /* @__PURE__ */ r(F, { name: "AlignCenter" }),
                    /* @__PURE__ */ r("span", { children: i("editor.textalign.tooltip") })
                  ] }),
                  /* @__PURE__ */ r(Mi, { children: /* @__PURE__ */ m(Zt, { children: [
                    /* @__PURE__ */ m(de, { className: "richtext-flex richtext-gap-3", onClick: () => T("left"), children: [
                      /* @__PURE__ */ r(F, { name: "AlignLeft" }),
                      /* @__PURE__ */ r("span", { children: i("editor.textalign.left.tooltip") })
                    ] }),
                    /* @__PURE__ */ m(de, { className: "richtext-flex richtext-gap-3", onClick: () => T("center"), children: [
                      /* @__PURE__ */ r(F, { name: "AlignCenter" }),
                      /* @__PURE__ */ r("span", { children: i("editor.textalign.center.tooltip") })
                    ] }),
                    /* @__PURE__ */ m(de, { className: "richtext-flex richtext-gap-3", onClick: () => T("right"), children: [
                      /* @__PURE__ */ r(F, { name: "AlignRight" }),
                      /* @__PURE__ */ r("span", { children: i("editor.textalign.right.tooltip") })
                    ] })
                  ] }) })
                ] }) : null,
                f ? /* @__PURE__ */ m(Ii, { children: [
                  /* @__PURE__ */ m(Xt, { className: "richtext-flex richtext-gap-3", children: [
                    /* @__PURE__ */ r(F, { name: "IndentIncrease" }),
                    /* @__PURE__ */ r("span", { children: i("editor.indent") })
                  ] }),
                  /* @__PURE__ */ r(Mi, { children: /* @__PURE__ */ m(Zt, { children: [
                    /* @__PURE__ */ m(
                      de,
                      {
                        className: "richtext-flex richtext-gap-3",
                        onClick: v,
                        disabled: ((S = n == null ? void 0 : n.attrs) == null ? void 0 : S.indent) >= Ae.max,
                        children: [
                          /* @__PURE__ */ r(F, { name: "IndentIncrease" }),
                          /* @__PURE__ */ r("span", { children: i("editor.indent.tooltip") })
                        ]
                      }
                    ),
                    /* @__PURE__ */ m(
                      de,
                      {
                        className: "richtext-flex richtext-gap-3",
                        onClick: w,
                        disabled: ((L = n == null ? void 0 : n.attrs) == null ? void 0 : L.indent) <= Ae.min,
                        children: [
                          /* @__PURE__ */ r(F, { name: "IndentDecrease" }),
                          /* @__PURE__ */ r("span", { children: i("editor.outdent.tooltip") })
                        ]
                      }
                    )
                  ] }) })
                ] }) : null
              ] })
            ] })
          ]
        }
      )
    }
  );
}
const Hs = {
  maxWidth: "auto",
  zIndex: 20,
  appendTo: "parent",
  moveTransition: "transform 0.1s ease-out"
};
function Rs({ item: e, disabled: t, editor: i }) {
  var a;
  const n = e.component;
  return n ? /* @__PURE__ */ r(
    n,
    {
      ...e.componentProps,
      editor: i,
      disabled: t || ((a = e == null ? void 0 : e.componentProps) == null ? void 0 : a.disabled)
    }
  ) : /* @__PURE__ */ r(K, {});
}
function Os(e) {
  const { t, lang: i } = V(), n = ({ editor: o }) => {
    const { selection: c } = o.view.state, { $from: s, to: d } = c;
    return s.pos === d ? !1 : c instanceof Me;
  }, a = D(() => e.disabled || !(e != null && e.editor) ? [] : Ms(e.editor, t), [e.disabled, e.editor, i, t]);
  return /* @__PURE__ */ r(ce, { shouldShow: n, editor: e == null ? void 0 : e.editor, tippyOptions: Hs, children: a != null && a.length ? /* @__PURE__ */ r(
    "div",
    {
      style: {
        width: 300,
        overflowX: "auto"
      },
      className: "richtext-px-3 richtext-py-2 richtext-transition-all !richtext-border richtext-rounded-sm richtext-shadow-sm richtext-pointer-events-auto richtext-select-none richtext-border-neutral-200 dark:richtext-border-neutral-800 richtext-bg-background",
      children: /* @__PURE__ */ r("div", { className: "richtext-flex richtext-items-center richtext-gap-[4px] richtext-flex-nowrap richtext-whitespace-nowrap richtext-h-[26px] richtext-justify-start richtext-relative", children: a == null ? void 0 : a.map((o, c) => (o == null ? void 0 : o.type) === "divider" ? /* @__PURE__ */ r(
        fe,
        {
          orientation: "vertical",
          className: "!richtext-mx-1 !richtext-my-2 !richtext-h-[16px]"
        },
        `bubbleMenu-divider-${c}`
      ) : /* @__PURE__ */ r(
        Rs,
        {
          item: o,
          disabled: e.disabled,
          editor: e.editor
        },
        `bubbleMenu-text-${c}`
      )) })
    }
  ) : /* @__PURE__ */ r(K, {}) });
}
function Ps({ editor: e, disabled: t }) {
  var f, g, x, b, y, T, v, w, k, N, I, O, M, S;
  const i = ({ editor: L }) => ka(L.view.state, "table"), { t: n } = V();
  function a() {
    e.chain().focus().addColumnBefore().run();
  }
  function o() {
    e.chain().focus().addColumnAfter().run();
  }
  function c() {
    e.chain().focus().deleteColumn().run();
  }
  function s() {
    e.chain().focus().addRowBefore().run();
  }
  function d() {
    e.chain().focus().addRowAfter().run();
  }
  function l() {
    e.chain().focus().deleteRow().run();
  }
  function h() {
    e.chain().focus().deleteTable().run();
  }
  return /* @__PURE__ */ r(
    ce,
    {
      editor: e,
      pluginKey: "table",
      shouldShow: i,
      updateDelay: 0,
      tippyOptions: {
        // offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: !1 }]
        },
        getReferenceClientRect: () => {
          var E;
          const {
            view: L,
            state: {
              selection: { from: C }
            }
          } = e, B = L.domAtPos(C).node;
          if (!B)
            return new DOMRect(-1e3, -1e3, 0, 0);
          const R = (E = B == null ? void 0 : B.closest) == null ? void 0 : E.call(B, ".tableWrapper");
          return R ? R.getBoundingClientRect() : new DOMRect(-1e3, -1e3, 0, 0);
        },
        plugins: [ko],
        sticky: "popper",
        placement: "auto",
        offset: [-2, 16],
        zIndex: 5550,
        appendTo: "parent"
      },
      children: t ? /* @__PURE__ */ r(K, {}) : /* @__PURE__ */ m("div", { style: { width: 300, overflowX: "auto" }, className: "richtext-flex richtext-flex-row richtext-h-full richtext-items-center richtext-leading-none richtext-gap-0.5 richtext-p-2 richtext-bg-background richtext-rounded-lg richtext-shadow-sm !richtext-border richtext-border-border", children: [
        /* @__PURE__ */ r(
          _,
          {
            icon: "BetweenHorizonalEnd",
            tooltip: n("editor.table.menu.insertColumnBefore"),
            action: a,
            "tooltip-options": {
              sideOffset: 15
            },
            disabled: !((g = (f = e == null ? void 0 : e.can()) == null ? void 0 : f.addColumnBefore) != null && g.call(f))
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            icon: "BetweenHorizonalStart",
            tooltip: n("editor.table.menu.insertColumnAfter"),
            action: o,
            "tooltip-options": {
              sideOffset: 15
            },
            disabled: !((b = (x = e == null ? void 0 : e.can()) == null ? void 0 : x.addColumnAfter) != null && b.call(x))
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            icon: "DeleteColumn",
            action: c,
            tooltip: n("editor.table.menu.deleteColumn"),
            "tooltip-options": {
              sideOffset: 15
            },
            disabled: !((T = e == null ? void 0 : (y = e.can()).deleteColumn) != null && T.call(y))
          }
        ),
        /* @__PURE__ */ r(fe, { orientation: "vertical", className: "!richtext-mx-1 !richtext-my-2 !richtext-h-[16px]" }),
        /* @__PURE__ */ r(
          _,
          {
            icon: "BetweenVerticalEnd",
            action: s,
            tooltip: n("editor.table.menu.insertRowAbove"),
            "tooltip-options": {
              sideOffset: 15
            },
            disabled: !((w = e == null ? void 0 : (v = e.can()).addRowBefore) != null && w.call(v))
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            icon: "BetweenVerticalStart",
            action: d,
            tooltip: n("editor.table.menu.insertRowBelow"),
            "tooltip-options": {
              sideOffset: 15
            },
            disabled: !((N = (k = e == null ? void 0 : e.can()) == null ? void 0 : k.addRowAfter) != null && N.call(k))
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            icon: "DeleteRow",
            action: l,
            tooltip: n("editor.table.menu.deleteRow"),
            "tooltip-options": {
              sideOffset: 15
            },
            disabled: !((O = (I = e == null ? void 0 : e.can()) == null ? void 0 : I.deleteRow) != null && O.call(I))
          }
        ),
        /* @__PURE__ */ r(fe, { orientation: "vertical", className: "!richtext-mx-1 !richtext-my-2 !richtext-h-[16px]" }),
        /* @__PURE__ */ r(
          _,
          {
            icon: "Trash2",
            tooltip: n("editor.table.menu.deleteTable"),
            action: h,
            "tooltip-options": {
              sideOffset: 15
            },
            disabled: !((S = (M = e == null ? void 0 : e.can()) == null ? void 0 : M.deleteTable) != null && S.call(M))
          }
        )
      ] })
    }
  );
}
function Fn(e) {
  const { t } = V(), [i, n] = p({
    text: "",
    link: ""
  }), [a, o] = p(!1);
  z(() => {
    var s;
    if (e != null && e.editor) {
      const { href: d, target: l } = (s = e.editor) == null ? void 0 : s.getAttributes("link"), { from: h, to: u } = e.editor.state.selection, f = e.editor.state.doc.textBetween(h, u, " ");
      n({
        link: d,
        text: f
      }), o(l === "_blank");
    }
  }, [e == null ? void 0 : e.editor]);
  function c(s) {
    s.preventDefault(), s.stopPropagation(), e == null || e.onSetLink(i.link, i.text, a);
  }
  return /* @__PURE__ */ r("div", { className: "richtext-p-2 richtext-bg-white !richtext-border richtext-rounded-lg richtext-shadow-sm dark:richtext-bg-black border-neutral-200 dark:richtext-border-neutral-800", children: /* @__PURE__ */ m("form", { className: "richtext-flex richtext-flex-col richtext-gap-2", onSubmit: c, children: [
    /* @__PURE__ */ r(ie, { className: "mb-[6px]", children: t("editor.link.dialog.text") }),
    /* @__PURE__ */ r("div", { className: "richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5 richtext-mb-[10px]", children: /* @__PURE__ */ r("div", { className: "richtext-relative richtext-items-center richtext-w-full richtext-max-w-sm", children: /* @__PURE__ */ r(
      te,
      {
        type: "text",
        value: i.text,
        required: !0,
        className: "richtext-w-80",
        placeholder: "Text",
        onChange: (s) => n({ ...i, text: s.target.value })
      }
    ) }) }),
    /* @__PURE__ */ r(ie, { className: "mb-[6px]", children: t("editor.link.dialog.link") }),
    /* @__PURE__ */ r("div", { className: "richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5", children: /* @__PURE__ */ m("div", { className: "richtext-relative richtext-items-center richtext-w-full richtext-max-w-sm", children: [
      /* @__PURE__ */ r(
        te,
        {
          type: "url",
          value: i.link,
          required: !0,
          className: "richtext-pl-10",
          onChange: (s) => n({ ...i, link: s.target.value })
        }
      ),
      /* @__PURE__ */ r("span", { className: "richtext-absolute richtext-inset-y-0 richtext-flex richtext-items-center richtext-justify-center richtext-px-2 richtext-start-0", children: /* @__PURE__ */ r(F, { className: "richtext-size-5 richtext-text-muted-foreground", name: "Link" }) })
    ] }) }),
    /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-space-x-2", children: [
      /* @__PURE__ */ r(ie, { children: t("editor.link.dialog.openInNewTab") }),
      /* @__PURE__ */ r(
        bi,
        {
          checked: a,
          onCheckedChange: (s) => {
            o(s);
          }
        }
      )
    ] }),
    /* @__PURE__ */ r(U, { type: "submit", className: "richtext-self-end richtext-mt-2", children: t("editor.link.dialog.button.apply") })
  ] }) });
}
function Ds(e) {
  const { t } = V();
  return /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-gap-2 richtext-p-2 richtext-bg-white !richtext-border richtext-rounded-lg richtext-shadow-sm dark:richtext-bg-black richtext-border-neutral-200 dark:richtext-border-neutral-800", children: [
    /* @__PURE__ */ r(
      "a",
      {
        href: e == null ? void 0 : e.link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "richtext-text-sm richtext-underline richtext-break-all",
        children: ho(e == null ? void 0 : e.link, {
          length: 50,
          omission: "…"
        })
      }
    ),
    (e == null ? void 0 : e.link) && /* @__PURE__ */ r(fe, { orientation: "vertical", className: "!richtext-h-4" }),
    /* @__PURE__ */ m("div", { className: "richtext-flex richtext-flex-nowrap", children: [
      /* @__PURE__ */ r(
        _,
        {
          icon: "Pencil",
          tooltip: t("editor.link.edit.tooltip"),
          action: () => {
            e == null || e.onEdit();
          },
          tooltipOptions: { sideOffset: 15 }
        }
      ),
      /* @__PURE__ */ r(
        _,
        {
          icon: "Unlink",
          tooltip: t("editor.link.unlink.tooltip"),
          action: () => {
            e == null || e.onClear();
          },
          tooltipOptions: { sideOffset: 15 }
        }
      )
    ] })
  ] });
}
function Bs({ editor: e, disabled: t }) {
  const [i, n] = p(!1), a = D(() => {
    const { href: d } = e.getAttributes("link");
    return d;
  }, [e]), o = A(({ editor: d }) => d.isActive("link"), []), c = (d, l, h) => {
    e.chain().extendMarkRange("link").insertContent({
      type: "text",
      text: l,
      marks: [
        {
          type: "link",
          attrs: {
            href: d,
            target: h ? "_blank" : ""
          }
        }
      ]
    }).setLink({ href: d }).focus().run(), n(!1);
  }, s = A(() => {
    e.chain().extendMarkRange("link").unsetLink().focus().run(), n(!1);
  }, [e]);
  return /* @__PURE__ */ r(K, { children: /* @__PURE__ */ r(
    ce,
    {
      editor: e,
      shouldShow: o,
      tippyOptions: {
        popperOptions: {
          modifiers: [{ name: "flip", enabled: !1 }]
        },
        placement: "bottom-start",
        offset: [-2, 16],
        zIndex: 9999,
        onHidden: () => {
          n(!1);
        }
      },
      children: t ? /* @__PURE__ */ r(K, {}) : /* @__PURE__ */ r(K, { children: i ? /* @__PURE__ */ r(Fn, { onSetLink: c, editor: e }) : /* @__PURE__ */ r(
        Ds,
        {
          editor: e,
          onClear: s,
          onEdit: () => {
            n(!0);
          },
          link: a
        }
      ) })
    }
  ) });
}
const yi = {
  maxWidth: "auto",
  zIndex: 20,
  appendTo: "parent",
  moveTransition: "transform 0.1s ease-out"
};
function ki({ item: e, disabled: t, editor: i }) {
  var a;
  const n = e.component;
  return n ? /* @__PURE__ */ r(st, { children: e.type === "divider" ? /* @__PURE__ */ r(fe, { orientation: "vertical", className: "!richtext-mx-1 !richtext-my-2 !richtext-h-[16px]" }) : /* @__PURE__ */ r(
    n,
    {
      ...e.componentProps,
      editor: i,
      disabled: t || ((a = e == null ? void 0 : e.componentProps) == null ? void 0 : a.disabled)
    }
  ) }) : /* @__PURE__ */ r(K, {});
}
function $s(e) {
  return e.type.name === "image";
}
function Vs(e) {
  return e.type.name === Gn.name;
}
function Fs(e) {
  return e.type.name === "video";
}
function js(e) {
  const { lang: t } = V(), i = ({ editor: a }) => {
    const { selection: o } = a.view.state, { $from: c, to: s } = o;
    let d = !1;
    return a.view.state.doc.nodesBetween(c.pos, s, (l) => {
      if ($s(l))
        return d = !0, !1;
    }), d;
  }, n = D(() => e.disabled ? [] : Ts(e.editor), [e.disabled, e.editor, t]);
  return /* @__PURE__ */ r(K, { children: /* @__PURE__ */ r(
    ce,
    {
      shouldShow: i,
      editor: e == null ? void 0 : e.editor,
      tippyOptions: yi,
      children: n != null && n.length ? /* @__PURE__ */ r("div", { className: "richtext-w-auto richtext-px-3 richtext-py-2 richtext-transition-all !richtext-border richtext-rounded-sm richtext-shadow-sm richtext-pointer-events-auto richtext-select-none richtext-border-neutral-200 dark:richtext-border-neutral-800 richtext-bg-background", children: /* @__PURE__ */ r("div", { className: "richtext-flex richtext-items-center richtext-flex-nowrap richtext-whitespace-nowrap richtext-h-[26px] richtext-justify-start richtext-relative", children: n == null ? void 0 : n.map((a, o) => /* @__PURE__ */ r(
        ki,
        {
          item: a,
          disabled: e.disabled,
          editor: e.editor
        },
        `bubbleMenu-image-${o}`
      )) }) }) : /* @__PURE__ */ r(K, {})
    }
  ) });
}
function Us(e) {
  const { lang: t } = V(), i = ({ editor: a }) => {
    const { selection: o } = a.view.state, { $from: c, to: s } = o;
    let d = !1;
    return a.view.state.doc.nodesBetween(c.pos, s, (l) => {
      if (Vs(l))
        return d = !0, !1;
    }), d;
  }, n = D(() => e.disabled ? [] : As(e.editor), [e.disabled, e.editor, t]);
  return /* @__PURE__ */ r(K, { children: /* @__PURE__ */ r(
    ce,
    {
      shouldShow: i,
      editor: e == null ? void 0 : e.editor,
      tippyOptions: yi,
      children: n != null && n.length ? /* @__PURE__ */ r("div", { className: "richtext-w-auto richtext-px-3 richtext-py-2 richtext-transition-all !richtext-border richtext-rounded-sm richtext-shadow-sm richtext-pointer-events-auto richtext-select-none richtext-border-neutral-200 dark:richtext-border-neutral-800 richtext-bg-background", children: /* @__PURE__ */ r("div", { className: "richtext-flex richtext-items-center richtext-flex-nowrap richtext-whitespace-nowrap richtext-h-[26px] richtext-justify-start richtext-relative", children: n == null ? void 0 : n.map((a, o) => /* @__PURE__ */ r(
        ki,
        {
          item: a,
          disabled: e.disabled,
          editor: e.editor
        },
        `bubbleMenu-image-gif-${o}`
      )) }) }) : /* @__PURE__ */ r(K, {})
    }
  ) });
}
function Ws(e) {
  const { lang: t } = V(), i = ({ editor: a }) => {
    const { selection: o } = a.view.state, { $from: c, to: s } = o;
    let d = !1;
    return a.view.state.doc.nodesBetween(c.pos, s, (l) => {
      if (Fs(l))
        return d = !0, !1;
    }), d;
  }, n = D(() => e.disabled ? [] : Ss(e.editor), [e.editor, e.disabled, t]);
  return /* @__PURE__ */ r(K, { children: /* @__PURE__ */ r(
    ce,
    {
      shouldShow: i,
      editor: e == null ? void 0 : e.editor,
      tippyOptions: yi,
      children: n != null && n.length ? /* @__PURE__ */ r("div", { className: "richtext-w-auto richtext-px-3 richtext-py-2 richtext-transition-all !richtext-border richtext-rounded-sm richtext-shadow-sm richtext-pointer-events-auto richtext-select-none richtext-border-neutral-200 dark:richtext-border-neutral-800 richtext-bg-background", children: /* @__PURE__ */ r("div", { className: "richtext-flex richtext-items-center richtext-flex-nowrap richtext-whitespace-nowrap richtext-h-[26px] richtext-justify-start richtext-relative", children: n == null ? void 0 : n.map((a, o) => /* @__PURE__ */ r(
        ki,
        {
          item: a,
          disabled: e.disabled,
          editor: e.editor
        },
        `bubbleMenu-video-${o}`
      )) }) }) : /* @__PURE__ */ r(K, {})
    }
  ) });
}
function Ks({ editor: e }) {
  const { t } = V(), i = A(() => e.isActive(ct.name), [e]), n = A(() => Ye(ct.name, e), [e]), a = A(() => e.chain().focus().addColBefore().run(), [e]), o = A(() => e.chain().focus().addColAfter().run(), [e]), c = A(() => e.chain().focus().deleteCol().run(), [e]);
  return /* @__PURE__ */ r(
    ce,
    {
      pluginKey: "columns-bubble-menu",
      editor: e,
      shouldShow: i,
      tippyOptions: {
        popperOptions: {
          modifiers: [{ name: "flip", enabled: !1 }]
        },
        placement: "bottom-start",
        offset: [-2, 16],
        zIndex: 9999
        // onHidden: () => {
        //   toggleVisible(false)
        // },
      },
      children: /* @__PURE__ */ m("div", { className: "richtext-w-auto richtext-px-3 richtext-py-2 richtext-transition-all !richtext-border richtext-rounded-sm richtext-shadow-sm richtext-pointer-events-auto richtext-select-none richtext-border-neutral-200 dark:richtext-border-neutral-800 richtext-bg-background", children: [
        /* @__PURE__ */ r(
          _,
          {
            action: a,
            icon: "ColumnAddLeft",
            tooltip: t("editor.table.menu.insertColumnBefore")
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            action: o,
            icon: "ColumnAddRight",
            tooltip: t("editor.table.menu.insertColumnAfter")
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            action: c,
            icon: "DeleteColumn",
            tooltip: t("editor.table.menu.deleteColumn")
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            action: n,
            icon: "Trash2",
            tooltip: t("editor.table.menu.delete_column")
          }
        )
      ] })
    }
  );
}
const Xh = Ca.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.commands.toggleBold(),
          isActive: () => t.isActive("bold") || !1,
          disabled: !t.can().toggleBold(),
          icon: "Bold",
          shortcutKeys: ["mod", "B"],
          tooltip: i("editor.bold.tooltip")
        }
      })
    };
  }
}), Zh = Na.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button({ editor: t, t: i }) {
        return {
          component: _,
          componentProps: {
            action: () => t.commands.toggleItalic(),
            isActive: () => t.isActive("italic") || !1,
            disabled: !t.can().toggleItalic(),
            shortcutKeys: ["mod", "I"],
            icon: "Italic",
            tooltip: i("editor.italic.tooltip")
          }
        };
      }
    };
  }
}), Yh = Ta.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button({ editor: t, t: i }) {
        return {
          component: _,
          componentProps: {
            action: () => t.commands.toggleUnderline(),
            isActive: () => t.isActive("underline") || !1,
            disabled: !t.can().toggleUnderline(),
            icon: "Underline",
            shortcutKeys: ["mod", "U"],
            tooltip: i("editor.underline.tooltip")
          }
        };
      }
    };
  }
}), Jh = Aa.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.commands.toggleStrike(),
          isActive: () => t.isActive("strike") || !1,
          disabled: !t.can().toggleStrike(),
          icon: "Strikethrough",
          shortcutKeys: ["shift", "mod", "X"],
          tooltip: i("editor.strike.tooltip")
        }
      })
    };
  }
}), Qh = La.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.commands.toggleCode(),
          isActive: () => t.isActive("code") || !1,
          disabled: !t.can().toggleCode(),
          icon: "Code",
          shortcutKeys: ["mod", "E"],
          tooltip: i("editor.code.tooltip")
        }
      })
    };
  }
});
let me, it;
const Vt = /* @__PURE__ */ new Set(), Ft = /* @__PURE__ */ new Set();
function qs() {
  return me;
}
function Gs(e) {
  if (!me && !it) {
    const t = e.themes.filter(
      (n) => !!n && n in un
    ), i = e.languages.filter(
      (n) => !!n && n in mn
    );
    return it = fo({ themes: t, langs: i }).then((n) => {
      me = n;
    }), it;
  }
  if (it)
    return it;
}
async function jn(e) {
  return me && !me.getLoadedThemes().includes(e) && !Ft.has(e) && e in un ? (Ft.add(e), await me.loadTheme(e), Ft.delete(e), !0) : !1;
}
async function Un(e) {
  return me && !me.getLoadedLanguages().includes(e) && !Vt.has(e) && e in mn ? (Vt.add(e), await me.loadLanguage(e), Vt.delete(e), !0) : !1;
}
async function Xs({
  doc: e,
  name: t,
  defaultTheme: i,
  defaultLanguage: n
}) {
  const a = at(e, (s) => s.type.name === t), o = [
    ...a.map((s) => s.node.attrs.theme),
    i
  ], c = [
    ...a.map((s) => s.node.attrs.language),
    n
  ];
  me ? await Promise.all([
    ...o.flatMap((s) => jn(s)),
    ...c.flatMap((s) => !!s && Un(s))
  ]) : await Gs({ languages: c, themes: o });
}
function Fi({
  doc: e,
  name: t,
  defaultTheme: i,
  defaultLanguage: n
}) {
  const a = [];
  return at(e, (c) => c.type.name === t).forEach((c) => {
    let s = c.pos + 1, d = c.node.attrs.language || n;
    const l = c.node.attrs.theme || i, h = qs();
    if (!h)
      return;
    h.getLoadedLanguages().includes(d) || (d = "plaintext");
    const u = h.getLoadedThemes().includes(l) ? l : h.getLoadedThemes()[0], f = h.codeToTokensBase(c.node.textContent, {
      lang: d,
      theme: u
    });
    for (const g of f) {
      for (const x of g) {
        const b = s + x.content.length, y = Ue.inline(s, b, {
          style: `color: ${x.color}`
        });
        a.push(y), s = b;
      }
      s += 1;
    }
  }), Fe.create(e, a);
}
function Zs({
  name: e,
  defaultLanguage: t,
  defaultTheme: i
}) {
  const n = new pe({
    key: new we("shiki"),
    view(a) {
      class o {
        constructor() {
          this.initDecorations();
        }
        update() {
          this.checkUndecoratedBlocks();
        }
        destroy() {
        }
        // Initialize shiki async, and then highlight initial document
        async initDecorations() {
          const s = a.state.doc;
          await Xs({ doc: s, name: e, defaultLanguage: t, defaultTheme: i });
          const d = a.state.tr.setMeta("shikiPluginForceDecoration", !0);
          a.dispatch(d);
        }
        // When new codeblocks were added and they have missing themes or
        // languages, load those and then add code decorations once again.
        async checkUndecoratedBlocks() {
          const s = at(
            a.state.doc,
            (h) => h.type.name === e
          );
          if ((await Promise.all(
            s.flatMap((h) => [
              jn(h.node.attrs.theme),
              Un(h.node.attrs.language)
            ])
          )).includes(!0)) {
            const h = a.state.tr.setMeta("shikiPluginForceDecoration", !0);
            a.dispatch(h);
          }
        }
      }
      return new o();
    },
    state: {
      init: (a, { doc: o }) => Fi({
        doc: o,
        name: e,
        defaultLanguage: t,
        defaultTheme: i
      }),
      apply: (a, o, c, s) => {
        const d = c.selection.$head.parent.type.name, l = s.selection.$head.parent.type.name, h = at(
          c.doc,
          (g) => g.type.name === e
        ), u = at(
          s.doc,
          (g) => g.type.name === e
        ), f = a.docChanged && ([d, l].includes(e) || u.length !== h.length || a.steps.some((g) => g.from !== void 0 && g.to !== void 0 && h.some((x) => x.pos >= g.from && x.pos + x.node.nodeSize <= g.to)));
        return a.getMeta("shikiPluginForceDecoration") || f ? Fi({
          doc: a.doc,
          name: e,
          defaultLanguage: t,
          defaultTheme: i
        }) : o.map(a.mapping, a.doc);
      }
    },
    props: {
      decorations(a) {
        return n.getState(a);
      }
    }
  });
  return n;
}
function Ys({ action: e, languages: t, ...i }) {
  const n = (o) => {
    e(o);
  }, a = D(() => t == null ? void 0 : t.map((o) => ({
    title: po[o] || o,
    // icon: language.icon,
    language: o
  })), [t]);
  return /* @__PURE__ */ m(_e, { children: [
    /* @__PURE__ */ r(ve, { disabled: i == null ? void 0 : i.disabled, asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        tooltip: i == null ? void 0 : i.tooltip,
        disabled: i == null ? void 0 : i.disabled,
        icon: i == null ? void 0 : i.icon
      }
    ) }),
    /* @__PURE__ */ r(xe, { className: "richtext-w-full !richtext-max-h-[180px] !richtext-overflow-y-scroll", children: a == null ? void 0 : a.map((o) => /* @__PURE__ */ r(de, { onClick: () => n(o.language), children: /* @__PURE__ */ r("div", { className: "richtext-h-full richtext-ml-1", children: o.title }) }, `codeblock-${o.title}`)) })
  ] });
}
const Js = "_wrap_134f4_1", Qs = "_maxHeight_134f4_10", el = "_btnCopy_134f4_13", tl = "_btnDelete_134f4_14", il = "_blockInfo_134f4_18", nl = "_blockInfoEditable_134f4_28", rl = "_selectLang_134f4_32", al = "_copied_134f4_58", be = {
  wrap: Js,
  maxHeight: Qs,
  btnCopy: el,
  btnDelete: tl,
  blockInfo: il,
  blockInfoEditable: nl,
  selectLang: rl,
  "richtext-SelectContent": "_richtext-SelectContent_134f4_46",
  copied: al
};
function ol() {
  const [e, t] = p(!1);
  return { isCopied: e, copyToClipboard: async (n) => {
    try {
      await navigator.clipboard.writeText(n), t(!0), setTimeout(() => t(!1), 2e3);
    } catch (a) {
      console.error("Failed to copy text: ", a), t(!1);
    }
  } };
}
function cl({ editor: e, node: { attrs: t }, updateAttributes: i, extension: n }) {
  var f, g;
  const { isCopied: a, copyToClipboard: o } = ol(), c = D(() => {
    var x;
    return (x = n.options.languages) != null && x.length ? n.options.languages : fn;
  }, [n.options.languages]), s = Pt(), d = (g = (f = e == null ? void 0 : e.options) == null ? void 0 : f.editorProps) == null ? void 0 : g.print, { language: l } = t, h = Y(), u = A(() => Ye(sl.name, e), [e]);
  return /* @__PURE__ */ m(ae, { className: ee(be.wrap, !d && be.maxHeight, "render-wrapper"), children: [
    /* @__PURE__ */ m(
      "div",
      {
        className: ee(be.blockInfo, {
          [be.blockInfoEditable]: !s
        }),
        children: [
          /* @__PURE__ */ r(
            "span",
            {
              onClick: () => o(h.current.innerText),
              className: ee(be.btnCopy, a && be.copied),
              children: a ? /* @__PURE__ */ r(sa, { size: 16 }) : /* @__PURE__ */ r(an, { size: 16 })
            }
          ),
          /* @__PURE__ */ r(
            "span",
            {
              onClick: u,
              className: be.btnDelete,
              children: /* @__PURE__ */ r(
                F,
                {
                  name: "Trash2"
                }
              )
            }
          ),
          /* @__PURE__ */ r("div", { className: be.selectLang, children: /* @__PURE__ */ m(
            $o,
            {
              defaultValue: l || "auto",
              disabled: !s,
              onValueChange: (x) => i({ language: x }),
              children: [
                /* @__PURE__ */ r(vn, { children: /* @__PURE__ */ r(Vo, { placeholder: "Language" }) }),
                /* @__PURE__ */ m(Cn, { className: "richtext-max-h-60 richtext-overflow-y-auto", children: [
                  /* @__PURE__ */ r(Yt, { value: "auto", children: "Auto" }),
                  c.map((x, b) => /* @__PURE__ */ r(Yt, { value: x, children: x.charAt(0).toUpperCase() + x.slice(1) }, `code-lang-${b}`))
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ r("pre", { ref: h, children: /* @__PURE__ */ r(Sa, { as: "code" }) })
  ] });
}
const sl = Ma.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      languages: [],
      button: ({ editor: t, t: i, extension: n }) => {
        var o, c, s;
        const a = (c = (o = n == null ? void 0 : n.options) == null ? void 0 : o.languages) != null && c.length ? (s = n == null ? void 0 : n.options) == null ? void 0 : s.languages : fn;
        return {
          component: Ys,
          componentProps: {
            action: (d = "js") => t.commands.setCodeBlock({
              language: d
            }),
            isActive: () => t.isActive("codeBlock") || !1,
            disabled: !t.can().toggleCodeBlock(),
            icon: "Code2",
            tooltip: i("editor.codeblock.tooltip"),
            languages: a
          }
        };
      }
    };
  },
  addNodeView() {
    return ge(cl);
  },
  addProseMirrorPlugins() {
    var e;
    return [
      ...((e = this.parent) == null ? void 0 : e.call(this)) || [],
      Zs({
        name: this.name,
        defaultLanguage: null,
        defaultTheme: this.options.defaultTheme
      })
    ];
  }
});
function ll(e) {
  var a, o, c;
  const { t, lang: i } = V(), n = D(() => {
    var l;
    const s = (l = e == null ? void 0 : e.items) == null ? void 0 : l.find((h) => h.isActive());
    return s && !s.default ? {
      ...s
    } : {
      title: e.tooltip,
      font: t("editor.fontFamily.default.tooltip"),
      isActive: () => !1,
      disabled: !1,
      action: () => e.editor.chain().focus().unsetFontFamily().run()
    };
  }, [t, i, e]);
  return /* @__PURE__ */ m(_e, { children: [
    /* @__PURE__ */ r(ve, { disabled: e == null ? void 0 : e.disabled, asChild: !0, children: /* @__PURE__ */ r(
      xi,
      {
        title: ((a = n == null ? void 0 : n.font) == null ? void 0 : a.length) > 7 ? `${(o = n == null ? void 0 : n.font) == null ? void 0 : o.slice(0, 6)}...` : n == null ? void 0 : n.font,
        tooltip: e == null ? void 0 : e.tooltip,
        disabled: e == null ? void 0 : e.disabled,
        icon: "MenuDown"
      }
    ) }),
    /* @__PURE__ */ r(xe, { className: "richtext-w-full", children: (c = e == null ? void 0 : e.items) == null ? void 0 : c.map((s, d) => {
      const l = s.font === t("editor.fontFamily.default.tooltip") ? {} : { fontFamily: s.font };
      return /* @__PURE__ */ m(st, { children: [
        /* @__PURE__ */ r(ze, { checked: (n == null ? void 0 : n.font) === s.font, onClick: s.action, children: /* @__PURE__ */ r("div", { className: "richtext-h-full richtext-ml-1", style: l, children: s.font }) }),
        s.font === t("editor.fontFamily.default.tooltip") && /* @__PURE__ */ r(Rt, {})
      ] }, `font-family-${d}`);
    }) })
  ] });
}
const eu = Ia.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      fontFamilyList: wo,
      button({ editor: t, extension: i, t: n }) {
        var l;
        const { extensions: a = [] } = t.extensionManager ?? [], o = Jt(((l = i == null ? void 0 : i.options) == null ? void 0 : l.fontFamilyList) || []), c = a.find(
          (h) => h.name === "base-kit"
        ), s = o.map((h) => ({
          action: () => {
            t.chain().focus().setFontFamily(h.value).run();
          },
          isActive: () => t.isActive("textStyle", { fontFamily: h.value }) || !1,
          disabled: !t.can().setFontFamily(h.value),
          title: h.name,
          font: h.value
        }));
        c && c.options.textStyle !== !1 && s.unshift({
          action: () => t.chain().focus().unsetFontFamily().run(),
          isActive: () => !1,
          disabled: !1,
          font: n("editor.fontFamily.default.tooltip"),
          title: n("editor.fontFamily.tooltip")
        });
        const d = s.filter((h) => h.disabled).length === s.length;
        return {
          component: ll,
          componentProps: {
            tooltip: n("editor.fontFamily.tooltip"),
            disabled: d,
            items: s,
            editor: t
          }
        };
      }
    };
  }
});
function dl(e) {
  var i;
  const t = D(() => {
    var o;
    const n = (o = e == null ? void 0 : e.items) == null ? void 0 : o.find((c) => c.isActive());
    return n && !n.default ? {
      ...n
    } : {
      title: e.tooltip,
      level: 0,
      isActive: () => !1
    };
  }, [e]);
  return /* @__PURE__ */ m(_e, { children: [
    /* @__PURE__ */ r(ve, { disabled: e == null ? void 0 : e.disabled, asChild: !0, children: /* @__PURE__ */ r(
      xi,
      {
        title: t == null ? void 0 : t.title,
        tooltip: e == null ? void 0 : e.tooltip,
        disabled: e == null ? void 0 : e.disabled,
        icon: "MenuDown"
      }
    ) }),
    /* @__PURE__ */ r(xe, { className: "richtext-w-full", children: (i = e == null ? void 0 : e.items) == null ? void 0 : i.map((n, a) => {
      var o, c;
      return /* @__PURE__ */ m(st, { children: [
        /* @__PURE__ */ m(
          ze,
          {
            checked: (t == null ? void 0 : t.title) === n.title,
            onClick: n.action,
            children: [
              /* @__PURE__ */ r("div", { className: `richtext-ml-1 richtext-h-full heading-${n.level}`, children: n.title }),
              !!((o = n == null ? void 0 : n.shortcutKeys) != null && o.length) && /* @__PURE__ */ r(_n, { className: "richtext-pl-4", children: (c = n == null ? void 0 : n.shortcutKeys) == null ? void 0 : c.map((s) => Et(s)).join(" ") })
            ]
          }
        ),
        n.level === 0 && /* @__PURE__ */ r(Rt, {})
      ] }, `heading-k-${a}`);
    }) })
  ] });
}
const tu = za.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      levels: [1, 2, 3, 4, 5, 6],
      button({ editor: t, extension: i, t: n }) {
        var l;
        const { extensions: a = [] } = t.extensionManager ?? [], o = ((l = i.options) == null ? void 0 : l.levels) || [], c = a.find(
          (h) => h.name === "base-kit"
        ), s = o.map((h) => ({
          action: () => t.commands.toggleHeading({ level: h }),
          isActive: () => t.isActive("heading", { level: h }) || !1,
          disabled: !t.can().toggleHeading({ level: h }),
          title: n(`editor.heading.h${h}.tooltip`),
          level: h,
          shortcutKeys: ["alt", "mod", `${h}`]
        }));
        c && c.options.paragraph !== !1 && s.unshift({
          action: () => t.commands.setParagraph(),
          isActive: () => t.isActive("paragraph") || !1,
          disabled: !t.can().setParagraph(),
          level: 0,
          title: n("editor.paragraph.tooltip"),
          shortcutKeys: ["alt", "mod", "0"]
        });
        const d = s.filter((h) => h.disabled).length === s.length;
        return {
          component: dl,
          componentProps: {
            tooltip: n("editor.heading.tooltip"),
            disabled: d,
            items: s,
            editor: t
          }
        };
      }
    };
  }
});
function hl(e) {
  var i;
  const t = D(() => {
    var o;
    const n = (o = e == null ? void 0 : e.items) == null ? void 0 : o.find((c) => c.isActive());
    return n && !n.default ? {
      ...n,
      icon: n.icon ? n.icon : e.icon
    } : {
      title: e == null ? void 0 : e.tooltip,
      icon: e.icon,
      isActive: () => !1
    };
  }, [e]);
  return /* @__PURE__ */ m(se, { modal: !0, children: [
    /* @__PURE__ */ r(le, { disabled: e == null ? void 0 : e.disabled, asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        customClass: "!richtext-w-12 richtext-h-12",
        icon: e == null ? void 0 : e.icon,
        tooltip: e == null ? void 0 : e.tooltip,
        disabled: e == null ? void 0 : e.disabled,
        children: /* @__PURE__ */ r(F, { className: "richtext-w-3 richtext-h-3 richtext-ml-1 richtext-text-zinc-500", name: "MenuDown" })
      }
    ) }),
    /* @__PURE__ */ r(
      re,
      {
        className: "richtext-min-w-4 richtext-w-full !richtext-p-[4px] richtext-flex richtext-flex-row richtext-gap-1",
        align: "start",
        side: "bottom",
        children: (i = e == null ? void 0 : e.items) == null ? void 0 : i.map((n, a) => {
          var o, c;
          return /* @__PURE__ */ m(Je, { children: [
            /* @__PURE__ */ r(Qe, { asChild: !0, children: /* @__PURE__ */ r(
              ut,
              {
                size: "sm",
                onClick: n == null ? void 0 : n.action,
                className: "richtext-p-1 richtext-w-7 richtext-h-7",
                pressed: t.title === n.title,
                "data-state": t.title === n.title ? "on" : "off",
                children: (n == null ? void 0 : n.icon) && /* @__PURE__ */ r(F, { name: n.icon })
              }
            ) }),
            /* @__PURE__ */ m(Ee, { className: "richtext-flex richtext-flex-col richtext-items-center", children: [
              /* @__PURE__ */ r("span", { children: n.title }),
              !!((o = n.shortcutKeys) != null && o.length) && /* @__PURE__ */ r("span", { children: (c = n.shortcutKeys) == null ? void 0 : c.map((s) => Et(s)).join(" ") })
            ] })
          ] }, `text-align-${a}`);
        })
      }
    )
  ] });
}
const iu = Ea.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      types: ["heading", "paragraph", "list_item", "title"],
      button({
        editor: t,
        extension: i,
        t: n
      }) {
        var l;
        const a = ((l = i.options) == null ? void 0 : l.alignments) || [], o = {
          left: ["mod", "Shift", "L"],
          center: ["mod", "Shift", "E"],
          right: ["mod", "Shift", "R"],
          justify: ["mod", "Shift", "J"]
        }, c = {
          left: "AlignLeft",
          center: "AlignCenter",
          right: "AlignRight",
          justify: "AlignJustify"
        }, s = a.map((h) => {
          var u, f, g;
          return {
            title: n(`editor.textalign.${h}.tooltip`),
            icon: c[h],
            shortcutKeys: o[h],
            isActive: () => t.isActive({ textAlign: h }) || !1,
            action: () => {
              var x, b;
              return (b = (x = t.commands) == null ? void 0 : x.setTextAlign) == null ? void 0 : b.call(x, h);
            },
            disabled: !((g = (f = (u = t == null ? void 0 : t.can) == null ? void 0 : u.call(t)) == null ? void 0 : f.setTextAlign) != null && g.call(f, h))
          };
        }), d = s.filter((h) => h.disabled).length === s.length;
        return {
          component: hl,
          componentProps: {
            icon: "AlignJustify",
            tooltip: n("editor.textalign.tooltip"),
            disabled: d,
            items: s
          }
        };
      }
    };
  }
});
function ul(e) {
  var n;
  const { t } = V(), i = D(() => {
    const a = (e.items || []).find((c) => c.isActive());
    return a || {
      title: t("editor.fontSize.default.tooltip"),
      isActive: () => !1
    };
  }, [e]);
  return /* @__PURE__ */ m(_e, { children: [
    /* @__PURE__ */ r(ve, { disabled: e == null ? void 0 : e.disabled, asChild: !0, children: /* @__PURE__ */ r(
      xi,
      {
        title: i == null ? void 0 : i.title,
        tooltip: `${e == null ? void 0 : e.tooltip}`,
        disabled: e == null ? void 0 : e.disabled,
        icon: "MenuDown"
      }
    ) }),
    /* @__PURE__ */ r(xe, { className: "richtext-w-32 richtext-overflow-y-auto richtext-max-h-96", children: (n = e == null ? void 0 : e.items) == null ? void 0 : n.map((a, o) => /* @__PURE__ */ r(
      ze,
      {
        checked: i.title === a.title,
        onClick: a.action,
        children: /* @__PURE__ */ r("div", { className: "richtext-h-full richtext-ml-1", children: a.title })
      },
      `font-size-${o}`
    )) })
  ] });
}
const nu = Z.create({
  name: "fontSize",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      types: ["textStyle"],
      fontSizes: [..._o],
      button({ editor: t, extension: i, t: n }) {
        var d;
        const a = Jt(((d = i.options) == null ? void 0 : d.fontSizes) || Si), o = Jt([Si])[0], c = a.map((l) => ({
          title: l.value === o.value ? n("editor.fontSize.default.tooltip") : String(l.name),
          isActive: () => {
            const { fontSize: h } = t.getAttributes("textStyle");
            return l.value === o.value && h === void 0 ? !0 : t.isActive({ fontSize: String(l.value) }) || !1;
          },
          action: () => {
            if (l.value === o.value) {
              t.commands.unsetFontSize();
              return;
            }
            t.commands.setFontSize(String(l.value));
          },
          disabled: !t.can().setFontSize(String(l.value)),
          divider: l.value === o.value || !1,
          default: l.value === o.value || !1
        })), s = c.filter((l) => l.disabled).length === c.length;
        return {
          component: ul,
          componentProps: {
            editor: t,
            tooltip: n("editor.fontSize.tooltip"),
            disabled: s,
            items: c,
            maxHeight: 280
          }
        };
      }
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (e) => e.style.fontSize.replaceAll(/["']+/g, ""),
            renderHTML: (e) => e.fontSize ? {
              style: `font-size: ${e.fontSize}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontSize: (e) => ({ chain: t }) => t().setMark("textStyle", { fontSize: e }).run(),
      unsetFontSize: () => ({ chain: e }) => e().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run()
    };
  }
});
function ml({ fill: e }) {
  return /* @__PURE__ */ r(
    "svg",
    {
      width: "18px",
      height: "18px",
      viewBox: "0 0 240 240",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ r("g", { stroke: "none", strokeWidth: 1, fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ r("g", { transform: "translate(0.000000, 0.500000)", children: /* @__PURE__ */ m("g", { transform: "translate(39.000000, 17.353553)", children: [
        /* @__PURE__ */ r(
          "path",
          {
            d: "M11,201.146447 L167,201.146447 C173.075132,201.146447 178,206.071314 178,212.146447 C178,218.221579 173.075132,223.146447 167,223.146447 L11,223.146447 C4.92486775,223.146447 7.43989126e-16,218.221579 0,212.146447 C-7.43989126e-16,206.071314 4.92486775,201.146447 11,201.146447 Z",
            id: "矩形",
            fill: e || "#DF2A3F",
            fillRule: "evenodd"
          }
        ),
        /* @__PURE__ */ r(
          "path",
          {
            d: "M72.3425855,16.8295583 C75.799482,7.50883712 86.1577877,2.75526801 95.4785089,6.21216449 C100.284516,7.99463061 104.096358,11.7387855 105.968745,16.4968188 L106.112518,16.8745422 L159.385152,161.694068 C161.291848,166.877345 158.635655,172.624903 153.452378,174.531599 C148.358469,176.405421 142.719567,173.872338 140.716873,168.864661 L140.614848,168.598825 L89.211,28.86 L37.3759214,168.623816 C35.4885354,173.712715 29.8981043,176.351047 24.7909589,174.617647 L24.5226307,174.522368 C19.4337312,172.634982 16.7953993,167.044551 18.5287999,161.937406 L18.6240786,161.669077 L72.3425855,16.8295583 Z",
            id: "路径-21",
            fill: "currentColor",
            fillRule: "nonzero"
          }
        ),
        /* @__PURE__ */ r(
          "path",
          {
            d: "M121,103.146447 C126.522847,103.146447 131,107.623599 131,113.146447 C131,118.575687 126.673329,122.994378 121.279905,123.142605 L121,123.146447 L55,123.146447 C49.4771525,123.146447 45,118.669294 45,113.146447 C45,107.717207 49.3266708,103.298515 54.7200952,103.150288 L55,103.146447 L121,103.146447 Z",
            id: "路径-22",
            fill: "currentColor",
            fillRule: "nonzero"
          }
        )
      ] }) }) })
    }
  );
}
function fl(e) {
  const [t, i] = p(void 0);
  function n(c) {
    var s;
    (s = e.action) == null || s.call(e, c);
  }
  function a() {
    var c;
    (c = e.action) == null || c.call(e, t);
  }
  const o = A(
    di((c) => {
      i(c);
    }, 350),
    []
  );
  return /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-h-[32px]", children: [
    /* @__PURE__ */ r(_, { tooltip: e == null ? void 0 : e.tooltip, disabled: e == null ? void 0 : e.disabled, action: a, children: /* @__PURE__ */ r("span", { className: "richtext-flex richtext-items-center richtext-justify-center richtext-text-sm", children: /* @__PURE__ */ r(ml, { fill: t }) }) }),
    /* @__PURE__ */ r(
      En,
      {
        selectedColor: t,
        setSelectedColor: o,
        onChange: n,
        disabled: e == null ? void 0 : e.disabled,
        colors: e == null ? void 0 : e.colors,
        defaultColor: e == null ? void 0 : e.defaultColor,
        children: /* @__PURE__ */ r(U, { variant: "ghost", size: "icon", className: "r!ichtext-h-[32px] !richtext-w-3", disabled: e == null ? void 0 : e.disabled, children: /* @__PURE__ */ r(F, { className: "!richtext-w-3 !richtext-h-3 richtext-text-zinc-500", name: "MenuDown" }) })
      }
    )
  ] });
}
const ru = Ha.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button({ editor: t, t: i, extension: n }) {
        return {
          component: fl,
          componentProps: {
            colors: n.options.colors,
            defaultColor: n.options.defaultColor,
            action: (a) => {
              a === void 0 && t.chain().focus().unsetColor().run(), typeof a == "string" && t.chain().focus().setColor(a).run();
            },
            isActive: () => {
              const { color: a } = t.getAttributes("textStyle");
              return a && t.isActive({ color: a }) || !1;
            },
            editor: t,
            disabled: !t.can().setColor(""),
            tooltip: i("editor.color.tooltip")
          }
        };
      }
    };
  }
});
function gl({ fill: e }) {
  return /* @__PURE__ */ r(
    "svg",
    {
      width: "18px",
      height: "18px",
      viewBox: "0 0 256 256",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ r("g", { id: "icon/填充色", stroke: "none", strokeWidth: 1, fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ m("g", { id: "icon/背景颜色", children: [
        /* @__PURE__ */ r("g", { id: "编组", fill: "currentColor", children: /* @__PURE__ */ m(
          "g",
          {
            transform: "translate(119.502295, 137.878331) rotate(-135.000000) translate(-119.502295, -137.878331) translate(48.002295, 31.757731)",
            id: "矩形",
            children: [
              /* @__PURE__ */ r(
                "path",
                {
                  d: "M100.946943,60.8084699 L43.7469427,60.8084699 C37.2852111,60.8084699 32.0469427,66.0467383 32.0469427,72.5084699 L32.0469427,118.70847 C32.0469427,125.170201 37.2852111,130.40847 43.7469427,130.40847 L100.946943,130.40847 C107.408674,130.40847 112.646943,125.170201 112.646943,118.70847 L112.646943,72.5084699 C112.646943,66.0467383 107.408674,60.8084699 100.946943,60.8084699 Z M93.646,79.808 L93.646,111.408 L51.046,111.408 L51.046,79.808 L93.646,79.808 Z",
                  fillRule: "nonzero"
                }
              ),
              /* @__PURE__ */ r(
                "path",
                {
                  d: "M87.9366521,16.90916 L87.9194966,68.2000001 C87.9183543,69.4147389 86.9334998,70.399264 85.7187607,70.4 L56.9423078,70.4 C55.7272813,70.4 54.7423078,69.4150264 54.7423078,68.2 L54.7423078,39.4621057 C54.7423078,37.2523513 55.5736632,35.1234748 57.0711706,33.4985176 L76.4832996,12.4342613 C78.9534987,9.75382857 83.1289108,9.5834005 85.8093436,12.0535996 C87.1658473,13.303709 87.9372691,15.0644715 87.9366521,16.90916 Z",
                  fillRule: "evenodd"
                }
              ),
              /* @__PURE__ */ r(
                "path",
                {
                  d: "M131.3,111.241199 L11.7,111.241199 C5.23826843,111.241199 0,116.479467 0,122.941199 L0,200.541199 C0,207.002931 5.23826843,212.241199 11.7,212.241199 L131.3,212.241199 C137.761732,212.241199 143,207.002931 143,200.541199 L143,122.941199 C143,116.479467 137.761732,111.241199 131.3,111.241199 Z M124,130.241 L124,193.241 L19,193.241 L19,130.241 L124,130.241 Z",
                  fillRule: "nonzero"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ r(
          "path",
          {
            d: "M51,218 L205,218 C211.075132,218 216,222.924868 216,229 C216,235.075132 211.075132,240 205,240 L51,240 C44.9248678,240 40,235.075132 40,229 C40,222.924868 44.9248678,218 51,218 Z",
            id: "矩形",
            fill: e || "#FBDE28"
          }
        )
      ] }) })
    }
  );
}
function xl(e) {
  const [t, i] = p(void 0);
  function n(c) {
    var s;
    (s = e.action) == null || s.call(e, c);
  }
  function a() {
    var c;
    (c = e.action) == null || c.call(e, t);
  }
  const o = A(
    di((c) => {
      i(c);
    }, 350),
    []
  );
  return /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-h-[32px]", children: [
    /* @__PURE__ */ r(
      _,
      {
        tooltip: e == null ? void 0 : e.tooltip,
        disabled: e == null ? void 0 : e.disabled,
        action: a,
        tooltipOptions: e == null ? void 0 : e.tooltipOptions,
        shortcutKeys: e == null ? void 0 : e.shortcutKeys,
        children: /* @__PURE__ */ r("span", { className: "richtext-flex richtext-items-center richtext-justify-center richtext-text-sm", children: /* @__PURE__ */ r(gl, { fill: t }) })
      }
    ),
    /* @__PURE__ */ r(
      En,
      {
        selectedColor: t,
        setSelectedColor: o,
        onChange: n,
        highlight: !0,
        disabled: e == null ? void 0 : e.disabled,
        children: /* @__PURE__ */ r(U, { variant: "ghost", size: "icon", className: "!richtext-w-3 !richtext-h-[32px]", disabled: e == null ? void 0 : e.disabled, children: /* @__PURE__ */ r(F, { className: "!richtext-w-3 !richtext-h-3 richtext-text-zinc-500", name: "MenuDown" }) })
      }
    )
  ] });
}
const au = Ra.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      multicolor: !0,
      button: ({ editor: t, t: i }) => ({
        component: xl,
        componentProps: {
          action: (n) => {
            typeof n == "string" && t.chain().focus().setHighlight({ color: n }).run(), n === void 0 && t.chain().focus().unsetHighlight().run();
          },
          editor: t,
          isActive: () => t.isActive("highlight") || !1,
          disabled: !t.can().setHighlight(),
          shortcutKeys: ["⇧", "mod", "H"],
          tooltip: i("editor.highlight.tooltip")
        }
      })
    };
  }
}), ou = Oa.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.commands.toggleBulletList(),
          isActive: () => t.isActive("bulletList") || !1,
          disabled: !1,
          shortcutKeys: ["shift", "mod", "8"],
          icon: "List",
          tooltip: i("editor.bulletlist.tooltip")
        }
      })
    };
  }
}), cu = he.create({
  name: "clear",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.chain().focus().clearNodes().unsetAllMarks().run(),
          disabled: !t.can().chain().focus().clearNodes().unsetAllMarks().run(),
          icon: "Eraser",
          tooltip: i("editor.clear.tooltip")
        }
      })
    };
  }
}), su = Pa.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.commands.toggleOrderedList(),
          isActive: () => t.isActive("orderedList") || !1,
          disabled: !1,
          icon: "ListOrdered",
          shortcutKeys: ["mod", "shift", "7"],
          tooltip: i("editor.orderedlist.tooltip")
        }
      })
    };
  }
}), lu = Da.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      HTMLAttributes: {
        class: "task-list"
      },
      taskItem: {
        HTMLAttributes: {
          class: "task-list-item"
        }
      },
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.commands.toggleTaskList(),
          isActive: () => t.isActive("taskList") || !1,
          disabled: !1,
          icon: "ListTodo",
          shortcutKeys: ["shift", "mod", "9"],
          tooltip: i("editor.tasklist.tooltip")
        }
      })
    };
  },
  addExtensions() {
    return [Ba.configure(this.options.taskItem)];
  }
}), du = $a.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      HTMLAttributes: {
        class: "blockquote"
      },
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.commands.toggleBlockquote(),
          isActive: () => t.isActive("blockquote") || !1,
          disabled: !t.can().toggleBlockquote(),
          icon: "TextQuote",
          shortcutKeys: ["shift", "mod", "B"],
          tooltip: i("editor.blockquote.tooltip")
        }
      })
    };
  }
});
function bl(e) {
  const [t, i] = p(!1);
  function n(a, o, c) {
    e.action && (e.action({ link: a, text: o, openInNewTab: c }), i(!1));
  }
  return /* @__PURE__ */ m(se, { modal: !0, open: t, onOpenChange: i, children: [
    /* @__PURE__ */ r(le, { disabled: e == null ? void 0 : e.disabled, asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        tooltip: e == null ? void 0 : e.tooltip,
        isActive: e == null ? void 0 : e.isActive,
        disabled: e == null ? void 0 : e.disabled,
        children: /* @__PURE__ */ r(F, { name: e == null ? void 0 : e.icon })
      }
    ) }),
    /* @__PURE__ */ r(re, { hideWhenDetached: !0, className: "richtext-w-full", align: "start", side: "bottom", children: /* @__PURE__ */ r(Fn, { editor: e.editor, onSetLink: n }) })
  ] });
}
const hu = Va.extend({
  inclusive: !1,
  parseHTML() {
    return [
      {
        tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])'
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return [
      "a",
      ne(this.options.HTMLAttributes, e, {
        class: "link"
      }),
      0
    ];
  },
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      openOnClick: !0,
      button: ({ editor: t, t: i }) => ({
        component: bl,
        componentProps: {
          editor: t,
          action: (n) => {
            const { link: a, text: o, openInNewTab: c } = n;
            t.chain().extendMarkRange("link").insertContent({
              type: "text",
              text: o,
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: a,
                    target: c ? "_blank" : ""
                  }
                }
              ]
            }).setLink({ href: a }).focus().run();
          },
          id: "linkk",
          isActive: () => t.isActive("link") || !1,
          disabled: !t.can().setLink({ href: "" }),
          icon: "Link",
          tooltip: i("editor.link.tooltip")
        }
      })
    };
  },
  addProseMirrorPlugins() {
    return [
      new pe({
        props: {
          handleClick: (e, t) => {
            const { schema: i, doc: n, tr: a } = e.state, o = Fa(n.resolve(t), i.marks.link);
            if (!o)
              return !1;
            const c = n.resolve(o.from), s = n.resolve(o.to), d = a.setSelection(new Me(c, s));
            e.dispatch(d);
          }
        }
      })
    ];
  }
}), uu = ja.extend({
  renderHTML() {
    return [
      "div",
      ne(this.options.HTMLAttributes, {
        "data-type": this.name
      }),
      ["hr"]
    ];
  },
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.commands.setHorizontalRule(),
          disabled: !t.can().setHorizontalRule(),
          icon: "Minus",
          shortcutKeys: ["mod", "alt", "S"],
          tooltip: i("editor.horizontalrule.tooltip")
        }
      })
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-s": () => this.editor.commands.setHorizontalRule()
    };
  }
});
function pl(e) {
  var l;
  const {
    icon: t = void 0,
    // title = undefined,
    tooltip: i = void 0,
    // disabled = false,
    customClass: n = "",
    // color = undefined,
    // loading = false,
    // shortcutKeys = undefined,
    tooltipOptions: a = {},
    action: o = void 0,
    isActive: c = void 0,
    children: s
  } = e, d = mt[t];
  return /* @__PURE__ */ m(Je, { children: [
    /* @__PURE__ */ r(Qe, { asChild: !0, children: /* @__PURE__ */ m(
      ut,
      {
        size: "sm",
        className: `richtext-w-[32px] richtext-h-[32px] ${n}`,
        disabled: c == null ? void 0 : c(),
        onClick: o,
        children: [
          d && /* @__PURE__ */ r(d, { className: "richtext-w-4 richtext-h-4" }),
          s && /* @__PURE__ */ r(K, { children: s })
        ]
      }
    ) }),
    i && /* @__PURE__ */ r(Ee, { ...a, children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-flex-col richtext-items-center richtext-text-center richtext-max-w-24", children: [
      /* @__PURE__ */ r("div", { children: i }),
      !!((l = e == null ? void 0 : e.shortcutKeys) != null && l.length) && /* @__PURE__ */ r("span", { children: Ht(e == null ? void 0 : e.shortcutKeys) })
    ] }) })
  ] });
}
const wl = ["undo", "redo"], mu = Ua.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      depth: 100,
      newGroupDelay: 500,
      button: ({ editor: t, t: i }) => wl.map((n) => ({
        component: pl,
        componentProps: {
          action: () => {
            n === "undo" && t.chain().focus().undo().run(), n === "redo" && t.chain().focus().redo().run();
          },
          shortcutKeys: n === "undo" ? ["mod", "Z"] : ["shift", "mod", "Z"],
          disabled: n === "undo" ? !t.can().undo() : !t.can().redo(),
          isActive: () => n === "undo" ? !t.can().undo() : !t.can().redo(),
          icon: n === "undo" ? "Undo2" : "Redo2",
          tooltip: i(`editor.${n}.tooltip`)
        }
      }))
    };
  }
}), _l = Wa.extend({
  content: "(block|columns)+"
  // echo editor is a block editor
});
function vl(e, t, i = null) {
  return i ? e.createChecked({ index: t }, i) : e.createAndFill({ index: t });
}
function yl(e) {
  if (e.cached.columnsNodeTypes)
    return e.cached.columnsNodeTypes;
  const t = {
    columns: e.nodes.columns,
    column: e.nodes.column
  };
  return e.cached.columnsNodeTypes = t, t;
}
function kl(e, t, i = null) {
  const n = yl(e), a = [];
  for (let o = 0; o < t; o += 1) {
    const c = vl(n.column, o, i);
    c && a.push(c);
  }
  return n.columns.createChecked({ cols: t }, a);
}
function jt({
  state: e,
  dispatch: t,
  type: i
}) {
  const n = kt((o) => o.type.name === ct.name)(e.selection), a = kt((o) => o.type.name === Ci.name)(e.selection);
  if (t && n && a) {
    const o = n.node, c = a.node.attrs.index, s = o.toJSON();
    let d = c;
    i === "delete" ? (d = c - 1, s.content.splice(c, 1)) : (d = i === "addBefore" ? c : c + 1, s.content.splice(d, 0, {
      type: "column",
      attrs: {
        index: c
      },
      content: [
        {
          type: "paragraph"
        }
      ]
    })), s.attrs.cols = s.content.length, s.content.forEach((f, g) => {
      f.attrs.index = g;
    });
    const l = uo.fromJSON(e.schema, s);
    let h = n.pos;
    l.content.forEach((f, g, x) => {
      x < d && (h += f.nodeSize);
    });
    const u = e.tr.setTime(Date.now());
    u.replaceWith(n.pos, n.pos + n.node.nodeSize, l).setSelection(
      Me.near(u.doc.resolve(h))
    ), t(u);
  }
  return !0;
}
function ji({ state: e, dispatch: t, type: i }) {
  const n = kt((o) => o.type.name === ct.name)(e.selection), a = kt((o) => o.type.name === Ci.name)(e.selection);
  if (t && n && a) {
    const o = n.node, c = a.node.attrs.index;
    let s = 0;
    i === "before" ? s = (c - 1 + o.attrs.cols) % o.attrs.cols : s = (c + 1) % o.attrs.cols;
    let d = n.pos;
    o.content.forEach((h, u, f) => {
      f < s && (d += h.nodeSize);
    });
    const l = e.tr.setTime(Date.now());
    return l.setSelection(Me.near(l.doc.resolve(d))), t(l), !0;
  }
  return !1;
}
const Cl = 200, ct = he.create({
  name: "columns",
  group: "block",
  defining: !0,
  isolating: !0,
  allowGapCursor: !1,
  content: "column{1,}",
  priority: Cl,
  addOptions() {
    return {
      HTMLAttributes: {
        class: "columns"
      }
    };
  },
  addAttributes() {
    return {
      cols: {
        default: 2,
        parseHTML: (e) => e.getAttribute("cols")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[class=grid]"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["div", ne(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      insertColumns: (e) => ({ tr: t, dispatch: i, editor: n }) => {
        const a = kl(n.schema, e && e.cols || 3);
        if (i) {
          const o = t.selection.anchor + 1;
          t.replaceSelectionWith(a).scrollIntoView().setSelection(Me.near(t.doc.resolve(o)));
        }
        return !0;
      },
      addColBefore: () => ({ dispatch: e, state: t }) => jt({ dispatch: e, state: t, type: "addBefore" }),
      addColAfter: () => ({ dispatch: e, state: t }) => jt({ dispatch: e, state: t, type: "addAfter" }),
      deleteCol: () => ({ dispatch: e, state: t }) => jt({ dispatch: e, state: t, type: "delete" })
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-G": () => this.editor.commands.insertColumns(),
      Tab: () => ji({
        state: this.editor.state,
        dispatch: this.editor.view.dispatch,
        type: "after"
      }),
      "Shift-Tab": () => ji({
        state: this.editor.state,
        dispatch: this.editor.view.dispatch,
        type: "before"
      })
    };
  }
}), Ci = he.create({
  name: "column",
  content: "block+",
  isolating: !0,
  addOptions() {
    return {
      HTMLAttributes: {
        class: "column"
      }
    };
  },
  addAttributes() {
    return {
      index: {
        default: 0,
        parseHTML: (e) => e.getAttribute("index")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[class=column]"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["div", ne(this.options.HTMLAttributes, e), 0];
  }
}), fu = Z.create({
  name: "columnActionButton",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => {
            t.chain().focus().insertColumns({ cols: 2 }).run();
          },
          icon: "Columns",
          tooltip: i("editor.columns.tooltip")
        }
      })
    };
  }
}), Nl = Z.create({
  name: "selection",
  addProseMirrorPlugins() {
    const { editor: e } = this;
    return [
      new pe({
        key: new we("selection"),
        props: {
          decorations(t) {
            return t.selection.empty || e.isFocused === !0 ? null : Fe.create(t.doc, [
              Ue.inline(t.selection.from, t.selection.to, {
                class: "selection"
              })
            ]);
          }
        }
      })
    ];
  }
});
function Tl(e) {
  const { t } = V(), i = D(() => [
    {
      name: "paragraph",
      label: t("editor.paragraph.tooltip"),
      iconName: "Heading1",
      isActive: () => e.editor.isActive("paragraph") && !e.editor.isActive("orderedList") && !e.editor.isActive("bulletList") && !e.editor.isActive("taskList"),
      action: () => e.editor.chain().focus().clearNodes().run()
    },
    {
      name: "heading1",
      label: t("editor.heading.h1.tooltip"),
      isActive: () => e.editor.isActive("heading", { level: 1 }),
      iconName: "Heading1",
      action: () => e.editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run()
    },
    {
      name: "heading2",
      label: t("editor.heading.h2.tooltip"),
      isActive: () => e.editor.isActive("heading", { level: 2 }),
      iconName: "Heading2",
      action: () => e.editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run()
    },
    {
      name: "heading3",
      label: t("editor.heading.h3.tooltip"),
      isActive: () => e.editor.isActive("heading", { level: 3 }),
      iconName: "Heading3",
      action: () => e.editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run()
    },
    {
      name: "bulletList",
      label: t("editor.bulletlist.tooltip"),
      isActive: () => e.editor.isActive("bulletList"),
      iconName: "List",
      action: () => e.editor.chain().focus().clearNodes().toggleBulletList().run()
    },
    {
      name: "numberedList",
      label: t("editor.orderedlist.tooltip"),
      isActive: () => e.editor.isActive("orderedList"),
      iconName: "ListOrdered",
      action: () => e.editor.chain().focus().clearNodes().toggleOrderedList().run()
    },
    {
      name: "taskList",
      label: t("editor.tasklist.tooltip"),
      isActive: () => e.editor.isActive("taskList"),
      iconName: "ListTodo",
      action: () => e.editor.chain().focus().clearNodes().toggleTaskList().run()
    },
    {
      name: "blockquote",
      label: t("editor.blockquote.tooltip"),
      isActive: () => e.editor.isActive("blockquote"),
      iconName: "TextQuote",
      action: () => e.editor.chain().focus().clearNodes().toggleBlockquote().run()
    },
    {
      name: "codeBlock",
      label: t("editor.codeblock.tooltip"),
      isActive: () => e.editor.isActive("codeBlock"),
      iconName: "Code2",
      action: () => e.editor.chain().focus().clearNodes().toggleCodeBlock().run()
    }
  ], [e.editor, t]), n = D(() => i.filter((a) => a.isActive()).pop() ?? {
    label: "Empty"
  }, [i]);
  return /* @__PURE__ */ m(_e, { children: [
    /* @__PURE__ */ r(ve, { asChild: !0, children: /* @__PURE__ */ m(U, { variant: "ghost", className: "richtext-h-[32px] richtext-flex richtext-gap-1 richtext-px-1.5", children: [
      /* @__PURE__ */ m("span", { className: "richtext-text-sm richtext-font-normal richtext-whitespace-nowrap", children: [
        " ",
        n == null ? void 0 : n.label
      ] }),
      /* @__PURE__ */ r(St, { className: "richtext-w-4 richtext-h-4" })
    ] }) }),
    /* @__PURE__ */ r(xe, { hideWhenDetached: !0, className: "richtext-w-full richtext-p-1", align: "start", sideOffset: 5, children: i.map((a, o) => {
      var s;
      const c = mt[a.iconName];
      return /* @__PURE__ */ r(
        ze,
        {
          checked: ((s = a.isActive) == null ? void 0 : s.call(a)) || !1,
          onClick: () => a.action(),
          className: "richtext-cursor-pointer",
          children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-gap-2 richtext-px-2", children: [
            /* @__PURE__ */ r(c, { className: "richtext-w-3 richtext-h3" }),
            /* @__PURE__ */ m("span", { children: [
              " ",
              a.label
            ] })
          ] })
        },
        `text-bubble-${o}`
      );
    }) })
  ] });
}
const Al = Z.create({
  name: "text-bubble",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      toolbar: !1,
      button: () => ({
        component: Tl,
        componentProps: {}
      })
    };
  }
});
function Ui({ types: e, node: t }) {
  return Array.isArray(e) && e.includes(t.type) || t.type === e;
}
const Ll = Z.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: "paragraph",
      notAfter: ["paragraph"]
    };
  },
  addProseMirrorPlugins() {
    const e = new we(this.name), t = Object.entries(this.editor.schema.nodes).map(([, i]) => i).filter((i) => this.options.notAfter.includes(i.name));
    return [
      new pe({
        key: e,
        appendTransaction: (i, n, a) => {
          const { doc: o, tr: c, schema: s } = a, d = e.getState(a), l = o.content.size, h = s.nodes[this.options.node];
          if (d)
            return c.insert(l, h.create());
        },
        state: {
          init: (i, n) => {
            const a = n.tr.doc.lastChild;
            return !Ui({ node: a, types: t });
          },
          apply: (i, n) => {
            if (!i.docChanged)
              return n;
            const a = i.doc.lastChild;
            return !Ui({ node: a, types: t });
          }
        }
      })
    ];
  }
}), gu = Z.create({
  name: "base-kit",
  addExtensions() {
    const e = [];
    return this.options.document !== !1 && e.push(_l.configure()), this.options.placeholder !== !1 && e.push(
      Ka.configure({
        placeholder: ({ node: t, pos: i, editor: n }) => {
          var a, o, c, s, d;
          return ((a = t == null ? void 0 : t.type) == null ? void 0 : a.name) === "columns" || ((o = t == null ? void 0 : t.content) == null ? void 0 : o.size) !== 0 ? "" : ((c = t == null ? void 0 : t.type) == null ? void 0 : c.name) === "heading" ? `${j.t(`editor.heading.h${t.attrs.level}.tooltip`)}` : ((s = t == null ? void 0 : t.type) == null ? void 0 : s.name) === "codeBlock" || ((d = t == null ? void 0 : t.type) == null ? void 0 : d.name) === "table" ? "" : n.extensionManager.extensions.some((l) => l.name === "slashCommand") ? j.t("editor.slash") : i === 0 ? j.t("editor.content") : j.t("editor.content");
        },
        ...this.options.placeholder
      })
    ), this.options.focus !== !1 && e.push(
      qa.configure({
        className: "focus",
        ...this.options.focus
      })
    ), this.options.text !== !1 && e.push(Ga.configure()), this.options.textBubble !== !1 && e.push(Al.configure()), this.options.gapcursor !== !1 && e.push(Xa.configure()), this.options.dropcursor !== !1 && e.push(
      Za.configure({
        ...this.options.dropcursor,
        width: 2,
        class: "ProseMirror-dropcursor border-black"
      })
    ), this.options.characterCount !== !1 && e.push(Ya.configure(this.options.characterCount)), this.options.paragraph !== !1 && e.push(Ja.configure(this.options.paragraph)), this.options.hardBreak !== !1 && e.push(Qa.configure(this.options.hardBreak)), this.options.listItem !== !1 && e.push(eo.configure(this.options.listItem)), this.options.textStyle !== !1 && e.push(to.configure(this.options.textStyle)), this.options.trailingNode !== !1 && e.push(Ll.configure(this.options.trailingNode)), this.options.selection !== !1 && e.push(Nl), this.options.multiColumn !== !1 && (e.push(Ci), e.push(ct)), e;
  }
}), xu = Z.create({
  name: "subAndSuperScript",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, extension: i, t: n }) => {
        const a = i.options.subscript, o = i.options.superscript, c = {
          component: _,
          componentProps: {
            action: () => t.commands.toggleSubscript(),
            isActive: () => t.isActive("subscript") || !1,
            disabled: !t.can().toggleSubscript(),
            icon: "Subscript",
            tooltip: n("editor.subscript.tooltip")
          }
        }, s = {
          component: _,
          componentProps: {
            action: () => t.commands.toggleSuperscript(),
            isActive: () => t.isActive("superscript") || !1,
            disabled: !t.can().toggleSuperscript(),
            icon: "Superscript",
            tooltip: n("editor.superscript.tooltip")
          }
        }, d = [];
        return a !== !1 && d.push(c), o !== !1 && d.push(s), d;
      }
    };
  },
  addExtensions() {
    const e = [];
    return this.options.subscript !== !1 && e.push(on.configure(this.options.subscript)), this.options.superscript !== !1 && e.push(cn.configure(this.options.superscript)), e;
  }
});
function Sl(e) {
  var i;
  const t = D(() => {
    var o;
    const n = (o = e == null ? void 0 : e.items) == null ? void 0 : o.find((c) => c.isActive());
    return n && !n.default ? {
      ...n,
      icon: n != null && n.icon ? n == null ? void 0 : n.icon : e == null ? void 0 : e.icon
    } : {
      title: e.tooltip,
      icon: e.icon,
      isActive: () => !1
    };
  }, [e]);
  return /* @__PURE__ */ m(_e, { children: [
    /* @__PURE__ */ r(ve, { disabled: e == null ? void 0 : e.disabled, asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        customClass: "!richtext-w-12 richtext-h-12",
        icon: e == null ? void 0 : e.icon,
        tooltip: e == null ? void 0 : e.tooltip,
        disabled: e == null ? void 0 : e.disabled,
        children: /* @__PURE__ */ r(Bn, { className: "richtext-w-3 richtext-h-3 richtext-text-gray-500" })
      }
    ) }),
    /* @__PURE__ */ r(xe, { className: "w-full", children: (i = e == null ? void 0 : e.items) == null ? void 0 : i.map((n, a) => /* @__PURE__ */ m(
      ze,
      {
        checked: t.title === n.title,
        onClick: n.action,
        className: "richtext-flex richtext-items-center richtext-gap-3",
        children: [
          /* @__PURE__ */ r(F, { name: n == null ? void 0 : n.icon }),
          /* @__PURE__ */ r("span", { className: "richtext-ml-1", children: n.title }),
          !!(n != null && n.shortcutKeys) && /* @__PURE__ */ r("span", { className: "richtext-ml-auto richtext-text-xs richtext-tracking-widest richtext-opacity-60", children: Ht(n.shortcutKeys) })
        ]
      },
      `more-mark-${a}`
    )) })
  ] });
}
const bu = Z.create({
  name: "moreMark",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button({ editor: t, extension: i, t: n }) {
        const a = i.options.subscript, o = i.options.superscript, c = {
          action: () => t.commands.toggleSubscript(),
          isActive: () => t.isActive("subscript") || !1,
          disabled: !t.can().toggleSubscript(),
          icon: "Subscript",
          title: n("editor.subscript.tooltip"),
          shortcutKeys: ["mod", "."]
        }, s = {
          action: () => t.commands.toggleSuperscript(),
          isActive: () => t.isActive("superscript") || !1,
          disabled: !t.can().toggleSuperscript(),
          icon: "Superscript",
          title: n("editor.superscript.tooltip"),
          shortcutKeys: ["mod", ","]
        }, d = [];
        return a !== !1 && d.push(c), o !== !1 && d.push(s), {
          component: Sl,
          componentProps: {
            icon: "Type",
            tooltip: n("editor.moremark"),
            disabled: !t.isEditable,
            items: d
          }
        };
      }
    };
  },
  addExtensions() {
    const e = [];
    return this.options.subscript !== !1 && e.push(on.configure(this.options.subscript)), this.options.superscript !== !1 && e.push(cn.configure(this.options.superscript)), e;
  }
}), pu = Z.create({
  name: "indent",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      types: ["paragraph", "heading", "blockquote"],
      minIndent: Ae.min,
      maxIndent: Ae.max,
      button({ editor: t, t: i }) {
        return [
          {
            component: _,
            componentProps: {
              action: () => {
                t.commands.indent();
              },
              shortcutKeys: ["Tab"],
              icon: "IndentIncrease",
              tooltip: i("editor.indent.tooltip")
            }
          },
          {
            component: _,
            componentProps: {
              action: () => {
                t.commands.outdent();
              },
              shortcutKeys: ["Shift", "Tab"],
              icon: "IndentDecrease",
              tooltip: i("editor.outdent.tooltip")
            }
          }
        ];
      }
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (e) => {
              const t = e.dataset.indent;
              return (t ? Number.parseInt(t, 10) : 0) || 0;
            },
            renderHTML: (e) => e.indent ? { "data-indent": e.indent } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      indent: () => Vi({
        delta: Ae.more,
        types: this.options.types
      }),
      outdent: () => Vi({
        delta: Ae.less,
        types: this.options.types
      })
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      "Shift-Tab": () => this.editor.commands.outdent()
    };
  }
});
function Ml(e) {
  return Number.parseFloat(e.replace("%", "")) / 100;
}
function Il(e) {
  const { t } = V(), [i, n] = p("default");
  function a(c) {
    c === "default" ? e.editor.commands.unsetLineHeight() : e.editor.commands.setLineHeight(c), n(c);
  }
  const o = D(() => {
    const d = e.editor.extensionManager.extensions.find(
      (l) => l.name === "lineHeight"
    ).options.lineHeights.map((l) => ({
      label: Ml(l),
      value: l
    }));
    return d.unshift({
      label: t("editor.default"),
      value: "default"
    }), d;
  }, [e]);
  return /* @__PURE__ */ m(_e, { children: [
    /* @__PURE__ */ r(ve, { disabled: e == null ? void 0 : e.disabled, asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        customClass: "!richtext-w-12 richtext-h-12",
        icon: "LineHeight",
        tooltip: e == null ? void 0 : e.tooltip,
        disabled: e == null ? void 0 : e.disabled,
        children: /* @__PURE__ */ r(F, { className: "richtext-w-3 richtext-h-3 richtext-ml-1 richtext-text-zinc-500", name: "MenuDown" })
      }
    ) }),
    /* @__PURE__ */ r(xe, { className: "richtext-min-w-24", children: o == null ? void 0 : o.map((c, s) => /* @__PURE__ */ r(
      ze,
      {
        checked: c.value === i,
        onClick: () => a(c.value),
        children: c.label
      },
      `lineHeight-${s}`
    )) })
  ] });
}
const zl = ["paragraph", "heading", "list_item", "todo_item"];
function El(e, t) {
  const { selection: i, doc: n } = e;
  if (!i || !n || !(i instanceof Me || i instanceof dn))
    return e;
  const { from: a, to: o } = i, c = [], s = t && t !== gn ? t : null;
  if (n.nodesBetween(a, o, (d, l) => {
    const h = d.type;
    return zl.includes(h.name) ? ((d.attrs.lineHeight || null) !== s && c.push({
      node: d,
      pos: l,
      nodeType: h
    }), h.name !== "list_item" && h.name !== "todo_item") : !0;
  }), c.length === 0)
    return e;
  for (const d of c) {
    const { node: l, pos: h, nodeType: u } = d;
    let { attrs: f } = l;
    f = {
      ...f,
      lineHeight: s
    }, e = e.setNodeMarkup(h, u, f, l.marks);
  }
  return e;
}
function Hl(e) {
  return ({ state: t, dispatch: i }) => {
    const { selection: n } = t;
    let { tr: a } = t;
    return a = a.setSelection(n), a = El(a, e), a.docChanged ? (i && i(a), !0) : !1;
  };
}
const wu = Z.create({
  name: "lineHeight",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      types: ["paragraph", "heading", "list_item", "todo_item"],
      lineHeights: vo,
      defaultHeight: gn,
      button({ editor: t, t: i }) {
        return {
          component: Il,
          componentProps: {
            editor: t,
            tooltip: i("editor.lineheight.tooltip")
          }
        };
      }
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (e) => e.style.lineHeight || this.options.defaultHeight,
            renderHTML: (e) => e.lineHeight === this.options.defaultHeight || !e.lineHeight ? {} : { style: `line-height: ${e.lineHeight}` }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setLineHeight: (e) => Hl(e),
      unsetLineHeight: () => ({ commands: e }) => this.options.types.every((t) => e.resetAttributes(t, "lineHeight"))
    };
  }
}), Wn = It({
  isOpen: !1
});
function Rl() {
  return zt(Wn);
}
const $e = {
  setOpen: (e) => {
    Wn.isOpen = e;
  }
}, Kn = It({
  isOpen: !1
});
function Ol() {
  return zt(Kn);
}
const rt = {
  setOpen: (e) => {
    Kn.isOpen = e;
  }
};
function Pl(e) {
  const t = [
    {
      name: "format",
      title: j.t("editor.slash.format"),
      commands: []
    },
    {
      name: "insert",
      title: j.t("editor.slash.insert"),
      commands: []
    }
  ];
  return e.forEach((i) => {
    i.name.toLowerCase() === "heading" && i.options.levels.forEach((n) => {
      t[0].commands.push({
        name: `heading${n}`,
        label: j.t(`editor.heading.h${n}.tooltip`),
        aliases: [`h${n}`, "bt", `bt${n}`],
        iconName: `Heading${n}`,
        action: ({ editor: a, range: o }) => {
          a.chain().focus().deleteRange(o).setHeading({ level: n }).run();
        }
      });
    }), i.name.toLowerCase() === "bulletlist" && t[0].commands.push({
      name: "bulletList",
      label: j.t("editor.bulletlist.tooltip"),
      aliases: ["ul", "yxlb"],
      iconName: "List",
      action: ({ editor: n, range: a }) => {
        n.chain().focus().deleteRange(a).toggleBulletList().run();
      }
    }), i.name.toLowerCase() === "orderedlist" && t[0].commands.push({
      name: "numberedList",
      label: j.t("editor.orderedlist.tooltip"),
      aliases: ["ol", "yxlb"],
      iconName: "ListOrdered",
      action: ({ editor: n, range: a }) => {
        n.chain().focus().deleteRange(a).toggleOrderedList().run();
      }
    }), i.name.toLowerCase() === "tasklist" && t[0].commands.push({
      name: "taskList",
      label: j.t("editor.tasklist.tooltip"),
      iconName: "ListTodo",
      description: "Task list with todo items",
      aliases: ["todo"],
      action: ({ editor: n, range: a }) => {
        n.chain().focus().deleteRange(a).toggleTaskList().run();
      }
    }), i.name.toLowerCase() === "blockquote" && t[0].commands.push({
      name: "blockquote",
      label: j.t("editor.blockquote.tooltip"),
      description: "插入引入格式",
      aliases: ["yr"],
      iconName: "TextQuote",
      action: ({ editor: n, range: a }) => {
        n.chain().focus().deleteRange(a).setBlockquote().run();
      }
    }), i.name.toLowerCase() === "codeblock" && t[0].commands.push({
      name: "codeBlock",
      label: j.t("editor.codeblock.tooltip"),
      iconName: "Code2",
      description: "Code block with syntax highlighting",
      shouldBeHidden: (n) => n.isActive("columns"),
      action: ({ editor: n, range: a }) => {
        n.chain().focus().deleteRange(a).setCodeBlock().run();
      }
    }), i.name.toLowerCase() === "image" && t[1].commands.push({
      name: "image",
      label: j.t("editor.image.tooltip"),
      iconName: "ImageUp",
      description: "Insert a image",
      aliases: ["image", "tp", "tupian"],
      shouldBeHidden: (n) => n.isActive("columns"),
      action: ({ editor: n, range: a }) => {
        n.chain().focus().deleteRange(a).run(), $e.setOpen(!0);
      }
    }), i.name.toLowerCase() === "video" && t[1].commands.push({
      name: "video",
      label: j.t("editor.video.tooltip"),
      iconName: "Video",
      description: "Insert a video",
      aliases: ["video", "sp", "shipin"],
      shouldBeHidden: (n) => n.isActive("columns"),
      action: ({ editor: n, range: a }) => {
        n.chain().focus().deleteRange(a).run(), rt.setOpen(!0);
      }
    }), i.name.toLowerCase() === "table" && t[1].commands.push({
      name: "table",
      label: j.t("editor.table.tooltip"),
      iconName: "Table",
      description: "Insert a table",
      aliases: ["table", "bg", "biaoge", "biao"],
      shouldBeHidden: (n) => n.isActive("columns"),
      action: ({ editor: n, range: a }) => {
        n.chain().focus().deleteRange(a).insertTable({ rows: 3, cols: 3, withHeaderRow: !1 }).run();
      }
    }), i.name.toLowerCase() === "horizontalrule" && t[1].commands.push({
      name: "horizontalRule",
      label: j.t("editor.horizontalrule.tooltip"),
      iconName: "Minus",
      description: "Insert a horizontal divider",
      aliases: ["hr", "fgx", "fg"],
      action: ({ editor: n, range: a }) => {
        n.chain().focus().deleteRange(a).setHorizontalRule().run();
      }
    }), i.name.toLowerCase() === "columns" && t[1].commands.push({
      name: "columns",
      label: j.t("editor.columns.tooltip"),
      iconName: "Columns2",
      description: "Add two column content",
      action: ({ editor: n }) => {
        n.chain().focus().insertColumns({ cols: 2 }).run();
      }
    });
  }), t;
}
function Dl(e, t) {
  var y, T;
  const [i, n] = p(0), [a, o] = p(0), c = Y(null), { t: s } = V(), d = Y([]);
  Lt(t, () => ({
    onKeyDown: l
  })), z(() => {
    if (!c.current)
      return;
    const v = a * 1e3 + i, w = d.current[v];
    w && w.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, [i, a]);
  function l({ event: v }) {
    return v.key === "ArrowUp" ? (h(), !0) : v.key === "ArrowDown" ? (u(), !0) : v.key === "Enter" ? (f(), !0) : !1;
  }
  function h() {
    var k;
    if (e.items.length === 0)
      return !1;
    let v = i - 1, w = a;
    v < 0 && (w = a - 1, v = ((k = e.items[w]) == null ? void 0 : k.commands.length) - 1 || 0), w < 0 && (w = e.items.length - 1, v = e.items[w].commands.length - 1), n(v), o(w);
  }
  function u() {
    if (e.items.length === 0)
      return !1;
    const v = e.items[a].commands;
    let w = i + 1, k = a;
    v.length - 1 < w && (w = 0, k = a + 1), e.items.length - 1 < k && (k = 0), n(w), o(k);
  }
  function f() {
    if (e.items.length === 0 || a === -1 || i === -1)
      return !1;
    g(a, i);
  }
  function g(v, w) {
    const k = e.items[v].commands[w];
    e.command(k);
  }
  function x(v, w) {
    g(v, w);
  }
  function b(v, w, k) {
    d.current[v * 1e3 + w] = k;
  }
  return /* @__PURE__ */ r(
    "div",
    {
      className: "!richtext-bg-white richtext-rounded-lg dark:!richtext-bg-black richtext-shadow-sm !richtext-border !richtext-border-neutral-200 dark:!richtext-border-neutral-800 !richtext-text-black richtext-max-h-[min(80vh,24rem)] richtext-overflow-auto richtext-flex-wrap richtext-p-1",
      ref: c,
      children: (y = e == null ? void 0 : e.items) != null && y.length ? /* @__PURE__ */ r("div", { className: "richtext-grid richtext-grid-cols-1 richtext-gap-0.5 richtext-min-w-48", children: (T = e == null ? void 0 : e.items) == null ? void 0 : T.map((v, w) => /* @__PURE__ */ m(st, { children: [
        /* @__PURE__ */ r("div", { className: "!richtext-text-neutral-500 richtext-text-[0.65rem] richtext-col-[1/-1] richtext-mx-2 richtext-mt-2 richtext-font-semibold richtext-tracking-wider richtext-select-none richtext-uppercase first:richtext-mt-0.5", children: v.title }),
        v.commands.map((k, N) => /* @__PURE__ */ m(
          "button",
          {
            className: P("richtext-flex richtext-items-center richtext-gap-3 richtext-px-2 richtext-py-1.5 richtext-text-sm !richtext-text-neutral-800 dark:!richtext-text-neutral-200 richtext-text-left richtext-w-full richtext-rounded-sm richtext-outline-none richtext-transition-colors !richtext-bg-transparent hover:!richtext-bg-accent ", {
              "slash-command-active": a === w && i === N
            }),
            ref: (I) => b(w, N, I),
            onClick: () => x(w, N),
            children: [
              k.iconUrl && /* @__PURE__ */ r("img", { className: "richtext-w-6 richtext-h-6", src: k.iconUrl, alt: "" }),
              k.iconName && /* @__PURE__ */ r(F, { name: k.iconName, className: "!richtext-mr-1 !richtext-text-lg" }),
              k.label
            ]
          },
          `command-${N}`
        ))
      ] }, `slash-${v.title}`)) }) : /* @__PURE__ */ r("div", { className: "richtext-p-3", children: /* @__PURE__ */ r("span", { className: "richtext-text-xs richtext-text-gray-800 dark:richtext-text-gray-100", children: s("editor.slash.empty") }) })
    }
  );
}
const Bl = At(Dl), Te = "slashCommand";
let W;
const _u = Z.create({
  name: Te,
  priority: 200,
  onCreate() {
    W = mi("body", {
      interactive: !0,
      trigger: "manual",
      placement: "bottom-start",
      theme: "slash-command",
      maxWidth: "16rem",
      offset: [16, 8],
      popperOptions: {
        strategy: "fixed",
        modifiers: [
          {
            name: "flip",
            enabled: !1
          }
        ]
      }
    });
  },
  addProseMirrorPlugins() {
    return [
      sn({
        editor: this.editor,
        char: "/",
        allowSpaces: !0,
        startOfLine: !0,
        pluginKey: new we(Te),
        allow: ({ state: e, range: t }) => {
          var l, h, u;
          const i = e.doc.resolve(t.from), n = i.depth === 1, a = i.parent.type.name === "paragraph", o = ((l = i.parent.textContent) == null ? void 0 : l.charAt(0)) === "/", c = this.editor.isActive("column"), s = (u = i.parent.textContent) == null ? void 0 : u.slice(
            Math.max(0, (h = i.parent.textContent) == null ? void 0 : h.indexOf("/"))
          ), d = !(s != null && s.endsWith("  "));
          return (n && a && o || c && a && o) && d;
        },
        command: ({ editor: e, range: t, props: i }) => {
          const { view: n } = e;
          i.action({ editor: e, range: t }), n.focus();
        },
        items: ({ query: e, editor: t }) => Pl(t.extensionManager.extensions).map((c) => ({
          ...c,
          commands: c.commands.filter((s) => {
            const d = s.label.toLowerCase().trim(), l = e.toLowerCase().trim();
            if (s.aliases) {
              const h = s.aliases.map((g) => g.toLowerCase().trim()), u = d.match(l), f = h.some((g) => g.match(l));
              return u || f;
            }
            return d.match(l);
          }).filter(
            (s) => s.shouldBeHidden ? !s.shouldBeHidden(this.editor) : !0
          )
        })).filter((c) => c.commands.length > 0).map((c) => ({
          ...c,
          commands: c.commands.map((s) => ({
            ...s,
            isEnabled: !0
          }))
        })),
        render: () => {
          let e, t = null;
          return {
            onStart: (i) => {
              var o;
              e = new oi(Bl, {
                props: i,
                editor: i.editor
              });
              const { view: n } = i.editor, a = () => {
                if (!i.clientRect)
                  return i.editor.storage[Te].rect;
                const c = i.clientRect();
                if (!c)
                  return i.editor.storage[Te].rect;
                let s = c.y;
                if (c.top + e.element.offsetHeight + 40 > window.innerHeight) {
                  const d = c.top + e.element.offsetHeight - window.innerHeight + 40;
                  s = c.y - d;
                }
                return new DOMRect(c.x, s, c.width, c.height);
              };
              t = () => {
                W == null || W[0].setProps({
                  getReferenceClientRect: a
                });
              }, (o = n.dom.parentElement) == null || o.addEventListener("scroll", t), W == null || W[0].setProps({
                getReferenceClientRect: a,
                appendTo: () => document.body,
                content: e.element
              }), W == null || W[0].show();
            },
            onUpdate(i) {
              var c;
              e.updateProps(i);
              const { view: n } = i.editor, a = () => {
                if (!i.clientRect)
                  return i.editor.storage[Te].rect;
                const s = i.clientRect();
                return s ? new DOMRect(s.x, s.y, s.width, s.height) : i.editor.storage[Te].rect;
              }, o = () => {
                W == null || W[0].setProps({
                  getReferenceClientRect: a
                });
              };
              (c = n.dom.parentElement) == null || c.addEventListener("scroll", o), i.editor.storage[Te].rect = i.clientRect ? a() : {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
              }, W == null || W[0].setProps({
                getReferenceClientRect: a
              });
            },
            onKeyDown(i) {
              var n;
              return i.event.key === "Escape" ? (W == null || W[0].hide(), !0) : (W != null && W[0].state.isShown || W == null || W[0].show(), (n = e.ref) == null ? void 0 : n.onKeyDown(i));
            },
            onExit(i) {
              var n;
              if (W == null || W[0].hide(), t) {
                const { view: a } = i.editor;
                (n = a.dom.parentElement) == null || n.removeEventListener("scroll", t);
              }
              e.destroy();
            }
          };
        }
      })
    ];
  },
  addStorage() {
    return {
      rect: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    };
  }
}), pt = {
  TOP_LEFT: "tl",
  TOP_RIGHT: "tr",
  BOTTOM_LEFT: "bl",
  BOTTOM_RIGHT: "br"
};
function $l(e) {
  var O, M;
  const [t, i] = p({
    width: We,
    height: We
  }), [n, a] = p({
    width: 0,
    height: 0
  }), [o] = p([
    pt.TOP_LEFT,
    pt.TOP_RIGHT,
    pt.BOTTOM_LEFT,
    pt.BOTTOM_RIGHT
  ]), [c, s] = p(!1), [d, l] = p({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    dir: ""
  }), { align: h, inline: u } = (O = e == null ? void 0 : e.node) == null ? void 0 : O.attrs, f = D(() => {
    var Ni;
    const { src: S, alt: L, width: C, height: B, flipX: R, flipY: H } = (Ni = e == null ? void 0 : e.node) == null ? void 0 : Ni.attrs, E = Ct(C) ? `${C}px` : C, G = Ct(B) ? `${B}px` : B, J = [];
    R && J.push("rotateX(180deg)"), H && J.push("rotateY(180deg)");
    const ft = J.join(" ");
    return {
      src: S || void 0,
      alt: L || void 0,
      style: {
        width: E || void 0,
        height: G || void 0,
        transform: ft || "none"
      }
    };
  }, [(M = e == null ? void 0 : e.node) == null ? void 0 : M.attrs]), g = D(() => {
    const {
      style: { width: S }
    } = f;
    return { width: S === "100%" ? S : void 0 };
  }, [f]);
  function x(S) {
    a({
      width: S.target.width,
      height: S.target.height
    });
  }
  function b() {
    const { editor: S, getPos: L } = e;
    S.commands.setNodeSelection(L());
  }
  const y = A(
    Se(() => {
      const { editor: S } = e, { width: L } = getComputedStyle(S.view.dom);
      i((C) => ({
        ...C,
        width: Number.parseInt(L, 10)
      }));
    }, Ke),
    [e == null ? void 0 : e.editor]
  );
  function T(S, L) {
    S.preventDefault(), S.stopPropagation();
    const C = n.width, B = n.height, R = C / B;
    let H = Number(e.node.attrs.width), E = Number(e.node.attrs.height);
    const G = t.width;
    H && !E ? (H = H > G ? G : H, E = Math.round(H / R)) : E && !H ? (H = Math.round(E * R), H = H > G ? G : H) : !H && !E ? (H = C > G ? G : C, E = Math.round(H / R)) : H = H > G ? G : H, qe(() => {
      s(!0), l({
        x: S.clientX,
        y: S.clientY,
        w: H,
        h: E,
        dir: L
      });
    });
  }
  const v = A(
    Se((S) => {
      if (S.preventDefault(), S.stopPropagation(), !c)
        return;
      const { x: L, w: C, dir: B } = d, R = (S.clientX - L) * (/l/.test(B) ? -1 : 1), H = hn(C + R, hi, t.width);
      e.updateAttributes({
        width: H,
        height: null
      });
    }, Ke),
    [c, d, t, e.updateAttributes]
  ), w = A(
    (S) => {
      S.preventDefault(), S.stopPropagation(), c && (qe(() => {
        l({
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          dir: ""
        }), s(!1);
      }), b());
    },
    [c, b]
  ), k = A(() => {
    document == null || document.addEventListener("mousemove", v, !0), document == null || document.addEventListener("mouseup", w, !0);
  }, [v, w]), N = A(() => {
    document == null || document.removeEventListener("mousemove", v, !0), document == null || document.removeEventListener("mouseup", w, !0);
  }, [v, w]);
  z(() => (c ? k() : N(), () => {
    N();
  }), [c, k, N]);
  const I = D(() => new ResizeObserver(() => y()), [y]);
  return z(() => (I.observe(e.editor.view.dom), () => {
    I.disconnect();
  }), [e.editor.view.dom, I]), /* @__PURE__ */ r(
    ae,
    {
      className: "image-view",
      style: { ...g, textAlign: h, display: u ? "inline" : "block" },
      as: u ? "span" : "div",
      children: /* @__PURE__ */ m(
        "div",
        {
          draggable: "true",
          "data-drag-handle": !0,
          className: `image-view__body ${e != null && e.selected ? "image-view__body--focused" : ""} ${c ? "image-view__body--resizing" : ""}`,
          style: g,
          children: [
            /* @__PURE__ */ r(
              "img",
              {
                src: f.src,
                alt: f.alt,
                style: f.style,
                height: "auto",
                className: "image-view__body__image block",
                onLoad: x,
                onClick: b
              }
            ),
            (e == null ? void 0 : e.editor.view.editable) && ((e == null ? void 0 : e.selected) || c) && /* @__PURE__ */ r("div", { className: "image-resizer", children: o == null ? void 0 : o.map((S) => /* @__PURE__ */ r(
              "span",
              {
                className: `image-resizer__handler image-resizer__handler--${S}`,
                onMouseDown: (L) => T(L, S)
              },
              `image-dir-${S}`
            )) })
          ]
        }
      )
    }
  );
}
function Vl({ editor: e, imageInline: t, onClose: i }) {
  const { t: n } = V(), [a, o] = p(!1), c = Le.useRef(null), [s, d] = Le.useState(), [l, h] = Le.useState(""), u = Y(null), [f, g] = p({
    src: "",
    file: null
  });
  function x(w) {
    if (c.current && w.width && w.height) {
      const k = b(c.current, w);
      h(k);
    }
  }
  function b(w, k) {
    const N = document.createElement("canvas"), I = w.naturalWidth / w.width, O = w.naturalHeight / w.height;
    N.width = k.width * I, N.height = k.height * O;
    const M = N.getContext("2d");
    return M && (M.imageSmoothingEnabled = !1, M.drawImage(
      w,
      k.x * I,
      k.y * O,
      k.width * I,
      k.height * O,
      0,
      0,
      k.width * I,
      k.height * O
    )), N.toDataURL("image/png", 1);
  }
  async function y() {
    var w, k;
    try {
      const N = await _i(l, ((w = f == null ? void 0 : f.file) == null ? void 0 : w.name) || "image.png"), I = (k = e.extensionManager.extensions.find(
        (M) => M.name === "image"
      )) == null ? void 0 : k.options;
      let O = "";
      I.upload ? O = await I.upload(N) : O = URL.createObjectURL(N), e.chain().focus().setImageInline({ src: O, inline: t }).run(), o(!1), g({
        src: "",
        file: null
      }), i();
    } catch (N) {
      console.log("Error cropping image", N);
    }
  }
  function T(w) {
    var k;
    w.preventDefault(), (k = u.current) == null || k.click();
  }
  const v = async (w) => {
    var O;
    const k = (O = w == null ? void 0 : w.target) == null ? void 0 : O.files;
    if (!e || e.isDestroyed || k.length === 0)
      return;
    const N = k[0], I = await Sc(N);
    o(!0), g({
      src: I.src,
      file: N
    });
  };
  return /* @__PURE__ */ m(K, { children: [
    /* @__PURE__ */ r(U, { className: "richtext-w-full richtext-mt-1", size: "sm", onClick: T, children: n("editor.image.dialog.tab.uploadCrop") }),
    /* @__PURE__ */ m(He, { open: a, children: [
      /* @__PURE__ */ r(Re, {}),
      /* @__PURE__ */ m(ye, { children: [
        /* @__PURE__ */ r(ke, { children: n("editor.image.dialog.tab.uploadCrop") }),
        /* @__PURE__ */ r("div", { children: f.src && /* @__PURE__ */ r(
          Co,
          {
            crop: s,
            onChange: (w) => d(w),
            onComplete: (w) => x(w),
            className: "richtext-w-full",
            children: /* @__PURE__ */ r(
              "img",
              {
                ref: c,
                alt: "Crop me",
                src: f.src
              }
            )
          }
        ) }),
        /* @__PURE__ */ m(et, { children: [
          /* @__PURE__ */ m(
            U,
            {
              onClick: () => {
                o(!1), g({
                  src: "",
                  file: null
                });
              },
              children: [
                n("editor.imageUpload.cancel"),
                /* @__PURE__ */ r(F, { name: "Trash2", className: "richtext-ml-[4px]" })
              ]
            }
          ),
          /* @__PURE__ */ m(U, { className: "richtext-w-fit", onClick: y, children: [
            n("editor.imageUpload.crop"),
            /* @__PURE__ */ r(F, { name: "Crop", className: "richtext-ml-[4px]" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r(
      "input",
      {
        type: "file",
        accept: "image/*",
        ref: u,
        multiple: !0,
        style: {
          display: "none"
        },
        onChange: v
      }
    )
  ] });
}
function Fl(e) {
  const { t } = V(), i = Rl(), [n, a] = p(""), o = Y(null), [c, s] = p(!1);
  async function d(u) {
    var y, T;
    const f = (y = u == null ? void 0 : u.target) == null ? void 0 : y.files;
    if (!e.editor || e.editor.isDestroyed || f.length === 0)
      return;
    const g = f[0], x = (T = e.editor.extensionManager.extensions.find(
      (v) => v.name === "image"
    )) == null ? void 0 : T.options;
    let b = "";
    x.upload ? b = await x.upload(g) : b = URL.createObjectURL(g), e.editor.chain().focus().setImageInline({ src: b, inline: c }).run(), $e.setOpen(!1), s(!1);
  }
  function l(u) {
    u.preventDefault(), u.stopPropagation(), e.editor.chain().focus().setImageInline({ src: n, inline: c }).run(), $e.setOpen(!1), s(!1);
  }
  function h(u) {
    var f;
    u.preventDefault(), (f = o.current) == null || f.click();
  }
  return /* @__PURE__ */ m(He, { open: i.isOpen, onOpenChange: $e.setOpen, children: [
    /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        icon: e.icon,
        action: () => $e.setOpen(!0),
        tooltip: e.tooltip
      }
    ) }),
    /* @__PURE__ */ m(ye, { children: [
      /* @__PURE__ */ r(ke, { children: t("editor.image.dialog.title") }),
      /* @__PURE__ */ m(pi, { defaultValue: "upload", activationMode: "manual", children: [
        /* @__PURE__ */ m(Ot, { className: "richtext-grid richtext-w-full richtext-grid-cols-2", children: [
          /* @__PURE__ */ m(Ge, { value: "upload", children: [
            t("editor.image.dialog.tab.upload"),
            " "
          ] }),
          /* @__PURE__ */ m(Ge, { value: "link", children: [
            " ",
            t("editor.image.dialog.tab.url"),
            " "
          ] })
        ] }),
        /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-gap-[4px] richtext-my-[10px]", children: [
          /* @__PURE__ */ r(
            Nn,
            {
              checked: c,
              onCheckedChange: (u) => {
                s(u);
              }
            }
          ),
          /* @__PURE__ */ r(ie, { children: t("editor.link.dialog.inline") })
        ] }),
        /* @__PURE__ */ m(Xe, { value: "upload", children: [
          /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-gap-[10px]", children: [
            /* @__PURE__ */ r(U, { className: "richtext-w-full richtext-mt-1", size: "sm", onClick: h, children: t("editor.image.dialog.tab.upload") }),
            /* @__PURE__ */ r(
              Vl,
              {
                editor: e.editor,
                imageInline: c,
                onClose: () => $e.setOpen(!1)
              }
            )
          ] }),
          /* @__PURE__ */ r(
            "input",
            {
              type: "file",
              accept: "image/*",
              ref: o,
              multiple: !0,
              style: {
                display: "none"
              },
              onChange: d
            }
          )
        ] }),
        /* @__PURE__ */ r(Xe, { value: "link", children: /* @__PURE__ */ r("form", { onSubmit: l, children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-gap-2", children: [
          /* @__PURE__ */ r(
            te,
            {
              type: "url",
              autoFocus: !0,
              value: n,
              onChange: (u) => a(u.target.value),
              required: !0,
              placeholder: t("editor.image.dialog.placeholder")
            }
          ),
          /* @__PURE__ */ r(U, { type: "submit", children: t("editor.image.dialog.button.apply") })
        ] }) }) })
      ] })
    ] })
  ] });
}
const je = new we("upload-image");
function jl() {
  return new pe({
    key: je,
    state: {
      init() {
        return Fe.empty;
      },
      apply(e, t) {
        t = t.map(e.mapping, e.doc);
        const i = e.getMeta(je);
        if (i != null && i.add)
          for (const { id: n, pos: a, src: o } of i.add) {
            const c = Ul(o), s = Ue.widget(a, c, { id: n });
            t = t.add(e.doc, [s]);
          }
        else if (i != null && i.remove)
          for (const n of i.remove)
            t = t.remove(t.find(void 0, void 0, (a) => a.id === n));
        return t;
      }
    },
    props: {
      decorations(e) {
        return this.getState(e);
      }
    }
  });
}
function Ul(e) {
  const t = document.createElement("div"), i = document.createElement("img");
  return i.setAttribute("class", "opacity-50"), i.src = e, i.addEventListener("load", () => {
    t.setAttribute("class", "img-placeholder");
  }), t.append(i), t;
}
function Wl(e, t) {
  var a;
  const n = je.getState(e).find(void 0, void 0, (o) => o.id === t);
  return n.length > 0 ? (a = n[0]) == null ? void 0 : a.from : null;
}
function Kl({ validateFn: e, onUpload: t, postUpload: i }) {
  return (n, a, o) => {
    for (const c of n) {
      if (e && !e(c))
        continue;
      const s = Date.now().toString(), d = a.state.tr;
      d.selection.empty || d.deleteSelection();
      const l = URL.createObjectURL(c);
      d.setMeta(je, {
        add: [{ id: s, pos: o, src: l }]
      }), a.dispatch(d), t(c).then(
        async (h) => {
          var T;
          i && typeof h == "string" && (h = await i(h));
          const { schema: u } = a.state;
          let f = Wl(a.state, s);
          if (f === null)
            return;
          const g = typeof h == "object" ? l : h, x = (T = u.nodes.image) == null ? void 0 : T.create({ src: g });
          if (!x)
            return;
          const { doc: b } = a.state;
          f > b.content.size && (f = b.content.size - 1);
          const y = a.state.tr.replaceWith(f, f, x).setMeta(je, { remove: [s] });
          a.dispatch(y);
        },
        () => {
          const h = a.state.tr.delete(o, o).setMeta(je, { remove: [s] });
          a.dispatch(h);
        }
      );
    }
  };
}
function ql(e, t, i) {
  var a;
  const n = [...((a = t.clipboardData) == null ? void 0 : a.files) || []];
  if (n.length > 0) {
    t.preventDefault();
    const o = e.state.selection.from;
    return i(n, e, o + 1), !0;
  }
  return !1;
}
function Gl(e, t, i, n) {
  var o;
  const a = [...((o = t.dataTransfer) == null ? void 0 : o.files) || []];
  if (!i && a.length > 0) {
    t.preventDefault();
    const c = e.posAtCoords({
      left: t.clientX,
      top: t.clientY
    });
    if (c)
      return n(a, e, c.pos + 1), !0;
  }
  return !1;
}
const Xl = {
  acceptMimes: ["image/jpeg", "image/gif", "image/png", "image/jpg"],
  maxSize: 1024 * 1024 * 5
  // 5MB
}, vu = ci.extend({
  group: "inline",
  inline: !0,
  defining: !0,
  draggable: !0,
  selectable: !0,
  addOptions() {
    var e;
    return {
      ...Xl,
      ...(e = this.parent) == null ? void 0 : e.call(this),
      upload: () => Promise.reject("Image Upload Function"),
      button: ({
        editor: t,
        extension: i,
        t: n
      }) => {
        var a, o;
        return {
          component: Fl,
          componentProps: {
            action: () => {
            },
            upload: i.options.upload,
            /* If setImage is not available(when Image Component is not imported), the button is disabled */
            disabled: !((o = (a = t.can()).setImage) != null && o.call(a, {})),
            icon: "ImageUp",
            tooltip: n("editor.image.tooltip"),
            editor: t
          }
        };
      }
    };
  },
  addAttributes() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      flipX: {
        default: !1
      },
      flipY: {
        default: !1
      },
      width: {
        default: null,
        parseHTML: (t) => {
          const i = t.style.width || t.getAttribute("width") || null;
          return i ? Number.parseInt(i, 10) : null;
        },
        renderHTML: (t) => ({
          width: t.width
        })
      },
      align: {
        default: "center",
        parseHTML: (t) => t.getAttribute("align"),
        renderHTML: (t) => ({
          align: t.align
        })
      },
      inline: {
        default: !1,
        parseHTML: (t) => !!t.getAttribute("inline"),
        renderHTML: (t) => ({
          inline: t.inline
        })
      }
    };
  },
  addNodeView() {
    return ge($l);
  },
  addCommands() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      setImageInline: (t) => ({ commands: i }) => i.insertContent({
        type: this.name,
        attrs: t
      }),
      updateImage: (t) => ({ commands: i }) => i.updateAttributes(this.name, t),
      setAlignImage: (t) => ({ commands: i }) => i.updateAttributes(this.name, { align: t })
    };
  },
  renderHTML({ HTMLAttributes: e }) {
    const { flipX: t, flipY: i, align: n, inline: a } = e, o = t || i ? `transform: rotateX(${t ? "180" : "0"}deg) rotateY(${i ? "180" : "0"}deg);` : "", c = n ? `text-align: ${n};` : "";
    return [
      a ? "span" : "div",
      {
        style: c,
        class: "image"
      },
      [
        "img",
        ne(
          {
            height: "auto",
            style: o
          },
          this.options.HTMLAttributes,
          e
        )
      ]
    ];
  },
  parseHTML() {
    return [
      {
        tag: "span.image img",
        getAttrs: (e) => {
          var o;
          const t = e == null ? void 0 : e.parentElement, i = e == null ? void 0 : e.getAttribute("width"), n = (e == null ? void 0 : e.getAttribute("flipx")) || !1, a = (e == null ? void 0 : e.getAttribute("flipy")) || !1;
          return {
            src: e == null ? void 0 : e.getAttribute("src"),
            alt: e == null ? void 0 : e.getAttribute("alt"),
            caption: e == null ? void 0 : e.getAttribute("caption"),
            width: i ? Number.parseInt(i, 10) : null,
            align: (e == null ? void 0 : e.getAttribute("align")) || ((o = t == null ? void 0 : t.style) == null ? void 0 : o.textAlign) || null,
            inline: (e == null ? void 0 : e.getAttribute("inline")) || !1,
            flipX: n === "true",
            flipY: a === "true"
          };
        }
      },
      {
        tag: "div[class=image]",
        getAttrs: (e) => {
          const t = e.querySelector("img"), i = t == null ? void 0 : t.getAttribute("width"), n = (t == null ? void 0 : t.getAttribute("flipx")) || !1, a = (t == null ? void 0 : t.getAttribute("flipy")) || !1;
          return {
            src: t == null ? void 0 : t.getAttribute("src"),
            alt: t == null ? void 0 : t.getAttribute("alt"),
            caption: t == null ? void 0 : t.getAttribute("caption"),
            width: i ? Number.parseInt(i, 10) : null,
            align: (t == null ? void 0 : t.getAttribute("align")) || e.style.textAlign || null,
            inline: (t == null ? void 0 : t.getAttribute("inline")) || !1,
            flipX: n === "true",
            flipY: a === "true"
          };
        }
      }
    ];
  },
  addProseMirrorPlugins() {
    const t = Kl({
      validateFn: (i) => !(!this.options.acceptMimes.includes(i.type) || i.size > this.options.maxSize),
      onUpload: this.options.upload
      // postUpload: this.options.postUpload,
    });
    return [
      new pe({
        props: {
          handlePaste: (i, n) => !n.clipboardData || [...n.clipboardData.files || []].some((o) => o.type === "text/html") ? !1 : ql(i, n, t),
          handleDrop: (i, n, a, o) => (!(n instanceof DragEvent) || !n.dataTransfer || Gl(i, n, o, t), !1)
        }
      }),
      jl()
    ];
  }
});
function Zl(e) {
  return /\.(?:mp4|webm|ogg|mov)$/i.test(e);
}
function Yl(e) {
  const { t } = V(), [i, n] = p(""), a = Y(null), o = Ol(), [c, s] = p("");
  async function d(u) {
    var y, T;
    const f = (y = u == null ? void 0 : u.target) == null ? void 0 : y.files;
    if (!e.editor || e.editor.isDestroyed || f.length === 0)
      return;
    const g = f[0], x = (T = e.editor.extensionManager.extensions.find(
      (v) => v.name === Ql.name
    )) == null ? void 0 : T.options;
    let b = "";
    x.upload ? b = await x.upload(g) : b = URL.createObjectURL(g), e.editor.chain().setVideo({
      src: b,
      width: "100%"
    }).focus().run(), rt.setOpen(!1);
  }
  function l(u) {
    u.preventDefault(), u.stopPropagation(), i && (e.editor.chain().setVideo({
      src: i,
      width: "100%"
    }).focus().run(), rt.setOpen(!1));
  }
  function h(u) {
    var f;
    u.preventDefault(), (f = a.current) == null || f.click();
  }
  return /* @__PURE__ */ m(He, { open: o.isOpen, onOpenChange: rt.setOpen, children: [
    /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        icon: e.icon,
        action: () => rt.setOpen(!0),
        tooltip: e.tooltip
      }
    ) }),
    /* @__PURE__ */ m(ye, { children: [
      /* @__PURE__ */ r(ke, { children: t("editor.video.dialog.title") }),
      /* @__PURE__ */ m(pi, { defaultValue: "upload", activationMode: "manual", children: [
        /* @__PURE__ */ m(Ot, { className: "richtext-grid richtext-w-full richtext-grid-cols-2", children: [
          /* @__PURE__ */ m(Ge, { value: "upload", children: [
            t("editor.video.dialog.tab.upload"),
            " "
          ] }),
          /* @__PURE__ */ m(Ge, { value: "link", children: [
            " ",
            t("editor.video.dialog.link"),
            " "
          ] })
        ] }),
        /* @__PURE__ */ m(Xe, { value: "upload", children: [
          /* @__PURE__ */ r("div", { className: "richtext-flex richtext-items-center richtext-gap-[10px]", children: /* @__PURE__ */ r(U, { className: "richtext-w-full richtext-mt-1", size: "sm", onClick: h, children: t("editor.video.dialog.tab.upload") }) }),
          /* @__PURE__ */ r(
            "input",
            {
              type: "file",
              accept: "video/*",
              ref: a,
              multiple: !0,
              style: {
                display: "none"
              },
              onChange: d
            }
          )
        ] }),
        /* @__PURE__ */ m(Xe, { value: "link", children: [
          /* @__PURE__ */ r("form", { onSubmit: l, children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-gap-2", children: [
            /* @__PURE__ */ r(
              te,
              {
                type: "url",
                autoFocus: !0,
                value: i,
                onChange: (u) => {
                  const f = u.target.value;
                  if (!Zl(f)) {
                    s("Invalid video URL"), n("");
                    return;
                  }
                  s(""), n(f);
                },
                required: !0,
                placeholder: t("editor.video.dialog.placeholder")
              }
            ),
            /* @__PURE__ */ r(U, { type: "submit", children: t("editor.video.dialog.button.apply") })
          ] }) }),
          c && /* @__PURE__ */ r("div", { className: "richtext-text-red-500 richtext-my-[5px]", children: c })
        ] })
      ] })
    ] })
  ] });
}
function Jl(e) {
  return e = e.replace("https://youtu.be/", "https://www.youtube.com/watch?v=").replace("watch?v=", "embed/"), e = e.replace("https://vimeo.com/", "https://player.vimeo.com/video/"), /^https?:\/\/www.bilibili.com\/video\/.*/i.test(e) && (e = e.replace(/\?.*$/, "").replace("https://www.bilibili.com/video/", "https://player.bilibili.com/player.html?bvid=")), e.includes("drive.google.com") && (e = e.replace("/view", "/preview")), e;
}
const Ql = he.create({
  name: "video",
  group: "block",
  atom: !0,
  draggable: !0,
  addOptions() {
    return {
      divider: !1,
      spacer: !1,
      allowFullscreen: !0,
      upload: void 0,
      frameborder: !1,
      width: Kt["size-medium"],
      HTMLAttributes: {
        class: "iframe-wrapper",
        style: "display: flex;justify-content: center;"
      },
      button: ({ editor: e, t }) => {
        var i, n;
        return {
          component: Yl,
          componentProps: {
            action: () => {
            },
            isActive: () => e.isActive("video") || !1,
            /* If setVideo is not available(when Video Component is not imported), the button is disabled */
            disabled: !((n = (i = e.can()).setVideo) != null && n.call(i, {})),
            icon: "Video",
            tooltip: t("editor.video.tooltip"),
            editor: e
          }
        };
      }
    };
  },
  addAttributes() {
    return {
      src: {
        default: null,
        renderHTML: ({ src: e }) => ({
          src: e ? Jl(e) : null
        })
      },
      width: {
        default: this.options.width,
        renderHTML: ({ width: e }) => ({
          width: tc(e)
        })
      },
      frameborder: {
        default: this.options.frameborder ? 1 : 0,
        parseHTML: () => this.options.frameborder ? 1 : 0
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-video] iframe"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    const { width: t = "100%" } = e ?? {}, i = {
      ...e,
      width: "100%",
      height: "100%"
    }, n = `position: relative;overflow: hidden;display: flex;flex: 1;max-width: ${t};`, a = `flex: 1;padding-bottom: ${9 / 16 * 100}%;`, s = ["div", { style: n }, ["div", { style: a }], ["iframe", i]];
    return ["div", {
      ...this.options.HTMLAttributes,
      "data-video": ""
    }, s];
  },
  addCommands() {
    return {
      setVideo: (e) => ({ commands: t }) => t.insertContent({
        type: this.name,
        attrs: e
      }),
      updateVideo: (e) => ({ commands: t }) => t.updateAttributes(this.name, e)
    };
  }
});
function ed(e, t, i) {
  if (!e.doc)
    return e;
  const n = e.doc.nodeAt(t);
  if (!n || i === n.attrs.backgroundColor)
    return e;
  const a = {
    ...n.attrs,
    backgroundColor: i
  };
  return e.setNodeMarkup(t, n.type, a, n.marks);
}
function td(e, t, i) {
  const { doc: n, selection: a } = e;
  return !n || !a || !(a instanceof mo) || a.forEachCell((o, c) => {
    e = ed(e, c, i);
  }), e;
}
function Wi(e, t) {
  return ({ tr: i, state: n, dispatch: a }) => {
    const { selection: o } = n;
    return i = i.setSelection(o), i = td(i, t, e), i.docChanged ? (a == null || a(i), !0) : !1;
  };
}
const id = Z.create({
  name: "tableCellBackground",
  addOptions() {
    return {
      types: ["tableCell"],
      HTMLAttributes: {}
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            parseHTML: (e) => e.style.backgroundColor || "",
            renderHTML: (e) => !e.backgroundColor || e.backgroundColor === "" ? {} : {
              style: `background-color: ${e.backgroundColor}`
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTableCellBackground: (e) => Wi(e, this.options),
      unsetTableCellBackground: () => Wi("", this.options)
    };
  }
}), nd = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, rd = /CrOS/, ad = /android|ipad|playbook|silk/i;
function Ki(e = {}) {
  let t = e.ua || typeof navigator < "u" && navigator.userAgent;
  return t && typeof t == "object" && t.headers && typeof t.headers["user-agent"] == "string" && (t = t.headers["user-agent"]), typeof t != "string" ? !1 : !!(nd.test(t) && !rd.test(t) || e.tablet && ad.test(t) || e.tablet && e.featureDetect && navigator && navigator.maxTouchPoints > 1 && t.includes("Macintosh") && t.includes("Safari"));
}
const qi = (e) => Array.from({ length: e }).map((t, i) => i + 1);
function od(e) {
  var h;
  const [t, i] = p(!0), [n, a] = p({
    rows: Ki() ? gt : xt,
    cols: Ki() ? gt : xt
  }), [o, c] = p({
    rows: bt,
    cols: bt
  });
  function s(u, f) {
    u === n.rows && a((g) => ({
      ...g,
      rows: Math.min(u + 1, gt)
    })), f === n.cols && a((g) => ({
      ...g,
      cols: Math.min(f + 1, gt)
    })), c({
      rows: u,
      cols: f
    });
  }
  function d(u, f) {
    e == null || e.createTable({ rows: u, cols: f, withHeaderRow: t }), l();
  }
  function l() {
    i(!1), a({
      rows: xt,
      cols: xt
    }), c({
      rows: bt,
      cols: bt
    });
  }
  return /* @__PURE__ */ m(se, { modal: !0, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: e == null ? void 0 : e.children }),
    /* @__PURE__ */ r(re, { className: "richtext-w-full !richtext-p-2", align: "start", side: "bottom", children: /* @__PURE__ */ m("div", { className: "richtext-p-0 table-grid-size-editor", children: [
      /* @__PURE__ */ r("div", { className: "richtext-flex richtext-flex-col richtext-flex-wrap richtext-justify-between richtext-gap-1", children: (h = qi(n == null ? void 0 : n.rows)) == null ? void 0 : h.map((u) => {
        var f;
        return /* @__PURE__ */ r("div", { className: "richtext-flex richtext-gap-1", children: (f = qi(n == null ? void 0 : n.cols)) == null ? void 0 : f.map((g) => /* @__PURE__ */ r(
          "div",
          {
            className: `richtext-cursor-pointer richtext-border-border ${g <= o.cols && u <= o.rows && "!richtext-bg-foreground tableCellActive"}`,
            onMouseOver: () => s(u, g),
            onMouseDown: () => d(u, g),
            children: /* @__PURE__ */ r("div", { className: "richtext-w-4 richtext-h-4 richtext-p-1 !richtext-border richtext-rounded-[2px] richtext-box-border richtext-border-solid !richtext-border-border" })
          },
          `c-${g}`
        )) }, `r-${u}`);
      }) }),
      /* @__PURE__ */ m("div", { className: "richtext-mt-2 richtext-text-sm richtext-text-center richtext-text-zinc-600", children: [
        o.rows,
        " ",
        "x",
        o.cols
      ] })
    ] }) })
  ] });
}
function cd(e) {
  function t(i) {
    e.disabled || e.editor.chain().focus().insertTable({ ...i, withHeaderRow: !1 }).run();
  }
  return /* @__PURE__ */ r(od, { createTable: t, children: /* @__PURE__ */ r(
    _,
    {
      icon: e == null ? void 0 : e.icon,
      tooltip: e == null ? void 0 : e.tooltip,
      disabled: e == null ? void 0 : e.disabled,
      color: e == null ? void 0 : e.color,
      action: e == null ? void 0 : e.action,
      isActive: e == null ? void 0 : e.isActive
    }
  ) });
}
const yu = io.extend({
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      resizable: !0,
      lastColumnResizable: !0,
      allowTableNodeSelection: !1,
      button: ({ editor: t, t: i }) => ({
        component: cd,
        componentProps: {
          disabled: t.isActive("table") || !1,
          icon: "Table",
          tooltip: i("editor.table.tooltip"),
          editor: t
        }
      })
    };
  },
  addExtensions() {
    return [
      no.configure(this.options.tableRow),
      ro.configure(this.options.tableHeader),
      ao.configure(this.options.tableCell),
      id.configure(this.options.tableCellBackground)
    ];
  }
}), ku = Z.create({
  name: "painter",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => {
            t.commands.setPainter(t == null ? void 0 : t.state.selection.$head.marks());
          },
          icon: "PaintRoller",
          tooltip: i("editor.format")
        }
      })
    };
  },
  addCommands() {
    return {
      setPainter: (e) => ({
        view: {
          dispatch: t,
          state: { tr: i },
          dom: n
        }
      }) => {
        const c = `url("data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M9 22v-6H4V7q0-1.65 1.175-2.825T8 3h12v13h-5v6zM6 10h12V5h-1v4h-2V5h-1v2h-2V5H8q-.825 0-1.412.588T6 7zm0 4h12v-2H6zm0 0v-2z"/></svg>')}"), auto`;
        return n.style.cursor = c, t(i.setMeta("painterAction", { type: "start", marks: e })), !0;
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      new pe({
        key: new we("format-painter"),
        state: {
          init: () => [],
          apply: (e, t) => {
            const i = e.getMeta("painterAction");
            return i && i.type === "start" ? t = i.marks : i && i.type === "end" && (t = []), t;
          }
        },
        props: {
          handleDOMEvents: {
            mousedown(e, t) {
              const i = this.getState(e.state);
              if (!i || i.length === 0)
                return e.dom.style.cursor = "", !1;
              const n = () => {
                document.removeEventListener("mouseup", n);
                let {
                  dispatch: a,
                  state: { tr: o, selection: c },
                  dom: s
                } = e;
                s.style.cursor = "", o = o.removeMark(c.from, c.to);
                for (const d of i)
                  d.type.name !== "link" && (o = o.addMark(c.from, c.to, d));
                a(o.setMeta("painterAction", { type: "end" }));
              };
              return document.addEventListener("mouseup", n), !0;
            }
          }
        }
      })
    ];
  }
});
function sd({ editor: e, ...t }) {
  const { t: i } = V(), [n, a] = p(-1), [o, c] = p([]), [s, d] = p(""), [l, h] = p(""), [u, f] = p(!1), [g, x] = p(!1);
  return z(() => {
    u || (d(""), h(""), a(-1), c([]), e.commands.setSearchTerm(""), e.commands.setReplaceTerm(""));
  }, [e, u]), z(() => {
    u && e && e.commands && e.commands.setSearchTerm && e.commands.setSearchTerm(s);
  }, [u, s, e]), z(() => {
    u && e && e.commands && e.commands.setReplaceTerm && e.commands.setReplaceTerm(l);
  }, [u, l, e]), z(() => {
    if (!e)
      return;
    const b = e.extensionManager.extensions.find((T) => T.name === md.name);
    if (!b)
      return;
    const y = () => {
      if (!u)
        return;
      const T = b ? b.storage.currentIndex : -1, v = b ? b.storage.results : [];
      a((w) => w !== T ? T : w), c((w) => si(w, v) ? w : v);
    };
    return window.addEventListener(ni, y), () => {
      b && window.removeEventListener(ni, y);
    };
  }, [u, e]), /* @__PURE__ */ m(
    se,
    {
      open: u,
      onOpenChange: f,
      children: [
        /* @__PURE__ */ r(
          le,
          {
            disabled: t == null ? void 0 : t.disabled,
            asChild: !0,
            children: /* @__PURE__ */ r(
              _,
              {
                tooltip: t == null ? void 0 : t.tooltip,
                isActive: t == null ? void 0 : t.isActive,
                disabled: t == null ? void 0 : t.disabled,
                children: /* @__PURE__ */ r(F, { name: t == null ? void 0 : t.icon })
              }
            )
          }
        ),
        /* @__PURE__ */ m(
          re,
          {
            hideWhenDetached: !0,
            className: "richtext-w-full",
            align: "start",
            side: "bottom",
            children: [
              /* @__PURE__ */ m("div", { className: "richtext-mb-[6px] richtext-flex richtext-items-center richtext-justify-between", children: [
                /* @__PURE__ */ r(ie, { children: i("editor.search.dialog.text") }),
                /* @__PURE__ */ r("span", { className: "richtext-font-semibold", children: o.length ? `${n + 1}/${o.length}` : "0/0" })
              ] }),
              /* @__PURE__ */ m("div", { className: "richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5 richtext-mb-[10px]", children: [
                /* @__PURE__ */ r(
                  te,
                  {
                    type: "text",
                    required: !0,
                    className: "richtext-w-full",
                    placeholder: "Text",
                    autoFocus: !0,
                    value: s,
                    onChange: (b) => d(b.target.value)
                  }
                ),
                /* @__PURE__ */ r(U, { disabled: !o.length, className: "richtext-flex-1", onClick: e.commands.goToPrevSearchResult, children: /* @__PURE__ */ r(F, { name: "ChevronUp" }) }),
                /* @__PURE__ */ r(U, { disabled: !o.length, className: "richtext-flex-1", onClick: e.commands.goToNextSearchResult, children: /* @__PURE__ */ r(F, { name: "ChevronDown" }) })
              ] }),
              /* @__PURE__ */ r(ie, { className: "richtext-mb-[6px]", children: i("editor.replace.dialog.text") }),
              /* @__PURE__ */ r("div", { className: "richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5 richtext-mb-[5px]", children: /* @__PURE__ */ r("div", { className: "richtext-relative richtext-items-center richtext-w-full richtext-max-w-sm", children: /* @__PURE__ */ r(
                te,
                {
                  type: "text",
                  required: !0,
                  className: "richtext-w-80",
                  placeholder: "Text",
                  value: l,
                  onChange: (b) => h(b.target.value)
                }
              ) }) }),
              /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-space-x-2 richtext-mb-[10px]", children: [
                /* @__PURE__ */ r(
                  bi,
                  {
                    checked: g,
                    onCheckedChange: (b) => {
                      x(b), e.commands.setCaseSensitive(b);
                    }
                  }
                ),
                /* @__PURE__ */ r(ie, { children: i("editor.replace.caseSensitive") })
              ] }),
              /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-gap-[10px]", children: [
                /* @__PURE__ */ r(U, { disabled: !o.length, className: "richtext-flex-1", onClick: e.commands.replace, children: i("editor.replace.dialog.text") }),
                /* @__PURE__ */ r(U, { disabled: !o.length, className: "richtext-flex-1", onClick: e.commands.replaceAll, children: i("editor.replaceAll.dialog.text") })
              ] })
            ]
          }
        )
      ]
    }
  );
}
const nt = (e, t) => t(e.tr);
function ld(e, t, i) {
  return RegExp(t ? e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") : e, i ? "gu" : "gui");
}
function dd(e, t, i) {
  const n = [];
  let a = [];
  const o = [];
  let c = 0;
  if (!t)
    return { decorationsToReturn: [], results: [] };
  e == null || e.descendants((s, d) => {
    s.isText ? a[c] ? a[c] = {
      text: a[c].text + s.text,
      pos: a[c].pos
    } : a[c] = {
      text: `${s.text}`,
      pos: d
    } : c += 1;
  }), a = a.filter(Boolean);
  for (let s = 0; s < a.length; s += 1) {
    const { text: d, pos: l } = a[s], h = [...d.matchAll(t)];
    for (let u = 0; u < h.length; u += 1) {
      const f = h[u];
      if (f[0] === "")
        break;
      f.index !== void 0 && o.push({
        from: l + f.index,
        to: l + f.index + f[0].length
      });
    }
  }
  for (let s = 0; s < o.length; s += 1) {
    const d = o[s];
    n.push(Ue.inline(d.from, d.to, { class: i }));
  }
  return {
    decorationsToReturn: n,
    results: o
  };
}
function Gi(e, t, { state: i, dispatch: n }) {
  if (!t[0])
    return;
  const { from: o, to: c } = t[0];
  n && n(i.tr.insertText(e, o, c));
}
function hd(e, t, i, n) {
  const a = t + 1;
  if (!n[a])
    return null;
  const { from: o, to: c } = n[t], s = c - o - e.length + i, { from: d, to: l } = n[a];
  return n[a] = {
    to: l - s,
    from: d - s
  }, [s, n];
}
function ud(e, t, { tr: i, dispatch: n }) {
  let a = 0, o = t.slice();
  if (!o.length)
    return !1;
  for (let c = 0; c < o.length; c += 1) {
    const { from: s, to: d } = o[c];
    i.insertText(e, s, d);
    const l = hd(e, c, a, o);
    l && (a = l[0], o = l[1]);
  }
  return n(i), !0;
}
function Xi({ view: e, tr: t, searchResults: i, searchResultCurrentClass: n, gotoIndex: a }) {
  const o = i[a];
  if (o) {
    const c = t.setMeta("directDecoration", {
      fromPos: o.from,
      toPos: o.to,
      attrs: { class: n }
    });
    return e == null || e.dispatch(c), setTimeout(() => {
      const s = window.document.querySelector(`.${n}`);
      s && fi(s, { behavior: "smooth", scrollMode: "if-needed" });
    }, 0), !0;
  }
  return !1;
}
const ni = "ON_SEARCH_RESULTS", Oe = new CustomEvent(ni), md = Z.create({
  name: "search",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      searchTerm: "",
      replaceTerm: "",
      results: [],
      currentIndex: 0,
      searchResultClass: "search-result",
      searchResultCurrentClass: "search-result-current",
      caseSensitive: !1,
      disableRegex: !1,
      onChange: () => {
      },
      button: ({ editor: t, t: i }) => ({
        component: sd,
        componentProps: {
          action: () => {
          },
          icon: "SearchAndReplace",
          tooltip: i("editor.searchAndReplace.tooltip"),
          isActive: () => !1,
          disabled: !1,
          editor: t
        }
      })
    };
  },
  addStorage() {
    return {
      results: [],
      currentIndex: -1
    };
  },
  addCommands() {
    return {
      setSearchTerm: (e) => ({ state: t, dispatch: i }) => (this.options.searchTerm = e, this.storage.results = [], this.storage.currentIndex = 0, window.dispatchEvent(Oe), nt(t, i), !1),
      setReplaceTerm: (e) => ({ state: t, dispatch: i }) => (this.options.replaceTerm = e, nt(t, i), !1),
      setCaseSensitive: (e) => ({ state: t, dispatch: i }) => (this.options.caseSensitive = e, nt(t, i), !1),
      replace: () => ({ state: e, dispatch: t }) => {
        const { replaceTerm: i } = this.options, { currentIndex: n, results: a } = this.storage, o = a[n];
        return o ? (Gi(i, [o], { state: e, dispatch: t }), this.storage.results.splice(n, 1)) : (Gi(i, a, { state: e, dispatch: t }), this.storage.results.shift()), window.dispatchEvent(Oe), nt(e, t), !1;
      },
      replaceAll: () => ({ state: e, tr: t, dispatch: i }) => {
        const { replaceTerm: n } = this.options, { results: a } = this.storage;
        return ud(n, a, { tr: t, dispatch: i }), this.storage.currentIndex = -1, this.storage.results = [], window.dispatchEvent(Oe), nt(e, i), !1;
      },
      goToPrevSearchResult: () => ({ view: e, tr: t }) => {
        const { searchResultCurrentClass: i } = this.options, { currentIndex: n, results: a } = this.storage, o = (n + a.length - 1) % a.length;
        return this.storage.currentIndex = o, window.dispatchEvent(Oe), Xi({
          view: e,
          tr: t,
          searchResults: a,
          searchResultCurrentClass: i,
          gotoIndex: o
        });
      },
      goToNextSearchResult: () => ({ view: e, tr: t }) => {
        const { searchResultCurrentClass: i } = this.options, { currentIndex: n, results: a } = this.storage, o = (n + 1) % a.length;
        return this.storage.currentIndex = o, this.options.onChange && this.options.onChange(), window.dispatchEvent(Oe), Xi({
          view: e,
          tr: t,
          searchResults: a,
          searchResultCurrentClass: i,
          gotoIndex: o
        });
      }
    };
  },
  addProseMirrorPlugins() {
    const e = this;
    return [
      new pe({
        key: new we("search"),
        state: {
          init() {
            return Fe.empty;
          },
          apply(t) {
            const { doc: i, docChanged: n } = t, { searchTerm: a, searchResultClass: o, searchResultCurrentClass: c, disableRegex: s, caseSensitive: d } = e.options;
            if (n || a) {
              const { decorationsToReturn: l, results: h } = dd(
                i,
                ld(a, s, d),
                o
              );
              if (e.storage.results = h, e.storage.currentIndex > h.length - 1 && (e.storage.currentIndex = 0), window.dispatchEvent(Oe), t.getMeta("directDecoration")) {
                const { fromPos: u, toPos: f, attrs: g } = t.getMeta("directDecoration");
                l.push(Ue.inline(u, f, g));
              } else
                h.length && (l[0] = Ue.inline(h[0].from, h[0].to, {
                  class: c
                }));
              return Fe.create(i, l);
            }
            return Fe.empty;
          }
        },
        props: {
          decorations(t) {
            return this.getState(t);
          }
        }
      })
    ];
  }
}), Ze = {
  100: "💯",
  1234: "🔢",
  grinning: "😀",
  smiley: "😃",
  smile: "😄",
  grin: "😁",
  laughing: "😆",
  satisfied: "😆",
  sweat_smile: "😅",
  rofl: "🤣",
  joy: "😂",
  slightly_smiling_face: "🙂",
  upside_down_face: "🙃",
  wink: "😉",
  blush: "😊",
  innocent: "😇",
  smiling_face_with_three_hearts: "🥰",
  heart_eyes: "😍",
  star_struck: "🤩",
  kissing_heart: "😘",
  kissing: "😗",
  relaxed: "☺️",
  kissing_closed_eyes: "😚",
  kissing_smiling_eyes: "😙",
  smiling_face_with_tear: "🥲",
  yum: "😋",
  stuck_out_tongue: "😛",
  stuck_out_tongue_winking_eye: "😜",
  zany_face: "🤪",
  stuck_out_tongue_closed_eyes: "😝",
  money_mouth_face: "🤑",
  hugs: "🤗",
  hand_over_mouth: "🤭",
  shushing_face: "🤫",
  thinking: "🤔",
  zipper_mouth_face: "🤐",
  raised_eyebrow: "🤨",
  neutral_face: "😐",
  expressionless: "😑",
  no_mouth: "😶",
  smirk: "😏",
  unamused: "😒",
  roll_eyes: "🙄",
  grimacing: "😬",
  lying_face: "🤥",
  relieved: "😌",
  pensive: "😔",
  sleepy: "😪",
  drooling_face: "🤤",
  sleeping: "😴",
  mask: "😷",
  face_with_thermometer: "🤒",
  face_with_head_bandage: "🤕",
  nauseated_face: "🤢",
  vomiting_face: "🤮",
  sneezing_face: "🤧",
  hot_face: "🥵",
  cold_face: "🥶",
  woozy_face: "🥴",
  dizzy_face: "😵",
  exploding_head: "🤯",
  cowboy_hat_face: "🤠",
  partying_face: "🥳",
  disguised_face: "🥸",
  sunglasses: "😎",
  nerd_face: "🤓",
  monocle_face: "🧐",
  confused: "😕",
  worried: "😟",
  slightly_frowning_face: "🙁",
  frowning_face: "☹️",
  open_mouth: "😮",
  hushed: "😯",
  astonished: "😲",
  flushed: "😳",
  pleading_face: "🥺",
  frowning: "😦",
  anguished: "😧",
  fearful: "😨",
  cold_sweat: "😰",
  disappointed_relieved: "😥",
  cry: "😢",
  sob: "😭",
  scream: "😱",
  confounded: "😖",
  persevere: "😣",
  disappointed: "😞",
  sweat: "😓",
  weary: "😩",
  tired_face: "😫",
  yawning_face: "🥱",
  triumph: "😤",
  rage: "😡",
  pout: "😡",
  angry: "😠",
  cursing_face: "🤬",
  smiling_imp: "😈",
  imp: "👿",
  skull: "💀",
  skull_and_crossbones: "☠️",
  hankey: "💩",
  poop: "💩",
  shit: "💩",
  clown_face: "🤡",
  japanese_ogre: "👹",
  japanese_goblin: "👺",
  ghost: "👻",
  alien: "👽",
  space_invader: "👾",
  robot: "🤖",
  smiley_cat: "😺",
  smile_cat: "😸",
  joy_cat: "😹",
  heart_eyes_cat: "😻",
  smirk_cat: "😼",
  kissing_cat: "😽",
  scream_cat: "🙀",
  crying_cat_face: "😿",
  pouting_cat: "😾",
  see_no_evil: "🙈",
  hear_no_evil: "🙉",
  speak_no_evil: "🙊",
  kiss: "💋",
  love_letter: "💌",
  cupid: "💘",
  gift_heart: "💝",
  sparkling_heart: "💖",
  heartpulse: "💗",
  heartbeat: "💓",
  revolving_hearts: "💞",
  two_hearts: "💕",
  heart_decoration: "💟",
  heavy_heart_exclamation: "❣️",
  broken_heart: "💔",
  heart: "❤️",
  orange_heart: "🧡",
  yellow_heart: "💛",
  green_heart: "💚",
  blue_heart: "💙",
  purple_heart: "💜",
  brown_heart: "🤎",
  black_heart: "🖤",
  white_heart: "🤍",
  anger: "💢",
  boom: "💥",
  collision: "💥",
  dizzy: "💫",
  sweat_drops: "💦",
  dash: "💨",
  hole: "🕳️",
  bomb: "💣",
  speech_balloon: "💬",
  eye_speech_bubble: "👁️‍🗨️",
  left_speech_bubble: "🗨️",
  right_anger_bubble: "🗯️",
  thought_balloon: "💭",
  zzz: "💤",
  wave: "👋",
  raised_back_of_hand: "🤚",
  raised_hand_with_fingers_splayed: "🖐️",
  hand: "✋",
  raised_hand: "✋",
  vulcan_salute: "🖖",
  ok_hand: "👌",
  pinched_fingers: "🤌",
  pinching_hand: "🤏",
  v: "✌️",
  crossed_fingers: "🤞",
  love_you_gesture: "🤟",
  metal: "🤘",
  call_me_hand: "🤙",
  point_left: "👈",
  point_right: "👉",
  point_up_2: "👆",
  middle_finger: "🖕",
  fu: "🖕",
  point_down: "👇",
  point_up: "☝️",
  "+1": "👍",
  thumbsup: "👍",
  "-1": "👎",
  thumbsdown: "👎",
  fist_raised: "✊",
  fist: "✊",
  fist_oncoming: "👊",
  facepunch: "👊",
  punch: "👊",
  fist_left: "🤛",
  fist_right: "🤜",
  clap: "👏",
  raised_hands: "🙌",
  open_hands: "👐",
  palms_up_together: "🤲",
  handshake: "🤝",
  pray: "🙏",
  writing_hand: "✍️",
  nail_care: "💅",
  selfie: "🤳",
  muscle: "💪",
  mechanical_arm: "🦾",
  mechanical_leg: "🦿",
  leg: "🦵",
  foot: "🦶",
  ear: "👂",
  ear_with_hearing_aid: "🦻",
  nose: "👃",
  brain: "🧠",
  anatomical_heart: "🫀",
  lungs: "🫁",
  tooth: "🦷",
  bone: "🦴",
  eyes: "👀",
  eye: "👁️",
  tongue: "👅",
  lips: "👄",
  baby: "👶",
  child: "🧒",
  boy: "👦",
  girl: "👧",
  adult: "🧑",
  blond_haired_person: "👱",
  man: "👨",
  bearded_person: "🧔",
  red_haired_man: "👨‍🦰",
  curly_haired_man: "👨‍🦱",
  white_haired_man: "👨‍🦳",
  bald_man: "👨‍🦲",
  woman: "👩",
  red_haired_woman: "👩‍🦰",
  person_red_hair: "🧑‍🦰",
  curly_haired_woman: "👩‍🦱",
  person_curly_hair: "🧑‍🦱",
  white_haired_woman: "👩‍🦳",
  person_white_hair: "🧑‍🦳",
  bald_woman: "👩‍🦲",
  person_bald: "🧑‍🦲",
  blond_haired_woman: "👱‍♀️",
  blonde_woman: "👱‍♀️",
  blond_haired_man: "👱‍♂️",
  older_adult: "🧓",
  older_man: "👴",
  older_woman: "👵",
  frowning_person: "🙍",
  frowning_man: "🙍‍♂️",
  frowning_woman: "🙍‍♀️",
  pouting_face: "🙎",
  pouting_man: "🙎‍♂️",
  pouting_woman: "🙎‍♀️",
  no_good: "🙅",
  no_good_man: "🙅‍♂️",
  ng_man: "🙅‍♂️",
  no_good_woman: "🙅‍♀️",
  ng_woman: "🙅‍♀️",
  ok_person: "🙆",
  ok_man: "🙆‍♂️",
  ok_woman: "🙆‍♀️",
  tipping_hand_person: "💁",
  information_desk_person: "💁",
  tipping_hand_man: "💁‍♂️",
  sassy_man: "💁‍♂️",
  tipping_hand_woman: "💁‍♀️",
  sassy_woman: "💁‍♀️",
  raising_hand: "🙋",
  raising_hand_man: "🙋‍♂️",
  raising_hand_woman: "🙋‍♀️",
  deaf_person: "🧏",
  deaf_man: "🧏‍♂️",
  deaf_woman: "🧏‍♀️",
  bow: "🙇",
  bowing_man: "🙇‍♂️",
  bowing_woman: "🙇‍♀️",
  facepalm: "🤦",
  man_facepalming: "🤦‍♂️",
  woman_facepalming: "🤦‍♀️",
  shrug: "🤷",
  man_shrugging: "🤷‍♂️",
  woman_shrugging: "🤷‍♀️",
  health_worker: "🧑‍⚕️",
  man_health_worker: "👨‍⚕️",
  woman_health_worker: "👩‍⚕️",
  student: "🧑‍🎓",
  man_student: "👨‍🎓",
  woman_student: "👩‍🎓",
  teacher: "🧑‍🏫",
  man_teacher: "👨‍🏫",
  woman_teacher: "👩‍🏫",
  judge: "🧑‍⚖️",
  man_judge: "👨‍⚖️",
  woman_judge: "👩‍⚖️",
  farmer: "🧑‍🌾",
  man_farmer: "👨‍🌾",
  woman_farmer: "👩‍🌾",
  cook: "🧑‍🍳",
  man_cook: "👨‍🍳",
  woman_cook: "👩‍🍳",
  mechanic: "🧑‍🔧",
  man_mechanic: "👨‍🔧",
  woman_mechanic: "👩‍🔧",
  factory_worker: "🧑‍🏭",
  man_factory_worker: "👨‍🏭",
  woman_factory_worker: "👩‍🏭",
  office_worker: "🧑‍💼",
  man_office_worker: "👨‍💼",
  woman_office_worker: "👩‍💼",
  scientist: "🧑‍🔬",
  man_scientist: "👨‍🔬",
  woman_scientist: "👩‍🔬",
  technologist: "🧑‍💻",
  man_technologist: "👨‍💻",
  woman_technologist: "👩‍💻",
  singer: "🧑‍🎤",
  man_singer: "👨‍🎤",
  woman_singer: "👩‍🎤",
  artist: "🧑‍🎨",
  man_artist: "👨‍🎨",
  woman_artist: "👩‍🎨",
  pilot: "🧑‍✈️",
  man_pilot: "👨‍✈️",
  woman_pilot: "👩‍✈️",
  astronaut: "🧑‍🚀",
  man_astronaut: "👨‍🚀",
  woman_astronaut: "👩‍🚀",
  firefighter: "🧑‍🚒",
  man_firefighter: "👨‍🚒",
  woman_firefighter: "👩‍🚒",
  police_officer: "👮",
  cop: "👮",
  policeman: "👮‍♂️",
  policewoman: "👮‍♀️",
  detective: "🕵️",
  male_detective: "🕵️‍♂️",
  female_detective: "🕵️‍♀️",
  guard: "💂",
  guardsman: "💂‍♂️",
  guardswoman: "💂‍♀️",
  ninja: "🥷",
  construction_worker: "👷",
  construction_worker_man: "👷‍♂️",
  construction_worker_woman: "👷‍♀️",
  prince: "🤴",
  princess: "👸",
  person_with_turban: "👳",
  man_with_turban: "👳‍♂️",
  woman_with_turban: "👳‍♀️",
  man_with_gua_pi_mao: "👲",
  woman_with_headscarf: "🧕",
  person_in_tuxedo: "🤵",
  man_in_tuxedo: "🤵‍♂️",
  woman_in_tuxedo: "🤵‍♀️",
  person_with_veil: "👰",
  man_with_veil: "👰‍♂️",
  woman_with_veil: "👰‍♀️",
  bride_with_veil: "👰‍♀️",
  pregnant_woman: "🤰",
  breast_feeding: "🤱",
  woman_feeding_baby: "👩‍🍼",
  man_feeding_baby: "👨‍🍼",
  person_feeding_baby: "🧑‍🍼",
  angel: "👼",
  santa: "🎅",
  mrs_claus: "🤶",
  mx_claus: "🧑‍🎄",
  superhero: "🦸",
  superhero_man: "🦸‍♂️",
  superhero_woman: "🦸‍♀️",
  supervillain: "🦹",
  supervillain_man: "🦹‍♂️",
  supervillain_woman: "🦹‍♀️",
  mage: "🧙",
  mage_man: "🧙‍♂️",
  mage_woman: "🧙‍♀️",
  fairy: "🧚",
  fairy_man: "🧚‍♂️",
  fairy_woman: "🧚‍♀️",
  vampire: "🧛",
  vampire_man: "🧛‍♂️",
  vampire_woman: "🧛‍♀️",
  merperson: "🧜",
  merman: "🧜‍♂️",
  mermaid: "🧜‍♀️",
  elf: "🧝",
  elf_man: "🧝‍♂️",
  elf_woman: "🧝‍♀️",
  genie: "🧞",
  genie_man: "🧞‍♂️",
  genie_woman: "🧞‍♀️",
  zombie: "🧟",
  zombie_man: "🧟‍♂️",
  zombie_woman: "🧟‍♀️",
  massage: "💆",
  massage_man: "💆‍♂️",
  massage_woman: "💆‍♀️",
  haircut: "💇",
  haircut_man: "💇‍♂️",
  haircut_woman: "💇‍♀️",
  walking: "🚶",
  walking_man: "🚶‍♂️",
  walking_woman: "🚶‍♀️",
  standing_person: "🧍",
  standing_man: "🧍‍♂️",
  standing_woman: "🧍‍♀️",
  kneeling_person: "🧎",
  kneeling_man: "🧎‍♂️",
  kneeling_woman: "🧎‍♀️",
  person_with_probing_cane: "🧑‍🦯",
  man_with_probing_cane: "👨‍🦯",
  woman_with_probing_cane: "👩‍🦯",
  person_in_motorized_wheelchair: "🧑‍🦼",
  man_in_motorized_wheelchair: "👨‍🦼",
  woman_in_motorized_wheelchair: "👩‍🦼",
  person_in_manual_wheelchair: "🧑‍🦽",
  man_in_manual_wheelchair: "👨‍🦽",
  woman_in_manual_wheelchair: "👩‍🦽",
  runner: "🏃",
  running: "🏃",
  running_man: "🏃‍♂️",
  running_woman: "🏃‍♀️",
  woman_dancing: "💃",
  dancer: "💃",
  man_dancing: "🕺",
  business_suit_levitating: "🕴️",
  dancers: "👯",
  dancing_men: "👯‍♂️",
  dancing_women: "👯‍♀️",
  sauna_person: "🧖",
  sauna_man: "🧖‍♂️",
  sauna_woman: "🧖‍♀️",
  climbing: "🧗",
  climbing_man: "🧗‍♂️",
  climbing_woman: "🧗‍♀️",
  person_fencing: "🤺",
  horse_racing: "🏇",
  skier: "⛷️",
  snowboarder: "🏂",
  golfing: "🏌️",
  golfing_man: "🏌️‍♂️",
  golfing_woman: "🏌️‍♀️",
  surfer: "🏄",
  surfing_man: "🏄‍♂️",
  surfing_woman: "🏄‍♀️",
  rowboat: "🚣",
  rowing_man: "🚣‍♂️",
  rowing_woman: "🚣‍♀️",
  swimmer: "🏊",
  swimming_man: "🏊‍♂️",
  swimming_woman: "🏊‍♀️",
  bouncing_ball_person: "⛹️",
  bouncing_ball_man: "⛹️‍♂️",
  basketball_man: "⛹️‍♂️",
  bouncing_ball_woman: "⛹️‍♀️",
  basketball_woman: "⛹️‍♀️",
  weight_lifting: "🏋️",
  weight_lifting_man: "🏋️‍♂️",
  weight_lifting_woman: "🏋️‍♀️",
  bicyclist: "🚴",
  biking_man: "🚴‍♂️",
  biking_woman: "🚴‍♀️",
  mountain_bicyclist: "🚵",
  mountain_biking_man: "🚵‍♂️",
  mountain_biking_woman: "🚵‍♀️",
  cartwheeling: "🤸",
  man_cartwheeling: "🤸‍♂️",
  woman_cartwheeling: "🤸‍♀️",
  wrestling: "🤼",
  men_wrestling: "🤼‍♂️",
  women_wrestling: "🤼‍♀️",
  water_polo: "🤽",
  man_playing_water_polo: "🤽‍♂️",
  woman_playing_water_polo: "🤽‍♀️",
  handball_person: "🤾",
  man_playing_handball: "🤾‍♂️",
  woman_playing_handball: "🤾‍♀️",
  juggling_person: "🤹",
  man_juggling: "🤹‍♂️",
  woman_juggling: "🤹‍♀️",
  lotus_position: "🧘",
  lotus_position_man: "🧘‍♂️",
  lotus_position_woman: "🧘‍♀️",
  bath: "🛀",
  sleeping_bed: "🛌",
  people_holding_hands: "🧑‍🤝‍🧑",
  two_women_holding_hands: "👭",
  couple: "👫",
  two_men_holding_hands: "👬",
  couplekiss: "💏",
  couplekiss_man_woman: "👩‍❤️‍💋‍👨",
  couplekiss_man_man: "👨‍❤️‍💋‍👨",
  couplekiss_woman_woman: "👩‍❤️‍💋‍👩",
  couple_with_heart: "💑",
  couple_with_heart_woman_man: "👩‍❤️‍👨",
  couple_with_heart_man_man: "👨‍❤️‍👨",
  couple_with_heart_woman_woman: "👩‍❤️‍👩",
  family: "👪",
  family_man_woman_boy: "👨‍👩‍👦",
  family_man_woman_girl: "👨‍👩‍👧",
  family_man_woman_girl_boy: "👨‍👩‍👧‍👦",
  family_man_woman_boy_boy: "👨‍👩‍👦‍👦",
  family_man_woman_girl_girl: "👨‍👩‍👧‍👧",
  family_man_man_boy: "👨‍👨‍👦",
  family_man_man_girl: "👨‍👨‍👧",
  family_man_man_girl_boy: "👨‍👨‍👧‍👦",
  family_man_man_boy_boy: "👨‍👨‍👦‍👦",
  family_man_man_girl_girl: "👨‍👨‍👧‍👧",
  family_woman_woman_boy: "👩‍👩‍👦",
  family_woman_woman_girl: "👩‍👩‍👧",
  family_woman_woman_girl_boy: "👩‍👩‍👧‍👦",
  family_woman_woman_boy_boy: "👩‍👩‍👦‍👦",
  family_woman_woman_girl_girl: "👩‍👩‍👧‍👧",
  family_man_boy: "👨‍👦",
  family_man_boy_boy: "👨‍👦‍👦",
  family_man_girl: "👨‍👧",
  family_man_girl_boy: "👨‍👧‍👦",
  family_man_girl_girl: "👨‍👧‍👧",
  family_woman_boy: "👩‍👦",
  family_woman_boy_boy: "👩‍👦‍👦",
  family_woman_girl: "👩‍👧",
  family_woman_girl_boy: "👩‍👧‍👦",
  family_woman_girl_girl: "👩‍👧‍👧",
  speaking_head: "🗣️",
  bust_in_silhouette: "👤",
  busts_in_silhouette: "👥",
  people_hugging: "🫂",
  footprints: "👣",
  monkey_face: "🐵",
  monkey: "🐒",
  gorilla: "🦍",
  orangutan: "🦧",
  dog: "🐶",
  dog2: "🐕",
  guide_dog: "🦮",
  service_dog: "🐕‍🦺",
  poodle: "🐩",
  wolf: "🐺",
  fox_face: "🦊",
  raccoon: "🦝",
  cat: "🐱",
  cat2: "🐈",
  black_cat: "🐈‍⬛",
  lion: "🦁",
  tiger: "🐯",
  tiger2: "🐅",
  leopard: "🐆",
  horse: "🐴",
  racehorse: "🐎",
  unicorn: "🦄",
  zebra: "🦓",
  deer: "🦌",
  bison: "🦬",
  cow: "🐮",
  ox: "🐂",
  water_buffalo: "🐃",
  cow2: "🐄",
  pig: "🐷",
  pig2: "🐖",
  boar: "🐗",
  pig_nose: "🐽",
  ram: "🐏",
  sheep: "🐑",
  goat: "🐐",
  dromedary_camel: "🐪",
  camel: "🐫",
  llama: "🦙",
  giraffe: "🦒",
  elephant: "🐘",
  mammoth: "🦣",
  rhinoceros: "🦏",
  hippopotamus: "🦛",
  mouse: "🐭",
  mouse2: "🐁",
  rat: "🐀",
  hamster: "🐹",
  rabbit: "🐰",
  rabbit2: "🐇",
  chipmunk: "🐿️",
  beaver: "🦫",
  hedgehog: "🦔",
  bat: "🦇",
  bear: "🐻",
  polar_bear: "🐻‍❄️",
  koala: "🐨",
  panda_face: "🐼",
  sloth: "🦥",
  otter: "🦦",
  skunk: "🦨",
  kangaroo: "🦘",
  badger: "🦡",
  feet: "🐾",
  paw_prints: "🐾",
  turkey: "🦃",
  chicken: "🐔",
  rooster: "🐓",
  hatching_chick: "🐣",
  baby_chick: "🐤",
  hatched_chick: "🐥",
  bird: "🐦",
  penguin: "🐧",
  dove: "🕊️",
  eagle: "🦅",
  duck: "🦆",
  swan: "🦢",
  owl: "🦉",
  dodo: "🦤",
  feather: "🪶",
  flamingo: "🦩",
  peacock: "🦚",
  parrot: "🦜",
  frog: "🐸",
  crocodile: "🐊",
  turtle: "🐢",
  lizard: "🦎",
  snake: "🐍",
  dragon_face: "🐲",
  dragon: "🐉",
  sauropod: "🦕",
  "t-rex": "🦖",
  whale: "🐳",
  whale2: "🐋",
  dolphin: "🐬",
  flipper: "🐬",
  seal: "🦭",
  fish: "🐟",
  tropical_fish: "🐠",
  blowfish: "🐡",
  shark: "🦈",
  octopus: "🐙",
  shell: "🐚",
  snail: "🐌",
  butterfly: "🦋",
  bug: "🐛",
  ant: "🐜",
  bee: "🐝",
  honeybee: "🐝",
  beetle: "🪲",
  lady_beetle: "🐞",
  cricket: "🦗",
  cockroach: "🪳",
  spider: "🕷️",
  spider_web: "🕸️",
  scorpion: "🦂",
  mosquito: "🦟",
  fly: "🪰",
  worm: "🪱",
  microbe: "🦠",
  bouquet: "💐",
  cherry_blossom: "🌸",
  white_flower: "💮",
  rosette: "🏵️",
  rose: "🌹",
  wilted_flower: "🥀",
  hibiscus: "🌺",
  sunflower: "🌻",
  blossom: "🌼",
  tulip: "🌷",
  seedling: "🌱",
  potted_plant: "🪴",
  evergreen_tree: "🌲",
  deciduous_tree: "🌳",
  palm_tree: "🌴",
  cactus: "🌵",
  ear_of_rice: "🌾",
  herb: "🌿",
  shamrock: "☘️",
  four_leaf_clover: "🍀",
  maple_leaf: "🍁",
  fallen_leaf: "🍂",
  leaves: "🍃",
  grapes: "🍇",
  melon: "🍈",
  watermelon: "🍉",
  tangerine: "🍊",
  orange: "🍊",
  mandarin: "🍊",
  lemon: "🍋",
  banana: "🍌",
  pineapple: "🍍",
  mango: "🥭",
  apple: "🍎",
  green_apple: "🍏",
  pear: "🍐",
  peach: "🍑",
  cherries: "🍒",
  strawberry: "🍓",
  blueberries: "🫐",
  kiwi_fruit: "🥝",
  tomato: "🍅",
  olive: "🫒",
  coconut: "🥥",
  avocado: "🥑",
  eggplant: "🍆",
  potato: "🥔",
  carrot: "🥕",
  corn: "🌽",
  hot_pepper: "🌶️",
  bell_pepper: "🫑",
  cucumber: "🥒",
  leafy_green: "🥬",
  broccoli: "🥦",
  garlic: "🧄",
  onion: "🧅",
  mushroom: "🍄",
  peanuts: "🥜",
  chestnut: "🌰",
  bread: "🍞",
  croissant: "🥐",
  baguette_bread: "🥖",
  flatbread: "🫓",
  pretzel: "🥨",
  bagel: "🥯",
  pancakes: "🥞",
  waffle: "🧇",
  cheese: "🧀",
  meat_on_bone: "🍖",
  poultry_leg: "🍗",
  cut_of_meat: "🥩",
  bacon: "🥓",
  hamburger: "🍔",
  fries: "🍟",
  pizza: "🍕",
  hotdog: "🌭",
  sandwich: "🥪",
  taco: "🌮",
  burrito: "🌯",
  tamale: "🫔",
  stuffed_flatbread: "🥙",
  falafel: "🧆",
  egg: "🥚",
  fried_egg: "🍳",
  shallow_pan_of_food: "🥘",
  stew: "🍲",
  fondue: "🫕",
  bowl_with_spoon: "🥣",
  green_salad: "🥗",
  popcorn: "🍿",
  butter: "🧈",
  salt: "🧂",
  canned_food: "🥫",
  bento: "🍱",
  rice_cracker: "🍘",
  rice_ball: "🍙",
  rice: "🍚",
  curry: "🍛",
  ramen: "🍜",
  spaghetti: "🍝",
  sweet_potato: "🍠",
  oden: "🍢",
  sushi: "🍣",
  fried_shrimp: "🍤",
  fish_cake: "🍥",
  moon_cake: "🥮",
  dango: "🍡",
  dumpling: "🥟",
  fortune_cookie: "🥠",
  takeout_box: "🥡",
  crab: "🦀",
  lobster: "🦞",
  shrimp: "🦐",
  squid: "🦑",
  oyster: "🦪",
  icecream: "🍦",
  shaved_ice: "🍧",
  ice_cream: "🍨",
  doughnut: "🍩",
  cookie: "🍪",
  birthday: "🎂",
  cake: "🍰",
  cupcake: "🧁",
  pie: "🥧",
  chocolate_bar: "🍫",
  candy: "🍬",
  lollipop: "🍭",
  custard: "🍮",
  honey_pot: "🍯",
  baby_bottle: "🍼",
  milk_glass: "🥛",
  coffee: "☕",
  teapot: "🫖",
  tea: "🍵",
  sake: "🍶",
  champagne: "🍾",
  wine_glass: "🍷",
  cocktail: "🍸",
  tropical_drink: "🍹",
  beer: "🍺",
  beers: "🍻",
  clinking_glasses: "🥂",
  tumbler_glass: "🥃",
  cup_with_straw: "🥤",
  bubble_tea: "🧋",
  beverage_box: "🧃",
  mate: "🧉",
  ice_cube: "🧊",
  chopsticks: "🥢",
  plate_with_cutlery: "🍽️",
  fork_and_knife: "🍴",
  spoon: "🥄",
  hocho: "🔪",
  knife: "🔪",
  amphora: "🏺",
  earth_africa: "🌍",
  earth_americas: "🌎",
  earth_asia: "🌏",
  globe_with_meridians: "🌐",
  world_map: "🗺️",
  japan: "🗾",
  compass: "🧭",
  mountain_snow: "🏔️",
  mountain: "⛰️",
  volcano: "🌋",
  mount_fuji: "🗻",
  camping: "🏕️",
  beach_umbrella: "🏖️",
  desert: "🏜️",
  desert_island: "🏝️",
  national_park: "🏞️",
  stadium: "🏟️",
  classical_building: "🏛️",
  building_construction: "🏗️",
  bricks: "🧱",
  rock: "🪨",
  wood: "🪵",
  hut: "🛖",
  houses: "🏘️",
  derelict_house: "🏚️",
  house: "🏠",
  house_with_garden: "🏡",
  office: "🏢",
  post_office: "🏣",
  european_post_office: "🏤",
  hospital: "🏥",
  bank: "🏦",
  hotel: "🏨",
  love_hotel: "🏩",
  convenience_store: "🏪",
  school: "🏫",
  department_store: "🏬",
  factory: "🏭",
  japanese_castle: "🏯",
  european_castle: "🏰",
  wedding: "💒",
  tokyo_tower: "🗼",
  statue_of_liberty: "🗽",
  church: "⛪",
  mosque: "🕌",
  hindu_temple: "🛕",
  synagogue: "🕍",
  shinto_shrine: "⛩️",
  kaaba: "🕋",
  fountain: "⛲",
  tent: "⛺",
  foggy: "🌁",
  night_with_stars: "🌃",
  cityscape: "🏙️",
  sunrise_over_mountains: "🌄",
  sunrise: "🌅",
  city_sunset: "🌆",
  city_sunrise: "🌇",
  bridge_at_night: "🌉",
  hotsprings: "♨️",
  carousel_horse: "🎠",
  ferris_wheel: "🎡",
  roller_coaster: "🎢",
  barber: "💈",
  circus_tent: "🎪",
  steam_locomotive: "🚂",
  railway_car: "🚃",
  bullettrain_side: "🚄",
  bullettrain_front: "🚅",
  train2: "🚆",
  metro: "🚇",
  light_rail: "🚈",
  station: "🚉",
  tram: "🚊",
  monorail: "🚝",
  mountain_railway: "🚞",
  train: "🚋",
  bus: "🚌",
  oncoming_bus: "🚍",
  trolleybus: "🚎",
  minibus: "🚐",
  ambulance: "🚑",
  fire_engine: "🚒",
  police_car: "🚓",
  oncoming_police_car: "🚔",
  taxi: "🚕",
  oncoming_taxi: "🚖",
  car: "🚗",
  red_car: "🚗",
  oncoming_automobile: "🚘",
  blue_car: "🚙",
  pickup_truck: "🛻",
  truck: "🚚",
  articulated_lorry: "🚛",
  tractor: "🚜",
  racing_car: "🏎️",
  motorcycle: "🏍️",
  motor_scooter: "🛵",
  manual_wheelchair: "🦽",
  motorized_wheelchair: "🦼",
  auto_rickshaw: "🛺",
  bike: "🚲",
  kick_scooter: "🛴",
  skateboard: "🛹",
  roller_skate: "🛼",
  busstop: "🚏",
  motorway: "🛣️",
  railway_track: "🛤️",
  oil_drum: "🛢️",
  fuelpump: "⛽",
  rotating_light: "🚨",
  traffic_light: "🚥",
  vertical_traffic_light: "🚦",
  stop_sign: "🛑",
  construction: "🚧",
  anchor: "⚓",
  boat: "⛵",
  sailboat: "⛵",
  canoe: "🛶",
  speedboat: "🚤",
  passenger_ship: "🛳️",
  ferry: "⛴️",
  motor_boat: "🛥️",
  ship: "🚢",
  airplane: "✈️",
  small_airplane: "🛩️",
  flight_departure: "🛫",
  flight_arrival: "🛬",
  parachute: "🪂",
  seat: "💺",
  helicopter: "🚁",
  suspension_railway: "🚟",
  mountain_cableway: "🚠",
  aerial_tramway: "🚡",
  artificial_satellite: "🛰️",
  rocket: "🚀",
  flying_saucer: "🛸",
  bellhop_bell: "🛎️",
  luggage: "🧳",
  hourglass: "⌛",
  hourglass_flowing_sand: "⏳",
  watch: "⌚",
  alarm_clock: "⏰",
  stopwatch: "⏱️",
  timer_clock: "⏲️",
  mantelpiece_clock: "🕰️",
  clock12: "🕛",
  clock1230: "🕧",
  clock1: "🕐",
  clock130: "🕜",
  clock2: "🕑",
  clock230: "🕝",
  clock3: "🕒",
  clock330: "🕞",
  clock4: "🕓",
  clock430: "🕟",
  clock5: "🕔",
  clock530: "🕠",
  clock6: "🕕",
  clock630: "🕡",
  clock7: "🕖",
  clock730: "🕢",
  clock8: "🕗",
  clock830: "🕣",
  clock9: "🕘",
  clock930: "🕤",
  clock10: "🕙",
  clock1030: "🕥",
  clock11: "🕚",
  clock1130: "🕦",
  new_moon: "🌑",
  waxing_crescent_moon: "🌒",
  first_quarter_moon: "🌓",
  moon: "🌔",
  waxing_gibbous_moon: "🌔",
  full_moon: "🌕",
  waning_gibbous_moon: "🌖",
  last_quarter_moon: "🌗",
  waning_crescent_moon: "🌘",
  crescent_moon: "🌙",
  new_moon_with_face: "🌚",
  first_quarter_moon_with_face: "🌛",
  last_quarter_moon_with_face: "🌜",
  thermometer: "🌡️",
  sunny: "☀️",
  full_moon_with_face: "🌝",
  sun_with_face: "🌞",
  ringed_planet: "🪐",
  star: "⭐",
  star2: "🌟",
  stars: "🌠",
  milky_way: "🌌",
  cloud: "☁️",
  partly_sunny: "⛅",
  cloud_with_lightning_and_rain: "⛈️",
  sun_behind_small_cloud: "🌤️",
  sun_behind_large_cloud: "🌥️",
  sun_behind_rain_cloud: "🌦️",
  cloud_with_rain: "🌧️",
  cloud_with_snow: "🌨️",
  cloud_with_lightning: "🌩️",
  tornado: "🌪️",
  fog: "🌫️",
  wind_face: "🌬️",
  cyclone: "🌀",
  rainbow: "🌈",
  closed_umbrella: "🌂",
  open_umbrella: "☂️",
  umbrella: "☔",
  parasol_on_ground: "⛱️",
  zap: "⚡",
  snowflake: "❄️",
  snowman_with_snow: "☃️",
  snowman: "⛄",
  comet: "☄️",
  fire: "🔥",
  droplet: "💧",
  ocean: "🌊",
  jack_o_lantern: "🎃",
  christmas_tree: "🎄",
  fireworks: "🎆",
  sparkler: "🎇",
  firecracker: "🧨",
  sparkles: "✨",
  balloon: "🎈",
  tada: "🎉",
  confetti_ball: "🎊",
  tanabata_tree: "🎋",
  bamboo: "🎍",
  dolls: "🎎",
  flags: "🎏",
  wind_chime: "🎐",
  rice_scene: "🎑",
  red_envelope: "🧧",
  ribbon: "🎀",
  gift: "🎁",
  reminder_ribbon: "🎗️",
  tickets: "🎟️",
  ticket: "🎫",
  medal_military: "🎖️",
  trophy: "🏆",
  medal_sports: "🏅",
  "1st_place_medal": "🥇",
  "2nd_place_medal": "🥈",
  "3rd_place_medal": "🥉",
  soccer: "⚽",
  baseball: "⚾",
  softball: "🥎",
  basketball: "🏀",
  volleyball: "🏐",
  football: "🏈",
  rugby_football: "🏉",
  tennis: "🎾",
  flying_disc: "🥏",
  bowling: "🎳",
  cricket_game: "🏏",
  field_hockey: "🏑",
  ice_hockey: "🏒",
  lacrosse: "🥍",
  ping_pong: "🏓",
  badminton: "🏸",
  boxing_glove: "🥊",
  martial_arts_uniform: "🥋",
  goal_net: "🥅",
  golf: "⛳",
  ice_skate: "⛸️",
  fishing_pole_and_fish: "🎣",
  diving_mask: "🤿",
  running_shirt_with_sash: "🎽",
  ski: "🎿",
  sled: "🛷",
  curling_stone: "🥌",
  dart: "🎯",
  yo_yo: "🪀",
  kite: "🪁",
  "8ball": "🎱",
  crystal_ball: "🔮",
  magic_wand: "🪄",
  nazar_amulet: "🧿",
  video_game: "🎮",
  joystick: "🕹️",
  slot_machine: "🎰",
  game_die: "🎲",
  jigsaw: "🧩",
  teddy_bear: "🧸",
  pinata: "🪅",
  nesting_dolls: "🪆",
  spades: "♠️",
  hearts: "♥️",
  diamonds: "♦️",
  clubs: "♣️",
  chess_pawn: "♟️",
  black_joker: "🃏",
  mahjong: "🀄",
  flower_playing_cards: "🎴",
  performing_arts: "🎭",
  framed_picture: "🖼️",
  art: "🎨",
  thread: "🧵",
  sewing_needle: "🪡",
  yarn: "🧶",
  knot: "🪢",
  eyeglasses: "👓",
  dark_sunglasses: "🕶️",
  goggles: "🥽",
  lab_coat: "🥼",
  safety_vest: "🦺",
  necktie: "👔",
  shirt: "👕",
  tshirt: "👕",
  jeans: "👖",
  scarf: "🧣",
  gloves: "🧤",
  coat: "🧥",
  socks: "🧦",
  dress: "👗",
  kimono: "👘",
  sari: "🥻",
  one_piece_swimsuit: "🩱",
  swim_brief: "🩲",
  shorts: "🩳",
  bikini: "👙",
  womans_clothes: "👚",
  purse: "👛",
  handbag: "👜",
  pouch: "👝",
  shopping: "🛍️",
  school_satchel: "🎒",
  thong_sandal: "🩴",
  mans_shoe: "👞",
  shoe: "👞",
  athletic_shoe: "👟",
  hiking_boot: "🥾",
  flat_shoe: "🥿",
  high_heel: "👠",
  sandal: "👡",
  ballet_shoes: "🩰",
  boot: "👢",
  crown: "👑",
  womans_hat: "👒",
  tophat: "🎩",
  mortar_board: "🎓",
  billed_cap: "🧢",
  military_helmet: "🪖",
  rescue_worker_helmet: "⛑️",
  prayer_beads: "📿",
  lipstick: "💄",
  ring: "💍",
  gem: "💎",
  mute: "🔇",
  speaker: "🔈",
  sound: "🔉",
  loud_sound: "🔊",
  loudspeaker: "📢",
  mega: "📣",
  postal_horn: "📯",
  bell: "🔔",
  no_bell: "🔕",
  musical_score: "🎼",
  musical_note: "🎵",
  notes: "🎶",
  studio_microphone: "🎙️",
  level_slider: "🎚️",
  control_knobs: "🎛️",
  microphone: "🎤",
  headphones: "🎧",
  radio: "📻",
  saxophone: "🎷",
  accordion: "🪗",
  guitar: "🎸",
  musical_keyboard: "🎹",
  trumpet: "🎺",
  violin: "🎻",
  banjo: "🪕",
  drum: "🥁",
  long_drum: "🪘",
  iphone: "📱",
  calling: "📲",
  phone: "☎️",
  telephone: "☎️",
  telephone_receiver: "📞",
  pager: "📟",
  fax: "📠",
  battery: "🔋",
  electric_plug: "🔌",
  computer: "💻",
  desktop_computer: "🖥️",
  printer: "🖨️",
  keyboard: "⌨️",
  computer_mouse: "🖱️",
  trackball: "🖲️",
  minidisc: "💽",
  floppy_disk: "💾",
  cd: "💿",
  dvd: "📀",
  abacus: "🧮",
  movie_camera: "🎥",
  film_strip: "🎞️",
  film_projector: "📽️",
  clapper: "🎬",
  tv: "📺",
  camera: "📷",
  camera_flash: "📸",
  video_camera: "📹",
  vhs: "📼",
  mag: "🔍",
  mag_right: "🔎",
  candle: "🕯️",
  bulb: "💡",
  flashlight: "🔦",
  izakaya_lantern: "🏮",
  lantern: "🏮",
  diya_lamp: "🪔",
  notebook_with_decorative_cover: "📔",
  closed_book: "📕",
  book: "📖",
  open_book: "📖",
  green_book: "📗",
  blue_book: "📘",
  orange_book: "📙",
  books: "📚",
  notebook: "📓",
  ledger: "📒",
  page_with_curl: "📃",
  scroll: "📜",
  page_facing_up: "📄",
  newspaper: "📰",
  newspaper_roll: "🗞️",
  bookmark_tabs: "📑",
  bookmark: "🔖",
  label: "🏷️",
  moneybag: "💰",
  coin: "🪙",
  yen: "💴",
  dollar: "💵",
  euro: "💶",
  pound: "💷",
  money_with_wings: "💸",
  credit_card: "💳",
  receipt: "🧾",
  chart: "💹",
  envelope: "✉️",
  email: "📧",
  "e-mail": "📧",
  incoming_envelope: "📨",
  envelope_with_arrow: "📩",
  outbox_tray: "📤",
  inbox_tray: "📥",
  package: "📦",
  mailbox: "📫",
  mailbox_closed: "📪",
  mailbox_with_mail: "📬",
  mailbox_with_no_mail: "📭",
  postbox: "📮",
  ballot_box: "🗳️",
  pencil2: "✏️",
  black_nib: "✒️",
  fountain_pen: "🖋️",
  pen: "🖊️",
  paintbrush: "🖌️",
  crayon: "🖍️",
  memo: "📝",
  pencil: "📝",
  briefcase: "💼",
  file_folder: "📁",
  open_file_folder: "📂",
  card_index_dividers: "🗂️",
  date: "📅",
  calendar: "📆",
  spiral_notepad: "🗒️",
  spiral_calendar: "🗓️",
  card_index: "📇",
  chart_with_upwards_trend: "📈",
  chart_with_downwards_trend: "📉",
  bar_chart: "📊",
  clipboard: "📋",
  pushpin: "📌",
  round_pushpin: "📍",
  paperclip: "📎",
  paperclips: "🖇️",
  straight_ruler: "📏",
  triangular_ruler: "📐",
  scissors: "✂️",
  card_file_box: "🗃️",
  file_cabinet: "🗄️",
  wastebasket: "🗑️",
  lock: "🔒",
  unlock: "🔓",
  lock_with_ink_pen: "🔏",
  closed_lock_with_key: "🔐",
  key: "🔑",
  old_key: "🗝️",
  hammer: "🔨",
  axe: "🪓",
  pick: "⛏️",
  hammer_and_pick: "⚒️",
  hammer_and_wrench: "🛠️",
  dagger: "🗡️",
  crossed_swords: "⚔️",
  gun: "🔫",
  boomerang: "🪃",
  bow_and_arrow: "🏹",
  shield: "🛡️",
  carpentry_saw: "🪚",
  wrench: "🔧",
  screwdriver: "🪛",
  nut_and_bolt: "🔩",
  gear: "⚙️",
  clamp: "🗜️",
  balance_scale: "⚖️",
  probing_cane: "🦯",
  link: "🔗",
  chains: "⛓️",
  hook: "🪝",
  toolbox: "🧰",
  magnet: "🧲",
  ladder: "🪜",
  alembic: "⚗️",
  test_tube: "🧪",
  petri_dish: "🧫",
  dna: "🧬",
  microscope: "🔬",
  telescope: "🔭",
  satellite: "📡",
  syringe: "💉",
  drop_of_blood: "🩸",
  pill: "💊",
  adhesive_bandage: "🩹",
  stethoscope: "🩺",
  door: "🚪",
  elevator: "🛗",
  mirror: "🪞",
  window: "🪟",
  bed: "🛏️",
  couch_and_lamp: "🛋️",
  chair: "🪑",
  toilet: "🚽",
  plunger: "🪠",
  shower: "🚿",
  bathtub: "🛁",
  mouse_trap: "🪤",
  razor: "🪒",
  lotion_bottle: "🧴",
  safety_pin: "🧷",
  broom: "🧹",
  basket: "🧺",
  roll_of_paper: "🧻",
  bucket: "🪣",
  soap: "🧼",
  toothbrush: "🪥",
  sponge: "🧽",
  fire_extinguisher: "🧯",
  shopping_cart: "🛒",
  smoking: "🚬",
  coffin: "⚰️",
  headstone: "🪦",
  funeral_urn: "⚱️",
  moyai: "🗿",
  placard: "🪧",
  atm: "🏧",
  put_litter_in_its_place: "🚮",
  potable_water: "🚰",
  wheelchair: "♿",
  mens: "🚹",
  womens: "🚺",
  restroom: "🚻",
  baby_symbol: "🚼",
  wc: "🚾",
  passport_control: "🛂",
  customs: "🛃",
  baggage_claim: "🛄",
  left_luggage: "🛅",
  warning: "⚠️",
  children_crossing: "🚸",
  no_entry: "⛔",
  no_entry_sign: "🚫",
  no_bicycles: "🚳",
  no_smoking: "🚭",
  do_not_litter: "🚯",
  "non-potable_water": "🚱",
  no_pedestrians: "🚷",
  no_mobile_phones: "📵",
  underage: "🔞",
  radioactive: "☢️",
  biohazard: "☣️",
  arrow_up: "⬆️",
  arrow_upper_right: "↗️",
  arrow_right: "➡️",
  arrow_lower_right: "↘️",
  arrow_down: "⬇️",
  arrow_lower_left: "↙️",
  arrow_left: "⬅️",
  arrow_upper_left: "↖️",
  arrow_up_down: "↕️",
  left_right_arrow: "↔️",
  leftwards_arrow_with_hook: "↩️",
  arrow_right_hook: "↪️",
  arrow_heading_up: "⤴️",
  arrow_heading_down: "⤵️",
  arrows_clockwise: "🔃",
  arrows_counterclockwise: "🔄",
  back: "🔙",
  end: "🔚",
  on: "🔛",
  soon: "🔜",
  top: "🔝",
  place_of_worship: "🛐",
  atom_symbol: "⚛️",
  om: "🕉️",
  star_of_david: "✡️",
  wheel_of_dharma: "☸️",
  yin_yang: "☯️",
  latin_cross: "✝️",
  orthodox_cross: "☦️",
  star_and_crescent: "☪️",
  peace_symbol: "☮️",
  menorah: "🕎",
  six_pointed_star: "🔯",
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpius: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
  ophiuchus: "⛎",
  twisted_rightwards_arrows: "🔀",
  repeat: "🔁",
  repeat_one: "🔂",
  arrow_forward: "▶️",
  fast_forward: "⏩",
  next_track_button: "⏭️",
  play_or_pause_button: "⏯️",
  arrow_backward: "◀️",
  rewind: "⏪",
  previous_track_button: "⏮️",
  arrow_up_small: "🔼",
  arrow_double_up: "⏫",
  arrow_down_small: "🔽",
  arrow_double_down: "⏬",
  pause_button: "⏸️",
  stop_button: "⏹️",
  record_button: "⏺️",
  eject_button: "⏏️",
  cinema: "🎦",
  low_brightness: "🔅",
  high_brightness: "🔆",
  signal_strength: "📶",
  vibration_mode: "📳",
  mobile_phone_off: "📴",
  female_sign: "♀️",
  male_sign: "♂️",
  transgender_symbol: "⚧️",
  heavy_multiplication_x: "✖️",
  heavy_plus_sign: "➕",
  heavy_minus_sign: "➖",
  heavy_division_sign: "➗",
  infinity: "♾️",
  bangbang: "‼️",
  interrobang: "⁉️",
  question: "❓",
  grey_question: "❔",
  grey_exclamation: "❕",
  exclamation: "❗",
  heavy_exclamation_mark: "❗",
  wavy_dash: "〰️",
  currency_exchange: "💱",
  heavy_dollar_sign: "💲",
  medical_symbol: "⚕️",
  recycle: "♻️",
  fleur_de_lis: "⚜️",
  trident: "🔱",
  name_badge: "📛",
  beginner: "🔰",
  o: "⭕",
  white_check_mark: "✅",
  ballot_box_with_check: "☑️",
  heavy_check_mark: "✔️",
  x: "❌",
  negative_squared_cross_mark: "❎",
  curly_loop: "➰",
  loop: "➿",
  part_alternation_mark: "〽️",
  eight_spoked_asterisk: "✳️",
  eight_pointed_black_star: "✴️",
  sparkle: "❇️",
  copyright: "©️",
  registered: "®️",
  tm: "™️",
  hash: "#️⃣",
  asterisk: "*️⃣",
  zero: "0️⃣",
  one: "1️⃣",
  two: "2️⃣",
  three: "3️⃣",
  four: "4️⃣",
  five: "5️⃣",
  six: "6️⃣",
  seven: "7️⃣",
  eight: "8️⃣",
  nine: "9️⃣",
  keycap_ten: "🔟",
  capital_abcd: "🔠",
  abcd: "🔡",
  symbols: "🔣",
  abc: "🔤",
  a: "🅰️",
  ab: "🆎",
  b: "🅱️",
  cl: "🆑",
  cool: "🆒",
  free: "🆓",
  information_source: "ℹ️",
  id: "🆔",
  m: "Ⓜ️",
  new: "🆕",
  ng: "🆖",
  o2: "🅾️",
  ok: "🆗",
  parking: "🅿️",
  sos: "🆘",
  up: "🆙",
  vs: "🆚",
  koko: "🈁",
  sa: "🈂️",
  ideograph_advantage: "🉐",
  accept: "🉑",
  congratulations: "㊗️",
  secret: "㊙️",
  u6e80: "🈵",
  red_circle: "🔴",
  orange_circle: "🟠",
  yellow_circle: "🟡",
  green_circle: "🟢",
  large_blue_circle: "🔵",
  purple_circle: "🟣",
  brown_circle: "🟤",
  black_circle: "⚫",
  white_circle: "⚪",
  red_square: "🟥",
  orange_square: "🟧",
  yellow_square: "🟨",
  green_square: "🟩",
  blue_square: "🟦",
  purple_square: "🟪",
  brown_square: "🟫",
  black_large_square: "⬛",
  white_large_square: "⬜",
  black_medium_square: "◼️",
  white_medium_square: "◻️",
  black_medium_small_square: "◾",
  white_medium_small_square: "◽",
  black_small_square: "▪️",
  white_small_square: "▫️",
  large_orange_diamond: "🔶",
  large_blue_diamond: "🔷",
  small_orange_diamond: "🔸",
  small_blue_diamond: "🔹",
  small_red_triangle: "🔺",
  small_red_triangle_down: "🔻",
  diamond_shape_with_a_dot_inside: "💠",
  radio_button: "🔘",
  white_square_button: "🔳",
  black_square_button: "🔲",
  checkered_flag: "🏁",
  triangular_flag_on_post: "🚩",
  crossed_flags: "🎌",
  black_flag: "🏴",
  white_flag: "🏳️",
  rainbow_flag: "🏳️‍🌈",
  transgender_flag: "🏳️‍⚧️",
  pirate_flag: "🏴‍☠️",
  ascension_island: "🇦🇨",
  andorra: "🇦🇩",
  united_arab_emirates: "🇦🇪",
  afghanistan: "🇦🇫",
  antigua_barbuda: "🇦🇬",
  anguilla: "🇦🇮",
  albania: "🇦🇱",
  armenia: "🇦🇲",
  angola: "🇦🇴",
  antarctica: "🇦🇶",
  argentina: "🇦🇷",
  american_samoa: "🇦🇸",
  austria: "🇦🇹",
  australia: "🇦🇺",
  aruba: "🇦🇼",
  aland_islands: "🇦🇽",
  azerbaijan: "🇦🇿",
  bosnia_herzegovina: "🇧🇦",
  barbados: "🇧🇧",
  bangladesh: "🇧🇩",
  belgium: "🇧🇪",
  burkina_faso: "🇧🇫",
  bulgaria: "🇧🇬",
  bahrain: "🇧🇭",
  burundi: "🇧🇮",
  benin: "🇧🇯",
  st_barthelemy: "🇧🇱",
  bermuda: "🇧🇲",
  brunei: "🇧🇳",
  bolivia: "🇧🇴",
  caribbean_netherlands: "🇧🇶",
  brazil: "🇧🇷",
  bahamas: "🇧🇸",
  bhutan: "🇧🇹",
  bouvet_island: "🇧🇻",
  botswana: "🇧🇼",
  belarus: "🇧🇾",
  belize: "🇧🇿",
  canada: "🇨🇦",
  cocos_islands: "🇨🇨",
  congo_kinshasa: "🇨🇩",
  central_african_republic: "🇨🇫",
  congo_brazzaville: "🇨🇬",
  switzerland: "🇨🇭",
  cote_divoire: "🇨🇮",
  cook_islands: "🇨🇰",
  chile: "🇨🇱",
  cameroon: "🇨🇲",
  cn: "🇨🇳",
  colombia: "🇨🇴",
  clipperton_island: "🇨🇵",
  costa_rica: "🇨🇷",
  cuba: "🇨🇺",
  cape_verde: "🇨🇻",
  curacao: "🇨🇼",
  christmas_island: "🇨🇽",
  cyprus: "🇨🇾",
  czech_republic: "🇨🇿",
  de: "🇩🇪",
  diego_garcia: "🇩🇬",
  djibouti: "🇩🇯",
  denmark: "🇩🇰",
  dominica: "🇩🇲",
  dominican_republic: "🇩🇴",
  algeria: "🇩🇿",
  ceuta_melilla: "🇪🇦",
  ecuador: "🇪🇨",
  estonia: "🇪🇪",
  egypt: "🇪🇬",
  western_sahara: "🇪🇭",
  eritrea: "🇪🇷",
  es: "🇪🇸",
  ethiopia: "🇪🇹",
  eu: "🇪🇺",
  european_union: "🇪🇺",
  finland: "🇫🇮",
  fiji: "🇫🇯",
  falkland_islands: "🇫🇰",
  micronesia: "🇫🇲",
  faroe_islands: "🇫🇴",
  fr: "🇫🇷",
  gabon: "🇬🇦",
  gb: "🇬🇧",
  uk: "🇬🇧",
  grenada: "🇬🇩",
  georgia: "🇬🇪",
  french_guiana: "🇬🇫",
  guernsey: "🇬🇬",
  ghana: "🇬🇭",
  gibraltar: "🇬🇮",
  greenland: "🇬🇱",
  gambia: "🇬🇲",
  guinea: "🇬🇳",
  guadeloupe: "🇬🇵",
  equatorial_guinea: "🇬🇶",
  greece: "🇬🇷",
  south_georgia_south_sandwich_islands: "🇬🇸",
  guatemala: "🇬🇹",
  guam: "🇬🇺",
  guinea_bissau: "🇬🇼",
  guyana: "🇬🇾",
  hong_kong: "🇭🇰",
  heard_mcdonald_islands: "🇭🇲",
  honduras: "🇭🇳",
  croatia: "🇭🇷",
  haiti: "🇭🇹",
  hungary: "🇭🇺",
  canary_islands: "🇮🇨",
  indonesia: "🇮🇩",
  ireland: "🇮🇪",
  israel: "🇮🇱",
  isle_of_man: "🇮🇲",
  india: "🇮🇳",
  british_indian_ocean_territory: "🇮🇴",
  iraq: "🇮🇶",
  iran: "🇮🇷",
  iceland: "🇮🇸",
  it: "🇮🇹",
  jersey: "🇯🇪",
  jamaica: "🇯🇲",
  jordan: "🇯🇴",
  jp: "🇯🇵",
  kenya: "🇰🇪",
  kyrgyzstan: "🇰🇬",
  cambodia: "🇰🇭",
  kiribati: "🇰🇮",
  comoros: "🇰🇲",
  st_kitts_nevis: "🇰🇳",
  north_korea: "🇰🇵",
  kr: "🇰🇷",
  kuwait: "🇰🇼",
  cayman_islands: "🇰🇾",
  kazakhstan: "🇰🇿",
  laos: "🇱🇦",
  lebanon: "🇱🇧",
  st_lucia: "🇱🇨",
  liechtenstein: "🇱🇮",
  sri_lanka: "🇱🇰",
  liberia: "🇱🇷",
  lesotho: "🇱🇸",
  lithuania: "🇱🇹",
  luxembourg: "🇱🇺",
  latvia: "🇱🇻",
  libya: "🇱🇾",
  morocco: "🇲🇦",
  monaco: "🇲🇨",
  moldova: "🇲🇩",
  montenegro: "🇲🇪",
  st_martin: "🇲🇫",
  madagascar: "🇲🇬",
  marshall_islands: "🇲🇭",
  macedonia: "🇲🇰",
  mali: "🇲🇱",
  myanmar: "🇲🇲",
  mongolia: "🇲🇳",
  macau: "🇲🇴",
  northern_mariana_islands: "🇲🇵",
  martinique: "🇲🇶",
  mauritania: "🇲🇷",
  montserrat: "🇲🇸",
  malta: "🇲🇹",
  mauritius: "🇲🇺",
  maldives: "🇲🇻",
  malawi: "🇲🇼",
  mexico: "🇲🇽",
  malaysia: "🇲🇾",
  mozambique: "🇲🇿",
  namibia: "🇳🇦",
  new_caledonia: "🇳🇨",
  niger: "🇳🇪",
  norfolk_island: "🇳🇫",
  nigeria: "🇳🇬",
  nicaragua: "🇳🇮",
  netherlands: "🇳🇱",
  norway: "🇳🇴",
  nepal: "🇳🇵",
  nauru: "🇳🇷",
  niue: "🇳🇺",
  new_zealand: "🇳🇿",
  oman: "🇴🇲",
  panama: "🇵🇦",
  peru: "🇵🇪",
  french_polynesia: "🇵🇫",
  papua_new_guinea: "🇵🇬",
  philippines: "🇵🇭",
  pakistan: "🇵🇰",
  poland: "🇵🇱",
  st_pierre_miquelon: "🇵🇲",
  pitcairn_islands: "🇵🇳",
  puerto_rico: "🇵🇷",
  palestinian_territories: "🇵🇸",
  portugal: "🇵🇹",
  palau: "🇵🇼",
  paraguay: "🇵🇾",
  qatar: "🇶🇦",
  reunion: "🇷🇪",
  romania: "🇷🇴",
  serbia: "🇷🇸",
  ru: "🇷🇺",
  rwanda: "🇷🇼",
  saudi_arabia: "🇸🇦",
  solomon_islands: "🇸🇧",
  seychelles: "🇸🇨",
  sudan: "🇸🇩",
  sweden: "🇸🇪",
  singapore: "🇸🇬",
  st_helena: "🇸🇭",
  slovenia: "🇸🇮",
  svalbard_jan_mayen: "🇸🇯",
  slovakia: "🇸🇰",
  sierra_leone: "🇸🇱",
  san_marino: "🇸🇲",
  senegal: "🇸🇳",
  somalia: "🇸🇴",
  suriname: "🇸🇷",
  south_sudan: "🇸🇸",
  sao_tome_principe: "🇸🇹",
  el_salvador: "🇸🇻",
  sint_maarten: "🇸🇽",
  syria: "🇸🇾",
  swaziland: "🇸🇿",
  tristan_da_cunha: "🇹🇦",
  turks_caicos_islands: "🇹🇨",
  chad: "🇹🇩",
  french_southern_territories: "🇹🇫",
  togo: "🇹🇬",
  thailand: "🇹🇭",
  tajikistan: "🇹🇯",
  tokelau: "🇹🇰",
  timor_leste: "🇹🇱",
  turkmenistan: "🇹🇲",
  tunisia: "🇹🇳",
  tonga: "🇹🇴",
  tr: "🇹🇷",
  trinidad_tobago: "🇹🇹",
  tuvalu: "🇹🇻",
  taiwan: "🇹🇼",
  tanzania: "🇹🇿",
  ukraine: "🇺🇦",
  uganda: "🇺🇬",
  us_outlying_islands: "🇺🇲",
  united_nations: "🇺🇳",
  us: "🇺🇸",
  uruguay: "🇺🇾",
  uzbekistan: "🇺🇿",
  vatican_city: "🇻🇦",
  st_vincent_grenadines: "🇻🇨",
  venezuela: "🇻🇪",
  british_virgin_islands: "🇻🇬",
  us_virgin_islands: "🇻🇮",
  vietnam: "🇻🇳",
  vanuatu: "🇻🇺",
  wallis_futuna: "🇼🇫",
  samoa: "🇼🇸",
  kosovo: "🇽🇰",
  yemen: "🇾🇪",
  mayotte: "🇾🇹",
  south_africa: "🇿🇦",
  zambia: "🇿🇲",
  zimbabwe: "🇿🇼",
  england: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  wales: "🏴󠁧󠁢󠁷󠁬󠁳󠁿"
};
Object.keys(Ze).reduce((e, t) => {
  const i = Ze[t];
  return e[i] = t, e;
}, {});
const fd = Object.keys(Ze).map((e) => e);
Object.keys(Ze).map((e) => Ze[e]);
function gd(e) {
  return fd.filter((t) => t.startsWith(e)).map((t) => ({
    name: t,
    emoji: Ze[t]
  }));
}
const qn = At((e, t) => {
  const i = Y(), [n, a] = p(0), { t: o } = V(), c = (h) => {
    const u = e.items[h];
    u && e.command(u);
  }, s = () => {
    a((n + e.items.length - 1) % e.items.length);
  }, d = () => {
    a((n + 1) % e.items.length);
  }, l = () => {
    c(n);
  };
  return z(() => a(0), [e.items]), z(() => {
    if (Number.isNaN(n + 1))
      return;
    const h = i.current.querySelector(`span:nth-of-type(${n + 1})`);
    h && fi(h, { behavior: "smooth", scrollMode: "if-needed" });
  }, [n]), Lt(t, () => ({
    onKeyDown: ({ event: h }) => h.key === "ArrowUp" ? (s(), !0) : h.key === "ArrowDown" ? (d(), !0) : h.key === "Enter" ? (l(), !0) : !1
  })), /* @__PURE__ */ r("div", { className: "richtext-w-[200px] richtext-max-h-[320px] richtext-overflow-x-hidden richtext-overflow-y-auto richtext-rounded-sm !richtext-border richtext-bg-popover richtext-p-1 richtext-text-popover-foreground richtext-shadow-md richtext-outline-none", children: /* @__PURE__ */ r("div", { ref: i, children: e.items.length ? e.items.map((h, u) => /* @__PURE__ */ m(
    "span",
    {
      className: ee(" richtext-flex richtext-relative  richtext-cursor-default richtext-select-none richtext-items-center richtext-rounded-sm richtext-px-2 richtext-py-1.5 richtext-text-sm richtext-outline-none richtext-transition-colors focus:richtext-bg-accent focus:richtext-text-accent-foreground  hover:richtext-bg-accent", u === n ? "bg-accent" : ""),
      onClick: () => c(u),
      children: [
        h.fallbackImage ? /* @__PURE__ */ r("img", { src: h.fallbackImage, className: "richtext-w-[1em] richtext-h-[1em]" }) : h.emoji,
        ":",
        h.name,
        ":"
      ]
    },
    `emoji-list-code-${u}`
  )) : /* @__PURE__ */ r("div", { className: "richtext-flex richtext-relative  richtext-cursor-default richtext-select-none richtext-items-center richtext-rounded-sm richtext-px-2 richtext-py-1.5 richtext-text-sm richtext-outline-none richtext-transition-colors", children: /* @__PURE__ */ r("span", { children: o("no_result_found") }) }) }) });
});
qn.displayName = "EmojiList";
const xd = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "🥲",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🥸",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "🤗",
  "🤔",
  "🤭",
  "🤫",
  "🤥",
  "😶",
  "😐",
  "😑",
  "😬",
  "🙄",
  "😯",
  "😦",
  "😧",
  "😮",
  "😲",
  "🥱",
  "😴",
  "🤤",
  "😪",
  "😵",
  "🤐",
  "🥴",
  "🤢",
  "🤮",
  "🤧",
  "😷",
  "🤒",
  "🤕",
  "🤑",
  "🤠",
  "😈",
  "👿",
  "👹",
  "👺",
  "🤡",
  "💩",
  "👻",
  "💀",
  "☠️",
  "👽",
  "👾",
  "🤖",
  "🎃",
  "😺",
  "😸",
  "😹",
  "😻",
  "😼",
  "😽",
  "🙀",
  "😿",
  "😾",
  "👋",
  "🤚",
  "🖐",
  "✋",
  "🖖",
  "👌",
  "🤌",
  "🤏",
  "✌️",
  "🤞",
  "🤟",
  "🤘",
  "🤙",
  "👈",
  "👉",
  "👆",
  "🖕",
  "👇",
  "☝️",
  "👍",
  "👎",
  "✊",
  "👊",
  "🤛",
  "🤜",
  "👏",
  "🙌",
  "👐",
  "🤲",
  "🤝",
  "🙏",
  "✍️",
  "💅",
  "🤳",
  "💪",
  "🦾",
  "🦵",
  "🦿",
  "🦶",
  "👣",
  "👂",
  "🦻",
  "👃",
  "🫀",
  "🫁",
  "🧠",
  "🦷",
  "🦴",
  "👀",
  "👁",
  "👅",
  "👄",
  "💋",
  "🩸",
  "💋",
  "💌",
  "💘",
  "💝",
  "💖",
  "💗",
  "💓",
  "💞",
  "💕",
  "💟",
  "❣️",
  "❣",
  "💔",
  "❤️‍🔥",
  "❤‍🔥",
  "❤️‍🩹",
  "❤‍🩹",
  "❤️",
  "❤",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤎",
  "🖤",
  "🤍",
  "💯",
  "💢",
  "💥",
  "💫",
  "💦",
  "💨",
  "🕳️",
  "🕳",
  "💣",
  "💬",
  "👁️‍🗨️",
  "👁‍🗨️",
  "👁️‍🗨",
  "👁‍🗨",
  "🗨️",
  "🗨",
  "🗯️",
  "🗯",
  "💭",
  "💤"
], bd = [
  "🏧",
  "🚮",
  "🚰",
  "♿",
  "🚹",
  "🚺",
  "🚻",
  "🚼",
  "🚾",
  "🛂",
  "🛃",
  "🛄",
  "🛅",
  "⚠️",
  "⚠",
  "🚸",
  "⛔",
  "🚫",
  "🚳",
  "🚭",
  "🚯",
  "🚱",
  "🚷",
  "📵",
  "🔞",
  "☢️",
  "☢",
  "☣️",
  "☣",
  "⬆️",
  "⬆",
  "↗️",
  "↗",
  "➡️",
  "➡",
  "↘️",
  "↘",
  "⬇️",
  "⬇",
  "↙️",
  "↙",
  "⬅️",
  "⬅",
  "↖️",
  "↖",
  "↕️",
  "↕",
  "↔️",
  "↔",
  "↩️",
  "↩",
  "↪️",
  "↪",
  "⤴️",
  "⤴",
  "⤵️",
  "⤵",
  "🔃",
  "🔄",
  "🔙",
  "🔚",
  "🔛",
  "🔜",
  "🔝",
  "🛐",
  "⚛️",
  "⚛",
  "🕉️",
  "🕉",
  "✡️",
  "✡",
  "☸️",
  "☸",
  "☯️",
  "☯",
  "✝️",
  "✝",
  "☦️",
  "☦",
  "☪️",
  "☪",
  "☮️",
  "☮",
  "🕎",
  "🔯",
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
  "⛎",
  "🔀",
  "🔁",
  "🔂",
  "▶️",
  "▶",
  "⏩",
  "⏭️",
  "⏭",
  "⏯️",
  "⏯",
  "◀️",
  "◀",
  "⏪",
  "⏮️",
  "⏮",
  "🔼",
  "⏫",
  "🔽",
  "⏬",
  "⏸️",
  "⏸",
  "⏹️",
  "⏹",
  "⏺️",
  "⏺",
  "⏏️",
  "⏏",
  "🎦",
  "🔅",
  "🔆",
  "📶",
  "📳",
  "📴",
  "♀️",
  "♀",
  "♂️",
  "♂",
  "⚧️",
  "⚧",
  "✖️",
  "✖",
  "➕",
  "➖",
  "➗",
  "♾️",
  "♾",
  "‼️",
  "‼",
  "⁉️",
  "⁉",
  "❓",
  "❔",
  "❕",
  "❗",
  "〰️",
  "〰",
  "💱",
  "💲",
  "⚕️",
  "⚕",
  "♻️",
  "♻",
  "⚜️",
  "⚜",
  "🔱",
  "📛",
  "🔰",
  "⭕",
  "✅",
  "☑️",
  "☑",
  "✔️",
  "✔",
  "❌",
  "❎",
  "➰",
  "➿",
  "〽️",
  "〽",
  "✳️",
  "✳",
  "✴️",
  "✴",
  "❇️",
  "❇",
  "©️",
  "©",
  "®️",
  "®",
  "™️",
  "™",
  "#️⃣",
  "#⃣",
  "*️⃣",
  "*⃣",
  "0️⃣",
  "0⃣",
  "1️⃣",
  "1⃣",
  "2️⃣",
  "2⃣",
  "3️⃣",
  "3⃣",
  "4️⃣",
  "4⃣",
  "5️⃣",
  "5⃣",
  "6️⃣",
  "6⃣",
  "7️⃣",
  "7⃣",
  "8️⃣",
  "8⃣",
  "9️⃣",
  "9⃣",
  "🔟",
  "🔠",
  "🔡",
  "🔢",
  "🔣",
  "🔤",
  "🅰️",
  "🅰",
  "🆎",
  "🅱️",
  "🅱",
  "🆑",
  "🆒",
  "🆓",
  "ℹ️",
  "ℹ",
  "🆔",
  "Ⓜ️",
  "Ⓜ",
  "🆕",
  "🆖",
  "🅾️",
  "🅾",
  "🆗",
  "🅿️",
  "🅿",
  "🆘",
  "🆙",
  "🆚",
  "🈁",
  "🈂️",
  "🈂",
  "🈷️",
  "🈷",
  "🈶",
  "🈯",
  "🉐",
  "🈹",
  "🈚",
  "🈲",
  "🉑",
  "🈸",
  "🈴",
  "🈳",
  "㊗️",
  "㊗",
  "㊙️",
  "㊙",
  "🈺",
  "🈵",
  "🔴",
  "🟠",
  "🟡",
  "🟢",
  "🔵",
  "🟣",
  "🟤",
  "⚫",
  "⚪",
  "🟥",
  "🟧",
  "🟨",
  "🟩",
  "🟦",
  "🟪",
  "🟫",
  "⬛",
  "⬜",
  "◼️",
  "◼",
  "◻️",
  "◻",
  "◾",
  "◽",
  "▪️",
  "▪",
  "▫️",
  "▫",
  "🔶",
  "🔷",
  "🔸",
  "🔹",
  "🔺",
  "🔻",
  "💠",
  "🔘",
  "🔳",
  "🔲"
], pd = [
  "👓",
  "🕶️",
  "🕶",
  "🥽",
  "🥼",
  "🦺",
  "👔",
  "👕",
  "👖",
  "🧣",
  "🧤",
  "🧥",
  "🧦",
  "👗",
  "👘",
  "🥻",
  "🩱",
  "🩲",
  "🩳",
  "👙",
  "👚",
  "👛",
  "👜",
  "👝",
  "🛍️",
  "🛍",
  "🎒",
  "🩴",
  "👞",
  "👟",
  "🥾",
  "🥿",
  "👠",
  "👡",
  "🩰",
  "👢",
  "👑",
  "👒",
  "🎩",
  "🎓",
  "🧢",
  "🪖",
  "⛑️",
  "⛑",
  "📿",
  "💄",
  "💍",
  "💎",
  "🔇",
  "🔈",
  "🔉",
  "🔊",
  "📢",
  "📣",
  "📯",
  "🔔",
  "🔕",
  "🎼",
  "🎵",
  "🎶",
  "🎙️",
  "🎙",
  "🎚️",
  "🎚",
  "🎛️",
  "🎛",
  "🎤",
  "🎧",
  "📻",
  "🎷",
  "🪗",
  "🎸",
  "🎹",
  "🎺",
  "🎻",
  "🪕",
  "🥁",
  "🪘",
  "📱",
  "📲",
  "☎️",
  "☎",
  "📞",
  "📟",
  "📠",
  "🔋",
  "🔌",
  "💻",
  "🖥️",
  "🖥",
  "🖨️",
  "🖨",
  "⌨️",
  "⌨",
  "🖱️",
  "🖱",
  "🖲️",
  "🖲",
  "💽",
  "💾",
  "💿",
  "📀",
  "🧮",
  "🎥",
  "🎞️",
  "🎞",
  "📽️",
  "📽",
  "🎬",
  "📺",
  "📷",
  "📸",
  "📹",
  "📼",
  "🔍",
  "🔎",
  "🕯️",
  "🕯",
  "💡",
  "🔦",
  "🏮",
  "🪔",
  "📔",
  "📕",
  "📖",
  "📗",
  "📘",
  "📙",
  "📚",
  "📓",
  "📒",
  "📃",
  "📜",
  "📄",
  "📰",
  "🗞️",
  "🗞",
  "📑",
  "🔖",
  "🏷️",
  "🏷",
  "💰",
  "🪙",
  "💴",
  "💵",
  "💶",
  "💷",
  "💸",
  "💳",
  "🧾",
  "💹",
  "✉️",
  "✉",
  "📧",
  "📨",
  "📩",
  "📤",
  "📥",
  "📦",
  "📫",
  "📪",
  "📬",
  "📭",
  "📮",
  "🗳️",
  "🗳",
  "✏️",
  "✏",
  "✒️",
  "✒",
  "🖋️",
  "🖋",
  "🖊️",
  "🖊",
  "🖌️",
  "🖌",
  "🖍️",
  "🖍",
  "📝",
  "💼",
  "📁",
  "📂",
  "🗂️",
  "🗂",
  "📅",
  "📆",
  "🗒️",
  "🗒",
  "🗓️",
  "🗓",
  "📇",
  "📈",
  "📉",
  "📊",
  "📋",
  "📌",
  "📍",
  "📎",
  "🖇️",
  "🖇",
  "📏",
  "📐",
  "✂️",
  "✂",
  "🗃️",
  "🗃",
  "🗄️",
  "🗄",
  "🗑️",
  "🗑",
  "🔒",
  "🔓",
  "🔏",
  "🔐",
  "🔑",
  "🗝️",
  "🗝",
  "🔨",
  "🪓",
  "⛏️",
  "⛏",
  "⚒️",
  "⚒",
  "🛠️",
  "🛠",
  "🗡️",
  "🗡",
  "⚔️",
  "⚔",
  "🔫",
  "🪃",
  "🏹",
  "🛡️",
  "🛡",
  "🪚",
  "🔧",
  "🪛",
  "🔩",
  "⚙️",
  "⚙",
  "🗜️",
  "🗜",
  "⚖️",
  "⚖",
  "🦯",
  "🔗",
  "⛓️",
  "⛓",
  "🪝",
  "🧰",
  "🧲",
  "🪜",
  "⚗️",
  "⚗",
  "🧪",
  "🧫",
  "🧬",
  "🔬",
  "🔭",
  "📡",
  "💉",
  "🩸",
  "💊",
  "🩹",
  "🩺",
  "🚪",
  "🛗",
  "🪞",
  "🪟",
  "🛏️",
  "🛏",
  "🛋️",
  "🛋",
  "🪑",
  "🚽",
  "🪠",
  "🚿",
  "🛁",
  "🪤",
  "🪒",
  "🧴",
  "🧷",
  "🧹",
  "🧺",
  "🧻",
  "🪣",
  "🧼",
  "🪥",
  "🧽",
  "🧯",
  "🛒",
  "🚬",
  "⚰️",
  "⚰",
  "🪦",
  "⚱️",
  "⚱",
  "🗿",
  "🪧"
], wd = [
  "🎃",
  "🎄",
  "🎆",
  "🎇",
  "🧨",
  "✨",
  "🎈",
  "🎉",
  "🎊",
  "🎋",
  "🎍",
  "🎎",
  "🎏",
  "🎐",
  "🎑",
  "🧧",
  "🎀",
  "🎁",
  "🎗️",
  "🎗",
  "🎟️",
  "🎟",
  "🎫",
  "🎖️",
  "🎖",
  "🏆",
  "🏅",
  "🥇",
  "🥈",
  "🥉",
  "⚽",
  "⚾",
  "🥎",
  "🏀",
  "🏐",
  "🏈",
  "🏉",
  "🎾",
  "🥏",
  "🎳",
  "🏏",
  "🏑",
  "🏒",
  "🥍",
  "🏓",
  "🏸",
  "🥊",
  "🥋",
  "🥅",
  "⛳",
  "⛸️",
  "⛸",
  "🎣",
  "🤿",
  "🎽",
  "🎿",
  "🛷",
  "🥌",
  "🎯",
  "🪀",
  "🪁",
  "🎱",
  "🔮",
  "🪄",
  "🧿",
  "🎮",
  "🕹️",
  "🕹",
  "🎰",
  "🎲",
  "🧩",
  "🧸",
  "🪅",
  "🪆",
  "♠️",
  "♠",
  "♥️",
  "♥",
  "♦️",
  "♦",
  "♣️",
  "♣",
  "♟️",
  "♟",
  "🃏",
  "🀄",
  "🎴",
  "🎭",
  "🖼️",
  "🖼",
  "🎨",
  "🧵",
  "🪡",
  "🧶",
  "🪢"
], _d = [
  "🌍",
  "🌎",
  "🌏",
  "🌐",
  "🗺️",
  "🗺",
  "🗾",
  "🧭",
  "🏔️",
  "🏔",
  "⛰️",
  "⛰",
  "🌋",
  "🗻",
  "🏕️",
  "🏕",
  "🏖️",
  "🏖",
  "🏜️",
  "🏜",
  "🏝️",
  "🏝",
  "🏞️",
  "🏞",
  "🏟️",
  "🏟",
  "🏛️",
  "🏛",
  "🏗️",
  "🏗",
  "🧱",
  "🪨",
  "🪵",
  "🛖",
  "🏘️",
  "🏘",
  "🏚️",
  "🏚",
  "🏠",
  "🏡",
  "🏢",
  "🏣",
  "🏤",
  "🏥",
  "🏦",
  "🏨",
  "🏩",
  "🏪",
  "🏫",
  "🏬",
  "🏭",
  "🏯",
  "🏰",
  "💒",
  "🗼",
  "🗽",
  "⛪",
  "🕌",
  "🛕",
  "🕍",
  "⛩️",
  "⛩",
  "🕋",
  "⛲",
  "⛺",
  "🌁",
  "🌃",
  "🏙️",
  "🏙",
  "🌄",
  "🌅",
  "🌆",
  "🌇",
  "🌉",
  "♨️",
  "♨",
  "🎠",
  "🎡",
  "🎢",
  "💈",
  "🎪",
  "🚂",
  "🚃",
  "🚄",
  "🚅",
  "🚆",
  "🚇",
  "🚈",
  "🚉",
  "🚊",
  "🚝",
  "🚞",
  "🚋",
  "🚌",
  "🚍",
  "🚎",
  "🚐",
  "🚑",
  "🚒",
  "🚓",
  "🚔",
  "🚕",
  "🚖",
  "🚗",
  "🚘",
  "🚙",
  "🛻",
  "🚚",
  "🚛",
  "🚜",
  "🏎️",
  "🏎",
  "🏍️",
  "🏍",
  "🛵",
  "🦽",
  "🦼",
  "🛺",
  "🚲",
  "🛴",
  "🛹",
  "🛼",
  "🚏",
  "🛣️",
  "🛣",
  "🛤️",
  "🛤",
  "🛢️",
  "🛢",
  "⛽",
  "🚨",
  "🚥",
  "🚦",
  "🛑",
  "🚧",
  "⚓",
  "⛵",
  "🛶",
  "🚤",
  "🛳️",
  "🛳",
  "⛴️",
  "⛴",
  "🛥️",
  "🛥",
  "🚢",
  "✈️",
  "✈",
  "🛩️",
  "🛩",
  "🛫",
  "🛬",
  "🪂",
  "💺",
  "🚁",
  "🚟",
  "🚠",
  "🚡",
  "🛰️",
  "🛰",
  "🚀",
  "🛸",
  "🛎️",
  "🛎",
  "🧳",
  "⌛",
  "⏳",
  "⌚",
  "⏰",
  "⏱️",
  "⏱",
  "⏲️",
  "⏲",
  "🕰️",
  "🕰",
  "🕛",
  "🕧",
  "🕐",
  "🕜",
  "🕑",
  "🕝",
  "🕒",
  "🕞",
  "🕓",
  "🕟",
  "🕔",
  "🕠",
  "🕕",
  "🕡",
  "🕖",
  "🕢",
  "🕗",
  "🕣",
  "🕘",
  "🕤",
  "🕙",
  "🕥",
  "🕚",
  "🕦",
  "🌑",
  "🌒",
  "🌓",
  "🌔",
  "🌕",
  "🌖",
  "🌗",
  "🌘",
  "🌙",
  "🌚",
  "🌛",
  "🌜",
  "🌡️",
  "🌡",
  "☀️",
  "☀",
  "🌝",
  "🌞",
  "🪐",
  "⭐",
  "🌟",
  "🌠",
  "🌌",
  "☁️",
  "☁",
  "⛅",
  "⛈️",
  "⛈",
  "🌤️",
  "🌤",
  "🌥️",
  "🌥",
  "🌦️",
  "🌦",
  "🌧️",
  "🌧",
  "🌨️",
  "🌨",
  "🌩️",
  "🌩",
  "🌪️",
  "🌪",
  "🌫️",
  "🌫",
  "🌬️",
  "🌬",
  "🌀",
  "🌈",
  "🌂",
  "☂️",
  "☂",
  "☔",
  "⛱️",
  "⛱",
  "⚡",
  "❄️",
  "❄",
  "☃️",
  "☃",
  "⛄",
  "☄️",
  "☄",
  "🔥",
  "💧",
  "🌊"
], vd = [
  "🏁",
  "🚩",
  "🎌",
  "🏴",
  "🏳️",
  "🏳",
  "🏳️‍🌈",
  "🏳‍🌈",
  "🏳️‍⚧️",
  "🏳‍⚧️",
  "🏳️‍⚧",
  "🏳‍⚧",
  "🏴‍☠️",
  "🏴‍☠",
  "🇦🇨",
  "🇦🇩",
  "🇦🇪",
  "🇦🇫",
  "🇦🇬",
  "🇦🇮",
  "🇦🇱",
  "🇦🇲",
  "🇦🇴",
  "🇦🇶",
  "🇦🇷",
  "🇦🇸",
  "🇦🇹",
  "🇦🇺",
  "🇦🇼",
  "🇦🇽",
  "🇦🇿",
  "🇧🇦",
  "🇧🇧",
  "🇧🇩",
  "🇧🇪",
  "🇧🇫",
  "🇧🇬",
  "🇧🇭",
  "🇧🇮",
  "🇧🇯",
  "🇧🇱",
  "🇧🇲",
  "🇧🇳",
  "🇧🇴",
  "🇧🇶",
  "🇧🇷",
  "🇧🇸",
  "🇧🇹",
  "🇧🇻",
  "🇧🇼",
  "🇧🇾",
  "🇧🇿",
  "🇨🇦",
  "🇨🇨",
  "🇨🇩",
  "🇨🇫",
  "🇨🇬",
  "🇨🇭",
  "🇨🇮",
  "🇨🇰",
  "🇨🇱",
  "🇨🇲",
  "🇨🇳",
  "🇨🇴",
  "🇨🇵",
  "🇨🇷",
  "🇨🇺",
  "🇨🇻",
  "🇨🇼",
  "🇨🇽",
  "🇨🇾",
  "🇨🇿",
  "🇩🇪",
  "🇩🇬",
  "🇩🇯",
  "🇩🇰",
  "🇩🇲",
  "🇩🇴",
  "🇩🇿",
  "🇪🇦",
  "🇪🇨",
  "🇪🇪",
  "🇪🇬",
  "🇪🇭",
  "🇪🇷",
  "🇪🇸",
  "🇪🇹",
  "🇪🇺",
  "🇫🇮",
  "🇫🇯",
  "🇫🇰",
  "🇫🇲",
  "🇫🇴",
  "🇫🇷",
  "🇬🇦",
  "🇬🇧",
  "🇬🇩",
  "🇬🇪",
  "🇬🇫",
  "🇬🇬",
  "🇬🇭",
  "🇬🇮",
  "🇬🇱",
  "🇬🇲",
  "🇬🇳",
  "🇬🇵",
  "🇬🇶",
  "🇬🇷",
  "🇬🇸",
  "🇬🇹",
  "🇬🇺",
  "🇬🇼",
  "🇬🇾",
  "🇭🇰",
  "🇭🇲",
  "🇭🇳",
  "🇭🇷",
  "🇭🇹",
  "🇭🇺",
  "🇮🇨",
  "🇮🇩",
  "🇮🇪",
  "🇮🇱",
  "🇮🇲",
  "🇮🇳",
  "🇮🇴",
  "🇮🇶",
  "🇮🇷",
  "🇮🇸",
  "🇮🇹",
  "🇯🇪",
  "🇯🇲",
  "🇯🇴",
  "🇯🇵",
  "🇰🇪",
  "🇰🇬",
  "🇰🇭",
  "🇰🇮",
  "🇰🇲",
  "🇰🇳",
  "🇰🇵",
  "🇰🇷",
  "🇰🇼",
  "🇰🇾",
  "🇰🇿",
  "🇱🇦",
  "🇱🇧",
  "🇱🇨",
  "🇱🇮",
  "🇱🇰",
  "🇱🇷",
  "🇱🇸",
  "🇱🇹",
  "🇱🇺",
  "🇱🇻",
  "🇱🇾",
  "🇲🇦",
  "🇲🇨",
  "🇲🇩",
  "🇲🇪",
  "🇲🇫",
  "🇲🇬",
  "🇲🇭",
  "🇲🇰",
  "🇲🇱",
  "🇲🇲",
  "🇲🇳",
  "🇲🇴",
  "🇲🇵",
  "🇲🇶",
  "🇲🇷",
  "🇲🇸",
  "🇲🇹",
  "🇲🇺",
  "🇲🇻",
  "🇲🇼",
  "🇲🇽",
  "🇲🇾",
  "🇲🇿",
  "🇳🇦",
  "🇳🇨",
  "🇳🇪",
  "🇳🇫",
  "🇳🇬",
  "🇳🇮",
  "🇳🇱",
  "🇳🇴",
  "🇳🇵",
  "🇳🇷",
  "🇳🇺",
  "🇳🇿",
  "🇴🇲",
  "🇵🇦",
  "🇵🇪",
  "🇵🇫",
  "🇵🇬",
  "🇵🇭",
  "🇵🇰",
  "🇵🇱",
  "🇵🇲",
  "🇵🇳",
  "🇵🇷",
  "🇵🇸",
  "🇵🇹",
  "🇵🇼",
  "🇵🇾",
  "🇶🇦",
  "🇷🇪",
  "🇷🇴",
  "🇷🇸",
  "🇷🇺",
  "🇷🇼",
  "🇸🇦",
  "🇸🇧",
  "🇸🇨",
  "🇸🇩",
  "🇸🇪",
  "🇸🇬",
  "🇸🇭",
  "🇸🇮",
  "🇸🇯",
  "🇸🇰",
  "🇸🇱",
  "🇸🇲",
  "🇸🇳",
  "🇸🇴",
  "🇸🇷",
  "🇸🇸",
  "🇸🇹",
  "🇸🇻",
  "🇸🇽",
  "🇸🇾",
  "🇸🇿",
  "🇹🇦",
  "🇹🇨",
  "🇹🇩",
  "🇹🇫",
  "🇹🇬",
  "🇹🇭",
  "🇹🇯",
  "🇹🇰",
  "🇹🇱",
  "🇹🇲",
  "🇹🇳",
  "🇹🇴",
  "🇹🇷",
  "🇹🇹",
  "🇹🇻",
  "🇹🇼",
  "🇹🇿",
  "🇺🇦",
  "🇺🇬",
  "🇺🇲",
  "🇺🇳",
  "🇺🇸",
  "🇺🇾",
  "🇺🇿",
  "🇻🇦",
  "🇻🇨",
  "🇻🇪",
  "🇻🇬",
  "🇻🇮",
  "🇻🇳",
  "🇻🇺",
  "🇼🇫",
  "🇼🇸",
  "🇽🇰",
  "🇾🇪",
  "🇾🇹",
  "🇿🇦",
  "🇿🇲",
  "🇿🇼",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "🏴󠁧󠁢󠁷󠁬󠁳󠁿"
], yd = [
  "🐵",
  "🐒",
  "🦍",
  "🦧",
  "🐶",
  "🐕",
  "🦮",
  "🐕‍🦺",
  "🐩",
  "🐺",
  "🦊",
  "🦝",
  "🐱",
  "🐈",
  "🐈‍⬛",
  "🦁",
  "🐯",
  "🐅",
  "🐆",
  "🐴",
  "🐎",
  "🦄",
  "🦓",
  "🦌",
  "🦬",
  "🐮",
  "🐂",
  "🐃",
  "🐄",
  "🐷",
  "🐖",
  "🐗",
  "🐽",
  "🐏",
  "🐑",
  "🐐",
  "🐪",
  "🐫",
  "🦙",
  "🦒",
  "🐘",
  "🦣",
  "🦏",
  "🦛",
  "🐭",
  "🐁",
  "🐀",
  "🐹",
  "🐰",
  "🐇",
  "🐿️",
  "🐿",
  "🦫",
  "🦔",
  "🦇",
  "🐻",
  "🐻‍❄️",
  "🐻‍❄",
  "🐨",
  "🐼",
  "🦥",
  "🦦",
  "🦨",
  "🦘",
  "🦡",
  "🐾",
  "🦃",
  "🐔",
  "🐓",
  "🐣",
  "🐤",
  "🐥",
  "🐦",
  "🐧",
  "🕊️",
  "🕊",
  "🦅",
  "🦆",
  "🦢",
  "🦉",
  "🦤",
  "🪶",
  "🦩",
  "🦚",
  "🦜",
  "🐸",
  "🐊",
  "🐢",
  "🦎",
  "🐍",
  "🐲",
  "🐉",
  "🦕",
  "🦖",
  "🐳",
  "🐋",
  "🐬",
  "🦭",
  "🐟",
  "🐠",
  "🐡",
  "🦈",
  "🐙",
  "🐚",
  "🐌",
  "🦋",
  "🐛",
  "🐜",
  "🐝",
  "🪲",
  "🐞",
  "🦗",
  "🪳",
  "🕷️",
  "🕷",
  "🕸️",
  "🕸",
  "🦂",
  "🦟",
  "🪰",
  "🪱",
  "🦠",
  "💐",
  "🌸",
  "💮",
  "🏵️",
  "🏵",
  "🌹",
  "🥀",
  "🌺",
  "🌻",
  "🌼",
  "🌷",
  "🌱",
  "🪴",
  "🌲",
  "🌳",
  "🌴",
  "🌵",
  "🌾",
  "🌿",
  "☘️",
  "☘",
  "🍀",
  "🍁",
  "🍂",
  "🍃"
], kd = [
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍋",
  "🍌",
  "🍍",
  "🥭",
  "🍎",
  "🍏",
  "🍐",
  "🍑",
  "🍒",
  "🍓",
  "🫐",
  "🥝",
  "🍅",
  "🫒",
  "🥥",
  "🥑",
  "🍆",
  "🥔",
  "🥕",
  "🌽",
  "🌶️",
  "🌶",
  "🫑",
  "🥒",
  "🥬",
  "🥦",
  "🧄",
  "🧅",
  "🍄",
  "🥜",
  "🌰",
  "🍞",
  "🥐",
  "🥖",
  "🫓",
  "🥨",
  "🥯",
  "🥞",
  "🧇",
  "🧀",
  "🍖",
  "🍗",
  "🥩",
  "🥓",
  "🍔",
  "🍟",
  "🍕",
  "🌭",
  "🥪",
  "🌮",
  "🌯",
  "🫔",
  "🥙",
  "🧆",
  "🥚",
  "🍳",
  "🥘",
  "🍲",
  "🫕",
  "🥣",
  "🥗",
  "🍿",
  "🧈",
  "🧂",
  "🥫",
  "🍱",
  "🍘",
  "🍙",
  "🍚",
  "🍛",
  "🍜",
  "🍝",
  "🍠",
  "🍢",
  "🍣",
  "🍤",
  "🍥",
  "🥮",
  "🍡",
  "🥟",
  "🥠",
  "🥡",
  "🦀",
  "🦞",
  "🦐",
  "🦑",
  "🦪",
  "🍦",
  "🍧",
  "🍨",
  "🍩",
  "🍪",
  "🎂",
  "🍰",
  "🧁",
  "🥧",
  "🍫",
  "🍬",
  "🍭",
  "🍮",
  "🍯",
  "🍼",
  "🥛",
  "☕",
  "🫖",
  "🍵",
  "🍶",
  "🍾",
  "🍷",
  "🍸",
  "🍹",
  "🍺",
  "🍻",
  "🥂",
  "🥃",
  "🥤",
  "🧋",
  "🧃",
  "🧉",
  "🧊",
  "🥢",
  "🍽️",
  "🍽",
  "🍴",
  "🥄",
  "🔪",
  "🏺"
];
function Cd() {
  return /* @__PURE__ */ r(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
      children: /* @__PURE__ */ r(
        "path",
        {
          d: "M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113",
          fill: "currentColor"
        }
      )
    }
  );
}
function Nd() {
  return /* @__PURE__ */ m(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
      children: [
        /* @__PURE__ */ r(
          "path",
          {
            d: "M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ r(
          "path",
          {
            d: "M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235",
            fill: "currentColor"
          }
        )
      ]
    }
  );
}
function Td() {
  return /* @__PURE__ */ r(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
      children: /* @__PURE__ */ r(
        "path",
        {
          d: "M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function Ad() {
  return /* @__PURE__ */ r(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
      children: /* @__PURE__ */ r(
        "path",
        {
          d: "M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9",
          fill: "currentColor"
        }
      )
    }
  );
}
function Ld() {
  return /* @__PURE__ */ m(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
      children: [
        /* @__PURE__ */ r(
          "path",
          {
            d: "M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ r(
          "path",
          {
            d: "M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789",
            fill: "currentColor"
          }
        )
      ]
    }
  );
}
function Sd() {
  return /* @__PURE__ */ r(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
      children: /* @__PURE__ */ r(
        "path",
        {
          d: "M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76",
          fill: "currentColor"
        }
      )
    }
  );
}
function Md() {
  return /* @__PURE__ */ m(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
      children: [
        /* @__PURE__ */ r(
          "path",
          {
            d: "M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ r(
          "path",
          {
            d: "M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
}
function Id(e, t = null) {
  if (typeof window > "u")
    throw new Error();
  const i = localStorage.getItem(e);
  if (!i)
    return t;
  try {
    return JSON.parse(i);
  } catch {
    return i;
  }
}
function zd(e, t) {
  window.localStorage.setItem(e, `${t}`);
}
class Ut {
  constructor(t, i) {
    ue(this, "key");
    ue(this, "value");
    ue(this, "prev");
    ue(this, "next");
    this.key = t, this.value = i, this.prev = null, this.next = null;
  }
}
class Ed {
  constructor(t) {
    ue(this, "capacity");
    ue(this, "usedCapacity");
    ue(this, "head");
    ue(this, "tail");
    ue(this, "store");
    this.capacity = t || 20, this.usedCapacity = 0, this.store = {}, this.head = new Ut("fakeHeadNode", "fakeHeadNode"), this.tail = new Ut("fakeTailNode", "fakeTailNode"), this.head.next = this.tail, this.tail.prev = this.head;
  }
  removeNode(t) {
    t.prev.next = t.next, t.next.prev = t.prev;
  }
  addToHead(t) {
    t.prev = this.head, t.next = this.head.next, this.head.next.prev = t, this.head.next = t;
  }
  moveToHead(t) {
    this.removeNode(t), this.addToHead(t);
  }
  removeTail() {
    const t = this.tail.prev;
    return this.removeNode(t), t;
  }
  get(t) {
    if (t in this.store) {
      const i = this.store[t];
      return this.moveToHead(i), i.value;
    }
    return -1;
  }
  put(t, i) {
    if (t in this.store) {
      const n = this.store[t];
      n.value = i, this.moveToHead(n);
    } else {
      const n = new Ut(t, i);
      if (this.addToHead(n), this.store[t] = n, this.usedCapacity += 1, this.usedCapacity > this.capacity) {
        const a = this.removeTail();
        delete this.store[a.key], this.usedCapacity -= 1;
      }
    }
  }
  keys() {
    const t = [];
    let i = this.head;
    for (; i; )
      t.push(i.key), i = i.next;
    return t.slice(1, -1);
  }
  values() {
    const t = [];
    let i = this.head;
    for (; i; )
      t.push(i.value), i = i.next;
    return t.slice(1, -1);
  }
  toJSON() {
    return this.store;
  }
}
function Hd(e, t) {
  const i = new Ed(t);
  return {
    syncFromStorage() {
      (Id(e) || []).slice().reverse().forEach((o) => {
        i.put(o, o);
      });
    },
    syncToStorage() {
      zd(e, cc(i.keys()));
    },
    put(a) {
      i.put(a, a), this.syncToStorage();
    },
    get(a) {
      return a ? i.get(a) : i.keys();
    }
  };
}
const Pe = Hd("EMOJI_PICKER", 20), Zi = [
  {
    title: "Smileys & People",
    data: xd,
    icon: da
  },
  {
    title: "Animals & Nature",
    data: yd,
    icon: Nd
  },
  {
    title: "Food & Drink",
    data: kd,
    icon: Ad
  },
  {
    title: "Activity",
    data: wd,
    icon: Cd
  },
  {
    title: "Travel & Places",
    data: _d,
    icon: Md
  },
  {
    title: "Object",
    data: pd,
    icon: Ld
  },
  {
    title: "Symbol",
    data: bd,
    icon: Sd
  },
  {
    title: "Flags",
    data: vd,
    icon: Td
  }
], Rd = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"];
function Od({ onSelectEmoji: e, children: t }) {
  const [i, n] = p([]), { t: a } = V(), o = D(
    () => i.length ? [{ title: "Frequently used", icon: la, data: i }, ...Zi] : Zi,
    [i]
  ), c = A(
    (s) => {
      Pe.put(s), n(Pe.get()), e && e(s);
    },
    [e]
  );
  return z(() => {
    Pe.syncFromStorage();
    const s = Pe.get();
    s != null && s.length || Rd.forEach((l) => {
      Pe.put(l);
    });
    const d = Pe.get();
    n(d);
  }, []), /* @__PURE__ */ m(se, { modal: !0, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: t }),
    /* @__PURE__ */ r(re, { hideWhenDetached: !0, className: "richtext-w-full richtext-h-full richtext-p-2", align: "start", side: "bottom", children: /* @__PURE__ */ m(pi, { defaultValue: "Frequently used", children: [
      /* @__PURE__ */ r(Ot, { className: "richtext-flex richtext-items-center richtext-gap-[4px]", children: o.map((s) => /* @__PURE__ */ r(
        Ge,
        {
          value: s.title,
          className: "!richtext-p-[6px] richtext-bg-accent hover:richtext-text-accent-foreground",
          children: s.icon && /* @__PURE__ */ r(s.icon, { size: 16 })
        },
        `emoji-picker-title-${s.title}`
      )) }),
      o.map((s) => /* @__PURE__ */ m(
        Xe,
        {
          value: s.title,
          children: [
            /* @__PURE__ */ r("p", { className: "richtext-mb-[6px] richtext-font-semibold", children: a(s.title) }),
            /* @__PURE__ */ r("div", { className: "richtext-max-h-[280px] richtext-overflow-y-auto", children: /* @__PURE__ */ r("div", { className: "richtext-grid richtext-grid-cols-8 richtext-gap-1 ", children: (s.data || []).map((d) => /* @__PURE__ */ r(
              "div",
              {
                onClick: () => c(d),
                className: "richtext-text-center richtext-cursor-pointer",
                children: d
              },
              `emoji-picker-${d}`
            )) }) })
          ]
        },
        `emoji-picker-content-${s.title}`
      ))
    ] }) })
  ] });
}
function Pd({ editor: e, icon: t, ...i }) {
  const n = A(
    (a) => {
      const { selection: o } = e.state, { $anchor: c } = o;
      return e.chain().insertContentAt(c.pos, a).run();
    },
    [e]
  );
  return /* @__PURE__ */ r(Od, { onSelectEmoji: n, children: /* @__PURE__ */ r(
    _,
    {
      tooltip: i == null ? void 0 : i.tooltip,
      icon: t
    }
  ) });
}
const Dd = 200, Bd = new we("emoji"), Cu = he.create({
  name: "emoji",
  content: "text*",
  priority: Dd,
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      HTMLAttributes: {},
      suggestion: {
        char: ":",
        pluginKey: Bd,
        command: ({ editor: t, range: i, props: n }) => {
          t.chain().focus().insertContentAt(i, `${n.emoji} `).run();
        }
      },
      button: ({ editor: t, t: i }) => ({
        component: Pd,
        componentProps: {
          editor: t,
          action: () => {
          },
          isActive: () => !1,
          disabled: !1,
          icon: "EmojiIcon",
          tooltip: i("editor.emoji.tooltip")
        }
      })
    };
  },
  addCommands() {
    return {
      setEmoji: (e) => ({ commands: t }) => t.insertContent(`${e.emoji} `)
    };
  },
  addProseMirrorPlugins() {
    return [
      sn({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
}).configure({
  suggestion: {
    items: ({ query: e }) => gd(e),
    render: () => {
      let e, t, i;
      return {
        onStart: (n) => {
          i = n.editor.isEditable, i && (e = new oi(qn, {
            props: n,
            editor: n.editor
          }), t = mi("body", {
            getReferenceClientRect: n.clientRect,
            appendTo: () => document.body,
            content: e.element,
            showOnCreate: !0,
            interactive: !0,
            trigger: "manual",
            placement: "bottom-start"
          }));
        },
        onUpdate(n) {
          i && (e.updateProps(n), t[0].setProps({
            getReferenceClientRect: n.clientRect
          }));
        },
        onKeyDown(n) {
          var a;
          if (i)
            return n.event.key === "Escape" ? (t[0].hide(), !0) : (a = e.ref) == null ? void 0 : a.onKeyDown(n);
        },
        onExit() {
          i && (t[0].destroy(), e.destroy());
        }
      };
    }
  }
});
function $d({ editor: e, ...t }) {
  const { t: i } = V(), n = dt(e, Ve.name, {
    text: "",
    defaultShowPicker: !1
  }), { text: a, defaultShowPicker: o } = n, [c, s] = p(""), d = A(() => {
    e.chain().focus().setKatex({ text: c }).run(), s("");
  }, [e, c]);
  z(() => {
    o && e.chain().updateAttributes(Ve.name, { defaultShowPicker: !1 }).focus().run();
  }, [e, o]);
  const l = D(() => {
    try {
      return gi.renderToString(`${c}`);
    } catch {
      return c;
    }
  }, [c]), h = D(
    () => `${c}`.trim() ? /* @__PURE__ */ r("span", { contentEditable: !1, dangerouslySetInnerHTML: { __html: l || "" } }) : null,
    [c, l]
  );
  return /* @__PURE__ */ m(se, { modal: !0, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        tooltip: t == null ? void 0 : t.tooltip,
        icon: t == null ? void 0 : t.icon
      }
    ) }),
    /* @__PURE__ */ m(re, { hideWhenDetached: !0, className: "richtext-w-full richtext-h-full richtext-p-2", align: "start", side: "bottom", children: [
      /* @__PURE__ */ r(ie, { className: "richtext-mb-[6px]", children: i("editor.formula.dialog.text") }),
      /* @__PURE__ */ r("div", { className: "richtext-flex richtext-w-full richtext-max-w-sm richtext-items-center richtext-gap-1.5 richtext-mb-[16px]", children: /* @__PURE__ */ r("div", { className: "richtext-relative richtext-w-full richtext-max-w-sm", children: /* @__PURE__ */ r(
        ht,
        {
          value: c,
          onChange: (u) => s(u.target.value),
          autoFocus: !0,
          required: !0,
          rows: 3,
          defaultValue: a,
          className: "richtext-w-full",
          placeholder: "Text"
        }
      ) }) }),
      h && /* @__PURE__ */ r("div", { className: "richtext-my-[10px] richtext-p-[10px] richtext-rounded-[6px] !richtext-border-[1px] richtext-max-w-[286px] richtext-whitespace-nowrap richtext-overflow-auto", children: h }),
      /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-justify-between richtext-gap-[6px]", children: [
        /* @__PURE__ */ r(U, { onClick: d, className: "richtext-flex-1", children: "Submit" }),
        /* @__PURE__ */ r("a", { href: "https://katex.org/docs/supported", target: "_blank", rel: "noreferrer noopener", children: /* @__PURE__ */ r(en, { size: 16 }) })
      ] })
    ] })
  ] });
}
function Vd(e, t = 1) {
  let i = 0, n = 0, a = 0;
  if (e.startsWith("rgb")) {
    const o = e.replace(/\s/g, "").match(/rgb\((.*)\)$/)[1].split(",");
    i = +o[0], n = +o[1], a = +o[2];
  } else if (e.startsWith("#")) {
    let o = e.replace("#", "");
    o.length === 3 && (o = `${o[0]}${o[0]}${o[1]}${o[1]}${o[2]}${o[2]}`), i = Number.parseInt(o.substring(0, 2), 16), n = Number.parseInt(o.substring(2, 4), 16), a = Number.parseInt(o.substring(4, 6), 16);
  } else
    return e;
  return t > 1 && t <= 100 && (t = t / 100), `rgba(${i},${n},${a},${t})`;
}
function Fd({ node: e }) {
  const t = Uc(), { text: i } = e.attrs, n = D(() => {
    const c = "rgb(254, 242, 237)";
    return t === "dark" ? Vd(c, 0.75) : c;
  }, [t]), a = D(() => {
    try {
      return gi.renderToString(`${i}`);
    } catch {
      return i;
    }
  }, [i]), o = D(
    () => i.trim() ? /* @__PURE__ */ r("span", { contentEditable: !1, dangerouslySetInnerHTML: { __html: a } }) : /* @__PURE__ */ r("span", { contentEditable: !1, children: "Not enter a formula" }),
    [i, a]
  );
  return /* @__PURE__ */ r(
    ae,
    {
      style: {
        display: "inline-block",
        backgroundColor: n
      },
      as: "span",
      children: o
    }
  );
}
function jd(e) {
  return (t) => t.getAttribute(e);
}
const Ve = he.create({
  name: "katex",
  group: "inline",
  inline: !0,
  defining: !0,
  draggable: !0,
  selectable: !0,
  addOptions() {
    return {
      HTMLAttributes: {
        class: "katex"
      },
      button: ({ editor: e, t }) => ({
        component: $d,
        componentProps: {
          editor: e,
          action: () => {
          },
          isActive: () => !1,
          disabled: !1,
          icon: "KatexIcon",
          tooltip: t("editor.katex.tooltip")
        }
      })
    };
  },
  addAttributes() {
    return {
      text: {
        default: "",
        parseHTML: jd("text")
      },
      defaultShowPicker: {
        default: !1
      }
    };
  },
  parseHTML() {
    return [{ tag: "span.katex" }];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["span", ne(this.options && this.options.HTMLAttributes || {}, e)];
  },
  addCommands() {
    return {
      setKatex: (e) => ({ commands: t }) => t.insertContent({
        type: this.name,
        attrs: e
      })
    };
  },
  addInputRules() {
    return [
      ai({
        find: /^\$katex\$$/,
        type: this.type,
        getAttributes: () => ({ defaultShowPicker: !0 })
      })
    ];
  },
  addNodeView() {
    return ge(Fd);
  }
});
function Ud(e) {
  const t = document.createElement("iframe");
  t.setAttribute("style", "position: absolute; width: 0; height: 0; top: 0; left: 0;"), document.body.appendChild(t), t.textContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Echo Editor</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body class="is-print">
      <div class="tiptap ProseMirror" translate="no" aria-expanded="false">
          ${e}
      </div>
    </body>
    </html>
  `;
  const i = t.contentWindow, n = t.contentDocument || t.contentWindow && t.contentWindow.document, a = document.createElement("link");
  a.rel = "stylesheet", a.href = "https://cdn.jsdelivr.net/npm/reactjs-tiptap-editor@latest/lib/style.css", n.head.appendChild(a), n && (n.open(), n.write(e), n.close()), i && (t.onload = function() {
    try {
      setTimeout(() => {
        i.focus();
        try {
          i.document.execCommand("print", !1) || i.print();
        } catch {
          i.print();
        }
        i.close();
      }, 10);
    } catch (o) {
      console.error(o);
    }
    setTimeout(() => {
      document.body.removeChild(t);
    }, 100);
  });
}
function Wd(e) {
  const t = e.getHTML();
  return t ? (Ud(t), !0) : !1;
}
const Nu = Z.create({
  name: "exportPdf",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => {
            Wd(t);
          },
          icon: "ExportPdf",
          tooltip: i("editor.exportPdf.tooltip"),
          isActive: () => !1,
          disabled: !1
        }
      })
    };
  }
});
function Kd(e, t) {
  const i = atob(e.split(",")[1]), n = Array.from({ length: i.length });
  for (let o = 0; o < i.length; o++)
    n[o] = i.charCodeAt(o);
  const a = new Uint8Array(n);
  return new Blob([a], { type: t });
}
function qd(e, t) {
  return new File([e], t, { type: e.type });
}
function Gd(e) {
  const [t, i] = p(!1), [n, a] = p(), o = Y();
  function c() {
    o.current.click();
  }
  function s(u) {
    const f = u.target.files[0];
    a(f), f && l();
  }
  async function d(u) {
    var y;
    const g = new DOMParser().parseFromString(u, "text/html"), x = g.querySelectorAll("img");
    if (!x.length)
      return g.body.innerHTML;
    if (ic(e.editor, "image")) {
      const T = (y = e.editor.extensionManager.extensions.find(
        (v) => v.name === "importWord"
      )) == null ? void 0 : y.options;
      if (T && typeof T.upload == "function") {
        const v = [];
        for (const k of x) {
          const N = k.getAttribute("src"), I = Kd(N, "image/jpeg"), O = qd(I, "image.jpeg");
          v.push(O);
        }
        const w = await T.upload(v);
        for (let k = 0; k < x.length; k++) {
          const N = x[k];
          N.setAttribute("src", w[k].src);
          const I = N.parentElement;
          (I == null ? void 0 : I.tagName) === "P" && (I.insertAdjacentElement("beforebegin", N), !I.hasChildNodes() && I.textContent === "" && I.remove());
        }
        return g.body.innerHTML;
      } else
        return console.warn("Image Upload method found, skip image conversion"), g.body.innerHTML;
    } else
      return console.error("Image extension not found, unable to convert image"), g.body.innerHTML;
  }
  async function l() {
    if (e.convert) {
      const u = await e.convert(n);
      h(u);
    } else {
      const u = new FormData(), f = JSON.stringify({
        collaboration_features: {
          comments: !0,
          user_id: "e3",
          track_changes: !0
        },
        formatting: {
          resets: "none",
          defaults: "inline",
          styles: "inline",
          comments: "basic"
        }
      });
      u.append("config", f), u.append("file", n), i(!0), fetch("https://docx-converter.cke-cs.com/v2/convert/docx-html", {
        method: "POST",
        body: u
      }).then((g) => g.json()).then(async (g) => {
        h(g.html);
      }).catch((g) => {
        console.error("Error:", g), i(!1);
      });
    }
  }
  async function h(u) {
    const f = await d(u);
    e.editor.chain().setContent(f, !0).run(), i(!1);
  }
  return /* @__PURE__ */ m("div", { children: [
    /* @__PURE__ */ r(_, { loading: t, disabled: e == null ? void 0 : e.disabled, icon: e == null ? void 0 : e.icon, tooltip: e == null ? void 0 : e.tooltip, action: c }),
    /* @__PURE__ */ r(
      "input",
      {
        type: "file",
        accept: ".docx",
        ref: o,
        style: {
          display: "none"
        },
        onChange: s
      }
    )
  ] });
}
const Tu = Z.create({
  name: "importWord",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      upload: void 0,
      convert: void 0,
      button: ({ editor: t, extension: i, t: n }) => {
        const { convert: a } = i.options;
        return {
          component: Gd,
          componentProps: {
            convert: a,
            action: () => t.commands.setHorizontalRule(),
            disabled: !t.can().setHorizontalRule(),
            icon: "Word",
            shortcutKeys: ["alt", "mod", "S"],
            tooltip: n("editor.importWrod.tooltip")
          }
        };
      }
    };
  }
}), Xd = typeof window < "u";
function Zd(e, t) {
  if (Xd) {
    const i = window.URL.createObjectURL(e), n = document.createElement("a");
    return n.href = i, n.download = t, n.click(), window.URL.revokeObjectURL(i), Promise.resolve();
  }
  return console.error("Download is not supported in Node.js"), Promise.resolve();
}
const Yd = {
  ...Ce,
  hardBreak: Ce.hard_break,
  codeBlock: Ce.code_block,
  orderedList: Ce.ordered_list,
  listItem: Ce.list_item,
  bulletList: Ce.bullet_list,
  horizontalRule: Ce.horizontal_rule,
  // Requirement Buffer on browser
  image(e, t) {
    e.renderInline(t), e.closeBlock(t);
  }
}, Jd = new No(Yd, To), Au = Z.create({
  name: "exportWord",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          icon: "ExportWord",
          action: () => {
            t == null || t.commands.exportToWord();
          },
          tooltip: i("editor.exportWord.tooltip"),
          isActive: () => !1,
          disabled: !1
        }
      })
    };
  },
  // @ts-expect-error
  addCommands() {
    return {
      exportToWord: () => async ({ editor: e }) => {
        const t = {
          getImageBuffer: async (n) => {
            const o = await (await fetch(n)).arrayBuffer();
            return new Uint8Array(o);
          }
        }, i = Jd.serialize(e.state.doc, t);
        return Ao.toBlob(i).then((n) => Zd(new Blob([n]), "export-document.docx")), !0;
      }
    };
  }
}), Qd = "_toc_aag8a_1", eh = "_visible_aag8a_7", th = "_list_aag8a_11", ih = "_item_aag8a_16", wt = {
  toc: Qd,
  visible: eh,
  list: th,
  item: ih,
  "item--3": "_item--3_aag8a_19",
  "item--4": "_item--4_aag8a_22",
  "item--5": "_item--5_aag8a_25",
  "item--6": "_item--6_aag8a_28"
};
function nh(e) {
  const t = [], i = [t];
  return e.forEach((n) => {
    let a = -1, o = i[n.level + a];
    for (; !o; )
      a -= 1, o = i[n.level + a];
    o.push({ ...n, children: i[n.level] = [] });
  }), t;
}
function rh({ editor: e }) {
  const t = Pt(), [i, n] = p([]), { t: a } = V(), o = A(() => {
    const c = [], s = e.state.tr;
    e.state.doc.descendants((d, l) => {
      if (d.type.name === "heading") {
        const h = `heading-${c.length + 1}`;
        d.attrs.id !== h && s.setNodeMarkup(l, void 0, {
          ...d.attrs,
          id: h
        }), c.push({
          level: d.attrs.level,
          text: d.textContent,
          id: h
        });
      }
    }), s.setMeta("addToHistory", !1), s.setMeta("preventUpdate", !0), e.view.dispatch(s), n(c), e.eventEmitter && e.eventEmitter.emit("TableOfContents", nh(c));
  }, [e]);
  return z(() => {
    if (e) {
      if (!e.options.editable) {
        o();
        return;
      }
      return e.on("update", o), () => {
        e.off("update", o);
      };
    }
  }, [e, o]), z(() => {
    o();
  }, []), /* @__PURE__ */ r(ae, { className: ee("tableOfContent", wt.toc, t && wt.visible), children: t ? /* @__PURE__ */ m("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ r("p", { className: "richtext-mb-[8px] text-[20px] richtext-font-semibold", children: a("editor.table_of_content") }),
    /* @__PURE__ */ r("ul", { className: wt.list, children: i.map((c, s) => /* @__PURE__ */ r("li", { className: wt.item, style: { paddingLeft: `${c.level - 1}rem` }, children: /* @__PURE__ */ r("a", { href: `#${c.id}`, children: c.text }) }, `table-of-content-${s}`)) })
  ] }) : null });
}
function ah(e) {
  return e && e.type.name === "title";
}
function oh(e, t) {
  const n = [e.getJSON()], a = [];
  for (; n.length; ) {
    const o = n.shift();
    o.type === t && a.push(o), o.content && o.content.length && n.push(...o.content);
  }
  return a;
}
function ch(e, ...t) {
  const [i, n] = p(!1);
  return z(() => {
    const a = () => {
      n(e.isActive.apply(e, t));
    };
    return e.on("selectionUpdate", a), e.on("transaction", a), () => {
      e.off("selectionUpdate", a), e.off("transaction", a);
    };
  }, [e, t, n]), i;
}
function sh({ editor: e, icon: t, tooltip: i }) {
  const n = ch(e, lh.name), a = A(() => {
    if (n) {
      e.chain().focus().removeTableOfContents().run();
      return;
    }
    e.chain().focus().setTableOfContents().run();
  }, [e, n]);
  return /* @__PURE__ */ r(
    _,
    {
      action: a,
      isActive: () => n || !1,
      icon: t,
      tooltip: i
    }
  );
}
const lh = he.create({
  name: "tableOfContents",
  group: "block",
  atom: !0,
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      onHasOneBeforeInsert: () => {
      },
      resizable: !0,
      lastColumnResizable: !0,
      allowTableNodeSelection: !1,
      button: ({ editor: t, t: i }) => ({
        component: sh,
        componentProps: {
          disabled: !1,
          icon: "BookMarked",
          tooltip: i("editor.table.tooltip"),
          editor: t
        }
      })
    };
  },
  parseHTML() {
    return [
      {
        tag: "toc"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["toc", ne(e)];
  },
  addNodeView() {
    return ge(rh);
  },
  // @ts-expect-error
  addCommands() {
    return {
      setTableOfContents: () => ({ commands: e, editor: t, view: i }) => {
        if (oh(t, this.name).length) {
          this.options.onHasOneBeforeInsert();
          return;
        }
        const a = i.props.state.doc.content.firstChild;
        if (ah(a)) {
          const o = (a.firstChild && a.firstChild.nodeSize || 0) + 1;
          return e.insertContentAt(o, { type: this.name });
        }
        return e.insertContent({
          type: this.name
        });
      },
      removeTableOfContents: () => ({ state: e, dispatch: t }) => {
        const { tr: i } = e, n = e.schema.nodes.tableOfContents;
        return e.doc.descendants((a, o) => {
          if (a.type === n) {
            const c = o, s = o + a.nodeSize;
            i.delete(c, s);
          }
        }), i.docChanged ? (t(i), !0) : !1;
      }
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        attributes: {
          id: {
            default: null
          }
        }
      }
    ];
  }
});
function dh(e) {
  var i;
  const t = D(() => {
    var o;
    const n = (o = e == null ? void 0 : e.items) == null ? void 0 : o.find((c) => c.isActive());
    return n && !n.default ? {
      ...n,
      icon: n.icon ? n.icon : e.icon
    } : {
      title: e == null ? void 0 : e.tooltip,
      icon: e.icon,
      isActive: () => !1
    };
  }, [e]);
  return /* @__PURE__ */ m(se, { modal: !0, children: [
    /* @__PURE__ */ r(le, { disabled: e == null ? void 0 : e.disabled, asChild: !0, children: /* @__PURE__ */ r(
      _,
      {
        customClass: "!richtext-w-12 richtext-h-12",
        icon: e == null ? void 0 : e.icon,
        tooltip: e == null ? void 0 : e.tooltip,
        disabled: e == null ? void 0 : e.disabled,
        children: /* @__PURE__ */ r(F, { className: "richtext-w-3 richtext-h-3 richtext-ml-1 richtext-text-zinc-500", name: "MenuDown" })
      }
    ) }),
    /* @__PURE__ */ r(
      re,
      {
        className: "richtext-min-w-4 richtext-w-full !richtext-p-[4px] richtext-flex richtext-flex-row richtext-gap-1",
        align: "start",
        side: "bottom",
        children: (i = e == null ? void 0 : e.items) == null ? void 0 : i.map((n, a) => {
          var o, c;
          return /* @__PURE__ */ m(Je, { children: [
            /* @__PURE__ */ r(Qe, { asChild: !0, children: /* @__PURE__ */ r(
              ut,
              {
                size: "sm",
                onClick: n == null ? void 0 : n.action,
                className: "richtext-p-1 richtext-w-7 richtext-h-7",
                pressed: t.title === n.title,
                "data-state": t.title === n.title ? "on" : "off",
                children: (n == null ? void 0 : n.icon) && /* @__PURE__ */ r(F, { name: n.icon })
              }
            ) }),
            /* @__PURE__ */ m(Ee, { className: "richtext-flex richtext-flex-col richtext-items-center", children: [
              /* @__PURE__ */ r("span", { children: n.title }),
              !!((o = n.shortcutKeys) != null && o.length) && /* @__PURE__ */ r("span", { children: (c = n.shortcutKeys) == null ? void 0 : c.map((s) => Et(s)).join(" ") })
            ] })
          ] }, `text-align-${a}`);
        })
      }
    )
  ] });
}
const Lu = Z.create({
  name: "text-direction",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      types: ["heading", "paragraph"],
      directions: ["auto", "ltr", "rtl"],
      defaultDirection: "auto",
      button({
        editor: t,
        extension: i,
        t: n
      }) {
        var d;
        const a = ((d = i.options) == null ? void 0 : d.directions) || [], o = {
          auto: "TextDirection",
          ltr: "LeftToRight",
          rtl: "RightToLeft"
        }, c = a.map((l) => ({
          title: n(`editor.textDirection.${l}.tooltip`),
          icon: o[l],
          isActive: () => !1,
          action: () => {
            var h, u, f, g;
            if (l === "auto") {
              (u = (h = t.commands) == null ? void 0 : h.unsetTextDirection) == null || u.call(h);
              return;
            }
            (g = (f = t.commands) == null ? void 0 : f.setTextDirection) == null || g.call(f, l);
          },
          disabled: !1
        })), s = c.filter((l) => l.disabled).length === c.length;
        return {
          component: dh,
          componentProps: {
            icon: "TextDirection",
            tooltip: n("editor.textDirection.tooltip"),
            disabled: s,
            items: c
          }
        };
      }
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          dir: {
            default: this.options.defaultDirection,
            parseHTML: (e) => e.attributes.dir && this.options.directions.includes(e.attributes.dir) ? e.attributes.dir.value : this.options.defaultDirection,
            renderHTML: (e) => ({ dir: e.dir })
          }
        }
      }
    ];
  },
  // @ts-expect-error
  addCommands() {
    return {
      setTextDirection: (e) => ({ commands: t }) => this.options.directions.includes(e) ? this.options.types.every((i) => t.updateAttributes(i, { dir: e })) : !1,
      unsetTextDirection: () => ({ commands: e }) => this.options.types.every((t) => e.resetAttributes(t, "dir"))
    };
  }
}), hh = "_listUsers_en3pm_1", uh = "_itemUser_en3pm_10", mh = "_selectedUser_en3pm_31", _t = {
  listUsers: hh,
  itemUser: uh,
  selectedUser: mh
}, fh = At((e, t) => {
  const i = Y(), [n, a] = p(0), o = (l) => {
    const h = e.items[l];
    h && e.command({ id: h, label: h });
  }, c = () => {
    a((n + e.items.length - 1) % e.items.length);
  }, s = () => {
    a((n + 1) % e.items.length);
  }, d = () => {
    o(n);
  };
  return z(() => a(0), [e.items]), z(() => {
    if (Number.isNaN(n + 1))
      return;
    const l = i.current.querySelector(`span:nth-of-type(${n + 1})`);
    l && fi(l, { behavior: "smooth", scrollMode: "if-needed" });
  }, [n]), Lt(t, () => ({
    onKeyDown: ({ event: l }) => l.key === "ArrowUp" ? (c(), !0) : l.key === "ArrowDown" ? (s(), !0) : l.key === "Enter" ? (d(), !0) : !1
  })), /* @__PURE__ */ r("div", { className: ee("listUsers", _t.listUsers), children: /* @__PURE__ */ r("div", { ref: i, children: e.items.length ? e.items.map((l, h) => /* @__PURE__ */ r(
    "span",
    {
      className: ee("itemUser", _t.itemUser, h === n ? _t.selectedUser : ""),
      onClick: () => o(h),
      children: l
    },
    h
  )) : /* @__PURE__ */ r("div", { className: ee("itemUserEmpty", _t.itemUser), children: "Empty" }) }) });
}), gh = [
  {
    id: "1",
    name: "John Doe"
  },
  {
    id: "2",
    name: "Jane Doe"
  },
  {
    id: "3",
    name: "Alice"
  },
  {
    id: "4",
    name: "Bob"
  }
], xh = {
  items: async ({ query: e }) => gh.map((i) => i.name).filter((i) => i.toLowerCase().startsWith(e.toLowerCase())),
  render: () => {
    let e, t;
    return {
      onStart: (i) => {
        e = new oi(fh, {
          props: i,
          editor: i.editor
        }), t = mi("body", {
          getReferenceClientRect: i.clientRect,
          appendTo: () => document.body,
          content: e.element,
          showOnCreate: !0,
          interactive: !0,
          trigger: "manual",
          placement: "bottom-start"
        });
      },
      onUpdate(i) {
        e.updateProps(i), t[0].setProps({
          getReferenceClientRect: i.clientRect
        });
      },
      onKeyDown(i) {
        var n;
        return i.event.key === "Escape" ? (t[0].hide(), !0) : (n = e.ref) == null ? void 0 : n.onKeyDown(i);
      },
      onExit() {
        t[0].destroy(), e.destroy();
      }
    };
  }
}, Su = oo.extend({
  addAttributes() {
    return {
      id: {
        default: "",
        parseHTML: Q("id")
      },
      label: {
        default: "",
        parseHTML: Q("label")
      }
    };
  }
}).configure({
  HTMLAttributes: {
    class: "mention"
  },
  suggestion: xh
});
function bh(e) {
  switch (Lc(e)) {
    case "audio":
      return /* @__PURE__ */ r(xa, {});
    case "video":
      return /* @__PURE__ */ r(ga, {});
    case "file":
      return /* @__PURE__ */ r(fa, {});
    case "image":
      return /* @__PURE__ */ r(ma, {});
    case "pdf":
      return /* @__PURE__ */ r($n, {});
    case "word":
      return /* @__PURE__ */ r(Vn, {});
    case "excel":
      return /* @__PURE__ */ r(ua, {});
    case "ppt":
      return /* @__PURE__ */ r(ha, {});
    default:
      return /* @__PURE__ */ r(K, {});
  }
}
const ph = "_wrap_gpqtf_1", Wt = {
  wrap: ph
};
function wh({ editor: e, node: t, updateAttributes: i, deleteNode: n, extension: a }) {
  var N;
  const o = Y(), c = Pt(), { hasTrigger: s, fileName: d, fileSize: l, fileExt: h, fileType: u, url: f, error: g } = t.attrs, [x, b] = p(!1), { t: y } = V(), T = (N = a == null ? void 0 : a.options) == null ? void 0 : N.upload, v = A(() => {
    !c || f || c && o.current.click();
  }, [c, f]), w = A(
    async (I) => {
      const O = I.target.files && I.target.files[0];
      if (!O)
        return;
      const M = {
        fileName: Nc(O.name),
        fileSize: O.size,
        fileType: O.type,
        fileExt: Tc(O.name)
      };
      b(!0);
      try {
        const S = await T(O);
        i({ ...M, url: S }), b(!1);
      } catch (S) {
        i({ error: `File upload fail: ${S && S.message}` || "Unknown error" }), b(!1), o.current.value = "";
      }
    },
    [b, i]
  );
  z(() => {
    !f && !s && (v(), i({ hasTrigger: !0 }));
  }, [f, s, v, i]);
  const k = A(() => n(), [e]);
  return c && !f ? /* @__PURE__ */ r(ae, { children: /* @__PURE__ */ m("div", { className: ee(Wt.wrap, "render-wrapper"), children: [
    /* @__PURE__ */ r("p", { style: { cursor: "pointer" }, onClick: v, children: x ? /* @__PURE__ */ r("span", { children: y("editor.attachment.uploading") }) : /* @__PURE__ */ r("span", { children: y("editor.attachment.please_upload") }) }),
    /* @__PURE__ */ r("input", { ref: o, type: "file", hidden: !0, onChange: w })
  ] }) }) : f ? /* @__PURE__ */ r(ae, { children: /* @__PURE__ */ m("div", { className: ee(Wt.wrap, "render-wrapper"), onClick: v, children: [
    /* @__PURE__ */ m("div", { className: "richtext-flex richtext-items-center richtext-gap-[4px]", children: [
      /* @__PURE__ */ r("span", { children: bh(u) }),
      /* @__PURE__ */ m("span", { children: [
        d,
        ".",
        h
      ] }),
      /* @__PURE__ */ m("span", { children: [
        "(",
        Ac(l),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ r(
      _,
      {
        icon: "Trash2",
        action: k,
        tooltip: y("editor.delete")
      }
    )
  ] }) }) : g !== "null" ? /* @__PURE__ */ r(ae, { children: /* @__PURE__ */ r("div", { className: ee(Wt.wrap, "render-wrapper"), onClick: v, children: /* @__PURE__ */ r("p", { children: g }) }) }) : /* @__PURE__ */ r(K, {});
}
const Mu = he.create({
  name: "attachment",
  content: "",
  marks: "",
  group: "block",
  selectable: !0,
  atom: !0,
  draggable: !0,
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      HTMLAttributes: {
        class: "attachment"
      },
      button: ({ editor: t, t: i }) => ({
        component: _,
        componentProps: {
          action: () => t.chain().focus().setAttachment().run(),
          isActive: () => !1,
          disabled: !1,
          icon: "Attachment",
          tooltip: i("editor.attachment.tooltip")
        }
      })
    };
  },
  parseHTML() {
    return [{ tag: "div[class=attachment]" }];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["div", ne(this.options.HTMLAttributes, e)];
  },
  addAttributes() {
    return {
      fileName: {
        default: null,
        parseHTML: Q("filename")
      },
      fileSize: {
        default: null,
        parseHTML: Q("filesize")
      },
      fileType: {
        default: null,
        parseHTML: Q("filetype")
      },
      fileExt: {
        default: null,
        parseHTML: Q("fileext")
      },
      url: {
        default: null,
        parseHTML: Q("url")
      },
      hasTrigger: {
        default: !1,
        parseHTML: (e) => Q("hastrigger")(e) === "true"
      },
      error: {
        default: null,
        parseHTML: Q("error")
      }
    };
  },
  addCommands() {
    return {
      setAttachment: (e = {}) => ({ chain: t }) => t().insertContent({ type: this.name, attrs: e }).run()
    };
  },
  addNodeView() {
    return ge(wh);
  }
}), vt = {
  TOP_LEFT: "tl",
  TOP_RIGHT: "tr",
  BOTTOM_LEFT: "bl",
  BOTTOM_RIGHT: "br"
};
function _h(e) {
  var I, O;
  const [t, i] = p({
    width: We,
    height: We
  }), [n, a] = p({
    width: 0,
    height: 0
  }), [o] = p([
    vt.TOP_LEFT,
    vt.TOP_RIGHT,
    vt.BOTTOM_LEFT,
    vt.BOTTOM_RIGHT
  ]), [c, s] = p(!1), [d, l] = p({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    dir: ""
  }), { align: h } = (I = e == null ? void 0 : e.node) == null ? void 0 : I.attrs, u = D(() => {
    var H;
    const { src: M, alt: S, width: L, height: C } = (H = e == null ? void 0 : e.node) == null ? void 0 : H.attrs, B = Ct(L) ? `${L}px` : L, R = Ct(C) ? `${C}px` : C;
    return {
      src: M || void 0,
      alt: S || void 0,
      style: {
        width: B || void 0,
        height: R || void 0
      }
    };
  }, [(O = e == null ? void 0 : e.node) == null ? void 0 : O.attrs]), f = D(() => {
    const {
      style: { width: M }
    } = u;
    return { width: M === "100%" ? M : void 0 };
  }, [u]);
  function g(M) {
    a({
      width: M.target.width,
      height: M.target.height
    });
  }
  function x() {
    const { editor: M, getPos: S } = e;
    M.commands.setNodeSelection(S());
  }
  const b = A(
    Se(() => {
      const { editor: M } = e, { width: S } = getComputedStyle(M.view.dom);
      i((L) => ({
        ...L,
        width: Number.parseInt(S, 10)
      }));
    }, Ke),
    [e == null ? void 0 : e.editor]
  );
  function y(M, S) {
    M.preventDefault(), M.stopPropagation();
    const L = n.width, C = n.height, B = L / C;
    let R = Number(e.node.attrs.width), H = Number(e.node.attrs.height);
    const E = t.width;
    R && !H ? (R = R > E ? E : R, H = Math.round(R / B)) : H && !R ? (R = Math.round(H * B), R = R > E ? E : R) : !R && !H ? (R = L > E ? E : L, H = Math.round(R / B)) : R = R > E ? E : R, qe(() => {
      s(!0), l({
        x: M.clientX,
        y: M.clientY,
        w: R,
        h: H,
        dir: S
      });
    });
  }
  const T = A(
    Se((M) => {
      if (M.preventDefault(), M.stopPropagation(), !c)
        return;
      const { x: S, w: L, dir: C } = d, B = (M.clientX - S) * (/l/.test(C) ? -1 : 1), R = hn(L + B, hi, t.width);
      e.updateAttributes({
        width: R,
        height: null
      });
    }, Ke),
    [c, d, t, e.updateAttributes]
  ), v = A(
    (M) => {
      M.preventDefault(), M.stopPropagation(), c && (qe(() => {
        l({
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          dir: ""
        }), s(!1);
      }), x());
    },
    [c, x]
  ), w = A(() => {
    document == null || document.addEventListener("mousemove", T, !0), document == null || document.addEventListener("mouseup", v, !0);
  }, [T, v]), k = A(() => {
    document == null || document.removeEventListener("mousemove", T, !0), document == null || document.removeEventListener("mouseup", v, !0);
  }, [T, v]);
  z(() => (c ? w() : k(), () => {
    k();
  }), [c, w, k]);
  const N = D(() => new ResizeObserver(() => b()), [b]);
  return z(() => (N.observe(e.editor.view.dom), () => {
    N.disconnect();
  }), [e.editor.view.dom, N]), /* @__PURE__ */ r(ae, { className: "image-view", style: { ...f, width: "100%", textAlign: h }, children: /* @__PURE__ */ m(
    "div",
    {
      draggable: "true",
      "data-drag-handle": !0,
      className: `image-view__body ${e != null && e.selected ? "image-view__body--focused" : ""} ${c ? "image-view__body--resizing" : ""}`,
      style: f,
      children: [
        /* @__PURE__ */ r(
          "img",
          {
            src: u.src,
            alt: u.alt,
            style: u.style,
            height: "auto",
            className: "image-view__body__image block",
            onLoad: g,
            onClick: x
          }
        ),
        (e == null ? void 0 : e.editor.view.editable) && ((e == null ? void 0 : e.selected) || c) && /* @__PURE__ */ r("div", { className: "image-resizer", children: o == null ? void 0 : o.map((M) => /* @__PURE__ */ r(
          "span",
          {
            className: `image-resizer__handler image-resizer__handler--${M}`,
            onMouseDown: (S) => y(S, M)
          },
          `image-dir-${M}`
        )) })
      ]
    }
  ) });
}
function vh({ selectImage: e, giphyApiKey: t, children: i }) {
  const [n, a] = p([]), [o] = p(15), c = Y(null), s = (l, h = "search") => {
    if (!t)
      return;
    const f = `${h === "search" ? `https://api.giphy.com/v1/gifs/search?q=${l}` : `https://api.giphy.com/v1/gifs/trending?q=${l}`}&limit=${o}&api_key=${t}`;
    fetch(f).then((g) => g.json()).then((g) => {
      a(g.data);
    }).catch((g) => {
      console.log(g);
    });
  };
  z(() => {
    s("", "trend");
  }, []);
  const d = A(
    di((l) => {
      if (!l.target.value) {
        s("", "trend");
        return;
      }
      s(l.target.value);
    }, 350),
    // Adjust the debounce delay as needed
    []
  );
  return /* @__PURE__ */ m(se, { modal: !0, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: i }),
    /* @__PURE__ */ r(re, { hideWhenDetached: !0, className: "richtext-w-full richtext-h-full richtext-p-2", align: "start", side: "bottom", children: t ? /* @__PURE__ */ m(K, { children: [
      /* @__PURE__ */ r("div", { className: "richtext-w-full richtext-mb-[10px]", children: /* @__PURE__ */ r(
        te,
        {
          ref: c,
          type: "text",
          placeholder: "Search GIF",
          onChange: d
        }
      ) }),
      /* @__PURE__ */ r("div", { className: "richtext-max-h-[280px] richtext-overflow-y-auto", children: /* @__PURE__ */ r("div", { className: "richtext-grid richtext-grid-cols-2 richtext-gap-1 ", children: n != null && n.length ? n == null ? void 0 : n.map((l) => /* @__PURE__ */ r(
        "img",
        {
          alt: "giphy",
          className: "richtext-text-center richtext-cursor-pointer",
          onClick: (h) => e(l),
          height: l.images.fixed_width_downsampled.height,
          width: l.images.fixed_width_downsampled.width,
          src: l.images.fixed_width_downsampled.url
        },
        `giphy-${l.id}`
      )) : /* @__PURE__ */ r("p", { children: "No GIFs found" }) }) })
    ] }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r("p", { children: "Missing Giphy API Key" }) }) })
  ] });
}
function yh({ editor: e, icon: t, giphyApiKey: i, ...n }) {
  return /* @__PURE__ */ r(
    vh,
    {
      selectImage: (o) => {
        const { url: c } = o.images.original;
        e.chain().focus().setImageGif({ src: c }).run();
      },
      giphyApiKey: i,
      children: /* @__PURE__ */ r(
        _,
        {
          tooltip: n == null ? void 0 : n.tooltip,
          icon: t
        }
      )
    }
  );
}
const Gn = ci.extend({
  name: "imageGif",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      inline: !1,
      content: "",
      marks: "",
      group: "block",
      GIPHY_API_KEY: "",
      draggable: !1,
      selectable: !0,
      atom: !0,
      button: ({ editor: t, extension: i, t: n }) => {
        var o;
        const a = ((o = i == null ? void 0 : i.options) == null ? void 0 : o.GIPHY_API_KEY) || "";
        return {
          component: yh,
          componentProps: {
            editor: t,
            action: () => {
            },
            isActive: () => !1,
            disabled: !1,
            icon: "GifIcon",
            tooltip: n("editor.imageGif.tooltip"),
            giphyApiKey: a
          }
        };
      }
    };
  },
  addAttributes() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      width: {
        default: null,
        parseHTML: (t) => {
          const i = t.style.width || t.getAttribute("width") || "10";
          return i === void 0 ? null : Number.parseInt(`${i}`, 10);
        },
        renderHTML: (t) => ({
          width: t.width
        })
      },
      align: {
        default: "center",
        parseHTML: (t) => t.getAttribute("align"),
        renderHTML: (t) => ({
          align: t.align
        })
      }
    };
  },
  addNodeView() {
    return ge(_h);
  },
  addCommands() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      setImageGif: (t) => ({ commands: i }) => i.insertContent({
        type: this.name,
        attrs: t
      }),
      updateImageGif: (t) => ({ commands: i }) => i.updateAttributes(this.name, t),
      setAlignImageGif: (t) => ({ commands: i }) => i.updateAttributes(this.name, { align: t })
    };
  },
  renderHTML({ HTMLAttributes: e }) {
    const { align: t } = e;
    return [
      "div",
      // Parent element
      {
        style: t ? `text-align: ${t};` : "",
        class: "imageGIf"
      },
      [
        "img",
        ne(
          // Always render the `height="auto"`
          {
            height: "auto"
          },
          this.options.HTMLAttributes,
          e
        )
      ]
    ];
  },
  parseHTML() {
    return [
      {
        tag: "div[class=imageGIf]",
        getAttrs: (e) => {
          const t = e.querySelector("img"), i = t == null ? void 0 : t.getAttribute("width");
          return {
            src: t == null ? void 0 : t.getAttribute("src"),
            alt: t == null ? void 0 : t.getAttribute("alt"),
            title: t == null ? void 0 : t.getAttribute("title"),
            width: i ? Number.parseInt(i, 10) : null,
            align: (t == null ? void 0 : t.getAttribute("align")) || e.style.textAlign || null
          };
        }
      }
    ];
  }
}), Yi = `graph TB
a-->b`, kh = ({ editor: e, upload: t }) => {
  const [i, n] = p(Yi), [a, o] = p(""), [c, s] = p(!1), d = Y(null), l = async (f) => {
    try {
      const { svg: g } = await Tt.render("mermaid-svg", f);
      o(g);
    } catch {
      o("");
    }
  }, h = () => {
    Tt.initialize({
      darkMode: !1,
      startOnLoad: !1,
      // fontFamily:'',
      fontSize: 12,
      theme: "base"
    }), l(i);
  };
  return z(() => {
    c && h();
  }, [c]), z(() => {
    c && l(i);
  }, [i]), /* @__PURE__ */ m(
    He,
    {
      open: c,
      onOpenChange: s,
      children: [
        /* @__PURE__ */ r(Re, { asChild: !0, children: /* @__PURE__ */ r(
          _,
          {
            icon: "Mermaid",
            tooltip: "Mermaid",
            action: () => s(!0)
          }
        ) }),
        /* @__PURE__ */ m(ye, { className: "!richtext-max-w-[1300px] richtext-z-[99999]", children: [
          /* @__PURE__ */ r(ke, { children: "Mermaid" }),
          /* @__PURE__ */ r("div", { style: { height: "100%", borderWidth: 1 }, children: /* @__PURE__ */ m("div", { className: "richtext-flex richtext-gap-[10px] richtext-rounded-[10px] richtext-p-[10px]", children: [
            /* @__PURE__ */ r(
              ht,
              {
                className: "richtext-flex-1",
                value: i,
                onChange: (f) => n(f.target.value),
                autoFocus: !0,
                required: !0,
                rows: 10,
                defaultValue: Yi,
                placeholder: "Text",
                style: {
                  color: "hsl(var(--richtext-foreground))"
                }
              }
            ),
            /* @__PURE__ */ r(
              "div",
              {
                className: "richtext-flex-1 richtext-flex richtext-items-center richtext-justify-center richtext-rounded-[10px] richtext-p-[10px]",
                style: { height: "100%", borderWidth: 1, minHeight: 500, background: "#fff" },
                ref: d,
                dangerouslySetInnerHTML: { __html: a }
              }
            )
          ] }) }),
          /* @__PURE__ */ r(et, { children: /* @__PURE__ */ r(
            U,
            {
              type: "button",
              onClick: async () => {
                if (i !== "") {
                  if (i) {
                    const f = d.current.querySelector("svg"), { width: g, height: x } = f.getBoundingClientRect(), b = `mermaid-${In()}.svg`;
                    let y = ln(f.outerHTML);
                    if (t) {
                      const T = _i(y, b);
                      y = await t(T);
                    }
                    e == null || e.chain().focus().setMermaid(
                      {
                        type: "mermaid",
                        src: y,
                        alt: encodeURIComponent(i),
                        width: g,
                        height: x
                      },
                      !!i
                    ).run();
                  }
                  s(!1);
                }
              },
              children: "Save changes"
            }
          ) })
        ] })
      ]
    }
  );
}, yt = {
  TOP_LEFT: "tl",
  TOP_RIGHT: "tr",
  BOTTOM_LEFT: "bl",
  BOTTOM_RIGHT: "br"
};
function Ch({ editor: e, node: t, updateAttributes: i, getPos: n, selected: a }) {
  const [o, c] = p({
    width: We,
    height: We
  }), [s, d] = p({
    width: 0,
    height: 0
  }), [l] = p([
    yt.TOP_LEFT,
    yt.TOP_RIGHT,
    yt.BOTTOM_LEFT,
    yt.BOTTOM_RIGHT
  ]), [h, u] = p(!1), [f, g] = p({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    dir: ""
  }), { align: x } = t == null ? void 0 : t.attrs, b = D(() => {
    const { src: L, alt: C, width: B, height: R } = t == null ? void 0 : t.attrs, H = Li(B) ? `${B}px` : B, E = Li(R) ? `${R}px` : R;
    return {
      src: L || void 0,
      alt: C || void 0,
      style: {
        width: H || void 0,
        height: E || void 0
      }
    };
  }, [t == null ? void 0 : t.attrs]), y = D(() => {
    const {
      style: { width: L }
    } = b;
    return { width: L === "100%" ? L : void 0 };
  }, [b]);
  function T(L) {
    d({
      width: L.target.width,
      height: L.target.height
    });
  }
  function v() {
    e.commands.setNodeSelection(n());
  }
  const w = A(
    Se(() => {
      const { width: L } = getComputedStyle(e.view.dom);
      c((C) => ({
        ...C,
        width: Number.parseInt(L, 10)
      }));
    }, Ke),
    [e]
  );
  function k(L, C) {
    L.preventDefault(), L.stopPropagation();
    const B = s.width, R = s.height, H = B / R;
    let E = Number(t.attrs.width), G = Number(t.attrs.height);
    const J = o.width;
    E && !G ? (E = E > J ? J : E, G = Math.round(E / H)) : G && !E ? (E = Math.round(G * H), E = E > J ? J : E) : !E && !G ? (E = B > J ? J : B, G = Math.round(E / H)) : E = E > J ? J : E, qe(() => {
      u(!0), g({
        x: L.clientX,
        y: L.clientY,
        w: E,
        h: G,
        dir: C
      });
    });
  }
  const N = A(
    Se((L) => {
      if (L.preventDefault(), L.stopPropagation(), !h)
        return;
      const { x: C, w: B, dir: R } = f, H = (L.clientX - C) * (/l/.test(R) ? -1 : 1), E = An(B + H, hi, o.width);
      i({
        width: E,
        height: null
      });
    }, Ke),
    [h, f, o, i]
  ), I = A(
    (L) => {
      L.preventDefault(), L.stopPropagation(), h && (qe(() => {
        g({
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          dir: ""
        }), u(!1);
      }), v());
    },
    [h, v]
  ), O = A(() => {
    document == null || document.addEventListener("mousemove", N, !0), document == null || document.addEventListener("mouseup", I, !0);
  }, [N, I]), M = A(() => {
    document == null || document.removeEventListener("mousemove", N, !0), document == null || document.removeEventListener("mouseup", I, !0);
  }, [N, I]);
  z(() => (h ? O() : M(), () => {
    M();
  }), [h, O, M]);
  const S = D(() => new ResizeObserver(() => w()), [w]);
  return z(() => (S.observe(e.view.dom), () => {
    S.disconnect();
  }), [e.view.dom, S]), /* @__PURE__ */ r(ae, { className: "image-view", style: { ...y, width: "100%", textAlign: x }, children: /* @__PURE__ */ m(
    "div",
    {
      draggable: "true",
      "data-drag-handle": !0,
      className: `image-view__body ${a ? "image-view__body--focused" : ""} ${h ? "image-view__body--resizing" : ""}`,
      style: { ...y, background: "#fff" },
      children: [
        /* @__PURE__ */ r(
          "img",
          {
            src: b.src,
            alt: b.alt,
            style: b.style,
            height: "auto",
            className: "image-view__body__image block",
            onLoad: T,
            onClick: v
          }
        ),
        e.view.editable && (a || h) && /* @__PURE__ */ r("div", { className: "image-resizer", children: l == null ? void 0 : l.map((L) => /* @__PURE__ */ r(
          "span",
          {
            className: `image-resizer__handler image-resizer__handler--${L}`,
            onMouseDown: (C) => k(C, L)
          },
          `image-dir-${L}`
        )) })
      ]
    }
  ) });
}
const Ji = ci.extend({
  name: "mermaid",
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      inline: !1,
      content: "",
      marks: "",
      group: "block",
      draggable: !1,
      selectable: !0,
      atom: !0,
      HTMLAttributes: {
        class: "mermaid"
      },
      button: ({ editor: t, t: i, extension: n }) => {
        var a;
        return {
          component: kh,
          componentProps: {
            action: () => {
            },
            isActive: () => !1,
            disabled: !1,
            editor: t,
            icon: "Mermaid",
            tooltip: i("editor.mermaid.tooltip"),
            upload: (a = n == null ? void 0 : n.options) == null ? void 0 : a.upload
          }
        };
      }
    };
  },
  addAttributes() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      width: {
        default: null,
        parseHTML: (t) => {
          const i = t.style.width || t.getAttribute("width") || "10";
          return i === void 0 ? null : Number.parseInt(`${i}`, 10);
        },
        renderHTML: (t) => ({
          width: t.width
        })
      },
      height: {
        default: null,
        parseHTML: (t) => {
          const i = t.style.height || t.getAttribute("height") || "10";
          return i === void 0 ? null : Number.parseInt(`${i}`, 10);
        },
        renderHTML: (t) => ({
          height: t.height
        })
      },
      align: {
        default: "center",
        parseHTML: (t) => t.getAttribute("align"),
        renderHTML: (t) => ({
          align: t.align
        })
      }
    };
  },
  addNodeView() {
    return ge(Ch);
  },
  // @ts-ignore
  addCommands() {
    return {
      setMermaid: (e, t) => ({ commands: i, editor: n }) => t ? i.insertContent({
        type: this.name,
        attrs: e
      }) : i.insertContentAt(n.state.selection.anchor, {
        type: this.name,
        attrs: e
      }),
      setAlignImageMermaid: (e) => ({ commands: t }) => t.updateAttributes(this.name, { align: e })
    };
  },
  renderHTML({ HTMLAttributes: e }) {
    const { align: t } = e;
    return [
      "div",
      // Parent element
      {
        style: t ? `text-align: ${t};` : "",
        class: "imageMermaid"
      },
      [
        "img",
        ne(
          // @ts-ignore
          this.options.HTMLAttributes,
          e
        )
      ]
    ];
  },
  parseHTML() {
    return [
      {
        tag: "div[class=imageMermaid]",
        getAttrs: (e) => {
          const t = e.querySelector("img"), i = t == null ? void 0 : t.getAttribute("width"), n = t == null ? void 0 : t.getAttribute("height");
          return {
            src: t == null ? void 0 : t.getAttribute("src"),
            alt: t == null ? void 0 : t.getAttribute("alt"),
            width: i ? Number.parseInt(i, 10) : null,
            height: n ? Number.parseInt(n, 10) : null,
            align: (t == null ? void 0 : t.getAttribute("align")) || e.style.textAlign || null
          };
        }
      }
    ];
  }
});
export {
  Au as A,
  Xh as B,
  Qh as C,
  lh as D,
  Cu as E,
  eu as F,
  De as G,
  tu as H,
  Zh as I,
  Lu as J,
  Ve as K,
  hu as L,
  bu as M,
  Su as N,
  su as O,
  Mu as P,
  Gn as Q,
  Gh as R,
  Jh as S,
  iu as T,
  Yh as U,
  Ql as V,
  Ji as W,
  ei as X,
  sl as a,
  nu as b,
  ru as c,
  au as d,
  ou as e,
  cu as f,
  lu as g,
  du as h,
  uu as i,
  mu as j,
  gu as k,
  xu as l,
  Wo as m,
  pu as n,
  wu as o,
  _u as p,
  vu as q,
  yu as r,
  ku as s,
  Ci as t,
  ct as u,
  fu as v,
  Be as w,
  md as x,
  Nu as y,
  Tu as z
};
