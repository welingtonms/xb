import { html, nothing } from 'lit';
import { state, property } from 'lit/decorators.js';

import { MediaQueryController } from '../../controllers/media-query';
import getToken from '../../utils/get-token';
import { XBElement } from '../xb-element';

import '../button/button.define';

import { topNavStyles } from './top-nav.styles';

/**
 * Top navigation (header) with responsive desktop/mobile layout.
 * Above the breakpoint (breakpoint-md): logo, nav slot, actions slot.
 * Below: logo and hamburger that opens the drawer.
 */
export class TopNav extends XBElement {
	static styles = [ topNavStyles() ];

	/** Whether the navigation is on desktop. */
	@property( { type: Boolean, reflect: true, attribute: 'is-desktop' } ) accessor isDesktop = false;

	/** Whether the drawer is open (mobile). */
	@state() accessor isDrawerOpen = false;

	/** @type {{
	 * mediaQuery: MediaQueryController;
	 * }} */
	#controllers;

	static define( config ) {
		XBElement.define( { name: 'xb-top-nav', ...config, type: TopNav } );
	}

	constructor() {
		super();

		this.#controllers = {
			mediaQuery: new MediaQueryController( this, {
				query: `(min-width: ${ getToken( 'breakpoint-md' ) })`,
				onMatch: ( matches ) => {
					this.isDesktop = matches;
				},
			} ),
		};
	}

	render() {
		return html`
			<header class="container" role="banner">
				<div class="logo">
					<slot name="logo"></slot>

					<xb-button
						variant="icon"
						size="sm"
						icon="list"
						class="mobile-trigger"
						aria-label="Open menu"
						aria-expanded=${ this.isDrawerOpen }
						aria-controls="top-nav-drawer"
						@click=${ this.#onMobileTriggerClick }
					></xb-button>
				</div>

				${ this.isDesktop
					? html`
							<nav class="nav" aria-label="Main">
								<slot name="nav-item"></slot>
							</nav>

							<div class="actions">
								<slot name="action"></slot>
							</div>
					  `
					: nothing }
			</header>

			${ this.isDesktop
				? nothing
				: html`
						<xb-drawer
							aria-label="Navigation menu"
							?open=${ this.isDrawerOpen }
							@close=${ () => {
								this.isDrawerOpen = false;
							} }
							style="--xb-dialog-width: 100%; --xb-dialog-max-width: 100%;"
						>
							<div slot="header" class="logo">
								<slot name="logo"></slot>
							</div>
							<nav slot="body" class="nav" aria-label="Main">
								<slot name="nav-item"></slot>
							</nav>
							<div slot="body" class="actions">
								<slot name="action"></slot>
							</div>
						</xb-drawer>
				  ` }
		`;
	}

	#onMobileTriggerClick = () => {
		this.isDrawerOpen = true;
	};
}
