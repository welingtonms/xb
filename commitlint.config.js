module.exports = {
	extends: [ '@commitlint/config-conventional' ],
	ignores: [
		( message ) =>
			/^chore\(release\): \d+\.\d+\.\d+.* \[skip\sci\]/gm.test( message ),
	],
};
