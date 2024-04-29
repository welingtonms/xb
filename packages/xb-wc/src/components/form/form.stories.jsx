import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';

import { Button } from '../button/button.stories';
import { Checkbox } from './checkbox/checkbox.stories';
import { RadioGroup, Radio } from './radio/radio.stories';
import { Select, Option } from './select/select.stories';
import { Switch } from './switch/switch.stories';
import { TextInput } from './text-input/text-input.stories';
import { ToggleGroup, Toggle } from './toggle-group/toggle-group.stories';

import '../layout';
import './form.define';

const meta = {
	title: 'Form/form',
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

export default meta;

function WebComponent( { args } ) {
	/** @type {React.MutableRefObject<HTMLDivElement>} */
	const rootRef = useRef();
	/** @type {React.MutableRefObject<HTMLElement>} */
	const elementRef = useRef();

	useEffect( () => {
		render(
			html`
				<form
					action="http://www.foo.com"
					method="post"
					@submit=${ ( event ) => {
						event.preventDefault();

						console.log( 'form submitted with', ...new FormData( event.target ) );
					} }
				>
					<xb-stack>
						<fieldset>
							<xb-stack>
								<xb-cluster>
									<!-- <input type="text" name="input" placeholder="Greeting" value="hello world" /> -->

									<xb-text-input
										type="text"
										name="xb-text-input"
										placeholder="XB Greeting"
										default-value="hello world"
									></xb-text-input>
								</xb-cluster>

								<xb-cluster>
									<xb-checkbox name="xb-checkbox" value="agree-tc" default-checked>
										Agree with T&C
									</xb-checkbox>

									<!-- <label>
										<input type="checkbox" name="checkbox" value="agree-tc-native" />
										Agree with T&C native
									</label> -->
								</xb-cluster>

								<xb-cluster>
									<xb-text>Accept cookies</xb-text>
									<xb-radio-group name="xb-radio-group" default-value="no">
										<xb-radio value="yes">Yes</xb-radio>
										<xb-radio value="no">No</xb-radio>
									</xb-radio-group>
								</xb-cluster>

								<xb-cluster>
									<xb-switch name="xb-switch" value="accept-life-options" default-checked>
										Accept life options switch
									</xb-switch>
								</xb-cluster>

								<xb-cluster>
									<xb-toggle-group type="multiple" name="xb-toggle-group" default-value="change">
										<xb-toggle value="accept">
											<span slot="leading">&diams;</span>
											Accept
										</xb-toggle>

										<xb-toggle value="change">
											<span slot="leading">&hearts;</span>
											Change
										</xb-toggle>

										<xb-toggle value="leave">
											<span slot="leading">&clubs;</span>
											Leave
										</xb-toggle>
									</xb-toggle-group>
								</xb-cluster>

								<xb-cluster>
									<!-- <select name="favorite-letter">
										<option>Letter A</option>
										<option>Letter B</option>
										<option>Letter C</option>
									</select> -->

									<xb-select default-value="letter-b" name="xb-select">
										<xb-option value="letter-a">Letter A</xb-option>
										<xb-option value="letter-b">Letter B</xb-option>
										<xb-option value="letter-c">Letter C</xb-option>
									</xb-select>
								</xb-cluster>
							</xb-stack>

							<hr />

							<xb-cluster>
								<xb-button variant="text" size="small">Cancel</xb-button>
								<xb-button type="reset" variant="ghost" size="small">Reset</xb-button>
								<xb-button type="submit" variant="flat" size="small">Submit</xb-button>
							</xb-cluster>
						</fieldset>
					</xb-stack>
				</form>
			`,
			rootRef.current
		);

		elementRef.current = rootRef.current.querySelector( meta.component );

		let currentArgs = args;

		elementRef.current.disabled = currentArgs.disabled;
		elementRef.current.loading = currentArgs.loading;
		elementRef.current.multiple = currentArgs.multiple;

		elementRef.current.addEventListener( 'change', currentArgs.change );

		return () => {
			elementRef.current.removeEventListener( 'change', currentArgs.change );
		};
	}, [ args ] );

	return <div id="wc-root" ref={ rootRef }></div>;
}

/** @type {ButtonStory} */
export const Playground = {
	render: ( args ) => (
		<xb-cluster>
			<WebComponent args={ args } />

			<form
				action="http://www.foo.com"
				method="post"
				onSubmit={ ( event ) => {
					event.preventDefault();

					console.log( 'form submitted with', ...new FormData( event.target ) );
				} }
			>
				<xb-stack>
					<fieldset>
						<xb-stack>
							<xb-cluster>
								{ /* <input type="text" name="input" placeholder="Greeting" value="hello world" /> */ }

								<TextInput
									type="text"
									name="xb-text-input"
									placeholder="XB Greeting"
									defaultValue="hello world"
								></TextInput>
							</xb-cluster>

							<xb-cluster>
								<Checkbox name="xb-checkbox" value="agree-tc" defaultChecked>
									Agree with T&C s
								</Checkbox>

								{ /* <label>
									<input type="checkbox" name="checkbox" value="agree-tc-native" />
									Agree with T&C native
								</label> */ }
							</xb-cluster>

							<xb-cluster>
								<xb-text>Accept cookies</xb-text>
								<RadioGroup name="xb-radio-group" default-value="no">
									<Radio value="yes">Yes</Radio>
									<Radio value="no">No</Radio>
								</RadioGroup>
							</xb-cluster>

							<xb-cluster>
								<Switch name="xb-switch" value="accept-life-options" defaultChecked>
									Accept life options switch
								</Switch>
							</xb-cluster>

							<xb-cluster>
								<ToggleGroup type="multiple" name="xb-toggle-group" defaultValue="change">
									<Toggle value="accept">
										<span slot="leading">&diams;</span>
										Accept
									</Toggle>

									<Toggle value="change">
										<span slot="leading">&hearts;</span>
										Change
									</Toggle>

									<Toggle value="leave">
										<span slot="leading">&clubs;</span>
										Leave
									</Toggle>
								</ToggleGroup>
							</xb-cluster>

							<xb-cluster>
								{ /* <select name="favorite-letter">
									<option>Letter A</option>
									<option>Letter B</option>
									<option>Letter C</option>
								</select> */ }

								<Select defaultValue="letter-b" name="xb-select" onChange={ args.change }>
									<Option value="letter-a">Letter A</Option>
									<Option value="letter-b">Letter B</Option>
									<Option value="letter-c">Letter C</Option>
								</Select>
							</xb-cluster>
						</xb-stack>

						<hr />

						<xb-cluster>
							<Button variant="text" size="small">
								Cancel
							</Button>
							<Button type="reset" variant="ghost" size="small">
								Reset
							</Button>
							<Button type="submit" variant="flat" size="small">
								Submit
							</Button>
						</xb-cluster>
					</fieldset>
				</xb-stack>
			</form>
		</xb-cluster>
	),
	// play: async ( { canvasElement, args } ) => {
	// 	const canvas = within( canvasElement );

	// },

	args: {
		disabled: false,
	},
};

/** @type {import('../../common/arg-types').StoryObj} */
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
