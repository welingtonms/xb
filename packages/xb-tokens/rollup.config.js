import { terser } from 'rollup-plugin-terser';
import summary from 'rollup-plugin-summary';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

module.exports = {
	input: {
		index: './src/index.ts',
		themes: './src/themes/index.js',
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
