import { useEffect, useState } from 'react';
import { business, reviews as fallbackReviews } from '../data/business';

const FALLBACK = {
  live: false,
  rating: business.rating.value,
  count: business.rating.count,
  reviews: fallbackReviews,
};

/**
 * Loads live Google reviews from /api/reviews. While loading, `loading` is
 * true; on any failure (no API key, network, quota) it quietly falls back to
 * the bundled reviews in business.js so the section never looks broken.
 */
export default function useGoogleReviews(limit = 3) {
  const [state, setState] = useState({ ...FALLBACK, loading: true });

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/reviews', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (!data.ok || !data.reviews?.length) throw new Error('No reviews');
        setState({
          live: true,
          loading: false,
          rating: data.rating ?? FALLBACK.rating,
          count: data.count ?? FALLBACK.count,
          reviews: data.reviews.slice(0, limit),
        });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState({ ...FALLBACK, loading: false });
      });

    return () => controller.abort();
  }, [limit]);

  return state;
}
