Morfu.club v16 - sitemap fix

Changes:
- Rebuilt sitemap.xml with proper XML sitemap structure, lastmod, changefreq and priority.
- Rebuilt robots.txt with explicit Sitemap line.
- Added Netlify _headers rules for sitemap.xml and robots.txt content types.
- Kept Google verification file: google193327849437e2ec.html.

After deploy:
1. Open https://morfu.club/sitemap.xml and confirm XML appears.
2. Open https://morfu.club/robots.txt and confirm Sitemap line appears.
3. In Google Search Console, remove old /sitemap.xml entry if needed and resubmit sitemap.xml.
