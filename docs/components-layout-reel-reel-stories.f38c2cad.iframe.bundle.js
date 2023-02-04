/*! For license information please see components-layout-reel-reel-stories.f38c2cad.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[4089],{"./src/components/layout/reel/reel.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>reel_stories});var _templateObject,lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),arg_types=__webpack_require__("./src/common/arg-types.js"),static_html=(__webpack_require__("./src/components/layout/box/index.js"),__webpack_require__("../../node_modules/lit/static-html.js")),ref=__webpack_require__("../../node_modules/lit/directives/ref.js"),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),prop_toolset=__webpack_require__("./src/common/prop-toolset.js"),base_layout=(__webpack_require__("./src/mixins/polymorphic/index.js"),__webpack_require__("./src/components/layout/base-layout.js")),lit=__webpack_require__("../../node_modules/lit/index.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js"),layout_styles=__webpack_require__("./src/styles/layout.styles.js");const reel_styles=function styles(){return[(0,layout_styles.Z)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-reel-background-color: initial;\n\t\t\t\t--xb-reel-border-color: ",";\n\t\t\t\t--xb-reel-border-style: none;\n\t\t\t\t--xb-reel-border-width: 1px;\n\t\t\t\t--xb-reel-color: unset;\n\t\t\t\t--xb-reel-margin: var( --xb-spacing-4 );\n\t\t\t\t--xb-reel-padding-x: ",";\n\t\t\t\t--xb-reel-padding-y: ",";\n\t\t\t\t--xb-reel-thumb-color: rgb( var( --xb-color-gray-700 ) );\n\t\t\t\t--xb-reel-track-color: rgb( var( --xb-color-gray-500 ) );\n\n\t\t\t\twidth: 100%;\n\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.reel {\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tdisplay: flex;\n\t\t\t\tblock-size: auto;\n\t\t\t\toverflow-x: auto;\n\t\t\t\toverflow-y: hidden;\n\t\t\t\tscrollbar-color: var( --xb-reel-thumb-color )\n\t\t\t\t\tvar( --xb-reel-track-color );\n\n\t\t\t\tborder: var( --xb-reel-border-width ) var( --xb-reel-border-style )\n\t\t\t\t\tvar( --xb-reel-border-color );\n\t\t\t\tcolor: var( --xb-reel-color );\n\t\t\t\tbackground-color: var( --xb-reel-background-color );\n\t\t\t}\n\n\t\t\t.xb-reel::-webkit-scrollbar {\n\t\t\t\tblock-size: var( --xb-spacing-4 );\n\t\t\t}\n\n\t\t\t.xb-reel::-webkit-scrollbar-track {\n\t\t\t\tbackground-color: var( --xb-reel-track-color );\n\t\t\t}\n\n\t\t\t.xb-reel::-webkit-scrollbar-thumb {\n\t\t\t\tbackground-color: var( --xb-reel-track-color );\n\t\t\t\tbackground-image: linear-gradient(\n\t\t\t\t\tvar( --xb-reel-track-color ) 0,\n\t\t\t\t\tvar( --xb-reel-track-color ) 0.25rem,\n\t\t\t\t\t#fff 0.25rem,\n\t\t\t\t\t#fff 0.75rem,\n\t\t\t\t\tvar( --xb-reel-track-color ) 0.75rem\n\t\t\t\t);\n\t\t\t}\n\n\t\t\t::slotted( * ) {\n\t\t\t\t",";\n\n\t\t\t\tflex: 0 0 auto;\n\t\t\t}\n\n\t\t\t::slotted( img ) {\n\t\t\t\tblock-size: 100%;\n\t\t\t\tflex-basis: auto;\n\t\t\t\twidth: auto;\n\t\t\t}\n\n\t\t\t::slotted( *:not( :first-child ) ) {\n\t\t\t\tmargin-inline-start: var( --xb-reel-margin );\n\t\t\t}\n\n\t\t\t.xb-reel.is-overflowing {\n\t\t\t\tpadding-block-end: var( --xb-reel-margin );\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-2"),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,padding_styles.px)("var(--xb-reel-padding-x)"),(0,padding_styles.py)("var(--xb-reel-padding-y)"),(0,typography_styles.Z)("body-1"))];var strings,raw};var reel_templateObject,reel_stories_templateObject,_Playground$parameter,_Playground$parameter2,_Playground$parameter3;function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}class ReelLayout extends base_layout.Z{static get properties(){return{}}constructor(){super(),_defineProperty(this,"element",(0,ref.V)())}connectedCallback(){super.connectedCallback(),console.debug("[xb-reel]","connectedCallback"),this.resizeObserver=new ResizeObserver((entries=>{console.debug("[xb-reel]","resizeObserver"),this._toggleOverflowClass(entries[0].target)})),this.mutationObserver=new MutationObserver((entries=>{console.debug("[xb-reel]","mutationObserver"),this._toggleOverflowClass(entries[0].target)}))}firstUpdated(){super.firstUpdated(),console.log("connectedCallback",this.element),this.resizeObserver.observe(this.element.value),this.mutationObserver.observe(this.element.value,{childList:!0})}disconnectedCallback(){super.disconnectedCallback(),console.debug("[xb-reel]","disconnectedCallback"),this.resizeObserver.disconnect(),this.mutationObserver.disconnect()}_toggleOverflowClass(elem){console.debug("[xb-reel]",elem.scrollWidth>elem.clientWidth),elem.classList.toggle("is-overflowing",elem.scrollWidth>elem.clientWidth)}render(){var{classy}=(0,index_esm.ZP)({}),tag=this.tag;return(0,static_html.dy)(reel_templateObject||(reel_templateObject=function reel_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<","\n\t\t\t\t","\n\t\t\t\tclass=","\n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</",">\n\t\t"])),tag,(0,ref.i)(this.element),classy("reel",(0,prop_toolset.O)("border",this.borderless),(0,prop_toolset.O)("padding",this.paddingless)),tag)}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){reel_stories_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function reel_stories_defineProperty(obj,key,value){return(key=function reel_stories_toPropertyKey(arg){var key=function reel_stories_toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}_defineProperty(ReelLayout,"styles",[reel_styles()]),window.customElements.define("xb-reel",ReelLayout);const reel_stories={title:"Foundation/Layouts/reel",component:"xb-reel",argTypes:{paddingless:arg_types.Bz,borderless:arg_types.ON,children:{table:{disable:!0}}},parameters:{}};var Playground={render:args=>(0,lit_html.dy)(reel_stories_templateObject||(reel_stories_templateObject=function reel_stories_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(['\n        <xb-reel>\n            <div role="listitem">\n                <a class="cta" href="/path/to/home">Home</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/about">About</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/pricing">Pricing</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/docs">Documentation</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/testimonials">Testimonials</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/careers">Careers</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/forum">Forum</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/forum">Accessibility</a>\n            </div>\n        </xb-reel>\n    ']))),args:{paddingless:"none",borderless:"none"}};Playground.parameters=_objectSpread(_objectSpread({},Playground.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Playground$parameter=Playground.parameters)||void 0===_Playground$parameter?void 0:_Playground$parameter.docs),{},{source:_objectSpread({originalSource:'{\n  render: args => html`\n        <xb-reel>\n            <div role="listitem">\n                <a class="cta" href="/path/to/home">Home</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/about">About</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/pricing">Pricing</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/docs">Documentation</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/testimonials">Testimonials</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/careers">Careers</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/forum">Forum</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/forum">Accessibility</a>\n            </div>\n        </xb-reel>\n    `,\n  args: {\n    paddingless: \'none\',\n    borderless: \'none\'\n  }\n}'},null===(_Playground$parameter2=Playground.parameters)||void 0===_Playground$parameter2||null===(_Playground$parameter3=_Playground$parameter2.docs)||void 0===_Playground$parameter3?void 0:_Playground$parameter3.source)})});const __namedExportsOrder=["Playground"]},"./src/common/arg-types.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BJ:()=>SizeArg,Bz:()=>PaddinglessArg,Fr:()=>PlacementArg,ON:()=>BorderlessArg});var PlacementArg=Object.freeze({control:"select",options:["top","left","right","bottom","top-start","top-end","right-start","right-end","bottom-start","bottom-end","left-start","left-end"]}),SizeArg=Object.freeze({control:"select",options:["extra-small","small","medium","large"]}),PaddinglessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]}),BorderlessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]})},"./src/components/layout/box/box.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var _templateObject,static_html=__webpack_require__("../../node_modules/lit/static-html.js"),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),prop_toolset=__webpack_require__("./src/common/prop-toolset.js"),base_layout=(__webpack_require__("./src/mixins/polymorphic/index.js"),__webpack_require__("./src/components/layout/base-layout.js")),lit=__webpack_require__("../../node_modules/lit/index.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),transition_styles=__webpack_require__("./src/styles/transition.styles.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js"),layout_styles=__webpack_require__("./src/styles/layout.styles.js");const box_styles=function styles(){return[(0,layout_styles.Z)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-box-background-color: initial;\n\t\t\t\t--xb-box-border-color: ",";\n\t\t\t\t--xb-box-border-style: solid;\n\t\t\t\t--xb-box-border-width: 1px;\n\t\t\t\t--xb-box-color: unset;\n\t\t\t\t--xb-box-gap: ",";\n\t\t\t\t--xb-box-padding-x: ",";\n\t\t\t\t--xb-box-padding-y: ",";\n\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.box {\n\t\t\t\t",";\n\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tborder: var( --xb-box-border-width ) var( --xb-box-border-style )\n\t\t\t\t\tvar( --xb-box-border-color );\n\t\t\t\tcolor: var( --xb-box-color );\n\t\t\t\tbackground-color: var( --xb-box-background-color );\n\n\t\t\t\theight: 100%;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t}\n\n\t\t\t::slotted( * ),\n\t\t\tslot[name='leading']::slotted( * ),\n\t\t\tslot[name='trailing']::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\tslot[name='leading']::slotted( * ),\n\t\t\tslot[name='trailing']::slotted( * ) {\n\t\t\t\tdisplay: inline-flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\tslot[name='leading']::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\tslot[name='trailing']::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-4"),(0,get_token.Z)("spacing-2"),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,transition_styles.Z)([{property:"background-color"},{property:"color"}]),(0,padding_styles.px)("var(--xb-box-padding-x)"),(0,padding_styles.py)("var(--xb-box-padding-y)"),(0,typography_styles.Z)("body-1"),(0,padding_styles.px)((0,get_token.Z)("spacing-0")),(0,padding_styles.py)((0,get_token.Z)("spacing-0")),(0,margin_styles.mx)((0,get_token.Z)("spacing-0")),(0,margin_styles.my)((0,get_token.Z)("spacing-0")),(0,margin_styles.mr)("var(--xb-box-gap)"),(0,margin_styles.ml)("var(--xb-box-gap)"))];var strings,raw};var box_templateObject;class BoxLayout extends base_layout.Z{static get properties(){return{}}constructor(){super()}render(){var{classy}=(0,index_esm.ZP)({}),tag=this.tag;return(0,static_html.dy)(box_templateObject||(box_templateObject=function box_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<","\n\t\t\t\tclass=",'\n\t\t\t>\n\t\t\t\t<slot name="leading"></slot>\n\t\t\t\t<slot></slot>\n\t\t\t\t<slot name="trailing"></slot>\n\t\t\t</',">\n\t\t"])),tag,classy("box",(0,prop_toolset.O)("border",this.borderless),(0,prop_toolset.O)("padding",this.paddingless)),tag)}}!function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(BoxLayout,"styles",[box_styles()]),window.customElements.define("xb-box",BoxLayout)},"./src/components/layout/box/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/layout/box/box.js")},"./src/styles/transition.styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit/index.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../xb-toolset/dist/to-array.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var DEFAULT_TRANSITION_CONFIG={property:"all",delay:"0s",duration:"0.25s",easing:"ease-in-out"};const __WEBPACK_DEFAULT_EXPORT__=function transition(configs){return(0,lit__WEBPACK_IMPORTED_MODULE_0__.$m)("transition: ".concat(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default()(configs).map((config=>function toTransition(config){var safeConfig=_objectSpread(_objectSpread({},DEFAULT_TRANSITION_CONFIG),config);return(0,lit__WEBPACK_IMPORTED_MODULE_0__.$m)("".concat(safeConfig.property," ").concat(safeConfig.duration," ").concat(safeConfig.easing," ").concat(safeConfig.delay))}(config))).join(", ")))}},"../../node_modules/@welingtonms/classy/dist/index.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function n(n,r,t){if(t||2===arguments.length)for(var e,o=0,u=r.length;o<u;o++)!e&&o in r||(e||(e=Array.prototype.slice.call(r,0,o)),e[o]=r[o]);return n.concat(e||Array.prototype.slice.call(r))}function r(n){return null!=n&&["object","function"].includes(typeof n)}function t(n){return null!=n&&"function"==typeof n}function e(n){return null==n?[]:Array.isArray(n)?n:[n]}function o(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var o=e(n);return function(n){for(var r=!1,u=function(u){for(var c=o[u],f=Object.keys(c),i=!0,a=function(r){var o=f[r],u=n[o];i=Array.isArray(c[o])?i&&e(u).every((function(n){return c[o].includes(n)})):t(c[o])?i&&Boolean(c[o](u)):i&&c[o]===u},l=0;l<f.length&&i;l++)a(l);r=r||i},c=0;c<o.length;c++)u(c);return r}}function u(r){return Object.keys(r||{}).reduce((function(t,e){return r[e]?n(n([],t,!0),[e],!1):t}),[]).join(" ")}function c(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];for(var e=[],o=0;o<n.length;o++){var c=n[o];r(c)?e=e.concat(u(c)):c&&e.push(String(c))}return e.join(" ")}function i(n){return{when:function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return o.apply(void 0,r)(n)},classy:c}}__webpack_require__.d(__webpack_exports__,{ZP:()=>i,yH:()=>c})},"../../node_modules/lit/directives/ref.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>ref_e,i:()=>ref_n});var lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),directive_helpers=__webpack_require__("../../node_modules/lit-html/directive-helpers.js"),directive_t_CHILD=2;var s=(i,t)=>{var e,o,r=i._$AN;if(void 0===r)return!1;for(var _i of r)null===(o=(e=_i)._$AO)||void 0===o||o.call(e,t,!1),s(_i,t);return!0},o=i=>{var t,e;do{if(void 0===(t=i._$AM))break;(e=t._$AN).delete(i),i=t}while(0===(null==e?void 0:e.size))},r=i=>{for(var _t;_t=i._$AM;i=_t){var _e=_t._$AN;if(void 0===_e)_t._$AN=_e=new Set;else if(_e.has(i))break;_e.add(i),l(_t)}};function n(i){void 0!==this._$AN?(o(this),this._$AM=i,r(this)):this._$AM=i}function h(i){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(r))for(var _i2=e;_i2<r.length;_i2++)s(r[_i2],!1),o(r[_i2]);else null!=r&&(s(r,!1),o(r));else s(this,i)}var l=i=>{var t,s,o,r;i.type==directive_t_CHILD&&(null!==(t=(o=i)._$AP)&&void 0!==t||(o._$AP=h),null!==(s=(r=i)._$AQ)&&void 0!==s||(r._$AQ=n))};var ref_e=()=>new ref_o;class ref_o{}var t,ref_h=new WeakMap,ref_n=(t=class extends class c extends class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(){super(...arguments),this._$AN=void 0}_$AT(i,t,e){super._$AT(i,t,e),r(this),this.isConnected=i._$AU}_$AO(i){var e,r,t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];i!==this.isConnected&&(this.isConnected=i,i?null===(e=this.reconnected)||void 0===e||e.call(this):null===(r=this.disconnected)||void 0===r||r.call(this)),t&&(s(this,i),o(this))}setValue(t){if((0,directive_helpers.OR)(this._$Ct))this._$Ct._$AI(t,this);else{var _i3=[...this._$Ct._$AH];_i3[this._$Ci]=t,this._$Ct._$AI(_i3,this,0)}}disconnected(){}reconnected(){}}{render(t){return lit_html.Ld}update(t,_ref){var e,[s]=_ref,o=s!==this.Y;return o&&void 0!==this.Y&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.Y=s,this.dt=null===(e=t.options)||void 0===e?void 0:e.host,this.rt(this.ct=t.element)),lit_html.Ld}rt(i){var t;if("function"==typeof this.Y){var _s=null!==(t=this.dt)&&void 0!==t?t:globalThis,_e=ref_h.get(_s);void 0===_e&&(_e=new WeakMap,ref_h.set(_s,_e)),void 0!==_e.get(this.Y)&&this.Y.call(this.dt,void 0),_e.set(this.Y,i),void 0!==i&&this.Y.call(this.dt,i)}else this.Y.value=i}get lt(){var i,t,s;return"function"==typeof this.Y?null===(t=ref_h.get(null!==(i=this.dt)&&void 0!==i?i:globalThis))||void 0===t?void 0:t.get(this.Y):null===(s=this.Y)||void 0===s?void 0:s.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}},function(){for(var _len=arguments.length,e=new Array(_len),_key=0;_key<_len;_key++)e[_key]=arguments[_key];return{_$litDirective$:t,values:e}})},"../../node_modules/lit/static-html.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{dy:()=>n,i0:()=>i,s2:()=>o});var lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},o=t=>({_$litStatic$:t,r:e}),i=function i(t){for(var _len=arguments.length,r=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)r[_key-1]=arguments[_key];return{_$litStatic$:r.reduce(((r,e,l)=>r+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error("Value passed to 'literal' function must be a 'literal' result: ".concat(t,". Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security."))})(e)+t[l+1]),t[0]),r:e}},s=new Map,a=t=>function(r){for(var _len2=arguments.length,e=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)e[_key2-1]=arguments[_key2];for(var i,a,c,o=e.length,n=[],u=[],$=0,f=!1;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l(a));)c+=i+r[++$],f=!0;u.push(a),n.push(c),$++}if($===o&&n.push(r[o]),f){var _t=n.join("$$lit$$");void 0===(r=s.get(_t))&&(n.raw=n,s.set(_t,r=n)),e=u}return t(r,...e)},n=a(lit_html.dy);a(lit_html.YP)}}]);