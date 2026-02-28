# Tushardevx01 Portfolio

A modern, responsive portfolio website built with Next.js, showcasing my skills, projects, and experience as a developer.

## 🚀 Features

- **Responsive Design**: Optimized for all devices using Tailwind CSS
- **Smooth Animations**: Powered by Motion library for engaging user interactions
- **Contact Form**: Integrated email functionality using Nodemailer
- **SEO Optimized**: Includes structured data and meta tags
- **Performance Focused**: Built with Next.js for optimal loading speeds
- **TypeScript**: Fully typed for better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Motion
- **Email**: Nodemailer
- **Icons**: React Icons
- **UI Components**: Radix UI
- **Validation**: Validator.js

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/tushardevx01.git
   cd tushardevx01
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add your email configuration:

   ```env
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   EMAIL_TO=your-receiving-email@example.com
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```text
src/
├── app/                 # Next.js app directory
│   ├── (main)/         # Main page
│   ├── api/            # API routes
│   ├── resume/         # Resume page
│   └── ...
├── components/         # Reusable components
│   ├── Cards/         # Card components
│   ├── common/        # Common components
│   ├── sections/      # Page sections
│   └── ui/            # UI components
├── constant/           # Constants and data
└── lib/               # Utility functions
```

## 🎨 Customization

1. **Personal Information**: Update `src/constant/self.ts` with your details
2. **Projects**: Modify `src/constant/projects.ts` to showcase your work
3. **Skills**: Edit `src/constant/skillsData.tsx` for your skill set
4. **Experience**: Update `src/constant/experience.ts` with your work history
5. **Styling**: Customize Tailwind config in `tailwind.config.js`

## 📧 Contact

Feel free to reach out through the contact form on the website or connect with me on:

- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]
- Email: [Your Email]

## 📄 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a personal portfolio project. Contributions are not accepted at this time.
