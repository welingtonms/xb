import { ContextRoot } from '@lit-labs/context';

let hasAttached = false;
let root;

export function attachContextRoot() {
	if ( hasAttached ) {
		return;
	}

	root = new ContextRoot();
	root.attach( document.body );

	hasAttached = true;
}

export function detachContextRoot() {
	if ( ! hasAttached || root == null ) {
		return;
	}

	root.detach( document.body );

	root = null;
	hasAttached = false;
}
