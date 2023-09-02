import { html } from 'lit-html';

import './listbox';
import './listbox-option';

describe( '<xb-listbox>', () => {
	it( 'should render correctly', () => {
		const onClickSpy = cy.stub().as( 'onClickSpy' );

		cy.mount(
			html`
				<xb-listbox>
					<xb-option data-cy="accept">Accept</xb-option>
					<xb-option data-cy="change" @click=${ ( e ) => onClickSpy( e ) }>
						Change
					</xb-option>
					<xb-option data-cy="leave">Leave</xb-option>
				</xb-listbox>
			`
		);

		cy.get( 'xb-listbox' ).should( 'have.attr', 'role', 'listbox' );

		cy.get( 'xb-option[data-cy="accept"]' ).should( 'have.attr', 'role', 'option' );
		cy.get( 'xb-option[data-cy="change"]' ).should( 'have.attr', 'role', 'option' );
		cy.get( 'xb-option[data-cy="leave"]' ).should( 'have.attr', 'role', 'option' );

		cy.get( 'xb-option[data-cy="change"]' ).click();
		cy.get( '@onClickSpy' ).should( 'have.been.called' );
	} );

	it( 'should navigate the keyboard', () => {
		cy.mount( html`
			<xb-listbox>
				<xb-option data-cy="accept">Accept</xb-option>
				<xb-option data-cy="change">Change</xb-option>
				<xb-option data-cy="leave">Leave</xb-option>
			</xb-listbox>
		` );

		cy.get( 'xb-listbox' ).as( 'menu' );

		cy.get( '@menu' ).focus();

		// navigates from first to last option
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Accept' );
		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Change' );
		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Leave' );
		cy.get( '@menu' ).press( 'ArrowDown' ); // return to first option

		// navigates from last to first option
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Leave' );
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Change' );
		cy.get( '@menu' ).press( 'ArrowUp' );
		cy.get( '@menu' ).find( '.is-focused' ).should( 'have.text', 'Accept' );
	} );

	it( 'should navigate & single select using the keyboard', () => {
		const onChangeSpy = cy.stub().as( 'onChangeSpy' );

		cy.mount( html`
			<xb-listbox selection="single" @xb:change=${ ( e ) => onChangeSpy( e ) }>
				<xb-option value="accept">Accept</xb-option>
				<xb-option value="change">Change</xb-option>
				<xb-option value="leave">Leave</xb-option>
			</xb-listbox>
		` );

		cy.get( 'xb-listbox' ).as( 'menu' );
		cy.get( '@menu' ).focus();

		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).press( 'Space' );
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: 'change',
			} )
		);

		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).press( 'Space' );
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: 'leave',
			} )
		);

		// unselects the selected option
		cy.get( '@menu' ).press( 'Space' );
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: null,
			} )
		);
	} );

	it( 'should navigate & strict-single select using the keyboard', () => {
		const onChangeSpy = cy.stub().as( 'onChangeSpy' );

		cy.mount( html`
			<xb-listbox selection="single-strict" @xb:change=${ ( e ) => onChangeSpy( e ) }>
				<xb-option value="accept">Accept</xb-option>
				<xb-option value="change">Change</xb-option>
				<xb-option value="leave">Leave</xb-option>
			</xb-listbox>
		` );

		cy.get( 'xb-listbox' ).as( 'menu' );
		cy.get( '@menu' ).focus();

		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).press( 'Space' );
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: 'change',
			} )
		);

		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).press( 'Space' );
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: 'leave',
			} )
		);

		// does not unselect the selected option
		cy.get( '@menu' ).press( 'Space' );
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: 'leave',
			} )
		);
	} );

	it( 'should navigate & multiple select using the keyboard', () => {
		const onChangeSpy = cy.stub().as( 'onChangeSpy' );

		cy.mount( html`
			<xb-listbox selection="multiple" @xb:change=${ ( e ) => onChangeSpy( e ) }>
				<xb-option value="accept">Accept</xb-option>
				<xb-option value="change">Change</xb-option>
				<xb-option value="leave">Leave</xb-option>
			</xb-listbox>
		` );

		cy.get( 'xb-listbox' ).as( 'menu' );
		cy.get( '@menu' ).focus();

		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).press( 'Space' );
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: [ 'change' ],
			} )
		);

		cy.get( '@menu' ).press( 'ArrowDown' );
		cy.get( '@menu' ).press( 'Space' );
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: [ 'change', 'leave' ],
			} )
		);

		// unselects the 'leave' option
		cy.get( '@menu' ).press( 'Space' );
		// FIXME: ensure this is not the call from the first selection
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: [ 'change' ],
			} )
		);

		cy.get( '@menu' ).press( 'ArrowUp' );

		// unselects the 'change' option
		cy.get( '@menu' ).press( 'Space' );
		cy.get( '@onChangeSpy' ).should(
			'have.been.calledWith',
			Cypress.sinon.match.hasNested( 'detail', {
				value: null,
			} )
		);
	} );
} );
