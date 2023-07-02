export const ANIMATED_Y_STACK_VARIANTS = {
  leftFade: {
    true: {
      x: -50,
      opacity: 0,
    },
  },
  rightFade: {
    true: {
      x: 50,
      opacity: 0,
    },
  },
  none: {
    true: {
      x: 0,
      opacity: 1,
    },
  },
} as const;
