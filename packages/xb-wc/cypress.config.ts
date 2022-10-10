import { defineConfig } from 'cypress';

export default defineConfig( {
	component: {
		devServer: {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore At this point we don't need any specific configuration, so a default webpack sourcing is enough
			framework: undefined, // Source: https://github.com/cypress-io/cypress/blob/af415e044d39cedfb008541a609b02d8811931d3/npm/webpack-dev-server/src/devServer.ts#L132
			bundler: 'webpack',
		},
	},
	includeShadowDom: false,
	screenshotOnRunFailure: false,
	video: false,
} );
