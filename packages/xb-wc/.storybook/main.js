module.exports = {
	stories: [ '../src/**/*.@(stories|api).mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
	],
	framework: {
		name: '@storybook/web-components-webpack5',
		options: {},
	},
	docs: {
		autodocs: true,
	},
};
