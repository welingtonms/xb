export function detectFormAssociatedFeature() {
	// Reference: https://web.dev/articles/more-capable-form-controls#feature_detection
	return 'ElementInternals' in window && 'setFormValue' in window.ElementInternals.prototype;
}
