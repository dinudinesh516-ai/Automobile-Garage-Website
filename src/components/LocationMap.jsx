import { useEffect, useRef, useState } from 'react';
import { business, maps } from '../data/business';
import Icon from './Icon';

/**
 * Google Maps embed that only mounts its iframe when scrolled near — the
 * embed pulls ~500 KB of scripts, so deferring it protects Lighthouse scores.
 */
export default function LocationMap() {
  const ref = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) {
      setLoad(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="map-frame" ref={ref}>
        {load ? (
          <iframe
            src={maps.embed}
            title={`Map showing ${business.fullName}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="map-placeholder">
            <span className="text-steel small">
              <Icon name="pin" size={28} className="text-brand d-block mx-auto mb-2" />
              Loading map…
            </span>
          </div>
        )}
      </div>
      <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
        <a href={maps.directions} target="_blank" rel="noopener noreferrer" className="btn btn-brand flex-fill">
          <Icon name="navigate" size={16} /> Get directions
        </a>
        <a href={maps.listing} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-fill">
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
