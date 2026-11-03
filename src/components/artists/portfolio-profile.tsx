"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Images,
  MapPin,
  Maximize2,
  Share2,
} from "lucide-react";
import type { Artist } from "@/types";
import { useDemo } from "@/context/demo-context";
import {
  ArtImage,
  ButtonLink,
  FollowButton,
  Modal,
  SearchInput,
  Tabs,
} from "@/components/shared/ui";
import { searchMatches } from "@/lib/utils";

export function PortfolioArtistProfile({
  artist,
  ownProfile = false,
}: {
  artist: Artist;
  ownProfile?: boolean;
}) {
  const { toast } = useDemo();
  const [tab, setTab] = useState("Portfolio");
  const [category, setCategory] = useState("All paintings");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const paintings = artist.portfolio || [];
  const subjects = [...new Set(paintings.map((p) => p.category))];
  const filtered = paintings.filter(
    (p) =>
      (category === "All paintings" || p.category === category) &&
      searchMatches(query, p.title, p.description, p.category),
  );
  const selectedIndex = filtered.findIndex((p) => p.slug === selected);
  const painting = filtered[selectedIndex];
  const publicPath = "/artists/" + artist.slug;

  async function shareProfile() {
    const url = new URL(publicPath, window.location.origin).href;
    try {
      await navigator.clipboard.writeText(url);
      toast("Public profile link copied.");
    } catch {
      toast("Public profile: " + url);
    }
  }

  return (
    <>
      <div className="portfolio-cover">
        <ArtImage
          src={artist.coverImage || paintings[0]?.image}
          alt={`A landscape from ${artist.name}'s paintings`}
          loading="eager"
        />
        <div className="container portfolio-cover-content">
          <span className="eyebrow">A PERSONAL WORLD OF COLOR</span>
          <p>
            Nature. People.
            <br />
            <em>Little stories in paint.</em>
          </p>
        </div>
      </div>
      <div className="container page-content portfolio-profile">
        <div className="profile-heading">
          <div className="profile-identity">
            <ArtImage src={artist.image} alt={artist.name} loading="eager" />
            <div className="profile-name">
              <span className="eyebrow">ARTIST · ORIGINAL PAINTINGS</span>
              <h1>{artist.name}</h1>
              <p className="portfolio-location">
                <MapPin size={14} />
                {artist.location}
              </p>
            </div>
          </div>
          <div className="profile-actions">
            {ownProfile ? (
              <>
                <ButtonLink href={publicPath} secondary>
                  View public profile
                  <ArrowUpRight size={14} />
                </ButtonLink>
                <ButtonLink href="/profile/activity" secondary>
                  Your activity
                </ButtonLink>
              </>
            ) : (
              <FollowButton slug={artist.slug} />
            )}
            <button className="button" onClick={shareProfile}>
              <Share2 size={14} />
              Share profile
            </button>
          </div>
        </div>
        <Tabs
          tabs={["Portfolio", "About the artist"]}
          value={tab}
          onChange={setTab}
        />
        <div className="profile-layout portfolio-profile-layout">
          <aside className="profile-bio">
            <span className="eyebrow">MEET THE ARTIST</span>
            <h3>Inspired by the everyday.</h3>
            <p>{artist.bio}</p>
            <div className="profile-stat-row">
              <span>
                <strong>{paintings.length}</strong>
                <small>Paintings</small>
              </span>
              <span>
                <strong>{subjects.length}</strong>
                <small>Subjects to explore</small>
              </span>
            </div>
            <div className="chips">
              {[...artist.specialties, ...artist.styles].map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="portfolio-note">
              <Images size={18} />
              <p>
                Explore the original photographs of Alpana’s paintings. Select a
                piece for a closer look.
              </p>
            </div>
            <Link
              href="/artists"
              className="text-link"
              style={{ marginTop: 22 }}
            >
              <ArrowLeft size={13} />
              Discover more artists
            </Link>
          </aside>
          <section
            aria-label={
              tab === "Portfolio"
                ? `${artist.name}'s paintings`
                : `About ${artist.name}`
            }
          >
            {tab === "Portfolio" ? (
              <>
                <div className="portfolio-section-heading">
                  <div>
                    <span className="eyebrow">THE PAINTING COLLECTION</span>
                    <h2>A little of how I see the world.</h2>
                  </div>
                  <span>
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "painting" : "paintings"}
                  </span>
                </div>
                <div className="portfolio-filters">
                  <div className="chips">
                    {["All paintings", ...subjects].map((subject) => (
                      <button
                        key={subject}
                        className={`chip ${category === subject ? "active" : ""}`}
                        aria-pressed={category === subject}
                        onClick={() => setCategory(subject)}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                  <SearchInput
                    value={query}
                    onChange={setQuery}
                    placeholder="Search Alpana’s paintings…"
                  />
                </div>
                <div className="portfolio-painting-grid">
                  {filtered.map((p) => (
                    <article className="portfolio-painting" key={p.slug}>
                      <button
                        className="portfolio-painting-image"
                        aria-label={`View ${p.title}`}
                        onClick={() => setSelected(p.slug)}
                      >
                        <ArtImage
                          src={p.image}
                          alt={`${p.title} — painting by ${artist.name}`}
                        />
                        <span className="portfolio-view-icon">
                          <Maximize2 size={17} />
                        </span>
                      </button>
                      <div className="portfolio-painting-caption">
                        <span className="eyebrow">{p.category}</span>
                        <button onClick={() => setSelected(p.slug)}>
                          <h3>{p.title}</h3>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                {!filtered.length && (
                  <div className="empty-state">
                    <h3>No paintings match this search.</h3>
                    <p>Try another word or explore the whole collection.</p>
                    <button
                      className="button secondary"
                      onClick={() => {
                        setQuery("");
                        setCategory("All paintings");
                      }}
                    >
                      Show all paintings
                    </button>
                  </div>
                )}
                <p className="source-credit portfolio-credit">
                  Portrait and painting photographs supplied for Alpana
                  Barthakur’s portfolio. Descriptive labels are provided for
                  browsing; prices and dimensions have not been listed.
                </p>
              </>
            ) : (
              <div className="prose portfolio-about">
                <span className="eyebrow">
                  ALPANA BARTHAKUR · HILLSBOROUGH, NEW JERSEY
                </span>
                <h2>A world observed in color.</h2>
                <p>{artist.bio}</p>
                <p>
                  Explore a collection of birds, green landscapes, colorful
                  figures, and quiet everyday moments. Each photograph preserves
                  the painting as it was supplied, including its texture,
                  presentation, and visible signature.
                </p>
                <h3>Inside the collection.</h3>
                <div className="portfolio-subject-list">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => {
                        setCategory(subject);
                        setQuery("");
                        setTab("Portfolio");
                      }}
                    >
                      <span>{subject}</span>
                      <span>
                        {paintings.filter((p) => p.category === subject).length}{" "}
                        paintings
                        <ArrowRight size={14} />
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  className="button"
                  style={{ marginTop: 25 }}
                  onClick={() => setTab("Portfolio")}
                >
                  Explore the paintings
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      <Modal
        open={!!painting}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        title={painting?.title || "Painting detail"}
        wide
      >
        {painting && (
          <div className="portfolio-lightbox">
            <ArtImage
              src={painting.image}
              alt={`${painting.title} by ${artist.name}`}
              className="lightbox-image"
              loading="eager"
            />
            <div className="portfolio-lightbox-details">
              <div>
                <span className="eyebrow">{painting.category}</span>
                <h3>{painting.title}</h3>
                <p>{painting.description}</p>
                <small>
                  By {artist.name} · {artist.location}
                </small>
              </div>
              <div className="portfolio-gallery-controls">
                <button
                  className="icon-button"
                  aria-label="Previous painting"
                  disabled={filtered.length < 2}
                  onClick={() =>
                    setSelected(
                      filtered[
                        (selectedIndex - 1 + filtered.length) % filtered.length
                      ].slug,
                    )
                  }
                >
                  <ArrowLeft size={18} />
                </button>
                <span aria-live="polite">
                  {selectedIndex + 1} / {filtered.length}
                </span>
                <button
                  className="icon-button"
                  aria-label="Next painting"
                  disabled={filtered.length < 2}
                  onClick={() =>
                    setSelected(
                      filtered[(selectedIndex + 1) % filtered.length].slug,
                    )
                  }
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
