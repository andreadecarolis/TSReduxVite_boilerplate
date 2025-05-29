import { readFileSync, writeFileSync } from "fs";
import { mkdir, writeFile, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ Error: Specify the component name.");
  process.exit(1);
}

// We generate the component in the src/components folder, then you can move it where you want
const basePath = join(__dirname, "..", "src", "components", componentName);

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
// Component.tsx
const tsxTemplate = `import { ${componentName}Props } from "./types/${componentName}.types";
import "./${componentName}.scss";

const ${componentName}: React.FC<${componentName}Props> = () => {
  return <></>;
};

export default ${componentName};
`;

// Component.scss
const cssTemplate = ``;

// index.ts
const indexTemplate = `export { default as ${componentName} } from './${componentName}';`;

// Component.test.tsx
const testTemplate = ``;

// Component.types.ts
const typesTemplate = `import { PropsWithChildren } from 'react';

export type ${componentName}Props = PropsWithChildren & {};
`;

// widget/index.ts
const widgetIndexTemplate = ``;

// Structure
const structure = {
  "": [
    { fileName: `${componentName}.tsx`, template: tsxTemplate },
    { fileName: `${componentName}.scss`, template: cssTemplate },
    { fileName: "index.ts", template: indexTemplate },
  ],
  tests: [{ fileName: `${componentName}.test.tsx`, template: testTemplate }],
  types: [{ fileName: `${componentName}.types.ts`, template: typesTemplate }],
  widget: [{ fileName: "index.ts", template: widgetIndexTemplate }],
};

async function createStructure() {
  try {
    const exists = await checkIfExists(basePath);
    if (exists) {
      console.error(`❌ Error: A component with the name "${componentName}" already exists`);
      process.exit(1);
    }

    for (const [folder, files] of Object.entries(structure)) {
      const folderPath = join(basePath, folder);
      await mkdir(folderPath, { recursive: true });

      for (const { fileName, template } of files) {
        await writeFile(join(folderPath, fileName), template, "utf8");
      }
    }
    console.log(`✅ Component ${componentName} generated successfully`);
  } catch (err) {
    console.error("❌ Error during generation:", err);
  }
}

createStructure();
