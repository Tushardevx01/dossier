# Codebase Audit Report

## 1. ESLint & TypeScript Errors
- Found unused `mono` import in `src/components/case-study/AsciiDiagram.tsx` and `src/components/case-study/CodeBlock.tsx`.
- Found unnecessary escape characters and an unused assignment (`ascii`) in `src/lib/case-study-parser.ts`.
- The Vite config warning for `configLoader: 'native'` in `vitest.config.ts`. (Not necessarily a fatal error, but a deprecation warning).

## 2. File / Folder Structure & Dead Code
- The structure (`app/`, `components/`, `lib/`, `services/`, `types/`) follows Next.js App Router best practices quite well.
- The `case-study-parser.ts` handles highly specific HTML scraping from database content which is fragile (hardcoding specific string matching for class names, etc.). Consider moving this logic to the backend or pre-parsing the data before it gets to the frontend component if possible.
- `case-studies-data.ts` contains large stringified HTML blobs which significantly bloat the bundle size and impact performance. 

## 3. Security
- The system has security headers, auth logic, and CSRF protection in `lib/security`. 
- Ensure that the `sanitize-html` usage in `src/lib/sanitize.ts` is strictly applied to any user-generated content or content coming from the DB before rendering it via `dangerouslySetInnerHTML`.
- `case-study-parser.ts` makes use of `cheerio` on potentially unsanitized HTML which may be safe since it's just parsing, but the `rawHtml` properties are later passed around. Verify that `rawHtml` is sanitized before being rendered to the DOM.

## 4. Query & Performance Optimization
- **Data Fetching:** The static case studies in `case-studies-data.ts` are extremely large (almost 900KB). They should be fetched dynamically from an API/Database instead of being hardcoded into a TS file which blocks the JS thread during parsing and inflates the bundle.
- **Component Rendering:** Complex components like `AsciiDiagram` with horizontal scrolling should ensure they don't cause layout thrashing.
- **Static Generation:** Next.js `next.config.ts` and `sitemap.ts` seem to be configured for static site generation, which is great for SEO and performance.

## 5. Summary
Overall, the codebase demonstrates a pro-level Next.js structure. To reach peak performance, migrate large static data (`case-studies-data.ts`) to a database or a separate JSON file fetched at build-time/run-time, fix the minor linter warnings, and ensure all raw HTML is sanitized before rendering.
