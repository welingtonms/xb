"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[6132],{"../../node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function t(t){return t.split("-")[1]}function e(t){return"y"===t?"height":"width"}function n(t){return t.split("-")[0]}function o(t){return["top","bottom"].includes(n(t))?"x":"y"}function i(i,r,a){let{reference:l,floating:s}=i;const c=l.x+l.width/2-s.width/2,f=l.y+l.height/2-s.height/2,m=o(r),u=e(m),g=l[u]/2-s[u]/2,d="x"===m;let p;switch(n(r)){case"top":p={x:c,y:l.y-s.height};break;case"bottom":p={x:c,y:l.y+l.height};break;case"right":p={x:l.x+l.width,y:f};break;case"left":p={x:l.x-s.width,y:f};break;default:p={x:l.x,y:l.y}}switch(t(r)){case"start":p[m]-=g*(a&&d?-1:1);break;case"end":p[m]+=g*(a&&d?-1:1)}return p}__webpack_require__.d(__webpack_exports__,{JB:()=>l,RR:()=>b,cv:()=>D,oo:()=>r,uY:()=>k});const r=async(t,e,n)=>{const{placement:o="bottom",strategy:r="absolute",middleware:a=[],platform:l}=n,s=a.filter(Boolean),c=await(null==l.isRTL?void 0:l.isRTL(e));let f=await l.getElementRects({reference:t,floating:e,strategy:r}),{x:m,y:u}=i(f,o,c),g=o,d={},p=0;for(let n=0;n<s.length;n++){const{name:a,fn:h}=s[n],{x:y,y:x,data:w,reset:v}=await h({x:m,y:u,initialPlacement:o,placement:g,strategy:r,middlewareData:d,rects:f,platform:l,elements:{reference:t,floating:e}});m=null!=y?y:m,u=null!=x?x:u,d={...d,[a]:{...d[a],...w}},v&&p<=50&&(p++,"object"==typeof v&&(v.placement&&(g=v.placement),v.rects&&(f=!0===v.rects?await l.getElementRects({reference:t,floating:e,strategy:r}):v.rects),({x:m,y:u}=i(f,g,c))),n=-1)}return{x:m,y:u,placement:g,strategy:r,middlewareData:d}};function a(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function l(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function s(t,e){var n;void 0===e&&(e={});const{x:o,y:i,platform:r,rects:s,elements:c,strategy:f}=t,{boundary:m="clippingAncestors",rootBoundary:u="viewport",elementContext:g="floating",altBoundary:d=!1,padding:p=0}=e,h=a(p),y=c[d?"floating"===g?"reference":"floating":g],x=l(await r.getClippingRect({element:null==(n=await(null==r.isElement?void 0:r.isElement(y)))||n?y:y.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(c.floating)),boundary:m,rootBoundary:u,strategy:f})),w="floating"===g?{...s.floating,x:o,y:i}:s.reference,v=await(null==r.getOffsetParent?void 0:r.getOffsetParent(c.floating)),b=await(null==r.isElement?void 0:r.isElement(v))&&await(null==r.getScale?void 0:r.getScale(v))||{x:1,y:1},A=l(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:v,strategy:f}):w);return{top:(x.top-A.top+h.top)/b.y,bottom:(A.bottom-x.bottom+h.bottom)/b.y,left:(x.left-A.left+h.left)/b.x,right:(A.right-x.right+h.right)/b.x}}const c=Math.min,f=Math.max;function m(t,e,n){return f(t,c(e,n))}const g=["top","right","bottom","left"],p=(g.reduce(((t,e)=>t.concat(e,e+"-start",e+"-end")),[]),{left:"right",right:"left",bottom:"top",top:"bottom"});function h(t){return t.replace(/left|right|bottom|top/g,(t=>p[t]))}function y(n,i,r){void 0===r&&(r=!1);const a=t(n),l=o(n),s=e(l);let c="x"===l?a===(r?"end":"start")?"right":"left":"start"===a?"bottom":"top";return i.reference[s]>i.floating[s]&&(c=h(c)),{main:c,cross:h(c)}}const x={start:"end",end:"start"};function w(t){return t.replace(/start|end/g,(t=>x[t]))}const b=function(e){return void 0===e&&(e={}),{name:"flip",options:e,async fn(o){var i;const{placement:r,middlewareData:a,rects:l,initialPlacement:c,platform:f,elements:m}=o,{mainAxis:u=!0,crossAxis:g=!0,fallbackPlacements:d,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:x="none",flipAlignment:v=!0,...b}=e,A=n(r),R=n(c)===c,P=await(null==f.isRTL?void 0:f.isRTL(m.floating)),E=d||(R||!v?[h(c)]:function(t){const e=h(t);return[w(t),e,w(e)]}(c));d||"none"===x||E.push(...function(e,o,i,r){const a=t(e);let l=function(t,e,n){const o=["left","right"],i=["right","left"],r=["top","bottom"],a=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?r:a;default:return[]}}(n(e),"start"===i,r);return a&&(l=l.map((t=>t+"-"+a)),o&&(l=l.concat(l.map(w)))),l}(c,v,x,P));const T=[c,...E],D=await s(o,b),L=[];let k=(null==(i=a.flip)?void 0:i.overflows)||[];if(u&&L.push(D[A]),g){const{main:t,cross:e}=y(r,l,P);L.push(D[t],D[e])}if(k=[...k,{placement:r,overflows:L}],!L.every((t=>t<=0))){var O,B;const t=((null==(O=a.flip)?void 0:O.index)||0)+1,e=T[t];if(e)return{data:{index:t,overflows:k},reset:{placement:e}};let n=null==(B=k.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:B.placement;if(!n)switch(p){case"bestFit":{var C;const t=null==(C=k.map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:C[0];t&&(n=t);break}case"initialPlacement":n=c}if(r!==n)return{reset:{placement:n}}}return{}}}};const D=function(e){return void 0===e&&(e=0),{name:"offset",options:e,async fn(i){const{x:r,y:a}=i,l=await async function(e,i){const{placement:r,platform:a,elements:l}=e,s=await(null==a.isRTL?void 0:a.isRTL(l.floating)),c=n(r),f=t(r),m="x"===o(r),u=["left","top"].includes(c)?-1:1,g=s&&m?-1:1,d="function"==typeof i?i(e):i;let{mainAxis:p,crossAxis:h,alignmentAxis:y}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return f&&"number"==typeof y&&(h="end"===f?-1*y:y),m?{x:h*g,y:p*u}:{x:p*u,y:h*g}}(i,e);return{x:r+l.x,y:a+l.y,data:l}}}};function L(t){return"x"===t?"y":"x"}const k=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:i,y:r,placement:a}=e,{mainAxis:l=!0,crossAxis:c=!1,limiter:f={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...u}=t,g={x:i,y:r},d=await s(e,u),p=o(n(a)),h=L(p);let y=g[p],x=g[h];if(l){const t="y"===p?"bottom":"right";y=m(y+d["y"===p?"top":"left"],y,y-d[t])}if(c){const t="y"===h?"bottom":"right";x=m(x+d["y"===h?"top":"left"],x,x-d[t])}const w=f.fn({...e,[p]:y,[h]:x});return{...w,data:{x:w.x-i,y:w.y-r}}}}}},"../../node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{oo:()=>k});var _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs");function n(t){var e;return(null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function o(t){return n(t).getComputedStyle(t)}function i(t){return t instanceof n(t).Node}function r(t){return i(t)?(t.nodeName||"").toLowerCase():""}let l;function c(){if(l)return l;const t=navigator.userAgentData;return t&&Array.isArray(t.brands)?(l=t.brands.map((t=>t.brand+"/"+t.version)).join(" "),l):navigator.userAgent}function s(t){return t instanceof n(t).HTMLElement}function f(t){return t instanceof n(t).Element}function u(t){return"undefined"!=typeof ShadowRoot&&(t instanceof n(t).ShadowRoot||t instanceof ShadowRoot)}function a(t){const{overflow:e,overflowX:n,overflowY:i,display:r}=o(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+n)&&!["inline","contents"].includes(r)}function d(t){return["table","td","th"].includes(r(t))}function h(t){const e=/firefox/i.test(c()),n=o(t),i=n.backdropFilter||n.WebkitBackdropFilter;return"none"!==n.transform||"none"!==n.perspective||!!i&&"none"!==i||e&&"filter"===n.willChange||e&&!!n.filter&&"none"!==n.filter||["transform","perspective"].some((t=>n.willChange.includes(t)))||["paint","layout","strict","content"].some((t=>{const e=n.contain;return null!=e&&e.includes(t)}))}function p(){return/^((?!chrome|android).)*safari/i.test(c())}function g(t){return["html","body","#document"].includes(r(t))}const m=Math.min,y=Math.max,x=Math.round;function w(t){const e=o(t);let n=parseFloat(e.width),i=parseFloat(e.height);const r=s(t),l=r?t.offsetWidth:n,c=r?t.offsetHeight:i,f=x(n)!==l||x(i)!==c;return f&&(n=l,i=c),{width:n,height:i,fallback:f}}function v(t){return f(t)?t:t.contextElement}const b={x:1,y:1};function L(t){const e=v(t);if(!s(e))return b;const n=e.getBoundingClientRect(),{width:o,height:i,fallback:r}=w(e);let l=(r?x(n.width):n.width)/o,c=(r?x(n.height):n.height)/i;return l&&Number.isFinite(l)||(l=1),c&&Number.isFinite(c)||(c=1),{x:l,y:c}}function E(e,o,i,r){var l,c;void 0===o&&(o=!1),void 0===i&&(i=!1);const s=e.getBoundingClientRect(),u=v(e);let a=b;o&&(r?f(r)&&(a=L(r)):a=L(e));const d=u?n(u):window,h=p()&&i;let g=(s.left+(h&&(null==(l=d.visualViewport)?void 0:l.offsetLeft)||0))/a.x,m=(s.top+(h&&(null==(c=d.visualViewport)?void 0:c.offsetTop)||0))/a.y,y=s.width/a.x,x=s.height/a.y;if(u){const t=n(u),e=r&&f(r)?n(r):r;let o=t.frameElement;for(;o&&r&&e!==t;){const t=L(o),e=o.getBoundingClientRect(),i=getComputedStyle(o);e.x+=(o.clientLeft+parseFloat(i.paddingLeft))*t.x,e.y+=(o.clientTop+parseFloat(i.paddingTop))*t.y,g*=t.x,m*=t.y,y*=t.x,x*=t.y,g+=e.x,m+=e.y,o=n(o).frameElement}}return(0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.JB)({width:y,height:x,x:g,y:m})}function T(t){return((i(t)?t.ownerDocument:t.document)||window.document).documentElement}function R(t){return f(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function C(t){return E(T(t)).left+R(t).scrollLeft}function F(t){if("html"===r(t))return t;const e=t.assignedSlot||t.parentNode||u(t)&&t.host||T(t);return u(e)?e.host:e}function S(t){const e=F(t);return g(e)?e.ownerDocument.body:s(e)&&a(e)?e:S(e)}function W(t,e){var o;void 0===e&&(e=[]);const i=S(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),l=n(i);return r?e.concat(l,l.visualViewport||[],a(i)?i:[]):e.concat(i,W(i))}function D(e,i,r){let l;if("viewport"===i)l=function(t,e){const o=n(t),i=T(t),r=o.visualViewport;let l=i.clientWidth,c=i.clientHeight,s=0,f=0;if(r){l=r.width,c=r.height;const t=p();(!t||t&&"fixed"===e)&&(s=r.offsetLeft,f=r.offsetTop)}return{width:l,height:c,x:s,y:f}}(e,r);else if("document"===i)l=function(t){const e=T(t),n=R(t),i=t.ownerDocument.body,r=y(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),l=y(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let c=-n.scrollLeft+C(t);const s=-n.scrollTop;return"rtl"===o(i).direction&&(c+=y(e.clientWidth,i.clientWidth)-r),{width:r,height:l,x:c,y:s}}(T(e));else if(f(i))l=function(t,e){const n=E(t,!0,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=s(t)?L(t):{x:1,y:1};return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:o*r.y}}(i,r);else{const t={...i};if(p()){var c,u;const o=n(e);t.x-=(null==(c=o.visualViewport)?void 0:c.offsetLeft)||0,t.y-=(null==(u=o.visualViewport)?void 0:u.offsetTop)||0}l=t}return(0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.JB)(l)}function V(t,e){const n=F(t);return!(n===e||!f(n)||g(n))&&("fixed"===o(n).position||V(n,e))}function A(t,e){return s(t)&&"fixed"!==o(t).position?e?e(t):t.offsetParent:null}function H(t,e){const i=n(t);if(!s(t))return i;let l=A(t,e);for(;l&&d(l)&&"static"===o(l).position;)l=A(l,e);return l&&("html"===r(l)||"body"===r(l)&&"static"===o(l).position&&!h(l))?i:l||function(t){let e=F(t);for(;s(e)&&!g(e);){if(h(e))return e;e=F(e)}return null}(t)||i}function O(t,e,n){const o=s(e),i=T(e),l=E(t,!0,"fixed"===n,e);let c={scrollLeft:0,scrollTop:0};const f={x:0,y:0};if(o||!o&&"fixed"!==n)if(("body"!==r(e)||a(i))&&(c=R(e)),s(e)){const t=E(e,!0);f.x=t.x+e.clientLeft,f.y=t.y+e.clientTop}else i&&(f.x=C(i));return{x:l.left+c.scrollLeft-f.x,y:l.top+c.scrollTop-f.y,width:l.width,height:l.height}}const P={getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:i,strategy:l}=t;const c="clippingAncestors"===n?function(t,e){const n=e.get(t);if(n)return n;let i=W(t).filter((t=>f(t)&&"body"!==r(t))),l=null;const c="fixed"===o(t).position;let s=c?F(t):t;for(;f(s)&&!g(s);){const e=o(s),n=h(s);n||"fixed"!==e.position||(l=null),(c?!n&&!l:!n&&"static"===e.position&&l&&["absolute","fixed"].includes(l.position)||a(s)&&!n&&V(t,s))?i=i.filter((t=>t!==s)):l=e,s=F(s)}return e.set(t,i),i}(e,this._c):[].concat(n),s=[...c,i],u=s[0],d=s.reduce(((t,n)=>{const o=D(e,n,l);return t.top=y(o.top,t.top),t.right=m(o.right,t.right),t.bottom=m(o.bottom,t.bottom),t.left=y(o.left,t.left),t}),D(e,u,l));return{width:d.right-d.left,height:d.bottom-d.top,x:d.left,y:d.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:n,strategy:o}=t;const i=s(n),l=T(n);if(n===l)return e;let c={scrollLeft:0,scrollTop:0},f={x:1,y:1};const u={x:0,y:0};if((i||!i&&"fixed"!==o)&&(("body"!==r(n)||a(l))&&(c=R(n)),s(n))){const t=E(n);f=L(n),u.x=t.x+n.clientLeft,u.y=t.y+n.clientTop}return{width:e.width*f.x,height:e.height*f.y,x:e.x*f.x-c.scrollLeft*f.x+u.x,y:e.y*f.y-c.scrollTop*f.y+u.y}},isElement:f,getDimensions:function(t){return w(t)},getOffsetParent:H,getDocumentElement:T,getScale:L,async getElementRects(t){let{reference:e,floating:n,strategy:o}=t;const i=this.getOffsetParent||H,r=this.getDimensions;return{reference:O(e,await i(n),o),floating:{x:0,y:0,...await r(n)}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>"rtl"===o(t).direction};const k=(t,n,o)=>{const i=new Map,r={platform:P,...o},l={...r.platform,_c:i};return(0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.oo)(t,n,{...r,platform:l})}},"../../node_modules/@welingtonms/classy/dist/index.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function n(n,r,t){if(t||2===arguments.length)for(var e,o=0,u=r.length;o<u;o++)!e&&o in r||(e||(e=Array.prototype.slice.call(r,0,o)),e[o]=r[o]);return n.concat(e||Array.prototype.slice.call(r))}function r(n){return null!=n&&["object","function"].includes(typeof n)}function t(n){return null!=n&&"function"==typeof n}function e(n){return null==n?[]:Array.isArray(n)?n:[n]}function o(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var o=e(n);return function(n){for(var r=!1,u=function(u){for(var c=o[u],f=Object.keys(c),i=!0,a=function(r){var o=f[r],u=n[o];i=Array.isArray(c[o])?i&&e(u).every((function(n){return c[o].includes(n)})):t(c[o])?i&&Boolean(c[o](u)):i&&c[o]===u},l=0;l<f.length&&i;l++)a(l);r=r||i},c=0;c<o.length;c++)u(c);return r}}function u(r){return Object.keys(r||{}).reduce((function(t,e){return r[e]?n(n([],t,!0),[e],!1):t}),[]).join(" ")}function c(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];for(var e=[],o=0;o<n.length;o++){var c=n[o];r(c)?e=e.concat(u(c)):c&&e.push(String(c))}return e.join(" ")}function i(n){return{when:function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return o.apply(void 0,r)(n)},classy:c}}__webpack_require__.d(__webpack_exports__,{ZP:()=>i,yH:()=>c})},"../../node_modules/lit/directives/if-defined.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>l});var lit_html=__webpack_require__("../../node_modules/lit/node_modules/lit-html/lit-html.js"),l=l=>null!=l?l:lit_html.Ld},"../../node_modules/lit/static-html.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{dy:()=>n,i0:()=>i,s2:()=>o});var lit_html=__webpack_require__("../../node_modules/lit/node_modules/lit-html/lit-html.js"),e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},o=t=>({_$litStatic$:t,r:e}),i=function i(t){for(var _len=arguments.length,r=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)r[_key-1]=arguments[_key];return{_$litStatic$:r.reduce(((r,e,l)=>r+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error("Value passed to 'literal' function must be a 'literal' result: ".concat(t,". Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security."))})(e)+t[l+1]),t[0]),r:e}},s=new Map,a=t=>function(r){for(var _len2=arguments.length,e=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)e[_key2-1]=arguments[_key2];for(var i,a,c,o=e.length,n=[],u=[],$=0,f=!1;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l(a));)c+=i+r[++$],f=!0;u.push(a),n.push(c),$++}if($===o&&n.push(r[o]),f){var _t=n.join("$$lit$$");void 0===(r=s.get(_t))&&(n.raw=n,s.set(_t,r=n)),e=u}return t(r,...e)},n=a(lit_html.dy);a(lit_html.YP)}}]);