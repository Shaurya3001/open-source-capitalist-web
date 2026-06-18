"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "osc:read";
const EVENT = "osc-progress";

/**
 * Tracks which lessons the reader has completed, in localStorage. Hydration-safe
 * (empty on the server, filled after mount) and synced live across components in
 * the same tab via a custom event.
 */
export function useProgress() {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(KEY);
        setDone(raw ? new Set(JSON.parse(raw) as string[]) : new Set());
      } catch {
        /* localStorage unavailable — treat as no progress */
      }
    };
    read();
    setHydrated(true);
    window.addEventListener(EVENT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(EVENT, read);
      window.removeEventListener("storage", read);
    };
  }, []);

  const markDone = useCallback((slug: string) => {
    try {
      const raw = localStorage.getItem(KEY);
      const set = new Set(raw ? (JSON.parse(raw) as string[]) : []);
      if (set.has(slug)) return;
      set.add(slug);
      localStorage.setItem(KEY, JSON.stringify([...set]));
      window.dispatchEvent(new Event(EVENT));
    } catch {
      /* ignore */
    }
  }, []);

  const isDone = useCallback((slug: string) => done.has(slug), [done]);

  return { done, isDone, markDone, hydrated };
}
