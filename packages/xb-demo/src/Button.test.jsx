import React from 'react';
import { screen, render, fireEvent as fire } from '@testing-library/react';

import Button from './Button';

describe( '<Button />', () => {
	it( 'renders', async () => {
		const props = {
			onClick: jest.fn(),
		};

		render( <Button { ...props }>Hello</Button> );

		expect( screen.getByRole( 'button' ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button' ) ).toHaveTextContent( 'Hello' );
	} );

	it( 'does not trigger onClick when disabled', async () => {
		const props = {
			onClick: jest.fn(),
			disabled: true,
		};

		render( <Button { ...props }>Hello</Button> );

		fire.click( screen.getByRole( 'button' ) );
		expect( props.onClick ).not.toHaveBeenCalled();
	} );

	it( 'triggers onClick when disabled', async () => {
		const props = {
			onClick: jest.fn(),
		};

		render( <Button { ...props }>Hello</Button> );

		fire.click( screen.getByRole( 'button' ) );
		expect( props.onClick ).toHaveBeenCalled();
	} );
} );
