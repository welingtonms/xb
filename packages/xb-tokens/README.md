# XB Tokens

This package uses [Style Dictionary](https://amzn.github.io/style-dictionary/) under the hood to manage the base tokens, and offers a set of tools built on top of the processed tokens to allow them to be consume from Javascript-based styling.

## How tokens are managed

Our tokens are structure inside the _src/tokens_ folder.

- **platforms** folder contains tokens that are specific to a platform (web or mobile, for example). Notice that, any token overriden for a given plaform must be also overriden for the other supported platforms.
- **brands** folder contains tokens that are specific to a brand customization. As with the _platform_ tokens, any token overriden for a given brand must be also overriden for the other available brands.
- **globals** folder contains tokens that apply to the entire Design System. We should also have here the tokens that converge platform of brand specific ones so when the build runs, the proper tokens set is generated to each platform _vs_ brand combination:

```
...
tokens
│
|- brands
│   │
│   |-──brand-1
│   │   │
│   │   │   color.js // { brand: { color: { primary: { value: 'red' } } } }
│   │
│   └───brand-2
│       │
│       │   color.js // { brand: { color: { primary: { value: 'green' } } } }
│
|- platforms
│   │
│   |-──brand-1
│   │   │
│   │   │   font.js // { platform: { font: { family: { value: 'Verdana' } } } }
│   │
│   └───brand-2
│       │
│       │   font.js // { platform: { font: { family: { value: 'Roboto' } } } }
│
|- globals
│   │
│   |-color
│   │   │
│   │   │   index.js  // { color: { primary: { value'{brand.color.primary.value}' } } }
│   │
│   |-font
│       │
│       │   index.js  // { font: { family: { value'{platform.font.family.value}' } } }
│
...
```

## How to add a new token

- First evaluate if your token should be brand or platform specific:

  1. If yes, the new token is brand or platform specific:
     1.1. Add the new token under the existing category (font, color, spacing, etc) file, or add a new file to represent the new category in the respective _brand_ of _platform_ folder.
     1.2. Likewise, add the equivalent token for the other brands or platforms.

  2. If no, the new token is **not** brand or platform specific:
     2.1. Add the token under the existing category under the _globals_ folder

After that, to generate the updated _base theme_, run:

```bash
yarn build-tokens
```

(This command is also run during the build process.)

You should see something like this output:

```bash
Build started...

Processing canonical theme

web
✔︎ src/themes/base.theme.js

Processing: [web] [xb]

web
✔︎ dist/tokens/web/xb/xb-variables.css
✔︎ dist/tokens/web/xb/xb-variables.scss
✔︎ dist/tokens/web/xb/xb-tokens.js

End processing

Processing: [android] [xb]

android
✔︎ dist/tokens/android/xb/tokens.colors.xml

End processing

Processing: [ios] [xb]

ios
✔︎ dist/tokens/ios/xb/tokens.h

End processing
```
