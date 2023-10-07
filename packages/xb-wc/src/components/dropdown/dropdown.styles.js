import { floatingStyles } from '../../common/floating-element';

function styles() {
	return [
		floatingStyles( {
			floating: '::slotted([role="menu"])',
		} ),
	];
}

export default styles;
