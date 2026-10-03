/**
 * Business data — single source of truth for every section of the site.
 * ---------------------------------------------------------------------------
 * Sourced from the SMK Automobiles business card and the Google Business
 * Profile "SMK Automobiles - Multi Brand Car Service Center" (Sundakkamuthur,
 * Coimbatore). Edit values here; components read from this file only.
 */

export const business = {
  name: 'SMK Automobiles',
  fullName: 'SMK Automobiles - Multi Brand Car Service Center',
  tagline: 'All kinds of car repairing done here',
  city: 'Coimbatore',

  // Main line (C.A Mansoor) — also the number on the Google listing
  phone: '+91 99448 21516',
  phoneHref: 'tel:+919944821516',
  whatsappNumber: '919944821516', // international format, digits only

  /** Direct lines printed on the business card. */
  team: [
    { name: 'C.A Mansoor', phone: '+91 99448 21516', href: 'tel:+919944821516' },
    { name: 'S. Stalin', phone: '+91 97914 92071', href: 'tel:+919791492071' },
    { name: 'S. Kishore', phone: '+91 98945 20347', href: 'tel:+919894520347' },
  ],

  instagram: 'https://www.instagram.com/smk__automobiles/',

  address: {
    line1: 'Kasinath Garden, near Thangam Building',
    line2: 'Sundakkamuthur',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pin: '641010',
  },

  geo: { lat: 10.956571, lng: 76.9264956 },
  placeId: 'ChIJ14jcSqpbqDsRzL-THQhBOOE', // Google Maps place (used for live reviews + directions)
  mapsCid: '16228792760341348300',

  // Fallback figures — replaced at runtime by live Google data when available
  rating: { value: 5.0, count: 124, justdialCount: 91 },

  hours: [
    { days: 'Monday – Saturday', time: '9:00 AM – 10:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  /** Machine-readable hours (0 = Sunday) used for the live "Open now" badge. */
  schedule: { 0: null, 1: [9, 22], 2: [9, 22], 3: [9, 22], 4: [9, 22], 5: [9, 22], 6: [9, 22] },
};

/** Map URLs (no API key needed). */
export const maps = {
  embed: `https://maps.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=16&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.name)}&destination_place_id=${business.placeId}`,
  listing: `https://www.google.com/maps/place/?q=place_id:${business.placeId}`,
  writeReview: `https://search.google.com/local/writereview?placeid=${business.placeId}`,
};

/**
 * Services offered — taken from the business's own Google profile description.
 * `icon` maps to a key in components/Icon.jsx.
 */
export const services = [
  {
    icon: 'engine',
    title: 'General & Periodic Service',
    text: 'Scheduled maintenance for every make and model, including engine oil and filter changes.',
  },
  {
    icon: 'snow',
    title: 'Car AC Service & Repair',
    text: 'Complete AC care — gas top-up, leak detection, compressor and cooling-coil repair.',
  },
  {
    icon: 'spray',
    title: 'Body & Painting',
    text: 'Dent removal, panel work and colour-matched paint that restores a factory finish.',
  },
  {
    icon: 'shield',
    title: 'Accident Repairs',
    text: 'Professional collision repair with honest assessment, from inspection to handover.',
  },
  {
    icon: 'brake',
    title: 'Brake Repairs',
    text: 'Pads, discs, calipers and brake-fluid service — safety, never compromised.',
  },
  {
    icon: 'exhaust',
    title: 'Exhaust System',
    text: 'Silencer, catalytic-converter and exhaust leak repairs for a quieter, cleaner drive.',
  },
  {
    icon: 'tow',
    title: 'Breakdown Assistance',
    text: 'Fast help when your car lets you down anywhere around Coimbatore.',
  },
  {
    icon: 'pickup',
    title: 'Pickup & Drop',
    text: 'We collect your car and return it serviced — no waiting at the workshop.',
  },
];

/** Options for the booking form's service dropdown. */
export const serviceOptions = [
  ...services.map((s) => s.title),
  'Battery Check / Replacement',
  'Clutch & Mechanical Repairs',
  'General Inspection',
  'Other',
];

/**
 * Popular brands shown in the marquee (wordmarks only, no logos). These are
 * examples — the strip is labelled "All brands" and ends with "every other make".
 */
export const brands = [
  'Maruti Suzuki',
  'Hyundai',
  'Tata',
  'Mahindra',
  'Kia',
  'Toyota',
  'Honda',
  'Renault',
  'Nissan',
  'Skoda',
  'Volkswagen',
  'MG',
  'Ford',
  'Jeep',
  'Citroën',
];

export const highlights = [
  { value: '5.0★', label: 'Google rating' },
  { value: '124+', label: 'Google reviews' },
  { value: 'All', label: 'Makes & models' },
  { value: '6 days', label: 'Open till 10 PM' },
];

export const pillars = [
  { title: 'Honest pricing', text: 'Transparent estimates before work begins — no surprise line items.' },
  { title: 'Experienced technicians', text: 'Skilled mechanics who know every major make and model.' },
  { title: 'Modern tools', text: 'Up-to-date diagnostic and repair equipment for quality workmanship.' },
  { title: 'On-time delivery', text: 'Fast turnaround, with pickup and drop for your convenience.' },
];

/**
 * Fallback reviews — the newest reviews on the Google Business Profile
 * (copied verbatim Oct 2026; “…” marks shortened text). Shown only when live Google reviews (api/reviews.js)
 * are unavailable; once an API key is set, the latest ones load automatically.
 */
export const reviews = [
  {
    author: 'Abhijith Thaivalappil',
    rating: 5,
    relativeTime: 'Sep 2026',
    text: 'I recently got a new clutch and related parts replaced at SMK Automobiles, and honestly, I had a really good experience from start to finish. … What I really appreciated was their transparency. … I gave my car in the morning and got it back by the evening after the work was completed. … Overall, I’m very happy with the service. Good workmanship, transparency, reasonable pricing, and excellent customer hospitality. Definitely recommend SMK Automobiles.',
  },
  {
    author: 'Divya Sheela',
    rating: 5,
    relativeTime: 'Sep 2026',
    text: 'Excellent service... You can trust 100 percent..really good and clean professional skilled persons..',
  },
  {
    author: 'Mohammed Fahadh',
    rating: 5,
    relativeTime: 'May 2026',
    text: 'I have never seen this like hardworking mechanics...they done work perfectly and there are very friendly with us...',
  },
];

/**
 * Imagery — free Unsplash photos (workshop jobs + cars sold in India), served from the
 * Unsplash CDN and resized on the fly. To use your own photos, drop them in
 * /public/gallery and replace `src`/`srcSet` with e.g. '/gallery/bay-1.webp'.
 */
const unsplash = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const responsive = (id, widths) => widths.map((w) => `${unsplash(id, w)} ${w}w`).join(', ');

export const gallery = [
  { id: '1786490002518-8b5af5f2b537', alt: 'Car raised on a lift with the bonnet open during a service', caption: 'Periodic service', feature: true },
  { id: '1619642751034-765dfdf7c58e', alt: 'Mechanic’s hand working in an engine bay with a wrench', caption: 'Engine & mechanical' },
  { id: '1769218403508-90c67335aab5', alt: 'Close-up of a car suspension and drive shaft', caption: 'Suspension & underbody' },
  { id: '1696494561430-de087dd0bd69', alt: 'Brake disc and hub assembly on a car', caption: 'Brake repairs' },
  { id: '1676035291793-645c307e5a4e', alt: 'Painter working on a masked car in a paint booth', caption: 'Body & painting' },
  { id: '1487754180451-c456f719a1fc', alt: 'Fresh engine oil being poured during an oil change', caption: 'Oil & filter change' },
  { id: '1645445522156-9ac06bc7a767', alt: 'Technician fitting a wheel in the workshop', caption: 'Wheels & alignment' },
  { id: '1632733711679-529326f6db12', alt: 'Technician checking a car’s fuse box and electricals', caption: 'AC & electricals' },
  { id: '1615906655593-ad0386982a0f', alt: 'Mechanic diagnosing a fault under the bonnet', caption: 'Diagnostics' },
].map((g) => ({ ...g, src: unsplash(g.id, 900), srcSet: responsive(g.id, [480, 900, 1400]) }));

/** Hero backdrop — Mahindra Thar on a moody street, served responsively for fast LCP. */
const HERO_ID = '1633867179970-c54688bcfa33';
export const heroImage = {
  src: unsplash(HERO_ID, 1600),
  srcSet: responsive(HERO_ID, [800, 1200, 1600, 2400, 3200]),
};

/** About section — mechanic at work in an Indian workshop. */
const ABOUT_ID = '1767339736233-f4b02c41ee4a';
export const aboutImage = {
  src: unsplash(ABOUT_ID, 800),
  srcSet: responsive(ABOUT_ID, [500, 800, 1200]),
};

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];
