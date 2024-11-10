import { fireEvent, render, screen } from "@testing-library/react";
import { useInView } from "framer-motion";
import { beforeEach, describe, expect, it } from "vitest";

import { CombinedGrid } from "@components/CombinedGrid";

const mockContentQuery = {
  movies: {
    results: [
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
    ],
  },
  tv: {
    results: [
      {
        id: 3,
        name: "Series 1",
        overview: "Overview for Series 1.",
        poster_path: "/path/to/poster1.jpg",
        backdrop_path: "/path/to/backdrop1.jpg",
        mediaType: "tv",
      },
      {
        id: 4,
        name: "Series 2",
        overview: "Overview for Series 2.",
        poster_path: "/path/to/poster2.jpg",
        backdrop_path: "/path/to/backdrop2.jpg",
        mediaType: "tv",
      },
    ],
  },
};

describe("CombinedGrid Component", () => {
  useInView.mockReturnValue(true);

  beforeEach(() => {
    render(<CombinedGrid contentQuery={mockContentQuery} />);
  });

  it("renders the component", () => {
    expect(screen.getByText(/recommended/i)).toBeInTheDocument();
  });

  it("renders the movies section", () => {
    expect(screen.getByText(/movies/i)).toHaveClass("bg-cyan-500");

    mockContentQuery.movies.results.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("renders the tv section", () => {
    fireEvent.click(screen.getByText(/tv shows/i));
    expect(screen.getByText(/tv shows/i)).toHaveClass("bg-cyan-500");
    mockContentQuery.tv.results.forEach((series) => {
      expect(screen.getByText(series.name)).toBeInTheDocument();
    });
  });

  describe("Constructs the correct hrefs", () => {
    it("for movies", async () => {
      mockContentQuery.movies.results.forEach((movie) => {
        const movieCard = screen.getByRole("link", {
          name: `Link to ${movie.title}`,
        });

        expect(movieCard).toHaveAttribute("href", `/movie/${movie.id}`);
        expect(movieCard).toBeInTheDocument();
      });
    });

    it("for series", () => {
      mockContentQuery.movies.results.forEach((series) => {
        const seriesCard = screen.getByRole("link", {
          name: `Link to ${series.title}`,
        });

        expect(seriesCard).toHaveAttribute("href", `/movie/${series.id}`);
        expect(seriesCard).toBeInTheDocument();
      });
    });
  });
});
