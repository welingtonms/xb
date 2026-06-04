import React from 'react';

import '../button/button.define';
import '../icon/icon.define';
import './top-nav.define';
import '../layout/cluster/cluster.define';

import '../text/text.define';

import toCSSValue from '../../utils/to-css-value';

/** @type {import('../../utils/arg-types').Meta} */
export default {
	title: 'Components/Navigation/Top Navigation',
	parameters: {
		layout: 'fullscreen',
	},
};

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
