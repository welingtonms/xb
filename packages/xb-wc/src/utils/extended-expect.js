import { roles } from 'aria-query';
import { expect } from '@storybook/jest';

/**
 * TODO: add all the fancyness from https://github.com/testing-library/jest-dom/blob/main/src/to-be-selected.js
 * @param {HTMLElement} actual
 * @returns
 */
export function toBeSelected( element ) {
	const isValidOption = () => {
		return element.tagName.toLowerCase() === 'option';
	};

	const isValidAriaElement = () => {
		return (
			roleSupportsSelected( element.getAttribute( 'role' ) ) &&
			[ 'true', 'false' ].includes( element.getAttribute( 'aria-selected' ) )
		);
	};

	if ( ! isValidOption() && ! isValidAriaElement() ) {
		return {
			pass: false,
			message: () =>
				`only option or elements with ${ supportedRolesSentence() } and a valid aria-selected attribute can be used with .toBeSelected(). Use .toHaveValue() instead`,
		};
	}

	const isSelected = () => {
		if ( isValidOption() ) return element.selected;
		return element.getAttribute( 'aria-selected' ) === 'true';
	};

	return {
		pass: isSelected(),
		message: () => {
			const is = isSelected() ? 'is' : 'is not';
			return [
				this.utils.matcherHint(
					`${ this.isNot ? '.not' : '' }.toBeSelected`,
					'element',
					''
				),
				'',
				`Received element ${ is } selected:`,
				`  ${ this.utils.printReceived( element.cloneNode( false ) ) }`,
			].join( '\n' );
		},
	};
}

function supportedRolesSentence() {
	return toSentence(
		supportedRoles().map( ( role ) => `role="${ role }"` ),
		{ lastWordConnector: ' or ' }
	);
}

function supportedRoles() {
	return roles.keys().filter( roleSupportsSelected );
}

function roleSupportsSelected( role ) {
	return roles.get( role )?.props[ 'aria-selected' ] !== undefined;
}

expect.extend( {
	toBeSelected,
} );

export { expect };
