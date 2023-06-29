import { cosmiconfig } from "cosmiconfig"
import path from "path"




const explorer = cosmiconfig("shadcn", {
    searchPlaces: ["shadcn.config.json"],
})

export interface RawConfig {
    $schema?: string
    style: string
    rsc: boolean
    tailwind: {
        config: string
        css: string
        baseColor: string
        cssVariables: boolean
    }
    aliases: {
        components: string
        utils: string
    }
    paths: {
        base: string
        components: string
        utils: string
    }
}
