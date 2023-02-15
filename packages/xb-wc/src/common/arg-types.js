// keep here arg types for storybook stories

export const PlacementArg = Object.freeze( {
	control: 'select',
	options: [
		'top',
		'left',
		'right',
		'bottom',
		'top-start',
		'top-end',
		'right-start',
		'right-end',
		'bottom-start',
		'bottom-end',
		'left-start',
		'left-end',
	],
} );

export const SizeArg = Object.freeze( {
	control: 'select',
	options: [ 'extra-small', 'small', 'medium', 'large' ],
} );

export const PaddinglessArg = Object.freeze( {
	control: 'select',
	options: [ 'none', 'horizontal', 'vertical', 'top', 'right', 'bottom', 'left' ],
} );

export const BorderlessArg = Object.freeze( {
	control: 'select',
	options: [ 'none', 'horizontal', 'vertical', 'top', 'right', 'bottom', 'left' ],
} );

/**
 * @typedef {import('@storybook/web-components').Meta} Meta
 * @typedef {import('@storybook/web-components').StoryObj} StoryObj
 */
