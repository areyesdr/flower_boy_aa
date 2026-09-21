import { type CSSProperties } from 'react'
import styles from './BumbleBee.module.css'

interface BumbleBeeProps {
  size?: number
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  flip?: boolean
}

export function BumbleBee({
  size = 42,
  className = '',
  style,
  delay = 0,
  duration = 6,
  flip = false,
}: BumbleBeeProps) {
  return (
    <div
      className={`${styles.beeWrap} ${className}`}
      style={
        {
          width: size,
          height: size * 0.85,
          '--bee-duration': `${duration}s`,
          animationDelay: `${delay}s`,
          transform: flip ? 'scaleX(-1)' : undefined,
          ...style,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 60 50"
        width="100%"
        height="100%"
        className={styles.beeSvg}
      >
        <defs>
          <radialGradient id="wingGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#dbeafe" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.2" />
          </radialGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd23f" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Back wing */}
        <ellipse
          className={`${styles.wing} ${styles.wingBack}`}
          cx="24"
          cy="12"
          rx="14"
          ry="7"
          fill="url(#wingGrad)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="0.8"
          transform="rotate(-28 24 12)"
        />

        {/* Front wing */}
        <ellipse
          className={`${styles.wing} ${styles.wingFront}`}
          cx="30"
          cy="10"
          rx="16"
          ry="8"
          fill="url(#wingGrad)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="0.8"
          transform="rotate(-15 30 10)"
        />

        {/* Bee body: fuzzy oval */}
        <ellipse cx="32" cy="28" rx="19" ry="13" fill="url(#bodyGrad)" />

        {/* Black stripes */}
        <path
          d="M 23 17 Q 24 28 23 39 Q 28 39 28 28 Q 28 17 23 17 Z"
          fill="#1c1208"
        />
        <path
          d="M 33 15 Q 34 28 33 41 Q 38 41 38 28 Q 38 15 33 15 Z"
          fill="#1c1208"
        />
        <path
          d="M 43 18 Q 44 28 43 38 Q 47 37 47 28 Q 47 19 43 18 Z"
          fill="#1c1208"
        />

        {/* Stinger */}
        <polygon points="51,27 57,28 51,29" fill="#1c1208" />

        {/* Head */}
        <circle cx="15" cy="28" r="8.5" fill="#1c1208" />

        {/* Eye highlight */}
        <circle cx="12.5" cy="26" r="2.2" fill="#fff" opacity="0.9" />
        <circle cx="11.8" cy="25.3" r="0.9" fill="#000" />

        {/* Antennae */}
        <path
          d="M 13 21 Q 10 13 7 14"
          fill="none"
          stroke="#1c1208"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="6.5" cy="14" r="1.2" fill="#f59e0b" />
        <path
          d="M 15 20 Q 15 12 18 11"
          fill="none"
          stroke="#1c1208"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="18" cy="11" r="1.2" fill="#f59e0b" />

        {/* Golden pollen glow on fuzzy fur */}
        <ellipse cx="28" cy="20" rx="9" ry="3" fill="#fff" opacity="0.3" />
      </svg>
    </div>
  )
}
