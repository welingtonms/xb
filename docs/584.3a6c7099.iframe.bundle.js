"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[584],{"../../node_modules/@storybook/components/dist/WithTooltip-DY3TAT4Y.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WithToolTipState:()=>WithToolTipState,WithTooltip:()=>WithToolTipState,WithTooltipPure:()=>WithTooltipPure});var _chunk_3EFM6HRY_mjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@storybook/components/dist/chunk-3EFM6HRY.mjs"),_chunk_FD4M6EBV_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@storybook/components/dist/chunk-FD4M6EBV.mjs"),_chunk_NNAAFZ4U_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@storybook/components/dist/chunk-NNAAFZ4U.mjs"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/index.js"),react_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react-dom/index.js"),_storybook_theming__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@storybook/theming/dist/index.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/@storybook/global/dist/index.mjs"),memoizerific__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/memoizerific/memoizerific.js"),memoizerific__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(memoizerific__WEBPACK_IMPORTED_MODULE_5__),_storybook_theming__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@storybook/theming/dist/chunk-IWWAIZM3.mjs"),require_react_fast_compare=(0,_chunk_NNAAFZ4U_mjs__WEBPACK_IMPORTED_MODULE_0__.E)({"../../node_modules/react-fast-compare/index.js"(exports,module){var hasElementType=typeof Element<"u",hasMap="function"==typeof Map,hasSet="function"==typeof Set,hasArrayBuffer="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function equal(a,b){if(a===b)return!0;if(a&&b&&"object"==typeof a&&"object"==typeof b){if(a.constructor!==b.constructor)return!1;var length,i,keys,it;if(Array.isArray(a)){if((length=a.length)!=b.length)return!1;for(i=length;0!=i--;)if(!equal(a[i],b[i]))return!1;return!0}if(hasMap&&a instanceof Map&&b instanceof Map){if(a.size!==b.size)return!1;for(it=a.entries();!(i=it.next()).done;)if(!b.has(i.value[0]))return!1;for(it=a.entries();!(i=it.next()).done;)if(!equal(i.value[1],b.get(i.value[0])))return!1;return!0}if(hasSet&&a instanceof Set&&b instanceof Set){if(a.size!==b.size)return!1;for(it=a.entries();!(i=it.next()).done;)if(!b.has(i.value[0]))return!1;return!0}if(hasArrayBuffer&&ArrayBuffer.isView(a)&&ArrayBuffer.isView(b)){if((length=a.length)!=b.length)return!1;for(i=length;0!=i--;)if(a[i]!==b[i])return!1;return!0}if(a.constructor===RegExp)return a.source===b.source&&a.flags===b.flags;if(a.valueOf!==Object.prototype.valueOf)return a.valueOf()===b.valueOf();if(a.toString!==Object.prototype.toString)return a.toString()===b.toString();if((length=(keys=Object.keys(a)).length)!==Object.keys(b).length)return!1;for(i=length;0!=i--;)if(!Object.prototype.hasOwnProperty.call(b,keys[i]))return!1;if(hasElementType&&a instanceof Element)return!1;for(i=length;0!=i--;)if(("_owner"!==keys[i]&&"__v"!==keys[i]&&"__o"!==keys[i]||!a.$$typeof)&&!equal(a[keys[i]],b[keys[i]]))return!1;return!0}return a!=a&&b!=b}module.exports=function(a,b){try{return equal(a,b)}catch(error){if((error.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw error}}}}),fromEntries=function(entries){return entries.reduce((function(acc,_ref){var key=_ref[0],value=_ref[1];return acc[key]=value,acc}),{})},useIsomorphicLayoutEffect=typeof window<"u"&&window.document&&window.document.createElement?react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_1__.useEffect,import_react_fast_compare=(0,_chunk_NNAAFZ4U_mjs__WEBPACK_IMPORTED_MODULE_0__.v)(require_react_fast_compare()),EMPTY_MODIFIERS=[];function useGetLatest(val){var ref=react__WEBPACK_IMPORTED_MODULE_1__.useRef(val);return ref.current=val,react__WEBPACK_IMPORTED_MODULE_1__.useCallback((function(){return ref.current}),[])}var noop=function(){};function generateBoundingClientRect(x,y){return void 0===x&&(x=0),void 0===y&&(y=0),function(){return{width:0,height:0,top:y,right:x,bottom:y,left:x,x:0,y:0,toJSON:function(){return null}}}}var _excluded=["styles","attributes"],virtualElement={getBoundingClientRect:generateBoundingClientRect()},defaultConfig={closeOnOutsideClick:!0,closeOnTriggerHidden:!1,defaultVisible:!1,delayHide:0,delayShow:0,followCursor:!1,interactive:!1,mutationObserverOptions:{attributes:!0,childList:!0,subtree:!0},offset:[0,6],trigger:"hover"};function usePopperTooltip(config,popperOptions){var _popperProps$state,_popperProps$state$mo,_popperProps$state$mo2;void 0===config&&(config={}),void 0===popperOptions&&(popperOptions={});var finalConfig=Object.keys(defaultConfig).reduce((function(config2,key){var _extends2;return(0,_chunk_FD4M6EBV_mjs__WEBPACK_IMPORTED_MODULE_4__.j)({},config2,((_extends2={})[key]=void 0!==config2[key]?config2[key]:defaultConfig[key],_extends2))}),config),defaultModifiers=react__WEBPACK_IMPORTED_MODULE_1__.useMemo((function(){return[{name:"offset",options:{offset:finalConfig.offset}}]}),Array.isArray(finalConfig.offset)?finalConfig.offset:[]),finalPopperOptions=(0,_chunk_FD4M6EBV_mjs__WEBPACK_IMPORTED_MODULE_4__.j)({},popperOptions,{placement:popperOptions.placement||finalConfig.placement,modifiers:popperOptions.modifiers||defaultModifiers}),_React$useState=react__WEBPACK_IMPORTED_MODULE_1__.useState(null),triggerRef=_React$useState[0],setTriggerRef=_React$useState[1],_React$useState2=react__WEBPACK_IMPORTED_MODULE_1__.useState(null),tooltipRef=_React$useState2[0],setTooltipRef=_React$useState2[1],_useControlledState=function useControlledState(_ref){var initial=_ref.initial,value=_ref.value,_ref$onChange=_ref.onChange,onChange=void 0===_ref$onChange?noop:_ref$onChange;if(void 0===initial&&void 0===value)throw new TypeError('Either "value" or "initial" variable must be set. Now both are undefined');var _React$useState=react__WEBPACK_IMPORTED_MODULE_1__.useState(initial),state=_React$useState[0],setState=_React$useState[1],getLatest=useGetLatest(state),set=react__WEBPACK_IMPORTED_MODULE_1__.useCallback((function(updater){var state2=getLatest(),updatedState="function"==typeof updater?updater(state2):updater;"function"==typeof updatedState.persist&&updatedState.persist(),setState(updatedState),"function"==typeof onChange&&onChange(updatedState)}),[getLatest,onChange]),isControlled=void 0!==value;return[isControlled?value:state,isControlled?onChange:set]}({initial:finalConfig.defaultVisible,value:finalConfig.visible,onChange:finalConfig.onVisibleChange}),visible=_useControlledState[0],setVisible=_useControlledState[1],timer=react__WEBPACK_IMPORTED_MODULE_1__.useRef();react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){return function(){return clearTimeout(timer.current)}}),[]);var _usePopper=function(referenceElement,popperElement,options){void 0===options&&(options={});var prevOptions=react__WEBPACK_IMPORTED_MODULE_1__.useRef(null),optionsWithDefaults={onFirstUpdate:options.onFirstUpdate,placement:options.placement||"bottom",strategy:options.strategy||"absolute",modifiers:options.modifiers||EMPTY_MODIFIERS},_React$useState=react__WEBPACK_IMPORTED_MODULE_1__.useState({styles:{popper:{position:optionsWithDefaults.strategy,left:"0",top:"0"},arrow:{position:"absolute"}},attributes:{}}),state=_React$useState[0],setState=_React$useState[1],updateStateModifier=react__WEBPACK_IMPORTED_MODULE_1__.useMemo((function(){return{name:"updateState",enabled:!0,phase:"write",fn:function(_ref){var state2=_ref.state,elements=Object.keys(state2.elements);react_dom__WEBPACK_IMPORTED_MODULE_2__.flushSync((function(){setState({styles:fromEntries(elements.map((function(element){return[element,state2.styles[element]||{}]}))),attributes:fromEntries(elements.map((function(element){return[element,state2.attributes[element]]})))})}))},requires:["computeStyles"]}}),[]),popperOptions=react__WEBPACK_IMPORTED_MODULE_1__.useMemo((function(){var newOptions={onFirstUpdate:optionsWithDefaults.onFirstUpdate,placement:optionsWithDefaults.placement,strategy:optionsWithDefaults.strategy,modifiers:[].concat(optionsWithDefaults.modifiers,[updateStateModifier,{name:"applyStyles",enabled:!1}])};return(0,import_react_fast_compare.default)(prevOptions.current,newOptions)?prevOptions.current||newOptions:(prevOptions.current=newOptions,newOptions)}),[optionsWithDefaults.onFirstUpdate,optionsWithDefaults.placement,optionsWithDefaults.strategy,optionsWithDefaults.modifiers,updateStateModifier]),popperInstanceRef=react__WEBPACK_IMPORTED_MODULE_1__.useRef();return useIsomorphicLayoutEffect((function(){popperInstanceRef.current&&popperInstanceRef.current.setOptions(popperOptions)}),[popperOptions]),useIsomorphicLayoutEffect((function(){if(null!=referenceElement&&null!=popperElement){var popperInstance=(options.createPopper||_chunk_3EFM6HRY_mjs__WEBPACK_IMPORTED_MODULE_3__.f)(referenceElement,popperElement,popperOptions);return popperInstanceRef.current=popperInstance,function(){popperInstance.destroy(),popperInstanceRef.current=null}}}),[referenceElement,popperElement,options.createPopper]),{state:popperInstanceRef.current?popperInstanceRef.current.state:null,styles:state.styles,attributes:state.attributes,update:popperInstanceRef.current?popperInstanceRef.current.update:null,forceUpdate:popperInstanceRef.current?popperInstanceRef.current.forceUpdate:null}}(finalConfig.followCursor?virtualElement:triggerRef,tooltipRef,finalPopperOptions),styles=_usePopper.styles,attributes=_usePopper.attributes,popperProps=(0,_chunk_FD4M6EBV_mjs__WEBPACK_IMPORTED_MODULE_4__.B)(_usePopper,_excluded),update=popperProps.update,getLatest=useGetLatest({visible,triggerRef,tooltipRef,finalConfig}),isTriggeredBy=react__WEBPACK_IMPORTED_MODULE_1__.useCallback((function(trigger){return Array.isArray(finalConfig.trigger)?finalConfig.trigger.includes(trigger):finalConfig.trigger===trigger}),Array.isArray(finalConfig.trigger)?finalConfig.trigger:[finalConfig.trigger]),hideTooltip=react__WEBPACK_IMPORTED_MODULE_1__.useCallback((function(){clearTimeout(timer.current),timer.current=window.setTimeout((function(){return setVisible(!1)}),finalConfig.delayHide)}),[finalConfig.delayHide,setVisible]),showTooltip=react__WEBPACK_IMPORTED_MODULE_1__.useCallback((function(){clearTimeout(timer.current),timer.current=window.setTimeout((function(){return setVisible(!0)}),finalConfig.delayShow)}),[finalConfig.delayShow,setVisible]),toggleTooltip=react__WEBPACK_IMPORTED_MODULE_1__.useCallback((function(){getLatest().visible?hideTooltip():showTooltip()}),[getLatest,hideTooltip,showTooltip]);react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){if(getLatest().finalConfig.closeOnOutsideClick){var handleClickOutside=function(event){var _event$composedPath,_getLatest=getLatest(),tooltipRef2=_getLatest.tooltipRef,triggerRef2=_getLatest.triggerRef,target=(null==event.composedPath||null==(_event$composedPath=event.composedPath())?void 0:_event$composedPath[0])||event.target;target instanceof Node&&null!=tooltipRef2&&null!=triggerRef2&&!tooltipRef2.contains(target)&&!triggerRef2.contains(target)&&hideTooltip()};return document.addEventListener("mousedown",handleClickOutside),function(){return document.removeEventListener("mousedown",handleClickOutside)}}}),[getLatest,hideTooltip]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){if(null!=triggerRef&&isTriggeredBy("click"))return triggerRef.addEventListener("click",toggleTooltip),function(){return triggerRef.removeEventListener("click",toggleTooltip)}}),[triggerRef,isTriggeredBy,toggleTooltip]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){if(null!=triggerRef&&isTriggeredBy("double-click"))return triggerRef.addEventListener("dblclick",toggleTooltip),function(){return triggerRef.removeEventListener("dblclick",toggleTooltip)}}),[triggerRef,isTriggeredBy,toggleTooltip]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){if(null!=triggerRef&&isTriggeredBy("right-click")){var preventDefaultAndToggle=function(event){event.preventDefault(),toggleTooltip()};return triggerRef.addEventListener("contextmenu",preventDefaultAndToggle),function(){return triggerRef.removeEventListener("contextmenu",preventDefaultAndToggle)}}}),[triggerRef,isTriggeredBy,toggleTooltip]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){if(null!=triggerRef&&isTriggeredBy("focus"))return triggerRef.addEventListener("focus",showTooltip),triggerRef.addEventListener("blur",hideTooltip),function(){triggerRef.removeEventListener("focus",showTooltip),triggerRef.removeEventListener("blur",hideTooltip)}}),[triggerRef,isTriggeredBy,showTooltip,hideTooltip]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){if(null!=triggerRef&&isTriggeredBy("hover"))return triggerRef.addEventListener("mouseenter",showTooltip),triggerRef.addEventListener("mouseleave",hideTooltip),function(){triggerRef.removeEventListener("mouseenter",showTooltip),triggerRef.removeEventListener("mouseleave",hideTooltip)}}),[triggerRef,isTriggeredBy,showTooltip,hideTooltip]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){if(null!=tooltipRef&&isTriggeredBy("hover")&&getLatest().finalConfig.interactive)return tooltipRef.addEventListener("mouseenter",showTooltip),tooltipRef.addEventListener("mouseleave",hideTooltip),function(){tooltipRef.removeEventListener("mouseenter",showTooltip),tooltipRef.removeEventListener("mouseleave",hideTooltip)}}),[tooltipRef,isTriggeredBy,showTooltip,hideTooltip,getLatest]);var isReferenceHidden=null==popperProps||null==(_popperProps$state=popperProps.state)||null==(_popperProps$state$mo=_popperProps$state.modifiersData)||null==(_popperProps$state$mo2=_popperProps$state$mo.hide)?void 0:_popperProps$state$mo2.isReferenceHidden;react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){finalConfig.closeOnTriggerHidden&&isReferenceHidden&&hideTooltip()}),[finalConfig.closeOnTriggerHidden,hideTooltip,isReferenceHidden]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){if(finalConfig.followCursor&&null!=triggerRef)return triggerRef.addEventListener("mousemove",setMousePosition),function(){return triggerRef.removeEventListener("mousemove",setMousePosition)};function setMousePosition(_ref){var clientX=_ref.clientX,clientY=_ref.clientY;virtualElement.getBoundingClientRect=generateBoundingClientRect(clientX,clientY),update?.()}}),[finalConfig.followCursor,triggerRef,update]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){if(null!=tooltipRef&&null!=update&&null!=finalConfig.mutationObserverOptions){var observer=new MutationObserver(update);return observer.observe(tooltipRef,finalConfig.mutationObserverOptions),function(){return observer.disconnect()}}}),[finalConfig.mutationObserverOptions,tooltipRef,update]);return(0,_chunk_FD4M6EBV_mjs__WEBPACK_IMPORTED_MODULE_4__.j)({getArrowProps:function(args){return void 0===args&&(args={}),(0,_chunk_FD4M6EBV_mjs__WEBPACK_IMPORTED_MODULE_4__.j)({},args,attributes.arrow,{style:(0,_chunk_FD4M6EBV_mjs__WEBPACK_IMPORTED_MODULE_4__.j)({},args.style,styles.arrow),"data-popper-arrow":!0})},getTooltipProps:function(args){return void 0===args&&(args={}),(0,_chunk_FD4M6EBV_mjs__WEBPACK_IMPORTED_MODULE_4__.j)({},args,{style:(0,_chunk_FD4M6EBV_mjs__WEBPACK_IMPORTED_MODULE_4__.j)({},args.style,styles.popper)},attributes.popper,{"data-popper-interactive":finalConfig.interactive})},setTooltipRef,setTriggerRef,tooltipRef,triggerRef,visible},popperProps)}var match=memoizerific__WEBPACK_IMPORTED_MODULE_5___default()(1e3)(((requests,actual,value,fallback=0)=>actual.split("-")[0]===requests?value:fallback)),Arrow=_storybook_theming__WEBPACK_IMPORTED_MODULE_6__.styled.div({position:"absolute",borderStyle:"solid"},(({placement})=>{let x=0,y=0;switch(!0){case placement.startsWith("left")||placement.startsWith("right"):y=8;break;case placement.startsWith("top")||placement.startsWith("bottom"):x=8}return{transform:`translate3d(${x}px, ${y}px, 0px)`}}),(({theme,color,placement})=>({bottom:`${match("top",placement,"-8px","auto")}`,top:`${match("bottom",placement,"-8px","auto")}`,right:`${match("left",placement,"-8px","auto")}`,left:`${match("right",placement,"-8px","auto")}`,borderBottomWidth:`${match("top",placement,"0",8)}px`,borderTopWidth:`${match("bottom",placement,"0",8)}px`,borderRightWidth:`${match("left",placement,"0",8)}px`,borderLeftWidth:`${match("right",placement,"0",8)}px`,borderTopColor:match("top",placement,theme.color[color]||color||"light"===theme.base?(0,_storybook_theming__WEBPACK_IMPORTED_MODULE_7__.tG)(theme.background.app):theme.background.app,"transparent"),borderBottomColor:match("bottom",placement,theme.color[color]||color||"light"===theme.base?(0,_storybook_theming__WEBPACK_IMPORTED_MODULE_7__.tG)(theme.background.app):theme.background.app,"transparent"),borderLeftColor:match("left",placement,theme.color[color]||color||"light"===theme.base?(0,_storybook_theming__WEBPACK_IMPORTED_MODULE_7__.tG)(theme.background.app):theme.background.app,"transparent"),borderRightColor:match("right",placement,theme.color[color]||color||"light"===theme.base?(0,_storybook_theming__WEBPACK_IMPORTED_MODULE_7__.tG)(theme.background.app):theme.background.app,"transparent")}))),Wrapper=_storybook_theming__WEBPACK_IMPORTED_MODULE_6__.styled.div((({hidden})=>({display:hidden?"none":"inline-block",zIndex:2147483647})),(({theme,color,hasChrome})=>hasChrome?{background:theme.color[color]||color||"light"===theme.base?(0,_storybook_theming__WEBPACK_IMPORTED_MODULE_7__.tG)(theme.background.app):theme.background.app,filter:"\n            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))\n            drop-shadow(0 1px 3px rgba(0,0,0,0.1))\n          ",borderRadius:2*theme.appBorderRadius,fontSize:theme.typography.size.s1}:{})),Tooltip=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((({placement,hasChrome,children,arrowProps,tooltipRef,color,...props},ref)=>react__WEBPACK_IMPORTED_MODULE_1__.createElement(Wrapper,{hasChrome,ref,...props,color},hasChrome&&react__WEBPACK_IMPORTED_MODULE_1__.createElement(Arrow,{placement,...arrowProps,color}),children)));Tooltip.displayName="Tooltip",Tooltip.defaultProps={color:void 0,tooltipRef:void 0,hasChrome:!0,placement:"top",arrowProps:{}};var{document:document2}=_storybook_global__WEBPACK_IMPORTED_MODULE_8__.global,TargetContainer=_storybook_theming__WEBPACK_IMPORTED_MODULE_6__.styled.div`
  display: inline-block;
  cursor: ${props=>"hover"===props.mode?"default":"pointer"};
`,TargetSvgContainer=_storybook_theming__WEBPACK_IMPORTED_MODULE_6__.styled.g`
  cursor: ${props=>"hover"===props.mode?"default":"pointer"};
`,WithTooltipPure=({svg,trigger,closeOnClick,placement,modifiers,hasChrome,tooltip,children,tooltipShown,onVisibilityChange,...props})=>{let Container=svg?TargetSvgContainer:TargetContainer,{getArrowProps,getTooltipProps,setTooltipRef,setTriggerRef,visible,state}=usePopperTooltip({trigger,placement,defaultVisible:tooltipShown,closeOnOutsideClick:closeOnClick,onVisibleChange:onVisibilityChange},{modifiers});return react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_1__.createElement(Container,{mode:trigger,ref:setTriggerRef,...props},children),visible&&react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal(react__WEBPACK_IMPORTED_MODULE_1__.createElement(Tooltip,{placement:state?.placement,ref:setTooltipRef,hasChrome,arrowProps:getArrowProps(),...getTooltipProps()},"function"==typeof tooltip?tooltip({onHide:()=>onVisibilityChange(!1)}):tooltip),document2.body))};WithTooltipPure.defaultProps={svg:!1,trigger:"hover",closeOnClick:!1,placement:"top",modifiers:[{name:"preventOverflow",options:{padding:8}},{name:"offset",options:{offset:[8,8]}},{name:"arrow",options:{padding:8}}],hasChrome:!0,tooltipShown:!1};var WithToolTipState=({startOpen=!1,onVisibilityChange:onChange,...rest})=>{let[tooltipShown,setTooltipShown]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(startOpen),onVisibilityChange=(0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((visibility=>{onChange&&!1===onChange(visibility)||setTooltipShown(visibility)}),[onChange]);return(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((()=>{let hide=()=>onVisibilityChange(!1);document2.addEventListener("keydown",hide,!1);let iframes=Array.from(document2.getElementsByTagName("iframe")),unbinders=[];return iframes.forEach((iframe=>{let bind=()=>{try{iframe.contentWindow.document&&(iframe.contentWindow.document.addEventListener("click",hide),unbinders.push((()=>{try{iframe.contentWindow.document.removeEventListener("click",hide)}catch{}})))}catch{}};bind(),iframe.addEventListener("load",bind),unbinders.push((()=>{iframe.removeEventListener("load",bind)}))})),()=>{document2.removeEventListener("keydown",hide),unbinders.forEach((unbind=>{unbind()}))}})),react__WEBPACK_IMPORTED_MODULE_1__.createElement(WithTooltipPure,{...rest,tooltipShown,onVisibilityChange})}}}]);
//# sourceMappingURL=584.3a6c7099.iframe.bundle.js.map