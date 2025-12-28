import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state } from 'lit/decorators.js';

import createLogger from '../../utils/logger';
import { badgeGroupStyles } from './badge-group.styles';
import { matchesSlottedContent } from '../../utils/slot';
import { trackSlot } from '../../decorators/track-slot';
import { XBElement } from '../xb-element';

const logger = createLogger( 'badge-group' );

export class BadgeGroup extends XBElement {
	static styles = [ badgeGroupStyles() ];

	/**
	 * Badge color.
	 * @type {BadgeGroupAttributes['color']}
	 */
	@property( { type: String, reflect: true } ) accessor color;

	/** @type {BadgeGroupAttributes['size']} */
	@property( { type: String, reflect: true } ) accessor size;

	/** @type {boolean} */
	@trackSlot( 'leading' )
	accessor hasSlottedLeadingBadge;

	/** @type {boolean} */
	@trackSlot( 'trailing' )
	accessor hasSlottedTrailingBadge;

	/**
	 * @param {{
	 *  name: string,
	 *  registry: CustomElementRegistry,
	 * }} config
	 */
	static define( config ) {
		XBElement.define( { name: 'xb-badge-group', ...config, type: BadgeGroup } );
	}

	constructor() {
		super();

		/** @type {BadgeGroupAttributes['color']} */
		this.color = 'blue';

		/** @type {BadgeGroupAttributes['size']} */
		this.size = 'sm';
	}

	updated( changedProperties ) {
		super.updated( changedProperties );

		if ( ! this.hasSlottedLeadingBadge && ! this.hasSlottedTrailingBadge ) {
			logger.warn( 'No badges found in badge group' );
		}
	}

	render() {
		return html`
			<span
				class=${ classMap( {
					'badge-group': true,
					'-has-slotted-leading-badge': this.hasSlottedLeadingBadge,
					'-has-slotted-trailing-badge': this.hasSlottedTrailingBadge,
				} ) }
			>
				<slot name="leading" @slotchange=${ this.#updateHasSlottedLeadingBadge }></slot>
				<slot></slot>
				<slot name="trailing" @slotchange=${ this.#updateHasSlottedTrailingBadge }></slot>
			</span>
		`;
	}

	#updateHasSlottedLeadingBadge = () => {
		this.hasSlottedLeadingBadge = matchesSlottedContent(
			this.renderRoot,
			'slot[name="leading"]',
			'xb-badge'
		);
	};

	#updateHasSlottedTrailingBadge = () => {
		this.hasSlottedTrailingBadge = matchesSlottedContent(
			this.renderRoot,
			'slot[name="trailing"]',
			'xb-badge'
		);
	};
}

/**
 * @typedef {import('./badge').BadgeColor} BadgeGroupColor
 * @typedef {('sm' | 'md' | 'lg')} BadgeGroupSize
 */

/**
 * @typedef {Object} BadgeGroupAttributes
 * @property {BadgeGroupColor} [color] - Badge group color.
 * @property {BadgeGroupSize} [size] - Badge group size,
 */
