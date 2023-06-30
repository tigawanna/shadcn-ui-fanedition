import { z } from "zod";
import { getComponents } from "../getComponents";

const addOptionsSchema = z.object({
    components: z.array(z.string()).optional(),
    yes: z.boolean(),
    overwrite: z.boolean(),
    cwd: z.string(),
    path: z.string().optional(),
});

export type InstallOptions = z.infer<typeof addOptionsSchema>;
export async function installComponentsFromConfigList(cwd:string, components: string[]) {
    const opts: InstallOptions={
        yes:true,
        overwrite: false,
        cwd: process.cwd(),
        path:cwd
    }
  return await getComponents(components, opts,true)
}
