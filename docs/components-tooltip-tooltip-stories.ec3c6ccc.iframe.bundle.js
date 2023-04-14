"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[5761],{"./src/components/tooltip/tooltip.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>tooltip_stories});var lit=__webpack_require__("../../node_modules/lit/index.js"),arg_types=__webpack_require__("./src/common/arg-types.js"),decorators=(__webpack_require__("./src/components/button/index.js"),__webpack_require__("./src/components/icon/index.js"),__webpack_require__("./src/components/layout/box/index.js"),__webpack_require__("../../node_modules/lit/decorators.js")),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js");function trim(value){return String(value).trim()}function convertTriggerFromAttribute(value){return value?String(value).split(/[\s,]+/).map(trim).filter(Boolean):["hover"]}var _templateObject,keyboard=__webpack_require__("./src/common/keyboard.js"),floating_element=__webpack_require__("./src/common/floating-element/index.js"),get_token=__webpack_require__("./src/utils/get-token.js");const tooltip_styles=function styles(){return[(0,floating_element.D)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-popover-background-color: ",";\n\t\t\t\t--xb-popover-color: ",";\n\t\t\t\t--xb-popover-box-shadow: none;\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-800"),(0,get_token.Z)("color-white"))];var strings,raw};var tooltip_templateObject;__webpack_require__("./src/components/resize-observer/index.js");function _getDecoratorsApi(){_getDecoratorsApi=function _getDecoratorsApi(){return api};var api={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function initializeInstanceElements(O,elements){["method","field"].forEach((function(kind){elements.forEach((function(element){element.kind===kind&&"own"===element.placement&&this.defineClassElement(O,element)}),this)}),this)},initializeClassElements:function initializeClassElements(F,elements){var proto=F.prototype;["method","field"].forEach((function(kind){elements.forEach((function(element){var placement=element.placement;if(element.kind===kind&&("static"===placement||"prototype"===placement)){var receiver="static"===placement?F:proto;this.defineClassElement(receiver,element)}}),this)}),this)},defineClassElement:function defineClassElement(receiver,element){var descriptor=element.descriptor;if("field"===element.kind){var initializer=element.initializer;descriptor={enumerable:descriptor.enumerable,writable:descriptor.writable,configurable:descriptor.configurable,value:void 0===initializer?void 0:initializer.call(receiver)}}Object.defineProperty(receiver,element.key,descriptor)},decorateClass:function decorateClass(elements,decorators){var newElements=[],finishers=[],placements={static:[],prototype:[],own:[]};if(elements.forEach((function(element){this.addElementPlacement(element,placements)}),this),elements.forEach((function(element){if(!_hasDecorators(element))return newElements.push(element);var elementFinishersExtras=this.decorateElement(element,placements);newElements.push(elementFinishersExtras.element),newElements.push.apply(newElements,elementFinishersExtras.extras),finishers.push.apply(finishers,elementFinishersExtras.finishers)}),this),!decorators)return{elements:newElements,finishers};var result=this.decorateConstructor(newElements,decorators);return finishers.push.apply(finishers,result.finishers),result.finishers=finishers,result},addElementPlacement:function addElementPlacement(element,placements,silent){var keys=placements[element.placement];if(!silent&&-1!==keys.indexOf(element.key))throw new TypeError("Duplicated element ("+element.key+")");keys.push(element.key)},decorateElement:function decorateElement(element,placements){for(var extras=[],finishers=[],decorators=element.decorators,i=decorators.length-1;i>=0;i--){var keys=placements[element.placement];keys.splice(keys.indexOf(element.key),1);var elementObject=this.fromElementDescriptor(element),elementFinisherExtras=this.toElementFinisherExtras((0,decorators[i])(elementObject)||elementObject);element=elementFinisherExtras.element,this.addElementPlacement(element,placements),elementFinisherExtras.finisher&&finishers.push(elementFinisherExtras.finisher);var newExtras=elementFinisherExtras.extras;if(newExtras){for(var j=0;j<newExtras.length;j++)this.addElementPlacement(newExtras[j],placements);extras.push.apply(extras,newExtras)}}return{element,finishers,extras}},decorateConstructor:function decorateConstructor(elements,decorators){for(var finishers=[],i=decorators.length-1;i>=0;i--){var obj=this.fromClassDescriptor(elements),elementsAndFinisher=this.toClassDescriptor((0,decorators[i])(obj)||obj);if(void 0!==elementsAndFinisher.finisher&&finishers.push(elementsAndFinisher.finisher),void 0!==elementsAndFinisher.elements){elements=elementsAndFinisher.elements;for(var j=0;j<elements.length-1;j++)for(var k=j+1;k<elements.length;k++)if(elements[j].key===elements[k].key&&elements[j].placement===elements[k].placement)throw new TypeError("Duplicated element ("+elements[j].key+")")}}return{elements,finishers}},fromElementDescriptor:function fromElementDescriptor(element){var obj={kind:element.kind,key:element.key,placement:element.placement,descriptor:element.descriptor};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===element.kind&&(obj.initializer=element.initializer),obj},toElementDescriptors:function toElementDescriptors(elementObjects){if(void 0!==elementObjects)return function _toArray(arr){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(elementObjects).map((function(elementObject){var element=this.toElementDescriptor(elementObject);return this.disallowProperty(elementObject,"finisher","An element descriptor"),this.disallowProperty(elementObject,"extras","An element descriptor"),element}),this)},toElementDescriptor:function toElementDescriptor(elementObject){var kind=String(elementObject.kind);if("method"!==kind&&"field"!==kind)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+kind+'"');var key=_toPropertyKey(elementObject.key),placement=String(elementObject.placement);if("static"!==placement&&"prototype"!==placement&&"own"!==placement)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+placement+'"');var descriptor=elementObject.descriptor;this.disallowProperty(elementObject,"elements","An element descriptor");var element={kind,key,placement,descriptor:Object.assign({},descriptor)};return"field"!==kind?this.disallowProperty(elementObject,"initializer","A method descriptor"):(this.disallowProperty(descriptor,"get","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"set","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"value","The property descriptor of a field descriptor"),element.initializer=elementObject.initializer),element},toElementFinisherExtras:function toElementFinisherExtras(elementObject){return{element:this.toElementDescriptor(elementObject),finisher:_optionalCallableProperty(elementObject,"finisher"),extras:this.toElementDescriptors(elementObject.extras)}},fromClassDescriptor:function fromClassDescriptor(elements){var obj={kind:"class",elements:elements.map(this.fromElementDescriptor,this)};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),obj},toClassDescriptor:function toClassDescriptor(obj){var kind=String(obj.kind);if("class"!==kind)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+kind+'"');this.disallowProperty(obj,"key","A class descriptor"),this.disallowProperty(obj,"placement","A class descriptor"),this.disallowProperty(obj,"descriptor","A class descriptor"),this.disallowProperty(obj,"initializer","A class descriptor"),this.disallowProperty(obj,"extras","A class descriptor");var finisher=_optionalCallableProperty(obj,"finisher");return{elements:this.toElementDescriptors(obj.elements),finisher}},runClassFinishers:function runClassFinishers(constructor,finishers){for(var i=0;i<finishers.length;i++){var newConstructor=(0,finishers[i])(constructor);if(void 0!==newConstructor){if("function"!=typeof newConstructor)throw new TypeError("Finishers must return a constructor.");constructor=newConstructor}}return constructor},disallowProperty:function disallowProperty(obj,name,objectType){if(void 0!==obj[name])throw new TypeError(objectType+" can't have a ."+name+" property.")}};return api}function _createElementDescriptor(def){var descriptor,key=_toPropertyKey(def.key);"method"===def.kind?descriptor={value:def.value,writable:!0,configurable:!0,enumerable:!1}:"get"===def.kind?descriptor={get:def.value,configurable:!0,enumerable:!1}:"set"===def.kind?descriptor={set:def.value,configurable:!0,enumerable:!1}:"field"===def.kind&&(descriptor={configurable:!0,writable:!0,enumerable:!0});var element={kind:"field"===def.kind?"field":"method",key,placement:def.static?"static":"field"===def.kind?"own":"prototype",descriptor};return def.decorators&&(element.decorators=def.decorators),"field"===def.kind&&(element.initializer=def.value),element}function _coalesceGetterSetter(element,other){void 0!==element.descriptor.get?other.descriptor.get=element.descriptor.get:other.descriptor.set=element.descriptor.set}function _hasDecorators(element){return element.decorators&&element.decorators.length}function _isDataDescriptor(desc){return void 0!==desc&&!(void 0===desc.value&&void 0===desc.writable)}function _optionalCallableProperty(obj,name){var value=obj[name];if(void 0!==value&&"function"!=typeof value)throw new TypeError("Expected '"+name+"' to be a function");return value}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _get(){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function _get(target,property,receiver){var base=function _superPropBase(object,property){for(;!Object.prototype.hasOwnProperty.call(object,property)&&null!==(object=_getPrototypeOf(object)););return object}(target,property);if(base){var desc=Object.getOwnPropertyDescriptor(base,property);return desc.get?desc.get.call(arguments.length<3?target:receiver):desc.value}},_get.apply(this,arguments)}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}var tooltip_stories_templateObject,_Playground$parameter,_Playground$parameter2,_Playground$parameter3,_Playground$parameter4,_Playground$parameter5;(function _decorate(decorators,factory,superClass,mixins){var api=_getDecoratorsApi();if(mixins)for(var i=0;i<mixins.length;i++)api=mixins[i](api);var r=factory((function initialize(O){api.initializeInstanceElements(O,decorated.elements)}),superClass),decorated=api.decorateClass(function _coalesceClassElements(elements){for(var newElements=[],isSameElement=function isSameElement(other){return"method"===other.kind&&other.key===element.key&&other.placement===element.placement},i=0;i<elements.length;i++){var other,element=elements[i];if("method"===element.kind&&(other=newElements.find(isSameElement)))if(_isDataDescriptor(element.descriptor)||_isDataDescriptor(other.descriptor)){if(_hasDecorators(element)||_hasDecorators(other))throw new ReferenceError("Duplicated methods ("+element.key+") can't be decorated.");other.descriptor=element.descriptor}else{if(_hasDecorators(element)){if(_hasDecorators(other))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+element.key+").");other.decorators=element.decorators}_coalesceGetterSetter(element,other)}else newElements.push(element)}return newElements}(r.d.map(_createElementDescriptor)),decorators);return api.initializeClassElements(r.F,decorated.elements),api.runClassFinishers(r.F,decorated.finishers)})([(0,decorators.Mo)("xb-tooltip")],(function(_initialize,_FloatingElement){class Tooltip extends _FloatingElement{constructor(){super(),_initialize(this),this.trigger=["hover"],this._handleBlur=this._handleBlur.bind(this),this._handleClick=this._handleClick.bind(this),this._handleFocus=this._handleFocus.bind(this),this._handleKeyDown=this._handleKeyDown.bind(this),this._handleMouseOut=this._handleMouseOut.bind(this),this._handleMouseOver=this._handleMouseOver.bind(this)}}return{F:Tooltip,d:[{kind:"field",static:!0,key:"styles",value:()=>[tooltip_styles()]},{kind:"field",decorators:[(0,decorators.Cb)({converter:{fromAttribute:convertTriggerFromAttribute}})],key:"trigger",value:void 0},{kind:"method",key:"connectedCallback",value:function connectedCallback(){_get(_getPrototypeOf(Tooltip.prototype),"connectedCallback",this).call(this),this.updateComplete.then((()=>{this.addEventListener("blur",this._handleBlur,!0),this.addEventListener("click",this._handleClick),this.addEventListener("focus",this._handleFocus,!0),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("mouseout",this._handleMouseOut),this.addEventListener("mouseover",this._handleMouseOver)}))}},{kind:"method",key:"disconnectedCallback",value:function disconnectedCallback(){_get(_getPrototypeOf(Tooltip.prototype),"disconnectedCallback",this).call(this),this.removeEventListener("blur",this.handleBlur,!0),this.removeEventListener("focus",this.handleFocus,!0),this.removeEventListener("click",this.handleClick),this.removeEventListener("keydown",this.handleKeyDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut)}},{kind:"method",key:"render",value:function render(){var{classy}=(0,index_esm.ZP)({open:this.open});return(0,lit.dy)(tooltip_templateObject||(tooltip_templateObject=function tooltip_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(['\n\t\t\t<xb-resize-observer type="window" @xb-resize=','>\n\t\t\t\t<slot name="reference" aria-describedby="floating"></slot>\n\t\t\t\t<slot\n\t\t\t\t\tname="floating"\n\t\t\t\t\tid="floating"\n\t\t\t\t\trole="tooltip"\n\t\t\t\t\taria-live=',"\n\t\t\t\t></slot>\n\t\t\t</xb-resize-observer>\n\t\t"])),this.reposition,this.open?"polite":"off")}},{kind:"method",key:"_handleFocus",value:function _handleFocus(){this._hasTrigger("focus")&&this.show()}},{kind:"method",key:"_handleBlur",value:function _handleBlur(){this._hasTrigger("focus")&&this.hide()}},{kind:"method",key:"_handleClick",value:function _handleClick(){this._hasTrigger("click")&&this.toggle()}},{kind:"method",key:"_handleKeyDown",value:function _handleKeyDown(event){this.open&&(0,keyboard.Z)(event).is(["ESC"])&&(event.stopPropagation(),this.hide())}},{kind:"method",key:"_handleMouseOver",value:function _handleMouseOver(){this._hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.show()),450))}},{kind:"method",key:"_handleMouseOut",value:function _handleMouseOut(){this._hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.hide()),250))}},{kind:"method",key:"_hasTrigger",value:function _hasTrigger(triggerType){return this.trigger.includes(triggerType)}}]}}),floating_element.Z);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function tooltip_stories_toPropertyKey(arg){var key=function tooltip_stories_toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}const tooltip_stories={title:"Components/tooltip",component:"xb-tooltip",argTypes:{placement:arg_types.Fr,trigger:{control:"check",options:["click","hover","focus"]}},parameters:{docs:{description:{component:"@type {import('../../common/arg-types').Meta}"}}}};var Playground={render:args=>(0,lit.dy)(tooltip_stories_templateObject||(tooltip_stories_templateObject=function tooltip_stories_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n        <xb-tooltip placement="," trigger=",'>\n            <xb-button slot="reference" emphasis="ghost">\n                <xb-icon name="favorite" slot="leading"></xb-icon>\n            </xb-button>\n            <xb-box borderless slot="floating">Lorem ipsum dolor sit amet.</xb-box>\n        </xb-tooltip>\n    '])),args.placement,args.trigger),args:{placement:"bottom-start",trigger:"click"}};Playground.parameters=_objectSpread(_objectSpread({},Playground.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Playground$parameter=Playground.parameters)||void 0===_Playground$parameter?void 0:_Playground$parameter.docs),{},{source:_objectSpread({originalSource:'{\n  render: args => html`\n        <xb-tooltip placement=${args.placement} trigger=${args.trigger}>\n            <xb-button slot="reference" emphasis="ghost">\n                <xb-icon name="favorite" slot="leading"></xb-icon>\n            </xb-button>\n            <xb-box borderless slot="floating">Lorem ipsum dolor sit amet.</xb-box>\n        </xb-tooltip>\n    `,\n  args: {\n    placement: \'bottom-start\',\n    trigger: \'click\'\n  }\n}'},null===(_Playground$parameter2=Playground.parameters)||void 0===_Playground$parameter2||null===(_Playground$parameter3=_Playground$parameter2.docs)||void 0===_Playground$parameter3?void 0:_Playground$parameter3.source),description:_objectSpread({story:"@type {import('../../common/arg-types').StoryObj}"},null===(_Playground$parameter4=Playground.parameters)||void 0===_Playground$parameter4||null===(_Playground$parameter5=_Playground$parameter4.docs)||void 0===_Playground$parameter5?void 0:_Playground$parameter5.description)})});const __namedExportsOrder=["Playground"]},"./src/common/keyboard.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../xb-toolset/dist/to-array.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_0__),SUPPORTED_KEYS_ALT="Alt",SUPPORTED_KEYS_ARROW_DOWN="ArrowDown",SUPPORTED_KEYS_ARROW_LEFT="ArrowLeft",SUPPORTED_KEYS_ARROW_RIGHT="ArrowRight",SUPPORTED_KEYS_ARROW_UP="ArrowUp",SUPPORTED_KEYS_CONTROL="Control",SUPPORTED_KEYS_ENTER="Enter",SUPPORTED_KEYS_ESCAPE="Escape",SUPPORTED_KEYS_SHIFT="Shift",SUPPORTED_KEYS_SPACE=" ",SUPPORTED_KEYS_TAB="Tab",ALIASED_SUPPORTED_KEYS={alt:SUPPORTED_KEYS_ALT,Alt:SUPPORTED_KEYS_ALT,ALT:SUPPORTED_KEYS_ALT,ArrowDown:SUPPORTED_KEYS_ARROW_DOWN,arrowdown:SUPPORTED_KEYS_ARROW_DOWN,ARROW_DOWN:SUPPORTED_KEYS_ARROW_DOWN,ArrowLeft:SUPPORTED_KEYS_ARROW_LEFT,arrowleft:SUPPORTED_KEYS_ARROW_LEFT,ARROW_LEFT:SUPPORTED_KEYS_ARROW_LEFT,ArrowRight:SUPPORTED_KEYS_ARROW_RIGHT,arrowright:SUPPORTED_KEYS_ARROW_RIGHT,ARROW_RIGHT:SUPPORTED_KEYS_ARROW_RIGHT,ArrowUp:SUPPORTED_KEYS_ARROW_UP,arrowup:SUPPORTED_KEYS_ARROW_UP,ARROW_UP:SUPPORTED_KEYS_ARROW_UP,Control:SUPPORTED_KEYS_CONTROL,Control:SUPPORTED_KEYS_CONTROL,Ctrl:SUPPORTED_KEYS_CONTROL,ctrl:SUPPORTED_KEYS_CONTROL,CONTROL:SUPPORTED_KEYS_CONTROL,Enter:SUPPORTED_KEYS_ENTER,enter:SUPPORTED_KEYS_ENTER,ENTER:SUPPORTED_KEYS_ENTER,Escape:SUPPORTED_KEYS_ESCAPE,escape:SUPPORTED_KEYS_ESCAPE,esc:SUPPORTED_KEYS_ESCAPE,ESCAPE:SUPPORTED_KEYS_ESCAPE,ESC:SUPPORTED_KEYS_ESCAPE,Shift:SUPPORTED_KEYS_SHIFT,shift:SUPPORTED_KEYS_SHIFT,SHIFT:SUPPORTED_KEYS_SHIFT," ":SUPPORTED_KEYS_SPACE,space:SUPPORTED_KEYS_SPACE,SPACE:SUPPORTED_KEYS_SPACE,Tab:SUPPORTED_KEYS_TAB,tab:SUPPORTED_KEYS_TAB,TAB:SUPPORTED_KEYS_TAB};function aliased(alias){return ALIASED_SUPPORTED_KEYS[alias]||alias}function getEventKey(e){return e.keyCode>=37&&e.keyCode<=40&&0!==e.key.indexOf("Arrow")?"Arrow".concat(e.key):e.key}function KeyboardKey(e){var key=getEventKey(e);return{is(otherKeys){var expectedKeys=_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_0___default()(otherKeys).map((otherKey=>aliased(otherKey)));return _welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_0___default()(expectedKeys).includes(key)}}}KeyboardKey.getEventKey=getEventKey,KeyboardKey.getKey=aliased;const __WEBPACK_DEFAULT_EXPORT__=KeyboardKey},"./src/components/layout/box/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/layout/box/box.js")}}]);