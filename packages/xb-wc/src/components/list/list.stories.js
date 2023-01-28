import { html } from 'lit-html';

import { BorderlessArg } from '../../common/arg-types';
import '../text';
import './list';

export default {
	title: 'Components/list',
	component: 'xb-list',
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
	parameters: {},
};

export const Playground = {
	render: ( args ) => html`
		<xb-list
			borderless=${ args.borderless }
			?hoverable=${ args.hoverable }
			?striped=${ args.striped }
		>
			<xb-list-item>
				<xb-text variant="body-2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</xb-text>
			</xb-list-item>
			<xb-list-item>
				<xb-text variant="body-2">In bibendum egestas condimentum.</xb-text>
			</xb-list-item>
			<xb-list-item>
				<xb-text variant="body-2">
					Etiam nec lacinia purus, eget pulvinar odio.
				</xb-text>
			</xb-list-item>
			<xb-list-item>
				<xb-text variant="body-2">
					Mauris nec nisl rhoncus, dictum neque vitae, fermentum dui.
				</xb-text>
			</xb-list-item>
			<xb-list-item>
				<xb-text variant="body-2">Quisque sed exjusto.</xb-text>
			</xb-list-item>
			<xb-list-item>
				<xb-text variant="body-2">
					In sed mollis purus, quis tristique sapien.
				</xb-text>
			</xb-list-item>
			<xb-list-item>
				<xb-text variant="body-2">
					Maecenas luctus nisi quis purus rutrum, non cursus libero
					sollicitudin.
				</xb-text>
			</xb-list-item>
			<xb-list-item>
				<xb-text variant="body-2">Etiam a fermentum magna.</xb-text>
			</xb-list-item>
		</xb-list>
	`,

	args: {
		hoverable: true,
		striped: true,
	},
};
