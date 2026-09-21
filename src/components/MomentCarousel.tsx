import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { moments } from '../data/moments'
import { siteTexts } from '../data/texts'
import styles from './MomentCarousel.module.css'

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
  }),
}

const listCardVariants = {
  offscreen: {
    opacity: 0,
    scale: 0.98,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
}

export function MomentCarousel() {
  const [viewMode, setViewMode] = useState<'carousel' | 'list'>('carousel')
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0])

  const go = useCallback((delta: number) => {
    setSlide(([curr]) => [
      (curr + delta + moments.length) % moments.length,
      delta,
    ])
  }, [])

  const goTo = useCallback((target: number) => {
    setSlide(([curr]) => [
      target,
      target > curr ? 1 : target < curr ? -1 : 0,
    ])
  }, [])

  // Keyboard navigation when in carousel mode
  useEffect(() => {
    if (viewMode !== 'carousel') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewMode, go])

  const activeMoment = moments[index]

  return (
    <section className={styles.section} id="momentos">
      <header className={styles.header}>
        <p className={styles.intro}>{siteTexts.moments.intro}</p>

        {/* View Mode Switcher */}
        <div className={styles.modeToggle} role="tablist" aria-label="Modo de visualización">
          <button
            type="button"
            className={`${styles.toggleBtn} ${viewMode === 'carousel' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('carousel')}
            role="tab"
            aria-selected={viewMode === 'carousel'}
          >
            <span>‹ ›</span>
            <span>Ver 1 a 1 (Carrusel)</span>
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('list')}
            role="tab"
            aria-selected={viewMode === 'list'}
          >
            <span>≡</span>
            <span>Ver lista completa (10)</span>
          </button>
        </div>
      </header>

      {viewMode === 'carousel' ? (
        /* CAROUSEL MODE: One card at a time, paced and impossible to scroll past */
        <div className={styles.carouselWrap}>
          <div className={styles.carouselStage}>
            <button
              type="button"
              className={styles.navArrow}
              onClick={() => go(-1)}
              aria-label="Momento anterior"
            >
              ‹
            </button>

            <div className={styles.slideContainer}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.article
                  key={activeMoment.id}
                  className={styles.card}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className={styles.tape} aria-hidden="true" />

                  <div className={styles.media}>
                    <img
                      src={activeMoment.photo}
                      alt={activeMoment.title}
                      className={styles.image}
                    />
                    <div className={styles.mediaOverlay} aria-hidden="true" />
                    <div className={styles.counterBadge}>
                      {index + 1} de {moments.length}
                    </div>
                  </div>

                  <div className={styles.body}>
                    <div>
                      <div className={styles.metaRow}>
                        <span className={styles.date}>{activeMoment.date}</span>
                        <span className={styles.momentStamp}>
                          ✦ MOMENTO #{String(activeMoment.id).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className={styles.title}>{activeMoment.title}</h3>
                    </div>
                    <p className={styles.message}>{activeMoment.message}</p>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <button
              type="button"
              className={styles.navArrow}
              onClick={() => go(1)}
              aria-label="Siguiente momento"
            >
              ›
            </button>
          </div>

          {/* Dots Pagination */}
          <nav className={styles.dots} aria-label="Navegar momentos">
            {moments.map((m, i) => (
              <button
                key={m.id}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Ir al ${m.date} - ${m.title}`}
                aria-current={i === index}
              />
            ))}
          </nav>
        </div>
      ) : (
        /* LIST MODE: Perfectly spaced, identical height, no overlapping animation */
        <div className={styles.listStack}>
          {moments.map((moment, i) => (
            <div key={moment.id} className={styles.listCardItem}>
              <motion.article
                className={styles.card}
                variants={listCardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.25, once: true }}
              >
                <div className={styles.tape} aria-hidden="true" />

                <div className={styles.media}>
                  <img
                    src={moment.photo}
                    alt={moment.title}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    className={styles.image}
                  />
                  <div className={styles.mediaOverlay} aria-hidden="true" />
                  <div className={styles.counterBadge}>
                    #{String(moment.id).padStart(2, '0')}
                  </div>
                </div>

                <div className={styles.body}>
                  <div>
                    <div className={styles.metaRow}>
                      <span className={styles.date}>{moment.date}</span>
                      <span className={styles.momentStamp}>
                        ✦ MOMENTO #{String(moment.id).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className={styles.title}>{moment.title}</h3>
                  </div>
                  <p className={styles.message}>{moment.message}</p>
                </div>
              </motion.article>

              {/* Strict, uniform timeline connector between cards */}
              {i < moments.length - 1 && (
                <div className={styles.timelineDivider} aria-hidden="true">
                  <span className={styles.timelineStem} />
                  <span className={styles.timelineFlower}>🌻</span>
                  <span className={styles.timelineStem} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
