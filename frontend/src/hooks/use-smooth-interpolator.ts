'use client';

import { useEffect, useState } from 'react';

export function useSmoothInterpolator(value: number, durationMs = 420) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const from = displayValue;
    const delta = value - from;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(from + delta * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs, value]);

  return displayValue;
}
