import { siteTexts } from './data/texts'
import { ClosingLetter } from './components/ClosingLetter'
import { FloatingPetals } from './components/FloatingPetals'
import { FlowerScatter } from './components/FlowerScatter'
import { Hero } from './components/Hero'
import { MomentCarousel } from './components/MomentCarousel'
import { MusicPlayer } from './components/MusicPlayer'
import { PhotoGallery } from './components/PhotoGallery'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <FlowerScatter count={28} />
      <FloatingPetals count={14} />
      <MusicPlayer />

      <main className={styles.main}>
        <Hero />
        <MomentCarousel />
        <PhotoGallery />
        <ClosingLetter />
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            <span className={styles.footerFlower} aria-hidden="true">🌻</span>
            <span>{siteTexts.footer}</span>
            <span className={styles.footerFlower} aria-hidden="true">🐝</span>
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App