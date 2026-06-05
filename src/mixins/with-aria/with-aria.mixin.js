import { property } from 'lit/decorators.js';

import createLogger from '../../utils/logger';
// export const ariaCommonProperties = Object.freeze( {
// 	ariaAtomic: 'aria-atomic',
// 	ariaBusy: 'aria-busy',
// 	ariaCurrent: 'aria-current',
// 	ariaDisabled: 'aria-disabled',
// 	ariaHasPopup: 'aria-haspopup',
// 	ariaHidden: 'aria-hidden',
// 	ariaInvalid: 'aria-invalid',
// 	ariaKeyShortcuts: 'aria-keyshortcuts',
// 	ariaLabel: 'aria-label',
// 	ariaLive: 'aria-live',
// 	ariaRelevant: 'aria-relevant',
// 	ariaRoleDescription: 'aria-roledescription',
// } );

// export const ariaButtonProperties = Object.entries({
// 	ariaExpanded: "aria-expanded",
// 	ariaPressed: "aria-pressed"
//   });

export const AriaCommonProperties = new Set( [
	'aria-atomic',
	'aria-busy',
	'aria-current',
	'aria-disabled',
	'aria-haspopup',
	'aria-hidden',
	'aria-invalid',
	'aria-keyshortcuts',
	'aria-label',
	'aria-live',
	'aria-relevant',
	'aria-roledescription',
] );

const isTransferring = new Set();

const logger = createLogger( 'with-aria' );

/**
 * @template {!Constructable} T
 * @param {T} BaseClass
 */
export function WithAriaMixin( BaseClass ) {
	return class WithAria extends BaseClass {
		@property( { attribute: 'aria-atomic' } ) accessor ariaAtomic;
		@property( { attribute: 'aria-busy' } ) accessor ariaBusy;
		@property( { attribute: 'aria-checked' } ) accessor ariaChecked;
		@property( { attribute: 'aria-current' } ) accessor ariaCurrent;
		@property( { attribute: 'aria-disabled' } ) accessor ariaDisabled;
		@property( { attribute: 'aria-haspopup' } ) accessor ariaHasPopup;
		@property( { attribute: 'aria-hidden' } ) accessor ariaHidden;
		@property( { attribute: 'aria-invalid' } ) accessor ariaInvalid;
		@property( { attribute: 'aria-keyshortcuts' } ) accessor ariaKeyShortcuts;
		@property( { attribute: 'aria-label' } ) accessor ariaLabel;
		@property( { attribute: 'aria-live' } ) accessor ariaLive;
		@property( { attribute: 'aria-relevant' } ) accessor ariaRelevant;
		@property( { attribute: 'aria-roledescription' } ) accessor ariaRoleDescription;

		getAriaTarget() {
			return null;
		}

		// attributeChangedCallback( attribute, oldValue, newValue ) {
		// 	super.attributeChangedCallback( attribute, oldValue, newValue );

		// if ( ! AriaCommonProperties.has( attribute ) ) {
		// 	return;
		// }

		// if ( isTransferring.has( this ) ) {
		// 	console.log( 'is already transfering', attribute );
		// 	return;
		// }

		// isTransferring.add( this );

		// const target = this.getAriaTarget();
		// if ( target == null ) {
		// 	return;
		// }

		// logger.debug( `transfering ${ attribute } with value ${ newValue } to target` );

		// if ( newValue == null ) {
		// 	target.removeAttribute( attribute );
		// } else {
		// 	target.setAttribute( attribute, newValue );
		// }

		// this.removeAttribute( attribute );

		// isTransferring.delete( this );
		// }
	};
}

/**
 * @typedef {import('../../utils/prop-types.js').Constructable} Constructable
 */
