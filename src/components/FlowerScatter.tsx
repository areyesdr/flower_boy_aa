import { useMemo, type CSSProperties } from 'react'
import { seededRandom } from '../utils/seed'
import { Flower } from './Flower'
import styles from './FlowerScatter.module.css'

interface FlowerScatterProps {
  count?: number
}

interface ScatteredFlower {
  id: number
  size: number
  left: string
  top: string
  rotate: number
  delay: number
  spinDuration: number
  small: boolean
}

const COLS = 7

export function FlowerScatter({ count = 28 }: FlowerScatterProps) {
  const flowers = useMemo<ScatteredFlower[]>(() => {
    if (typeof window === 'undefined') return []
    const rows = Math.ceil(count / COLS)
    const cellSize = Math.min(window.innerWidth / COLS, 190)
    const maxSize = Math.round(cellSize * 0.6)
    const sizeRange = Math.max(1, maxSize - 34)

    return Array.from({ length: count }, (_, i) => {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      const size = Math.round(34 + seededRandom(i + 31) * sizeRange)
      const left =
        ((col + 0.42 + seededRandom(i + 7) * 0.36) / COLS) * 100
      const top =
        ((row + 0.38 + seededRandom(i + 13) * 0.5) / rows) * 100
      const spinDuration = 40 + seededRandom(i + 113) * 50
      return {
        id: i,
        size,
        left: `min(${left}%, calc(100% - ${size}px))`,
        top: `${Math.max(2, Math.min(96, top))}%`,
        rotate: seededRandom(i + 57) * 360,
        delay: -seededRandom(i + 89) * spinDuration,
        spinDuration,
        small: size < 60,
      }
    })
  }, [count])

  return (
    <div className={styles.scatter} aria-hidden="true">
      {flowers.map((flower) => (
        <Flower
          key={flower.id}
          size={flower.size}
          motion="sway"
          duration={flower.spinDuration / 6}
          className={`${styles.flower} ${flower.small ? styles.small : styles.big}`}
          style={
            {
              left: flower.left,
              top: flower.top,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}