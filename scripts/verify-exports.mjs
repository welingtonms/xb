import { access } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse( readFileSync( new URL( '../package.json', import.meta.url ), 'utf8' ) );
const root = new URL( '../', import.meta.url );

let failed = 0;

for ( const [ subpath, target ] of Object.entries( pkg.exports ) ) {
	if ( subpath === './package.json' ) {
		continue;
	}

	const file = new URL( target, root );

	try {
		await access( file );
	} catch {
		console.error( `MISSING: ${ subpath } → ${ target }` );
		if ( target.startsWith( './dist/' ) ) {
			console.error( '  Hint: run `yarn build` to generate dist/ artifacts' );
		}
		failed++;
	}
}

if ( failed > 0 ) {
	process.exit( 1 );
}

console.log( `OK: ${ Object.keys( pkg.exports ).length - 1 } export targets exist` );
