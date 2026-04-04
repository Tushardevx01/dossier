import { selfData } from "@/constant";
import { SITE_URL, siteConfig } from "@/lib/site";

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: "Tushar Kanti Dey",
    url: SITE_URL,
    image: `${SITE_URL}/images/me.png`,
    jobTitle: "Full Stack Developer",
    description: siteConfig.description,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Adamas University",
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
    ],
    knowsAbout: [
      "Full Stack Development",
      "Next.js",
      "TypeScript",
      "Real-time application architecture",
      "Scalable web application development",
      "UI/UX focused engineering",
      "Developer tools",
      "AI-powered web products",
    ],
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Portfolio`,
    url: SITE_URL,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/engineering-notes?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${siteConfig.name} - Developer Portfolio`,
    url: SITE_URL,
    description: selfData.bio,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      givenName: selfData.first_name,
      familyName: selfData.last_name,
      url: SITE_URL,
      image: `${SITE_URL}/images/profile.jpg`,
      sameAs: [
        siteConfig.social.github,
        siteConfig.social.linkedin,
        siteConfig.social.twitter,
        siteConfig.social.instagram,
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
    url: `${SITE_URL}/engineering-notes/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/engineering-notes/${article.slug}`,
    },
  };
}

export function generateCaseStudyStructuredData(caseStudy: CaseStudyMetadata) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${caseStudy.title} Case Study`,
    description: caseStudy.description,
    url: `${SITE_URL}/projects/${caseStudy.slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/projects/${caseStudy.slug}`,
    },
  };
}

export function generateBuildLogStructuredData(entry: BuildLogMetadata) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.description,
    url: `${SITE_URL}/build-log/${entry.slug}`,
    datePublished: entry.publishedAt,
    dateModified: entry.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/build-log/${entry.slug}`,
    },
  };
}

export function generateResumeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: `${siteConfig.name} Resume`,
    description:
      "Professional resume of Tushar Kanti Dey, a full stack developer specializing in scalable Next.js apps and product engineering.",
    url: `${SITE_URL}/resume`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
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
        siteConfig.social.github,
        siteConfig.social.linkedin,
      ],
    },
    dateModified: new Date().toISOString(),
    fileFormat: "application/pdf",
    contentUrl: `${SITE_URL}/docs/Resume.pdf`,
    downloadUrl: `${SITE_URL}/docs/Resume.pdf`,
    keywords: [
      "Software Developer",
      "Full Stack Developer",
      "React Developer",
      "Next.js Developer",
      "JavaScript Developer",
      "TypeScript Developer",
      "Full Stack Developer",
      "Computer Science",
      "Adamas University",
      "Kolkata",
      "India",
    ],
  };
}
