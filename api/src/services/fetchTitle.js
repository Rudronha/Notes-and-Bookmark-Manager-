import fetch from 'node-fetch';

export async function fetchTitle(url) {
  try {
    const html = await fetch(url, { timeout: 5000 }).then(r => r.text());
    const match = html.match(/<title>(.*?)<\/title>/i);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}
