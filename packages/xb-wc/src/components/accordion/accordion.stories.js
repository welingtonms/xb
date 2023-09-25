import { html } from 'lit-html';

import './accordion';
import './accordion-header';
import './accordion-panel';

import '../layout';

/** @type {import('../../common/arg-types').Meta} */
const meta = {
	title: 'Components/accordion',
	component: 'xb-accordion',

	argTypes: {
		open: { control: 'boolean' },
	},
	parameters: {

	},
};

export default meta;

/** @type {import('../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => html`
		<xb-stack style="--xb-stack-gap: 0; width: 760px;">
			<xb-accordion ?open=${args.open}>
				<xb-accordion-header>Personal Information</xb-accordion-header>
				<xb-accordion-panel>
					<xb-box borderless>Here goes the Personal Information form.</xb-box>
				</xb-accordion-panel>
			</xb-accordion>

			<xb-accordion ?open=${args.open}>
				<xb-accordion-header>Billing Address</xb-accordion-header>
				<xb-accordion-panel>
					<xb-box borderless>Here goes the Billing Address form.</xb-box>
				</xb-accordion-panel>
			</xb-accordion>

			<xb-accordion ?open=${args.open}>
				<xb-accordion-header>Shipping Address</xb-accordion-header>
				<xb-accordion-panel>
					<xb-box borderless>Here goes the Shipping Address form.</xb-box>
				</xb-accordion-panel>
			</xb-accordion>
		</xb-stack>
		`,

args: {
	open: false
},
};

