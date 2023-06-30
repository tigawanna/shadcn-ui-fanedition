import { Command } from "commander"
import { getComponents } from "../custom/utils/getComponents"
import { saveComponentList } from "../custom/utils/registry/save-component-list"
import { readComponents } from "../custom/utils/registry/read-components"



export const add = new Command()
  .name("add")
  .description("add a component to your project")
  .argument("[components...]", "the components to add")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-p, --path <path>", "the path to add the component to.")
  .action(
    async (components, opts) => {
      // console.log("opts == ",opts)
      // console.log("components === ",components)
    await  getComponents(components, opts)
    //  read saved components and save in shadcn.config.json
    const component_list = await readComponents(opts.cwd)
    await saveComponentList(opts.cwd,component_list)
    
  })
