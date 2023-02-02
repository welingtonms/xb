"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[3815],{"./src/components/layout/grid/grid.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>grid_stories});var _templateObject,lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),arg_types=__webpack_require__("./src/common/arg-types.js"),static_html=(__webpack_require__("./src/components/layout/box/index.js"),__webpack_require__("../../node_modules/lit/static-html.js")),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),prop_toolset=__webpack_require__("./src/common/prop-toolset.js"),base_layout=(__webpack_require__("./src/mixins/polymorphic/index.js"),__webpack_require__("./src/components/layout/base-layout.js")),lit=__webpack_require__("../../node_modules/lit/index.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js"),layout_styles=__webpack_require__("./src/styles/layout.styles.js");const grid_styles=function styles(){return[(0,layout_styles.Z)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-grid-background-color: initial;\n\t\t\t\t--xb-grid-border-color: ",";\n\t\t\t\t--xb-grid-border-style: none;\n\t\t\t\t--xb-grid-border-width: 1px;\n\t\t\t\t--xb-grid-color: unset;\n\t\t\t\t--xb-grid-gap: ",";\n\t\t\t\t--xb-grid-min-column-width: 80ch;\n\t\t\t\t--xb-grid-padding-x: ",";\n\t\t\t\t--xb-grid-padding-y: ",";\n\n\t\t\t\twidth: 100%;\n\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.grid {\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tdisplay: grid;\n\t\t\t\tgrid-gap: var( --xb-grid-gap );\n\n\t\t\t\tborder: var( --xb-grid-border-width ) var( --xb-grid-border-style )\n\t\t\t\t\tvar( --xb-grid-border-color );\n\t\t\t\tcolor: var( --xb-grid-color );\n\t\t\t\tbackground-color: var( --xb-grid-background-color );\n\t\t\t}\n\n\t\t\t@supports ( width: min( 250px, 100% ) ) {\n\t\t\t\t.xb-grid {\n\t\t\t\t\tgrid-template-columns: repeat(\n\t\t\t\t\t\tauto-fit,\n\t\t\t\t\t\tminmax( min( var( --xb-grid-min-column-width ), 100% ), 1fr )\n\t\t\t\t\t);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-4"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-2"),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,padding_styles.px)("var(--xb-grid-padding-x)"),(0,padding_styles.py)("var(--xb-grid-padding-y)"),(0,typography_styles.Z)("body-1"))];var strings,raw};var grid_templateObject,grid_stories_templateObject,_Playground$parameter,_Playground$parameter2,_Playground$parameter3;class GridLayout extends base_layout.Z{static get properties(){return{}}constructor(){super()}render(){var{classy}=(0,index_esm.ZP)({}),tag=this.tag;return(0,static_html.dy)(grid_templateObject||(grid_templateObject=function grid_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<","\n\t\t\t\tclass=","\n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</",">\n\t\t"])),tag,classy("grid",(0,prop_toolset.O)("border",this.borderless),(0,prop_toolset.O)("padding",this.paddingless)),tag)}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){grid_stories_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function grid_stories_defineProperty(obj,key,value){return(key=function grid_stories_toPropertyKey(arg){var key=function grid_stories_toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}!function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(GridLayout,"styles",[grid_styles()]),window.customElements.define("xb-grid",GridLayout);const grid_stories={title:"Foundation/Layouts/grid",component:"xb-grid",argTypes:{paddingless:arg_types.Bz,borderless:arg_types.ON,children:{table:{disable:!0}}},parameters:{}};var Playground={render:args=>(0,lit_html.dy)(grid_stories_templateObject||(grid_stories_templateObject=function grid_stories_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n        <xb-grid\n            style=","\n            paddingless=","\n            borderless=",'\n        >\n            <xb-box paddingless="none" borderless="none">Box 1</xb-box>\n            <xb-box paddingless="none" borderless="none">Box 2</xb-box>\n            <xb-box paddingless="none" borderless="none">Box 3</xb-box>\n            <xb-box paddingless="none" borderless="none">Box 4</xb-box>\n            <xb-box paddingless="none" borderless="none">Box 5</xb-box>\n        </xb-grid>\n    '])),"--xb-grid-background-color: rgb(var(--xb-color-background));",args.paddingless,args.borderless),args:{paddingless:"none",borderless:"none"}};Playground.parameters=_objectSpread(_objectSpread({},Playground.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Playground$parameter=Playground.parameters)||void 0===_Playground$parameter?void 0:_Playground$parameter.docs),{},{source:_objectSpread({originalSource:'{\n  render: args => html`\n        <xb-grid\n            style=${style}\n            paddingless=${args.paddingless}\n            borderless=${args.borderless}\n        >\n            <xb-box paddingless="none" borderless="none">Box 1</xb-box>\n            <xb-box paddingless="none" borderless="none">Box 2</xb-box>\n            <xb-box paddingless="none" borderless="none">Box 3</xb-box>\n            <xb-box paddingless="none" borderless="none">Box 4</xb-box>\n            <xb-box paddingless="none" borderless="none">Box 5</xb-box>\n        </xb-grid>\n    `,\n  args: {\n    paddingless: \'none\',\n    borderless: \'none\'\n  }\n}'},null===(_Playground$parameter2=Playground.parameters)||void 0===_Playground$parameter2||null===(_Playground$parameter3=_Playground$parameter2.docs)||void 0===_Playground$parameter3?void 0:_Playground$parameter3.source)})});const __namedExportsOrder=["Playground"]},"./src/common/arg-types.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BJ:()=>SizeArg,Bz:()=>PaddinglessArg,Fr:()=>PlacementArg,ON:()=>BorderlessArg});var PlacementArg=Object.freeze({control:"select",options:["top","left","right","bottom","top-start","top-end","right-start","right-end","bottom-start","bottom-end","left-start","left-end"]}),SizeArg=Object.freeze({control:"select",options:["extra-small","small","medium","large"]}),PaddinglessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]}),BorderlessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]})},"./src/components/layout/box/box.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var _templateObject,static_html=__webpack_require__("../../node_modules/lit/static-html.js"),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),prop_toolset=__webpack_require__("./src/common/prop-toolset.js"),base_layout=(__webpack_require__("./src/mixins/polymorphic/index.js"),__webpack_require__("./src/components/layout/base-layout.js")),lit=__webpack_require__("../../node_modules/lit/index.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),transition_styles=__webpack_require__("./src/styles/transition.styles.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js"),layout_styles=__webpack_require__("./src/styles/layout.styles.js");const box_styles=function styles(){return[(0,layout_styles.Z)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-box-background-color: initial;\n\t\t\t\t--xb-box-border-color: ",";\n\t\t\t\t--xb-box-border-style: solid;\n\t\t\t\t--xb-box-border-width: 1px;\n\t\t\t\t--xb-box-color: unset;\n\t\t\t\t--xb-box-gap: ",";\n\t\t\t\t--xb-box-padding-x: ",";\n\t\t\t\t--xb-box-padding-y: ",";\n\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.box {\n\t\t\t\t",";\n\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tborder: var( --xb-box-border-width ) var( --xb-box-border-style )\n\t\t\t\t\tvar( --xb-box-border-color );\n\t\t\t\tcolor: var( --xb-box-color );\n\t\t\t\tbackground-color: var( --xb-box-background-color );\n\n\t\t\t\theight: 100%;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t}\n\n\t\t\t::slotted( * ),\n\t\t\tslot[name='leading']::slotted( * ),\n\t\t\tslot[name='trailing']::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\tslot[name='leading']::slotted( * ),\n\t\t\tslot[name='trailing']::slotted( * ) {\n\t\t\t\tdisplay: inline-flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\tslot[name='leading']::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\tslot[name='trailing']::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-4"),(0,get_token.Z)("spacing-2"),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,transition_styles.Z)([{property:"background-color"},{property:"color"}]),(0,padding_styles.px)("var(--xb-box-padding-x)"),(0,padding_styles.py)("var(--xb-box-padding-y)"),(0,typography_styles.Z)("body-1"),(0,padding_styles.px)((0,get_token.Z)("spacing-0")),(0,padding_styles.py)((0,get_token.Z)("spacing-0")),(0,margin_styles.mx)((0,get_token.Z)("spacing-0")),(0,margin_styles.my)((0,get_token.Z)("spacing-0")),(0,margin_styles.mr)("var(--xb-box-gap)"),(0,margin_styles.ml)("var(--xb-box-gap)"))];var strings,raw};var box_templateObject;class BoxLayout extends base_layout.Z{static get properties(){return{}}constructor(){super()}render(){var{classy}=(0,index_esm.ZP)({}),tag=this.tag;return(0,static_html.dy)(box_templateObject||(box_templateObject=function box_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<","\n\t\t\t\tclass=",'\n\t\t\t>\n\t\t\t\t<slot name="leading"></slot>\n\t\t\t\t<slot></slot>\n\t\t\t\t<slot name="trailing"></slot>\n\t\t\t</',">\n\t\t"])),tag,classy("box",(0,prop_toolset.O)("border",this.borderless),(0,prop_toolset.O)("padding",this.paddingless)),tag)}}!function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(BoxLayout,"styles",[box_styles()]),window.customElements.define("xb-box",BoxLayout)},"./src/components/layout/box/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/layout/box/box.js")},"./src/styles/transition.styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit/index.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../xb-toolset/dist/to-array.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var DEFAULT_TRANSITION_CONFIG={property:"all",delay:"0s",duration:"0.25s",easing:"ease-in-out"};const __WEBPACK_DEFAULT_EXPORT__=function transition(configs){return(0,lit__WEBPACK_IMPORTED_MODULE_0__.$m)("transition: ".concat(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default()(configs).map((config=>function toTransition(config){var safeConfig=_objectSpread(_objectSpread({},DEFAULT_TRANSITION_CONFIG),config);return(0,lit__WEBPACK_IMPORTED_MODULE_0__.$m)("".concat(safeConfig.property," ").concat(safeConfig.duration," ").concat(safeConfig.easing," ").concat(safeConfig.delay))}(config))).join(", ")))}},"../../node_modules/@welingtonms/classy/dist/index.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function n(n,r,t){if(t||2===arguments.length)for(var e,o=0,u=r.length;o<u;o++)!e&&o in r||(e||(e=Array.prototype.slice.call(r,0,o)),e[o]=r[o]);return n.concat(e||Array.prototype.slice.call(r))}function r(n){return null!=n&&["object","function"].includes(typeof n)}function t(n){return null!=n&&"function"==typeof n}function e(n){return null==n?[]:Array.isArray(n)?n:[n]}function o(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var o=e(n);return function(n){for(var r=!1,u=function(u){for(var c=o[u],f=Object.keys(c),i=!0,a=function(r){var o=f[r],u=n[o];i=Array.isArray(c[o])?i&&e(u).every((function(n){return c[o].includes(n)})):t(c[o])?i&&Boolean(c[o](u)):i&&c[o]===u},l=0;l<f.length&&i;l++)a(l);r=r||i},c=0;c<o.length;c++)u(c);return r}}function u(r){return Object.keys(r||{}).reduce((function(t,e){return r[e]?n(n([],t,!0),[e],!1):t}),[]).join(" ")}function c(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];for(var e=[],o=0;o<n.length;o++){var c=n[o];r(c)?e=e.concat(u(c)):c&&e.push(String(c))}return e.join(" ")}function i(n){return{when:function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return o.apply(void 0,r)(n)},classy:c}}__webpack_require__.d(__webpack_exports__,{ZP:()=>i,yH:()=>c})},"../../node_modules/lit/static-html.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{dy:()=>n,i0:()=>i,s2:()=>o});var lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},o=t=>({_$litStatic$:t,r:e}),i=function i(t){for(var _len=arguments.length,r=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)r[_key-1]=arguments[_key];return{_$litStatic$:r.reduce(((r,e,l)=>r+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error("Value passed to 'literal' function must be a 'literal' result: ".concat(t,". Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security."))})(e)+t[l+1]),t[0]),r:e}},s=new Map,a=t=>function(r){for(var _len2=arguments.length,e=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)e[_key2-1]=arguments[_key2];for(var i,a,c,o=e.length,n=[],u=[],$=0,f=!1;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l(a));)c+=i+r[++$],f=!0;u.push(a),n.push(c),$++}if($===o&&n.push(r[o]),f){var _t=n.join("$$lit$$");void 0===(r=s.get(_t))&&(n.raw=n,s.set(_t,r=n)),e=u}return t(r,...e)},n=a(lit_html.dy);a(lit_html.YP)}}]);