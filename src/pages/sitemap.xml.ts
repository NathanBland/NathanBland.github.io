import type { APIRoute } from 'astro'
import { getPublishedPosts } from '../lib/posts'

const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export const GET = (async ({ site }) => {
  if (!site) {
    throw new Error('The site URL must be configured to generate the sitemap.')
  }

  const posts = await getPublishedPosts()
  const routes = ['/', '/blog', ...posts.map((post) => `/blog/${post.data.slug}`)]
  const urls = routes
    .map((route) => `<url><loc>${escapeXml(new URL(route, site).href)}</loc></url>`)
    .join('')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  )
}) satisfies APIRoute
