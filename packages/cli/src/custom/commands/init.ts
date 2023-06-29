import { Command } from "commander"
import { logger } from "@/src/utils/logger"
import chalk from "chalk"
import { getConfig, resolveConfigPaths } from "@/src/utils/get-config"
import { existsSync, promises as fs } from "fs"
import path from "path"
import { z } from "zod"
import { handleError } from "@/src/utils/handle-error"
import { resolveTsconfigPaths } from "../utils/read-tscinfig"


const initOptionsSchema = z.object({
    cwd: z.string(),
    yes: z.boolean(),
})

export const test = new Command()
    .name("test")
    .command("test")
    .description("test command")
    .option("-y, --yes", "skip confirmation prompt.", false)
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .action(async (opts) => {
        try {
            const options = initOptionsSchema.parse(opts)
            const cwd = path.resolve(options.cwd)
            console.log("current working directory === ", cwd)
            // Ensure target directory exists.
            if (!existsSync(cwd)) {
                logger.error(`The path ${cwd} does not exist. Please try again.`)
                process.exit(1)
            }

            // Read config.
            // const existingConfig = await getConfig(cwd)
            // console.log("existing config === ", existingConfig)
            // const config = await promptForConfig(cwd, existingConfig, options.yes)

            const tsconfig = await resolveTsconfigPaths()
            console.log("tsconfig === ", tsconfig)


            logger.info("")
            logger.info(
                `${chalk.green("Success!")} Project initialization completed.`
            )
            logger.info("")
        } catch (error) {
            handleError(error)
        }
    })
