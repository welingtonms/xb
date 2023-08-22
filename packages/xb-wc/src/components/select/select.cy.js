import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { TestingFactory } from '../../utils/test-tools';
import { useSyncOptions, useAsyncOptions, useSlowAsyncOptions } from './select.fixtures';
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
			'static-options select is rendered with',
			( args = { loading: false, multiple: false, disabled: false, value } ) => {
				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@xb:change=${ args.change }
						?disabled=${ args.disabled }
						.value=${ ifDefined( args.value ) }
					>
						<xb-option value="accept">Accept</xb-option>
						<xb-option value="change">Change</xb-option>
						<xb-option value="leave">Leave</xb-option>
					</xb-select>
				` );

				createAliases();
			}
		);

		Given(
			'datasource select is rendered with',
			(
				args = { loading: false, multiple: false, disabled: false, value, datasources }
			) => {
				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@xb:change=${ args.change }
						?disabled=${ args.disabled }
						.value=${ ifDefined( args.value ) }
						.datasources=${ ifDefined( args.datasources ) }
					></xb-select>
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
			cy.get( 'xb-option[value="accept"]' ).should( 'not.exist' );
			cy.get( 'xb-option[value="change"]' ).should( 'not.exist' );
			cy.get( 'xb-option[value="leave"]' ).should( 'not.exist' );
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

		Then( 'loading is visible', () => {
			cy.get( '@menu' )
				.find( 'xb-spinner', { includeShadowDom: true } )
				.should( 'exist' );
		} );

		Then( 'loading is not visible', () => {
			cy.get( '@menu' )
				.find( 'xb-spinner', { includeShadowDom: true } )
				.should( 'not.exist' );
		} );
	}
);

describe( '<xb-select>', () => {
	describe( 'static options', () => {
		describe( 'single selection', () => {
			const args = {
				loading: false,
				multiple: false,
				disabled: false,
			};

			it( 'should expand correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user clicks the select' )
					.then( 'menu is visible' )
					.and( 'all options are visible' );
			} );

			it( 'should search correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user searches for "change"' )
					.and( 'user clears search' )
					.then( 'all options are visible' )
					.and( 'search input is empty' );
			} );

			it( 'should select correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user expands menu' )
					.and( 'user selects "leave"' )
					.then( 'option "accept" is not selected' )
					.and( 'option "change" is not selected' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "Leave"' );
			} );

			it( 'should search & select correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'search input has value "Accept"' );
			} );

			it( 'should render with initial value', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				given( 'static-options select is rendered with', {
					...args,
					value: { label: 'Leave', value: 'leave' },
				} )
					.when( 'user expands menu' )
					.then( 'option "accept" is not selected' )
					.and( 'option "change" is not selected' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "Leave"' );
			} );

			it( 'should change initially rendered value', () => {
				given( 'static-options select is rendered with', {
					...args,
					value: { label: 'Leave', value: 'leave' },
				} )
					.when( 'user expands menu' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not selected' )
					.and( 'option "leave" is not selected' )
					.and( 'search input has value "Accept"' );
			} );

			// TODO
			it.skip( 'should select & clear correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user expands menu' )
					.and( 'user selects "accept"' )
					.and( 'user clears search' )
					.then( 'search input is empty' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'static-options select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user expands menu' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: { label: 'Accept', value: 'accept', _type: 'generic' },
					} )
				);
			} );
		} );

		describe( 'multiple selection', () => {
			const args = {
				loading: false,
				multiple: true,
				disabled: false,
			};

			it( 'should expand correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user clicks the select' )
					.then( 'menu is visible' )
					.and( 'all options are visible' );
			} );

			it( 'should search correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user searches for "change"' )
					.and( 'user clears search' )
					.then( 'all options are visible' )
					.and( 'search input is empty' );
			} );

			it( 'should select correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user expands menu' )
					.and( 'user selects "change"' )
					.and( 'user selects "leave"' )
					.then( 'option "accept" is not selected' )
					.and( 'option "change" is selected' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "2 selected"' );
			} );

			it( 'should search & select correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is not visible' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should render with initial value', () => {
				given( 'static-options select is rendered with', {
					...args,
					value: { label: 'Leave', value: 'leave' },
				} )
					.when( 'user expands menu' )
					.then( 'option "accept" is not selected' )
					.and( 'option "change" is not selected' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should change initially rendered value', () => {
				given( 'static-options select is rendered with', {
					...args,
					value: { label: 'Leave', value: 'leave' },
				} )
					.when( 'user expands menu' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not selected' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "2 selected"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'static-options select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user expands menu' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: [ { label: 'Accept', value: 'accept', _type: 'generic' } ],
					} )
				);
			} );
		} );
	} );

	describe( 'sync datasource', () => {
		describe( 'single selection', () => {
			const args = {
				loading: false,
				multiple: false,
				disabled: false,
				datasources: [ useSyncOptions ],
			};

			it( 'should expand correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user clicks the select' )
					.then( 'menu is visible' )
					.and( 'no option is visible' );
			} );

			it( 'should search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "change"' )
					.and( 'user clears search' )
					.then( 'option "change" is visible' )
					.and( 'search input is empty' );
			} );

			it( 'should search & select correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is not visible' )
					.and( 'search input has value "Accept"' );
			} );

			it( 'should render with initial value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: { label: 'Leave', value: 'leave' },
				} )
					.when( 'user expands menu' )
					.then( 'option "accept" is not visible' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "Leave"' );
			} );

			it( 'should change initially rendered value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: { label: 'Leave', value: 'leave' },
				} )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is not visible' )
					.and( 'search input has value "Accept"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'datasource select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: { label: 'Accept', value: 'accept', _type: 'life-option' },
					} )
				);
			} );
		} );

		describe( 'multiple selection', () => {
			const args = {
				loading: false,
				multiple: true,
				disabled: false,
				datasources: [ useSyncOptions ],
			};

			it( 'should expand correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user clicks the select' )
					.then( 'menu is visible' )
					.and( 'no option is visible' );
			} );

			it( 'should search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "change"' )
					.and( 'user clears search' )
					.then( 'option "change" is visible' )
					.and( 'search input is empty' );
			} );

			it( 'should search & select correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is not visible' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should render with initial value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: [ { label: 'Leave', value: 'leave' } ],
				} )
					.when( 'user expands menu' )
					.then( 'option "accept" is not visible' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should change initially rendered value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: [ { label: 'Leave', value: 'leave' } ],
				} )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.and( 'user clears search' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "2 selected"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'datasource select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: [ { label: 'Accept', value: 'accept', _type: 'life-option' } ],
					} )
				);
			} );
		} );
	} );

	describe( 'async datasource', () => {
		describe( 'single selection', () => {
			const args = {
				loading: false,
				multiple: false,
				disabled: false,
				datasources: [ useAsyncOptions ],
			};

			it( 'should expand correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user clicks the select' )
					.then( 'menu is visible' )
					.and( 'no option is visible' );
			} );

			it( 'should search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should show loading during search correctly', () => {
				given( 'datasource select is rendered with', {
					...args,
					datasources: [ useSlowAsyncOptions ],
				} )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'loading is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "change"' )
					.and( 'user clears search' )
					.then( 'option "change" is visible' )
					.and( 'search input is empty' );
			} );

			it( 'should search & select correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is not visible' )
					.and( 'search input has value "Accept"' );
			} );

			it( 'should render with initial value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: { label: 'Leave', value: 'leave' },
				} )
					.when( 'user expands menu' )
					.then( 'option "accept" is not visible' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "Leave"' );
			} );

			it( 'should change initially rendered value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: { label: 'Leave', value: 'leave' },
				} )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is not visible' )
					.and( 'search input has value "Accept"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'datasource select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: { label: 'Accept', value: 'accept', _type: 'life-option' },
					} )
				);
			} );
		} );

		describe( 'multiple selection', () => {
			const args = {
				loading: false,
				multiple: true,
				disabled: false,
				datasources: [ useAsyncOptions ],
			};

			it( 'should expand correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user clicks the select' )
					.then( 'menu is visible' )
					.and( 'no option is visible' );
			} );

			it( 'should search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "change"' )
					.and( 'user clears search' )
					.then( 'option "change" is visible' )
					.and( 'search input is empty' );
			} );

			it( 'should show loading during search correctly', () => {
				given( 'datasource select is rendered with', {
					...args,
					datasources: [ useSlowAsyncOptions ],
				} )
					.when( 'user searches for "change"' )
					.then( 'menu is visible' )
					.and( 'loading is visible' )
					.and( 'option "change" is visible' )
					.and( 'option "accept" is not visible' )
					.and( 'option "leave" is not visible' );
			} );

			it( 'should search & select correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is not visible' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should render with initial value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: [ { label: 'Leave', value: 'leave' } ],
				} )
					.when( 'user expands menu' )
					.then( 'option "accept" is not visible' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should change initially rendered value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: [ { label: 'Leave', value: 'leave' } ],
				} )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.and( 'user clears search' )
					.then( 'option "accept" is selected' )
					.and( 'option "change" is not visible' )
					.and( 'option "leave" is selected' )
					.and( 'search input has value "2 selected"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'datasource select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user searches for "accept"' )
					.and( 'user selects "accept"' )
					.then( 'option "accept" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: [ { label: 'Accept', value: 'accept', _type: 'life-option' } ],
					} )
				);
			} );
		} );
	} );
} );
