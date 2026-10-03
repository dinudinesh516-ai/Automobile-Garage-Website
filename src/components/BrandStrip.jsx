import { brands } from '../data/business';

// Each scrolling "copy" repeats the list so it's always wider than the screen
// (even 4K) — otherwise a gap would appear before the loop restarts.
const REPEATS = 2;
const items = Array.from({ length: REPEATS }, () => brands).flat();

/**
 * Red band of car brands, scrolling as a seamless infinite loop (CSS-only),
 * so every brand is seen on any screen size. Pauses on mouse hover.
 *
 * The list is rendered twice and the track slides by exactly half its width,
 * so the end joins the start invisibly. The duplicate is hidden from
 * assistive tech.
 */
export default function BrandStrip() {
  return (
    <aside className="brand-strip d-flex align-items-center" aria-label="We service all car brands">
      <span className="brand-strip__label">
        <span className="d-none d-md-inline">We service </span>All brands
      </span>

      <div className="brand-strip__viewport flex-grow-1">
        <div className="brand-strip__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="list-unstyled d-flex m-0" aria-hidden={copy === 1 || undefined}>
              {items.map((b, i) => (
                <li key={i} className="brand-strip__item">
                  {b}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </aside>
  );
}
