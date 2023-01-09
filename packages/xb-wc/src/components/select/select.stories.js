import { html } from 'lit';

import { PlacementArg, SizeArg } from '../../common/arg-types';
import { useSyncFruits } from './select.fixtures';
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
			// page: Docs,
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
	<xb-select @xb-change=${ args.change } .datasources=${ [ useSyncFruits ] }>
		<xb-option value="fixed-fruit">Fixed fruit</xb-option>
	</xb-select>
`;

SyncDatasource.args = {
	multiple: false,
};

export const AsyncDatasource = ( args ) => html`
	<xb-select @xb-change=${ args.change }></xb-select>

	<script>
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
	</script>
`;

AsyncDatasource.args = {
	multiple: false,
};
