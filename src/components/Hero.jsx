import { business, heroImage, highlights } from '../data/business';
import { whatsappLink } from '../utils/whatsapp';
import useOpenStatus from '../hooks/useOpenStatus';
import Icon from './Icon';

/**
 * Hero — full-viewport opener. The background <img> is the LCP element, so it
 * is eagerly loaded with fetchpriority="high" and a responsive srcset.
 */
export default function Hero() {
  const { isOpen } = useOpenStatus();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <img
          src={heroImage.src}
          srcSet={heroImage.srcSet}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          width="1600"
          height="1067"
        />
      </div>

      {/* Red chevrons, as on the business card */}
      <div className="hero__chevrons" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="container-xl">
        <div className="row">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <span className="rating-pill glass">
                <span className="score">{business.rating.value.toFixed(1)}</span>
                <span className="stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon key={i} name="star" size={13} />
                  ))}
                </span>
                <span>{business.rating.count}+ Google reviews</span>
              </span>
              <span className={`open-badge ${isOpen ? 'is-open' : 'is-closed'}`}>
                {isOpen ? 'Open now · till 10 PM' : 'Closed now · opens 9 AM'}
              </span>
            </div>

            <h1 className="hero__title" id="hero-title">
              All kinds of
              <br />
              car repairs. <em>Done right.</em>
            </h1>

            <p className="hero__lead mb-4 mb-md-5">
              {business.city}&rsquo;s trusted multi-brand car service centre for Maruti, Hyundai, Tata, Mahindra and
              every car on Indian roads — honest pricing, expert hands, and pickup &amp; drop to your door.
            </p>

            <div className="d-flex flex-column flex-sm-row flex-wrap gap-3">
              <a href="#contact" className="btn btn-brand btn-lg">
                Book a service <Icon name="arrow" size={18} />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
                <Icon name="whatsapp" size={18} /> WhatsApp us
              </a>
              <a href={business.phoneHref} className="btn btn-ghost btn-lg d-sm-none">
                <Icon name="phone" size={18} /> Call now
              </a>
            </div>
          </div>
        </div>

        <div className="hero__stats row g-2 g-md-3">
          {highlights.map((h) => (
            <div className="col-6 col-md-3" key={h.label}>
              <div className="stat glass">
                <strong>{h.value}</strong>
                <span>{h.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a href="#services" className="hero__scroll d-none d-md-block" aria-label="Scroll to services" />
    </section>
  );
}
