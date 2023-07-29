import { html } from 'lit-html';

import '@welingtonms/xb-tokens/dist/tokens/web/xb/variables.css';
import './preview.css';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	layout: 'fullscreen',
	options: {
		storySort: {
			order: [
				'Introduction',
				'Getting started',
				'Design Tokens',
				'Contributing',
				'Foundation',
				'Components',
				'Metacomponents',
				'Type definitions',
			],
		},
	},
};

export const decorators = [
	( Story ) => html`
		<div id="xb-root">${ Story() }</div>
	`,
];
