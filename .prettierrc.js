module.exports = {
	useTabs: true,
	printWidth: 80,
	singleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	parenSpacing: true,
	jsxBracketSameLine: false,
	htmlWhitespaceSensitivity: 'ignore',
	semi: true,
	arrowParens: 'always',
	overrides: [
		{
			files: '*.{css,sass,scss}',
			options: {
				singleQuote: false,
				parenSpacing: false,
			},
		},
	],
};
