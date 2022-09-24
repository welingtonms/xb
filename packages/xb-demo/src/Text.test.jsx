import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Text from './Text';

function setup( jsx ) {
	return {
		user: userEvent.setup(),
		...render( jsx ),
	};
}

describe( 'Text (WC-based)', () => {
	it( 'renders', async () => {
		setup( <Text>Hello, World!</Text> );

		expect( screen.getByText( 'Hello, World!' ) ).toBeInTheDocument();
	} );
} );
