import { ThirdPartyLogin } from "@components/ThirdPartyLogin";
import { thirdPartyConfig } from "@lib/const";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("ThirdPartyLogin Component", () => {
  // Get all buttons
  let buttons;
  beforeEach(() => {
    render(<ThirdPartyLogin />);
    buttons = screen.getAllByRole("button");
  });

  it("renders the component", () => {
    expect(buttons).toHaveLength(thirdPartyConfig.length);
  });

  it("renders the buttons for each provider", () => {
    expect(buttons).toHaveLength(thirdPartyConfig.length);

    thirdPartyConfig.forEach((provider, index) => {
      expect(buttons[index]).toHaveTextContent(
        new RegExp(`continue with ${provider.name}`, "i"),
      );
    });
  });
});
