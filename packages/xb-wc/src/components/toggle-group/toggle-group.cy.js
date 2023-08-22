import { html } from 'lit';

import './toggle-group';
import './toggle';

function setup( args = { size: 'small', value: null, disabled: false, type, change } ) {
	cy.mount( html`
		<xb-toggle-group
			type=${ args.type }
			size=${ args.size }
			.value=${ args.value }
			@xb:change=${ args.change }
		>
			<xb-toggle ?disabled=${ args.disabled } value="accept">Accept</xb-toggle>
			<xb-toggle ?disabled=${ args.disabled } value="change">Change</xb-toggle>
			<xb-toggle ?disabled=${ args.disabled } value="leave">Leave</xb-toggle>
		</xb-toggle-group>
	` );
}

describe( '<xb-toggle-group>', () => {
	describe( 'single selection', () => {
		it( 'mounts correctly', () => {
			const props = {
				type: 'single',
			};

			cy.mount( setup( props ) );

			cy.get( 'xb-toggle-group' ).should( 'have.attr', 'role', 'group' );

			cy.get( 'xb-toggle' ).then( ( toggles ) => {
				for ( const toggle of toggles ) {
					cy.wrap( toggle ).should( 'have.attr', 'role', 'radio' );
					cy.wrap( toggle ).should( 'have.attr', 'aria-checked', 'false' );
				}
			} );
		} );

		it( 'mounts correctly, with initial value', () => {
			cy.mount(
				setup( {
					type: 'single',
					value: 'change',
				} )
			);

			cy.get( 'xb-toggle' ).as( 'toggles' );

			cy.get( 'xb-toggle[value="accept"]' ).should(
				'have.attr',
				'aria-checked',
				'false'
			);
			cy.get( 'xb-toggle[value="change"]' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( 'xb-toggle[value="leave"]' ).should( 'have.attr', 'aria-checked', 'false' );
		} );

		it( 'triggers xb-change event', () => {
			const onChangeSpy = cy.spy().as( 'onChangeSpy' );

			cy.mount(
				setup( {
					type: 'single',
					change: onChangeSpy,
					value: 'accept',
				} )
			);

			cy.get( 'xb-toggle[value="accept"]' ).as( 'accept' );
			cy.get( 'xb-toggle[value="change"]' ).as( 'change' );
			cy.get( 'xb-toggle[value="leave"]' ).as( 'leave' );

			cy.get( '@accept' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( '@change' ).should( 'have.attr', 'aria-checked', 'false' );
			cy.get( '@leave' ).should( 'have.attr', 'aria-checked', 'false' );

			// the position 'top' is the recommendation for [this known issue](https://docs.cypress.io/api/commands/shadow#Known-Issue)
			cy.get( 'xb-toggle[value="change"]' ).click( 'top' );

			cy.get( '@accept' ).should( 'have.attr', 'aria-checked', 'false' );
			cy.get( '@change' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( '@leave' ).should( 'have.attr', 'aria-checked', 'false' );

			cy.get( '@onChangeSpy' ).should(
				'have.been.calledWith',
				Cypress.sinon.match.hasNested( 'detail', {
					value: 'change',
				} )
			);

			cy.get( 'xb-toggle[value="change"]' ).click( 'top' );

			cy.get( '@accept' ).should( 'have.attr', 'aria-checked', 'false' );
			cy.get( '@change' ).should( 'have.attr', 'aria-checked', 'false' );
			cy.get( '@leave' ).should( 'have.attr', 'aria-checked', 'false' );

			cy.get( '@onChangeSpy' ).should(
				'have.been.calledWith',
				Cypress.sinon.match.hasNested( 'detail', {
					value: null,
				} )
			);
		} );
	} );

	describe( 'single-strict selection', () => {
		it( 'mounts correctly', () => {
			const props = {
				type: 'single-strict',
			};

			cy.mount( setup( props ) );

			cy.get( 'xb-toggle-group' ).should( 'have.attr', 'role', 'group' );

			cy.get( 'xb-toggle' ).then( ( toggles ) => {
				for ( const toggle of toggles ) {
					cy.wrap( toggle ).should( 'have.attr', 'role', 'radio' );
					cy.wrap( toggle ).should( 'have.attr', 'aria-checked', 'false' );
				}
			} );
		} );

		it( 'mounts correctly, with initial value', () => {
			cy.mount(
				setup( {
					type: 'single-strict',
					value: 'change',
				} )
			);

			cy.get( 'xb-toggle' ).as( 'toggles' );

			cy.get( 'xb-toggle[value="accept"]' ).should(
				'have.attr',
				'aria-checked',
				'false'
			);
			cy.get( 'xb-toggle[value="change"]' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( 'xb-toggle[value="leave"]' ).should( 'have.attr', 'aria-checked', 'false' );
		} );

		it( 'triggers xb-change event', () => {
			const onChangeSpy = cy.spy().as( 'onChangeSpy' );

			cy.mount(
				setup( {
					type: 'single-strict',
					change: onChangeSpy,
					value: 'accept',
				} )
			);

			cy.get( 'xb-toggle[value="accept"]' ).as( 'accept' );
			cy.get( 'xb-toggle[value="change"]' ).as( 'change' );
			cy.get( 'xb-toggle[value="leave"]' ).as( 'leave' );

			cy.get( '@accept' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( '@change' ).should( 'have.attr', 'aria-checked', 'false' );
			cy.get( '@leave' ).should( 'have.attr', 'aria-checked', 'false' );

			// the position 'top' is the recommendation for [this known issue](https://docs.cypress.io/api/commands/shadow#Known-Issue)
			cy.get( 'xb-toggle[value="change"]' ).click( 'top' );

			cy.get( '@accept' ).should( 'have.attr', 'aria-checked', 'false' );
			cy.get( '@change' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( '@leave' ).should( 'have.attr', 'aria-checked', 'false' );

			cy.get( '@onChangeSpy' ).should(
				'have.been.calledWith',
				Cypress.sinon.match.hasNested( 'detail', {
					value: 'change',
				} )
			);

			cy.get( 'xb-toggle[value="change"]' ).click( 'top' );

			cy.get( '@accept' ).should( 'have.attr', 'aria-checked', 'false' );
			cy.get( '@change' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( '@leave' ).should( 'have.attr', 'aria-checked', 'false' );

			cy.get( '@onChangeSpy' ).should(
				'have.been.calledWith',
				Cypress.sinon.match.hasNested( 'detail', {
					value: 'change',
				} )
			);
		} );
	} );

	describe( 'multiple selection', () => {
		it( 'mounts correctly', () => {
			const props = {
				type: 'multiple',
			};

			cy.mount( setup( props ) );

			cy.get( 'xb-toggle-group' ).should( 'have.attr', 'role', 'group' );

			cy.get( 'xb-toggle' ).then( ( toggles ) => {
				for ( const toggle of toggles ) {
					cy.wrap( toggle ).should( 'have.attr', 'role', 'checkbox' );
					cy.wrap( toggle ).should( 'have.attr', 'aria-checked', 'false' );
				}
			} );
		} );

		it( 'mounts correctly, with initial value', () => {
			cy.mount(
				setup( {
					type: 'multiple',
					value: [ 'accept', 'leave' ],
				} )
			);

			cy.get( 'xb-toggle' ).as( 'toggles' );

			cy.get( 'xb-toggle[value="accept"]' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( 'xb-toggle[value="change"]' ).should(
				'have.attr',
				'aria-checked',
				'false'
			);
			cy.get( 'xb-toggle[value="leave"]' ).should( 'have.attr', 'aria-checked', 'true' );
		} );

		it( 'triggers xb-change event', () => {
			const onChangeSpy = cy.spy().as( 'onChangeSpy' );

			cy.mount(
				setup( {
					type: 'multiple',
					change: onChangeSpy,
					value: [ 'accept' ],
				} )
			);

			cy.get( 'xb-toggle[value="accept"]' ).as( 'accept' );
			cy.get( 'xb-toggle[value="change"]' ).as( 'change' );
			cy.get( 'xb-toggle[value="leave"]' ).as( 'leave' );

			cy.get( '@accept' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( '@change' ).should( 'have.attr', 'aria-checked', 'false' );
			cy.get( '@leave' ).should( 'have.attr', 'aria-checked', 'false' );

			// the position 'top' is the recommendation for [this known issue](https://docs.cypress.io/api/commands/shadow#Known-Issue)
			cy.get( 'xb-toggle[value="leave"]' ).click( 'top' );

			cy.get( '@accept' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( '@change' ).should( 'have.attr', 'aria-checked', 'false' );
			cy.get( '@leave' ).should( 'have.attr', 'aria-checked', 'true' );

			cy.get( '@onChangeSpy' ).should(
				'have.been.calledWith',
				Cypress.sinon.match.hasNested( 'detail', {
					value: [ 'accept', 'leave' ],
				} )
			);

			cy.get( 'xb-toggle[value="change"]' ).click( 'top' );

			cy.get( '@accept' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( '@change' ).should( 'have.attr', 'aria-checked', 'true' );
			cy.get( '@leave' ).should( 'have.attr', 'aria-checked', 'true' );

			cy.get( '@onChangeSpy' ).should(
				'have.been.calledWith',
				Cypress.sinon.match.hasNested( 'detail', {
					value: [ 'accept', 'leave', 'change' ],
				} )
			);
		} );
	} );
} );
