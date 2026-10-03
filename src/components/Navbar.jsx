import { useEffect, useState } from 'react';
import { business, navLinks } from '../data/business';
import useScrolled from '../hooks/useScrolled';
import useActiveSection from '../hooks/useActiveSection';
import Icon from './Icon';
import BrandLogo from './BrandLogo';

const sectionIds = navLinks.map((l) => l.href.slice(1));

/**
 * Sticky glassmorphism navbar. The mobile drawer is React-controlled, so we
 * use Bootstrap's navbar CSS without loading bootstrap.bundle.js.
 */
export default function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  // Lock background scroll and close on Escape while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Close the drawer when resizing up to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`smk-nav navbar navbar-expand-lg ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <nav className="container-xl d-flex align-items-center justify-content-between" aria-label="Main">
        <a className="navbar-brand" href="#top" onClick={close} aria-label={`${business.name} — home`}>
          <BrandLogo className="brand-logo" />
        </a>

        <button
          type="button"
          className="burger d-lg-none"
          aria-controls="primary-nav"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="primary-nav" className={`nav-drawer d-lg-flex align-items-lg-center gap-lg-2 ${open ? 'show' : ''}`}>
          <ul className="navbar-nav flex-column flex-lg-row">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.href}>
                <a
                  className={`nav-link ${active === link.href.slice(1) ? 'active' : ''}`}
                  aria-current={active === link.href.slice(1) ? 'true' : undefined}
                  href={link.href}
                  onClick={close}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column flex-lg-row gap-2 mt-4 mt-lg-0 ms-lg-3">
            <a href={business.phoneHref} className="btn btn-ghost nav-cta">
              <Icon name="phone" size={15} />
              <span className="d-lg-none d-xl-inline">{business.phone}</span>
              <span className="d-none d-lg-inline d-xl-none">Call</span>
            </a>
            <a href="#contact" className="btn btn-brand nav-cta" onClick={close}>
              Book Service
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
