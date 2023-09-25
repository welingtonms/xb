import { html } from 'lit-html';

import '@welingtonms/xb-tokens/dist/tokens/web/xb/variables.css';
import './preview.css';

/** @type {import('@storybook/web-components').Preview} */
const preview = {
	parameters: {
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
	},
	decorators: [
		( Story ) => html`
			<div id="xb-root">${ Story() }</div>
		`,
	],
};

export default preview;
