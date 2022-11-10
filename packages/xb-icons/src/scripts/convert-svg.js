const { optimize } = require( 'svgo' );
const { readFileSync, writeFileSync } = require( 'fs' );
const glob = require( 'glob' );
const path = require( 'path' );

function getFilename( fullPath ) {
	return path.parse( fullPath ).name;
}

const date = new Date().toUTCString();

glob( './src/assets/*', ( error, files ) => {
	const svgs = files
		.map( ( file ) => ( {
			filename: getFilename( file ),
			path: file,
			buffer: readFileSync( file ),
		} ) )
		.map( ( data ) => ( {
			filename: data.filename,
			path: data.path,
			svg: data.buffer.toString(),
		} ) )
		.map( ( data ) => ( {
			filename: data.filename,
			...optimize( data.svg, { multipass: true, path: data.path } ),
		} ) );

	writeFileSync(
		`./src/index.js`,
		`
	/**
 	* Do not modify this file manually.
 	* You can re-generate it by running the convert-svg script.
	* Generated on ${ date }
 	*/
	import { svg } from 'lit';

	const icons = {
	${ svgs
		.map( ( svg ) => {
			console.log( 'Processing icon', svg.filename + '.svg' );

			const name = svg.filename
				.replace( 'ic_', '' )
				.replace( '_48px', '' )
				.replace( '_', '-' )
				.toLowerCase();

			return `'${ name }': svg\`${ svg.data }\`,`;
		} )
		.join( '\n' ) }
	};

	export default icons;
	`
	);
} );

// one icon per file

// svgs.map( ( svg ) => {
// 	console.log( "Processing icon '", svg.filename + ".svg'" );
// 	writeFileSync(
// 		`./src/icons/${ svg.filename }.js`,
// 		`
// 	/**
//  	* Do not modify this file manually.
//  	* You can re-generate it by running the convert-svg script.
// 	* Generated on ${ date }
//  	*/

// 	import { svg } from 'lit';
// 	const icon = svg\`${ svg.data }\`;
// 	export default icon;
// 	`
// 	);
// } );

// one icon per const

// ${ svgs
// 	.map( ( svg ) => {
// 		const name = svg.filename
// 			.replace( 'ic_', '' )
// 			.replace( '_48px', '' )
// 			.toUpperCase();

// 		return `
// export const ${ name } = svg\`${ svg.data }\`;
// `;
// 	} )
// 	.join( '' ) }`
// );
