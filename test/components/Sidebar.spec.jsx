import { SELECTABLE_DATES, Sidebar } from "@components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useInView } from "framer-motion";
import { beforeEach, describe, expect, it } from "vitest";

const mockMovieData = {
  upcomingMovies: {
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
  },
};

describe("Sidebar component", () => {
  beforeEach(() => {
    useInView.mockReturnValue(true);
    // Update mock to directly return an object with `data`
    useQuery.mockReturnValue({
      data: mockMovieData,
      isLoading: false,
      isError: false,
    });
  });

  it("renders the component", async () => {
    act(() => {
      render(<Sidebar contentType="movie" queryType="movies" />);
    });

    await waitFor(() => {
      mockMovieData.upcomingMovies.movies.results.forEach((movie) => {
        expect(screen.getByText(movie.title)).toBeInTheDocument();
      });
    });
    expect(screen.getByText(/upcoming movies/i)).toBeInTheDocument();
  });

  it("renders all sort buttons", () => {
    render(<Sidebar contentType="movie" queryType="movies" />);
    const buttons = [];
    SELECTABLE_DATES.forEach((date) => {
      expect(
        screen.getByRole("button", { name: new RegExp(date, "i") }),
      ).toBeInTheDocument();
      buttons.push(screen.getByRole("button", { name: new RegExp(date, "i") }));
    });
    expect(buttons).toHaveLength(SELECTABLE_DATES.length);
  });

  //   Uncomment and adjust this test case to check for empty data handling
  it("renders empty content when no upcoming content is available", () => {
    useQuery.mockReturnValueOnce({
      data: { upcomingMovies: { movies: { results: [] } } },
      isLoading: false,
      isError: false,
    });
    render(<Sidebar contentType="movie" queryType="movies" />);
    expect(screen.queryByText(/no releases/i)).toBeInTheDocument();
  });
});
