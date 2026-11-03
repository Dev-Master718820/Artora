import type { Artist, PortfolioPainting } from "@/types";

// Descriptive display labels for the supplied photographs, not official titles.
export const alpanaPaintings: PortfolioPainting[] = [
  {
    slug: "bird-in-flight",
    title: "Bird in Flight",
    category: "Birds & animals",
    description:
      "An orange and yellow bird opens its wings against a pale blue sky, beside a flowering branch.",
  },
  {
    slug: "a-walk-in-the-rain",
    title: "A Walk in the Rain",
    category: "People & everyday life",
    description:
      "A figure in a red dress carries an umbrella along a blue path beneath autumn-colored trees.",
  },
  {
    slug: "sunset-companions",
    title: "Sunset Companions",
    category: "People & everyday life",
    description:
      "Two silhouetted figures in patterned blue and green clothing walk beneath a warm red and yellow sunset.",
  },
  {
    slug: "blue-fish",
    title: "Blue Fish",
    category: "Birds & animals",
    description:
      "A striped blue fish swims among a playful arrangement of blue bubbles.",
  },
  {
    slug: "kingfisher-by-the-water",
    title: "Kingfisher by the Water",
    category: "Birds & animals",
    description:
      "A blue and orange kingfisher rests on a branch above softly colored water and reeds.",
  },
  {
    slug: "women-in-white",
    title: "Women in White",
    category: "People & everyday life",
    description:
      "Two figures in white dresses balance vessels against a vivid red, orange, and yellow background.",
  },
  {
    slug: "the-walk-home",
    title: "The Walk Home",
    category: "People & everyday life",
    description:
      "Two figures in orange and pink carry baskets and vessels through a warmly colored scene.",
  },
  {
    slug: "quiet-canal",
    title: "Quiet Canal",
    category: "Landscapes & nature",
    description:
      "A long waterway recedes between rows of trees toward a pale sun and distant birds.",
  },
  {
    slug: "above-the-meadow",
    title: "Above the Meadow",
    category: "Landscapes & nature",
    description:
      "Colorful hot-air balloons drift over a green meadow beneath a textured blue sky.",
  },
  {
    slug: "green-horizons",
    title: "Green Horizons",
    category: "Landscapes & nature",
    description:
      "A bright blue waterway leads toward distant green hills, with trees lining both banks.",
  },
  {
    slug: "little-farm",
    title: "Little Farm",
    category: "Landscapes & nature",
    description:
      "A red farmhouse, evergreen trees, and a flock of sheep form a cheerful pastoral scene.",
  },
  {
    slug: "wildflower-meadow",
    title: "Wildflower Meadow",
    category: "Landscapes & nature",
    description:
      "Expressive green strokes surround small, colorful flowers in a lively meadow study.",
  },
  {
    slug: "woodland-bird",
    title: "Woodland Bird",
    category: "Birds & animals",
    description:
      "A small red, white, and gray bird clings to a diagonal tree trunk against a green and blue background.",
  },
  {
    slug: "under-the-red-sky",
    title: "Under the Red Sky",
    category: "People & everyday life",
    description:
      "Two figures stand beneath branches and an umbrella, surrounded by glowing orange and red color.",
  },
].map((painting) => ({
  ...painting,
  image: `/images/artworks/alpana-barthakur/${painting.slug}.jpg`,
}));

export const alpanaBarthakur: Artist = {
  slug: "alpana-barthakur",
  name: "Alpana Barthakur",
  image: "/images/artists/alpana-barthakur.png",
  location: "Hillsborough, New Jersey",
  specialties: ["Nature", "Landscape", "Animals"],
  styles: ["Figurative", "Illustrative"],
  mediums: [],
  bio: "Alpana Barthakur is an artist based in Hillsborough, New Jersey. Her paintings explore birds, landscapes, and scenes of everyday life through expressive color, patterned details, and a close attention to the natural world.",
  available: false,
  teaching: false,
  suppliedPortfolio: true,
  coverImage: "/images/artworks/alpana-barthakur/green-horizons.jpg",
  portfolio: alpanaPaintings,
};

export const mainArtist = alpanaBarthakur;
