import { getContainingBlock, getWindow } from '@floating-ui/utils/dom';

/**
 * Based on https://github.com/floating-ui/floating-ui/issues/1842
 * https://github.com/floating-ui/floating-ui/pull/2351/files
 *
 */
function topLayerMiddleware() {
	return {
		name: 'topLayer',
		/**
		 * @param {MiddlewareState} middlewareArguments
		 */
		async fn( middlewareArguments ) {
			const {
				x,
				y,
				elements: { reference, floating },
			} = middlewareArguments;
			let onTopLayer = false;
			let topLayerIsFloating = false;

			const diffCoords = {
				x: 0,
				y: 0,
			};
			try {
				onTopLayer = onTopLayer || floating.matches( ':popover-open' );
				// eslint-disable-next-line no-empty
			} catch ( error ) {}
			try {
				onTopLayer = onTopLayer || floating.matches( ':open' );
				// eslint-disable-next-line no-empty
			} catch ( error ) {}
			try {
				onTopLayer = onTopLayer || floating.matches( ':modal' );
				// eslint-disable-next-line no-empty
				/* c8 ignore next 3 */
			} catch ( error ) {}

			topLayerIsFloating = onTopLayer;

			if ( ! onTopLayer ) {
				const dialogAncestorQueryEvent = new Event( 'floating-ui-dialog-test', {
					composed: true,
					bubbles: true,
				} );
				floating.addEventListener(
					'floating-ui-dialog-test',
					( event ) => {
						event.composedPath().forEach( ( el ) => {
							if ( el === floating || el.localName !== 'dialog' ) return;
							try {
								onTopLayer = onTopLayer || el.matches( ':modal' );
								if ( onTopLayer ) {
									// console.log(el);
								}
								// eslint-disable-next-line no-empty
							} catch ( e ) {}
						} );
					},
					{ once: true }
				);
				floating.dispatchEvent( dialogAncestorQueryEvent );
			}

			let overTransforms = false;

			/** @type {Element} */
			const containingBlock = getContainingBlock( reference );
			if ( containingBlock !== null && containingBlock !== getWindow( containingBlock ) ) {
				overTransforms = true;
			}

			if ( onTopLayer && overTransforms && containingBlock ) {
				const rect = containingBlock.getBoundingClientRect();
				diffCoords.x = rect.x;
				diffCoords.y = rect.y;
			}

			if ( onTopLayer && topLayerIsFloating ) {
				return {
					x: x + diffCoords.x,
					y: y + diffCoords.y,
					data: diffCoords,
				};
			}

			if ( onTopLayer ) {
				return {
					x,
					y,
					data: diffCoords,
				};
			}

			return {
				x: x - diffCoords.x,
				y: y - diffCoords.y,
				data: diffCoords,
			};
		},
	};
}

export default topLayerMiddleware;
