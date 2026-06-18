"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Holds a secret (an API key) in sessionStorage — NOT localStorage.
 * sessionStorage survives reloads within the same tab but is erased the moment
 * the tab/window closes, so the key is never persisted to disk. The key only
 * ever lives in this browser tab; it is sent to our server solely to proxy a
 * single request and is never stored or logged server-side.
 */
export function useSessionKey(storageKey: string) {
  const [key, setKeyState] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setKeyState(sessionStorage.getItem(storageKey) ?? "");
    } catch {
      /* sessionStorage unavailable (SSR / privacy mode) — treat as no key */
    }
    setHydrated(true);
  }, [storageKey]);

  const setKey = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      setKeyState(trimmed);
      try {
        if (trimmed) sessionStorage.setItem(storageKey, trimmed);
        else sessionStorage.removeItem(storageKey);
      } catch {
        /* ignore write failures */
      }
    },
    [storageKey],
  );

  const clear = useCallback(() => setKey(""), [setKey]);

  return { key, setKey, clear, hydrated };
}
