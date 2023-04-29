import { html } from 'lit-html';

import '@welingtonms/xb-tokens/dist/tokens/web/xb/variables.css';

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
		<div
			style="display: flex; align-items: center; justify-content: center; min-height: 50vh; gap: var(--xb-spacing-4); padding: var(--xb-spacing-8); background-color: var(--xb-color-background); background-size: 10px 10px; background-image: repeating-linear-gradient(45deg, rgba(var(--xb-color-gray-100), 0.9) 0, rgba(var(--xb-color-gray-100), 0.9) 1px, rgb(var(--xb-color-background)) 0, rgb(var(--xb-color-background)) 50%);"
		>
			${ Story() }
		</div>
	`,
];
