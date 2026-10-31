import type { Masterpiece } from "@/types";
export const periods = [
  "Renaissance",
  "Baroque",
  "Rococo",
  "Romanticism",
  "Impressionism",
  "Post-Impressionism",
  "Modern Art",
  "Edo period",
];
export const masterpieces: Masterpiece[] = [
  {
    slug: "mona-lisa",
    title: "Mona Lisa",
    artist: "leonardo-da-vinci",
    image: "/images/masters/mona-lisa.jpg",
    date: "c. 1503–1519",
    period: "Renaissance",
    medium: "Oil on poplar panel",
    collection: "Musée du Louvre, Paris",
    dimensions: "77 × 53 cm",
    description:
      "A portrait generally identified as Lisa Gherardini, the wife of a Florentine merchant. Leonardo kept working on the painting over many years, exploring expression, light, and the relationship between the figure and the distant landscape.",
    importance:
      "Soft transitions and an elusive expression give the sitter a striking sense of life. The portrait rewards patient looking, with finely observed hands and an imagined landscape that recedes into atmospheric distance.",
    fact: "The painting is also known as La Gioconda.",
    source: "https://collections.louvre.fr/ark:/53355/cl010062370",
    imageSource: "https://commons.wikimedia.org/wiki/File:Mona_Lisa.jpg",
    license: "Public domain · Wikimedia Commons, faithful reproduction",
    hotspots: [
      {
        title: "The enigmatic smile",
        x: 48,
        y: 29,
        text: "Soft transitions at the corners of the mouth make the expression difficult to pin down. Notice how it seems to shift as your attention moves.",
      },
      {
        title: "Sfumato technique",
        x: 39,
        y: 25,
        text: "Leonardo softened edges with subtle gradations of tone. The effect, called sfumato, avoids hard outlines and helps the face appear rounded and alive.",
      },
      {
        title: "Hands and pose",
        x: 47,
        y: 82,
        text: "The relaxed, overlapping hands anchor the composition. The figure turns gently toward the viewer, giving the portrait a quiet sense of movement.",
      },
      {
        title: "Atmospheric perspective",
        x: 83,
        y: 21,
        text: "The landscape becomes bluer and less distinct in the distance. This use of atmospheric perspective creates a feeling of extraordinary depth.",
      },
    ],
  },
  {
    slug: "the-starry-night",
    title: "The Starry Night",
    artist: "vincent-van-gogh",
    image: "/images/masters/starry-night.jpg",
    date: "1889",
    period: "Post-Impressionism",
    medium: "Oil on canvas",
    collection: "The Museum of Modern Art, New York",
    dimensions: "73.7 × 92.1 cm",
    description:
      "Painted at Saint-Rémy, this night landscape combines observation with an expressive transformation of the sky, hills, and village.",
    importance:
      "Rhythmic brushstrokes and strong contrasts make the sky seem to move. The scene expresses more than a literal record of the view.",
    fact: "Van Gogh painted the work while staying at the asylum of Saint-Paul-de-Mausole.",
    source: "https://www.moma.org/collection/works/79802",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    license: "Public domain · Wikimedia Commons",
    hotspots: [
      {
        title: "A sky in motion",
        x: 50,
        y: 30,
        text: "Curving bands of paint connect the stars and clouds into a powerful visual rhythm.",
      },
      {
        title: "The cypress",
        x: 17,
        y: 52,
        text: "The dark vertical tree connects the foreground to the luminous sky.",
      },
    ],
  },
  {
    slug: "girl-with-a-pearl-earring",
    title: "Girl with a Pearl Earring",
    artist: "johannes-vermeer",
    image: "/images/masters/pearl-earring.jpg",
    date: "c. 1665",
    period: "Baroque",
    medium: "Oil on canvas",
    collection: "Mauritshuis, The Hague",
    dimensions: "44.5 × 39 cm",
    description:
      "A young figure turns toward the viewer against a dark background. The painting is a tronie, a study of a character or expression, rather than an identified commissioned portrait.",
    importance:
      "Luminous skin, a few bright highlights, and an economical description of the earring make the figure feel immediately present.",
    fact: "The work is a tronie, a Dutch term for a character study.",
    source:
      "https://www.mauritshuis.nl/en/our-collection/artworks/670-girl-with-a-pearl-earring/",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Meisje_met_de_parel.jpg",
    license: "Public domain · Wikimedia Commons",
    hotspots: [
      {
        title: "A few points of light",
        x: 62,
        y: 63,
        text: "Small highlights suggest the earring without describing a complete outline.",
      },
      {
        title: "The turning pose",
        x: 46,
        y: 39,
        text: "The figure looks back over her shoulder, creating an impression of a moment interrupted.",
      },
    ],
  },
  {
    slug: "the-night-watch",
    title: "The Night Watch",
    artist: "rembrandt-van-rijn",
    image: "/images/masters/night-watch.jpg",
    date: "1642",
    period: "Baroque",
    medium: "Oil on canvas",
    collection: "Rijksmuseum, Amsterdam",
    dimensions: "379.5 × 453.5 cm",
    description:
      "A militia company appears to be preparing to move. Rembrandt transformed the conventions of a formal group portrait through motion, varied poses, and dramatic illumination.",
    importance:
      "Light directs the eye through a lively assembly of figures rather than an orderly row of sitters.",
    fact: "Despite its familiar title, the scene is not a nighttime view.",
    source: "https://www.rijksmuseum.nl/en/collection/SK-C-5",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:The_Nightwatch_by_Rembrandt_-_Rijksmuseum.jpg",
    license: "Public domain · Wikimedia Commons",
    hotspots: [
      {
        title: "Directing the eye",
        x: 53,
        y: 54,
        text: "The brightly lit central figures emerge from a complex arrangement of darker forms.",
      },
    ],
  },
  {
    slug: "water-lilies",
    title: "Water Lilies",
    artist: "claude-monet",
    image: "/images/masters/water-lilies.jpg",
    date: "1906",
    period: "Impressionism",
    medium: "Oil on canvas",
    collection: "Art Institute of Chicago",
    dimensions: "89.9 × 94.1 cm",
    description:
      "Floating leaves and reflections fill the surface of the pond at Giverny. Without a horizon, the viewer looks into a space made of water, light, and reflected sky.",
    importance:
      "The painting draws attention to color and surface, letting the pond become an immersive field of marks.",
    fact: "Monet cultivated the water garden that inspired this series.",
    source: "https://www.artic.edu/artworks/16568/water-lilies",
    imageSource: "https://www.artic.edu/artworks/16568/water-lilies",
    license: "CC0 · Art Institute of Chicago Open Access",
    hotspots: [
      {
        title: "Reflected color",
        x: 42,
        y: 40,
        text: "Touches of different colors suggest both the water surface and the world reflected in it.",
      },
    ],
  },
  {
    slug: "the-great-wave",
    title: "The Great Wave off Kanagawa",
    artist: "katsushika-hokusai",
    image: "/images/masters/great-wave.jpg",
    date: "c. 1830–1832",
    period: "Edo period",
    medium: "Polychrome woodblock print",
    collection: "Impressions held in multiple museum collections",
    dimensions: "Approximately 25 × 37 cm; varies by impression",
    description:
      "An immense wave curves over boats while Mount Fuji appears small in the distance. This woodblock print belongs to the series Thirty-six Views of Mount Fuji.",
    importance:
      "The composition plays with scale, rhythm, and the contrast between human effort and natural force.",
    fact: "The Great Wave is a print, so multiple historical impressions survive.",
    source: "https://www.metmuseum.org/art/collection/search/45434",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:The_Great_Wave_off_Kanagawa.jpg",
    license: "Public domain · Wikimedia Commons",
    hotspots: [
      {
        title: "A mountain in the distance",
        x: 65,
        y: 69,
        text: "The small triangle of Mount Fuji echoes shapes within the wave and anchors the distant view.",
      },
    ],
  },
  {
    slug: "the-birth-of-venus",
    title: "The Birth of Venus",
    artist: "sandro-botticelli",
    image: "/images/masters/birth-of-venus.jpg",
    date: "c. 1485",
    period: "Renaissance",
    medium: "Tempera on canvas",
    collection: "Uffizi Galleries, Florence",
    dimensions: "172.5 × 278.5 cm",
    description:
      "Venus arrives at the shore on a shell, carried by winds and received by a figure holding a flowered cloak. The scene draws on classical mythology.",
    importance:
      "Flowing contours and graceful poses create a poetic vision of beauty rather than a strictly naturalistic space.",
    fact: "The painting shows the arrival of Venus at the shore, following her birth.",
    source: "https://www.uffizi.it/en/artworks/birth-of-venus",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    license: "Public domain · Wikimedia Commons",
    hotspots: [
      {
        title: "The rhythm of line",
        x: 50,
        y: 41,
        text: "Hair, fabric, and the outlines of the figures share a flowing linear rhythm.",
      },
    ],
  },
  {
    slug: "the-bedroom",
    title: "The Bedroom",
    artist: "vincent-van-gogh",
    image: "/images/masters/bedroom.jpg",
    date: "1889",
    period: "Post-Impressionism",
    medium: "Oil on canvas",
    collection: "Art Institute of Chicago",
    dimensions: "73.6 × 92.3 cm",
    description:
      "A view of Van Gogh’s bedroom in the Yellow House at Arles. This is one of three painted versions of the room.",
    importance:
      "Strong outlines, flat areas of color, and an unusual perspective turn an intimate room into a vivid expression of place.",
    fact: "The Art Institute painting is the second of three versions.",
    source: "https://www.artic.edu/artworks/28560/the-bedroom",
    imageSource: "https://www.artic.edu/artworks/28560/the-bedroom",
    license: "CC0 · Art Institute of Chicago Open Access",
    hotspots: [
      {
        title: "An expressive room",
        x: 58,
        y: 60,
        text: "The tilted perspective and bold outlines make the room feel both intimate and visually animated.",
      },
    ],
  },
];
