import Link from "next/link";
import { ArrowUpRight, Clock, Star } from "lucide-react";
import { artists } from "@/data/artists";
import { money } from "@/lib/utils";
import type { Course } from "@/types";
import { ArtImage } from "@/components/shared/ui";
export function CourseCard({ course }: { course: Course }) {
  const tutor = artists.find((a) => a.slug === course.tutor)!;
  return (
    <article className="course-card">
      <Link className="course-image" href={"/learn/classes/" + course.slug}>
        <ArtImage src={course.image} alt={course.title} />
        <span className="image-label">{course.format}</span>
        <span className="round-link">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="course-body">
        <span className="eyebrow">
          {course.level} · {course.category}
        </span>
        <Link href={"/learn/classes/" + course.slug}>
          <h3>{course.title}</h3>
        </Link>
        <Link href={"/learn/tutors/" + tutor.slug} className="tutor-inline">
          <ArtImage src={tutor.image} alt="" />
          {tutor.name}
          <span>
            <Star size={12} fill="currentColor" />
            {course.rating}
          </span>
        </Link>
        <div className="course-bottom">
          <span>
            <Clock size={13} />
            {course.duration}
          </span>
          <strong>{money(course.price)}</strong>
        </div>
      </div>
    </article>
  );
}
