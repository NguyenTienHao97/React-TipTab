import { P as p, k as x, h as C, B, e as S, f as h, C as g, a as k, c as E, t as I, v as R, E as H, G as M, y as T, A as b, F as A, b as L, s as y, H as z, d as F, j as v, i as w, w as K, q as O, Q as P, z as U, n as W, I as _, K as j, o as q, L as D, N as G, W as N, M as V, u as J, O as Q, x as X, p as Y, S as Z, l as $, r as aa, D as sa, g as ea, T as ta, J as oa, X as ra, U as ia, V as na, R as la } from "./utils-DxXL8izb.js";
import { m as ua, n as ca, k as ma, p as fa, v as pa, z as xa } from "./locales-Bd8tJWR7.js";
import { useRef as l, useState as t, useEffect as d } from "react";
import { B as Ba } from "./tiptap-lrKgHTdQ.js";
function c() {
  var s;
  const a = l({ editor: null }), [o, r] = t(!1), [i, n] = t(null);
  return d(() => {
    var e;
    (e = a.current) != null && e.editor && (r(!0), n(a.current.editor));
  }, [a, (s = a.current) == null ? void 0 : s.editor]), { isReady: o, editor: i, editorRef: a };
}
export {
  p as Attachment,
  x as BaseKit,
  C as Blockquote,
  B as Bold,
  Ba as BubbleMenu,
  S as BulletList,
  h as Clear,
  g as Code,
  k as CodeBlock,
  E as Color,
  I as Column,
  R as ColumnActionButton,
  H as Emoji,
  M as Excalidraw,
  T as ExportPdf,
  b as ExportWord,
  A as FontFamily,
  L as FontSize,
  y as FormatPainter,
  z as Heading,
  F as Highlight,
  v as History,
  w as HorizontalRule,
  K as Iframe,
  O as Image,
  P as ImageGif,
  U as ImportWord,
  W as Indent,
  _ as Italic,
  j as Katex,
  q as LineHeight,
  D as Link,
  G as Mention,
  N as Mermaid,
  V as MoreMark,
  J as MultiColumn,
  Q as OrderedList,
  X as SearchAndReplace,
  Y as SlashCommand,
  Z as Strike,
  $ as SubAndSuperScript,
  aa as Table,
  sa as TableOfContents,
  ea as TaskList,
  ta as TextAlign,
  oa as TextDirection,
  ra as Twitter,
  ia as Underline,
  na as Video,
  la as default,
  ua as en,
  ca as hu_HU,
  ma as locale,
  fa as pt_BR,
  c as useEditorState,
  pa as vi,
  xa as zh_CN
};
