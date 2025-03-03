import { fireEvent, render, screen } from "@testing-library/react";
import { useInView } from "framer-motion";
import { beforeEach, describe, expect, it } from "vitest";

import { RecommendedGrid } from "@components/RecommendedGrid";
import { TestProviders } from "../TestProviders";

const mockContentQuery = {
  movies: [
    {
      id: 1,
      title: "Movie 1",
      poster_path: "/path/to/poster1.jpg",
      backdrop_path: "/path/to/backdrop1.jpg",
      overview: "Overview for Movie 1.",
      mediaType: "movie",
      release_date: "2023-01-01",
      vote_average: 8.5,
    },
    {
      id: 2,
      title: "Movie 2",
      poster_path: "/path/to/poster2.jpg",
      backdrop_path: "/path/to/backdrop2.jpg",
      overview: "Overview for Movie 2.",
      mediaType: "movie",
      release_date: "2023-01-01",
      vote_average: 8.5,
    },
  ],
  tv: [
    {
      id: 3,
      name: "Series 1",
      overview: "Overview for Series 1.",
      poster_path: "/path/to/poster1.jpg",
      backdrop_path: "/path/to/backdrop1.jpg",
      mediaType: "tv",
      first_air_date: "2023-01-01",
      vote_average: 8.5,
    },
    {
      id: 4,
      name: "Series 2",
      overview: "Overview for Series 2.",
      poster_path: "/path/to/poster2.jpg",
      backdrop_path: "/path/to/backdrop2.jpg",
      mediaType: "tv",
      first_air_date: "2023-01-01",
      vote_average: 8.5,
    },
  ],
};

describe("CombinedGrid Component", () => {
  useInView.mockReturnValue(true);

  beforeEach(() => {
    render(<RecommendedGrid apiData={mockContentQuery} />, {
      wrapper: TestProviders,
    });
  });

  it("renders the component", () => {
    expect(screen.getByText(/recommended/i)).toBeInTheDocument();
  });

  it("renders the movies section", () => {
    expect(screen.getByText(/movies/i)).toHaveClass("bg-cyan-500");

    mockContentQuery.movies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("renders the tv section", () => {
    fireEvent.click(screen.getByText(/tv shows/i));
    expect(screen.getByText(/tv shows/i)).toHaveClass("bg-cyan-500");
    mockContentQuery.tv.forEach((series) => {
      expect(screen.getByText(series.name)).toBeInTheDocument();
    });
  });

  describe("Constructs the correct hrefs", () => {
    it("for movies", async () => {
      mockContentQuery.movies.forEach((movie) => {
        const movieCard = screen.getByRole("link", {
          name: `Link to ${movie.title}`,
        });

        expect(movieCard).toHaveAttribute("href", `/movie/${movie.id}`);
        expect(movieCard).toBeInTheDocument();
      });
    });

    it("for series", () => {
      mockContentQuery.movies.forEach((series) => {
        const seriesCard = screen.getByRole("link", {
          name: `Link to ${series.title}`,
        });

        expect(seriesCard).toHaveAttribute("href", `/movie/${series.id}`);
        expect(seriesCard).toBeInTheDocument();
      });
    });
  });
});
