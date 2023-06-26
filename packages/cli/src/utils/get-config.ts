import path from "path"
import { resolveImport } from "@/src/utils/resolve-import"
import { cosmiconfig } from "cosmiconfig"
import { loadConfig } from "tsconfig-paths"
import * as z from "zod"

export const DEFAULT_STYLE = "default"
export const DEFAULT_COMPONENTS = "@/shadcn/ui"
export const DEFAULT_UTILS = "@/shadcn/lib/utils"
export const DEFAULT_TAILWIND_CSS = "src/app/globals.css"
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.js"
export const DEFAULT_TAILWIND_BASE_COLOR = "slate"
export const DEFAULT_BASE_DIR = "src/shadcn"

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig("shadcn", {
  searchPlaces: ["shadcn.config.json"],
})


export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    rsc: z.coerce.boolean().default(false),
    tailwind: z.object({
      config: z.string(),
      css: z.string(),
      baseColor: z.string(),
      cssVariables: z.boolean().default(true),
    }),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
    }),
    baseDir: z.string(),
  })
  .strict()

export type RawConfig = z.infer<typeof rawConfigSchema>

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
    baseDir: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  // Read tsconfig.json.
  const tsConfig = await loadConfig(cwd)

  if (tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load tsconfig.json. ${tsConfig.message ?? ""}`.trim()
    )
  }
// console.log("tsConfig", tsConfig)
//   console.log("noramal resolve (taiwind.css)", path.resolve(cwd, config.tailwind.css))
//   console.log("resolve imports (utils)", await resolveImport(config.aliases["utils"], tsConfig))
  return configSchema.parse({
    ...config,
    resolvedPaths: {
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: await resolveImport(config.aliases["utils"], tsConfig),
      components: await resolveImport(config.aliases["components"], tsConfig),
      baseDir: path.resolve(cwd, config.baseDir)
      },
  })
}



export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd)

    if (!configResult) {
      return null
    }

    return rawConfigSchema.parse(configResult.config)
  } catch (error) {
    throw new Error(`Invald configuration found in ${cwd}/shadcn.config.json.`)
  }
}
