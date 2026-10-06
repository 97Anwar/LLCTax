import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  slotId?: string;
  adClient?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

/**
 * AdSlot Component — Google AdSense Ready
 * Engineered with strict CLS-proof bounding dimensions to prevent Cumulative Layout Shift penalties.
 * Displays a clean, elegant placeholder during review/pre-rendering and mounts AdSense upon approval.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  adClient,
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Sponsored Compliance Resource',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // Only attempt to push adsbygoogle on client-side when adClient and slotId are configured
    if (typeof window !== 'undefined' && adClient && slotId && !isLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (err) {
        // Silently handle adblock or pre-approval initialization warnings
      }
    }
  }, [adClient, slotId]);

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 text-center transition-all min-h-[100px] ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
        {label}
      </div>

      {adClient && slotId ? (
        <ins
          ref={adRef}
          className="adsbygoogle w-full"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      ) : (
        <div className="text-xs text-zinc-400 dark:text-zinc-600 font-sans max-w-sm">
          Independent regulatory reference • Verified state statutes
        </div>
      )}

      <div data-ad-slot="guide-in-article" className="w-full flex items-center justify-center" />
    </div>
  );
};
