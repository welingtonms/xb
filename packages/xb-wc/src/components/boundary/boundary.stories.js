import { html } from 'lit-html';

import Docs from './boundary.api.mdx';
import './boundary';

export default {
	title: 'Metacomponents/boundary',

	argTypes: {
		interact: {
			action: 'interact-out',
			table: {
				disable: true,
			},
		},
	},
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) =>
	html`
		<xb-boundary @xb-interact-out=${ args.interact }>
			Proin facilisis mauris ut tortor vulputate placerat. Nulla ut ligula
			mattis, sagittis arcu non, venenatis urna. Praesent tincidunt odio vitae
			luctus aliquet. Morbi nisl ante, ultricies vel fringilla pulvinar, lacinia
			quis mi. Mauris a lectus quis est feugiat cursus non vel erat. In euismod
			nibh mi, ac volutpat elit placerat id. Nullam condimentum arcu quis massa
			consequat, nec sodales est rutrum. Duis nisi est, tempus nec hendrerit
			vel, lobortis a ante.
		</xb-boundary>
	`;

Playground.args = {
	placement: 'bottom-start',
};
