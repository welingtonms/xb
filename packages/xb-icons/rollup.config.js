import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';

export default {
	input: './src/index.js',
	output: [
		{
			dir: 'dist',
			format: 'esm',
			sourcemap: false,
		},
	],
	onwarn( warning ) {
		if ( warning.code !== 'THIS_IS_UNDEFINED' ) {
			console.error( `(!) ${ warning.message }` );
		}
	},
	plugins: [ resolve(), summary() ],
};
