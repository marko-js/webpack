!function(t){var e={};function r(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(s,n,function(e){return t[e]}.bind(null,n));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=5)}([function(t,e){t.exports=require("marko/dist/runtime/html")},function(t,e){t.exports=require("marko/dist/runtime/components/renderer")},function(t,e){t.exports=require("marko/dist/runtime/helpers/render-tag")},function(t,e){t.exports=require("marko/dist/core-tags/components/init-components-tag.js")},function(t,e){t.exports=require("marko/dist/core-tags/core/await/reorderer-renderer.js")},function(t,e,r){const s=r(6),n=r(7);s.createServer((t,e)=>{n.render({},e)}).listen(0)},function(t,e){t.exports=require("http")},function(t,e,r){"use strict";r.r(e);var s=r(1),n=r.n(s),i=r(0);const o=Object(i.t)();var u=o;o._=n()((function(t,e,r,s,n){e.w("<h1>Hello World</h1>")}),{t:"7Fk+kAfP",i:!0},{});var c={getAssets(t){return this.build[t]},build:{"test_7Fk-":{js:["test_7Fk-.js"]}}},f=r(2),_=r.n(f),l=r(3),a=r.n(l),d=r(4),p=r.n(d);const h=Object(i.t)();e.default=h;function b(){const t=this.___assets;if(this.___renderAssets=this.___assets=void 0,this.flush=this.___flush,this.end=this.___end,t){r.p&&this.script("$mwp="+JSON.stringify(r.p));const e=this.global.cspNonce,s=e?" nonce="+JSON.stringify(e):"",n=this.global.___writtenAssets||(this.global.___writtenAssets=new Set);let i="",o="";for(const e of t){if(e.js)for(const t of e.js)n.has(t)||(n.add(t),i+=`<script src=${JSON.stringify(r.p+t)}${s} async><\/script>`);if(e.css)for(const t of e.css)n.has(t)||(n.add(t),o+=`<link rel="stylesheet" href=${JSON.stringify(r.p+t)}>`)}this.write(i+o)}}function g(){this.___renderAssets(),this.flush()}function m(t,e,r){this.___renderAssets(),this.end(t,e,r)}h._=n()((function(t,e,r,s,n){const i=e.___assets,o=c.getAssets("test_7Fk-",e.global.buildName);i?i.push(o):(e.___assets=[o],e.___flush=e.flush,e.___end=e.end,e.___renderAssets=b,e.flush=g,e.end=m),_()(u,t,e,r,"0"),_()(a.a,{},e,r,"1"),_()(p.a,{},e,r,"2")}),{t:"7Fk+kAfP",i:!0},{})}]);