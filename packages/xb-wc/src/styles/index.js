import { default as activable } from './activable';
import { default as disableable } from './disableable';
import { default as focusable } from './focusable';
import { default as hoverable } from './hoverable';

export const when = {
	active: activable,
	disabled: disableable,
	focused: focusable,
	hovered: hoverable,
};

export { default as m, mr, ml, mx, mt, mb, my } from './margin';
export { default as p, pr, pl, px, pt, pb, py } from './padding';
export { default as transition } from './transition';
export { default as typography } from './typography';
