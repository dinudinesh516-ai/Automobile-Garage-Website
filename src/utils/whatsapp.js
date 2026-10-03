import { business } from '../data/business';

/** Default enquiry template used by the floating button and hero CTA. */
export const DEFAULT_WA_MESSAGE = [
  `Hello ${business.name}! 👋`,
  '',
  "I'd like to book a car service appointment.",
  '• Car make & model: ',
  '• Service needed: ',
  '• Preferred date & time: ',
  '',
  'Please let me know the available slots. Thank you!',
].join('\n');

/**
 * Build a click-to-chat link. wa.me works on mobile (opens the app) and on
 * desktop (opens WhatsApp Web), so no device detection is required.
 */
export function whatsappLink(message = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Template pre-filled with a specific service, used by each service card. */
export function serviceEnquiryLink(serviceTitle) {
  return whatsappLink(
    `Hello ${business.name}! I'd like to enquire about *${serviceTitle}* for my car.\n\nCar make & model: \nPreferred date: `
  );
}

/** Format YYYY-MM-DD as e.g. "Tue, 6 Oct 2026" for a friendlier message. */
function prettyDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

/** Booking request composed from the form — sent straight to the workshop's WhatsApp. */
export function bookingToWhatsapp({ name, phone, service, vehicle, date, message }) {
  const lines = [
    `Hello ${business.name}! I'd like to book a service appointment.`,
    '',
    `*Name:* ${name.trim()}`,
    `*Phone:* ${phone.trim()}`,
    `*Service:* ${service}`,
    vehicle.trim() ? `*Vehicle:* ${vehicle.trim()}` : null,
    `*Preferred date:* ${prettyDate(date)}`,
    message.trim() ? `*Notes:* ${message.trim()}` : null,
    '',
    'Please confirm the slot. Thank you!',
  ].filter((line) => line !== null); // drop omitted optional fields, keep blank spacer lines
  return whatsappLink(lines.join('\n'));
}
