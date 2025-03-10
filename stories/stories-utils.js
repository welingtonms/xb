import Theme from '../src/themes/xb.theme.json';

const themeTokens = Object.keys(Theme);

export function getThemeTokens(...filters) {
	const regex = new RegExp(`^${filters.join('|')}`);

	return themeTokens.filter((token) => regex.test(token));
}
