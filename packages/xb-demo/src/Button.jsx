import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import { Button } from '@welingtonms/xb-wc/dist/button';

const ButtonComponent = createComponent( React, 'xb-button', Button, {
	onClick: 'xb-click',
} );

export default ButtonComponent;
