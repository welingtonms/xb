import { html } from 'lit';

import { TestingFactory } from '../../utils/test-tools';
import './select';

function createAliases() {
	cy.get( 'xb-select' )
		.find( 'xb-text-input', { includeShadowDom: true } )
		.find( 'input', { includeShadowDom: true } )
		.as( 'searchInput' );

	cy.get( 'xb-select' )
		.find( 'xb-text-input', { includeShadowDom: true } )
		.find( '.clear', { includeShadowDom: true } )
		.as( 'clearButton' );

	cy.get( 'xb-select' )
		.find( 'xb-text-input', { includeShadowDom: true } )
		.find( '.handle' )
		.as( 'handleButton' );

	cy.get( 'xb-select' ).find( 'xb-select-menu', { includeShadowDom: true } ).as( 'menu' );
}

const { given } = TestingFactory(
	/**
	 * @param {import('../../utils/test-tools').TestingFactoryArgs} args
	 */
	function factory( { Given, When, Then } ) {
		Given(
			'select is rendered with',
			( args = { loading: false, multiple: false, disabled: false } ) => {
				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@xb-change=${ args.change }
						?disabled=${ args.disabled }
					>
						<xb-option value="accept">Accept</xb-option>
						<xb-option value="change">Change</xb-option>
						<xb-option value="leave">Leave</xb-option>
					</xb-select>
				` );

				createAliases();
			}
		);

		When( 'user clicks the select', () => {
			cy.get( '@searchInput' ).click();
		} );

		When( 'user searches for {term}', ( { term } ) => {
			// Using `{force: true}` due to https://github.com/cypress-io/cypress/issues/5830
			cy.get( '@searchInput' ).type( term, { force: true } );

			[ 'change', 'accept', 'leave' ].forEach( ( value ) => {
				// ensure other options have been removed
				if ( value !== term ) {
					cy.get( `xb-option[value="${ value }"]` ).should( 'not.exist' );
				}
			} );
		} );

		When( 'user selects {option}', ( { option } ) => {
			cy.get( `xb-option[value="${ option }"]` ).should( 'exist' );
			cy.get( `xb-option[value="${ option }"]` ).click();
		} );

		When( 'user clears search', () => {
			cy.get( '@clearButton' ).click();
		} );

		When( 'user expands menu', () => {
			cy.get( '@handleButton' ).click();
			cy.get( '@menu' ).should( 'be.visible' );
		} );

		Then( 'all options are visible', () => {
			cy.get( 'xb-option[value="accept"]' ).should( 'be.visible' );
			cy.get( 'xb-option[value="change"]' ).should( 'be.visible' );
			cy.get( 'xb-option[value="leave"]' ).should( 'be.visible' );
		} );

		Then( 'option {option} is visible', ( { option } ) => {
			cy.get( `xb-option[value="${ option }"]` ).should( 'exist' ).and( 'be.visible' );
		} );

		Then( 'no option is visible', () => {
			cy.get( 'xb-option[value="accept"]' ).should( 'not.be.visible' );
			cy.get( 'xb-option[value="change"]' ).should( 'not.be.visible' );
			cy.get( 'xb-option[value="leave"]' ).should( 'not.be.visible' );
		} );

		Then( 'option {option} is not visible', ( { option } ) => {
			cy.get( `xb-option[value="${ option }"]` ).should( 'not.exist' );
		} );

		Then( 'search input is empty', () => {
			cy.get( '@searchInput' ).should( 'be.empty' );
		} );

		Then( 'search input has value {value}', ( { value } ) => {
			// we use placeholder to keep the selected value
			cy.get( '@searchInput' ).should( 'have.attr', 'placeholder', value );
		} );

		Then( 'menu is visible', () => {
			cy.get( '@menu' ).should( 'be.visible' );
		} );

		Then( 'menu is not visible', () => {
			cy.get( '@menu' ).should( 'not.be.visible' );
		} );

		// Then( 'only searched {option} option is visible', ( { option } ) => {
		// 	console.log( 'only the option >', option, '< should be visible' );
		// 	[ 'change', 'accept', 'leave' ].forEach( ( value ) => {
		// 		cy.get( `xb-option[value="${ value }"]` ).should(
		// 			value === option ? 'be.visible' : 'not.exist'
		// 		);
		// 	} );
		// } );

		Then( 'option {option} is selected', ( { option } ) => {
			cy.get( `xb-option[value="${ option }"]` ).should( 'have.attr', 'selected' );
		} );

		Then( 'option {option} is not selected', ( { option } ) => {
			cy.get( `xb-option[value="${ option }"]` ).should( 'not.have.attr', 'selected' );
		} );
	}
);

describe( '<xb-select>', () => {
	describe( 'static options', () => {
		describe( 'single selection', () => {
			it( 'should expand correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user clicks the select' )
					.then( 'menu is visible' )
					.and( 'all options are visible' );
			} );

			it( 'should search correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user searches for "change"' )
					.and( 'user clears search' )
					.then( 'all options are visible' )
					.and( 'search input is empty' );
			} );

			it( 'should select correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user expands menu' )
					.and( 'user selects "leave"' )
					.then( 'option "accept" is not selected' )
					.and( 'option "change" is not selected' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "Leave"' );
			} );

			it( 'should search & select correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );
				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not selected' )
					.and( 'option "leave" is not selected' )
					.and( 'search input has value "Accept"' );
			} );

			// TODO
			it.skip( 'should select & clear correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user expands menu' )
					.and( 'user selects "accept"' )
					.and( 'user clears search' )
					.then( 'search input is empty' );
			} );
		} );

		describe( 'multiple selection', () => {
			it( 'should expand correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: true,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user clicks the select' )
					.then( 'menu is visible' )
					.and( 'all options are visible' );
			} );

			it( 'should search correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: true,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: true,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user searches for "change"' )
					.and( 'user clears search' )
					.then( 'all options are visible' )
					.and( 'search input is empty' );
			} );

			it( 'should select correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: true,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user expands menu' )
					.and( 'user selects "change"' )
					.and( 'user selects "leave"' )
					.then( 'option "accept" is not selected' )
					.and( 'option "change" is selected' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "2 selected"' );
			} );

			it( 'should search & select correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: true,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'select is rendered with', args )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is not visible' )
					.and( 'search input has value "1 selected"' );
			} );
		} );
	} );

	describe( 'static options', () => {
		describe( 'single selection', () => {} );

		describe( 'multiple selection', () => {} );
	} );

	describe( 'sync datasource', () => {
		describe( 'single selection', () => {} );

		describe( 'multiple selection', () => {} );
	} );

	describe( 'async datasource', () => {
		describe( 'single selection', () => {} );

		describe( 'multiple selection', () => {} );
	} );
} );
