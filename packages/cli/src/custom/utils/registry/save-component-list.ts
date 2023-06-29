import { handleError } from "@/src/utils/handle-error";
import { getShadConfig } from "../shad-config";
import path from "path"
import {  promises as fs } from 'fs';


export async function saveComponentList(cwd: string,component_list?: string[]) {
    try {
        if(!component_list){
            return
        }
        const config = await getShadConfig(cwd)
        const components_path  = path.resolve(cwd,"shadcn.config.json" as string)
        if(config){
            console.log("saving component list ",component_list)
            config["components"]= component_list
        }
        await fs.writeFile(components_path, JSON.stringify(config, null, 2), 'utf8');
    } catch (error) {
        handleError(error);
    }
}
