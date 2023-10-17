"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[8906],{"./src/components/form/checkbox/checkbox.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit=__webpack_require__("../../node_modules/lit/index.js"),decorators=__webpack_require__("../../node_modules/lit/decorators.js"),utils_slot=__webpack_require__("./src/utils/slot.js"),keyboard_support=__webpack_require__("./src/controllers/keyboard-support/index.js");const checkbox_controller=class CheckboxController{constructor(host){this.host=void 0,this.controllers=void 0,this.toggle=()=>{this.host.checked=!this.host.checked,this.host.setAttribute("data-previously-checked",String(this.host.checked))},this._handleClick=event=>{if(this.disabled)return event.stopPropagation(),void event.preventDefault();this.toggle()},this.host=host,this.controllers={keyboard:new keyboard_support.Z(host,{shortcut:{key:" "},handler:()=>{this.toggle()}})},this.host.addController(this)}hostConnected(){this.host.setAttribute("aria-checked",this.host.checked),this.host.setAttribute("data-previously-checked",this.host.checked),this.host.addEventListener("click",this._handleClick)}hostDisconnected(){this.host.removeEventListener("click",this._handleClick)}hostUpdate(){this.host.setAttribute("aria-checked",this.host.checked)}};function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function getState(checked,indeterminate){return indeterminate?"mixed":String(checked)}function hasGroup(checkbox){return checkbox.getAttribute("aria-controls")}const checkbox_group_controller=class CheckboxGroupController extends checkbox_controller{constructor(host){super(host),this.group=void 0,this.toggle=()=>{var state=getState(this.host.checked,this.host.indeterminate);"true"===state?this._setCheckboxGroup("false"):"false"===state&&this._groupHasPreviouslyChecked()?this._setCheckboxGroup("previous"):this._setCheckboxGroup("true"),this._updateMixedState()},this._groupHasPreviouslyChecked=()=>Array.from(this.group.values()).some((checkbox=>hasGroup(checkbox)?checkbox._controller._groupHasPreviouslyChecked():"true"===checkbox.getAttribute("data-previously-checked"))),this._setCheckboxGroup=value=>{for(var[,checkbox]of this.group)if(hasGroup(checkbox))checkbox._controller._setCheckboxGroup(value);else switch(value){case"previous":checkbox.checked="true"===checkbox.getAttribute("data-previously-checked");break;case"true":checkbox.checked=!0,checkbox.indeterminate=!1;break;default:checkbox.checked=!1,checkbox.indeterminate=!1}},this._handleChange=event=>{var{target}=event;target.matches("xb-checkbox")&&this._updateMixedState()},this._updateMixedState=()=>{var[newState]=this._consolidateGroupState();"true"===newState?(this.host.checked=!0,this.host.indeterminate=!1):"mixed"===newState?(this.host.checked=!1,this.host.indeterminate=!0):(this.host.checked=!1,this.host.indeterminate=!1),this.host.setAttribute("aria-checked",newState),this.host.setAttribute("data-previously-checked",newState)},this._consolidateGroupState=()=>{var counters={true:0,false:0};for(var[,checkbox]of this.group)if(hasGroup(checkbox)){var[,groupCounters]=checkbox._controller._consolidateGroupState();counters.true+=groupCounters.true,counters.false+=groupCounters.false}else{counters[getState(checkbox.checked,checkbox.indeterminate)]++}return[0===counters.true?"false":0===counters.false?"true":"mixed",counters]}}hostConnected(){var _this=this;return function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}((function*(){var promises=[];_this.group=new Map;for(var checkboxes=(_this.host.getAttribute("aria-controls")||"").split(/\s+/).map((id=>Boolean(id)&&document.querySelector("xb-checkbox#".concat(id)))).filter(Boolean),i=0;i<checkboxes.length;i+=1){var checkbox=checkboxes[i];promises.push(checkbox.updateCompleted),_this.group.set(checkbox.id,checkbox),checkbox.addEventListener("xb:change",_this._handleChange)}yield Promise.allSettled(promises),_this._updateMixedState(),_this.host.addEventListener("click",_this._handleClick)}))()}hostDisconnected(){for(var[,checkbox]of(super.hostDisconnected(),this.group))checkbox.removeEventListener("xb:change",this._handleChange)}hostUpdate(){var previousState=this.host.getAttribute("aria-checked"),newState=getState(this.host.checked,this.host.indeterminate);previousState&&previousState!==newState&&"mixed"!==newState&&this._setCheckboxGroup(newState)}};var _templateObject,with_id=__webpack_require__("./src/mixins/with-id/index.js"),xb_element=__webpack_require__("./src/common/xb-element.js"),margin_styles=(__webpack_require__("./src/components/icon/index.js"),__webpack_require__("./src/styles/margin.styles.js")),outline_styles=__webpack_require__("./src/styles/outline.styles.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),transition_styles=__webpack_require__("./src/styles/transition.styles.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js"),size_styles=__webpack_require__("./src/styles/size.styles.js");const checkbox_styles=function styles(){return[(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-checkbox-height: initial;\n\t\t\t\t/** https://accessibilityinsights.io/info-examples/web/needs-review/color-contrast/ */\n\t\t\t\t--xb-checkbox-background-color: ",";\n\t\t\t\t--xb-checkbox-outline-color: ",";\n\n\t\t\t\t",";\n\n\t\t\t\t",";\n\n\t\t\t\tcursor: pointer;\n\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-flow: row nowrap;\n\t\t\t\tgap: ",";\n\t\t\t\talign-items: center;\n\n\t\t\t\tborder: none;\n\t\t\t\tbackground: var( --xb-checkbox-background-color );\n\t\t\t\theight: var( --xb-checkbox-height );\n\n\t\t\t\t",";\n\n\t\t\t\tbox-sizing: border-box;\n\t\t\t}\n\n\t\t\t:host( :is( [aria-checked='true'], [aria-checked='mixed'] ) ) .check {\n\t\t\t\t--xb-global-color: ",";\n\n\t\t\t\tborder-color: ",";\n\t\t\t\tbackground-color: ",";\n\t\t\t}\n\n\t\t\t:host( [aria-checked='true'] ) xb-icon[name='check'],\n\t\t\t:host( [aria-checked='mixed'] ) xb-icon[name='remove'] {\n\t\t\t\tdisplay: inline-flex;\n\t\t\t}\n\n\t\t\t:host( [disabled] ) {\n\t\t\t\tpointer-events: none;\n\t\t\t\tuser-select: none;\n\t\t\t\topacity: 0.25;\n\n\t\t\t\tcursor: default;\n\t\t\t}\n\n\t\t\t:host( [disabled] ) ::slotted( * ) {\n\t\t\t\tpointer-events: none;\n\t\t\t\tuser-select: none;\n\t\t\t}\n\n\t\t\t:host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) {\n\t\t\t\toutline: none;\n\t\t\t}\n\n\t\t\t:host( :is( :focus, :focus-within, :focus-visible, .is-focused ) ) .check {\n\t\t\t\t--xb-checkbox-outline-color: ",";\n\t\t\t}\n\n\t\t\tslot[name='leading']::slotted( span ),\n\t\t\tslot[name='trailing']::slotted( span ) {\n\t\t\t\tdisplay: inline-flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t:host( :hover ) .check {\n\t\t\t\tborder-color: ",";\n\t\t\t}\n\n\t\t\t:host( :is( [aria-checked='true']:hover, [aria-checked='mixed']:hover ) ) .check {\n\t\t\t\tborder-color: ",";\n\t\t\t\tbackground-color: ",";\n\t\t\t}\n\n\t\t\t:host( :active ) .check {\n\t\t\t\tborder-color: ",";\n\t\t\t}\n\n\t\t\t:host( :is( [aria-checked='true']:active [aria-checked='mixed']:active ) ) .check {\n\t\t\t\tborder-color: ",";\n\t\t\t\tbackground-color: ",";\n\t\t\t}\n\n\t\t\t.check {\n\t\t\t\t",";\n\n\t\t\t\t",";\n\n\t\t\t\t--xb-global-color: ",";\n\n\t\t\t\tflex-shrink: 0;\n\t\t\t\tdisplay: inline-flex;\n\t\t\t\tjustify-content: center;\n\t\t\t\talign-items: center;\n\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tborder: 1px solid ",";\n\t\t\t\tbackground-color: ",";\n\t\t\t\tborder-radius: 4px;\n\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tblock-size: calc( 0.75 * var( --xb-checkbox-height ) );\n\t\t\t\tinline-size: calc( 0.75 * var( --xb-checkbox-height ) );\n\t\t\t}\n\n\t\t\txb-icon[name='check'],\n\t\t\txb-icon[name='remove'] {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-background"),(0,get_token.Z)("color-white",0),(0,transition_styles.Z)([{property:"color"},{property:"opacity"}]),(0,typography_styles.Z)("body-2"),(0,get_token.Z)("spacing-2"),(0,padding_styles.Z)((0,get_token.Z)("spacing-0")),(0,get_token.Z)("color-white"),(0,get_token.Z)("color-primary-300"),(0,get_token.Z)("color-primary-300"),(0,get_token.Z)("color-primary-200",.2),(0,padding_styles.Z)((0,get_token.Z)("spacing-0")),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,get_token.Z)("color-primary-500"),(0,get_token.Z)("color-primary-500"),(0,get_token.Z)("color-primary-500"),(0,get_token.Z)("color-primary-100"),(0,get_token.Z)("color-primary-100"),(0,get_token.Z)("color-primary-100"),(0,transition_styles.Z)([{property:"background-color"},{property:"border-color"},{property:"box-shadow"},{property:"outline"}]),(0,outline_styles.Z)("--xb-checkbox-outline-color"),(0,get_token.Z)("color-white",0),(0,padding_styles.Z)((0,get_token.Z)("spacing-0")),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,get_token.Z)("color-gray-400"),(0,get_token.Z)("color-white")),(0,size_styles.Z)({property:"--xb-checkbox-height"})];var strings,raw};var checkbox_templateObject;function _getDecoratorsApi(){_getDecoratorsApi=function _getDecoratorsApi(){return api};var api={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function initializeInstanceElements(O,elements){["method","field"].forEach((function(kind){elements.forEach((function(element){element.kind===kind&&"own"===element.placement&&this.defineClassElement(O,element)}),this)}),this)},initializeClassElements:function initializeClassElements(F,elements){var proto=F.prototype;["method","field"].forEach((function(kind){elements.forEach((function(element){var placement=element.placement;if(element.kind===kind&&("static"===placement||"prototype"===placement)){var receiver="static"===placement?F:proto;this.defineClassElement(receiver,element)}}),this)}),this)},defineClassElement:function defineClassElement(receiver,element){var descriptor=element.descriptor;if("field"===element.kind){var initializer=element.initializer;descriptor={enumerable:descriptor.enumerable,writable:descriptor.writable,configurable:descriptor.configurable,value:void 0===initializer?void 0:initializer.call(receiver)}}Object.defineProperty(receiver,element.key,descriptor)},decorateClass:function decorateClass(elements,decorators){var newElements=[],finishers=[],placements={static:[],prototype:[],own:[]};if(elements.forEach((function(element){this.addElementPlacement(element,placements)}),this),elements.forEach((function(element){if(!_hasDecorators(element))return newElements.push(element);var elementFinishersExtras=this.decorateElement(element,placements);newElements.push(elementFinishersExtras.element),newElements.push.apply(newElements,elementFinishersExtras.extras),finishers.push.apply(finishers,elementFinishersExtras.finishers)}),this),!decorators)return{elements:newElements,finishers};var result=this.decorateConstructor(newElements,decorators);return finishers.push.apply(finishers,result.finishers),result.finishers=finishers,result},addElementPlacement:function addElementPlacement(element,placements,silent){var keys=placements[element.placement];if(!silent&&-1!==keys.indexOf(element.key))throw new TypeError("Duplicated element ("+element.key+")");keys.push(element.key)},decorateElement:function decorateElement(element,placements){for(var extras=[],finishers=[],decorators=element.decorators,i=decorators.length-1;i>=0;i--){var keys=placements[element.placement];keys.splice(keys.indexOf(element.key),1);var elementObject=this.fromElementDescriptor(element),elementFinisherExtras=this.toElementFinisherExtras((0,decorators[i])(elementObject)||elementObject);element=elementFinisherExtras.element,this.addElementPlacement(element,placements),elementFinisherExtras.finisher&&finishers.push(elementFinisherExtras.finisher);var newExtras=elementFinisherExtras.extras;if(newExtras){for(var j=0;j<newExtras.length;j++)this.addElementPlacement(newExtras[j],placements);extras.push.apply(extras,newExtras)}}return{element,finishers,extras}},decorateConstructor:function decorateConstructor(elements,decorators){for(var finishers=[],i=decorators.length-1;i>=0;i--){var obj=this.fromClassDescriptor(elements),elementsAndFinisher=this.toClassDescriptor((0,decorators[i])(obj)||obj);if(void 0!==elementsAndFinisher.finisher&&finishers.push(elementsAndFinisher.finisher),void 0!==elementsAndFinisher.elements){elements=elementsAndFinisher.elements;for(var j=0;j<elements.length-1;j++)for(var k=j+1;k<elements.length;k++)if(elements[j].key===elements[k].key&&elements[j].placement===elements[k].placement)throw new TypeError("Duplicated element ("+elements[j].key+")")}}return{elements,finishers}},fromElementDescriptor:function fromElementDescriptor(element){var obj={kind:element.kind,key:element.key,placement:element.placement,descriptor:element.descriptor};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===element.kind&&(obj.initializer=element.initializer),obj},toElementDescriptors:function toElementDescriptors(elementObjects){if(void 0!==elementObjects)return function _toArray(arr){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(elementObjects).map((function(elementObject){var element=this.toElementDescriptor(elementObject);return this.disallowProperty(elementObject,"finisher","An element descriptor"),this.disallowProperty(elementObject,"extras","An element descriptor"),element}),this)},toElementDescriptor:function toElementDescriptor(elementObject){var kind=String(elementObject.kind);if("method"!==kind&&"field"!==kind)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+kind+'"');var key=_toPropertyKey(elementObject.key),placement=String(elementObject.placement);if("static"!==placement&&"prototype"!==placement&&"own"!==placement)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+placement+'"');var descriptor=elementObject.descriptor;this.disallowProperty(elementObject,"elements","An element descriptor");var element={kind,key,placement,descriptor:Object.assign({},descriptor)};return"field"!==kind?this.disallowProperty(elementObject,"initializer","A method descriptor"):(this.disallowProperty(descriptor,"get","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"set","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"value","The property descriptor of a field descriptor"),element.initializer=elementObject.initializer),element},toElementFinisherExtras:function toElementFinisherExtras(elementObject){return{element:this.toElementDescriptor(elementObject),finisher:_optionalCallableProperty(elementObject,"finisher"),extras:this.toElementDescriptors(elementObject.extras)}},fromClassDescriptor:function fromClassDescriptor(elements){var obj={kind:"class",elements:elements.map(this.fromElementDescriptor,this)};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),obj},toClassDescriptor:function toClassDescriptor(obj){var kind=String(obj.kind);if("class"!==kind)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+kind+'"');this.disallowProperty(obj,"key","A class descriptor"),this.disallowProperty(obj,"placement","A class descriptor"),this.disallowProperty(obj,"descriptor","A class descriptor"),this.disallowProperty(obj,"initializer","A class descriptor"),this.disallowProperty(obj,"extras","A class descriptor");var finisher=_optionalCallableProperty(obj,"finisher");return{elements:this.toElementDescriptors(obj.elements),finisher}},runClassFinishers:function runClassFinishers(constructor,finishers){for(var i=0;i<finishers.length;i++){var newConstructor=(0,finishers[i])(constructor);if(void 0!==newConstructor){if("function"!=typeof newConstructor)throw new TypeError("Finishers must return a constructor.");constructor=newConstructor}}return constructor},disallowProperty:function disallowProperty(obj,name,objectType){if(void 0!==obj[name])throw new TypeError(objectType+" can't have a ."+name+" property.")}};return api}function _createElementDescriptor(def){var descriptor,key=_toPropertyKey(def.key);"method"===def.kind?descriptor={value:def.value,writable:!0,configurable:!0,enumerable:!1}:"get"===def.kind?descriptor={get:def.value,configurable:!0,enumerable:!1}:"set"===def.kind?descriptor={set:def.value,configurable:!0,enumerable:!1}:"field"===def.kind&&(descriptor={configurable:!0,writable:!0,enumerable:!0});var element={kind:"field"===def.kind?"field":"method",key,placement:def.static?"static":"field"===def.kind?"own":"prototype",descriptor};return def.decorators&&(element.decorators=def.decorators),"field"===def.kind&&(element.initializer=def.value),element}function _coalesceGetterSetter(element,other){void 0!==element.descriptor.get?other.descriptor.get=element.descriptor.get:other.descriptor.set=element.descriptor.set}function _hasDecorators(element){return element.decorators&&element.decorators.length}function _isDataDescriptor(desc){return void 0!==desc&&!(void 0===desc.value&&void 0===desc.writable)}function _optionalCallableProperty(obj,name){var value=obj[name];if(void 0!==value&&"function"!=typeof value)throw new TypeError("Expected '"+name+"' to be a function");return value}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _get(){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function _get(target,property,receiver){var base=function _superPropBase(object,property){for(;!Object.prototype.hasOwnProperty.call(object,property)&&null!==(object=_getPrototypeOf(object)););return object}(target,property);if(base){var desc=Object.getOwnPropertyDescriptor(base,property);return desc.get?desc.get.call(arguments.length<3?target:receiver):desc.value}},_get.apply(this,arguments)}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}(function _decorate(decorators,factory,superClass,mixins){var api=_getDecoratorsApi();if(mixins)for(var i=0;i<mixins.length;i++)api=mixins[i](api);var r=factory((function initialize(O){api.initializeInstanceElements(O,decorated.elements)}),superClass),decorated=api.decorateClass(function _coalesceClassElements(elements){for(var newElements=[],isSameElement=function isSameElement(other){return"method"===other.kind&&other.key===element.key&&other.placement===element.placement},i=0;i<elements.length;i++){var other,element=elements[i];if("method"===element.kind&&(other=newElements.find(isSameElement)))if(_isDataDescriptor(element.descriptor)||_isDataDescriptor(other.descriptor)){if(_hasDecorators(element)||_hasDecorators(other))throw new ReferenceError("Duplicated methods ("+element.key+") can't be decorated.");other.descriptor=element.descriptor}else{if(_hasDecorators(element)){if(_hasDecorators(other))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+element.key+").");other.decorators=element.decorators}_coalesceGetterSetter(element,other)}else newElements.push(element)}return newElements}(r.d.map(_createElementDescriptor)),decorators);return api.initializeClassElements(r.F,decorated.elements),api.runClassFinishers(r.F,decorated.finishers)})([(0,decorators.Mo)("xb-checkbox")],(function(_initialize,_withID){class Checkbox extends _withID{constructor(){super(),_initialize(this),this.checked=!1,this.disabled=!1,this.size="extra-small"}}return{F:Checkbox,d:[{kind:"field",static:!0,key:"styles",value:()=>[checkbox_styles()]},{kind:"field",decorators:[(0,decorators.Cb)({type:Boolean,reflect:!0})],key:"disabled",value:void 0},{kind:"field",decorators:[(0,decorators.Cb)({type:Boolean,reflect:!0})],key:"checked",value:void 0},{kind:"field",decorators:[(0,decorators.Cb)({type:Boolean,reflect:!0})],key:"indeterminate",value:void 0},{kind:"field",decorators:[(0,decorators.Cb)({type:String,reflect:!0})],key:"size",value:void 0},{kind:"field",decorators:[(0,decorators.Cb)({type:String})],key:"value",value:void 0},{kind:"field",key:"_controller",value:void 0},{kind:"method",key:"connectedCallback",value:function connectedCallback(){this._controller=this.getAttribute("aria-controls")?new checkbox_group_controller(this):new checkbox_controller(this),this.setAttribute("role","checkbox"),this.setAttribute("tabindex",0),_get(_getPrototypeOf(Checkbox.prototype),"connectedCallback",this).call(this)}},{kind:"method",key:"firstUpdated",value:function firstUpdated(changedProperties){_get(_getPrototypeOf(Checkbox.prototype),"firstUpdated",this).call(this,changedProperties),this.value||(this.value=this.text())}},{kind:"method",key:"updated",value:function updated(changedProperties){_get(_getPrototypeOf(Checkbox.prototype),"updated",this).call(this,changedProperties),changedProperties.has("disabled")&&this.setBooleanAttribute("aria-disabled",this.disabled),null==changedProperties.get("checked")&&null==changedProperties.get("indeterminate")||this.emit("xb:change",{detail:{value:this.value,checked:Boolean(this.checked),indeterminate:Boolean(this.indeterminate)}})}},{kind:"method",key:"text",value:function text(){var _this$textContent,slot=this.shadowRoot.querySelector("slot:not([name])");return(0,utils_slot.F)(slot)||String(null!==(_this$textContent=this.textContent)&&void 0!==_this$textContent?_this$textContent:"").trim()}},{kind:"method",key:"render",value:function render(){return(0,lit.dy)(checkbox_templateObject||(checkbox_templateObject=function checkbox_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(['\n\t\t\t<span class="check">\n\t\t\t\t<xb-icon name="check"></xb-icon>\n\t\t\t\t<xb-icon name="remove"></xb-icon>\n\t\t\t</span>\n\t\t\t<slot name="leading"></slot>\n\t\t\t<slot></slot>\n\t\t\t<slot name="trailing"></slot>\n\t\t'])))}}]}}),(0,with_id.Z)(xb_element.Z))},"./src/components/icon/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/icon/icon.js")},"./src/components/layout/box/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/layout/box/box.js")},"./src/components/layout/stack/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/layout/stack/stack.js")},"./src/components/layout/stack/stack.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var _templateObject,lit=__webpack_require__("../../node_modules/lit/index.js"),decorators=__webpack_require__("../../node_modules/lit/decorators.js"),base_layout=__webpack_require__("./src/components/layout/base-layout.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),layout_styles=__webpack_require__("./src/styles/layout.styles.js");const stack_styles=function styles(){return[(0,layout_styles.Z)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-stack-align: flex-start;\n\t\t\t\t--xb-stack-background-color: initial;\n\t\t\t\t--xb-stack-border-color: ",";\n\t\t\t\t--xb-stack-border-style: none;\n\t\t\t\t--xb-stack-border-width: 1px;\n\t\t\t\t--xb-stack-border-radius: unset;\n\t\t\t\t--xb-stack-color: unset;\n\t\t\t\t--xb-stack-gap: ",";\n\t\t\t\t--xb-stack-justify: flex-start;\n\t\t\t\t--xb-stack-padding-x: ",";\n\t\t\t\t--xb-stack-padding-y: ",";\n\n\t\t\t\t",";\n\n\t\t\t\twidth: 100%;\n\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n\t\t\t\tjustify-content: var( --xb-stack-justify );\n\t\t\t\talign-items: var( --xb-stack-align );\n\t\t\t\tgap: var( --xb-stack-gap );\n\n\t\t\t\tborder: var( --xb-stack-border-width ) var( --xb-stack-border-style )\n\t\t\t\t\tvar( --xb-stack-border-color );\n\t\t\t\tborder-radius: var( --xb-stack-border-radius );\n\t\t\t\tcolor: var( --xb-stack-color );\n\t\t\t\tbackground-color: var( --xb-stack-background-color );\n\t\t\t}\n\n\t\t\t::slotted( * ) {\n\t\t\t\twidth: 100%;\n\t\t\t\tmargin-block: 0;\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-2"),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,margin_styles.Z)(0),(0,padding_styles.px)("var(--xb-stack-padding-x)"),(0,padding_styles.py)("var(--xb-stack-padding-y)"))];var strings,raw};var stack_templateObject;function _getDecoratorsApi(){_getDecoratorsApi=function _getDecoratorsApi(){return api};var api={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function initializeInstanceElements(O,elements){["method","field"].forEach((function(kind){elements.forEach((function(element){element.kind===kind&&"own"===element.placement&&this.defineClassElement(O,element)}),this)}),this)},initializeClassElements:function initializeClassElements(F,elements){var proto=F.prototype;["method","field"].forEach((function(kind){elements.forEach((function(element){var placement=element.placement;if(element.kind===kind&&("static"===placement||"prototype"===placement)){var receiver="static"===placement?F:proto;this.defineClassElement(receiver,element)}}),this)}),this)},defineClassElement:function defineClassElement(receiver,element){var descriptor=element.descriptor;if("field"===element.kind){var initializer=element.initializer;descriptor={enumerable:descriptor.enumerable,writable:descriptor.writable,configurable:descriptor.configurable,value:void 0===initializer?void 0:initializer.call(receiver)}}Object.defineProperty(receiver,element.key,descriptor)},decorateClass:function decorateClass(elements,decorators){var newElements=[],finishers=[],placements={static:[],prototype:[],own:[]};if(elements.forEach((function(element){this.addElementPlacement(element,placements)}),this),elements.forEach((function(element){if(!_hasDecorators(element))return newElements.push(element);var elementFinishersExtras=this.decorateElement(element,placements);newElements.push(elementFinishersExtras.element),newElements.push.apply(newElements,elementFinishersExtras.extras),finishers.push.apply(finishers,elementFinishersExtras.finishers)}),this),!decorators)return{elements:newElements,finishers};var result=this.decorateConstructor(newElements,decorators);return finishers.push.apply(finishers,result.finishers),result.finishers=finishers,result},addElementPlacement:function addElementPlacement(element,placements,silent){var keys=placements[element.placement];if(!silent&&-1!==keys.indexOf(element.key))throw new TypeError("Duplicated element ("+element.key+")");keys.push(element.key)},decorateElement:function decorateElement(element,placements){for(var extras=[],finishers=[],decorators=element.decorators,i=decorators.length-1;i>=0;i--){var keys=placements[element.placement];keys.splice(keys.indexOf(element.key),1);var elementObject=this.fromElementDescriptor(element),elementFinisherExtras=this.toElementFinisherExtras((0,decorators[i])(elementObject)||elementObject);element=elementFinisherExtras.element,this.addElementPlacement(element,placements),elementFinisherExtras.finisher&&finishers.push(elementFinisherExtras.finisher);var newExtras=elementFinisherExtras.extras;if(newExtras){for(var j=0;j<newExtras.length;j++)this.addElementPlacement(newExtras[j],placements);extras.push.apply(extras,newExtras)}}return{element,finishers,extras}},decorateConstructor:function decorateConstructor(elements,decorators){for(var finishers=[],i=decorators.length-1;i>=0;i--){var obj=this.fromClassDescriptor(elements),elementsAndFinisher=this.toClassDescriptor((0,decorators[i])(obj)||obj);if(void 0!==elementsAndFinisher.finisher&&finishers.push(elementsAndFinisher.finisher),void 0!==elementsAndFinisher.elements){elements=elementsAndFinisher.elements;for(var j=0;j<elements.length-1;j++)for(var k=j+1;k<elements.length;k++)if(elements[j].key===elements[k].key&&elements[j].placement===elements[k].placement)throw new TypeError("Duplicated element ("+elements[j].key+")")}}return{elements,finishers}},fromElementDescriptor:function fromElementDescriptor(element){var obj={kind:element.kind,key:element.key,placement:element.placement,descriptor:element.descriptor};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===element.kind&&(obj.initializer=element.initializer),obj},toElementDescriptors:function toElementDescriptors(elementObjects){if(void 0!==elementObjects)return function _toArray(arr){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(elementObjects).map((function(elementObject){var element=this.toElementDescriptor(elementObject);return this.disallowProperty(elementObject,"finisher","An element descriptor"),this.disallowProperty(elementObject,"extras","An element descriptor"),element}),this)},toElementDescriptor:function toElementDescriptor(elementObject){var kind=String(elementObject.kind);if("method"!==kind&&"field"!==kind)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+kind+'"');var key=_toPropertyKey(elementObject.key),placement=String(elementObject.placement);if("static"!==placement&&"prototype"!==placement&&"own"!==placement)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+placement+'"');var descriptor=elementObject.descriptor;this.disallowProperty(elementObject,"elements","An element descriptor");var element={kind,key,placement,descriptor:Object.assign({},descriptor)};return"field"!==kind?this.disallowProperty(elementObject,"initializer","A method descriptor"):(this.disallowProperty(descriptor,"get","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"set","The property descriptor of a field descriptor"),this.disallowProperty(descriptor,"value","The property descriptor of a field descriptor"),element.initializer=elementObject.initializer),element},toElementFinisherExtras:function toElementFinisherExtras(elementObject){return{element:this.toElementDescriptor(elementObject),finisher:_optionalCallableProperty(elementObject,"finisher"),extras:this.toElementDescriptors(elementObject.extras)}},fromClassDescriptor:function fromClassDescriptor(elements){var obj={kind:"class",elements:elements.map(this.fromElementDescriptor,this)};return Object.defineProperty(obj,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),obj},toClassDescriptor:function toClassDescriptor(obj){var kind=String(obj.kind);if("class"!==kind)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+kind+'"');this.disallowProperty(obj,"key","A class descriptor"),this.disallowProperty(obj,"placement","A class descriptor"),this.disallowProperty(obj,"descriptor","A class descriptor"),this.disallowProperty(obj,"initializer","A class descriptor"),this.disallowProperty(obj,"extras","A class descriptor");var finisher=_optionalCallableProperty(obj,"finisher");return{elements:this.toElementDescriptors(obj.elements),finisher}},runClassFinishers:function runClassFinishers(constructor,finishers){for(var i=0;i<finishers.length;i++){var newConstructor=(0,finishers[i])(constructor);if(void 0!==newConstructor){if("function"!=typeof newConstructor)throw new TypeError("Finishers must return a constructor.");constructor=newConstructor}}return constructor},disallowProperty:function disallowProperty(obj,name,objectType){if(void 0!==obj[name])throw new TypeError(objectType+" can't have a ."+name+" property.")}};return api}function _createElementDescriptor(def){var descriptor,key=_toPropertyKey(def.key);"method"===def.kind?descriptor={value:def.value,writable:!0,configurable:!0,enumerable:!1}:"get"===def.kind?descriptor={get:def.value,configurable:!0,enumerable:!1}:"set"===def.kind?descriptor={set:def.value,configurable:!0,enumerable:!1}:"field"===def.kind&&(descriptor={configurable:!0,writable:!0,enumerable:!0});var element={kind:"field"===def.kind?"field":"method",key,placement:def.static?"static":"field"===def.kind?"own":"prototype",descriptor};return def.decorators&&(element.decorators=def.decorators),"field"===def.kind&&(element.initializer=def.value),element}function _coalesceGetterSetter(element,other){void 0!==element.descriptor.get?other.descriptor.get=element.descriptor.get:other.descriptor.set=element.descriptor.set}function _hasDecorators(element){return element.decorators&&element.decorators.length}function _isDataDescriptor(desc){return void 0!==desc&&!(void 0===desc.value&&void 0===desc.writable)}function _optionalCallableProperty(obj,name){var value=obj[name];if(void 0!==value&&"function"!=typeof value)throw new TypeError("Expected '"+name+"' to be a function");return value}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}(function _decorate(decorators,factory,superClass,mixins){var api=_getDecoratorsApi();if(mixins)for(var i=0;i<mixins.length;i++)api=mixins[i](api);var r=factory((function initialize(O){api.initializeInstanceElements(O,decorated.elements)}),superClass),decorated=api.decorateClass(function _coalesceClassElements(elements){for(var newElements=[],isSameElement=function isSameElement(other){return"method"===other.kind&&other.key===element.key&&other.placement===element.placement},i=0;i<elements.length;i++){var other,element=elements[i];if("method"===element.kind&&(other=newElements.find(isSameElement)))if(_isDataDescriptor(element.descriptor)||_isDataDescriptor(other.descriptor)){if(_hasDecorators(element)||_hasDecorators(other))throw new ReferenceError("Duplicated methods ("+element.key+") can't be decorated.");other.descriptor=element.descriptor}else{if(_hasDecorators(element)){if(_hasDecorators(other))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+element.key+").");other.decorators=element.decorators}_coalesceGetterSetter(element,other)}else newElements.push(element)}return newElements}(r.d.map(_createElementDescriptor)),decorators);return api.initializeClassElements(r.F,decorated.elements),api.runClassFinishers(r.F,decorated.finishers)})([(0,decorators.Mo)("xb-stack")],(function(_initialize,_BaseLayout){return{F:class StackLayout extends _BaseLayout{constructor(){super(...arguments),_initialize(this)}},d:[{kind:"field",static:!0,key:"styles",value:()=>[stack_styles()]},{kind:"method",key:"render",value:function render(){return(0,lit.dy)(stack_templateObject||(stack_templateObject=function stack_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<slot></slot>\n\t\t"])))}}]}}),base_layout.Z)},"./src/utils/slot.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function getTextContent(slot){if(!slot)return"";var nodes=slot.assignedNodes({flatten:!0}),text="";return[...nodes].forEach((node=>{node.nodeType===Node.TEXT_NODE&&(text+=node.textContent)})),text.trim()}__webpack_require__.d(__webpack_exports__,{F:()=>getTextContent})}}]);