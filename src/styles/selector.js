import { unsafeCSS } from 'lit';

class BaseSelectorBuilder {
	/**
	 * @param {string[]} base - The base selectors
	 * @param {string[]} attrs - The attribute selectors
	 * @param {string[]} pseudos - The pseudo-class selectors
	 */
	constructor( base = [], attrs = [], pseudos = [] ) {
		this.base = base;
		this.attrs = attrs;
		this.pseudos = pseudos;
	}

	/**
	 * Creates a new instance with the given parts
	 * @protected
	 * @param {string[]} base
	 * @param {string[]} attrs
	 * @param {string[]} pseudos
	 * @returns {BaseSelectorBuilder}
	 */
	_create( base = this.base, attrs = this.attrs, pseudos = this.pseudos ) {
		return new this.constructor( base, attrs, pseudos );
	}

	/**
	 * Adds attribute selector(s)
	 * @param {string[]} attrs - Attribute selectors (e.g. '[disabled]', '[type="text"]')
	 */
	attr( ...attrs ) {
		return this._create( this.base, [ ...this.attrs, ...attrs ], this.pseudos );
	}

	/**
	 * Adds class selector(s)
	 * @param {string[]} classes - Class names without the dot
	 */
	class( ...classes ) {
		return this._create(
			this.base,
			[ ...this.attrs, ...classes.map( ( c ) => `.${ c }` ) ],
			this.pseudos
		);
	}

	/**
	 * Adds pseudo-class selector(s)
	 * @param {string[]} pseudos - Pseudo-classes without the colon
	 */
	pseudo( ...pseudos ) {
		return this._create( this.base, this.attrs, [
			...this.pseudos,
			...pseudos.map( ( p ) => `:${ p }` ),
		] );
	}

	/**
	 * Adds :is() pseudo-class
	 * @param {string[]} subSelectors
	 */
	is( ...subSelectors ) {
		return this._create( this.base, this.attrs, [
			...this.pseudos,
			`:is(${ subSelectors.join( ', ' ) })`,
		] );
	}

	/**
	 * Adds :where() pseudo-class
	 * @param {string[]} subSelectors
	 */
	where( ...subSelectors ) {
		return this._create( this.base, this.attrs, [
			...this.pseudos,
			`:where(${ subSelectors.join( ', ' ) })`,
		] );
	}

	/**
	 * Adds :not() pseudo-class
	 * @param {string[]} subSelectors
	 */
	not( ...subSelectors ) {
		// If the subSelector starts with '[', it's an attribute selector
		// Otherwise, treat it as a pseudo-class
		const notSelector = `:not(${ subSelectors.join( ', ' ) })`;
		return this._create( this.base, this.attrs, [ ...this.pseudos, notSelector ] );
	}

	/**
	 * Adds :has() pseudo-class
	 * @param {string[]} subSelectors
	 */
	has( ...subSelectors ) {
		return this._create( this.base, this.attrs, [
			...this.pseudos,
			`:has(${ subSelectors.join( ', ' ) })`,
		] );
	}

	// Common state pseudo-classes as getters
	get enabled() {
		return this.pseudo( 'enabled' );
	}

	get disabled() {
		return this.pseudo( 'disabled' );
	}

	get checked() {
		return this.pseudo( 'checked' );
	}

	get indeterminate() {
		return this.pseudo( 'indeterminate' );
	}

	get hidden() {
		return this.attr( '[hidden]' );
	}

	get focused() {
		return this.is( ':focus-visible', ':focus-within', '.is-focused' );
	}

	get hovered() {
		return this.pseudo( 'hover' );
	}

	get active() {
		return this.pseudo( 'active' );
	}

	/**
	 * Returns the selector wrapped in Lit's unsafeCSS
	 */
	css() {
		return unsafeCSS( this.toString() );
	}
}

class SelectorBuilder extends BaseSelectorBuilder {
	/**
	 * @param {string | string[]} selectors
	 * @param {string[]} attrs
	 * @param {string[]} pseudos
	 */
	constructor( selectors, attrs = [], pseudos = [] ) {
		super( Array.isArray( selectors ) ? selectors : [ selectors ], attrs, pseudos );
	}

	toString() {
		const modifiers = [ ...this.pseudos, ...this.attrs ].join( '' );
		if ( ! modifiers ) {
			return this.base.join( ', ' );
		}
		return this.base.map( ( selector ) => `${ selector }${ modifiers }` ).join( ', ' );
	}

	/**
	 * Adds descendant combinator
	 * @param {string[]} descendants
	 */
	descendant( ...descendants ) {
		const modifiers = [ ...this.pseudos, ...this.attrs ].join( '' );
		return this._create(
			this.base
				.map( ( selector ) => descendants.map( ( d ) => `${ selector }${ modifiers } ${ d }` ) )
				.flat(),
			[], // Reset modifiers for the new instance
			[]
		);
	}

	/**
	 * Adds child combinator
	 * @param {string[]} children
	 */
	child( ...children ) {
		const modifiers = [ ...this.pseudos, ...this.attrs ].join( '' );
		return this._create(
			this.base
				.map( ( selector ) => children.map( ( c ) => `${ selector }${ modifiers } > ${ c }` ) )
				.flat(),
			[], // Reset modifiers for the new instance
			[]
		);
	}

	/**
	 * Adds adjacent sibling combinator
	 * @param {string[]} siblings
	 */
	adjacent( ...siblings ) {
		const modifiers = [ ...this.pseudos, ...this.attrs ].join( '' );
		return this._create(
			this.base
				.map( ( selector ) => siblings.map( ( s ) => `${ selector }${ modifiers } + ${ s }` ) )
				.flat(),
			[], // Reset modifiers for the new instance
			[]
		);
	}

	/**
	 * Adds general sibling combinator
	 * @param {string[]} siblings
	 */
	sibling( ...siblings ) {
		const modifiers = [ ...this.pseudos, ...this.attrs ].join( '' );
		return this._create(
			this.base
				.map( ( selector ) => siblings.map( ( s ) => `${ selector }${ modifiers } ~ ${ s }` ) )
				.flat(),
			[], // Reset modifiers for the new instance
			[]
		);
	}
}

class HostSelectorBuilder extends BaseSelectorBuilder {
	/**
	 * @param {string[]} base - The base selectors (always ':host')
	 * @param {string[]} attrs - The attribute selectors
	 * @param {string[]} pseudos - The pseudo-class selectors
	 */
	constructor( base = [ ':host' ], attrs = [], pseudos = [] ) {
		// Always use ':host' as the base selector
		super( [ ':host' ], attrs, pseudos );
	}

	get enabled() {
		return this.not( '[disabled]' );
	}

	get disabled() {
		return this.attr( '[disabled]' );
	}

	get checked() {
		return this.attr( '[checked]' );
	}

	get hidden() {
		return this.attr( '[hidden]' );
	}

	toString() {
		const modifiers = [ ...this.pseudos, ...this.attrs ];
		if ( modifiers.length === 0 ) {
			return ':host';
		}

		// For :host, we need to combine all modifiers inside the parentheses
		return `:host(${ modifiers.join( '' ) })`;
	}

	/**
	 * Adds descendant combinator
	 * @param {string[]} descendants
	 */
	descendant( ...descendants ) {
		// Create a new selector with the current host state
		const hostSelector = this.toString();
		return new SelectorBuilder( [ hostSelector ], [], [] ).descendant( ...descendants );
	}

	/**
	 * Adds child combinator
	 * @param {string[]} children
	 */
	child( ...children ) {
		// Create a new selector with the current host state
		const hostSelector = this.toString();
		return new SelectorBuilder( [ hostSelector ], [], [] ).child( ...children );
	}
}

/**
 * Creates a selector builder
 * @param {string | string[]} selectors - The base selector(s) to start with
 */
export function select( selectors ) {
	if ( [ 'host', ':host', ':host()' ].includes( selectors ) ) {
		return new HostSelectorBuilder( [ ':host' ] );
	}

	return new SelectorBuilder( selectors );
}

export function host() {
	return new HostSelectorBuilder( [ ':host' ] );
}

// Common form control states
export const states = {
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
};

// // Test our implementation
// function testHostSelectors() {
//     console.log('Testing HostSelectorBuilder...\n');

//     const $ = select(':host');

//     console.log('Test 1 - Basic host selector:');
//     console.log('  Got     :', $.toString());
//     console.log('  Expected: :host');
//     console.log();

//     console.log('Test 2 - Host with attribute:');
//     console.log('  Got     :', $.hidden.toString());
//     console.log('  Expected: :host([hidden])');
//     console.log();

//     console.log('Test 3 - Host with pseudo-class:');
//     console.log('  Got     :', $.hovered.toString());
//     console.log('  Expected: :host(:hover)');
//     console.log();

//     console.log('Test 4 - Host with :not() and pseudo-class:');
//     console.log('  Got     :', $.not('[aria-disabled="true"]').hovered.toString());
//     console.log('  Expected: :host(:not([aria-disabled="true"]):hover)');
//     console.log();

//     console.log('Test 5 - Host with :not(), pseudo-class, and descendant:');
//     console.log('  Got     :', $.not('[aria-disabled="true"]').hovered.descendant('#button').toString());
//     console.log('  Expected: :host(:not([aria-disabled="true"]):hover) #button');
//     console.log();

//     console.log('Test 6 - Host with :not(), attribute, and descendants:');
//     console.log('  Got     :', $.not('[aria-disabled="true"]').checked.descendant('#button').descendant('#check').toString());
//     console.log('  Expected: :host(:not([aria-disabled="true"])[checked]) #button #check');

//     console.log('Test 7 - Host with :is():');
//     console.log('  Got     :', $.is(':hover', ':focus', '[data-state="active"]').toString());
//     console.log('  Expected: :host(:is(:hover, :focus, [data-state="active"]))');
//     console.log();

//     console.log('Test 8 - Host with :has():');
//     console.log('  Got     :', $.has('.icon', 'img').toString());
//     console.log('  Expected: :host(:has(.icon, img))');
//     console.log();

//     console.log('Test 9 - Host with combined :is() and :has():');
//     console.log('  Got     :', $.is(':hover', ':focus').has('.icon').descendant('#label').toString());
//     console.log('  Expected: :host(:is(:hover, :focus):has(.icon)) #label');
//     console.log();
// }

// function testRegularSelectors() {
//     console.log('\nTesting SelectorBuilder...\n');

//     const $ = select('.button');

//     console.log('Test 1 - Basic class selector:');
//     console.log('  Got     :', $.toString());
//     console.log('  Expected: .button');
//     console.log();

//     console.log('Test 2 - With attribute:');
//     console.log('  Got     :', $.hidden.toString());
//     console.log('  Expected: .button[hidden]');
//     console.log();

//     console.log('Test 3 - With pseudo-class:');
//     console.log('  Got     :', $.hovered.toString());
//     console.log('  Expected: .button:hover');
//     console.log();

//     console.log('Test 4 - With :not() and pseudo-class:');
//     console.log('  Got     :', $.not('[aria-disabled="true"]').hovered.toString());
//     console.log('  Expected: .button:not([aria-disabled="true"]):hover');
//     console.log();

//     console.log('Test 5 - With :not(), pseudo-class, and descendant:');
//     console.log('  Got     :', $.not('[aria-disabled="true"]').hovered.descendant('#icon').toString());
//     console.log('  Expected: .button:not([aria-disabled="true"]):hover #icon');
//     console.log();

//     console.log('Test 6 - With :not(), attribute, and descendants:');
//     console.log('  Got     :', $.not('[aria-disabled="true"]').checked.descendant('#icon').descendant('#check').toString());
//     console.log('  Expected: .button:not([aria-disabled="true"])[checked] #icon #check');

//     console.log('Test 7 - With :is():');
//     console.log('  Got     :', $.is(':hover', ':focus', '[data-state="active"]').toString());
//     console.log('  Expected: .button:is(:hover, :focus, [data-state="active"])');
//     console.log();

//     console.log('Test 8 - With :has():');
//     console.log('  Got     :', $.has('.icon', 'img').toString());
//     console.log('  Expected: .button:has(.icon, img)');
//     console.log();

//     console.log('Test 9 - With combined :is() and :has():');
//     console.log('  Got     :', $.is(':hover', ':focus').has('.icon').descendant('#label').toString());
//     console.log('  Expected: .button:is(:hover, :focus):has(.icon) #label');
//     console.log();
// }

// function testSelectors() {
//     testHostSelectors();
//     testRegularSelectors();
// }

// testSelectors();
