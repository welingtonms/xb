import React from 'react';

import { BorderlessArg, PaddinglessArg } from '../../../utils/arg-types';
import '../box/box.define';
import './reel.define';

export default {
	title: 'Foundation/Layouts/reel',
	component: 'xb-reel',
	argTypes: {
		paddingless: PaddinglessArg,
		borderless: BorderlessArg,
		children: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

export const Playground = {
	render: ( args ) => (
		<xb-box>
			<xb-reel>
				<div role="listitem">
					<a className="cta" href="/path/to/home">
						Home
					</a>
				</div>
				<div role="listitem">
					<a className="cta" href="/path/to/about">
						About
					</a>
				</div>
				<div role="listitem">
					<a className="cta" href="/path/to/pricing">
						Pricing
					</a>
				</div>
				<div role="listitem">
					<a className="cta" href="/path/to/docs">
						Documentation
					</a>
				</div>
				<div role="listitem">
					<a className="cta" href="/path/to/testimonials">
						Testimonials
					</a>
				</div>
				<div role="listitem">
					<a className="cta" href="/path/to/careers">
						Careers
					</a>
				</div>
				<div role="listitem">
					<a className="cta" href="/path/to/forum">
						Forum
					</a>
				</div>
				<div role="listitem">
					<a className="cta" href="/path/to/forum">
						Accessibility
					</a>
				</div>
			</xb-reel>
		</xb-box>
	),

	args: {
		paddingless: 'none',
		borderless: 'none',
	},
};
