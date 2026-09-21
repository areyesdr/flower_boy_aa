import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { moments } from '../data/moments'
import { siteTexts } from '../data/texts'
import { useInView } from '../hooks/useInView'
import styles from './PhotoGallery.module.css'

const SLIDESHOW_MS = 5000
const items = moments.map((item) => ({
  src: item.photo,
  caption: `${item.date} — ${item.title}`,
  title: item.title,
  date: item.date,
}))

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
  }),
}

export function PhotoGallery() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const pausedRef = useRef(false)
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.3, once: false })

  const go = useCallback((delta: number) => {
    setState(([current]) => [(current + delta + items.length) % items.length, delta])
  }, [])

  const goTo = useCallback((target: number) => {
    setState(([current]) => [
      target,
      target > current ? 1 : target < current ? -1 : 0,
    ])
  }, [])

  useEffect(() => {
    if (!inView) {
      const rafId = requestAnimationFrame(() => {
        setState([0, 0])
      })
      return () => cancelAnimationFrame(rafId)
    }
    const timer = window.setInterval(() => {
      if (pausedRef.current) return
      go(1)
    }, SLIDESHOW_MS)
    return () => window.clearInterval(timer)
  }, [inView, go])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') go(-1)
      if (event.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [go])

  const active = items[index]

  return (
    <section
      className={styles.gallery}
      id="galeria"
      ref={sectionRef}
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
    >
      <header className={styles.header}>
        <span className={styles.kicker}>🌻 COLECCIÓN DE RECUERDOS 🐝</span>
        <h2 className={styles.heading}>{siteTexts.gallery.heading}</h2>
        <p className={styles.intro}>{siteTexts.gallery.intro}</p>
      </header>

      <div className={styles.stage}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => go(-1)}
          aria-label={siteTexts.gallery.previous}
        >
          ‹
        </button>

        <div className={styles.frame}>
          {/* Corner gold vinyl brackets */}
          <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
          <div className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
          <div className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
          <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

          <AnimatePresence initial={false} custom={direction}>
            <motion.figure
              key={index}
              className={styles.figure}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.35, 0, 0.25, 1] }}
            >
              <img className={styles.image} src={active.src} alt={active.caption} />
              <div className={styles.vignette} aria-hidden="true" />
            </motion.figure>
          </AnimatePresence>

          {/* Photo Counter Pill */}
          <div className={styles.counterPill} aria-hidden="true">
            {index + 1} / {items.length}
          </div>
        </div>

        <button
          type="button"
          className={styles.arrow}
          onClick={() => go(1)}
          aria-label={siteTexts.gallery.next}
        >
          ›
        </button>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <motion.span
          key={index}
          className={styles.progressFill}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SLIDESHOW_MS / 1000, ease: 'linear' }}
        />
      </div>

      <nav className={styles.dots} aria-label={siteTexts.gallery.heading}>
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={item.caption}
            aria-current={i === index}
          />
        ))}
      </nav>

      <div className={styles.captionWrap}>
        <p className={styles.captionDate}>{active.date}</p>
        <p className={styles.captionTitle}>{active.title}</p>
      </div>
    </section>
  )
}
