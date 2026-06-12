import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import babel from 'vite-plugin-babel';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: [
		'../stories/**/*.mdx',
		'../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-docs',
		'@storybook/addon-vitest',
		'@github-ui/storybook-addon-performance-panel',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	async viteFinal( config ) {
		const dirname = path.dirname( fileURLToPath( import.meta.url ) );

		return mergeConfig( config, {
			plugins: [
				babel( {
					babelConfig: {
						babelrc: true,
						configFile: path.join( dirname, '..', '.babelrc' ),
					},
					include: [ '../src/**/*.{js,jsx,mjs,cjs,ts,tsx}' ],
					exclude: [ /node_modules/ ],
				} ),
			],
		} );
	},
};

export default config;
