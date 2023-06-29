import { cosmiconfig } from "cosmiconfig"
import { z } from "zod";

const explorer = cosmiconfig("shadcn", {
    searchPlaces: ["shadcn.config.json"],
})

export const shadConfigSchema = z.object({
    $schema: z.string().optional(),
    style: z.string(),
    rsc: z.boolean(),
    tailwind: z.object({
        config: z.string(),
        css: z.string(),
        baseColor: z.string(),
        cssVariables: z.boolean(),
        plugin: z.boolean(),
    }),
    aliases: z.object({
        components: z.string(),
        utils: z.string(),
    }),
    components: z.array(z.string()).optional(),
    paths: z.object({
        base: z.string(),
        components: z.string(),
        lib:z.string(),
        utils: z.string(),
        styles: z.string()
}),
});

export type ShadConfig = z.infer<typeof shadConfigSchema>;

/**
 * Retrieves the ShadConfig object for a given directory ( default currnet working directory ).
 *
 * @param {string} cwd - The current working directory.
 * @return {Promise<ShadConfig | null>} A promise that resolves to the ShadConfig object or null if not found.
 */

export async function getShadConfig(cwd: string): Promise<ShadConfig | null> {
    try {
        const configResult = await explorer.search(cwd)

        if (!configResult) {
            return null
        }

        return shadConfigSchema.parse(configResult.config)
    } catch (error) {
        throw new Error(`Invald configuration found in ${cwd}/shadcn.config.json.`)
    }
}
