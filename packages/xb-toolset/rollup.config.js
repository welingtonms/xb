import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import summary from 'rollup-plugin-summary';

module.exports = {
	input: {
		'is-function': './src/is-function/index.ts',
		'is-object': './src/is-object/index.ts',
		'is-promise': './src/is-promise/index.ts',
		'is-string': './src/is-string/index.ts',
		'to-array': './src/to-array/index.ts',
		rem: './src/rem/index.ts',
		selection: './src/selection/index.ts',
	},
	plugins: [
		commonjs(),
		typescript(),
		resolve( {
			preferBuiltins: true,
		} ),
		terser(),
		summary(),
	],
	output: [
		{
			dir: 'dist',
			format: 'cjs',
			sourcemap: false,
			exports: 'auto',
		},
	],
};
