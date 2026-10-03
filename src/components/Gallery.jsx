import { gallery } from '../data/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** Bento-style gallery of the jobs we do in the workshop. Lazy-loaded responsive images. */
export default function Gallery() {
  return (
    <section className="section" id="gallery" aria-labelledby="gallery-title">
      <div className="container-xl">
        <SectionHeading
          id="gallery-title"
          eyebrow="Inside the workshop"
          title={
            <>
              What we fix, <em>every day.</em>
            </>
          }
          lead="From engines and suspension to brakes, paint and electricals — the jobs our technicians handle every day, for every make and model."
        />

        <div className="gallery-grid">
          {gallery.map((g, i) => (
            <Reveal as="figure" key={g.id} delay={(i % 3) * 90} className={`gallery-item ${g.feature ? 'is-feature' : ''}`}>
              <img
                src={g.src}
                srcSet={g.srcSet}
                sizes={g.feature ? '(min-width: 992px) 66vw, 100vw' : '(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw'}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                width="900"
                height="600"
              />
              <figcaption>{g.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
