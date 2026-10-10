'use client';

import { useEffect } from 'react';

/** Native details keep the reference light; hash links reveal their destination. */
export default function ApiReferenceNavigation() {
  useEffect(() => {
    function revealReference() {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      let decodedHash = hash;
      try { decodedHash = decodeURIComponent(hash); } catch { /* A malformed hash cannot identify a schema. */ }
      const target = document.getElementById(hash) || document.getElementById(decodedHash);
      if (!target) return;
      let details = target.closest('details');
      while (details) {
        details.open = true;
        details = details.parentElement?.closest('details');
      }
    }
    revealReference();
    window.addEventListener('hashchange', revealReference);
    return () => window.removeEventListener('hashchange', revealReference);
  }, []);
  return null;
}
