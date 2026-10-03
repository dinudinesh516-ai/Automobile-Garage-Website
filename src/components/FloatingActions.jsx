import { business } from '../data/business';
import { whatsappLink } from '../utils/whatsapp';
import useScrolled from '../hooks/useScrolled';
import Icon from './Icon';

/**
 * Floating click-to-chat (WhatsApp) + tap-to-call buttons, always in reach.
 * The call button appears after the user scrolls past the hero.
 */
export default function FloatingActions() {
  const scrolled = useScrolled(400);

  return (
    <div className="fab-stack">
      {scrolled && (
        <a href={business.phoneHref} className="fab fab--call" aria-label={`Call ${business.phone}`}>
          <Icon name="phone" size={20} />
          <span className="fab-label">Call {business.phone}</span>
        </a>
      )}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fab fab--wa"
        aria-label="Chat with us on WhatsApp"
      >
        <Icon name="whatsapp" size={30} />
        <span className="fab-label">Book on WhatsApp</span>
      </a>
    </div>
  );
}
