// Variants used by Framer Motion

export const desktopVariants = {
  open: {
    display: "flex",
    clipPath: `circle(300dvh at right top)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
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
  open: {
    display: "block",
    clipPath: `circle(300dvh at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
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
