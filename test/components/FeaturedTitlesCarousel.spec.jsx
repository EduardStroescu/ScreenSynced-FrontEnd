import { FeaturedTitlesCarousel } from "@components/FeaturedTitlesCarousel";
import { useQueries } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TestProviders } from "../TestProviders";

const mockApiData = [
  {
    id: 1,
    title: "Movie 1",
    poster_path: "/path/to/poster1.jpg",
    backdrop_path: "/path/to/backdrop1.jpg",
    overview: "Overview for Movie 1.",
    mediaType: "movie",
  },
  {
    id: 2,
    title: "Movie 2",
    poster_path: "/path/to/poster2.jpg",
    backdrop_path: "/path/to/backdrop2.jpg",
    overview: "Overview for Movie 2.",
    mediaType: "movie",
  },
];
const mockVideoData = [
  {
    data: { results: [{ type: "Trailer", key: "trailerKey1" }] },
  },
  {
    data: { results: [{ type: "Trailer", key: "trailerKey2" }] },
  },
];

vi.mock("react-player", () => ({
  default: vi.fn(({ url }) => (
    <video data-testid="mocked-player" src={url} controls />
  )),
}));

describe("FeaturedTitlesCarousel Component", () => {
  beforeEach(() => {
    useQueries.mockReturnValue(mockVideoData);

    render(
      <FeaturedTitlesCarousel
        contentType="movie"
        apiData={mockApiData}
        queryType="movies"
      />,
      { wrapper: TestProviders },
    );
  });

  it("renders movie titles and images from apiData", async () => {
    mockApiData.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByText(movie.overview)).toBeInTheDocument();
      const imageElement = screen.getByAltText(movie.title);
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute(
        "src",
        expect.stringContaining(movie.poster_path),
      );
    });
  });

  it("renders all the Watch Now buttons", () => {
    const watchNowButtons = screen.getAllByText(/watch now/i);
    expect(watchNowButtons).toHaveLength(mockApiData.length); // Expect the number of buttons to match the number of movies

    watchNowButtons.forEach((button) => {
      expect(button).toBeInTheDocument(); // Each button should be present
    });
  });

  it("renders all the Add Bookmark buttons", () => {
    const addBookmarkButtons = screen.getAllByText(/add bookmark/i);
    expect(addBookmarkButtons).toHaveLength(mockApiData.length); // Expect the number of buttons to match the number of movies

    addBookmarkButtons.forEach((button) => {
      expect(button).toBeInTheDocument(); // Each button should be present
    });
  });

  it("renders the YoutubePlayer component with the correct src", () => {
    const players = screen.getAllByTestId("mocked-player");
    expect(players).toHaveLength(1);
    expect(players[0]).toHaveAttribute(
      "src",
      "https://www.youtube.com/watch?v=" + mockVideoData[0].data.results[0].key,
    );
  });
});
