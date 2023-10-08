import { html } from 'lit-html';

import '../../layout/box';
import '../../layout/stack';
import '../../icon';
import './checkbox';

describe( '<xb-checkbox>', () => {
	it( 'should render children', () => {
		const onChangeSpy = cy.stub().as( 'onChangeSpy' );

		cy.mount( html`
			<xb-checkbox value="enable" @xb:change=${ ( event ) => onChangeSpy( event ) }>
				Enable newsletters
			</xb-checkbox>
		` );

		cy.get( 'xb-checkbox' )
			.should( 'contain.text', 'Enable newsletters' )
			.and( 'have.attr', 'role', 'checkbox' )
			.and( 'have.attr', 'tabindex', '0' );

		cy.get( 'xb-checkbox' ).should( 'not.have.attr', 'disabled' );
		cy.get( 'xb-checkbox' ).should( 'not.have.attr', 'indeterminate' );
		cy.get( 'xb-checkbox' ).should( 'not.have.attr', 'aria-disabled' );
		cy.get( 'xb-checkbox' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( 'xb-checkbox' ).click();

		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: 'enable',
				checked: true,
				indeterminate: false,
			} )
		);

		cy.get( 'xb-checkbox' ).should( 'have.attr', 'checked' );
		cy.get( 'xb-checkbox' ).should( 'have.attr', 'aria-checked', 'true' );
	} );

	it( 'triggers change on key <Space>', () => {
		const onChangeSpy = cy.stub().as( 'onChangeSpy' );

		cy.mount( html`
			<xb-checkbox
				value="enable"
				@xb:change=${ ( event ) => {
					onChangeSpy( event );
				} }
			>
				Enable newsletters
			</xb-checkbox>
		` );

		cy.get( 'body' ).tab();
		cy.get( 'xb-checkbox' ).type( ' ' );
		cy.get( '@onChangeSpy' ).should( 'have.been.called' );
	} );

	it( 'manages group correctly', () => {
		const onChangeSpy = cy.stub().as( 'onChangeSpy' );

		cy.mount( html`
			<xb-stack role="group">
				<xb-checkbox id="xb-checkbox-1" aria-controls="xb-checkbox-1-1 xb-checkbox-1-2">
					1.
				</xb-checkbox>
				<xb-box borderless="all">
					<xb-checkbox
						id="xb-checkbox-1-1"
						value="1.1"
						aria-controls="xb-checkbox-1-1-1 xb-checkbox-1-1-2 xb-checkbox-1-1-3"
						@xb:change=${ ( event ) => onChangeSpy( event ) }
					>
						1.1.
					</xb-checkbox>
					<xb-box borderless="all">
						<xb-checkbox id="xb-checkbox-1-1-1" value="1.1.1">1.1.1.</xb-checkbox>
						<xb-checkbox id="xb-checkbox-1-1-2" value="1.1.2">1.1.2.</xb-checkbox>
						<xb-checkbox id="xb-checkbox-1-1-3" value="1.1.3">1.1.3.</xb-checkbox>
					</xb-box>
					<xb-checkbox id="xb-checkbox-1-2" value="1.2">1.2.</xb-checkbox>
				</xb-box>
			</xb-stack>
		` );

		cy.get( 'xb-checkbox[id="xb-checkbox-1"]' ).as( 'checkbox-1' );
		cy.get( 'xb-checkbox[id="xb-checkbox-1-1"]' ).as( 'checkbox-1-1' );
		cy.get( 'xb-checkbox[id="xb-checkbox-1-1-1"]' ).as( 'checkbox-1-1-1' );
		cy.get( 'xb-checkbox[id="xb-checkbox-1-1-2"]' ).as( 'checkbox-1-1-2' );
		cy.get( 'xb-checkbox[id="xb-checkbox-1-1-3"]' ).as( 'checkbox-1-1-3' );
		cy.get( 'xb-checkbox[id="xb-checkbox-1-2"]' ).as( 'checkbox-1-2' );

		cy.get( '@checkbox-1' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-1-1' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-1-2' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-1-3' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-2' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@checkbox-1-1-1' ).click();

		cy.get( '@checkbox-1' ).should( 'have.attr', 'indeterminate' );
		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'indeterminate' );
		cy.get( '@checkbox-1-1-1' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-2' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-1-3' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-2' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: '1.1',
				checked: false,
				indeterminate: true,
			} )
		);

		//'Cycles the tri-state checkbox among unchecked, mixed, and checked states'
		// checked
		cy.get( '@checkbox-1-1' ).click();

		cy.get( '@checkbox-1' ).should( 'have.attr', 'indeterminate' );
		cy.get( '@checkbox-1' ).should( 'have.attr', 'aria-checked', 'mixed' );

		cy.get( '@checkbox-1-1' ).should( 'not.have.attr', 'indeterminate' );
		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@checkbox-1-1-1' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-2' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-3' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@checkbox-1-2' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: '1.1',
				checked: true,
				indeterminate: false,
			} )
		);

		// unchecked'
		cy.get( '@checkbox-1-1' ).click();

		cy.get( '@checkbox-1' ).should( 'not.have.attr', 'indeterminate' );
		cy.get( '@checkbox-1' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@checkbox-1-1' ).should( 'not.have.attr', 'indeterminate' );
		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@checkbox-1-1-1' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-1-2' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-1-3' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@checkbox-1-2' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: '1.1',
				checked: false,
				indeterminate: false,
			} )
		);

		// mixed (restores the previous state)
		cy.get( '@checkbox-1-1' ).click();

		cy.get( '@checkbox-1' ).should( 'have.attr', 'indeterminate' );
		cy.get( '@checkbox-1' ).should( 'have.attr', 'aria-checked', 'mixed' );

		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'indeterminate' );
		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'aria-checked', 'mixed' );

		cy.get( '@checkbox-1-1-1' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-2' ).should( 'have.attr', 'aria-checked', 'false' );
		cy.get( '@checkbox-1-1-3' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@checkbox-1-2' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: '1.1',
				checked: false,
				indeterminate: true,
			} )
		);

		// ---------------------------------------------------------------------

		cy.get( '@checkbox-1-1-2' ).click();

		cy.get( '@checkbox-1' ).should( 'have.attr', 'indeterminate' );
		cy.get( '@checkbox-1' ).should( 'have.attr', 'aria-checked', 'mixed' );

		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'indeterminate' );
		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'aria-checked', 'mixed' );

		cy.get( '@checkbox-1-1-1' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-2' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-3' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@checkbox-1-2' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@checkbox-1-1-3' ).click();

		cy.get( '@checkbox-1' ).should( 'have.attr', 'indeterminate' );
		cy.get( '@checkbox-1' ).should( 'have.attr', 'aria-checked', 'mixed' );

		cy.get( '@checkbox-1-1' ).should( 'not.have.attr', 'indeterminate' );
		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@checkbox-1-1-1' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-2' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-3' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@checkbox-1-2' ).should( 'have.attr', 'aria-checked', 'false' );

		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: '1.1',
				checked: true,
				indeterminate: false,
			} )
		);

		cy.get( '@checkbox-1-2' ).click();

		cy.get( '@checkbox-1' ).should( 'not.have.attr', 'indeterminate' );
		cy.get( '@checkbox-1' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@checkbox-1-1' ).should( 'not.have.attr', 'indeterminate' );
		cy.get( '@checkbox-1-1' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@checkbox-1-1-1' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-2' ).should( 'have.attr', 'aria-checked', 'true' );
		cy.get( '@checkbox-1-1-3' ).should( 'have.attr', 'aria-checked', 'true' );

		cy.get( '@checkbox-1-2' ).should( 'have.attr', 'aria-checked', 'true' );
	} );
} );
