import type { Post, Comment, Annotation } from "@/types";
import { artworks } from "./artworks";
export const postCategories = [
  "Finished Painting",
  "Work in Progress",
  "Sketch",
  "Digital Art",
  "Tutorial",
  "Feedback Request",
];
export const feedbackOptions = [
  "Constructive critique",
  "General comments",
  "Technical feedback",
  "Encouragement only",
  "No critique requested",
];
const titles = [
  "Chasing the last light",
  "A quiet corner of the coast",
  "Finding her in the flowers",
  "A little joy for your feed",
  "My favorite studio companion",
  "Learning to let the water lead",
  "An afternoon worth remembering",
  "The garden is waking up",
  "Between the sea and the sky",
  "Flowers from the farmers market",
  "A study in slowing down",
  "A place I keep coming back to",
  "Color without a plan",
  "Light on the mountains",
  "My weekend sketchbook",
  "A small botanical experiment",
  "Portrait practice, day twelve",
  "That golden-hour feeling",
];
const captions = [
  "One last layer before I put the brushes down. I kept the shadows cool to let the warm light sing. What do you think of the balance?",
  "A little escape to the coast, without leaving the studio. I have been working on keeping the water reflections loose and full of movement.",
  "A new direction: letting the flowers become part of the portrait. I would love your thoughts on the balance between the face and the background.",
  "Some days you just need to paint something that makes you smile. These flowers from the market were exactly that.",
  "This familiar face kept me company while I worked. The trickiest part was suggesting the fur without painting every single hair.",
  "Trying to leave more of the paper untouched in this watercolor. The river appeared almost by itself once I stopped fussing with the edges.",
  "An empty chair, a little shade, and a very slow afternoon. I wanted to paint the feeling of having nowhere else to be.",
  "The hollyhocks are taller than I am now. A quick garden study before the light moved, with a few happy accidental blooms.",
  "A study of big spaces and small marks. Would love a fresh perspective on the relationship between the sea and the far shoreline.",
  "I bought these peonies to paint, then nearly left them on the kitchen table instead. A little terracotta and soft pink felt like the right palette.",
  "A blue jug and three pears, because sometimes that is enough of a starting point. Trying to make each edge do a little less work.",
  "This open countryside has been living in my sketchbook for months. Today I finally found the colors that felt like the memory.",
  "No reference today, just shapes and a small palette. I kept turning the paper until the composition started to feel balanced.",
  "Exploring how this mountain painting translates into a small print. It is interesting which details still carry the feeling at this scale.",
  "A coastal color study from the weekend. I simplified the buildings and let the warm reflections do most of the storytelling.",
  "Playing with a smaller botanical composition. I am curious whether the sage leaves give the brighter flowers enough breathing room.",
  "Day twelve of my portrait practice. Focusing on the eyes and leaving the drawing edges unfinished rather than trying to resolve everything.",
  "A little golden-hour company. This print study is all about keeping the warmth in the face without losing those cooler sea colors.",
];
export const posts: Post[] = titles.map((title, i) => ({
  slug:
    [
      "chasing-the-last-light",
      "a-quiet-corner-of-the-coast",
      "finding-her-in-the-flowers",
    ][i] || "studio-notes-" + (i + 1),
  title,
  artist: artworks[i].artist,
  image: artworks[i].image,
  description: captions[i],
  category: postCategories[i % 6],
  medium: artworks[i].medium,
  tags: [artworks[i].category.toLowerCase(), "painting", "studiostories"],
  feedback: i % 5 === 4 ? "Encouragement only" : "Constructive critique",
  likes: [342, 218, 186, 298, 174, 102][i % 6],
  createdAt: new Date(Date.UTC(2026, 9, 30, 14 - i)).toISOString(),
}));
const texts = [
  "The warm highlights against those cool blues make this feel wonderfully alive.",
  "Your brushwork has so much energy. I keep finding new little details.",
  "Consider simplifying the far background to give the main subject more breathing room.",
  "The transitions in the sky are lovely. What palette did you use?",
  "A slightly deeper shadow near the focal point could make the light even stronger.",
  "This reminds me to take more time just looking before I start painting. Beautiful study.",
];
const names = [
  "daniel-brooks",
  "sophie-morgan",
  "olivia-bennett",
  "james-cooper",
  "emma-carter",
];
export const comments: Comment[] = Array.from({ length: 36 }, (_, i) => ({
  id: "seed-comment-" + i,
  post: posts[i % 18].slug,
  artist: names[i % 5],
  text: texts[i % 6],
  createdAt: "2026-10-30T12:00:00.000Z",
}));
export const critiqueCategories = [
  "Composition",
  "Color",
  "Lighting",
  "Perspective",
  "Proportions",
  "Texture",
  "Brushwork",
  "Technique",
];
export const annotations: Annotation[] = Array.from({ length: 10 }, (_, i) => ({
  id: "seed-annotation-" + i,
  post: posts[i < 3 ? 0 : i % 4].slug,
  x: [67, 32, 54, 20, 78][i % 5],
  y: [24, 57, 75, 41, 61][i % 5],
  category: critiqueCategories[i % 8],
  text: texts[i % 6],
  artist: names[i % 5],
}));
