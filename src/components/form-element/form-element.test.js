import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { html, render } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';

import { generateElementName, waitForUpgrade } from '../../utils/test-tools';
import { XBElement } from '../xb-element';
import { FormElement } from './form-element';
import { FormMemberMixin } from './form-member-element';

class TestFormControl extends FormElement {
	/** @type {FormDataEntryValue | FormData | null} */
	lastCommittedValue = null;

	/** @type {boolean | null} */
	lastDisabledState = null;

	/** @type {HTMLInputElement | null} */
	#controlSurface = null;

	resetCount = 0;

	render() {
		return html`<input id="control" type="text" required />`;
	}

	firstUpdated() {
		this.#controlSurface = this.renderRoot.querySelector( '#control' );
		super.firstUpdated();
	}

	getControlSurface() {
		return this.#controlSurface;
	}

	setFormValue( value, options = {} ) {
		this.lastCommittedValue = value;
		super.setFormValue( value, options );
	}

	onFormReset() {
		this.resetCount += 1;
		this.setFormValue( 'reset' );
	}

	onFormDisabled( disabled ) {
		this.lastDisabledState = disabled;
		super.onFormDisabled( disabled );
	}
}

class TestFormMember extends FormMemberMixin( FormElement ) {
	/** @type {FormDataEntryValue | FormData | null} */
	lastCommittedValue = null;

	render() {
		return html`<span></span>`;
	}

	setFormValue( value, options = {} ) {
		this.lastCommittedValue = value;
		super.setFormValue( value, options );
	}
}

class MockCompositeHost extends XBElement {
	@property( { type: String } ) accessor name;

	render() {
		return html`<slot></slot>`;
	}
}

const formControlTag = generateElementName();
customElements.define( formControlTag, TestFormControl );

const formMemberTag = generateElementName();
customElements.define( formMemberTag, TestFormMember );

const compositeHostTag = generateElementName();
customElements.define( compositeHostTag, MockCompositeHost );

class TestSurfaceControl extends FormElement {
	render() {
		return html`<input id="control" type="text" />`;
	}

	getControlSurface() {
		return this.renderRoot?.querySelector( '#control' ) ?? null;
	}

	#syncInputDisabled() {
		const disabled = this.effectiveDisabled;

		this.queuedWorkManager.push(
			() => {
				return Boolean( this.getControlSurface() );
			},
			() => {
				const surface = this.getControlSurface();
				if ( surface ) {
					surface.disabled = disabled;
				}
			}
		);
	}

	updated( changedProperties ) {
		if ( changedProperties.has( 'disabled' ) ) {
			this.#syncInputDisabled();
		}
	}

	onFormDisabled( disabled ) {
		super.onFormDisabled( disabled );
		this.#syncInputDisabled();
	}
}

const surfaceControlTag = generateElementName();
customElements.define( surfaceControlTag, TestSurfaceControl );

/** @type {HTMLDivElement} */
let container;

beforeEach( () => {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
} );

afterEach( () => {
	container.remove();
} );

/**
 * @param {import('lit').TemplateResult} template
 */
async function mount( template ) {
	render( template, container );

	const host = container.firstElementChild;

	if ( host ) {
		await waitForUpgrade( host );
	}

	return host;
}

describe( 'FormElement', () => {
	it( 'setFormValue updates tracked value', async () => {
		const host = await mount(
			staticHtml`<${ unsafeStatic( formControlTag ) } name="test"></${ unsafeStatic( formControlTag ) }>`
		);

		host.setFormValue( 'hello' );

		expect( host.lastCommittedValue ).toBe( 'hello' );
	} );

	it( 'setFormValue with syncValidity mirrors control surface validity', async () => {
		const host = await mount(
			staticHtml`<${ unsafeStatic( formControlTag ) } name="test"></${ unsafeStatic( formControlTag ) }>`
		);

		await host.updateComplete;

		host.getControlSurface().value = '';
		host.setFormValue( '', { syncValidity: true } );

		expect( host.validity.valueMissing ).toBe( true );
	} );

	it( 'formResetCallback delegates to onFormReset when connected', async () => {
		const host = await mount(
			staticHtml`<${ unsafeStatic( formControlTag ) } name="test"></${ unsafeStatic( formControlTag ) }>`
		);

		host.formResetCallback();

		expect( host.resetCount ).toBe( 1 );
		expect( host.lastCommittedValue ).toBe( 'reset' );
	} );

	it( 'formResetCallback is a no-op when disconnected', async () => {
		const host = await mount(
			staticHtml`<${ unsafeStatic( formControlTag ) } name="test"></${ unsafeStatic( formControlTag ) }>`
		);

		host.remove();
		host.formResetCallback();

		expect( host.resetCount ).toBe( 0 );
	} );

	it( 'formDisabledCallback delegates to onFormDisabled when connected', async () => {
		const host = await mount(
			staticHtml`<${ unsafeStatic( formControlTag ) } name="test"></${ unsafeStatic( formControlTag ) }>`
		);

		host.formDisabledCallback( true );

		expect( host.lastDisabledState ).toBe( true );
	} );

	it( 'formDisabledCallback delegates to onFormDisabled when disconnected', async () => {
		const host = await mount(
			staticHtml`<${ unsafeStatic( formControlTag ) } name="test"></${ unsafeStatic( formControlTag ) }>`
		);

		host.remove();
		host.formDisabledCallback( true );

		expect( host.lastDisabledState ).toBe( true );
		expect( host.effectiveDisabled ).toBe( true );
	} );

	it( 'formDisabledCallback syncs control surface without reflecting disabled attribute', async () => {
		const host = await mount(
			staticHtml`<${ unsafeStatic( surfaceControlTag ) } name="test"></${ unsafeStatic(
				surfaceControlTag
			) }>`
		);

		await host.updateComplete;

		host.formDisabledCallback( true );

		expect( host.hasAttribute( 'disabled' ) ).toBe( false );
		expect( host.effectiveDisabled ).toBe( true );
		expect( host.getControlSurface()?.disabled ).toBe( true );

		host.formDisabledCallback( false );

		expect( host.effectiveDisabled ).toBe( false );
		expect( host.getControlSurface()?.disabled ).toBe( false );
	} );

	it( 'author disabled persists when form-owner disable is cleared', async () => {
		const host = await mount(
			staticHtml`<${ unsafeStatic( surfaceControlTag ) } name="test" disabled></${ unsafeStatic(
				surfaceControlTag
			) }>`
		);

		await host.updateComplete;

		host.formDisabledCallback( true );
		host.formDisabledCallback( false );

		expect( host.effectiveDisabled ).toBe( true );
		expect( host.getControlSurface()?.disabled ).toBe( true );
	} );

	it( 'syncs form-owner disabled when mounted inside a disabled fieldset', async () => {
		render(
			html`<fieldset disabled>
				${ staticHtml`<${ unsafeStatic( surfaceControlTag ) } name="test"></${ unsafeStatic(
					surfaceControlTag
				) }>` }
			</fieldset>`,
			container
		);

		const host = container.querySelector( surfaceControlTag );
		await waitForUpgrade( host );
		await host.updateComplete;

		expect( host.effectiveDisabled ).toBe( true );
		expect( host.getControlSurface()?.disabled ).toBe( true );
	} );
} );

describe( 'FormMemberMixin', () => {
	it( 'setMemberFormValue passes null when inactive', async () => {
		const host = await mount(
			staticHtml`<${ unsafeStatic( formMemberTag ) } name="member"></${ unsafeStatic( formMemberTag ) }>`
		);

		host.setMemberFormValue( false, 'a' );
		expect( host.lastCommittedValue ).toBeNull();

		host.setMemberFormValue( true, 'a' );
		expect( host.lastCommittedValue ).toBe( 'a' );
	} );

	it( 'ensureGroupName copies name from composite group host', async () => {
		const host = await mount(
			staticHtml`
				<${ unsafeStatic( compositeHostTag ) } name="group-name">
					<${ unsafeStatic( formMemberTag ) } value="a"></${ unsafeStatic( formMemberTag ) }>
				</${ unsafeStatic( compositeHostTag ) }>
			`
		);

		const member = host.querySelector( formMemberTag );
		await waitForUpgrade( member );

		member.ensureGroupName( compositeHostTag, 'test-member' );

		expect( member.name ).toBe( 'group-name' );
	} );
} );
