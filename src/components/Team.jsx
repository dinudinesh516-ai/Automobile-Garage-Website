import { business } from '../data/business';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import Icon from './Icon';

const members = [...business.team].sort((a, b) => a.order - b.order);

/** "Our team" — photo cards with role and a tap-to-call button for each person. */
export default function Team() {
  return (
    <section className="section section-light" id="team" aria-labelledby="team-title">
      <div className="container-xl">
        <SectionHeading
          id="team-title"
          eyebrow="Our team"
          title={
            <>
              The hands behind <em>every repair.</em>
            </>
          }
          lead="Meet the people who look after your car — talk to any of us directly."
        />

        <div className="row g-3 g-xl-4 justify-content-center">
          {members.map((m, i) => (
            <div className="col-12 col-sm-6 col-lg-4" key={m.name}>
              <Reveal delay={i * 100} className="h-100">
                <article className="team-card h-100">
                  <div className="team-card__photo">
                    <img
                      src={`/team/${m.photo}-800.webp`}
                      srcSet={`/team/${m.photo}-480.webp 480w, /team/${m.photo}-800.webp 800w`}
                      sizes="(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw"
                      alt={`${m.shortName}, ${m.role} at ${business.name}`}
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="800"
                    />
                  </div>
                  <div className="team-card__body">
                    <span className="team-card__role">{m.role}</span>
                    <h3 className="team-card__name">{m.shortName}</h3>
                    <a href={m.href} className="btn btn-brand btn-sm w-100 mt-3" aria-label={`Call ${m.shortName} on ${m.phone}`}>
                      <Icon name="phone" size={15} /> {m.phone}
                    </a>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
