import { business, maps, navLinks, services } from '../data/business';
import { whatsappLink } from '../utils/whatsapp';
import BrandLogo from './BrandLogo';
import Icon from './Icon';

export default function Footer() {
  const year = new Date().getFullYear();
  const { address } = business;

  return (
    <footer className="site-footer">
      <div className="container-xl">
        <p className="footer-tagline mb-5">
          All kinds of car repairing <span>done here.</span>
        </p>

        <div className="row g-4 g-lg-5 mb-5">
          <div className="col-12 col-lg-4">
            <BrandLogo className="brand-logo footer-logo" />
            <p className="mb-4" style={{ maxWidth: '22rem' }}>
              Multi-brand car servicing and repairs in {business.city}. Honest pricing, experienced technicians, on-time
              delivery.
            </p>
            <div className="d-flex gap-2">
              <a className="social-btn" href={business.phoneHref} aria-label="Call us">
                <Icon name="phone" size={18} />
              </a>
              <a className="social-btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <Icon name="whatsapp" size={18} />
              </a>
              <a className="social-btn" href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={18} />
              </a>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Explore</h5>
            <ul className="list-unstyled d-grid gap-2 mb-0">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h5>Services</h5>
            <ul className="list-unstyled d-grid gap-2 mb-0">
              {services.slice(0, 6).map((s) => (
                <li key={s.title}><a href="#services">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-3">
            <h5>Visit</h5>
            <address className="fst-normal mb-3">
              {address.line1}, {address.line2},<br />
              {address.city} – {address.pin}
            </address>
            <p className="mb-1">Mon – Sat · 9 AM – 10 PM</p>
            <p className="mb-3">Sunday · Closed</p>
            <ul className="list-unstyled d-grid gap-1 mb-3">
              {business.team.map((m) => (
                <li key={m.phone}>
                  {m.name}: <a href={m.href}>{m.phone}</a>
                </li>
              ))}
            </ul>
            <a href={maps.directions} target="_blank" rel="noopener noreferrer" className="text-brand fw-bold">
              Get directions →
            </a>
          </div>
        </div>

        <hr className="brand-rule my-4" />
        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 small">
          <span>© {year} {business.fullName}. All rights reserved.</span>
          <span>{business.city}, Tamil Nadu</span>
        </div>
      </div>
    </footer>
  );
}
