import { unsafeCSS } from 'lit';

import toArray from '@welingtonms/xb-toolset/dist/to-array';

/** @type {TransitionConfig} */
const DEFAULT_TRANSITION_CONFIG = {
	property: 'all',
	delay: '0s',
	duration: '0.25s',
	easing: 'ease-in-out',
};

/**
 * @param {TransitionConfig} config
 */
function toTransition( config ) {
	const safeConfig = { ...DEFAULT_TRANSITION_CONFIG, ...config };

	// property name | duration | easing function | delay
	return unsafeCSS(
		`${ safeConfig.property } ${ safeConfig.duration } ${ safeConfig.easing } ${ safeConfig.delay }`
	);
}

/**
 * Convert a transition config to its CSS equivalent.
 * @param {TransitionConfig | TransitionConfig[]} configs
 */
function transition( configs ) {
	return unsafeCSS(
		`transition: ${ toArray( configs )
			.map( ( config ) => toTransition( config ) )
			.join( ', ' ) }`
	);
}

export default transition;

/**
 * @typedef {Object} TransitionConfig
 * @property {string} delay
 * @property {string} duration
 * @property {string} property
 * @property {string} easing - timing function
 */
