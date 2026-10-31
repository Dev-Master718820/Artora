"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Frame,
  Heart,
  Landmark,
  MapPin,
  Maximize2,
  Palette,
  Search,
  Sparkles,
} from "lucide-react";
import { masterpieces, periods } from "@/data/masterpieces";
import { historicalArtists } from "@/data/historical-artists";
import { searchMatches } from "@/lib/utils";
import { useDemo } from "@/context/demo-context";
import type { HistoricalArtist, Masterpiece } from "@/types";
import { MasterpieceCard } from "./masterpiece-card";
import {
  ArtImage,
  Breadcrumbs,
  ButtonLink,
  EmptyState,
  Modal,
  SearchInput,
  SectionHeading,
  Tabs,
} from "@/components/shared/ui";
export function MuseumHome() {
  const [q, setQ] = useState("");
  const [period, setPeriod] = useState("All periods");
  const items = masterpieces.filter(
    (w) =>
      (period === "All periods" || w.period === period) &&
      searchMatches(
        q,
        w.title,
        historicalArtists.find((a) => a.slug === w.artist)?.name || "",
        w.period,
      ),
  );
  return (
    <div className="container page-content">
      <div className="museum-intro">
        <div className="museum-intro-copy">
          <span className="eyebrow">ART LIVES FOREVER</span>
          <h1>
            Explore
            <br />
            the Masters.
          </h1>
          <p>
            Discover the masterpieces and the people who shaped the history of
            art.
          </p>
          <a href="#masterpieces" className="button">
            Explore the collection
            <ArrowRight size={15} />
          </a>
          <div className="museum-stats">
            <span>
              <strong>8</strong>
              <small>Iconic masterpieces</small>
            </span>
            <span>
              <strong>7</strong>
              <small>Extraordinary artists</small>
            </span>
            <span>
              <strong>∞</strong>
              <small>Ways of seeing</small>
            </span>
          </div>
        </div>
        <Link href="/masters/artworks/mona-lisa" className="museum-feature">
          <ArtImage
            src="/images/masters/mona-lisa.jpg"
            alt="Mona Lisa by Leonardo da Vinci"
            loading="eager"
          />
          <div>
            <span className="eyebrow">A MASTERPIECE OF MYSTERY</span>
            <h2>Mona Lisa</h2>
            <p>Leonardo da Vinci · c. 1503–1519</p>
            <p>A familiar face. A thousand stories still to discover.</p>
            <span className="button secondary small">
              Look a little closer
              <ArrowRight size={13} />
            </span>
          </div>
        </Link>
      </div>
      <div className="chips">
        {["All periods", ...periods].map((p) => (
          <button
            className={`chip ${period === p ? "active" : ""}`}
            key={p}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <section className="section" id="masterpieces">
        <SectionHeading
          eyebrow="TAKE YOUR TIME. LOOK A LITTLE LONGER."
          title="Icons for a reason."
          description="Extraordinary works. Endlessly worth revisiting."
        />
        <div className="page-toolbar">
          <SearchInput
            value={q}
            onChange={setQ}
            placeholder="Search paintings, artists, or movements…"
          />
          <span className="muted" style={{ fontSize: 11 }}>
            {items.length} works in this collection
          </span>
        </div>
        {items.length ? (
          <div className="museum-grid">
            {items.map((w) => (
              <MasterpieceCard work={w} key={w.slug} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="A new discovery is just around the corner."
            description="No works match this search. Try another period or artist."
          />
        )}
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="THE PEOPLE WHO CHANGED HOW WE SEE"
          title="A life behind every masterpiece."
          description="Meet the visionaries, observers, and restless experimenters."
        />
        <div className="historical-artists-grid">
          {historicalArtists.map((a) => (
            <Link
              href={"/masters/artists/" + a.slug}
              className="historical-artist-card"
              key={a.slug}
            >
              <ArtImage
                src={a.image}
                alt={
                  a.slug === "leonardo-da-vinci"
                    ? "A traditional drawing associated with Leonardo da Vinci"
                    : `Artwork associated with ${a.name}`
                }
              />
              <div>
                <h3>{a.name}</h3>
                <p>{a.years}</p>
                <p>{a.movement}</p>
                <span className="round-link">
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading
          title="A journey through art history."
          description="A few starting points for exploring how art has changed."
        />
        <div className="timeline">
          {[
            ["Renaissance", "c. 1400–1600"],
            ["Baroque", "c. 1600–1750"],
            ["Rococo", "c. 1730–1770"],
            ["Romanticism", "c. 1800–1850"],
            ["Impressionism", "c. 1860–1890"],
            ["Post-Impressionism", "c. 1886–1905"],
            ["Modern Art", "c. 1860s–1970s"],
          ].map(([p, d]) => (
            <a href="#masterpieces" key={p} onClick={() => setPeriod(p)}>
              <h3>{p}</h3>
              <p>{d}</p>
            </a>
          ))}
        </div>
      </section>
      <p className="source-credit">
        Historical works are educational records, separate from the fictional
        marketplace. Each artwork page includes museum sources and image
        licensing details. Period dates are approximate and overlap.
      </p>
    </div>
  );
}
export function MasterpieceDetail({ work }: { work: Masterpiece }) {
  const artist = historicalArtists.find((a) => a.slug === work.artist)!;
  const { state, toggle } = useDemo();
  const [tab, setTab] = useState("Overview");
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [scale, setScale] = useState(1);
  const saved = state.favorites.includes("master-" + work.slug);
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[
          { label: "Masters", href: "/masters" },
          { label: artist.name, href: "/masters/artists/" + artist.slug },
          { label: work.title },
        ]}
      />
      <div className="masterpiece-layout">
        <div>
          <div className="museum-viewer">
            <ArtImage
              src={work.image}
              alt={`${work.title} by ${artist.name}`}
              loading="eager"
            />
            {work.hotspots.map((h, i) => (
              <button
                className={`educational-hotspot ${active === i ? "active" : ""}`}
                key={h.title}
                style={{ left: h.x + "%", top: h.y + "%" }}
                aria-label={`Explore ${h.title}`}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                {active === i && <span>{h.title}</span>}
              </button>
            ))}
            <button
              className="icon-button zoom-button"
              aria-label="Zoom masterpiece"
              onClick={() => setZoom(true)}
            >
              <Maximize2 size={16} />
            </button>
          </div>
          <p className="source-credit">
            {work.license}.{" "}
            <a href={work.imageSource} target="_blank" rel="noreferrer">
              Image source & rights ↗
            </a>
          </p>
          <div className="educational-note" aria-live="polite">
            <span className="eyebrow" style={{ fontSize: 8, marginBottom: 10 }}>
              A CLOSER LOOK
            </span>
            <strong>{work.hotspots[active].title}</strong>
            <p>{work.hotspots[active].text}</p>
          </div>
        </div>
        <div className="masterpiece-info">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 15,
            }}
          >
            <span
              className="chip"
              style={{ background: "#eaddc6", fontSize: 8, border: 0 }}
            >
              MASTERPIECE
            </span>
            <button
              className={`button small ${saved ? "selected" : "secondary"}`}
              aria-pressed={saved}
              onClick={() => toggle("favorites", "master-" + work.slug)}
            >
              <Heart size={13} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved to your collection" : "Save to collection"}
            </button>
          </div>
          <h1>{work.title}</h1>
          <Link href={"/masters/artists/" + artist.slug}>
            <h2>
              {artist.name}{" "}
              <small
                className="muted"
                style={{ fontSize: 12, fontFamily: "var(--sans)" }}
              >
                ({artist.years})
              </small>
            </h2>
          </Link>
          <div className="master-specs">
            <span>
              <Calendar size={15} />
              {work.date}
            </span>
            <span>
              <Landmark size={15} />
              {work.period}
            </span>
            <span>
              <Palette size={15} />
              {work.medium}
            </span>
          </div>
          <Tabs
            tabs={[
              "Overview",
              "History",
              "Technique",
              "Details",
              "Related works",
            ]}
            value={tab}
            onChange={setTab}
          />
          <div className="masterpiece-text">
            {tab === "Overview" ? (
              <>
                <h3>A masterpiece worth your time.</h3>
                <p>{work.description}</p>
                <p>{work.importance}</p>
              </>
            ) : tab === "History" ? (
              <>
                <h3>A story across centuries.</h3>
                <p>{work.description}</p>
                <p>{work.fact}</p>
                <p>
                  Today, this work is associated with {work.collection}. Follow
                  the museum source for its documented history and collection
                  record.
                </p>
                <a
                  className="source-link"
                  href={work.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the museum record ↗
                </a>
              </>
            ) : tab === "Technique" ? (
              <>
                <h3>How to look closer.</h3>
                <p>{work.importance}</p>
                <p>{artist.technique}</p>
                <p>
                  Choose a hotspot on the image or one of the details below to
                  explore what makes the painting distinctive.
                </p>
              </>
            ) : tab === "Details" ? (
              <>
                <h3>At a glance.</h3>
                <dl>
                  {[
                    ["Artist", artist.name],
                    ["Created", work.date],
                    ["Movement", work.period],
                    ["Medium", work.medium],
                    ["Dimensions", work.dimensions],
                    ["Collection", work.collection],
                  ].map(([key, value]) => (
                    <div style={{ display: "contents" }} key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p style={{ marginTop: 20 }}>{work.fact}</p>
              </>
            ) : (
              <>
                <h3>Keep the conversation going.</h3>
                <div className="two-grid">
                  {masterpieces
                    .filter((w) => w.slug !== work.slug)
                    .slice(0, 2)
                    .map((w) => (
                      <MasterpieceCard work={w} key={w.slug} />
                    ))}
                </div>
              </>
            )}
          </div>
          <div style={{ marginTop: 26 }}>
            <h3 style={{ fontSize: 26 }}>Explore the details.</h3>
            <div className="hotspot-cards">
              {work.hotspots.map((h, i) => (
                <button
                  className={`hotspot-card ${active === i ? "active" : ""}`}
                  aria-pressed={active === i}
                  key={h.title}
                  onClick={() => setActive(i)}
                >
                  <span>DETAIL {String(i + 1).padStart(2, "0")}</span>
                  <strong>{h.title}</strong>
                </button>
              ))}
            </div>
          </div>
          <ButtonLink href={"/masters/artists/" + artist.slug} secondary>
            Explore {artist.name.split(" ")[0]}'s world
            <ArrowRight size={15} />
          </ButtonLink>
          <p className="source-credit">
            Historical information:{" "}
            <a href={work.source} target="_blank" rel="noreferrer">
              {work.collection} ↗
            </a>
          </p>
        </div>
      </div>
      <section className="section">
        <SectionHeading
          eyebrow="GREAT ART IS AN ONGOING CONVERSATION"
          title="Keep looking. Keep discovering."
          href="/masters"
          label="Back to the museum"
        />
        <div className="museum-grid">
          {masterpieces
            .filter((w) => w.slug !== work.slug)
            .slice(0, 4)
            .map((w) => (
              <MasterpieceCard work={w} key={w.slug} />
            ))}
        </div>
      </section>
      <Modal open={zoom} onOpenChange={setZoom} title={work.title} wide>
        <div
          style={{
            overflow: "auto",
            maxHeight: "65dvh",
            background: "#272820",
            borderRadius: 3,
          }}
        >
          <ArtImage
            src={work.image}
            alt={work.title}
            style={{
              width: 100 * scale + "%",
              maxWidth: "none",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            marginTop: 17,
          }}
        >
          <label
            htmlFor="master-zoom"
            style={{ margin: 0, whiteSpace: "nowrap" }}
          >
            Zoom {Math.round(scale * 100)}%
          </label>
          <input
            id="master-zoom"
            type="range"
            min={1}
            max={3}
            step={0.25}
            value={scale}
            onChange={(e) => setScale(+e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}
export function HistoricalArtistProfile({
  artist,
}: {
  artist: HistoricalArtist;
}) {
  const works = masterpieces.filter((w) => w.artist === artist.slug);
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[{ label: "Masters", href: "/masters" }, { label: artist.name }]}
      />
      <div className="historical-hero">
        <ArtImage
          src={artist.image}
          alt={
            artist.slug === "leonardo-da-vinci"
              ? "Traditional drawing associated with Leonardo da Vinci"
              : `A work associated with ${artist.name}`
          }
          loading="eager"
        />
        <div>
          <span className="eyebrow">A LIFE IN ART</span>
          <h1>{artist.name}</h1>
          <h2>{artist.years}</h2>
          <p>{artist.bio}</p>
          <div className="chips">
            <span className="chip">{artist.movement}</span>
            <span className="chip">
              <MapPin size={11} style={{ marginRight: 5 }} />
              {artist.location}
            </span>
            <span className="chip">Painter & observer</span>
          </div>
        </div>
      </div>
      <div className="historical-layout">
        <aside className="life-timeline">
          <h3>A life, in moments.</h3>
          {artist.timeline.map((t) => (
            <div key={t.year}>
              <strong>{t.year}</strong>
              <p>{t.text}</p>
            </div>
          ))}
        </aside>
        <div>
          <SectionHeading
            title="Works that stay with us."
            href="/masters"
            label="The full collection"
          />
          <div className="museum-grid">
            {works.map((w) => (
              <MasterpieceCard work={w} key={w.slug} />
            ))}
          </div>
          <div className="history-panels">
            <div className="panel">
              <Palette
                size={20}
                style={{ color: "#9a7b51", marginBottom: 15 }}
              />
              <h3>A way of seeing.</h3>
              <p>{artist.technique}</p>
            </div>
            <div className="panel">
              <Landmark
                size={20}
                style={{ color: "#9a7b51", marginBottom: 15 }}
              />
              <h3>An enduring influence.</h3>
              <p>{artist.influence}</p>
            </div>
          </div>
          <p className="source-credit">
            Learn more:{" "}
            <a href={artist.source} target="_blank" rel="noreferrer">
              Museum biography & historical source ↗
            </a>
            . Artwork and reproduction credits are linked from each painting's
            page. The Leonardo image is traditionally associated with a
            self-portrait; the identification is debated. Other profile images
            show associated artworks rather than identified portraits.
          </p>
        </div>
      </div>
      <section className="section">
        <SectionHeading
          eyebrow="ANOTHER WAY OF SEEING"
          title="Discover another extraordinary life."
        />
        <div className="historical-artists-grid">
          {historicalArtists
            .filter((a) => a.slug !== artist.slug)
            .slice(0, 3)
            .map((a) => (
              <Link
                className="historical-artist-card"
                href={"/masters/artists/" + a.slug}
                key={a.slug}
              >
                <ArtImage src={a.image} alt={`Art associated with ${a.name}`} />
                <div>
                  <h3>{a.name}</h3>
                  <p>{a.years}</p>
                  <span className="round-link">
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
