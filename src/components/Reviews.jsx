import { maps } from '../data/business';
import useGoogleReviews from '../hooks/useGoogleReviews';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import Icon from './Icon';

function Stars({ count = 5, size = 16 }) {
  const n = Math.round(count);
  return (
    <span className="stars" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} name="star" size={size} />
      ))}
    </span>
  );
}

/** Reviewer avatar — Google profile photo, or an initial as a fallback. */
function Avatar({ name, photo }) {
  if (photo) {
    return <img src={photo} alt="" width="40" height="40" loading="lazy" referrerPolicy="no-referrer" />;
  }
  return (
    <span className="avatar" aria-hidden="true">
      {(name || 'G').trim().charAt(0).toUpperCase()}
    </span>
  );
}

/** Google shows some names in ALL CAPS — display them in Title Case instead. */
const displayName = (name = '') =>
  name === name.toUpperCase()
    ? name.toLowerCase().replace(/(^|[\s.'-])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase())
    : name;

/** Reviews longer than this get a "Read full review" link (the card clamps the text). */
const LONG_REVIEW = 220;

function ReviewCard({ review, featured, delay }) {
  const name = displayName(review.author);
  return (
    <Reveal delay={delay} className="h-100">
      <figure className={`review-card glass m-0 d-flex flex-column ${featured ? 'is-featured' : ''}`}>
        <div className="d-flex justify-content-between align-items-center">
          <Stars count={review.rating} size={15} />
          <Icon name="google" size={18} title="Google review" />
        </div>
        <blockquote className="flex-grow-1 mb-2">{review.text}</blockquote>
        {review.text.length > LONG_REVIEW && (
          <a href={maps.listing} target="_blank" rel="noopener noreferrer" className="small fw-bold text-brand mb-3">
            Read full review on Google →
          </a>
        )}
        <figcaption className="review-author mt-auto pt-2">
          <Avatar name={name} photo={review.photo} />
          <div>
            {review.authorUrl ? (
              <a href={review.authorUrl} target="_blank" rel="noopener noreferrer">
                <strong>{name}</strong>
              </a>
            ) : (
              <strong>{name}</strong>
            )}
            {review.relativeTime && <small>{review.relativeTime}</small>}
          </div>
        </figcaption>
      </figure>
    </Reveal>
  );
}

function ReviewSkeleton() {
  return (
    <div className="review-card glass h-100" aria-hidden="true">
      <div className="skeleton mb-4" style={{ width: 90, height: 14 }} />
      <div className="skeleton mb-2" style={{ height: 14 }} />
      <div className="skeleton mb-2" style={{ height: 14, width: '85%' }} />
      <div className="skeleton mb-4" style={{ height: 14, width: '60%' }} />
      <div className="d-flex align-items-center gap-2">
        <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%' }} />
        <div className="skeleton" style={{ width: 120, height: 12 }} />
      </div>
    </div>
  );
}

/**
 * Customer reviews — pulled live from Google (via /api/reviews) with a
 * bundled fallback, so the section always renders.
 */
export default function Reviews() {
  const { loading, live, rating, count, reviews } = useGoogleReviews(3);

  return (
    <section className="section section-light" id="reviews" aria-labelledby="reviews-title" aria-busy={loading}>
      <div className="container-xl">
        <SectionHeading
          id="reviews-title"
          eyebrow="Customer voices"
          title={
            <>
              Trusted by <em>Coimbatore</em> drivers.
            </>
          }
        />

        <div className="row g-3 g-xl-4">
          <div className="col-12 col-lg-4">
            <Reveal className="rating-summary glass d-flex flex-column">
              <span className="google-badge mb-3">
                <Icon name="google" size={18} /> Google reviews
              </span>
              <div className="d-flex align-items-end gap-3 mb-3">
                <span className="big">{Number(rating).toFixed(1)}</span>
                <span className="pb-2 text-steel small">/ 5</span>
              </div>
              <Stars count={rating} size={20} />
              <p className="text-steel mt-3 mb-4">
                Based on <strong className="text-pearl">{count}+ Google reviews</strong>
                {live ? ', updated automatically.' : ' and a perfect 5.0 on Justdial.'}
              </p>
              <div className="mt-auto d-grid gap-2">
                <a href={maps.listing} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  Read all reviews <Icon name="arrow" size={15} />
                </a>
                <a href={maps.writeReview} target="_blank" rel="noopener noreferrer" className="btn btn-brand btn-sm">
                  Write a review
                </a>
              </div>
            </Reveal>
          </div>

          <div className="col-12 col-lg-8">
            <div className="row g-3 g-xl-4">
              {loading
                ? [0, 1, 2].map((i) => (
                    <div className={i === 0 ? 'col-12' : 'col-12 col-md-6'} key={i}>
                      <ReviewSkeleton />
                    </div>
                  ))
                : reviews.map((r, i) => (
                    // First (newest) review spans the full width as a featured quote
                    <div className={i === 0 ? 'col-12' : 'col-12 col-md-6'} key={`${r.author}-${i}`}>
                      <ReviewCard review={r} featured={i === 0} delay={(i + 1) * 100} />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
