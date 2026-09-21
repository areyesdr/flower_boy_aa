import { siteTexts } from '../data/texts'
import { Reveal } from './Reveal'
import { Flower } from './Flower'
import { BumbleBee } from './BumbleBee'
import styles from './ClosingLetter.module.css'

export function ClosingLetter() {
  return (
    <section className={styles.letter} id="carta">
      {/* Decorative floating flower & bee near letter */}
      <div className={styles.decorLeft} aria-hidden="true">
        <BumbleBee
          size={34}
          flip
          duration={6}
          delay={0.6}
          className={styles.beeDecorLeft}
        />
        <Flower size={110} rotate={18} duration={8} showGlow />
      </div>
      <div className={styles.decorRight} aria-hidden="true">
        <BumbleBee size={42} flip duration={5.5} delay={1} />
      </div>

      <Reveal from="scale">
        <div className={styles.card}>
          <div className={styles.sealWrap} aria-hidden="true">
            <div className={styles.seal}>
              <span className={styles.sealEmoji}>🌻</span>
            </div>
          </div>

          <span className={styles.kicker}>{siteTexts.closing.kicker}</span>
          <h2 className={styles.title}>{siteTexts.closing.title}</h2>

          <div className={styles.separator} aria-hidden="true">
            <span className={styles.sepLine} />
            <span className={styles.sepFlower}>🐝</span>
            <span className={styles.sepLine} />
          </div>

          <div className={styles.letterContent}>
            {siteTexts.closing.letter.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.signatureRow}>
            <p className={styles.signature}>{siteTexts.closing.signature}</p>
            <span className={styles.sigFlower} aria-hidden="true">
              🌻
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}