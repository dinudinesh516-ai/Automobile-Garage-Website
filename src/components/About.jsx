import { aboutImage, business, pillars } from '../data/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import Icon from './Icon';

export default function About() {
  return (
    <section className="section section-alt" id="about" aria-labelledby="about-title">
      <div className="container-xl">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-lg-5 order-lg-2">
            <Reveal className="about-visual">
              <img
                src={aboutImage.src}
                srcSet={aboutImage.srcSet}
                sizes="(min-width: 992px) 40vw, 100vw"
                alt="Mechanic working on car engine parts"
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
              />
              <div className="about-badge glass d-flex align-items-center gap-3">
                <div className="service-icon flex-shrink-0">
                  <Icon name="shield" size={24} />
                </div>
                <div>
                  <div className="text-pearl fw-bold">Rated {business.rating.value.toFixed(1)} on Google</div>
                  <div className="small text-steel">
                    {business.rating.count}+ reviews · 5.0 on Justdial ({business.rating.justdialCount})
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-lg-7 order-lg-1 pe-lg-5">
            <SectionHeading
              id="about-title"
              eyebrow="About SMK"
              title={
                <>
                  Honest work. <em>Every</em> time.
                </>
              }
              lead={`${business.name} is a trusted multi-brand car service and repair centre in ${business.address.line2}, ${business.city}. We fix all kinds of cars — reliably, affordably, and with the transparency you'd expect from a dealership, plus the personal care you won't find at one.`}
            />

            <div>
              {pillars.map((p, i) => (
                <Reveal className="pillar" key={p.title} delay={i * 80}>
                  <span className="pillar-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
