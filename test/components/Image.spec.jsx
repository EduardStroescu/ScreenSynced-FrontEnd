import { Image } from "@components/Image";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Image Component", () => {
  const defaultProps = {
    isInView: true,
    src: "https://example.com/image.jpg",
    alt: "Test Image",
    width: 200,
    height: 300,
    className: "test-image",
    placeholderClassName: "test-placeholder",
    motionProps: {},
  };

  it("renders the placeholder initially when the image is not loaded", () => {
    render(<Image {...defaultProps} />);

    const placeholder = screen.getByAltText("");
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveClass("test-placeholder");
  });

  it("renders the image when in view and hides the placeholder after loading", async () => {
    render(<Image {...defaultProps} />);

    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("hidden");

    // Simulate the image loading
    fireEvent.load(image);

    // Verify the placeholder is hidden and image is visible
    expect(image).toHaveClass("block");
    expect(screen.queryByAltText("")).toHaveClass("hidden");
  });

  it("does not render the image element when isInView is false", () => {
    render(<Image {...defaultProps} isInView={false} />);

    const image = screen.queryByAltText("Test Image");
    expect(image).not.toBeInTheDocument();
  });

  it("renders the placeholder with correct width and height when image is out of view", () => {
    render(<Image {...defaultProps} isInView={false} />);

    const placeholder = screen.getByAltText("");
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute("width", "200");
    expect(placeholder).toHaveAttribute("height", "300");
  });

  it("applies motion props if provided", () => {
    const motionProps = { "data-testid": "motion-image" };
    render(<Image {...defaultProps} motionProps={motionProps} />);

    const image = screen.getByAltText("Test Image");
    expect(image).toHaveAttribute("data-testid", "motion-image");
  });
});
