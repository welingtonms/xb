import { unsafeCSS } from 'lit';

import { host, select, states } from './selector';

describe( 'select()', () => {
	it.each( [ 'host', ':host', ':host()' ] )( 'returns a HostSelectorBuilder for %s', ( selector ) => {
		expect( select( selector ).toString() ).toBe( ':host' );
	} );

	it( 'returns a SelectorBuilder for regular selectors', () => {
		expect( select( '.button' ).toString() ).toBe( '.button' );
	} );

	it( 'accepts an array of base selectors', () => {
		expect( select( [ '.a', '.b' ] ).toString() ).toBe( '.a, .b' );
	} );
} );

describe( 'host()', () => {
	it( 'returns a HostSelectorBuilder', () => {
		expect( host().toString() ).toBe( ':host' );
	} );
} );

describe( 'SelectorBuilder', () => {
	describe( 'toString()', () => {
		it( 'returns the base selector unchanged when there are no modifiers', () => {
			expect( select( '.button' ).toString() ).toBe( '.button' );
		} );

		it( 'joins multiple base selectors with commas', () => {
			expect( select( [ '.a', '.b', '#c' ] ).toString() ).toBe( '.a, .b, #c' );
		} );

		it( 'applies modifiers to every base selector', () => {
			expect( select( [ '.a', '.b' ] ).hovered.toString() ).toBe( '.a:hover, .b:hover' );
		} );
	} );

	describe( 'attr()', () => {
		it( 'appends attribute selectors after pseudo-classes', () => {
			expect( select( '.button' ).hidden.toString() ).toBe( '.button[hidden]' );
		} );

		it( 'supports multiple attribute selectors', () => {
			expect(
				select( '.button' ).attr( '[size="sm"]', '[variant="icon"]' ).toString()
			).toBe( '.button[size="sm"][variant="icon"]' );
		} );
	} );

	describe( 'class()', () => {
		it( 'appends class selectors', () => {
			expect( select( '.button' ).class( 'active', 'large' ).toString() ).toBe(
				'.button.active.large'
			);
		} );
	} );

	describe( 'pseudo()', () => {
		it( 'appends pseudo-class selectors', () => {
			expect( select( '.button' ).pseudo( 'focus' ).toString() ).toBe( '.button:focus' );
		} );
	} );

	describe( 'is()', () => {
		it( 'adds an :is() pseudo-class', () => {
			expect(
				select( '.button' ).is( ':hover', ':focus', '[data-state="active"]' ).toString()
			).toBe( '.button:is(:hover, :focus, [data-state="active"])' );
		} );
	} );

	describe( 'where()', () => {
		it( 'adds a :where() pseudo-class', () => {
			expect( select( '.button' ).where( ':hover', ':focus' ).toString() ).toBe(
				'.button:where(:hover, :focus)'
			);
		} );
	} );

	describe( 'not()', () => {
		it( 'adds a :not() pseudo-class', () => {
			expect( select( '.button' ).not( '[aria-disabled="true"]' ).toString() ).toBe(
				'.button:not([aria-disabled="true"])'
			);
		} );

		it( 'combines :not() with subsequent pseudo-classes', () => {
			expect(
				select( '.button' ).not( '[aria-disabled="true"]' ).hovered.toString()
			).toBe( '.button:not([aria-disabled="true"]):hover' );
		} );
	} );

	describe( 'has()', () => {
		it( 'adds a :has() pseudo-class', () => {
			expect( select( '.button' ).has( '.icon', 'img' ).toString() ).toBe(
				'.button:has(.icon, img)'
			);
		} );
	} );

	describe( 'state getters', () => {
		it( 'enabled', () => {
			expect( select( '.button' ).enabled.toString() ).toBe( '.button:enabled' );
		} );

		it( 'disabled', () => {
			expect( select( '.button' ).disabled.toString() ).toBe( '.button:disabled' );
		} );

		it( 'checked', () => {
			expect( select( '.button' ).checked.toString() ).toBe( '.button:checked' );
		} );

		it( 'indeterminate', () => {
			expect( select( '.button' ).indeterminate.toString() ).toBe(
				'.button:indeterminate'
			);
		} );

		it( 'hidden', () => {
			expect( select( '.button' ).hidden.toString() ).toBe( '.button[hidden]' );
		} );

		it( 'focused', () => {
			expect( select( '.button' ).focused.toString() ).toBe(
				'.button:is(:focus-visible, :focus-within, .is-focused)'
			);
		} );

		it( 'hovered', () => {
			expect( select( '.button' ).hovered.toString() ).toBe( '.button:hover' );
		} );

		it( 'active', () => {
			expect( select( '.button' ).active.toString() ).toBe( '.button:active' );
		} );
	} );

	describe( 'combinators', () => {
		it( 'descendant() appends a descendant selector and resets modifiers', () => {
			expect(
				select( '.button' ).not( '[aria-disabled="true"]' ).hovered.descendant( '#icon' ).toString()
			).toBe( '.button:not([aria-disabled="true"]):hover #icon' );
		} );

		it( 'descendant() chains across multiple calls', () => {
			expect(
				select( '.button' )
					.not( '[aria-disabled="true"]' )
					.checked.descendant( '#icon' )
					.descendant( '#check' )
					.toString()
			).toBe( '.button:not([aria-disabled="true"]):checked #icon #check' );
		} );

		it( 'child() appends a child combinator', () => {
			expect( select( '.button' ).hovered.child( '#icon' ).toString() ).toBe(
				'.button:hover > #icon'
			);
		} );

		it( 'adjacent() appends an adjacent sibling combinator', () => {
			expect( select( '.button' ).hovered.adjacent( '#icon' ).toString() ).toBe(
				'.button:hover + #icon'
			);
		} );

		it( 'sibling() appends a general sibling combinator', () => {
			expect( select( '.button' ).hovered.sibling( '#icon' ).toString() ).toBe(
				'.button:hover ~ #icon'
			);
		} );

		it( 'applies combinators to every base selector', () => {
			expect( select( [ '.a', '.b' ] ).hovered.descendant( '#icon' ).toString() ).toBe(
				'.a:hover #icon, .b:hover #icon'
			);
		} );
	} );

	describe( 'chained pseudo-classes', () => {
		it( 'combines :is() and :has() with a descendant', () => {
			expect(
				select( '.button' ).is( ':hover', ':focus' ).has( '.icon' ).descendant( '#label' ).toString()
			).toBe( '.button:is(:hover, :focus):has(.icon) #label' );
		} );
	} );

	describe( 'immutability', () => {
		it( 'returns a new instance from each modifier without mutating the original', () => {
			const base = select( '.button' );
			const hovered = base.hovered;

			expect( base.toString() ).toBe( '.button' );
			expect( hovered.toString() ).toBe( '.button:hover' );
		} );
	} );

	describe( 'css()', () => {
		it( 'wraps the selector string in Lit unsafeCSS', () => {
			const result = select( '.button' ).css();

			expect( result ).toEqual( unsafeCSS( '.button' ) );
			expect( result.cssText ).toBe( '.button' );
		} );

		it( 'reflects chained modifiers', () => {
			expect( select( '.button' ).hovered.css().cssText ).toBe( '.button:hover' );
		} );
	} );
} );

describe( 'HostSelectorBuilder', () => {
	describe( 'toString()', () => {
		it( 'returns :host when there are no modifiers', () => {
			expect( select( ':host' ).toString() ).toBe( ':host' );
		} );

		it( 'wraps modifiers inside :host(...)', () => {
			expect( select( ':host' ).hidden.toString() ).toBe( ':host([hidden])' );
			expect( select( ':host' ).hovered.toString() ).toBe( ':host(:hover)' );
		} );
	} );

	describe( 'host-specific state getters', () => {
		it( 'enabled uses :not([disabled])', () => {
			expect( select( ':host' ).enabled.toString() ).toBe( ':host(:not([disabled]))' );
		} );

		it( 'disabled uses the [disabled] attribute', () => {
			expect( select( ':host' ).disabled.toString() ).toBe( ':host([disabled])' );
		} );

		it( 'checked uses the [checked] attribute', () => {
			expect( select( ':host' ).checked.toString() ).toBe( ':host([checked])' );
		} );

		it( 'hidden uses the [hidden] attribute', () => {
			expect( select( ':host' ).hidden.toString() ).toBe( ':host([hidden])' );
		} );

		it( 'inherits pseudo-class getters from the base builder', () => {
			expect( select( ':host' ).hovered.toString() ).toBe( ':host(:hover)' );
			expect( select( ':host' ).active.toString() ).toBe( ':host(:active)' );
		} );
	} );

	describe( 'pseudo-class helpers', () => {
		it( 'combines :not() with a pseudo-class', () => {
			expect(
				select( ':host' ).not( '[aria-disabled="true"]' ).hovered.toString()
			).toBe( ':host(:not([aria-disabled="true"]):hover)' );
		} );

		it( 'adds :is()', () => {
			expect(
				select( ':host' ).is( ':hover', ':focus', '[data-state="active"]' ).toString()
			).toBe( ':host(:is(:hover, :focus, [data-state="active"]))' );
		} );

		it( 'adds :has()', () => {
			expect( select( ':host' ).has( '.icon', 'img' ).toString() ).toBe(
				':host(:has(.icon, img))'
			);
		} );
	} );

	describe( 'combinators', () => {
		it( 'descendant() transitions to a regular SelectorBuilder', () => {
			expect(
				select( ':host' ).not( '[aria-disabled="true"]' ).hovered.descendant( '#button' ).toString()
			).toBe( ':host(:not([aria-disabled="true"]):hover) #button' );
		} );

		it( 'descendant() chains across multiple calls', () => {
			expect(
				select( ':host' )
					.not( '[aria-disabled="true"]' )
					.checked.descendant( '#button' )
					.descendant( '#check' )
					.toString()
			).toBe( ':host(:not([aria-disabled="true"])[checked]) #button #check' );
		} );

		it( 'child() transitions to a regular SelectorBuilder', () => {
			expect( select( ':host' ).hovered.child( '#btn' ).toString() ).toBe(
				':host(:hover) > #btn'
			);
		} );

		it( 'combines :is(), :has(), and a descendant', () => {
			expect(
				select( ':host' ).is( ':hover', ':focus' ).has( '.icon' ).descendant( '#label' ).toString()
			).toBe( ':host(:is(:hover, :focus):has(.icon)) #label' );
		} );
	} );

	describe( 'css()', () => {
		it( 'wraps the host selector in Lit unsafeCSS', () => {
			expect( select( ':host' ).disabled.css().cssText ).toBe( ':host([disabled])' );
		} );
	} );
} );

describe( 'states', () => {
	it( 'exports common form control state selectors', () => {
		expect( states ).toEqual( {
			active: ':active',
			checked: ':checked',
			disabled: ':disabled',
			enabled: ':enabled',
			focused: ':is(:focus-visible, :focus-within, .is-focused)',
			hovered: ':hover',
			invalid: ':invalid',
			optional: ':optional',
			placeholder: '::placeholder',
			'placeholder-shown': ':placeholder-shown',
			'read-only': ':read-only',
			'read-write': ':read-write',
			required: ':required',
			valid: ':valid',
		} );
	} );
} );
