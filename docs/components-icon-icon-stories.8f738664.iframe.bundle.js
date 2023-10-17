/*! For license information please see components-icon-icon-stories.8f738664.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[4914,3090],{"../../node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"../../node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>DocsRenderer});var react=__webpack_require__("../../node_modules/react/index.js"),client=__webpack_require__("../../node_modules/react-dom/client.js"),nodes=new Map,WithCallback=({callback,children})=>{let once=(0,react.useRef)();return(0,react.useLayoutEffect)((()=>{once.current!==callback&&(once.current=callback,callback())}),[callback]),children},getReactRoot=async el=>{let root=nodes.get(el);return root||(root=client.createRoot(el),nodes.set(el,root)),root},dist=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:dist.bD,a:dist.Ct,...dist.lO},ErrorBoundary=class extends react.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:children}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=dist.WI;return new Promise(((resolve,reject)=>{__webpack_require__.e(1040).then(__webpack_require__.bind(__webpack_require__,"../../node_modules/@mdx-js/react/index.js")).then((({MDXProvider})=>(async(node,el)=>{let root=await getReactRoot(el);return new Promise((resolve=>{root.render(react.createElement(WithCallback,{callback:()=>resolve(null)},node))}))})(react.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react.createElement(MDXProvider,{components},react.createElement(TDocs,{context,docsParameter}))),element))).then((()=>resolve()))}))},this.unmount=element=>{((el,shouldUseNewRootApi)=>{let root=nodes.get(el);root&&(root.unmount(),nodes.delete(el))})(element)}}}},"../../node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Lo:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Lo,VZ:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.VZ,_R:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__._R,c6:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.c6,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_});__webpack_require__("../../node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs")},"./src/components/icon/icon.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _templateObject,_Playground$parameter,_Playground$parameter2,_Playground$parameter3,lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit-html/lit-html.js"),_welingtonms_xb_icons__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../xb-icons/dist/index.js"),_icon_api_mdx__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/icon/icon.api.mdx");__webpack_require__("./src/components/icon/icon.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}const __WEBPACK_DEFAULT_EXPORT__={title:"Components/icon",component:"xb-icon",argTypes:{name:{control:"select",options:Object.keys(_welingtonms_xb_icons__WEBPACK_IMPORTED_MODULE_1__.Z)},size:{control:{type:"number"}}},parameters:{docs:{page:_icon_api_mdx__WEBPACK_IMPORTED_MODULE_2__.default,description:{component:"@type {import('../../common/arg-types').Meta}"}}}};var Playground={args:{name:"star",size:32},render:args=>(0,lit_html__WEBPACK_IMPORTED_MODULE_0__.dy)(_templateObject||(_templateObject=function _taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(['\n        <xb-icon\n            name="','"\n            size="','"\n            style="--xb-icon-color: rgb(var(--xb-color-secondary-500));"\n        ></xb-icon>\n    '])),args.name,args.size)};Playground.parameters=_objectSpread(_objectSpread({},Playground.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Playground$parameter=Playground.parameters)||void 0===_Playground$parameter?void 0:_Playground$parameter.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    name: \'star\',\n    size: 32\n  },\n  render: args => html`\n        <xb-icon\n            name="${args.name}"\n            size="${args.size}"\n            style="--xb-icon-color: rgb(var(--xb-color-secondary-500));"\n        ></xb-icon>\n    `\n}'},null===(_Playground$parameter2=Playground.parameters)||void 0===_Playground$parameter2||null===(_Playground$parameter2=_Playground$parameter2.docs)||void 0===_Playground$parameter2?void 0:_Playground$parameter2.source),description:_objectSpread({story:"@type {IconStory}"},null===(_Playground$parameter3=Playground.parameters)||void 0===_Playground$parameter3||null===(_Playground$parameter3=_Playground$parameter3.docs)||void 0===_Playground$parameter3?void 0:_Playground$parameter3.description)})});const __namedExportsOrder=["Playground"]},"./src/common/xb-element.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>XBElement});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit/index.js"),_utils_events__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/utils/events.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}class XBElement extends lit__WEBPACK_IMPORTED_MODULE_0__.oi{constructor(){var _this;super(...arguments),_this=this,this.emit=function(name){var event=new CustomEvent(name,function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}({bubbles:!0,cancelable:!0,composed:!0,detail:{}},arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}));return _this.dispatchEvent(event),event},this.reemit=event=>(0,_utils_events__WEBPACK_IMPORTED_MODULE_1__.e)(this,event)}static get properties(){return{dir:{type:String},lang:{type:String}}}get tag(){return this.tagName.toLowerCase()}setBooleanAttribute(name,value){!0===value?this.setAttribute(name,!0):this.removeAttribute(name)}}},"./src/styles/transition.styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit/index.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../xb-toolset/dist/to-array.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__);function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var DEFAULT_TRANSITION_CONFIG={property:"all",delay:"0s",duration:"0.25s",easing:"ease-in-out"};const __WEBPACK_DEFAULT_EXPORT__=function transition(configs){return(0,lit__WEBPACK_IMPORTED_MODULE_0__.$m)("transition: ".concat(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default()(configs).map((config=>function toTransition(config){var safeConfig=_objectSpread(_objectSpread({},DEFAULT_TRANSITION_CONFIG),config);return(0,lit__WEBPACK_IMPORTED_MODULE_0__.$m)("".concat(safeConfig.property," ").concat(safeConfig.duration," ").concat(safeConfig.easing," ").concat(safeConfig.delay))}(config))).join(", ")))}},"./src/utils/events.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function redispatchEvent(element,event){!event.bubbles||element.shadowRoot&&!event.composed||event.stopPropagation();var copy=Reflect.construct(event.constructor,[event.type,event]),dispatched=element.dispatchEvent(copy);return dispatched||event.preventDefault(),dispatched}function isInsideElement(event,element){return element.shadowRoot?event.composedPath().includes(element):element.contains(event.target)}__webpack_require__.d(__webpack_exports__,{_:()=>isInsideElement,e:()=>redispatchEvent})},"../xb-toolset/dist/to-array-179a8996.js":(__unused_webpack_module,exports)=>{exports.toArray=function(r){return null==r?[]:Array.isArray(r)?r:[r]}},"../xb-toolset/dist/to-array.js":(module,__unused_webpack_exports,__webpack_require__)=>{var r=__webpack_require__("../xb-toolset/dist/to-array-179a8996.js");module.exports=r.toArray},"./src/components/icon/icon.api.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_Users_wms_repos_welingtonms_xb_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@mdx-js/react/lib/index.js"),_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@storybook/addon-docs/dist/index.mjs"),_welingtonms_xb_icons__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../xb-icons/dist/index.js");__webpack_require__("./src/components/icon/icon.js");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p","xb-icon":"xb-icon"},(0,_Users_wms_repos_welingtonms_xb_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__.ah)(),props.components),_component0=_components["xb-icon"];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"icon",children:"Icon"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Texts convey information necessary to guide users to perform any actions in an application."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.Lo,{children:Object.keys(_welingtonms_xb_icons__WEBPACK_IMPORTED_MODULE_3__.Z).map((icon=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__._R,{name:icon,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_component0,{name:icon})},icon)))})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_Users_wms_repos_welingtonms_xb_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"../../node_modules/lit/decorators.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Mo:()=>custom_element_e,Cb:()=>n,SB:()=>state_t});const custom_element_e=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return{kind:t,elements:s,finisher(n){customElements.define(e,n)}}})(e,n),i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,i)}},property_e=(i,e,n)=>{e.constructor.createProperty(n,i)};function n(n){return(t,o)=>void 0!==o?property_e(n,t,o):i(n,t)}function state_t(t){return n({...t,state:!0})}var query_assigned_elements_n;null===(query_assigned_elements_n=window.HTMLSlotElement)||void 0===query_assigned_elements_n||query_assigned_elements_n.prototype.assignedElements},"../../node_modules/react-dom/client.js":(__unused_webpack_module,exports,__webpack_require__)=>{var m=__webpack_require__("../../node_modules/react-dom/index.js");exports.createRoot=m.createRoot,exports.hydrateRoot=m.hydrateRoot},"../../node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("../../node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"../../node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("../../node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);