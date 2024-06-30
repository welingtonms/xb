import createComponent from '../../utils/create-component';

import { Button as ButtonElement } from './button';

export const Button = createComponent({
	tagName: 'xb-button',
	elementClass: ButtonElement,
	displayName: 'Button',
});
