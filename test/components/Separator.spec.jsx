import { Separator } from "@components/Separator";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Separator Component", () => {
  it("renders the component", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the children", () => {
    render(<Separator>Test</Separator>);

    const children = screen.getByText("Test");
    expect(children).toBeInTheDocument();
  });

  it("applies the passed styles", () => {
    const { container } = render(<Separator className="test-class" />);
    const separator = container.querySelector(".test-class");
    expect(separator).toBeInTheDocument();
  });
});
