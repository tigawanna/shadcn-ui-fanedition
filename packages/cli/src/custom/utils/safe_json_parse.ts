

import { logger } from "@/src/utils/logger";
// @ts-ignore
import dirtyJson from "dirty-json"

/**
  * Asynchronously parses JSON data.
 * If the parsing is successful, it returns the parsed data.
 * If there is a syntax error, it attempts to sanitize the data using dirty-json
 * and then returns the sanitized data.
 * If there is any other error, it logs an error message.
 *
 * @param {any} data - The JSON string to be parsed.
 * @return {Promise<T>} The parsed object of type T.
 */

export async function safeJSONparse<T = any>(data:any){
    try {
        return JSON.parse(data) as T
    } catch (objError:any) {
        if (objError instanceof SyntaxError) {
            logger.error("invalid JSON syntax , attempting to sanitize ");
          const santized_json =dirtyJson.parse(data) as T
          logger.success(santized_json)
          return santized_json
        } else {
            logger.error("eror parsing JSON",objError.message);
        }
    }
}
