import React, { useState } from 'react';

export const MAJAWA_LOGO_PATH =
  '/assets/aistudio/Maharashtra_Junior_Advocate_Welfare_Crest_e2aec245.png';

interface CrestProps {
  className?: string;
}

/**
 * Official uploaded MAJAWA crest logo with resilient fallback.
 */
export function MajawaCrest({ className = 'w-11 h-11' }: CrestProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} rounded-full bg-[#162C46] text-white flex items-center justify-center font-editorial font-bold text-xs tracking-wider border border-[#B08D32]`}
        role="img"
        aria-label="MAJAWA Official Seal Emblem"
      >
        MAJAWA
      </div>
    );
  }

  return (
    <img
      src={MAJAWA_LOGO_PATH}
      alt="Maharashtra Junior Advocates Welfare Association (MAJAWA) Official Crest"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${className} object-contain rounded-full bg-white`}
    />
  );
}

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectClass?: string;
}

export function EditorialImage({
  src,
  alt,
  caption,
  className = '',
  aspectClass = 'aspect-[4/3]',
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-slate-100 border border-slate-200 rounded-md ${aspectClass}`}>
        {!failed ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100 text-[#162C46]">
            <MajawaCrest className="w-16 h-16 mb-3" />
            <p className="font-editorial text-lg font-semibold">MAJAWA</p>
            <p className="text-xs text-slate-600 mt-1 max-w-xs">{alt}</p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-xs font-editorial italic text-slate-600 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
