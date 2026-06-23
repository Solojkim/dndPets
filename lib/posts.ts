export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
};

export const POSTS: Post[] = [
  {
    slug: "what-dnd-class-is-your-dog",
    title: "What DnD Class Is Your Dog?",
    description: "Every dog has a class. Find out whether your pup is a noble Paladin, a chaotic Barbarian, or a mysterious Rogue — and what it says about them.",
    date: "2026-06-19",
    readingTime: "5 min read",
  },
  {
    slug: "how-ai-generates-dnd-pet-portraits",
    title: "How AI Generates DnD Pet Portraits",
    description: "A behind-the-scenes look at how we use AI image generation to transform your dog photo into a hyper-realistic fantasy portrait.",
    date: "2026-06-19",
    readingTime: "4 min read",
  },
  {
    slug: "best-photo-for-ai-pet-portrait",
    title: "How to Take the Perfect Photo for an AI Pet Portrait",
    description: "The quality of your input photo directly affects your portrait. Here's exactly what makes a great reference photo — and what to avoid.",
    date: "2026-06-19",
    readingTime: "4 min read",
  },
  {
    slug: "dnd-classes-explained-for-dog-owners",
    title: "Every DnD Class Explained for Dog Owners",
    description: "Never played DnD? No problem. Here's what each of the 8 classes actually means — explained through dog personalities.",
    date: "2026-06-19",
    readingTime: "6 min read",
  },
  {
    slug: "dog-breeds-and-dnd-classes",
    title: "Which DnD Class Fits Your Dog's Breed?",
    description: "Golden Retrievers are Paladins. Border Collies are Wizards. Chihuahuas are Rogues. A completely serious breakdown by breed.",
    date: "2026-06-19",
    readingTime: "5 min read",
  },
  {
    slug: "why-your-dog-deserves-a-fantasy-portrait",
    title: "Why Your Dog Deserves a Fantasy Portrait",
    description: "They protect the house. They comfort you on bad days. They'd absolutely take a sword for you. Your dog is already a hero — they just need the portrait to prove it.",
    date: "2026-06-19",
    readingTime: "3 min read",
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
