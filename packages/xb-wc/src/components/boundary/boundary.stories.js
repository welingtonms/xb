import { html } from 'lit-html';

import './boundary';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Metacomponents/boundary',
	component: 'xb-boundary',

	argTypes: {
		interact: {
			action: 'interact',
			table: {
				disable: true,
			},
			active: {
				control: 'boolean',
			},
		},
	},
	parameters: {},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) =>
		html`
			<xb-boundary
				?active=${ args.active }
				@xb:interact-in=${ args.interact }
				@xb:interact-out=${ args.interact }
			>
				Proin facilisis mauris ut tortor vulputate placerat. Nulla ut ligula mattis,
				sagittis arcu non, venenatis urna. Praesent tincidunt odio vitae luctus aliquet.
				Morbi nisl ante, ultricies vel fringilla pulvinar, lacinia quis mi. Mauris a
				lectus quis est feugiat cursus non vel erat. In euismod nibh mi, ac volutpat elit
				placerat id. Nullam condimentum arcu quis massa consequat, nec sodales est rutrum.
				Duis nisi est, tempus nec hendrerit vel, lobortis a ante.
			</xb-boundary>
		`,

	args: {
		active: false,
	},
};

/**
 * @typedef {import('../../common/arg-types').Meta} Meta
 * @typedef {import('../../common/arg-types').StoryObj} StoryObj
 */
