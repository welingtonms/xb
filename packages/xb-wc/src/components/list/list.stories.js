import { html } from 'lit-html';

import Docs from './list.api.mdx';
import '../text';
import './list';

export default {
	title: 'Components/list',
	argTypes: {
		paddingless: {
			control: {
				type: 'select',
				options: [
					'none',
					'horizontal',
					'vertical',
					'top',
					'right',
					'bottom',
					'left',
				],
			},
		},
		hoverable: {
			control: {
				type: 'boolean',
			},
		},
		striped: {
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

export const Playground = ( args ) => html`
	<xb-list
		paddingless=${ args.paddingless }
		hoverable=${ args.hoverable }
		striped=${ args.striped }
	>
		<div>
			<xb-text variant="body-2"
				>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</xb-text
			>
		</div>
		<div>
			<xb-text variant="body-2">In bibendum egestas condimentum.</xb-text>
		</div>
		<div>
			<xb-text variant="body-2"
				>Etiam nec lacinia purus, eget pulvinar odio.</xb-text
			>
		</div>
		<div>
			<xb-text variant="body-2"
				>Mauris nec nisl rhoncus, dictum neque vitae, fermentum dui.
			</xb-text>
		</div>
		<div><xb-text variant="body-2">Quisque sed exjusto. </xb-text></div>
		<div>
			<xb-text variant="body-2"
				>In sed mollis purus, quis tristique sapien.
			</xb-text>
		</div>
		<div>
			<xb-text variant="body-2"
				>Maecenas luctus nisi quis purus rutrum, non cursus libero sollicitudin.
			</xb-text>
		</div>
		<div><xb-text variant="body-2">Etiam a fermentum magna.</xb-text></div>
	</xb-list>
`;

Playground.args = {
	paddingless: 'none',
	hoverable: true,
	striped: true,
};
