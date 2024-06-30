// Variants used by Framer Motion

export const desktopVariants = {
  open: (height = 1000) => ({
    display: "flex",
    clipPath: `circle(${height + 200}px at right top)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    display: "none",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const mobileVariants = {
  open: (height = 1100) => ({
    display: "block",
    clipPath: `circle(${height + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    display: "none",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 600,
      damping: 200,
    },
  },
};
