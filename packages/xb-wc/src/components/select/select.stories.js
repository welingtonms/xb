import { html } from 'lit';

import { FRUITS, USERS, useSyncFruits, useAsyncFruits, useAsyncUsers } from './select.fixtures';
import { PlacementArg, SizeArg } from '../../common/arg-types';
import Docs from './select.api.mdx';
import './select';

export default {
	title: 'Components/select',

	argTypes: {
		change: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
		placement: PlacementArg,
		size: SizeArg,
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
	parameters: {
		docs: {
			page: Docs,
		},
	},
};

export const Playground = ( args ) => html`
	<xb-select ?loading=${ args.loading } ?multiple=${ args.multiple } @xb-change=${ args.change }>
		<xb-option value="change">
			<!-- <xb-icon name="favorite" slot="leading"></xb-icon> -->
			Change
		</xb-option>
		<xb-option value="accept">
			<!-- <xb-icon name="star" slot="leading"></xb-icon> -->
			Accept
		</xb-option>
		<xb-option value="leave">
			<!-- <xb-icon name="cloud" slot="leading"></xb-icon> -->
			Leave
		</xb-option>
	</xb-select>
`;

Playground.args = {
	// placement: 'bottom-start',
	loading: false,
	multiple: false,
};

export const SyncDatasource = ( args ) => html`
	<xb-stack>
		<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
			<xb-text variant="subtitle-2">Fruits</xb-text>
			<output>
				<xb-text variant="caption">${ FRUITS.map( ( { label } ) => label ).join( ', ' ) }</xb-text>
			</output>
		</xb-stack>

		<xb-select
			@xb-change=${ args.change }
			?multiple=${ args.multiple }
			.datasources=${ [ useSyncFruits ] }
		></xb-select>
	</xb-stack>
`;

SyncDatasource.args = {
	multiple: false,
};

export const AsyncDatasource = ( args ) => html`
	<xb-stack>
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

		<xb-select
			@xb-change=${ args.change }
			?multiple=${ args.multiple }
			.datasources=${ [ useAsyncFruits, useAsyncUsers ] }
		></xb-select>
	</xb-stack>
`;

// [ useAsyncFruits, useAsyncUsers ]

AsyncDatasource.args = {
	multiple: false,
};

export const Examples = ( args ) => html`
	<xb-stack>
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

		<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
			<xb-text variant="subtitle-2">Static options with initial value</xb-text>
			<xb-select @xb-change=${ args.change } ?multiple=${ args.multiple } value="accept">
				<xb-option value="change">Change</xb-option>
				<xb-option value="accept">Accept</xb-option>
				<xb-option value="leave">Leave</xb-option>
			</xb-select>
		</xb-stack>

		<xb-stack style="--xb-stack-gap: var(--xb-spacing-1);">
			<xb-text variant="subtitle-2">Datasource with initial value</xb-text>
			<xb-text variant="body-2">
				In this case, you need to provide the full option object, including its
				<code>_type</code>
				property, indicating to which
				<code>datasource</code>
				it belongs. For objects with
				<code>label</code>
				and
				<code>value</code>
				properties, the
				<code>_type</code>
				property is not necessary.
			</xb-text>
			<xb-cluster>
				<xb-select
					@xb-change=${ args.change }
					?multiple=${ args.multiple }
					.datasources=${ [ useAsyncUsers ] }
					.value=${ {
						guid: '56d851fa-1036-4c90-9ef4-38ad90488b07',
						name: 'Enid Myers',
						_type: 'user',
					} }
				></xb-select>
				<xb-select
					@xb-change=${ args.change }
					?multiple=${ args.multiple }
					.datasources=${ [ useSyncFruits ] }
					.value=${ { label: 'Papaya', value: 'papaya' } }
				></xb-select>
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
			</xb-cluster>
		</xb-stack>
	</xb-stack>
`;

Examples.args = {
	multiple: true,
};

{
	/* <script>
	function useAsyncUsers() {
		return {
			name: 'users',
			adapter: {
				getID( user ) {
					return user.id;
				},
				getLabel( user ) {
					return user.name;
				},
			},
			fetch: async ( { regex, query } ) => {
				const response = await fetch(
					'https://gorest.co.in/public/v2/users',
					{
						method: 'GET',
					}
				);
				const users = await response.json();

				return users.filter( ( { name } ) => regex.test( name ) );
			},
		};
	}

	const select = document.querySelector( 'xb-select' );
	select.datasources = [ useAsyncUsers ];
</script> */
}
