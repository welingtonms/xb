import React from 'react';

import toCSSValue from '../../../utils/to-css-value';

import { FRUITS, USERS } from './select.fixtures';

import '../../layout';
import '../../icon/icon.define';
import './select.define';
import { Select as SelectElement } from './select';
import { Option as OptionElement } from './select-option';

export default {
	title: 'Components/Form/Select',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		loading: {
			control: {
				type: 'boolean',
			},
		},
		type: {
			control: 'radio',
			options: [ 'single-strict', 'single', 'multiple' ],
		},
		responsive: {
			control: 'boolean',
		},
	},
};

/* const fixtures = html`
	<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
		<xb-text variant="subtitle-2">Users</xb-text>
		<output>
			<xb-text variant="caption">${ USERS.map( ( { name } ) => name ).join( ', ' ) }</xb-text>
		</output>
	</xb-stack>

	<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
		<xb-text variant="subtitle-2">Fruits</xb-text>
		<output>
			<xb-text variant="caption">${ FRUITS.map( ( { label } ) => label ).join( ', ' ) }</xb-text>
		</output>
	</xb-stack>
`;*/

/** @type {import('../../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<xb-select
				name="xb-select"
				default-value="change"
				loading={ args.loading }
				type={ args.type }
				onchange={ args.change }
				disabled={ args.disabled }
				responsive={ args.responsive }
			>
				<xb-option value="accept">Accept</xb-option>
				<xb-option value="change">Change</xb-option>
				<xb-option value="leave">Leave</xb-option>
			</xb-select>

			<xb-select
				name="xb-select"
				default-value="change"
				loading={ args.loading }
				type={ args.type }
				onchange={ args.change }
				disabled={ args.disabled }
				responsive={ args.responsive }
			>
				<xb-option value="accept" icon="user">
					Phoenix Baker
				</xb-option>
				<xb-option value="change" icon="user">
					John Doe
				</xb-option>
				<xb-option value="leave" icon="user">
					Jane Doe
				</xb-option>
			</xb-select>
		</xb-stack>
	),

	args: {
		// placement: 'bottom-start',
		loading: false,
		type: 'single',
		disabled: false,
		responsive: true,
	},
};

/**
 * This is the select filled with statically rendered options.
 */
// export const StaticOptions = {
// 	render: ( args ) => html`
// 		<xb-stack>
// 			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
// 				<xb-text variant="subtitle-2">Static options</xb-text>
// 				<xb-select
// 					@xb:change=${ args.change }
// 					?disabled=${ args.disabled }
// 					type=${ args.type }
// 				>
// 					<xb-option value="change">Change</xb-option>
// 					<xb-option value="accept">Accept</xb-option>
// 					<xb-option value="leave">Leave</xb-option>
// 				</xb-select>
// 			</xb-stack>

// 			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
// 				<xb-text variant="subtitle-2">Static options with initial value</xb-text>
// 				<xb-select
// 					@xb:change=${ args.change }
// 					?disabled=${ args.disabled }
// 					type=${ args.type }
// 					.value=${ { label: 'Accept', value: 'accept' } }
// 				>
// 					<xb-option value="change">Change</xb-option>
// 					<xb-option value="accept">Accept</xb-option>
// 					<xb-option value="leave">Leave</xb-option>
// 				</xb-select>
// 			</xb-stack>
// 		</xb-stack>
// 	`,

// 	args: {
// 		type: 'single',
// 	},
// };

// export const SyncDatasource = {
// 	render: ( args ) => html`
// 		<xb-stack>
// 			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
// 				<xb-text variant="subtitle-2">Fruits</xb-text>
// 				<output>
// 					<xb-text variant="caption">
// 						${ FRUITS.map( ( { label } ) => label ).join( ', ' ) }
// 					</xb-text>
// 				</output>
// 			</xb-stack>

// 			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
// 				<xb-text variant="subtitle-2">Sync datasource</xb-text>
// 				<xb-select
// 					@xb:change=${ args.change }
// 					?disabled=${ args.disabled }
// 					type=${ args.type }
// 					.datasources=${ [ useSyncFruits ] }
// 				></xb-select>
// 			</xb-stack>

// 			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
// 				<xb-text variant="subtitle-2">Sync datasource with initial value</xb-text>
// 				<xb-select
// 					@xb:change=${ args.change }
// 					?disabled=${ args.disabled }
// 					type=${ args.type }
// 					.datasources=${ [ useSyncFruits ] }
// 					.value=${ { label: 'Papaya', value: 'papaya' } }
// 				></xb-select>
// 			</xb-stack>
// 		</xb-stack>
// 	`,

// 	args: {
// 		type: 'single',
// 	},
// };

// export const AsyncDatasource = {
// 	render: ( args ) => html`
// 		<xb-stack>
// 			${ fixtures }

// 			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
// 				<xb-text variant="subtitle-2">Async datasource</xb-text>
// 				<xb-select
// 					@xb:change=${ args.change }
// 					?disabled=${ args.disabled }
// 					type=${ args.type }
// 					.datasources=${ [ useAsyncFruits, useAsyncUsers ] }
// 				></xb-select>
// 			</xb-stack>

// 			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
// 				<xb-text variant="subtitle-2">Async datasource with initial value</xb-text>
// 				<xb-select
// 					type=${ args.type }
// 					@xb:change=${ args.change }
// 					?disabled=${ args.disabled }
// 					.datasources=${ [ useAsyncUsers, useAsyncFruits ] }
// 					.value=${ [
// 						{ label: 'Papaya', value: 'papaya' },
// 						{
// 							guid: '56d851fa-1036-4c90-9ef4-38ad90488b07',
// 							name: 'Enid Myers',
// 							_type: 'user',
// 						},
// 					] }
// 				></xb-select>
// 			</xb-stack>
// 		</xb-stack>
// 	`,

// 	args: {
// 		type: 'single',
// 	},
// };
