# shadcn-fe-cli

⚠ This is a mild fork of the OG shadcn-ui [shadcn/ui](https://github.com/shadcn/ui)

extra features :

- a shad.config.json to persist your path preferences.
  everything else works the same but the new command is

```bash
npx shadcn-fe-cli init
pnpm dlx shadcn-fe-cli init
```

> if you switch path preferences later make sure to manually move the lib/util file or run

```bash
npx shadcn-fe-cli init
```

again

- install all components by passing in `-A` option

```bash
npx shadcn-fe-cli add -A
pnpm shadcn-fe-cli add -A
```

A CLI for adding components to your project.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.js`, and CSS variables for the project.

```bash
npx shadcn-fe-cli init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx shadcn-fe-cli add [component]
```

or install all components by passing in `-A` option

```bash
npx shadcn-fe-cli add -A
pnpm shadcn-fe-cli add -A
```

### Example

```bash
npx shadcn-fe-cli add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx shadcn-plus add
```

## Documentation

Visit http://ui.shadcn.com/docs to view the documentation.

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).
