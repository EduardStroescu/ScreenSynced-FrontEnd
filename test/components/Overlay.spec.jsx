import { Overlay } from "@components/Overlay";
import { useUserStore } from "@lib/store";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Overlay Component", () => {
  let overlay;
  let setOverlay;

  beforeEach(() => {
    setOverlay = vi.spyOn(useUserStore.getState().actions, "setOverlay");
    overlay = render(
      <Overlay>
        <p>Test</p>
      </Overlay>,
    );
  });

  it("renders the overlay", () => {
    expect(overlay.container.firstChild).toBeInTheDocument();
  });

  it("renders the children", () => {
    const children = screen.getByText("Test");
    expect(children).toBeInTheDocument();
  });

  it("renders the overlay background", () => {
    const overlayBackground = overlay.container.querySelector(
      "div.absolute.bg-black\\/90",
    );
    expect(overlayBackground).toBeInTheDocument();
  });

  it("closes the overlay when the overlay background is clicked", () => {
    // Select the overlay background and simulate a click
    const overlayBackground = overlay.container.querySelector(
      "div.absolute.bg-black\\/90",
    );
    fireEvent.click(overlayBackground);

    // Check if setOverlay was called with false
    expect(setOverlay).toHaveBeenCalledWith(false);
  });
});
