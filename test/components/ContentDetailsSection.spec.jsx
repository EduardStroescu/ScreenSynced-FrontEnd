import { ContentDetailsSection } from "@components/ContentDetailsSection";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

const mockContentDetails = {
  adult: false,
  backdrop_path: "/path/to/backdrop.jpg",
  genres: [
    { id: 1, name: "Genre 1" },
    { id: 2, name: "Genre 2" },
  ],
  id: 1,
  mediaType: "movie",
  original_language: "English",
  original_title: "Original Title",
  original_name: "Original Name",
  overview: "Overview",
  popularity: 8.5,
  poster_path: "/path/to/poster.jpg",
  release_date: "2023-01-01",
  first_air_date: "2023-01-01",
  title: "Title",
  name: "Name",
  origin_country: ["United States"],
  vote_average: 8.5,
  runtime: 120,
};

const mockQueryData = {
  credits: {
    crew: [
      {
        credit_id: "1",
        gender: 1,
        id: 1,
        job: "Director",
        name: "Director Name",
        original_name: "Director Original Name",
        profile_path: "/path/to/director/profile.jpg",
      },
    ],
  },
};

describe("ContentDetailsSection Component", () => {
  beforeEach(() => {
    render(
      <ContentDetailsSection
        contentDetails={mockContentDetails}
        queryData={mockQueryData}
      />,
    );
  });
  it("renders the component", () => {
    expect(screen.getByText(mockContentDetails.title)).toBeInTheDocument();
  });

  it("renders the content image", () => {
    expect(
      screen.getByRole("img", { src: mockContentDetails.backdrop_path }),
    ).toBeInTheDocument();
  });

  it("renders the content metadata", () => {
    expect(
      screen.getByText(new RegExp(mockContentDetails.original_language, "i")),
    );
    expect(
      screen.getByText(
        new RegExp(mockContentDetails.vote_average.toFixed(1), "i"),
      ),
    );
    expect(screen.getByText(mockContentDetails.release_date.slice(0, 4)));
    expect(screen.getByText(`${mockContentDetails.runtime} min`));
  });

  describe("Director's details", () => {
    it("renders director's details", () => {
      expect(
        screen.getByText(
          mockQueryData.credits.crew.find((member) => member.job === "Director")
            .name,
        ),
      ).toBeInTheDocument();
    });

    it("renders the director image", () => {
      expect(
        screen.getByRole("img", {
          src: mockQueryData.credits.crew.find(
            (member) => member.job === "Director",
          ).profile_path,
        }),
      ).toBeInTheDocument();
    });
  });

  it("renders all genres", () => {
    mockContentDetails.genres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });
});
