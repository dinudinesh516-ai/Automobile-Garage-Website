/**
 * GET /api/reviews
 * ---------------------------------------------------------------------------
 * Fetches the latest rating, review count and reviews for the business from
 * the Google Places API (New) and returns a trimmed, cache-friendly payload.
 *
 * Why server-side? The API key stays secret, and Vercel's CDN caches the
 * response (see Cache-Control below) so Google is called only a few times a
 * day no matter how many visitors arrive — keeping usage inside the free tier.
 *
 * Env: GOOGLE_PLACES_API_KEY (required), GOOGLE_PLACE_ID (optional override)
 *
 * Note: Google returns at most 5 reviews per place, chosen by relevance.
 * We sort those by date so the newest appear first.
 */

const DEFAULT_PLACE_ID = 'ChIJ14jcSqpbqDsRzL-THQhBOOE'; // SMK Automobiles, Sundakkamuthur
const FIELDS = 'rating,userRatingCount,reviews,googleMapsUri';

// Cache at the edge for 6 h, then serve stale for up to a day while refreshing.
const CACHE_HEADER = 'public, s-maxage=21600, stale-while-revalidate=86400';

// Warm-instance memory cache (saves calls when the CDN misses on a warm lambda)
let memo = { at: 0, data: null };
const MEMO_TTL = 60 * 60 * 1000;

function shape(place) {
  const reviews = (place.reviews || [])
    .filter((r) => r.text?.text || r.originalText?.text)
    .map((r) => ({
      author: r.authorAttribution?.displayName || 'Google user',
      authorUrl: r.authorAttribution?.uri || null,
      photo: r.authorAttribution?.photoUri || null,
      rating: r.rating ?? 5,
      text: (r.text?.text || r.originalText?.text || '').trim(),
      relativeTime: r.relativePublishTimeDescription || '',
      publishTime: r.publishTime || null,
    }))
    .sort((a, b) => Date.parse(b.publishTime || 0) - Date.parse(a.publishTime || 0));

  return {
    ok: true,
    rating: place.rating ?? null,
    count: place.userRatingCount ?? null,
    url: place.googleMapsUri || null,
    reviews,
    fetchedAt: new Date().toISOString(),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;

  if (!key) {
    // Not an error for the UI — it simply falls back to bundled reviews.
    // (200 rather than 5xx so browsers don't log a console error.)
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    return res.status(200).json({ ok: false, configured: false });
  }

  if (memo.data && Date.now() - memo.at < MEMO_TTL) {
    res.setHeader('Cache-Control', CACHE_HEADER);
    return res.status(200).json(memo.data);
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': FIELDS,
      },
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new Error(`Places API ${response.status}: ${detail.slice(0, 300)}`);
    }

    const data = shape(await response.json());
    memo = { at: Date.now(), data };

    res.setHeader('Cache-Control', CACHE_HEADER);
    return res.status(200).json(data);
  } catch (err) {
    console.error('[reviews]', err.message);
    // Serve the last good copy if we have one
    if (memo.data) return res.status(200).json(memo.data);
    return res.status(502).json({ ok: false, error: 'Could not load reviews' });
  }
}
