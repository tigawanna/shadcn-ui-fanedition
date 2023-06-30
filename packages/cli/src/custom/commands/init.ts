import { Command } from "commander"
import { logger } from "@/src/utils/logger"
import chalk from "chalk"
import { existsSync, promises as fs } from "fs"
import path from "path"
import { z } from "zod"
import { handleError } from "@/src/utils/handle-error"
import { getShadConfig } from "../utils/shad-config"
import { promptForConfig } from "../utils/init/config-prompt"
import { saveComponentList } from "../utils/registry/save-component-list"
import { readComponents } from "../utils/registry/read-components"
import { installComponentsFromConfigList } from "../utils/registry/install-component-list"

const initOptionsSchema = z.object({
    cwd: z.string(),
    yes: z.boolean(),
})

export const init = new Command()
    .name("init")
    .command("init")
    .description("better init command")
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
     
            // Ensure target directory exists.
            if (!existsSync(cwd)) {
                logger.error(`The path ${cwd} does not exist. Please try again.`)
                process.exit(1)
            }

            //  read shadcn config
            const shad_config = await getShadConfig(cwd)
            // propmpt for config
            const config = shad_config ?? await promptForConfig(cwd, shad_config)
            // save config files to shadcn.config.json
    
            
            if(config.components){
                await installComponentsFromConfigList(cwd, config.components)
                const component_list = await readComponents(cwd);
                await saveComponentList(cwd, component_list ?? []);
            }else{
                const component_list = await readComponents(cwd);
                await saveComponentList(cwd, component_list ?? []);
            }
    



            logger.info("")
            logger.info(
                `${chalk.green("Success!")} Project initialization completed.`
            )
            logger.info("")
        } catch (error) {
            handleError(error)
        }
    })






