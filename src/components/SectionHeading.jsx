import Reveal from './Reveal';

/** Consistent eyebrow + display title + lead paragraph for every section. */
export default function SectionHeading({ eyebrow, title, lead, center = false, id }) {
  return (
    <Reveal className={`mb-5 ${center ? 'text-center mx-auto' : ''}`} style={{ maxWidth: center ? '46rem' : undefined }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {lead && <p className={`lead-muted ${center ? 'mx-auto' : ''}`}>{lead}</p>}
    </Reveal>
  );
}
