import { SimilarContentSection } from "@components/SimilarContentSection";
import { render, screen } from "@testing-library/react";
import { useInView } from "framer-motion";
import { describe, expect, it } from "vitest";

const mockSimilarContent = {
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
};

describe("SimilarContentSection Component", () => {
  useInView.mockReturnValue(true);
  it("doesn't render the component when similarContent is empty", () => {
    render(<SimilarContentSection similarContent={{}} mediaType="movie" />);
    expect(screen.queryByText(/you may also like/i)).not.toBeInTheDocument();
  });

  it("renders the component", () => {
    render(
      <SimilarContentSection
        similarContent={mockSimilarContent}
        mediaType="movie"
      />,
    );
    expect(screen.getByText(/you may also like/i)).toBeInTheDocument();
  });

  it("renders a card for each item", () => {
    render(
      <SimilarContentSection
        similarContent={mockSimilarContent}
        mediaType="movie"
      />,
    );
    const results = [];
    mockSimilarContent.results.forEach((result) => {
      results.push(screen.getByText(result.title));
      expect(screen.getByText(result.title)).toBeInTheDocument();
    });
    expect(results).toHaveLength(mockSimilarContent.results.length);

    // The rest will be tested in the content card component as this is just a wrapper
  });
});
