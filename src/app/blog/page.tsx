import { nasalization } from "@/app/fonts";
import { BlogListClient } from "@/components/BlogListClient";
import { getAllBlogMetadata, getBlogCategories } from "@/lib/blogLoader";

export default function BlogPage() {
  const posts = getAllBlogMetadata();
  const categories = getBlogCategories();

  return (
    <div className="min-h-screen bg-black">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-28">
        <h1
          className={`${nasalization.className} text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-5 sm:mb-6 tracking-tight leading-tight`}
        >
          Engineering Notes
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
          Writing about systems, architecture, and production lessons.
        </p>
      </section>

      <BlogListClient posts={posts} categories={categories} />
    </div>
  );
}
