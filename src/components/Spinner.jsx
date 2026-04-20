import { cn } from "@lib/cn";
import PropTypes from "prop-types";

export function Spinner({
  children,
  duration = 6000,
  style,
  className,
  reverse = false,
  fontSize = 1,
  radius = 5,
}) {
  const letters = children.split("");
  const totalLetters = letters.length;

  return (
    <div
      className={cn("relative animate-[spin]", className)}
      style={{
        animationDuration: `${duration}ms`,
        animationDirection: reverse ? "reverse" : "normal",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        ...style,
      }}
    >
      {letters.map((letter, index) => (
        <span
          aria-hidden="true"
          key={`${index}-${letter}`}
          className="starting:opacity-0 absolute left-1/2 top-1/2 z-[999999] inline-block opacity-100 transition-opacity"
          style={{
            "--index": index,
            "--total": totalLetters,
            "--font-size": fontSize,
            "--radius": radius,
            fontSize: `calc(var(--font-size, 2) * 1rem)`,
            transform: `
                    translate(-50%, -50%)
                    rotate(calc(360deg / var(--total) * var(--index)))
                    translateY(calc(var(--radius, 5) * -1ch))
                  `,
            transformOrigin: "center",
            transitionDelay: `${index * 50}ms`,
            transitionDuration: `750ms`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </div>
  );
}

Spinner.propTypes = {
  children: PropTypes.string,
  duration: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  reverse: PropTypes.bool,
  fontSize: PropTypes.number,
  radius: PropTypes.number,
};
