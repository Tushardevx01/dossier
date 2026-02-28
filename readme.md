# Tushardevx01 Portfolio

Modern personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- Responsive single-page experience with dedicated pages for resume and engineering notes.
- Contact API endpoint with validation, sanitization, and rate-limiting.
- SEO support via metadata, sitemap, robots, and structured data.
- Lightweight rendering strategy with lazy-loaded sections and reduced client overhead.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Motion
- Nodemailer + React Email
- Validator.js

## Getting Started

1. Clone and install dependencies:

   ```bash
   git clone https://github.com/yourusername/tushardevx01.git
   cd tushardevx01
   npm install
   ```

2. Create `.env.local` in the project root:

   ```env
   QEV_API_KEY=your_qev_api_key
   email_from=your_email@gmail.com
   email_password=your_app_password
   NEXT_PUBLIC_GITHUB_COMMIT_GRAPH_URL=
   ```

3. Start development:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

## Scripts

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run start` — run production server
- `npm run lint` — run lint checks

## Project Structure

```text
src/
├── app/                 # Routes, metadata, sitemap, robots, API
├── components/          # UI, common, cards, sections
├── constant/            # Static profile/content constants
├── data/                # Engineering note content
├── hooks/               # Client hooks
├── lib/                 # Utilities, env handling, loaders
└── types/               # Type definitions
```

## Performance Notes

- Background rendering is static (no unnecessary client-side listeners).
- Home sections are dynamically imported to keep initial payload smaller.
- Global client runtime is minimized by mounting toast UI only where needed.
- Font payload is trimmed to practical weights.

## Security Notes

- Never commit real secrets.
- Rotate keys immediately if any secret is exposed.
- Keep sensitive values only in local/private environment files.

## License

Private project. Not licensed for public reuse.
