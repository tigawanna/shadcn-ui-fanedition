import fs from 'fs';
import path from 'path';

const srcDir = 'src/shadcn/ui';
const destDir = 'src/components';

fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const srcFile = path.join(srcDir, file);
    const destDirName = path.basename(file, path.extname(file));
    const destDirPath = path.join(destDir, destDirName);
    const destFile = path.join(destDirPath, file);
    const storyFile = path.join(destDirPath, `${destDirName}.stories.tsx`);
    const destIndexFile = path.join(destDirPath, 'index.ts');

    if (!fs.existsSync(destDirPath)) {
      // Directory does not exist, create it
      fs.mkdirSync(destDirPath);

      if (fs.existsSync(srcFile) && path.extname(srcFile) === '.tsx') {
        // Copy .tsx file to destination directory
        fs.copyFileSync(srcFile, destFile);

        // Create .filename.stories.tsx file
        const storyContent = `import React from "react";
import type { StoryDefault, Story } from "@ladle/react";
import { } from "./${destDirName}";
import '../../tailwind.css'

export default {
    title: "[${destDirName}] primary",
} satisfies StoryDefault;
export const ${destDirName}Story: Story = () => (
    <>sample story</>
);`;
        fs.writeFileSync(storyFile, storyContent);

  // Create index.ts file
  const indexContent = `export * from './${destDirName}/${destDirName}';`;
      fs.writeFileSync(destIndexFile, indexContent);
      }
    }
  });
});
