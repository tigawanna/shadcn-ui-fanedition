import { getPackageManager } from '@/src/utils/get-package-manager';
import { handleError } from '@/src/utils/handle-error';
import { logger } from '@/src/utils/logger';
import {
  getRegistryIndex,
  resolveTree,
  fetchTree,
  getRegistryBaseColor,
  getItemTargetPath,
} from '@/src/utils/registry';
import { transform } from '@/src/utils/transformers';
import chalk from 'chalk';
import { execa } from 'execa';

import ora from 'ora';
import prompts from 'prompts';
import path from 'path';
import { getShadConfig } from './shad-config';
import { existsSync, promises as fs } from 'fs';
import { z } from 'zod';



const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  path: z.string().optional(),
});

export async function getComponents(components: string[], opts: any) {
  try {
    const options = addOptionsSchema.parse({
      components,
      ...opts,
    });

    const cwd = path.resolve(options.cwd);

    if (!existsSync(cwd)) {
      logger.error(`The path ${cwd} does not exist. Please try again.`);
      process.exit(1);
    }

    const config = await getShadConfig(cwd);
    if (!config) {
      logger.warn(
        `Configuration is missing. Please run ${chalk.green(
          `init`
        )} to create a components.json file.`
      );
      process.exit(1);
    }

    let selectedComponents = options.components;

    const registryIndex = await getRegistryIndex();
    if (!options.components?.length) {
      const { components } = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Which components would you like to add?',
        hint: 'Space to select. A to toggle all. Enter to submit.',
        instructions: false,
        choices: registryIndex.map((entry) => ({
          title: entry.name,
          value: entry.name,
        })),
      });
      selectedComponents = components;
    }

    if (!selectedComponents?.length) {
      logger.warn('No components selected. Exiting.');
      process.exit(0);
    }

    const tree = await resolveTree(registryIndex, selectedComponents);
    const payload = await fetchTree(config.style, tree);
    const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);

    if (!payload.length) {
      logger.warn('Selected components not found. Exiting.');
      process.exit(0);
    }

    if (!options.yes) {
      const { proceed } = await prompts({
        type: 'confirm',
        name: 'proceed',
        message: `Ready to install components and dependencies. Proceed?`,
        initial: true,
      });

      if (!proceed) {
        process.exit(0);
      }
    }

    const spinner = ora(`Installing components...`).start();

    for (const item of payload) {
      spinner.text = `Installing ${item.name}...`;

      const targetDir = await getItemTargetPath(
        config,
        item,
        options.path ? path.resolve(cwd, options.path) : undefined
      );

      if (!targetDir) {
        continue;
      }

      if (!existsSync(targetDir)) {
        await fs.mkdir(targetDir, { recursive: true });
      }

      const existingComponent = item.files.filter((file) =>
        existsSync(path.resolve(targetDir, file.name))
      );

      if (existingComponent.length && !options.overwrite) {
        if (selectedComponents.includes(item.name)) {
          logger.warn(
            `Component ${item.name} already exists. Use ${chalk.green('--overwrite')} to overwrite.`
          );
          process.exit(1);
        }

        continue;
      }

      for (const file of item.files) {
        const filePath = path.resolve(targetDir, file.name);

        // Run transformers.
        const content = await transform({
          filename: file.name,
          raw: file.content,
          config,
          baseColor,
        });

        await fs.writeFile(filePath, content);
      }

      // Install dependencies.
      if (item.dependencies?.length) {
        const packageManager = await getPackageManager(cwd);
        await execa(
          packageManager,
          [packageManager === 'npm' ? 'install' : 'add', ...item.dependencies],
          {
            cwd,
          }
        );
      }
    }

    spinner.succeed(`Done.`);
    return selectedComponents;
    
  } catch (error) {
    handleError(error);
  }
}
