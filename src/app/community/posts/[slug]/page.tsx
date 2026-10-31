import { PostDetail } from "@/components/community/community-pages";
export const metadata = { title: "A Studio Story" };
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostDetail slug={slug} />;
}
