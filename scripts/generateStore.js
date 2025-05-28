import { readFileSync, writeFileSync } from "fs";
import { mkdir, writeFile, stat, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const capitalize = (str) => str.replace(/^./, (match) => match.toUpperCase());

const __dirname = dirname(fileURLToPath(import.meta.url));
const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Error: Specify the store name.");
  process.exit(1);
}

const basePath = join(__dirname, "..", "src", "store", moduleName.toLowerCase());

// Check if already exists the folder
async function checkIfExists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

// Templates
// storeSaga.ts
const sagaTemplate = `export default function* ${moduleName}Saga() {}`;

// storeSlice.ts
const sliceTemplate = `import { createSlice } from '@reduxjs/toolkit';

export interface ${capitalize(moduleName)}State {};

const initialState: ${capitalize(moduleName)}State = {};

const ${moduleName}Slice = createSlice({
  name: '${moduleName}',
  initialState,
  reducers: {},
});

export const {} = ${moduleName}Slice.actions;
export default ${moduleName}Slice.reducer;`;

// storeSaga.test.ts
const sagaTestTemplate = ``;

// storeSlice.test.ts
const sliceTestTemplate = ``;

// Structure
const structure = {
  "": [
    { fileName: `${moduleName}Saga.ts`, template: sagaTemplate },
    { fileName: `${moduleName}Slice.ts`, template: sliceTemplate },
  ],
  tests: [
    { fileName: `${moduleName}Saga.test.ts`, template: sagaTestTemplate },
    { fileName: `${moduleName}Slice.test.ts`, template: sliceTestTemplate },
  ],
};

async function createStructure() {
  try {
    const exists = await checkIfExists(basePath);
    if (exists) {
      console.error(`❌ Error: A store module with the name "${moduleName}" already exists.`);
      process.exit(1);
    }

    for (const [folder, files] of Object.entries(structure)) {
      const folderPath = join(basePath, folder);
      await mkdir(folderPath, { recursive: true });

      for (const { fileName, template } of files) {
        await writeFile(join(folderPath, fileName), template, "utf8");
      }
    }
    console.log(`✅ Redux ${moduleName} slice and saga generated successfully`);
  } catch (err) {
    console.error("❌ Error during generation:", err);
  }
}

createStructure();
