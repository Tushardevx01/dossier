import fs from 'fs';
import path from 'path';

const replaceInFile = (filePath: string, replacements: {from: string|RegExp, to: string}[]) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  let content = fs.readFileSync(fullPath, 'utf-8');
  for (const {from, to} of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(fullPath, content);
};

// 1. Update src/lib/case-studies.ts
replaceInFile('src/lib/case-studies.ts', [
  {
    from: "import { caseStudiesData, type CaseStudyRecord } from '@/lib/case-studies-data';",
    to: "import { caseStudiesMeta, type CaseStudyRecord } from '@/lib/case-studies-meta';\nimport fs from 'fs';\nimport path from 'path';"
  },
  {
    from: /caseStudiesData\.filter/g,
    to: "caseStudiesMeta.filter"
  },
  {
    from: /return caseStudiesData\.find\(\(cs\) => cs\.slug\.toLowerCase\(\) === normalizedSlug\) \|\| null;/g,
    to: `const fullDataPath = path.join(process.cwd(), 'src/lib/case-studies-full.json');
    try {
      const fileData = fs.readFileSync(fullDataPath, 'utf8');
      const caseStudiesFull: CaseStudyRecord[] = JSON.parse(fileData);
      return caseStudiesFull.find((cs) => cs.slug.toLowerCase() === normalizedSlug) || null;
    } catch (fsError) {
      console.error('Failed to read case-studies-full.json', fsError);
      return null;
    }`
  }
]);

// 2. Update src/db/seed.ts
replaceInFile('src/db/seed.ts', [
  {
    from: "const { caseStudiesData } = await import('@/lib/case-studies-data');",
    to: "const fs = await import('fs');\n      const path = await import('path');\n      const fullDataPath = path.join(process.cwd(), 'src/lib/case-studies-full.json');\n      const caseStudiesData = JSON.parse(fs.readFileSync(fullDataPath, 'utf8'));"
  }
]);

// 3. Update tests
replaceInFile('src/tests/case-study-parser.test.ts', [
  {
    from: 'import { caseStudiesData } from "@/lib/case-studies-data";',
    to: "import fs from 'fs';\nimport path from 'path';\nconst caseStudiesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/lib/case-studies-full.json'), 'utf8'));"
  }
]);

console.log('Imports updated.');
