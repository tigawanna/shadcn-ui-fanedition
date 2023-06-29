import fs from 'fs';
import { DEFAULT_TSCONFIG_PATH, TSCONFIG_PATH } from '../consts';
import { safeJSONparse } from '../safe_json_parse';
import { logger } from '@/src/utils/logger';
import { Tsconfig } from "tsconfig-type";

/**
 * Resolves tsconfig paths by checking if the tsconfig.json file exists and if it has a compilerOptions.paths property. 
 * If the paths property does not exist, it adds it to the compilerOptions object and writes the modified tsconfig.json file back to disk.
 *
 * @return {Promise<Tsconfig>} The resolved Tsconfig object.
 */
export async function resolveTsconfigPaths(){

    try {
        const data = fs.readFileSync(TSCONFIG_PATH, 'utf8');
        const tsconfig = await safeJSONparse<Tsconfig>(data)
        if(!tsconfig){
            throw new Error('tsconfig.json is missing')
        }
        if (tsconfig.compilerOptions && tsconfig.compilerOptions.paths) {
            logger.info('The "paths" property already exists inside compilerOptions in tsconfig.json.');
            return tsconfig
        } else {
            if (!tsconfig.compilerOptions) {
                tsconfig.compilerOptions = {};
            }
            
            tsconfig.compilerOptions = {...tsconfig.compilerOptions,"paths":DEFAULT_TSCONFIG_PATH}
            fs.writeFileSync(TSCONFIG_PATH, JSON.stringify(tsconfig, null, 2));
            logger.success('The "paths" property added to compilerOptions in tsconfig.json.');
            return tsconfig
        }
    } catch (error) {
        logger.error('Error reading or parsing tsconfig.json:', error);
    }
}

// resolveTsconfigPaths().catch((error) => {    
//     console.log("error parsing tsconfig paths ",error);
// })
