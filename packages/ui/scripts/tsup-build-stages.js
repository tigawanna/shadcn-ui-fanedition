import glob from "glob"
import { build } from 'tsup'
import _ from 'lodash';

async function buildStage({ clean, entry }) {
    console.log("🚀 ~ building entry ", entry)
    
    try {
        await build({
            dts: true,
            minify: true,
            sourcemap: true,
            treeshake: true,
            // splitting: true,
            outDir: 'dist',
            clean,
            entry,
            external: ['react', 'react-dom'],
            format: ['esm'],
        });
    } catch (error) {
        console.log("🚀 ~ error while building entries :", entry);
        console.log(error);
        throw error;
    }
}

export async function buildAllStages() {

    const root_file = glob.sync('src/index.ts');
    const files = glob.sync('src/components/**/index.ts');
    console.log("COMPONENT COUNT== ", files.length);
    const chunkSize = 3;
    const chunks = _.chunk(files, chunkSize);

    // console.log("root files ", root_file);
    // console.log("files chunks", chunks);
    //  test chunks
    //  await buildStage({ clean: false, entry: chunks[chunks.length - 1] });
    
     for await (const [index, chunk] of chunks.entries()) {
      console.log('🚀 ~ chnk === ', chunk);
        await buildStage({ clean:index===0, entry: chunk });
    }
    await buildStage({ clean:false, entry: root_file });
    //    await buildStage({ clean:true, entry: root_file });


}



export function invokeBuild(){

buildAllStages().then(()=>{
    console.log("🚀 ~ buildAllStages success");
}).catch((error)=>{
    console.log("🚀 ~ buildAllStages error === ", error);
})
}
invokeBuild()
