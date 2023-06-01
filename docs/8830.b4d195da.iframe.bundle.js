"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[8830],{"./src/common/selection-boundary.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit/decorators.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../xb-toolset/dist/to-array.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__),_welingtonms_xb_toolset_dist_selection__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../xb-toolset/dist/selection.js");function _getDecoratorsApi(){_getDecoratorsApi=function _getDecoratorsApi(){return api};var api={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function initializeInstanceElements(O,elements){["method","field"].forEach((function(kind){elements.forEach((function(element){element.kind===kind&&"own"===element.placement&&this.defineClassElement(O,element)}),this)}),this)},initializeClassElements:function initializeClassElements(F,elements){var proto=F.prototype;["method","field"].forEach((function(kind){elements.forEach((function(element){var placement=element.placement;if(element.kind===kind&&("static"===placement||"prototype"===placement)){var receiver="static"===placement?F:proto;this.defineClassElement(receiver,element)}}),this)}),this)},defineClassElement:function defineClassElement(receiver,element){var descriptor=element.descriptor;if("field"===element.kind){var initializer=element.initializer;descriptor={enumerable:descriptor.enumerable,writable:descriptor.writable,configurable:descriptor.configurable,value:void 0===initializer?void 0:initializer.call(receiver)}}Object.defineProperty(receiver,element.key,descriptor)},decorateClass:function decorateClass(elements,decorators){var newElements=[],finishers=[],placements={static:[],prototype:[],own:[]};if(elements.forEach((function(element){this.addElementPlacement(element,placements)}),this),elements.forEach((function(element){if(!_hasDecorators(element))return newElements.push(element);var elementFinishersExtras=this.decorateElement(element,placements);newElements.push(elementFinishersExtras.element),newElements.push.apply(newElements,elementFinishersExtras.extras),finishers.push.apply(finishers,elementFinishersExtras.finishers)}),this),!decorators)return{elements:newElements,finishers};var result=this.decorateConstructor(newElements,decorators);return finishers.push.apply(finishers,result.finishers),result.finishers=finishers,result},addElementPlacement:function addElementPlacement(element,placements,silent){var keys=placements[element.placement];if(!silent&&-1!==keys.indexOf(element.key))throw new TypeError("Duplicated element ("+element.key+")");keys.push(element.key)},decorateElement:function decorateElement(element,placements){for(var extras=[],finishers=[],decorators=element.decorators,i=decorators.length-1;i>=0;i--){var keys=placements[element.placement];keys.splice(keys.indexOf(element.key),1);var elementObject=this.fromElementDescriptor(element),elementFinisherExtras=this.toElementFinisherExtras((0,decorators[i])(elementObject)||elementObject);element=elementFinisherExtras.element,this.addElementPlacement(element,placements),elementFinisherExtras.finisher&&finishers.push(elementFinisherExtras.finisher);var newExtras=elementFinisherExtras.extras;if(newExtras){for(var j=0;j<newExtras.length;j++)this.addElementPlacement(newExtras[j],placements);extras.push.apply(extras,newExtras)}}return{element,finishers,extras}},decorateConstructor:function decorateConstructor(elements,decorators){for(var finishers=[],i=decorators.length-1;i>=0;i--){var obj=this.fromClassDescriptor(elements),elementsAndFinisher=this.toClassDescriptor((0,decorators[i])(obj)||obj);if(void 0!==elementsAndFinisher.finisher&&finishers.push(elementsAndFinisher.finisher),void 0!==elementsAndFinisher.elements){elements=elementsAndFinisher.elements;for(var j=0;j<elements.length-1;j++)for(var k=j+1;k<elements.length;k++)if(elements[j].key===elements[k].key&&elements[j].placement===elements[k].placement)throw new TypeError("Duplicated element ("+elements[j].key+")")}}return{elements,finishers}},fromElementDescriptor:function fromElementDescriptor(element){var obj={kind:element.kind,key:element.key,placement:element.placement,descriptor:element.descriptor};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===element.kind&&(obj.initializer=element.initializer),obj},toElementDescriptors:function toElementDescriptors(elementObjects){if(void 0!==elementObjects)return function _toArray(arr){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(elementObjects).map((function(elementObject){var element=this.toElementDescriptor(elementObject);return this.disallowProperty(elementObject,"finisher","An element descriptor"),this.disallowProperty(elementObject,"extras","An element descriptor"),element}),this)},toElementDescriptor:function toElementDescriptor(elementObject){var kind=String(elementObject.kind);if("method"!==kind&&"field"!==kind)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+kind+'"');var key=_toPropertyKey(elementObject.key),placement=String(elementObject.placement);if("static"!==placement&&"prototype"!==placement&&"own"!==placement)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+placement+'"');var descriptor=elementObject.descriptor;this.disallowProperty(elementObject,"elements","An element descriptor");var element={kind,key,placement,descriptor:Object.assign({},descriptor)};return"field"!==kind?this.disallowProperty(elementObject,"initializer","A method descriptor"):(this.disallowProperty(descriptor,"get","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"set","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"value","The property descriptor of a field descriptor"),element.initializer=elementObject.initializer),element},toElementFinisherExtras:function toElementFinisherExtras(elementObject){return{element:this.toElementDescriptor(elementObject),finisher:_optionalCallableProperty(elementObject,"finisher"),extras:this.toElementDescriptors(elementObject.extras)}},fromClassDescriptor:function fromClassDescriptor(elements){var obj={kind:"class",elements:elements.map(this.fromElementDescriptor,this)};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),obj},toClassDescriptor:function toClassDescriptor(obj){var kind=String(obj.kind);if("class"!==kind)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+kind+'"');this.disallowProperty(obj,"key","A class descriptor"),this.disallowProperty(obj,"placement","A class descriptor"),this.disallowProperty(obj,"descriptor","A class descriptor"),this.disallowProperty(obj,"initializer","A class descriptor"),this.disallowProperty(obj,"extras","A class descriptor");var finisher=_optionalCallableProperty(obj,"finisher");return{elements:this.toElementDescriptors(obj.elements),finisher}},runClassFinishers:function runClassFinishers(constructor,finishers){for(var i=0;i<finishers.length;i++){var newConstructor=(0,finishers[i])(constructor);if(void 0!==newConstructor){if("function"!=typeof newConstructor)throw new TypeError("Finishers must return a constructor.");constructor=newConstructor}}return constructor},disallowProperty:function disallowProperty(obj,name,objectType){if(void 0!==obj[name])throw new TypeError(objectType+" can't have a ."+name+" property.")}};return api}function _createElementDescriptor(def){var descriptor,key=_toPropertyKey(def.key);"method"===def.kind?descriptor={value:def.value,writable:!0,configurable:!0,enumerable:!1}:"get"===def.kind?descriptor={get:def.value,configurable:!0,enumerable:!1}:"set"===def.kind?descriptor={set:def.value,configurable:!0,enumerable:!1}:"field"===def.kind&&(descriptor={configurable:!0,writable:!0,enumerable:!0});var element={kind:"field"===def.kind?"field":"method",key,placement:def.static?"static":"field"===def.kind?"own":"prototype",descriptor};return def.decorators&&(element.decorators=def.decorators),"field"===def.kind&&(element.initializer=def.value),element}function _coalesceGetterSetter(element,other){void 0!==element.descriptor.get?other.descriptor.get=element.descriptor.get:other.descriptor.set=element.descriptor.set}function _hasDecorators(element){return element.decorators&&element.decorators.length}function _isDataDescriptor(desc){return void 0!==desc&&!(void 0===desc.value&&void 0===desc.writable)}function _optionalCallableProperty(obj,name){var value=obj[name];if(void 0!==value&&"function"!=typeof value)throw new TypeError("Expected '"+name+"' to be a function");return value}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _get(){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function _get(target,property,receiver){var base=function _superPropBase(object,property){for(;!Object.prototype.hasOwnProperty.call(object,property)&&null!==(object=_getPrototypeOf(object)););return object}(target,property);if(base){var desc=Object.getOwnPropertyDescriptor(base,property);return desc.get?desc.get.call(arguments.length<3?target:receiver):desc.value}},_get.apply(this,arguments)}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}const __WEBPACK_DEFAULT_EXPORT__=function _decorate(decorators,factory,superClass,mixins){var api=_getDecoratorsApi();if(mixins)for(var i=0;i<mixins.length;i++)api=mixins[i](api);var r=factory((function initialize(O){api.initializeInstanceElements(O,decorated.elements)}),superClass),decorated=api.decorateClass(function _coalesceClassElements(elements){for(var newElements=[],isSameElement=function isSameElement(other){return"method"===other.kind&&other.key===element.key&&other.placement===element.placement},i=0;i<elements.length;i++){var other,element=elements[i];if("method"===element.kind&&(other=newElements.find(isSameElement)))if(_isDataDescriptor(element.descriptor)||_isDataDescriptor(other.descriptor)){if(_hasDecorators(element)||_hasDecorators(other))throw new ReferenceError("Duplicated methods ("+element.key+") can't be decorated.");other.descriptor=element.descriptor}else{if(_hasDecorators(element)){if(_hasDecorators(other))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+element.key+").");other.decorators=element.decorators}_coalesceGetterSetter(element,other)}else newElements.push(element)}return newElements}(r.d.map(_createElementDescriptor)),decorators);return api.initializeClassElements(r.F,decorated.elements),api.runClassFinishers(r.F,decorated.finishers)}(null,(function(_initialize,_XBElement){class SelectionBoundary extends _XBElement{constructor(){super(),_initialize(this),this.listen="",this.selection=new Set,this.strategy=null,this.value=null}}return{F:SelectionBoundary,d:[{kind:"field",decorators:[(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.Cb)({type:String,reflect:!1,attribute:!1})],key:"listen",value:void 0},{kind:"field",decorators:[(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.Cb)({type:String})],key:"type",value:void 0},{kind:"field",decorators:[(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.Cb)()],key:"value",value:void 0},{kind:"field",decorators:[(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_0__.SB)()],key:"selection",value:void 0},{kind:"field",key:"strategy",value:void 0},{kind:"method",key:"connectedCallback",value:function connectedCallback(){_get(_getPrototypeOf(SelectionBoundary.prototype),"connectedCallback",this).call(this),""===this.listen&&console.warn("[selection-boundary] you forgot to set the selection event."),this.addEventListener(this.listen,this._handleSelection)}},{kind:"method",key:"disconnectedCallback",value:function disconnectedCallback(){_get(_getPrototypeOf(SelectionBoundary.prototype),"disconnectedCallback",this).call(this),this.removeEventListener(this.listen,this._handleSelection)}},{kind:"method",key:"update",value:function update(changedProperties){if((null==this.strategy||null!=this.type&&changedProperties.has("type"))&&(this.strategy=(0,_welingtonms_xb_toolset_dist_selection__WEBPACK_IMPORTED_MODULE_2__.ZP)({type:this.type}),this.selection=this.strategy.init(Array.from(this.selection))),changedProperties.has("value")){var value=this._toSelectionValue(this.value);this.selection=this.strategy.init(value)}_get(_getPrototypeOf(SelectionBoundary.prototype),"update",this).call(this,changedProperties)}},{kind:"method",key:"updated",value:function updated(changedProperties){changedProperties.has("selection")}},{kind:"method",key:"_toSelectionValue",value:function _toSelectionValue(value){return _welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default()(value)}},{kind:"field",key:"_handleSelection",value(){return event=>{var{detail:{type="toggle",value}}=event;if(null!=this.type)switch(type){case"select":this.selection=this.strategy.select(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default()(value),this.selection);break;case"unselect":this.selection=this.strategy.unselect(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default()(value),this.selection);break;default:this.selection=this.strategy.toggle(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default()(value),this.selection)}else console.warn("[selection-boundary] you forgot to set the selection type.")}}}]}}),__webpack_require__("./src/common/xb-element.js").Z)},"./src/components/layout/stack/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/layout/stack/stack.js")},"./src/components/layout/stack/stack.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var _templateObject,static_html=__webpack_require__("../../node_modules/lit/static-html.js"),decorators=__webpack_require__("../../node_modules/lit/decorators.js"),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),prop_toolset=__webpack_require__("./src/common/prop-toolset.js"),base_layout=(__webpack_require__("./src/mixins/polymorphic/index.js"),__webpack_require__("./src/components/layout/base-layout.js")),lit=__webpack_require__("../../node_modules/lit/index.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js"),layout_styles=__webpack_require__("./src/styles/layout.styles.js");const stack_styles=function styles(){return[(0,layout_styles.Z)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-stack-align: flex-start;\n\t\t\t\t--xb-stack-background-color: initial;\n\t\t\t\t--xb-stack-border-color: ",";\n\t\t\t\t--xb-stack-border-style: none;\n\t\t\t\t--xb-stack-border-width: 1px;\n\t\t\t\t--xb-stack-border-radius: unset;\n\t\t\t\t--xb-stack-color: unset;\n\t\t\t\t--xb-stack-gap: ",";\n\t\t\t\t--xb-stack-justify: flex-start;\n\t\t\t\t--xb-stack-padding-x: ",";\n\t\t\t\t--xb-stack-padding-y: ",";\n\t\t\t\t--xb-stack-min-width: initial;\n\t\t\t\t--xb-stack-max-height: initial;\n\t\t\t\t--xb-stack-overflow-y: initial;\n\n\t\t\t\t",";\n\n\t\t\t\tmin-width: var( --xb-stack-min-width );\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t.stack {\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n\t\t\t\tjustify-content: var( --xb-stack-justify );\n\t\t\t\talign-items: var( --xb-stack-align );\n\t\t\t\tgap: var( --xb-stack-gap );\n\n\t\t\t\tborder: var( --xb-stack-border-width ) var( --xb-stack-border-style )\n\t\t\t\t\tvar( --xb-stack-border-color );\n\t\t\t\tborder-radius: var( --xb-stack-border-radius );\n\t\t\t\tcolor: var( --xb-stack-color );\n\t\t\t\tbackground-color: var( --xb-stack-background-color );\n\n\t\t\t\tmin-width: var( --xb-stack-min-width );\n\n\t\t\t\tmax-height: var( --xb-stack-max-height );\n\t\t\t\toverflow-y: var( --xb-stack-overflow-y );\n\t\t\t}\n\n\t\t\t::slotted( * ) {\n\t\t\t\t",";\n\n\t\t\t\tmargin-block: 0;\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t::slotted( *:not( :first-child ) ) {\n\t\t\t\t/** using flexbox gap */\n\t\t\t\t/* margin-block-start: var( --xb-stack-gap ); */\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-2"),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,margin_styles.Z)(0),(0,padding_styles.px)("var(--xb-stack-padding-x)"),(0,padding_styles.py)("var(--xb-stack-padding-y)"),(0,typography_styles.Z)("body-1"))];var strings,raw};var stack_templateObject;function _getDecoratorsApi(){_getDecoratorsApi=function _getDecoratorsApi(){return api};var api={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function initializeInstanceElements(O,elements){["method","field"].forEach((function(kind){elements.forEach((function(element){element.kind===kind&&"own"===element.placement&&this.defineClassElement(O,element)}),this)}),this)},initializeClassElements:function initializeClassElements(F,elements){var proto=F.prototype;["method","field"].forEach((function(kind){elements.forEach((function(element){var placement=element.placement;if(element.kind===kind&&("static"===placement||"prototype"===placement)){var receiver="static"===placement?F:proto;this.defineClassElement(receiver,element)}}),this)}),this)},defineClassElement:function defineClassElement(receiver,element){var descriptor=element.descriptor;if("field"===element.kind){var initializer=element.initializer;descriptor={enumerable:descriptor.enumerable,writable:descriptor.writable,configurable:descriptor.configurable,value:void 0===initializer?void 0:initializer.call(receiver)}}Object.defineProperty(receiver,element.key,descriptor)},decorateClass:function decorateClass(elements,decorators){var newElements=[],finishers=[],placements={static:[],prototype:[],own:[]};if(elements.forEach((function(element){this.addElementPlacement(element,placements)}),this),elements.forEach((function(element){if(!_hasDecorators(element))return newElements.push(element);var elementFinishersExtras=this.decorateElement(element,placements);newElements.push(elementFinishersExtras.element),newElements.push.apply(newElements,elementFinishersExtras.extras),finishers.push.apply(finishers,elementFinishersExtras.finishers)}),this),!decorators)return{elements:newElements,finishers};var result=this.decorateConstructor(newElements,decorators);return finishers.push.apply(finishers,result.finishers),result.finishers=finishers,result},addElementPlacement:function addElementPlacement(element,placements,silent){var keys=placements[element.placement];if(!silent&&-1!==keys.indexOf(element.key))throw new TypeError("Duplicated element ("+element.key+")");keys.push(element.key)},decorateElement:function decorateElement(element,placements){for(var extras=[],finishers=[],decorators=element.decorators,i=decorators.length-1;i>=0;i--){var keys=placements[element.placement];keys.splice(keys.indexOf(element.key),1);var elementObject=this.fromElementDescriptor(element),elementFinisherExtras=this.toElementFinisherExtras((0,decorators[i])(elementObject)||elementObject);element=elementFinisherExtras.element,this.addElementPlacement(element,placements),elementFinisherExtras.finisher&&finishers.push(elementFinisherExtras.finisher);var newExtras=elementFinisherExtras.extras;if(newExtras){for(var j=0;j<newExtras.length;j++)this.addElementPlacement(newExtras[j],placements);extras.push.apply(extras,newExtras)}}return{element,finishers,extras}},decorateConstructor:function decorateConstructor(elements,decorators){for(var finishers=[],i=decorators.length-1;i>=0;i--){var obj=this.fromClassDescriptor(elements),elementsAndFinisher=this.toClassDescriptor((0,decorators[i])(obj)||obj);if(void 0!==elementsAndFinisher.finisher&&finishers.push(elementsAndFinisher.finisher),void 0!==elementsAndFinisher.elements){elements=elementsAndFinisher.elements;for(var j=0;j<elements.length-1;j++)for(var k=j+1;k<elements.length;k++)if(elements[j].key===elements[k].key&&elements[j].placement===elements[k].placement)throw new TypeError("Duplicated element ("+elements[j].key+")")}}return{elements,finishers}},fromElementDescriptor:function fromElementDescriptor(element){var obj={kind:element.kind,key:element.key,placement:element.placement,descriptor:element.descriptor};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===element.kind&&(obj.initializer=element.initializer),obj},toElementDescriptors:function toElementDescriptors(elementObjects){if(void 0!==elementObjects)return function _toArray(arr){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(elementObjects).map((function(elementObject){var element=this.toElementDescriptor(elementObject);return this.disallowProperty(elementObject,"finisher","An element descriptor"),this.disallowProperty(elementObject,"extras","An element descriptor"),element}),this)},toElementDescriptor:function toElementDescriptor(elementObject){var kind=String(elementObject.kind);if("method"!==kind&&"field"!==kind)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+kind+'"');var key=_toPropertyKey(elementObject.key),placement=String(elementObject.placement);if("static"!==placement&&"prototype"!==placement&&"own"!==placement)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+placement+'"');var descriptor=elementObject.descriptor;this.disallowProperty(elementObject,"elements","An element descriptor");var element={kind,key,placement,descriptor:Object.assign({},descriptor)};return"field"!==kind?this.disallowProperty(elementObject,"initializer","A method descriptor"):(this.disallowProperty(descriptor,"get","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"set","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"value","The property descriptor of a field descriptor"),element.initializer=elementObject.initializer),element},toElementFinisherExtras:function toElementFinisherExtras(elementObject){return{element:this.toElementDescriptor(elementObject),finisher:_optionalCallableProperty(elementObject,"finisher"),extras:this.toElementDescriptors(elementObject.extras)}},fromClassDescriptor:function fromClassDescriptor(elements){var obj={kind:"class",elements:elements.map(this.fromElementDescriptor,this)};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),obj},toClassDescriptor:function toClassDescriptor(obj){var kind=String(obj.kind);if("class"!==kind)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+kind+'"');this.disallowProperty(obj,"key","A class descriptor"),this.disallowProperty(obj,"placement","A class descriptor"),this.disallowProperty(obj,"descriptor","A class descriptor"),this.disallowProperty(obj,"initializer","A class descriptor"),this.disallowProperty(obj,"extras","A class descriptor");var finisher=_optionalCallableProperty(obj,"finisher");return{elements:this.toElementDescriptors(obj.elements),finisher}},runClassFinishers:function runClassFinishers(constructor,finishers){for(var i=0;i<finishers.length;i++){var newConstructor=(0,finishers[i])(constructor);if(void 0!==newConstructor){if("function"!=typeof newConstructor)throw new TypeError("Finishers must return a constructor.");constructor=newConstructor}}return constructor},disallowProperty:function disallowProperty(obj,name,objectType){if(void 0!==obj[name])throw new TypeError(objectType+" can't have a ."+name+" property.")}};return api}function _createElementDescriptor(def){var descriptor,key=_toPropertyKey(def.key);"method"===def.kind?descriptor={value:def.value,writable:!0,configurable:!0,enumerable:!1}:"get"===def.kind?descriptor={get:def.value,configurable:!0,enumerable:!1}:"set"===def.kind?descriptor={set:def.value,configurable:!0,enumerable:!1}:"field"===def.kind&&(descriptor={configurable:!0,writable:!0,enumerable:!0});var element={kind:"field"===def.kind?"field":"method",key,placement:def.static?"static":"field"===def.kind?"own":"prototype",descriptor};return def.decorators&&(element.decorators=def.decorators),"field"===def.kind&&(element.initializer=def.value),element}function _coalesceGetterSetter(element,other){void 0!==element.descriptor.get?other.descriptor.get=element.descriptor.get:other.descriptor.set=element.descriptor.set}function _hasDecorators(element){return element.decorators&&element.decorators.length}function _isDataDescriptor(desc){return void 0!==desc&&!(void 0===desc.value&&void 0===desc.writable)}function _optionalCallableProperty(obj,name){var value=obj[name];if(void 0!==value&&"function"!=typeof value)throw new TypeError("Expected '"+name+"' to be a function");return value}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}(function _decorate(decorators,factory,superClass,mixins){var api=_getDecoratorsApi();if(mixins)for(var i=0;i<mixins.length;i++)api=mixins[i](api);var r=factory((function initialize(O){api.initializeInstanceElements(O,decorated.elements)}),superClass),decorated=api.decorateClass(function _coalesceClassElements(elements){for(var newElements=[],isSameElement=function isSameElement(other){return"method"===other.kind&&other.key===element.key&&other.placement===element.placement},i=0;i<elements.length;i++){var other,element=elements[i];if("method"===element.kind&&(other=newElements.find(isSameElement)))if(_isDataDescriptor(element.descriptor)||_isDataDescriptor(other.descriptor)){if(_hasDecorators(element)||_hasDecorators(other))throw new ReferenceError("Duplicated methods ("+element.key+") can't be decorated.");other.descriptor=element.descriptor}else{if(_hasDecorators(element)){if(_hasDecorators(other))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+element.key+").");other.decorators=element.decorators}_coalesceGetterSetter(element,other)}else newElements.push(element)}return newElements}(r.d.map(_createElementDescriptor)),decorators);return api.initializeClassElements(r.F,decorated.elements),api.runClassFinishers(r.F,decorated.finishers)})([(0,decorators.Mo)("xb-stack")],(function(_initialize,_BaseLayout){return{F:class StackLayout extends _BaseLayout{constructor(){super(...arguments),_initialize(this)}},d:[{kind:"field",static:!0,key:"styles",value:()=>[stack_styles()]},{kind:"method",key:"render",value:function render(){var{classy}=(0,index_esm.ZP)({}),tag=this.tag;return(0,static_html.dy)(stack_templateObject||(stack_templateObject=function stack_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<","\n\t\t\t\tclass=","\n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</",">\n\t\t"])),tag,classy("stack",(0,prop_toolset.O)("border",this.borderless),(0,prop_toolset.O)("padding",this.paddingless)),tag)}}]}}),base_layout.Z)},"../xb-toolset/dist/selection.js":(__unused_webpack_module,exports,__webpack_require__)=>{var e=__webpack_require__("../xb-toolset/dist/to-array-179a8996.js");exports.Zz=["single","single-strict","multiple"],exports.ZP=function(t){var r,n=t.type;switch(void 0===n?"multiple":n){case"single":r={type:"single",init:function(e){return this.select(e,new Set)},select:function(t,r){var n=e.toArray(t);if(0==n.length)return r;var l=new Set;return l.add(String(n[n.length-1])),l},unselect:function(t,r){var n=e.toArray(t);if(0==n.length||0==r.size)return r;for(var l=new Set(r),u=0;u<n.length;u++)l.delete(String(n[u]));return l},toggle:function(t,r){var n=e.toArray(t);if(0==n.length)return r;for(var l=new Set,u=0;u<n.length;u++){var i=String(n[u]);r.has(i)||(l.clear(),l.add(i))}return l},reset:function(e){return null==e?new Set:e},value:function(e){return null==e||0===e.size?null:Array.from(e)[0]}};break;case"single-strict":r={type:"single-strict",init:function(e){return this.select(e,new Set)},select:function(t,r){var n=e.toArray(t);if(0==n.length)return r;var l=new Set;return l.add(String(n[n.length-1])),l},unselect:function(t,r){var n=e.toArray(t);if(0==n.length||0==r.size)return r;for(var l=new Set(r),u=0;u<n.length&&r.size>1;u++)l.delete(String(n[u]));return l},toggle:function(t,r){var n=e.toArray(t);if(0==n.length)return r;for(var l=new Set(r),u=0;u<n.length;u++){var i=String(n[u]);r.has(i)||(l.clear(),l.add(i))}return l},reset:function(e){return null==e?new Set:e},value:function(e){return null==e||0===e.size?null:Array.from(e)[0]}};break;default:r={type:"multiple",init:function(e){return this.select(e,new Set)},select:function(t,r){var n=e.toArray(t);if(0==n.length)return r;for(var l=new Set(r),u=0;u<n.length;u++)l.add(String(n[u]));return l},unselect:function(t,r){var n=e.toArray(t);if(0==n.length||0==r.size)return r;for(var l=new Set(r),u=0;u<n.length;u++)l.delete(String(n[u]));return l},toggle:function(t,r){var n=e.toArray(t);if(0==n.length)return r;for(var l=new Set(r),u=0;u<n.length;u++){var i=String(n[u]);r.has(i)?l.delete(i):l.add(i)}return l},reset:function(e){return null==e?new Set:e},value:function(e){return null==e||0===e.size?null:Array.from(e)}}}return Object.freeze(r)}}}]);