import React, { useState, useEffect, useRef } from 'react';

import { userEvent, expect, fn, waitFor } from 'storybook/test';

import { queryShadow, waitForUpgrade, pressKey } from '../../utils/test-tools.js';

import '../layout/cluster/cluster.define';
import '../button/button.define';
import '../icon/icon.define';
import '../text/text.define';
import './dialog.define';

/**
 * @param {Element | null | undefined} dialogHost
 */
async function getDialog( dialogHost ) {
	await waitForUpgrade( dialogHost );

	return /** @type {import('./dialog').XBDialog} */ ( dialogHost );
}

/**
 * @param {import('./dialog').XBDialog} dialog
 */
async function expectDialogOpen( dialog ) {
	await waitFor( async () => {
		await expect( dialog.open ).toBe( true );
		await expect( queryShadow( dialog, 'dialog' )?.open ).toBe( true );
	} );
}

/**
 * @param {import('./dialog').XBDialog} dialog
 */
async function expectDialogClosed( dialog ) {
	await waitFor( async () => {
		await expect( dialog.open ).toBe( false );
	} );
}

/** @type {import('../../utils/arg-types').Meta} */
export default {
	title: 'Components/Dialog',
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		open: {
			control: 'boolean',
			description: 'Whether the dialog is open',
		},
	},
};

/** @type {import('../../utils/arg-types').StoryObj} */
export const Playground = {
	render: ( args ) => {
		const [ open, setOpen ] = useState( args.open );
		const dialogRef = useRef( null );

		useEffect( () => setOpen( args.open ), [ args.open ] );
		useEffect( () => {
			const el = dialogRef.current;
			if ( ! el ) return;
			const onClose = () => setOpen( false );
			el.addEventListener( 'close', onClose );
			return () => el.removeEventListener( 'close', onClose );
		}, [] );

		return (
			<>
				<xb-button type="button" onClick={ () => setOpen( true ) }>
					Open dialog
				</xb-button>

				<xb-dialog ref={ dialogRef } open={ open } header="Dialog title">
					<div slot="body">
						<xb-text variant="text-sm" style={ { color: 'rgba(var(--xb-color-gray-600), 1)' } }>
							This is the dialog content. It uses the native dialog element with a backdrop. Press
							Escape or click outside to close.
						</xb-text>

						<xb-text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet eleifend orci
							vitae ullamcorper. Nunc tincidunt enim sed quam aliquet, vel finibus mauris tempus.
							Donec elit mauris, laoreet et tellus ac, blandit placerat nisl. Phasellus imperdiet
							diam tempor orci dictum, vitae laoreet justo gravida. Fusce metus sapien, mattis ac
							vulputate viverra, luctus non elit. Ut placerat aliquet diam a placerat. Phasellus
							laoreet sodales efficitur. Suspendisse sollicitudin ligula id libero luctus, a
							consectetur turpis posuere. Sed a quam sollicitudin, venenatis orci vel, rhoncus
							lacus. In ut tincidunt felis.
						</xb-text>

						<xb-text>
							Cras et dignissim sem. Ut eget tortor eu justo tincidunt lacinia sit amet vitae magna.
							Aliquam elit enim, rutrum nec suscipit eu, vulputate eget purus. Phasellus rutrum
							dolor eu libero luctus laoreet. Ut libero orci, elementum et mauris in, aliquet
							malesuada neque. Suspendisse potenti. Vivamus imperdiet purus vitae lectus tempor
							efficitur. Sed id orci vel tortor tempor iaculis. Etiam tellus mi, vestibulum quis
							sagittis ullamcorper, dictum vitae dui. Pellentesque pellentesque dapibus vestibulum.
							Duis at eros sed enim cursus feugiat. Sed ut nisl molestie, pellentesque quam sed,
							sollicitudin tellus. In tristique diam sed leo tincidunt elementum. Duis tincidunt
							nibh sit amet leo facilisis convallis.
						</xb-text>

						<xb-text>
							Integer imperdiet sapien id erat pulvinar, ac sollicitudin arcu pellentesque. Aliquam
							egestas rutrum bibendum. Duis ipsum justo, hendrerit at lectus convallis, congue
							gravida ante. Ut sodales tristique justo non vestibulum. Vivamus varius metus nec urna
							dictum, quis pulvinar lectus iaculis. Phasellus vel eros ex. Duis cursus, metus sit
							amet tristique posuere, libero arcu mollis orci, nec sodales libero dolor ut tortor.
							Donec sed facilisis risus. Duis vel augue ac sem lobortis finibus eget a lectus.
							Mauris quis pellentesque diam. Duis nec facilisis leo. Nunc nisl leo, pharetra id mi
							in, lacinia ullamcorper nunc. Proin ornare at dolor sed porttitor. Maecenas molestie
							neque tincidunt justo viverra, id sodales felis vehicula. Proin vestibulum sodales
							diam eget consectetur.
						</xb-text>

						<xb-text>
							Maecenas quis urna libero. Integer tristique nibh nunc, non facilisis nunc aliquam
							nec. Nulla lobortis diam id tellus euismod, in sollicitudin sapien consectetur. Mauris
							eget condimentum odio. Suspendisse sed felis at lectus imperdiet feugiat. Aenean vitae
							nulla at eros sodales scelerisque. Ut imperdiet dignissim bibendum.
						</xb-text>

						<xb-text>
							Nunc iaculis, tortor vitae pretium iaculis, ligula velit fringilla risus, laoreet
							pharetra odio nisi at leo. Ut leo odio, accumsan eget vehicula eget, mollis non velit.
							Nunc malesuada ligula est, vitae tincidunt ipsum cursus a. Donec convallis purus
							tempus, tincidunt diam at, semper risus. Ut vulputate dolor vitae orci volutpat,
							dapibus molestie justo tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus
							et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et
							netus et malesuada fames ac turpis egestas. Nunc eu eros eu odio suscipit lobortis
							quis id ex. Donec eu risus eu lacus sagittis maximus quis sit amet lorem. Sed ultrices
							sodales volutpat. Sed gravida scelerisque cursus. Praesent faucibus lorem quis sem
							interdum hendrerit eu et mi. Sed leo dolor, lacinia id erat ut, dignissim blandit
							turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
							cubilia curae; Vivamus at convallis neque.
						</xb-text>

						<xb-text>
							Praesent iaculis metus sit amet posuere pellentesque. Vestibulum porta, dolor quis
							pharetra facilisis, elit urna suscipit purus, ac efficitur diam tortor nec risus.
							Curabitur ornare dignissim suscipit. Nulla interdum eget velit vitae aliquet. Sed in
							velit vitae mi semper viverra vel ut magna. Curabitur placerat justo sed libero
							dignissim tristique euismod nec ante. Vestibulum hendrerit eu ipsum eu efficitur.
							Curabitur porta placerat ante ac porttitor. Ut eu viverra velit. Sed blandit tempus
							ornare. Proin vitae convallis libero. Vivamus hendrerit dapibus quam, efficitur
							feugiat mauris eleifend nec.
						</xb-text>

						<xb-text>
							Maecenas lacinia enim at volutpat porttitor. Pellentesque ac ullamcorper leo. Integer
							lectus erat, tristique laoreet tempus non, tristique nec libero. Donec quis magna
							interdum, euismod arcu vel, auctor justo. Phasellus et gravida libero. Duis in purus
							tincidunt, placerat nibh a, mollis leo. Praesent sed arcu at ligula euismod aliquet.
							Praesent arcu libero, finibus ultrices dapibus eu, tempor vitae nulla. Interdum et
							malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Vivamus laoreet lacus eu nisi lacinia tincidunt. Quisque
							posuere cursus laoreet. Proin malesuada commodo enim id maximus.
						</xb-text>

						<xb-text>
							Etiam sed elementum est. Pellentesque habitant morbi tristique senectus et netus et
							malesuada fames ac turpis egestas. Fusce sed sapien ut justo tempus rhoncus. Etiam
							aliquet, libero et tincidunt hendrerit, libero enim vestibulum massa, id semper arcu
							lectus eu orci. Cras mattis massa vel odio consectetur, ut consequat purus maximus.
							Donec pulvinar augue a lacus rhoncus vestibulum. Phasellus feugiat, enim eu pulvinar
							porta, quam sapien pellentesque lacus, a euismod urna nibh sed libero. Vivamus eget
							felis dignissim sapien malesuada commodo. Donec condimentum at nunc id dignissim.
							Donec at metus pharetra, facilisis mi sit amet, sagittis enim. Nullam nisi velit,
							consequat nec fringilla eget, ornare sit amet orci. Vivamus venenatis pellentesque
							enim, eget rhoncus metus auctor iaculis. Vestibulum lectus justo, mattis eget orci ac,
							sollicitudin hendrerit diam.
						</xb-text>

						<xb-text>
							Fusce placerat mollis ex, vitae lobortis augue vulputate vehicula. Nunc nec ultrices
							dolor. In hac habitasse platea dictumst. Sed turpis nisi, viverra eu augue mattis,
							euismod tempor magna. Quisque magna neque, feugiat sed urna non, mollis condimentum
							est. Nulla at consectetur mi, et maximus dui. Nulla pellentesque eget nisl eu congue.
							Sed felis ipsum, maximus id justo sit amet, porttitor blandit magna. Fusce feugiat
							tincidunt pretium. Curabitur lobortis velit non rhoncus congue. In eget dolor non mi
							mattis rhoncus. Maecenas aliquam orci magna, eu bibendum lorem mollis at. Nullam nec
							mi mi. Sed ut massa neque.
						</xb-text>

						<xb-text>
							Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam non orci ac nunc
							suscipit tempor vitae aliquam ligula. Vivamus interdum consectetur fermentum. Integer
							semper quam augue, eu pulvinar leo dictum sed. Ut eget est accumsan, gravida libero
							sed, sodales quam. Pellentesque lectus lectus, fermentum sit amet sodales sit amet,
							pretium vitae neque. Aenean ipsum urna, finibus a massa quis, malesuada semper nisl.
							Morbi mollis tincidunt diam, rutrum lacinia velit auctor dictum. Sed hendrerit sed
							lacus quis condimentum. Etiam mollis lobortis diam id tempor. In viverra sapien a
							velit iaculis tempor.
						</xb-text>
					</div>

					<xb-cluster slot="footer" paddingless>
						<xb-button variant="primary">Confirm</xb-button>
						<xb-button
							variant="secondary-gray"
							onClick={ ( e ) => e.target.closest( 'xb-dialog' )?.close?.() }
						>
							Cancel
						</xb-button>
					</xb-cluster>
				</xb-dialog>
			</>
		);
	},
	args: {
		open: false,
	},
};

export const OpensAndCloses = {
	name: 'Test: Opens and closes',
	tags: [ '!autodocs' ],
	args: {
		onClose: fn(),
		onOpen: fn(),
	},
	render: () => (
		<xb-dialog header="Dialog title">
			<div slot="body">Body content</div>
		</xb-dialog>
	),
	play: async ( { canvasElement, args, step } ) => {
		const dialog = await getDialog( canvasElement.querySelector( 'xb-dialog' ) );
		dialog.addEventListener( 'close', args.onClose );
		dialog.addEventListener( 'open', args.onOpen );

		await step( 'starts closed', async () => {
			await expectDialogClosed( dialog );
		} );

		await step( 'show opens the dialog and emits open', async () => {
			dialog.show();
			await expectDialogOpen( dialog );
			await expect( args.onOpen ).toHaveBeenCalled();
		} );

		await step( 'close closes the dialog and emits close', async () => {
			args.onClose.mockClear();
			dialog.close();
			await expectDialogClosed( dialog );
			await expect( args.onClose ).toHaveBeenCalled();
		} );
	},
};

export const CloseButton = {
	name: 'Test: Close button',
	tags: [ '!autodocs' ],
	args: {
		onClose: fn(),
	},
	render: () => (
		<xb-dialog header="Dialog title" open>
			<div slot="body">Body content</div>
		</xb-dialog>
	),
	play: async ( { canvasElement, args, step } ) => {
		const dialog = await getDialog( canvasElement.querySelector( 'xb-dialog' ) );
		dialog.addEventListener( 'close', args.onClose );

		await step( 'dialog is open initially', async () => {
			await expectDialogOpen( dialog );
		} );

		await step( 'close button closes the dialog', async () => {
			const closeButton = queryShadow( dialog, '.close-button' );
			await waitForUpgrade( closeButton );
			await userEvent.click( closeButton );
			await expectDialogClosed( dialog );
			await expect( args.onClose ).toHaveBeenCalled();
		} );
	},
};

export const EscapeCloses = {
	name: 'Test: Escape closes',
	tags: [ '!autodocs' ],
	args: {
		onClose: fn(),
	},
	render: () => (
		<xb-dialog header="Dialog title" closed-by="any" open>
			<div slot="body">Body content</div>
		</xb-dialog>
	),
	play: async ( { canvasElement, args, step } ) => {
		const dialog = await getDialog( canvasElement.querySelector( 'xb-dialog' ) );
		dialog.addEventListener( 'close', args.onClose );

		await step( 'dialog is open initially', async () => {
			dialog.closedBy = 'any';
			await dialog.updateComplete;
			await expectDialogOpen( dialog );
		} );

		await step( 'Escape closes the dialog', async () => {
			const nativeDialog = queryShadow( dialog, 'dialog' );
			pressKey( nativeDialog, 'Escape' );
			await expectDialogClosed( dialog );
			await expect( args.onClose ).toHaveBeenCalled();
		} );
	},
};

export const HeaderAndSlots = {
	name: 'Test: Header and slots',
	tags: [ '!autodocs' ],
	render: () => (
		<xb-dialog open header="Default header">
			<div slot="body">Body text</div>
			<div slot="footer">Footer actions</div>
		</xb-dialog>
	),
	play: async ( { canvasElement, step } ) => {
		const dialog = await getDialog( canvasElement.querySelector( 'xb-dialog' ) );

		await step( 'header prop renders in the dialog', async () => {
			const headerText = queryShadow( dialog, '.header xb-text' );
			await expect( headerText?.textContent?.trim() ).toBe( 'Default header' );
		} );

		await step( 'body and footer slots render slotted content', async () => {
			await expect( canvasElement.querySelector( '[slot="body"]' ) ).toHaveTextContent(
				'Body text'
			);
			await expect( canvasElement.querySelector( '[slot="footer"]' ) ).toHaveTextContent(
				'Footer actions'
			);
		} );
	},
};
