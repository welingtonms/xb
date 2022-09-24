class AriaButtonController {
	host = null;

	/**
	 *
	 * @param {import('lit').ReactiveControllerHost & HTMLElement} host
	 */
	constructor( host ) {
		( this.host = host ).addController( this );
	}

	hostConnected() {
		this.host.setAttribute( 'role', 'button' );
	}
}

export default AriaButtonController;
