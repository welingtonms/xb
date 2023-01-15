import { html } from 'lit';

import { PlacementArg, SizeArg } from '../../common/arg-types';
import Docs from './select.api.mdx';
import {
	FRUITS,
	USERS,
	useSyncFruits,
	useAsyncFruits,
	useAsyncUsers,
} from './select.fixtures';
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
	<xb-select
		?loading=${ args.loading }
		?multiple=${ args.multiple }
		@xb-change=${ args.change }
	>
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
				<xb-text variant="caption">
					${ FRUITS.map( ( { label } ) => label ).join( ', ' ) }
				</xb-text>
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
