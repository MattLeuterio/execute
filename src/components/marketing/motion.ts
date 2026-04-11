import type { TargetAndTransition, Transition } from "framer-motion"

const revealTransition: Transition = {
  duration: 0.6,
  ease: "easeOut",
}

type RevealInViewOptions = {
  delay?: number
  reducedMotion?: boolean
}

export function getRevealInViewProps({ delay = 0, reducedMotion = false }: RevealInViewOptions = {}) {
  return {
    initial: { opacity: 0, y: reducedMotion ? 0 : 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { ...revealTransition, delay },
  } as const
}

export function getSoftFloatAnimation(reducedMotion: boolean): {
  animate?: TargetAndTransition
  transition?: Transition
} {
  if (reducedMotion) {
    return {}
  }

  return {
    animate: { y: [0, -3, 0] },
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  }
}