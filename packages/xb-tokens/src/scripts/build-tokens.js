const StyleDictionaryPackage = require( 'style-dictionary' );

function getStyleDictionaryConfig( brand, platform ) {
	return {
		format: {
			sassWithCSSVariables: function ( { dictionary, options } ) {
				return dictionary.allTokens
					.map( ( token ) => {
						let value = `var(--${ token.name })`;
						const comment = token.original.comment || '';

						if ( options.outputReferences ) {
							if ( dictionary.usesReference( token.original.value ) ) {
								const [ ref ] = dictionary.getReferences(
									token.original.value
								);

								value = `var(--${ ref.name })`;
							}
						}

						return `$${ token.name }: ${ value };${
							comment ? ` /* ${ comment } */` : ''
						}`;
					} )
					.join( `\n` );
			},
		},

		source: [
			`src/tokens/brands/${ brand }/*.{js,json}`,
			'src/tokens/globals/**/*.{js,json}',
			`src/tokens/platforms/${ platform }/*.{js,json}`,
		],
		platforms: {
			web: {
				buildPath: `dist/tokens/web/${ brand }/`,
				// transformGroup: 'scss',
				prefix: 'xb',
				transforms: [ 'attribute/cti', 'name/cti/kebab', 'size/rem' ],
				files: [
					{
						destination: 'variables.css',
						format: 'css/variables',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'variables.scss',
						format: 'sassWithCSSVariables',
						options: {
							outputReferences: true,
						},
					},
				],
			},
		},
	};
}

console.log( 'Build started...' );

console.log( `\nProcessing canonical theme` );

const StyleDictionary = StyleDictionaryPackage.extend( {
	source: [
		`src/tokens/brands/xb/**/*.{js,json}`,
		'src/tokens/globals/**/*.{js,json}',
		`src/tokens/platforms/web/**/*.{js,json}`,
	],
	platforms: {
		web: {
			buildPath: 'src/themes/',
			// transformGroup: 'js',
			transforms: [ 'attribute/cti', 'name/cti/kebab', 'size/px' ],
			files: [
				{
					destination: 'xb.theme.js',
					format: 'javascript/module-flat',
				},
			],
		},
	},
} );

StyleDictionary.buildAllPlatforms();

[ 'xb' ].map( function ( brand ) {
	[ 'web' ].map( function ( platform ) {
		console.log( `\nProcessing: [${ platform }] [${ brand }]` );

		const StyleDictionary = StyleDictionaryPackage.extend(
			getStyleDictionaryConfig( brand, platform )
		);

		StyleDictionary.buildPlatform( platform );

		console.log( '\nEnd processing' );
	} );
} );
