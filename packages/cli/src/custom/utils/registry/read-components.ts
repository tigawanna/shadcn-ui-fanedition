import { handleError } from '@/src/utils/handle-error';
import { getShadConfig } from '../shad-config';
import { promises as fs } from 'fs';
import path from 'path';


export async function readComponents(cwd: string) {
  try {
    const config = await getShadConfig(cwd);
    const componentsPath = path.resolve(cwd, config?.paths.components as string);
    const component_list = await fs.readdir(componentsPath)
    return component_list.map((file) =>{
      const file_name = file.split(".")[0]
      return file_name
    })
 } catch (error) {
    console.log("error reading files from dir ", error);
    handleError(error);
  }
}

