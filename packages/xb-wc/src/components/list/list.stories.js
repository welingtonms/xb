import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { BorderlessArg } from '../../common/arg-types';
import Docs from './list.api.mdx';
import '../text';
import './list';

export default {
	title: 'Components/list',
	argTypes: {
		borderless: BorderlessArg,
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
		borderless=${ args.borderless }
		?hoverable=${ args.hoverable }
		?striped=${ args.striped }
	>
		<xb-list-item>
			<xb-text variant="body-2"
				>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</xb-text
			>
		</xb-list-item>
		<xb-list-item>
			<xb-text variant="body-2">In bibendum egestas condimentum.</xb-text>
		</xb-list-item>
		<xb-list-item>
			<xb-text variant="body-2"
				>Etiam nec lacinia purus, eget pulvinar odio.</xb-text
			>
		</xb-list-item>
		<xb-list-item>
			<xb-text variant="body-2"
				>Mauris nec nisl rhoncus, dictum neque vitae, fermentum dui.
			</xb-text>
		</xb-list-item>
		<xb-list-item
			><xb-text variant="body-2">Quisque sed exjusto. </xb-text></xb-list-item
		>
		<xb-list-item>
			<xb-text variant="body-2"
				>In sed mollis purus, quis tristique sapien.
			</xb-text>
		</xb-list-item>
		<xb-list-item>
			<xb-text variant="body-2"
				>Maecenas luctus nisi quis purus rutrum, non cursus libero sollicitudin.
			</xb-text>
		</xb-list-item>
		<xb-list-item
			><xb-text variant="body-2"
				>Etiam a fermentum magna.</xb-text
			></xb-list-item
		>
	</xb-list>
`;

Playground.args = {
	hoverable: true,
	striped: true,
};
