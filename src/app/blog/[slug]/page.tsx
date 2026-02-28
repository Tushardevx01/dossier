import { redirect } from "next/navigation";

export default async function BlogArticleRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/engineering-notes/${slug}`);
}
