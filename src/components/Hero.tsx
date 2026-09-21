import { Flower } from './Flower'
import { BumbleBee } from './BumbleBee'
import { siteTexts } from '../data/texts'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      {/* Sun flare backdrop */}
      <div className={styles.sunGlow} aria-hidden="true" />

      {/* Decorative Sunflowers & Flower Boy Bees */}
      <div className={styles.floraField} aria-hidden="true">
        {/* Top Left Major Sunflower with hovering bee */}
        <div className={styles.posTopLeft}>
          <BumbleBee
            size={40}
            flip
            duration={5.5}
            delay={1.1}
            className={styles.beeTopLeft}
          />
          <Flower size={180} rotate={14} duration={8} showGlow />
        </div>

        {/* Top Right Sunflower with hovering bee */}
        <div className={styles.posTopRight}>
          <BumbleBee
            size={46}
            flip
            duration={5}
            delay={0.8}
            className={styles.beeTopRight}
          />
          <Flower size={135} rotate={-20} duration={9} delay={0.6} showGlow />
        </div>

        {/* Mid-floating free bee (left side) */}
        <div className={styles.posMidBee}>
          <BumbleBee size={38} flip duration={7} delay={1.8} />
        </div>

        {/* Bottom Left Sunflower with bee */}
        <div className={styles.posBottomLeft}>
          <BumbleBee
            size={32}
            flip
            duration={6}
            delay={2.3}
            className={styles.beeBottomLeft}
          />
          <Flower size={110} rotate={48} duration={7.5} delay={1.2} />
        </div>

        {/* Bottom Right Sunflower */}
        <div className={styles.posBottomRight}>
          <Flower size={125} rotate={-35} duration={8.5} delay={1.5} />
          <BumbleBee
            size={34}
            duration={5.5}
            delay={2.2}
            className={styles.beeBottomRight}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.badgeWrap}>
          <span className={styles.badge}>
            <span className={styles.badgeIcon}>🌻</span>
            <span className={styles.badgeText}>DÍA DE LAS FLORES AMARILLAS</span>
            <span className={styles.badgeIcon}>✨</span>
          </span>
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleGradient}>{siteTexts.hero.title}</span>
        </h1>

        <p className={styles.subtitle}>{siteTexts.hero.subtitle}</p>

        <div className={styles.ctaWrap}>
          <a className={styles.cta} href="#momentos">
            <span className={styles.ctaText}>{siteTexts.hero.cta}</span>
            <span className={styles.ctaArrow}>↓</span>
          </a>
        </div>
      </div>

      <div className={styles.scroll} aria-hidden="true" />
    </section>
  )
}