import {
	floatingHostStyles,
	floatingElementStyles,
} from '../floating-element/floating-element.styles';
import {
	expandableHostStyles,
	expandableElementStyles,
} from '../../controllers/expandable/expandable.styles';

/**
 * Host-level **Disclosure** styles: floating position vars and expandable open/animation vars on `:host`.
 *
 * @param {Object} [options]
 * @param {string} [options.observedAttribute]
 * @param {boolean} [options.reverseToggle]
 * @returns {import('lit').CSSResultArray}
 */
export function disclosureHostStyles( options ) {
	return [ ...floatingHostStyles(), expandableHostStyles( options ) ];
}

/**
 * **Panel**-level **Disclosure** styles: floating positioning and expandable animation on `panelSelector`.
 *
 * Use `:host` when the styled custom element is the **Panel** itself (e.g. dropdown menu CE).
 * Use a descendant selector when the **Panel** is a child of the host (e.g. `[role="listbox"]` on **Select**).
 *
 * @param {Object} options
 * @param {string} options.panelSelector - CSS selector for the **Panel** surface.
 * @returns {import('lit').CSSResultArray}
 */
export function disclosurePanelStyles( { panelSelector } ) {
	return [
		...floatingElementStyles( {
			floatingSelector: panelSelector,
		} ),
		expandableElementStyles( {
			expandableSelector: panelSelector,
		} ),
	];
}

/**
 * Combined host + **Panel** **Disclosure** preset for monolithic **Elements** (host styles plus panel subtree).
 *
 * Host vars are emitted before panel positioning so `--xb-floating-*` and `--expandable-*` are available to descendants.
 *
 * @param {Object} options
 * @param {string} options.panelSelector - CSS selector for the **Panel** surface within the host.
 * @param {string} [options.observedAttribute]
 * @param {boolean} [options.reverseToggle]
 * @returns {import('lit').CSSResultArray}
 */
export function disclosureStyles( options ) {
	const { panelSelector, observedAttribute, reverseToggle } = {
		observedAttribute: 'open',
		reverseToggle: false,
		...options,
	};

	return [
		...disclosureHostStyles( { observedAttribute, reverseToggle } ),
		...disclosurePanelStyles( { panelSelector } ),
	];
}
