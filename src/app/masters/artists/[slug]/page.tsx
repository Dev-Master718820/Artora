import { notFound } from "next/navigation";
import { historicalArtists } from "@/data/historical-artists";
import { HistoricalArtistProfile } from "@/components/masters/museum-pages";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return historicalArtists.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = historicalArtists.find((i) => i.slug === slug);
  return { title: item ? item.name : "Not found" };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = historicalArtists.find((i) => i.slug === slug);
  if (!item) notFound();
  return <HistoricalArtistProfile artist={item} />;
}
