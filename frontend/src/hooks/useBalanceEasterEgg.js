import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useBalanceEasterEgg Hook
 * 
 * Multi-Platform Trigger Support:
 * - Desktop: Listens for typing "balance" on keyboard (outside inputs)
 * - Mobile / Touchscreen: Triggerable via double-tap callback on the gauge
 * 
 * Behavior:
 * - Temporarily overrides gauge display to 100 ("Well balanced") with demo label
 * - Holds for 3 seconds, then cleanly reverts to the real score
 * - Enforces a 6-second cooldown to prevent overlapping animation queues
 * - Respects prefers-reduced-motion
 * - Does NOT mutate any real application state or data
 */
export function useBalanceEasterEgg() {
  const [isTriggered, setIsTriggered] = useState(false);
  const bufferRef = useRef('');
  const cooldownRef = useRef(false);
  const timerRef = useRef(null);
  const cooldownTimerRef = useRef(null);

  const triggerEasterEgg = useCallback(() => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    setIsTriggered(true);

    // Clear any prior timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);

    // Hold demo state for 3 seconds, then restore real score
    timerRef.current = setTimeout(() => {
      setIsTriggered(false);
    }, 3000);

    // Reset cooldown after 6 seconds
    cooldownTimerRef.current = setTimeout(() => {
      cooldownRef.current = false;
    }, 6000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Ignore if typing inside any form input or editable field
      const target = e.target;
      const isInput = 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable;

      if (isInput) {
        bufferRef.current = '';
        return;
      }

      // 2. Ignore modifier key combinations
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      // 3. Only track standard alphabetic keys
      if (e.key && e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-7);

        // 4. Check if the buffered keystrokes match "balance"
        if (bufferRef.current === 'balance') {
          triggerEasterEgg();
          bufferRef.current = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, [triggerEasterEgg]);

  const prefersReducedMotion = typeof window !== 'undefined' 
    && window.matchMedia 
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return { isTriggered, triggerEasterEgg, prefersReducedMotion };
}
