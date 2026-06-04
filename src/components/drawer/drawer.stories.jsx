import React, { useState, useEffect, useRef } from 'react';

import '../layout/cluster/cluster.define';
import '../button/button.define';
import '../icon/icon.define';
import '../text/text.define';
import './drawer.define';

/** @type {import('../../utils/arg-types').Meta} */
export default {
	title: 'Components/Drawer',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		open: {
			control: 'boolean',
			description: 'Whether the drawer is open',
		},
	},
};

/** @type {import('../../utils/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( args.open );
		const drawerRef = useRef( null );

		useEffect( () => setOpen( args.open ), [ args.open ] );
		useEffect( () => {
			const el = drawerRef.current;
			if ( ! el ) return;
			const onClose = () => setOpen( false );
			el.addEventListener( 'close', onClose );
			return () => el.removeEventListener( 'close', onClose );
		}, [] );

		return (
			<>
				<xb-button type="button" onClick={ () => setOpen( true ) }>
					Open drawer
				</xb-button>

				<xb-drawer ref={ drawerRef } open={ open } header="Drawer title">
					<div slot="body">
						<xb-text variant="text-sm" style={ { color: 'rgba(var(--xb-color-gray-600), 1)' } }>
							This is the drawer content. It uses the native dialog element with a backdrop. Press
							Escape or click outside to close.
						</xb-text>
					</div>

					<xb-cluster slot="footer" paddingless>
						<xb-button variant="primary">Confirm</xb-button>
						<xb-button variant="secondary-gray" onClick={ () => drawerRef.current?.close?.() }>
							Cancel
						</xb-button>
					</xb-cluster>
				</xb-drawer>
			</>
		);
	},
	args: {
		open: false,
	},
};
