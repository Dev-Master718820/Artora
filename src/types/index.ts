export interface Artist {
  slug: string;
  name: string;
  image: string;
  location: string;
  specialties: string[];
  styles: string[];
  mediums: string[];
  bio: string;
  experience?: number;
  available: boolean;
  teaching: boolean;
  minimum?: number;
  rating?: number;
  suppliedPortfolio?: boolean;
  coverImage?: string;
  portfolio?: PortfolioPainting[];
}
export interface PortfolioPainting {
  slug: string;
  title: string;
  image: string;
  category: string;
  description: string;
}
export interface Artwork {
  slug: string;
  title: string;
  artist: string;
  image: string;
  price: number;
  category: string;
  medium: string;
  style: string;
  width: number;
  height: number;
  description: string;
  tags: string[];
  featured?: boolean;
  print?: boolean;
}
export interface Post {
  slug: string;
  title: string;
  artist: string;
  image: string;
  description: string;
  category: string;
  medium: string;
  tags: string[];
  feedback: string;
  likes: number;
  createdAt: string;
  sessionImage?: boolean;
}
export interface Comment {
  id: string;
  post: string;
  artist: string;
  text: string;
  createdAt: string;
}
export interface Annotation {
  id: string;
  post: string;
  x: number;
  y: number;
  category: string;
  text: string;
  artist: string;
}
export interface Course {
  slug: string;
  title: string;
  tutor: string;
  image: string;
  price: number;
  level: string;
  format: string;
  category: string;
  duration: string;
  rating: number;
  description: string;
  lessons: string[];
}
export interface HistoricalArtist {
  slug: string;
  name: string;
  years: string;
  movement: string;
  location: string;
  image: string;
  bio: string;
  technique: string;
  influence: string;
  timeline: { year: string; text: string }[];
  source: string;
}
export interface Masterpiece {
  slug: string;
  title: string;
  artist: string;
  image: string;
  date: string;
  period: string;
  medium: string;
  collection: string;
  dimensions: string;
  description: string;
  importance: string;
  fact: string;
  source: string;
  imageSource: string;
  license: string;
  hotspots: { title: string; x: number; y: number; text: string }[];
}
export interface CartItem {
  slug: string;
  quantity: number;
}
export interface CommissionDraft {
  submittedId?: string;
  subject: string;
  description: string;
  instructions: string;
  style: string;
  medium: string;
  size: string;
  color: string;
  budget: number;
  deadline: string;
  artist: string;
}
export interface DemoState {
  favorites: string[];
  follows: string[];
  likes: string[];
  saved: string[];
  cart: CartItem[];
  comments: Comment[];
  posts: Post[];
  annotations: Annotation[];
  commission: CommissionDraft;
  bookings: {
    id: string;
    tutor: string;
    date: string;
    time: string;
    duration: number;
    type: string;
    price: number;
  }[];
  orders: { id: string; total: number; createdAt: string }[];
}
