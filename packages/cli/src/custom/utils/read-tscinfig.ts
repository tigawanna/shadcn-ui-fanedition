import fs from 'fs';
import { DEFAULT_TSCONFIG_PATH, TSCONFIG_PATH } from './consts';
import { safeJSONparse } from './safe_json_parse';
import { logger } from '@/src/utils/logger';
import { Tsconfig } from "tsconfig-type";

export async function resolveTsconfigPaths(){

    try {
        const data = fs.readFileSync(TSCONFIG_PATH, 'utf8');
        const tsconfig = await safeJSONparse<Tsconfig>(data)
        if(!tsconfig){
            throw new Error('tsconfig.json is missing')
        }
        if (tsconfig.compilerOptions && tsconfig.compilerOptions.paths) {
            logger.info('The "paths" property already exists inside compilerOptions in tsconfig.json.');
            return tsconfig.compilerOptions.paths 
        } else {
            if (!tsconfig.compilerOptions) {
                tsconfig.compilerOptions = {};
            }
            
            tsconfig.compilerOptions = {...tsconfig.compilerOptions,"paths":DEFAULT_TSCONFIG_PATH}
            fs.writeFileSync(TSCONFIG_PATH, JSON.stringify(tsconfig, null, 2));
            logger.success('The "paths" property added to compilerOptions in tsconfig.json.');
            return tsconfig.compilerOptions.paths 
        }
    } catch (error) {
        logger.error('Error reading or parsing tsconfig.json:', error);
    }
}

// resolveTsconfigPaths().catch((error) => {    
//     console.log("error parsing tsconfig paths ",error);
// })
