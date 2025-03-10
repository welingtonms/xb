/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    '../src/**/*.mdx',
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // Add support for Lit elements with Babel
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          // The options here should match .babelrc
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', {
              runtime: 'automatic'
            }]
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', {
              version: '2023-05'
            }]
          ]
        }
      }
    });
    return config;
  }
};

export default config;
