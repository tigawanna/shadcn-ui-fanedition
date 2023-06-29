import { logger } from "@/src/utils/logger";
// @ts-ignore
import dirtyJson from "dirty-json"

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
