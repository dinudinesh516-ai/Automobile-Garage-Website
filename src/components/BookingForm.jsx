import { useState } from 'react';
import { business, serviceOptions } from '../data/business';
import { bookingToWhatsapp } from '../utils/whatsapp';
import { useToast } from './ToastProvider';
import Icon from './Icon';

/**
 * Booking form → WhatsApp.
 * The workshop handles bookings on WhatsApp/phone (email often goes unread),
 * so on submit we compose a neatly formatted booking message and open a chat
 * with the workshop, pre-filled. No backend, no API keys, nothing to fail.
 */
const INITIAL = { name: '', phone: '', service: '', vehicle: '', date: '', message: '' };

/** Today's date as YYYY-MM-DD in local time (for the date input's `min`). */
const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(v.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number.';
  if (!v.service) e.service = 'Please choose a service.';
  if (!v.date) e.date = 'Pick a preferred date.';
  else if (v.date < todayISO()) e.date = 'Please choose today or a future date.';
  return e;
}

export default function BookingForm() {
  const toast = useToast();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sentLink, setSentLink] = useState(null); // set after a successful hand-off

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next)); // live re-validate once touched
  };

  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(INITIAL).map((k) => [k, true])));
    if (Object.keys(found).length) {
      // Move focus to the first invalid field for keyboard / screen-reader users
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    const link = bookingToWhatsapp(values);
    // Opened synchronously inside the submit handler, so popup blockers allow it.
    window.open(link, '_blank', 'noopener,noreferrer');
    setSentLink(link);
    toast.success('Opening WhatsApp…', 'Your booking details are pre-filled — just tap Send.');
  };

  const fieldClass = (name, base = 'form-control') =>
    `${base} ${touched[name] && errors[name] ? 'is-invalid' : ''} ${touched[name] && !errors[name] && values[name] ? 'is-valid' : ''}`;

  if (sentLink) {
    return (
      <div className="text-center py-5" role="status">
        <div className="service-icon mx-auto mb-4" style={{ width: 72, height: 72 }}>
          <Icon name="whatsapp" size={32} />
        </div>
        <h3 className="fs-2 mb-2">Almost done!</h3>
        <p className="text-steel mb-4 mx-auto" style={{ maxWidth: '26rem' }}>
          Tap <strong className="text-pearl">Send</strong> in WhatsApp to confirm your booking. WhatsApp didn&rsquo;t
          open? Use the button below, or call us on{' '}
          <a href={business.phoneHref} className="text-nowrap">{business.phone}</a>.
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
          <a href={sentLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <Icon name="whatsapp" size={18} /> Open WhatsApp
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setSentLink(null);
              setValues(INITIAL);
              setTouched({});
              setErrors({});
            }}
          >
            New booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="form-note">
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="bf-name" className="form-label">Full name</label>
          <input id="bf-name" name="name" type="text" autoComplete="name" className={fieldClass('name')}
            value={values.name} onChange={onChange} onBlur={onBlur} placeholder="Your name" required maxLength={80}
            aria-invalid={Boolean(touched.name && errors.name)} aria-describedby="bf-name-err" />
          <div className="invalid-feedback" id="bf-name-err">{errors.name}</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="bf-phone" className="form-label">Mobile number</label>
          <input id="bf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={fieldClass('phone')}
            value={values.phone} onChange={onChange} onBlur={onBlur} placeholder="98765 43210" required maxLength={16}
            aria-invalid={Boolean(touched.phone && errors.phone)} aria-describedby="bf-phone-err" />
          <div className="invalid-feedback" id="bf-phone-err">{errors.phone}</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="bf-service" className="form-label">Service</label>
          <select id="bf-service" name="service" className={fieldClass('service', 'form-select')}
            value={values.service} onChange={onChange} onBlur={onBlur} required
            aria-invalid={Boolean(touched.service && errors.service)} aria-describedby="bf-service-err">
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <div className="invalid-feedback" id="bf-service-err">{errors.service}</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="bf-vehicle" className="form-label">Vehicle <span className="text-lowercase fw-normal">(optional)</span></label>
          <input id="bf-vehicle" name="vehicle" type="text" className="form-control"
            value={values.vehicle} onChange={onChange} placeholder="e.g. Maruti Swift 2021" maxLength={80} />
        </div>

        <div className="col-md-6">
          <label htmlFor="bf-date" className="form-label">Preferred date</label>
          <input id="bf-date" name="date" type="date" min={todayISO()} className={fieldClass('date')}
            value={values.date} onChange={onChange} onBlur={onBlur} required
            aria-invalid={Boolean(touched.date && errors.date)} aria-describedby="bf-date-err" />
          <div className="invalid-feedback" id="bf-date-err">{errors.date}</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="bf-message" className="form-label">Notes <span className="text-lowercase fw-normal">(optional)</span></label>
          <input id="bf-message" name="message" type="text" className="form-control"
            value={values.message} onChange={onChange} placeholder="Pickup needed? Any symptoms?" maxLength={300} />
        </div>

        <div className="col-12 d-flex flex-column flex-sm-row align-items-sm-center gap-3 pt-2">
          <button type="submit" className="btn btn-whatsapp btn-lg">
            <Icon name="whatsapp" size={20} /> Book via WhatsApp
          </button>
          <small id="form-note" className="text-steel">
            Opens WhatsApp with your details filled in — we reply fast during working hours.
          </small>
        </div>
      </div>
    </form>
  );
}
