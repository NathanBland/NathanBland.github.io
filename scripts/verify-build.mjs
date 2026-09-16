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

const blogEntries = collectFiles(blogRoot, (path) => extname(path) === '.md').map((file) => {
  const contents = readFileSync(file, 'utf8')
  const match = contents.match(/^slug:\s*['"]?([^'"\r\n]+)['"]?\s*$/m)
  if (!match) throw new Error(`Missing slug frontmatter in ${file}`)
  return {
    slug: match[1],
    draft: /^draft:\s*true\s*$/m.test(contents)
  }
})

const blogSlugs = blogEntries.map((entry) => entry.slug)
const publishedSlugs = blogEntries.filter((entry) => !entry.draft).map((entry) => entry.slug)
const duplicateSlugs = blogSlugs.filter((slug, index) => blogSlugs.indexOf(slug) !== index)
const expectedRoutes = [
  '/',
  '/experience',
  '/nathan-bland-resume.pdf',
  '/blog',
  ...publishedSlugs.map((slug) => `/blog/${slug}`),
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

const missingLocalTargets = new Set()
const verifyLocalTarget = (href, file) => {
  if (!href.startsWith('/') || href.startsWith('//')) return
  const pathname = decodeURI(href.split(/[?#]/)[0])
  if (!routeCandidates(pathname).some((candidate) => existsSync(candidate))) {
    missingLocalTargets.add(`${href} (from ${file.replace(distRoot, '')})`)
  }
}

for (const file of files.filter((path) => ['.css', '.html'].includes(extname(path)))) {
  const contents = readFileSync(file, 'utf8')
  for (const match of contents.matchAll(/(?:href|src)="([^"]+)"/g)) {
    verifyLocalTarget(match[1], file)
  }
  for (const match of contents.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const href = candidate.trim().split(/\s+/)[0]
      if (href) verifyLocalTarget(href, file)
    }
  }
  for (const match of contents.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const href = match[1]
    if (!href.startsWith('/') || href.startsWith('//')) continue
    verifyLocalTarget(href, file)
  }
}

const clientScripts = files.filter(
  (path) => extname(path) === '.js' && !path.endsWith('/sw.js')
)

if (duplicateSlugs.length || missingRoutes.length || missingLocalTargets.size || clientScripts.length) {
  if (duplicateSlugs.length) console.error('Duplicate blog slugs:', duplicateSlugs)
  if (missingRoutes.length) console.error('Missing routes:', missingRoutes)
  if (missingLocalTargets.size) console.error('Broken local links or assets:', [...missingLocalTargets])
  if (clientScripts.length) console.error('Unexpected client JavaScript:', clientScripts)
  process.exitCode = 1
} else {
  console.log(`Verified ${expectedRoutes.length} routes and ${files.length} generated files with no page-loaded client JavaScript.`)
}
