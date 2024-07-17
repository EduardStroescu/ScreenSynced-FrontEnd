import PropTypes from "prop-types";

export function Separator({ children, className }) {
  return (
    <div
      className={`${className ? className : ""} relative flex flex-row items-center justify-center`}
    >
      <hr className="absolute w-full border-t-[2px] border-t-[#06b6d4]" />
      {children}
    </div>
  );
}

Separator.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
