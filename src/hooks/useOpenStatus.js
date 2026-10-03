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

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** 9 → "9 AM", 22 → "10 PM", 9.5 → "9:30 AM". */
function formatHour(h) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const h12 = hh % 12 || 12;
  return `${h12}${mm ? `:${String(mm).padStart(2, '0')}` : ''} ${hh < 12 ? 'AM' : 'PM'}`;
}

/** Next opening: "9 AM" if later today, otherwise e.g. "Monday 9 AM". */
function nextOpening(day, hour) {
  for (let offset = 0; offset < 7; offset += 1) {
    const d = (day + offset) % 7;
    const slot = business.schedule[d];
    if (!slot || (offset === 0 && hour >= slot[0])) continue;
    return offset === 0 ? formatHour(slot[0]) : `${DAY_NAMES[d]} ${formatHour(slot[0])}`;
  }
  return null;
}

function compute() {
  const { day, hour } = getIstNow();
  const slot = business.schedule[day];
  const isOpen = Boolean(slot) && hour >= slot[0] && hour < slot[1];
  return {
    isOpen,
    today: day,
    closesAt: isOpen ? formatHour(slot[1]) : null,
    opensAt: isOpen ? null : nextOpening(day, hour),
  };
}

export default function useOpenStatus() {
  const [status, setStatus] = useState(compute);

  useEffect(() => {
    const id = setInterval(() => setStatus(compute()), 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
