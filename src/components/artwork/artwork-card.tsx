import Link from "next/link";
import type { Artwork } from "@/types";
import { artists } from "@/data/artists";
import { money } from "@/lib/utils";
import { ArtImage, SaveButton } from "@/components/shared/ui";
export function ArtworkCard({
  artwork,
  priority = false,
}: {
  artwork: Artwork;
  priority?: boolean;
}) {
  const artist = artists.find((a) => a.slug === artwork.artist)!;
  return (
    <article className="artwork-card">
      <div className="artwork-card-image">
        <Link
          href={"/artworks/" + artwork.slug}
          aria-label={`View ${artwork.title}`}
        >
          <ArtImage
            src={artwork.image}
            alt={`${artwork.title}, ${artwork.medium.toLowerCase()} by ${artist.name}`}
            loading={priority ? "eager" : "lazy"}
          />
        </Link>
        <SaveButton id={artwork.slug} />
        {artwork.print && <span className="image-label">FINE ART PRINT</span>}
      </div>
      <div className="artwork-card-meta">
        <div>
          <Link href={"/artworks/" + artwork.slug}>
            <h3>{artwork.title}</h3>
          </Link>
          <Link className="muted" href={"/artists/" + artist.slug}>
            {artist.name}
          </Link>
        </div>
        <strong>{money(artwork.price)}</strong>
      </div>
      <div className="artwork-card-details">
        <span>{artwork.medium}</span>
        <span>
          {artwork.width} × {artwork.height} in
        </span>
      </div>
    </article>
  );
}
export function ArtworkGrid({ items }: { items: Artwork[] }) {
  return (
    <div className="artwork-grid">
      {items.map((a) => (
        <ArtworkCard artwork={a} key={a.slug} />
      ))}
    </div>
  );
}
