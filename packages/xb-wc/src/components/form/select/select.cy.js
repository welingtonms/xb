import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { TestingFactory } from '../../../utils/test-tools';
import { useSyncOptions, useAsyncOptions, useSlowAsyncOptions } from './select.fixtures';

import './select.define';

function createAliases() {
	cy.get( 'xb-select' )
		.find( 'xb-text-input', { includeShadowDom: true } )
		.find( 'input', { includeShadowDom: true } )
		.as( 'searchInput' );

	// cy.get( 'xb-select' )
	// 	.find( 'xb-text-input', { includeShadowDom: true } )
	// 	.find( '.clear', { includeShadowDom: true } )
	// 	.as( 'clearButton' );

	cy.get( 'xb-select' ).find( 'xb-button', { includeShadowDom: true } ).as( 'handleButton' );

	cy.get( 'xb-select' ).find( 'xb-select-menu', { includeShadowDom: true } ).as( 'menu' );
}

const { given } = TestingFactory(
	/**
	 * @param {import('../../../utils/test-tools').TestingFactoryArgs} args
	 */
	function factory( { Given, When, Then } ) {
		Given(
			'static-options select is rendered with',
			( args = { loading: false, multiple: false, disabled: false, value } ) => {
				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();
			}
		);

		Given(
			'datasource select is rendered with',
			( args = { loading: false, multiple: false, disabled: false, value, datasources } ) => {
				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@xb:second=${ args.second }
						?disabled=${ args.disabled }
						value=${ args.value }
						.datasources=${ args.datasources }
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

			[ 'second', 'first', 'third' ].forEach( ( value ) => {
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
			cy.get( 'xb-option[value="first"]' ).should( 'be.visible' );
			cy.get( 'xb-option[value="second"]' ).should( 'be.visible' );
			cy.get( 'xb-option[value="third"]' ).should( 'be.visible' );
		} );

		Then( 'option {option} is visible', ( { option } ) => {
			cy.get( `xb-option[value="${ option }"]` ).should( 'exist' ).and( 'be.visible' );
		} );

		Then( 'no option is visible', () => {
			cy.get( 'xb-option[value="first"]' ).should( 'not.exist' );
			cy.get( 'xb-option[value="second"]' ).should( 'not.exist' );
			cy.get( 'xb-option[value="third"]' ).should( 'not.exist' );
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
		// 	[ 'second', 'first', 'third' ].forEach( ( value ) => {
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
			cy.get( '@menu' ).find( 'xb-spinner', { includeShadowDom: true } ).should( 'exist' );
		} );

		Then( 'loading is not visible', () => {
			cy.get( '@menu' ).find( 'xb-spinner', { includeShadowDom: true } ).should( 'not.exist' );
		} );
	}
);

describe( '<xb-select>', () => {
	describe( 'static options', () => {
		describe.only( 'single selection', () => {
			const args = {
				loading: false,
				multiple: false,
				disabled: false,
			};

			it( 'should expand/collapse correctly', () => {
				// given( 'static-options select is rendered with', args )
				// 	.when( 'user clicks the select' )
				// 	.then( 'menu is visible' )
				// 	.and( 'all options are visible' );
				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();

				cy.get( '@searchInput' ).click();
				cy.get( '@menu' ).should( 'be.visible' );

				cy.get( 'xb-option[value="first"]' ).should( 'be.visible' );
				cy.get( 'xb-option[value="second"]' ).should( 'be.visible' );
				cy.get( 'xb-option[value="third"]' ).should( 'be.visible' );

				cy.get( '@searchInput' ).click();
				cy.get( '@menu' ).should( 'not.be.visible' );
			} );

			it( 'should search correctly', () => {
				// given( 'static-options select is rendered with', args )
				// 	.when( 'user searches for "second"' )
				// 	.then( 'menu is visible' )
				// 	.and( 'option "second" is visible' )
				// 	.and( 'option "first" is not visible' )
				// 	.and( 'option "third" is not visible' );

				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();

				cy.get( '@searchInput' ).type( 'second' );

				cy.get( `xb-option[value="first"]` ).should( 'not.exist' );
				cy.get( `xb-option[value="second"]` ).should( 'exist' );
				cy.get( `xb-option[value="third"]` ).should( 'not.exist' );

				cy.get( '@searchInput' ).clear();

				cy.get( `xb-option[value="first"]` ).should( 'exist' );
				cy.get( `xb-option[value="second"]` ).should( 'exist' );
				cy.get( `xb-option[value="third"]` ).should( 'exist' );
			} );

			it( 'should select correctly', () => {
				// given( 'static-options select is rendered with', args )
				// 	.when( 'user expands menu' )
				// 	.and( 'user selects "third"' )
				// 	.then( 'option "first" is not selected' )
				// 	.and( 'option "second" is not selected' )
				// 	.and( 'option "third" is selected' )
				// 	.and( 'search input has value "Third"' );

				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();

				cy.get( '@handleButton' ).click();
				cy.get( '@menu' ).should( 'be.visible' );

				cy.get( `xb-option[value="third"]` ).click();

				cy.get( '@menu' ).should( 'not.be.visible' );

				cy.get( `xb-option[value="first"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="first"]` ).should( 'not.have.attr', 'aria-selected' );

				cy.get( `xb-option[value="second"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.attr', 'aria-selected' );

				cy.get( `xb-option[value="third"]` ).should( 'have.attr', 'selected' );
				cy.get( `xb-option[value="third"]` ).should( 'have.attr', 'aria-selected', 'true' );
			} );

			it( 'should search & select correctly', () => {
				// given( 'static-options select is rendered with', args )
				// 	.when( 'user searches for "first"' )
				// 	.and( 'user selects "first"' )
				// 	.then( 'option "first" is selected' )
				// 	.and( 'search input has value "First"' );

				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();

				cy.get( '@searchInput' ).type( 'first' );

				cy.get( `xb-option[value="first"]` ).click();

				cy.get( `xb-option[value="first"]` ).should( 'have.attr', 'selected' );
				cy.get( `xb-option[value="first"]` ).should( 'have.attr', 'aria-selected', 'true' );

				cy.get( `xb-option[value="second"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.attr', 'aria-selected' );

				cy.get( `xb-option[value="third"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="third"]` ).should( 'not.have.attr', 'aria-selected' );
			} );

			it( 'should render with initial value', () => {
				// given( 'static-options select is rendered with', {
				// 	...args,
				// 	value: { label: 'Third', value: 'third' },
				// } )
				// 	.when( 'user expands menu' )
				// 	.then( 'option "first" is not selected' )
				// 	.and( 'option "second" is not selected' )
				// 	.and( 'option "third" is selected' )
				// 	.and( 'search input has value "Third"' );
				// const onChangeSpy = cy.stub().as( 'onChangeSpy' );
				// change: ( e ) => onChangeSpy( e ),

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					value: 'third',
				};

				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();

				cy.get( '@handleButton' ).click();

				cy.get( `xb-option[value="first"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="first"]` ).should( 'not.have.attr', 'aria-selected' );

				cy.get( `xb-option[value="second"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.attr', 'aria-selected' );

				cy.get( `xb-option[value="third"]` ).should( 'have.attr', 'selected' );
				cy.get( `xb-option[value="third"]` ).should( 'have.attr', 'aria-selected', 'true' );
			} );

			it( 'should second initially rendered value', () => {
				// given( 'static-options select is rendered with', {
				// 	...args,
				// 	value: { label: 'Third', value: 'third' },
				// } )
				// 	.when( 'user expands menu' )
				// 	.and( 'user selects "first"' )
				// 	.then( 'option "first" is selected' )
				// 	.and( 'option "second" is not selected' )
				// 	.and( 'option "third" is not selected' )
				// 	.and( 'search input has value "First"' );
				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					value: 'third',
				};

				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();

				cy.get( '@handleButton' ).click();

				cy.get( `xb-option[value="first"]` ).click();

				cy.get( `xb-option[value="first"]` ).should( 'have.attr', 'selected' );
				cy.get( `xb-option[value="first"]` ).should( 'have.attr', 'aria-selected', 'true' );

				cy.get( `xb-option[value="second"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.attr', 'aria-selected' );

				cy.get( `xb-option[value="third"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="third"]` ).should( 'not.have.attr', 'aria-selected', 'true' );
			} );

			// TODO
			it.skip( 'should select & clear correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user expands menu' )
					.and( 'user selects "first"' )
					.and( 'user clears search' )
					.then( 'search input is empty' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();

				cy.get( '@handleButton' ).click();
				cy.get( '@menu' ).should( 'be.visible' );

				cy.get( `xb-option[value="first"]` ).click();

				cy.get( '@menu' ).should( 'not.be.visible' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'target.value', 'first' )
				);
			} );

			it( 'should navigate with keyboard correctly', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();

				cy.get( '@menu' ).should( 'not.be.visible' );

				cy.get( '@searchInput' ).focus();

				cy.get( '@searchInput' ).type( '{downArrow}' );

				cy.get( '@menu' ).should( 'be.visible' );

				cy.get( `xb-option[value="first"]` ).should( 'have.class', 'is-focused' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="third"]` ).should( 'not.have.class', 'is-focused' );

				cy.get( '@searchInput' ).type( '{downArrow}' );

				cy.get( `xb-option[value="first"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="second"]` ).should( 'have.class', 'is-focused' );
				cy.get( `xb-option[value="third"]` ).should( 'not.have.class', 'is-focused' );

				cy.get( '@searchInput' ).type( '{downArrow}' );

				cy.get( `xb-option[value="first"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="third"]` ).should( 'have.class', 'is-focused' );

				// returns to first option
				cy.get( '@searchInput' ).type( '{downArrow}' );

				cy.get( `xb-option[value="first"]` ).should( 'have.class', 'is-focused' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="third"]` ).should( 'not.have.class', 'is-focused' );

				// returns to last option
				cy.get( '@searchInput' ).type( '{upArrow}' );

				cy.get( `xb-option[value="first"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="third"]` ).should( 'have.class', 'is-focused' );

				cy.get( '@searchInput' ).type( '{upArrow}' );

				cy.get( `xb-option[value="first"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="second"]` ).should( 'have.class', 'is-focused' );
				cy.get( `xb-option[value="third"]` ).should( 'not.have.class', 'is-focused' );

				cy.get( '@searchInput' ).type( '{upArrow}' );

				cy.get( `xb-option[value="first"]` ).should( 'have.class', 'is-focused' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="third"]` ).should( 'not.have.class', 'is-focused' );

				cy.get( '@searchInput' ).type( '{esc}' );

				cy.get( '@menu' ).should( 'not.be.visible' );

				// expands and [virtually] focus on last option
				cy.get( '@searchInput' ).type( '{upArrow}' );

				cy.get( '@menu' ).should( 'be.visible' );

				cy.get( `xb-option[value="first"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="second"]` ).should( 'not.have.class', 'is-focused' );
				cy.get( `xb-option[value="third"]` ).should( 'have.class', 'is-focused' );
			} );

			it( 'should search & select with keyboard correctly', () => {
				// given( 'static-options select is rendered with', args )
				// 	.when( 'user searches for "second"' )
				// 	.then( 'menu is visible' )
				// 	.and( 'option "second" is visible' )
				// 	.and( 'option "first" is not visible' )
				// 	.and( 'option "third" is not visible' );

				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				const args = {
					loading: false,
					multiple: false,
					disabled: false,
					change: ( e ) => onChangeSpy( e ),
				};

				cy.mount( html`
					<xb-select
						?loading=${ args.loading }
						?multiple=${ args.multiple }
						@change=${ args.change }
						?disabled=${ args.disabled }
						value=${ args.value }
					>
						<xb-option value="first">First</xb-option>
						<xb-option value="second">Second</xb-option>
						<xb-option value="third">Third</xb-option>
					</xb-select>
				` );

				createAliases();

				cy.get( '@menu' ).should( 'not.be.visible' );

				cy.get( '@searchInput' ).type( 'second' );

				cy.get( '@menu' ).should( 'be.visible' );

				cy.get( `xb-option[value="first"]` ).should( 'not.exist' );
				cy.get( `xb-option[value="second"]` ).should( 'exist' );
				cy.get( `xb-option[value="third"]` ).should( 'not.exist' );

				cy.get( '@searchInput' ).type( '{downArrow}' );

				cy.get( '@searchInput' ).type( '{enter}' );

				cy.get( '@menu' ).should( 'not.be.visible' );

				cy.get( '@handleButton' ).click();

				cy.get( `xb-option[value="first"]` ).should( 'exist' );
				cy.get( `xb-option[value="second"]` ).should( 'exist' );
				cy.get( `xb-option[value="third"]` ).should( 'exist' );

				cy.get( `xb-option[value="first"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="first"]` ).should( 'not.have.attr', 'aria-selected' );

				cy.get( `xb-option[value="second"]` ).should( 'have.attr', 'selected' );
				cy.get( `xb-option[value="second"]` ).should( 'have.attr', 'aria-selected', 'true' );

				cy.get( `xb-option[value="third"]` ).should( 'not.have.attr', 'selected' );
				cy.get( `xb-option[value="third"]` ).should( 'not.have.attr', 'aria-selected' );
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
					.when( 'user searches for "second"' )
					.then( 'menu is visible' )
					.and( 'option "second" is visible' )
					.and( 'option "first" is not visible' )
					.and( 'option "third" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user searches for "second"' )
					.and( 'user clears search' )
					.then( 'all options are visible' )
					.and( 'search input is empty' );
			} );

			it( 'should select correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user expands menu' )
					.and( 'user selects "second"' )
					.and( 'user selects "third"' )
					.then( 'option "first" is not selected' )
					.and( 'option "second" is selected' )
					.and( 'option "third" is selected' )
					.and( 'search input has value "2 selected"' );
			} );

			it( 'should search & select correctly', () => {
				given( 'static-options select is rendered with', args )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is not visible' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should render with initial value', () => {
				given( 'static-options select is rendered with', {
					...args,
					value: { label: 'Third', value: 'third' },
				} )
					.when( 'user expands menu' )
					.then( 'option "first" is not selected' )
					.and( 'option "second" is not selected' )
					.and( 'option "third" is selected' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should second initially rendered value', () => {
				given( 'static-options select is rendered with', {
					...args,
					value: { label: 'Third', value: 'third' },
				} )
					.when( 'user expands menu' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not selected' )
					.and( 'option "third" is selected' )
					.and( 'search input has value "2 selected"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'static-options select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user expands menu' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: [ { label: 'First', value: 'first', _type: 'generic' } ],
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
					.when( 'user searches for "second"' )
					.then( 'menu is visible' )
					.and( 'option "second" is visible' )
					.and( 'option "first" is not visible' )
					.and( 'option "third" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "second"' )
					.and( 'user clears search' )
					.then( 'option "second" is visible' )
					.and( 'search input is empty' );
			} );

			it( 'should search & select correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is not visible' )
					.and( 'search input has value "First"' );
			} );

			it( 'should render with initial value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: { label: 'Third', value: 'third' },
				} )
					.when( 'user expands menu' )
					.then( 'option "first" is not visible' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is selected' )
					.and( 'search input has value "Third"' );
			} );

			it( 'should second initially rendered value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: { label: 'Third', value: 'third' },
				} )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is not visible' )
					.and( 'search input has value "First"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'datasource select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: { label: 'First', value: 'first', _type: 'life-option' },
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
					.when( 'user searches for "second"' )
					.then( 'menu is visible' )
					.and( 'option "second" is visible' )
					.and( 'option "first" is not visible' )
					.and( 'option "third" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "second"' )
					.and( 'user clears search' )
					.then( 'option "second" is visible' )
					.and( 'search input is empty' );
			} );

			it( 'should search & select correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is not visible' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should render with initial value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: [ { label: 'Third', value: 'third' } ],
				} )
					.when( 'user expands menu' )
					.then( 'option "first" is not visible' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is selected' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should second initially rendered value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: [ { label: 'Third', value: 'third' } ],
				} )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.and( 'user clears search' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is selected' )
					.and( 'search input has value "2 selected"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'datasource select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: [ { label: 'First', value: 'first', _type: 'life-option' } ],
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
					.when( 'user searches for "second"' )
					.then( 'menu is visible' )
					.and( 'option "second" is visible' )
					.and( 'option "first" is not visible' )
					.and( 'option "third" is not visible' );
			} );

			it( 'should show loading during search correctly', () => {
				given( 'datasource select is rendered with', {
					...args,
					datasources: [ useSlowAsyncOptions ],
				} )
					.when( 'user searches for "second"' )
					.then( 'menu is visible' )
					.and( 'loading is visible' )
					.and( 'option "second" is visible' )
					.and( 'option "first" is not visible' )
					.and( 'option "third" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "second"' )
					.and( 'user clears search' )
					.then( 'option "second" is visible' )
					.and( 'search input is empty' );
			} );

			it( 'should search & select correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is not visible' )
					.and( 'search input has value "First"' );
			} );

			it( 'should render with initial value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: { label: 'Third', value: 'third' },
				} )
					.when( 'user expands menu' )
					.then( 'option "first" is not visible' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is selected' )
					.and( 'search input has value "Third"' );
			} );

			it( 'should second initially rendered value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: { label: 'Third', value: 'third' },
				} )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is not visible' )
					.and( 'search input has value "First"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'datasource select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: { label: 'First', value: 'first', _type: 'life-option' },
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
					.when( 'user searches for "second"' )
					.then( 'menu is visible' )
					.and( 'option "second" is visible' )
					.and( 'option "first" is not visible' )
					.and( 'option "third" is not visible' );
			} );

			it( 'should clear search correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "second"' )
					.and( 'user clears search' )
					.then( 'option "second" is visible' )
					.and( 'search input is empty' );
			} );

			it( 'should show loading during search correctly', () => {
				given( 'datasource select is rendered with', {
					...args,
					datasources: [ useSlowAsyncOptions ],
				} )
					.when( 'user searches for "second"' )
					.then( 'menu is visible' )
					.and( 'loading is visible' )
					.and( 'option "second" is visible' )
					.and( 'option "first" is not visible' )
					.and( 'option "third" is not visible' );
			} );

			it( 'should search & select correctly', () => {
				given( 'datasource select is rendered with', args )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is not visible' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should render with initial value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: [ { label: 'Third', value: 'third' } ],
				} )
					.when( 'user expands menu' )
					.then( 'option "first" is not visible' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is selected' )
					.and( 'search input has value "1 selected"' );
			} );

			it( 'should second initially rendered value', () => {
				given( 'datasource select is rendered with', {
					...args,
					value: [ { label: 'Third', value: 'third' } ],
				} )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.and( 'user clears search' )
					.then( 'option "first" is selected' )
					.and( 'option "second" is not visible' )
					.and( 'option "third" is selected' )
					.and( 'search input has value "2 selected"' );
			} );

			it( 'should call onChange callback', () => {
				const onChangeSpy = cy.stub().as( 'onChangeSpy' );

				given( 'datasource select is rendered with', {
					...args,
					change: ( e ) => onChangeSpy( e ),
				} )
					.when( 'user searches for "first"' )
					.and( 'user selects "first"' )
					.then( 'option "first" is selected' );

				cy.get( '@onChangeSpy' ).should(
					'have.been.calledWith',
					Cypress.sinon.match.hasNested( 'detail', {
						value: [ { label: 'First', value: 'first', _type: 'life-option' } ],
					} )
				);
			} );
		} );
	} );
} );
