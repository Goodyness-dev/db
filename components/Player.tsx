'use client';

import React, { useState, useRef, useEffect } from 'react';

interface PlayerProps {
  streamUrl: string;
  title: string;
  viewerEmail: string;
  watermarkText?: string;
  onEnded?: () => void;
}

export default function Player({
  streamUrl,
  title,
  viewerEmail,
  watermarkText,
  onEnded,
}: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [watermarkPos, setWatermarkPos] = useState({ top: '20%', left: '30%' });
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Periodically move watermark around the frame to prevent cropping/masking
  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(10 + Math.random() * 75) + '%';
      const left = Math.floor(10 + Math.random() * 70) + '%';
      setWatermarkPos({ top, left });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = Number(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const val = Number(e.target.value);
    videoRef.current.volume = val;
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative aspect-video w-full max-w-5xl mx-auto bg-black rounded-2xl overflow-hidden border border-border shadow-2xl group select-none"
    >
      <video
        ref={videoRef}
        src={streamUrl}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Floating Dynamic Anti-Piracy Watermark */}
      <div
        style={{
          top: watermarkPos.top,
          left: watermarkPos.left,
          transition: 'all 3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className="absolute pointer-events-none select-none z-30 opacity-20 text-[11px] font-mono tracking-widest text-white/90 bg-black/40 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm"
      >
        {watermarkText || `${viewerEmail} • VAULT WATERMARK`}
      </div>

      {/* Security Token Verified Tag */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-border text-[10px] font-mono text-text-secondary backdrop-blur-md">
          <span className="text-gold font-bold">VERIFIED</span>
          <span>Encrypted Session • 4K Stream</span>
        </div>
      </div>

      {/* Big Play Button Overlay when paused */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 cursor-pointer backdrop-blur-[2px] transition-all"
        >
          <div className="px-6 py-3 rounded-full bg-gold/90 hover:bg-gold text-black font-mono font-bold text-xs sm:text-sm tracking-wider shadow-2xl shadow-gold/40 hover:scale-105 transition-all">
            PLAY STREAM
          </div>
        </div>
      )}

      {/* Player Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber Range */}
        <div className="space-y-1 mb-3">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-surface-3 hover:h-2 rounded-lg appearance-none cursor-pointer accent-gold transition-all"
          />
        </div>

        {/* Buttons and timestamps */}
        <div className="flex items-center justify-between text-text-primary text-xs font-mono">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="px-2.5 py-1 bg-surface-2 hover:bg-gold hover:text-black rounded border border-border transition-colors font-bold"
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>

            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime = Math.max(0, currentTime - 10);
              }}
              className="px-2 py-1 bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary rounded border border-border transition-colors hidden sm:block"
            >
              -10S
            </button>

            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="px-2 py-1 bg-surface-2 hover:text-gold rounded border border-border transition-colors">
                {isMuted || volume === 0 ? 'MUTED' : 'AUDIO'}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 sm:w-20 h-1 bg-surface-3 rounded cursor-pointer accent-gold hidden sm:block"
              />
            </div>

            <div className="text-text-muted text-xs">
              <span className="text-text-primary">{formatTime(currentTime)}</span> / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-surface-2 border border-border text-gold rounded font-mono">
              4K 60FPS
            </span>
            <button onClick={toggleFullscreen} className="px-2.5 py-1 bg-surface-2 hover:text-gold rounded border border-border transition-colors font-bold text-[11px] sm:text-xs">
              FULLSCREEN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
