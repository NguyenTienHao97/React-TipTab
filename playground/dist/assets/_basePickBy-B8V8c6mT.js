import{e as x,c as b,g as m,k as P,h as p,j as w,l as c,m as A,n as I,t as N,o as E}from"./_baseUniq-Dp1xiZGv.js";import{aO as g,aq as F,aP as M,aQ as T,aR as _,aS as l,aT as $,aU as B,aV as S,aW as y}from"./index-DvK4HWHU.js";var R=/\s/;function q(n){for(var r=n.length;r--&&R.test(n.charAt(r)););return r}var G=/^\s+/;function H(n){return n&&n.slice(0,q(n)+1).replace(G,"")}var o=NaN,L=/^[-+]0x[0-9a-f]+$/i,W=/^0b[01]+$/i,z=/^0o[0-7]+$/i,C=parseInt;function K(n){if(typeof n=="number")return n;if(x(n))return o;if(g(n)){var r=typeof n.valueOf=="function"?n.valueOf():n;n=g(r)?r+"":r}if(typeof n!="string")return n===0?n:+n;n=H(n);var t=W.test(n);return t||z.test(n)?C(n.slice(2),t?2:8):L.test(n)?o:+n}var v=1/0,Q=17976931348623157e292;function U(n){if(!n)return n===0?n:0;if(n=K(n),n===v||n===-v){var r=n<0?-1:1;return r*Q}return n===n?n:0}function X(n){var r=U(n),t=r%1;return r===r?t?r-t:r:0}function fn(n){var r=n==null?0:n.length;return r?b(n):[]}var O=Object.prototype,Y=O.hasOwnProperty,dn=F(function(n,r){n=Object(n);var t=-1,i=r.length,a=i>2?r[2]:void 0;for(a&&M(r[0],r[1],a)&&(i=1);++t<i;)for(var f=r[t],e=T(f),s=-1,d=e.length;++s<d;){var u=e[s],h=n[u];(h===void 0||_(h,O[u])&&!Y.call(n,u))&&(n[u]=f[u])}return n});function un(n){var r=n==null?0:n.length;return r?n[r-1]:void 0}function D(n){return function(r,t,i){var a=Object(r);if(!l(r)){var f=m(t);r=P(r),t=function(s){return f(a[s],s,a)}}var e=n(r,t,i);return e>-1?a[f?r[e]:e]:void 0}}var J=Math.max;function Z(n,r,t){var i=n==null?0:n.length;if(!i)return-1;var a=t==null?0:X(t);return a<0&&(a=J(i+a,0)),p(n,m(r),a)}var hn=D(Z);function V(n,r){var t=-1,i=l(n)?Array(n.length):[];return w(n,function(a,f,e){i[++t]=r(a,f,e)}),i}function gn(n,r){var t=$(n)?c:V;return t(n,m(r))}var j=Object.prototype,k=j.hasOwnProperty;function nn(n,r){return n!=null&&k.call(n,r)}function mn(n,r){return n!=null&&A(n,r,nn)}function rn(n,r){return n<r}function tn(n,r,t){for(var i=-1,a=n.length;++i<a;){var f=n[i],e=r(f);if(e!=null&&(s===void 0?e===e&&!x(e):t(e,s)))var s=e,d=f}return d}function on(n){return n&&n.length?tn(n,B,rn):void 0}function an(n,r,t,i){if(!g(n))return n;r=I(r,n);for(var a=-1,f=r.length,e=f-1,s=n;s!=null&&++a<f;){var d=N(r[a]),u=t;if(d==="__proto__"||d==="constructor"||d==="prototype")return n;if(a!=e){var h=s[d];u=void 0,u===void 0&&(u=g(h)?h:S(r[a+1])?[]:{})}y(s,d,u),s=s[d]}return n}function vn(n,r,t){for(var i=-1,a=r.length,f={};++i<a;){var e=r[i],s=E(n,e);t(s,e)&&an(f,I(e,n),s)}return f}export{rn as a,tn as b,V as c,vn as d,on as e,fn as f,hn as g,mn as h,dn as i,X as j,un as l,gn as m,U as t};
