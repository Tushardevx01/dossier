import { selfData, skillsData } from "@/constant";

export function generatePersonStructuredData() {
  const skills = skillsData.flatMap((category) =>
    category.data.map((skill) => skill.title)
  );

  return {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "Tushar Kanti Dey",
    alternateName: "Tushar Dev",
    url: "https://www.tushardevx01.tech/",
    image: "https://www.tushardevx01.tech/images/me.png",
    jobTitle: "Full Stack Developer & DevOps Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Adamas University",
    },
    sameAs: [
      "https://github.com/tusharxhub",
      "https://linkedin.com/in/tushar-kanti-dey",
    ],
    knowsAbout: [
      "Full Stack Development",
      "DevOps",
      "CI/CD Pipelines",
      "Docker & Containerization",
      "Cloud Computing",
      "Java",
      "Python",
      "React",
      "TypeScript",
    ],
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tushar Kanti Dey - Portfolio",
    url: "https://www.tushardevx01.tech",
    description:
      "Tushar Kanti Dey's portfolio featuring projects in React, Next.js, and modern web development",
    author: {
      "@type": "Person",
      name: selfData.name,
    },
    publisher: {
      "@type": "Person",
      name: selfData.name,
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: selfData.name,
    },
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Tushar Kanti Dey - Developer Portfolio",
    url: "https://www.tushardevx01.tech",
    description: selfData.bio,
    mainEntity: {
      "@type": "Person",
      name: selfData.name,
      givenName: selfData.first_name,
      familyName: selfData.last_name,
      url: "https://www.tushardevx01.tech",
      image: "https://www.tushardevx01.tech/images/profile.jpg",
      sameAs: [
        `https://github.com/${selfData.socials_username.github}`,
        `https://linkedin.com/in/${selfData.socials_username.linkedin}`,
        `https://twitter.com/${selfData.socials_username.twitter}`,
        `https://instagram.com/${selfData.socials_username.instagram}`,
      ],
    },
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString(),
  };
}

export interface ArticleMetadata {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}

export interface CaseStudyMetadata {
  title: string;
  description: string;
  slug: string;
}

export interface BuildLogMetadata {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
}

export function generateArticleStructuredData(article: ArticleMetadata) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    url: `https://www.tushardevx01.tech/engineering-notes/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: selfData.name,
      url: "https://www.tushardevx01.tech",
    },
    publisher: {
      "@type": "Person",
      name: selfData.name,
      url: "https://www.tushardevx01.tech",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.tushardevx01.tech/engineering-notes/${article.slug}`,
    },
  };
}

export function generateCaseStudyStructuredData(caseStudy: CaseStudyMetadata) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${caseStudy.title} Case Study`,
    description: caseStudy.description,
    url: `https://www.tushardevx01.tech/projects/${caseStudy.slug}`,
    author: {
      "@type": "Person",
      name: selfData.name,
      url: "https://www.tushardevx01.tech",
    },
    publisher: {
      "@type": "Person",
      name: selfData.name,
      url: "https://www.tushardevx01.tech",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.tushardevx01.tech/projects/${caseStudy.slug}`,
    },
  };
}

export function generateBuildLogStructuredData(entry: BuildLogMetadata) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.description,
    url: `https://www.tushardevx01.tech/build-log/${entry.slug}`,
    datePublished: entry.publishedAt,
    dateModified: entry.publishedAt,
    author: {
      "@type": "Person",
      name: selfData.name,
      url: "https://www.tushardevx01.tech",
    },
    publisher: {
      "@type": "Person",
      name: selfData.name,
      url: "https://www.tushardevx01.tech",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.tushardevx01.tech/build-log/${entry.slug}`,
    },
  };
}

export function generateResumeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "Tushar Kanti Dey Resume",
    description:
      "Professional resume of Tushar Kanti Dey - Student Developer specializing in Full-Stack Web Development",
    url: "https://www.tushardevx01.tech/resume",
    author: {
      "@type": "Person",
      name: selfData.name,
      email: selfData.email,
      jobTitle: selfData.jobTitle,
      worksFor: {
        "@type": "Organization",
        name: selfData.workFor,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: selfData.current_location.city,
        addressRegion: selfData.current_location.state,
        addressCountry: selfData.current_location.country,
      },
      sameAs: [
        `https://github.com/${selfData.socials_username.github}`,
        `https://linkedin.com/in/${selfData.socials_username.linkedin}`,
      ],
    },
    dateModified: new Date().toISOString(),
    fileFormat: "application/pdf",
    contentUrl: "https://www.tushardevx01.tech/docs/Resume.pdf",
    downloadUrl: "https://www.tushardevx01.tech/docs/Resume.pdf",
    keywords: [
      "Software Developer",
      "Full Stack Developer",
      "React Developer",
      "Next.js Developer",
      "JavaScript Developer",
      "TypeScript Developer",
      "Student Developer",
      "Computer Science",
      "Adamas University",
      "Kolkata",
      "India",
    ],
  };
}
