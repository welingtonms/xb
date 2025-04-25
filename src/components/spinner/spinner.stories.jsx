import React from 'react';

import './spinner.define';

/** @type {import('../../common/arg-types').Meta} */
export default {
	title: 'Components/Spinner',
	parameters: {
		layout: 'padded',
	},
	argTypes: {},
};

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	args: {},
	render: () => {
		return <xb-spinner></xb-spinner>;
	},
};
