import { useId, useMemo, type CSSProperties } from 'react'
import { seededRandom } from '../utils/seed'
import styles from './FloatingPetals.module.css'

interface FloatingPetalsProps {
  count?: number
  pollenCount?: number
}

interface Petal {
  id: number
  left: string
  size: number
  duration: number
  delay: number
  opacity: number
  drift: string
  rotateSpeed: number
}

interface PollenGrain {
  id: number
  left: string
  top: string
  size: number
  duration: number
  delay: number
}

function SunflowerPetalShape({ gradId }: { gradId: string }) {
  return (
    <svg viewBox="0 0 28 42" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#fff275" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="90%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      {/* Tapered organic petal */}
      <path
        d="M 14 2 C 23 12 26 26 14 40 C 2 26 5 12 14 2 Z"
        fill={`url(#${gradId})`}
        stroke="rgba(180, 83, 9, 0.45)"
        strokeWidth="0.75"
      />
      {/* Center delicate crease / vein */}
      <path
        d="M 14 6 Q 13.5 22 14 36"
        fill="none"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FloatingPetals({ count = 16, pollenCount = 18 }: FloatingPetalsProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const gradId = `petal-grad-${rawId}`

  const petals: Petal[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const duration = 11 + seededRandom(i + 143) * 13
      return {
        id: i,
        left: `${seededRandom(i + 5) * 98}%`,
        size: 16 + seededRandom(i + 77) * 20,
        duration,
        delay: -seededRandom(i + 199) * duration,
        opacity: 0.35 + seededRandom(i + 257) * 0.45,
        drift: `${(seededRandom(i + 313) - 0.5) * 14}vw`,
        rotateSpeed: 4 + seededRandom(i + 61) * 6,
      }
    })
  }, [count])

  const pollens: PollenGrain[] = useMemo(() => {
    return Array.from({ length: pollenCount }, (_, i) => {
      const duration = 5 + seededRandom(i + 211) * 7
      return {
        id: i,
        left: `${seededRandom(i + 23) * 98}%`,
        top: `${seededRandom(i + 87) * 98}%`,
        size: 3 + seededRandom(i + 101) * 3.5,
        duration,
        delay: -seededRandom(i + 43) * duration,
      }
    })
  }, [pollenCount])

  return (
    <div className={styles.field} aria-hidden="true">
      {/* Golden pollen dust particles */}
      {pollens.map((p) => (
        <span
          key={`pollen-${p.id}`}
          className={styles.pollen}
          style={
            {
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              '--pollen-duration': `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}

      {/* Tumbling sunflower petals */}
      {petals.map((petal) => (
        <div
          key={`petal-${petal.id}`}
          className={styles.petal}
          style={
            {
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.5,
              '--petal-duration': `${petal.duration}s`,
              '--petal-delay': `${petal.delay}s`,
              '--petal-opacity': petal.opacity,
              '--petal-drift': petal.drift,
              '--rotate-duration': `${petal.rotateSpeed}s`,
            } as CSSProperties
          }
        >
          <div className={styles.petalInner}>
            <SunflowerPetalShape gradId={gradId} />
          </div>
        </div>
      ))}
    </div>
  )
}