import { html } from 'lit';

import {
	FRUITS,
	USERS,
	useSyncFruits,
	useAsyncFruits,
	useAsyncUsers,
} from './select.fixtures';
import { PlacementArg, SizeArg } from '../../common/arg-types';

import '../layout/stack';
import '../text';
import './select';

export default {
	title: 'Components/select',
	component: 'xb-select',

	argTypes: {
		change: {
			action: 'changed',
			table: {
				disable: true,
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

const fixtures = html`
	<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
		<xb-text variant="subtitle-2">Users</xb-text>
		<output>
			<xb-text variant="caption">
				${ USERS.map( ( { name } ) => name ).join( ', ' ) }
			</xb-text>
		</output>
	</xb-stack>

	<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
		<xb-text variant="subtitle-2">Fruits</xb-text>
		<output>
			<xb-text variant="caption">
				${ FRUITS.map( ( { label } ) => label ).join( ', ' ) }
			</xb-text>
		</output>
	</xb-stack>
`;

export const Playground = {
	render: ( args ) => html`
		<xb-select
			?loading=${ args.loading }
			?multiple=${ args.multiple }
			@xb-change=${ args.change }
		>
			<xb-option value="change">Change</xb-option>
			<xb-option value="accept">Accept</xb-option>
			<xb-option value="leave">Leave</xb-option>
		</xb-select>
	`,

	args: {
		// placement: 'bottom-start',
		loading: false,
		multiple: false,
	},
};

export const StaticOptions = {
	render: ( args ) => html`
		<xb-stack>
			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
				<xb-text variant="subtitle-2">Static options</xb-text>
				<xb-select @xb-change=${ args.change } ?multiple=${ args.multiple }>
					<xb-option value="change">Change</xb-option>
					<xb-option value="accept">Accept</xb-option>
					<xb-option value="leave">Leave</xb-option>
				</xb-select>
			</xb-stack>

			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
				<xb-text variant="subtitle-2">
					Static options with initial value
				</xb-text>
				<xb-select
					@xb-change=${ args.change }
					?multiple=${ args.multiple }
					value="accept"
				>
					<xb-option value="change">Change</xb-option>
					<xb-option value="accept">Accept</xb-option>
					<xb-option value="leave">Leave</xb-option>
				</xb-select>
			</xb-stack>
		</xb-stack>
	`,

	args: {
		multiple: false,
	},
};

export const SyncDatasource = {
	render: ( args ) => html`
		<xb-stack>
			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
				<xb-text variant="subtitle-2">Fruits</xb-text>
				<output>
					<xb-text variant="caption">
						${ FRUITS.map( ( { label } ) => label ).join( ', ' ) }
					</xb-text>
				</output>
			</xb-stack>

			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
				<xb-text variant="subtitle-2">Sync datasource</xb-text>
				<xb-select
					@xb-change=${ args.change }
					?multiple=${ args.multiple }
					.datasources=${ [ useSyncFruits ] }
				></xb-select>
			</xb-stack>

			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
				<xb-text variant="subtitle-2">
					Sync datasource with initial value
				</xb-text>
				<xb-select
					@xb-change=${ args.change }
					?multiple=${ args.multiple }
					.datasources=${ [ useSyncFruits ] }
					.value=${ { label: 'Papaya', value: 'papaya' } }
				></xb-select>
			</xb-stack>
		</xb-stack>
	`,

	args: {
		multiple: false,
	},
};

export const AsyncDatasource = {
	render: ( args ) => html`
		<xb-stack>
			${ fixtures }

			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
				<xb-text variant="subtitle-2">Async datasource</xb-text>
				<xb-select
					@xb-change=${ args.change }
					?multiple=${ args.multiple }
					.datasources=${ [ useAsyncFruits, useAsyncUsers ] }
				></xb-select>
			</xb-stack>

			<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
				<xb-text variant="subtitle-2">
					Async datasource with initial value
				</xb-text>
				<xb-select
					?multiple=${ args.multiple }
					@xb-change=${ args.change }
					.datasources=${ [ useAsyncUsers, useAsyncFruits ] }
					.value=${ [
						{ label: 'Papaya', value: 'papaya' },
						{
							guid: '56d851fa-1036-4c90-9ef4-38ad90488b07',
							name: 'Enid Myers',
							_type: 'user',
						},
					] }
				></xb-select>
			</xb-stack>
		</xb-stack>
	`,

	args: {
		multiple: false,
	},
};
