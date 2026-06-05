import React from 'react';

import { userEvent, expect, within } from 'storybook/test';

import '../layout';

import '../i18n/i18n.provider';
import './form.define.js';

import '../../components/icon/icon.define';
import '../../components/tooltip/tooltip.define';

export default {
	title: 'Components/Form/Form',
	component: 'form',

	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
	},
	parameters: {},
};

const DATE_PICKER_PRESETS = [
	{ label: 'Start of Week', prompt: 'week' },
	{ label: 'Start of Month', prompt: 'month' },
	{ label: 'Start of Year', prompt: 'year' },
	{ label: '1 Week Ago', prompt: '1 week ago' },
];

const DATE_RANGE_PICKER_PRESETS = [
	'Past 7 days',
	'Past 30 days',
	'This Month',
	'Last Month',
	'Last Year',
];

export const Playground = {
	render: ( args ) => (
		<xb-cluster>
			<xb-i18n-provider locale="en-US">
				<form
					action="http://www.foo.com"
					method="post"
					onSubmit={ ( event ) => {
						event.preventDefault();

						console.log( 'form submitted with', ...new FormData( event.target ) );
					} }
				>
					<xb-stack>
						<fieldset style={ { padding: 0, margin: 0, border: 'none' } }>
							<xb-stack>
								<xb-cluster>
									{ /* <input type="text" name="input" placeholder="Greeting" value="hello world" /> */ }

									<xb-text-input
										type="text"
										name="xb-text-input"
										placeholder="XB Greeting"
									></xb-text-input>
								</xb-cluster>

								<xb-stack>
									<xb-checkbox name="xb-checkbox" value="agree-tc">
										Agree with T&C s
									</xb-checkbox>

									<xb-checkbox name="xb-checkbox">I want to receive newsletter</xb-checkbox>

									{ /* <label>
									<input type="checkbox" name="checkbox" value="agree-tc-native" />
									Agree with T&C native
								</label> */ }
								</xb-stack>

								<xb-cluster>
									<xb-text>Accept cookies</xb-text>
									<xb-radio-group name="xb-radio-group">
										<xb-radio value="yes">Yes</xb-radio>
										<xb-radio value="no">No</xb-radio>
									</xb-radio-group>
								</xb-cluster>

								<xb-cluster>
									<xb-switch name="xb-switch" value="accept-life-options">
										Accept life options switch
									</xb-switch>
								</xb-cluster>

								<xb-cluster>
									<xb-toggle-group
										type="single-strict"
										name="xb-toggle-group"
										disabled={ args.disabled }
										onChange={ args.change }
									>
										<xb-toggle
											id="left-toggle"
											value="align-left"
											aria-label="Align text to the left"
										>
											<xb-icon name="text-align-left" />
										</xb-toggle>
										<xb-tooltip anchor="left-toggle">Align text to the left</xb-tooltip>

										<xb-toggle
											id="center-toggle"
											value="align-center"
											aria-label="Align text to the center"
										>
											<xb-icon name="text-align-center" />
										</xb-toggle>
										<xb-tooltip anchor="center-toggle" placement="bottom">
											Align text to the center
										</xb-tooltip>

										<xb-toggle
											id="right-toggle"
											value="align-right"
											aria-label="Align text to the right"
										>
											<xb-icon name="text-align-right" />
										</xb-toggle>
										<xb-tooltip anchor="right-toggle">Align text to the right</xb-tooltip>

										<xb-toggle
											id="justify-toggle"
											value="align-justify"
											aria-label="Align text to the justify"
										>
											<xb-icon name="text-align-justify" />
										</xb-toggle>
										<xb-tooltip anchor="justify-toggle" placement="bottom">
											Align text to the justify
										</xb-tooltip>
									</xb-toggle-group>
								</xb-cluster>

								<xb-cluster>
									{ /* <select name="favorite-letter">
									<option>Letter A</option>
									<option>Letter B</option>
									<option>Letter C</option>
								</select> */ }

									<xb-select clearable name="xb-select" onChange={ args.change }>
										<xb-option value="letter-a">Letter A</xb-option>
										<xb-option value="letter-b">Letter B</xb-option>
										<xb-option value="letter-c">Letter C</xb-option>
									</xb-select>
								</xb-cluster>

								<xb-cluster>
									<xb-date-picker
										clearable
										presets={ DATE_PICKER_PRESETS }
										name="xb-date-picker"
										onChange={ args.change }
									></xb-date-picker>
									<xb-date-range-picker
										clearable
										presets={ DATE_RANGE_PICKER_PRESETS }
										name="xb-date-range-picker"
										onChange={ args.change }
									></xb-date-range-picker>
								</xb-cluster>
							</xb-stack>

							<hr />

							<xb-cluster>
								<xb-button variant="tertiary-gray">Cancel</xb-button>
								<xb-button type="reset" variant="secondary-color">
									Reset
								</xb-button>
								<xb-button type="submit" variant="primary">
									Submit
								</xb-button>
							</xb-cluster>
						</fieldset>
					</xb-stack>
				</form>
			</xb-i18n-provider>
		</xb-cluster>
	),
	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );

		await userEvent.click( canvas.getByRole( 'radio', { name: /^no$/i } ) );
		await userEvent.click( canvas.getByRole( 'radio', { name: /^Align text to the left$/i } ) );

		/** @type {HTMLFormElement | null} */
		const form = canvasElement.querySelector( 'form' );
		const formData = new FormData( form );

		expect( formData.get( 'xb-radio-group' ) ).toBe( 'no' );
		expect( formData.get( 'xb-toggle-group' ) ).toBe( 'align-left' );
	},

	args: {
		disabled: false,
	},
};

/** @type {import('../../utils/arg-types.js').StoryObj} */
// export const Link = {
// 	render: ( args ) => html`
// 		<xb-button
// 			emphasis=${ args.emphasis }
// 			paddingless=${ args.paddingless }
// 			borderless=${ args.borderless }
// 			size=${ args.size }
// 			?disabled=${ args.disabled }
// 			href="https://www.google.com/"
// 			target="_blank"
// 		>
// 			Link
// 		</xb-button>
// 	`,
// 	play: async ( { canvasElement } ) => {
// 		const canvas = within( canvasElement );

// 		await expect( canvas.getAllByRole( 'link' ) ).toHaveLength( 1 );

// 		await userEvent.click( canvas.getByRole( 'link' ) );
// 	},

// 	args: {
// 		borderless: 'none',
// 		disabled: false,
// 		emphasis: 'ghost',
// 		paddingless: 'none',
// 		size: 'small',
// 	},
// };

{
	/* <xb-button
			aria-label="Like this post"
			emphasis="text"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="favorite"></xb-icon>
		</xb-button>
		<xb-button
			emphasis="ghost"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="arrow-back" slot="leading"></xb-icon>
			Change
		</xb-button>
		<xb-button
			aria-label="Refresh the list"
			emphasis="ghost"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="refresh"></xb-icon>
		</xb-button>
		<xb-button
			emphasis="flat"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			Leave
			<xb-icon name="star" slot="trailing"></xb-icon>
		</xb-button>
		<xb-button
			aria-label="Favorite this post"
			emphasis="flat"
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			size=${ args.size }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="star"></xb-icon>
		</xb-button> */
}

/**
 * @typedef {import('./button').Button} Button
 * @typedef {import('@storybook/web-components').StoryObj<Button>} ButtonStory
 * @typedef {import('@storybook/web-components').Meta} Meta
 */

{
	/* <button
			is="xb-button"
			emphasis=${ args.emphasis }
			paddingless=${ args.paddingless }
			borderless=${ args.borderless }
			scale=${ args.scale }
			?disabled=${ args.disabled }
			@click=${ args.click }
		>
			<xb-icon name="favorite"></xb-icon>
			Accept
		</button> */
}

{
	/* <xb-stack>
	<fieldset @change=${ args.change } ?disabled=${ args.disabled }>
		<xb-stack>
			<input type="text" name="greeting" placeholder="Greeting" />

			<xb-text-input type="text" name="xb-greeting" placeholder="XB Greeting"></xb-text-input>

			<xb-cluster>
				<xb-button variant="text" size="small" @click=${ args.click }>Cancel</xb-button>
				<xb-button type="reset" variant="ghost" size="small" @click=${ args.click }>
					Reset
				</xb-button>
				<xb-button type="submit" variant="flat" size="small" @click=${ args.click }>
					Submit
				</xb-button>
			</xb-cluster>
			<xb-cluster>
				<xb-checkbox name="permissions" value="agree-tc">Agree with T&C</xb-checkbox>
				<xb-checkbox name="permissions" value="agree-newsletter">
					Receive newsletter
				</xb-checkbox>
			</xb-cluster>
			<xb-cluster>
				<xb-radio-group name="cookies" value="yes">
					<xb-text>Accept cookies</xb-text>
					<xb-radio value="yes">Yes</xb-radio>
					<xb-radio value="no">No</xb-radio>
				</xb-radio-group>
			</xb-cluster>
			<xb-cluster>
				<xb-switch name="life-options">Accept life options</xb-switch>
				<label>
					<input type="checkbox" name="life-native-options" />
					Accept native life options
				</label>
			</xb-cluster>
		</xb-stack>
	</fieldset>
</xb-stack> */
}
