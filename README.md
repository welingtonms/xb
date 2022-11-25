# xb

Welcome to the XB component library. This is just a playground for practicing web components development.

## How to develop

This project uses [Lerna](https://lerna.js.org/) alongside [Yarn workspaces](https://yarnpkg.com/features/workspaces). Lerna uses the amazing [`Nx`](https://nx.dev/) tooling under the hood.

First, start by running the command that will install the dependencies for all the packages in the project and link the packages that depend on each other.

```bash
yarn install
```

To run the `@welingtonms/xb-wc` Storybook, run:

```bash
yarn pkg:wc dev
```

To run commands only in the affected packages affected:

```bash
nx affected --target=test
```

Run specific command for package:

```bash
nx run myapp:build
```

Run specific command for all packages:

```bash
nx run build
```

In the example above, we are running `test` only for the packages affected by any change we have made. Check the command [reference](https://nx.dev/using-nx/affected) for more details.

<!-- ## How to use

The libraries generated from this project are [published through Gitlab](To use the published module), add an _.npmrc_ file to your project.

For example, to use the `@welingtonms/xb-wc` module:

```bash
@welington:registry=https://gitlab.com/api/v4/packages/npm/
```

Then, install the module:

```bash
npm install --save @welingtonms/xb-wc
```

Or

```bash
yarn add --save @welingtonms/xb-wc
``` -->

## How to build

```bash
yarn lerna run build --scope=@welingtonms/xb-tokens
```

## References

- [Yarn Workspaces](https://yarnpkg.com/features/workspaces)
- [Lerna & Nx](https://lerna.js.org/docs/lerna-and-nx)
