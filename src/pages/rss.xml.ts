import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'
import { getPublishedPosts } from '../lib/posts'

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('The site URL must be configured to generate the RSS feed.')
  }

  const posts = await getPublishedPosts()

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.data.slug}`
    })),
    customData: '<language>en-us</language>'
  })
}
