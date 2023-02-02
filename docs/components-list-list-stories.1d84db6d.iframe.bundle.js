"use strict";(self.webpackChunk_welingtonms_xb_wc=self.webpackChunk_welingtonms_xb_wc||[]).push([[7439],{"./src/components/list/list.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>list_stories});var _templateObject,lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),arg_types=__webpack_require__("./src/common/arg-types.js"),lit=(__webpack_require__("./src/components/text/index.js"),__webpack_require__("../../node_modules/lit/index.js")),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),xb_element=__webpack_require__("./src/common/xb-element.js"),get_token=(__webpack_require__("./src/styles/padding.styles.js"),__webpack_require__("./src/utils/get-token.js")),transition_styles=__webpack_require__("./src/styles/transition.styles.js");const list_styles=function styles(){return[(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t}\n\n\t\t\t.list {\n\t\t\t\t--xb-stack-padding-x: ",";\n\t\t\t\t--xb-stack-padding-y: ",";\n\t\t\t\t--xb-stack-gap: ",";\n\n\t\t\t\t--xb-stack-background-color: ",";\n\t\t\t}\n\n\t\t\t::slotted( * ) {\n\t\t\t\t",";\n\n\t\t\t\theight: 100%;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t}\n\n\t\t\t.-striped ::slotted( :nth-of-type( odd ) ) {\n\t\t\t\t--xb-list-item-background-color: ",";\n\t\t\t}\n\n\t\t\t.-hoverable ::slotted( *:hover ) {\n\t\t\t\tcursor: pointer;\n\t\t\t\t--xb-list-item-background-color: ",";\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("spacing-0"),(0,get_token.Z)("spacing-0"),(0,get_token.Z)("spacing-0"),(0,get_token.Z)("color-white"),(0,transition_styles.Z)([{property:"background-color"},{property:"color"}]),(0,get_token.Z)("color-gray-100"),(0,get_token.Z)("color-gray-200"))];var strings,raw};var list_item_styles_templateObject;const list_item_styles=function list_item_styles_styles(){return[(0,lit.iv)(list_item_styles_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-list-item-background-color: initial;\n\t\t\t\t--xb-list-item-border-color: ",";\n\t\t\t\t--xb-list-item-border-style: dotted;\n\t\t\t\t--xb-list-item-border-width: 1px;\n\t\t\t\t--xb-list-item-color: unset;\n\t\t\t\t--xb-list-item-gap: ",";\n\t\t\t\t--xb-list-item-padding-x: ",";\n\t\t\t\t--xb-list-item-padding-y: ",";\n\t\t\t}\n\n\t\t\t.list-item {\n\t\t\t\t--xb-box-background-color: var( --xb-list-item-background-color );\n\n\t\t\t\tborder-top: none;\n\t\t\t\tborder-inline: none;\n\n\t\t\t\t--xb-box-border-style: var( --xb-list-item-border-style );\n\t\t\t\t--xb-box-color: var( --xb-list-item-color );\n\n\t\t\t\t--xb-box-padding-x: var( --xb-list-item-padding-x );\n\t\t\t\t--xb-box-padding-y: var( --xb-list-item-padding-y );\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),list_item_styles_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-4"),(0,get_token.Z)("spacing-2"))];var strings,raw};var list_item_templateObject,list_templateObject,list_stories_templateObject,_Playground$parameter,_Playground$parameter2,_Playground$parameter3;__webpack_require__("./src/components/layout/box/index.js");class ListItem extends lit.oi{static get properties(){return{as:{type:String},borderless:{},hoverable:{type:Boolean},striped:{type:Boolean}}}constructor(){super(),this.as="div",this.borderless="none",this.hoverable=!1,this.striped=!1}render(){var{classy}=(0,index_esm.ZP)({});return(0,lit.dy)(list_item_templateObject||(list_item_templateObject=function list_item_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(['\n\t\t\t<xb-box\n\t\t\t\tas="','"\n\t\t\t\tclass=',"\n\t\t\t\tborderless=","\n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</xb-box>\n\t\t"])),this.as,classy("list-item",{"-hoverable":this.hoverable,"-striped":this.striped}),this.borderless)}}!function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(ListItem,"styles",[list_item_styles()]),window.customElements.define("xb-list-item",ListItem);class List extends xb_element.Z{static get properties(){return{borderless:{},hoverable:{type:Boolean},striped:{type:Boolean}}}constructor(){super(),this.borderless=["horizontal","top"],this.hoverable=!1,this.striped=!1}updated(changedProperties){super.updated(changedProperties),changedProperties.has("borderless")&&this._getItems().forEach((item=>{item.borderless=this.borderless})),changedProperties.has("hoverable")&&this._getItems().forEach((item=>{item.hoverable=this.hoverable})),changedProperties.has("striped")&&this._getItems().forEach((item=>{item.striped=this.striped}))}render(){var{classy}=(0,index_esm.ZP)({});return(0,lit.dy)(list_templateObject||(list_templateObject=function list_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<xb-stack\n\t\t\t\tclass=","\n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</xb-stack>\n\t\t"])),classy("list",{"-hoverable":this.hoverable,"-striped":this.striped}))}_getItems(){var _this$_defaultSlot;return this._defaultSlot=null!==(_this$_defaultSlot=this._defaultSlot)&&void 0!==_this$_defaultSlot?_this$_defaultSlot:this.shadowRoot.querySelector("slot"),[...this._defaultSlot.assignedElements()]}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){list_stories_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function list_stories_defineProperty(obj,key,value){return(key=function list_stories_toPropertyKey(arg){var key=function list_stories_toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}!function list_defineProperty(obj,key,value){return(key=function list_toPropertyKey(arg){var key=function list_toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(List,"styles",[list_styles()]),window.customElements.define("xb-list",List);const list_stories={title:"Components/list",component:"xb-list",argTypes:{borderless:arg_types.ON,hoverable:{control:{type:"boolean"}},striped:{control:{type:"boolean"}}},parameters:{}};var Playground={render:args=>(0,lit_html.dy)(list_stories_templateObject||(list_stories_templateObject=function list_stories_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n        <xb-list\n            borderless=","\n            ?hoverable=","\n            ?striped=",'\n        >\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">In bibendum egestas condimentum.</xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    Etiam nec lacinia purus, eget pulvinar odio.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    Mauris nec nisl rhoncus, dictum neque vitae, fermentum dui.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">Quisque sed exjusto.</xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    In sed mollis purus, quis tristique sapien.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    Maecenas luctus nisi quis purus rutrum, non cursus libero\n                    sollicitudin.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">Etiam a fermentum magna.</xb-text>\n            </xb-list-item>\n        </xb-list>\n    '])),args.borderless,args.hoverable,args.striped),args:{hoverable:!0,striped:!0}};Playground.parameters=_objectSpread(_objectSpread({},Playground.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Playground$parameter=Playground.parameters)||void 0===_Playground$parameter?void 0:_Playground$parameter.docs),{},{source:_objectSpread({originalSource:'{\n  render: args => html`\n        <xb-list\n            borderless=${args.borderless}\n            ?hoverable=${args.hoverable}\n            ?striped=${args.striped}\n        >\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">In bibendum egestas condimentum.</xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    Etiam nec lacinia purus, eget pulvinar odio.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    Mauris nec nisl rhoncus, dictum neque vitae, fermentum dui.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">Quisque sed exjusto.</xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    In sed mollis purus, quis tristique sapien.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">\n                    Maecenas luctus nisi quis purus rutrum, non cursus libero\n                    sollicitudin.\n                </xb-text>\n            </xb-list-item>\n            <xb-list-item>\n                <xb-text variant="body-2">Etiam a fermentum magna.</xb-text>\n            </xb-list-item>\n        </xb-list>\n    `,\n  args: {\n    hoverable: true,\n    striped: true\n  }\n}'},null===(_Playground$parameter2=Playground.parameters)||void 0===_Playground$parameter2||null===(_Playground$parameter3=_Playground$parameter2.docs)||void 0===_Playground$parameter3?void 0:_Playground$parameter3.source)})});const __namedExportsOrder=["Playground"]},"./src/common/arg-types.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BJ:()=>SizeArg,Bz:()=>PaddinglessArg,Fr:()=>PlacementArg,ON:()=>BorderlessArg});var PlacementArg=Object.freeze({control:"select",options:["top","left","right","bottom","top-start","top-end","right-start","right-end","bottom-start","bottom-end","left-start","left-end"]}),SizeArg=Object.freeze({control:"select",options:["extra-small","small","medium","large"]}),PaddinglessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]}),BorderlessArg=Object.freeze({control:"select",options:["none","horizontal","vertical","top","right","bottom","left"]})},"./src/components/layout/box/box.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var _templateObject,static_html=__webpack_require__("../../node_modules/lit/static-html.js"),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),prop_toolset=__webpack_require__("./src/common/prop-toolset.js"),base_layout=(__webpack_require__("./src/mixins/polymorphic/index.js"),__webpack_require__("./src/components/layout/base-layout.js")),lit=__webpack_require__("../../node_modules/lit/index.js"),padding_styles=__webpack_require__("./src/styles/padding.styles.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),transition_styles=__webpack_require__("./src/styles/transition.styles.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js"),layout_styles=__webpack_require__("./src/styles/layout.styles.js");const box_styles=function styles(){return[(0,layout_styles.Z)(),(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-box-background-color: initial;\n\t\t\t\t--xb-box-border-color: ",";\n\t\t\t\t--xb-box-border-style: solid;\n\t\t\t\t--xb-box-border-width: 1px;\n\t\t\t\t--xb-box-color: unset;\n\t\t\t\t--xb-box-gap: ",";\n\t\t\t\t--xb-box-padding-x: ",";\n\t\t\t\t--xb-box-padding-y: ",";\n\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.box {\n\t\t\t\t",";\n\n\t\t\t\t",";\n\t\t\t\t",";\n\n\t\t\t\tborder: var( --xb-box-border-width ) var( --xb-box-border-style )\n\t\t\t\t\tvar( --xb-box-border-color );\n\t\t\t\tcolor: var( --xb-box-color );\n\t\t\t\tbackground-color: var( --xb-box-background-color );\n\n\t\t\t\theight: 100%;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t}\n\n\t\t\t::slotted( * ),\n\t\t\tslot[name='leading']::slotted( * ),\n\t\t\tslot[name='trailing']::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\tslot[name='leading']::slotted( * ),\n\t\t\tslot[name='trailing']::slotted( * ) {\n\t\t\t\tdisplay: inline-flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\tslot[name='leading']::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\tslot[name='trailing']::slotted( * ) {\n\t\t\t\t",";\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-300"),(0,get_token.Z)("spacing-2"),(0,get_token.Z)("spacing-4"),(0,get_token.Z)("spacing-2"),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")),(0,transition_styles.Z)([{property:"background-color"},{property:"color"}]),(0,padding_styles.px)("var(--xb-box-padding-x)"),(0,padding_styles.py)("var(--xb-box-padding-y)"),(0,typography_styles.Z)("body-1"),(0,padding_styles.px)((0,get_token.Z)("spacing-0")),(0,padding_styles.py)((0,get_token.Z)("spacing-0")),(0,margin_styles.mx)((0,get_token.Z)("spacing-0")),(0,margin_styles.my)((0,get_token.Z)("spacing-0")),(0,margin_styles.mr)("var(--xb-box-gap)"),(0,margin_styles.ml)("var(--xb-box-gap)"))];var strings,raw};var box_templateObject;class BoxLayout extends base_layout.Z{static get properties(){return{}}constructor(){super()}render(){var{classy}=(0,index_esm.ZP)({}),tag=this.tag;return(0,static_html.dy)(box_templateObject||(box_templateObject=function box_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<","\n\t\t\t\tclass=",'\n\t\t\t>\n\t\t\t\t<slot name="leading"></slot>\n\t\t\t\t<slot></slot>\n\t\t\t\t<slot name="trailing"></slot>\n\t\t\t</',">\n\t\t"])),tag,classy("box",(0,prop_toolset.O)("border",this.borderless),(0,prop_toolset.O)("padding",this.paddingless)),tag)}}!function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(BoxLayout,"styles",[box_styles()]),window.customElements.define("xb-box",BoxLayout)},"./src/components/layout/box/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/layout/box/box.js")},"./src/components/text/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./src/components/text/text.js")},"./src/components/text/text.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var _templateObject,static_html=__webpack_require__("../../node_modules/lit/static-html.js"),index_esm=__webpack_require__("../../node_modules/@welingtonms/classy/dist/index.esm.js"),polymorphic=__webpack_require__("./src/mixins/polymorphic/index.js"),xb_element=__webpack_require__("./src/common/xb-element.js"),lit=__webpack_require__("../../node_modules/lit/index.js"),margin_styles=__webpack_require__("./src/styles/margin.styles.js"),get_token=__webpack_require__("./src/utils/get-token.js"),transition_styles=__webpack_require__("./src/styles/transition.styles.js"),typography_styles=__webpack_require__("./src/styles/typography.styles.js");const text_styles=function styles(){return[(0,lit.iv)(_templateObject||(strings=["\n\t\t\t:host {\n\t\t\t\t--xb-text-color: ",";\n\t\t\t}\n\n\t\t\t.-h-1 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-h-2 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-h-3 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-h-4 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-h-5 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-h-6 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-subtitle-1 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-subtitle-2 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-body-1 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-body-2 {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-button {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-caption {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.-overline {\n\t\t\t\t",";\n\t\t\t}\n\n\t\t\t.text {\n\t\t\t\t",";\n\n\t\t\t\tdisplay: inline-block;\n\n\t\t\t\t",";\n\n\t\t\t\tcolor: var( --xb-text-color );\n\t\t\t}\n\t\t"],raw||(raw=strings.slice(0)),_templateObject=Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),(0,get_token.Z)("color-gray-700"),(0,typography_styles.Z)("h-1"),(0,typography_styles.Z)("h-2"),(0,typography_styles.Z)("h-3"),(0,typography_styles.Z)("h-4"),(0,typography_styles.Z)("h-5"),(0,typography_styles.Z)("h-6"),(0,typography_styles.Z)("subtitle-1"),(0,typography_styles.Z)("subtitle-2"),(0,typography_styles.Z)("body-1"),(0,typography_styles.Z)("body-2"),(0,typography_styles.Z)("button"),(0,typography_styles.Z)("caption"),(0,typography_styles.Z)("overline"),(0,transition_styles.Z)([{property:"color"}]),(0,margin_styles.Z)((0,get_token.Z)("spacing-0")))];var strings,raw};var text_templateObject;class Text extends((0,polymorphic.Z)(xb_element.Z)){static get properties(){return{variant:{type:String,reflect:!0}}}constructor(){super(),this.variant="body-1",this.as="span"}render(){var{when,classy}=(0,index_esm.ZP)({variant:this.variant});return(0,static_html.dy)(text_templateObject||(text_templateObject=function text_taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n\t\t\t<","\n\t\t\t\tclass=","\n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</",">\n\t\t"])),this.tag,classy("text",{"-body-1":when({variant:"body-1"}),"-body-2":when({variant:"body-2"}),"-button":when({variant:"button"}),"-caption":when({variant:"caption"}),"-h-1":when({variant:"h-1"}),"-h-2":when({variant:"h-2"}),"-h-3":when({variant:"h-3"}),"-h-4":when({variant:"h-4"}),"-h-5":when({variant:"h-5"}),"-h-6":when({variant:"h-6"}),"-overline":when({variant:"overline"}),"-subtitle-1":when({variant:"subtitle-1"}),"-subtitle-2":when({variant:"subtitle-2"})}),this.tag)}}!function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(Text,"styles",[text_styles()]),window.customElements.define("xb-text",Text)},"./src/styles/transition.styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lit/index.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../xb-toolset/dist/to-array.js"),_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1__);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var DEFAULT_TRANSITION_CONFIG={property:"all",delay:"0s",duration:"0.25s",easing:"ease-in-out"};const __WEBPACK_DEFAULT_EXPORT__=function transition(configs){return(0,lit__WEBPACK_IMPORTED_MODULE_0__.$m)("transition: ".concat(_welingtonms_xb_toolset_dist_to_array__WEBPACK_IMPORTED_MODULE_1___default()(configs).map((config=>function toTransition(config){var safeConfig=_objectSpread(_objectSpread({},DEFAULT_TRANSITION_CONFIG),config);return(0,lit__WEBPACK_IMPORTED_MODULE_0__.$m)("".concat(safeConfig.property," ").concat(safeConfig.duration," ").concat(safeConfig.easing," ").concat(safeConfig.delay))}(config))).join(", ")))}},"../../node_modules/@welingtonms/classy/dist/index.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function n(n,r,t){if(t||2===arguments.length)for(var e,o=0,u=r.length;o<u;o++)!e&&o in r||(e||(e=Array.prototype.slice.call(r,0,o)),e[o]=r[o]);return n.concat(e||Array.prototype.slice.call(r))}function r(n){return null!=n&&["object","function"].includes(typeof n)}function t(n){return null!=n&&"function"==typeof n}function e(n){return null==n?[]:Array.isArray(n)?n:[n]}function o(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var o=e(n);return function(n){for(var r=!1,u=function(u){for(var c=o[u],f=Object.keys(c),i=!0,a=function(r){var o=f[r],u=n[o];i=Array.isArray(c[o])?i&&e(u).every((function(n){return c[o].includes(n)})):t(c[o])?i&&Boolean(c[o](u)):i&&c[o]===u},l=0;l<f.length&&i;l++)a(l);r=r||i},c=0;c<o.length;c++)u(c);return r}}function u(r){return Object.keys(r||{}).reduce((function(t,e){return r[e]?n(n([],t,!0),[e],!1):t}),[]).join(" ")}function c(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];for(var e=[],o=0;o<n.length;o++){var c=n[o];r(c)?e=e.concat(u(c)):c&&e.push(String(c))}return e.join(" ")}function i(n){return{when:function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return o.apply(void 0,r)(n)},classy:c}}__webpack_require__.d(__webpack_exports__,{ZP:()=>i,yH:()=>c})},"../../node_modules/lit/static-html.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{dy:()=>n,i0:()=>i,s2:()=>o});var lit_html=__webpack_require__("../../node_modules/lit-html/lit-html.js"),e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},o=t=>({_$litStatic$:t,r:e}),i=function i(t){for(var _len=arguments.length,r=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)r[_key-1]=arguments[_key];return{_$litStatic$:r.reduce(((r,e,l)=>r+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error("Value passed to 'literal' function must be a 'literal' result: ".concat(t,". Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security."))})(e)+t[l+1]),t[0]),r:e}},s=new Map,a=t=>function(r){for(var _len2=arguments.length,e=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)e[_key2-1]=arguments[_key2];for(var i,a,c,o=e.length,n=[],u=[],$=0,f=!1;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l(a));)c+=i+r[++$],f=!0;u.push(a),n.push(c),$++}if($===o&&n.push(r[o]),f){var _t=n.join("$$lit$$");void 0===(r=s.get(_t))&&(n.raw=n,s.set(_t,r=n)),e=u}return t(r,...e)},n=a(lit_html.dy);a(lit_html.YP)}}]);