import { ContentGrid } from "@components/ContentGrid";
import { render, screen } from "@testing-library/react";
import { useInView } from "framer-motion";
import { describe, expect, it } from "vitest";
import { TestProviders } from "../TestProviders";

// First shape: page, results, total_pages, total_results
const placeholderDataShape1 = [
  {
    id: 1,
    title: "Movie 1",
    overview: "This is a placeholder description for a sample movie.",
    release_date: "2023-01-01",
    vote_average: 8.5,
  },
  {
    id: 2,
    title: "Movie 2",
    overview: "This is another placeholder description for a sample movie.",
    release_date: "2023-02-01",
    vote_average: 7.8,
  },
];
// Second shape: movies and tv
const placeholderDataShape2 = {
  movies: [
    {
      id: 3,
      title: "Movie 1",
      overview:
        "This is a placeholder description for a movie in the movies section.",
      release_date: "2023-03-01",
      vote_average: 8.1,
    },
    {
      id: 4,
      title: "Movie 2",
      overview:
        "This is another placeholder description for a movie in the movies section.",
      release_date: "2023-04-01",
      vote_average: 6.9,
    },
  ],

  tv: [
    {
      id: 5,
      name: "Sample TV Show",
      overview: "This is a placeholder description for a sample TV show.",
      first_air_date: "2022-05-01",
      vote_average: 8.3,
    },
    {
      id: 6,
      name: "Another TV Show",
      overview: "This is another placeholder description for a sample TV show.",
      first_air_date: "2022-06-01",
      vote_average: 7.5,
    },
  ],
};

describe("ContentGrid Component", () => {
  useInView.mockReturnValue(true);

  describe("using data shape 1", () => {
    it("renders the component with the first data shape", () => {
      render(
        <ContentGrid contentType="movie" apiData={placeholderDataShape1} />,
        { wrapper: TestProviders },
      );
      const movies = screen.getAllByText(/movie \d+/i);
      movies.forEach((movie) => {
        expect(movie).toBeInTheDocument();
      });
      expect(movies).toHaveLength(placeholderDataShape1.length);
    });

    it("renders the title", () => {
      render(
        <ContentGrid
          apiData={placeholderDataShape1}
          title="Movies"
          contentType="movie"
        />,
        { wrapper: TestProviders },
      );
      expect(screen.getByText(/movies/i)).toBeInTheDocument();
    });

    it("renders the content cards", () => {
      render(
        <ContentGrid apiData={placeholderDataShape1} contentType="movie" />,
        { wrapper: TestProviders },
      );
      const contentCards = screen.getAllByText(/movie \d+/i);
      expect(contentCards).toHaveLength(2);
    });
  });

  describe("using data shape 2", () => {
    it("renders the component with the second data shape", () => {
      render(
        <ContentGrid
          apiData={placeholderDataShape2}
          queryType="movies"
          contentType="movie"
        />,
        { wrapper: TestProviders },
      );
      const movies = screen.getAllByText(/movie \d+/i);
      movies.forEach((movie) => {
        expect(movie).toBeInTheDocument();
      });
      expect(movies).toHaveLength(placeholderDataShape2.movies.length);
    });

    it("renders the title", () => {
      render(
        <ContentGrid
          apiData={placeholderDataShape2}
          queryType="tv"
          title="Series"
          contentType="tv"
        />,
        { wrapper: TestProviders },
      );
      expect(screen.getByText(/series/i)).toBeInTheDocument();
    });

    it("renders the content cards", () => {
      render(
        <ContentGrid
          queryType="movies"
          apiData={placeholderDataShape2}
          contentType="movie"
        />,
        { wrapper: TestProviders },
      );
      const contentCards = screen.getAllByText(/movie \d+/i);
      expect(contentCards).toHaveLength(2);
    });
  });

  it("renders the see more button", () => {
    render(
      <ContentGrid
        apiData={placeholderDataShape1}
        seeMore={true}
        contentType="movie"
      />,
      { wrapper: TestProviders },
    );
    expect(screen.getByText(/see more/i)).toBeInTheDocument();
  });
});
