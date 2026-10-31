import { notFound } from "next/navigation";
import { artworks } from "@/data/artworks";
import { ArtworkDetail } from "@/components/artwork/marketplace";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return artworks.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = artworks.find((i) => i.slug === slug);
  return { title: item ? item.title : "Not found" };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = artworks.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ArtworkDetail artwork={item} />;
}
