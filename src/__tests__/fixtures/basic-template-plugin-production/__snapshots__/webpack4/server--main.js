!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("marko/dist/runtime/helpers/render-tag")},function(e,t){e.exports=require("marko/dist/runtime/html")},function(e,t){e.exports=require("marko/dist/runtime/components/renderer")},function(e,t){e.exports=require("marko/dist/core-tags/core/__flush_here_and_after__.js")},function(e,t){e.exports=require("marko/dist/core-tags/components/init-components-tag.js")},function(e,t){e.exports=require("marko/dist/core-tags/core/await/reorderer-renderer.js")},function(e,t,r){const n=r(7),o=r(8);n.createServer((e,t)=>{o.render({},t)}).listen(0)},function(e,t){e.exports=require("http")},function(e,t,r){"use strict";r.r(t);var n=r(1),o=r(2),s=r.n(o);const i=Object(n.t)();var c=i;i._=s()((function(e,t,r,n,o){t.w("<h1>Hello World</h1>")}),{t:"7Fk+kAfP",i:!0},{});var u={getAssets(e){return this.build[e]},build:{"test_7Fk-":{js:["test_7Fk-.js"]}}},f=r(3),l=r.n(f),a=r(0),_=r.n(a),d=r(4),p=r.n(d),b=r(5),g=r.n(b);const m=Object(n.t)();t.default=m;const y="file:"===new URL(r.p,"file:").protocol?"":" crossorigin";function j(e){const t=e.global,n=t.___entries;if(t.___entries=void 0,n){r.p&&e.script("$mwp="+JSON.stringify(r.p));const o=t.buildName,s=t.cspNonce,i=s?" nonce="+JSON.stringify(s):"",c=t.___writtenAssets||(t.___writtenAssets=new Set);let f="",l="";for(const e of n){const t=u.getAssets(e,o);if(t.js)for(const e of t.js)c.has(e)||(c.add(e),f+=`<script src=${JSON.stringify(r.p+e)}${i+y} async><\/script>`);if(t.css)for(const e of t.css)c.has(e)||(c.add(e),l+=`<link rel="stylesheet" href=${JSON.stringify(r.p+e)}>`)}e.write(f+l)}}m._=s()((function(e,t,r,n,o){t.global.___renderAssets=j,(t.global.___entries||(t.global.___entries=[])).push("test_7Fk-"),_()(l.a,{renderBody:e=>{const t=e;t.global.___renderAssets&&t.global.___renderAssets(t)}},t,r,"0"),_()(c,e,t,r,"1"),_()(p.a,{},t,r,"2"),_()(g.a,{},t,r,"3")}),{t:"l/bMNE+B",i:!0},{})}]);