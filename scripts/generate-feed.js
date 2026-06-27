import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve, join, extname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter');

const __dirname = resolve(fileURLToPath(import.meta.url), '..');
const root = resolve(__dirname, '..');
const postsDir = join(root, 'src', 'posts');
const publicDir = join(root, 'public');

const envPath = join(root, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const t = line.trim();
    if (t && !t.startsWith('#') && t.includes('=')) {
      const idx = t.indexOf('=');
      let val = t.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
      process.env[t.slice(0, idx).trim()] = val;
    }
  }
}

const siteUrl = (process.env.VITE_SITE_URL || 'https://karllouiserito.netlify.app').replace(/\/+$/, '');
const siteTitle = 'Karl Louise Rito';
const siteDescription = 'Technical articles and tutorials by Karl Louise Rito, a full-stack web developer.';
const blogUrl = `${siteUrl}/blog`;

const files = readdirSync(postsDir).filter(f => extname(f) === '.md');

const posts = files
  .map(file => matter(readFileSync(join(postsDir, file), 'utf-8')).data)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const items = posts
  .map(
    post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${blogUrl}/${post.slug}</link>
      <guid isPermaLink="true">${blogUrl}/${post.slug}</guid>
      <description><![CDATA[${post.description || ''}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>${post.author || 'Karl Rito'}</dc:creator>
      ${post.category ? `<category>${post.category}</category>` : ''}
    </item>`
  )
  .join('\n');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${siteTitle}</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

writeFileSync(join(publicDir, 'feed.xml'), feed.trim());
console.log(`✓ RSS feed generated — ${posts.length} post(s) at ${siteUrl}/feed.xml`);
