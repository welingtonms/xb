module.exports = {
	extends: [ '@commitlint/config-conventional' ],
	rules: {
		'header-max-length': [ 2, 'always', 50 ],
	},
	ignores: [
		( message ) =>
			/^chore\(release\): \d+\.\d+\.\d+.* \[skip\sci\]/gm.test( message ),
	],
};
