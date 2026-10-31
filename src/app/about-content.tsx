import Link from "next/link";
import { masterpieces } from "@/data/masterpieces";
export function AboutPage() {
  return (
    <div className="container page-content">
      <article className="about-prose">
        <span className="eyebrow">A LITTLE MORE HUMAN</span>
        <h1>
          Art makes room
          <br />
          for connection.
        </h1>
        <p>
          Artora brings the gallery, the studio, and the classroom a little
          closer together. Discover a painting, meet the person behind it, share
          what you are making, or find a new way of seeing.
        </p>
        <p>
          This is a frontend prototype. Contemporary artist names, biographies,
          ratings, reviews, prices, classes, and marketplace listings are
          fictional. No authentication, payments, video services, AI service, or
          production storage is connected.
        </p>
        <h2>What stays in your browser.</h2>
        <p>
          Favorites, follows, likes, saves, cart items, demo comments, post
          text, critique annotations, commission drafts, orders, and bookings
          are stored locally. Uploaded artwork images use session-only object
          URLs and are never uploaded or saved in localStorage. After a reload,
          uploaded posts retain their text and display a designed placeholder.
        </p>
        <h2 id="credits">The art, and where it comes from.</h2>
        <p>
          Contemporary marketplace illustrations were generated for this
          prototype using OpenAI's built-in image generation tool. They are
          sample illustrations attributed to fictional demo artists as part of
          the prototype. Repeated images appear in related portfolios, course
          references, posts, and labeled print editions.
        </p>
        <p>
          Studio and portrait photography comes from{" "}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Unsplash under its license ↗
          </a>
          . These photographs illustrate fictional people and studio settings;
          they are not representations of actual Artora membership or
          endorsement.
        </p>
        <h2>A museum with sources.</h2>
        <p>
          Historical names and artworks are real. Museum records and
          image-rights sources are attached to each historical work. Art
          Institute of Chicago reproductions are marked CC0 by the collection
          API. Wikimedia Commons reproductions are public-domain files. Artworks
          with unavailable images use designed placeholders.
        </p>
        <div className="credit-list">
          {masterpieces.map((w) => (
            <div key={w.slug}>
              <strong>{w.title}</strong>
              <p style={{ fontSize: 11, margin: "8px 0" }}>{w.license}</p>
              <a href={w.source} target="_blank" rel="noreferrer">
                Museum record
              </a>{" "}
              ·{" "}
              <a href={w.imageSource} target="_blank" rel="noreferrer">
                Image rights & source
              </a>
            </div>
          ))}
        </div>
        <p>
          Leonardo's profile illustration is a traditional drawing often
          described as a self-portrait; the identification is debated. Other
          historical profile illustrations show associated artworks and are
          labeled accordingly.
        </p>
        <h2>Keep exploring.</h2>
        <p>
          <Link className="text-link" href="/artworks">
            Find a painting
          </Link>{" "}
          ·{" "}
          <Link className="text-link" href="/community">
            Visit the studio
          </Link>{" "}
          ·{" "}
          <Link className="text-link" href="/learn">
            Learn something new
          </Link>
        </p>
      </article>
    </div>
  );
}
