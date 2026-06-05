/**
 * Pre-publish smoke test: pack @welingtonms/xb, install the tarball in a local
 * Vite app (gitignored at examples/vite-consumer/), and run vite build.
 *
 * Manual dev server after a successful run:
 *   cd examples/vite-consumer && npm run dev
 */

import { execSync } from 'node:child_process';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join( dirname( fileURLToPath( import.meta.url ) ), '..' );
const consumerDir = join( root, 'examples', 'vite-consumer' );

const pkg = JSON.parse( await readFile( join( root, 'package.json' ), 'utf8' ) );
const tarballName = `welingtonms-xb-${ pkg.version }.tgz`;

const scaffold = {
	'index.html': `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>XB form playground (consumer smoke)</title>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap"
			rel="stylesheet"
		/>
		<link rel="stylesheet" href="/node_modules/@welingtonms/xb/dist/tokens/variables.css" />
		<style>
			body {
				font-family: var( --xb-font-family-default );
				font-weight: var( --xb-font-weight-regular );
				font-size: var( --xb-font-size-base );
				line-height: var( --xb-line-height-default );
				color: rgba( var( --xb-color-gray-700 ), 1 );
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				margin: 2rem;
				max-width: 48rem;
			}
			fieldset {
				padding: 0;
				margin: 0;
				border: none;
			}
			hr {
				margin: 1.5rem 0;
				border: none;
				border-top: 1px solid #e5e7eb;
			}
		</style>
	</head>
	<body>
		<h1>Form playground</h1>
		<p>Reproduction of <code>form.stories.jsx</code> Playground (packed tarball).</p>

		<xb-cluster>
			<xb-i18n-provider locale="en-US">
				<form id="playground-form" action="http://www.foo.com" method="post">
					<xb-stack>
						<fieldset>
							<xb-stack>
								<xb-cluster>
									<xb-text-input
										type="text"
										name="xb-text-input"
										placeholder="XB Greeting"
									></xb-text-input>
								</xb-cluster>

								<xb-stack>
									<xb-checkbox name="xb-checkbox" value="agree-tc">
										Agree with T&amp;C s
									</xb-checkbox>
									<xb-checkbox name="xb-checkbox">I want to receive newsletter</xb-checkbox>
								</xb-stack>

								<xb-cluster>
									<xb-text>Accept cookies</xb-text>
									<xb-radio-group name="xb-radio-group">
										<xb-radio value="yes">Yes</xb-radio>
										<xb-radio value="no">No</xb-radio>
									</xb-radio-group>
								</xb-cluster>

								<xb-cluster>
									<xb-switch name="xb-switch" value="accept-life-options">
										Accept life options switch
									</xb-switch>
								</xb-cluster>

								<xb-cluster>
									<xb-toggle-group type="single-strict" name="xb-toggle-group" data-log-change>
										<xb-toggle
											id="left-toggle"
											value="align-left"
											aria-label="Align text to the left"
										>
											<xb-icon name="text-align-left"></xb-icon>
										</xb-toggle>
										<xb-tooltip anchor="left-toggle">Align text to the left</xb-tooltip>

										<xb-toggle
											id="center-toggle"
											value="align-center"
											aria-label="Align text to the center"
										>
											<xb-icon name="text-align-center"></xb-icon>
										</xb-toggle>
										<xb-tooltip anchor="center-toggle" placement="bottom">
											Align text to the center
										</xb-tooltip>

										<xb-toggle
											id="right-toggle"
											value="align-right"
											aria-label="Align text to the right"
										>
											<xb-icon name="text-align-right"></xb-icon>
										</xb-toggle>
										<xb-tooltip anchor="right-toggle">Align text to the right</xb-tooltip>

										<xb-toggle
											id="justify-toggle"
											value="align-justify"
											aria-label="Align text to the justify"
										>
											<xb-icon name="text-align-justify"></xb-icon>
										</xb-toggle>
										<xb-tooltip anchor="justify-toggle" placement="bottom">
											Align text to the justify
										</xb-tooltip>
									</xb-toggle-group>
								</xb-cluster>

								<xb-cluster>
									<xb-select clearable name="xb-select" data-log-change>
										<xb-option value="letter-a">Letter A</xb-option>
										<xb-option value="letter-b">Letter B</xb-option>
										<xb-option value="letter-c">Letter C</xb-option>
									</xb-select>
								</xb-cluster>

								<xb-cluster>
									<xb-date-picker
										id="date-picker"
										clearable
										name="xb-date-picker"
										data-log-change
									></xb-date-picker>
									<xb-date-range-picker
										id="date-range-picker"
										clearable
										name="xb-date-range-picker"
										data-log-change
									></xb-date-range-picker>
								</xb-cluster>
							</xb-stack>

							<hr />

							<xb-cluster>
								<xb-button variant="tertiary-gray" type="button">Cancel</xb-button>
								<xb-button type="reset" variant="secondary-color">Reset</xb-button>
								<xb-button type="submit" variant="primary">Submit</xb-button>
							</xb-cluster>
						</fieldset>
					</xb-stack>
				</form>
			</xb-i18n-provider>
		</xb-cluster>

		<script type="module" src="/main.js"></script>
	</body>
</html>
`,
	'main.js': `import '@welingtonms/xb/layout/register';
import '@welingtonms/xb/form/register';
import '@welingtonms/xb/text/register';
import '@welingtonms/xb/icon/register';
import '@welingtonms/xb/tooltip/register';
import '@welingtonms/xb/i18n';

const DATE_PICKER_PRESETS = [
	{ label: 'Start of Week', prompt: 'week' },
	{ label: 'Start of Month', prompt: 'month' },
	{ label: 'Start of Year', prompt: 'year' },
	{ label: '1 Week Ago', prompt: '1 week ago' },
];

const DATE_RANGE_PICKER_PRESETS = [
	'Past 7 days',
	'Past 30 days',
	'This Month',
	'Last Month',
	'Last Year',
];

const requiredTags = [
	'xb-text-input',
	'xb-checkbox',
	'xb-radio-group',
	'xb-switch',
	'xb-toggle-group',
	'xb-select',
	'xb-date-picker',
	'xb-date-range-picker',
	'xb-button',
];

for ( const tag of requiredTags ) {
	if ( ! customElements.get( tag ) ) {
		throw new Error( \`\${ tag } was not registered\` );
	}
}

async function setup() {
	await Promise.all( [
		customElements.whenDefined( 'xb-date-picker' ),
		customElements.whenDefined( 'xb-date-range-picker' ),
	] );

	document.getElementById( 'date-picker' ).presets = DATE_PICKER_PRESETS;
	document.getElementById( 'date-range-picker' ).presets = DATE_RANGE_PICKER_PRESETS;

	document.getElementById( 'playground-form' ).addEventListener( 'submit', ( event ) => {
		event.preventDefault();
		console.log( 'form submitted with', ...new FormData( event.target ) );
	} );

	document.querySelectorAll( '[data-log-change]' ).forEach( ( element ) => {
		element.addEventListener( 'change', ( event ) => {
			console.log( 'changed', event.target.name ?? event.target.localName, event.target.value );
		} );
	} );

	console.log( 'XB form playground: registration OK' );
}

setup().catch( ( error ) => {
	console.error( error );
	throw error;
} );
`,
	'vite.config.js': `import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig( {
	plugins: [
		babel( {
			filter: /\\.js$/,
			include: [
				'main.js',
				new RegExp( '/node_modules/@welingtonms/xb/' ),
			],
			babelConfig: {
				plugins: [
					[
						'@babel/plugin-proposal-decorators',
						{ version: '2023-05' },
					],
				],
			},
		} ),
	],
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		target: 'es2022',
	},
	optimizeDeps: {
		include: [
			'@welingtonms/xb/layout/register',
			'@welingtonms/xb/form/register',
			'@welingtonms/xb/text/register',
			'@welingtonms/xb/icon/register',
			'@welingtonms/xb/tooltip/register',
			'@welingtonms/xb/i18n',
		],
	},
} );
`,
	'package.json': JSON.stringify(
		{
			name: 'xb-vite-consumer-smoke',
			private: true,
			type: 'module',
			scripts: {
				dev: 'vite',
				build: 'vite build',
				preview: 'vite preview',
			},
			devDependencies: {
				'@babel/core': '^7.29.0',
				'@babel/plugin-proposal-decorators': '^7.29.0',
				vite: '^6.3.5',
				'vite-plugin-babel': '^1.3.2',
			},
		},
		null,
		'\t'
	),
	'.gitignore': `node_modules/
dist/
*.tgz
`,
};

function run( command, options = {} ) {
	console.log( `\n> ${ command }` );
	execSync( command, {
		cwd: options.cwd ?? root,
		stdio: 'inherit',
		env: { ...process.env, ...options.env },
	} );
}

await mkdir( consumerDir, { recursive: true } );

for ( const [ name, content ] of Object.entries( scaffold ) ) {
	const path = join( consumerDir, name );
	await writeFile( path, content );
}

console.log( '\n=== Building library ===' );
run( 'yarn build' );
run( 'node scripts/verify-exports.mjs' );

console.log( '\n=== Packing tarball ===' );
run( `npm pack --pack-destination "${ consumerDir }"` );

const tarballPath = join( consumerDir, tarballName );
if ( ! existsSync( tarballPath ) ) {
	throw new Error( `Expected tarball at ${ tarballPath }` );
}

console.log( '\n=== Installing packed tarball in consumer ===' );
run( 'npm install', { cwd: consumerDir } );
run( `npm install "${ tarballPath }"`, { cwd: consumerDir } );

console.log( '\n=== Vite build (bundles installed package) ===' );
run( 'npm run build', { cwd: consumerDir } );

console.log( `
=== Consumer smoke passed ===

Packed file: examples/vite-consumer/${ tarballName }
Built app:   examples/vite-consumer/dist/

Try it in the browser:
  cd examples/vite-consumer && npm run dev

This folder is gitignored and will not be pushed to the repo.
` );
