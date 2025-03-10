#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

async function changeExtensions(dirPath, fromExt, toExt) {
    try {
        // Read directory contents
        const entries = await fs.readdir(dirPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                // Recursively process subdirectories
                await changeExtensions(fullPath, fromExt, toExt);
            } else if (entry.isFile()) {
                // Check if file has the extension we want to change
                if (entry.name.endsWith(fromExt)) {
                    // Create new filename with replaced extension
                    const newPath = fullPath.replace(new RegExp(`\\${fromExt}$`), toExt);

                    try {
                        await fs.rename(fullPath, newPath);
                        console.log(`✓ Renamed: ${entry.name} -> ${path.basename(newPath)}`);
                    } catch (error) {
                        console.error(`✗ Error renaming ${entry.name}:`, error.message);
                    }
                }
            }
        }
    } catch (error) {
        console.error(`✗ Error processing directory ${dirPath}:`, error.message);
    }
}

// Get command line arguments
const [,, dirPath, fromExt, toExt] = process.argv;

// Validate arguments
if (!dirPath || !fromExt || !toExt) {
    console.error(`
Usage: node change-extension.js <directory> <from-extension> <to-extension>
Example: node change-extension.js ./src .js .ts

Arguments:
  directory      The directory to process recursively
  from-extension The current file extension (including the dot)
  to-extension   The new file extension (including the dot)
`);
    process.exit(1);
}

// Execute the script
console.log(`🔍 Changing files from *${fromExt} to *${toExt} in ${dirPath}`);
changeExtensions(dirPath, fromExt, toExt)
    .then(() => console.log('✨ Done!'))
    .catch(error => {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    });
