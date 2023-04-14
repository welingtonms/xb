/*! For license information please see components-layout-reel-reel-stories.f5b5fdba.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[4089],{"./src/components/layout/reel/reel.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>reel_stories});var _templateObject,lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),arg_types=__webpack_require__("./src/common/arg-types.js"),static_html=(__webpack_require__("./src/components/layout/box/index.js"),__webpack_require__("../../node_modules/lit/static-html.js")),decorators=__webpack_require__("../../node_modules/lit/decorators.js"),ref=__webpack_require__("../../node_modules/lit/directives/ref.js"),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),prop_toolset=__webpack_require__("./src/common/prop-toolset.js"),base_layout=(__webpack_require__("./src/mixins/polymorphic/index.js"),__webpack_require__("./src/components/layout/base-layout.js")),lit=__webpack_require__("../../node_modules/lit/index.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js"),layout_styles=__webpack_require__("./src/styles/layout.styles.js");const reel_styles=function styles(){return[(0,layout_styles.Z)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-reel-background-color: initial;\n\t\t\t\t--xb-reel-border-color: ",";\n\t\t\t\t--xb-reel-border-style: none;\n\t\t\t\t--xb-reel-border-width: 1px;\n\t\t\t\t--xb-reel-color: unset;\n\t\t\t\t--xb-reel-margin: var( --xb-spacing-4 );\n\t\t\t\t--xb-reel-padding-x: ",";\n\t\t\t\t--xb-reel-padding-y: ",";\n\t\t\t\t--xb-reel-thumb-color: rgb( var( --xb-color-gray-700 ) );\n\t\t\t\t--xb-reel-track-color: rgb( var( --xb-color-gray-500 ) );\n\n\t\t\t\twidth: 100%;\n\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.reel {\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tdisplay: flex;\n\t\t\t\tblock-size: auto;\n\t\t\t\toverflow-x: auto;\n\t\t\t\toverflow-y: hidden;\n\t\t\t\tscrollbar-color: var( --xb-reel-thumb-color )\n\t\t\t\t\tvar( --xb-reel-track-color );\n\n\t\t\t\tborder: var( --xb-reel-border-width ) var( --xb-reel-border-style )\n\t\t\t\t\tvar( --xb-reel-border-color );\n\t\t\t\tcolor: var( --xb-reel-color );\n\t\t\t\tbackground-color: var( --xb-reel-background-color );\n\t\t\t}\n\n\t\t\t.xb-reel::-webkit-scrollbar {\n\t\t\t\tblock-size: var( --xb-spacing-4 );\n\t\t\t}\n\n\t\t\t.xb-reel::-webkit-scrollbar-track {\n\t\t\t\tbackground-color: var( --xb-reel-track-color );\n\t\t\t}\n\n\t\t\t.xb-reel::-webkit-scrollbar-thumb {\n\t\t\t\tbackground-color: var( --xb-reel-track-color );\n\t\t\t\tbackground-image: linear-gradient(\n\t\t\t\t\tvar( --xb-reel-track-color ) 0,\n\t\t\t\t\tvar( --xb-reel-track-color ) 0.25rem,\n\t\t\t\t\t#fff 0.25rem,\n\t\t\t\t\t#fff 0.75rem,\n\t\t\t\t\tvar( --xb-reel-track-color ) 0.75rem\n\t\t\t\t);\n\t\t\t}\n\n\t\t\t::slotted( * ) {\n\t\t\t\t",";\n\n\t\t\t\tflex: 0 0 auto;\n\t\t\t}\n\n\t\t\t::slotted( img ) {\n\t\t\t\tblock-size: 100%;\n\t\t\t\tflex-basis: auto;\n\t\t\t\twidth: auto;\n\t\t\t}\n\n\t\t\t::slotted( *:not( :first-child ) ) {\n\t\t\t\tmargin-inline-start: var( --xb-reel-margin );\n\t\t\t}\n\n\t\t\t.xb-reel.is-overflowing {\n\t\t\t\tpadding-block-end: var( --xb-reel-margin );\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-2"),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,padding_styles.px)("var(--xb-reel-padding-x)"),(0,padding_styles.py)("var(--xb-reel-padding-y)"),(0,typography_styles.Z)("body-1"))];var strings,raw};var reel_templateObject;function _getDecoratorsApi(){_getDecoratorsApi=function _getDecoratorsApi(){return api};var api={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function initializeInstanceElements(O,elements){["method","field"].forEach((function(kind){elements.forEach((function(element){element.kind===kind&&"own"===element.placement&&this.defineClassElement(O,element)}),this)}),this)},initializeClassElements:function initializeClassElements(F,elements){var proto=F.prototype;["method","field"].forEach((function(kind){elements.forEach((function(element){var placement=element.placement;if(element.kind===kind&&("static"===placement||"prototype"===placement)){var receiver="static"===placement?F:proto;this.defineClassElement(receiver,element)}}),this)}),this)},defineClassElement:function defineClassElement(receiver,element){var descriptor=element.descriptor;if("field"===element.kind){var initializer=element.initializer;descriptor={enumerable:descriptor.enumerable,writable:descriptor.writable,configurable:descriptor.configurable,value:void 0===initializer?void 0:initializer.call(receiver)}}Object.defineProperty(receiver,element.key,descriptor)},decorateClass:function decorateClass(elements,decorators){var newElements=[],finishers=[],placements={static:[],prototype:[],own:[]};if(elements.forEach((function(element){this.addElementPlacement(element,placements)}),this),elements.forEach((function(element){if(!_hasDecorators(element))return newElements.push(element);var elementFinishersExtras=this.decorateElement(element,placements);newElements.push(elementFinishersExtras.element),newElements.push.apply(newElements,elementFinishersExtras.extras),finishers.push.apply(finishers,elementFinishersExtras.finishers)}),this),!decorators)return{elements:newElements,finishers};var result=this.decorateConstructor(newElements,decorators);return finishers.push.apply(finishers,result.finishers),result.finishers=finishers,result},addElementPlacement:function addElementPlacement(element,placements,silent){var keys=placements[element.placement];if(!silent&&-1!==keys.indexOf(element.key))throw new TypeError("Duplicated element ("+element.key+")");keys.push(element.key)},decorateElement:function decorateElement(element,placements){for(var extras=[],finishers=[],decorators=element.decorators,i=decorators.length-1;i>=0;i--){var keys=placements[element.placement];keys.splice(keys.indexOf(element.key),1);var elementObject=this.fromElementDescriptor(element),elementFinisherExtras=this.toElementFinisherExtras((0,decorators[i])(elementObject)||elementObject);element=elementFinisherExtras.element,this.addElementPlacement(element,placements),elementFinisherExtras.finisher&&finishers.push(elementFinisherExtras.finisher);var newExtras=elementFinisherExtras.extras;if(newExtras){for(var j=0;j<newExtras.length;j++)this.addElementPlacement(newExtras[j],placements);extras.push.apply(extras,newExtras)}}return{element,finishers,extras}},decorateConstructor:function decorateConstructor(elements,decorators){for(var finishers=[],i=decorators.length-1;i>=0;i--){var obj=this.fromClassDescriptor(elements),elementsAndFinisher=this.toClassDescriptor((0,decorators[i])(obj)||obj);if(void 0!==elementsAndFinisher.finisher&&finishers.push(elementsAndFinisher.finisher),void 0!==elementsAndFinisher.elements){elements=elementsAndFinisher.elements;for(var j=0;j<elements.length-1;j++)for(var k=j+1;k<elements.length;k++)if(elements[j].key===elements[k].key&&elements[j].placement===elements[k].placement)throw new TypeError("Duplicated element ("+elements[j].key+")")}}return{elements,finishers}},fromElementDescriptor:function fromElementDescriptor(element){var obj={kind:element.kind,key:element.key,placement:element.placement,descriptor:element.descriptor};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===element.kind&&(obj.initializer=element.initializer),obj},toElementDescriptors:function toElementDescriptors(elementObjects){if(void 0!==elementObjects)return function _toArray(arr){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(elementObjects).map((function(elementObject){var element=this.toElementDescriptor(elementObject);return this.disallowProperty(elementObject,"finisher","An element descriptor"),this.disallowProperty(elementObject,"extras","An element descriptor"),element}),this)},toElementDescriptor:function toElementDescriptor(elementObject){var kind=String(elementObject.kind);if("method"!==kind&&"field"!==kind)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+kind+'"');var key=_toPropertyKey(elementObject.key),placement=String(elementObject.placement);if("static"!==placement&&"prototype"!==placement&&"own"!==placement)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+placement+'"');var descriptor=elementObject.descriptor;this.disallowProperty(elementObject,"elements","An element descriptor");var element={kind,key,placement,descriptor:Object.assign({},descriptor)};return"field"!==kind?this.disallowProperty(elementObject,"initializer","A method descriptor"):(this.disallowProperty(descriptor,"get","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"set","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"value","The property descriptor of a field descriptor"),element.initializer=elementObject.initializer),element},toElementFinisherExtras:function toElementFinisherExtras(elementObject){return{element:this.toElementDescriptor(elementObject),finisher:_optionalCallableProperty(elementObject,"finisher"),extras:this.toElementDescriptors(elementObject.extras)}},fromClassDescriptor:function fromClassDescriptor(elements){var obj={kind:"class",elements:elements.map(this.fromElementDescriptor,this)};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),obj},toClassDescriptor:function toClassDescriptor(obj){var kind=String(obj.kind);if("class"!==kind)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+kind+'"');this.disallowProperty(obj,"key","A class descriptor"),this.disallowProperty(obj,"placement","A class descriptor"),this.disallowProperty(obj,"descriptor","A class descriptor"),this.disallowProperty(obj,"initializer","A class descriptor"),this.disallowProperty(obj,"extras","A class descriptor");var finisher=_optionalCallableProperty(obj,"finisher");return{elements:this.toElementDescriptors(obj.elements),finisher}},runClassFinishers:function runClassFinishers(constructor,finishers){for(var i=0;i<finishers.length;i++){var newConstructor=(0,finishers[i])(constructor);if(void 0!==newConstructor){if("function"!=typeof newConstructor)throw new TypeError("Finishers must return a constructor.");constructor=newConstructor}}return constructor},disallowProperty:function disallowProperty(obj,name,objectType){if(void 0!==obj[name])throw new TypeError(objectType+" can't have a ."+name+" property.")}};return api}function _createElementDescriptor(def){var descriptor,key=_toPropertyKey(def.key);"method"===def.kind?descriptor={value:def.value,writable:!0,configurable:!0,enumerable:!1}:"get"===def.kind?descriptor={get:def.value,configurable:!0,enumerable:!1}:"set"===def.kind?descriptor={set:def.value,configurable:!0,enumerable:!1}:"field"===def.kind&&(descriptor={configurable:!0,writable:!0,enumerable:!0});var element={kind:"field"===def.kind?"field":"method",key,placement:def.static?"static":"field"===def.kind?"own":"prototype",descriptor};return def.decorators&&(element.decorators=def.decorators),"field"===def.kind&&(element.initializer=def.value),element}function _coalesceGetterSetter(element,other){void 0!==element.descriptor.get?other.descriptor.get=element.descriptor.get:other.descriptor.set=element.descriptor.set}function _hasDecorators(element){return element.decorators&&element.decorators.length}function _isDataDescriptor(desc){return void 0!==desc&&!(void 0===desc.value&&void 0===desc.writable)}function _optionalCallableProperty(obj,name){var value=obj[name];if(void 0!==value&&"function"!=typeof value)throw new TypeError("Expected '"+name+"' to be a function");return value}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _get(){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function _get(target,property,receiver){var base=function _superPropBase(object,property){for(;!Object.prototype.hasOwnProperty.call(object,property)&&null!==(object=_getPrototypeOf(object)););return object}(target,property);if(base){var desc=Object.getOwnPropertyDescriptor(base,property);return desc.get?desc.get.call(arguments.length<3?target:receiver):desc.value}},_get.apply(this,arguments)}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}var reel_stories_templateObject,_Playground$parameter,_Playground$parameter2,_Playground$parameter3,_Playground$parameter4,_Playground$parameter5;(function _decorate(decorators,factory,superClass,mixins){var api=_getDecoratorsApi();if(mixins)for(var i=0;i<mixins.length;i++)api=mixins[i](api);var r=factory((function initialize(O){api.initializeInstanceElements(O,decorated.elements)}),superClass),decorated=api.decorateClass(function _coalesceClassElements(elements){for(var newElements=[],isSameElement=function isSameElement(other){return"method"===other.kind&&other.key===element.key&&other.placement===element.placement},i=0;i<elements.length;i++){var other,element=elements[i];if("method"===element.kind&&(other=newElements.find(isSameElement)))if(_isDataDescriptor(element.descriptor)||_isDataDescriptor(other.descriptor)){if(_hasDecorators(element)||_hasDecorators(other))throw new ReferenceError("Duplicated methods ("+element.key+") can't be decorated.");other.descriptor=element.descriptor}else{if(_hasDecorators(element)){if(_hasDecorators(other))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+element.key+").");other.decorators=element.decorators}_coalesceGetterSetter(element,other)}else newElements.push(element)}return newElements}(r.d.map(_createElementDescriptor)),decorators);return api.initializeClassElements(r.F,decorated.elements),api.runClassFinishers(r.F,decorated.finishers)})([(0,decorators.Mo)("xb-reel")],(function(_initialize,_BaseLayout){class ReelLayout extends _BaseLayout{constructor(){super(...arguments),_initialize(this)}}return{F:ReelLayout,d:[{kind:"field",key:"element",value:()=>(0,ref.V)()},{kind:"field",static:!0,key:"styles",value:()=>[reel_styles()]},{kind:"method",key:"connectedCallback",value:function connectedCallback(){_get(_getPrototypeOf(ReelLayout.prototype),"connectedCallback",this).call(this),console.debug("[xb-reel]","connectedCallback"),this.resizeObserver=new ResizeObserver((entries=>{console.debug("[xb-reel]","resizeObserver"),this._toggleOverflowClass(entries[0].target)})),this.mutationObserver=new MutationObserver((entries=>{console.debug("[xb-reel]","mutationObserver"),this._toggleOverflowClass(entries[0].target)}))}},{kind:"method",key:"firstUpdated",value:function firstUpdated(){_get(_getPrototypeOf(ReelLayout.prototype),"firstUpdated",this).call(this),console.log("connectedCallback",this.element),this.resizeObserver.observe(this.element.value),this.mutationObserver.observe(this.element.value,{childList:!0})}},{kind:"method",key:"disconnectedCallback",value:function disconnectedCallback(){_get(_getPrototypeOf(ReelLayout.prototype),"disconnectedCallback",this).call(this),console.debug("[xb-reel]","disconnectedCallback"),this.resizeObserver.disconnect(),this.mutationObserver.disconnect()}},{kind:"method",key:"_toggleOverflowClass",value:function _toggleOverflowClass(elem){console.debug("[xb-reel]",elem.scrollWidth>elem.clientWidth),elem.classList.toggle("is-overflowing",elem.scrollWidth>elem.clientWidth)}},{kind:"method",key:"render",value:function render(){var{classy}=(0,index_esm.ZP)({}),tag=this.tag;return(0,static_html.dy)(reel_templateObject||(reel_templateObject=function reel_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<","\n\t\t\t\t","\n\t\t\t\tclass=","\n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</",">\n\t\t"])),tag,(0,ref.i)(this.element),classy("reel",(0,prop_toolset.O)("border",this.borderless),(0,prop_toolset.O)("padding",this.paddingless)),tag)}}]}}),base_layout.Z);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function reel_stories_toPropertyKey(arg){var key=function reel_stories_toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}const reel_stories={title:"Foundation/Layouts/reel",component:"xb-reel",argTypes:{paddingless:arg_types.Bz,borderless:arg_types.ON,children:{table:{disable:!0}}},parameters:{docs:{description:{component:"@type {import('../../../common/arg-types').Meta}"}}}};var Playground={render:args=>(0,lit_html.dy)(reel_stories_templateObject||(reel_stories_templateObject=function reel_stories_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(['\n        <xb-reel>\n            <div role="listitem">\n                <a class="cta" href="/path/to/home">Home</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/about">About</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/pricing">Pricing</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/docs">Documentation</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/testimonials">Testimonials</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/careers">Careers</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/forum">Forum</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/forum">Accessibility</a>\n            </div>\n        </xb-reel>\n    ']))),args:{paddingless:"none",borderless:"none"}};Playground.parameters=_objectSpread(_objectSpread({},Playground.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Playground$parameter=Playground.parameters)||void 0===_Playground$parameter?void 0:_Playground$parameter.docs),{},{source:_objectSpread({originalSource:'{\n  render: args => html`\n        <xb-reel>\n            <div role="listitem">\n                <a class="cta" href="/path/to/home">Home</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/about">About</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/pricing">Pricing</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/docs">Documentation</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/testimonials">Testimonials</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/careers">Careers</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/forum">Forum</a>\n            </div>\n            <div role="listitem">\n                <a class="cta" href="/path/to/forum">Accessibility</a>\n            </div>\n        </xb-reel>\n    `,\n  args: {\n    paddingless: \'none\',\n    borderless: \'none\'\n  }\n}'},null===(_Playground$parameter2=Playground.parameters)||void 0===_Playground$parameter2||null===(_Playground$parameter3=_Playground$parameter2.docs)||void 0===_Playground$parameter3?void 0:_Playground$parameter3.source),description:_objectSpread({story:"@type {import('../../../common/arg-types').StoryObj}"},null===(_Playground$parameter4=Playground.parameters)||void 0===_Playground$parameter4||null===(_Playground$parameter5=_Playground$parameter4.docs)||void 0===_Playground$parameter5?void 0:_Playground$parameter5.description)})});const __namedExportsOrder=["Playground"]},"./src/common/arg-types.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BJ:()=>SizeArg,Bz:()=>PaddinglessArg,Fr:()=>PlacementArg,ON:()=>BorderlessArg});var PlacementArg=Object.freeze({control:"select",options:["top","left","right","bottom","top-start","top-end","right-start","right-end","bottom-start","bottom-end","left-start","left-end"]}),SizeArg=Object.freeze({control:"select",options:["extra-small","small","medium","large"]}),PaddinglessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]}),BorderlessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]})},"./src/components/layout/box/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/layout/box/box.js")},"../../node_modules/@welingtonms/classy/dist/index.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function n(n,r,t){if(t||2===arguments.length)for(var e,o=0,u=r.length;o<u;o++)!e&&o in r||(e||(e=Array.prototype.slice.call(r,0,o)),e[o]=r[o]);return n.concat(e||Array.prototype.slice.call(r))}function r(n){return null!=n&&["object","function"].includes(typeof n)}function t(n){return null!=n&&"function"==typeof n}function e(n){return null==n?[]:Array.isArray(n)?n:[n]}function o(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var o=e(n);return function(n){for(var r=!1,u=function(u){for(var c=o[u],f=Object.keys(c),i=!0,a=function(r){var o=f[r],u=n[o];i=Array.isArray(c[o])?i&&e(u).every((function(n){return c[o].includes(n)})):t(c[o])?i&&Boolean(c[o](u)):i&&c[o]===u},l=0;l<f.length&&i;l++)a(l);r=r||i},c=0;c<o.length;c++)u(c);return r}}function u(r){return Object.keys(r||{}).reduce((function(t,e){return r[e]?n(n([],t,!0),[e],!1):t}),[]).join(" ")}function c(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];for(var e=[],o=0;o<n.length;o++){var c=n[o];r(c)?e=e.concat(u(c)):c&&e.push(String(c))}return e.join(" ")}function i(n){return{when:function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return o.apply(void 0,r)(n)},classy:c}}__webpack_require__.d(__webpack_exports__,{ZP:()=>i,yH:()=>c})},"../../node_modules/lit/directives/ref.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>ref_e,i:()=>ref_n});var lit_html=__webpack_require__("../../node_modules/lit/node_modules/lit-html/lit-html.js"),{I:l}=lit_html._$LH,directive_t_CHILD=2;class directive_i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}var async_directive_s=(i,t)=>{var e,o,r=i._$AN;if(void 0===r)return!1;for(var _i of r)null===(o=(e=_i)._$AO)||void 0===o||o.call(e,t,!1),async_directive_s(_i,t);return!0},o=i=>{var t,e;do{if(void 0===(t=i._$AM))break;(e=t._$AN).delete(i),i=t}while(0===(null==e?void 0:e.size))},async_directive_r=i=>{for(var _t;_t=i._$AM;i=_t){var _e=_t._$AN;if(void 0===_e)_t._$AN=_e=new Set;else if(_e.has(i))break;_e.add(i),async_directive_l(_t)}};function async_directive_n(i){void 0!==this._$AN?(o(this),this._$AM=i,async_directive_r(this)):this._$AM=i}function h(i){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(r))for(var _i2=e;_i2<r.length;_i2++)async_directive_s(r[_i2],!1),o(r[_i2]);else null!=r&&(async_directive_s(r,!1),o(r));else async_directive_s(this,i)}var async_directive_l=i=>{var t,s,o,r;i.type==directive_t_CHILD&&(null!==(t=(o=i)._$AP)&&void 0!==t||(o._$AP=h),null!==(s=(r=i)._$AQ)&&void 0!==s||(r._$AQ=async_directive_n))};class async_directive_c extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(i,t,e){super._$AT(i,t,e),async_directive_r(this),this.isConnected=i._$AU}_$AO(i){var e,r,t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];i!==this.isConnected&&(this.isConnected=i,i?null===(e=this.reconnected)||void 0===e||e.call(this):null===(r=this.disconnected)||void 0===r||r.call(this)),t&&(async_directive_s(this,i),o(this))}setValue(t){if((o=>void 0===o.strings)(this._$Ct))this._$Ct._$AI(t,this);else{var _i3=[...this._$Ct._$AH];_i3[this._$Ci]=t,this._$Ct._$AI(_i3,this,0)}}disconnected(){}reconnected(){}}var ref_e=()=>new ref_o;class ref_o{}var ref_h=new WeakMap,ref_n=(t=>function(){for(var _len=arguments.length,e=new Array(_len),_key=0;_key<_len;_key++)e[_key]=arguments[_key];return{_$litDirective$:t,values:e}})(class extends async_directive_c{render(t){return lit_html.Ld}update(t,_ref){var e,[s]=_ref,o=s!==this.G;return o&&void 0!==this.G&&this.ot(void 0),(o||this.rt!==this.lt)&&(this.G=s,this.ct=null===(e=t.options)||void 0===e?void 0:e.host,this.ot(this.lt=t.element)),lit_html.Ld}ot(i){var t;if("function"==typeof this.G){var _s=null!==(t=this.ct)&&void 0!==t?t:globalThis,_e=ref_h.get(_s);void 0===_e&&(_e=new WeakMap,ref_h.set(_s,_e)),void 0!==_e.get(this.G)&&this.G.call(this.ct,void 0),_e.set(this.G,i),void 0!==i&&this.G.call(this.ct,i)}else this.G.value=i}get rt(){var i,t,s;return"function"==typeof this.G?null===(t=ref_h.get(null!==(i=this.ct)&&void 0!==i?i:globalThis))||void 0===t?void 0:t.get(this.G):null===(s=this.G)||void 0===s?void 0:s.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}})},"../../node_modules/lit/static-html.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{dy:()=>n,i0:()=>i,s2:()=>o});var lit_html=__webpack_require__("../../node_modules/lit/node_modules/lit-html/lit-html.js"),e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},o=t=>({_$litStatic$:t,r:e}),i=function i(t){for(var _len=arguments.length,r=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)r[_key-1]=arguments[_key];return{_$litStatic$:r.reduce(((r,e,l)=>r+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error("Value passed to 'literal' function must be a 'literal' result: ".concat(t,". Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security."))})(e)+t[l+1]),t[0]),r:e}},s=new Map,a=t=>function(r){for(var _len2=arguments.length,e=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)e[_key2-1]=arguments[_key2];for(var i,a,c,o=e.length,n=[],u=[],$=0,f=!1;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l(a));)c+=i+r[++$],f=!0;u.push(a),n.push(c),$++}if($===o&&n.push(r[o]),f){var _t=n.join("$$lit$$");void 0===(r=s.get(_t))&&(n.raw=n,s.set(_t,r=n)),e=u}return t(r,...e)},n=a(lit_html.dy);a(lit_html.YP)}}]);