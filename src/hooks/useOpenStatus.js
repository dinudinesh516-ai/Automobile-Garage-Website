import { useEffect, useState } from 'react';
import { business } from '../data/business';

/**
 * Computes whether the workshop is open right now, using India Standard Time
 * regardless of the visitor's own timezone. Re-checks every minute.
 */
function getIstNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    day: days.indexOf(get('weekday')),
    hour: (Number(get('hour')) % 24) + Number(get('minute')) / 60,
  };
}

function compute() {
  const { day, hour } = getIstNow();
  const slot = business.schedule[day];
  const isOpen = Boolean(slot) && hour >= slot[0] && hour < slot[1];
  return { isOpen, today: day };
}

export default function useOpenStatus() {
  const [status, setStatus] = useState(compute);

  useEffect(() => {
    const id = setInterval(() => setStatus(compute()), 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
