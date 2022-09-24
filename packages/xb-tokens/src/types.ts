import { BaseTheme } from './themes';

// based on https://www.typescriptlang.org/play?#code/C4TwDgpgBAIg9sACgJwgMwJYA8A8AVKCLYCAOwBMBnKS4ZDUgcwD4oBeKAoki6gIj5QA-FAFQAXFAAGAOgAkAbzwBfKQCg1oSLAQA5CLQjkA0hBCV8rDgAouxMlShwARgCsIAY2DC1UP1AUoAG1jKAYoAFEsDwAbAFdyCBwAazM4NE4AGhoQAFtnOBjmAF1JKUVjZUV4JFRMXBr9QxMzCzwQ4uZmVShlIKjYhKTUkHSsnPzCkt9-SQEASkJ7XjDSNAhkWGFI4mQAQy8cGGzaeiZWSVIIADcNgG4NAHoAKigSWgZGKGfHjS1oJokcgAeTcnmAeHA0A4Chmfj2klOnzhUGciLoyP8UCutEksKxWI86LOjAeWOUKIQAAsNoC8SjCcTPmT-BSKZooVBAUZQe4vKZzOwdMBuS1zDhRbzwZDIMw1I9Hm9OZKwfzWkK+HtBAAfUTOHWiHHAGQeA18am0gzG00aDxwUi0N5WgBMkgAgsh9iAJVaeargALKFZgpq+Nk+Prw0aTWHRBbkICY8VbfbKIUIDIYnBGNZ3sBnfM1EA
type DashPrefix< T extends string > = T extends '' ? '' : `-${ T }`;

export type DashNestedKeys< T > = T extends string | number
	? ''
	: (
			T extends object
				? {
						[ K in Exclude< keyof T, symbol > ]: `${ K }${ DashPrefix<
							DashNestedKeys< T[ K ] >
						> }`;
				  }[ Exclude< keyof T, symbol > ]
				: ''
	   ) extends infer D
	? Extract< D, string >
	: never;

export type TokenValue = string | number;

export type FlattenableTheme = {
	[ key: string ]: TokenValue | FlattenableTheme;
};

export type FlattenedTheme< T extends FlattenableTheme > = Record<
	DashNestedKeys< T >,
	TokenValue
>;

// We strip brand and platform-specific tokens as they should not be used directly.
export type Token = keyof {
	[ TokenCandidate in keyof typeof BaseTheme as TokenCandidate extends `${
		| 'platform'
		| `brand` }-${ infer Token }`
		? never
		: TokenCandidate ]: Token;
};

export type ColorToken = keyof {
	[ Color in Token as Color extends `color-${ infer Token }`
		? Color
		: never ]: Token;
};

export type SpacingToken = keyof {
	[ Spacing in Token as Spacing extends `spacing-${ infer Token }`
		? Spacing
		: never ]: Token;
};

export type FontFamilyToken = keyof {
	[ Spacing in Token as Spacing extends `font-family-${ infer Token }`
		? Spacing
		: never ]: Token;
};

export type FontSizeToken = keyof {
	[ Spacing in Token as Spacing extends `font-size-${ infer Token }`
		? Spacing
		: never ]: Token;
};

export type FontWeightToken = keyof {
	[ Spacing in Token as Spacing extends `font-weight-${ infer Token }`
		? Spacing
		: never ]: Token;
};

export type LayerToken = keyof {
	[ Layer in Token as Layer extends `layer-${ infer Token }`
		? Layer
		: never ]: Token;
};
