import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import Icon from './Icon';

/**
 * Toast notifications — Bootstrap's .toast markup driven by React state,
 * so we don't need Bootstrap's JS bundle. Usage:
 *   const toast = useToast();
 *   toast.success('Booked!', 'We will call you shortly.');
 */
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (variant, title, body, duration = 6000) => {
      const id = ++idRef.current;
      setToasts((list) => [...list.slice(-2), { id, variant, title, body }]); // max 3 on screen
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const api = useMemo(
    () => ({
      success: (title, body, d) => push('success', title, body, d),
      error: (title, body, d) => push('error', title, body, d ?? 9000),
      info: (title, body, d) => push('info', title, body, d),
      dismiss,
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-dock" aria-live="polite" aria-atomic="false">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast show is-${t.variant}`}
            role={t.variant === 'error' ? 'alert' : 'status'}
          >
            <div className="toast-header gap-2 border-0 pb-0">
              <Icon
                name={t.variant === 'error' ? 'alert' : 'check'}
                size={18}
                className={t.variant === 'error' ? 'text-danger' : 'text-success'}
              />
              <strong className="me-auto">{t.title}</strong>
              <button
                type="button"
                className="toast-close"
                aria-label="Close notification"
                onClick={() => dismiss(t.id)}
              >
                <Icon name="close" size={16} />
              </button>
            </div>
            {t.body && <div className="toast-body pt-1">{t.body}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
