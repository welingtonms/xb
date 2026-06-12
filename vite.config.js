/// <reference types="vitest/config" />
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

const dirname = path.dirname( fileURLToPath( import.meta.url ) );

const storybookBrowserConfig = {
	enabled: true,
	headless: true,
	provider: playwright( {} ),
	instances: [ { browser: 'chromium', name: 'storybook-chromium' } ],
};

const controllersBrowserConfig = {
	enabled: true,
	headless: true,
	provider: playwright( {} ),
	instances: [ { browser: 'chromium', name: 'controllers-chromium' } ],
};

export default defineConfig( {
	plugins: [
		react(),
		babel( {
			babelConfig: {
				babelrc: true,
				configFile: path.join( dirname, '.babelrc' ),
			},
			include: [ 'src/**/*.{js,jsx,mjs,cjs,ts,tsx}' ],
			exclude: [ /node_modules/ ],
		} ),
	],
	resolve: {
		alias: {
			'@': path.join( dirname, 'src' ),
		},
	},
	test: {
		coverage: {
			provider: 'v8',
			reporter: [ 'text', 'text-summary', 'html', 'lcov' ],
			reportsDirectory: './coverage',
			include: [ 'src/**/*.{js,ts}' ],
			exclude: [
				'src/**/*.stories.{js,jsx,ts,tsx}',
				'src/**/*.test.{js,ts}',
				'src/scripts/**',
				'**/*.define.js',
				'**/*.register.js',
			],
		},
		projects: [
			{
				extends: true,
				plugins: [
					storybookTest( {
						configDir: path.join( dirname, '.storybook' ),
						storybookScript: 'yarn storybook --no-open',
					} ),
				],
				test: {
					name: 'storybook',
					browser: storybookBrowserConfig,
					setupFiles: [ '@storybook/addon-vitest/internal/setup-file' ],
				},
			},
			{
				extends: true,
				test: {
					name: 'unit',
					environment: 'node',
					globals: true,
					include: [
						'src/utils/**/*.test.{js,ts}',
						'src/styles/**/*.test.{js,ts}',
					],
				},
			},
			{
				extends: true,
				test: {
					name: 'controllers',
					browser: controllersBrowserConfig,
					setupFiles: [ path.join( dirname, 'src/controllers/vitest.setup.js' ) ],
					include: [
						'src/controllers/**/*.test.{js,ts}',
						'src/components/form-element/**/*.test.{js,ts}',
					],
				},
			},
		],
	},
} );
