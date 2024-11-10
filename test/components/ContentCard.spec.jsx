import { ContentCard } from "@components/ContentCard";
import { render, screen } from "@testing-library/react";
import { useInView } from "framer-motion";
import { describe, expect, it } from "vitest";

const mockContentMovies = {
  id: 1,
  title: "Movie 1",
  overview: "This is a placeholder description for a sample movie.",
  release_date: "2023-01-01",
  vote_average: 8.5,
  poster_path: "/path/to/poster.jpg",
};

const mockContentSeries = {
  id: 1,
  name: "Series 1",
  overview: "This is a placeholder description for a sample series.",
  release_date: "2023-01-01",
  vote_average: 8.5,
  poster_path: "/path/to/poster.jpg",
};

describe("ContentCard Component", () => {
  useInView.mockReturnValue(true);
  it("renders the component for movies", () => {
    render(<ContentCard content={mockContentMovies} contentType="movie" />);

    expect(screen.getByText(mockContentMovies.title)).toBeInTheDocument();
  });

  it("renders the component for series", () => {
    render(<ContentCard content={mockContentSeries} contentType="tv" />);

    expect(screen.getByText(mockContentSeries.name)).toBeInTheDocument();
  });

  it("renders the content image", () => {
    render(<ContentCard content={mockContentMovies} contentType="movie" />);
    const contentImage = screen.getByAltText(
      `${mockContentMovies.title} poster`,
    );
    expect(contentImage).toBeInTheDocument();
    expect(contentImage).toHaveAttribute(
      "src",
      expect.stringContaining(mockContentMovies.poster_path),
    );
  });

  it("renders the add bookmark button", () => {
    render(<ContentCard content={mockContentMovies} contentType="movie" />);
    expect(screen.getByLabelText(/add bookmark/i)).toBeInTheDocument();
  });
});
