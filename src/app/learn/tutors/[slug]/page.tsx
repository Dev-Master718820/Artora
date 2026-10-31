import { notFound } from "next/navigation";
import { artists } from "@/data/artists";
import { TutorProfile } from "@/components/academy/academy-pages";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return artists.filter((item) => item.teaching).map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = artists.find((i) => i.slug === slug);
  return { title: item ? item.name : "Not found" };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = artists.find((i) => i.slug === slug);
  if (!item || !item.teaching) notFound();
  return <TutorProfile tutor={item} />;
}
