MORFU.CLUB v41 — GOOGLE SEARCH CONSOLE READINESS

Implemented:
- Added sitemap-index.xml that references the page sitemap and image sitemap.
- Updated robots.txt to expose the sitemap index.
- Preserved the existing Google HTML verification file.
- Added sitemap discovery metadata to HTML pages.
- Added noindex directives for thank-you and 404 pages.
- Added cache headers for sitemap-index.xml.

After deployment:
1. Open Google Search Console.
2. Add a Domain property for morfu.club.
3. Verify through the Cloudflare DNS TXT method if Google requests it. The existing HTML verification file may also verify a URL-prefix property.
4. Submit: https://morfu.club/sitemap-index.xml
5. Inspect and request indexing for:
   https://morfu.club/
   https://morfu.club/books
   https://morfu.club/discover
   https://morfu.club/octopus-facts-for-kids
6. Review Pages and Core Web Vitals after Google has collected data.

No analytics or tracking scripts were added in this release.
