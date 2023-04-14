module.exports = {
	stories: [ '../src/**/*.@(stories|api).mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
	addons: [ '@storybook/addon-links', '@storybook/addon-essentials' ],
	framework: {
		name: '@storybook/web-components-webpack5',
		options: {},
	},
	docs: {
		autodocs: true,
	},
};
