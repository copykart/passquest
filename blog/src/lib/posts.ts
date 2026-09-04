import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

const isProd = import.meta.env.PROD;

/** All publishable posts, newest first. Drafts hidden in production. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) =>
    isProd ? data.draft !== true : true
  );
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getPostsByCategory(slug: string): Promise<Post[]> {
  return (await getPosts()).filter((p) => p.data.category === slug);
}

/** Reading time in minutes from raw markdown body. */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

/** Up to `limit` related posts: same category first, then newest others. */
export function relatedPosts(all: Post[], current: Post, limit = 3): Post[] {
  const sameCat = all.filter(
    (p) => p.id !== current.id && p.data.category === current.data.category
  );
  const rest = all.filter(
    (p) => p.id !== current.id && p.data.category !== current.data.category
  );
  return [...sameCat, ...rest].slice(0, limit);
}

/** Excerpt: use description (it's the meta description, always present). */
export function excerpt(post: Post): string {
  return post.data.description;
}
