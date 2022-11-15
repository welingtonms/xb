import { html } from 'lit-html';

import Docs from './popover.api.mdx';
import './popover';
import '../icon';

export default {
	title: 'Components/popover',

	argTypes: {
		// backgroundColor: { control: 'color' },
		variant: {
			control: {
				type: 'select',
				options: [ 'neutral', 'primary', 'secondary', 'terciary' ],
			},
		},
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) => html`
	<xb-popover>
		<xb-icon
			name="star"
			slot="reference"
			style="--xb-icon-color: rgb(var(--xb-color-secondary-500));"
		></xb-icon>
		<span slot="floating">
			Proin facilisis mauris ut tortor vulputate placerat. Nulla ut ligula
			mattis, sagittis arcu non, venenatis urna. Praesent tincidunt odio vitae
			luctus aliquet. Morbi nisl ante, ultricies vel fringilla pulvinar, lacinia
			quis mi. Mauris a lectus quis est feugiat cursus non vel erat. In euismod
			nibh mi, ac volutpat elit placerat id. Nullam condimentum arcu quis massa
			consequat, nec sodales est rutrum. Duis nisi est, tempus nec hendrerit
			vel, lobortis a ante.
		</span>
	</xb-popover>
`;

Playground.args = {
	variant: 'primary',
};