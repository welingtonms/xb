import React from 'react';

import { userEvent, expect, waitFor } from 'storybook/test';

import { queryShadow, waitForUpgrade } from '../../utils/test-tools.js';
import toCSSValue from '../../utils/to-css-value';

import '../button/button.define';
import '../icon/icon.define';
import './top-nav.define';
import '../layout/cluster/cluster.define';

import '../text/text.define';

/** @type {import('../../utils/arg-types').Meta} */
export default {
	title: 'Components/Navigation/Top Navigation',
	parameters: {
		layout: 'fullscreen',
	},
};

const TestNavContent = () => (
	<>
		<span slot="logo">Logo</span>
		<xb-top-nav-item slot="nav-item" href="#products">
			Products
		</xb-top-nav-item>
		<xb-top-nav-item slot="nav-item" href="#services">
			Services
		</xb-top-nav-item>
		<xb-button slot="action" variant="primary">
			Sign up
		</xb-button>
	</>
);

/**
 * @param {import('./top-nav').TopNav} topNav
 * @param {boolean} isDesktop
 */
async function setLayoutMode( topNav, isDesktop ) {
	topNav.isDesktop = isDesktop;
	await topNav.updateComplete;
}

/**
 * @param {import('./top-nav').TopNav} topNav
 */
function getMobileTrigger( topNav ) {
	return queryShadow( topNav, '.mobile-trigger' );
}

/**
 * @param {import('./top-nav').TopNav} topNav
 */
function getDrawer( topNav ) {
	return queryShadow( topNav, 'xb-drawer' );
}

/**
 * @param {HTMLElement} canvasElement
 */
async function getTopNav( canvasElement ) {
	const topNav = canvasElement.querySelector( 'xb-top-nav' );
	await waitForUpgrade( topNav );
	return /** @type {import('./top-nav').TopNav} */ ( topNav );
}

const resourcesPanel = (
	<>
		<xb-top-nav-item icon="file-text">
			Blogs
			<span slot="description">
				The latest industry news and guides curated by our expert team.
			</span>
		</xb-top-nav-item>
		<xb-top-nav-item icon="sparkle">
			Customer stories
			<span slot="description">
				Learn how our customers are using Untitled UI to 10x their growth.
			</span>
		</xb-top-nav-item>
		<xb-top-nav-item icon="play">
			Video tutorials
			<span slot="description">Get up and running on our newest features and in-depth guides.</span>
		</xb-top-nav-item>
		<xb-top-nav-item icon="file-text">
			Documentation
			<span slot="description">
				In-depth articles on our tools and technologies to empower teams.
			</span>
		</xb-top-nav-item>
		<xb-top-nav-item icon="headset">
			Help and support
			<span slot="description">
				Need help with something? Our expert team is here to help 24/7.
			</span>
		</xb-top-nav-item>
	</>
);

/** @type {import('../../utils/arg-types').StoryObj} */
export const Playground = {
	render: () => (
		<xb-top-nav>
			<xb-cluster slot="logo">
				<xb-icon
					name="circle-half"
					style={ { color: toCSSValue( 'color-primary-500' ) } }
				></xb-icon>
				<xb-text variant="text-md" style={ { fontWeight: 'bold' } }>
					Untitled UI
				</xb-text>
			</xb-cluster>

			<xb-top-nav-item slot="nav-item" href="#products">
				Products
			</xb-top-nav-item>
			<xb-top-nav-item slot="nav-item" href="#services">
				Services
			</xb-top-nav-item>
			<xb-top-nav-item slot="nav-item" href="#pricing">
				Pricing
			</xb-top-nav-item>
			<xb-top-nav-item slot="nav-item">
				Resources
				<xb-top-nav-menu slot="sub-menu">{ resourcesPanel }</xb-top-nav-menu>
			</xb-top-nav-item>
			<xb-top-nav-item slot="nav-item" href="#about">
				About
			</xb-top-nav-item>

			<xb-button slot="action" variant="secondary-gray">
				Log in
			</xb-button>
			<xb-button slot="action" variant="primary">
				Sign up
			</xb-button>
		</xb-top-nav>
	),
};

export const DesktopLayout = {
	name: 'Test: Desktop layout',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-top-nav is-desktop>
			<TestNavContent />
		</xb-top-nav>
	),
	play: async ( { canvasElement, step } ) => {
		const topNav = await getTopNav( canvasElement );
		await setLayoutMode( topNav, true );

		await step( 'renders inline navigation and actions', async () => {
			await expect( queryShadow( topNav, 'header .nav' ) ).toBeTruthy();
			await expect( queryShadow( topNav, 'header .actions' ) ).toBeTruthy();
			await expect( topNav ).toHaveTextContent( 'Products' );
			await expect( topNav ).toHaveTextContent( 'Sign up' );
		} );

		await step( 'does not render a mobile drawer', async () => {
			await expect( getDrawer( topNav ) ).toBeNull();
		} );
	},
};

export const MobileDrawerOpens = {
	name: 'Test: Mobile drawer opens',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-top-nav>
			<TestNavContent />
		</xb-top-nav>
	),
	play: async ( { canvasElement, step } ) => {
		const topNav = await getTopNav( canvasElement );
		await setLayoutMode( topNav, false );
		const trigger = getMobileTrigger( topNav );
		await waitForUpgrade( trigger );

		await step( 'hamburger opens the drawer', async () => {
			await expect( trigger ).toHaveAttribute( 'aria-expanded', 'false' );
			await userEvent.click( trigger );
			await waitFor( async () => {
				await expect( trigger ).toHaveAttribute( 'aria-expanded', 'true' );
				await expect( getDrawer( topNav )?.open ).toBe( true );
			} );
		} );
	},
};

export const MobileDrawerCloses = {
	name: 'Test: Mobile drawer closes',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-top-nav>
			<TestNavContent />
		</xb-top-nav>
	),
	play: async ( { canvasElement, step } ) => {
		const topNav = await getTopNav( canvasElement );
		await setLayoutMode( topNav, false );
		const trigger = getMobileTrigger( topNav );
		await waitForUpgrade( trigger );

		await step( 'opens the drawer', async () => {
			await userEvent.click( trigger );
			await waitFor( async () => {
				await expect( trigger ).toHaveAttribute( 'aria-expanded', 'true' );
			} );
		} );

		await step( 'close button closes the drawer', async () => {
			const drawer = getDrawer( topNav );
			const closeButton = queryShadow( drawer, '.close-button' );
			await waitForUpgrade( closeButton );
			await userEvent.click( closeButton );
			await waitFor( async () => {
				await expect( trigger ).toHaveAttribute( 'aria-expanded', 'false' );
				await expect( drawer?.open ).toBe( false );
			} );
		} );
	},
};

export const MobileDrawerShowsSlots = {
	name: 'Test: Mobile drawer shows slots',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-top-nav>
			<TestNavContent />
		</xb-top-nav>
	),
	play: async ( { canvasElement, step } ) => {
		const topNav = await getTopNav( canvasElement );
		await setLayoutMode( topNav, false );
		const trigger = getMobileTrigger( topNav );
		await waitForUpgrade( trigger );

		await step( 'opens the drawer', async () => {
			await userEvent.click( trigger );
			await waitFor( async () => {
				await expect( getDrawer( topNav )?.open ).toBe( true );
			} );
		} );

		await step( 'slotted logo, nav items, and actions are visible', async () => {
			await expect( topNav ).toHaveTextContent( 'Logo' );
			await expect( topNav ).toHaveTextContent( 'Products' );
			await expect( topNav ).toHaveTextContent( 'Services' );
			await expect( topNav ).toHaveTextContent( 'Sign up' );
		} );
	},
};

// <div
// 	slot="drawer"
// 	style={ { display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' } }
// >
// 	<div style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
// 		<span style={ { fontWeight: 600 } }>Menu</span>
// 		<xb-button
// 			variant="tertiary-gray"
// 			icon="x"
// 			aria-label="Close menu"
// 			onclick={ ( e ) => {
// 				const topNav = e.target.closest( 'xb-top-nav' );
// 				const drawer = topNav?.shadowRoot?.querySelector( 'xb-drawer' );
// 				if ( drawer ) drawer.close();
// 			} }
// 		></xb-button>
// 	</div>
// 	<nav style={ { display: 'flex', flexDirection: 'column', gap: '8px' } }>
// 		<a
// 			href="#products"
// 			style={ { color: 'inherit', textDecoration: 'none', padding: '8px 0' } }
// 		>
// 			Products
// 		</a>
// 		<a
// 			href="#services"
// 			style={ { color: 'inherit', textDecoration: 'none', padding: '8px 0' } }
// 		>
// 			Services
// 		</a>
// 		<a
// 			href="#pricing"
// 			style={ { color: 'inherit', textDecoration: 'none', padding: '8px 0' } }
// 		>
// 			Pricing
// 		</a>
// 		<xb-top-nav-menu expandable>
// 			<span slot="trigger">Resources</span>
// 			<div slot="panel">{ resourcesPanel }</div>
// 		</xb-top-nav-menu>
// 		<a href="#about" style={ { color: 'inherit', textDecoration: 'none', padding: '8px 0' } }>
// 			About
// 		</a>
// 	</nav>
// 	<div style={ { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' } }>
// 		<xb-button variant="primary" style={ { width: '100%' } }>
// 			Sign up
// 		</xb-button>
// 		<xb-button variant="secondary-gray" style={ { width: '100%' } }>
// 			Log in
// 		</xb-button>
// 	</div>
// </div>
