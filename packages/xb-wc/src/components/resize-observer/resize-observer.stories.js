import { html } from 'lit-html';

import Docs from './resize-observer.api.mdx';
import './resize-observer';

export default {
	title: 'Metacomponents/resize-observer',

	argTypes: {
		resize: {
			action: 'resized',
			table: {
				disable: true,
			},
		},
		type: {
			control: {
				type: 'select',
				options: [ 'content', 'window' ],
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		debounced: {
			control: {
				type: 'boolean',
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
		<xb-resize-observer
			?disabled=${ args.disabled }
			?debounced=${ args.debounced }
			type="${ args.type }"
			@xb-resize=${ args.resize }
		>
			<xb-box>
				Proin facilisis mauris ut tortor vulputate placerat. Nulla ut ligula
				mattis, sagittis arcu non, venenatis urna. Praesent tincidunt odio vitae
				luctus aliquet. Morbi nisl ante, ultricies vel fringilla pulvinar,
				lacinia quis mi. Mauris a lectus quis est feugiat cursus non vel erat.
				In euismod nibh mi, ac volutpat elit placerat id. Nullam condimentum
				arcu quis massa consequat, nec sodales est rutrum. Duis nisi est, tempus
				nec hendrerit vel, lobortis a ante.
			</xb-box>
		</xb-resize-observer>
	`;

Playground.args = {
	disabled: false,
	debounced: true,
	type: 'content',
};
