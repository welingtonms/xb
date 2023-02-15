import { html } from 'lit-html';
import { SELECTION_TYPES } from '@welingtonms/xb-toolset/dist/selection';

import '../button';
import '../layout/cluster';
import './selection-keeper';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Metacomponents/selection-keeper',
	component: 'xb-selection-keeper',

	argTypes: {
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
		type: {
			control: 'inline-radio',
			options: SELECTION_TYPES,
		},
	},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) =>
		html`
			<xb-selection-keeper
				.value=${ args.value }
				@xb-selection-change=${ ( e ) => {
					document.querySelector( 'small' ).innerHTML = JSON.stringify( e.detail.value );
					args.change( e );
				} }
				listen=${ args.listen }
				type=${ args.type }
			>
				<xb-cluster style="--xb-cluster-justify: center;">
					<xb-button
						emphasis="text"
						@click=${ function () {
							const event = new CustomEvent( args.listen, {
								bubbles: true,
								composed: true,
								detail: { value: 'accept' },
							} );

							this.dispatchEvent( event );
						} }
					>
						Accept
					</xb-button>

					<xb-button
						emphasis="text"
						@click=${ function () {
							const event = new CustomEvent( args.listen, {
								bubbles: true,
								composed: true,
								detail: { value: 'change' },
							} );

							this.dispatchEvent( event );
						} }
					>
						Change
					</xb-button>

					<xb-button
						emphasis="text"
						@click=${ function () {
							const event = new CustomEvent( args.listen, {
								bubbles: true,
								composed: true,
								detail: { value: 'leave' },
							} );

							this.dispatchEvent( event );
						} }
					>
						Leave
					</xb-button>
					<small></small>
				</xb-cluster>
			</xb-selection-keeper>
		`,

	args: {
		value: null,
		listen: 'xb-click',
		type: 'single',
	},
};
