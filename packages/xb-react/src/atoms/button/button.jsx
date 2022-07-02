import { tokens } from '@welingtonms/xb-tokens';

function Button( { children, ...rest } ) {
	console.log( tokens );
	return <button { ...rest }>{ children }</button>;
}

export default Button;
