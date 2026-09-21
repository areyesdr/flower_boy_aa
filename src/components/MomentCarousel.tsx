import { motion } from 'motion/react'
import { moments } from '../data/moments'
import { siteTexts } from '../data/texts'
import styles from './MomentCarousel.module.css'

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
  return (
    <section className={styles.section} id="momentos">
      <header className={styles.header}>
        <p className={styles.intro}>{siteTexts.moments.intro}</p>
      </header>

      {/* LIST MODE: all cards stacked, perfectly spaced, no overlapping animation */}
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
    </section>
  )
}