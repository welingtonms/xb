import addonPerformancePanel from '@github-ui/storybook-addon-performance-panel';
import { definePreview } from '@storybook/react-webpack5';
import './variables.css';

/** @type { import('@storybook/react-webpack5').Preview } */
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
