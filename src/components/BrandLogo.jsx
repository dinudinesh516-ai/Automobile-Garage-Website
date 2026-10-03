import { useId } from 'react';

/**
 * BrandLogo — vector recreation of the SMK Automobiles business-card logo:
 * a heavy "S" and "K", a red "M" whose right stroke is an open-end wrench,
 * and "AUTOMOBILES" set wide underneath.
 *
 * - The S and K use `currentColor`, so they read white on dark backgrounds
 *   and black on light ones (set `color` via CSS).
 * - variant="full" includes the AUTOMOBILES line; variant="mark" is SMK only.
 *
 * Geometry is drawn on a 1140-unit grid traced from the printed card.
 */
const RED = '#C61E26';

// Wrench pose: ring centre and rotation (pointing up-right through the M).
const WRENCH_TRANSFORM = 'translate(540 415) rotate(-63)';

/** The solid wrench silhouette, in local (unrotated) coordinates. */
const WrenchSolid = (props) => (
  <g {...props}>
    <rect x="0" y="-26" width="340" height="52" rx="10" />
    <circle cx="0" cy="0" r="44" />
    <circle cx="380" cy="0" r="66" />
  </g>
);

export default function BrandLogo({ variant = 'full', className = '', title = 'SMK Automobiles', ...rest }) {
  // Sanitised unique ids so several logos can coexist on one page
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const holes = `wr-holes-${uid}`;
  const cut = `m-cut-${uid}`;

  const viewBox = variant === 'mark' ? '0 15 1130 465' : '0 15 1130 590';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
      role="img"
      aria-label={title}
      {...rest}
    >
      <defs>
        {/* Punches the ring hole and the open jaw out of the wrench */}
        <mask id={holes} maskUnits="userSpaceOnUse" x="-200" y="-200" width="800" height="400">
          <rect x="-200" y="-200" width="800" height="400" fill="#fff" />
          <circle cx="0" cy="0" r="16" fill="#000" />
          <rect x="372" y="-25" width="100" height="50" fill="#000" />
        </mask>
        {/* Carves a gap into the M wherever the wrench crosses it */}
        <mask id={cut} maskUnits="userSpaceOnUse" x="0" y="0" width="1140" height="620">
          <rect width="1140" height="620" fill="#fff" />
          <g transform={WRENCH_TRANSFORM}>
            <WrenchSolid fill="#000" stroke="#000" strokeWidth="30" strokeLinejoin="round" />
          </g>
        </mask>
      </defs>

      {/* S */}
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinejoin="round"
        d="M25 158H315V224H96V282H315V465H25V399H244V348H25Z"
      />

      {/* M (red) — left half + right stem, cut by the wrench */}
      <g fill={RED} mask={`url(#${cut})`}>
        <path d="M350 158H445L560 368L530 425L430 250V465H350Z" />
        <rect x="688" y="158" width="87" height="307" />
      </g>

      {/* Wrench forming the M's right diagonal */}
      <g transform={WRENCH_TRANSFORM}>
        <WrenchSolid fill={RED} mask={`url(#${holes})`} />
      </g>

      {/* K */}
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinejoin="round"
        d="M805 158H888V285L1008 158H1105L960 310L1100 465H1000L888 342V465H805Z"
      />

      {variant === 'full' && (
        <text
          x="20"
          y="592"
          fill={RED}
          fontFamily="Archivo, 'Arial Black', Arial, sans-serif"
          fontWeight="700"
          fontSize="104"
          textLength="1090"
          lengthAdjust="spacing"
        >
          AUTOMOBILES
        </text>
      )}
    </svg>
  );
}
