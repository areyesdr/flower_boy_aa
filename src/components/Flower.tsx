import { useId, type CSSProperties } from 'react'
import styles from './Flower.module.css'

export type FlowerMotion = 'sway' | 'breathe' | 'drift' | 'none'

export interface FlowerColors {
  petalTip: string
  petalBody: string
  petalBase: string
  centerDark: string
  centerRim: string
  centerPollen: string
}

interface FlowerProps {
  size?: number
  petalCount?: number
  colors?: Partial<FlowerColors>
  motion?: FlowerMotion
  duration?: number
  delay?: number
  rotate?: number
  className?: string
  style?: CSSProperties
  showGlow?: boolean
}

const DEFAULT_FLOWER_COLORS: FlowerColors = {
  petalTip: '#fff48f',
  petalBody: '#ffd23f',
  petalBase: '#f59e0b',
  centerDark: '#381403',
  centerRim: '#78350f',
  centerPollen: '#f59e0b',
}

export function Flower({
  size = 80,
  petalCount = 12,
  colors: customColors,
  motion = 'sway',
  duration = 6.5,
  delay = 0,
  rotate = 0,
  className = '',
  style,
  showGlow = false,
}: FlowerProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const petalGradId = `petal-grad-${rawId}`
  const centerGradId = `center-grad-${rawId}`

  const colors: FlowerColors = { ...DEFAULT_FLOWER_COLORS, ...customColors }

  const count = Math.max(8, petalCount)
  const step = 360 / count
  const halfStep = step / 2

  const motionClass =
    motion === 'breathe'
      ? styles.breathe
      : motion === 'drift'
        ? styles.drift
        : motion === 'sway'
          ? styles.sway
          : ''

  return (
    <div
      className={`${styles.flower} ${motionClass} ${showGlow ? styles.glow : ''} ${className}`}
      style={
        {
          width: size,
          height: size,
          '--sway-duration': `${duration}s`,
          animationDelay: `${delay}s`,
          ...style,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={styles.svg}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <defs>
          {/* Petal vertical gradient: warm amber base up to soft sunny yellow rounded tip */}
          <linearGradient id={petalGradId} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor={colors.petalBase} />
            <stop offset="45%" stopColor={colors.petalBody} />
            <stop offset="90%" stopColor={colors.petalTip} />
            <stop offset="100%" stopColor="#fff9b0" />
          </linearGradient>

          {/* Floral velvety center button */}
          <radialGradient id={centerGradId} cx="38%" cy="36%" r="62%">
            <stop offset="0%" stopColor="#c27803" />
            <stop offset="35%" stopColor={colors.centerRim} />
            <stop offset="75%" stopColor={colors.centerDark} />
            <stop offset="100%" stopColor="#1e0b02" />
          </radialGradient>
        </defs>

        {/* Outer/Back Petal Layer (Offset for fullness, soft rounded tips) */}
        <g opacity="0.92">
          {Array.from({ length: count }, (_, i) => (
            <path
              key={`back-${i}`}
              d="M 46 34 C 39 25, 39 14, 44 8 C 47 4, 53 4, 56 8 C 61 14, 61 25, 54 34 Z"
              fill={`url(#${petalGradId})`}
              stroke="rgba(194, 120, 3, 0.45)"
              strokeWidth="0.5"
              transform={`rotate(${step * i + halfStep} 50 50)`}
            />
          ))}
        </g>

        {/* Front Petal Layer (Soft rounded spatula/daisy petals with center veins) */}
        <g>
          {Array.from({ length: count }, (_, i) => (
            <g key={`front-${i}`} transform={`rotate(${step * i} 50 50)`}>
              {/* Petal body with gentle rounded dome tip */}
              <path
                d="M 46 34 C 40 25, 40 14, 45 8 C 48 4.5, 52 4.5, 55 8 C 60 14, 60 25, 54 34 Z"
                fill={`url(#${petalGradId})`}
                stroke="rgba(217, 119, 6, 0.55)"
                strokeWidth="0.65"
              />
              {/* Subtle natural petal vein curve */}
              <path
                d="M 50 9 Q 49.5 22 50 34"
                fill="none"
                stroke="rgba(217, 119, 6, 0.28)"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        {/* Flower Center Disk Floret */}
        <circle cx="50" cy="50" r="14.5" fill={`url(#centerGradId)`} />

        {/* Golden Pollen Floret Ring */}
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="none"
          stroke={colors.centerPollen}
          strokeWidth="1.6"
          strokeDasharray="1.6 2"
          opacity="0.85"
        />

        {/* Inner seed ring */}
        <circle
          cx="50"
          cy="50"
          r="10.5"
          fill="none"
          stroke="#a16207"
          strokeWidth="1.1"
          strokeDasharray="1.2 1.8"
          opacity="0.65"
        />

        {/* Soft core dot */}
        <circle cx="50" cy="50" r="4.8" fill="#260f03" />
      </svg>
    </div>
  )
}