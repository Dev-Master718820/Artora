import { notFound } from "next/navigation";
import { artists } from "@/data/artists";
import { ArtistProfile } from "@/components/artists/artist-pages";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return artists.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = artists.find((i) => i.slug === slug);
  return { title: item ? item.name : "Not found" };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = artists.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ArtistProfile artist={item} />;
}
