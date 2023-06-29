import { execa } from 'execa';
import { existsSync, promises as fs } from 'fs';
import { ShadConfig } from '../shad-config';
import ora from 'ora';
import path from 'path';
import { getPackageManager } from '@/src/utils/get-package-manager';
import { getRegistryBaseColor } from '@/src/utils/registry';
import * as templates from '@/src/utils/templates';

const PROJECT_DEPENDENCIES = [
  'tailwindcss-animate',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
];
const PROJECT_DEV_DEPENDENCIES = [
  'tailwindcss-animate',
  'shadcn-fe-tw',
  'tailwind-scrollbar',
  '@tailwindcss/container-queries',
  '@tailwindcss/typography',
];

export async function saveConfig(cwd: string, config: ShadConfig) {
  const spinner = ora(`Initializing project...`)?.start();
  const utils_path = path.resolve(cwd, config.paths.utils);
  const styles_path = path.resolve(cwd, config.paths.styles);
  const tailwind_config_path = path.resolve(cwd, config.tailwind.config);
  //  make the directories
  for (const [key, resolvedPath] of Object.entries(config.paths)) {
    // Determine if the path is a file or directory.
    // TODO: is there a better way to do this?

    let dirname = path.extname(resolvedPath) ? path.dirname(resolvedPath) : resolvedPath;

    // If the utils alias is set to something like "@/lib/utils",
    // assume this is a file and remove the "utils" file name.
    // TODO: In future releases we should add support for individual utils.

    if (key === 'utils' && resolvedPath.endsWith('/utils')) {
      // Remove /utils at the end.
      dirname = dirname.replace(/\/utils$/, '');
    }
    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true });
    }
  }

  const TW_TEMPLATE = config.tailwind.plugin
    ? templates.TAILWIND_CONFIG_WITH_PLUGIN
    : config.tailwind.cssVariables
    ? templates.TAILWIND_CONFIG_WITH_VARIABLES
    : templates.TAILWIND_CONFIG;

  // Write tailwind config.
  await fs.writeFile(tailwind_config_path, TW_TEMPLATE, 'utf8');

  // Write css file.
  const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);
  if (baseColor) {
    await fs.writeFile(
      styles_path,
      config.tailwind.cssVariables ? baseColor.cssVarsTemplate : baseColor.inlineColorsTemplate,
      'utf8'
    );
  }

  // Write cn file.
  await fs.writeFile(utils_path, templates.UTILS, 'utf8');

  spinner?.succeed();
  // Install dependencies.
  const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
  const packageManager = await getPackageManager(cwd);

  // TODO: add support for other icon libraries.
  const deps = [
    ...PROJECT_DEPENDENCIES,
    config.style === 'new-york' ? '@radix-ui/react-icons' : 'lucide-react',
  ];

  await execa(packageManager, [packageManager === 'npm' ? 'install' : 'add', ...deps], {
    cwd,
  });
  await execa(
    packageManager,
    [packageManager === 'npm' ? 'install' : 'add', '-D', ...PROJECT_DEV_DEPENDENCIES],
    {
      cwd,
    }
  );

  dependenciesSpinner?.succeed();
}
