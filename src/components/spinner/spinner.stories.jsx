import React from 'react';

import './spinner.define';

/** @type {import('../../utils/arg-types.js').Meta} */
export default {
	title: 'Components/Spinner',
	parameters: {
		layout: 'padded',
	},
	argTypes: {},
};

/** @type {import('../../utils/arg-types.js').StoryObj} */
export const Playground = {
	args: {},
	render: () => {
		return <xb-spinner></xb-spinner>;
	},
};
