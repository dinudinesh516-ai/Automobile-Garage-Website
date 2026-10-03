import { services } from '../data/business';
import { serviceEnquiryLink } from '../utils/whatsapp';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import Icon from './Icon';

/** White section, echoing the business card. Each card opens a WhatsApp enquiry. */
export default function Services() {
  return (
    <section className="section section-light" id="services" aria-labelledby="services-title">
      <div className="container-xl">
        <div className="row align-items-end">
          <div className="col-lg-7">
            <SectionHeading
              id="services-title"
              eyebrow="What we do"
              title={
                <>
                  Complete car care, <em>under one roof.</em>
                </>
              }
            />
          </div>
          <div className="col-lg-5">
            <Reveal delay={120}>
              <p className="lead-muted mb-5">
                From routine servicing to accident repairs — hatchbacks, sedans, SUVs and EVs of every make, handled by
                experienced technicians with modern tools and transparent pricing.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="row g-3 g-xl-4">
          {services.map((s, i) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={s.title}>
              <Reveal delay={(i % 4) * 90} className="h-100">
                <article className="service-card d-flex flex-column">
                  <span className="service-index">{String(i + 1).padStart(2, '0')}</span>
                  <div className="service-icon">
                    <Icon name={s.icon} size={26} />
                  </div>
                  <h3>{s.title}</h3>
                  <p className="flex-grow-1">{s.text}</p>
                  <span className="service-cta" aria-hidden="true">
                    Enquire →
                  </span>
                  <a
                    href={serviceEnquiryLink(s.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stretched-link"
                    aria-label={`Enquire about ${s.title} on WhatsApp`}
                  />
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
