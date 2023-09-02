import { SELECTION_TYPES } from '@welingtonms/xb-toolset/dist/selection';

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
	control: 'check',
	options: [ 'none', 'horizontal', 'vertical', 'top', 'right', 'bottom', 'left' ],
} );

export const BorderlessArg = Object.freeze( {
	control: 'check',
	options: [ 'none', 'horizontal', 'vertical', 'top', 'right', 'bottom', 'left' ],
} );

export const SelectionArg = Object.freeze( {
	control: 'inline-radio',
	options: SELECTION_TYPES,
} );

/**
 * @typedef {import('@storybook/web-components').Meta} Meta
 * @typedef {import('@storybook/web-components').StoryObj} StoryObj
 */
