import Uy from "react";
import Hy from "react-dom";
function ae(n) {
  this.content = n;
}
ae.prototype = {
  constructor: ae,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), o = r.content.slice();
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new ae(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new ae(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new ae([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new ae(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new ae(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = ae.from(n), n.size ? new ae(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = ae.from(n), n.size ? new ae(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = ae.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
ae.from = function(n) {
  if (n instanceof ae) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new ae(e);
};
function Rd(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), o = e.child(r);
    if (i == o) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(o))
      return t;
    if (i.isText && i.text != o.text) {
      for (let s = 0; i.text[s] == o.text[s]; s++)
        t++;
      return t;
    }
    if (i.content.size || o.content.size) {
      let s = Rd(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function _d(n, e, t, r) {
  for (let i = n.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: t, b: r };
    let s = n.child(--i), l = e.child(--o), a = s.nodeSize;
    if (s == l) {
      t -= a, r -= a;
      continue;
    }
    if (!s.sameMarkup(l))
      return { a: t, b: r };
    if (s.isText && s.text != l.text) {
      let c = 0, f = Math.min(s.text.length, l.text.length);
      for (; c < f && s.text[s.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = _d(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
class b {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, i = 0, o) {
    for (let s = 0, l = 0; l < t; s++) {
      let a = this.content[s], c = l + a.nodeSize;
      if (c > e && r(a, i + l, o || null, s) !== !1 && a.content.size) {
        let f = l + 1;
        a.nodesBetween(Math.max(0, e - f), Math.min(a.content.size, t - f), r, i + f);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, i) {
    let o = "", s = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (s ? s = !1 : o += r), o += c;
    }, 0), o;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), o = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), o = 1); o < e.content.length; o++)
      i.push(e.content[o]);
    return new b(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let o = 0, s = 0; s < t; o++) {
        let l = this.content[o], a = s + l.nodeSize;
        a > e && ((s < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - s), Math.min(l.text.length, t - s)) : l = l.cut(Math.max(0, e - s - 1), Math.min(l.content.size, t - s - 1))), r.push(l), i += l.nodeSize), s = a;
      }
    return new b(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? b.empty : e == 0 && t == this.content.length ? this : new b(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), o = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new b(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new b([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new b(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return Rd(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return _d(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e, t = -1) {
    if (e == 0)
      return di(0, e);
    if (e == this.size)
      return di(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let o = this.child(r), s = i + o.nodeSize;
      if (s >= e)
        return s == e || t > 0 ? di(r + 1, s) : di(r, i);
      i = s;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return b.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new b(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return b.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new b(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return b.empty;
    if (e instanceof b)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new b([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
b.empty = new b([], 0);
const Rs = { index: 0, offset: 0 };
function di(n, e) {
  return Rs.index = n, Rs.offset = e, Rs;
}
function Qi(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!Qi(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Qi(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
class F {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if (this.eq(o))
        return e;
      if (this.type.excludes(o.type))
        t || (t = e.slice(0, i));
      else {
        if (o.type.excludes(this.type))
          return e;
        !r && o.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(o);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && Qi(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = r.create(t.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return F.none;
    if (e instanceof F)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
}
F.none = [];
class Zi extends Error {
}
class v {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = $d(this.content, e + this.openStart, t);
    return r && new v(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new v(Pd(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return v.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new v(b.fromJSON(e, t.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let o = e.firstChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.firstChild)
      r++;
    for (let o = e.lastChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.lastChild)
      i++;
    return new v(e, r, i);
  }
}
v.empty = new v(b.empty, 0, 0);
function Pd(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Pd(o.content, e - i - 1, t - i - 1)));
}
function $d(n, e, t, r) {
  let { index: i, offset: o } = n.findIndex(e), s = n.maybeChild(i);
  if (o == e || s.isText)
    return n.cut(0, e).append(t).append(n.cut(e));
  let l = $d(s.content, e - o - 1, t);
  return l && n.replaceChild(i, s.copy(l));
}
function Jy(n, e, t) {
  if (t.openStart > n.depth)
    throw new Zi("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Zi("Inconsistent open depths");
  return Ld(n, e, t, 0);
}
function Ld(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Ld(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return cn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = Ky(t, n);
      return cn(o, zd(n, s, l, e, r));
    }
  else return cn(o, eo(n, e, r));
}
function Bd(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Zi("Cannot join " + e.type.name + " onto " + n.type.name);
}
function $l(n, e, t) {
  let r = n.node(t);
  return Bd(r, e.node(t)), r;
}
function an(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function kr(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (an(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    an(i.child(l), r);
  e && e.depth == t && e.textOffset && an(e.nodeBefore, r);
}
function cn(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function zd(n, e, t, r, i) {
  let o = n.depth > i && $l(n, e, i + 1), s = r.depth > i && $l(t, r, i + 1), l = [];
  return kr(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Bd(o, s), an(cn(o, zd(n, e, t, r, i + 1)), l)) : (o && an(cn(o, eo(n, e, i + 1)), l), kr(e, t, i, l), s && an(cn(s, eo(t, r, i + 1)), l)), kr(r, null, i, l), new b(l);
}
function eo(n, e, t) {
  let r = [];
  if (kr(null, n, t, r), n.depth > t) {
    let i = $l(n, e, t + 1);
    an(cn(i, eo(n, e, t + 1)), r);
  }
  return kr(e, null, t, r), new b(r);
}
function Ky(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(b.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Lr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let o = 0; o < e; o++)
      i += r.child(o).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return F.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let o = r.marks;
    for (var s = 0; s < o.length; s++)
      o[s].type.spec.inclusive === !1 && (!i || !o[s].isInSet(i.marks)) && (o = o[s--].removeFromSet(o));
    return o;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var o = 0; o < r.length; o++)
      r[o].type.spec.inclusive === !1 && (!i || !r[o].isInSet(i.marks)) && (r = r[o--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new to(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, o = t;
    for (let s = e; ; ) {
      let { index: l, offset: a } = s.content.findIndex(o), c = o - a;
      if (r.push(s, l, i + a), !c || (s = s.child(l), s.isText))
        break;
      o = c - 1, i += a + 1;
    }
    return new Lr(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = Xc.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      Xc.set(e, r = new Gy());
    let i = r.elts[r.i] = Lr.resolve(e, t);
    return r.i = (r.i + 1) % qy, i;
  }
}
class Gy {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const qy = 12, Xc = /* @__PURE__ */ new WeakMap();
class to {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Yy = /* @__PURE__ */ Object.create(null);
class Xe {
  /**
  @internal
  */
  constructor(e, t, r, i = F.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || b.empty;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
  */
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && Qi(this.attrs, t || e.defaultAttrs || Yy) && F.sameSet(this.marks, r || F.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Xe(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Xe(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return v.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new v(c, i.depth - s, o.depth - s);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return Jy(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return Lr.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Lr.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (o) => (r.isInSet(o.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Fd(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = b.empty, i = 0, o = r.childCount) {
    let s = this.contentMatchAt(e).matchFragment(r, i, o), l = s && s.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < o; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let o = this.contentMatchAt(e).matchType(r), s = o && o.matchFragment(this.content, t);
    return s ? s.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = F.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!F.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = b.fromJSON(e, t.content), o = e.nodeType(t.type).create(t.attrs, i, r);
    return o.type.checkAttrs(o.attrs), o;
  }
}
Xe.prototype.text = void 0;
class no extends Xe {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Fd(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new no(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new no(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function Fd(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class gn {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new Xy(e, t);
    if (r.next == null)
      return gn.empty;
    let i = jd(r);
    r.next && r.err("Unexpected trailing text");
    let o = ib(rb(i));
    return ob(o, r), o;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let o = t; i && o < r; o++)
      i = i.matchType(e.child(o).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function o(s, l) {
      let a = s.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return b.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: f, next: u } = s.next[c];
        if (!(f.isText || f.hasRequiredAttrs()) && i.indexOf(u) == -1) {
          i.push(u);
          let h = o(u, l.concat(f));
          if (h)
            return h;
        }
      }
      return null;
    }
    return o(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), o = i.match;
      if (o.matchType(e)) {
        let s = [];
        for (let l = i; l.type; l = l.via)
          s.push(l.type);
        return s.reverse();
      }
      for (let s = 0; s < o.next.length; s++) {
        let { type: l, next: a } = o.next[s];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let o = i + (r.validEnd ? "*" : " ") + " ";
      for (let s = 0; s < r.next.length; s++)
        o += (s ? ", " : "") + r.next[s].type.name + "->" + e.indexOf(r.next[s].next);
      return o;
    }).join(`
`);
  }
}
gn.empty = new gn(!0);
class Xy {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function jd(n) {
  let e = [];
  do
    e.push(Qy(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Qy(n) {
  let e = [];
  do
    e.push(Zy(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Zy(n) {
  let e = nb(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = eb(n, e);
    else
      break;
  return e;
}
function Qc(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function eb(n, e) {
  let t = Qc(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Qc(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function tb(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let o in t) {
    let s = t[o];
    s.groups.indexOf(e) > -1 && i.push(s);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function nb(n) {
  if (n.eat("(")) {
    let e = jd(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = tb(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function rb(n) {
  let e = [[]];
  return i(o(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(s, l, a) {
    let c = { term: a, to: l };
    return e[s].push(c), c;
  }
  function i(s, l) {
    s.forEach((a) => a.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((a, c) => a.concat(o(c, l)), []);
    if (s.type == "seq")
      for (let a = 0; ; a++) {
        let c = o(s.exprs[a], l);
        if (a == s.exprs.length - 1)
          return c;
        i(c, l = t());
      }
    else if (s.type == "star") {
      let a = t();
      return r(l, a), i(o(s.expr, a), a), [r(a)];
    } else if (s.type == "plus") {
      let a = t();
      return i(o(s.expr, l), a), i(o(s.expr, a), a), [r(a)];
    } else {
      if (s.type == "opt")
        return [r(l)].concat(o(s.expr, l));
      if (s.type == "range") {
        let a = l;
        for (let c = 0; c < s.min; c++) {
          let f = t();
          i(o(s.expr, a), f), a = f;
        }
        if (s.max == -1)
          i(o(s.expr, a), a);
        else
          for (let c = s.min; c < s.max; c++) {
            let f = t();
            r(a, f), i(o(s.expr, a), f), a = f;
          }
        return [r(a)];
      } else {
        if (s.type == "name")
          return [r(l, void 0, s.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Vd(n, e) {
  return e - n;
}
function Zc(n, e) {
  let t = [];
  return r(e), t.sort(Vd);
  function r(i) {
    let o = n[i];
    if (o.length == 1 && !o[0].term)
      return r(o[0].to);
    t.push(i);
    for (let s = 0; s < o.length; s++) {
      let { term: l, to: a } = o[s];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function ib(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Zc(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let f = 0; f < i.length; f++)
          i[f][0] == l && (c = i[f][1]);
        Zc(n, a).forEach((f) => {
          c || i.push([l, c = []]), c.indexOf(f) == -1 && c.push(f);
        });
      });
    });
    let o = e[r.join(",")] = new gn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Vd);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function ob(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Wd(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Ud(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let o = n[r];
      if (o.hasDefault)
        i = o.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function Hd(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
  for (let i in n) {
    let o = n[i];
    o.validate && o.validate(e[i]);
  }
}
function Jd(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new lb(n, r, e[r]);
  return t;
}
let ef = class Kd {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Jd(e, r.attrs), this.defaultAttrs = Wd(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == gn.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Ud(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Xe(this, this.computeAttrs(e), b.from(t), F.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = b.from(t), this.checkContent(t), new Xe(this, this.computeAttrs(e), t, F.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = b.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(b.empty, !0);
    return o ? new Xe(this, e, t.append(o), F.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    Hd(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : F.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Kd(o, t, s));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let o in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function sb(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class lb {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? sb(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class hs {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Jd(e, i.attrs), this.excluded = null;
    let o = Wd(this.attrs);
    this.instance = o ? new F(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new F(this, Ud(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new hs(o, i++, t, s)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    Hd(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class ZI {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = ae.from(e.nodes), t.marks = ae.from(e.marks || {}), this.nodes = ef.compile(this.spec.nodes, this), this.marks = hs.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = gn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? tf(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : tf(this, s.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof ef) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new no(r, r.defaultAttrs, e, F.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  Deserialize a node from its JSON representation. This method is
  bound.
  */
  nodeFromJSON(e) {
    return Xe.fromJSON(this, e);
  }
  /**
  Deserialize a mark from its JSON representation. This method is
  bound.
  */
  markFromJSON(e) {
    return F.fromJSON(this, e);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function tf(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], o = n.marks[i], s = o;
    if (o)
      t.push(o);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(s = a);
      }
    if (!s)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function ab(n) {
  return n.tag != null;
}
function cb(n) {
  return n.style != null;
}
let Gd = class Ll {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (ab(i))
        this.tags.push(i);
      else if (cb(i)) {
        let o = /[^=]*/.exec(i.style)[0];
        r.indexOf(o) < 0 && r.push(o), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let o = e.nodes[i.node];
      return o.contentMatch.matchType(o);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new rf(this, t, !1);
    return r.addAll(e, F.none, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new rf(this, t, !0);
    return r.addAll(e, F.none, t.from, t.to), v.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (hb(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
        if (o.getAttrs) {
          let s = o.getAttrs(e);
          if (s === !1)
            continue;
          o.attrs = s || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, i) {
    for (let o = i ? this.styles.indexOf(i) + 1 : 0; o < this.styles.length; o++) {
      let s = this.styles[o], l = s.style;
      if (!(l.indexOf(e) != 0 || s.context && !r.matchesContext(s.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (s.getAttrs) {
          let a = s.getAttrs(t);
          if (a === !1)
            continue;
          s.attrs = a || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let o = i.priority == null ? 50 : i.priority, s = 0;
      for (; s < t.length; s++) {
        let l = t[s];
        if ((l.priority == null ? 50 : l.priority) < o)
          break;
      }
      t.splice(s, 0, i);
    }
    for (let i in e.marks) {
      let o = e.marks[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = of(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = of(s)), s.node || s.ignore || s.mark || (s.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Ll(e, Ll.schemaRules(e)));
  }
};
const qd = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, fb = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Yd = { ol: !0, ul: !0 }, ro = 1, io = 2, Or = 4;
function nf(n, e, t) {
  return e != null ? (e ? ro : 0) | (e === "full" ? io : 0) : n && n.whitespace == "pre" ? ro | io : t & ~Or;
}
class pi {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = F.none, this.match = o || (s & Or ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(b.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & ro)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = b.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(b.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !qd.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class rf {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0;
    let i = t.topNode, o, s = nf(null, t.preserveWhitespace, 0) | (r ? Or : 0);
    i ? o = new pi(i.type, i.attrs, F.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new pi(null, null, F.none, !0, null, s) : o = new pi(e.schema.topNodeType, null, F.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue, i = this.top;
    if (i.options & io || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (i.options & ro)
        i.options & io ? r = r.replace(/\r\n?/g, `
`) : r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let o = i.content[i.content.length - 1], s = e.previousSibling;
        (!o || s && s.nodeName == "BR" || o.isText && /[ \t\r\n\u000c]$/.test(o.text)) && (r = r.slice(1));
      }
      r && this.insertNode(this.parser.schema.text(r), t), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, r) {
    let i = e.nodeName.toLowerCase(), o;
    Yd.hasOwnProperty(i) && this.parser.normalizeLists && ub(e);
    let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, r));
    if (s ? s.ignore : fb.hasOwnProperty(i))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!s || s.skip || s.closeParent) {
      s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
      let l, a = this.top, c = this.needsBlock;
      if (qd.hasOwnProperty(i))
        a.content.length && a.content[0].isInline && this.open && (this.open--, a = this.top), l = !0, a.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        return;
      }
      let f = s && s.skip ? t : this.readStyles(e, t);
      f && this.addAll(e, f), l && this.sync(a), this.needsBlock = c;
    } else {
      let l = this.readStyles(e, t);
      l && this.addElementByRule(e, s, l, s.consuming === !1 ? o : void 0);
    }
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let o = this.parser.matchedStyles[i], s = r.getPropertyValue(o);
        if (s)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(o, s, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r, i) {
    let o, s;
    if (t.node)
      if (s = this.parser.schema.nodes[t.node], s.isLeaf)
        this.insertNode(s.create(t.attrs), r) || this.leafFallback(e, r);
      else {
        let a = this.enter(s, t.attrs || null, r, t.preserveWhitespace);
        a && (o = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, r);
    }
    o && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r, i) {
    let o = r || 0;
    for (let s = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; s != l; s = s.nextSibling, ++o)
      this.findAtPoint(e, o), this.addDOM(s, t);
    this.findAtPoint(e, o);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t) {
    let r, i;
    for (let o = this.open; o >= 0; o--) {
      let s = this.nodes[o], l = s.findWrapping(e);
      if (l && (!r || r.length > l.length) && (r = l, i = s, !l.length) || s.solid)
        break;
    }
    if (!r)
      return null;
    this.sync(i);
    for (let o = 0; o < r.length; o++)
      t = this.enterInner(r[o], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let i = this.textblockFromContext();
      i && (t = this.enterInner(i, null, t));
    }
    let r = this.findPlace(e, t);
    if (r) {
      this.closeExtra();
      let i = this.top;
      i.match && (i.match = i.match.matchType(e.type));
      let o = F.none;
      for (let s of r.concat(e.marks))
        (i.type ? i.type.allowsMarkType(s.type) : sf(s.type, e.type)) && (o = s.addToSet(o));
      return i.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r, i) {
    let o = this.findPlace(e.create(t), r);
    return o && (o = this.enterInner(e, t, r, !0, i)), o;
  }
  // Open a node of the given type
  enterInner(e, t, r, i = !1, o) {
    this.closeExtra();
    let s = this.top;
    s.match = s.match && s.match.matchType(e);
    let l = nf(e, o, s.options);
    s.options & Or && s.content.length == 0 && (l |= Or);
    let a = F.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : sf(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new pi(e, t, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--)
      if (this.nodes[t] == e)
        return this.open = t, !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), o = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), s = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= o; a--)
            if (s(l - 1, a))
              return !0;
          return !1;
        } else {
          let f = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= o ? r.node(a - o).type : null;
          if (!f || f.name != c && f.groups.indexOf(c) == -1)
            return !1;
          a--;
        }
      }
      return !0;
    };
    return s(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function ub(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Yd.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function hb(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function of(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function sf(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let o = [], s = (l) => {
      o.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: f } = l.edge(a);
        if (c == e || o.indexOf(f) < 0 && s(f))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
class nr {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = _s(t).createDocumentFragment());
    let i = r, o = [];
    return e.forEach((s) => {
      if (o.length || s.marks.length) {
        let l = 0, a = 0;
        for (; l < o.length && a < s.marks.length; ) {
          let c = s.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(o[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < o.length; )
          i = o.pop()[1];
        for (; a < s.marks.length; ) {
          let c = s.marks[a++], f = this.serializeMark(c, s.isInline, t);
          f && (o.push([c, i]), i.appendChild(f.dom), i = f.contentDOM || f.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(s, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: i } = Ri(_s(t), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let o = this.serializeMark(e.marks[i], e.isInline, t);
      o && ((o.contentDOM || o.dom).appendChild(r), r = o.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && Ri(_s(r), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, i) {
    return Ri(e, t, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new nr(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = lf(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return lf(e.marks);
  }
}
function lf(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function _s(n) {
  return n.document || window.document;
}
const af = /* @__PURE__ */ new WeakMap();
function db(n) {
  let e = af.get(n);
  return e === void 0 && af.set(n, e = pb(n)), e;
}
function pb(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            t(r[i]);
      else
        for (let i in r)
          t(r[i]);
  }
  return t(n), e;
}
function Ri(n, e, t, r) {
  if (typeof e == "string")
    return { dom: n.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], o;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (o = db(r)) && o.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let s = i.indexOf(" ");
  s > 0 && (t = i.slice(0, s), i = i.slice(s + 1));
  let l, a = t ? n.createElementNS(t, i) : n.createElement(i), c = e[1], f = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    f = 2;
    for (let u in c)
      if (c[u] != null) {
        let h = u.indexOf(" ");
        h > 0 ? a.setAttributeNS(u.slice(0, h), u.slice(h + 1), c[u]) : a.setAttribute(u, c[u]);
      }
  }
  for (let u = f; u < e.length; u++) {
    let h = e[u];
    if (h === 0) {
      if (u < e.length - 1 || u > f)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else {
      let { dom: d, contentDOM: p } = Ri(n, h, t, r);
      if (a.appendChild(d), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const Xd = 65535, Qd = Math.pow(2, 16);
function gb(n, e) {
  return n + e * Qd;
}
function cf(n) {
  return n & Xd;
}
function mb(n) {
  return (n - (n & Xd)) / Qd;
}
const Zd = 1, ep = 2, _i = 4, tp = 8;
class Bl {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & tp) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Zd | _i)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (ep | _i)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & _i) > 0;
  }
}
class Te {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Te.empty)
      return Te.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = cf(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + mb(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0, o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], f = this.ranges[l + s], u = a + c;
      if (e <= u) {
        let h = c ? e == a ? -1 : e == u ? 1 : t : t, d = a + i + (h < 0 ? 0 : f);
        if (r)
          return d;
        let p = e == (t < 0 ? a : u) ? null : gb(l / 3, e - a), g = e == a ? ep : e == u ? Zd : _i;
        return (t < 0 ? e != a : e != u) && (g |= tp), new Bl(d, g, p);
      }
      i += f - c;
    }
    return r ? e + i : new Bl(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = cf(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], f = a + c;
      if (e <= f && l == i * 3)
        return !0;
      r += this.ranges[l + s] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, o = 0; i < this.ranges.length; i += 3) {
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), a = s + (this.inverted ? 0 : o), c = this.ranges[i + t], f = this.ranges[i + r];
      e(l, l + c, a, a + f), o += f - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Te(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? Te.empty : new Te(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Te.empty = new Te([]);
class $n {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e = [], t, r = 0, i = e.length) {
    this.maps = e, this.mirror = t, this.from = r, this.to = i;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new $n(this.maps, this.mirror, e, t);
  }
  /**
  @internal
  */
  copy() {
    return new $n(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.to = this.maps.push(e), t != null && this.setMirror(this.maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this.maps.length; t < e.maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this.maps.length + e.maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new $n();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this.maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0;
    for (let o = this.from; o < this.to; o++) {
      let s = this.maps[o], l = s.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(o);
        if (a != null && a > o && a < this.to) {
          o = a, e = this.maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new Bl(e, i, null);
  }
}
const Ps = /* @__PURE__ */ Object.create(null);
class we {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Te.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = Ps[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in Ps)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Ps[e] = t, t.prototype.jsonID = e, t;
  }
}
class te {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new te(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new te(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return te.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof Zi)
        return te.fail(o.message);
      throw o;
    }
  }
}
function Ka(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Ka(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return b.fromArray(r);
}
class zt extends we {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new v(Ka(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return te.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Ye(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new zt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof zt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new zt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new zt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
we.jsonID("addMark", zt);
class Ye extends we {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new v(Ka(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return te.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new zt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Ye(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ye && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ye(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Ye(t.from, t.to, e.markFromJSON(t.mark));
  }
}
we.jsonID("removeMark", Ye);
class Ft extends we {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return te.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return te.fromReplace(e, this.pos, this.pos + 1, new v(b.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new Ft(this.pos, t.marks[i]);
        return new Ft(this.pos, this.mark);
      }
    }
    return new Wn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ft(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new Ft(t.pos, e.markFromJSON(t.mark));
  }
}
we.jsonID("addNodeMark", Ft);
class Wn extends we {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return te.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return te.fromReplace(e, this.pos, this.pos + 1, new v(b.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new Ft(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Wn(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new Wn(t.pos, e.markFromJSON(t.mark));
  }
}
we.jsonID("removeNodeMark", Wn);
class ce extends we {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && zl(e, this.from, this.to) ? te.fail("Structure replace would overwrite content") : te.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Te([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new ce(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new ce(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof ce) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? v.empty : new v(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new ce(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? v.empty : new v(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new ce(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new ce(t.from, t.to, v.fromJSON(e, t.slice), !!t.structure);
  }
}
we.jsonID("replace", ce);
class he extends we {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, i, o, s, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = o, this.insert = s, this.structure = l;
  }
  apply(e) {
    if (this.structure && (zl(e, this.from, this.gapFrom) || zl(e, this.gapTo, this.to)))
      return te.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return te.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? te.fromReplace(e, this.from, this.to, r) : te.fail("Content does not fit in gap");
  }
  getMap() {
    return new Te([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new he(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new he(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new he(t.from, t.to, t.gapFrom, t.gapTo, v.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
we.jsonID("replaceAround", he);
function zl(n, e, t) {
  let r = n.resolve(e), i = t - e, o = r.depth;
  for (; i > 0 && o > 0 && r.indexAfter(o) == r.node(o).childCount; )
    o--, i--;
  if (i > 0) {
    let s = r.node(o).maybeChild(r.indexAfter(o));
    for (; i > 0; ) {
      if (!s || s.isLeaf)
        return !0;
      s = s.firstChild, i--;
    }
  }
  return !1;
}
function yb(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, f) => {
    if (!a.isInline)
      return;
    let u = a.marks;
    if (!r.isInSet(u) && f.type.allowsMarkType(r.type)) {
      let h = Math.max(c, e), d = Math.min(c + a.nodeSize, t), p = r.addToSet(u);
      for (let g = 0; g < u.length; g++)
        u[g].isInSet(p) || (s && s.to == h && s.mark.eq(u[g]) ? s.to = d : i.push(s = new Ye(h, d, u[g])));
      l && l.to == h ? l.to = d : o.push(l = new zt(h, d, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function bb(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof hs) {
      let c = s.marks, f;
      for (; f = r.isInSet(c); )
        (a || (a = [])).push(f), c = f.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, t);
      for (let f = 0; f < a.length; f++) {
        let u = a[f], h;
        for (let d = 0; d < i.length; d++) {
          let p = i[d];
          p.step == o - 1 && u.eq(i[d].style) && (h = p);
        }
        h ? (h.to = c, h.step = o) : i.push({ style: u, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => n.step(new Ye(s.from, s.to, s.style)));
}
function np(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), f = l + c.nodeSize, u = r.matchType(c.type);
    if (!u)
      s.push(new ce(l, f, v.empty));
    else {
      r = u;
      for (let h = 0; h < c.marks.length; h++)
        t.allowsMarkType(c.marks[h].type) || n.step(new Ye(l, f, c.marks[h]));
      if (i && c.isText && t.whitespace != "pre") {
        let h, d = /\r?\n|\r/g, p;
        for (; h = d.exec(c.text); )
          p || (p = new v(b.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new ce(l + h.index, l + h.index + h[0].length, p));
      }
    }
    l = f;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(b.empty, !0);
    n.replace(l, l, new v(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function wb(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function oi(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r), o = n.$from.index(r), s = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(o, s, t))
      return r;
    if (r == 0 || i.type.spec.isolating || !wb(i, o, s))
      break;
  }
  return null;
}
function Sb(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, f = b.empty, u = 0;
  for (let p = o, g = !1; p > t; p--)
    g || r.index(p) > 0 ? (g = !0, f = b.from(r.node(p).copy(f)), u++) : a--;
  let h = b.empty, d = 0;
  for (let p = o, g = !1; p > t; p--)
    g || i.after(p + 1) < i.end(p) ? (g = !0, h = b.from(i.node(p).copy(h)), d++) : c++;
  n.step(new he(a, c, s, l, new v(f.append(h), u, d), f.size - u, !0));
}
function rp(n, e, t = null, r = n) {
  let i = vb(n, e), o = i && Cb(r, e);
  return o ? i.map(ff).concat({ type: e, attrs: t }).concat(o.map(ff)) : null;
}
function ff(n) {
  return { type: n, attrs: null };
}
function vb(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Cb(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function xb(n, e, t) {
  let r = b.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = b.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new he(i, o, i, o, new v(r, 0, 0), t.length, !0));
}
function kb(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && Ab(n.doc, n.mapping.slice(o).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let d = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        d && !p ? c = !1 : !d && p && (c = !0);
      }
      c === !1 && Eb(n, s, l, o), np(n, n.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let f = n.mapping.slice(o), u = f.map(l, 1), h = f.map(l + s.nodeSize, 1);
      return n.step(new he(u, h, u + 1, h - 1, new v(b.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && Ob(n, s, l, o), !1;
    }
  });
}
function Ob(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.isText) {
      let s, l = /\r?\n|\r/g;
      for (; s = l.exec(i.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + o + s.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Eb(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Ab(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Tb(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new he(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new v(b.from(s), 0, 0), 1, !0));
}
function ip(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, f = t - 2; c > o; c--, f--) {
    let u = i.node(c), h = i.index(c);
    if (u.type.spec.isolating)
      return !1;
    let d = u.content.cutByIndex(h, u.childCount), p = r && r[f + 1];
    p && (d = d.replaceChild(0, p.type.create(p.attrs)));
    let g = r && r[f] || u;
    if (!u.canReplace(h + 1, u.childCount) || !g.type.validContent(d))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function Mb(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = b.empty, s = b.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = b.from(i.node(l).copy(o));
    let f = r && r[c];
    s = b.from(f ? f.type.create(f.attrs, s) : i.node(l).copy(s));
  }
  n.step(new ce(e, e, new v(o.append(s), t, t), !0));
}
function si(n, e) {
  let t = n.resolve(e), r = t.index();
  return op(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function op(n, e) {
  return !!(n && e && !n.isLeaf && n.canAppend(e));
}
function sp(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && op(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Nb(n, e, t) {
  let r = new ce(e - t, e + t, v.empty, !0);
  n.step(r);
}
function Ib(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.index(i);
      if (r.node(i).canReplaceWith(o, o, t))
        return r.before(i + 1);
      if (o > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.indexAfter(i);
      if (r.node(i).canReplaceWith(o, o, t))
        return r.after(i + 1);
      if (o < r.node(i).childCount)
        return null;
    }
  return null;
}
function lp(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let o = 0; o < t.openStart; o++)
    i = i.firstChild.content;
  for (let o = 1; o <= (t.openStart == 0 && t.size ? 2 : 1); o++)
    for (let s = r.depth; s >= 0; s--) {
      let l = s == r.depth ? 0 : r.pos <= (r.start(s + 1) + r.end(s + 1)) / 2 ? -1 : 1, a = r.index(s) + (l > 0 ? 1 : 0), c = r.node(s), f = !1;
      if (o == 1)
        f = c.canReplace(a, a, i);
      else {
        let u = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        f = u && c.canReplaceWith(a, a, u[0]);
      }
      if (f)
        return l == 0 ? r.pos : l < 0 ? r.before(s + 1) : r.after(s + 1);
    }
  return null;
}
function ds(n, e, t = e, r = v.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return ap(i, o, r) ? new ce(e, t, r) : new Db(i, o, r).fit();
}
function ap(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Db {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = b.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = b.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = r.depth, l = i.depth;
    for (; s && l && o.childCount == 1; )
      o = o.firstChild.content, s--, l--;
    let a = new v(o, s, l);
    return e > -1 ? new he(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new ce(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let o = t.firstChild;
      if (t.childCount > 1 && (i = 0), o.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = o.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, o = null;
        r ? (o = $s(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], f, u = null;
          if (t == 1 && (s ? c.matchType(s.type) || (u = c.fillBefore(b.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: u };
          if (t == 2 && s && (f = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: f };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = $s(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new v(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = $s(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new v(Sr(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new v(Sr(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: o }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (o)
      for (let g = 0; g < o.length; g++)
        this.openFrontierNode(o[g]);
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, c = 0, f = [], { match: u, type: h } = this.frontier[t];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        f.push(i.child(g));
      u = u.matchFragment(i);
    }
    let d = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let g = l.child(c), m = u.matchType(g.type);
      if (!m)
        break;
      c++, (c > 1 || a == 0 || g.content.size) && (u = m, f.push(cp(g.mark(h.allowedMarks(g.marks)), c == 1 ? a : 0, c == l.childCount ? d : -1)));
    }
    let p = c == l.childCount;
    p || (d = -1), this.placed = vr(this.placed, t, b.from(f)), this.frontier[t].match = u, p && d < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, m = l; g < d; g++) {
      let y = m.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), m = y.content;
    }
    this.unplaced = p ? e == 0 ? v.empty : new v(Sr(s.content, e - 1, 1), e - 1, d < 0 ? s.openEnd : e - 1) : new v(Sr(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Ls(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = Ls(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], f = Ls(e, l, c, a, !0);
          if (!f || f.childCount)
            continue e;
        }
        return { depth: t, fit: s, move: o ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = vr(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = vr(this.placed, this.depth, b.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(b.empty, !0);
    t.childCount && (this.placed = vr(this.placed, this.frontier.length, t));
  }
}
function Sr(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Sr(n.firstChild.content, e - 1, t)));
}
function vr(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(vr(n.lastChild.content, e - 1, t)));
}
function $s(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function cp(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, cp(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(b.empty, !0)))), n.copy(r);
}
function Ls(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !Rb(t, o.content, s) ? l : null;
}
function Rb(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function _b(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Pb(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (ap(i, o, r))
    return n.step(new ce(e, t, r));
  let s = up(i, n.doc.resolve(t));
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let h = i.depth, d = i.pos - 1; h > 0; h--, d--) {
    let p = i.node(h).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    s.indexOf(h) > -1 ? l = h : i.before(h) == d && s.splice(1, 0, -h);
  }
  let a = s.indexOf(l), c = [], f = r.openStart;
  for (let h = r.content, d = 0; ; d++) {
    let p = h.firstChild;
    if (c.push(p), d == r.openStart)
      break;
    h = p.content;
  }
  for (let h = f - 1; h >= 0; h--) {
    let d = c[h], p = _b(d.type);
    if (p && !d.sameMarkup(i.node(Math.abs(l) - 1)))
      f = h;
    else if (p || !d.type.isTextblock)
      break;
  }
  for (let h = r.openStart; h >= 0; h--) {
    let d = (h + f + 1) % (r.openStart + 1), p = c[d];
    if (p)
      for (let g = 0; g < s.length; g++) {
        let m = s[(g + a) % s.length], y = !0;
        m < 0 && (y = !1, m = -m);
        let x = i.node(m - 1), O = i.index(m - 1);
        if (x.canReplaceWith(O, O, p.type, p.marks))
          return n.replace(i.before(m), y ? o.after(m) : t, new v(fp(r.content, 0, r.openStart, d), d, r.openEnd));
      }
  }
  let u = n.steps.length;
  for (let h = s.length - 1; h >= 0 && (n.replace(e, t, r), !(n.steps.length > u)); h--) {
    let d = s[h];
    d < 0 || (e = i.before(d), t = o.after(d));
  }
}
function fp(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(fp(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(b.empty, !0));
  }
  return n;
}
function $b(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Ib(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new v(b.from(r), 0, 0));
}
function Lb(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t), o = up(r, i);
  for (let s = 0; s < o.length; s++) {
    let l = o[s], a = s == o.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let s = 1; s <= r.depth && s <= i.depth; s++)
    if (e - r.start(s) == r.depth - s && t > r.end(s) && i.end(s) - t != i.depth - s)
      return n.delete(r.before(s), t);
  n.delete(e, t);
}
function up(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Ln extends we {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return te.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return te.fromReplace(e, this.pos, this.pos + 1, new v(b.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Te.empty;
  }
  invert(e) {
    return new Ln(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ln(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Ln(t.pos, t.attr, t.value);
  }
}
we.jsonID("attr", Ln);
class Br extends we {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return te.ok(r);
  }
  getMap() {
    return Te.empty;
  }
  invert(e) {
    return new Br(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Br(t.attr, t.value);
  }
}
we.jsonID("docAttr", Br);
let Un = class extends Error {
};
Un = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Un.prototype = Object.create(Error.prototype);
Un.prototype.constructor = Un;
Un.prototype.name = "TransformError";
class hp {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new $n();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new Un(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = v.empty) {
    let i = ds(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new v(b.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, v.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return Pb(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return $b(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Lb(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Sb(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Nb(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return xb(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return kb(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Tb(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Ln(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Br(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new Ft(e, t)), this;
  }
  /**
  Remove a mark (or a mark of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    if (!(t instanceof F)) {
      let r = this.doc.nodeAt(e);
      if (!r)
        throw new RangeError("No node at position " + e);
      if (t = t.isInSet(r.marks), !t)
        return this;
    }
    return this.step(new Wn(e, t)), this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split.
  */
  split(e, t = 1, r) {
    return Mb(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return yb(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return bb(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return np(this, e, t, r), this;
  }
}
const Bs = /* @__PURE__ */ Object.create(null);
class I {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new dp(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = v.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], f = e.mapping.slice(o);
      e.replaceRange(f.map(a.pos), f.map(c.pos), l ? v.empty : t), l == 0 && df(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], a = e.mapping.slice(r), c = a.map(s.pos), f = a.map(l.pos);
      o ? e.deleteRange(c, f) : (e.replaceRangeWith(c, f, t), df(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new L(e) : Nn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Nn(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Nn(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
      if (s)
        return s;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Fe(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Nn(e, e, 0, 0, 1) || new Fe(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Nn(e, e, e.content.size, e.childCount, -1) || new Fe(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Bs[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in Bs)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Bs[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return L.between(this.$anchor, this.$head).getBookmark();
  }
}
I.prototype.visible = !0;
class dp {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let uf = !1;
function hf(n) {
  !uf && !n.parent.inlineContent && (uf = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class L extends I {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    hf(e), hf(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return I.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new L(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = v.empty) {
    if (super.replace(e, t), t == v.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof L && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new ps(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new L(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let o = I.findFrom(t, r, !0) || I.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return I.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (I.findFrom(e, -r, !0) || I.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new L(e, t);
  }
}
I.jsonID("text", L);
class ps {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new ps(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return L.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class M extends I {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), o = e.resolve(i);
    return r ? I.near(o) : new M(o);
  }
  content() {
    return new v(b.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof M && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Ga(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new M(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new M(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
M.prototype.visible = !1;
I.jsonID("node", M);
class Ga {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new ps(r, r) : new Ga(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && M.isSelectable(r) ? new M(t) : I.near(t);
  }
}
class Fe extends I {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = v.empty) {
    if (t == v.empty) {
      e.delete(0, e.doc.content.size);
      let r = I.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new Fe(e);
  }
  map(e) {
    return new Fe(e);
  }
  eq(e) {
    return e instanceof Fe;
  }
  getBookmark() {
    return Bb;
  }
}
I.jsonID("all", Fe);
const Bb = {
  map() {
    return this;
  },
  resolve(n) {
    return new Fe(n);
  }
};
function Nn(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return L.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && M.isSelectable(l))
        return M.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = Nn(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function df(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof ce || i instanceof he))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, f) => {
    s == null && (s = f);
  }), n.setSelection(I.near(n.doc.resolve(s), t));
}
const pf = 1, gi = 2, gf = 4;
let zb = class extends hp {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | pf) & ~gi, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & pf) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= gi, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return F.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & gi) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~gi, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || F.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r ?? t, !e)
        return this.deleteRange(t, r);
      let o = this.storedMarks;
      if (!o) {
        let s = this.doc.resolve(t);
        o = r == t ? s.marks() : s.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, i.text(e, o)), this.selection.empty || this.setSelection(I.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= gf, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & gf) > 0;
  }
};
function mf(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Cr {
  constructor(e, t, r) {
    this.name = e, this.init = mf(t.init, r), this.apply = mf(t.apply, r);
  }
}
const Fb = [
  new Cr("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new Cr("selection", {
    init(n, e) {
      return n.selection || I.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new Cr("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new Cr("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class zs {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = Fb.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new Cr(r.key, r.spec.state, r));
    });
  }
}
class xr {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let o = !1;
      for (let s = 0; s < this.config.plugins.length; s++) {
        let l = this.config.plugins[s];
        if (l.spec.appendTransaction) {
          let a = i ? i[s].n : 0, c = i ? i[s].state : this, f = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (f && r.filterTransaction(f, s)) {
            if (f.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let u = 0; u < this.config.plugins.length; u++)
                i.push(u < s ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(f), r = r.applyInner(f), o = !0;
          }
          i && (i[s] = { state: r, n: t.length });
        }
      }
      if (!o)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new xr(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let o = r[i];
      t[o.name] = o.apply(e, this[o.name], this, t);
    }
    return t;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new zb(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new zs(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new xr(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new zs(this.schema, e.plugins), r = t.fields, i = new xr(t);
    for (let o = 0; o < r.length; o++) {
      let s = r[o].name;
      i[s] = this.hasOwnProperty(s) ? this[s] : r[o].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], o = i.spec.state;
        o && o.toJSON && (t[r] = o.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new zs(e.schema, e.plugins), o = new xr(i);
    return i.fields.forEach((s) => {
      if (s.name == "doc")
        o.doc = Xe.fromJSON(e.schema, t.doc);
      else if (s.name == "selection")
        o.selection = I.fromJSON(o.doc, t.selection);
      else if (s.name == "storedMarks")
        t.storedMarks && (o.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == s.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
              o[s.name] = c.fromJSON.call(a, e, t[l], o);
              return;
            }
          }
        o[s.name] = s.init(e, o);
      }
    }), o;
  }
}
function pp(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = pp(i, e, {})), t[r] = i;
  }
  return t;
}
class rr {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && pp(e.props, this, this.props), this.key = e.key ? e.key.key : gp("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Fs = /* @__PURE__ */ Object.create(null);
function gp(n) {
  return n in Fs ? n + "$" + ++Fs[n] : (Fs[n] = 0, n + "$");
}
class Xt {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = gp(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const fe = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, zr = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Fl = null;
const gt = function(n, e, t) {
  let r = Fl || (Fl = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, jb = function() {
  Fl = null;
}, mn = function(n, e, t, r) {
  return t && (yf(n, e, t, r, -1) || yf(n, e, t, r, 1));
}, Vb = /^(img|br|input|textarea|hr)$/i;
function yf(n, e, t, r, i) {
  for (; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : Re(n))) {
      let o = n.parentNode;
      if (!o || o.nodeType != 1 || li(n) || Vb.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = fe(n) + (i < 0 ? 0 : 1), n = o;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (i < 0 ? -1 : 0)], n.contentEditable == "false")
        return !1;
      e = i < 0 ? Re(n) : 0;
    } else
      return !1;
  }
}
function Re(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Wb(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = Re(n);
    } else if (n.parentNode && !li(n))
      e = fe(n), n = n.parentNode;
    else
      return null;
  }
}
function Ub(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !li(n))
      e = fe(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function Hb(n, e, t) {
  for (let r = e == 0, i = e == Re(n); r || i; ) {
    if (n == t)
      return !0;
    let o = fe(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && o == 0, i = i && o == Re(n);
  }
}
function li(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const gs = function(n) {
  return n.focusNode && mn(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function rn(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function Jb(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Kb(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: Math.min(Re(r.offsetNode), r.offset) };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: Math.min(Re(r.startContainer), r.startOffset) };
  }
}
const et = typeof navigator < "u" ? navigator : null, bf = typeof document < "u" ? document : null, Qt = et && et.userAgent || "", jl = /Edge\/(\d+)/.exec(Qt), mp = /MSIE \d/.exec(Qt), Vl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Qt), Ee = !!(mp || Vl || jl), Ut = mp ? document.documentMode : Vl ? +Vl[1] : jl ? +jl[1] : 0, Ve = !Ee && /gecko\/(\d+)/i.test(Qt);
Ve && +(/Firefox\/(\d+)/.exec(Qt) || [0, 0])[1];
const Wl = !Ee && /Chrome\/(\d+)/.exec(Qt), ge = !!Wl, yp = Wl ? +Wl[1] : 0, Se = !Ee && !!et && /Apple Computer/.test(et.vendor), Hn = Se && (/Mobile\/\w+/.test(Qt) || !!et && et.maxTouchPoints > 2), De = Hn || (et ? /Mac/.test(et.platform) : !1), Gb = et ? /Win/.test(et.platform) : !1, Be = /Android \d/.test(Qt), ai = !!bf && "webkitFontSmoothing" in bf.documentElement.style, qb = ai ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Yb(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function ct(n, e) {
  return typeof n == "number" ? n : n[e];
}
function Xb(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function wf(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, o = n.dom.ownerDocument;
  for (let s = t || n.dom; s; s = zr(s)) {
    if (s.nodeType != 1)
      continue;
    let l = s, a = l == o.body, c = a ? Yb(o) : Xb(l), f = 0, u = 0;
    if (e.top < c.top + ct(r, "top") ? u = -(c.top - e.top + ct(i, "top")) : e.bottom > c.bottom - ct(r, "bottom") && (u = e.bottom - e.top > c.bottom - c.top ? e.top + ct(i, "top") - c.top : e.bottom - c.bottom + ct(i, "bottom")), e.left < c.left + ct(r, "left") ? f = -(c.left - e.left + ct(i, "left")) : e.right > c.right - ct(r, "right") && (f = e.right - c.right + ct(i, "right")), f || u)
      if (a)
        o.defaultView.scrollBy(f, u);
      else {
        let h = l.scrollLeft, d = l.scrollTop;
        u && (l.scrollTop += u), f && (l.scrollLeft += f);
        let p = l.scrollLeft - h, g = l.scrollTop - d;
        e = { left: e.left - p, top: e.top - g, right: e.right - p, bottom: e.bottom - g };
      }
    if (a || /^(fixed|sticky)$/.test(getComputedStyle(s).position))
      break;
  }
}
function Qb(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, i;
  for (let o = (e.left + e.right) / 2, s = t + 1; s < Math.min(innerHeight, e.bottom); s += 5) {
    let l = n.root.elementFromPoint(o, s);
    if (!l || l == n.dom || !n.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: bp(n.dom) };
}
function bp(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = zr(r))
    ;
  return e;
}
function Zb({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  wp(t, r == 0 ? 0 : r - e);
}
function wp(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: o } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != o && (r.scrollLeft = o);
  }
}
let On = null;
function e0(n) {
  if (n.setActive)
    return n.setActive();
  if (On)
    return n.focus(On);
  let e = bp(n);
  n.focus(On == null ? {
    get preventScroll() {
      return On = { preventScroll: !0 }, !0;
    }
  } : void 0), On || (On = !1, wp(e, 0));
}
function Sp(n, e) {
  let t, r = 2e8, i, o = 0, s = e.top, l = e.top, a, c;
  for (let f = n.firstChild, u = 0; f; f = f.nextSibling, u++) {
    let h;
    if (f.nodeType == 1)
      h = f.getClientRects();
    else if (f.nodeType == 3)
      h = gt(f).getClientRects();
    else
      continue;
    for (let d = 0; d < h.length; d++) {
      let p = h[d];
      if (p.top <= s && p.bottom >= l) {
        s = Math.max(p.bottom, s), l = Math.min(p.top, l);
        let g = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (g < r) {
          t = f, r = g, i = g && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, f.nodeType == 1 && g && (o = u + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = f, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (o = u + 1);
    }
  }
  return !t && a && (t = a, i = c, r = 0), t && t.nodeType == 3 ? t0(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: o } : Sp(t, i);
}
function t0(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let o = Mt(r, 1);
    if (o.top != o.bottom && qa(e, o))
      return { node: n, offset: i + (e.left >= (o.left + o.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function qa(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function n0(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function r0(n, e, t) {
  let { node: r, offset: i } = Sp(e, t), o = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let s = r.getBoundingClientRect();
    o = s.left != s.right && t.left > (s.left + s.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, o);
}
function i0(n, e, t, r) {
  let i = -1;
  for (let o = e, s = !1; o != n.dom; ) {
    let l = n.docView.nearestDesc(o, !0);
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM)) {
      let a = l.dom.getBoundingClientRect();
      if (l.node.isBlock && l.parent && (!s && a.left > r.left || a.top > r.top ? i = l.posBefore : (!s && a.right < r.left || a.bottom < r.top) && (i = l.posAfter), s = !0), !l.contentDOM && i < 0 && !l.node.isText)
        return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    }
    o = l.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function vp(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), o = i; ; ) {
      let s = n.childNodes[o];
      if (s.nodeType == 1) {
        let l = s.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (qa(e, c))
            return vp(s, e, c);
        }
      }
      if ((o = (o + 1) % r) == i)
        break;
    }
  return n;
}
function o0(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, o = Kb(t, e.left, e.top);
  o && ({ node: r, offset: i } = o);
  let s = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!s || !n.dom.contains(s.nodeType != 1 ? s.parentNode : s)) {
    let c = n.dom.getBoundingClientRect();
    if (!qa(e, c) || (s = vp(n.dom, e, c), !s))
      return null;
  }
  if (Se)
    for (let c = s; r && c; c = zr(c))
      c.draggable && (r = void 0);
  if (s = n0(s, e), r) {
    if (Ve && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let f = r.childNodes[i], u;
      f.nodeName == "IMG" && (u = f.getBoundingClientRect()).right <= e.left && u.bottom > e.top && i++;
    }
    let c;
    ai && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = i0(n, r, i, e));
  }
  l == null && (l = r0(n, s, e));
  let a = n.docView.nearestDesc(s, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function Sf(n) {
  return n.top < n.bottom || n.left < n.right;
}
function Mt(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (Sf(r))
      return r;
  }
  return Array.prototype.find.call(t, Sf) || n.getBoundingClientRect();
}
const s0 = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Cp(n, e, t) {
  let { node: r, offset: i, atom: o } = n.docView.domFromPos(e, t < 0 ? -1 : 1), s = ai || Ve;
  if (r.nodeType == 3)
    if (s && (s0.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = Mt(gt(r, i, i), t);
      if (Ve && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = Mt(gt(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let f = Mt(gt(r, i, i + 1), -1);
          if (f.top != a.top)
            return dr(f, f.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, f = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, f = -1) : t >= 0 && i == r.nodeValue.length ? (a--, f = 1) : t < 0 ? a-- : c++, dr(Mt(gt(r, a, c), f), f < 0);
    }
  if (!n.state.doc.resolve(e - (o || 0)).parent.inlineContent) {
    if (o == null && i && (t < 0 || i == Re(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return js(a.getBoundingClientRect(), !1);
    }
    if (o == null && i < Re(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return js(a.getBoundingClientRect(), !0);
    }
    return js(r.getBoundingClientRect(), t >= 0);
  }
  if (o == null && i && (t < 0 || i == Re(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? gt(a, Re(a) - (s ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return dr(Mt(c, 1), !1);
  }
  if (o == null && i < Re(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? gt(a, 0, s ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return dr(Mt(c, -1), !0);
  }
  return dr(Mt(r.nodeType == 3 ? gt(r) : r, -t), t >= 0);
}
function dr(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function js(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function xp(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function l0(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return xp(n, e, () => {
    let { node: o } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let l = n.docView.nearestDesc(o, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        o = l.contentDOM || l.dom;
        break;
      }
      o = l.dom.parentNode;
    }
    let s = Cp(n, i.pos, 1);
    for (let l = o.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = gt(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let f = a[c];
        if (f.bottom > f.top + 1 && (t == "up" ? s.top - f.top > (f.bottom - s.top) * 2 : f.bottom - s.bottom > (s.bottom - f.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const a0 = /[\u0590-\u08ac]/;
function c0(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, o = !i, s = i == r.parent.content.size, l = n.domSelection();
  return l ? !a0.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? o : s : xp(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: f, anchorOffset: u } = n.domSelectionRange(), h = l.caretBidiLevel;
    l.modify("move", t, "character");
    let d = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: p, focusOffset: g } = n.domSelectionRange(), m = p && !d.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == g;
    try {
      l.collapse(f, u), a && (a != f || c != u) && l.extend && l.extend(a, c);
    } catch {
    }
    return h != null && (l.caretBidiLevel = h), m;
  }) : r.pos == r.start() || r.pos == r.end();
}
let vf = null, Cf = null, xf = !1;
function f0(n, e, t) {
  return vf == e && Cf == t ? xf : (vf = e, Cf = t, xf = t == "up" || t == "down" ? l0(n, e, t) : c0(n, e, t));
}
const Pe = 0, kf = 1, on = 2, tt = 3;
class ci {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = Pe, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let o, s;
        if (e == this.contentDOM)
          o = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          o = e.previousSibling;
        }
        for (; o && !((s = o.pmViewDesc) && s.parent == this); )
          o = o.previousSibling;
        return o ? this.posBeforeChild(s) + s.size : this.posAtStart;
      } else {
        let o, s;
        if (e == this.contentDOM)
          o = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          o = e.nextSibling;
        }
        for (; o && !((s = o.pmViewDesc) && s.parent == this); )
          o = o.nextSibling;
        return o ? this.posBeforeChild(s) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = t > fe(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let o = e; ; o = o.parentNode) {
          if (o == this.dom) {
            i = !1;
            break;
          }
          if (o.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
        for (let o = e; ; o = o.parentNode) {
          if (o == this.dom) {
            i = !0;
            break;
          }
          if (o.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let o = this.getDesc(i), s;
      if (o && (!t || o.node))
        if (r && (s = o.nodeDOM) && !(s.nodeType == 1 ? s.contains(e.nodeType == 1 ? e : e.parentNode) : s == e))
          r = !1;
        else
          return o;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let o = this.getDesc(i);
      if (o)
        return o.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t], o = r + i.size;
      if (r == e && o != r) {
        for (; !i.border && i.children.length; )
          i = i.children[0];
        return i;
      }
      if (e < o)
        return i.descAt(e - r - i.border);
      r = o;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let o = 0; r < this.children.length; r++) {
      let s = this.children[r], l = o + s.size;
      if (l > e || s instanceof Op) {
        i = e - o;
        break;
      }
      o = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let o; r && !(o = this.children[r - 1]).size && o instanceof kp && o.side >= 0; r--)
      ;
    if (t <= 0) {
      let o, s = !0;
      for (; o = r ? this.children[r - 1] : null, !(!o || o.dom.parentNode == this.contentDOM); r--, s = !1)
        ;
      return o && t && s && !o.border && !o.domAtom ? o.domFromPos(o.size, t) : { node: this.contentDOM, offset: o ? fe(o.dom) + 1 : 0 };
    } else {
      let o, s = !0;
      for (; o = r < this.children.length ? this.children[r] : null, !(!o || o.dom.parentNode == this.contentDOM); r++, s = !1)
        ;
      return o && s && !o.border && !o.domAtom ? o.domFromPos(0, t) : { node: this.contentDOM, offset: o ? fe(o.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, o = -1;
    for (let s = r, l = 0; ; l++) {
      let a = this.children[l], c = s + a.size;
      if (i == -1 && e <= c) {
        let f = s + a.border;
        if (e >= f && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, t, f);
        e = s;
        for (let u = l; u > 0; u--) {
          let h = this.children[u - 1];
          if (h.size && h.dom.parentNode == this.contentDOM && !h.emptyChildAt(1)) {
            i = fe(h.dom) + 1;
            break;
          }
          e -= h.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let f = l + 1; f < this.children.length; f++) {
          let u = this.children[f];
          if (u.size && u.dom.parentNode == this.contentDOM && !u.emptyChildAt(-1)) {
            o = fe(u.dom);
            break;
          }
          t += u.size;
        }
        o == -1 && (o = this.contentDOM.childNodes.length);
        break;
      }
      s = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: o };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, i = !1) {
    let o = Math.min(e, t), s = Math.max(e, t);
    for (let h = 0, d = 0; h < this.children.length; h++) {
      let p = this.children[h], g = d + p.size;
      if (o > d && s < g)
        return p.setSelection(e - d - p.border, t - d - p.border, r, i);
      d = g;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.getSelection(), f = !1;
    if ((Ve || Se) && e == t) {
      let { node: h, offset: d } = l;
      if (h.nodeType == 3) {
        if (f = !!(d && h.nodeValue[d - 1] == `
`), f && d == h.nodeValue.length)
          for (let p = h, g; p; p = p.parentNode) {
            if (g = p.nextSibling) {
              g.nodeName == "BR" && (l = a = { node: g.parentNode, offset: fe(g) + 1 });
              break;
            }
            let m = p.pmViewDesc;
            if (m && m.node && m.node.isBlock)
              break;
          }
      } else {
        let p = h.childNodes[d - 1];
        f = p && (p.nodeName == "BR" || p.contentEditable == "false");
      }
    }
    if (Ve && c.focusNode && c.focusNode != a.node && c.focusNode.nodeType == 1) {
      let h = c.focusNode.childNodes[c.focusOffset];
      h && h.contentEditable == "false" && (i = !0);
    }
    if (!(i || f && Se) && mn(l.node, l.offset, c.anchorNode, c.anchorOffset) && mn(a.node, a.offset, c.focusNode, c.focusOffset))
      return;
    let u = !1;
    if ((c.extend || e == t) && !f) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), u = !0;
      } catch {
      }
    }
    if (!u) {
      if (e > t) {
        let d = l;
        l = a, a = d;
      }
      let h = document.createRange();
      h.setEnd(a.node, a.offset), h.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(h);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let o = this.children[i], s = r + o.size;
      if (r == s ? e <= s && t >= r : e < s && t > r) {
        let l = r + o.border, a = s - o.border;
        if (e >= l && t <= a) {
          this.dirty = e == r || t == s ? on : kf, e == l && t == a && (o.contentLost || o.dom.parentNode != this.contentDOM) ? o.dirty = tt : o.markDirty(e - l, t - l);
          return;
        } else
          o.dirty = o.dom == o.contentDOM && o.dom.parentNode == this.contentDOM && !o.children.length ? on : tt;
      }
      r = s;
    }
    this.dirty = on;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? on : kf;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class kp extends ci {
  constructor(e, t, r, i) {
    let o, s = t.type.toDOM;
    if (typeof s == "function" && (s = s(r, () => {
      if (!o)
        return i;
      if (o.parent)
        return o.parent.posBeforeChild(o);
    })), !t.type.spec.raw) {
      if (s.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(s), s = l;
      }
      s.contentEditable = "false", s.classList.add("ProseMirror-widget");
    }
    super(e, [], s, null), this.widget = t, this.widget = t, o = this;
  }
  matchesWidget(e) {
    return this.dirty == Pe && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class u0 extends ci {
  constructor(e, t, r, i) {
    super(e, [], t, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class yn extends ci {
  constructor(e, t, r, i) {
    super(e, [], r, i), this.mark = t;
  }
  static create(e, t, r, i) {
    let o = i.nodeViews[t.type.name], s = o && o(t, i, r);
    return (!s || !s.dom) && (s = nr.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)), new yn(e, t, s.dom, s.contentDOM || s.dom);
  }
  parseRule() {
    return this.dirty & tt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != tt && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != Pe) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Pe;
    }
  }
  slice(e, t, r) {
    let i = yn.create(this.parent, this.mark, !0, r), o = this.children, s = this.size;
    t < s && (o = Hl(o, t, s, r)), e > 0 && (o = Hl(o, 0, e, r));
    for (let l = 0; l < o.length; l++)
      o[l].parent = i;
    return i.children = o, i;
  }
}
class Ht extends ci {
  constructor(e, t, r, i, o, s, l, a, c) {
    super(e, [], o, s), this.node = t, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, r, i, o, s) {
    let l = o.nodeViews[t.type.name], a, c = l && l(t, o, () => {
      if (!a)
        return s;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), f = c && c.dom, u = c && c.contentDOM;
    if (t.isText) {
      if (!f)
        f = document.createTextNode(t.text);
      else if (f.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else f || ({ dom: f, contentDOM: u } = nr.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !u && !t.isText && f.nodeName != "BR" && (f.hasAttribute("contenteditable") || (f.contentEditable = "false"), t.type.spec.draggable && (f.draggable = !0));
    let h = f;
    return f = Tp(f, r, t), c ? a = new h0(e, t, r, i, f, u || null, h, c, o, s + 1) : t.isText ? new ms(e, t, r, i, f, h, o) : new Ht(e, t, r, i, f, u || null, h, o, s + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => b.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == Pe && e.eq(this.node) && oo(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let r = this.node.inlineContent, i = t, o = e.composing ? this.localCompositionInfo(e, t) : null, s = o && o.pos > -1 ? o : null, l = o && o.pos < 0, a = new p0(this, s && s.node, e);
    y0(this.node, this.innerDeco, (c, f, u) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !u && a.syncToMarks(f == this.node.childCount ? F.none : this.node.child(f).marks, r, e), a.placeWidget(c, e, i);
    }, (c, f, u, h) => {
      a.syncToMarks(c.marks, r, e);
      let d;
      a.findNodeMatch(c, f, u, h) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (d = a.findIndexWithChild(o.node)) > -1 && a.updateNodeAt(c, f, u, d, e) || a.updateNextNode(c, f, u, e, h, i) || a.addNode(c, f, u, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == on) && (s && this.protectLocalComposition(e, s), Ep(this.contentDOM, this.children, e), Hn && b0(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof L) || r < t || i > t + this.node.content.size)
      return null;
    let o = e.input.compositionNode;
    if (!o || !this.dom.contains(o.parentNode))
      return null;
    if (this.node.inlineContent) {
      let s = o.nodeValue, l = w0(this.node.content, s, r - t, i - t);
      return l < 0 ? null : { node: o, pos: l, text: s };
    } else
      return { node: o, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t))
      return;
    let o = t;
    for (; o.parentNode != this.contentDOM; o = o.parentNode) {
      for (; o.previousSibling; )
        o.parentNode.removeChild(o.previousSibling);
      for (; o.nextSibling; )
        o.parentNode.removeChild(o.nextSibling);
      o.pmViewDesc && (o.pmViewDesc = void 0);
    }
    let s = new u0(this, o, t, i);
    e.input.compositionNodes.push(s), this.children = Hl(this.children, r, r + i.length, e, s);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, i) {
    return this.dirty == tt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = Pe;
  }
  updateOuterDeco(e) {
    if (oo(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = Ap(this.dom, this.nodeDOM, Ul(this.outerDeco, this.node, t), Ul(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Of(n, e, t, r, i) {
  Tp(r, e, n);
  let o = new Ht(void 0, n, e, t, r, r, r, i, 0);
  return o.contentDOM && o.updateChildren(i, 0), o;
}
class ms extends Ht {
  constructor(e, t, r, i, o, s, l) {
    super(e, t, r, i, o, null, s, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == tt || this.dirty != Pe && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Pe || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = Pe, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t), o = document.createTextNode(i.text);
    return new ms(this.parent, i, this.outerDeco, this.innerDeco, o, o, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = tt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Op extends ci {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Pe && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class h0 extends Ht {
  constructor(e, t, r, i, o, s, l, a, c, f) {
    super(e, t, r, i, o, s, l, c, f), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, i) {
    if (this.dirty == tt)
      return !1;
    if (this.spec.update) {
      let o = this.spec.update(e, t, r);
      return o && this.updateInner(e, t, r, i), o;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r) : super.setSelection(e, t, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function Ep(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let o = 0; o < e.length; o++) {
    let s = e[o], l = s.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = Ef(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(l, r);
    if (s instanceof yn) {
      let a = r ? r.previousSibling : n.lastChild;
      Ep(s.contentDOM, s.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = Ef(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const Er = function(n) {
  n && (this.nodeName = n);
};
Er.prototype = /* @__PURE__ */ Object.create(null);
const sn = [new Er()];
function Ul(n, e, t) {
  if (n.length == 0)
    return sn;
  let r = t ? sn[0] : new Er(), i = [r];
  for (let o = 0; o < n.length; o++) {
    let s = n[o].type.attrs;
    if (s) {
      s.nodeName && i.push(r = new Er(s.nodeName));
      for (let l in s) {
        let a = s[l];
        a != null && (t && i.length == 1 && i.push(r = new Er(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function Ap(n, e, t, r) {
  if (t == sn && r == sn)
    return e;
  let i = e;
  for (let o = 0; o < r.length; o++) {
    let s = r[o], l = t[o];
    if (o) {
      let a;
      l && l.nodeName == s.nodeName && i != n && (a = i.parentNode) && a.nodeName.toLowerCase() == s.nodeName || (a = document.createElement(s.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = sn[0]), i = a;
    }
    d0(i, l || sn[0], s);
  }
  return i;
}
function d0(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let o = 0; o < r.length; o++)
      i.indexOf(r[o]) == -1 && n.classList.remove(r[o]);
    for (let o = 0; o < i.length; o++)
      r.indexOf(i[o]) == -1 && n.classList.add(i[o]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function Tp(n, e, t) {
  return Ap(n, n, sn, Ul(e, t, n.nodeType != 1));
}
function oo(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Ef(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class p0 {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = g0(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let i = 0, o = this.stack.length >> 1, s = Math.min(o, e.length);
    for (; i < s && (i == o - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < o; )
      this.destroyRest(), this.top.dirty = Pe, this.index = this.stack.pop(), this.top = this.stack.pop(), o--;
    for (; o < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[o]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = yn.create(this.top, e[o], t, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, o++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, i) {
    let o = -1, s;
    if (i >= this.preMatch.index && (s = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && s.matchesNode(e, t, r))
      o = this.top.children.indexOf(s, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          o = l;
          break;
        }
      }
    return o < 0 ? !1 : (this.destroyBetween(this.index, o), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, o) {
    let s = this.top.children[i];
    return s.dirty == tt && s.dom == s.contentDOM && (s.dirty = on), s.update(e, t, r, o) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, i, o, s) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof Ht) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != o)
          return !1;
        let f = a.dom, u, h = this.isLocked(f) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != tt && oo(t, a.outerDeco));
        if (!h && a.update(e, t, r, i))
          return this.destroyBetween(this.index, l), a.dom != f && (this.changed = !0), this.index++, !0;
        if (!h && (u = this.recreateWrapper(a, e, t, r, i, s)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = u, u.contentDOM && (u.dirty = on, u.updateChildren(i, s + 1), u.dirty = Pe), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, i, o, s) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !oo(r, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let l = Ht.create(this.top, t, r, i, o, s);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, i, o) {
    let s = Ht.create(this.top, e, t, r, i, o);
    s.contentDOM && s.updateChildren(i, o + 1), this.top.children.splice(this.index++, 0, s), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let o = new kp(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, o), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof yn; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof ms) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((Se || ge) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new Op(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function g0(n, e) {
  let t = e, r = t.children.length, i = n.childCount, o = /* @__PURE__ */ new Map(), s = [];
  e: for (; i > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof yn)
          t = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (t == e)
          break e;
        r = t.parent.children.indexOf(t), t = t.parent;
      }
    let a = l.node;
    if (a) {
      if (a != n.child(i - 1))
        break;
      --i, o.set(l, i), s.push(l);
    }
  }
  return { index: i, matched: o, matches: s.reverse() };
}
function m0(n, e) {
  return n.type.side - e.type.side;
}
function y0(n, e, t, r) {
  let i = e.locals(n), o = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let f = n.child(c);
      r(f, i, e.forChild(o, f), c), o += f.nodeSize;
    }
    return;
  }
  let s = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let f, u;
    for (; s < i.length && i[s].to == o; ) {
      let m = i[s++];
      m.widget && (f ? (u || (u = [f])).push(m) : f = m);
    }
    if (f)
      if (u) {
        u.sort(m0);
        for (let m = 0; m < u.length; m++)
          t(u[m], c, !!a);
      } else
        t(f, c, !!a);
    let h, d;
    if (a)
      d = -1, h = a, a = null;
    else if (c < n.childCount)
      d = c, h = n.child(c++);
    else
      break;
    for (let m = 0; m < l.length; m++)
      l[m].to <= o && l.splice(m--, 1);
    for (; s < i.length && i[s].from <= o && i[s].to > o; )
      l.push(i[s++]);
    let p = o + h.nodeSize;
    if (h.isText) {
      let m = p;
      s < i.length && i[s].from < m && (m = i[s].from);
      for (let y = 0; y < l.length; y++)
        l[y].to < m && (m = l[y].to);
      m < p && (a = h.cut(m - o), h = h.cut(0, m - o), p = m, d = -1);
    } else
      for (; s < i.length && i[s].to < p; )
        s++;
    let g = h.isInline && !h.isLeaf ? l.filter((m) => !m.inline) : l.slice();
    r(h, g, e.forChild(o, h), d), o = p;
  }
}
function b0(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function w0(n, e, t, r) {
  for (let i = 0, o = 0; i < n.childCount && o <= r; ) {
    let s = n.child(i++), l = o;
    if (o += s.nodeSize, !s.isText)
      continue;
    let a = s.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (o += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (o >= t) {
      if (o >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t)
        return l + c;
      if (t == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function Hl(n, e, t, r, i) {
  let o = [];
  for (let s = 0, l = 0; s < n.length; s++) {
    let a = n[s], c = l, f = l += a.size;
    c >= t || f <= e ? o.push(a) : (c < e && o.push(a.slice(0, e - c, r)), i && (o.push(i), i = void 0), f > t && o.push(a.slice(t - c, a.size, r)));
  }
  return o;
}
function Ya(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), o = i && i.size == 0, s = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (s < 0)
    return null;
  let l = r.resolve(s), a, c;
  if (gs(t)) {
    for (a = s; i && !i.node; )
      i = i.parent;
    let u = i.node;
    if (i && u.isAtom && M.isSelectable(u) && i.parent && !(u.isInline && Hb(t.focusNode, t.focusOffset, i.dom))) {
      let h = i.posBefore;
      c = new M(s == h ? l : r.resolve(h));
    }
  } else {
    if (t instanceof n.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let u = s, h = s;
      for (let d = 0; d < t.rangeCount; d++) {
        let p = t.getRangeAt(d);
        u = Math.min(u, n.docView.posFromDOM(p.startContainer, p.startOffset, 1)), h = Math.max(h, n.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (u < 0)
        return null;
      [a, s] = h == n.state.selection.anchor ? [h, u] : [u, h], l = r.resolve(s);
    } else
      a = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let f = r.resolve(a);
  if (!c) {
    let u = e == "pointer" || n.state.selection.head < l.pos && !o ? 1 : -1;
    c = Xa(n, f, l, u);
  }
  return c;
}
function Mp(n) {
  return n.editable ? n.hasFocus() : Ip(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function yt(n, e = !1) {
  let t = n.state.selection;
  if (Np(n, t), !!Mp(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && ge) {
      let r = n.domSelectionRange(), i = n.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && mn(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      v0(n);
    else {
      let { anchor: r, head: i } = t, o, s;
      Af && !(t instanceof L) && (t.$from.parent.inlineContent || (o = Tf(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (s = Tf(n, t.to))), n.docView.setSelection(r, i, n.root, e), Af && (o && Mf(o), s && Mf(s)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && S0(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const Af = Se || ge && yp < 63;
function Tf(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, o = r ? t.childNodes[r - 1] : null;
  if (Se && i && i.contentEditable == "false")
    return Vs(i);
  if ((!i || i.contentEditable == "false") && (!o || o.contentEditable == "false")) {
    if (i)
      return Vs(i);
    if (o)
      return Vs(o);
  }
}
function Vs(n) {
  return n.contentEditable = "true", Se && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function Mf(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function S0(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!Mp(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function v0(n) {
  let e = n.domSelection(), t = document.createRange();
  if (!e)
    return;
  let r = n.cursorWrapper.dom, i = r.nodeName == "IMG";
  i ? t.setStart(r.parentNode, fe(r) + 1) : t.setStart(r, 0), t.collapse(!0), e.removeAllRanges(), e.addRange(t), !i && !n.state.selection.visible && Ee && Ut <= 11 && (r.disabled = !0, r.disabled = !1);
}
function Np(n, e) {
  if (e instanceof M) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (Nf(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    Nf(n);
}
function Nf(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function Xa(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || L.between(e, t, r);
}
function If(n) {
  return n.editable && !n.hasFocus() ? !1 : Ip(n);
}
function Ip(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function C0(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return mn(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Jl(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), o = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return o && I.findFrom(o, e);
}
function Nt(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function Df(n, e, t) {
  let r = n.state.selection;
  if (r instanceof L)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!o || o.isText || !o.isLeaf)
        return !1;
      let s = n.state.doc.resolve(i.pos + o.nodeSize * (e < 0 ? -1 : 1));
      return Nt(n, new L(r.$anchor, s));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Jl(n.state, e);
        return i && i instanceof M ? Nt(n, i) : !1;
      } else if (!(De && t.indexOf("m") > -1)) {
        let i = r.$head, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, s;
        if (!o || o.isText)
          return !1;
        let l = e < 0 ? i.pos - o.nodeSize : i.pos;
        return o.isAtom || (s = n.docView.descAt(l)) && !s.contentDOM ? M.isSelectable(o) ? Nt(n, new M(e < 0 ? n.state.doc.resolve(i.pos - o.nodeSize) : i)) : ai ? Nt(n, new L(n.state.doc.resolve(e < 0 ? l : l + o.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof M && r.node.isInline)
      return Nt(n, new L(e > 0 ? r.$to : r.$from));
    {
      let i = Jl(n.state, e);
      return i ? Nt(n, i) : !1;
    }
  }
}
function so(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Ar(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function En(n, e) {
  return e < 0 ? x0(n) : k0(n);
}
function x0(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, o, s = !1;
  for (Ve && t.nodeType == 1 && r < so(t) && Ar(t.childNodes[r], -1) && (s = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (Ar(l, -1))
          i = t, o = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (Dp(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && Ar(l, -1); )
          i = t.parentNode, o = fe(l), l = l.previousSibling;
        if (l)
          t = l, r = so(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  s ? Kl(n, t, r) : i && Kl(n, i, o);
}
function k0(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = so(t), o, s;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (Ar(l, 1))
        o = t, s = ++r;
      else
        break;
    } else {
      if (Dp(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && Ar(l, 1); )
          o = l.parentNode, s = fe(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = so(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  o && Kl(n, o, s);
}
function Dp(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function O0(n, e) {
  for (; n && e == n.childNodes.length && !li(n); )
    e = fe(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function E0(n, e) {
  for (; n && !e && !li(n); )
    e = fe(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Kl(n, e, t) {
  if (e.nodeType != 3) {
    let o, s;
    (s = O0(e, t)) ? (e = s, t = 0) : (o = E0(e, t)) && (e = o, t = o.nodeValue.length);
  }
  let r = n.domSelection();
  if (!r)
    return;
  if (gs(r)) {
    let o = document.createRange();
    o.setEnd(e, t), o.setStart(e, t), r.removeAllRanges(), r.addRange(o);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && yt(n);
  }, 50);
}
function Rf(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(ge || Gb) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let o = n.coordsAtPos(e - 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let o = n.coordsAtPos(e + 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function _f(n, e, t) {
  let r = n.state.selection;
  if (r instanceof L && !r.empty || t.indexOf("s") > -1 || De && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: o } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let s = Jl(n.state, e);
    if (s && s instanceof M)
      return Nt(n, s);
  }
  if (!i.parent.inlineContent) {
    let s = e < 0 ? i : o, l = r instanceof Fe ? I.near(s, e) : I.findFrom(s, e);
    return l ? Nt(n, l) : !1;
  }
  return !1;
}
function Pf(n, e) {
  if (!(n.state.selection instanceof L))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let o = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (o && !o.isText) {
    let s = n.state.tr;
    return e < 0 ? s.delete(t.pos - o.nodeSize, t.pos) : s.delete(t.pos, t.pos + o.nodeSize), n.dispatch(s), !0;
  }
  return !1;
}
function $f(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function A0(n) {
  if (!Se || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    $f(n, r, "true"), setTimeout(() => $f(n, r, "false"), 20);
  }
  return !1;
}
function T0(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function M0(n, e) {
  let t = e.keyCode, r = T0(e);
  if (t == 8 || De && t == 72 && r == "c")
    return Pf(n, -1) || En(n, -1);
  if (t == 46 && !e.shiftKey || De && t == 68 && r == "c")
    return Pf(n, 1) || En(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || De && t == 66 && r == "c") {
    let i = t == 37 ? Rf(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return Df(n, i, r) || En(n, i);
  } else if (t == 39 || De && t == 70 && r == "c") {
    let i = t == 39 ? Rf(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return Df(n, i, r) || En(n, i);
  } else {
    if (t == 38 || De && t == 80 && r == "c")
      return _f(n, -1, r) || En(n, -1);
    if (t == 40 || De && t == 78 && r == "c")
      return A0(n) || _f(n, 1, r) || En(n, 1);
    if (r == (De ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function Rp(n, e) {
  n.someProp("transformCopied", (d) => {
    e = d(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: o } = e;
  for (; i > 1 && o > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, o--;
    let d = r.firstChild;
    t.push(d.type.name, d.attrs != d.type.defaultAttrs ? d.attrs : null), r = d.content;
  }
  let s = n.someProp("clipboardSerializer") || nr.fromSchema(n.state.schema), l = zp(), a = l.createElement("div");
  a.appendChild(s.serializeFragment(r, { document: l }));
  let c = a.firstChild, f, u = 0;
  for (; c && c.nodeType == 1 && (f = Bp[c.nodeName.toLowerCase()]); ) {
    for (let d = f.length - 1; d >= 0; d--) {
      let p = l.createElement(f[d]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), u++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${o}${u ? ` -${u}` : ""} ${JSON.stringify(t)}`);
  let h = n.someProp("clipboardTextSerializer", (d) => d(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: h, slice: e };
}
function _p(n, e, t, r, i) {
  let o = i.parent.type.spec.code, s, l;
  if (!t && !e)
    return null;
  let a = e && (r || o || !t);
  if (a) {
    if (n.someProp("transformPastedText", (h) => {
      e = h(e, o || r, n);
    }), o)
      return e ? new v(b.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : v.empty;
    let u = n.someProp("clipboardTextParser", (h) => h(e, i, r, n));
    if (u)
      l = u;
    else {
      let h = i.marks(), { schema: d } = n.state, p = nr.fromSchema(d);
      s = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((g) => {
        let m = s.appendChild(document.createElement("p"));
        g && m.appendChild(p.serializeNode(d.text(g, h)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (u) => {
      t = u(t, n);
    }), s = R0(t), ai && _0(s);
  let c = s && s.querySelector("[data-pm-slice]"), f = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (f && f[3])
    for (let u = +f[3]; u > 0; u--) {
      let h = s.firstChild;
      for (; h && h.nodeType != 1; )
        h = h.nextSibling;
      if (!h)
        break;
      s = h;
    }
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || Gd.fromSchema(n.state.schema)).parseSlice(s, {
    preserveWhitespace: !!(a || f),
    context: i,
    ruleFromNode(h) {
      return h.nodeName == "BR" && !h.nextSibling && h.parentNode && !N0.test(h.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), f)
    l = P0(Lf(l, +f[1], +f[2]), f[4]);
  else if (l = v.maxOpen(I0(l.content, i), !0), l.openStart || l.openEnd) {
    let u = 0, h = 0;
    for (let d = l.content.firstChild; u < l.openStart && !d.type.spec.isolating; u++, d = d.firstChild)
      ;
    for (let d = l.content.lastChild; h < l.openEnd && !d.type.spec.isolating; h++, d = d.lastChild)
      ;
    l = Lf(l, u, h);
  }
  return n.someProp("transformPasted", (u) => {
    l = u(l, n);
  }), l;
}
const N0 = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function I0(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), o, s = [];
    if (n.forEach((l) => {
      if (!s)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return s = null;
      if (c = s.length && o.length && $p(a, o, l, s[s.length - 1], 0))
        s[s.length - 1] = c;
      else {
        s.length && (s[s.length - 1] = Lp(s[s.length - 1], o.length));
        let f = Pp(l, a);
        s.push(f), i = i.matchType(f.type), o = a;
      }
    }), s)
      return b.from(s);
  }
  return n;
}
function Pp(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, b.from(n));
  return n;
}
function $p(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let o = $p(n, e, t, r.lastChild, i + 1);
    if (o)
      return r.copy(r.content.replaceChild(r.childCount - 1, o));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(b.from(Pp(t, n, i + 1))));
  }
}
function Lp(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, Lp(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(b.empty, !0);
  return n.copy(t.append(r));
}
function Gl(n, e, t, r, i, o) {
  let s = e < 0 ? n.firstChild : n.lastChild, l = s.content;
  return n.childCount > 1 && (o = 0), i < r - 1 && (l = Gl(l, e, t, r, i + 1, o)), i >= t && (l = e < 0 ? s.contentMatchAt(0).fillBefore(l, o <= i).append(l) : l.append(s.contentMatchAt(s.childCount).fillBefore(b.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, s.copy(l));
}
function Lf(n, e, t) {
  return e < n.openStart && (n = new v(Gl(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new v(Gl(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const Bp = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let Bf = null;
function zp() {
  return Bf || (Bf = document.implementation.createHTMLDocument("title"));
}
function D0(n) {
  let e = window.trustedTypes;
  return e ? e.createPolicy("detachedDocument", { createHTML: (t) => t }).createHTML(n) : n;
}
function R0(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = zp().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), i;
  if ((i = r && Bp[r[1].toLowerCase()]) && (n = i.map((o) => "<" + o + ">").join("") + n + i.map((o) => "</" + o + ">").reverse().join("")), t.innerHTML = D0(n), i)
    for (let o = 0; o < i.length; o++)
      t = t.querySelector(i[o]) || t;
  return t;
}
function _0(n) {
  let e = n.querySelectorAll(ge ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function P0(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: o, openEnd: s } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = b.from(a.create(r[l + 1], i)), o++, s++;
  }
  return new v(i, o, s);
}
const ve = {}, Ce = {}, $0 = { touchstart: !0, touchmove: !0 };
class L0 {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastAndroidDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function B0(n) {
  for (let e in ve) {
    let t = ve[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      F0(n, r) && !Qa(n, r) && (n.editable || !(r.type in Ce)) && t(n, r);
    }, $0[e] ? { passive: !0 } : void 0);
  }
  Se && n.dom.addEventListener("input", () => null), ql(n);
}
function jt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function z0(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function ql(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => Qa(n, r));
  });
}
function Qa(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function F0(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function j0(n, e) {
  !Qa(n, e) && ve[e.type] && (n.editable || !(e.type in Ce)) && ve[e.type](n, e);
}
Ce.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !jp(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(Be && ge && t.keyCode == 13)))
    if (n.domObserver.selectionChanged(n.domSelectionRange()) ? n.domObserver.flush() : t.keyCode != 229 && n.domObserver.forceFlush(), Hn && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, rn(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else n.someProp("handleKeyDown", (r) => r(n, t)) || M0(n, t) ? t.preventDefault() : jt(n, "key");
};
Ce.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Ce.keypress = (n, e) => {
  let t = e;
  if (jp(n, t) || !t.charCode || t.ctrlKey && !t.altKey || De && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof L) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (o) => o(n, r.$from.pos, r.$to.pos, i)) && n.dispatch(n.state.tr.insertText(i).scrollIntoView()), t.preventDefault();
  }
};
function ys(n) {
  return { left: n.clientX, top: n.clientY };
}
function V0(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function Za(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let o = n.state.doc.resolve(r);
  for (let s = o.depth + 1; s > 0; s--)
    if (n.someProp(e, (l) => s > o.depth ? l(n, t, o.nodeAfter, o.before(s), i, !0) : l(n, t, o.node(s), o.before(s), i, !1)))
      return !0;
  return !1;
}
function Bn(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function W0(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && M.isSelectable(r) ? (Bn(n, new M(t)), !0) : !1;
}
function U0(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof M && (r = t.node);
  let o = n.state.doc.resolve(e);
  for (let s = o.depth + 1; s > 0; s--) {
    let l = s > o.depth ? o.nodeAfter : o.node(s);
    if (M.isSelectable(l)) {
      r && t.$from.depth > 0 && s >= t.$from.depth && o.before(t.$from.depth + 1) == t.$from.pos ? i = o.before(t.$from.depth) : i = o.before(s);
      break;
    }
  }
  return i != null ? (Bn(n, M.create(n.state.doc, i)), !0) : !1;
}
function H0(n, e, t, r, i) {
  return Za(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (o) => o(n, e, r)) || (i ? U0(n, t) : W0(n, t));
}
function J0(n, e, t, r) {
  return Za(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function K0(n, e, t, r) {
  return Za(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || G0(n, t, r);
}
function G0(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (Bn(n, L.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let o = i.depth + 1; o > 0; o--) {
    let s = o > i.depth ? i.nodeAfter : i.node(o), l = i.before(o);
    if (s.inlineContent)
      Bn(n, L.create(r, l + 1, l + 1 + s.content.size));
    else if (M.isSelectable(s))
      Bn(n, M.create(r, l));
    else
      continue;
    return !0;
  }
}
function ec(n) {
  return lo(n);
}
const Fp = De ? "metaKey" : "ctrlKey";
ve.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = ec(n), i = Date.now(), o = "singleClick";
  i - n.input.lastClick.time < 500 && V0(t, n.input.lastClick) && !t[Fp] && (n.input.lastClick.type == "singleClick" ? o = "doubleClick" : n.input.lastClick.type == "doubleClick" && (o = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: o };
  let s = n.posAtCoords(ys(t));
  s && (o == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new q0(n, s, t, !!r)) : (o == "doubleClick" ? J0 : K0)(n, s.pos, s.inside, t) ? t.preventDefault() : jt(n, "pointer"));
};
class q0 {
  constructor(e, t, r, i) {
    this.view = e, this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[Fp], this.allowDefault = r.shiftKey;
    let o, s;
    if (t.inside > -1)
      o = e.state.doc.nodeAt(t.inside), s = t.inside;
    else {
      let f = e.state.doc.resolve(t.pos);
      o = f.parent, s = f.depth ? f.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.dom.nodeType == 1 ? a.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && o.type.spec.draggable && o.type.spec.selectable !== !1 || c instanceof M && c.from <= s && c.to > s) && (this.mightDrag = {
      node: o,
      pos: s,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && Ve && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), jt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => yt(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(ys(e))), this.updateAllowDefault(e), this.allowDefault || !t ? jt(this.view, "pointer") : H0(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    Se && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    ge && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Bn(this.view, I.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : jt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), jt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
ve.touchstart = (n) => {
  n.input.lastTouch = Date.now(), ec(n), jt(n, "pointer");
};
ve.touchmove = (n) => {
  n.input.lastTouch = Date.now(), jt(n, "pointer");
};
ve.contextmenu = (n) => ec(n);
function jp(n, e) {
  return n.composing ? !0 : Se && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const Y0 = Be ? 5e3 : -1;
Ce.compositionstart = Ce.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof L && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), lo(n, !0), n.markCursor = null;
    else if (lo(n, !e.selection.empty), Ve && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, o = r.focusOffset; i && i.nodeType == 1 && o != 0; ) {
        let s = o < 0 ? i.lastChild : i.childNodes[o - 1];
        if (!s)
          break;
        if (s.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(s, s.nodeValue.length);
          break;
        } else
          i = s, o = -1;
      }
    }
    n.input.composing = !0;
  }
  Vp(n, Y0);
};
Ce.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, Vp(n, 20));
};
function Vp(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => lo(n), e));
}
function Wp(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Q0()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function X0(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = Wb(e.focusNode, e.focusOffset), r = Ub(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc, o = n.domObserver.lastChangedTextNode;
    if (t == o || r == o)
      return o;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let s = t.pmViewDesc;
      if (!(!s || !s.isText(t.nodeValue)))
        return r;
    }
  }
  return t || r;
}
function Q0() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function lo(n, e = !1) {
  if (!(Be && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), Wp(n), e || n.docView && n.docView.dirty) {
      let t = Ya(n);
      return t && !t.eq(n.state.selection) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !n.state.selection.empty ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function Z0(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Fr = Ee && Ut < 15 || Hn && qb < 604;
ve.copy = Ce.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let o = Fr ? null : t.clipboardData, s = r.content(), { dom: l, text: a } = Rp(n, s);
  o ? (t.preventDefault(), o.clearData(), o.setData("text/html", l.innerHTML), o.setData("text/plain", a)) : Z0(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function e1(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function t1(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? jr(n, r.value, null, i, e) : jr(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function jr(n, e, t, r, i) {
  let o = _p(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, o || v.empty)))
    return !0;
  if (!o)
    return !1;
  let s = e1(o), l = s ? n.state.tr.replaceSelectionWith(s, r) : n.state.tr.replaceSelection(o);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function Up(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
Ce.paste = (n, e) => {
  let t = e;
  if (n.composing && !Be)
    return;
  let r = Fr ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && jr(n, Up(r), r.getData("text/html"), i, t) ? t.preventDefault() : t1(n, t);
};
class Hp {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const Jp = De ? "altKey" : "ctrlKey";
ve.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, o = i.empty ? null : n.posAtCoords(ys(t)), s;
  if (!(o && o.pos >= i.from && o.pos <= (i instanceof M ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      s = M.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let u = n.docView.nearestDesc(t.target, !0);
      u && u.node.type.spec.draggable && u != n.docView && (s = M.create(n.state.doc, u.posBefore));
    }
  }
  let l = (s || n.state.selection).content(), { dom: a, text: c, slice: f } = Rp(n, l);
  (!t.dataTransfer.files.length || !ge || yp > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(Fr ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Fr || t.dataTransfer.setData("text/plain", c), n.dragging = new Hp(f, !t[Jp], s);
};
ve.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Ce.dragover = Ce.dragenter = (n, e) => e.preventDefault();
Ce.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let i = n.posAtCoords(ys(t));
  if (!i)
    return;
  let o = n.state.doc.resolve(i.pos), s = r && r.slice;
  s ? n.someProp("transformPasted", (p) => {
    s = p(s, n);
  }) : s = _p(n, Up(t.dataTransfer), Fr ? null : t.dataTransfer.getData("text/html"), !1, o);
  let l = !!(r && !t[Jp]);
  if (n.someProp("handleDrop", (p) => p(n, t, s || v.empty, l))) {
    t.preventDefault();
    return;
  }
  if (!s)
    return;
  t.preventDefault();
  let a = s ? lp(n.state.doc, o.pos, s) : o.pos;
  a == null && (a = o.pos);
  let c = n.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let f = c.mapping.map(a), u = s.openStart == 0 && s.openEnd == 0 && s.content.childCount == 1, h = c.doc;
  if (u ? c.replaceRangeWith(f, f, s.content.firstChild) : c.replaceRange(f, f, s), c.doc.eq(h))
    return;
  let d = c.doc.resolve(f);
  if (u && M.isSelectable(s.content.firstChild) && d.nodeAfter && d.nodeAfter.sameMarkup(s.content.firstChild))
    c.setSelection(new M(d));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((g, m, y, x) => p = x), c.setSelection(Xa(n, d, c.doc.resolve(p)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
ve.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && yt(n);
  }, 20));
};
ve.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
ve.beforeinput = (n, e) => {
  if (ge && Be && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (o) => o(n, rn(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Ce)
  ve[n] = Ce[n];
function Vr(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class ao {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || fn, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: o, deleted: s } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return s ? null : new ke(o - r, o - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof ao && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Vr(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class Jt {
  constructor(e, t) {
    this.attrs = e, this.spec = t || fn;
  }
  map(e, t, r, i) {
    let o = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, s = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return o >= s ? null : new ke(o, s, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof Jt && Vr(this.attrs, e.attrs) && Vr(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof Jt;
  }
  destroy() {
  }
}
class tc {
  constructor(e, t) {
    this.attrs = e, this.spec = t || fn;
  }
  map(e, t, r, i) {
    let o = e.mapResult(t.from + i, 1);
    if (o.deleted)
      return null;
    let s = e.mapResult(t.to + i, -1);
    return s.deleted || s.pos <= o.pos ? null : new ke(o.pos - r, s.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), o;
    return i == t.from && !(o = e.child(r)).isText && i + o.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof tc && Vr(this.attrs, e.attrs) && Vr(this.spec, e.spec);
  }
  destroy() {
  }
}
class ke {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new ke(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new ke(e, e, new ao(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new ke(e, t, new Jt(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new ke(e, t, new tc(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof Jt;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof ao;
  }
}
const In = [], fn = {};
class Y {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : In, this.children = t.length ? t : In;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? co(t, e, 0, fn) : pe;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, o) {
    for (let s = 0; s < this.local.length; s++) {
      let l = this.local[s];
      l.from <= t && l.to >= e && (!o || o(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let s = 0; s < this.children.length; s += 3)
      if (this.children[s] < t && this.children[s + 1] > e) {
        let l = this.children[s] + 1;
        this.children[s + 2].findInner(e - l, t - l, r, i + l, o);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == pe || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || fn);
  }
  /**
  @internal
  */
  mapInner(e, t, r, i, o) {
    let s;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a) ? (s || (s = [])).push(a) : o.onRemove && o.onRemove(this.local[l].spec);
    }
    return this.children.length ? n1(this.children, s || [], e, t, r, i, o) : s ? new Y(s.sort(un), In) : pe;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == pe ? Y.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, o = 0;
    e.forEach((l, a) => {
      let c = a + r, f;
      if (f = Gp(t, l, c)) {
        for (i || (i = this.children.slice()); o < i.length && i[o] < a; )
          o += 3;
        i[o] == a ? i[o + 2] = i[o + 2].addInner(l, f, c + 1) : i.splice(o, 0, a, a + l.nodeSize, co(f, l, c + 1, fn)), o += 3;
      }
    });
    let s = Kp(o ? qp(t) : t, -r);
    for (let l = 0; l < s.length; l++)
      s[l].type.valid(e, s[l]) || s.splice(l--, 1);
    return new Y(s.length ? this.local.concat(s).sort(un) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == pe ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let o = 0; o < r.length; o += 3) {
      let s, l = r[o] + t, a = r[o + 1] + t;
      for (let f = 0, u; f < e.length; f++)
        (u = e[f]) && u.from > l && u.to < a && (e[f] = null, (s || (s = [])).push(u));
      if (!s)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[o + 2].removeInner(s, l + 1);
      c != pe ? r[o + 2] = c : (r.splice(o, 3), o -= 3);
    }
    if (i.length) {
      for (let o = 0, s; o < e.length; o++)
        if (s = e[o])
          for (let l = 0; l < i.length; l++)
            i[l].eq(s, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new Y(i, r) : pe;
  }
  forChild(e, t) {
    if (this == pe)
      return this;
    if (t.isLeaf)
      return Y.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let o = e + 1, s = o + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < s && a.to > o && a.type instanceof Jt) {
        let c = Math.max(o, a.from) - o, f = Math.min(s, a.to) - o;
        c < f && (i || (i = [])).push(a.copy(c, f));
      }
    }
    if (i) {
      let l = new Y(i.sort(un), In);
      return r ? new Pt([l, r]) : l;
    }
    return r || pe;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof Y) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return nc(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == pe)
      return In;
    if (e.inlineContent || !this.local.some(Jt.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof Jt || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
Y.empty = new Y([], []);
Y.removeOverlap = nc;
const pe = Y.empty;
class Pt {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, fn));
    return Pt.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return Y.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].forChild(e, t);
      o != pe && (o instanceof Pt ? r = r.concat(o.members) : r.push(o));
    }
    return Pt.from(r);
  }
  eq(e) {
    if (!(e instanceof Pt) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].localsInner(e);
      if (o.length)
        if (!t)
          t = o;
        else {
          r && (t = t.slice(), r = !1);
          for (let s = 0; s < o.length; s++)
            t.push(o[s]);
        }
    }
    return t ? nc(r ? t : t.sort(un)) : In;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return pe;
      case 1:
        return e[0];
      default:
        return new Pt(e.every((t) => t instanceof Y) ? e : e.reduce((t, r) => t.concat(r instanceof Y ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function n1(n, e, t, r, i, o, s) {
  let l = n.slice();
  for (let c = 0, f = o; c < t.maps.length; c++) {
    let u = 0;
    t.maps[c].forEach((h, d, p, g) => {
      let m = g - p - (d - h);
      for (let y = 0; y < l.length; y += 3) {
        let x = l[y + 1];
        if (x < 0 || h > x + f - u)
          continue;
        let O = l[y] + f - u;
        d >= O ? l[y + 1] = h <= O ? -2 : -1 : h >= f && m && (l[y] += m, l[y + 1] += m);
      }
      u += m;
    }), f = t.maps[c].map(f, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let f = t.map(n[c] + o), u = f - i;
      if (u < 0 || u >= r.content.size) {
        a = !0;
        continue;
      }
      let h = t.map(n[c + 1] + o, -1), d = h - i, { index: p, offset: g } = r.content.findIndex(u), m = r.maybeChild(p);
      if (m && g == u && g + m.nodeSize == d) {
        let y = l[c + 2].mapInner(t, m, f + 1, n[c] + o + 1, s);
        y != pe ? (l[c] = u, l[c + 1] = d, l[c + 2] = y) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = r1(l, n, e, t, i, o, s), f = co(c, r, 0, s);
    e = f.local;
    for (let u = 0; u < l.length; u += 3)
      l[u + 1] < 0 && (l.splice(u, 3), u -= 3);
    for (let u = 0, h = 0; u < f.children.length; u += 3) {
      let d = f.children[u];
      for (; h < l.length && l[h] < d; )
        h += 3;
      l.splice(h, 0, f.children[u], f.children[u + 1], f.children[u + 2]);
    }
  }
  return new Y(e.sort(un), l);
}
function Kp(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new ke(i.from + e, i.to + e, i.type));
  }
  return t;
}
function r1(n, e, t, r, i, o, s) {
  function l(a, c) {
    for (let f = 0; f < a.local.length; f++) {
      let u = a.local[f].map(r, i, c);
      u ? t.push(u) : s.onRemove && s.onRemove(a.local[f].spec);
    }
    for (let f = 0; f < a.children.length; f += 3)
      l(a.children[f + 2], a.children[f] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + o + 1);
  return t;
}
function Gp(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let o = 0, s; o < n.length; o++)
    (s = n[o]) && s.from > t && s.to < r && ((i || (i = [])).push(s), n[o] = null);
  return i;
}
function qp(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function co(n, e, t, r) {
  let i = [], o = !1;
  e.forEach((l, a) => {
    let c = Gp(n, l, a + t);
    if (c) {
      o = !0;
      let f = co(c, l, t + a + 1, r);
      f != pe && i.push(a, a + l.nodeSize, f);
    }
  });
  let s = Kp(o ? qp(n) : n, -t).sort(un);
  for (let l = 0; l < s.length; l++)
    s[l].type.valid(e, s[l]) || (r.onRemove && r.onRemove(s[l].spec), s.splice(l--, 1));
  return s.length || i.length ? new Y(s, i) : pe;
}
function un(n, e) {
  return n.from - e.from || n.to - e.to;
}
function nc(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let o = e[i];
        if (o.from == r.from) {
          o.to != r.to && (e == n && (e = n.slice()), e[i] = o.copy(o.from, r.to), zf(e, i + 1, o.copy(r.to, o.to)));
          continue;
        } else {
          o.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, o.from), zf(e, i, r.copy(o.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function zf(n, e, t) {
  for (; e < n.length && un(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function Ws(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != pe && e.push(r);
  }), n.cursorWrapper && e.push(Y.create(n.state.doc, [n.cursorWrapper.deco])), Pt.from(e);
}
const i1 = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, o1 = Ee && Ut <= 11;
class s1 {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class l1 {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new s1(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      Ee && Ut <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), o1 && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, i1)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (If(this.view)) {
      if (this.suppressingSelectionUpdates)
        return yt(this.view);
      if (Ee && Ut <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && mn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let o = e.focusNode; o; o = zr(o))
      t.add(o);
    for (let o = e.anchorNode; o; o = zr(o))
      if (t.has(o)) {
        r = o;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  selectionChanged(e) {
    return !this.suppressingSelectionUpdates && !this.currentSelection.eq(e) && If(this.view) && !this.ignoreSelectionChange(e);
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), i = this.selectionChanged(r), o = -1, s = -1, l = !1, a = [];
    if (e.editable)
      for (let f = 0; f < t.length; f++) {
        let u = this.registerMutation(t[f], a);
        u && (o = o < 0 ? u.from : Math.min(u.from, o), s = s < 0 ? u.to : Math.max(u.to, s), u.typeOver && (l = !0));
      }
    if (Ve && a.length) {
      let f = a.filter((u) => u.nodeName == "BR");
      if (f.length == 2) {
        let [u, h] = f;
        u.parentNode && u.parentNode.parentNode == h.parentNode ? h.remove() : u.remove();
      } else {
        let { focusNode: u } = this.currentSelection;
        for (let h of f) {
          let d = h.parentNode;
          d && d.nodeName == "LI" && (!u || f1(e, u) != d) && h.remove();
        }
      }
    }
    let c = null;
    o < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && gs(r) && (c = Ya(e)) && c.eq(I.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, yt(e), this.currentSelection.set(r), e.scrollToSelection()) : (o > -1 || i) && (o > -1 && (e.docView.markDirty(o, s), a1(e)), this.handleDOMChange(o, s, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || yt(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let f = 0; f < e.addedNodes.length; f++) {
        let u = e.addedNodes[f];
        t.push(u), u.nodeType == 3 && (this.lastChangedTextNode = u);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, o = e.nextSibling;
      if (Ee && Ut <= 11 && e.addedNodes.length)
        for (let f = 0; f < e.addedNodes.length; f++) {
          let { previousSibling: u, nextSibling: h } = e.addedNodes[f];
          (!u || Array.prototype.indexOf.call(e.addedNodes, u) < 0) && (i = u), (!h || Array.prototype.indexOf.call(e.addedNodes, h) < 0) && (o = h);
        }
      let s = i && i.parentNode == e.target ? fe(i) + 1 : 0, l = r.localPosFromDOM(e.target, s, -1), a = o && o.parentNode == e.target ? fe(o) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let Ff = /* @__PURE__ */ new WeakMap(), jf = !1;
function a1(n) {
  if (!Ff.has(n) && (Ff.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = Ve, jf)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), jf = !0;
  }
}
function Vf(n, e) {
  let t = e.startContainer, r = e.startOffset, i = e.endContainer, o = e.endOffset, s = n.domAtPos(n.state.selection.anchor);
  return mn(s.node, s.offset, i, o) && ([t, r, i, o] = [i, o, t, r]), { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: o };
}
function c1(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i)
      return Vf(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? Vf(n, t) : null;
}
function f1(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock)
      return t;
  }
  return null;
}
function u1(n, e, t) {
  let { node: r, fromOffset: i, toOffset: o, from: s, to: l } = n.docView.parseRange(e, t), a = n.domSelectionRange(), c, f = a.anchorNode;
  if (f && n.dom.contains(f.nodeType == 1 ? f : f.parentNode) && (c = [{ node: f, offset: a.anchorOffset }], gs(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), ge && n.input.lastKeyCode === 8)
    for (let m = o; m > i; m--) {
      let y = r.childNodes[m - 1], x = y.pmViewDesc;
      if (y.nodeName == "BR" && !x) {
        o = m;
        break;
      }
      if (!x || x.size)
        break;
    }
  let u = n.state.doc, h = n.someProp("domParser") || Gd.fromSchema(n.state.schema), d = u.resolve(s), p = null, g = h.parse(r, {
    topNode: d.parent,
    topMatch: d.parent.contentMatchAt(d.index()),
    topOpen: !0,
    from: i,
    to: o,
    preserveWhitespace: d.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: h1,
    context: d
  });
  if (c && c[0].pos != null) {
    let m = c[0].pos, y = c[1] && c[1].pos;
    y == null && (y = m), p = { anchor: m + s, head: y + s };
  }
  return { doc: g, sel: p, from: s, to: l };
}
function h1(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (Se && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || Se && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const d1 = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function p1(n, e, t, r, i) {
  let o = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let A = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, Z = Ya(n, A);
    if (Z && !n.state.selection.eq(Z)) {
      if (ge && Be && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (k) => k(n, rn(13, "Enter"))))
        return;
      let E = n.state.tr.setSelection(Z);
      A == "pointer" ? E.setMeta("pointer", !0) : A == "key" && E.scrollIntoView(), o && E.setMeta("composition", o), n.dispatch(E);
    }
    return;
  }
  let s = n.state.doc.resolve(e), l = s.sharedDepth(t);
  e = s.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = u1(n, e, t), f = n.state.doc, u = f.slice(c.from, c.to), h, d;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (h = n.state.selection.to, d = "end") : (h = n.state.selection.from, d = "start"), n.input.lastKeyCode = null;
  let p = y1(u.content, c.doc.content, c.from, h, d);
  if (p && n.input.domChangeCount++, (Hn && n.input.lastIOSEnter > Date.now() - 225 || Be) && i.some((A) => A.nodeType == 1 && !d1.test(A.nodeName)) && (!p || p.endA >= p.endB) && n.someProp("handleKeyDown", (A) => A(n, rn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof L && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let A = Wf(n, n.state.doc, c.sel);
        if (A && !A.eq(n.state.selection)) {
          let Z = n.state.tr.setSelection(A);
          o && Z.setMeta("composition", o), n.dispatch(Z);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to && p.start == p.endB && n.state.selection instanceof L && (p.start > n.state.selection.from && p.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? p.start = n.state.selection.from : p.endA < n.state.selection.to && p.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (p.endB += n.state.selection.to - p.endA, p.endA = n.state.selection.to)), Ee && Ut <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let g = c.doc.resolveNoCache(p.start - c.from), m = c.doc.resolveNoCache(p.endB - c.from), y = f.resolve(p.start), x = g.sameParent(m) && g.parent.inlineContent && y.end() >= p.endA, O;
  if ((Hn && n.input.lastIOSEnter > Date.now() - 225 && (!x || i.some((A) => A.nodeName == "DIV" || A.nodeName == "P")) || !x && g.pos < c.doc.content.size && !g.sameParent(m) && (O = I.findFrom(c.doc.resolve(g.pos + 1), 1, !0)) && O.head == m.pos) && n.someProp("handleKeyDown", (A) => A(n, rn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > p.start && m1(f, p.start, p.endA, g, m) && n.someProp("handleKeyDown", (A) => A(n, rn(8, "Backspace")))) {
    Be && ge && n.domObserver.suppressSelectionUpdates();
    return;
  }
  ge && Be && p.endB == p.start && (n.input.lastAndroidDelete = Date.now()), Be && !x && g.start() != m.start() && m.parentOffset == 0 && g.depth == m.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, m = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(A) {
      return A(n, rn(13, "Enter"));
    });
  }, 20));
  let N = p.start, T = p.endA, C, D, R;
  if (x) {
    if (g.pos == m.pos)
      Ee && Ut <= 11 && g.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => yt(n), 20)), C = n.state.tr.delete(N, T), D = f.resolve(p.start).marksAcross(f.resolve(p.endA));
    else if (
      // Adding or removing a mark
      p.endA == p.endB && (R = g1(g.parent.content.cut(g.parentOffset, m.parentOffset), y.parent.content.cut(y.parentOffset, p.endA - y.start())))
    )
      C = n.state.tr, R.type == "add" ? C.addMark(N, T, R.mark) : C.removeMark(N, T, R.mark);
    else if (g.parent.child(g.index()).isText && g.index() == m.index() - (m.textOffset ? 0 : 1)) {
      let A = g.parent.textBetween(g.parentOffset, m.parentOffset);
      if (n.someProp("handleTextInput", (Z) => Z(n, N, T, A)))
        return;
      C = n.state.tr.insertText(A, N, T);
    }
  }
  if (C || (C = n.state.tr.replace(N, T, c.doc.slice(p.start - c.from, p.endB - c.from))), c.sel) {
    let A = Wf(n, C.doc, c.sel);
    A && !(ge && Be && n.composing && A.empty && (p.start != p.endB || n.input.lastAndroidDelete < Date.now() - 100) && (A.head == N || A.head == C.mapping.map(T) - 1) || Ee && A.empty && A.head == N) && C.setSelection(A);
  }
  D && C.ensureMarks(D), o && C.setMeta("composition", o), n.dispatch(C.scrollIntoView());
}
function Wf(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : Xa(n, e.resolve(t.anchor), e.resolve(t.head));
}
function g1(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, i = t, o = r, s, l, a;
  for (let f = 0; f < r.length; f++)
    i = r[f].removeFromSet(i);
  for (let f = 0; f < t.length; f++)
    o = t[f].removeFromSet(o);
  if (i.length == 1 && o.length == 0)
    l = i[0], s = "add", a = (f) => f.mark(l.addToSet(f.marks));
  else if (i.length == 0 && o.length == 1)
    l = o[0], s = "remove", a = (f) => f.mark(l.removeFromSet(f.marks));
  else
    return null;
  let c = [];
  for (let f = 0; f < e.childCount; f++)
    c.push(a(e.child(f)));
  if (b.from(c).eq(n))
    return { mark: l, type: s };
}
function m1(n, e, t, r, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    Us(r, !0, !1) < i.pos
  )
    return !1;
  let o = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = o.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (o.parentOffset < o.parent.content.size || !o.parent.isTextblock)
    return !1;
  let s = n.resolve(Us(o, !0, !0));
  return !s.parent.isTextblock || s.pos > t || Us(s, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(s.parent.content);
}
function Us(n, e, t) {
  let r = n.depth, i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, e = !1;
  if (t) {
    let o = n.node(r).maybeChild(n.indexAfter(r));
    for (; o && !o.isLeaf; )
      o = o.firstChild, i++;
  }
  return i;
}
function y1(n, e, t, r, i) {
  let o = n.findDiffStart(e, t);
  if (o == null)
    return null;
  let { a: s, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (i == "end") {
    let a = Math.max(0, o - Math.min(s, l));
    r -= s + a - o;
  }
  if (s < o && n.size < e.size) {
    let a = r <= o && r >= s ? o - r : 0;
    o -= a, o && o < e.size && Uf(e.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), l = o + (l - s), s = o;
  } else if (l < o) {
    let a = r <= o && r >= l ? o - r : 0;
    o -= a, o && o < n.size && Uf(n.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), s = o + (s - l), l = o;
  }
  return { start: o, endA: s, endB: l };
}
function Uf(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class tD {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new L0(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(qf), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Kf(this), Jf(this), this.nodeViews = Gf(this), this.docView = Of(this.state.doc, Hf(this), Ws(this), this.dom, this), this.domObserver = new l1(this, (r, i, o, s) => p1(this, r, i, o, s)), this.domObserver.start(), B0(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && ql(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(qf), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state, o = !1, s = !1;
    e.storedMarks && this.composing && (Wp(this), s = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let d = Gf(this);
      w1(d, this.nodeViews) && (this.nodeViews = d, o = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && ql(this), this.editable = Kf(this), Jf(this);
    let a = Ws(this), c = Hf(this), f = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", u = o || !this.docView.matchesNode(e.doc, c, a);
    (u || !e.selection.eq(i.selection)) && (s = !0);
    let h = f == "preserve" && s && this.dom.style.overflowAnchor == null && Qb(this);
    if (s) {
      this.domObserver.stop();
      let d = u && (Ee || ge) && !this.composing && !i.selection.empty && !e.selection.empty && b1(i.selection, e.selection);
      if (u) {
        let p = ge ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = X0(this)), (o || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = Of(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (d = !0);
      }
      d || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && C0(this)) ? yt(this, d) : (Np(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), f == "reset" ? this.dom.scrollTop = 0 : f == "to selection" ? this.scrollToSelection() : h && Zb(h);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!this.someProp("handleScrollToSelection", (t) => t(this))) if (this.state.selection instanceof M) {
      let t = this.docView.domAfterPos(this.state.selection.from);
      t.nodeType == 1 && wf(this, t.getBoundingClientRect(), e);
    } else
      wf(this, this.coordsAtPos(this.state.selection.head, 1), e);
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let o = r.from + (this.state.doc.content.size - t.doc.content.size);
      (o > 0 && this.state.doc.nodeAt(o)) == r.node && (i = o);
    }
    this.dragging = new Hp(e.slice, e.move, i < 0 ? void 0 : M.create(this.state.doc, i));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = t ? t(r) : r))
      return i;
    for (let s = 0; s < this.directPlugins.length; s++) {
      let l = this.directPlugins[s].props[e];
      if (l != null && (i = t ? t(l) : l))
        return i;
    }
    let o = this.state.plugins;
    if (o)
      for (let s = 0; s < o.length; s++) {
        let l = o[s].props[e];
        if (l != null && (i = t ? t(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Ee) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && e0(this.dom), yt(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return o0(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return Cp(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return f0(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return jr(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return jr(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (z0(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Ws(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, jb());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return j0(this, e);
  }
  /**
  Dispatch a transaction. Will call
  [`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
  when given, and otherwise defaults to applying the transaction to
  the current state and calling
  [`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
  This method is bound to the view instance, so that it can be
  easily passed around.
  */
  dispatch(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? Se && this.root.nodeType === 11 && Jb(this.dom.ownerDocument) == this.dom && c1(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
function Hf(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [ke.node(0, n.state.doc.content.size, e)];
}
function Jf(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: ke.widget(n.state.selection.from, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function Kf(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function b1(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function Gf(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function w1(n, e) {
  let t = 0, r = 0;
  for (let i in n) {
    if (n[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    r++;
  return t != r;
}
function qf(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var Kt = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, fo = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, S1 = typeof navigator < "u" && /Mac/.test(navigator.platform), v1 = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ue = 0; ue < 10; ue++) Kt[48 + ue] = Kt[96 + ue] = String(ue);
for (var ue = 1; ue <= 24; ue++) Kt[ue + 111] = "F" + ue;
for (var ue = 65; ue <= 90; ue++)
  Kt[ue] = String.fromCharCode(ue + 32), fo[ue] = String.fromCharCode(ue);
for (var Hs in Kt) fo.hasOwnProperty(Hs) || (fo[Hs] = Kt[Hs]);
function C1(n) {
  var e = S1 && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || v1 && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? fo : Kt)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const x1 = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function k1(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      s = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      o = !0;
    else if (/^mod$/i.test(a))
      x1 ? s = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), s && (t = "Meta-" + t), o && (t = "Shift-" + t), t;
}
function O1(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[k1(t)] = n[t];
  return e;
}
function Js(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function nD(n) {
  return new rr({ props: { handleKeyDown: rc(n) } });
}
function rc(n) {
  let e = O1(n);
  return function(t, r) {
    let i = C1(r), o, s = e[Js(i, r)];
    if (s && s(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[Js(i, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.shiftKey || r.altKey || r.metaKey || i.charCodeAt(0) > 127) && (o = Kt[r.keyCode]) && o != i) {
        let l = e[Js(o, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const rD = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Yp(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const iD = (n, e, t) => {
  let r = Yp(n, t);
  if (!r)
    return !1;
  let i = ic(r);
  if (!i) {
    let s = r.blockRange(), l = s && oi(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (eg(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "end") || M.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = ds(n.doc, r.before(s), r.after(s), v.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Jn(o, "end") ? I.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : M.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, oD = (n, e, t) => {
  let r = Yp(n, t);
  if (!r)
    return !1;
  let i = ic(r);
  return i ? Xp(n, i, e) : !1;
}, sD = (n, e, t) => {
  let r = Qp(n, t);
  if (!r)
    return !1;
  let i = oc(r);
  return i ? Xp(n, i, e) : !1;
};
function Xp(n, e, t) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let f = i.lastChild;
    if (!f)
      return !1;
    i = f;
  }
  let s = e.nodeAfter, l = s, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let f = l.firstChild;
    if (!f)
      return !1;
    l = f;
  }
  let c = ds(n.doc, o, a, v.empty);
  if (!c || c.from != o || c instanceof ce && c.slice.size >= a - o)
    return !1;
  if (t) {
    let f = n.tr.step(c);
    f.setSelection(L.create(f.doc, o)), t(f.scrollIntoView());
  }
  return !0;
}
function Jn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const lD = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = ic(r);
  }
  let s = o && o.nodeBefore;
  return !s || !M.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(M.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function ic(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Qp(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const aD = (n, e, t) => {
  let r = Qp(n, t);
  if (!r)
    return !1;
  let i = oc(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (eg(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "start") || M.isSelectable(o))) {
    let s = ds(n.doc, r.before(), r.after(), v.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Jn(o, "start") ? I.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : M.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, cD = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = oc(r);
  }
  let s = o && o.nodeAfter;
  return !s || !M.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(M.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function oc(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const fD = (n, e) => {
  let t = n.selection, r = t instanceof M, i;
  if (r) {
    if (t.node.isTextblock || !si(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = sp(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(M.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, uD = (n, e) => {
  let t = n.selection, r;
  if (t instanceof M) {
    if (t.node.isTextblock || !si(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = sp(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, hD = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && oi(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, dD = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Zp(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const pD = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Zp(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(I.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, gD = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Fe || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Zp(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(L.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, mD = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (ip(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && oi(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
}, yD = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(M.create(n.doc, i))), !0);
};
function E1(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || si(n.doc, e.pos)) ? !1 : (t && t(n.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0);
}
function eg(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && E1(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let d = e.pos + o.nodeSize, p = b.empty;
      for (let y = s.length - 1; y >= 0; y--)
        p = b.from(s[y].create(null, p));
      p = b.from(i.copy(p));
      let g = n.tr.step(new he(e.pos - 1, d, e.pos, d, new v(p, 1, 0), s.length, !0)), m = d + 2 * s.length;
      si(g.doc, m) && g.join(m), t(g.scrollIntoView());
    }
    return !0;
  }
  let f = o.type.spec.isolating || r > 0 && a ? null : I.findFrom(e, 1), u = f && f.$from.blockRange(f.$to), h = u && oi(u);
  if (h != null && h >= e.depth)
    return t && t(n.tr.lift(u, h).scrollIntoView()), !0;
  if (c && Jn(o, "start", !0) && Jn(i, "end")) {
    let d = i, p = [];
    for (; p.push(d), !d.isTextblock; )
      d = d.lastChild;
    let g = o, m = 1;
    for (; !g.isTextblock; g = g.firstChild)
      m++;
    if (d.canReplace(d.childCount, d.childCount, g.content)) {
      if (t) {
        let y = b.empty;
        for (let O = p.length - 1; O >= 0; O--)
          y = b.from(p[O].copy(y));
        let x = n.tr.step(new he(e.pos - p.length, e.pos + o.nodeSize, e.pos + m, e.pos + o.nodeSize - m, new v(y, p.length, 0), 0, !0));
        t(x.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function tg(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(L.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const bD = tg(-1), wD = tg(1);
function SD(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && rp(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function vD(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let o = 0; o < t.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = t.selection.ranges[o];
      t.doc.nodesBetween(s, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let f = t.doc.resolve(c), u = f.index();
            i = f.parent.canReplaceWith(u, u + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let o = t.tr;
      for (let s = 0; s < t.selection.ranges.length; s++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[s];
        o.setBlockType(l, a, n, e);
      }
      r(o.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function CD(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = !1, a = s;
    if (!s)
      return !1;
    if (s.depth >= 2 && i.node(s.depth - 1).type.compatibleContent(n) && s.startIndex == 0) {
      if (i.index(s.depth - 1) == 0)
        return !1;
      let f = t.doc.resolve(s.start - 2);
      a = new to(f, f, s.depth), s.endIndex < s.parent.childCount && (s = new to(i, t.doc.resolve(o.end(s.depth)), s.depth)), l = !0;
    }
    let c = rp(a, n, e, s);
    return c ? (r && r(A1(t.tr, s, c, l, n).scrollIntoView()), !0) : !1;
  };
}
function A1(n, e, t, r, i) {
  let o = b.empty;
  for (let f = t.length - 1; f >= 0; f--)
    o = b.from(t[f].type.create(t[f].attrs, o));
  n.step(new he(e.start - (r ? 2 : 0), e.end, e.start, e.end, new v(o, 0, 0), t.length, !0));
  let s = 0;
  for (let f = 0; f < t.length; f++)
    t[f].type == i && (s = f + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let f = e.startIndex, u = e.endIndex, h = !0; f < u; f++, h = !1)
    !h && ip(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(f).nodeSize;
  return n;
}
function xD(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? T1(e, t, n, o) : M1(e, t, o) : !0 : !1;
  };
}
function T1(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new he(o - 1, s, o, s, new v(b.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new to(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = oi(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.mapping.map(o, -1) - 1;
  return si(i.doc, a) && i.join(a), e(i.scrollIntoView()), !0;
}
function M1(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let d = t.end, p = t.endIndex - 1, g = t.startIndex; p > g; p--)
    d -= i.child(p).nodeSize, r.delete(d - 1, d + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), f = o.index(-1);
  if (!c.canReplace(f + (l ? 0 : 1), f + 1, s.content.append(a ? b.empty : b.from(i))))
    return !1;
  let u = o.pos, h = u + s.nodeSize;
  return r.step(new he(u - (l ? 1 : 0), h + (a ? 1 : 0), u + 1, h - 1, new v((l ? b.empty : b.from(i.copy(b.empty))).append(a ? b.empty : b.from(i.copy(b.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function kD(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, a = l.child(s - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, f = b.from(c ? n.create() : null), u = new v(b.from(n.create(null, b.from(l.type.create(null, f)))), c ? 3 : 1, 0), h = o.start, d = o.end;
      t(e.tr.step(new he(h - (c ? 3 : 1), d, h, d, u, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function ng(n) {
  var e, t, r = "";
  if (typeof n == "string" || typeof n == "number") r += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var i = n.length;
    for (e = 0; e < i; e++) n[e] && (t = ng(n[e])) && (r && (r += " "), r += t);
  } else for (t in n) n[t] && (r && (r += " "), r += t);
  return r;
}
function OD() {
  for (var n, e, t = 0, r = "", i = arguments.length; t < i; t++) (n = arguments[t]) && (e = ng(n)) && (r && (r += " "), r += e);
  return r;
}
const sc = "-", N1 = (n) => {
  const e = D1(n), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: r
  } = n;
  return {
    getClassGroupId: (s) => {
      const l = s.split(sc);
      return l[0] === "" && l.length !== 1 && l.shift(), rg(l, e) || I1(s);
    },
    getConflictingClassGroupIds: (s, l) => {
      const a = t[s] || [];
      return l && r[s] ? [...a, ...r[s]] : a;
    }
  };
}, rg = (n, e) => {
  var s;
  if (n.length === 0)
    return e.classGroupId;
  const t = n[0], r = e.nextPart.get(t), i = r ? rg(n.slice(1), r) : void 0;
  if (i)
    return i;
  if (e.validators.length === 0)
    return;
  const o = n.join(sc);
  return (s = e.validators.find(({
    validator: l
  }) => l(o))) == null ? void 0 : s.classGroupId;
}, Yf = /^\[(.+)\]$/, I1 = (n) => {
  if (Yf.test(n)) {
    const e = Yf.exec(n)[1], t = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, D1 = (n) => {
  const {
    theme: e,
    prefix: t
  } = n, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return _1(Object.entries(n.classGroups), t).forEach(([o, s]) => {
    Yl(s, r, o, e);
  }), r;
}, Yl = (n, e, t, r) => {
  n.forEach((i) => {
    if (typeof i == "string") {
      const o = i === "" ? e : Xf(e, i);
      o.classGroupId = t;
      return;
    }
    if (typeof i == "function") {
      if (R1(i)) {
        Yl(i(r), e, t, r);
        return;
      }
      e.validators.push({
        validator: i,
        classGroupId: t
      });
      return;
    }
    Object.entries(i).forEach(([o, s]) => {
      Yl(s, Xf(e, o), t, r);
    });
  });
}, Xf = (n, e) => {
  let t = n;
  return e.split(sc).forEach((r) => {
    t.nextPart.has(r) || t.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(r);
  }), t;
}, R1 = (n) => n.isThemeGetter, _1 = (n, e) => e ? n.map(([t, r]) => {
  const i = r.map((o) => typeof o == "string" ? e + o : typeof o == "object" ? Object.fromEntries(Object.entries(o).map(([s, l]) => [e + s, l])) : o);
  return [t, i];
}) : n, P1 = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const i = (o, s) => {
    t.set(o, s), e++, e > n && (e = 0, r = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(o) {
      let s = t.get(o);
      if (s !== void 0)
        return s;
      if ((s = r.get(o)) !== void 0)
        return i(o, s), s;
    },
    set(o, s) {
      t.has(o) ? t.set(o, s) : i(o, s);
    }
  };
}, ig = "!", $1 = (n) => {
  const {
    separator: e,
    experimentalParseClassName: t
  } = n, r = e.length === 1, i = e[0], o = e.length, s = (l) => {
    const a = [];
    let c = 0, f = 0, u;
    for (let m = 0; m < l.length; m++) {
      let y = l[m];
      if (c === 0) {
        if (y === i && (r || l.slice(m, m + o) === e)) {
          a.push(l.slice(f, m)), f = m + o;
          continue;
        }
        if (y === "/") {
          u = m;
          continue;
        }
      }
      y === "[" ? c++ : y === "]" && c--;
    }
    const h = a.length === 0 ? l : l.substring(f), d = h.startsWith(ig), p = d ? h.substring(1) : h, g = u && u > f ? u - f : void 0;
    return {
      modifiers: a,
      hasImportantModifier: d,
      baseClassName: p,
      maybePostfixModifierPosition: g
    };
  };
  return t ? (l) => t({
    className: l,
    parseClassName: s
  }) : s;
}, L1 = (n) => {
  if (n.length <= 1)
    return n;
  const e = [];
  let t = [];
  return n.forEach((r) => {
    r[0] === "[" ? (e.push(...t.sort(), r), t = []) : t.push(r);
  }), e.push(...t.sort()), e;
}, B1 = (n) => ({
  cache: P1(n.cacheSize),
  parseClassName: $1(n),
  ...N1(n)
}), z1 = /\s+/, F1 = (n, e) => {
  const {
    parseClassName: t,
    getClassGroupId: r,
    getConflictingClassGroupIds: i
  } = e, o = [], s = n.trim().split(z1);
  let l = "";
  for (let a = s.length - 1; a >= 0; a -= 1) {
    const c = s[a], {
      modifiers: f,
      hasImportantModifier: u,
      baseClassName: h,
      maybePostfixModifierPosition: d
    } = t(c);
    let p = !!d, g = r(p ? h.substring(0, d) : h);
    if (!g) {
      if (!p) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (g = r(h), !g) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      p = !1;
    }
    const m = L1(f).join(":"), y = u ? m + ig : m, x = y + g;
    if (o.includes(x))
      continue;
    o.push(x);
    const O = i(g, p);
    for (let N = 0; N < O.length; ++N) {
      const T = O[N];
      o.push(y + T);
    }
    l = c + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function j1() {
  let n = 0, e, t, r = "";
  for (; n < arguments.length; )
    (e = arguments[n++]) && (t = og(e)) && (r && (r += " "), r += t);
  return r;
}
const og = (n) => {
  if (typeof n == "string")
    return n;
  let e, t = "";
  for (let r = 0; r < n.length; r++)
    n[r] && (e = og(n[r])) && (t && (t += " "), t += e);
  return t;
};
function V1(n, ...e) {
  let t, r, i, o = s;
  function s(a) {
    const c = e.reduce((f, u) => u(f), n());
    return t = B1(c), r = t.cache.get, i = t.cache.set, o = l, l(a);
  }
  function l(a) {
    const c = r(a);
    if (c)
      return c;
    const f = F1(a, t);
    return i(a, f), f;
  }
  return function() {
    return o(j1.apply(null, arguments));
  };
}
const W = (n) => {
  const e = (t) => t[n] || [];
  return e.isThemeGetter = !0, e;
}, sg = /^\[(?:([a-z-]+):)?(.+)\]$/i, W1 = /^\d+\/\d+$/, U1 = /* @__PURE__ */ new Set(["px", "full", "screen"]), H1 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, J1 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, K1 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, G1 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, q1 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ft = (n) => zn(n) || U1.has(n) || W1.test(n), Et = (n) => ir(n, "length", rw), zn = (n) => !!n && !Number.isNaN(Number(n)), Ks = (n) => ir(n, "number", zn), pr = (n) => !!n && Number.isInteger(Number(n)), Y1 = (n) => n.endsWith("%") && zn(n.slice(0, -1)), _ = (n) => sg.test(n), At = (n) => H1.test(n), X1 = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Q1 = (n) => ir(n, X1, lg), Z1 = (n) => ir(n, "position", lg), ew = /* @__PURE__ */ new Set(["image", "url"]), tw = (n) => ir(n, ew, ow), nw = (n) => ir(n, "", iw), gr = () => !0, ir = (n, e, t) => {
  const r = sg.exec(n);
  return r ? r[1] ? typeof e == "string" ? r[1] === e : e.has(r[1]) : t(r[2]) : !1;
}, rw = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  J1.test(n) && !K1.test(n)
), lg = () => !1, iw = (n) => G1.test(n), ow = (n) => q1.test(n), sw = () => {
  const n = W("colors"), e = W("spacing"), t = W("blur"), r = W("brightness"), i = W("borderColor"), o = W("borderRadius"), s = W("borderSpacing"), l = W("borderWidth"), a = W("contrast"), c = W("grayscale"), f = W("hueRotate"), u = W("invert"), h = W("gap"), d = W("gradientColorStops"), p = W("gradientColorStopPositions"), g = W("inset"), m = W("margin"), y = W("opacity"), x = W("padding"), O = W("saturate"), N = W("scale"), T = W("sepia"), C = W("skew"), D = W("space"), R = W("translate"), A = () => ["auto", "contain", "none"], Z = () => ["auto", "hidden", "clip", "visible", "scroll"], E = () => ["auto", _, e], k = () => [_, e], $ = () => ["", ft, Et], w = () => ["auto", zn, _], ee = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], z = () => ["solid", "dashed", "dotted", "double", "none"], j = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], le = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], G = () => ["", "0", _], Ot = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], ne = () => [zn, _];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [gr],
      spacing: [ft, Et],
      blur: ["none", "", At, _],
      brightness: ne(),
      borderColor: [n],
      borderRadius: ["none", "", "full", At, _],
      borderSpacing: k(),
      borderWidth: $(),
      contrast: ne(),
      grayscale: G(),
      hueRotate: ne(),
      invert: G(),
      gap: k(),
      gradientColorStops: [n],
      gradientColorStopPositions: [Y1, Et],
      inset: E(),
      margin: E(),
      opacity: ne(),
      padding: k(),
      saturate: ne(),
      scale: ne(),
      sepia: G(),
      skew: ne(),
      space: k(),
      translate: k()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", _]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [At]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": Ot()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Ot()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...ee(), _]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: Z()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Z()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Z()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: A()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": A()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": A()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [g]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [g]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [g]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [g]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [g]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [g]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [g]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [g]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [g]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", pr, _]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: E()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", _]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: G()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: G()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", pr, _]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [gr]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", pr, _]
        }, _]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": w()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": w()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [gr]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [pr, _]
        }, _]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": w()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": w()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", _]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", _]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [h]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [h]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [h]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...le()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...le(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...le(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [x]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [x]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [x]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [x]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [x]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [x]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [x]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [x]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [x]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [m]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [m]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [m]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [m]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [m]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [m]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [m]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [m]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [m]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [D]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [D]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", _, e]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [_, e, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [_, e, "none", "full", "min", "max", "fit", "prose", {
          screen: [At]
        }, At]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [_, e, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [_, e, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [_, e, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [_, e, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", At, Et]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ks]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [gr]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", _]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", zn, Ks]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ft, _]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", _]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", _]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [n]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [y]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [n]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [y]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...z(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ft, Et]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ft, _]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [n]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: k()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", _]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", _]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [y]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...ee(), Z1]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Q1]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, tw]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [n]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [p]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [p]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [p]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [d]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [d]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [d]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [o]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [o]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [o]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [o]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [o]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [o]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [o]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [o]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [o]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [o]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [o]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [o]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [o]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [o]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [o]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [l]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [l]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [l]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [l]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [l]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [l]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [l]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [l]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [l]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [y]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...z(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [l]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [l]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [y]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: z()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [i]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [i]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [i]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [i]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [i]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [i]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [i]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [i]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [i]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [i]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...z()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ft, _]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ft, Et]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [n]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: $()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [n]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [y]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ft, Et]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [n]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", At, nw]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [gr]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [y]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...j(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": j()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [t]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [a]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", At, _]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [u]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [O]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [T]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [t]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [a]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [f]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [u]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [y]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [O]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [T]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [s]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [s]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [s]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", _]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: ne()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", _]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: ne()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", _]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [N]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [N]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [N]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [pr, _]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [R]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [R]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [C]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [C]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", _]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", n]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", _]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [n]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": k()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": k()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": k()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": k()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": k()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": k()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": k()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": k()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": k()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": k()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": k()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": k()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": k()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": k()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": k()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": k()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": k()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": k()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", _]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [n, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ft, Et, Ks]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [n, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, ED = /* @__PURE__ */ V1(sw);
var Wr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ag(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function lw(n) {
  if (n.__esModule) return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(t, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), t;
}
var Qf = Object.prototype.toString, cg = function(e) {
  var t = Qf.call(e), r = t === "[object Arguments]";
  return r || (r = t !== "[object Array]" && e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && Qf.call(e.callee) === "[object Function]"), r;
}, Gs, Zf;
function aw() {
  if (Zf) return Gs;
  Zf = 1;
  var n;
  if (!Object.keys) {
    var e = Object.prototype.hasOwnProperty, t = Object.prototype.toString, r = cg, i = Object.prototype.propertyIsEnumerable, o = !i.call({ toString: null }, "toString"), s = i.call(function() {
    }, "prototype"), l = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ], a = function(h) {
      var d = h.constructor;
      return d && d.prototype === h;
    }, c = {
      $applicationCache: !0,
      $console: !0,
      $external: !0,
      $frame: !0,
      $frameElement: !0,
      $frames: !0,
      $innerHeight: !0,
      $innerWidth: !0,
      $onmozfullscreenchange: !0,
      $onmozfullscreenerror: !0,
      $outerHeight: !0,
      $outerWidth: !0,
      $pageXOffset: !0,
      $pageYOffset: !0,
      $parent: !0,
      $scrollLeft: !0,
      $scrollTop: !0,
      $scrollX: !0,
      $scrollY: !0,
      $self: !0,
      $webkitIndexedDB: !0,
      $webkitStorageInfo: !0,
      $window: !0
    }, f = function() {
      if (typeof window > "u")
        return !1;
      for (var h in window)
        try {
          if (!c["$" + h] && e.call(window, h) && window[h] !== null && typeof window[h] == "object")
            try {
              a(window[h]);
            } catch {
              return !0;
            }
        } catch {
          return !0;
        }
      return !1;
    }(), u = function(h) {
      if (typeof window > "u" || !f)
        return a(h);
      try {
        return a(h);
      } catch {
        return !1;
      }
    };
    n = function(d) {
      var p = d !== null && typeof d == "object", g = t.call(d) === "[object Function]", m = r(d), y = p && t.call(d) === "[object String]", x = [];
      if (!p && !g && !m)
        throw new TypeError("Object.keys called on a non-object");
      var O = s && g;
      if (y && d.length > 0 && !e.call(d, 0))
        for (var N = 0; N < d.length; ++N)
          x.push(String(N));
      if (m && d.length > 0)
        for (var T = 0; T < d.length; ++T)
          x.push(String(T));
      else
        for (var C in d)
          !(O && C === "prototype") && e.call(d, C) && x.push(String(C));
      if (o)
        for (var D = u(d), R = 0; R < l.length; ++R)
          !(D && l[R] === "constructor") && e.call(d, l[R]) && x.push(l[R]);
      return x;
    };
  }
  return Gs = n, Gs;
}
var cw = Array.prototype.slice, fw = cg, eu = Object.keys, Pi = eu ? function(e) {
  return eu(e);
} : aw(), tu = Object.keys;
Pi.shim = function() {
  if (Object.keys) {
    var e = function() {
      var t = Object.keys(arguments);
      return t && t.length === arguments.length;
    }(1, 2);
    e || (Object.keys = function(r) {
      return fw(r) ? tu(cw.call(r)) : tu(r);
    });
  } else
    Object.keys = Pi;
  return Object.keys || Pi;
};
var lc = Pi, uw = Error, hw = EvalError, dw = RangeError, pw = ReferenceError, fg = SyntaxError, Zt = TypeError, gw = URIError, bs = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var e = {}, t = Symbol("test"), r = Object(t);
  if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
    return !1;
  var i = 42;
  e[t] = i;
  for (t in e)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
    return !1;
  var o = Object.getOwnPropertySymbols(e);
  if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var s = Object.getOwnPropertyDescriptor(e, t);
    if (s.value !== i || s.enumerable !== !0)
      return !1;
  }
  return !0;
}, nu = typeof Symbol < "u" && Symbol, mw = bs, ac = function() {
  return typeof nu != "function" || typeof Symbol != "function" || typeof nu("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : mw();
}, qs = {
  __proto__: null,
  foo: {}
}, yw = Object, bw = function() {
  return { __proto__: qs }.foo === qs.foo && !(qs instanceof yw);
}, ww = "Function.prototype.bind called on incompatible ", Sw = Object.prototype.toString, vw = Math.max, Cw = "[object Function]", ru = function(e, t) {
  for (var r = [], i = 0; i < e.length; i += 1)
    r[i] = e[i];
  for (var o = 0; o < t.length; o += 1)
    r[o + e.length] = t[o];
  return r;
}, xw = function(e, t) {
  for (var r = [], i = t, o = 0; i < e.length; i += 1, o += 1)
    r[o] = e[i];
  return r;
}, kw = function(n, e) {
  for (var t = "", r = 0; r < n.length; r += 1)
    t += n[r], r + 1 < n.length && (t += e);
  return t;
}, Ow = function(e) {
  var t = this;
  if (typeof t != "function" || Sw.apply(t) !== Cw)
    throw new TypeError(ww + t);
  for (var r = xw(arguments, 1), i, o = function() {
    if (this instanceof i) {
      var f = t.apply(
        this,
        ru(r, arguments)
      );
      return Object(f) === f ? f : this;
    }
    return t.apply(
      e,
      ru(r, arguments)
    );
  }, s = vw(0, t.length - r.length), l = [], a = 0; a < s; a++)
    l[a] = "$" + a;
  if (i = Function("binder", "return function (" + kw(l, ",") + "){ return binder.apply(this,arguments); }")(o), t.prototype) {
    var c = function() {
    };
    c.prototype = t.prototype, i.prototype = new c(), c.prototype = null;
  }
  return i;
}, Ew = Ow, cc = Function.prototype.bind || Ew, Aw = Function.prototype.call, Tw = Object.prototype.hasOwnProperty, Mw = cc, ug = Mw.call(Aw, Tw), B, Nw = uw, Iw = hw, Dw = dw, Rw = pw, Kn = fg, Fn = Zt, _w = gw, hg = Function, Ys = function(n) {
  try {
    return hg('"use strict"; return (' + n + ").constructor;")();
  } catch {
  }
}, hn = Object.getOwnPropertyDescriptor;
if (hn)
  try {
    hn({}, "");
  } catch {
    hn = null;
  }
var Xs = function() {
  throw new Fn();
}, Pw = hn ? function() {
  try {
    return arguments.callee, Xs;
  } catch {
    try {
      return hn(arguments, "callee").get;
    } catch {
      return Xs;
    }
  }
}() : Xs, An = ac(), $w = bw(), re = Object.getPrototypeOf || ($w ? function(n) {
  return n.__proto__;
} : null), Dn = {}, Lw = typeof Uint8Array > "u" || !re ? B : re(Uint8Array), dn = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? B : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? B : ArrayBuffer,
  "%ArrayIteratorPrototype%": An && re ? re([][Symbol.iterator]()) : B,
  "%AsyncFromSyncIteratorPrototype%": B,
  "%AsyncFunction%": Dn,
  "%AsyncGenerator%": Dn,
  "%AsyncGeneratorFunction%": Dn,
  "%AsyncIteratorPrototype%": Dn,
  "%Atomics%": typeof Atomics > "u" ? B : Atomics,
  "%BigInt%": typeof BigInt > "u" ? B : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? B : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? B : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? B : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Nw,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Iw,
  "%Float32Array%": typeof Float32Array > "u" ? B : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? B : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? B : FinalizationRegistry,
  "%Function%": hg,
  "%GeneratorFunction%": Dn,
  "%Int8Array%": typeof Int8Array > "u" ? B : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? B : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? B : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": An && re ? re(re([][Symbol.iterator]())) : B,
  "%JSON%": typeof JSON == "object" ? JSON : B,
  "%Map%": typeof Map > "u" ? B : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !An || !re ? B : re((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? B : Promise,
  "%Proxy%": typeof Proxy > "u" ? B : Proxy,
  "%RangeError%": Dw,
  "%ReferenceError%": Rw,
  "%Reflect%": typeof Reflect > "u" ? B : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? B : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !An || !re ? B : re((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? B : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": An && re ? re(""[Symbol.iterator]()) : B,
  "%Symbol%": An ? Symbol : B,
  "%SyntaxError%": Kn,
  "%ThrowTypeError%": Pw,
  "%TypedArray%": Lw,
  "%TypeError%": Fn,
  "%Uint8Array%": typeof Uint8Array > "u" ? B : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? B : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? B : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? B : Uint32Array,
  "%URIError%": _w,
  "%WeakMap%": typeof WeakMap > "u" ? B : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? B : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? B : WeakSet
};
if (re)
  try {
    null.error;
  } catch (n) {
    var Bw = re(re(n));
    dn["%Error.prototype%"] = Bw;
  }
var zw = function n(e) {
  var t;
  if (e === "%AsyncFunction%")
    t = Ys("async function () {}");
  else if (e === "%GeneratorFunction%")
    t = Ys("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    t = Ys("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var r = n("%AsyncGeneratorFunction%");
    r && (t = r.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var i = n("%AsyncGenerator%");
    i && re && (t = re(i.prototype));
  }
  return dn[e] = t, t;
}, iu = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, fi = cc, uo = ug, Fw = fi.call(Function.call, Array.prototype.concat), jw = fi.call(Function.apply, Array.prototype.splice), ou = fi.call(Function.call, String.prototype.replace), ho = fi.call(Function.call, String.prototype.slice), Vw = fi.call(Function.call, RegExp.prototype.exec), Ww = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Uw = /\\(\\)?/g, Hw = function(e) {
  var t = ho(e, 0, 1), r = ho(e, -1);
  if (t === "%" && r !== "%")
    throw new Kn("invalid intrinsic syntax, expected closing `%`");
  if (r === "%" && t !== "%")
    throw new Kn("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return ou(e, Ww, function(o, s, l, a) {
    i[i.length] = l ? ou(a, Uw, "$1") : s || o;
  }), i;
}, Jw = function(e, t) {
  var r = e, i;
  if (uo(iu, r) && (i = iu[r], r = "%" + i[0] + "%"), uo(dn, r)) {
    var o = dn[r];
    if (o === Dn && (o = zw(r)), typeof o > "u" && !t)
      throw new Fn("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: r,
      value: o
    };
  }
  throw new Kn("intrinsic " + e + " does not exist!");
}, it = function(e, t) {
  if (typeof e != "string" || e.length === 0)
    throw new Fn("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof t != "boolean")
    throw new Fn('"allowMissing" argument must be a boolean');
  if (Vw(/^%?[^%]*%?$/, e) === null)
    throw new Kn("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = Hw(e), i = r.length > 0 ? r[0] : "", o = Jw("%" + i + "%", t), s = o.name, l = o.value, a = !1, c = o.alias;
  c && (i = c[0], jw(r, Fw([0, 1], c)));
  for (var f = 1, u = !0; f < r.length; f += 1) {
    var h = r[f], d = ho(h, 0, 1), p = ho(h, -1);
    if ((d === '"' || d === "'" || d === "`" || p === '"' || p === "'" || p === "`") && d !== p)
      throw new Kn("property names with quotes must have matching quotes");
    if ((h === "constructor" || !u) && (a = !0), i += "." + h, s = "%" + i + "%", uo(dn, s))
      l = dn[s];
    else if (l != null) {
      if (!(h in l)) {
        if (!t)
          throw new Fn("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (hn && f + 1 >= r.length) {
        var g = hn(l, h);
        u = !!g, u && "get" in g && !("originalValue" in g.get) ? l = g.get : l = l[h];
      } else
        u = uo(l, h), l = l[h];
      u && !a && (dn[s] = l);
    }
  }
  return l;
}, Qs, su;
function fc() {
  if (su) return Qs;
  su = 1;
  var n = it, e = n("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return Qs = e, Qs;
}
var Kw = it, $i = Kw("%Object.getOwnPropertyDescriptor%", !0);
if ($i)
  try {
    $i([], "length");
  } catch {
    $i = null;
  }
var uc = $i, lu = fc(), Gw = fg, Tn = Zt, au = uc, hc = function(e, t, r) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new Tn("`obj` must be an object or a function`");
  if (typeof t != "string" && typeof t != "symbol")
    throw new Tn("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new Tn("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new Tn("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new Tn("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new Tn("`loose`, if provided, must be a boolean");
  var i = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, s = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 ? arguments[6] : !1, a = !!au && au(e, t);
  if (lu)
    lu(e, t, {
      configurable: s === null && a ? a.configurable : !s,
      enumerable: i === null && a ? a.enumerable : !i,
      value: r,
      writable: o === null && a ? a.writable : !o
    });
  else if (l || !i && !o && !s)
    e[t] = r;
  else
    throw new Gw("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Xl = fc(), dg = function() {
  return !!Xl;
};
dg.hasArrayLengthDefineBug = function() {
  if (!Xl)
    return null;
  try {
    return Xl([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var dc = dg, qw = lc, Yw = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", Xw = Object.prototype.toString, Qw = Array.prototype.concat, cu = hc, Zw = function(n) {
  return typeof n == "function" && Xw.call(n) === "[object Function]";
}, pg = dc(), eS = function(n, e, t, r) {
  if (e in n) {
    if (r === !0) {
      if (n[e] === t)
        return;
    } else if (!Zw(r) || !r())
      return;
  }
  pg ? cu(n, e, t, !0) : cu(n, e, t);
}, gg = function(n, e) {
  var t = arguments.length > 2 ? arguments[2] : {}, r = qw(e);
  Yw && (r = Qw.call(r, Object.getOwnPropertySymbols(e)));
  for (var i = 0; i < r.length; i += 1)
    eS(n, r[i], e[r[i]], t[r[i]]);
};
gg.supportsDescriptors = !!pg;
var vn = gg, mg = { exports: {} }, tS = it, fu = hc, nS = dc(), uu = uc, hu = Zt, rS = tS("%Math.floor%"), iS = function(e, t) {
  if (typeof e != "function")
    throw new hu("`fn` is not a function");
  if (typeof t != "number" || t < 0 || t > 4294967295 || rS(t) !== t)
    throw new hu("`length` must be a positive 32-bit integer");
  var r = arguments.length > 2 && !!arguments[2], i = !0, o = !0;
  if ("length" in e && uu) {
    var s = uu(e, "length");
    s && !s.configurable && (i = !1), s && !s.writable && (o = !1);
  }
  return (i || o || !r) && (nS ? fu(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    t,
    !0,
    !0
  ) : fu(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    t
  )), e;
};
(function(n) {
  var e = cc, t = it, r = iS, i = Zt, o = t("%Function.prototype.apply%"), s = t("%Function.prototype.call%"), l = t("%Reflect.apply%", !0) || e.call(s, o), a = fc(), c = t("%Math.max%");
  n.exports = function(h) {
    if (typeof h != "function")
      throw new i("a function is required");
    var d = l(e, s, arguments);
    return r(
      d,
      1 + c(0, h.length - (arguments.length - 1)),
      !0
    );
  };
  var f = function() {
    return l(e, o, arguments);
  };
  a ? a(n.exports, "apply", { value: f }) : n.exports.apply = f;
})(mg);
var or = mg.exports, yg = it, bg = or, oS = bg(yg("String.prototype.indexOf")), $e = function(e, t) {
  var r = yg(e, !!t);
  return typeof r == "function" && oS(e, ".prototype.") > -1 ? bg(r) : r;
}, sS = lc, wg = bs(), Sg = $e, du = Object, lS = Sg("Array.prototype.push"), pu = Sg("Object.prototype.propertyIsEnumerable"), aS = wg ? Object.getOwnPropertySymbols : null, vg = function(e, t) {
  if (e == null)
    throw new TypeError("target must be an object");
  var r = du(e);
  if (arguments.length === 1)
    return r;
  for (var i = 1; i < arguments.length; ++i) {
    var o = du(arguments[i]), s = sS(o), l = wg && (Object.getOwnPropertySymbols || aS);
    if (l)
      for (var a = l(o), c = 0; c < a.length; ++c) {
        var f = a[c];
        pu(o, f) && lS(s, f);
      }
    for (var u = 0; u < s.length; ++u) {
      var h = s[u];
      if (pu(o, h)) {
        var d = o[h];
        r[h] = d;
      }
    }
  }
  return r;
}, Zs = vg, cS = function() {
  if (!Object.assign)
    return !1;
  for (var n = "abcdefghijklmnopqrst", e = n.split(""), t = {}, r = 0; r < e.length; ++r)
    t[e[r]] = e[r];
  var i = Object.assign({}, t), o = "";
  for (var s in i)
    o += s;
  return n !== o;
}, fS = function() {
  if (!Object.assign || !Object.preventExtensions)
    return !1;
  var n = Object.preventExtensions({ 1: 2 });
  try {
    Object.assign(n, "xy");
  } catch {
    return n[1] === "y";
  }
  return !1;
}, Cg = function() {
  return !Object.assign || cS() || fS() ? Zs : Object.assign;
}, uS = vn, hS = Cg, dS = function() {
  var e = hS();
  return uS(
    Object,
    { assign: e },
    { assign: function() {
      return Object.assign !== e;
    } }
  ), e;
}, pS = vn, gS = or, mS = vg, xg = Cg, yS = dS, bS = gS.apply(xg()), kg = function(e, t) {
  return bS(Object, arguments);
};
pS(kg, {
  getPolyfill: xg,
  implementation: mS,
  shim: yS
});
var wS = kg, Ur = function() {
  return typeof (function() {
  }).name == "string";
}, Tr = Object.getOwnPropertyDescriptor;
if (Tr)
  try {
    Tr([], "length");
  } catch {
    Tr = null;
  }
Ur.functionsHaveConfigurableNames = function() {
  if (!Ur() || !Tr)
    return !1;
  var e = Tr(function() {
  }, "name");
  return !!e && !!e.configurable;
};
var SS = Function.prototype.bind;
Ur.boundFunctionsHaveNames = function() {
  return Ur() && typeof SS == "function" && (function() {
  }).bind().name !== "";
};
var vS = Ur, gu = hc, CS = dc(), xS = vS.functionsHaveConfigurableNames(), kS = Zt, OS = function(e, t) {
  if (typeof e != "function")
    throw new kS("`fn` is not a function");
  var r = arguments.length > 2 && !!arguments[2];
  return (!r || xS) && (CS ? gu(
    /** @type {Parameters<define>[0]} */
    e,
    "name",
    t,
    !0,
    !0
  ) : gu(
    /** @type {Parameters<define>[0]} */
    e,
    "name",
    t
  )), e;
}, ES = OS, AS = Zt, TS = Object, Og = ES(function() {
  if (this == null || this !== TS(this))
    throw new AS("RegExp.prototype.flags getter called on non-object");
  var e = "";
  return this.hasIndices && (e += "d"), this.global && (e += "g"), this.ignoreCase && (e += "i"), this.multiline && (e += "m"), this.dotAll && (e += "s"), this.unicode && (e += "u"), this.unicodeSets && (e += "v"), this.sticky && (e += "y"), e;
}, "get flags", !0), MS = Og, NS = vn.supportsDescriptors, IS = Object.getOwnPropertyDescriptor, Eg = function() {
  if (NS && /a/mig.flags === "gim") {
    var e = IS(RegExp.prototype, "flags");
    if (e && typeof e.get == "function" && typeof RegExp.prototype.dotAll == "boolean" && typeof RegExp.prototype.hasIndices == "boolean") {
      var t = "", r = {};
      if (Object.defineProperty(r, "hasIndices", {
        get: function() {
          t += "d";
        }
      }), Object.defineProperty(r, "sticky", {
        get: function() {
          t += "y";
        }
      }), t === "dy")
        return e.get;
    }
  }
  return MS;
}, DS = vn.supportsDescriptors, RS = Eg, _S = Object.getOwnPropertyDescriptor, PS = Object.defineProperty, $S = TypeError, mu = Object.getPrototypeOf, LS = /a/, BS = function() {
  if (!DS || !mu)
    throw new $S("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
  var e = RS(), t = mu(LS), r = _S(t, "flags");
  return (!r || r.get !== e) && PS(t, "flags", {
    configurable: !0,
    enumerable: !1,
    get: e
  }), e;
}, zS = vn, FS = or, jS = Og, Ag = Eg, VS = BS, Tg = FS(Ag());
zS(Tg, {
  getPolyfill: Ag,
  implementation: jS,
  shim: VS
});
var WS = Tg, Li = { exports: {} }, US = bs, Cn = function() {
  return US() && !!Symbol.toStringTag;
}, HS = Cn(), JS = $e, Ql = JS("Object.prototype.toString"), ws = function(e) {
  return HS && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : Ql(e) === "[object Arguments]";
}, Mg = function(e) {
  return ws(e) ? !0 : e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && Ql(e) !== "[object Array]" && Ql(e.callee) === "[object Function]";
}, KS = function() {
  return ws(arguments);
}();
ws.isLegacyArguments = Mg;
var Ng = KS ? ws : Mg;
const GS = {}, qS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GS
}, Symbol.toStringTag, { value: "Module" })), YS = /* @__PURE__ */ lw(qS);
var pc = typeof Map == "function" && Map.prototype, el = Object.getOwnPropertyDescriptor && pc ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, po = pc && el && typeof el.get == "function" ? el.get : null, yu = pc && Map.prototype.forEach, gc = typeof Set == "function" && Set.prototype, tl = Object.getOwnPropertyDescriptor && gc ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, go = gc && tl && typeof tl.get == "function" ? tl.get : null, bu = gc && Set.prototype.forEach, XS = typeof WeakMap == "function" && WeakMap.prototype, Mr = XS ? WeakMap.prototype.has : null, QS = typeof WeakSet == "function" && WeakSet.prototype, Nr = QS ? WeakSet.prototype.has : null, ZS = typeof WeakRef == "function" && WeakRef.prototype, wu = ZS ? WeakRef.prototype.deref : null, ev = Boolean.prototype.valueOf, tv = Object.prototype.toString, nv = Function.prototype.toString, rv = String.prototype.match, mc = String.prototype.slice, Vt = String.prototype.replace, iv = String.prototype.toUpperCase, Su = String.prototype.toLowerCase, Ig = RegExp.prototype.test, vu = Array.prototype.concat, qe = Array.prototype.join, ov = Array.prototype.slice, Cu = Math.floor, Zl = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, nl = Object.getOwnPropertySymbols, ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Gn = typeof Symbol == "function" && typeof Symbol.iterator == "object", ye = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Gn || !0) ? Symbol.toStringTag : null, Dg = Object.prototype.propertyIsEnumerable, xu = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(n) {
  return n.__proto__;
} : null);
function ku(n, e) {
  if (n === 1 / 0 || n === -1 / 0 || n !== n || n && n > -1e3 && n < 1e3 || Ig.call(/e/, e))
    return e;
  var t = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof n == "number") {
    var r = n < 0 ? -Cu(-n) : Cu(n);
    if (r !== n) {
      var i = String(r), o = mc.call(e, i.length + 1);
      return Vt.call(i, t, "$&_") + "." + Vt.call(Vt.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Vt.call(e, t, "$&_");
}
var ta = YS, Ou = ta.custom, Eu = _g(Ou) ? Ou : null, sv = function n(e, t, r, i) {
  var o = t || {};
  if (It(o, "quoteStyle") && o.quoteStyle !== "single" && o.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (It(o, "maxStringLength") && (typeof o.maxStringLength == "number" ? o.maxStringLength < 0 && o.maxStringLength !== 1 / 0 : o.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var s = It(o, "customInspect") ? o.customInspect : !0;
  if (typeof s != "boolean" && s !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (It(o, "indent") && o.indent !== null && o.indent !== "	" && !(parseInt(o.indent, 10) === o.indent && o.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (It(o, "numericSeparator") && typeof o.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var l = o.numericSeparator;
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "boolean")
    return e ? "true" : "false";
  if (typeof e == "string")
    return $g(e, o);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var a = String(e);
    return l ? ku(e, a) : a;
  }
  if (typeof e == "bigint") {
    var c = String(e) + "n";
    return l ? ku(e, c) : c;
  }
  var f = typeof o.depth > "u" ? 5 : o.depth;
  if (typeof r > "u" && (r = 0), r >= f && f > 0 && typeof e == "object")
    return na(e) ? "[Array]" : "[Object]";
  var u = kv(o, r);
  if (typeof i > "u")
    i = [];
  else if (Pg(i, e) >= 0)
    return "[Circular]";
  function h($, w, ee) {
    if (w && (i = ov.call(i), i.push(w)), ee) {
      var z = {
        depth: o.depth
      };
      return It(o, "quoteStyle") && (z.quoteStyle = o.quoteStyle), n($, z, r + 1, i);
    }
    return n($, o, r + 1, i);
  }
  if (typeof e == "function" && !Au(e)) {
    var d = gv(e), p = mi(e, h);
    return "[Function" + (d ? ": " + d : " (anonymous)") + "]" + (p.length > 0 ? " { " + qe.call(p, ", ") + " }" : "");
  }
  if (_g(e)) {
    var g = Gn ? Vt.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : ea.call(e);
    return typeof e == "object" && !Gn ? mr(g) : g;
  }
  if (vv(e)) {
    for (var m = "<" + Su.call(String(e.nodeName)), y = e.attributes || [], x = 0; x < y.length; x++)
      m += " " + y[x].name + "=" + Rg(lv(y[x].value), "double", o);
    return m += ">", e.childNodes && e.childNodes.length && (m += "..."), m += "</" + Su.call(String(e.nodeName)) + ">", m;
  }
  if (na(e)) {
    if (e.length === 0)
      return "[]";
    var O = mi(e, h);
    return u && !xv(O) ? "[" + ra(O, u) + "]" : "[ " + qe.call(O, ", ") + " ]";
  }
  if (cv(e)) {
    var N = mi(e, h);
    return !("cause" in Error.prototype) && "cause" in e && !Dg.call(e, "cause") ? "{ [" + String(e) + "] " + qe.call(vu.call("[cause]: " + h(e.cause), N), ", ") + " }" : N.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + qe.call(N, ", ") + " }";
  }
  if (typeof e == "object" && s) {
    if (Eu && typeof e[Eu] == "function" && ta)
      return ta(e, { depth: f - r });
    if (s !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (mv(e)) {
    var T = [];
    return yu && yu.call(e, function($, w) {
      T.push(h(w, e, !0) + " => " + h($, e));
    }), Tu("Map", po.call(e), T, u);
  }
  if (wv(e)) {
    var C = [];
    return bu && bu.call(e, function($) {
      C.push(h($, e));
    }), Tu("Set", go.call(e), C, u);
  }
  if (yv(e))
    return rl("WeakMap");
  if (Sv(e))
    return rl("WeakSet");
  if (bv(e))
    return rl("WeakRef");
  if (uv(e))
    return mr(h(Number(e)));
  if (dv(e))
    return mr(h(Zl.call(e)));
  if (hv(e))
    return mr(ev.call(e));
  if (fv(e))
    return mr(h(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof Wr < "u" && e === Wr)
    return "{ [object globalThis] }";
  if (!av(e) && !Au(e)) {
    var D = mi(e, h), R = xu ? xu(e) === Object.prototype : e instanceof Object || e.constructor === Object, A = e instanceof Object ? "" : "null prototype", Z = !R && ye && Object(e) === e && ye in e ? mc.call(en(e), 8, -1) : A ? "Object" : "", E = R || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", k = E + (Z || A ? "[" + qe.call(vu.call([], Z || [], A || []), ": ") + "] " : "");
    return D.length === 0 ? k + "{}" : u ? k + "{" + ra(D, u) + "}" : k + "{ " + qe.call(D, ", ") + " }";
  }
  return String(e);
};
function Rg(n, e, t) {
  var r = (t.quoteStyle || e) === "double" ? '"' : "'";
  return r + n + r;
}
function lv(n) {
  return Vt.call(String(n), /"/g, "&quot;");
}
function na(n) {
  return en(n) === "[object Array]" && (!ye || !(typeof n == "object" && ye in n));
}
function av(n) {
  return en(n) === "[object Date]" && (!ye || !(typeof n == "object" && ye in n));
}
function Au(n) {
  return en(n) === "[object RegExp]" && (!ye || !(typeof n == "object" && ye in n));
}
function cv(n) {
  return en(n) === "[object Error]" && (!ye || !(typeof n == "object" && ye in n));
}
function fv(n) {
  return en(n) === "[object String]" && (!ye || !(typeof n == "object" && ye in n));
}
function uv(n) {
  return en(n) === "[object Number]" && (!ye || !(typeof n == "object" && ye in n));
}
function hv(n) {
  return en(n) === "[object Boolean]" && (!ye || !(typeof n == "object" && ye in n));
}
function _g(n) {
  if (Gn)
    return n && typeof n == "object" && n instanceof Symbol;
  if (typeof n == "symbol")
    return !0;
  if (!n || typeof n != "object" || !ea)
    return !1;
  try {
    return ea.call(n), !0;
  } catch {
  }
  return !1;
}
function dv(n) {
  if (!n || typeof n != "object" || !Zl)
    return !1;
  try {
    return Zl.call(n), !0;
  } catch {
  }
  return !1;
}
var pv = Object.prototype.hasOwnProperty || function(n) {
  return n in this;
};
function It(n, e) {
  return pv.call(n, e);
}
function en(n) {
  return tv.call(n);
}
function gv(n) {
  if (n.name)
    return n.name;
  var e = rv.call(nv.call(n), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function Pg(n, e) {
  if (n.indexOf)
    return n.indexOf(e);
  for (var t = 0, r = n.length; t < r; t++)
    if (n[t] === e)
      return t;
  return -1;
}
function mv(n) {
  if (!po || !n || typeof n != "object")
    return !1;
  try {
    po.call(n);
    try {
      go.call(n);
    } catch {
      return !0;
    }
    return n instanceof Map;
  } catch {
  }
  return !1;
}
function yv(n) {
  if (!Mr || !n || typeof n != "object")
    return !1;
  try {
    Mr.call(n, Mr);
    try {
      Nr.call(n, Nr);
    } catch {
      return !0;
    }
    return n instanceof WeakMap;
  } catch {
  }
  return !1;
}
function bv(n) {
  if (!wu || !n || typeof n != "object")
    return !1;
  try {
    return wu.call(n), !0;
  } catch {
  }
  return !1;
}
function wv(n) {
  if (!go || !n || typeof n != "object")
    return !1;
  try {
    go.call(n);
    try {
      po.call(n);
    } catch {
      return !0;
    }
    return n instanceof Set;
  } catch {
  }
  return !1;
}
function Sv(n) {
  if (!Nr || !n || typeof n != "object")
    return !1;
  try {
    Nr.call(n, Nr);
    try {
      Mr.call(n, Mr);
    } catch {
      return !0;
    }
    return n instanceof WeakSet;
  } catch {
  }
  return !1;
}
function vv(n) {
  return !n || typeof n != "object" ? !1 : typeof HTMLElement < "u" && n instanceof HTMLElement ? !0 : typeof n.nodeName == "string" && typeof n.getAttribute == "function";
}
function $g(n, e) {
  if (n.length > e.maxStringLength) {
    var t = n.length - e.maxStringLength, r = "... " + t + " more character" + (t > 1 ? "s" : "");
    return $g(mc.call(n, 0, e.maxStringLength), e) + r;
  }
  var i = Vt.call(Vt.call(n, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Cv);
  return Rg(i, "single", e);
}
function Cv(n) {
  var e = n.charCodeAt(0), t = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return t ? "\\" + t : "\\x" + (e < 16 ? "0" : "") + iv.call(e.toString(16));
}
function mr(n) {
  return "Object(" + n + ")";
}
function rl(n) {
  return n + " { ? }";
}
function Tu(n, e, t, r) {
  var i = r ? ra(t, r) : qe.call(t, ", ");
  return n + " (" + e + ") {" + i + "}";
}
function xv(n) {
  for (var e = 0; e < n.length; e++)
    if (Pg(n[e], `
`) >= 0)
      return !1;
  return !0;
}
function kv(n, e) {
  var t;
  if (n.indent === "	")
    t = "	";
  else if (typeof n.indent == "number" && n.indent > 0)
    t = qe.call(Array(n.indent + 1), " ");
  else
    return null;
  return {
    base: t,
    prev: qe.call(Array(e + 1), t)
  };
}
function ra(n, e) {
  if (n.length === 0)
    return "";
  var t = `
` + e.prev + e.base;
  return t + qe.call(n, "," + t) + `
` + e.prev;
}
function mi(n, e) {
  var t = na(n), r = [];
  if (t) {
    r.length = n.length;
    for (var i = 0; i < n.length; i++)
      r[i] = It(n, i) ? e(n[i], n) : "";
  }
  var o = typeof nl == "function" ? nl(n) : [], s;
  if (Gn) {
    s = {};
    for (var l = 0; l < o.length; l++)
      s["$" + o[l]] = o[l];
  }
  for (var a in n)
    It(n, a) && (t && String(Number(a)) === a && a < n.length || Gn && s["$" + a] instanceof Symbol || (Ig.call(/[^\w$]/, a) ? r.push(e(a, n) + ": " + e(n[a], n)) : r.push(a + ": " + e(n[a], n))));
  if (typeof nl == "function")
    for (var c = 0; c < o.length; c++)
      Dg.call(n, o[c]) && r.push("[" + e(o[c]) + "]: " + e(n[o[c]], n));
  return r;
}
var Lg = it, sr = $e, Ov = sv, Ev = Zt, yi = Lg("%WeakMap%", !0), bi = Lg("%Map%", !0), Av = sr("WeakMap.prototype.get", !0), Tv = sr("WeakMap.prototype.set", !0), Mv = sr("WeakMap.prototype.has", !0), Nv = sr("Map.prototype.get", !0), Iv = sr("Map.prototype.set", !0), Dv = sr("Map.prototype.has", !0), yc = function(n, e) {
  for (var t = n, r; (r = t.next) !== null; t = r)
    if (r.key === e)
      return t.next = r.next, r.next = /** @type {NonNullable<typeof list.next>} */
      n.next, n.next = r, r;
}, Rv = function(n, e) {
  var t = yc(n, e);
  return t && t.value;
}, _v = function(n, e, t) {
  var r = yc(n, e);
  r ? r.value = t : n.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: n.next,
    value: t
  };
}, Pv = function(n, e) {
  return !!yc(n, e);
}, Bg = function() {
  var e, t, r, i = {
    assert: function(o) {
      if (!i.has(o))
        throw new Ev("Side channel does not contain " + Ov(o));
    },
    get: function(o) {
      if (yi && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return Av(e, o);
      } else if (bi) {
        if (t)
          return Nv(t, o);
      } else if (r)
        return Rv(r, o);
    },
    has: function(o) {
      if (yi && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return Mv(e, o);
      } else if (bi) {
        if (t)
          return Dv(t, o);
      } else if (r)
        return Pv(r, o);
      return !1;
    },
    set: function(o, s) {
      yi && o && (typeof o == "object" || typeof o == "function") ? (e || (e = new yi()), Tv(e, o, s)) : bi ? (t || (t = new bi()), Iv(t, o, s)) : (r || (r = { key: {}, next: null }), _v(r, o, s));
    }
  };
  return i;
}, $v = ug, yr = Bg(), ut = Zt, bc = {
  assert: function(n, e) {
    if (!n || typeof n != "object" && typeof n != "function")
      throw new ut("`O` is not an object");
    if (typeof e != "string")
      throw new ut("`slot` must be a string");
    if (yr.assert(n), !bc.has(n, e))
      throw new ut("`" + e + "` is not present on `O`");
  },
  get: function(n, e) {
    if (!n || typeof n != "object" && typeof n != "function")
      throw new ut("`O` is not an object");
    if (typeof e != "string")
      throw new ut("`slot` must be a string");
    var t = yr.get(n);
    return t && t["$" + e];
  },
  has: function(n, e) {
    if (!n || typeof n != "object" && typeof n != "function")
      throw new ut("`O` is not an object");
    if (typeof e != "string")
      throw new ut("`slot` must be a string");
    var t = yr.get(n);
    return !!t && $v(t, "$" + e);
  },
  set: function(n, e, t) {
    if (!n || typeof n != "object" && typeof n != "function")
      throw new ut("`O` is not an object");
    if (typeof e != "string")
      throw new ut("`slot` must be a string");
    var r = yr.get(n);
    r || (r = {}, yr.set(n, r)), r["$" + e] = t;
  }
};
Object.freeze && Object.freeze(bc);
var Lv = bc, br = Lv, Bv = SyntaxError, Mu = typeof StopIteration == "object" ? StopIteration : null, zv = function(e) {
  if (!Mu)
    throw new Bv("this environment lacks StopIteration");
  br.set(e, "[[Done]]", !1);
  var t = {
    next: function() {
      var i = br.get(this, "[[Iterator]]"), o = br.get(i, "[[Done]]");
      try {
        return {
          done: o,
          value: o ? void 0 : i.next()
        };
      } catch (s) {
        if (br.set(i, "[[Done]]", !0), s !== Mu)
          throw s;
        return {
          done: !0,
          value: void 0
        };
      }
    }
  };
  return br.set(t, "[[Iterator]]", e), t;
}, Fv = {}.toString, zg = Array.isArray || function(n) {
  return Fv.call(n) == "[object Array]";
}, jv = String.prototype.valueOf, Vv = function(e) {
  try {
    return jv.call(e), !0;
  } catch {
    return !1;
  }
}, Wv = Object.prototype.toString, Uv = "[object String]", Hv = Cn(), Fg = function(e) {
  return typeof e == "string" ? !0 : typeof e != "object" ? !1 : Hv ? Vv(e) : Wv.call(e) === Uv;
}, wc = typeof Map == "function" && Map.prototype ? Map : null, Jv = typeof Set == "function" && Set.prototype ? Set : null, mo;
wc || (mo = function(e) {
  return !1;
});
var jg = wc ? Map.prototype.has : null, Nu = Jv ? Set.prototype.has : null;
!mo && !jg && (mo = function(e) {
  return !1;
});
var Vg = mo || function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    if (jg.call(e), Nu)
      try {
        Nu.call(e);
      } catch {
        return !0;
      }
    return e instanceof wc;
  } catch {
  }
  return !1;
}, Kv = typeof Map == "function" && Map.prototype ? Map : null, Sc = typeof Set == "function" && Set.prototype ? Set : null, yo;
Sc || (yo = function(e) {
  return !1;
});
var Iu = Kv ? Map.prototype.has : null, Wg = Sc ? Set.prototype.has : null;
!yo && !Wg && (yo = function(e) {
  return !1;
});
var Ug = yo || function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    if (Wg.call(e), Iu)
      try {
        Iu.call(e);
      } catch {
        return !0;
      }
    return e instanceof Sc;
  } catch {
  }
  return !1;
}, Du = Ng, Ru = zv;
if (ac() || bs()) {
  var il = Symbol.iterator;
  Li.exports = function(e) {
    if (e != null && typeof e[il] < "u")
      return e[il]();
    if (Du(e))
      return Array.prototype[il].call(e);
  };
} else {
  var Gv = zg, qv = Fg, _u = it, Yv = _u("%Map%", !0), Xv = _u("%Set%", !0), Le = $e, Pu = Le("Array.prototype.push"), $u = Le("String.prototype.charCodeAt"), Qv = Le("String.prototype.slice"), Zv = function(e, t) {
    var r = e.length;
    if (t + 1 >= r)
      return t + 1;
    var i = $u(e, t);
    if (i < 55296 || i > 56319)
      return t + 1;
    var o = $u(e, t + 1);
    return o < 56320 || o > 57343 ? t + 1 : t + 2;
  }, ol = function(e) {
    var t = 0;
    return {
      next: function() {
        var i = t >= e.length, o;
        return i || (o = e[t], t += 1), {
          done: i,
          value: o
        };
      }
    };
  }, Lu = function(e, t) {
    if (Gv(e) || Du(e))
      return ol(e);
    if (qv(e)) {
      var r = 0;
      return {
        next: function() {
          var o = Zv(e, r), s = Qv(e, r, o);
          return r = o, {
            done: o > e.length,
            value: s
          };
        }
      };
    }
    if (t && typeof e["_es6-shim iterator_"] < "u")
      return e["_es6-shim iterator_"]();
  };
  if (!Yv && !Xv)
    Li.exports = function(e) {
      if (e != null)
        return Lu(e, !0);
    };
  else {
    var eC = Vg, tC = Ug, Bu = Le("Map.prototype.forEach", !0), zu = Le("Set.prototype.forEach", !0);
    if (typeof process > "u" || !process.versions || !process.versions.node)
      var Fu = Le("Map.prototype.iterator", !0), ju = Le("Set.prototype.iterator", !0);
    var Vu = Le("Map.prototype.@@iterator", !0) || Le("Map.prototype._es6-shim iterator_", !0), Wu = Le("Set.prototype.@@iterator", !0) || Le("Set.prototype._es6-shim iterator_", !0), nC = function(e) {
      if (eC(e)) {
        if (Fu)
          return Ru(Fu(e));
        if (Vu)
          return Vu(e);
        if (Bu) {
          var t = [];
          return Bu(e, function(i, o) {
            Pu(t, [o, i]);
          }), ol(t);
        }
      }
      if (tC(e)) {
        if (ju)
          return Ru(ju(e));
        if (Wu)
          return Wu(e);
        if (zu) {
          var r = [];
          return zu(e, function(i) {
            Pu(r, i);
          }), ol(r);
        }
      }
    };
    Li.exports = function(e) {
      return nC(e) || Lu(e);
    };
  }
}
var rC = Li.exports, Uu = function(n) {
  return n !== n;
}, Hg = function(e, t) {
  return e === 0 && t === 0 ? 1 / e === 1 / t : !!(e === t || Uu(e) && Uu(t));
}, iC = Hg, Jg = function() {
  return typeof Object.is == "function" ? Object.is : iC;
}, oC = Jg, sC = vn, lC = function() {
  var e = oC();
  return sC(Object, { is: e }, {
    is: function() {
      return Object.is !== e;
    }
  }), e;
}, aC = vn, cC = or, fC = Hg, Kg = Jg, uC = lC, Gg = cC(Kg(), Object);
aC(Gg, {
  getPolyfill: Kg,
  implementation: fC,
  shim: uC
});
var hC = Gg, dC = or, qg = $e, pC = it, ia = pC("%ArrayBuffer%", !0), Bi = qg("ArrayBuffer.prototype.byteLength", !0), gC = qg("Object.prototype.toString"), Hu = !!ia && !Bi && new ia(0).slice, Ju = !!Hu && dC(Hu), Yg = Bi || Ju ? function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    return Bi ? Bi(e) : Ju(e, 0), !0;
  } catch {
    return !1;
  }
} : ia ? function(e) {
  return gC(e) === "[object ArrayBuffer]";
} : function(e) {
  return !1;
}, mC = Date.prototype.getDay, yC = function(e) {
  try {
    return mC.call(e), !0;
  } catch {
    return !1;
  }
}, bC = Object.prototype.toString, wC = "[object Date]", SC = Cn(), vC = function(e) {
  return typeof e != "object" || e === null ? !1 : SC ? yC(e) : bC.call(e) === wC;
}, oa = $e, Xg = Cn(), Qg, Zg, sa, la;
if (Xg) {
  Qg = oa("Object.prototype.hasOwnProperty"), Zg = oa("RegExp.prototype.exec"), sa = {};
  var sl = function() {
    throw sa;
  };
  la = {
    toString: sl,
    valueOf: sl
  }, typeof Symbol.toPrimitive == "symbol" && (la[Symbol.toPrimitive] = sl);
}
var CC = oa("Object.prototype.toString"), xC = Object.getOwnPropertyDescriptor, kC = "[object RegExp]", OC = Xg ? function(e) {
  if (!e || typeof e != "object")
    return !1;
  var t = xC(e, "lastIndex"), r = t && Qg(t, "value");
  if (!r)
    return !1;
  try {
    Zg(e, la);
  } catch (i) {
    return i === sa;
  }
} : function(e) {
  return !e || typeof e != "object" && typeof e != "function" ? !1 : CC(e) === kC;
}, EC = $e, Ku = EC("SharedArrayBuffer.prototype.byteLength", !0), AC = Ku ? function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    return Ku(e), !0;
  } catch {
    return !1;
  }
} : function(e) {
  return !1;
}, TC = Number.prototype.toString, MC = function(e) {
  try {
    return TC.call(e), !0;
  } catch {
    return !1;
  }
}, NC = Object.prototype.toString, IC = "[object Number]", DC = Cn(), RC = function(e) {
  return typeof e == "number" ? !0 : typeof e != "object" ? !1 : DC ? MC(e) : NC.call(e) === IC;
}, em = $e, _C = em("Boolean.prototype.toString"), PC = em("Object.prototype.toString"), $C = function(e) {
  try {
    return _C(e), !0;
  } catch {
    return !1;
  }
}, LC = "[object Boolean]", BC = Cn(), zC = function(e) {
  return typeof e == "boolean" ? !0 : e === null || typeof e != "object" ? !1 : BC && Symbol.toStringTag in e ? $C(e) : PC(e) === LC;
}, aa = { exports: {} }, FC = Object.prototype.toString, jC = ac();
if (jC) {
  var VC = Symbol.prototype.toString, WC = /^Symbol\(.*\)$/, UC = function(e) {
    return typeof e.valueOf() != "symbol" ? !1 : WC.test(VC.call(e));
  };
  aa.exports = function(e) {
    if (typeof e == "symbol")
      return !0;
    if (FC.call(e) !== "[object Symbol]")
      return !1;
    try {
      return UC(e);
    } catch {
      return !1;
    }
  };
} else
  aa.exports = function(e) {
    return !1;
  };
var HC = aa.exports, ca = { exports: {} }, Gu = typeof BigInt < "u" && BigInt, JC = function() {
  return typeof Gu == "function" && typeof BigInt == "function" && typeof Gu(42) == "bigint" && typeof BigInt(42) == "bigint";
}, KC = JC();
if (KC) {
  var GC = BigInt.prototype.valueOf, qC = function(e) {
    try {
      return GC.call(e), !0;
    } catch {
    }
    return !1;
  };
  ca.exports = function(e) {
    return e === null || typeof e > "u" || typeof e == "boolean" || typeof e == "string" || typeof e == "number" || typeof e == "symbol" || typeof e == "function" ? !1 : typeof e == "bigint" ? !0 : qC(e);
  };
} else
  ca.exports = function(e) {
    return !1;
  };
var YC = ca.exports, XC = Fg, QC = RC, ZC = zC, ex = HC, tx = YC, nx = function(e) {
  if (e == null || typeof e != "object" && typeof e != "function")
    return null;
  if (XC(e))
    return "String";
  if (QC(e))
    return "Number";
  if (ZC(e))
    return "Boolean";
  if (ex(e))
    return "Symbol";
  if (tx(e))
    return "BigInt";
}, bo = typeof WeakMap == "function" && WeakMap.prototype ? WeakMap : null, qu = typeof WeakSet == "function" && WeakSet.prototype ? WeakSet : null, wo;
bo || (wo = function(e) {
  return !1;
});
var fa = bo ? bo.prototype.has : null, ll = qu ? qu.prototype.has : null;
!wo && !fa && (wo = function(e) {
  return !1;
});
var rx = wo || function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    if (fa.call(e, fa), ll)
      try {
        ll.call(e, ll);
      } catch {
        return !0;
      }
    return e instanceof bo;
  } catch {
  }
  return !1;
}, ua = { exports: {} }, ix = it, tm = $e, ox = ix("%WeakSet%", !0), al = tm("WeakSet.prototype.has", !0);
if (al) {
  var cl = tm("WeakMap.prototype.has", !0);
  ua.exports = function(e) {
    if (!e || typeof e != "object")
      return !1;
    try {
      if (al(e, al), cl)
        try {
          cl(e, cl);
        } catch {
          return !0;
        }
      return e instanceof ox;
    } catch {
    }
    return !1;
  };
} else
  ua.exports = function(e) {
    return !1;
  };
var sx = ua.exports, lx = Vg, ax = Ug, cx = rx, fx = sx, ux = function(e) {
  if (e && typeof e == "object") {
    if (lx(e))
      return "Map";
    if (ax(e))
      return "Set";
    if (cx(e))
      return "WeakMap";
    if (fx(e))
      return "WeakSet";
  }
  return !1;
}, nm = Function.prototype.toString, Pn = typeof Reflect == "object" && Reflect !== null && Reflect.apply, ha, zi;
if (typeof Pn == "function" && typeof Object.defineProperty == "function")
  try {
    ha = Object.defineProperty({}, "length", {
      get: function() {
        throw zi;
      }
    }), zi = {}, Pn(function() {
      throw 42;
    }, null, ha);
  } catch (n) {
    n !== zi && (Pn = null);
  }
else
  Pn = null;
var hx = /^\s*class\b/, da = function(e) {
  try {
    var t = nm.call(e);
    return hx.test(t);
  } catch {
    return !1;
  }
}, fl = function(e) {
  try {
    return da(e) ? !1 : (nm.call(e), !0);
  } catch {
    return !1;
  }
}, Fi = Object.prototype.toString, dx = "[object Object]", px = "[object Function]", gx = "[object GeneratorFunction]", mx = "[object HTMLAllCollection]", yx = "[object HTML document.all class]", bx = "[object HTMLCollection]", wx = typeof Symbol == "function" && !!Symbol.toStringTag, Sx = !(0 in [,]), pa = function() {
  return !1;
};
if (typeof document == "object") {
  var vx = document.all;
  Fi.call(vx) === Fi.call(document.all) && (pa = function(e) {
    if ((Sx || !e) && (typeof e > "u" || typeof e == "object"))
      try {
        var t = Fi.call(e);
        return (t === mx || t === yx || t === bx || t === dx) && e("") == null;
      } catch {
      }
    return !1;
  });
}
var Cx = Pn ? function(e) {
  if (pa(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  try {
    Pn(e, null, ha);
  } catch (t) {
    if (t !== zi)
      return !1;
  }
  return !da(e) && fl(e);
} : function(e) {
  if (pa(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  if (wx)
    return fl(e);
  if (da(e))
    return !1;
  var t = Fi.call(e);
  return t !== px && t !== gx && !/^\[object HTML/.test(t) ? !1 : fl(e);
}, xx = Cx, kx = Object.prototype.toString, rm = Object.prototype.hasOwnProperty, Ox = function(e, t, r) {
  for (var i = 0, o = e.length; i < o; i++)
    rm.call(e, i) && (r == null ? t(e[i], i, e) : t.call(r, e[i], i, e));
}, Ex = function(e, t, r) {
  for (var i = 0, o = e.length; i < o; i++)
    r == null ? t(e.charAt(i), i, e) : t.call(r, e.charAt(i), i, e);
}, Ax = function(e, t, r) {
  for (var i in e)
    rm.call(e, i) && (r == null ? t(e[i], i, e) : t.call(r, e[i], i, e));
}, Tx = function(e, t, r) {
  if (!xx(t))
    throw new TypeError("iterator must be a function");
  var i;
  arguments.length >= 3 && (i = r), kx.call(e) === "[object Array]" ? Ox(e, t, i) : typeof e == "string" ? Ex(e, t, i) : Ax(e, t, i);
}, Mx = Tx, Nx = [
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array"
], ul = Nx, Ix = typeof globalThis > "u" ? Wr : globalThis, Dx = function() {
  for (var e = [], t = 0; t < ul.length; t++)
    typeof Ix[ul[t]] == "function" && (e[e.length] = ul[t]);
  return e;
}, So = Mx, Rx = Dx, Yu = or, vc = $e, ji = uc, _x = vc("Object.prototype.toString"), im = Cn(), Xu = typeof globalThis > "u" ? Wr : globalThis, ga = Rx(), Cc = vc("String.prototype.slice"), hl = Object.getPrototypeOf, Px = vc("Array.prototype.indexOf", !0) || function(e, t) {
  for (var r = 0; r < e.length; r += 1)
    if (e[r] === t)
      return r;
  return -1;
}, vo = { __proto__: null };
im && ji && hl ? So(ga, function(n) {
  var e = new Xu[n]();
  if (Symbol.toStringTag in e) {
    var t = hl(e), r = ji(t, Symbol.toStringTag);
    if (!r) {
      var i = hl(t);
      r = ji(i, Symbol.toStringTag);
    }
    vo["$" + n] = Yu(r.get);
  }
}) : So(ga, function(n) {
  var e = new Xu[n](), t = e.slice || e.set;
  t && (vo["$" + n] = Yu(t));
});
var $x = function(e) {
  var t = !1;
  return So(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    vo,
    /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
    function(r, i) {
      if (!t)
        try {
          "$" + r(e) === i && (t = Cc(i, 1));
        } catch {
        }
    }
  ), t;
}, Lx = function(e) {
  var t = !1;
  return So(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    vo,
    /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
    function(r, i) {
      if (!t)
        try {
          r(e), t = Cc(i, 1);
        } catch {
        }
    }
  ), t;
}, Bx = function(e) {
  if (!e || typeof e != "object")
    return !1;
  if (!im) {
    var t = Cc(_x(e), 8, -1);
    return Px(ga, t) > -1 ? t : t !== "Object" ? !1 : Lx(e);
  }
  return ji ? $x(e) : null;
}, zx = $e, Qu = zx("ArrayBuffer.prototype.byteLength", !0), Fx = Yg, jx = function(e) {
  return Fx(e) ? Qu ? Qu(e) : e.byteLength : NaN;
}, om = wS, ot = $e, Zu = WS, Vx = it, qn = rC, Wx = Bg, eh = hC, th = Ng, nh = zg, rh = Yg, ih = vC, oh = OC, sh = AC, lh = lc, ah = nx, ch = ux, fh = Bx, uh = jx, hh = ot("SharedArrayBuffer.prototype.byteLength", !0), dh = ot("Date.prototype.getTime"), dl = Object.getPrototypeOf, ph = ot("Object.prototype.toString"), Co = Vx("%Set%", !0), ma = ot("Map.prototype.has", !0), xo = ot("Map.prototype.get", !0), gh = ot("Map.prototype.size", !0), ko = ot("Set.prototype.add", !0), sm = ot("Set.prototype.delete", !0), Oo = ot("Set.prototype.has", !0), Vi = ot("Set.prototype.size", !0);
function mh(n, e, t, r) {
  for (var i = qn(n), o; (o = i.next()) && !o.done; )
    if (je(e, o.value, t, r))
      return sm(n, o.value), !0;
  return !1;
}
function lm(n) {
  if (typeof n > "u")
    return null;
  if (typeof n != "object")
    return typeof n == "symbol" ? !1 : typeof n == "string" || typeof n == "number" ? +n == +n : !0;
}
function Ux(n, e, t, r, i, o) {
  var s = lm(t);
  if (s != null)
    return s;
  var l = xo(e, s), a = om({}, i, { strict: !1 });
  return typeof l > "u" && !ma(e, s) || !je(r, l, a, o) ? !1 : !ma(n, s) && je(r, l, a, o);
}
function Hx(n, e, t) {
  var r = lm(t);
  return r ?? (Oo(e, r) && !Oo(n, r));
}
function yh(n, e, t, r, i, o) {
  for (var s = qn(n), l, a; (l = s.next()) && !l.done; )
    if (a = l.value, // eslint-disable-next-line no-use-before-define
    je(t, a, i, o) && je(r, xo(e, a), i, o))
      return sm(n, a), !0;
  return !1;
}
function je(n, e, t, r) {
  var i = t || {};
  if (i.strict ? eh(n, e) : n === e)
    return !0;
  var o = ah(n), s = ah(e);
  if (o !== s)
    return !1;
  if (!n || !e || typeof n != "object" && typeof e != "object")
    return i.strict ? eh(n, e) : n == e;
  var l = r.has(n), a = r.has(e), c;
  if (l && a) {
    if (r.get(n) === r.get(e))
      return !0;
  } else
    c = {};
  return l || r.set(n, c), a || r.set(e, c), Gx(n, e, i, r);
}
function bh(n) {
  return !n || typeof n != "object" || typeof n.length != "number" || typeof n.copy != "function" || typeof n.slice != "function" || n.length > 0 && typeof n[0] != "number" ? !1 : !!(n.constructor && n.constructor.isBuffer && n.constructor.isBuffer(n));
}
function Jx(n, e, t, r) {
  if (Vi(n) !== Vi(e))
    return !1;
  for (var i = qn(n), o = qn(e), s, l, a; (s = i.next()) && !s.done; )
    if (s.value && typeof s.value == "object")
      a || (a = new Co()), ko(a, s.value);
    else if (!Oo(e, s.value)) {
      if (t.strict || !Hx(n, e, s.value))
        return !1;
      a || (a = new Co()), ko(a, s.value);
    }
  if (a) {
    for (; (l = o.next()) && !l.done; )
      if (l.value && typeof l.value == "object") {
        if (!mh(a, l.value, t.strict, r))
          return !1;
      } else if (!t.strict && !Oo(n, l.value) && !mh(a, l.value, t.strict, r))
        return !1;
    return Vi(a) === 0;
  }
  return !0;
}
function Kx(n, e, t, r) {
  if (gh(n) !== gh(e))
    return !1;
  for (var i = qn(n), o = qn(e), s, l, a, c, f, u; (s = i.next()) && !s.done; )
    if (c = s.value[0], f = s.value[1], c && typeof c == "object")
      a || (a = new Co()), ko(a, c);
    else if (u = xo(e, c), typeof u > "u" && !ma(e, c) || !je(f, u, t, r)) {
      if (t.strict || !Ux(n, e, c, f, t, r))
        return !1;
      a || (a = new Co()), ko(a, c);
    }
  if (a) {
    for (; (l = o.next()) && !l.done; )
      if (c = l.value[0], u = l.value[1], c && typeof c == "object") {
        if (!yh(a, n, c, u, t, r))
          return !1;
      } else if (!t.strict && (!n.has(c) || !je(xo(n, c), u, t, r)) && !yh(a, n, c, u, om({}, t, { strict: !1 }), r))
        return !1;
    return Vi(a) === 0;
  }
  return !0;
}
function Gx(n, e, t, r) {
  var i, o;
  if (typeof n != typeof e || n == null || e == null || ph(n) !== ph(e) || th(n) !== th(e))
    return !1;
  var s = nh(n), l = nh(e);
  if (s !== l)
    return !1;
  var a = n instanceof Error, c = e instanceof Error;
  if (a !== c || (a || c) && (n.name !== e.name || n.message !== e.message))
    return !1;
  var f = oh(n), u = oh(e);
  if (f !== u || (f || u) && (n.source !== e.source || Zu(n) !== Zu(e)))
    return !1;
  var h = ih(n), d = ih(e);
  if (h !== d || (h || d) && dh(n) !== dh(e) || t.strict && dl && dl(n) !== dl(e))
    return !1;
  var p = fh(n), g = fh(e);
  if (p !== g)
    return !1;
  if (p || g) {
    if (n.length !== e.length)
      return !1;
    for (i = 0; i < n.length; i++)
      if (n[i] !== e[i])
        return !1;
    return !0;
  }
  var m = bh(n), y = bh(e);
  if (m !== y)
    return !1;
  if (m || y) {
    if (n.length !== e.length)
      return !1;
    for (i = 0; i < n.length; i++)
      if (n[i] !== e[i])
        return !1;
    return !0;
  }
  var x = rh(n), O = rh(e);
  if (x !== O)
    return !1;
  if (x || O)
    return uh(n) !== uh(e) ? !1 : typeof Uint8Array == "function" && je(new Uint8Array(n), new Uint8Array(e), t, r);
  var N = sh(n), T = sh(e);
  if (N !== T)
    return !1;
  if (N || T)
    return hh(n) !== hh(e) ? !1 : typeof Uint8Array == "function" && je(new Uint8Array(n), new Uint8Array(e), t, r);
  if (typeof n != typeof e)
    return !1;
  var C = lh(n), D = lh(e);
  if (C.length !== D.length)
    return !1;
  for (C.sort(), D.sort(), i = C.length - 1; i >= 0; i--)
    if (C[i] != D[i])
      return !1;
  for (i = C.length - 1; i >= 0; i--)
    if (o = C[i], !je(n[o], e[o], t, r))
      return !1;
  var R = ch(n), A = ch(e);
  return R !== A ? !1 : R === "Set" || A === "Set" ? Jx(n, e, t, r) : R === "Map" ? Kx(n, e, t, r) : !0;
}
var qx = function(e, t, r) {
  return je(e, t, r, Wx());
};
const AD = /* @__PURE__ */ ag(qx);
function am(n) {
  var e, t, r = "";
  if (typeof n == "string" || typeof n == "number") r += n;
  else if (typeof n == "object") if (Array.isArray(n)) for (e = 0; e < n.length; e++) n[e] && (t = am(n[e])) && (r && (r += " "), r += t);
  else for (e in n) n[e] && (r && (r += " "), r += e);
  return r;
}
function Yx() {
  for (var n, e, t = 0, r = ""; t < arguments.length; ) (n = arguments[t++]) && (e = am(n)) && (r && (r += " "), r += e);
  return r;
}
const wh = (n) => typeof n == "boolean" ? "".concat(n) : n === 0 ? "0" : n, Sh = Yx, TD = (n, e) => (t) => {
  var r;
  if ((e == null ? void 0 : e.variants) == null) return Sh(n, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
  const { variants: i, defaultVariants: o } = e, s = Object.keys(i).map((c) => {
    const f = t == null ? void 0 : t[c], u = o == null ? void 0 : o[c];
    if (f === null) return null;
    const h = wh(f) || wh(u);
    return i[c][h];
  }), l = t && Object.entries(t).reduce((c, f) => {
    let [u, h] = f;
    return h === void 0 || (c[u] = h), c;
  }, {}), a = e == null || (r = e.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, f) => {
    let { class: u, className: h, ...d } = f;
    return Object.entries(d).every((p) => {
      let [g, m] = p;
      return Array.isArray(m) ? m.includes({
        ...o,
        ...l
      }[g]) : {
        ...o,
        ...l
      }[g] === m;
    }) ? [
      ...c,
      u,
      h
    ] : c;
  }, []);
  return Sh(n, s, a, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
};
var cm = { exports: {} };
(function(n, e) {
  (function(r, i) {
    n.exports = i(Uy, Hy);
  })(Wr, function(t, r) {
    return (
      /******/
      function(i) {
        var o = {};
        function s(l) {
          if (o[l])
            return o[l].exports;
          var a = o[l] = {
            /******/
            i: l,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return i[l].call(a.exports, a, a.exports, s), a.l = !0, a.exports;
        }
        return s.m = i, s.c = o, s.d = function(l, a, c) {
          s.o(l, a) || Object.defineProperty(l, a, { enumerable: !0, get: c });
        }, s.r = function(l) {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(l, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(l, "__esModule", { value: !0 });
        }, s.t = function(l, a) {
          if (a & 1 && (l = s(l)), a & 8 || a & 4 && typeof l == "object" && l && l.__esModule) return l;
          var c = /* @__PURE__ */ Object.create(null);
          if (s.r(c), Object.defineProperty(c, "default", { enumerable: !0, value: l }), a & 2 && typeof l != "string") for (var f in l) s.d(c, f, (function(u) {
            return l[u];
          }).bind(null, f));
          return c;
        }, s.n = function(l) {
          var a = l && l.__esModule ? (
            /******/
            function() {
              return l.default;
            }
          ) : (
            /******/
            function() {
              return l;
            }
          );
          return s.d(a, "a", a), a;
        }, s.o = function(l, a) {
          return Object.prototype.hasOwnProperty.call(l, a);
        }, s.p = "", s(s.s = 4);
      }([
        /* 0 */
        /***/
        function(i, o, s) {
          i.exports = s(5)();
        },
        /* 1 */
        /***/
        function(i, o) {
          i.exports = t;
        },
        /* 2 */
        /***/
        function(i, o) {
          i.exports = r;
        },
        /* 3 */
        /***/
        function(i, o) {
          i.exports = function(s, l, a) {
            var c = s.direction, f = s.value;
            switch (c) {
              case "top":
                return a.top + f < l.top && a.bottom > l.bottom && a.left < l.left && a.right > l.right;
              case "left":
                return a.left + f < l.left && a.bottom > l.bottom && a.top < l.top && a.right > l.right;
              case "bottom":
                return a.bottom - f > l.bottom && a.left < l.left && a.right > l.right && a.top < l.top;
              case "right":
                return a.right - f > l.right && a.left < l.left && a.top < l.top && a.bottom > l.bottom;
            }
          };
        },
        /* 4 */
        /***/
        function(i, o, s) {
          s.r(o), s.d(o, "default", function() {
            return Z;
          });
          var l = s(1), a = /* @__PURE__ */ s.n(l), c = s(2), f = /* @__PURE__ */ s.n(c), u = s(0), h = /* @__PURE__ */ s.n(u), d = s(3), p = /* @__PURE__ */ s.n(d);
          function g(E) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? g = function($) {
              return typeof $;
            } : g = function($) {
              return $ && typeof Symbol == "function" && $.constructor === Symbol && $ !== Symbol.prototype ? "symbol" : typeof $;
            }, g(E);
          }
          function m(E, k) {
            if (!(E instanceof k))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(E, k) {
            for (var $ = 0; $ < k.length; $++) {
              var w = k[$];
              w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(E, w.key, w);
            }
          }
          function x(E, k, $) {
            return k && y(E.prototype, k), E;
          }
          function O(E, k) {
            return k && (g(k) === "object" || typeof k == "function") ? k : T(E);
          }
          function N(E) {
            return N = Object.setPrototypeOf ? Object.getPrototypeOf : function($) {
              return $.__proto__ || Object.getPrototypeOf($);
            }, N(E);
          }
          function T(E) {
            if (E === void 0)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return E;
          }
          function C(E, k) {
            if (typeof k != "function" && k !== null)
              throw new TypeError("Super expression must either be null or a function");
            E.prototype = Object.create(k && k.prototype, { constructor: { value: E, writable: !0, configurable: !0 } }), k && D(E, k);
          }
          function D(E, k) {
            return D = Object.setPrototypeOf || function(w, ee) {
              return w.__proto__ = ee, w;
            }, D(E, k);
          }
          function R(E, k, $) {
            return k in E ? Object.defineProperty(E, k, { value: $, enumerable: !0, configurable: !0, writable: !0 }) : E[k] = $, E;
          }
          function A(E) {
            return E.width === void 0 && (E.width = E.right - E.left), E.height === void 0 && (E.height = E.bottom - E.top), E;
          }
          var Z = /* @__PURE__ */ function(E) {
            C(k, E);
            function k($) {
              var w;
              return m(this, k), w = O(this, N(k).call(this, $)), R(T(w), "getContainer", function() {
                return w.props.containment || window;
              }), R(T(w), "addEventListener", function(ee, z, j, le) {
                w.debounceCheck || (w.debounceCheck = {});
                var G, Ot, ne = function() {
                  G = null, w.check();
                };
                le > -1 ? Ot = function() {
                  G || (G = setTimeout(ne, le || 0));
                } : Ot = function() {
                  clearTimeout(G), G = setTimeout(ne, j || 0);
                };
                var hr = {
                  target: ee,
                  fn: Ot,
                  getLastTimeout: function() {
                    return G;
                  }
                };
                ee.addEventListener(z, hr.fn), w.debounceCheck[z] = hr;
              }), R(T(w), "startWatching", function() {
                w.debounceCheck || w.interval || (w.props.intervalCheck && (w.interval = setInterval(w.check, w.props.intervalDelay)), w.props.scrollCheck && w.addEventListener(w.getContainer(), "scroll", w.props.scrollDelay, w.props.scrollThrottle), w.props.resizeCheck && w.addEventListener(window, "resize", w.props.resizeDelay, w.props.resizeThrottle), !w.props.delayedCall && w.check());
              }), R(T(w), "stopWatching", function() {
                if (w.debounceCheck) {
                  for (var ee in w.debounceCheck)
                    if (w.debounceCheck.hasOwnProperty(ee)) {
                      var z = w.debounceCheck[ee];
                      clearTimeout(z.getLastTimeout()), z.target.removeEventListener(ee, z.fn), w.debounceCheck[ee] = null;
                    }
                }
                w.debounceCheck = null, w.interval && (w.interval = clearInterval(w.interval));
              }), R(T(w), "check", function() {
                var ee = w.node, z, j;
                if (!ee)
                  return w.state;
                if (z = A(w.roundRectDown(ee.getBoundingClientRect())), w.props.containment) {
                  var le = w.props.containment.getBoundingClientRect();
                  j = {
                    top: le.top,
                    left: le.left,
                    bottom: le.bottom,
                    right: le.right
                  };
                } else
                  j = {
                    top: 0,
                    left: 0,
                    bottom: window.innerHeight || document.documentElement.clientHeight,
                    right: window.innerWidth || document.documentElement.clientWidth
                  };
                var G = w.props.offset || {}, Ot = g(G) === "object";
                Ot && (j.top += G.top || 0, j.left += G.left || 0, j.bottom -= G.bottom || 0, j.right -= G.right || 0);
                var ne = {
                  top: z.top >= j.top,
                  left: z.left >= j.left,
                  bottom: z.bottom <= j.bottom,
                  right: z.right <= j.right
                }, hr = z.height > 0 && z.width > 0, at = hr && ne.top && ne.left && ne.bottom && ne.right;
                if (hr && w.props.partialVisibility) {
                  var Is = z.top <= j.bottom && z.bottom >= j.top && z.left <= j.right && z.right >= j.left;
                  typeof w.props.partialVisibility == "string" && (Is = ne[w.props.partialVisibility]), at = w.props.minTopValue ? Is && z.top <= j.bottom - w.props.minTopValue : Is;
                }
                typeof G.direction == "string" && typeof G.value == "number" && (console.warn("[notice] offset.direction and offset.value have been deprecated. They still work for now, but will be removed in next major version. Please upgrade to the new syntax: { %s: %d }", G.direction, G.value), at = p()(G, z, j));
                var Ds = w.state;
                return w.state.isVisible !== at && (Ds = {
                  isVisible: at,
                  visibilityRect: ne
                }, w.setState(Ds), w.props.onChange && w.props.onChange(at)), Ds;
              }), w.state = {
                isVisible: null,
                visibilityRect: {}
              }, w;
            }
            return x(k, [{
              key: "componentDidMount",
              value: function() {
                this.node = f.a.findDOMNode(this), this.props.active && this.startWatching();
              }
            }, {
              key: "componentWillUnmount",
              value: function() {
                this.stopWatching();
              }
            }, {
              key: "componentDidUpdate",
              value: function(w) {
                this.node = f.a.findDOMNode(this), this.props.active && !w.active ? (this.setState({
                  isVisible: null,
                  visibilityRect: {}
                }), this.startWatching()) : this.props.active || this.stopWatching();
              }
            }, {
              key: "roundRectDown",
              value: function(w) {
                return {
                  top: Math.floor(w.top),
                  left: Math.floor(w.left),
                  bottom: Math.floor(w.bottom),
                  right: Math.floor(w.right)
                };
              }
              /**
               * Check if the element is within the visible viewport
               */
            }, {
              key: "render",
              value: function() {
                return this.props.children instanceof Function ? this.props.children({
                  isVisible: this.state.isVisible,
                  visibilityRect: this.state.visibilityRect
                }) : a.a.Children.only(this.props.children);
              }
            }]), k;
          }(a.a.Component);
          R(Z, "defaultProps", {
            active: !0,
            partialVisibility: !1,
            minTopValue: 0,
            scrollCheck: !1,
            scrollDelay: 250,
            scrollThrottle: -1,
            resizeCheck: !1,
            resizeDelay: 250,
            resizeThrottle: -1,
            intervalCheck: !0,
            intervalDelay: 100,
            delayedCall: !1,
            offset: {},
            containment: null,
            children: a.a.createElement("span", null)
          }), R(Z, "propTypes", {
            onChange: h.a.func,
            active: h.a.bool,
            partialVisibility: h.a.oneOfType([h.a.bool, h.a.oneOf(["top", "right", "bottom", "left"])]),
            delayedCall: h.a.bool,
            offset: h.a.oneOfType([
              h.a.shape({
                top: h.a.number,
                left: h.a.number,
                bottom: h.a.number,
                right: h.a.number
              }),
              // deprecated offset property
              h.a.shape({
                direction: h.a.oneOf(["top", "right", "bottom", "left"]),
                value: h.a.number
              })
            ]),
            scrollCheck: h.a.bool,
            scrollDelay: h.a.number,
            scrollThrottle: h.a.number,
            resizeCheck: h.a.bool,
            resizeDelay: h.a.number,
            resizeThrottle: h.a.number,
            intervalCheck: h.a.bool,
            intervalDelay: h.a.number,
            containment: typeof window < "u" ? h.a.instanceOf(window.Element) : h.a.any,
            children: h.a.oneOfType([h.a.element, h.a.func]),
            minTopValue: h.a.number
          });
        },
        /* 5 */
        /***/
        function(i, o, s) {
          var l = s(6);
          function a() {
          }
          function c() {
          }
          c.resetWarningCache = a, i.exports = function() {
            function f(d, p, g, m, y, x) {
              if (x !== l) {
                var O = new Error(
                  "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
                );
                throw O.name = "Invariant Violation", O;
              }
            }
            f.isRequired = f;
            function u() {
              return f;
            }
            var h = {
              array: f,
              bool: f,
              func: f,
              number: f,
              object: f,
              string: f,
              symbol: f,
              any: f,
              arrayOf: u,
              element: f,
              elementType: f,
              instanceOf: u,
              node: f,
              objectOf: u,
              oneOf: u,
              oneOfType: u,
              shape: u,
              exact: u,
              checkPropTypes: c,
              resetWarningCache: a
            };
            return h.PropTypes = h, h;
          };
        },
        /* 6 */
        /***/
        function(i, o, s) {
          var l = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
          i.exports = l;
        }
        /******/
      ])
    );
  });
})(cm);
var Xx = cm.exports;
const MD = /* @__PURE__ */ ag(Xx), wi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Qx = (n) => {
  n = n.replace(/\r\n/g, `
`);
  let e = 0, t = "";
  for (; e < n.length; e++) {
    const r = n.charCodeAt(e);
    r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(63 & r | 128));
  }
  return t;
}, Zx = (n) => {
  let e, t, r, i, o, s, l, a = 0, c = "";
  for (n = Qx(n); a < n.length; ) e = n.charCodeAt(a++), t = n.charCodeAt(a++), r = n.charCodeAt(a++), i = e >> 2, o = (3 & e) << 4 | t >> 4, s = (15 & t) << 2 | r >> 6, l = 63 & r, isNaN(t) ? s = l = 64 : isNaN(r) && (l = 64), c = c + wi.charAt(i) + wi.charAt(o) + wi.charAt(s) + wi.charAt(l);
  return c;
}, ek = (n) => typeof n == "string" ? "string" : typeof SVGElement < "u" && n instanceof SVGElement ? "element" : void 0, fm = (n) => "data:image/svg+xml;base64," + Zx(n), tk = (n) => fm(new XMLSerializer().serializeToString(n)), ND = (n) => {
  switch (ek(n)) {
    case "string":
      return fm(n);
    case "element":
      return tk(n);
    default:
      return n;
  }
};
var um = typeof global == "object" && global && global.Object === Object && global, nk = typeof self == "object" && self && self.Object === Object && self, st = um || nk || Function("return this")(), nt = st.Symbol, hm = Object.prototype, rk = hm.hasOwnProperty, ik = hm.toString, wr = nt ? nt.toStringTag : void 0;
function ok(n) {
  var e = rk.call(n, wr), t = n[wr];
  try {
    n[wr] = void 0;
    var r = !0;
  } catch {
  }
  var i = ik.call(n);
  return r && (e ? n[wr] = t : delete n[wr]), i;
}
var sk = Object.prototype, lk = sk.toString;
function ak(n) {
  return lk.call(n);
}
var ck = "[object Null]", fk = "[object Undefined]", vh = nt ? nt.toStringTag : void 0;
function tn(n) {
  return n == null ? n === void 0 ? fk : ck : vh && vh in Object(n) ? ok(n) : ak(n);
}
function wt(n) {
  return n != null && typeof n == "object";
}
var uk = "[object Symbol]";
function Ss(n) {
  return typeof n == "symbol" || wt(n) && tn(n) == uk;
}
function dm(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, i = Array(r); ++t < r; )
    i[t] = e(n[t], t, n);
  return i;
}
var rt = Array.isArray, hk = 1 / 0, Ch = nt ? nt.prototype : void 0, xh = Ch ? Ch.toString : void 0;
function Eo(n) {
  if (typeof n == "string")
    return n;
  if (rt(n))
    return dm(n, Eo) + "";
  if (Ss(n))
    return xh ? xh.call(n) : "";
  var e = n + "";
  return e == "0" && 1 / n == -hk ? "-0" : e;
}
var dk = /\s/;
function pk(n) {
  for (var e = n.length; e-- && dk.test(n.charAt(e)); )
    ;
  return e;
}
var gk = /^\s+/;
function mk(n) {
  return n && n.slice(0, pk(n) + 1).replace(gk, "");
}
function Gt(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var kh = NaN, yk = /^[-+]0x[0-9a-f]+$/i, bk = /^0b[01]+$/i, wk = /^0o[0-7]+$/i, Sk = parseInt;
function jn(n) {
  if (typeof n == "number")
    return n;
  if (Ss(n))
    return kh;
  if (Gt(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Gt(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = mk(n);
  var t = bk.test(n);
  return t || wk.test(n) ? Sk(n.slice(2), t ? 2 : 8) : yk.test(n) ? kh : +n;
}
var Oh = 1 / 0, vk = 17976931348623157e292;
function Ck(n) {
  if (!n)
    return n === 0 ? n : 0;
  if (n = jn(n), n === Oh || n === -Oh) {
    var e = n < 0 ? -1 : 1;
    return e * vk;
  }
  return n === n ? n : 0;
}
function xk(n) {
  var e = Ck(n), t = e % 1;
  return e === e ? t ? e - t : e : 0;
}
function xc(n) {
  return n;
}
var kk = "[object AsyncFunction]", Ok = "[object Function]", Ek = "[object GeneratorFunction]", Ak = "[object Proxy]";
function pm(n) {
  if (!Gt(n))
    return !1;
  var e = tn(n);
  return e == Ok || e == Ek || e == kk || e == Ak;
}
var pl = st["__core-js_shared__"], Eh = function() {
  var n = /[^.]+$/.exec(pl && pl.keys && pl.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
}();
function Tk(n) {
  return !!Eh && Eh in n;
}
var Mk = Function.prototype, Nk = Mk.toString;
function xn(n) {
  if (n != null) {
    try {
      return Nk.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var Ik = /[\\^$.*+?()[\]{}|]/g, Dk = /^\[object .+?Constructor\]$/, Rk = Function.prototype, _k = Object.prototype, Pk = Rk.toString, $k = _k.hasOwnProperty, Lk = RegExp(
  "^" + Pk.call($k).replace(Ik, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Bk(n) {
  if (!Gt(n) || Tk(n))
    return !1;
  var e = pm(n) ? Lk : Dk;
  return e.test(xn(n));
}
function zk(n, e) {
  return n == null ? void 0 : n[e];
}
function kn(n, e) {
  var t = zk(n, e);
  return Bk(t) ? t : void 0;
}
var ya = kn(st, "WeakMap");
function Fk(n, e, t) {
  switch (t.length) {
    case 0:
      return n.call(e);
    case 1:
      return n.call(e, t[0]);
    case 2:
      return n.call(e, t[0], t[1]);
    case 3:
      return n.call(e, t[0], t[1], t[2]);
  }
  return n.apply(e, t);
}
var jk = 800, Vk = 16, Wk = Date.now;
function Uk(n) {
  var e = 0, t = 0;
  return function() {
    var r = Wk(), i = Vk - (r - t);
    if (t = r, i > 0) {
      if (++e >= jk)
        return arguments[0];
    } else
      e = 0;
    return n.apply(void 0, arguments);
  };
}
function Hk(n) {
  return function() {
    return n;
  };
}
var Ah = function() {
  try {
    var n = kn(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
}(), Jk = Ah ? function(n, e) {
  return Ah(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Hk(e),
    writable: !0
  });
} : xc, Kk = Uk(Jk);
function Gk(n, e, t, r) {
  for (var i = n.length, o = t + -1; ++o < i; )
    if (e(n[o], o, n))
      return o;
  return -1;
}
function qk(n) {
  return n !== n;
}
function Yk(n, e, t) {
  for (var r = t - 1, i = n.length; ++r < i; )
    if (n[r] === e)
      return r;
  return -1;
}
function Xk(n, e, t) {
  return e === e ? Yk(n, e, t) : Gk(n, qk, t);
}
function Qk(n, e) {
  var t = n == null ? 0 : n.length;
  return !!t && Xk(n, e, 0) > -1;
}
var Zk = 9007199254740991, eO = /^(?:0|[1-9]\d*)$/;
function gm(n, e) {
  var t = typeof n;
  return e = e ?? Zk, !!e && (t == "number" || t != "symbol" && eO.test(n)) && n > -1 && n % 1 == 0 && n < e;
}
function mm(n, e) {
  return n === e || n !== n && e !== e;
}
var Th = Math.max;
function tO(n, e, t) {
  return e = Th(e === void 0 ? n.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, o = Th(r.length - e, 0), s = Array(o); ++i < o; )
      s[i] = r[e + i];
    i = -1;
    for (var l = Array(e + 1); ++i < e; )
      l[i] = r[i];
    return l[e] = t(s), Fk(n, this, l);
  };
}
function nO(n, e) {
  return Kk(tO(n, e, xc), n + "");
}
var rO = 9007199254740991;
function kc(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= rO;
}
function ym(n) {
  return n != null && kc(n.length) && !pm(n);
}
var iO = Object.prototype;
function oO(n) {
  var e = n && n.constructor, t = typeof e == "function" && e.prototype || iO;
  return n === t;
}
function sO(n, e) {
  for (var t = -1, r = Array(n); ++t < n; )
    r[t] = e(t);
  return r;
}
var lO = "[object Arguments]";
function Mh(n) {
  return wt(n) && tn(n) == lO;
}
var bm = Object.prototype, aO = bm.hasOwnProperty, cO = bm.propertyIsEnumerable, Oc = Mh(/* @__PURE__ */ function() {
  return arguments;
}()) ? Mh : function(n) {
  return wt(n) && aO.call(n, "callee") && !cO.call(n, "callee");
};
function fO() {
  return !1;
}
var wm = typeof exports == "object" && exports && !exports.nodeType && exports, Nh = wm && typeof module == "object" && module && !module.nodeType && module, uO = Nh && Nh.exports === wm, Ih = uO ? st.Buffer : void 0, hO = Ih ? Ih.isBuffer : void 0, ba = hO || fO, dO = "[object Arguments]", pO = "[object Array]", gO = "[object Boolean]", mO = "[object Date]", yO = "[object Error]", bO = "[object Function]", wO = "[object Map]", SO = "[object Number]", vO = "[object Object]", CO = "[object RegExp]", xO = "[object Set]", kO = "[object String]", OO = "[object WeakMap]", EO = "[object ArrayBuffer]", AO = "[object DataView]", TO = "[object Float32Array]", MO = "[object Float64Array]", NO = "[object Int8Array]", IO = "[object Int16Array]", DO = "[object Int32Array]", RO = "[object Uint8Array]", _O = "[object Uint8ClampedArray]", PO = "[object Uint16Array]", $O = "[object Uint32Array]", U = {};
U[TO] = U[MO] = U[NO] = U[IO] = U[DO] = U[RO] = U[_O] = U[PO] = U[$O] = !0;
U[dO] = U[pO] = U[EO] = U[gO] = U[AO] = U[mO] = U[yO] = U[bO] = U[wO] = U[SO] = U[vO] = U[CO] = U[xO] = U[kO] = U[OO] = !1;
function LO(n) {
  return wt(n) && kc(n.length) && !!U[tn(n)];
}
function Ec(n) {
  return function(e) {
    return n(e);
  };
}
var Sm = typeof exports == "object" && exports && !exports.nodeType && exports, Ir = Sm && typeof module == "object" && module && !module.nodeType && module, BO = Ir && Ir.exports === Sm, gl = BO && um.process, Ao = function() {
  try {
    var n = Ir && Ir.require && Ir.require("util").types;
    return n || gl && gl.binding && gl.binding("util");
  } catch {
  }
}(), Dh = Ao && Ao.isTypedArray, vm = Dh ? Ec(Dh) : LO, zO = Object.prototype, FO = zO.hasOwnProperty;
function jO(n, e) {
  var t = rt(n), r = !t && Oc(n), i = !t && !r && ba(n), o = !t && !r && !i && vm(n), s = t || r || i || o, l = s ? sO(n.length, String) : [], a = l.length;
  for (var c in n)
    FO.call(n, c) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    gm(c, a))) && l.push(c);
  return l;
}
function VO(n, e) {
  return function(t) {
    return n(e(t));
  };
}
var WO = VO(Object.keys, Object), UO = Object.prototype, HO = UO.hasOwnProperty;
function JO(n) {
  if (!oO(n))
    return WO(n);
  var e = [];
  for (var t in Object(n))
    HO.call(n, t) && t != "constructor" && e.push(t);
  return e;
}
function Cm(n) {
  return ym(n) ? jO(n) : JO(n);
}
var KO = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, GO = /^\w*$/;
function Ac(n, e) {
  if (rt(n))
    return !1;
  var t = typeof n;
  return t == "number" || t == "symbol" || t == "boolean" || n == null || Ss(n) ? !0 : GO.test(n) || !KO.test(n) || e != null && n in Object(e);
}
var Hr = kn(Object, "create");
function qO() {
  this.__data__ = Hr ? Hr(null) : {}, this.size = 0;
}
function YO(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var XO = "__lodash_hash_undefined__", QO = Object.prototype, ZO = QO.hasOwnProperty;
function eE(n) {
  var e = this.__data__;
  if (Hr) {
    var t = e[n];
    return t === XO ? void 0 : t;
  }
  return ZO.call(e, n) ? e[n] : void 0;
}
var tE = Object.prototype, nE = tE.hasOwnProperty;
function rE(n) {
  var e = this.__data__;
  return Hr ? e[n] !== void 0 : nE.call(e, n);
}
var iE = "__lodash_hash_undefined__";
function oE(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = Hr && e === void 0 ? iE : e, this;
}
function bn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
bn.prototype.clear = qO;
bn.prototype.delete = YO;
bn.prototype.get = eE;
bn.prototype.has = rE;
bn.prototype.set = oE;
function sE() {
  this.__data__ = [], this.size = 0;
}
function vs(n, e) {
  for (var t = n.length; t--; )
    if (mm(n[t][0], e))
      return t;
  return -1;
}
var lE = Array.prototype, aE = lE.splice;
function cE(n) {
  var e = this.__data__, t = vs(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : aE.call(e, t, 1), --this.size, !0;
}
function fE(n) {
  var e = this.__data__, t = vs(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function uE(n) {
  return vs(this.__data__, n) > -1;
}
function hE(n, e) {
  var t = this.__data__, r = vs(t, n);
  return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
}
function Ct(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
Ct.prototype.clear = sE;
Ct.prototype.delete = cE;
Ct.prototype.get = fE;
Ct.prototype.has = uE;
Ct.prototype.set = hE;
var Jr = kn(st, "Map");
function dE() {
  this.size = 0, this.__data__ = {
    hash: new bn(),
    map: new (Jr || Ct)(),
    string: new bn()
  };
}
function pE(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function Cs(n, e) {
  var t = n.__data__;
  return pE(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function gE(n) {
  var e = Cs(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function mE(n) {
  return Cs(this, n).get(n);
}
function yE(n) {
  return Cs(this, n).has(n);
}
function bE(n, e) {
  var t = Cs(this, n), r = t.size;
  return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
}
function xt(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
xt.prototype.clear = dE;
xt.prototype.delete = gE;
xt.prototype.get = mE;
xt.prototype.has = yE;
xt.prototype.set = bE;
var wE = "Expected a function";
function Tc(n, e) {
  if (typeof n != "function" || e != null && typeof e != "function")
    throw new TypeError(wE);
  var t = function() {
    var r = arguments, i = e ? e.apply(this, r) : r[0], o = t.cache;
    if (o.has(i))
      return o.get(i);
    var s = n.apply(this, r);
    return t.cache = o.set(i, s) || o, s;
  };
  return t.cache = new (Tc.Cache || xt)(), t;
}
Tc.Cache = xt;
var SE = 500;
function vE(n) {
  var e = Tc(n, function(r) {
    return t.size === SE && t.clear(), r;
  }), t = e.cache;
  return e;
}
var CE = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, xE = /\\(\\)?/g, kE = vE(function(n) {
  var e = [];
  return n.charCodeAt(0) === 46 && e.push(""), n.replace(CE, function(t, r, i, o) {
    e.push(i ? o.replace(xE, "$1") : r || t);
  }), e;
});
function wa(n) {
  return n == null ? "" : Eo(n);
}
function xm(n, e) {
  return rt(n) ? n : Ac(n, e) ? [n] : kE(wa(n));
}
var OE = 1 / 0;
function xs(n) {
  if (typeof n == "string" || Ss(n))
    return n;
  var e = n + "";
  return e == "0" && 1 / n == -OE ? "-0" : e;
}
function km(n, e) {
  e = xm(e, n);
  for (var t = 0, r = e.length; n != null && t < r; )
    n = n[xs(e[t++])];
  return t && t == r ? n : void 0;
}
function EE(n, e, t) {
  var r = n == null ? void 0 : km(n, e);
  return r === void 0 ? t : r;
}
function Om(n, e) {
  for (var t = -1, r = e.length, i = n.length; ++t < r; )
    n[i + t] = e[t];
  return n;
}
var Rh = nt ? nt.isConcatSpreadable : void 0;
function AE(n) {
  return rt(n) || Oc(n) || !!(Rh && n && n[Rh]);
}
function TE(n, e, t, r, i) {
  var o = -1, s = n.length;
  for (t || (t = AE), i || (i = []); ++o < s; ) {
    var l = n[o];
    t(l) && Om(i, l);
  }
  return i;
}
function ME(n, e, t) {
  var r = -1, i = n.length;
  e < 0 && (e = -e > i ? 0 : i + e), t = t > i ? i : t, t < 0 && (t += i), i = e > t ? 0 : t - e >>> 0, e >>>= 0;
  for (var o = Array(i); ++r < i; )
    o[r] = n[r + e];
  return o;
}
function NE(n, e, t) {
  var r = n.length;
  return t = t === void 0 ? r : t, !e && t >= r ? n : ME(n, e, t);
}
var IE = "\\ud800-\\udfff", DE = "\\u0300-\\u036f", RE = "\\ufe20-\\ufe2f", _E = "\\u20d0-\\u20ff", PE = DE + RE + _E, $E = "\\ufe0e\\ufe0f", LE = "\\u200d", BE = RegExp("[" + LE + IE + PE + $E + "]");
function Mc(n) {
  return BE.test(n);
}
function zE(n) {
  return n.split("");
}
var Em = "\\ud800-\\udfff", FE = "\\u0300-\\u036f", jE = "\\ufe20-\\ufe2f", VE = "\\u20d0-\\u20ff", WE = FE + jE + VE, UE = "\\ufe0e\\ufe0f", HE = "[" + Em + "]", Sa = "[" + WE + "]", va = "\\ud83c[\\udffb-\\udfff]", JE = "(?:" + Sa + "|" + va + ")", Am = "[^" + Em + "]", Tm = "(?:\\ud83c[\\udde6-\\uddff]){2}", Mm = "[\\ud800-\\udbff][\\udc00-\\udfff]", KE = "\\u200d", Nm = JE + "?", Im = "[" + UE + "]?", GE = "(?:" + KE + "(?:" + [Am, Tm, Mm].join("|") + ")" + Im + Nm + ")*", qE = Im + Nm + GE, YE = "(?:" + [Am + Sa + "?", Sa, Tm, Mm, HE].join("|") + ")", XE = RegExp(va + "(?=" + va + ")|" + YE + qE, "g");
function QE(n) {
  return n.match(XE) || [];
}
function ZE(n) {
  return Mc(n) ? QE(n) : zE(n);
}
function eA(n, e, t) {
  return n === n && (t !== void 0 && (n = n <= t ? n : t), e !== void 0 && (n = n >= e ? n : e)), n;
}
function ID(n, e, t) {
  return t === void 0 && (t = e, e = void 0), t !== void 0 && (t = jn(t), t = t === t ? t : 0), e !== void 0 && (e = jn(e), e = e === e ? e : 0), eA(jn(n), e, t);
}
function tA() {
  this.__data__ = new Ct(), this.size = 0;
}
function nA(n) {
  var e = this.__data__, t = e.delete(n);
  return this.size = e.size, t;
}
function rA(n) {
  return this.__data__.get(n);
}
function iA(n) {
  return this.__data__.has(n);
}
var oA = 200;
function sA(n, e) {
  var t = this.__data__;
  if (t instanceof Ct) {
    var r = t.__data__;
    if (!Jr || r.length < oA - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new xt(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function bt(n) {
  var e = this.__data__ = new Ct(n);
  this.size = e.size;
}
bt.prototype.clear = tA;
bt.prototype.delete = nA;
bt.prototype.get = rA;
bt.prototype.has = iA;
bt.prototype.set = sA;
function lA(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, i = 0, o = []; ++t < r; ) {
    var s = n[t];
    e(s, t, n) && (o[i++] = s);
  }
  return o;
}
function aA() {
  return [];
}
var cA = Object.prototype, fA = cA.propertyIsEnumerable, _h = Object.getOwnPropertySymbols, uA = _h ? function(n) {
  return n == null ? [] : (n = Object(n), lA(_h(n), function(e) {
    return fA.call(n, e);
  }));
} : aA;
function hA(n, e, t) {
  var r = e(n);
  return rt(n) ? r : Om(r, t(n));
}
function Ph(n) {
  return hA(n, Cm, uA);
}
var Ca = kn(st, "DataView"), xa = kn(st, "Promise"), ka = kn(st, "Set"), $h = "[object Map]", dA = "[object Object]", Lh = "[object Promise]", Bh = "[object Set]", zh = "[object WeakMap]", Fh = "[object DataView]", pA = xn(Ca), gA = xn(Jr), mA = xn(xa), yA = xn(ka), bA = xn(ya), Dt = tn;
(Ca && Dt(new Ca(new ArrayBuffer(1))) != Fh || Jr && Dt(new Jr()) != $h || xa && Dt(xa.resolve()) != Lh || ka && Dt(new ka()) != Bh || ya && Dt(new ya()) != zh) && (Dt = function(n) {
  var e = tn(n), t = e == dA ? n.constructor : void 0, r = t ? xn(t) : "";
  if (r)
    switch (r) {
      case pA:
        return Fh;
      case gA:
        return $h;
      case mA:
        return Lh;
      case yA:
        return Bh;
      case bA:
        return zh;
    }
  return e;
});
var jh = st.Uint8Array, wA = "__lodash_hash_undefined__";
function SA(n) {
  return this.__data__.set(n, wA), this;
}
function vA(n) {
  return this.__data__.has(n);
}
function Kr(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new xt(); ++e < t; )
    this.add(n[e]);
}
Kr.prototype.add = Kr.prototype.push = SA;
Kr.prototype.has = vA;
function CA(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (e(n[t], t, n))
      return !0;
  return !1;
}
function Dm(n, e) {
  return n.has(e);
}
var xA = 1, kA = 2;
function Rm(n, e, t, r, i, o) {
  var s = t & xA, l = n.length, a = e.length;
  if (l != a && !(s && a > l))
    return !1;
  var c = o.get(n), f = o.get(e);
  if (c && f)
    return c == e && f == n;
  var u = -1, h = !0, d = t & kA ? new Kr() : void 0;
  for (o.set(n, e), o.set(e, n); ++u < l; ) {
    var p = n[u], g = e[u];
    if (r)
      var m = s ? r(g, p, u, e, n, o) : r(p, g, u, n, e, o);
    if (m !== void 0) {
      if (m)
        continue;
      h = !1;
      break;
    }
    if (d) {
      if (!CA(e, function(y, x) {
        if (!Dm(d, x) && (p === y || i(p, y, t, r, o)))
          return d.push(x);
      })) {
        h = !1;
        break;
      }
    } else if (!(p === g || i(p, g, t, r, o))) {
      h = !1;
      break;
    }
  }
  return o.delete(n), o.delete(e), h;
}
function OA(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r, i) {
    t[++e] = [i, r];
  }), t;
}
function EA(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var AA = 1, TA = 2, MA = "[object Boolean]", NA = "[object Date]", IA = "[object Error]", DA = "[object Map]", RA = "[object Number]", _A = "[object RegExp]", PA = "[object Set]", $A = "[object String]", LA = "[object Symbol]", BA = "[object ArrayBuffer]", zA = "[object DataView]", Vh = nt ? nt.prototype : void 0, ml = Vh ? Vh.valueOf : void 0;
function FA(n, e, t, r, i, o, s) {
  switch (t) {
    case zA:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case BA:
      return !(n.byteLength != e.byteLength || !o(new jh(n), new jh(e)));
    case MA:
    case NA:
    case RA:
      return mm(+n, +e);
    case IA:
      return n.name == e.name && n.message == e.message;
    case _A:
    case $A:
      return n == e + "";
    case DA:
      var l = OA;
    case PA:
      var a = r & AA;
      if (l || (l = EA), n.size != e.size && !a)
        return !1;
      var c = s.get(n);
      if (c)
        return c == e;
      r |= TA, s.set(n, e);
      var f = Rm(l(n), l(e), r, i, o, s);
      return s.delete(n), f;
    case LA:
      if (ml)
        return ml.call(n) == ml.call(e);
  }
  return !1;
}
var jA = 1, VA = Object.prototype, WA = VA.hasOwnProperty;
function UA(n, e, t, r, i, o) {
  var s = t & jA, l = Ph(n), a = l.length, c = Ph(e), f = c.length;
  if (a != f && !s)
    return !1;
  for (var u = a; u--; ) {
    var h = l[u];
    if (!(s ? h in e : WA.call(e, h)))
      return !1;
  }
  var d = o.get(n), p = o.get(e);
  if (d && p)
    return d == e && p == n;
  var g = !0;
  o.set(n, e), o.set(e, n);
  for (var m = s; ++u < a; ) {
    h = l[u];
    var y = n[h], x = e[h];
    if (r)
      var O = s ? r(x, y, h, e, n, o) : r(y, x, h, n, e, o);
    if (!(O === void 0 ? y === x || i(y, x, t, r, o) : O)) {
      g = !1;
      break;
    }
    m || (m = h == "constructor");
  }
  if (g && !m) {
    var N = n.constructor, T = e.constructor;
    N != T && "constructor" in n && "constructor" in e && !(typeof N == "function" && N instanceof N && typeof T == "function" && T instanceof T) && (g = !1);
  }
  return o.delete(n), o.delete(e), g;
}
var HA = 1, Wh = "[object Arguments]", Uh = "[object Array]", Si = "[object Object]", JA = Object.prototype, Hh = JA.hasOwnProperty;
function KA(n, e, t, r, i, o) {
  var s = rt(n), l = rt(e), a = s ? Uh : Dt(n), c = l ? Uh : Dt(e);
  a = a == Wh ? Si : a, c = c == Wh ? Si : c;
  var f = a == Si, u = c == Si, h = a == c;
  if (h && ba(n)) {
    if (!ba(e))
      return !1;
    s = !0, f = !1;
  }
  if (h && !f)
    return o || (o = new bt()), s || vm(n) ? Rm(n, e, t, r, i, o) : FA(n, e, a, t, r, i, o);
  if (!(t & HA)) {
    var d = f && Hh.call(n, "__wrapped__"), p = u && Hh.call(e, "__wrapped__");
    if (d || p) {
      var g = d ? n.value() : n, m = p ? e.value() : e;
      return o || (o = new bt()), i(g, m, t, r, o);
    }
  }
  return h ? (o || (o = new bt()), UA(n, e, t, r, i, o)) : !1;
}
function Nc(n, e, t, r, i) {
  return n === e ? !0 : n == null || e == null || !wt(n) && !wt(e) ? n !== n && e !== e : KA(n, e, t, r, Nc, i);
}
var GA = 1, qA = 2;
function YA(n, e, t, r) {
  var i = t.length, o = i;
  if (n == null)
    return !o;
  for (n = Object(n); i--; ) {
    var s = t[i];
    if (s[2] ? s[1] !== n[s[0]] : !(s[0] in n))
      return !1;
  }
  for (; ++i < o; ) {
    s = t[i];
    var l = s[0], a = n[l], c = s[1];
    if (s[2]) {
      if (a === void 0 && !(l in n))
        return !1;
    } else {
      var f = new bt(), u;
      if (!(u === void 0 ? Nc(c, a, GA | qA, r, f) : u))
        return !1;
    }
  }
  return !0;
}
function _m(n) {
  return n === n && !Gt(n);
}
function XA(n) {
  for (var e = Cm(n), t = e.length; t--; ) {
    var r = e[t], i = n[r];
    e[t] = [r, i, _m(i)];
  }
  return e;
}
function Pm(n, e) {
  return function(t) {
    return t == null ? !1 : t[n] === e && (e !== void 0 || n in Object(t));
  };
}
function QA(n) {
  var e = XA(n);
  return e.length == 1 && e[0][2] ? Pm(e[0][0], e[0][1]) : function(t) {
    return t === n || YA(t, n, e);
  };
}
function ZA(n, e) {
  return n != null && e in Object(n);
}
function eT(n, e, t) {
  e = xm(e, n);
  for (var r = -1, i = e.length, o = !1; ++r < i; ) {
    var s = xs(e[r]);
    if (!(o = n != null && t(n, s)))
      break;
    n = n[s];
  }
  return o || ++r != i ? o : (i = n == null ? 0 : n.length, !!i && kc(i) && gm(s, i) && (rt(n) || Oc(n)));
}
function tT(n, e) {
  return n != null && eT(n, e, ZA);
}
var nT = 1, rT = 2;
function iT(n, e) {
  return Ac(n) && _m(e) ? Pm(xs(n), e) : function(t) {
    var r = EE(t, n);
    return r === void 0 && r === e ? tT(t, n) : Nc(e, r, nT | rT);
  };
}
function $m(n) {
  return function(e) {
    return e == null ? void 0 : e[n];
  };
}
function oT(n) {
  return function(e) {
    return km(e, n);
  };
}
function sT(n) {
  return Ac(n) ? $m(xs(n)) : oT(n);
}
function lT(n) {
  return typeof n == "function" ? n : n == null ? xc : typeof n == "object" ? rt(n) ? iT(n[0], n[1]) : QA(n) : sT(n);
}
var yl = function() {
  return st.Date.now();
}, aT = "Expected a function", cT = Math.max, fT = Math.min;
function uT(n, e, t) {
  var r, i, o, s, l, a, c = 0, f = !1, u = !1, h = !0;
  if (typeof n != "function")
    throw new TypeError(aT);
  e = jn(e) || 0, Gt(t) && (f = !!t.leading, u = "maxWait" in t, o = u ? cT(jn(t.maxWait) || 0, e) : o, h = "trailing" in t ? !!t.trailing : h);
  function d(C) {
    var D = r, R = i;
    return r = i = void 0, c = C, s = n.apply(R, D), s;
  }
  function p(C) {
    return c = C, l = setTimeout(y, e), f ? d(C) : s;
  }
  function g(C) {
    var D = C - a, R = C - c, A = e - D;
    return u ? fT(A, o - R) : A;
  }
  function m(C) {
    var D = C - a, R = C - c;
    return a === void 0 || D >= e || D < 0 || u && R >= o;
  }
  function y() {
    var C = yl();
    if (m(C))
      return x(C);
    l = setTimeout(y, g(C));
  }
  function x(C) {
    return l = void 0, h && r ? d(C) : (r = i = void 0, s);
  }
  function O() {
    l !== void 0 && clearTimeout(l), c = 0, r = a = i = l = void 0;
  }
  function N() {
    return l === void 0 ? s : x(yl());
  }
  function T() {
    var C = yl(), D = m(C);
    if (r = arguments, i = this, a = C, D) {
      if (l === void 0)
        return p(a);
      if (u)
        return clearTimeout(l), l = setTimeout(y, e), d(a);
    }
    return l === void 0 && (l = setTimeout(y, e)), s;
  }
  return T.cancel = O, T.flush = N, T;
}
function bl(n) {
  return wt(n) && ym(n);
}
var hT = 200;
function dT(n, e, t, r) {
  var i = -1, o = Qk, s = !0, l = n.length, a = [], c = e.length;
  if (!l)
    return a;
  t && (e = dm(e, Ec(t))), e.length >= hT && (o = Dm, s = !1, e = new Kr(e));
  e:
    for (; ++i < l; ) {
      var f = n[i], u = t == null ? f : t(f);
      if (f = f !== 0 ? f : 0, s && u === u) {
        for (var h = c; h--; )
          if (e[h] === u)
            continue e;
        a.push(f);
      } else o(e, u, r) || a.push(f);
    }
  return a;
}
function pT(n) {
  var e = n == null ? 0 : n.length;
  return e ? n[e - 1] : void 0;
}
var DD = nO(function(n, e) {
  var t = pT(e);
  return bl(t) && (t = void 0), bl(n) ? dT(n, TE(e, 1, bl), lT(t)) : [];
}), gT = "[object Number]";
function RD(n) {
  return typeof n == "number" || wt(n) && tn(n) == gT;
}
var mT = "[object RegExp]";
function yT(n) {
  return wt(n) && tn(n) == mT;
}
var Jh = Ao && Ao.isRegExp, bT = Jh ? Ec(Jh) : yT, wT = $m("length"), Lm = "\\ud800-\\udfff", ST = "\\u0300-\\u036f", vT = "\\ufe20-\\ufe2f", CT = "\\u20d0-\\u20ff", xT = ST + vT + CT, kT = "\\ufe0e\\ufe0f", OT = "[" + Lm + "]", Oa = "[" + xT + "]", Ea = "\\ud83c[\\udffb-\\udfff]", ET = "(?:" + Oa + "|" + Ea + ")", Bm = "[^" + Lm + "]", zm = "(?:\\ud83c[\\udde6-\\uddff]){2}", Fm = "[\\ud800-\\udbff][\\udc00-\\udfff]", AT = "\\u200d", jm = ET + "?", Vm = "[" + kT + "]?", TT = "(?:" + AT + "(?:" + [Bm, zm, Fm].join("|") + ")" + Vm + jm + ")*", MT = Vm + jm + TT, NT = "(?:" + [Bm + Oa + "?", Oa, zm, Fm, OT].join("|") + ")", Kh = RegExp(Ea + "(?=" + Ea + ")|" + NT + MT, "g");
function IT(n) {
  for (var e = Kh.lastIndex = 0; Kh.test(n); )
    ++e;
  return e;
}
function DT(n) {
  return Mc(n) ? IT(n) : wT(n);
}
var RT = "Expected a function";
function _D(n, e, t) {
  var r = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(RT);
  return Gt(t) && (r = "leading" in t ? !!t.leading : r, i = "trailing" in t ? !!t.trailing : i), uT(n, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var _T = 30, PT = "...", $T = /\w*$/;
function PD(n, e) {
  var t = _T, r = PT;
  if (Gt(e)) {
    var i = "separator" in e ? e.separator : i;
    t = "length" in e ? xk(e.length) : t, r = "omission" in e ? Eo(e.omission) : r;
  }
  n = wa(n);
  var o = n.length;
  if (Mc(n)) {
    var s = ZE(n);
    o = s.length;
  }
  if (t >= o)
    return n;
  var l = t - DT(r);
  if (l < 1)
    return r;
  var a = s ? NE(s, 0, l).join("") : n.slice(0, l);
  if (i === void 0)
    return a + r;
  if (s && (l += a.length - l), bT(i)) {
    if (n.slice(l).search(i)) {
      var c, f = a;
      for (i.global || (i = RegExp(i.source, wa($T.exec(i)) + "g")), i.lastIndex = 0; c = i.exec(f); )
        var u = c.index;
      a = a.slice(0, u === void 0 ? l : u);
    }
  } else if (n.indexOf(Eo(i), l) != l) {
    var h = a.lastIndexOf(i);
    h > -1 && (a = a.slice(0, h));
  }
  return a + r;
}
const Qe = () => /* @__PURE__ */ new Map(), Aa = (n) => {
  const e = Qe();
  return n.forEach((t, r) => {
    e.set(r, t);
  }), e;
}, lr = (n, e, t) => {
  let r = n.get(e);
  return r === void 0 && n.set(e, r = t()), r;
}, LT = (n, e) => {
  const t = [];
  for (const [r, i] of n)
    t.push(e(i, r));
  return t;
}, BT = (n, e) => {
  for (const [t, r] of n)
    if (e(r, t))
      return !0;
  return !1;
}, Yn = () => /* @__PURE__ */ new Set(), wl = (n) => n[n.length - 1], Xn = Array.from, zT = Array.isArray;
class FT {
  constructor() {
    this._observers = Qe();
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  on(e, t) {
    return lr(
      this._observers,
      /** @type {string} */
      e,
      Yn
    ).add(t), t;
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  once(e, t) {
    const r = (...i) => {
      this.off(
        e,
        /** @type {any} */
        r
      ), t(...i);
    };
    this.on(
      e,
      /** @type {any} */
      r
    );
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  off(e, t) {
    const r = this._observers.get(e);
    r !== void 0 && (r.delete(t), r.size === 0 && this._observers.delete(e));
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name The event name.
   * @param {Parameters<EVENTS[NAME]>} args The arguments that are applied to the event listener.
   */
  emit(e, t) {
    return Xn((this._observers.get(e) || Qe()).values()).forEach((r) => r(...t));
  }
  destroy() {
    this._observers = Qe();
  }
}
const wn = Math.floor, Wi = Math.abs, Wm = (n, e) => n < e ? n : e, ar = (n, e) => n > e ? n : e, jT = (n) => n !== 0 ? n < 0 : 1 / n < 0, Gh = 1, qh = 2, Sl = 4, vl = 8, VT = 32, Um = 64, To = 128, WT = 31, Yh = 63, Dr = 127, UT = 2147483647, HT = Number.isInteger || ((n) => typeof n == "number" && isFinite(n) && wn(n) === n), JT = (n) => n.toLowerCase(), KT = /^\s*/g, GT = (n) => n.replace(KT, ""), qT = /([A-Z])/g, Xh = (n, e) => GT(n.replace(qT, (t) => `${e}${JT(t)}`)), YT = (n) => {
  const e = unescape(encodeURIComponent(n)), t = e.length, r = new Uint8Array(t);
  for (let i = 0; i < t; i++)
    r[i] = /** @type {number} */
    e.codePointAt(i);
  return r;
}, Gr = (
  /** @type {TextEncoder} */
  typeof TextEncoder < "u" ? new TextEncoder() : null
), XT = (n) => Gr.encode(n), QT = Gr ? XT : YT;
let Cl = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", { fatal: !0, ignoreBOM: !0 });
Cl && Cl.decode(new Uint8Array()).length === 1 && (Cl = null);
class ui {
  constructor() {
    this.cpos = 0, this.cbuf = new Uint8Array(100), this.bufs = [];
  }
}
const Ic = () => new ui(), ZT = (n) => {
  let e = n.cpos;
  for (let t = 0; t < n.bufs.length; t++)
    e += n.bufs[t].length;
  return e;
}, mt = (n) => {
  const e = new Uint8Array(ZT(n));
  let t = 0;
  for (let r = 0; r < n.bufs.length; r++) {
    const i = n.bufs[r];
    e.set(i, t), t += i.length;
  }
  return e.set(new Uint8Array(n.cbuf.buffer, 0, n.cpos), t), e;
}, eM = (n, e) => {
  const t = n.cbuf.length;
  t - n.cpos < e && (n.bufs.push(new Uint8Array(n.cbuf.buffer, 0, n.cpos)), n.cbuf = new Uint8Array(ar(t, e) * 2), n.cpos = 0);
}, ie = (n, e) => {
  const t = n.cbuf.length;
  n.cpos === t && (n.bufs.push(n.cbuf), n.cbuf = new Uint8Array(t * 2), n.cpos = 0), n.cbuf[n.cpos++] = e;
}, Ta = ie, V = (n, e) => {
  for (; e > Dr; )
    ie(n, To | Dr & e), e = wn(e / 128);
  ie(n, Dr & e);
}, Dc = (n, e) => {
  const t = jT(e);
  for (t && (e = -e), ie(n, (e > Yh ? To : 0) | (t ? Um : 0) | Yh & e), e = wn(e / 64); e > 0; )
    ie(n, (e > Dr ? To : 0) | Dr & e), e = wn(e / 128);
}, Ma = new Uint8Array(3e4), tM = Ma.length / 3, nM = (n, e) => {
  if (e.length < tM) {
    const t = Gr.encodeInto(e, Ma).written || 0;
    V(n, t);
    for (let r = 0; r < t; r++)
      ie(n, Ma[r]);
  } else
    Ae(n, QT(e));
}, rM = (n, e) => {
  const t = unescape(encodeURIComponent(e)), r = t.length;
  V(n, r);
  for (let i = 0; i < r; i++)
    ie(
      n,
      /** @type {number} */
      t.codePointAt(i)
    );
}, Vn = Gr && /** @type {any} */
Gr.encodeInto ? nM : rM, Rc = (n, e) => {
  const t = n.cbuf.length, r = n.cpos, i = Wm(t - r, e.length), o = e.length - i;
  n.cbuf.set(e.subarray(0, i), r), n.cpos += i, o > 0 && (n.bufs.push(n.cbuf), n.cbuf = new Uint8Array(ar(t * 2, o)), n.cbuf.set(e.subarray(i)), n.cpos = o);
}, Ae = (n, e) => {
  V(n, e.byteLength), Rc(n, e);
}, _c = (n, e) => {
  eM(n, e);
  const t = new DataView(n.cbuf.buffer, n.cpos, e);
  return n.cpos += e, t;
}, iM = (n, e) => _c(n, 4).setFloat32(0, e, !1), oM = (n, e) => _c(n, 8).setFloat64(0, e, !1), sM = (n, e) => (
  /** @type {any} */
  _c(n, 8).setBigInt64(0, e, !1)
), Qh = new DataView(new ArrayBuffer(4)), lM = (n) => (Qh.setFloat32(0, n), Qh.getFloat32(0) === n), qr = (n, e) => {
  switch (typeof e) {
    case "string":
      ie(n, 119), Vn(n, e);
      break;
    case "number":
      HT(e) && Wi(e) <= UT ? (ie(n, 125), Dc(n, e)) : lM(e) ? (ie(n, 124), iM(n, e)) : (ie(n, 123), oM(n, e));
      break;
    case "bigint":
      ie(n, 122), sM(n, e);
      break;
    case "object":
      if (e === null)
        ie(n, 126);
      else if (zT(e)) {
        ie(n, 117), V(n, e.length);
        for (let t = 0; t < e.length; t++)
          qr(n, e[t]);
      } else if (e instanceof Uint8Array)
        ie(n, 116), Ae(n, e);
      else {
        ie(n, 118);
        const t = Object.keys(e);
        V(n, t.length);
        for (let r = 0; r < t.length; r++) {
          const i = t[r];
          Vn(n, i), qr(n, e[i]);
        }
      }
      break;
    case "boolean":
      ie(n, e ? 120 : 121);
      break;
    default:
      ie(n, 127);
  }
};
class Zh extends ui {
  /**
   * @param {function(Encoder, T):void} writer
   */
  constructor(e) {
    super(), this.w = e, this.s = null, this.count = 0;
  }
  /**
   * @param {T} v
   */
  write(e) {
    this.s === e ? this.count++ : (this.count > 0 && V(this, this.count - 1), this.count = 1, this.w(this, e), this.s = e);
  }
}
const ed = (n) => {
  n.count > 0 && (Dc(n.encoder, n.count === 1 ? n.s : -n.s), n.count > 1 && V(n.encoder, n.count - 2));
};
class Ui {
  constructor() {
    this.encoder = new ui(), this.s = 0, this.count = 0;
  }
  /**
   * @param {number} v
   */
  write(e) {
    this.s === e ? this.count++ : (ed(this), this.count = 1, this.s = e);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return ed(this), mt(this.encoder);
  }
}
const td = (n) => {
  if (n.count > 0) {
    const e = n.diff * 2 + (n.count === 1 ? 0 : 1);
    Dc(n.encoder, e), n.count > 1 && V(n.encoder, n.count - 2);
  }
};
class xl {
  constructor() {
    this.encoder = new ui(), this.s = 0, this.count = 0, this.diff = 0;
  }
  /**
   * @param {number} v
   */
  write(e) {
    this.diff === e - this.s ? (this.s = e, this.count++) : (td(this), this.count = 1, this.diff = e - this.s, this.s = e);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return td(this), mt(this.encoder);
  }
}
class aM {
  constructor() {
    this.sarr = [], this.s = "", this.lensE = new Ui();
  }
  /**
   * @param {string} string
   */
  write(e) {
    this.s += e, this.s.length > 19 && (this.sarr.push(this.s), this.s = ""), this.lensE.write(e.length);
  }
  toUint8Array() {
    const e = new ui();
    return this.sarr.push(this.s), this.s = "", Vn(e, this.sarr.join("")), Rc(e, this.lensE.toUint8Array()), mt(e);
  }
}
const Qn = (n) => new Error(n), Ze = () => {
  throw Qn("Method unimplemented");
}, qt = () => {
  throw Qn("Unexpected case");
}, cM = crypto.getRandomValues.bind(crypto), Hm = () => cM(new Uint32Array(1))[0], fM = "10000000-1000-4000-8000" + -1e11, uM = () => fM.replace(
  /[018]/g,
  /** @param {number} c */
  (n) => (n ^ Hm() & 15 >> n / 4).toString(16)
), nd = (n) => (
  /** @type {Promise<T>} */
  new Promise(n)
);
Promise.all.bind(Promise);
const rd = (n) => n === void 0 ? null : n;
class hM {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {string} key
   * @param {any} newValue
   */
  setItem(e, t) {
    this.map.set(e, t);
  }
  /**
   * @param {string} key
   */
  getItem(e) {
    return this.map.get(e);
  }
}
let Jm = new hM(), dM = !0;
try {
  typeof localStorage < "u" && localStorage && (Jm = localStorage, dM = !1);
} catch {
}
const pM = Jm, gM = Object.assign, mM = Object.keys, yM = (n, e) => {
  for (const t in n)
    e(n[t], t);
}, id = (n) => mM(n).length, bM = (n) => {
  for (const e in n)
    return !1;
  return !0;
}, wM = (n, e) => {
  for (const t in n)
    if (!e(n[t], t))
      return !1;
  return !0;
}, SM = (n, e) => Object.prototype.hasOwnProperty.call(n, e), vM = (n, e) => n === e || id(n) === id(e) && wM(n, (t, r) => (t !== void 0 || SM(e, r)) && e[r] === t), CM = Object.freeze, Km = (n) => {
  for (const e in n) {
    const t = n[e];
    (typeof t == "object" || typeof t == "function") && Km(n[e]);
  }
  return CM(n);
}, Pc = (n, e, t = 0) => {
  try {
    for (; t < n.length; t++)
      n[t](...e);
  } finally {
    t < n.length && Pc(n, e, t + 1);
  }
}, xM = (n, e) => e.includes(n), Yr = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]";
let Ue;
const kM = () => {
  if (Ue === void 0)
    if (Yr) {
      Ue = Qe();
      const n = process.argv;
      let e = null;
      for (let t = 0; t < n.length; t++) {
        const r = n[t];
        r[0] === "-" ? (e !== null && Ue.set(e, ""), e = r) : e !== null && (Ue.set(e, r), e = null);
      }
      e !== null && Ue.set(e, "");
    } else typeof location == "object" ? (Ue = Qe(), (location.search || "?").slice(1).split("&").forEach((n) => {
      if (n.length !== 0) {
        const [e, t] = n.split("=");
        Ue.set(`--${Xh(e, "-")}`, t), Ue.set(`-${Xh(e, "-")}`, t);
      }
    })) : Ue = Qe();
  return Ue;
}, Na = (n) => kM().has(n), Mo = (n) => rd(Yr ? process.env[n.toUpperCase().replaceAll("-", "_")] : pM.getItem(n)), Gm = (n) => Na("--" + n) || Mo(n) !== null;
Gm("production");
const OM = Yr && xM(process.env.FORCE_COLOR, ["true", "1", "2"]), EM = OM || !Na("--no-colors") && // @todo deprecate --no-colors
!Gm("no-color") && (!Yr || process.stdout.isTTY) && (!Yr || Na("--color") || Mo("COLORTERM") !== null || (Mo("TERM") || "").includes("color"));
class AM {
  /**
   * @param {L} left
   * @param {R} right
   */
  constructor(e, t) {
    this.left = e, this.right = t;
  }
}
const ht = (n, e) => new AM(n, e);
typeof DOMParser < "u" && new DOMParser();
const TM = (n) => LT(n, (e, t) => `${t}:${e};`).join(""), kt = Symbol, qm = kt(), Ym = kt(), MM = kt(), NM = kt(), IM = kt(), Xm = kt(), DM = kt(), $c = kt(), RM = kt(), _M = (n) => {
  var i;
  n.length === 1 && ((i = n[0]) == null ? void 0 : i.constructor) === Function && (n = /** @type {Array<string|Symbol|Object|number>} */
  /** @type {[function]} */
  n[0]());
  const e = [], t = [];
  let r = 0;
  for (; r < n.length; r++) {
    const o = n[r];
    if (o === void 0)
      break;
    if (o.constructor === String || o.constructor === Number)
      e.push(o);
    else if (o.constructor === Object)
      break;
  }
  for (r > 0 && t.push(e.join("")); r < n.length; r++) {
    const o = n[r];
    o instanceof Symbol || t.push(o);
  }
  return t;
}, PM = {
  [qm]: ht("font-weight", "bold"),
  [Ym]: ht("font-weight", "normal"),
  [MM]: ht("color", "blue"),
  [IM]: ht("color", "green"),
  [NM]: ht("color", "grey"),
  [Xm]: ht("color", "red"),
  [DM]: ht("color", "purple"),
  [$c]: ht("color", "orange"),
  // not well supported in chrome when debugging node with inspector - TODO: deprecate
  [RM]: ht("color", "black")
}, $M = (n) => {
  var s;
  n.length === 1 && ((s = n[0]) == null ? void 0 : s.constructor) === Function && (n = /** @type {Array<string|Symbol|Object|number>} */
  /** @type {[function]} */
  n[0]());
  const e = [], t = [], r = Qe();
  let i = [], o = 0;
  for (; o < n.length; o++) {
    const l = n[o], a = PM[l];
    if (a !== void 0)
      r.set(a.left, a.right);
    else {
      if (l === void 0)
        break;
      if (l.constructor === String || l.constructor === Number) {
        const c = TM(r);
        o > 0 || c.length > 0 ? (e.push("%c" + l), t.push(c)) : e.push(l);
      } else
        break;
    }
  }
  for (o > 0 && (i = t, i.unshift(e.join(""))); o < n.length; o++) {
    const l = n[o];
    l instanceof Symbol || i.push(l);
  }
  return i;
}, Qm = EM ? $M : _M, LM = (...n) => {
  console.log(...Qm(n)), Zm.forEach((e) => e.print(n));
}, BM = (...n) => {
  console.warn(...Qm(n)), n.unshift($c), Zm.forEach((e) => e.print(n));
}, Zm = Yn(), ey = (n) => ({
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return this;
  },
  // @ts-ignore
  next: n
}), zM = (n, e) => ey(() => {
  let t;
  do
    t = n.next();
  while (!t.done && !e(t.value));
  return t;
}), kl = (n, e) => ey(() => {
  const { done: t, value: r } = n.next();
  return { done: t, value: t ? void 0 : e(r) };
});
class FM {
  /**
   * @param {number} clock
   * @param {number} len
   */
  constructor(e, t) {
    this.clock = e, this.len = t;
  }
}
class jM {
  constructor() {
    this.clients = /* @__PURE__ */ new Map();
  }
}
const ty = (n, e, t) => e.clients.forEach((r, i) => {
  const o = (
    /** @type {Array<GC|Item>} */
    n.doc.store.clients.get(i)
  );
  for (let s = 0; s < r.length; s++) {
    const l = r[s];
    ay(n, o, l.clock, l.len, t);
  }
}), VM = (n, e) => {
  let t = 0, r = n.length - 1;
  for (; t <= r; ) {
    const i = wn((t + r) / 2), o = n[i], s = o.clock;
    if (s <= e) {
      if (e < s + o.len)
        return i;
      t = i + 1;
    } else
      r = i - 1;
  }
  return null;
}, ny = (n, e) => {
  const t = n.clients.get(e.client);
  return t !== void 0 && VM(t, e.clock) !== null;
}, ry = (n) => {
  n.clients.forEach((e) => {
    e.sort((i, o) => i.clock - o.clock);
    let t, r;
    for (t = 1, r = 1; t < e.length; t++) {
      const i = e[r - 1], o = e[t];
      i.clock + i.len >= o.clock ? i.len = ar(i.len, o.clock + o.len - i.clock) : (r < t && (e[r] = o), r++);
    }
    e.length = r;
  });
}, iy = (n, e, t, r) => {
  lr(n.clients, e, () => (
    /** @type {Array<DeleteItem>} */
    []
  )).push(new FM(t, r));
}, WM = (n, e) => {
  V(n.restEncoder, e.clients.size), Xn(e.clients.entries()).sort((t, r) => r[0] - t[0]).forEach(([t, r]) => {
    n.resetDsCurVal(), V(n.restEncoder, t);
    const i = r.length;
    V(n.restEncoder, i);
    for (let o = 0; o < i; o++) {
      const s = r[o];
      n.writeDsClock(s.clock), n.writeDsLen(s.len);
    }
  });
}, oy = Hm;
class hi extends FT {
  /**
   * @param {DocOpts} opts configuration
   */
  constructor({ guid: e = uM(), collectionid: t = null, gc: r = !0, gcFilter: i = () => !0, meta: o = null, autoLoad: s = !1, shouldLoad: l = !0 } = {}) {
    super(), this.gc = r, this.gcFilter = i, this.clientID = oy(), this.guid = e, this.collectionid = t, this.share = /* @__PURE__ */ new Map(), this.store = new QM(), this._transaction = null, this._transactionCleanups = [], this.subdocs = /* @__PURE__ */ new Set(), this._item = null, this.shouldLoad = l, this.autoLoad = s, this.meta = o, this.isLoaded = !1, this.isSynced = !1, this.isDestroyed = !1, this.whenLoaded = nd((c) => {
      this.on("load", () => {
        this.isLoaded = !0, c(this);
      });
    });
    const a = () => nd((c) => {
      const f = (u) => {
        (u === void 0 || u === !0) && (this.off("sync", f), c());
      };
      this.on("sync", f);
    });
    this.on("sync", (c) => {
      c === !1 && this.isSynced && (this.whenSynced = a()), this.isSynced = c === void 0 || c === !0, this.isSynced && !this.isLoaded && this.emit("load", [this]);
    }), this.whenSynced = a();
  }
  /**
   * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
   *
   * `load()` might be used in the future to request any provider to load the most current data.
   *
   * It is safe to call `load()` multiple times.
   */
  load() {
    const e = this._item;
    e !== null && !this.shouldLoad && H(
      /** @type {any} */
      e.parent.doc,
      (t) => {
        t.subdocsLoaded.add(this);
      },
      null,
      !0
    ), this.shouldLoad = !0;
  }
  getSubdocs() {
    return this.subdocs;
  }
  getSubdocGuids() {
    return new Set(Xn(this.subdocs).map((e) => e.guid));
  }
  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @template T
   * @param {function(Transaction):T} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   * @return T
   *
   * @public
   */
  transact(e, t = null) {
    return H(this, e, t);
  }
  /**
   * Define a shared data type.
   *
   * Multiple calls of `ydoc.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `ydoc.get(name, Y.Array) === ydoc.get(name, Y.Array)`
   *
   * After this method is called, the type is also available on `ydoc.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Y.Doc instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @template {typeof AbstractType<any>} Type
   * @example
   *   const ydoc = new Y.Doc(..)
   *   const appState = {
   *     document: ydoc.getText('document')
   *     comments: ydoc.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Type} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {InstanceType<Type>} The created type. Constructed with TypeConstructor
   *
   * @public
   */
  get(e, t = (
    /** @type {any} */
    de
  )) {
    const r = lr(this.share, e, () => {
      const o = new t();
      return o._integrate(this, null), o;
    }), i = r.constructor;
    if (t !== de && i !== t)
      if (i === de) {
        const o = new t();
        o._map = r._map, r._map.forEach(
          /** @param {Item?} n */
          (s) => {
            for (; s !== null; s = s.left)
              s.parent = o;
          }
        ), o._start = r._start;
        for (let s = o._start; s !== null; s = s.right)
          s.parent = o;
        return o._length = r._length, this.share.set(e, o), o._integrate(this, null), /** @type {InstanceType<Type>} */
        o;
      } else
        throw new Error(`Type with the name ${e} has already been defined with a different constructor`);
    return (
      /** @type {InstanceType<Type>} */
      r
    );
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YArray<T>}
   *
   * @public
   */
  getArray(e = "") {
    return (
      /** @type {YArray<T>} */
      this.get(e, Rr)
    );
  }
  /**
   * @param {string} [name]
   * @return {YText}
   *
   * @public
   */
  getText(e = "") {
    return this.get(e, ei);
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YMap<T>}
   *
   * @public
   */
  getMap(e = "") {
    return (
      /** @type {YMap<T>} */
      this.get(e, Ro)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlElement}
   *
   * @public
   */
  getXmlElement(e = "") {
    return (
      /** @type {YXmlElement<{[key:string]:string}>} */
      this.get(e, ti)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlFragment}
   *
   * @public
   */
  getXmlFragment(e = "") {
    return this.get(e, Zn);
  }
  /**
   * Converts the entire document into a js object, recursively traversing each yjs type
   * Doesn't log types that have not been defined (using ydoc.getType(..)).
   *
   * @deprecated Do not use this method and rather call toJSON directly on the shared types.
   *
   * @return {Object<string, any>}
   */
  toJSON() {
    const e = {};
    return this.share.forEach((t, r) => {
      e[r] = t.toJSON();
    }), e;
  }
  /**
   * Emit `destroy` event and unregister all event handlers.
   */
  destroy() {
    this.isDestroyed = !0, Xn(this.subdocs).forEach((t) => t.destroy());
    const e = this._item;
    if (e !== null) {
      this._item = null;
      const t = (
        /** @type {ContentDoc} */
        e.content
      );
      t.doc = new hi({ guid: this.guid, ...t.opts, shouldLoad: !1 }), t.doc._item = e, H(
        /** @type {any} */
        e.parent.doc,
        (r) => {
          const i = t.doc;
          e.deleted || r.subdocsAdded.add(i), r.subdocsRemoved.add(this);
        },
        null,
        !0
      );
    }
    this.emit("destroyed", [!0]), this.emit("destroy", [this]), super.destroy();
  }
}
class UM {
  constructor() {
    this.restEncoder = Ic();
  }
  toUint8Array() {
    return mt(this.restEncoder);
  }
  resetDsCurVal() {
  }
  /**
   * @param {number} clock
   */
  writeDsClock(e) {
    V(this.restEncoder, e);
  }
  /**
   * @param {number} len
   */
  writeDsLen(e) {
    V(this.restEncoder, e);
  }
}
class HM extends UM {
  /**
   * @param {ID} id
   */
  writeLeftID(e) {
    V(this.restEncoder, e.client), V(this.restEncoder, e.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(e) {
    V(this.restEncoder, e.client), V(this.restEncoder, e.clock);
  }
  /**
   * Use writeClient and writeClock instead of writeID if possible.
   * @param {number} client
   */
  writeClient(e) {
    V(this.restEncoder, e);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(e) {
    Ta(this.restEncoder, e);
  }
  /**
   * @param {string} s
   */
  writeString(e) {
    Vn(this.restEncoder, e);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(e) {
    V(this.restEncoder, e ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(e) {
    V(this.restEncoder, e);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(e) {
    V(this.restEncoder, e);
  }
  /**
   * @param {any} any
   */
  writeAny(e) {
    qr(this.restEncoder, e);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(e) {
    Ae(this.restEncoder, e);
  }
  /**
   * @param {any} embed
   */
  writeJSON(e) {
    Vn(this.restEncoder, JSON.stringify(e));
  }
  /**
   * @param {string} key
   */
  writeKey(e) {
    Vn(this.restEncoder, e);
  }
}
class JM {
  constructor() {
    this.restEncoder = Ic(), this.dsCurrVal = 0;
  }
  toUint8Array() {
    return mt(this.restEncoder);
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @param {number} clock
   */
  writeDsClock(e) {
    const t = e - this.dsCurrVal;
    this.dsCurrVal = e, V(this.restEncoder, t);
  }
  /**
   * @param {number} len
   */
  writeDsLen(e) {
    e === 0 && qt(), V(this.restEncoder, e - 1), this.dsCurrVal += e;
  }
}
class KM extends JM {
  constructor() {
    super(), this.keyMap = /* @__PURE__ */ new Map(), this.keyClock = 0, this.keyClockEncoder = new xl(), this.clientEncoder = new Ui(), this.leftClockEncoder = new xl(), this.rightClockEncoder = new xl(), this.infoEncoder = new Zh(Ta), this.stringEncoder = new aM(), this.parentInfoEncoder = new Zh(Ta), this.typeRefEncoder = new Ui(), this.lenEncoder = new Ui();
  }
  toUint8Array() {
    const e = Ic();
    return V(e, 0), Ae(e, this.keyClockEncoder.toUint8Array()), Ae(e, this.clientEncoder.toUint8Array()), Ae(e, this.leftClockEncoder.toUint8Array()), Ae(e, this.rightClockEncoder.toUint8Array()), Ae(e, mt(this.infoEncoder)), Ae(e, this.stringEncoder.toUint8Array()), Ae(e, mt(this.parentInfoEncoder)), Ae(e, this.typeRefEncoder.toUint8Array()), Ae(e, this.lenEncoder.toUint8Array()), Rc(e, mt(this.restEncoder)), mt(e);
  }
  /**
   * @param {ID} id
   */
  writeLeftID(e) {
    this.clientEncoder.write(e.client), this.leftClockEncoder.write(e.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(e) {
    this.clientEncoder.write(e.client), this.rightClockEncoder.write(e.clock);
  }
  /**
   * @param {number} client
   */
  writeClient(e) {
    this.clientEncoder.write(e);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(e) {
    this.infoEncoder.write(e);
  }
  /**
   * @param {string} s
   */
  writeString(e) {
    this.stringEncoder.write(e);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(e) {
    this.parentInfoEncoder.write(e ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(e) {
    this.typeRefEncoder.write(e);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(e) {
    this.lenEncoder.write(e);
  }
  /**
   * @param {any} any
   */
  writeAny(e) {
    qr(this.restEncoder, e);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(e) {
    Ae(this.restEncoder, e);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @param {any} embed
   */
  writeJSON(e) {
    qr(this.restEncoder, e);
  }
  /**
   * Property keys are often reused. For example, in y-prosemirror the key `bold` might
   * occur very often. For a 3d application, the key `position` might occur very often.
   *
   * We cache these keys in a Map and refer to them via a unique number.
   *
   * @param {string} key
   */
  writeKey(e) {
    const t = this.keyMap.get(e);
    t === void 0 ? (this.keyClockEncoder.write(this.keyClock++), this.stringEncoder.write(e)) : this.keyClockEncoder.write(t);
  }
}
const GM = (n, e, t, r) => {
  r = ar(r, e[0].id.clock);
  const i = St(e, r);
  V(n.restEncoder, e.length - i), n.writeClient(t), V(n.restEncoder, r);
  const o = e[i];
  o.write(n, r - o.id.clock);
  for (let s = i + 1; s < e.length; s++)
    e[s].write(n, 0);
}, qM = (n, e, t) => {
  const r = /* @__PURE__ */ new Map();
  t.forEach((i, o) => {
    Oe(e, o) > i && r.set(o, i);
  }), Lc(e).forEach((i, o) => {
    t.has(o) || r.set(o, 0);
  }), V(n.restEncoder, r.size), Xn(r.entries()).sort((i, o) => o[0] - i[0]).forEach(([i, o]) => {
    GM(
      n,
      /** @type {Array<GC|Item>} */
      e.clients.get(i),
      i,
      o
    );
  });
}, YM = (n, e) => qM(n, e.doc.store, e.beforeState);
class XM {
  constructor() {
    this.l = [];
  }
}
const od = () => new XM(), sd = (n, e) => n.l.push(e), ld = (n, e) => {
  const t = n.l, r = t.length;
  n.l = t.filter((i) => e !== i), r === n.l.length && console.error("[yjs] Tried to remove event handler that doesn't exist.");
}, sy = (n, e, t) => Pc(n.l, [e, t]);
class Hi {
  /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */
  constructor(e, t) {
    this.client = e, this.clock = t;
  }
}
const vi = (n, e) => n === e || n !== null && e !== null && n.client === e.client && n.clock === e.clock, J = (n, e) => new Hi(n, e), Xr = (n) => {
  for (const [e, t] of n.doc.share.entries())
    if (t === n)
      return e;
  throw qt();
};
class No {
  /**
   * @param {ID|null} type
   * @param {string|null} tname
   * @param {ID|null} item
   * @param {number} assoc
   */
  constructor(e, t, r, i = 0) {
    this.type = e, this.tname = t, this.item = r, this.assoc = i;
  }
}
const Ci = (n, e, t) => {
  let r = null, i = null;
  return n._item === null ? i = Xr(n) : r = J(n._item.id.client, n._item.id.clock), new No(r, i, e, t);
}, Ol = (n, e, t = 0) => {
  let r = n._start;
  if (t < 0) {
    if (e === 0)
      return Ci(n, null, t);
    e--;
  }
  for (; r !== null; ) {
    if (!r.deleted && r.countable) {
      if (r.length > e)
        return Ci(n, J(r.id.client, r.id.clock + e), t);
      e -= r.length;
    }
    if (r.right === null && t < 0)
      return Ci(n, r.lastId, t);
    r = r.right;
  }
  return Ci(n, null, t);
}, Rn = (n, e) => e === void 0 ? !n.deleted : e.sv.has(n.id.client) && (e.sv.get(n.id.client) || 0) > n.id.clock && !ny(e.ds, n.id), Ia = (n, e) => {
  const t = lr(n.meta, Ia, Yn), r = n.doc.store;
  t.has(e) || (e.sv.forEach((i, o) => {
    i < Oe(r, o) && Yt(n, J(o, i));
  }), ty(n, e.ds, (i) => {
  }), t.add(e));
};
class QM {
  constructor() {
    this.clients = /* @__PURE__ */ new Map(), this.pendingStructs = null, this.pendingDs = null;
  }
}
const Lc = (n) => {
  const e = /* @__PURE__ */ new Map();
  return n.clients.forEach((t, r) => {
    const i = t[t.length - 1];
    e.set(r, i.id.clock + i.length);
  }), e;
}, Oe = (n, e) => {
  const t = n.clients.get(e);
  if (t === void 0)
    return 0;
  const r = t[t.length - 1];
  return r.id.clock + r.length;
}, ly = (n, e) => {
  let t = n.clients.get(e.id.client);
  if (t === void 0)
    t = [], n.clients.set(e.id.client, t);
  else {
    const r = t[t.length - 1];
    if (r.id.clock + r.length !== e.id.clock)
      throw qt();
  }
  t.push(e);
}, St = (n, e) => {
  let t = 0, r = n.length - 1, i = n[r], o = i.id.clock;
  if (o === e)
    return r;
  let s = wn(e / (o + i.length - 1) * r);
  for (; t <= r; ) {
    if (i = n[s], o = i.id.clock, o <= e) {
      if (e < o + i.length)
        return s;
      t = s + 1;
    } else
      r = s - 1;
    s = wn((t + r) / 2);
  }
  throw qt();
}, ZM = (n, e) => {
  const t = n.clients.get(e.client);
  return t[St(t, e.clock)];
}, El = (
  /** @type {function(StructStore,ID):Item} */
  ZM
), Da = (n, e, t) => {
  const r = St(e, t), i = e[r];
  return i.id.clock < t && i instanceof Me ? (e.splice(r + 1, 0, Ey(n, i, t - i.id.clock)), r + 1) : r;
}, Yt = (n, e) => {
  const t = (
    /** @type {Array<Item>} */
    n.doc.store.clients.get(e.client)
  );
  return t[Da(n, t, e.clock)];
}, ad = (n, e, t) => {
  const r = e.clients.get(t.client), i = St(r, t.clock), o = r[i];
  return t.clock !== o.id.clock + o.length - 1 && o.constructor !== $t && r.splice(i + 1, 0, Ey(n, o, t.clock - o.id.clock + 1)), o;
}, eN = (n, e, t) => {
  const r = (
    /** @type {Array<GC|Item>} */
    n.clients.get(e.id.client)
  );
  r[St(r, e.id.clock)] = t;
}, ay = (n, e, t, r, i) => {
  if (r === 0)
    return;
  const o = t + r;
  let s = Da(n, e, t), l;
  do
    l = e[s++], o < l.id.clock + l.length && Da(n, e, o), i(l);
  while (s < e.length && e[s].id.clock < o);
};
class tN {
  /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */
  constructor(e, t, r) {
    this.doc = e, this.deleteSet = new jM(), this.beforeState = Lc(e.store), this.afterState = /* @__PURE__ */ new Map(), this.changed = /* @__PURE__ */ new Map(), this.changedParentTypes = /* @__PURE__ */ new Map(), this._mergeStructs = [], this.origin = t, this.meta = /* @__PURE__ */ new Map(), this.local = r, this.subdocsAdded = /* @__PURE__ */ new Set(), this.subdocsRemoved = /* @__PURE__ */ new Set(), this.subdocsLoaded = /* @__PURE__ */ new Set(), this._needFormattingCleanup = !1;
  }
}
const cd = (n, e) => e.deleteSet.clients.size === 0 && !BT(e.afterState, (t, r) => e.beforeState.get(r) !== t) ? !1 : (ry(e.deleteSet), YM(n, e), WM(n, e.deleteSet), !0), fd = (n, e, t) => {
  const r = e._item;
  (r === null || r.id.clock < (n.beforeState.get(r.id.client) || 0) && !r.deleted) && lr(n.changed, e, Yn).add(t);
}, Ji = (n, e) => {
  let t = n[e], r = n[e - 1], i = e;
  for (; i > 0; t = r, r = n[--i - 1]) {
    if (r.deleted === t.deleted && r.constructor === t.constructor && r.mergeWith(t)) {
      t instanceof Me && t.parentSub !== null && /** @type {AbstractType<any>} */
      t.parent._map.get(t.parentSub) === t && t.parent._map.set(
        t.parentSub,
        /** @type {Item} */
        r
      );
      continue;
    }
    break;
  }
  const o = e - i;
  return o && n.splice(e + 1 - o, o), o;
}, nN = (n, e, t) => {
  for (const [r, i] of n.clients.entries()) {
    const o = (
      /** @type {Array<GC|Item>} */
      e.clients.get(r)
    );
    for (let s = i.length - 1; s >= 0; s--) {
      const l = i[s], a = l.clock + l.len;
      for (let c = St(o, l.clock), f = o[c]; c < o.length && f.id.clock < a; f = o[++c]) {
        const u = o[c];
        if (l.clock + l.len <= u.id.clock)
          break;
        u instanceof Me && u.deleted && !u.keep && t(u) && u.gc(e, !1);
      }
    }
  }
}, rN = (n, e) => {
  n.clients.forEach((t, r) => {
    const i = (
      /** @type {Array<GC|Item>} */
      e.clients.get(r)
    );
    for (let o = t.length - 1; o >= 0; o--) {
      const s = t[o], l = Wm(i.length - 1, 1 + St(i, s.clock + s.len - 1));
      for (let a = l, c = i[a]; a > 0 && c.id.clock >= s.clock; c = i[a])
        a -= 1 + Ji(i, a);
    }
  });
}, cy = (n, e) => {
  if (e < n.length) {
    const t = n[e], r = t.doc, i = r.store, o = t.deleteSet, s = t._mergeStructs;
    try {
      ry(o), t.afterState = Lc(t.doc.store), r.emit("beforeObserverCalls", [t, r]);
      const l = [];
      t.changed.forEach(
        (a, c) => l.push(() => {
          (c._item === null || !c._item.deleted) && c._callObserver(t, a);
        })
      ), l.push(() => {
        t.changedParentTypes.forEach((a, c) => {
          c._dEH.l.length > 0 && (c._item === null || !c._item.deleted) && (a = a.filter(
            (f) => f.target._item === null || !f.target._item.deleted
          ), a.forEach((f) => {
            f.currentTarget = c, f._path = null;
          }), a.sort((f, u) => f.path.length - u.path.length), sy(c._dEH, a, t));
        });
      }), l.push(() => r.emit("afterTransaction", [t, r])), Pc(l, []), t._needFormattingCleanup && gN(t);
    } finally {
      r.gc && nN(o, i, r.gcFilter), rN(o, i), t.afterState.forEach((f, u) => {
        const h = t.beforeState.get(u) || 0;
        if (h !== f) {
          const d = (
            /** @type {Array<GC|Item>} */
            i.clients.get(u)
          ), p = ar(St(d, h), 1);
          for (let g = d.length - 1; g >= p; )
            g -= 1 + Ji(d, g);
        }
      });
      for (let f = s.length - 1; f >= 0; f--) {
        const { client: u, clock: h } = s[f].id, d = (
          /** @type {Array<GC|Item>} */
          i.clients.get(u)
        ), p = St(d, h);
        p + 1 < d.length && Ji(d, p + 1) > 1 || p > 0 && Ji(d, p);
      }
      if (!t.local && t.afterState.get(r.clientID) !== t.beforeState.get(r.clientID) && (LM($c, qm, "[yjs] ", Ym, Xm, "Changed the client-id because another client seems to be using it."), r.clientID = oy()), r.emit("afterTransactionCleanup", [t, r]), r._observers.has("update")) {
        const f = new HM();
        cd(f, t) && r.emit("update", [f.toUint8Array(), t.origin, r, t]);
      }
      if (r._observers.has("updateV2")) {
        const f = new KM();
        cd(f, t) && r.emit("updateV2", [f.toUint8Array(), t.origin, r, t]);
      }
      const { subdocsAdded: l, subdocsLoaded: a, subdocsRemoved: c } = t;
      (l.size > 0 || c.size > 0 || a.size > 0) && (l.forEach((f) => {
        f.clientID = r.clientID, f.collectionid == null && (f.collectionid = r.collectionid), r.subdocs.add(f);
      }), c.forEach((f) => r.subdocs.delete(f)), r.emit("subdocs", [{ loaded: a, added: l, removed: c }, r, t]), c.forEach((f) => f.destroy())), n.length <= e + 1 ? (r._transactionCleanups = [], r.emit("afterAllTransactions", [r, n])) : cy(n, e + 1);
    }
  }
}, H = (n, e, t = null, r = !0) => {
  const i = n._transactionCleanups;
  let o = !1, s = null;
  n._transaction === null && (o = !0, n._transaction = new tN(n, t, r), i.push(n._transaction), i.length === 1 && n.emit("beforeAllTransactions", [n]), n.emit("beforeTransaction", [n._transaction, n]));
  try {
    s = e(n._transaction);
  } finally {
    if (o) {
      const l = n._transaction === i[0];
      n._transaction = null, l && cy(i, 0);
    }
  }
  return s;
}, ud = "You must not compute changes after the event-handler fired.";
class ks {
  /**
   * @param {T} target The changed type.
   * @param {Transaction} transaction
   */
  constructor(e, t) {
    this.target = e, this.currentTarget = e, this.transaction = t, this._changes = null, this._keys = null, this._delta = null, this._path = null;
  }
  /**
   * Computes the path from `y` to the changed type.
   *
   * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path() {
    return this._path || (this._path = iN(this.currentTarget, this.target));
  }
  /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  deletes(e) {
    return ny(this.transaction.deleteSet, e.id);
  }
  /**
   * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
   */
  get keys() {
    if (this._keys === null) {
      if (this.transaction.doc._transactionCleanups.length === 0)
        throw Qn(ud);
      const e = /* @__PURE__ */ new Map(), t = this.target;
      /** @type Set<string|null> */
      this.transaction.changed.get(t).forEach((i) => {
        if (i !== null) {
          const o = (
            /** @type {Item} */
            t._map.get(i)
          );
          let s, l;
          if (this.adds(o)) {
            let a = o.left;
            for (; a !== null && this.adds(a); )
              a = a.left;
            if (this.deletes(o))
              if (a !== null && this.deletes(a))
                s = "delete", l = wl(a.content.getContent());
              else
                return;
            else
              a !== null && this.deletes(a) ? (s = "update", l = wl(a.content.getContent())) : (s = "add", l = void 0);
          } else if (this.deletes(o))
            s = "delete", l = wl(
              /** @type {Item} */
              o.content.getContent()
            );
          else
            return;
          e.set(i, { action: s, oldValue: l });
        }
      }), this._keys = e;
    }
    return this._keys;
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
   */
  get delta() {
    return this.changes.delta;
  }
  /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  adds(e) {
    return e.id.clock >= (this.transaction.beforeState.get(e.id.client) || 0);
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    let e = this._changes;
    if (e === null) {
      if (this.transaction.doc._transactionCleanups.length === 0)
        throw Qn(ud);
      const t = this.target, r = Yn(), i = Yn(), o = [];
      if (e = {
        added: r,
        deleted: i,
        delta: o,
        keys: this.keys
      }, /** @type Set<string|null> */
      this.transaction.changed.get(t).has(null)) {
        let l = null;
        const a = () => {
          l && o.push(l);
        };
        for (let c = t._start; c !== null; c = c.right)
          c.deleted ? this.deletes(c) && !this.adds(c) && ((l === null || l.delete === void 0) && (a(), l = { delete: 0 }), l.delete += c.length, i.add(c)) : this.adds(c) ? ((l === null || l.insert === void 0) && (a(), l = { insert: [] }), l.insert = l.insert.concat(c.content.getContent()), r.add(c)) : ((l === null || l.retain === void 0) && (a(), l = { retain: 0 }), l.retain += c.length);
        l !== null && l.retain === void 0 && a();
      }
      this._changes = e;
    }
    return (
      /** @type {any} */
      e
    );
  }
}
const iN = (n, e) => {
  const t = [];
  for (; e._item !== null && e !== n; ) {
    if (e._item.parentSub !== null)
      t.unshift(e._item.parentSub);
    else {
      let r = 0, i = (
        /** @type {AbstractType<any>} */
        e._item.parent._start
      );
      for (; i !== e._item && i !== null; )
        !i.deleted && i.countable && (r += i.length), i = i.right;
      t.unshift(r);
    }
    e = /** @type {AbstractType<any>} */
    e._item.parent;
  }
  return t;
}, me = () => {
  BM("Invalid access: Add Yjs type to a document before reading data.");
}, fy = 80;
let Bc = 0;
class oN {
  /**
   * @param {Item} p
   * @param {number} index
   */
  constructor(e, t) {
    e.marker = !0, this.p = e, this.index = t, this.timestamp = Bc++;
  }
}
const sN = (n) => {
  n.timestamp = Bc++;
}, uy = (n, e, t) => {
  n.p.marker = !1, n.p = e, e.marker = !0, n.index = t, n.timestamp = Bc++;
}, lN = (n, e, t) => {
  if (n.length >= fy) {
    const r = n.reduce((i, o) => i.timestamp < o.timestamp ? i : o);
    return uy(r, e, t), r;
  } else {
    const r = new oN(e, t);
    return n.push(r), r;
  }
}, Os = (n, e) => {
  if (n._start === null || e === 0 || n._searchMarker === null)
    return null;
  const t = n._searchMarker.length === 0 ? null : n._searchMarker.reduce((o, s) => Wi(e - o.index) < Wi(e - s.index) ? o : s);
  let r = n._start, i = 0;
  for (t !== null && (r = t.p, i = t.index, sN(t)); r.right !== null && i < e; ) {
    if (!r.deleted && r.countable) {
      if (e < i + r.length)
        break;
      i += r.length;
    }
    r = r.right;
  }
  for (; r.left !== null && i > e; )
    r = r.left, !r.deleted && r.countable && (i -= r.length);
  for (; r.left !== null && r.left.id.client === r.id.client && r.left.id.clock + r.left.length === r.id.clock; )
    r = r.left, !r.deleted && r.countable && (i -= r.length);
  return t !== null && Wi(t.index - i) < /** @type {YText|YArray<any>} */
  r.parent.length / fy ? (uy(t, r, i), t) : lN(n._searchMarker, r, i);
}, Qr = (n, e, t) => {
  for (let r = n.length - 1; r >= 0; r--) {
    const i = n[r];
    if (t > 0) {
      let o = i.p;
      for (o.marker = !1; o && (o.deleted || !o.countable); )
        o = o.left, o && !o.deleted && o.countable && (i.index -= o.length);
      if (o === null || o.marker === !0) {
        n.splice(r, 1);
        continue;
      }
      i.p = o, o.marker = !0;
    }
    (e < i.index || t > 0 && e === i.index) && (i.index = ar(e, i.index + t));
  }
}, Es = (n, e, t) => {
  const r = n, i = e.changedParentTypes;
  for (; lr(i, n, () => []).push(t), n._item !== null; )
    n = /** @type {AbstractType<any>} */
    n._item.parent;
  sy(r._eH, t, e);
};
class de {
  constructor() {
    this._item = null, this._map = /* @__PURE__ */ new Map(), this._start = null, this.doc = null, this._length = 0, this._eH = od(), this._dEH = od(), this._searchMarker = null;
  }
  /**
   * @return {AbstractType<any>|null}
   */
  get parent() {
    return this._item ? (
      /** @type {AbstractType<any>} */
      this._item.parent
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */
  _integrate(e, t) {
    this.doc = e, this._item = t;
  }
  /**
   * @return {AbstractType<EventType>}
   */
  _copy() {
    throw Ze();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {AbstractType<EventType>}
   */
  clone() {
    throw Ze();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} _encoder
   */
  _write(e) {
  }
  /**
   * The first non-deleted item
   */
  get _first() {
    let e = this._start;
    for (; e !== null && e.deleted; )
      e = e.right;
    return e;
  }
  /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} _parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(e, t) {
    !e.local && this._searchMarker && (this._searchMarker.length = 0);
  }
  /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */
  observe(e) {
    sd(this._eH, e);
  }
  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  observeDeep(e) {
    sd(this._dEH, e);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */
  unobserve(e) {
    ld(this._eH, e);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  unobserveDeep(e) {
    ld(this._dEH, e);
  }
  /**
   * @abstract
   * @return {any}
   */
  toJSON() {
  }
}
const hy = (n, e, t) => {
  n.doc ?? me(), e < 0 && (e = n._length + e), t < 0 && (t = n._length + t);
  let r = t - e;
  const i = [];
  let o = n._start;
  for (; o !== null && r > 0; ) {
    if (o.countable && !o.deleted) {
      const s = o.content.getContent();
      if (s.length <= e)
        e -= s.length;
      else {
        for (let l = e; l < s.length && r > 0; l++)
          i.push(s[l]), r--;
        e = 0;
      }
    }
    o = o.right;
  }
  return i;
}, dy = (n) => {
  n.doc ?? me();
  const e = [];
  let t = n._start;
  for (; t !== null; ) {
    if (t.countable && !t.deleted) {
      const r = t.content.getContent();
      for (let i = 0; i < r.length; i++)
        e.push(r[i]);
    }
    t = t.right;
  }
  return e;
}, Zr = (n, e) => {
  let t = 0, r = n._start;
  for (n.doc ?? me(); r !== null; ) {
    if (r.countable && !r.deleted) {
      const i = r.content.getContent();
      for (let o = 0; o < i.length; o++)
        e(i[o], t++, n);
    }
    r = r.right;
  }
}, py = (n, e) => {
  const t = [];
  return Zr(n, (r, i) => {
    t.push(e(r, i, n));
  }), t;
}, aN = (n) => {
  let e = n._start, t = null, r = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      if (t === null) {
        for (; e !== null && e.deleted; )
          e = e.right;
        if (e === null)
          return {
            done: !0,
            value: void 0
          };
        t = e.content.getContent(), r = 0, e = e.right;
      }
      const i = t[r++];
      return t.length <= r && (t = null), {
        done: !1,
        value: i
      };
    }
  };
}, gy = (n, e) => {
  n.doc ?? me();
  const t = Os(n, e);
  let r = n._start;
  for (t !== null && (r = t.p, e -= t.index); r !== null; r = r.right)
    if (!r.deleted && r.countable) {
      if (e < r.length)
        return r.content.getContent()[e];
      e -= r.length;
    }
}, Io = (n, e, t, r) => {
  let i = t;
  const o = n.doc, s = o.clientID, l = o.store, a = t === null ? e._start : t.right;
  let c = [];
  const f = () => {
    c.length > 0 && (i = new Me(J(s, Oe(l, s)), i, i && i.lastId, a, a && a.id, e, null, new er(c)), i.integrate(n, 0), c = []);
  };
  r.forEach((u) => {
    if (u === null)
      c.push(u);
    else
      switch (u.constructor) {
        case Number:
        case Object:
        case Boolean:
        case Array:
        case String:
          c.push(u);
          break;
        default:
          switch (f(), u.constructor) {
            case Uint8Array:
            case ArrayBuffer:
              i = new Me(J(s, Oe(l, s)), i, i && i.lastId, a, a && a.id, e, null, new As(new Uint8Array(
                /** @type {Uint8Array} */
                u
              ))), i.integrate(n, 0);
              break;
            case hi:
              i = new Me(J(s, Oe(l, s)), i, i && i.lastId, a, a && a.id, e, null, new Ts(
                /** @type {Doc} */
                u
              )), i.integrate(n, 0);
              break;
            default:
              if (u instanceof de)
                i = new Me(J(s, Oe(l, s)), i, i && i.lastId, a, a && a.id, e, null, new nn(u)), i.integrate(n, 0);
              else
                throw new Error("Unexpected content type in insert operation");
          }
      }
  }), f();
}, my = () => Qn("Length exceeded!"), yy = (n, e, t, r) => {
  if (t > e._length)
    throw my();
  if (t === 0)
    return e._searchMarker && Qr(e._searchMarker, t, r.length), Io(n, e, null, r);
  const i = t, o = Os(e, t);
  let s = e._start;
  for (o !== null && (s = o.p, t -= o.index, t === 0 && (s = s.prev, t += s && s.countable && !s.deleted ? s.length : 0)); s !== null; s = s.right)
    if (!s.deleted && s.countable) {
      if (t <= s.length) {
        t < s.length && Yt(n, J(s.id.client, s.id.clock + t));
        break;
      }
      t -= s.length;
    }
  return e._searchMarker && Qr(e._searchMarker, i, r.length), Io(n, e, s, r);
}, cN = (n, e, t) => {
  let i = (e._searchMarker || []).reduce((o, s) => s.index > o.index ? s : o, { index: 0, p: e._start }).p;
  if (i)
    for (; i.right; )
      i = i.right;
  return Io(n, e, i, t);
}, by = (n, e, t, r) => {
  if (r === 0)
    return;
  const i = t, o = r, s = Os(e, t);
  let l = e._start;
  for (s !== null && (l = s.p, t -= s.index); l !== null && t > 0; l = l.right)
    !l.deleted && l.countable && (t < l.length && Yt(n, J(l.id.client, l.id.clock + t)), t -= l.length);
  for (; r > 0 && l !== null; )
    l.deleted || (r < l.length && Yt(n, J(l.id.client, l.id.clock + r)), l.delete(n), r -= l.length), l = l.right;
  if (r > 0)
    throw my();
  e._searchMarker && Qr(
    e._searchMarker,
    i,
    -o + r
    /* in case we remove the above exception */
  );
}, Do = (n, e, t) => {
  const r = e._map.get(t);
  r !== void 0 && r.delete(n);
}, zc = (n, e, t, r) => {
  const i = e._map.get(t) || null, o = n.doc, s = o.clientID;
  let l;
  if (r == null)
    l = new er([r]);
  else
    switch (r.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
        l = new er([r]);
        break;
      case Uint8Array:
        l = new As(
          /** @type {Uint8Array} */
          r
        );
        break;
      case hi:
        l = new Ts(
          /** @type {Doc} */
          r
        );
        break;
      default:
        if (r instanceof de)
          l = new nn(r);
        else
          throw new Error("Unexpected content type");
    }
  new Me(J(s, Oe(o.store, s)), i, i && i.lastId, null, null, e, t, l).integrate(n, 0);
}, Fc = (n, e) => {
  n.doc ?? me();
  const t = n._map.get(e);
  return t !== void 0 && !t.deleted ? t.content.getContent()[t.length - 1] : void 0;
}, wy = (n) => {
  const e = {};
  return n.doc ?? me(), n._map.forEach((t, r) => {
    t.deleted || (e[r] = t.content.getContent()[t.length - 1]);
  }), e;
}, Sy = (n, e) => {
  n.doc ?? me();
  const t = n._map.get(e);
  return t !== void 0 && !t.deleted;
}, fN = (n, e) => {
  const t = {};
  return n._map.forEach((r, i) => {
    let o = r;
    for (; o !== null && (!e.sv.has(o.id.client) || o.id.clock >= (e.sv.get(o.id.client) || 0)); )
      o = o.left;
    o !== null && Rn(o, e) && (t[i] = o.content.getContent()[o.length - 1]);
  }), t;
}, xi = (n) => (n.doc ?? me(), zM(
  n._map.entries(),
  /** @param {any} entry */
  (e) => !e[1].deleted
));
class uN extends ks {
}
class Rr extends de {
  constructor() {
    super(), this._prelimContent = [], this._searchMarker = [];
  }
  /**
   * Construct a new YArray containing the specified items.
   * @template {Object<string,any>|Array<any>|number|null|string|Uint8Array} T
   * @param {Array<T>} items
   * @return {YArray<T>}
   */
  static from(e) {
    const t = new Rr();
    return t.push(e), t;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(e, t) {
    super._integrate(e, t), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  /**
   * @return {YArray<T>}
   */
  _copy() {
    return new Rr();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YArray<T>}
   */
  clone() {
    const e = new Rr();
    return e.insert(0, this.toArray().map(
      (t) => t instanceof de ? (
        /** @type {typeof el} */
        t.clone()
      ) : t
    )), e;
  }
  get length() {
    return this.doc ?? me(), this._length;
  }
  /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(e, t) {
    super._callObserver(e, t), Es(this, e, new uN(this, e));
  }
  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */
  insert(e, t) {
    this.doc !== null ? H(this.doc, (r) => {
      yy(
        r,
        this,
        e,
        /** @type {any} */
        t
      );
    }) : this._prelimContent.splice(e, 0, ...t);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   *
   * @todo Use the following implementation in all types.
   */
  push(e) {
    this.doc !== null ? H(this.doc, (t) => {
      cN(
        t,
        this,
        /** @type {any} */
        e
      );
    }) : this._prelimContent.push(...e);
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<T>} content Array of content to prepend.
   */
  unshift(e) {
    this.insert(0, e);
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete(e, t = 1) {
    this.doc !== null ? H(this.doc, (r) => {
      by(r, this, e, t);
    }) : this._prelimContent.splice(e, t);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */
  get(e) {
    return gy(this, e);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */
  toArray() {
    return dy(this);
  }
  /**
   * Returns a portion of this YArray into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<T>}
   */
  slice(e = 0, t = this.length) {
    return hy(this, e, t);
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */
  toJSON() {
    return this.map((e) => e instanceof de ? e.toJSON() : e);
  }
  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */
  map(e) {
    return py(
      this,
      /** @type {any} */
      e
    );
  }
  /**
   * Executes a provided function once on every element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */
  forEach(e) {
    Zr(this, e);
  }
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return aN(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(e) {
    e.writeTypeRef(vN);
  }
}
class hN extends ks {
  /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */
  constructor(e, t, r) {
    super(e, t), this.keysChanged = r;
  }
}
class Ro extends de {
  /**
   *
   * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
   */
  constructor(e) {
    super(), this._prelimContent = null, e === void 0 ? this._prelimContent = /* @__PURE__ */ new Map() : this._prelimContent = new Map(e);
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(e, t) {
    super._integrate(e, t), this._prelimContent.forEach((r, i) => {
      this.set(i, r);
    }), this._prelimContent = null;
  }
  /**
   * @return {YMap<MapType>}
   */
  _copy() {
    return new Ro();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YMap<MapType>}
   */
  clone() {
    const e = new Ro();
    return this.forEach((t, r) => {
      e.set(r, t instanceof de ? (
        /** @type {typeof value} */
        t.clone()
      ) : t);
    }), e;
  }
  /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(e, t) {
    Es(this, e, new hN(this, e, t));
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,any>}
   */
  toJSON() {
    this.doc ?? me();
    const e = {};
    return this._map.forEach((t, r) => {
      if (!t.deleted) {
        const i = t.content.getContent()[t.length - 1];
        e[r] = i instanceof de ? i.toJSON() : i;
      }
    }), e;
  }
  /**
   * Returns the size of the YMap (count of key/value pairs)
   *
   * @return {number}
   */
  get size() {
    return [...xi(this)].length;
  }
  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  keys() {
    return kl(
      xi(this),
      /** @param {any} v */
      (e) => e[0]
    );
  }
  /**
   * Returns the values for each element in the YMap Type.
   *
   * @return {IterableIterator<MapType>}
   */
  values() {
    return kl(
      xi(this),
      /** @param {any} v */
      (e) => e[1].content.getContent()[e[1].length - 1]
    );
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  entries() {
    return kl(
      xi(this),
      /** @param {any} v */
      (e) => (
        /** @type {any} */
        [e[0], e[1].content.getContent()[e[1].length - 1]]
      )
    );
  }
  /**
   * Executes a provided function on once on every key-value pair.
   *
   * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
   */
  forEach(e) {
    this.doc ?? me(), this._map.forEach((t, r) => {
      t.deleted || e(t.content.getContent()[t.length - 1], r, this);
    });
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete(e) {
    this.doc !== null ? H(this.doc, (t) => {
      Do(t, this, e);
    }) : this._prelimContent.delete(e);
  }
  /**
   * Adds or updates an element with a specified key and value.
   * @template {MapType} VAL
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {VAL} value The value of the element to add
   * @return {VAL}
   */
  set(e, t) {
    return this.doc !== null ? H(this.doc, (r) => {
      zc(
        r,
        this,
        e,
        /** @type {any} */
        t
      );
    }) : this._prelimContent.set(e, t), t;
  }
  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {MapType|undefined}
   */
  get(e) {
    return (
      /** @type {any} */
      Fc(this, e)
    );
  }
  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */
  has(e) {
    return Sy(this, e);
  }
  /**
   * Removes all elements from this YMap.
   */
  clear() {
    this.doc !== null ? H(this.doc, (e) => {
      this.forEach(function(t, r, i) {
        Do(e, i, r);
      });
    }) : this._prelimContent.clear();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(e) {
    e.writeTypeRef(CN);
  }
}
const Wt = (n, e) => n === e || typeof n == "object" && typeof e == "object" && n && e && vM(n, e);
class Ra {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {number} index
   * @param {Map<string,any>} currentAttributes
   */
  constructor(e, t, r, i) {
    this.left = e, this.right = t, this.index = r, this.currentAttributes = i;
  }
  /**
   * Only call this if you know that this.right is defined
   */
  forward() {
    switch (this.right === null && qt(), this.right.content.constructor) {
      case se:
        this.right.deleted || cr(
          this.currentAttributes,
          /** @type {ContentFormat} */
          this.right.content
        );
        break;
      default:
        this.right.deleted || (this.index += this.right.length);
        break;
    }
    this.left = this.right, this.right = this.right.right;
  }
}
const hd = (n, e, t) => {
  for (; e.right !== null && t > 0; ) {
    switch (e.right.content.constructor) {
      case se:
        e.right.deleted || cr(
          e.currentAttributes,
          /** @type {ContentFormat} */
          e.right.content
        );
        break;
      default:
        e.right.deleted || (t < e.right.length && Yt(n, J(e.right.id.client, e.right.id.clock + t)), e.index += e.right.length, t -= e.right.length);
        break;
    }
    e.left = e.right, e.right = e.right.right;
  }
  return e;
}, ki = (n, e, t, r) => {
  const i = /* @__PURE__ */ new Map(), o = r ? Os(e, t) : null;
  if (o) {
    const s = new Ra(o.p.left, o.p, o.index, i);
    return hd(n, s, t - o.index);
  } else {
    const s = new Ra(null, e._start, 0, i);
    return hd(n, s, t);
  }
}, vy = (n, e, t, r) => {
  for (; t.right !== null && (t.right.deleted === !0 || t.right.content.constructor === se && Wt(
    r.get(
      /** @type {ContentFormat} */
      t.right.content.key
    ),
    /** @type {ContentFormat} */
    t.right.content.value
  )); )
    t.right.deleted || r.delete(
      /** @type {ContentFormat} */
      t.right.content.key
    ), t.forward();
  const i = n.doc, o = i.clientID;
  r.forEach((s, l) => {
    const a = t.left, c = t.right, f = new Me(J(o, Oe(i.store, o)), a, a && a.lastId, c, c && c.id, e, null, new se(l, s));
    f.integrate(n, 0), t.right = f, t.forward();
  });
}, cr = (n, e) => {
  const { key: t, value: r } = e;
  r === null ? n.delete(t) : n.set(t, r);
}, Cy = (n, e) => {
  for (; n.right !== null; ) {
    if (!(n.right.deleted || n.right.content.constructor === se && Wt(
      e[
        /** @type {ContentFormat} */
        n.right.content.key
      ] ?? null,
      /** @type {ContentFormat} */
      n.right.content.value
    ))) break;
    n.forward();
  }
}, xy = (n, e, t, r) => {
  const i = n.doc, o = i.clientID, s = /* @__PURE__ */ new Map();
  for (const l in r) {
    const a = r[l], c = t.currentAttributes.get(l) ?? null;
    if (!Wt(c, a)) {
      s.set(l, c);
      const { left: f, right: u } = t;
      t.right = new Me(J(o, Oe(i.store, o)), f, f && f.lastId, u, u && u.id, e, null, new se(l, a)), t.right.integrate(n, 0), t.forward();
    }
  }
  return s;
}, Al = (n, e, t, r, i) => {
  t.currentAttributes.forEach((h, d) => {
    i[d] === void 0 && (i[d] = null);
  });
  const o = n.doc, s = o.clientID;
  Cy(t, i);
  const l = xy(n, e, t, i), a = r.constructor === String ? new vt(
    /** @type {string} */
    r
  ) : r instanceof de ? new nn(r) : new fr(r);
  let { left: c, right: f, index: u } = t;
  e._searchMarker && Qr(e._searchMarker, t.index, a.getLength()), f = new Me(J(s, Oe(o.store, s)), c, c && c.lastId, f, f && f.id, e, null, a), f.integrate(n, 0), t.right = f, t.index = u, t.forward(), vy(n, e, t, l);
}, dd = (n, e, t, r, i) => {
  const o = n.doc, s = o.clientID;
  Cy(t, i);
  const l = xy(n, e, t, i);
  e: for (; t.right !== null && (r > 0 || l.size > 0 && (t.right.deleted || t.right.content.constructor === se)); ) {
    if (!t.right.deleted)
      switch (t.right.content.constructor) {
        case se: {
          const { key: a, value: c } = (
            /** @type {ContentFormat} */
            t.right.content
          ), f = i[a];
          if (f !== void 0) {
            if (Wt(f, c))
              l.delete(a);
            else {
              if (r === 0)
                break e;
              l.set(a, c);
            }
            t.right.delete(n);
          } else
            t.currentAttributes.set(a, c);
          break;
        }
        default:
          r < t.right.length && Yt(n, J(t.right.id.client, t.right.id.clock + r)), r -= t.right.length;
          break;
      }
    t.forward();
  }
  if (r > 0) {
    let a = "";
    for (; r > 0; r--)
      a += `
`;
    t.right = new Me(J(s, Oe(o.store, s)), t.left, t.left && t.left.lastId, t.right, t.right && t.right.id, e, null, new vt(a)), t.right.integrate(n, 0), t.forward();
  }
  vy(n, e, t, l);
}, ky = (n, e, t, r, i) => {
  let o = e;
  const s = Qe();
  for (; o && (!o.countable || o.deleted); ) {
    if (!o.deleted && o.content.constructor === se) {
      const c = (
        /** @type {ContentFormat} */
        o.content
      );
      s.set(c.key, c);
    }
    o = o.right;
  }
  let l = 0, a = !1;
  for (; e !== o; ) {
    if (t === e && (a = !0), !e.deleted) {
      const c = e.content;
      switch (c.constructor) {
        case se: {
          const { key: f, value: u } = (
            /** @type {ContentFormat} */
            c
          ), h = r.get(f) ?? null;
          (s.get(f) !== c || h === u) && (e.delete(n), l++, !a && (i.get(f) ?? null) === u && h !== u && (h === null ? i.delete(f) : i.set(f, h))), !a && !e.deleted && cr(
            i,
            /** @type {ContentFormat} */
            c
          );
          break;
        }
      }
    }
    e = /** @type {Item} */
    e.right;
  }
  return l;
}, dN = (n, e) => {
  for (; e && e.right && (e.right.deleted || !e.right.countable); )
    e = e.right;
  const t = /* @__PURE__ */ new Set();
  for (; e && (e.deleted || !e.countable); ) {
    if (!e.deleted && e.content.constructor === se) {
      const r = (
        /** @type {ContentFormat} */
        e.content.key
      );
      t.has(r) ? e.delete(n) : t.add(r);
    }
    e = e.left;
  }
}, pN = (n) => {
  let e = 0;
  return H(
    /** @type {Doc} */
    n.doc,
    (t) => {
      let r = (
        /** @type {Item} */
        n._start
      ), i = n._start, o = Qe();
      const s = Aa(o);
      for (; i; ) {
        if (i.deleted === !1)
          switch (i.content.constructor) {
            case se:
              cr(
                s,
                /** @type {ContentFormat} */
                i.content
              );
              break;
            default:
              e += ky(t, r, i, o, s), o = Aa(s), r = i;
              break;
          }
        i = i.right;
      }
    }
  ), e;
}, gN = (n) => {
  const e = /* @__PURE__ */ new Set(), t = n.doc;
  for (const [r, i] of n.afterState.entries()) {
    const o = n.beforeState.get(r) || 0;
    i !== o && ay(
      n,
      /** @type {Array<Item|GC>} */
      t.store.clients.get(r),
      o,
      i,
      (s) => {
        !s.deleted && /** @type {Item} */
        s.content.constructor === se && s.constructor !== $t && e.add(
          /** @type {any} */
          s.parent
        );
      }
    );
  }
  H(t, (r) => {
    ty(n, n.deleteSet, (i) => {
      if (i instanceof $t || !/** @type {YText} */
      i.parent._hasFormatting || e.has(
        /** @type {YText} */
        i.parent
      ))
        return;
      const o = (
        /** @type {YText} */
        i.parent
      );
      i.content.constructor === se ? e.add(o) : dN(r, i);
    });
    for (const i of e)
      pN(i);
  });
}, pd = (n, e, t) => {
  const r = t, i = Aa(e.currentAttributes), o = e.right;
  for (; t > 0 && e.right !== null; ) {
    if (e.right.deleted === !1)
      switch (e.right.content.constructor) {
        case nn:
        case fr:
        case vt:
          t < e.right.length && Yt(n, J(e.right.id.client, e.right.id.clock + t)), t -= e.right.length, e.right.delete(n);
          break;
      }
    e.forward();
  }
  o && ky(n, o, e.right, i, e.currentAttributes);
  const s = (
    /** @type {AbstractType<any>} */
    /** @type {Item} */
    (e.left || e.right).parent
  );
  return s._searchMarker && Qr(s._searchMarker, e.index, -r + t), e;
};
class mN extends ks {
  /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed
   */
  constructor(e, t, r) {
    super(e, t), this.childListChanged = !1, this.keysChanged = /* @__PURE__ */ new Set(), r.forEach((i) => {
      i === null ? this.childListChanged = !0 : this.keysChanged.add(i);
    });
  }
  /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    if (this._changes === null) {
      const e = {
        keys: this.keys,
        delta: this.delta,
        added: /* @__PURE__ */ new Set(),
        deleted: /* @__PURE__ */ new Set()
      };
      this._changes = e;
    }
    return (
      /** @type {any} */
      this._changes
    );
  }
  /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
   *
   * @public
   */
  get delta() {
    if (this._delta === null) {
      const e = (
        /** @type {Doc} */
        this.target.doc
      ), t = [];
      H(e, (r) => {
        const i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
        let s = this.target._start, l = null;
        const a = {};
        let c = "", f = 0, u = 0;
        const h = () => {
          if (l !== null) {
            let d = null;
            switch (l) {
              case "delete":
                u > 0 && (d = { delete: u }), u = 0;
                break;
              case "insert":
                (typeof c == "object" || c.length > 0) && (d = { insert: c }, i.size > 0 && (d.attributes = {}, i.forEach((p, g) => {
                  p !== null && (d.attributes[g] = p);
                }))), c = "";
                break;
              case "retain":
                f > 0 && (d = { retain: f }, bM(a) || (d.attributes = gM({}, a))), f = 0;
                break;
            }
            d && t.push(d), l = null;
          }
        };
        for (; s !== null; ) {
          switch (s.content.constructor) {
            case nn:
            case fr:
              this.adds(s) ? this.deletes(s) || (h(), l = "insert", c = s.content.getContent()[0], h()) : this.deletes(s) ? (l !== "delete" && (h(), l = "delete"), u += 1) : s.deleted || (l !== "retain" && (h(), l = "retain"), f += 1);
              break;
            case vt:
              this.adds(s) ? this.deletes(s) || (l !== "insert" && (h(), l = "insert"), c += /** @type {ContentString} */
              s.content.str) : this.deletes(s) ? (l !== "delete" && (h(), l = "delete"), u += s.length) : s.deleted || (l !== "retain" && (h(), l = "retain"), f += s.length);
              break;
            case se: {
              const { key: d, value: p } = (
                /** @type {ContentFormat} */
                s.content
              );
              if (this.adds(s)) {
                if (!this.deletes(s)) {
                  const g = i.get(d) ?? null;
                  Wt(g, p) ? p !== null && s.delete(r) : (l === "retain" && h(), Wt(p, o.get(d) ?? null) ? delete a[d] : a[d] = p);
                }
              } else if (this.deletes(s)) {
                o.set(d, p);
                const g = i.get(d) ?? null;
                Wt(g, p) || (l === "retain" && h(), a[d] = g);
              } else if (!s.deleted) {
                o.set(d, p);
                const g = a[d];
                g !== void 0 && (Wt(g, p) ? g !== null && s.delete(r) : (l === "retain" && h(), p === null ? delete a[d] : a[d] = p));
              }
              s.deleted || (l === "insert" && h(), cr(
                i,
                /** @type {ContentFormat} */
                s.content
              ));
              break;
            }
          }
          s = s.right;
        }
        for (h(); t.length > 0; ) {
          const d = t[t.length - 1];
          if (d.retain !== void 0 && d.attributes === void 0)
            t.pop();
          else
            break;
        }
      }), this._delta = t;
    }
    return (
      /** @type {any} */
      this._delta
    );
  }
}
class ei extends de {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor(e) {
    super(), this._pending = e !== void 0 ? [() => this.insert(0, e)] : [], this._searchMarker = [], this._hasFormatting = !1;
  }
  /**
   * Number of characters of this text type.
   *
   * @type {number}
   */
  get length() {
    return this.doc ?? me(), this._length;
  }
  /**
   * @param {Doc} y
   * @param {Item} item
   */
  _integrate(e, t) {
    super._integrate(e, t);
    try {
      this._pending.forEach((r) => r());
    } catch (r) {
      console.error(r);
    }
    this._pending = null;
  }
  _copy() {
    return new ei();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YText}
   */
  clone() {
    const e = new ei();
    return e.applyDelta(this.toDelta()), e;
  }
  /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(e, t) {
    super._callObserver(e, t);
    const r = new mN(this, e, t);
    Es(this, e, r), !e.local && this._hasFormatting && (e._needFormattingCleanup = !0);
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString() {
    this.doc ?? me();
    let e = "", t = this._start;
    for (; t !== null; )
      !t.deleted && t.countable && t.content.constructor === vt && (e += /** @type {ContentString} */
      t.content.str), t = t.right;
    return e;
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {any} delta The changes to apply on this element.
   * @param {object}  opts
   * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
   *
   *
   * @public
   */
  applyDelta(e, { sanitize: t = !0 } = {}) {
    this.doc !== null ? H(this.doc, (r) => {
      const i = new Ra(null, this._start, 0, /* @__PURE__ */ new Map());
      for (let o = 0; o < e.length; o++) {
        const s = e[o];
        if (s.insert !== void 0) {
          const l = !t && typeof s.insert == "string" && o === e.length - 1 && i.right === null && s.insert.slice(-1) === `
` ? s.insert.slice(0, -1) : s.insert;
          (typeof l != "string" || l.length > 0) && Al(r, this, i, l, s.attributes || {});
        } else s.retain !== void 0 ? dd(r, this, i, s.retain, s.attributes || {}) : s.delete !== void 0 && pd(r, i, s.delete);
      }
    }) : this._pending.push(() => this.applyDelta(e));
  }
  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */
  toDelta(e, t, r) {
    this.doc ?? me();
    const i = [], o = /* @__PURE__ */ new Map(), s = (
      /** @type {Doc} */
      this.doc
    );
    let l = "", a = this._start;
    function c() {
      if (l.length > 0) {
        const u = {};
        let h = !1;
        o.forEach((p, g) => {
          h = !0, u[g] = p;
        });
        const d = { insert: l };
        h && (d.attributes = u), i.push(d), l = "";
      }
    }
    const f = () => {
      for (; a !== null; ) {
        if (Rn(a, e) || t !== void 0 && Rn(a, t))
          switch (a.content.constructor) {
            case vt: {
              const u = o.get("ychange");
              e !== void 0 && !Rn(a, e) ? (u === void 0 || u.user !== a.id.client || u.type !== "removed") && (c(), o.set("ychange", r ? r("removed", a.id) : { type: "removed" })) : t !== void 0 && !Rn(a, t) ? (u === void 0 || u.user !== a.id.client || u.type !== "added") && (c(), o.set("ychange", r ? r("added", a.id) : { type: "added" })) : u !== void 0 && (c(), o.delete("ychange")), l += /** @type {ContentString} */
              a.content.str;
              break;
            }
            case nn:
            case fr: {
              c();
              const u = {
                insert: a.content.getContent()[0]
              };
              if (o.size > 0) {
                const h = (
                  /** @type {Object<string,any>} */
                  {}
                );
                u.attributes = h, o.forEach((d, p) => {
                  h[p] = d;
                });
              }
              i.push(u);
              break;
            }
            case se:
              Rn(a, e) && (c(), cr(
                o,
                /** @type {ContentFormat} */
                a.content
              ));
              break;
          }
        a = a.right;
      }
      c();
    };
    return e || t ? H(s, (u) => {
      e && Ia(u, e), t && Ia(u, t), f();
    }, "cleanup") : f(), i;
  }
  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert(e, t, r) {
    if (t.length <= 0)
      return;
    const i = this.doc;
    i !== null ? H(i, (o) => {
      const s = ki(o, this, e, !r);
      r || (r = {}, s.currentAttributes.forEach((l, a) => {
        r[a] = l;
      })), Al(o, this, s, t, r);
    }) : this._pending.push(() => this.insert(e, t, r));
  }
  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object | AbstractType<any>} embed The Object that represents the embed.
   * @param {TextAttributes} [attributes] Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed(e, t, r) {
    const i = this.doc;
    i !== null ? H(i, (o) => {
      const s = ki(o, this, e, !r);
      Al(o, this, s, t, r || {});
    }) : this._pending.push(() => this.insertEmbed(e, t, r || {}));
  }
  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete(e, t) {
    if (t === 0)
      return;
    const r = this.doc;
    r !== null ? H(r, (i) => {
      pd(i, ki(i, this, e, !0), t);
    }) : this._pending.push(() => this.delete(e, t));
  }
  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format(e, t, r) {
    if (t === 0)
      return;
    const i = this.doc;
    i !== null ? H(i, (o) => {
      const s = ki(o, this, e, !1);
      s.right !== null && dd(o, this, s, t, r);
    }) : this._pending.push(() => this.format(e, t, r));
  }
  /**
   * Removes an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(e) {
    this.doc !== null ? H(this.doc, (t) => {
      Do(t, this, e);
    }) : this._pending.push(() => this.removeAttribute(e));
  }
  /**
   * Sets or updates an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {any} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(e, t) {
    this.doc !== null ? H(this.doc, (r) => {
      zc(r, this, e, t);
    }) : this._pending.push(() => this.setAttribute(e, t));
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {any} The queried attribute value.
   *
   * @public
   */
  getAttribute(e) {
    return (
      /** @type {any} */
      Fc(this, e)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes() {
    return wy(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(e) {
    e.writeTypeRef(xN);
  }
}
class Tl {
  /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */
  constructor(e, t = () => !0) {
    this._filter = t, this._root = e, this._currentNode = /** @type {Item} */
    e._start, this._firstCall = !0, e.doc ?? me();
  }
  [Symbol.iterator]() {
    return this;
  }
  /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */
  next() {
    let e = this._currentNode, t = e && e.content && /** @type {any} */
    e.content.type;
    if (e !== null && (!this._firstCall || e.deleted || !this._filter(t)))
      do
        if (t = /** @type {any} */
        e.content.type, !e.deleted && (t.constructor === ti || t.constructor === Zn) && t._start !== null)
          e = t._start;
        else
          for (; e !== null; )
            if (e.right !== null) {
              e = e.right;
              break;
            } else e.parent === this._root ? e = null : e = /** @type {AbstractType<any>} */
            e.parent._item;
      while (e !== null && (e.deleted || !this._filter(
        /** @type {ContentType} */
        e.content.type
      )));
    return this._firstCall = !1, e === null ? { value: void 0, done: !0 } : (this._currentNode = e, { value: (
      /** @type {any} */
      e.content.type
    ), done: !1 });
  }
}
class Zn extends de {
  constructor() {
    super(), this._prelimContent = [];
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get firstChild() {
    const e = this._first;
    return e ? e.content.getContent()[0] : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(e, t) {
    super._integrate(e, t), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  _copy() {
    return new Zn();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlFragment}
   */
  clone() {
    const e = new Zn();
    return e.insert(0, this.toArray().map((t) => t instanceof de ? t.clone() : t)), e;
  }
  get length() {
    return this.doc ?? me(), this._prelimContent === null ? this._length : this._prelimContent.length;
  }
  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker(e) {
    return new Tl(this, e);
  }
  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */
  querySelector(e) {
    e = e.toUpperCase();
    const r = new Tl(this, (i) => i.nodeName && i.nodeName.toUpperCase() === e).next();
    return r.done ? null : r.value;
  }
  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll(e) {
    return e = e.toUpperCase(), Xn(new Tl(this, (t) => t.nodeName && t.nodeName.toUpperCase() === e));
  }
  /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(e, t) {
    Es(this, e, new yN(this, t, e));
  }
  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toString() {
    return py(this, (e) => e.toString()).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(e = document, t = {}, r) {
    const i = e.createDocumentFragment();
    return r !== void 0 && r._createAssociation(i, this), Zr(this, (o) => {
      i.insertBefore(o.toDOM(e, t, r), null);
    }), i;
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insert(e, t) {
    this.doc !== null ? H(this.doc, (r) => {
      yy(r, this, e, t);
    }) : this._prelimContent.splice(e, 0, ...t);
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insertAfter(e, t) {
    if (this.doc !== null)
      H(this.doc, (r) => {
        const i = e && e instanceof de ? e._item : e;
        Io(r, this, i, t);
      });
    else {
      const r = (
        /** @type {Array<any>} */
        this._prelimContent
      ), i = e === null ? 0 : r.findIndex((o) => o === e) + 1;
      if (i === 0 && e !== null)
        throw Qn("Reference item not found");
      r.splice(i, 0, ...t);
    }
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */
  delete(e, t = 1) {
    this.doc !== null ? H(this.doc, (r) => {
      by(r, this, e, t);
    }) : this._prelimContent.splice(e, t);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */
  toArray() {
    return dy(this);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
   */
  push(e) {
    this.insert(this.length, e);
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to prepend.
   */
  unshift(e) {
    this.insert(0, e);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {YXmlElement|YXmlText}
   */
  get(e) {
    return gy(this, e);
  }
  /**
   * Returns a portion of this YXmlFragment into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<YXmlElement|YXmlText>}
   */
  slice(e = 0, t = this.length) {
    return hy(this, e, t);
  }
  /**
   * Executes a provided function on once on every child element.
   *
   * @param {function(YXmlElement|YXmlText,number, typeof self):void} f A function to execute on every element of this YArray.
   */
  forEach(e) {
    Zr(this, e);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(e) {
    e.writeTypeRef(ON);
  }
}
class ti extends Zn {
  constructor(e = "UNDEFINED") {
    super(), this.nodeName = e, this._prelimAttrs = /* @__PURE__ */ new Map();
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const e = this._item ? this._item.next : null;
    return e ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      e.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const e = this._item ? this._item.prev : null;
    return e ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      e.content.type
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(e, t) {
    super._integrate(e, t), /** @type {Map<string, any>} */
    this._prelimAttrs.forEach((r, i) => {
      this.setAttribute(i, r);
    }), this._prelimAttrs = null;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */
  _copy() {
    return new ti(this.nodeName);
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlElement<KV>}
   */
  clone() {
    const e = new ti(this.nodeName), t = this.getAttributes();
    return yM(t, (r, i) => {
      typeof r == "string" && e.setAttribute(i, r);
    }), e.insert(0, this.toArray().map((r) => r instanceof de ? r.clone() : r)), e;
  }
  /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */
  toString() {
    const e = this.getAttributes(), t = [], r = [];
    for (const l in e)
      r.push(l);
    r.sort();
    const i = r.length;
    for (let l = 0; l < i; l++) {
      const a = r[l];
      t.push(a + '="' + e[a] + '"');
    }
    const o = this.nodeName.toLocaleLowerCase(), s = t.length > 0 ? " " + t.join(" ") : "";
    return `<${o}${s}>${super.toString()}</${o}>`;
  }
  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {string} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(e) {
    this.doc !== null ? H(this.doc, (t) => {
      Do(t, this, e);
    }) : this._prelimAttrs.delete(e);
  }
  /**
   * Sets or updates an attribute.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that is to be set.
   * @param {KV[KEY]} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(e, t) {
    this.doc !== null ? H(this.doc, (r) => {
      zc(r, this, e, t);
    }) : this._prelimAttrs.set(e, t);
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {KV[KEY]|undefined} The queried attribute value.
   *
   * @public
   */
  getAttribute(e) {
    return (
      /** @type {any} */
      Fc(this, e)
    );
  }
  /**
   * Returns whether an attribute exists
   *
   * @param {string} attributeName The attribute name to check for existence.
   * @return {boolean} whether the attribute exists.
   *
   * @public
   */
  hasAttribute(e) {
    return (
      /** @type {any} */
      Sy(this, e)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @param {Snapshot} [snapshot]
   * @return {{ [Key in Extract<keyof KV,string>]?: KV[Key]}} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes(e) {
    return (
      /** @type {any} */
      e ? fN(this, e) : wy(this)
    );
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(e = document, t = {}, r) {
    const i = e.createElement(this.nodeName), o = this.getAttributes();
    for (const s in o) {
      const l = o[s];
      typeof l == "string" && i.setAttribute(s, l);
    }
    return Zr(this, (s) => {
      i.appendChild(s.toDOM(e, t, r));
    }), r !== void 0 && r._createAssociation(i, this), i;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(e) {
    e.writeTypeRef(kN), e.writeKey(this.nodeName);
  }
}
class yN extends ks {
  /**
   * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with wich the
   *                                  change was created.
   */
  constructor(e, t, r) {
    super(e, r), this.childListChanged = !1, this.attributesChanged = /* @__PURE__ */ new Set(), t.forEach((i) => {
      i === null ? this.childListChanged = !0 : this.attributesChanged.add(i);
    });
  }
}
class ni extends ei {
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const e = this._item ? this._item.next : null;
    return e ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      e.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const e = this._item ? this._item.prev : null;
    return e ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      e.content.type
    ) : null;
  }
  _copy() {
    return new ni();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlText}
   */
  clone() {
    const e = new ni();
    return e.applyDelta(this.toDelta()), e;
  }
  /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(e = document, t, r) {
    const i = e.createTextNode(this.toString());
    return r !== void 0 && r._createAssociation(i, this), i;
  }
  toString() {
    return this.toDelta().map((e) => {
      const t = [];
      for (const i in e.attributes) {
        const o = [];
        for (const s in e.attributes[i])
          o.push({ key: s, value: e.attributes[i][s] });
        o.sort((s, l) => s.key < l.key ? -1 : 1), t.push({ nodeName: i, attrs: o });
      }
      t.sort((i, o) => i.nodeName < o.nodeName ? -1 : 1);
      let r = "";
      for (let i = 0; i < t.length; i++) {
        const o = t[i];
        r += `<${o.nodeName}`;
        for (let s = 0; s < o.attrs.length; s++) {
          const l = o.attrs[s];
          r += ` ${l.key}="${l.value}"`;
        }
        r += ">";
      }
      r += e.insert;
      for (let i = t.length - 1; i >= 0; i--)
        r += `</${t[i].nodeName}>`;
      return r;
    }).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(e) {
    e.writeTypeRef(EN);
  }
}
class Oy {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor(e, t) {
    this.id = e, this.length = t;
  }
  /**
   * @type {boolean}
   */
  get deleted() {
    throw Ze();
  }
  /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} wether this merged with right
   */
  mergeWith(e) {
    return !1;
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */
  write(e, t, r) {
    throw Ze();
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(e, t) {
    throw Ze();
  }
}
const bN = 0;
class $t extends Oy {
  get deleted() {
    return !0;
  }
  delete() {
  }
  /**
   * @param {GC} right
   * @return {boolean}
   */
  mergeWith(e) {
    return this.constructor !== e.constructor ? !1 : (this.length += e.length, !0);
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(e, t) {
    t > 0 && (this.id.clock += t, this.length -= t), ly(e.doc.store, this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(e, t) {
    e.writeInfo(bN), e.writeLen(this.length - t);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(e, t) {
    return null;
  }
}
class As {
  /**
   * @param {Uint8Array} content
   */
  constructor(e) {
    this.content = e;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.content];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentBinary}
   */
  copy() {
    return new As(this.content);
  }
  /**
   * @param {number} offset
   * @return {ContentBinary}
   */
  splice(e) {
    throw Ze();
  }
  /**
   * @param {ContentBinary} right
   * @return {boolean}
   */
  mergeWith(e) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(e, t) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(e) {
  }
  /**
   * @param {StructStore} store
   */
  gc(e) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(e, t) {
    e.writeBuf(this.content);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 3;
  }
}
class _o {
  /**
   * @param {number} len
   */
  constructor(e) {
    this.len = e;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.len;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentDeleted}
   */
  copy() {
    return new _o(this.len);
  }
  /**
   * @param {number} offset
   * @return {ContentDeleted}
   */
  splice(e) {
    const t = new _o(this.len - e);
    return this.len = e, t;
  }
  /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */
  mergeWith(e) {
    return this.len += e.len, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(e, t) {
    iy(e.deleteSet, t.id.client, t.id.clock, this.len), t.markDeleted();
  }
  /**
   * @param {Transaction} transaction
   */
  delete(e) {
  }
  /**
   * @param {StructStore} store
   */
  gc(e) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(e, t) {
    e.writeLen(this.len - t);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 1;
  }
}
const wN = (n, e) => new hi({ guid: n, ...e, shouldLoad: e.shouldLoad || e.autoLoad || !1 });
class Ts {
  /**
   * @param {Doc} doc
   */
  constructor(e) {
    e._item && console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."), this.doc = e;
    const t = {};
    this.opts = t, e.gc || (t.gc = !1), e.autoLoad && (t.autoLoad = !0), e.meta !== null && (t.meta = e.meta);
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.doc];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentDoc}
   */
  copy() {
    return new Ts(wN(this.doc.guid, this.opts));
  }
  /**
   * @param {number} offset
   * @return {ContentDoc}
   */
  splice(e) {
    throw Ze();
  }
  /**
   * @param {ContentDoc} right
   * @return {boolean}
   */
  mergeWith(e) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(e, t) {
    this.doc._item = t, e.subdocsAdded.add(this.doc), this.doc.shouldLoad && e.subdocsLoaded.add(this.doc);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(e) {
    e.subdocsAdded.has(this.doc) ? e.subdocsAdded.delete(this.doc) : e.subdocsRemoved.add(this.doc);
  }
  /**
   * @param {StructStore} store
   */
  gc(e) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(e, t) {
    e.writeString(this.doc.guid), e.writeAny(this.opts);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 9;
  }
}
class fr {
  /**
   * @param {Object} embed
   */
  constructor(e) {
    this.embed = e;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.embed];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentEmbed}
   */
  copy() {
    return new fr(this.embed);
  }
  /**
   * @param {number} offset
   * @return {ContentEmbed}
   */
  splice(e) {
    throw Ze();
  }
  /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */
  mergeWith(e) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(e, t) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(e) {
  }
  /**
   * @param {StructStore} store
   */
  gc(e) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(e, t) {
    e.writeJSON(this.embed);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 5;
  }
}
class se {
  /**
   * @param {string} key
   * @param {Object} value
   */
  constructor(e, t) {
    this.key = e, this.value = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentFormat}
   */
  copy() {
    return new se(this.key, this.value);
  }
  /**
   * @param {number} _offset
   * @return {ContentFormat}
   */
  splice(e) {
    throw Ze();
  }
  /**
   * @param {ContentFormat} _right
   * @return {boolean}
   */
  mergeWith(e) {
    return !1;
  }
  /**
   * @param {Transaction} _transaction
   * @param {Item} item
   */
  integrate(e, t) {
    const r = (
      /** @type {YText} */
      t.parent
    );
    r._searchMarker = null, r._hasFormatting = !0;
  }
  /**
   * @param {Transaction} transaction
   */
  delete(e) {
  }
  /**
   * @param {StructStore} store
   */
  gc(e) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(e, t) {
    e.writeKey(this.key), e.writeJSON(this.value);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 6;
  }
}
const SN = Mo("node_env") === "development";
class er {
  /**
   * @param {Array<any>} arr
   */
  constructor(e) {
    this.arr = e, SN && Km(e);
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentAny}
   */
  copy() {
    return new er(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentAny}
   */
  splice(e) {
    const t = new er(this.arr.slice(e));
    return this.arr = this.arr.slice(0, e), t;
  }
  /**
   * @param {ContentAny} right
   * @return {boolean}
   */
  mergeWith(e) {
    return this.arr = this.arr.concat(e.arr), !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(e, t) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(e) {
  }
  /**
   * @param {StructStore} store
   */
  gc(e) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(e, t) {
    const r = this.arr.length;
    e.writeLen(r - t);
    for (let i = t; i < r; i++) {
      const o = this.arr[i];
      e.writeAny(o);
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 8;
  }
}
class vt {
  /**
   * @param {string} str
   */
  constructor(e) {
    this.str = e;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.str.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.str.split("");
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentString}
   */
  copy() {
    return new vt(this.str);
  }
  /**
   * @param {number} offset
   * @return {ContentString}
   */
  splice(e) {
    const t = new vt(this.str.slice(e));
    this.str = this.str.slice(0, e);
    const r = this.str.charCodeAt(e - 1);
    return r >= 55296 && r <= 56319 && (this.str = this.str.slice(0, e - 1) + "�", t.str = "�" + t.str.slice(1)), t;
  }
  /**
   * @param {ContentString} right
   * @return {boolean}
   */
  mergeWith(e) {
    return this.str += e.str, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(e, t) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(e) {
  }
  /**
   * @param {StructStore} store
   */
  gc(e) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(e, t) {
    e.writeString(t === 0 ? this.str : this.str.slice(t));
  }
  /**
   * @return {number}
   */
  getRef() {
    return 4;
  }
}
const vN = 0, CN = 1, xN = 2, kN = 3, ON = 4, EN = 6;
class nn {
  /**
   * @param {AbstractType<any>} type
   */
  constructor(e) {
    this.type = e;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.type];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentType}
   */
  copy() {
    return new nn(this.type._copy());
  }
  /**
   * @param {number} offset
   * @return {ContentType}
   */
  splice(e) {
    throw Ze();
  }
  /**
   * @param {ContentType} right
   * @return {boolean}
   */
  mergeWith(e) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(e, t) {
    this.type._integrate(e.doc, t);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(e) {
    let t = this.type._start;
    for (; t !== null; )
      t.deleted ? t.id.clock < (e.beforeState.get(t.id.client) || 0) && e._mergeStructs.push(t) : t.delete(e), t = t.right;
    this.type._map.forEach((r) => {
      r.deleted ? r.id.clock < (e.beforeState.get(r.id.client) || 0) && e._mergeStructs.push(r) : r.delete(e);
    }), e.changed.delete(this.type);
  }
  /**
   * @param {StructStore} store
   */
  gc(e) {
    let t = this.type._start;
    for (; t !== null; )
      t.gc(e, !0), t = t.right;
    this.type._start = null, this.type._map.forEach(
      /** @param {Item | null} item */
      (r) => {
        for (; r !== null; )
          r.gc(e, !0), r = r.left;
      }
    ), this.type._map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(e, t) {
    this.type._write(e);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 7;
  }
}
const Ey = (n, e, t) => {
  const { client: r, clock: i } = e.id, o = new Me(
    J(r, i + t),
    e,
    J(r, i + t - 1),
    e.right,
    e.rightOrigin,
    e.parent,
    e.parentSub,
    e.content.splice(t)
  );
  return e.deleted && o.markDeleted(), e.keep && (o.keep = !0), e.redone !== null && (o.redone = J(e.redone.client, e.redone.clock + t)), e.right = o, o.right !== null && (o.right.left = o), n._mergeStructs.push(o), o.parentSub !== null && o.right === null && o.parent._map.set(o.parentSub, o), e.length = t, o;
};
let Me = class _a extends Oy {
  /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */
  constructor(e, t, r, i, o, s, l, a) {
    super(e, a.getLength()), this.origin = r, this.left = t, this.right = i, this.rightOrigin = o, this.parent = s, this.parentSub = l, this.redone = null, this.content = a, this.info = this.content.isCountable() ? qh : 0;
  }
  /**
   * This is used to mark the item as an indexed fast-search marker
   *
   * @type {boolean}
   */
  set marker(e) {
    (this.info & vl) > 0 !== e && (this.info ^= vl);
  }
  get marker() {
    return (this.info & vl) > 0;
  }
  /**
   * If true, do not garbage collect this Item.
   */
  get keep() {
    return (this.info & Gh) > 0;
  }
  set keep(e) {
    this.keep !== e && (this.info ^= Gh);
  }
  get countable() {
    return (this.info & qh) > 0;
  }
  /**
   * Whether this item was deleted or not.
   * @type {Boolean}
   */
  get deleted() {
    return (this.info & Sl) > 0;
  }
  set deleted(e) {
    this.deleted !== e && (this.info ^= Sl);
  }
  markDeleted() {
    this.info |= Sl;
  }
  /**
   * Return the creator clientID of the missing op or define missing items and return null.
   *
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(e, t) {
    if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= Oe(t, this.origin.client))
      return this.origin.client;
    if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= Oe(t, this.rightOrigin.client))
      return this.rightOrigin.client;
    if (this.parent && this.parent.constructor === Hi && this.id.client !== this.parent.client && this.parent.clock >= Oe(t, this.parent.client))
      return this.parent.client;
    if (this.origin && (this.left = ad(e, t, this.origin), this.origin = this.left.lastId), this.rightOrigin && (this.right = Yt(e, this.rightOrigin), this.rightOrigin = this.right.id), this.left && this.left.constructor === $t || this.right && this.right.constructor === $t)
      this.parent = null;
    else if (!this.parent)
      this.left && this.left.constructor === _a && (this.parent = this.left.parent, this.parentSub = this.left.parentSub), this.right && this.right.constructor === _a && (this.parent = this.right.parent, this.parentSub = this.right.parentSub);
    else if (this.parent.constructor === Hi) {
      const r = El(t, this.parent);
      r.constructor === $t ? this.parent = null : this.parent = /** @type {ContentType} */
      r.content.type;
    }
    return null;
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(e, t) {
    if (t > 0 && (this.id.clock += t, this.left = ad(e, e.doc.store, J(this.id.client, this.id.clock - 1)), this.origin = this.left.lastId, this.content = this.content.splice(t), this.length -= t), this.parent) {
      if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
        let r = this.left, i;
        if (r !== null)
          i = r.right;
        else if (this.parentSub !== null)
          for (i = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; i !== null && i.left !== null; )
            i = i.left;
        else
          i = /** @type {AbstractType<any>} */
          this.parent._start;
        const o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
        for (; i !== null && i !== this.right; ) {
          if (s.add(i), o.add(i), vi(this.origin, i.origin)) {
            if (i.id.client < this.id.client)
              r = i, o.clear();
            else if (vi(this.rightOrigin, i.rightOrigin))
              break;
          } else if (i.origin !== null && s.has(El(e.doc.store, i.origin)))
            o.has(El(e.doc.store, i.origin)) || (r = i, o.clear());
          else
            break;
          i = i.right;
        }
        this.left = r;
      }
      if (this.left !== null) {
        const r = this.left.right;
        this.right = r, this.left.right = this;
      } else {
        let r;
        if (this.parentSub !== null)
          for (r = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; r !== null && r.left !== null; )
            r = r.left;
        else
          r = /** @type {AbstractType<any>} */
          this.parent._start, this.parent._start = this;
        this.right = r;
      }
      this.right !== null ? this.right.left = this : this.parentSub !== null && (this.parent._map.set(this.parentSub, this), this.left !== null && this.left.delete(e)), this.parentSub === null && this.countable && !this.deleted && (this.parent._length += this.length), ly(e.doc.store, this), this.content.integrate(e, this), fd(
        e,
        /** @type {AbstractType<any>} */
        this.parent,
        this.parentSub
      ), /** @type {AbstractType<any>} */
      (this.parent._item !== null && /** @type {AbstractType<any>} */
      this.parent._item.deleted || this.parentSub !== null && this.right !== null) && this.delete(e);
    } else
      new $t(this.id, this.length).integrate(e, 0);
  }
  /**
   * Returns the next non-deleted item
   */
  get next() {
    let e = this.right;
    for (; e !== null && e.deleted; )
      e = e.right;
    return e;
  }
  /**
   * Returns the previous non-deleted item
   */
  get prev() {
    let e = this.left;
    for (; e !== null && e.deleted; )
      e = e.left;
    return e;
  }
  /**
   * Computes the last content address of this Item.
   */
  get lastId() {
    return this.length === 1 ? this.id : J(this.id.client, this.id.clock + this.length - 1);
  }
  /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */
  mergeWith(e) {
    if (this.constructor === e.constructor && vi(e.origin, this.lastId) && this.right === e && vi(this.rightOrigin, e.rightOrigin) && this.id.client === e.id.client && this.id.clock + this.length === e.id.clock && this.deleted === e.deleted && this.redone === null && e.redone === null && this.content.constructor === e.content.constructor && this.content.mergeWith(e.content)) {
      const t = (
        /** @type {AbstractType<any>} */
        this.parent._searchMarker
      );
      return t && t.forEach((r) => {
        r.p === e && (r.p = this, !this.deleted && this.countable && (r.index -= this.length));
      }), e.keep && (this.keep = !0), this.right = e.right, this.right !== null && (this.right.left = this), this.length += e.length, !0;
    }
    return !1;
  }
  /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */
  delete(e) {
    if (!this.deleted) {
      const t = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      this.countable && this.parentSub === null && (t._length -= this.length), this.markDeleted(), iy(e.deleteSet, this.id.client, this.id.clock, this.length), fd(e, t, this.parentSub), this.content.delete(e);
    }
  }
  /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */
  gc(e, t) {
    if (!this.deleted)
      throw qt();
    this.content.gc(e), t ? eN(e, this, new $t(this.id, this.length)) : this.content = new _o(this.length);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   */
  write(e, t) {
    const r = t > 0 ? J(this.id.client, this.id.clock + t - 1) : this.origin, i = this.rightOrigin, o = this.parentSub, s = this.content.getRef() & WT | (r === null ? 0 : To) | // origin is defined
    (i === null ? 0 : Um) | // right origin is defined
    (o === null ? 0 : VT);
    if (e.writeInfo(s), r !== null && e.writeLeftID(r), i !== null && e.writeRightID(i), r === null && i === null) {
      const l = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      if (l._item !== void 0) {
        const a = l._item;
        if (a === null) {
          const c = Xr(l);
          e.writeParentInfo(!0), e.writeString(c);
        } else
          e.writeParentInfo(!1), e.writeLeftID(a.id);
      } else l.constructor === String ? (e.writeParentInfo(!0), e.writeString(l)) : l.constructor === Hi ? (e.writeParentInfo(!1), e.writeLeftID(l)) : qt();
      o !== null && e.writeString(o);
    }
    this.content.write(e, t);
  }
};
const Ay = (
  /** @type {any} */
  typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : {}
), Ty = "__ $YJS$ __";
Ay[Ty] === !0 && console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");
Ay[Ty] = !0;
const $D = new Xt("y-sync");
new Xt("y-undo");
new Xt("yjs-cursor");
const LD = (n, e, t) => {
  if (n === 0)
    return Ol(e, 0, -1);
  let r = e._first === null ? null : (
    /** @type {Y.ContentType} */
    e._first.content.type
  );
  for (; r !== null && e !== r; ) {
    if (r instanceof ni) {
      if (r._length >= n)
        return Ol(r, n, -1);
      if (n -= r._length, r._item !== null && r._item.next !== null)
        r = /** @type {Y.ContentType} */
        r._item.next.content.type;
      else {
        do
          r = r._item === null ? null : r._item.parent, n--;
        while (r !== e && r !== null && r._item !== null && r._item.next === null);
        r !== null && r !== e && (r = r._item === null ? null : (
          /** @type {Y.ContentType} */
          /** @type Y.Item */
          r._item.next.content.type
        ));
      }
    } else {
      const i = (
        /** @type {any} */
        (t.get(r) || { nodeSize: 0 }).nodeSize
      );
      if (r._first !== null && n < i)
        r = /** @type {Y.ContentType} */
        r._first.content.type, n--;
      else {
        if (n === 1 && r._length === 0 && i > 1)
          return new No(r._item === null ? null : r._item.id, r._item === null ? Xr(r) : null, null);
        if (n -= i, r._item !== null && r._item.next !== null)
          r = /** @type {Y.ContentType} */
          r._item.next.content.type;
        else {
          if (n === 0)
            return r = r._item === null ? r : r._item.parent, new No(r._item === null ? null : r._item.id, r._item === null ? Xr(r) : null, null);
          do
            r = /** @type {Y.Item} */
            r._item.parent, n--;
          while (r !== e && /** @type {Y.Item} */
          r._item.next === null);
          r !== e && (r = /** @type {Y.ContentType} */
          /** @type {Y.Item} */
          /** @type {Y.Item} */
          r._item.next.content.type);
        }
      }
    }
    if (r === null)
      throw qt();
    if (n === 0 && r.constructor !== ni && r !== e)
      return AN(r._item.parent, r._item);
  }
  return Ol(e, e._length, -1);
}, AN = (n, e) => {
  let t = null, r = null;
  return n._item === null ? r = Xr(n) : t = J(n._item.id.client, n._item.id.clock), new No(t, r, e.id);
}, TN = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", MN = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", tr = (n, e) => {
  for (const t in e)
    n[t] = e[t];
  return n;
}, Pa = "numeric", $a = "ascii", La = "alpha", Ki = "asciinumeric", Oi = "alphanumeric", Ba = "domain", My = "emoji", NN = "scheme", IN = "slashscheme", gd = "whitespace";
function DN(n, e) {
  return n in e || (e[n] = []), e[n];
}
function ln(n, e, t) {
  e[Pa] && (e[Ki] = !0, e[Oi] = !0), e[$a] && (e[Ki] = !0, e[La] = !0), e[Ki] && (e[Oi] = !0), e[La] && (e[Oi] = !0), e[Oi] && (e[Ba] = !0), e[My] && (e[Ba] = !0);
  for (const r in e) {
    const i = DN(r, t);
    i.indexOf(n) < 0 && i.push(n);
  }
}
function RN(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function xe(n) {
  n === void 0 && (n = null), this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
xe.groups = {};
xe.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const i = e.jr[r][0], o = e.jr[r][1];
      if (o && i.test(n))
        return o;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(n, e) {
    return e === void 0 && (e = !1), e ? n in this.j : !!this.go(n);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(n, e, t, r) {
    for (let i = 0; i < n.length; i++)
      this.tt(n[i], e, t, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(n, e, t, r) {
    r = r || xe.groups;
    let i;
    return e && e.j ? i = e : (i = new xe(e), t && r && ln(e, t, r)), this.jr.push([n, i]), i;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(n, e, t, r) {
    let i = this;
    const o = n.length;
    if (!o)
      return i;
    for (let s = 0; s < o - 1; s++)
      i = i.tt(n[s]);
    return i.tt(n[o - 1], e, t, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(n, e, t, r) {
    r = r || xe.groups;
    const i = this;
    if (e && e.j)
      return i.j[n] = e, e;
    const o = e;
    let s, l = i.go(n);
    if (l ? (s = new xe(), tr(s.j, l.j), s.jr.push.apply(s.jr, l.jr), s.jd = l.jd, s.t = l.t) : s = new xe(), o) {
      if (r)
        if (s.t && typeof s.t == "string") {
          const a = tr(RN(s.t, r), t);
          ln(o, a, r);
        } else t && ln(o, t, r);
      s.t = o;
    }
    return i.j[n] = s, s;
  }
};
const P = (n, e, t, r, i) => n.ta(e, t, r, i), Ne = (n, e, t, r, i) => n.tr(e, t, r, i), md = (n, e, t, r, i) => n.ts(e, t, r, i), S = (n, e, t, r, i) => n.tt(e, t, r, i), dt = "WORD", za = "UWORD", ri = "LOCALHOST", Fa = "TLD", ja = "UTLD", Gi = "SCHEME", _n = "SLASH_SCHEME", jc = "NUM", Ny = "WS", Vc = "NL", _r = "OPENBRACE", Pr = "CLOSEBRACE", Po = "OPENBRACKET", $o = "CLOSEBRACKET", Lo = "OPENPAREN", Bo = "CLOSEPAREN", zo = "OPENANGLEBRACKET", Fo = "CLOSEANGLEBRACKET", jo = "FULLWIDTHLEFTPAREN", Vo = "FULLWIDTHRIGHTPAREN", Wo = "LEFTCORNERBRACKET", Uo = "RIGHTCORNERBRACKET", Ho = "LEFTWHITECORNERBRACKET", Jo = "RIGHTWHITECORNERBRACKET", Ko = "FULLWIDTHLESSTHAN", Go = "FULLWIDTHGREATERTHAN", qo = "AMPERSAND", Yo = "APOSTROPHE", Xo = "ASTERISK", Rt = "AT", Qo = "BACKSLASH", Zo = "BACKTICK", es = "CARET", Lt = "COLON", Wc = "COMMA", ts = "DOLLAR", He = "DOT", ns = "EQUALS", Uc = "EXCLAMATION", Je = "HYPHEN", rs = "PERCENT", is = "PIPE", ss = "PLUS", ls = "POUND", as = "QUERY", Hc = "QUOTE", Jc = "SEMI", Ke = "SLASH", $r = "TILDE", cs = "UNDERSCORE", Iy = "EMOJI", fs = "SYM";
var Dy = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: dt,
  UWORD: za,
  LOCALHOST: ri,
  TLD: Fa,
  UTLD: ja,
  SCHEME: Gi,
  SLASH_SCHEME: _n,
  NUM: jc,
  WS: Ny,
  NL: Vc,
  OPENBRACE: _r,
  CLOSEBRACE: Pr,
  OPENBRACKET: Po,
  CLOSEBRACKET: $o,
  OPENPAREN: Lo,
  CLOSEPAREN: Bo,
  OPENANGLEBRACKET: zo,
  CLOSEANGLEBRACKET: Fo,
  FULLWIDTHLEFTPAREN: jo,
  FULLWIDTHRIGHTPAREN: Vo,
  LEFTCORNERBRACKET: Wo,
  RIGHTCORNERBRACKET: Uo,
  LEFTWHITECORNERBRACKET: Ho,
  RIGHTWHITECORNERBRACKET: Jo,
  FULLWIDTHLESSTHAN: Ko,
  FULLWIDTHGREATERTHAN: Go,
  AMPERSAND: qo,
  APOSTROPHE: Yo,
  ASTERISK: Xo,
  AT: Rt,
  BACKSLASH: Qo,
  BACKTICK: Zo,
  CARET: es,
  COLON: Lt,
  COMMA: Wc,
  DOLLAR: ts,
  DOT: He,
  EQUALS: ns,
  EXCLAMATION: Uc,
  HYPHEN: Je,
  PERCENT: rs,
  PIPE: is,
  PLUS: ss,
  POUND: ls,
  QUERY: as,
  QUOTE: Hc,
  SEMI: Jc,
  SLASH: Ke,
  TILDE: $r,
  UNDERSCORE: cs,
  EMOJI: Iy,
  SYM: fs
});
const Mn = /[a-z]/, Ml = new RegExp("\\p{L}", "u"), Nl = new RegExp("\\p{Emoji}", "u"), Il = /\d/, yd = /\s/, bd = `
`, _N = "️", PN = "‍";
let Ei = null, Ai = null;
function $N(n) {
  n === void 0 && (n = []);
  const e = {};
  xe.groups = e;
  const t = new xe();
  Ei == null && (Ei = wd(TN)), Ai == null && (Ai = wd(MN)), S(t, "'", Yo), S(t, "{", _r), S(t, "}", Pr), S(t, "[", Po), S(t, "]", $o), S(t, "(", Lo), S(t, ")", Bo), S(t, "<", zo), S(t, ">", Fo), S(t, "（", jo), S(t, "）", Vo), S(t, "「", Wo), S(t, "」", Uo), S(t, "『", Ho), S(t, "』", Jo), S(t, "＜", Ko), S(t, "＞", Go), S(t, "&", qo), S(t, "*", Xo), S(t, "@", Rt), S(t, "`", Zo), S(t, "^", es), S(t, ":", Lt), S(t, ",", Wc), S(t, "$", ts), S(t, ".", He), S(t, "=", ns), S(t, "!", Uc), S(t, "-", Je), S(t, "%", rs), S(t, "|", is), S(t, "+", ss), S(t, "#", ls), S(t, "?", as), S(t, '"', Hc), S(t, "/", Ke), S(t, ";", Jc), S(t, "~", $r), S(t, "_", cs), S(t, "\\", Qo);
  const r = Ne(t, Il, jc, {
    [Pa]: !0
  });
  Ne(r, Il, r);
  const i = Ne(t, Mn, dt, {
    [$a]: !0
  });
  Ne(i, Mn, i);
  const o = Ne(t, Ml, za, {
    [La]: !0
  });
  Ne(o, Mn), Ne(o, Ml, o);
  const s = Ne(t, yd, Ny, {
    [gd]: !0
  });
  S(t, bd, Vc, {
    [gd]: !0
  }), S(s, bd), Ne(s, yd, s);
  const l = Ne(t, Nl, Iy, {
    [My]: !0
  });
  Ne(l, Nl, l), S(l, _N, l);
  const a = S(l, PN);
  Ne(a, Nl, l);
  const c = [[Mn, i]], f = [[Mn, null], [Ml, o]];
  for (let u = 0; u < Ei.length; u++)
    Tt(t, Ei[u], Fa, dt, c);
  for (let u = 0; u < Ai.length; u++)
    Tt(t, Ai[u], ja, za, f);
  ln(Fa, {
    tld: !0,
    ascii: !0
  }, e), ln(ja, {
    utld: !0,
    alpha: !0
  }, e), Tt(t, "file", Gi, dt, c), Tt(t, "mailto", Gi, dt, c), Tt(t, "http", _n, dt, c), Tt(t, "https", _n, dt, c), Tt(t, "ftp", _n, dt, c), Tt(t, "ftps", _n, dt, c), ln(Gi, {
    scheme: !0,
    ascii: !0
  }, e), ln(_n, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((u, h) => u[0] > h[0] ? 1 : -1);
  for (let u = 0; u < n.length; u++) {
    const h = n[u][0], p = n[u][1] ? {
      [NN]: !0
    } : {
      [IN]: !0
    };
    h.indexOf("-") >= 0 ? p[Ba] = !0 : Mn.test(h) ? Il.test(h) ? p[Ki] = !0 : p[$a] = !0 : p[Pa] = !0, md(t, h, h, p);
  }
  return md(t, "localhost", ri, {
    ascii: !0
  }), t.jd = new xe(fs), {
    start: t,
    tokens: tr({
      groups: e
    }, Dy)
  };
}
function LN(n, e) {
  const t = BN(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = t.length, i = [];
  let o = 0, s = 0;
  for (; s < r; ) {
    let l = n, a = null, c = 0, f = null, u = -1, h = -1;
    for (; s < r && (a = l.go(t[s])); )
      l = a, l.accepts() ? (u = 0, h = 0, f = l) : u >= 0 && (u += t[s].length, h++), c += t[s].length, o += t[s].length, s++;
    o -= u, s -= h, c -= u, i.push({
      t: f.t,
      // token type/name
      v: e.slice(o - c, o),
      // string value
      s: o - c,
      // start index
      e: o
      // end index (excluding)
    });
  }
  return i;
}
function BN(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let i = n.charCodeAt(r), o, s = i < 55296 || i > 56319 || r + 1 === t || (o = n.charCodeAt(r + 1)) < 56320 || o > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(s), r += s.length;
  }
  return e;
}
function Tt(n, e, t, r, i) {
  let o;
  const s = e.length;
  for (let l = 0; l < s - 1; l++) {
    const a = e[l];
    n.j[a] ? o = n.j[a] : (o = new xe(r), o.jr = i.slice(), n.j[a] = o), n = o;
  }
  return o = new xe(t), o.jr = i.slice(), n.j[e[s - 1]] = o, o;
}
function wd(n) {
  const e = [], t = [];
  let r = 0, i = "0123456789";
  for (; r < n.length; ) {
    let o = 0;
    for (; i.indexOf(n[r + o]) >= 0; )
      o++;
    if (o > 0) {
      e.push(t.join(""));
      for (let s = parseInt(n.substring(r, r + o), 10); s > 0; s--)
        t.pop();
      r += o;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const ii = {
  defaultProtocol: "http",
  events: null,
  format: Sd,
  formatHref: Sd,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Kc(n, e) {
  e === void 0 && (e = null);
  let t = tr({}, ii);
  n && (t = tr(t, n instanceof Kc ? n.o : n));
  const r = t.ignoreTags, i = [];
  for (let o = 0; o < r.length; o++)
    i.push(r[o].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = i;
}
Kc.prototype = {
  o: ii,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(n) {
    return n;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(n) {
    return this.get("validate", n.toString(), n);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(n, e, t) {
    const r = e != null;
    let i = this.o[n];
    return i && (typeof i == "object" ? (i = t.t in i ? i[t.t] : ii[n], typeof i == "function" && r && (i = i(e, t))) : typeof i == "function" && r && (i = i(e, t.t, t)), i);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function Sd(n) {
  return n;
}
function Ry(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
Ry.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
  */
  toHref(n) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(n) {
    return n === void 0 && (n = ii.defaultProtocol), {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), i = n.get("tagName", t, e), o = this.toFormattedString(n), s = {}, l = n.get("className", t, e), a = n.get("target", t, e), c = n.get("rel", t, e), f = n.getObj("attributes", t, e), u = n.getObj("events", t, e);
    return s.href = r, l && (s.class = l), a && (s.target = a), c && (s.rel = c), f && tr(s, f), {
      tagName: i,
      attributes: s,
      content: o,
      eventListeners: u
    };
  }
};
function Ms(n, e) {
  class t extends Ry {
    constructor(i, o) {
      super(i, o), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const vd = Ms("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Cd = Ms("text"), zN = Ms("nl"), Ti = Ms("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n) {
    return n === void 0 && (n = ii.defaultProtocol), this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== ri && n[1].t === Lt;
  }
}), Ie = (n) => new xe(n);
function FN(n) {
  let {
    groups: e
  } = n;
  const t = e.domain.concat([qo, Xo, Rt, Qo, Zo, es, ts, ns, Je, jc, rs, is, ss, ls, Ke, fs, $r, cs]), r = [Yo, Lt, Wc, He, Uc, as, Hc, Jc, zo, Fo, _r, Pr, $o, Po, Lo, Bo, jo, Vo, Wo, Uo, Ho, Jo, Ko, Go], i = [qo, Yo, Xo, Qo, Zo, es, ts, ns, Je, _r, Pr, rs, is, ss, ls, as, Ke, fs, $r, cs], o = Ie(), s = S(o, $r);
  P(s, i, s), P(s, e.domain, s);
  const l = Ie(), a = Ie(), c = Ie();
  P(o, e.domain, l), P(o, e.scheme, a), P(o, e.slashscheme, c), P(l, i, s), P(l, e.domain, l);
  const f = S(l, Rt);
  S(s, Rt, f), S(a, Rt, f), S(c, Rt, f);
  const u = S(s, He);
  P(u, i, s), P(u, e.domain, s);
  const h = Ie();
  P(f, e.domain, h), P(h, e.domain, h);
  const d = S(h, He);
  P(d, e.domain, h);
  const p = Ie(vd);
  P(d, e.tld, p), P(d, e.utld, p), S(f, ri, p);
  const g = S(h, Je);
  P(g, e.domain, h), P(p, e.domain, h), S(p, He, d), S(p, Je, g);
  const m = S(p, Lt);
  P(m, e.numeric, vd);
  const y = S(l, Je), x = S(l, He);
  P(y, e.domain, l), P(x, i, s), P(x, e.domain, l);
  const O = Ie(Ti);
  P(x, e.tld, O), P(x, e.utld, O), P(O, e.domain, l), P(O, i, s), S(O, He, x), S(O, Je, y), S(O, Rt, f);
  const N = S(O, Lt), T = Ie(Ti);
  P(N, e.numeric, T);
  const C = Ie(Ti), D = Ie();
  P(C, t, C), P(C, r, D), P(D, t, C), P(D, r, D), S(O, Ke, C), S(T, Ke, C);
  const R = S(a, Lt), A = S(c, Lt), Z = S(A, Ke), E = S(Z, Ke);
  P(a, e.domain, l), S(a, He, x), S(a, Je, y), P(c, e.domain, l), S(c, He, x), S(c, Je, y), P(R, e.domain, C), S(R, Ke, C), P(E, e.domain, C), P(E, t, C), S(E, Ke, C);
  const k = [
    [_r, Pr],
    // {}
    [Po, $o],
    // []
    [Lo, Bo],
    // ()
    [zo, Fo],
    // <>
    [jo, Vo],
    // （）
    [Wo, Uo],
    // 「」
    [Ho, Jo],
    // 『』
    [Ko, Go]
    // ＜＞
  ];
  for (let $ = 0; $ < k.length; $++) {
    const [w, ee] = k[$], z = S(C, w);
    S(D, w, z), S(z, ee, C);
    const j = Ie(Ti);
    P(z, t, j);
    const le = Ie();
    P(z, r), P(j, t, j), P(j, r, le), P(le, t, j), P(le, r, le), S(j, ee, C), S(le, ee, C);
  }
  return S(o, ri, O), S(o, Vc, zN), {
    start: o,
    tokens: Dy
  };
}
function jN(n, e, t) {
  let r = t.length, i = 0, o = [], s = [];
  for (; i < r; ) {
    let l = n, a = null, c = null, f = 0, u = null, h = -1;
    for (; i < r && !(a = l.go(t[i].t)); )
      s.push(t[i++]);
    for (; i < r && (c = a || l.go(t[i].t)); )
      a = null, l = c, l.accepts() ? (h = 0, u = l) : h >= 0 && h++, i++, f++;
    if (h < 0)
      i -= f, i < r && (s.push(t[i]), i++);
    else {
      s.length > 0 && (o.push(Dl(Cd, e, s)), s = []), i -= h, f -= h;
      const d = u.t, p = t.slice(i - f, i);
      o.push(Dl(d, e, p));
    }
  }
  return s.length > 0 && o.push(Dl(Cd, e, s)), o;
}
function Dl(n, e, t) {
  const r = t[0].s, i = t[t.length - 1].e, o = e.slice(r, i);
  return new n(o, t);
}
const VN = typeof console < "u" && console && console.warn || (() => {
}), WN = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", q = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function BD() {
  xe.groups = {}, q.scanner = null, q.parser = null, q.tokenQueue = [], q.pluginQueue = [], q.customSchemes = [], q.initialized = !1;
}
function zD(n, e) {
  if (e === void 0 && (e = !1), q.initialized && VN(`linkifyjs: already initialized - will not register custom scheme "${n}" ${WN}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  q.customSchemes.push([n, e]);
}
function UN() {
  q.scanner = $N(q.customSchemes);
  for (let n = 0; n < q.tokenQueue.length; n++)
    q.tokenQueue[n][1]({
      scanner: q.scanner
    });
  q.parser = FN(q.scanner.tokens);
  for (let n = 0; n < q.pluginQueue.length; n++)
    q.pluginQueue[n][1]({
      scanner: q.scanner,
      parser: q.parser
    });
  q.initialized = !0;
}
function HN(n) {
  return q.initialized || UN(), jN(q.parser.start, n, LN(q.scanner.start, n));
}
function FD(n, e, t) {
  if (e === void 0 && (e = null), t === void 0 && (t = null), e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new Kc(t), i = HN(n), o = [];
  for (let s = 0; s < i.length; s++) {
    const l = i[s];
    l.isLink && (!e || l.t === e) && r.check(l) && o.push(l.toFormattedObject(r));
  }
  return o;
}
var us = 200, oe = function() {
};
oe.prototype.append = function(e) {
  return e.length ? (e = oe.from(e), !this.length && e || e.length < us && this.leafAppend(e) || this.length < us && e.leafPrepend(this) || this.appendInner(e)) : this;
};
oe.prototype.prepend = function(e) {
  return e.length ? oe.from(e).append(this) : this;
};
oe.prototype.appendInner = function(e) {
  return new JN(this, e);
};
oe.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? oe.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
oe.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
oe.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
oe.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(o, s) {
    return i.push(e(o, s));
  }, t, r), i;
};
oe.from = function(e) {
  return e instanceof oe ? e : e && e.length ? new _y(e) : oe.empty;
};
var _y = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, o) {
    return i == 0 && o == this.length ? this : new e(this.values.slice(i, o));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, o, s, l) {
    for (var a = o; a < s; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, o, s, l) {
    for (var a = o - 1; a >= s; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= us)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= us)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(oe);
oe.empty = new _y([]);
var JN = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, o, s) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(o, l), s) === !1 || o > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, o) - l, s + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, o, s) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(o, l) - l, s + l) === !1 || o < l && this.left.forEachInvertedInner(r, Math.min(i, l), o, s) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var o = this.left.length;
    return i <= o ? this.left.slice(r, i) : r >= o ? this.right.slice(r - o, i - o) : this.left.slice(r, o).append(this.right.slice(0, i - o));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(oe);
const KN = 500;
class ze {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, o;
    t && (i = this.remapping(r, this.items.length), o = i.maps.length);
    let s = e.tr, l, a, c = [], f = [];
    return this.items.forEach((u, h) => {
      if (!u.step) {
        i || (i = this.remapping(r, h + 1), o = i.maps.length), o--, f.push(u);
        return;
      }
      if (i) {
        f.push(new Ge(u.map));
        let d = u.step.map(i.slice(o)), p;
        d && s.maybeStep(d).doc && (p = s.mapping.maps[s.mapping.maps.length - 1], c.push(new Ge(p, void 0, void 0, c.length + f.length))), o--, p && i.appendMap(p, o);
      } else
        s.maybeStep(u.step);
      if (u.selection)
        return l = i ? u.selection.map(i.slice(o)) : u.selection, a = new ze(this.items.slice(0, r).append(f.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: s, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, i) {
    let o = [], s = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let f = 0; f < e.steps.length; f++) {
      let u = e.steps[f].invert(e.docs[f]), h = new Ge(e.mapping.maps[f], u, t), d;
      (d = a && a.merge(h)) && (h = d, f ? o.pop() : l = l.slice(0, l.length - 1)), o.push(h), t && (s++, t = void 0), i || (a = h);
    }
    let c = s - r.depth;
    return c > qN && (l = GN(l, c), s -= c), new ze(l.append(o), s);
  }
  remapping(e, t) {
    let r = new $n();
    return this.items.forEach((i, o) => {
      let s = i.mirrorOffset != null && o - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, s);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new ze(this.items.append(e.map((t) => new Ge(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - t), o = e.mapping, s = e.steps.length, l = this.eventCount;
    this.items.forEach((h) => {
      h.selection && l--;
    }, i);
    let a = t;
    this.items.forEach((h) => {
      let d = o.getMirror(--a);
      if (d == null)
        return;
      s = Math.min(s, d);
      let p = o.maps[d];
      if (h.step) {
        let g = e.steps[d].invert(e.docs[d]), m = h.selection && h.selection.map(o.slice(a + 1, d));
        m && l++, r.push(new Ge(p, g, m));
      } else
        r.push(new Ge(p));
    }, i);
    let c = [];
    for (let h = t; h < s; h++)
      c.push(new Ge(o.maps[h]));
    let f = this.items.slice(0, i).append(c).append(r), u = new ze(f, l);
    return u.emptyItemCount() > KN && (u = u.compress(this.items.length - r.length)), u;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, i = [], o = 0;
    return this.items.forEach((s, l) => {
      if (l >= e)
        i.push(s), s.selection && o++;
      else if (s.step) {
        let a = s.step.map(t.slice(r)), c = a && a.getMap();
        if (r--, c && t.appendMap(c, r), a) {
          let f = s.selection && s.selection.map(t.slice(r));
          f && o++;
          let u = new Ge(c.invert(), a, f), h, d = i.length - 1;
          (h = i.length && i[d].merge(u)) ? i[d] = h : i.push(u);
        }
      } else s.map && r--;
    }, this.items.length, 0), new ze(oe.from(i.reverse()), o);
  }
}
ze.empty = new ze(oe.empty, 0);
function GN(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class Ge {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new Ge(t.getMap().invert(), t, this.selection);
    }
  }
}
class _t {
  constructor(e, t, r, i, o) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = o;
  }
}
const qN = 20;
function YN(n, e, t, r) {
  let i = t.getMeta(pn), o;
  if (i)
    return i.historyState;
  t.getMeta(ZN) && (n = new _t(n.done, n.undone, null, 0, -1));
  let s = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (s && s.getMeta(pn))
    return s.getMeta(pn).redo ? new _t(n.done.addTransform(t, void 0, r, qi(e)), n.undone, xd(t.mapping.maps), n.prevTime, n.prevComposition) : new _t(n.done, n.undone.addTransform(t, void 0, r, qi(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(s && s.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !s && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !XN(t, n.prevRanges)), c = s ? Rl(n.prevRanges, t.mapping) : xd(t.mapping.maps);
    return new _t(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, qi(e)), ze.empty, c, t.time, l ?? n.prevComposition);
  } else return (o = t.getMeta("rebased")) ? new _t(n.done.rebased(t, o), n.undone.rebased(t, o), Rl(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new _t(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), Rl(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function XN(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, i) => {
    for (let o = 0; o < e.length; o += 2)
      r <= e[o + 1] && i >= e[o] && (t = !0);
  }), t;
}
function xd(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((r, i, o, s) => e.push(o, s));
  return e;
}
function Rl(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), o = e.map(n[r + 1], -1);
    i <= o && t.push(i, o);
  }
  return t;
}
function QN(n, e, t) {
  let r = qi(e), i = pn.get(e).spec.config, o = (t ? n.undone : n.done).popEvent(e, r);
  if (!o)
    return null;
  let s = o.selection.resolve(o.transform.doc), l = (t ? n.done : n.undone).addTransform(o.transform, e.selection.getBookmark(), i, r), a = new _t(t ? l : o.remaining, t ? o.remaining : l, null, 0, -1);
  return o.transform.setSelection(s).setMeta(pn, { redo: t, historyState: a });
}
let _l = !1, kd = null;
function qi(n) {
  let e = n.plugins;
  if (kd != e) {
    _l = !1, kd = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        _l = !0;
        break;
      }
  }
  return _l;
}
const pn = new Xt("history"), ZN = new Xt("closeHistory");
function jD(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new rr({
    key: pn,
    state: {
      init() {
        return new _t(ze.empty, ze.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return YN(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? eI : r == "historyRedo" ? tI : null;
          return i ? (t.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function Py(n, e) {
  return (t, r) => {
    let i = pn.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let o = QN(i, t, n);
      o && r(e ? o.scrollIntoView() : o);
    }
    return !0;
  };
}
const eI = Py(!1, !0), tI = Py(!0, !0);
function VD(n = {}) {
  return new rr({
    view(e) {
      return new nI(e, n);
    }
  });
}
class nI {
  constructor(e, t) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = t.width) !== null && r !== void 0 ? r : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((i) => {
      let o = (s) => {
        this[i](s);
      };
      return e.dom.addEventListener(i, o), { name: i, handler: o };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, r;
    if (t) {
      let l = e.nodeBefore, a = e.nodeAfter;
      if (l || a) {
        let c = this.editorView.nodeDOM(this.cursorPos - (l ? l.nodeSize : 0));
        if (c) {
          let f = c.getBoundingClientRect(), u = l ? f.bottom : f.top;
          l && a && (u = (u + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2), r = { left: f.left, right: f.right, top: u - this.width / 2, bottom: u + this.width / 2 };
        }
      }
    }
    if (!r) {
      let l = this.editorView.coordsAtPos(this.cursorPos);
      r = { left: l.left - this.width / 2, right: l.left + this.width / 2, top: l.top, bottom: l.bottom };
    }
    let i = this.editorView.dom.offsetParent;
    this.element || (this.element = i.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let o, s;
    if (!i || i == document.body && getComputedStyle(i).position == "static")
      o = -pageXOffset, s = -pageYOffset;
    else {
      let l = i.getBoundingClientRect();
      o = l.left - i.scrollLeft, s = l.top - i.scrollTop;
    }
    this.element.style.left = r.left - o + "px", this.element.style.top = r.top - s + "px", this.element.style.width = r.right - r.left + "px", this.element.style.height = r.bottom - r.top + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), i = r && r.type.spec.disableDropCursor, o = typeof i == "function" ? i(this.editorView, t, e) : i;
    if (t && !o) {
      let s = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let l = lp(this.editorView.state.doc, s, this.editorView.dragging.slice);
        l != null && (s = l);
      }
      this.setCursor(s), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    (e.target == this.editorView.dom || !this.editorView.dom.contains(e.relatedTarget)) && this.setCursor(null);
  }
}
class X extends I {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return X.valid(r) ? new X(r) : I.near(r);
  }
  content() {
    return v.empty;
  }
  eq(e) {
    return e instanceof X && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new X(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new Gc(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !rI(e) || !iI(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let i = t.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, r = !1) {
    e: for (; ; ) {
      if (!r && X.valid(e))
        return e;
      let i = e.pos, o = null;
      for (let s = e.depth; ; s--) {
        let l = e.node(s);
        if (t > 0 ? e.indexAfter(s) < l.childCount : e.index(s) > 0) {
          o = l.child(t > 0 ? e.indexAfter(s) : e.index(s) - 1);
          break;
        } else if (s == 0)
          return null;
        i += t;
        let a = e.doc.resolve(i);
        if (X.valid(a))
          return a;
      }
      for (; ; ) {
        let s = t > 0 ? o.firstChild : o.lastChild;
        if (!s) {
          if (o.isAtom && !o.isText && !M.isSelectable(o)) {
            e = e.doc.resolve(i + o.nodeSize * t), r = !1;
            continue e;
          }
          break;
        }
        o = s, i += t;
        let l = e.doc.resolve(i);
        if (X.valid(l))
          return l;
      }
      return null;
    }
  }
}
X.prototype.visible = !1;
X.findFrom = X.findGapCursorFrom;
I.jsonID("gapcursor", X);
class Gc {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Gc(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return X.valid(t) ? new X(t) : I.near(t);
  }
}
function rI(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function iI(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function WD() {
  return new rr({
    props: {
      decorations: aI,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && X.valid(t) ? new X(t) : null;
      },
      handleClick: sI,
      handleKeyDown: oI,
      handleDOMEvents: { beforeinput: lI }
    }
  });
}
const oI = rc({
  ArrowLeft: Mi("horiz", -1),
  ArrowRight: Mi("horiz", 1),
  ArrowUp: Mi("vert", -1),
  ArrowDown: Mi("vert", 1)
});
function Mi(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, o) {
    let s = r.selection, l = e > 0 ? s.$to : s.$from, a = s.empty;
    if (s instanceof L) {
      if (!o.endOfTextblock(t) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = X.findGapCursorFrom(l, e, a);
    return c ? (i && i(r.tr.setSelection(new X(c))), !0) : !1;
  };
}
function sI(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!X.valid(r))
    return !1;
  let i = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return i && i.inside > -1 && M.isSelectable(n.state.doc.nodeAt(i.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new X(r))), !0);
}
function lI(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof X))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = b.empty;
  for (let s = r.length - 1; s >= 0; s--)
    i = b.from(r[s].createAndFill(null, i));
  let o = n.state.tr.replace(t.pos, t.pos, new v(i, 0, 0));
  return o.setSelection(L.near(o.doc.resolve(t.pos + 1))), n.dispatch(o), !1;
}
function aI(n) {
  if (!(n.selection instanceof X))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", Y.create(n.doc, [ke.widget(n.selection.head, e, { key: "gapcursor" })]);
}
var Va, Wa;
if (typeof WeakMap < "u") {
  let n = /* @__PURE__ */ new WeakMap();
  Va = (e) => n.get(e), Wa = (e, t) => (n.set(e, t), t);
} else {
  const n = [];
  let t = 0;
  Va = (r) => {
    for (let i = 0; i < n.length; i += 2)
      if (n[i] == r)
        return n[i + 1];
  }, Wa = (r, i) => (t == 10 && (t = 0), n[t++] = r, n[t++] = i);
}
var Q = class {
  constructor(n, e, t, r) {
    this.width = n, this.height = e, this.map = t, this.problems = r;
  }
  // Find the dimensions of the cell at the given position.
  findCell(n) {
    for (let e = 0; e < this.map.length; e++) {
      const t = this.map[e];
      if (t != n)
        continue;
      const r = e % this.width, i = e / this.width | 0;
      let o = r + 1, s = i + 1;
      for (let l = 1; o < this.width && this.map[e + l] == t; l++)
        o++;
      for (let l = 1; s < this.height && this.map[e + this.width * l] == t; l++)
        s++;
      return { left: r, top: i, right: o, bottom: s };
    }
    throw new RangeError(`No cell with offset ${n} found`);
  }
  // Find the left side of the cell at the given position.
  colCount(n) {
    for (let e = 0; e < this.map.length; e++)
      if (this.map[e] == n)
        return e % this.width;
    throw new RangeError(`No cell with offset ${n} found`);
  }
  // Find the next cell in the given direction, starting from the cell
  // at `pos`, if any.
  nextCell(n, e, t) {
    const { left: r, right: i, top: o, bottom: s } = this.findCell(n);
    return e == "horiz" ? (t < 0 ? r == 0 : i == this.width) ? null : this.map[o * this.width + (t < 0 ? r - 1 : i)] : (t < 0 ? o == 0 : s == this.height) ? null : this.map[r + this.width * (t < 0 ? o - 1 : s)];
  }
  // Get the rectangle spanning the two given cells.
  rectBetween(n, e) {
    const {
      left: t,
      right: r,
      top: i,
      bottom: o
    } = this.findCell(n), {
      left: s,
      right: l,
      top: a,
      bottom: c
    } = this.findCell(e);
    return {
      left: Math.min(t, s),
      top: Math.min(i, a),
      right: Math.max(r, l),
      bottom: Math.max(o, c)
    };
  }
  // Return the position of all cells that have the top left corner in
  // the given rectangle.
  cellsInRect(n) {
    const e = [], t = {};
    for (let r = n.top; r < n.bottom; r++)
      for (let i = n.left; i < n.right; i++) {
        const o = r * this.width + i, s = this.map[o];
        t[s] || (t[s] = !0, !(i == n.left && i && this.map[o - 1] == s || r == n.top && r && this.map[o - this.width] == s) && e.push(s));
      }
    return e;
  }
  // Return the position at which the cell at the given row and column
  // starts, or would start, if a cell started there.
  positionAt(n, e, t) {
    for (let r = 0, i = 0; ; r++) {
      const o = i + t.child(r).nodeSize;
      if (r == n) {
        let s = e + n * this.width;
        const l = (n + 1) * this.width;
        for (; s < l && this.map[s] < i; )
          s++;
        return s == l ? o - 1 : this.map[s];
      }
      i = o;
    }
  }
  // Find the table map for the given table node.
  static get(n) {
    return Va(n) || Wa(n, cI(n));
  }
};
function cI(n) {
  if (n.type.spec.tableRole != "table")
    throw new RangeError("Not a table node: " + n.type.name);
  const e = fI(n), t = n.childCount, r = [];
  let i = 0, o = null;
  const s = [];
  for (let c = 0, f = e * t; c < f; c++)
    r[c] = 0;
  for (let c = 0, f = 0; c < t; c++) {
    const u = n.child(c);
    f++;
    for (let p = 0; ; p++) {
      for (; i < r.length && r[i] != 0; )
        i++;
      if (p == u.childCount)
        break;
      const g = u.child(p), { colspan: m, rowspan: y, colwidth: x } = g.attrs;
      for (let O = 0; O < y; O++) {
        if (O + c >= t) {
          (o || (o = [])).push({
            type: "overlong_rowspan",
            pos: f,
            n: y - O
          });
          break;
        }
        const N = i + O * e;
        for (let T = 0; T < m; T++) {
          r[N + T] == 0 ? r[N + T] = f : (o || (o = [])).push({
            type: "collision",
            row: c,
            pos: f,
            n: m - T
          });
          const C = x && x[T];
          if (C) {
            const D = (N + T) % e * 2, R = s[D];
            R == null || R != C && s[D + 1] == 1 ? (s[D] = C, s[D + 1] = 1) : R == C && s[D + 1]++;
          }
        }
      }
      i += m, f += g.nodeSize;
    }
    const h = (c + 1) * e;
    let d = 0;
    for (; i < h; )
      r[i++] == 0 && d++;
    d && (o || (o = [])).push({ type: "missing", row: c, n: d }), f++;
  }
  const l = new Q(e, t, r, o);
  let a = !1;
  for (let c = 0; !a && c < s.length; c += 2)
    s[c] != null && s[c + 1] < t && (a = !0);
  return a && uI(l, s, n), l;
}
function fI(n) {
  let e = -1, t = !1;
  for (let r = 0; r < n.childCount; r++) {
    const i = n.child(r);
    let o = 0;
    if (t)
      for (let s = 0; s < r; s++) {
        const l = n.child(s);
        for (let a = 0; a < l.childCount; a++) {
          const c = l.child(a);
          s + c.attrs.rowspan > r && (o += c.attrs.colspan);
        }
      }
    for (let s = 0; s < i.childCount; s++) {
      const l = i.child(s);
      o += l.attrs.colspan, l.attrs.rowspan > 1 && (t = !0);
    }
    e == -1 ? e = o : e != o && (e = Math.max(e, o));
  }
  return e;
}
function uI(n, e, t) {
  n.problems || (n.problems = []);
  const r = {};
  for (let i = 0; i < n.map.length; i++) {
    const o = n.map[i];
    if (r[o])
      continue;
    r[o] = !0;
    const s = t.nodeAt(o);
    if (!s)
      throw new RangeError(`No cell with offset ${o} found`);
    let l = null;
    const a = s.attrs;
    for (let c = 0; c < a.colspan; c++) {
      const f = (i + c) % n.width, u = e[f * 2];
      u != null && (!a.colwidth || a.colwidth[c] != u) && ((l || (l = hI(a)))[c] = u);
    }
    l && n.problems.unshift({
      type: "colwidth mismatch",
      pos: o,
      colwidth: l
    });
  }
}
function hI(n) {
  if (n.colwidth)
    return n.colwidth.slice();
  const e = [];
  for (let t = 0; t < n.colspan; t++)
    e.push(0);
  return e;
}
function be(n) {
  let e = n.cached.tableNodeTypes;
  if (!e) {
    e = n.cached.tableNodeTypes = {};
    for (const t in n.nodes) {
      const r = n.nodes[t], i = r.spec.tableRole;
      i && (e[i] = r);
    }
  }
  return e;
}
var Bt = new Xt("selectingCells");
function ur(n) {
  for (let e = n.depth - 1; e > 0; e--)
    if (n.node(e).type.spec.tableRole == "row")
      return n.node(0).resolve(n.before(e + 1));
  return null;
}
function dI(n) {
  for (let e = n.depth; e > 0; e--) {
    const t = n.node(e).type.spec.tableRole;
    if (t === "cell" || t === "header_cell")
      return n.node(e);
  }
  return null;
}
function We(n) {
  const e = n.selection.$head;
  for (let t = e.depth; t > 0; t--)
    if (e.node(t).type.spec.tableRole == "row")
      return !0;
  return !1;
}
function Ns(n) {
  const e = n.selection;
  if ("$anchorCell" in e && e.$anchorCell)
    return e.$anchorCell.pos > e.$headCell.pos ? e.$anchorCell : e.$headCell;
  if ("node" in e && e.node && e.node.type.spec.tableRole == "cell")
    return e.$anchor;
  const t = ur(e.$head) || pI(e.$head);
  if (t)
    return t;
  throw new RangeError(`No cell found around position ${e.head}`);
}
function pI(n) {
  for (let e = n.nodeAfter, t = n.pos; e; e = e.firstChild, t++) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell")
      return n.doc.resolve(t);
  }
  for (let e = n.nodeBefore, t = n.pos; e; e = e.lastChild, t--) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell")
      return n.doc.resolve(t - e.nodeSize);
  }
}
function Ua(n) {
  return n.parent.type.spec.tableRole == "row" && !!n.nodeAfter;
}
function gI(n) {
  return n.node(0).resolve(n.pos + n.nodeAfter.nodeSize);
}
function qc(n, e) {
  return n.depth == e.depth && n.pos >= e.start(-1) && n.pos <= e.end(-1);
}
function $y(n, e, t) {
  const r = n.node(-1), i = Q.get(r), o = n.start(-1), s = i.nextCell(n.pos - o, e, t);
  return s == null ? null : n.node(0).resolve(o + s);
}
function Sn(n, e, t = 1) {
  const r = { ...n, colspan: n.colspan - t };
  return r.colwidth && (r.colwidth = r.colwidth.slice(), r.colwidth.splice(e, t), r.colwidth.some((i) => i > 0) || (r.colwidth = null)), r;
}
function Ly(n, e, t = 1) {
  const r = { ...n, colspan: n.colspan + t };
  if (r.colwidth) {
    r.colwidth = r.colwidth.slice();
    for (let i = 0; i < t; i++)
      r.colwidth.splice(e, 0, 0);
  }
  return r;
}
function mI(n, e, t) {
  const r = be(e.type.schema).header_cell;
  for (let i = 0; i < n.height; i++)
    if (e.nodeAt(n.map[t + i * n.width]).type != r)
      return !1;
  return !0;
}
var K = class pt extends I {
  // A table selection is identified by its anchor and head cells. The
  // positions given to this constructor should point _before_ two
  // cells in the same table. They may be the same, to select a single
  // cell.
  constructor(e, t = e) {
    const r = e.node(-1), i = Q.get(r), o = e.start(-1), s = i.rectBetween(
      e.pos - o,
      t.pos - o
    ), l = e.node(0), a = i.cellsInRect(s).filter((f) => f != t.pos - o);
    a.unshift(t.pos - o);
    const c = a.map((f) => {
      const u = r.nodeAt(f);
      if (!u)
        throw RangeError(`No cell with offset ${f} found`);
      const h = o + f + 1;
      return new dp(
        l.resolve(h),
        l.resolve(h + u.content.size)
      );
    });
    super(c[0].$from, c[0].$to, c), this.$anchorCell = e, this.$headCell = t;
  }
  map(e, t) {
    const r = e.resolve(t.map(this.$anchorCell.pos)), i = e.resolve(t.map(this.$headCell.pos));
    if (Ua(r) && Ua(i) && qc(r, i)) {
      const o = this.$anchorCell.node(-1) != r.node(-1);
      return o && this.isRowSelection() ? pt.rowSelection(r, i) : o && this.isColSelection() ? pt.colSelection(r, i) : new pt(r, i);
    }
    return L.between(r, i);
  }
  // Returns a rectangular slice of table rows containing the selected
  // cells.
  content() {
    const e = this.$anchorCell.node(-1), t = Q.get(e), r = this.$anchorCell.start(-1), i = t.rectBetween(
      this.$anchorCell.pos - r,
      this.$headCell.pos - r
    ), o = {}, s = [];
    for (let a = i.top; a < i.bottom; a++) {
      const c = [];
      for (let f = a * t.width + i.left, u = i.left; u < i.right; u++, f++) {
        const h = t.map[f];
        if (o[h])
          continue;
        o[h] = !0;
        const d = t.findCell(h);
        let p = e.nodeAt(h);
        if (!p)
          throw RangeError(`No cell with offset ${h} found`);
        const g = i.left - d.left, m = d.right - i.right;
        if (g > 0 || m > 0) {
          let y = p.attrs;
          if (g > 0 && (y = Sn(y, 0, g)), m > 0 && (y = Sn(
            y,
            y.colspan - m,
            m
          )), d.left < i.left) {
            if (p = p.type.createAndFill(y), !p)
              throw RangeError(
                `Could not create cell with attrs ${JSON.stringify(y)}`
              );
          } else
            p = p.type.create(y, p.content);
        }
        if (d.top < i.top || d.bottom > i.bottom) {
          const y = {
            ...p.attrs,
            rowspan: Math.min(d.bottom, i.bottom) - Math.max(d.top, i.top)
          };
          d.top < i.top ? p = p.type.createAndFill(y) : p = p.type.create(y, p.content);
        }
        c.push(p);
      }
      s.push(e.child(a).copy(b.from(c)));
    }
    const l = this.isColSelection() && this.isRowSelection() ? e : s;
    return new v(b.from(l), 1, 1);
  }
  replace(e, t = v.empty) {
    const r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      const { $from: l, $to: a } = i[s], c = e.mapping.slice(r);
      e.replace(
        c.map(l.pos),
        c.map(a.pos),
        s ? v.empty : t
      );
    }
    const o = I.findFrom(
      e.doc.resolve(e.mapping.slice(r).map(this.to)),
      -1
    );
    o && e.setSelection(o);
  }
  replaceWith(e, t) {
    this.replace(e, new v(b.from(t), 0, 0));
  }
  forEachCell(e) {
    const t = this.$anchorCell.node(-1), r = Q.get(t), i = this.$anchorCell.start(-1), o = r.cellsInRect(
      r.rectBetween(
        this.$anchorCell.pos - i,
        this.$headCell.pos - i
      )
    );
    for (let s = 0; s < o.length; s++)
      e(t.nodeAt(o[s]), i + o[s]);
  }
  // True if this selection goes all the way from the top to the
  // bottom of the table.
  isColSelection() {
    const e = this.$anchorCell.index(-1), t = this.$headCell.index(-1);
    if (Math.min(e, t) > 0)
      return !1;
    const r = e + this.$anchorCell.nodeAfter.attrs.rowspan, i = t + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(r, i) == this.$headCell.node(-1).childCount;
  }
  // Returns the smallest column selection that covers the given anchor
  // and head cell.
  static colSelection(e, t = e) {
    const r = e.node(-1), i = Q.get(r), o = e.start(-1), s = i.findCell(e.pos - o), l = i.findCell(t.pos - o), a = e.node(0);
    return s.top <= l.top ? (s.top > 0 && (e = a.resolve(o + i.map[s.left])), l.bottom < i.height && (t = a.resolve(
      o + i.map[i.width * (i.height - 1) + l.right - 1]
    ))) : (l.top > 0 && (t = a.resolve(o + i.map[l.left])), s.bottom < i.height && (e = a.resolve(
      o + i.map[i.width * (i.height - 1) + s.right - 1]
    ))), new pt(e, t);
  }
  // True if this selection goes all the way from the left to the
  // right of the table.
  isRowSelection() {
    const e = this.$anchorCell.node(-1), t = Q.get(e), r = this.$anchorCell.start(-1), i = t.colCount(this.$anchorCell.pos - r), o = t.colCount(this.$headCell.pos - r);
    if (Math.min(i, o) > 0)
      return !1;
    const s = i + this.$anchorCell.nodeAfter.attrs.colspan, l = o + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(s, l) == t.width;
  }
  eq(e) {
    return e instanceof pt && e.$anchorCell.pos == this.$anchorCell.pos && e.$headCell.pos == this.$headCell.pos;
  }
  // Returns the smallest row selection that covers the given anchor
  // and head cell.
  static rowSelection(e, t = e) {
    const r = e.node(-1), i = Q.get(r), o = e.start(-1), s = i.findCell(e.pos - o), l = i.findCell(t.pos - o), a = e.node(0);
    return s.left <= l.left ? (s.left > 0 && (e = a.resolve(
      o + i.map[s.top * i.width]
    )), l.right < i.width && (t = a.resolve(
      o + i.map[i.width * (l.top + 1) - 1]
    ))) : (l.left > 0 && (t = a.resolve(o + i.map[l.top * i.width])), s.right < i.width && (e = a.resolve(
      o + i.map[i.width * (s.top + 1) - 1]
    ))), new pt(e, t);
  }
  toJSON() {
    return {
      type: "cell",
      anchor: this.$anchorCell.pos,
      head: this.$headCell.pos
    };
  }
  static fromJSON(e, t) {
    return new pt(e.resolve(t.anchor), e.resolve(t.head));
  }
  static create(e, t, r = t) {
    return new pt(e.resolve(t), e.resolve(r));
  }
  getBookmark() {
    return new yI(this.$anchorCell.pos, this.$headCell.pos);
  }
};
K.prototype.visible = !1;
I.jsonID("cell", K);
var yI = class By {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new By(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    const t = e.resolve(this.anchor), r = e.resolve(this.head);
    return t.parent.type.spec.tableRole == "row" && r.parent.type.spec.tableRole == "row" && t.index() < t.parent.childCount && r.index() < r.parent.childCount && qc(t, r) ? new K(t, r) : I.near(r, 1);
  }
};
function bI(n) {
  if (!(n.selection instanceof K))
    return null;
  const e = [];
  return n.selection.forEachCell((t, r) => {
    e.push(
      ke.node(r, r + t.nodeSize, { class: "selectedCell" })
    );
  }), Y.create(n.doc, e);
}
function wI({ $from: n, $to: e }) {
  if (n.pos == e.pos || n.pos < n.pos - 6)
    return !1;
  let t = n.pos, r = e.pos, i = n.depth;
  for (; i >= 0 && !(n.after(i + 1) < n.end(i)); i--, t++)
    ;
  for (let o = e.depth; o >= 0 && !(e.before(o + 1) > e.start(o)); o--, r--)
    ;
  return t == r && /row|table/.test(n.node(i).type.spec.tableRole);
}
function SI({ $from: n, $to: e }) {
  let t, r;
  for (let i = n.depth; i > 0; i--) {
    const o = n.node(i);
    if (o.type.spec.tableRole === "cell" || o.type.spec.tableRole === "header_cell") {
      t = o;
      break;
    }
  }
  for (let i = e.depth; i > 0; i--) {
    const o = e.node(i);
    if (o.type.spec.tableRole === "cell" || o.type.spec.tableRole === "header_cell") {
      r = o;
      break;
    }
  }
  return t !== r && e.parentOffset === 0;
}
function vI(n, e, t) {
  const r = (e || n).selection, i = (e || n).doc;
  let o, s;
  if (r instanceof M && (s = r.node.type.spec.tableRole)) {
    if (s == "cell" || s == "header_cell")
      o = K.create(i, r.from);
    else if (s == "row") {
      const l = i.resolve(r.from + 1);
      o = K.rowSelection(l, l);
    } else if (!t) {
      const l = Q.get(r.node), a = r.from + 1, c = a + l.map[l.width * l.height - 1];
      o = K.create(i, a + 1, c);
    }
  } else r instanceof L && wI(r) ? o = L.create(i, r.from) : r instanceof L && SI(r) && (o = L.create(i, r.$from.start(), r.$from.end()));
  return o && (e || (e = n.tr)).setSelection(o), e;
}
var CI = new Xt("fix-tables");
function zy(n, e, t, r) {
  const i = n.childCount, o = e.childCount;
  e:
    for (let s = 0, l = 0; s < o; s++) {
      const a = e.child(s);
      for (let c = l, f = Math.min(i, s + 3); c < f; c++)
        if (n.child(c) == a) {
          l = c + 1, t += a.nodeSize;
          continue e;
        }
      r(a, t), l < i && n.child(l).sameMarkup(a) ? zy(n.child(l), a, t + 1, r) : a.nodesBetween(0, a.content.size, r, t + 1), t += a.nodeSize;
    }
}
function xI(n, e) {
  let t;
  const r = (i, o) => {
    i.type.spec.tableRole == "table" && (t = kI(n, i, o, t));
  };
  return e ? e.doc != n.doc && zy(e.doc, n.doc, 0, r) : n.doc.descendants(r), t;
}
function kI(n, e, t, r) {
  const i = Q.get(e);
  if (!i.problems)
    return r;
  r || (r = n.tr);
  const o = [];
  for (let a = 0; a < i.height; a++)
    o.push(0);
  for (let a = 0; a < i.problems.length; a++) {
    const c = i.problems[a];
    if (c.type == "collision") {
      const f = e.nodeAt(c.pos);
      if (!f)
        continue;
      const u = f.attrs;
      for (let h = 0; h < u.rowspan; h++)
        o[c.row + h] += c.n;
      r.setNodeMarkup(
        r.mapping.map(t + 1 + c.pos),
        null,
        Sn(u, u.colspan - c.n, c.n)
      );
    } else if (c.type == "missing")
      o[c.row] += c.n;
    else if (c.type == "overlong_rowspan") {
      const f = e.nodeAt(c.pos);
      if (!f)
        continue;
      r.setNodeMarkup(r.mapping.map(t + 1 + c.pos), null, {
        ...f.attrs,
        rowspan: f.attrs.rowspan - c.n
      });
    } else if (c.type == "colwidth mismatch") {
      const f = e.nodeAt(c.pos);
      if (!f)
        continue;
      r.setNodeMarkup(r.mapping.map(t + 1 + c.pos), null, {
        ...f.attrs,
        colwidth: c.colwidth
      });
    }
  }
  let s, l;
  for (let a = 0; a < o.length; a++)
    o[a] && (s == null && (s = a), l = a);
  for (let a = 0, c = t + 1; a < i.height; a++) {
    const f = e.child(a), u = c + f.nodeSize, h = o[a];
    if (h > 0) {
      let d = "cell";
      f.firstChild && (d = f.firstChild.type.spec.tableRole);
      const p = [];
      for (let m = 0; m < h; m++) {
        const y = be(n.schema)[d].createAndFill();
        y && p.push(y);
      }
      const g = (a == 0 || s == a - 1) && l == a ? c + 1 : u - 1;
      r.insert(r.mapping.map(g), p);
    }
    c = u;
  }
  return r.setMeta(CI, { fixTables: !0 });
}
function OI(n) {
  if (!n.size)
    return null;
  let { content: e, openStart: t, openEnd: r } = n;
  for (; e.childCount == 1 && (t > 0 && r > 0 || e.child(0).type.spec.tableRole == "table"); )
    t--, r--, e = e.child(0).content;
  const i = e.child(0), o = i.type.spec.tableRole, s = i.type.schema, l = [];
  if (o == "row")
    for (let a = 0; a < e.childCount; a++) {
      let c = e.child(a).content;
      const f = a ? 0 : Math.max(0, t - 1), u = a < e.childCount - 1 ? 0 : Math.max(0, r - 1);
      (f || u) && (c = Ha(
        be(s).row,
        new v(c, f, u)
      ).content), l.push(c);
    }
  else if (o == "cell" || o == "header_cell")
    l.push(
      t || r ? Ha(
        be(s).row,
        new v(e, t, r)
      ).content : e
    );
  else
    return null;
  return EI(s, l);
}
function EI(n, e) {
  const t = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    for (let s = o.childCount - 1; s >= 0; s--) {
      const { rowspan: l, colspan: a } = o.child(s).attrs;
      for (let c = i; c < i + l; c++)
        t[c] = (t[c] || 0) + a;
    }
  }
  let r = 0;
  for (let i = 0; i < t.length; i++)
    r = Math.max(r, t[i]);
  for (let i = 0; i < t.length; i++)
    if (i >= e.length && e.push(b.empty), t[i] < r) {
      const o = be(n).cell.createAndFill(), s = [];
      for (let l = t[i]; l < r; l++)
        s.push(o);
      e[i] = e[i].append(b.from(s));
    }
  return { height: e.length, width: r, rows: e };
}
function Ha(n, e) {
  const t = n.createAndFill();
  return new hp(t).replace(0, t.content.size, e).doc;
}
function AI({ width: n, height: e, rows: t }, r, i) {
  if (n != r) {
    const o = [], s = [];
    for (let l = 0; l < t.length; l++) {
      const a = t[l], c = [];
      for (let f = o[l] || 0, u = 0; f < r; u++) {
        let h = a.child(u % a.childCount);
        f + h.attrs.colspan > r && (h = h.type.createChecked(
          Sn(
            h.attrs,
            h.attrs.colspan,
            f + h.attrs.colspan - r
          ),
          h.content
        )), c.push(h), f += h.attrs.colspan;
        for (let d = 1; d < h.attrs.rowspan; d++)
          o[l + d] = (o[l + d] || 0) + h.attrs.colspan;
      }
      s.push(b.from(c));
    }
    t = s, n = r;
  }
  if (e != i) {
    const o = [];
    for (let s = 0, l = 0; s < i; s++, l++) {
      const a = [], c = t[l % e];
      for (let f = 0; f < c.childCount; f++) {
        let u = c.child(f);
        s + u.attrs.rowspan > i && (u = u.type.create(
          {
            ...u.attrs,
            rowspan: Math.max(1, i - u.attrs.rowspan)
          },
          u.content
        )), a.push(u);
      }
      o.push(b.from(a));
    }
    t = o, e = i;
  }
  return { width: n, height: e, rows: t };
}
function TI(n, e, t, r, i, o, s) {
  const l = n.doc.type.schema, a = be(l);
  let c, f;
  if (i > e.width)
    for (let u = 0, h = 0; u < e.height; u++) {
      const d = t.child(u);
      h += d.nodeSize;
      const p = [];
      let g;
      d.lastChild == null || d.lastChild.type == a.cell ? g = c || (c = a.cell.createAndFill()) : g = f || (f = a.header_cell.createAndFill());
      for (let m = e.width; m < i; m++)
        p.push(g);
      n.insert(n.mapping.slice(s).map(h - 1 + r), p);
    }
  if (o > e.height) {
    const u = [];
    for (let p = 0, g = (e.height - 1) * e.width; p < Math.max(e.width, i); p++) {
      const m = p >= e.width ? !1 : t.nodeAt(e.map[g + p]).type == a.header_cell;
      u.push(
        m ? f || (f = a.header_cell.createAndFill()) : c || (c = a.cell.createAndFill())
      );
    }
    const h = a.row.create(null, b.from(u)), d = [];
    for (let p = e.height; p < o; p++)
      d.push(h);
    n.insert(n.mapping.slice(s).map(r + t.nodeSize - 2), d);
  }
  return !!(c || f);
}
function Od(n, e, t, r, i, o, s, l) {
  if (s == 0 || s == e.height)
    return !1;
  let a = !1;
  for (let c = i; c < o; c++) {
    const f = s * e.width + c, u = e.map[f];
    if (e.map[f - e.width] == u) {
      a = !0;
      const h = t.nodeAt(u), { top: d, left: p } = e.findCell(u);
      n.setNodeMarkup(n.mapping.slice(l).map(u + r), null, {
        ...h.attrs,
        rowspan: s - d
      }), n.insert(
        n.mapping.slice(l).map(e.positionAt(s, p, t)),
        h.type.createAndFill({
          ...h.attrs,
          rowspan: d + h.attrs.rowspan - s
        })
      ), c += h.attrs.colspan - 1;
    }
  }
  return a;
}
function Ed(n, e, t, r, i, o, s, l) {
  if (s == 0 || s == e.width)
    return !1;
  let a = !1;
  for (let c = i; c < o; c++) {
    const f = c * e.width + s, u = e.map[f];
    if (e.map[f - 1] == u) {
      a = !0;
      const h = t.nodeAt(u), d = e.colCount(u), p = n.mapping.slice(l).map(u + r);
      n.setNodeMarkup(
        p,
        null,
        Sn(
          h.attrs,
          s - d,
          h.attrs.colspan - (s - d)
        )
      ), n.insert(
        p + h.nodeSize,
        h.type.createAndFill(
          Sn(h.attrs, 0, s - d)
        )
      ), c += h.attrs.rowspan - 1;
    }
  }
  return a;
}
function Ad(n, e, t, r, i) {
  let o = t ? n.doc.nodeAt(t - 1) : n.doc;
  if (!o)
    throw new Error("No table found");
  let s = Q.get(o);
  const { top: l, left: a } = r, c = a + i.width, f = l + i.height, u = n.tr;
  let h = 0;
  function d() {
    if (o = t ? u.doc.nodeAt(t - 1) : u.doc, !o)
      throw new Error("No table found");
    s = Q.get(o), h = u.mapping.maps.length;
  }
  TI(u, s, o, t, c, f, h) && d(), Od(u, s, o, t, a, c, l, h) && d(), Od(u, s, o, t, a, c, f, h) && d(), Ed(u, s, o, t, l, f, a, h) && d(), Ed(u, s, o, t, l, f, c, h) && d();
  for (let p = l; p < f; p++) {
    const g = s.positionAt(p, a, o), m = s.positionAt(p, c, o);
    u.replace(
      u.mapping.slice(h).map(g + t),
      u.mapping.slice(h).map(m + t),
      new v(i.rows[p - l], 0, 0)
    );
  }
  d(), u.setSelection(
    new K(
      u.doc.resolve(t + s.positionAt(l, a, o)),
      u.doc.resolve(t + s.positionAt(f - 1, c - 1, o))
    )
  ), e(u);
}
var MI = rc({
  ArrowLeft: Ni("horiz", -1),
  ArrowRight: Ni("horiz", 1),
  ArrowUp: Ni("vert", -1),
  ArrowDown: Ni("vert", 1),
  "Shift-ArrowLeft": Ii("horiz", -1),
  "Shift-ArrowRight": Ii("horiz", 1),
  "Shift-ArrowUp": Ii("vert", -1),
  "Shift-ArrowDown": Ii("vert", 1),
  Backspace: Di,
  "Mod-Backspace": Di,
  Delete: Di,
  "Mod-Delete": Di
});
function Yi(n, e, t) {
  return t.eq(n.selection) ? !1 : (e && e(n.tr.setSelection(t).scrollIntoView()), !0);
}
function Ni(n, e) {
  return (t, r, i) => {
    if (!i)
      return !1;
    const o = t.selection;
    if (o instanceof K)
      return Yi(
        t,
        r,
        I.near(o.$headCell, e)
      );
    if (n != "horiz" && !o.empty)
      return !1;
    const s = Fy(i, n, e);
    if (s == null)
      return !1;
    if (n == "horiz")
      return Yi(
        t,
        r,
        I.near(t.doc.resolve(o.head + e), e)
      );
    {
      const l = t.doc.resolve(s), a = $y(l, n, e);
      let c;
      return a ? c = I.near(a, 1) : e < 0 ? c = I.near(t.doc.resolve(l.before(-1)), -1) : c = I.near(t.doc.resolve(l.after(-1)), 1), Yi(t, r, c);
    }
  };
}
function Ii(n, e) {
  return (t, r, i) => {
    if (!i)
      return !1;
    const o = t.selection;
    let s;
    if (o instanceof K)
      s = o;
    else {
      const a = Fy(i, n, e);
      if (a == null)
        return !1;
      s = new K(t.doc.resolve(a));
    }
    const l = $y(s.$headCell, n, e);
    return l ? Yi(
      t,
      r,
      new K(s.$anchorCell, l)
    ) : !1;
  };
}
function Di(n, e) {
  const t = n.selection;
  if (!(t instanceof K))
    return !1;
  if (e) {
    const r = n.tr, i = be(n.schema).cell.createAndFill().content;
    t.forEachCell((o, s) => {
      o.content.eq(i) || r.replace(
        r.mapping.map(s + 1),
        r.mapping.map(s + o.nodeSize - 1),
        new v(i, 0, 0)
      );
    }), r.docChanged && e(r);
  }
  return !0;
}
function NI(n, e) {
  const t = n.state.doc, r = ur(t.resolve(e));
  return r ? (n.dispatch(n.state.tr.setSelection(new K(r))), !0) : !1;
}
function II(n, e, t) {
  if (!We(n.state))
    return !1;
  let r = OI(t);
  const i = n.state.selection;
  if (i instanceof K) {
    r || (r = {
      width: 1,
      height: 1,
      rows: [
        b.from(
          Ha(be(n.state.schema).cell, t)
        )
      ]
    });
    const o = i.$anchorCell.node(-1), s = i.$anchorCell.start(-1), l = Q.get(o).rectBetween(
      i.$anchorCell.pos - s,
      i.$headCell.pos - s
    );
    return r = AI(r, l.right - l.left, l.bottom - l.top), Ad(n.state, n.dispatch, s, l, r), !0;
  } else if (r) {
    const o = Ns(n.state), s = o.start(-1);
    return Ad(
      n.state,
      n.dispatch,
      s,
      Q.get(o.node(-1)).findCell(o.pos - s),
      r
    ), !0;
  } else
    return !1;
}
function DI(n, e) {
  var t;
  if (e.ctrlKey || e.metaKey)
    return;
  const r = Td(n, e.target);
  let i;
  if (e.shiftKey && n.state.selection instanceof K)
    o(n.state.selection.$anchorCell, e), e.preventDefault();
  else if (e.shiftKey && r && (i = ur(n.state.selection.$anchor)) != null && ((t = Pl(n, e)) == null ? void 0 : t.pos) != i.pos)
    o(i, e), e.preventDefault();
  else if (!r)
    return;
  function o(a, c) {
    let f = Pl(n, c);
    const u = Bt.getState(n.state) == null;
    if (!f || !qc(a, f))
      if (u)
        f = a;
      else
        return;
    const h = new K(a, f);
    if (u || !n.state.selection.eq(h)) {
      const d = n.state.tr.setSelection(h);
      u && d.setMeta(Bt, a.pos), n.dispatch(d);
    }
  }
  function s() {
    n.root.removeEventListener("mouseup", s), n.root.removeEventListener("dragstart", s), n.root.removeEventListener("mousemove", l), Bt.getState(n.state) != null && n.dispatch(n.state.tr.setMeta(Bt, -1));
  }
  function l(a) {
    const c = a, f = Bt.getState(n.state);
    let u;
    if (f != null)
      u = n.state.doc.resolve(f);
    else if (Td(n, c.target) != r && (u = Pl(n, e), !u))
      return s();
    u && o(u, c);
  }
  n.root.addEventListener("mouseup", s), n.root.addEventListener("dragstart", s), n.root.addEventListener("mousemove", l);
}
function Fy(n, e, t) {
  if (!(n.state.selection instanceof L))
    return null;
  const { $head: r } = n.state.selection;
  for (let i = r.depth - 1; i >= 0; i--) {
    const o = r.node(i);
    if ((t < 0 ? r.index(i) : r.indexAfter(i)) != (t < 0 ? 0 : o.childCount))
      return null;
    if (o.type.spec.tableRole == "cell" || o.type.spec.tableRole == "header_cell") {
      const l = r.before(i), a = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
      return n.endOfTextblock(a) ? l : null;
    }
  }
  return null;
}
function Td(n, e) {
  for (; e && e != n.dom; e = e.parentNode)
    if (e.nodeName == "TD" || e.nodeName == "TH")
      return e;
  return null;
}
function Pl(n, e) {
  const t = n.posAtCoords({
    left: e.clientX,
    top: e.clientY
  });
  return t && t ? ur(n.state.doc.resolve(t.pos)) : null;
}
var RI = class {
  constructor(n, e) {
    this.node = n, this.cellMinWidth = e, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.colgroup = this.table.appendChild(document.createElement("colgroup")), Ja(n, this.colgroup, this.table, e), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(n) {
    return n.type != this.node.type ? !1 : (this.node = n, Ja(n, this.colgroup, this.table, this.cellMinWidth), !0);
  }
  ignoreMutation(n) {
    return n.type == "attributes" && (n.target == this.table || this.colgroup.contains(n.target));
  }
};
function Ja(n, e, t, r, i, o) {
  var s;
  let l = 0, a = !0, c = e.firstChild;
  const f = n.firstChild;
  if (f) {
    for (let u = 0, h = 0; u < f.childCount; u++) {
      const { colspan: d, colwidth: p } = f.child(u).attrs;
      for (let g = 0; g < d; g++, h++) {
        const m = i == h ? o : p && p[g], y = m ? m + "px" : "";
        l += m || r, m || (a = !1), c ? (c.style.width != y && (c.style.width = y), c = c.nextSibling) : e.appendChild(document.createElement("col")).style.width = y;
      }
    }
    for (; c; ) {
      const u = c.nextSibling;
      (s = c.parentNode) == null || s.removeChild(c), c = u;
    }
    a ? (t.style.width = l + "px", t.style.minWidth = "") : (t.style.width = "", t.style.minWidth = l + "px");
  }
}
var _e = new Xt(
  "tableColumnResizing"
);
function UD({
  handleWidth: n = 5,
  cellMinWidth: e = 25,
  View: t = RI,
  lastColumnResizable: r = !0
} = {}) {
  const i = new rr({
    key: _e,
    state: {
      init(o, s) {
        var l, a;
        const c = (a = (l = i.spec) == null ? void 0 : l.props) == null ? void 0 : a.nodeViews, f = be(s.schema).table.name;
        return t && c && (c[f] = (u, h) => new t(u, e, h)), new _I(-1, !1);
      },
      apply(o, s) {
        return s.apply(o);
      }
    },
    props: {
      attributes: (o) => {
        const s = _e.getState(o);
        return s && s.activeHandle > -1 ? { class: "resize-cursor" } : {};
      },
      handleDOMEvents: {
        mousemove: (o, s) => {
          PI(
            o,
            s,
            n,
            e,
            r
          );
        },
        mouseleave: (o) => {
          $I(o);
        },
        mousedown: (o, s) => {
          LI(o, s, e);
        }
      },
      decorations: (o) => {
        const s = _e.getState(o);
        if (s && s.activeHandle > -1)
          return WI(o, s.activeHandle);
      },
      nodeViews: {}
    }
  });
  return i;
}
var _I = class Xi {
  constructor(e, t) {
    this.activeHandle = e, this.dragging = t;
  }
  apply(e) {
    const t = this, r = e.getMeta(_e);
    if (r && r.setHandle != null)
      return new Xi(r.setHandle, !1);
    if (r && r.setDragging !== void 0)
      return new Xi(t.activeHandle, r.setDragging);
    if (t.activeHandle > -1 && e.docChanged) {
      let i = e.mapping.map(t.activeHandle, -1);
      return Ua(e.doc.resolve(i)) || (i = -1), new Xi(i, t.dragging);
    }
    return t;
  }
};
function PI(n, e, t, r, i) {
  const o = _e.getState(n.state);
  if (o && !o.dragging) {
    const s = zI(e.target);
    let l = -1;
    if (s) {
      const { left: a, right: c } = s.getBoundingClientRect();
      e.clientX - a <= t ? l = Md(n, e, "left", t) : c - e.clientX <= t && (l = Md(n, e, "right", t));
    }
    if (l != o.activeHandle) {
      if (!i && l !== -1) {
        const a = n.state.doc.resolve(l), c = a.node(-1), f = Q.get(c), u = a.start(-1);
        if (f.colCount(a.pos - u) + a.nodeAfter.attrs.colspan - 1 == f.width - 1)
          return;
      }
      jy(n, l);
    }
  }
}
function $I(n) {
  const e = _e.getState(n.state);
  e && e.activeHandle > -1 && !e.dragging && jy(n, -1);
}
function LI(n, e, t) {
  var r;
  const i = (r = n.dom.ownerDocument.defaultView) != null ? r : window, o = _e.getState(n.state);
  if (!o || o.activeHandle == -1 || o.dragging)
    return !1;
  const s = n.state.doc.nodeAt(o.activeHandle), l = BI(n, o.activeHandle, s.attrs);
  n.dispatch(
    n.state.tr.setMeta(_e, {
      setDragging: { startX: e.clientX, startWidth: l }
    })
  );
  function a(f) {
    i.removeEventListener("mouseup", a), i.removeEventListener("mousemove", c);
    const u = _e.getState(n.state);
    u != null && u.dragging && (FI(
      n,
      u.activeHandle,
      Nd(u.dragging, f, t)
    ), n.dispatch(
      n.state.tr.setMeta(_e, { setDragging: null })
    ));
  }
  function c(f) {
    if (!f.which)
      return a(f);
    const u = _e.getState(n.state);
    if (u && u.dragging) {
      const h = Nd(u.dragging, f, t);
      jI(n, u.activeHandle, h, t);
    }
  }
  return i.addEventListener("mouseup", a), i.addEventListener("mousemove", c), e.preventDefault(), !0;
}
function BI(n, e, { colspan: t, colwidth: r }) {
  const i = r && r[r.length - 1];
  if (i)
    return i;
  const o = n.domAtPos(e);
  let l = o.node.childNodes[o.offset].offsetWidth, a = t;
  if (r)
    for (let c = 0; c < t; c++)
      r[c] && (l -= r[c], a--);
  return l / a;
}
function zI(n) {
  for (; n && n.nodeName != "TD" && n.nodeName != "TH"; )
    n = n.classList && n.classList.contains("ProseMirror") ? null : n.parentNode;
  return n;
}
function Md(n, e, t, r) {
  const i = t == "right" ? -r : r, o = n.posAtCoords({
    left: e.clientX + i,
    top: e.clientY
  });
  if (!o)
    return -1;
  const { pos: s } = o, l = ur(n.state.doc.resolve(s));
  if (!l)
    return -1;
  if (t == "right")
    return l.pos;
  const a = Q.get(l.node(-1)), c = l.start(-1), f = a.map.indexOf(l.pos - c);
  return f % a.width == 0 ? -1 : c + a.map[f - 1];
}
function Nd(n, e, t) {
  const r = e.clientX - n.startX;
  return Math.max(t, n.startWidth + r);
}
function jy(n, e) {
  n.dispatch(
    n.state.tr.setMeta(_e, { setHandle: e })
  );
}
function FI(n, e, t) {
  const r = n.state.doc.resolve(e), i = r.node(-1), o = Q.get(i), s = r.start(-1), l = o.colCount(r.pos - s) + r.nodeAfter.attrs.colspan - 1, a = n.state.tr;
  for (let c = 0; c < o.height; c++) {
    const f = c * o.width + l;
    if (c && o.map[f] == o.map[f - o.width])
      continue;
    const u = o.map[f], h = i.nodeAt(u).attrs, d = h.colspan == 1 ? 0 : l - o.colCount(u);
    if (h.colwidth && h.colwidth[d] == t)
      continue;
    const p = h.colwidth ? h.colwidth.slice() : VI(h.colspan);
    p[d] = t, a.setNodeMarkup(s + u, null, { ...h, colwidth: p });
  }
  a.docChanged && n.dispatch(a);
}
function jI(n, e, t, r) {
  const i = n.state.doc.resolve(e), o = i.node(-1), s = i.start(-1), l = Q.get(o).colCount(i.pos - s) + i.nodeAfter.attrs.colspan - 1;
  let a = n.domAtPos(i.start(-1)).node;
  for (; a && a.nodeName != "TABLE"; )
    a = a.parentNode;
  a && Ja(
    o,
    a.firstChild,
    a,
    r,
    l,
    t
  );
}
function VI(n) {
  return Array(n).fill(0);
}
function WI(n, e) {
  const t = [], r = n.doc.resolve(e), i = r.node(-1);
  if (!i)
    return Y.empty;
  const o = Q.get(i), s = r.start(-1), l = o.colCount(r.pos - s) + r.nodeAfter.attrs.colspan - 1;
  for (let a = 0; a < o.height; a++) {
    const c = l + a * o.width;
    if ((l == o.width - 1 || o.map[c] != o.map[c + 1]) && (a == 0 || o.map[c] != o.map[c - o.width])) {
      const f = o.map[c], u = s + f + i.nodeAt(f).nodeSize - 1, h = document.createElement("div");
      h.className = "column-resize-handle", t.push(ke.widget(u, h));
    }
  }
  return Y.create(n.doc, t);
}
function lt(n) {
  const e = n.selection, t = Ns(n), r = t.node(-1), i = t.start(-1), o = Q.get(r);
  return { ...e instanceof K ? o.rectBetween(
    e.$anchorCell.pos - i,
    e.$headCell.pos - i
  ) : o.findCell(t.pos - i), tableStart: i, map: o, table: r };
}
function Vy(n, { map: e, tableStart: t, table: r }, i) {
  let o = i > 0 ? -1 : 0;
  mI(e, r, i + o) && (o = i == 0 || i == e.width ? null : 0);
  for (let s = 0; s < e.height; s++) {
    const l = s * e.width + i;
    if (i > 0 && i < e.width && e.map[l - 1] == e.map[l]) {
      const a = e.map[l], c = r.nodeAt(a);
      n.setNodeMarkup(
        n.mapping.map(t + a),
        null,
        Ly(c.attrs, i - e.colCount(a))
      ), s += c.attrs.rowspan - 1;
    } else {
      const a = o == null ? be(r.type.schema).cell : r.nodeAt(e.map[l + o]).type, c = e.positionAt(s, i, r);
      n.insert(n.mapping.map(t + c), a.createAndFill());
    }
  }
  return n;
}
function HD(n, e) {
  if (!We(n))
    return !1;
  if (e) {
    const t = lt(n);
    e(Vy(n.tr, t, t.left));
  }
  return !0;
}
function JD(n, e) {
  if (!We(n))
    return !1;
  if (e) {
    const t = lt(n);
    e(Vy(n.tr, t, t.right));
  }
  return !0;
}
function UI(n, { map: e, table: t, tableStart: r }, i) {
  const o = n.mapping.maps.length;
  for (let s = 0; s < e.height; ) {
    const l = s * e.width + i, a = e.map[l], c = t.nodeAt(a), f = c.attrs;
    if (i > 0 && e.map[l - 1] == a || i < e.width - 1 && e.map[l + 1] == a)
      n.setNodeMarkup(
        n.mapping.slice(o).map(r + a),
        null,
        Sn(f, i - e.colCount(a))
      );
    else {
      const u = n.mapping.slice(o).map(r + a);
      n.delete(u, u + c.nodeSize);
    }
    s += f.rowspan;
  }
}
function KD(n, e) {
  if (!We(n))
    return !1;
  if (e) {
    const t = lt(n), r = n.tr;
    if (t.left == 0 && t.right == t.map.width)
      return !1;
    for (let i = t.right - 1; UI(r, t, i), i != t.left; i--) {
      const o = t.tableStart ? r.doc.nodeAt(t.tableStart - 1) : r.doc;
      if (!o)
        throw RangeError("No table found");
      t.table = o, t.map = Q.get(o);
    }
    e(r);
  }
  return !0;
}
function HI(n, e, t) {
  var r;
  const i = be(e.type.schema).header_cell;
  for (let o = 0; o < n.width; o++)
    if (((r = e.nodeAt(n.map[o + t * n.width])) == null ? void 0 : r.type) != i)
      return !1;
  return !0;
}
function Wy(n, { map: e, tableStart: t, table: r }, i) {
  var o;
  let s = t;
  for (let c = 0; c < i; c++)
    s += r.child(c).nodeSize;
  const l = [];
  let a = i > 0 ? -1 : 0;
  HI(e, r, i + a) && (a = i == 0 || i == e.height ? null : 0);
  for (let c = 0, f = e.width * i; c < e.width; c++, f++)
    if (i > 0 && i < e.height && e.map[f] == e.map[f - e.width]) {
      const u = e.map[f], h = r.nodeAt(u).attrs;
      n.setNodeMarkup(t + u, null, {
        ...h,
        rowspan: h.rowspan + 1
      }), c += h.colspan - 1;
    } else {
      const u = a == null ? be(r.type.schema).cell : (o = r.nodeAt(e.map[f + a * e.width])) == null ? void 0 : o.type, h = u == null ? void 0 : u.createAndFill();
      h && l.push(h);
    }
  return n.insert(s, be(r.type.schema).row.create(null, l)), n;
}
function GD(n, e) {
  if (!We(n))
    return !1;
  if (e) {
    const t = lt(n);
    e(Wy(n.tr, t, t.top));
  }
  return !0;
}
function qD(n, e) {
  if (!We(n))
    return !1;
  if (e) {
    const t = lt(n);
    e(Wy(n.tr, t, t.bottom));
  }
  return !0;
}
function JI(n, { map: e, table: t, tableStart: r }, i) {
  let o = 0;
  for (let c = 0; c < i; c++)
    o += t.child(c).nodeSize;
  const s = o + t.child(i).nodeSize, l = n.mapping.maps.length;
  n.delete(o + r, s + r);
  const a = /* @__PURE__ */ new Set();
  for (let c = 0, f = i * e.width; c < e.width; c++, f++) {
    const u = e.map[f];
    if (!a.has(u)) {
      if (a.add(u), i > 0 && u == e.map[f - e.width]) {
        const h = t.nodeAt(u).attrs;
        n.setNodeMarkup(n.mapping.slice(l).map(u + r), null, {
          ...h,
          rowspan: h.rowspan - 1
        }), c += h.colspan - 1;
      } else if (i < e.height && u == e.map[f + e.width]) {
        const h = t.nodeAt(u), d = h.attrs, p = h.type.create(
          { ...d, rowspan: h.attrs.rowspan - 1 },
          h.content
        ), g = e.positionAt(i + 1, c, t);
        n.insert(n.mapping.slice(l).map(r + g), p), c += d.colspan - 1;
      }
    }
  }
}
function YD(n, e) {
  if (!We(n))
    return !1;
  if (e) {
    const t = lt(n), r = n.tr;
    if (t.top == 0 && t.bottom == t.map.height)
      return !1;
    for (let i = t.bottom - 1; JI(r, t, i), i != t.top; i--) {
      const o = t.tableStart ? r.doc.nodeAt(t.tableStart - 1) : r.doc;
      if (!o)
        throw RangeError("No table found");
      t.table = o, t.map = Q.get(t.table);
    }
    e(r);
  }
  return !0;
}
function Id(n) {
  const e = n.content;
  return e.childCount == 1 && e.child(0).isTextblock && e.child(0).childCount == 0;
}
function KI({ width: n, height: e, map: t }, r) {
  let i = r.top * n + r.left, o = i, s = (r.bottom - 1) * n + r.left, l = i + (r.right - r.left - 1);
  for (let a = r.top; a < r.bottom; a++) {
    if (r.left > 0 && t[o] == t[o - 1] || r.right < n && t[l] == t[l + 1])
      return !0;
    o += n, l += n;
  }
  for (let a = r.left; a < r.right; a++) {
    if (r.top > 0 && t[i] == t[i - n] || r.bottom < e && t[s] == t[s + n])
      return !0;
    i++, s++;
  }
  return !1;
}
function XD(n, e) {
  const t = n.selection;
  if (!(t instanceof K) || t.$anchorCell.pos == t.$headCell.pos)
    return !1;
  const r = lt(n), { map: i } = r;
  if (KI(i, r))
    return !1;
  if (e) {
    const o = n.tr, s = {};
    let l = b.empty, a, c;
    for (let f = r.top; f < r.bottom; f++)
      for (let u = r.left; u < r.right; u++) {
        const h = i.map[f * i.width + u], d = r.table.nodeAt(h);
        if (!(s[h] || !d))
          if (s[h] = !0, a == null)
            a = h, c = d;
          else {
            Id(d) || (l = l.append(d.content));
            const p = o.mapping.map(h + r.tableStart);
            o.delete(p, p + d.nodeSize);
          }
      }
    if (a == null || c == null)
      return !0;
    if (o.setNodeMarkup(a + r.tableStart, null, {
      ...Ly(
        c.attrs,
        c.attrs.colspan,
        r.right - r.left - c.attrs.colspan
      ),
      rowspan: r.bottom - r.top
    }), l.size) {
      const f = a + 1 + c.content.size, u = Id(c) ? a + 1 : f;
      o.replaceWith(u + r.tableStart, f + r.tableStart, l);
    }
    o.setSelection(
      new K(o.doc.resolve(a + r.tableStart))
    ), e(o);
  }
  return !0;
}
function QD(n, e) {
  const t = be(n.schema);
  return GI(({ node: r }) => t[r.type.spec.tableRole])(n, e);
}
function GI(n) {
  return (e, t) => {
    var r;
    const i = e.selection;
    let o, s;
    if (i instanceof K) {
      if (i.$anchorCell.pos != i.$headCell.pos)
        return !1;
      o = i.$anchorCell.nodeAfter, s = i.$anchorCell.pos;
    } else {
      if (o = dI(i.$from), !o)
        return !1;
      s = (r = ur(i.$from)) == null ? void 0 : r.pos;
    }
    if (o == null || s == null || o.attrs.colspan == 1 && o.attrs.rowspan == 1)
      return !1;
    if (t) {
      let l = o.attrs;
      const a = [], c = l.colwidth;
      l.rowspan > 1 && (l = { ...l, rowspan: 1 }), l.colspan > 1 && (l = { ...l, colspan: 1 });
      const f = lt(e), u = e.tr;
      for (let d = 0; d < f.right - f.left; d++)
        a.push(
          c ? {
            ...l,
            colwidth: c && c[d] ? [c[d]] : null
          } : l
        );
      let h;
      for (let d = f.top; d < f.bottom; d++) {
        let p = f.map.positionAt(d, f.left, f.table);
        d == f.top && (p += o.nodeSize);
        for (let g = f.left, m = 0; g < f.right; g++, m++)
          g == f.left && d == f.top || u.insert(
            h = u.mapping.map(p + f.tableStart, 1),
            n({ node: o, row: d, col: g }).createAndFill(a[m])
          );
      }
      u.setNodeMarkup(
        s,
        n({ node: o, row: f.top, col: f.left }),
        a[0]
      ), i instanceof K && u.setSelection(
        new K(
          u.doc.resolve(i.$anchorCell.pos),
          h ? u.doc.resolve(h) : void 0
        )
      ), t(u);
    }
    return !0;
  };
}
function ZD(n, e) {
  return function(t, r) {
    if (!We(t))
      return !1;
    const i = Ns(t);
    if (i.nodeAfter.attrs[n] === e)
      return !1;
    if (r) {
      const o = t.tr;
      t.selection instanceof K ? t.selection.forEachCell((s, l) => {
        s.attrs[n] !== e && o.setNodeMarkup(l, null, {
          ...s.attrs,
          [n]: e
        });
      }) : o.setNodeMarkup(i.pos, null, {
        ...i.nodeAfter.attrs,
        [n]: e
      }), r(o);
    }
    return !0;
  };
}
function qI(n) {
  return function(e, t) {
    if (!We(e))
      return !1;
    if (t) {
      const r = be(e.schema), i = lt(e), o = e.tr, s = i.map.cellsInRect(
        n == "column" ? {
          left: i.left,
          top: 0,
          right: i.right,
          bottom: i.map.height
        } : n == "row" ? {
          left: 0,
          top: i.top,
          right: i.map.width,
          bottom: i.bottom
        } : i
      ), l = s.map((a) => i.table.nodeAt(a));
      for (let a = 0; a < s.length; a++)
        l[a].type == r.header_cell && o.setNodeMarkup(
          i.tableStart + s[a],
          r.cell,
          l[a].attrs
        );
      if (o.steps.length == 0)
        for (let a = 0; a < s.length; a++)
          o.setNodeMarkup(
            i.tableStart + s[a],
            r.header_cell,
            l[a].attrs
          );
      t(o);
    }
    return !0;
  };
}
function Dd(n, e, t) {
  const r = e.map.cellsInRect({
    left: 0,
    top: 0,
    right: n == "row" ? e.map.width : 1,
    bottom: n == "column" ? e.map.height : 1
  });
  for (let i = 0; i < r.length; i++) {
    const o = e.table.nodeAt(r[i]);
    if (o && o.type !== t.header_cell)
      return !1;
  }
  return !0;
}
function Yc(n, e) {
  return e = e || { useDeprecatedLogic: !1 }, e.useDeprecatedLogic ? qI(n) : function(t, r) {
    if (!We(t))
      return !1;
    if (r) {
      const i = be(t.schema), o = lt(t), s = t.tr, l = Dd("row", o, i), a = Dd(
        "column",
        o,
        i
      ), f = (n === "column" ? l : n === "row" ? a : !1) ? 1 : 0, u = n == "column" ? {
        left: 0,
        top: f,
        right: 1,
        bottom: o.map.height
      } : n == "row" ? {
        left: f,
        top: 0,
        right: o.map.width,
        bottom: 1
      } : o, h = n == "column" ? a ? i.cell : i.header_cell : n == "row" ? l ? i.cell : i.header_cell : i.cell;
      o.map.cellsInRect(u).forEach((d) => {
        const p = d + o.tableStart, g = s.doc.nodeAt(p);
        g && s.setNodeMarkup(p, h, g.attrs);
      }), r(s);
    }
    return !0;
  };
}
Yc("row", {
  useDeprecatedLogic: !0
});
Yc("column", {
  useDeprecatedLogic: !0
});
var eR = Yc("cell", {
  useDeprecatedLogic: !0
});
function YI(n, e) {
  if (e < 0) {
    const t = n.nodeBefore;
    if (t)
      return n.pos - t.nodeSize;
    for (let r = n.index(-1) - 1, i = n.before(); r >= 0; r--) {
      const o = n.node(-1).child(r), s = o.lastChild;
      if (s)
        return i - 1 - s.nodeSize;
      i -= o.nodeSize;
    }
  } else {
    if (n.index() < n.parent.childCount - 1)
      return n.pos + n.nodeAfter.nodeSize;
    const t = n.node(-1);
    for (let r = n.indexAfter(-1), i = n.after(); r < t.childCount; r++) {
      const o = t.child(r);
      if (o.childCount)
        return i + 1;
      i += o.nodeSize;
    }
  }
  return null;
}
function tR(n) {
  return function(e, t) {
    if (!We(e))
      return !1;
    const r = YI(Ns(e), n);
    if (r == null)
      return !1;
    if (t) {
      const i = e.doc.resolve(r);
      t(
        e.tr.setSelection(L.between(i, gI(i))).scrollIntoView()
      );
    }
    return !0;
  };
}
function nR(n, e) {
  const t = n.selection.$anchor;
  for (let r = t.depth; r > 0; r--)
    if (t.node(r).type.spec.tableRole == "table")
      return e && e(
        n.tr.delete(t.before(r), t.after(r)).scrollIntoView()
      ), !0;
  return !1;
}
function rR({
  allowTableNodeSelection: n = !1
} = {}) {
  return new rr({
    key: Bt,
    // This piece of state is used to remember when a mouse-drag
    // cell-selection is happening, so that it can continue even as
    // transactions (which might move its anchor cell) come in.
    state: {
      init() {
        return null;
      },
      apply(e, t) {
        const r = e.getMeta(Bt);
        if (r != null)
          return r == -1 ? null : r;
        if (t == null || !e.docChanged)
          return t;
        const { deleted: i, pos: o } = e.mapping.mapResult(t);
        return i ? null : o;
      }
    },
    props: {
      decorations: bI,
      handleDOMEvents: {
        mousedown: DI
      },
      createSelectionBetween(e) {
        return Bt.getState(e.state) != null ? e.state.selection : null;
      },
      handleTripleClick: NI,
      handleKeyDown: MI,
      handlePaste: II
    },
    appendTransaction(e, t, r) {
      return vI(
        r,
        xI(r, t),
        n
      );
    }
  });
}
export {
  jD as $,
  ip as A,
  v as B,
  SD as C,
  CD as D,
  tD as E,
  b as F,
  xr as G,
  nD as H,
  ZI as I,
  Gd as J,
  he as K,
  nr as L,
  dp as M,
  M as N,
  $D as O,
  rr as P,
  LD as Q,
  ce as R,
  I as S,
  hp as T,
  to as U,
  zD as V,
  FD as W,
  HN as X,
  BD as Y,
  eI as Z,
  tI as _,
  Xt as a,
  VD as a0,
  Y as a1,
  ke as a2,
  WD as a3,
  HD as a4,
  JD as a5,
  KD as a6,
  GD as a7,
  qD as a8,
  YD as a9,
  nR as aa,
  XD as ab,
  QD as ac,
  Yc as ad,
  eR as ae,
  ZD as af,
  tR as ag,
  xI as ah,
  K as ai,
  UD as aj,
  rR as ak,
  ED as al,
  OD as am,
  AD as an,
  TD as ao,
  MD as ap,
  ND as aq,
  DD as ar,
  _D as as,
  Fe as at,
  PD as au,
  uT as av,
  Xe as aw,
  RD as ax,
  ID as ay,
  gD as b,
  si as c,
  L as d,
  rD as e,
  rp as f,
  pD as g,
  uD as h,
  iD as i,
  fD as j,
  aD as k,
  oi as l,
  sp as m,
  oD as n,
  sD as o,
  hD as p,
  mD as q,
  xD as r,
  dD as s,
  lD as t,
  cD as u,
  yD as v,
  wD as w,
  bD as x,
  vD as y,
  kD as z
};
