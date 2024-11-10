import { useClickOutside } from "@hooks/useClickOutside";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropTypes from "prop-types";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";

const TestComponent = ({ onOutsideClick }) => {
  const ref = useRef();
  useClickOutside(ref, onOutsideClick);

  return (
    <div
      ref={ref}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "lightgray",
      }}
    >
      Click Inside
    </div>
  );
};

TestComponent.propTypes = {
  onOutsideClick: PropTypes.func,
};

describe("useClickOutside", () => {
  it("calls handler when clicking outside", async () => {
    const handleOutsideClick = vi.fn();
    render(<TestComponent onOutsideClick={handleOutsideClick} />);

    // Click outside the component
    await userEvent.click(document.body);
    expect(handleOutsideClick).toHaveBeenCalled();
  });

  it("does not call handler when clicking inside", async () => {
    const handleOutsideClick = vi.fn();
    const { getByText } = render(
      <TestComponent onOutsideClick={handleOutsideClick} />,
    );

    // Click inside the component
    await userEvent.click(getByText(/Click Inside/i));
    expect(handleOutsideClick).not.toHaveBeenCalled();
  });
});
