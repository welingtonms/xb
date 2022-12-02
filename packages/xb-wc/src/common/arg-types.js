// keep here arg types for storybook stories

export const PlacementArg = Object.freeze( {
	control: {
		type: 'select',
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
	},
} );

export const SizeArg = Object.freeze( {
	control: {
		type: 'select',
		options: [ 'extra-small', 'small', 'medium', 'large' ],
	},
} );
