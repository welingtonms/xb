import addonPerformancePanel from '@github-ui/storybook-addon-performance-panel';
import { definePreview } from '@storybook/react-vite';
import './variables.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = definePreview( {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	addons: [ addonPerformancePanel() ],
} );

export default preview;
