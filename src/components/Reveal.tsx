import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'
import styles from './Reveal.module.css'

export type RevealDirection = 'up' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: ReactNode
  delay?: number
  from?: RevealDirection
  className?: string
}

export function Reveal({ children, delay = 0, from = 'up', className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`${styles.base} ${styles[`from--${from}`]} ${inView ? styles.visible : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  )
}