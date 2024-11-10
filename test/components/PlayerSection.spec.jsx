import { PlayerSection } from "@components/PlayerSection";
import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("react-player", () => ({
  default: vi.fn(({ url }) => (
    <video data-testid="mocked-player" src={url} controls />
  )),
}));

describe("PlayerSection Component", () => {
  it("renders children", async () => {
    act(() => {
      render(
        <PlayerSection youtubeLink={"https://www.youtube.com/watch?v=123"}>
          <button>Add Bookmark</button>
        </PlayerSection>,
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/add bookmark/i)).toBeInTheDocument();
    });
  });

  it("renders the YoutubePlayer component with the correct src", async () => {
    act(() => {
      render(
        <PlayerSection youtubeLink={"https://www.youtube.com/watch?v=123"}>
          <button>Add Bookmark</button>
        </PlayerSection>,
      );
    });

    await waitFor(() => {
      const players = screen.getAllByTestId("mocked-player");
      expect(players).toHaveLength(1);
      expect(players[0]).toHaveAttribute(
        "src",
        "https://www.youtube.com/watch?v=123",
      );
    });
  });

  it("renders placeholder image when youtubeLink is null", async () => {
    render(
      <PlayerSection youtubeLink={null}>
        <button>Add Bookmark</button>
      </PlayerSection>,
    );

    const placeholder = screen.getByRole("presentation");
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute("alt", "");
    expect(placeholder).toHaveAttribute(
      "src",
      "/placeholders/placeholder-content.svg",
    );
  });
});
