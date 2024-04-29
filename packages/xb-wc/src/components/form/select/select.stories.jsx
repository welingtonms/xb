import React, { useRef, useEffect } from 'react';
import { html, render } from 'lit';

import { FRUITS, USERS } from './select.fixtures';

import createComponent from '../../../utils/create-component';

import '../../layout';
import './select.define';
import { Select as SelectElement } from './select';
import { Option as OptionElement } from './select-option';

export const Select = createComponent( {
	tagName: 'xb-select',
	elementClass: SelectElement,
	displayName: 'Select',
	events: {
		onChange: 'change',
	},
} );

export const Option = createComponent( {
	tagName: 'xb-option',
	elementClass: OptionElement,
	displayName: 'Option',
} );

/** @type {import('../../../common/arg-types').Meta} */
const meta = {
	title: 'Components/form/select',
	component: 'xb-select',

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
		multiple: {
			control: {
				type: 'boolean',
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
				<xb-select name="xb-select" default-value="change">
					<xb-option value="accept">Accept</xb-option>
					<xb-option value="change">Change</xb-option>
					<xb-option value="leave">Leave</xb-option>
				</xb-select>
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

const fixtures = html`
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
`;

/** @type {import('../../../common/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => (
		<xb-stack>
			<WebComponent args={ args } />

			<Select
				name="xb-select-react"
				loading={ args.loading }
				multiple={ args.multiple }
				onChange={ args.change }
				disabled={ args.disabled }
				defaultValue="change"
			>
				<Option value="accept">Accept</Option>
				<Option value="change">Change</Option>
				<Option value="leave">Leave</Option>
			</Select>
		</xb-stack>
	),

	args: {
		// placement: 'bottom-start',
		loading: false,
		multiple: false,
		disabled: false,
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
// 					?multiple=${ args.multiple }
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
// 					?multiple=${ args.multiple }
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
// 		multiple: false,
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
// 					?multiple=${ args.multiple }
// 					.datasources=${ [ useSyncFruits ] }
// 				></xb-select>
// 			</xb-stack>

// 			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
// 				<xb-text variant="subtitle-2">Sync datasource with initial value</xb-text>
// 				<xb-select
// 					@xb:change=${ args.change }
// 					?disabled=${ args.disabled }
// 					?multiple=${ args.multiple }
// 					.datasources=${ [ useSyncFruits ] }
// 					.value=${ { label: 'Papaya', value: 'papaya' } }
// 				></xb-select>
// 			</xb-stack>
// 		</xb-stack>
// 	`,

// 	args: {
// 		multiple: false,
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
// 					?multiple=${ args.multiple }
// 					.datasources=${ [ useAsyncFruits, useAsyncUsers ] }
// 				></xb-select>
// 			</xb-stack>

// 			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
// 				<xb-text variant="subtitle-2">Async datasource with initial value</xb-text>
// 				<xb-select
// 					?multiple=${ args.multiple }
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
// 		multiple: false,
// 	},
// };
