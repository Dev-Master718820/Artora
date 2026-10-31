import type { HistoricalArtist } from "@/types";
export const historicalArtists: HistoricalArtist[] = [
  {
    slug: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    years: "1452–1519",
    movement: "Renaissance",
    location: "Vinci, Italy",
    image: "/images/masters/leonardo.jpg",
    bio: "Leonardo was a painter, draftsman, and investigator of nature. His surviving paintings and notebooks connect close observation with an extraordinary curiosity about the human body, light, and the physical world.",
    technique:
      "Sfumato softens transitions between light and shade. Careful observation and thin layers of paint bring a remarkable sense of life to his portraits.",
    influence:
      "His experiments with perspective, anatomy, and expression helped shape Renaissance painting and continue to inspire artists today.",
    timeline: [
      { year: "1452", text: "Born in Vinci, near Florence." },
      {
        year: "1460s",
        text: "Trained in the Florentine workshop of Andrea del Verrocchio.",
      },
      {
        year: "1482",
        text: "Moved to Milan and worked at the court of Ludovico Sforza.",
      },
      { year: "1495–1498", text: "Painted The Last Supper in Milan." },
      {
        year: "c. 1503",
        text: "Began the portrait now known as the Mona Lisa.",
      },
      { year: "1516", text: "Moved to France at the invitation of Francis I." },
      { year: "1519", text: "Died at Cloux, near Amboise." },
    ],
    source: "https://www.metmuseum.org/essays/leonardo-da-vinci-1452-1519",
  },
  {
    slug: "vincent-van-gogh",
    name: "Vincent van Gogh",
    years: "1853–1890",
    movement: "Post-Impressionism",
    location: "Zundert, Netherlands",
    image: "/images/masters/starry-night.jpg",
    bio: "A Dutch painter whose expressive brushwork and intense color transformed familiar subjects into deeply personal images. In a brief career, he created landscapes, portraits, and still lifes with an unmistakable visual rhythm.",
    technique:
      "Directional brushstrokes and contrasting colors give his paintings energy and emotional intensity.",
    influence:
      "His approach to color and mark-making influenced Expressionism and generations of modern painters.",
    timeline: [
      { year: "1853", text: "Born in Zundert in the Netherlands." },
      {
        year: "1886",
        text: "Moved to Paris, encountering Impressionism and new ideas about color.",
      },
      { year: "1888", text: "Settled in Arles in the south of France." },
      { year: "1889", text: "Painted The Starry Night at Saint-Rémy." },
      { year: "1890", text: "Died in Auvers-sur-Oise." },
    ],
    source:
      "https://www.vangoghmuseum.nl/en/art-and-stories/vincents-life-1853-1890",
  },
  {
    slug: "johannes-vermeer",
    name: "Johannes Vermeer",
    years: "1632–1675",
    movement: "Baroque",
    location: "Delft, Netherlands",
    image: "/images/masters/pearl-earring.jpg",
    bio: "Vermeer worked in Delft, painting carefully composed interiors and figures shaped by light. His small surviving body of work invites patient looking at ordinary moments.",
    technique:
      "Subtle tonal relationships, luminous highlights, and measured composition create a quiet sense of presence.",
    influence:
      "His paintings remain touchstones for artists exploring domestic life and natural light.",
    timeline: [
      { year: "1632", text: "Born in Delft." },
      { year: "1653", text: "Joined the Delft Guild of Saint Luke." },
      { year: "c. 1665", text: "Painted Girl with a Pearl Earring." },
      { year: "1675", text: "Died in Delft." },
    ],
    source:
      "https://www.mauritshuis.nl/en/our-collection/artists/johannes-vermeer/",
  },
  {
    slug: "rembrandt-van-rijn",
    name: "Rembrandt van Rijn",
    years: "1606–1669",
    movement: "Baroque",
    location: "Leiden, Netherlands",
    image: "/images/masters/night-watch.jpg",
    bio: "Rembrandt was a Dutch painter, printmaker, and draftsman known for expressive portraits and ambitious narrative scenes. His treatment of light brings emotional depth to his subjects.",
    technique:
      "Dramatic contrasts of light and shadow combine with varied, tactile paint surfaces.",
    influence:
      "His portraits and prints have influenced artists through their psychological insight and material freedom.",
    timeline: [
      { year: "1606", text: "Born in Leiden." },
      { year: "1631", text: "Moved to Amsterdam." },
      {
        year: "1642",
        text: "Completed the painting known as The Night Watch.",
      },
      { year: "1669", text: "Died in Amsterdam." },
    ],
    source:
      "https://www.rijksmuseum.nl/en/rijksstudio/artists/rembrandt-van-rijn",
  },
  {
    slug: "claude-monet",
    name: "Claude Monet",
    years: "1840–1926",
    movement: "Impressionism",
    location: "Paris, France",
    image: "/images/masters/water-lilies.jpg",
    bio: "Monet explored changing light through repeated studies of landscapes, gardens, and water. His garden at Giverny became the subject of an extensive series of water-lily paintings.",
    technique:
      "Broken touches of color and shifting edges convey the experience of light rather than precise outlines.",
    influence:
      "His late paintings encouraged new ways of thinking about surface, scale, and abstraction.",
    timeline: [
      { year: "1840", text: "Born in Paris." },
      {
        year: "1874",
        text: "Exhibited in the first Impressionist exhibition.",
      },
      { year: "1883", text: "Moved to Giverny." },
      {
        year: "1906",
        text: "Painted the Water Lilies work in the Art Institute collection.",
      },
      { year: "1926", text: "Died at Giverny." },
    ],
    source: "https://www.artic.edu/artists/35809/claude-monet",
  },
  {
    slug: "katsushika-hokusai",
    name: "Katsushika Hokusai",
    years: "1760–1849",
    movement: "Edo period",
    location: "Edo, Japan",
    image: "/images/masters/great-wave.jpg",
    bio: "Hokusai was a Japanese artist and print designer whose work ranges from illustrated books to landscape prints. His Thirty-six Views of Mount Fuji includes The Great Wave off Kanagawa.",
    technique:
      "Clear contours, inventive viewpoints, and carefully organized color turn natural forms into memorable compositions.",
    influence:
      "His prints circulated internationally and influenced many European artists in the nineteenth century.",
    timeline: [
      { year: "1760", text: "Born in Edo, now Tokyo." },
      {
        year: "c. 1830–1832",
        text: "Produced the series Thirty-six Views of Mount Fuji.",
      },
      { year: "1849", text: "Died in Edo." },
    ],
    source: "https://www.metmuseum.org/art/collection/search/45434",
  },
  {
    slug: "sandro-botticelli",
    name: "Sandro Botticelli",
    years: "c. 1445–1510",
    movement: "Renaissance",
    location: "Florence, Italy",
    image: "/images/masters/birth-of-venus.jpg",
    bio: "Botticelli was a Florentine Renaissance painter whose graceful figures and flowing contours shaped enduring images of classical mythology and religious subjects.",
    technique:
      "Rhythmic line, elegant silhouettes, and decorative detail give his paintings a distinctive poetic character.",
    influence:
      "The Birth of Venus became a widely recognized expression of Renaissance engagement with classical culture.",
    timeline: [
      { year: "c. 1445", text: "Born in Florence." },
      { year: "1481–1482", text: "Worked on frescoes in the Sistine Chapel." },
      { year: "c. 1485", text: "Painted The Birth of Venus." },
      { year: "1510", text: "Died in Florence." },
    ],
    source: "https://www.uffizi.it/en/artworks/birth-of-venus",
  },
];
