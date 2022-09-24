module.exports = {
	compilerOptions: {
		baseUrl: '.',
		paths: {
			'utils/*': [ '../../packages/xb-wc/src/utils/' ],
		},
	},
	include: [ 'node_modules/cypress', './cypress/**/*.js' ],
	transformIgnorePatterns: [ '/node_modules/' ],
	moduleDirectories: [ 'node_modules', '<rootDir>/node_modules', '.' ],
};
