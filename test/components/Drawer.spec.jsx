import { Drawer } from "@components/Drawer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("Drawer Component", () => {
  it("renders the drawer when isMenuOpen is true", () => {
    render(
      <Drawer isMenuOpen={true} setMenuOpen={() => {}}>
        <p>Drawer Content</p>
      </Drawer>,
    );

    // Check if the drawer content is displayed
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /close menu/i }),
    ).toBeInTheDocument();
  });

  it("does not render drawer content when isMenuOpen is false", () => {
    const { container } = render(
      <Drawer isMenuOpen={false} setMenuOpen={() => {}}>
        <p>Drawer Content</p>
      </Drawer>,
    );

    const drawerContainer = container.firstChild;
    expect(drawerContainer).toHaveStyle("display: none");
    expect(drawerContainer).not.toBeVisible();
  });

  it("calls setMenuOpen when close button is clicked", async () => {
    const setMenuOpen = vi.fn();
    render(
      <Drawer isMenuOpen={true} setMenuOpen={setMenuOpen}>
        <p>Drawer Content</p>
      </Drawer>,
    );

    // Click the close button
    const closeButton = screen.getByRole("button", { name: /close menu/i });
    await userEvent.click(closeButton);

    expect(setMenuOpen).toHaveBeenCalled();
    expect(setMenuOpen).toHaveBeenCalledTimes(1);
  });
});
