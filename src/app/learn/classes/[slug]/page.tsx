import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import { ClassDetail } from "@/components/academy/academy-pages";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return courses.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = courses.find((i) => i.slug === slug);
  return { title: item ? item.title : "Not found" };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = courses.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ClassDetail course={item} />;
}
