import { useEffect, useState } from 'react';
import { business, reviews as fallbackReviews } from '../data/business';

const FALLBACK = {
  live: false,
  rating: business.rating.value,
  count: business.rating.count,
  reviews: fallbackReviews,
};

/**
 * Loads live Google reviews from /api/reviews. The bundled reviews in
 * business.js render first (so they are in the pre-rendered HTML that search
 * engines read) and are swapped for the live ones when they arrive. On any
 * failure (no API key, network, quota) the bundled reviews simply stay.
 */
export default function useGoogleReviews(limit = 3) {
  const [state, setState] = useState({ ...FALLBACK, loading: false });

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
