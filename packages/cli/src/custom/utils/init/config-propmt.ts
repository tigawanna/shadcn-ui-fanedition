import { logger } from '@/src/utils/logger';
import { getRegistryStyles, getRegistryBaseColors } from '@/src/utils/registry';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import {
  DEFAULT_TAILWIND_CSS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_COMPONENTS,
  DEFAULT_UTILS,
  DEFAULT_BASE_DIR,
} from '../consts';
import { promises as fs } from 'fs';
import path from 'path';
import { ShadConfig, shadConfigSchema } from '../shad-config';

export async function promptForConfig(
  cwd: string,
  defaultConfig: ShadConfig | null = null,
  skip = false
) {
  const highlight = (text: string) => chalk.cyan(text);

  const styles = await getRegistryStyles();
  const baseColors = await getRegistryBaseColors();

  const options = await prompts([
    {
      type: 'select',
      name: 'style',
      message: `Which ${highlight('style')} would you like to use?`,
      choices: styles.map((style) => ({
        title: style.label,
        value: style.name,
      })),
    },
    {
      type: 'select',
      name: 'tailwindBaseColor',
      message: `Which color would you like to use as ${highlight('base color')}?`,
      choices: baseColors.map((color) => ({
        title: color.label,
        value: color.name,
      })),
    },
    {
      type: 'text',
      name: 'tailwindCss',
      message: `Where is your ${highlight('global CSS')} file?`,
      initial: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
    },
    {
      type: 'toggle',
      name: 'plugin',
      message: `Do you want to use ${highlight('shadcn-fe-tw plugin')} for concise tailwind config file?`,
      initial: defaultConfig?.tailwind.plugin ?? true,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'toggle',
      name: 'tailwindCssVariables',
      message: `Do you want to use ${highlight('CSS variables')} for colors?`,
      initial: defaultConfig?.tailwind.cssVariables ?? true,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'text',
      name: 'tailwindConfig',
      message: `Where is your ${highlight('tailwind.config.js')} located?`,
      initial: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG,
    },
    {
      type: 'text',
      name: 'baseDir',
      message: `Specify base directory ${highlight('base_directory')}:`,
      initial: defaultConfig?.paths.base ?? DEFAULT_BASE_DIR,
    },
    {
      type: 'text',
      name: 'components',
      message: `Configure the import alias for ${highlight('components')}:`,
      initial: defaultConfig?.aliases['components'] ?? DEFAULT_COMPONENTS,
    },
    {
      type: 'text',
      name: 'utils',
      message: `Configure the import alias for ${highlight('utils')}:`,
      initial: defaultConfig?.aliases['utils'] ?? DEFAULT_UTILS,
    },
    {
      type: 'toggle',
      name: 'rsc',
      message: `Are you using ${highlight('React Server Components')}?`,
      initial: defaultConfig?.rsc ?? true,
      active: 'no',
      inactive: 'yes',
    },
  ]);

  const shad_config: ShadConfig = {
    $schema: 'https://ui.shadcn.com/schema.json',
    style: options.style,
    tailwind: {
      config: options.tailwindConfig,
      css: options.tailwindCss,
      baseColor: options.tailwindBaseColor,
      cssVariables: options.tailwindCssVariables,
      plugin:options.plugin,
    },
    rsc: options.rsc,
    aliases: {
      utils: options.utils,
      components: options.components,
    },
    paths: {
      base: options.baseDir,
      components: options.baseDir + '/ui',
      lib: options.baseDir + '/lib',
      utils: options.baseDir + '/lib/utils.ts',
      styles: options.baseDir + '/lib/shadcn.css',

    },
  };

  const config = shadConfigSchema.parse(shad_config);

  if (!skip) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: `Write configuration to ${highlight('shadcn.config.json')}. Proceed?`,
      initial: true,
    });

    if (!proceed) {
      process.exit(0);
    }
  }

  // Write to file.
  logger.info('');
  const spinner = ora(`Writing shadcn.config.json...`).start();
  const targetPath = path.resolve(cwd, 'shadcn.config.json');
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8');
  spinner.succeed();

  return shad_config;
}
