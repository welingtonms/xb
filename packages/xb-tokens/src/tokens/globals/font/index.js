const rem = require( '@welingtonms/xb-toolset/dist/rem' );

module.exports = {
	font: {
		family: {
			default: { value: '{platform.font.default.value}' },
		},
		size: {
			xs: { value: rem( '12px' ) },
			sm: { value: rem( '14px' ) },
			base: { value: rem( '16px' ) },
			lg: { value: rem( '18px' ) },
			xl: { value: rem( '20px' ) },
			'2xl': { value: rem( '24px' ) },
			'3xl': { value: rem( '30px' ) },
			'4xl': { value: rem( '36px' ) },
			'5xl': { value: rem( '48px' ) },
			'6xl': { value: rem( '64px' ) },
		},
		weight: {
			light: { value: 300 },
			regular: { value: 400 },
			medium: { value: 500 },
			bold: { value: 700 },
		},
	},
	'line-height': {
		tight: { value: 1.25 },
		snug: { value: 1.375 },
		default: { value: 1.5 },
		relaxed: { value: 1.62 },
	},
};
