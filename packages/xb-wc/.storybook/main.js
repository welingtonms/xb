/** @type {import('@storybook/web-components-webpack5').StorybookConfig} */
const config = {
	stories: [ '../src/**/*.@(stories|api).mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/web-components-webpack5',
		options: {},
	},
	docs: {
		autodocs: true,
	},
};

export default config;
