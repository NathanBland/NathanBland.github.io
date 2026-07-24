import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://nathanbland.dev',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
})
