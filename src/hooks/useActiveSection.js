import { useEffect, useState } from 'react';

/**
 * Scroll-spy: returns the id of the section currently in the middle band of
 * the viewport. Uses a single IntersectionObserver (no scroll listeners).
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState('');
  const key = ids.join(',');

  useEffect(() => {
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
