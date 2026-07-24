import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const distRoot = fileURLToPath(new URL('../dist/', import.meta.url))
const blogRoot = fileURLToPath(new URL('../src/content/blog/', import.meta.url))

const collectFiles = (directory, predicate = () => true) => {
  const files = []
  const visit = (currentDirectory) => {
    for (const entry of readdirSync(currentDirectory, { withFileTypes: true })) {
      const path = join(currentDirectory, entry.name)
      if (entry.isDirectory()) visit(path)
      else if (predicate(path)) files.push(path)
    }
  }
  visit(directory)
  return files
}

const blogSlugs = collectFiles(blogRoot, (path) => extname(path) === '.md').map((file) => {
  const match = readFileSync(file, 'utf8').match(/^slug:\s*['"]?([^'"\r\n]+)['"]?\s*$/m)
  if (!match) throw new Error(`Missing slug frontmatter in ${file}`)
  return match[1]
})

const duplicateSlugs = blogSlugs.filter((slug, index) => blogSlugs.indexOf(slug) !== index)
const expectedRoutes = [
  '/',
  '/blog',
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  '/404.html',
  '/rss.xml',
  '/sitemap.xml'
]

const routeCandidates = (pathname) => {
  const relative = pathname.replace(/^\//, '')
  if (!relative) return [join(distRoot, 'index.html')]
  return [
    join(distRoot, relative),
    join(distRoot, relative, 'index.html'),
    join(distRoot, `${relative}.html`)
  ]
}

const missingRoutes = expectedRoutes.filter(
  (route) => !routeCandidates(route).some((candidate) => existsSync(candidate))
)

const files = collectFiles(distRoot)

const missingLinks = new Set()
for (const file of files.filter((path) => extname(path) === '.html')) {
  const html = readFileSync(file, 'utf8')
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1]
    if (!href.startsWith('/') || href.startsWith('//')) continue
    const pathname = decodeURI(href.split(/[?#]/)[0])
    if (!routeCandidates(pathname).some((candidate) => existsSync(candidate))) {
      missingLinks.add(`${href} (from ${file.replace(distRoot, '')})`)
    }
  }
}

const clientScripts = files.filter(
  (path) => extname(path) === '.js' && !path.endsWith('/sw.js')
)

if (duplicateSlugs.length || missingRoutes.length || missingLinks.size || clientScripts.length) {
  if (duplicateSlugs.length) console.error('Duplicate blog slugs:', duplicateSlugs)
  if (missingRoutes.length) console.error('Missing routes:', missingRoutes)
  if (missingLinks.size) console.error('Broken local links:', [...missingLinks])
  if (clientScripts.length) console.error('Unexpected client JavaScript:', clientScripts)
  process.exitCode = 1
} else {
  console.log(`Verified ${expectedRoutes.length} routes and ${files.length} generated files with no page-loaded client JavaScript.`)
}
