"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[7299],{"./src/components/layout/center/center.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>center_stories});var _templateObject,lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),arg_types=__webpack_require__("./src/common/arg-types.js"),static_html=__webpack_require__("../../node_modules/lit/static-html.js"),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),prop_toolset=__webpack_require__("./src/common/prop-toolset.js"),base_layout=(__webpack_require__("./src/mixins/polymorphic/index.js"),__webpack_require__("./src/components/layout/base-layout.js")),lit=__webpack_require__("../../node_modules/lit/index.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js"),layout_styles=__webpack_require__("./src/styles/layout.styles.js");const center_styles=function styles(){return[(0,layout_styles.Z)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-center-background-color: initial;\n\t\t\t\t--xb-center-border-color: ",";\n\t\t\t\t--xb-center-border-style: none;\n\t\t\t\t--xb-center-border-width: 1px;\n\t\t\t\t--xb-center-color: unset;\n\t\t\t\t--xb-center-max-width: 80ch;\n\t\t\t\t--xb-center-padding-x: ",";\n\t\t\t\t--xb-center-padding-y: ",";\n\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t.center {\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tbox-sizing: content-box;\n\t\t\t\tmax-inline-size: var( --xb-center-max-width );\n\n\t\t\t\tborder: var( --xb-center-border-width ) var( --xb-center-border-style )\n\t\t\t\t\tvar( --xb-center-border-color );\n\t\t\t\tcolor: var( --xb-center-color );\n\t\t\t\tbackground-color: var( --xb-center-background-color );\n\t\t\t}\n\n\t\t\t::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-4"),(0,get_token.Z)("spacing-2"),(0,margin_styles.mx)("auto"),(0,padding_styles.px)("var(--xb-center-padding-x)"),(0,padding_styles.py)("var(--xb-center-padding-y)"),(0,typography_styles.Z)("body-1"))];var strings,raw};var center_templateObject,center_stories_templateObject,_Playground$parameter,_Playground$parameter2,_Playground$parameter3;class CenterLayout extends base_layout.Z{static get properties(){return{}}constructor(){super()}render(){var{classy}=(0,index_esm.ZP)({}),tag=this.tag;return(0,static_html.dy)(center_templateObject||(center_templateObject=function center_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<","\n\t\t\t\tclass=","\n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</",">\n\t\t"])),tag,classy("center",(0,prop_toolset.O)("border",this.borderless),(0,prop_toolset.O)("padding",this.paddingless)),tag)}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){center_stories_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function center_stories_defineProperty(obj,key,value){return(key=function center_stories_toPropertyKey(arg){var key=function center_stories_toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}!function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(CenterLayout,"styles",[center_styles()]),window.customElements.define("xb-center",CenterLayout);const center_stories={title:"Foundation/Layouts/center",component:"xb-center",argTypes:{paddingless:arg_types.Bz,borderless:arg_types.ON,children:{table:{disable:!0}}},parameters:{}};var style="--xb-center-background-color: rgb(var(--xb-color-background)); --xb-center-border-style: solid;",Playground={render:args=>(0,lit_html.dy)(center_stories_templateObject||(center_stories_templateObject=function center_stories_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(['\n            <div\n                style="display: flex; flex-direction: column; width: 100%; gap: var(--xb-spacing-4);"\n            >\n                <xb-center style='," borderless paddingless>Content</xb-center>\n                <xb-center\n                    style=","\n                    paddingless=","\n                    borderless=","\n                >\n                    Content\n                </xb-center>\n            </div>\n        "])),style,style,args.paddingless,args.borderless),args:{paddingless:"none",borderless:"none"}};Playground.parameters=_objectSpread(_objectSpread({},Playground.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Playground$parameter=Playground.parameters)||void 0===_Playground$parameter?void 0:_Playground$parameter.docs),{},{source:_objectSpread({originalSource:"{\n  render: args => html`\n            <div\n                style=\"display: flex; flex-direction: column; width: 100%; gap: var(--xb-spacing-4);\"\n            >\n                <xb-center style=${style} borderless paddingless>Content</xb-center>\n                <xb-center\n                    style=${style}\n                    paddingless=${args.paddingless}\n                    borderless=${args.borderless}\n                >\n                    Content\n                </xb-center>\n            </div>\n        `,\n  args: {\n    paddingless: 'none',\n    borderless: 'none'\n  }\n}"},null===(_Playground$parameter2=Playground.parameters)||void 0===_Playground$parameter2||null===(_Playground$parameter3=_Playground$parameter2.docs)||void 0===_Playground$parameter3?void 0:_Playground$parameter3.source)})});const __namedExportsOrder=["Playground"]},"./src/common/arg-types.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BJ:()=>SizeArg,Bz:()=>PaddinglessArg,Fr:()=>PlacementArg,ON:()=>BorderlessArg});var PlacementArg=Object.freeze({control:"select",options:["top","left","right","bottom","top-start","top-end","right-start","right-end","bottom-start","bottom-end","left-start","left-end"]}),SizeArg=Object.freeze({control:"select",options:["extra-small","small","medium","large"]}),PaddinglessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]}),BorderlessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]})},"../../node_modules/@welingtonms/classy/dist/index.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function n(n,r,t){if(t||2===arguments.length)for(var e,o=0,u=r.length;o<u;o++)!e&&o in r||(e||(e=Array.prototype.slice.call(r,0,o)),e[o]=r[o]);return n.concat(e||Array.prototype.slice.call(r))}function r(n){return null!=n&&["object","function"].includes(typeof n)}function t(n){return null!=n&&"function"==typeof n}function e(n){return null==n?[]:Array.isArray(n)?n:[n]}function o(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var o=e(n);return function(n){for(var r=!1,u=function(u){for(var c=o[u],f=Object.keys(c),i=!0,a=function(r){var o=f[r],u=n[o];i=Array.isArray(c[o])?i&&e(u).every((function(n){return c[o].includes(n)})):t(c[o])?i&&Boolean(c[o](u)):i&&c[o]===u},l=0;l<f.length&&i;l++)a(l);r=r||i},c=0;c<o.length;c++)u(c);return r}}function u(r){return Object.keys(r||{}).reduce((function(t,e){return r[e]?n(n([],t,!0),[e],!1):t}),[]).join(" ")}function c(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];for(var e=[],o=0;o<n.length;o++){var c=n[o];r(c)?e=e.concat(u(c)):c&&e.push(String(c))}return e.join(" ")}function i(n){return{when:function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return o.apply(void 0,r)(n)},classy:c}}__webpack_require__.d(__webpack_exports__,{ZP:()=>i,yH:()=>c})},"../../node_modules/lit/static-html.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{dy:()=>n,i0:()=>i,s2:()=>o});var lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},o=t=>({_$litStatic$:t,r:e}),i=function i(t){for(var _len=arguments.length,r=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)r[_key-1]=arguments[_key];return{_$litStatic$:r.reduce(((r,e,l)=>r+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error("Value passed to 'literal' function must be a 'literal' result: ".concat(t,". Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security."))})(e)+t[l+1]),t[0]),r:e}},s=new Map,a=t=>function(r){for(var _len2=arguments.length,e=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)e[_key2-1]=arguments[_key2];for(var i,a,c,o=e.length,n=[],u=[],$=0,f=!1;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l(a));)c+=i+r[++$],f=!0;u.push(a),n.push(c),$++}if($===o&&n.push(r[o]),f){var _t=n.join("$$lit$$");void 0===(r=s.get(_t))&&(n.raw=n,s.set(_t,r=n)),e=u}return t(r,...e)},n=a(lit_html.dy);a(lit_html.YP)}}]);