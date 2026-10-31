import Link from "next/link";
import type { Masterpiece } from "@/types";
import { historicalArtists } from "@/data/historical-artists";
import { ArtImage, SaveButton } from "@/components/shared/ui";
export function MasterpieceCard({ work }: { work: Masterpiece }) {
  const artist = historicalArtists.find((a) => a.slug === work.artist)!;
  return (
    <article className="masterpiece-card">
      <div className="masterpiece-image">
        <Link href={"/masters/artworks/" + work.slug}>
          <ArtImage src={work.image} alt={`${work.title} by ${artist.name}`} />
        </Link>
        <SaveButton id={"master-" + work.slug} />
      </div>
      <Link href={"/masters/artworks/" + work.slug}>
        <h3>{work.title}</h3>
      </Link>
      <p>{artist.name}</p>
      <span>{work.date}</span>
      <span className="period-label">{work.period}</span>
    </article>
  );
}
