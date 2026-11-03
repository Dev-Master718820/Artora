"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Home,
  Menu,
  Palette,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useDemo } from "@/context/demo-context";
import { mainArtist } from "@/data/alpana-barthakur";
import { ArtImage, Modal } from "@/components/shared/ui";
const navigation = [
  ["Discover", "/"],
  ["Artworks", "/artworks"],
  ["Artists", "/artists"],
  ["Commissions", "/commissions/new"],
  ["Community", "/community"],
  ["Learn", "/learn"],
  ["Masters", "/masters"],
];
export function Header() {
  const path = usePathname();
  const router = useRouter();
  const { state } = useDemo();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <>
      <div className="announcement">
        <span>A little art. A deeper connection.</span>
        <Link href="/community">
          Find your creative people <ArrowRight size={12} />
        </Link>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="Artora home">
            Artora<span>®</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={
                  (
                    href === "/"
                      ? path === "/"
                      : path.startsWith(href.split("/new")[0])
                  )
                    ? "active"
                    : ""
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={() => setSearch(true)}
              aria-label="Search Artora"
            >
              <Search size={19} />
            </button>
            <Link
              href="/favorites"
              className="icon-button optional-action"
              aria-label="Your favorites"
            >
              <Heart size={19} />
              {state.favorites.length > 0 && (
                <span className="count">{state.favorites.length}</span>
              )}
            </Link>
            <Link
              href="/cart"
              className="icon-button cart-link"
              aria-label={`Shopping bag, ${state.cart.length} items`}
            >
              <ShoppingBag size={19} />
              {state.cart.length > 0 && (
                <span className="count">{state.cart.length}</span>
              )}
            </Link>
            <Link
              href="/profile"
              className="profile-avatar"
              aria-label={`${mainArtist.name}'s profile`}
            >
              <ArtImage src={mainArtist.image} alt={mainArtist.name} />
            </Link>
            <button
              className="icon-button menu-button"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
              aria-expanded={menu}
            >
              {menu ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="mobile-menu" aria-label="Mobile menu">
            {navigation.map(([label, href]) => (
              <Link href={href} key={href} onClick={() => setMenu(false)}>
                {label}
                <ArrowRight size={14} />
              </Link>
            ))}
            <Link href="/favorites" onClick={() => setMenu(false)}>
              Your favorites
              <Heart size={14} />
            </Link>
          </nav>
        )}
      </header>
      <nav className="mobile-bottom" aria-label="Quick navigation">
        {[
          [Home, "Home", "/"],
          [Search, "Explore", "/artworks"],
          [Plus, "Create", "/community/create"],
          [Users, "Community", "/community"],
          [BookOpen, "Learn", "/learn"],
        ].map(([Icon, label, href]) => {
          const I = Icon as typeof Home;
          return (
            <Link
              href={href as string}
              key={label as string}
              className={path === href ? "active" : ""}
            >
              <I size={20} />
              <span>{label as string}</span>
            </Link>
          );
        })}
      </nav>
      <Modal
        open={search}
        onOpenChange={setSearch}
        title="Find something that speaks to you"
      >
        <form
          className="search-modal"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(false);
            router.push("/artworks?q=" + encodeURIComponent(query));
          }}
        >
          <label htmlFor="global-search">
            Search artwork, a subject, or a medium
          </label>
          <div className="search-field">
            <Search size={20} />
            <input
              id="global-search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try landscapes, flowers, watercolor…"
            />
          </div>
          <button className="button" type="submit">
            Explore artworks <ArrowRight size={16} />
          </button>
        </form>
        <div className="popular-searches">
          <span className="eyebrow">A FEW PLACES TO START</span>
          {["Landscape", "Portrait", "Animals", "Still Life"].map((x) => (
            <Link
              className="chip"
              href={"/artworks?category=" + encodeURIComponent(x)}
              key={x}
              onClick={() => setSearch(false)}
            >
              {x}
            </Link>
          ))}
        </div>
      </Modal>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <Link href="/" className="logo">
            Artora<span>®</span>
          </Link>
          <h3>
            A world made
            <br />
            more creative.
          </h3>
          <p>
            Art to live with. People to learn from.
            <br />A place to belong.
          </p>
        </div>
        <div>
          <h4>Find your art</h4>
          <Link href="/artworks">Original artworks</Link>
          <Link href="/artists">Meet the artists</Link>
          <Link href="/commissions/new">Commission a painting</Link>
          <Link href="/favorites">Your collection</Link>
        </div>
        <div>
          <h4>Make & connect</h4>
          <Link href="/community">Studio stories</Link>
          <Link href="/community/create">Share your work</Link>
          <Link href="/community/groups">Creative groups</Link>
          <Link href="/community/challenges">Monthly challenges</Link>
        </div>
        <div>
          <h4>Keep discovering</h4>
          <Link href="/learn">Artora Academy</Link>
          <Link href="/masters">Museum of Masters</Link>
          <Link href="/learn/classroom">Classroom preview</Link>
          <Link href="/about">The Artora story</Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© 2026 Artora. Made for the love of art.</span>
        <span>
          Frontend demo · Sample marketplace transactions.{" "}
          <Link href="/about#credits">Image credits & sources</Link>
        </span>
        <span className="footer-location">
          <Palette size={13} /> A little more human.
        </span>
      </div>
    </footer>
  );
}
