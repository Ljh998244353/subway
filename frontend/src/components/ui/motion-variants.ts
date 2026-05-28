import type { Transition, Variants } from 'framer-motion';

export const sidebarVariants: Variants = {
  hidden: { x: 400, opacity: 0, backdropFilter: 'blur(0px)' },
  visible: {
    x: 0,
    opacity: 1,
    backdropFilter: 'blur(20px)',
    transition: { type: 'spring', stiffness: 90, damping: 20, mass: 0.8 }
  },
  exit: {
    x: 400,
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { ease: 'easeInOut', duration: 0.25 }
  }
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

export const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

export const springTickConfig: Transition = { type: 'spring', stiffness: 60, damping: 15, restDelta: 0.001 };
