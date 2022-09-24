import { useState } from 'react';

import Button from './Button';
import Text from './Text';

import '@welingtonms/xb-tokens/dist/tokens/web/xb/variables.css';

function App() {
	const [ count, setCount ] = useState( 0 );
	const [ disabled, setDisabled ] = useState( false );

	return (
		<div className="App">
			<div>
				<Button
					disabled={ disabled }
					emphasis="flat"
					onClick={ ( e ) => {
						setCount( ( count ) => count + 1 );
					} }
				>
					count is { count }
				</Button>
				<Text variant="body-1">
					The quick brown fox jumps over the lazy dog
				</Text>
			</div>
			<div>
				<button
					type="button"
					onClick={ ( e ) => {
						setDisabled( ( disabled ) => ! disabled );
					} }
				>
					{ disabled ? 'Enable' : 'Disable' }
				</button>
			</div>
		</div>
	);
}

export default App;
