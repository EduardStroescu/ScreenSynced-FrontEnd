import { Sidebar } from "@components/Sidebar";
import { SELECTABLE_DATES } from "@lib/const";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useInView } from "framer-motion";
import { beforeEach, describe, expect, it } from "vitest";
import { TestProviders } from "../TestProviders";

const mockData = {
  movies: {
    week: {
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
    month: {
      results: [
        {
          id: 3,
          title: "Movie 3",
          poster_path: "/path/to/poster3.jpg",
          backdrop_path: "/path/to/backdrop3.jpg",
          overview: "Overview for Movie 3.",
          mediaType: "movie",
        },
        {
          id: 4,
          title: "Movie 4",
          poster_path: "/path/to/poster4.jpg",
          backdrop_path: "/path/to/backdrop4.jpg",
          overview: "Overview for Movie 4.",
          mediaType: "movie",
        },
      ],
    },
    year: {
      results: [
        {
          id: 5,
          title: "Movie 5",
          poster_path: "/path/to/poster5.jpg",
          backdrop_path: "/path/to/backdrop5.jpg",
          overview: "Overview for Movie 5.",
          mediaType: "movie",
        },
        {
          id: 6,
          title: "Movie 6",
          poster_path: "/path/to/poster6.jpg",
        },
      ],
    },
  },
  tv: {
    week: {
      results: [
        {
          id: 7,
          name: "Series 1",
          poster_path: "/path/to/poster7.jpg",
          backdrop_path: "/path/to/backdrop7.jpg",
          overview: "Overview for Series 1.",
          mediaType: "tv",
          first_air_date: "2023-01-01",
          vote_average: 8.5,
        },
        {
          id: 8,
          name: "Series 2",
          poster_path: "/path/to/poster8.jpg",
          backdrop_path: "/path/to/backdrop8.jpg",
          overview: "Overview for Series 2.",
          mediaType: "tv",
          first_air_date: "2023-01-01",
          vote_average: 8.5,
        },
      ],
    },
    month: { results: [] },
    year: { results: [] },
  },
};

describe("Sidebar component", () => {
  beforeEach(() => {
    useInView.mockReturnValue(true);
  });

  it("renders the component for movies", async () => {
    act(() => {
      render(<Sidebar contentType="movie" upcomingData={mockData} />, {
        wrapper: TestProviders,
      });
    });

    await waitFor(() => {
      mockData.movies.week.results.forEach((movie) => {
        expect(screen.getByText(movie.title)).toBeInTheDocument();
      });
    });
    expect(screen.getByText(/upcoming movies/i)).toBeInTheDocument();
  });

  it("renders the component for series", async () => {
    act(() => {
      render(<Sidebar contentType="tv" upcomingData={mockData} />, {
        wrapper: TestProviders,
      });
    });

    await waitFor(() => {
      mockData.tv.week.results.forEach((serie) => {
        expect(screen.getByText(serie.name)).toBeInTheDocument();
      });
    });
    expect(screen.getByText(/upcoming series/i)).toBeInTheDocument();
  });

  it("renders all sort buttons", () => {
    render(<Sidebar contentType="movie" queryType="movies" />, {
      wrapper: TestProviders,
    });
    const buttons = [];
    SELECTABLE_DATES.forEach((date) => {
      expect(
        screen.getByRole("button", { name: new RegExp(date, "i") }),
      ).toBeInTheDocument();
      buttons.push(screen.getByRole("button", { name: new RegExp(date, "i") }));
    });
    expect(buttons).toHaveLength(SELECTABLE_DATES.length);
  });

  it("renders empty content when no upcoming content is available", () => {
    render(
      <Sidebar
        contentType="movie"
        upcomingData={{
          movies: {
            week: { results: [] },
            month: { results: [] },
            year: { results: [] },
          },
          tv: {
            week: { results: [] },
            month: { results: [] },
            year: { results: [] },
          },
        }}
      />,
      { wrapper: TestProviders },
    );
    expect(screen.queryByText(/no new releases/i)).toBeInTheDocument();
  });
});
