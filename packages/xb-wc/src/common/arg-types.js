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
	control: 'select',
	options: [
		'none',
		'all',
		'right',
		'left',
		'top',
		'bottom',
		'vertical',
		'horizontal',
		'right,top',
		'right,bottom',
		'right,vertical',
		'left,top',
		'left,bottom',
		'left,vertical',
		'top,right',
		'top,left',
		'top,horizontal',
		'bottom,right',
		'bottom,left',
		'bottom,horizontal',
	],
} );

export const BorderlessArg = PaddinglessArg;

export const SpacingArg = Object.freeze( {
	control: 'select',
	options: [ '4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '64px' ],
} );

export const SelectionArg = Object.freeze( {
	control: 'inline-radio',
	options: SELECTION_TYPES,
} );

/**
 * @typedef {import('@storybook/web-components').Meta} Meta
 * @typedef {import('@storybook/web-components').StoryObj} StoryObj
 */
