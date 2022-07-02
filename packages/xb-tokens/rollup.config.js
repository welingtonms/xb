import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';
// import babel from '@rollup/plugin-babel';
// import del from 'rollup-plugin-delete';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';

module.exports = {
	input: './src/index.js',
	plugins: [
		// del( { targets: [ `dist/` ] } ),
		external(),
		// babel( {
		// 	// exclude: 'node_modules/**', // only transpile our source code
		// 	babelHelpers: 'bundled',
		// 	extensions: [ '.js' ],
		// } ),
		resolve( {
			preferBuiltins: true,
			extensions: [ '.js' ],
		} ),
		terser(),
		analyze( {
			hideDeps: true,
			summaryOnly: true,
			filter: ( module ) => /^\/src/.test( module.id ),
		} ),
	],
	output: [
		{
			dir: 'dist',
			format: 'esm',
			sourcemap: true,
		},
	],
};
