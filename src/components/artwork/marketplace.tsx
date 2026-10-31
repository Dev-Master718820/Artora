"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Frame,
  MapPin,
  Maximize2,
  Package,
  Palette,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Truck,
  X,
} from "lucide-react";
import { artworks, categories, mediums, styles } from "@/data/artworks";
import { artists } from "@/data/artists";
import { useDemo } from "@/context/demo-context";
import { filterArtworks, money } from "@/lib/utils";
import { ArtworkGrid } from "./artwork-card";
import {
  ArtImage,
  Breadcrumbs,
  DemoNotice,
  EmptyState,
  Modal,
  SaveButton,
  SearchInput,
  SectionHeading,
  Tabs,
} from "@/components/shared/ui";
import type { Artwork } from "@/types";
export function Marketplace() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [style, setStyle] = useState("");
  const [price, setPrice] = useState(1500);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("Curated for you");
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);
  const reset = () => {
    setCategory("");
    setMedium("");
    setStyle("");
    setPrice(1500);
    setSize("");
    setQuery("");
  };
  const items = filterArtworks(artworks, {
    query,
    category,
    medium,
    style,
    price,
    size,
    sort,
  });
  const filters = (
    <>
      <div className="filter-title">
        <h3>Refine your collection</h3>
        <button onClick={reset}>Clear all</button>
      </div>
      {[
        ["Category", categories, category, setCategory],
        ["Medium", mediums, medium, setMedium],
        ["Style", styles, style, setStyle],
        ["Size", ["Small", "Medium", "Large"], size, setSize],
      ].map(([label, options, value, setter]) => (
        <div className="filter-group" key={label as string}>
          <h4>{label as string}</h4>
          {(options as string[]).map((v) => (
            <label className="filter-option" key={v}>
              <input
                type="checkbox"
                checked={value === v}
                onChange={() =>
                  (setter as (s: string) => void)(value === v ? "" : v)
                }
              />
              {v}
              {label === "Size" && (
                <small>
                  {v === "Small"
                    ? "≤16 in"
                    : v === "Medium"
                      ? "17–24 in"
                      : "25+ in"}
                </small>
              )}
            </label>
          ))}
        </div>
      ))}
      <div className="filter-group">
        <h4>Price range</h4>
        <label htmlFor="price-filter" className="sr-only">
          Maximum price
        </label>
        <input
          id="price-filter"
          type="range"
          min="35"
          max="1500"
          step="5"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />
        <div className="range-label">
          <span>$35</span>
          <span>Up to {money(price)}</span>
        </div>
      </div>
    </>
  );
  return (
    <div className="container page-content">
      <Breadcrumbs items={[{ label: "Artworks" }]} />
      <div className="page-intro">
        <div>
          <span className="eyebrow">A CONNECTION WAITING TO HAPPEN</span>
          <h1>Find your kind of art.</h1>
          <p>
            Original pieces. Real stories. A little something that feels like
            you.
          </p>
        </div>
        <span className="handwritten" style={{ position: "static" }}>
          Live with what you love.
        </span>
      </div>
      <div className="page-toolbar">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search artwork, subject, or keyword…"
        />
        <div className="toolbar-right">
          <button
            className="button secondary filter-mobile"
            onClick={() => setDrawer(true)}
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <span>{items.length} artworks</span>
          <select
            aria-label="Sort artworks"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {[
              "Curated for you",
              "Price: low to high",
              "Price: high to low",
              "Title: A–Z",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="listing-layout">
        <aside className="filter-sidebar">{filters}</aside>
        <div>
          {(category || medium || style || size || price < 1500) && (
            <div className="active-filters">
              {[
                [category, setCategory],
                [medium, setMedium],
                [style, setStyle],
                [size, setSize],
              ]
                .filter(([v]) => v)
                .map(([v, s]) => (
                  <button
                    className="chip"
                    key={v as string}
                    onClick={() => (s as (v: string) => void)("")}
                  >
                    {v as string}
                    <X size={11} />
                  </button>
                ))}
              {price < 1500 && (
                <button className="chip" onClick={() => setPrice(1500)}>
                  Under {money(price)}
                  <X size={11} />
                </button>
              )}
            </div>
          )}
          {items.length ? (
            <ArtworkGrid items={items} />
          ) : (
            <EmptyState
              title="No artworks match these filters."
              description="Try another subject or give your search a little more room."
            />
          )}
          {!items.length && (
            <button
              className="button secondary"
              style={{ marginTop: 20 }}
              onClick={reset}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
      <DemoNotice />
      <Modal open={drawer} onOpenChange={setDrawer} title="Find your art">
        {filters}
        <button className="button full" onClick={() => setDrawer(false)}>
          Show {items.length} artworks
          <ArrowRight size={15} />
        </button>
      </Modal>
    </div>
  );
}
export function ArtworkDetail({ artwork }: { artwork: Artwork }) {
  const artist = artists.find((a) => a.slug === artwork.artist)!;
  const { addToCart } = useDemo();
  const router = useRouter();
  const [lightbox, setLightbox] = useState(false);
  const [view, setView] = useState(0);
  const [tab, setTab] = useState("About the artwork");
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[
          { label: "Artworks", href: "/artworks" },
          { label: artwork.title },
        ]}
      />
      <div className="product-layout">
        <div>
          <button
            className="product-main-image"
            onClick={() => setLightbox(true)}
            aria-label="Zoom artwork"
          >
            <ArtImage
              src={artwork.image}
              alt={artwork.title}
              loading="eager"
              style={
                view === 1
                  ? { objectFit: "cover", transform: "scale(1.5)" }
                  : view === 2
                    ? {
                        padding: 35,
                        background: "#e8dfd0",
                        boxShadow: "inset 0 0 0 24px #b19269",
                      }
                    : {}
              }
            />
            <span className="icon-button zoom-button">
              <Maximize2 size={16} />
            </span>
          </button>
          <div className="thumbnail-row">
            {["Full artwork", "Brushwork detail", "Framed preview"].map(
              (label, i) => (
                <button
                  aria-label={label}
                  aria-pressed={view === i}
                  key={label}
                  className={`thumbnail ${view === i ? "active" : ""}`}
                  onClick={() => setView(i)}
                >
                  <ArtImage
                    src={artwork.image}
                    alt={label}
                    style={
                      i === 1
                        ? { transform: "scale(2)" }
                        : i === 2
                          ? { border: "5px solid #b19269" }
                          : {}
                    }
                  />
                </button>
              ),
            )}
          </div>
          <p className="source-credit">
            Artwork shown in a fictional marketplace. Generated illustration;
            frame preview is illustrative.
          </p>
        </div>
        <div className="product-copy">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="eyebrow">
              {artwork.print
                ? "A LITTLE ART, EVERY DAY"
                : "ONE ORIGINAL. ONE CONNECTION."}
            </span>
            <SaveButton id={artwork.slug} className="static-save" />
          </div>
          <h1>{artwork.title}</h1>
          <Link className="product-artist" href={"/artists/" + artist.slug}>
            <ArtImage src={artist.image} alt={artist.name} />
            <span>
              By {artist.name}
              <small>{artist.location} · Meet the artist ↗</small>
            </span>
          </Link>
          <div className="product-price">
            {money(artwork.price)}
            <small>USD · Demo price</small>
          </div>
          <div className="spec-grid">
            <div>
              <Frame size={18} />
              <span>
                <small>Artwork type</small>
                {artwork.print ? "Fine art print" : "Original painting"}
              </span>
            </div>
            <div>
              <Ruler size={18} />
              <span>
                <small>Dimensions</small>
                {artwork.width} × {artwork.height} inches
              </span>
            </div>
            <div>
              <Palette size={18} />
              <span>
                <small>Medium</small>
                {artwork.medium}
              </span>
            </div>
            <div>
              <MapPin size={18} />
              <span>
                <small>Ships from</small>
                {artist.location}
              </span>
            </div>
          </div>
          <p>{artwork.description}</p>
          <div className="purchase-buttons">
            <button className="button" onClick={() => addToCart(artwork.slug)}>
              <ShoppingBag size={15} />
              Add to cart
            </button>
            <button
              className="button secondary"
              onClick={() => {
                addToCart(artwork.slug);
                router.push("/checkout");
              }}
            >
              Buy now · Demo
              <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="purchase-trust">
            <span>
              <ShieldCheck size={13} />
              Artist-made
            </span>
            <span>
              <Truck size={13} />
              Demo shipping included
            </span>
            <span>
              <Package size={13} />
              Thoughtfully packaged
            </span>
          </div>
          <div className="chips" style={{ marginTop: 24 }}>
            {artwork.tags.map((t) => (
              <Link
                href={"/artworks?q=" + encodeURIComponent(t)}
                className="chip"
                key={t}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="section">
        <Tabs
          tabs={[
            "About the artwork",
            "Shipping & care",
            "Collector reviews",
            "Artist story",
          ]}
          value={tab}
          onChange={setTab}
        />
        <div className="product-description">
          {tab === "About the artwork" ? (
            <div className="prose">
              <h3>A little closer.</h3>
              <p>{artwork.description}</p>
              <p>
                Designed to become part of your everyday life. Colors and
                texture reveal a little more as the light changes throughout the
                day. The listed dimensions describe the artwork surface; framing
                is shown for inspiration.
              </p>
            </div>
          ) : tab === "Shipping & care" ? (
            <div className="prose">
              <h3>From their studio to your space.</h3>
              <p>
                In a future live marketplace, original artwork would ship
                securely packaged from the artist. This demo includes free
                sample shipping and does not send any physical goods.
              </p>
              <p>
                Display artwork away from direct sunlight and moisture. Use a
                soft, dry cloth on the frame; avoid cleaning products on painted
                surfaces.
              </p>
            </div>
          ) : tab === "Collector reviews" ? (
            <>
              <p className="field-help">
                Fictional buyer reviews for this demo. Community critique is a
                separate feature.
              </p>
              {[
                "The colors feel even more beautiful in our living room. A piece we will treasure.",
                "Such a thoughtful painting. We love noticing the details each morning.",
              ].map((t, i) => (
                <div className="review" key={t}>
                  <strong>{["Charlotte W.", "Amelia R."][i]}</strong>
                  <span>★★★★★ · Sample collector review</span>
                  <p>{t}</p>
                </div>
              ))}
            </>
          ) : (
            <div className="prose">
              <h3>Meet {artist.name.split(" ")[0]}.</h3>
              <p>{artist.bio}</p>
              <Link href={"/artists/" + artist.slug} className="text-link">
                Visit the studio
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <section className="section">
        <SectionHeading
          eyebrow="KEEP EXPLORING"
          title="A few more to fall for."
          href="/artworks"
          label="All artworks"
        />
        <ArtworkGrid
          items={artworks.filter((a) => a.slug !== artwork.slug).slice(0, 3)}
        />
      </section>
      <DemoNotice />
      <Modal
        open={lightbox}
        onOpenChange={setLightbox}
        title={artwork.title}
        wide
      >
        <ArtImage
          src={artwork.image}
          alt={artwork.title}
          className="lightbox-image"
        />
      </Modal>
    </div>
  );
}
