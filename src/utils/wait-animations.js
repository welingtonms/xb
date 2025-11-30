/**
 * @param {Animatable} animatable
 * @param {GetAnimationsOptions} options
 * @returns {Promise<void>}
 */
export async function waitForAnimations( animatable, options ) {
	const animations = animatable.getAnimations( options );
	const promises = animations.map( ( { finished } ) => finished );
	await Promise.allSettled( promises );
}
