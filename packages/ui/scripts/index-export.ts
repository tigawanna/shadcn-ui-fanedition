import * as fs from 'fs';
import * as path from 'path';
import glob from 'glob';

function generateIndex() {
  const pathToSearch = 'src/components';

  // Find all directories in the components directory
  const directories = glob.sync(`${pathToSearch}/*`, { onlyDirectories: true });

  // Generate the index.ts file contents
  const indexContent = directories.map((dir) => {
    const export_path = dir.replace("src/", '');
    return `export * from './${export_path}';`
  }).join('\n');

  // Write the index.ts file to disk
  fs.writeFileSync('src/index.ts', indexContent);
}

generateIndex();
