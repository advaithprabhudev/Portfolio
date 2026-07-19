import { useRef, useState } from 'react';

const TRACK_PREVIEW_URL =
  'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/d3/f6/6f/d3f66feb-3c55-3194-7ddf-6c81cfd24e2e/mzaf_5311300447719970186.plus.aac.p.m4a';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || isUnavailable) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setIsUnavailable(true);
    }
  };

  const playbackLabel = isUnavailable
    ? 'Luv(sic) preview unavailable'
    : `${isPlaying ? 'Pause' : 'Play'} Luv(sic) by Nujabes`;

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={TRACK_PREVIEW_URL}
        preload="none"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsUnavailable(true)}
      />
      <button
        type="button"
        className="music-player__control"
        aria-label={playbackLabel}
        aria-pressed={isPlaying}
        disabled={isUnavailable}
        onClick={togglePlayback}
      >
        <span
          aria-hidden="true"
          className={`music-player__disc${isPlaying ? ' music-player__disc--playing' : ''}`}
        />
        <svg
          aria-hidden="true"
          className={`music-player__stylus${isPlaying ? ' music-player__stylus--playing' : ''}`}
          viewBox="0 0 54 73"
        >
          <path d="M49 4 35 44c-2 6-5 10-10 13L10 66" />
          <rect x="43" y="6" width="9" height="20" rx="3" transform="rotate(16 43 6)" />
          <path d="m13 59 8 9-17 4c-2 .5-4-1-4-3 0-1 .5-2 2-3l11-7Z" />
        </svg>
      </button>
      <p className="music-player__track" aria-hidden="true">
        <span>{isUnavailable ? 'Audio unavailable' : isPlaying ? 'Now playing' : 'Click the record'}</span>
        Luv(sic) · Nujabes
      </p>
    </div>
  );
}
