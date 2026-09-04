import rss from '@astrojs/rss';
import { SITE } from '../site.config.ts';
import { getPosts } from '../lib/posts.ts';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/${p.id}/`,
      categories: [p.data.category],
    })),
    customData: `<language>en</language>`,
  });
}
