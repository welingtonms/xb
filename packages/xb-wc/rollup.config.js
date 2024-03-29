import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';

export default {
	input: {
		index: './src/index.js',
		button: './src/components/button/index.js',
		text: './src/components/text/index.js',
	},
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
	plugins: [
		babel( { babelHelpers: 'bundled' } ),
		replace( { 'Reflect.decorate': 'undefined', preventAssignment: true } ),
		resolve(),
		commonjs(),
		terser( {
			ecma: 2017,
			module: true,
			warnings: true,
			mangle: {
				properties: {
					regex: /^__/,
				},
			},
		} ),
		summary(),
	],
};
