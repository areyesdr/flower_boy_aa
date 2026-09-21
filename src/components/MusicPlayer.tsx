import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { seeYouAgainLyrics } from '../data/lyrics'
import styles from './MusicPlayer.module.css'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [active, setActive] = useState<number>(-1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(0.5) // Default 50%

  // Muted autoplay on mount to conform to browser media policies
  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    el.muted = true
    el.volume = volume

    let isMounted = true

    const tryAutoplay = () => {
      const playPromise = el.play()
      if (playPromise) {
        playPromise
          .then(() => {
            if (isMounted) setIsPlaying(true)
          })
          .catch(() => {
            if (isMounted) setIsPlaying(false)
          })
      }
    }

    const onCanPlay = () => {
      if (el.paused && isMounted) {
        tryAutoplay()
      }
    }

    el.addEventListener('canplay', onCanPlay)
    tryAutoplay()

    return () => {
      isMounted = false
      el.removeEventListener('canplay', onCanPlay)
    }
  }, [volume])

  // Smooth fade-in volume up to current set volume level
  const fadeInVolume = useCallback(
    (targetVol = volume) => {
      const el = audioRef.current
      if (!el) return

      el.muted = false
      setIsMuted(false)
      el.volume = 0

      let vol = 0
      const step = 0.05
      const timer = window.setInterval(() => {
        vol = Math.min(vol + step, targetVol)
        if (el) el.volume = vol
        if (vol >= targetVol) {
          window.clearInterval(timer)
        }
      }, 70)
    },
    [volume]
  )

  // Unmute on first user gesture anywhere on the page
  useEffect(() => {
    const el = audioRef.current
    if (!el || !isMuted) return

    const handleFirstGesture = () => {
      if (el.muted) {
        fadeInVolume(volume)
      }
      if (el.paused) {
        el.play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
      }
    }

    const events = ['pointerdown', 'touchstart', 'click', 'keydown']
    events.forEach((evt) => window.addEventListener(evt, handleFirstGesture, { once: true }))

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleFirstGesture))
    }
  }, [isMuted, fadeInVolume, volume])

  // Continuous real-time synchronization engine (RAF + fallback interval)
  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    let rafId: number | null = null

    const syncNow = () => {
      const t = el.currentTime
      let idx = -1
      for (let i = 0; i < seeYouAgainLyrics.length; i++) {
        if (t >= seeYouAgainLyrics[i].time) {
          idx = i
        } else {
          break
        }
      }
      setActive((prev) => (prev !== idx ? idx : prev))
    }

    const tick = () => {
      syncNow()
      if (!el.paused && !el.ended) {
        rafId = requestAnimationFrame(tick)
      } else {
        rafId = null
      }
    }

    const onPlay = () => {
      setIsPlaying(true)
      if (rafId === null) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const onPause = () => {
      setIsPlaying(false)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      syncNow()
    }

    const onTimeUpdate = () => {
      syncNow()
      if (!el.paused && rafId === null) {
        rafId = requestAnimationFrame(tick)
      }
    }

    el.addEventListener('play', onPlay)
    el.addEventListener('playing', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onPause)
    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('seeking', syncNow)
    el.addEventListener('seeked', syncNow)
    el.addEventListener('ratechange', syncNow)

    // Fallback timer: prevents browser throttling from halting lyric updates
    const intervalId = window.setInterval(() => {
      if (!el.paused) {
        syncNow()
        if (rafId === null) {
          rafId = requestAnimationFrame(tick)
        }
      }
    }, 100)

    const onVisibilityChange = () => {
      syncNow()
      if (!el.paused && rafId === null) {
        rafId = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    syncNow()
    if (!el.paused) {
      onPlay()
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('playing', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onPause)
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('seeking', syncNow)
      el.removeEventListener('seeked', syncNow)
      el.removeEventListener('ratechange', syncNow)
    }
  }, [])

  const togglePlay = () => {
    const el = audioRef.current
    if (!el) return

    if (el.muted) {
      fadeInVolume(volume)
    }

    if (el.paused) {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    } else {
      el.pause()
      setIsPlaying(false)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value)
    setVolume(newVol)

    const el = audioRef.current
    if (el) {
      el.volume = newVol
      if (el.muted && newVol > 0) {
        el.muted = false
        setIsMuted(false)
      }
    }
  }

  const toggleMute = () => {
    const el = audioRef.current
    if (!el) return

    if (isMuted || el.muted) {
      el.muted = false
      setIsMuted(false)
      el.volume = volume > 0 ? volume : 0.5
      if (volume === 0) setVolume(0.5)
    } else {
      el.muted = true
      setIsMuted(true)
    }
  }

  const currentLyric =
    active >= 0
      ? seeYouAgainLyrics[active].text
      : '♪ See You Again — Tyler, The Creator & Kali Uchis ♪'

  return (
    <aside
      className={styles.dock}
      aria-label="Reproductor See You Again con letra en tiempo real"
    >
      <audio
        ref={audioRef}
        src="/music/see_you_again.mp3"
        preload="auto"
        loop={false}
        playsInline
      />

      {/* ROW 1: Song info & compact controls */}
      <div className={styles.topRow}>
        <div className={styles.songInfo}>
          <p className={styles.songTitle}>🌻 See You Again</p>
          <span className={styles.songArtist}>Tyler, The Creator &amp; Kali Uchis</span>
        </div>

        <div className={styles.controls}>
          {isMuted && isPlaying && (
            <button
              type="button"
              className={styles.muteHint}
              onClick={() => fadeInVolume(volume)}
              title="Activar audio"
              aria-label="Activar audio"
            >
              <span>🔊</span>
              <span>Activar</span>
            </button>
          )}

          {/* Volume Control (Slider + Percentage, default 50%) */}
          <div className={styles.volumeGroup} title={`Volumen: ${Math.round(volume * 100)}%`}>
            <button
              type="button"
              className={styles.volBtn}
              onClick={toggleMute}
              aria-label={isMuted || volume === 0 ? 'Activar sonido' : 'Silenciar sonido'}
            >
              {isMuted || volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : '🔊'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className={styles.volSlider}
              aria-label="Ajustar volumen"
            />
            <span className={styles.volPercent}>
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>

          {/* Play / Pause */}
          <button
            type="button"
            className={styles.fab}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
        </div>
      </div>

      {/* ROW 2: ONLY the currently active lyric line */}
      <div className={styles.lyricRow} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={active >= 0 ? active : 'intro'}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={styles.lyricText}
          >
            {currentLyric}
          </motion.p>
        </AnimatePresence>
      </div>
    </aside>
  )
}
