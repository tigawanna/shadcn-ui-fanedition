import fetch from 'node-fetch';
import fs from 'fs';

async function downloadFile() {
    const url = 'https://raw.githubusercontent.com/shadcn/ui/eeb17545a16824e11d09149a5ecab9fca570c448/apps/www/public/registry/index.json';
    const filePath = 'src/custom/utils/registry/index.json';

    try {
        const response = await fetch(url);
        const fileContents = await response.text();

        // Save the file to the specified path
        fs.writeFileSync(filePath, fileContents);

        console.log('File downloaded successfully.');
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

// downloadFile();
