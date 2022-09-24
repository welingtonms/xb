module.exports = {
	useTabs: true,
	printWidth: 80,
	singleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	parenSpacing: true,
	jsxBracketSameLine: false,
	semi: true,
	arrowParens: 'always',
	jsxBracketSameLine: false,
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
