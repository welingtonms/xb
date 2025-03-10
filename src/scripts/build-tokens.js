// Based on https://github.com/amzn/style-dictionary/tree/main/examples/advanced/multi-brand-multi-platform

import StyleDictionary from 'style-dictionary';
import { usesReferences, getReferences } from 'style-dictionary/utils';


StyleDictionary.registerFormat({
	name: 'sass-with-css-variables',
	format: ({ dictionary, options }) => {
		return dictionary.allTokens
			.map((token) => {
				let value = `var(--${token.name})`;
				const comment = token.original.comment || '';

				if (options.outputReferences) {
					if (usesReferences(token.original.value, dictionary.tokens)) {
						const [ref] = getReferences(
							token.original.value,
							dictionary.tokens,
						);

						value = `var(--${ref.name})`;
					}
				}

				return `$${token.name}: ${value};${comment ? ` /* ${comment} */` : ''}`;
			})
			.join('\n');
	},
});

function getStyleDictionaryConfig( brand, platform ) {
	return {
		source: [
			`src/tokens/brands/${ brand }/*.{js,json}`,
			'src/tokens/globals/**/*.{js,json}',
			`src/tokens/platforms/${ platform }/*.{js,json}`,
		],
		platforms: {
			web: {
				buildPath: `.storybook/`,
				// buildPath: `dist/tokens/web/${ brand }/`,
				prefix: 'xb',
				transforms: [ 'attribute/cti', 'name/kebab', 'size/rem' ],
				files: [
					{
						destination: 'variables.css',
						format: 'css/variables',
						options: {
							outputReferences: true,
						},
					},
					// {
					// 	destination: 'variables.scss',
					// 	format: 'sass-with-css-variables',
					// 	options: {
					// 		outputReferences: true,
					// 	},
					// },
				],
			},
		},
	};
}

console.log( 'Build started...' );

console.log( `\nProcessing canonical theme` );

const canonicalDictionary = new StyleDictionary({
	source: [
		`src/tokens/brands/xb/**/*.{js,json}`,
		'src/tokens/globals/**/*.{js,json}',
		`src/tokens/platforms/web/**/*.{js,json}`,
	],
	platforms: {
		web: {
			buildPath: 'src/themes/',
			// transformGroup: 'js',
			transforms: [ 'attribute/cti', 'name/kebab', 'size/px' ],
			files: [
				{
					destination: 'xb.theme.json',
					format: 'json/flat',
				},
			],
		},
	},
} );

async function buildTokens() {
	canonicalDictionary.buildAllPlatforms();

	const brands = [ 'xb' ];
	const platforms = [ 'web' ];

	for ( const brand of brands ) {
		for ( const platform of platforms ) {
			console.log( `\nProcessing: [${ platform }] [${ brand }]` );

			const config = new StyleDictionary(
				getStyleDictionaryConfig(brand, platform),
			);

			await config.buildPlatform(platform);

			console.log( '\nEnd processing' );
		}
	}
}


try {
	await buildTokens();
} catch (error) {
	console.error('Error building tokens:', error);
	process.exit(1);
}

