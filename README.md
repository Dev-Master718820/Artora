# Artora

A complete frontend demo of an art marketplace, creative community, learning studio, and digital museum. Built from the supplied Artora references with warm ivory surfaces, editorial serif headings, terracotta accents, and original artwork imagery.

## Run locally

Requires Node.js 20.9+ and npm (developed with Node.js 24).

```bash
npm ci
npm run dev
```

Open **http://localhost:3000**. Every page is available without an account.

```bash
npm run typecheck
npm run build
npm start
```

The lockfile pins Next.js 16.4.3 and React 19.3.1, along with compatible TypeScript, Tailwind CSS 4, Lucide icons, and Radix accessible dialogs. No environment variables, API keys, or backend are required. No runtime network requests are needed for artwork images; images are bundled locally.

## Implemented journeys

- Homepage with curated art, categories, commission story, artist spotlights, community, Academy, museum, and monthly challenge.
- Artwork directory with working keyword search, category/medium/style/size/price filters, sorting, favorites, and empty states.
- Artwork details with alternate viewing modes, enlarged images, artist links, shipping/care information, related works, and explicitly fictional buyer reviews.
- Artist discovery, portfolios, biographies, creative-process galleries, follows, commission availability, and teaching links.
- Alpana Barthakur’s artist-supplied profile, discoverable by name and Hillsborough, New Jersey, with her portrait and 14 original painting photographs. The top-bar portrait opens her main profile; her public portfolio is `/artists/alpana-barthakur`.
- Five-step commission wizard with validated description, local reference previews, style/medium/size/color selection, budget/date, deterministic artist matching, review, and demo submission.
- Community feed with For You, Following, Latest, and Popular tabs; categories, follows, likes, saves, and post details.
- Local post creation with image validation and preview, category, medium, tags, feedback preferences, and immediate feed insertion.
- Comments and image critique using relative coordinates. Constructive critique and technical feedback enable annotations; other feedback preferences do not. A centered annotation option supports keyboard users.
- Academy with lesson filtering, tutor profiles, course overview/curriculum/reviews/materials, written lesson previews, downloadable materials lists, and demo enrollment.
- Private lesson booking with type/date/time/duration selection, predefined prices, conflict checks, summary, local confirmation, and demo activity records.
- Classroom visual preview with lesson reference, simulated media controls, composition overlay, participant portraits, chat, session notes, and materials. It never requests camera/microphone permission.
- Museum with eight masterpieces, period filtering and search, seven historical biographies, timelines, related works, educational hotspots, zoom/pan, and sources/licensing information.
- Cart with print quantities, unique originals, removal, totals, and demo checkout with sample shipping data and a required simulation acknowledgment.
- Favorites, demo profile/activity, About and image credits, responsive navigation, mobile bottom bar, loading skeletons, route error handling, and 404 pages.
- Optional creative groups and three monthly challenge prompts.

## Routes

| Section             | Routes                                                                        |
| ------------------- | ----------------------------------------------------------------------------- |
| Discovery           | `/`, `/artworks`, `/artworks/[slug]`                                          |
| Artists             | `/artists`, `/artists/[slug]`                                                 |
| Commissions         | `/commissions/new`                                                            |
| Community           | `/community`, `/community/create`, `/community/posts/[slug]`                  |
| Groups & challenges | `/community/groups`, `/community/challenges`                                  |
| Academy             | `/learn`, `/learn/classes/[slug]`, `/learn/tutors/[slug]`, `/learn/classroom` |
| Museum              | `/masters`, `/masters/artworks/[slug]`, `/masters/artists/[slug]`             |
| Shopping            | `/cart`, `/checkout`                                                          |
| Visitor             | `/favorites`, `/profile`, `/profile/activity`, `/about`                                            |

## Project structure

```text
src/
  app/                  App Router pages, metadata, loading/error states, theme
  components/
    layout/             Header, footer, mobile navigation
    shared/             Accessible dialogs, tabs, images, empty states, controls
    artwork/            Cards, directory, product details, cart and checkout
    artists/            Directory, profiles, reusable cards
    commissions/        Multi-step commission wizard
    community/          Feed, composer, comments, critique, groups, challenges
    academy/            Course cards, filters, tutor booking, classroom
    masters/            Museum, biographies, masterpiece viewer and hotspots
  context/              Hydration-safe browser-local demo state and feedback
  data/                 Typed, relational seed content
  lib/                  Search, filtering, matching, currency/date helpers
  types/                Shared domain interfaces
public/images/
  artworks/             16 original generated painting assets
  artists/              Local illustrative portrait photography
  banners/              Local studio/material photography
  masters/              Public-domain and CC0 historical reproductions
scripts/                Asset downloader and development screenshot helper
tests/                  Browser tests for complete user journeys and layouts
UXUI/                   Original supplied reference images, never embedded as UI
```

Seed data includes 20 artworks, eight contemporary artists, 18 studio posts, 36 comments, 10 critique annotations, eight classes, five tutors, eight masterpieces, seven historical artists, three challenges, and four groups. Every artwork, class, post, and historical work references an existing creator.

In addition to the eight fictional sample artists, `src/data/alpana-barthakur.ts` contains Alpana’s supplied artist profile and 14 portfolio paintings. `mainArtist` sets the primary profile used by the header and new local community contributions. Her supplied photographs are copied without alterations from `UXUI/painting/` into `public/images/artists/alpana-barthakur.png` and `public/images/artworks/alpana-barthakur/`. The latter directory includes a source manifest. Painting titles are descriptive browsing labels; no sale prices, ratings, experience claims, or collector reviews are invented for this portfolio. Filters and the enlarged viewer retain each complete photograph. Demo orders and bookings remain available through **Your activity**, at `/profile/activity`.

## Demo behavior and storage

This is frontend only. There is no backend, database, authentication, actual checkout, real calendar booking, video infrastructure, live communication, or AI service. Sample marketplace names, prices, reviews, and ratings are fictional; Alpana’s supplied profile is identified separately. Generated images illustrate the work of fictional artists. Historical names and museum records are separate, factual educational data.

`artora-demo-v1` in localStorage stores favorites, follows, likes, saved posts, cart, demo comments and annotations, post text metadata, commission draft/submission reference, bookings, and order references. Nothing is sent to anyone. Shipping fields are not stored. Clearing site data resets the demo. Storage failures keep the current session usable and show feedback.

Uploaded images use object URLs. They remain available across client navigation in the same tab, but are never saved in localStorage or uploaded. After a full reload, locally created posts keep their text and use a designed image placeholder. Commission reference photos must be reselected after a reload. Form copy explains this behavior.

Dates start from the reference brief's October 2026 demo period. Booking slots use explicitly labeled **Eastern Time** and the same predefined time choices for each selected sample date. Classroom chat, notes, and playback state last for that page session. Enrollment unlocks previews for that page session only. Orders contain a demo reference, total, and date; they are not fulfillment records.

## Image assets and credits

All runtime images are local. Marketplace paintings were generated with the built-in image generation tool; final assets are in `public/images/artworks/`. `public/images/generated-artwork-prompts.json` records the prompt set and filenames. Artwork used again in a course, studio post, portfolio, or clearly labeled print is the same referenced piece. Alternate gallery views demonstrate a detail crop and a framing treatment of that piece.

Apart from Alpana’s supplied portrait, sample artist portraits and studio photographs are illustrative images from [Unsplash](https://unsplash.com/license). `public/images/photo-sources.json` lists their download URLs. The people pictured are not actual Artora members or endorsers.

Museum reproductions use verified public-domain files from Wikimedia Commons and CC0 images from the Art Institute of Chicago. Exact rights/source links are in `src/data/masterpieces.ts` and on `/about#credits`. CC0 API metadata is retained in `public/images/open-access-sources.json`. The asset downloader checks the public-domain flag for Art Institute records. It is a development utility, not an application API.

Historical sources include the [Louvre Mona Lisa record](https://collections.louvre.fr/ark:/53355/cl010062370), [MoMA's Starry Night record](https://www.moma.org/collection/works/79802), [Mauritshuis's Girl with a Pearl Earring record](https://www.mauritshuis.nl/en/our-collection/artworks/670-girl-with-a-pearl-earring/), [Uffizi's Birth of Venus record](https://www.uffizi.it/en/artworks/birth-of-venus), and individual museum links in each dataset record. Interpretive hotspot text is written for the prototype. Leonardo's profile drawing is traditionally associated with a self-portrait; the identification is debated. Other historical profile illustrations are associated artworks and are labeled accordingly.

## Verification

With the development or production server running on port 3000:

```bash
npm run test:e2e
```

Tests use Chromium through Playwright. By default the configuration uses `/usr/bin/google-chrome` when available; otherwise install Playwright's browser with `npx playwright install chromium`. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use another local Chromium binary. Set `PLAYWRIGHT_BASE_URL` to test a server on another port.

The browser suite exercises every seed route and its images, search/filter/sort, persistent favorites/follows, image dialogs, print quantities, removal, demo checkout, commission upload/matching/submission, post creation, comments, feedback preferences, responsive annotation coordinates, Academy filtering, lesson previews, materials download, booking, classroom controls, museum hotspots and zoom, historical biography, mobile menu, and widths of 360, 390, 768, 1024, and 1440 pixels.

The route audit checks browser-console hydration warnings as well as uncaught JavaScript errors. `tests/hydration.spec.ts` also reproduces image styles being injected before React hydrates, checking both clean and modified page loads while preserving image dimming, gallery transforms, and frame previews.

The original MVP production verification passed 14 browser tests across 90 routes. Alpana’s profile additions additionally passed three production browser tests for profile navigation, discovery, gallery controls, and mobile layouts, plus four existing tests covering checkout, commissions, community posts, and lesson bookings. TypeScript and the production build passed. Homepage screenshot checks reported no JavaScript errors, broken images, or mobile horizontal overflow. Local screenshots are available in `artifacts/screenshots/`.

## Future integration

Domain interfaces in `src/types` are independent of browser persistence. Server route components resolve typed entities and pass them to reusable views. Replace seed imports with typed repository/query functions, then replace `DemoProvider` mutations with service-backed actions. Keep the existing forms, validators, presentation components, and matching/filtering helpers. Uploaded files can become storage references in the `Post.image` field once a real upload service is introduced. Add actual inventory, tax/shipping, timezone-aware scheduling, moderation, authentication, and authoritative transaction validation only when those services exist.

## Deferred

Optional AI concierge, AR room preview, kids drawing studio, artist dashboard, order fulfillment tracking, art-history quiz, and a separate timeline page are deferred. The museum already contains an interactive period strip and biography timelines. Real payments, authentication, server uploads, video calls, and external integrations are intentionally outside this frontend scope.
