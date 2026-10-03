import { business } from '../data/business';
import { whatsappLink } from '../utils/whatsapp';
import useOpenStatus from '../hooks/useOpenStatus';
import SectionHeading from './SectionHeading';
import BookingForm from './BookingForm';
import LocationMap from './LocationMap';
import Reveal from './Reveal';
import Icon from './Icon';

/** Which hours row is "today" (Sunday row vs Mon–Sat row). */
const rowIsToday = (row, today) => (today === 0 ? row.days.startsWith('Sun') : !row.days.startsWith('Sun'));

export default function Contact() {
  const { isOpen, today } = useOpenStatus();
  const { address } = business;

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container-xl">
        <SectionHeading
          id="contact-title"
          eyebrow="Book & visit"
          title={
            <>
              Book your <em>service slot.</em>
            </>
          }
          lead="Fill in your details and we'll open WhatsApp with your booking ready to send — or simply call any of us directly."
        />

        <div className="row g-4 g-xl-5">
          {/* Booking form → WhatsApp */}
          <div className="col-12 col-lg-7">
            <Reveal className="booking-card glass h-100">
              <BookingForm />
            </Reveal>
          </div>

          {/* Contact details */}
          <div className="col-12 col-lg-5">
            <Reveal delay={120} className="glass p-4 p-xl-5 h-100 d-flex flex-column">
              <div className="info-row">
                <span className="ico"><Icon name="phone" size={18} /></span>
                <div className="flex-grow-1">
                  <div className="lbl">Call us directly</div>
                  <ul className="team-list">
                    {business.team.map((m) => (
                      <li key={m.phone}>
                        <span>{m.name}</span>
                        <a href={m.href}>{m.phone}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="info-row">
                <span className="ico"><Icon name="whatsapp" size={18} /></span>
                <div>
                  <div className="lbl">WhatsApp</div>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    Chat to book instantly →
                  </a>
                </div>
              </div>

              <div className="info-row">
                <span className="ico"><Icon name="pin" size={18} /></span>
                <div>
                  <div className="lbl">Workshop</div>
                  <address className="val mb-0 fst-normal">
                    {address.line1},<br />
                    {address.line2}, {address.city},<br />
                    {address.state} – {address.pin}
                  </address>
                </div>
              </div>

              <div className="info-row">
                <span className="ico"><Icon name="clock" size={18} /></span>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="lbl">Hours</span>
                    <span className={`open-badge ${isOpen ? 'is-open' : 'is-closed'}`}>{isOpen ? 'Open now' : 'Closed'}</span>
                  </div>
                  <table className="hours-table mt-1">
                    <tbody>
                      {business.hours.map((h) => (
                        <tr key={h.days} className={rowIsToday(h, today) ? 'is-today' : ''}>
                          <td>{h.days}</td>
                          <td>{h.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="info-row">
                <span className="ico"><Icon name="instagram" size={18} /></span>
                <div>
                  <div className="lbl">Follow</div>
                  <a href={business.instagram} target="_blank" rel="noopener noreferrer">@smk__automobiles</a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <div className="col-12">
            <Reveal>
              <LocationMap />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
