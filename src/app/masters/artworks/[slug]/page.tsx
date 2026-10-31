import { notFound } from "next/navigation";
import { masterpieces } from "@/data/masterpieces";
import { MasterpieceDetail } from "@/components/masters/museum-pages";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return masterpieces.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = masterpieces.find((i) => i.slug === slug);
  return { title: item ? item.title : "Not found" };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = masterpieces.find((i) => i.slug === slug);
  if (!item) notFound();
  return <MasterpieceDetail work={item} />;
}
