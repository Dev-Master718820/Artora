import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Artist } from "@/types";
import { artworks } from "@/data/artworks";
import { ArtImage, FollowButton } from "@/components/shared/ui";
export function ArtistCard({ artist }: { artist: Artist }) {
  const work = artworks.filter((a) => a.artist === artist.slug);
  return (
    <article className="artist-card">
      <Link href={"/artists/" + artist.slug} className="artist-card-cover">
        <ArtImage
          src={
            artist.coverImage ||
            artist.portfolio?.[0]?.image ||
            work[0]?.image ||
            "/images/artworks/flowers.jpg"
          }
          alt={`Explore ${artist.name}'s portfolio`}
        />
        <span className="round-link">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="artist-card-body">
        <Link href={"/artists/" + artist.slug} className="artist-avatar">
          <ArtImage src={artist.image} alt={artist.name} />
        </Link>
        <div className="artist-card-title">
          <Link href={"/artists/" + artist.slug}>
            <h3>{artist.name}</h3>
          </Link>
          <span className="availability">
            <i />
            {artist.suppliedPortfolio
              ? "Original paintings"
              : artist.available
                ? "Open for commissions"
                : "In the studio"}
          </span>
        </div>
        <p>{artist.specialties.slice(0, 2).join(" & ")} artist</p>
        <div className="artist-location">
          <MapPin size={12} />
          {artist.location}
        </div>
        <FollowButton slug={artist.slug} compact />
      </div>
    </article>
  );
}
