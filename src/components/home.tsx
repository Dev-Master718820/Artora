import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Brush,
  Check,
  ChevronRight,
  Heart,
  Leaf,
  Lightbulb,
  Palette,
  PenTool,
  Play,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { artworks, categories } from "@/data/artworks";
import { artists } from "@/data/artists";
import { courses } from "@/data/courses";
import { masterpieces } from "@/data/masterpieces";
import { posts } from "@/data/community-posts";
import { ArtworkCard } from "@/components/artwork/artwork-card";
import { ArtistCard } from "@/components/artists/artist-card";
import { CourseCard } from "@/components/academy/course-card";
import { ArtImage, ButtonLink, SectionHeading } from "@/components/shared/ui";
export function HomePage() {
  return (
    <>
      <section className="home-hero container">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="little-line" /> ART THAT FEELS LIKE YOU
          </div>
          <h1>
            Original Art.
            <br />
            Real People.
            <br />
            <em>Your Story.</em>
          </h1>
          <p>
            Discover original paintings, connect with talented artists, learn
            new techniques, and become part of a creative community.
          </p>
          <div className="hero-buttons">
            <ButtonLink href="/artworks">
              Explore artworks
              <ArrowUpRight size={17} />
            </ButtonLink>
            <ButtonLink href="/commissions/new" secondary>
              Commission a painting
            </ButtonLink>
          </div>
          <div className="hero-social">
            <div className="avatar-stack">
              {artists.slice(0, 4).map((a) => (
                <ArtImage key={a.slug} src={a.image} alt={a.name} />
              ))}
            </div>
            <div>
              <span>A world of creative people</span>
              <small>Find the art. Meet the human.</small>
            </div>
            <span className="handwritten">Made with feeling.</span>
          </div>
        </div>
        <div className="hero-art">
          <ArtImage
            src="/images/artworks/mountain.jpg"
            alt="Mountain Glow, a vibrant impasto landscape with an alpine lake and sunset"
            loading="eager"
          />
          <div className="hero-art-top">
            <span>
              <span className="status-dot" /> THE ARTORA COLLECTION
            </span>
            <span>01 — 20</span>
          </div>
          <div className="hero-art-bottom">
            <div>
              <span>IN THE SPOTLIGHT</span>
              <h2>
                Some places
                <br />
                stay with you.
              </h2>
              <p>
                Mountain Glow <i>by Emma Carter</i>
              </p>
            </div>
            <Link
              className="hero-art-link"
              href="/artworks/mountain-glow"
              aria-label="Discover Mountain Glow"
            >
              <ArrowUpRight size={26} />
            </Link>
          </div>
          <div className="hero-floating-tag">
            <Brush size={15} />
            <span>Original. Just like you.</span>
          </div>
        </div>
      </section>
      <div className="benefit-strip container">
        {[
          [
            Palette,
            "Art with a human touch",
            "Original works, individual stories",
          ],
          [PenTool, "Your idea, their artistry", "Made especially for you"],
          [
            Users,
            "Find your creative circle",
            "Share, learn, and grow together",
          ],
          [
            ShieldCheck,
            "Explore with confidence",
            "A welcoming place for every art lover",
          ],
        ].map(([Icon, title, desc]) => {
          const I = Icon as typeof Palette;
          return (
            <div key={title as string}>
              <I size={22} strokeWidth={1.3} />
              <span>
                <strong>{title as string}</strong>
                <small>{desc as string}</small>
              </span>
            </div>
          );
        })}
      </div>
      <section className="section container">
        <SectionHeading
          eyebrow="THE CURATED EDIT"
          title="Find a piece of yourself."
          description="Original works to fall for. And live with."
          href="/artworks"
          label="Explore all artworks"
        />
        <div className="home-art-grid">
          {artworks.slice(0, 4).map((a) => (
            <ArtworkCard key={a.slug} artwork={a} priority />
          ))}
        </div>
      </section>
      <section className="section category-section">
        <div className="container">
          <SectionHeading
            eyebrow="FOLLOW YOUR CURIOSITY"
            title="What speaks to you?"
            href="/artworks"
            label="Browse the collection"
          />
          <div className="category-grid">
            {[
              ["Landscape", "mountain"],
              ["Portrait", "portrait"],
              ["Abstract", "abstract-study"],
              ["Animals", "dog"],
              ["Still Life", "flowers"],
              ["Cityscape", "coast"],
            ].map(([title, img], i) => (
              <Link
                href={"/artworks?category=" + encodeURIComponent(title)}
                className="category-card"
                key={title}
              >
                <ArtImage
                  src={"/images/artworks/" + img + ".jpg"}
                  alt={title + " art"}
                />
                <div>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <ArrowUpRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="commission-banner">
          <div className="commission-art">
            <ArtImage
              src="/images/artworks/dog.jpg"
              alt="A custom oil painting of a golden retriever"
            />
            <div className="paper-note">
              <span>
                A little idea.
                <br />A lot of heart.
              </span>
              <Heart size={20} strokeWidth={1} />
            </div>
            <div className="commission-mini">
              <ArtImage src="/images/artists/sophie.jpg" alt="Sophie Morgan" />
              <span>
                Painted by a person.
                <br />
                <strong>Inspired by you.</strong>
              </span>
            </div>
          </div>
          <div className="commission-copy">
            <span className="eyebrow">SOMETHING ONLY YOU COULD IMAGINE</span>
            <h2>
              Your story.
              <br />
              Their brush.
              <br />
              <em>One of a kind.</em>
            </h2>
            <p>
              Your favorite place. A much-loved face. A feeling you can't quite
              put into words. Bring it to life with an artist who gets it.
            </p>
            <div className="commission-steps">
              <span>
                <i>01</i>Share your idea
              </span>
              <ChevronRight size={13} />
              <span>
                <i>02</i>Meet your artist
              </span>
              <ChevronRight size={13} />
              <span>
                <i>03</i>Make it yours
              </span>
            </div>
            <ButtonLink href="/commissions/new">
              Create something personal
              <ArrowUpRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="BEHIND EVERY PIECE, A PERSON"
          title="Good art. Even better people."
          description="Meet a few of the artists making the world a little more colorful."
          href="/artists"
          label="Meet all artists"
        />
        <div className="four-grid">
          {artists.slice(0, 4).map((a) => (
            <ArtistCard artist={a} key={a.slug} />
          ))}
        </div>
      </section>
      <section className="section community-home">
        <div className="container">
          <div className="community-intro">
            <span className="eyebrow">A LITTLE INSPIRATION, EVERY DAY</span>
            <h2>
              Art is better <em>together.</em>
            </h2>
            <p>
              Works in progress. Happy accidents. Your next big idea.
              <br />
              There's a place for all of it here.
            </p>
            <ButtonLink href="/community">
              Step inside the community
              <ArrowUpRight size={16} />
            </ButtonLink>
          </div>
          <div className="community-peek">
            {posts.slice(0, 3).map((p, i) => (
              <Link
                href={"/community/posts/" + p.slug}
                className={"peek-card peek-" + i}
                key={p.slug}
              >
                <div className="peek-author">
                  <ArtImage
                    src={artists.find((a) => a.slug === p.artist)!.image}
                    alt=""
                  />
                  <span>
                    {artists.find((a) => a.slug === p.artist)!.name}
                    <small>From the studio</small>
                  </span>
                  <span>•••</span>
                </div>
                <ArtImage src={p.image} alt={p.title} />
                <div className="peek-caption">
                  <Heart size={15} />
                  <span>{p.likes}</span>
                  <p>{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="ARTORA ACADEMY"
          title="Make room for your creative side."
          description="A first brushstroke. A new perspective. Learn from people who love what they do."
          href="/learn"
          label="Find your next lesson"
        />
        <div className="four-grid">
          {courses.slice(0, 4).map((c) => (
            <CourseCard course={c} key={c.slug} />
          ))}
        </div>
      </section>
      <section className="section container">
        <div className="masters-home">
          <div className="masters-home-copy">
            <span className="eyebrow">THE MUSEUM OF MASTERS</span>
            <h2>
              Great art.
              <br />
              <em>Endless discovery.</em>
            </h2>
            <p>
              Step closer to the masterpieces you know—and discover the stories
              you don't.
            </p>
            <ButtonLink href="/masters" secondary>
              Explore the Masters
              <ArrowUpRight size={16} />
            </ButtonLink>
            <span className="masters-footnote">
              A little history. A whole new way of seeing.
            </span>
          </div>
          <Link href="/masters/artworks/mona-lisa" className="masters-home-art">
            <ArtImage
              src="/images/masters/mona-lisa.jpg"
              alt="Mona Lisa by Leonardo da Vinci"
            />
            <div>
              <span>c. 1503–1519 · LEONARDO DA VINCI</span>
              <h3>Some smiles hold centuries.</h3>
              <span className="text-link">
                Discover Mona Lisa <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </div>
      </section>
      <section className="challenge-banner container">
        <div>
          <span className="eyebrow">YOUR NEXT CREATIVE ADVENTURE</span>
          <h2>Chase the golden hour.</h2>
          <p>One theme. A thousand different ways to see it.</p>
        </div>
        <ButtonLink href="/community/challenges" secondary>
          Join this month's challenge
          <ArrowUpRight size={16} />
        </ButtonLink>
      </section>
      <section className="closing-note container">
        <span className="little-star">✳</span>
        <h2>There's an artist in all of us.</h2>
        <p>Find what moves you. Make what matters.</p>
        <Link className="text-link" href="/community/create">
          Share your art
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
