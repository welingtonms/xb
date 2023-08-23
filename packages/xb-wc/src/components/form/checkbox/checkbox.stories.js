import { html } from 'lit-html';

import { SizeArg } from '../../../common/arg-types';
import '../../text';
import '../../layout/box';
import './checkbox';

/** @type {import('../../../common/arg-types').Meta} */
const meta = {
	title: 'Components/form/checkbox',
	component: 'xb-checkbox',

	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		size: SizeArg,
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

export default meta;

/** @type {import('../../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-stack>
			<xb-checkbox
				value="change"
				size=${ args.size }
				?disabled=${ args.disabled }
				@xb:change=${ args.change }
			>
				Change
			</xb-checkbox>
			<xb-checkbox
				value="accept"
				size=${ args.size }
				?disabled=${ args.disabled }
				@xb:change=${ args.change }
			>
				Accept
			</xb-checkbox>
			<xb-checkbox
				value="leave"
				size=${ args.size }
				?disabled=${ args.disabled }
				@xb:change=${ args.change }
			>
				Leave
			</xb-checkbox>
		</xb-stack>
	`,

	args: {
		disabled: false,
		size: 'extra-small',
	},
};

/** @type {import('../../../common/arg-types').StoryObj} */
export const Mixed = {
	render: ( args ) => html`
		<xb-stack role="group">
			<xb-checkbox
				id="xb-checkbox-supreme"
				size=${ args.size }
				?disabled=${ args.disabled }
				@xb:change=${ args.change }
				aria-controls="xb-checkbox-life-choices xb-checkbox-nothing"
			>
				Supreme life choices
			</xb-checkbox>
			<xb-box borderless>
				<xb-checkbox
					id="xb-checkbox-life-choices"
					size=${ args.size }
					?disabled=${ args.disabled }
					@xb:change=${ args.change }
					aria-controls="xb-checkbox-change xb-checkbox-accept xb-checkbox-leave"
				>
					Life choices
				</xb-checkbox>
				<xb-box borderless>
					<xb-checkbox
						checked
						id="xb-checkbox-change"
						value="change"
						size=${ args.size }
						?disabled=${ args.disabled }
						@xb:change=${ args.change }
					>
						Change
					</xb-checkbox>
					<xb-checkbox
						id="xb-checkbox-accept"
						value="accept"
						size=${ args.size }
						?disabled=${ args.disabled }
						@xb:change=${ args.change }
					>
						Accept
					</xb-checkbox>
					<xb-checkbox
						id="xb-checkbox-leave"
						value="leave"
						size=${ args.size }
						?disabled=${ args.disabled }
						@xb:change=${ args.change }
					>
						Leave
					</xb-checkbox>
				</xb-box>
			</xb-box>
			<xb-checkbox
				id="xb-checkbox-nothing"
				value="nothing"
				size=${ args.size }
				?disabled=${ args.disabled }
				@xb:change=${ args.change }
			>
				Nothing at all
			</xb-checkbox>
		</xb-stack>
	`,

	args: {
		disabled: false,
		size: 'extra-small',
	},
};
