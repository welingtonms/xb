export default {
	branches: [ 'main', { name: 'alpha', prerelease: true }, { name: 'beta', prerelease: true } ],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		[ '@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' } ],
		[ '@semantic-release/npm', { npmPublish: true } ],
		// [
		// 	'@semantic-release/git',
		// 	{
		// 		assets: false,
		// 		message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
		// 	},
		// ],
		'@semantic-release/github',
	],
};
