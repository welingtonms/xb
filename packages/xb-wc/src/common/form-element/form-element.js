import { XBElement } from '../xb-element';
import { AsFormElementMixin } from '../../mixins/as-form-element';

// TODO: enable @ts-check and fix issue in the class definition

/**
 * References:
 * - https://web.dev/articles/more-capable-form-controls
 * @class
 * @template AsFormElementMixin, XBElement
 */
export class FormElement extends AsFormElementMixin(XBElement) {}
