import { Overlay } from "@components/Overlay";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { TestProviders } from "../TestProviders";

const mockSetOverlayType = vi.fn();
beforeAll(() => {
  vi.mock("@lib/providers/OverlayProvider", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOverlayContext: vi.fn(() => ({
        setOverlayType: mockSetOverlayType,
        overlayType: "random",
      })),
    };
  });
});

describe("Overlay Component", () => {
  let overlay;

  beforeEach(() => {
    overlay = render(
      <Overlay modalTypes={{ random: <p>Test</p> }}>
        <p>Test</p>
      </Overlay>,
      { wrapper: TestProviders },
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

    // Check if setOverlay was called with null
    expect(mockSetOverlayType).toHaveBeenCalledWith(null);
  });
});
