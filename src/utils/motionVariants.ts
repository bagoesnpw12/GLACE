import { type Variants, type TargetAndTransition } from 'motion/react';

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: "easeOut" as any,
    },
  },
};

export const cardInteractiveHover: {
  whileHover: TargetAndTransition;
  whileTap: TargetAndTransition;
} = {
  whileHover: { 
    y: -4, 
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as any } 
  },
  whileTap: { 
    scale: 0.985 
  },
};
