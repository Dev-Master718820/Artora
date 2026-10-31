"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Brush, MapPin, Star } from "lucide-react";
import { artists } from "@/data/artists";
import { artworks, categories } from "@/data/artworks";
import { courses } from "@/data/courses";
import { searchMatches } from "@/lib/utils";
import type { Artist } from "@/types";
import { ArtistCard } from "./artist-card";
import { ArtworkGrid } from "@/components/artwork/artwork-card";
import { CourseCard } from "@/components/academy/course-card";
import {
  ArtImage,
  Breadcrumbs,
  ButtonLink,
  DemoNotice,
  EmptyState,
  FollowButton,
  SearchInput,
  SectionHeading,
  Tabs,
} from "@/components/shared/ui";
export function ArtistDirectory() {
  const [q, setQ] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [available, setAvailable] = useState(false);
  const filtered = artists.filter(
    (a) =>
      searchMatches(q, a.name, a.location, a.specialties) &&
      (!specialty || a.specialties.includes(specialty)) &&
      (!available || a.available),
  );
  return (
    <div className="container page-content">
      <div className="page-intro">
        <div>
          <span className="eyebrow">THE PEOPLE BEHIND THE PAINTINGS</span>
          <h1>Find an artist you connect with.</h1>
          <p>
            Different perspectives. Shared passion. Discover the people bringing
            art to life.
          </p>
        </div>
      </div>
      <div className="page-toolbar">
        <SearchInput
          value={q}
          onChange={setQ}
          placeholder="Search by name, place, or specialty…"
        />
        <div className="toolbar-right">
          <label className="filter-option" style={{ margin: 0 }}>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            Open for commissions
          </label>
          <select
            aria-label="Artist specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">Every specialty</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="four-grid">
        {filtered.map((a) => (
          <ArtistCard artist={a} key={a.slug} />
        ))}
      </div>
      {!filtered.length && (
        <EmptyState
          title="No artists match just yet."
          description="Try a different name or specialty."
        />
      )}
      <DemoNotice />
    </div>
  );
}
export function ArtistProfile({ artist }: { artist: Artist }) {
  const [tab, setTab] = useState("Portfolio");
  const work = artworks.filter((a) => a.artist === artist.slug);
  return (
    <>
      <div className="profile-cover">
        <ArtImage
          src={work[0]?.image || "/images/artworks/coast.jpg"}
          alt={`${artist.name}'s studio collection`}
          loading="eager"
        />
      </div>
      <div className="container page-content">
        <div className="profile-heading">
          <div className="profile-identity">
            <ArtImage src={artist.image} alt={artist.name} />
            <div className="profile-name">
              <span className="eyebrow">INDEPENDENT ARTIST · DEMO PROFILE</span>
              <h1>{artist.name}</h1>
              <p>
                {artist.location} · {artist.specialties.slice(0, 2).join(" & ")}
              </p>
            </div>
          </div>
          <div className="profile-actions">
            <FollowButton slug={artist.slug} />
            {artist.available && (
              <ButtonLink href={"/commissions/new?artist=" + artist.slug}>
                Commission {artist.name.split(" ")[0]}
                <ArrowUpRight size={15} />
              </ButtonLink>
            )}
          </div>
        </div>
        <Tabs
          tabs={[
            "Portfolio",
            "About the artist",
            "Reviews",
            "Creative process",
            ...(artist.teaching ? ["Classes"] : []),
          ]}
          value={tab}
          onChange={setTab}
        />
        <div className="profile-layout">
          <aside className="profile-bio">
            <h3>A little about me.</h3>
            <p>{artist.bio}</p>
            <div className="profile-stat-row">
              <span>
                <strong>{artist.experience}</strong>
                <small>Years of creating</small>
              </span>
              <span>
                <strong>{artist.rating}</strong>
                <small>Sample rating</small>
              </span>
            </div>
            <div className="chips">
              {[...artist.specialties, ...artist.mediums, ...artist.styles].map(
                (s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ),
              )}
            </div>
            {artist.teaching && (
              <ButtonLink secondary href={"/learn/tutors/" + artist.slug}>
                Learn with {artist.name.split(" ")[0]}
                <ArrowUpRight size={14} />
              </ButtonLink>
            )}
          </aside>
          <div>
            {tab === "Portfolio" ? (
              <ArtworkGrid items={work} />
            ) : tab === "About the artist" ? (
              <div className="prose">
                <h3>Finding stories in everyday beauty.</h3>
                <p>{artist.bio}</p>
                <p>
                  My studio practice begins with close observation and a
                  sketchbook. I gather references, make small color studies, and
                  work toward a painting that preserves the energy of the first
                  idea.
                </p>
                <h3>Let's make something meaningful.</h3>
                <p>
                  {artist.available
                    ? "I am open to thoughtful custom projects. Share a memory, a photograph, or just the beginnings of an idea."
                    : "My commission book is currently closed while I focus on new studio work."}
                </p>
              </div>
            ) : tab === "Reviews" ? (
              <>
                <p className="field-help">
                  Sample collector feedback · Fictional demo reviews
                </p>
                {[
                  "A wonderful eye for color and an easy, thoughtful creative process.",
                  "The painting captures exactly the feeling we hoped for.",
                ].map((r, i) => (
                  <div className="review" key={r}>
                    <strong>{["Amelia H.", "Ethan M."][i]}</strong>
                    <span>★★★★★ · Demo collector</span>
                    <p>{r}</p>
                  </div>
                ))}
              </>
            ) : tab === "Classes" ? (
              <div className="two-grid">
                {courses
                  .filter((c) => c.tutor === artist.slug)
                  .map((c) => (
                    <CourseCard course={c} key={c.slug} />
                  ))}
              </div>
            ) : (
              <>
                <SectionHeading
                  title="From first marks to final layers."
                  description="Every piece begins with looking a little closer."
                />
                <div className="three-grid">
                  {[
                    "Finding inspiration",
                    "Exploring the palette",
                    "The final brushstroke",
                  ].map((s, i) => (
                    <div key={s}>
                      <ArtImage
                        src={
                          i === 0
                            ? "/images/banners/studio.jpg"
                            : i === 1
                              ? "/images/banners/brushes.jpg"
                              : work[0]?.image
                        }
                        alt={s}
                        style={{ height: 200, borderRadius: 3 }}
                      />
                      <h3 style={{ fontSize: 20, marginTop: 15 }}>{s}</h3>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <DemoNotice />
      </div>
    </>
  );
}
