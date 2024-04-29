import { css } from 'lit';

import { floatingStyles } from '../../../common/floating-element';
import token from '../../../utils/get-token';
import { menuStyles as baseMenuStyles } from '../../menu';

export function selectStyles() {
	return [
		floatingStyles({
			floating: "[role='listbox']",
		}),
		css`
			:host {
				--xb-floating-width: 32ch;
				--xb-floating-min-width: 16ch;

				display: inline-flex;
			}
		`,
	];
}

export function menuStyles() {
	return [
		baseMenuStyles(),
		css`
			#spinner {
				visibility: hidden;
				/* --xb-floating-width: max-content;
		        --xb-floating-min-width: 16ch; */
			}

			:host([loading]) #spinner {
				visibility: visible;
			}
		`,
	];
}

export function optionStyles() {
	return [
		css`
			#check {
				margin-inline-start: auto;
				visibility: hidden;
			}

			:host([selected]) {
				--xb-item-background-color: ${token('color-primary-200', 0.1)};
			}

			:host([selected]) #check {
				visibility: visible;
			}
		`,
	];
}
