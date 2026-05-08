import { selfData } from "@/constant";
import { SITE_URL, siteConfig } from "@/lib/site";
import type { Project } from "@/types/project";

const PERSON_ID = `${SITE_URL}#person`;
const WEBSITE_ID = `${SITE_URL}#website`;
const PROFILE_PAGE_ID = `${SITE_URL}#profile-page`;

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    givenName: "Tushar",
    familyName: "Dey",
    url: SITE_URL,
    image: `${SITE_URL}/images/me.png`,
    jobTitle: "Full-Stack Developer & DevOps Engineer",
    description:
      "Full-Stack Developer and DevOps Engineer based in Kolkata, India. Builds production-grade Next.js and Node.js applications, CI/CD pipelines, and scalable real-time systems.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN"
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Adamas University"
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
      "https://dev.to/tushardevx01",
      "https://www.tushardevx01.tech/azmth"
    ],
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "DevOps",
      "Docker",
      "CI/CD",
      "Observability",
      "Real-time systems",
      "Web performance",
      "Scalable architecture"
    ],
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: `${siteConfig.name} Portfolio`,
    url: SITE_URL,
    description: siteConfig.description,
    author: {
      "@id": PERSON_ID,
    },
    publisher: {
      "@id": PERSON_ID,
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
    "@id": PROFILE_PAGE_ID,
    name: `${siteConfig.name} - Developer Portfolio`,
    url: SITE_URL,
    description: selfData.bio,
    mainEntity: {
      "@id": PERSON_ID,
    },
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString(),
  };
}

export function generateEngineeringNotesItemListStructuredData(
  notes: Array<{ slug: string; title: string; description: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}#engineering-notes-item-list`,
    name: "Engineering Notes",
    itemListOrder: "http://schema.org/ItemListOrderDescending",
    numberOfItems: notes.length,
    itemListElement: notes.map((note, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: note.title,
      description: note.description,
      url: `${SITE_URL}/engineering-notes/${note.slug}`,
    })),
  };
}

export function generateSoftwareApplicationStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/projects/${project.slug}#software-application`,
    name: project.name,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    creator: {
      "@id": PERSON_ID,
    },
    url: `${SITE_URL}/projects/${project.slug}`,
    sameAs: [project.github_link, ...(project.demo ? [project.demo] : [])],
    keywords: project.tech.join(", "),
  };
}

export function generateBreadcrumbListStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
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
