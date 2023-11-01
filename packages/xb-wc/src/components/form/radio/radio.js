import { radioStyles } from './radio.styles';

const style = document.createElement( 'style' );
style.textContent = radioStyles().cssText;

document.head.appendChild( style );

/**
 * This class extends the HTMLInputElement class (built-in).
 * For that reason, it required the polyfill for browsers that do not support
 * this Custom Element feature.
 * <!-- https://github.com/ungap/custom-elements#readme -->
 * <script src="https://unpkg.com/@ungap/custom-elements"></script>
 */
export class Radio extends HTMLInputElement {
	constructor() {
		super();

		this.type = 'radio';
	}
}

customElements.define( 'xb-radio', Radio, { extends: 'input' } );
