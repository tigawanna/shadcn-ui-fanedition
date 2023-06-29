#!/usr/bin/env node
import { add } from "@/src/commands/add"
import { diff } from "@/src/commands/diff"
import { oldinit } from "@/src/commands/init"
import { Command } from "commander"

import { getPackageInfo } from "./utils/get-package-info"
import { init } from "./custom/commands/init"
import { info } from "./custom/commands/info"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const packageInfo = await getPackageInfo()

  const program = new Command()
    .name("shadcn-ui")
    .description("add components and dependencies to your project")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )

  program.addCommand(init).addCommand(add).addCommand(diff).addCommand(oldinit).addCommand(info)

  program.parse()
}

main()
