const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Debug: return available env vars (remove after testing)
  if (event.httpMethod === 'GET' && event.queryStringParameters && event.queryStringParameters.debug === '1') {
    const relevant = {};
    for (const [k, v] of Object.entries(process.env)) {
      if (k.includes('NETLIFY') || k.includes('SITE') || k.includes('BLOB') || k.includes('TOKEN')) {
        relevant[k] = v ? v.substring(0, 8) + '...' : null;
      }
    }
    return { statusCode: 200, headers, body: JSON.stringify(relevant) };
  }

  try {
    const { getStore } = require('@netlify/blobs');
    const store = getStore({
      name: 'blog-views',
      siteID: process.env.SITE_ID,
      token: process.env.BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN,
    });

    if (event.httpMethod === 'GET') {
      const slug = event.queryStringParameters && event.queryStringParameters.slug;
      if (!slug) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing slug' }) };
      }
      const count = (await store.get(slug)) || 0;
      return { statusCode: 200, headers, body: JSON.stringify({ slug, views: count }) };
    }

    if (event.httpMethod === 'POST') {
      const { slug } = JSON.parse(event.body || '{}');
      if (!slug) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing slug' }) };
      }
      const current = (await store.get(slug)) || 0;
      const next = current + 1;
      await store.set(slug, next);
      return { statusCode: 200, headers, body: JSON.stringify({ slug, views: next }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
