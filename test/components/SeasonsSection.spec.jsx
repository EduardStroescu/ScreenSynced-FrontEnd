import { SeasonsSection } from "@components/SeasonsSection";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestProviders } from "../TestProviders";

const mockContentDetails = [
  {
    air_date: "2022-01-01",
    air_time: "12:00",
    episode_count: 10,
    id: 1,
    name: "Season 1",
    overview: "Overview for Season 1.",
    poster_path: "/path/to/poster1.jpg",
    season_number: 1,
  },
  {
    air_date: "2022-01-01",
    air_time: "12:00",
    episode_count: 10,
    id: 2,
    name: "Season 2",
    overview: "Overview for Season 2.",
    poster_path: "/path/to/poster1.jpg",
    season_number: 2,
  },
];

describe("SeasonsSection Component", () => {
  it("renders the component", () => {
    render(<SeasonsSection seasons={mockContentDetails} />, {
      wrapper: TestProviders,
    });
    // The first season name is actually the second found in the document because we need to exclude the header.
    const firstSeason = screen.queryByLabelText(/season 1/i);
    expect(firstSeason).toBeInTheDocument();
  });

  it("doesn't render the component when seasons is empty", () => {
    render(<SeasonsSection seasons={[]} />, {
      wrapper: TestProviders,
    });
    expect(screen.queryByLabelText(/select season/i)).not.toBeInTheDocument();
  });

  it("renders the seasons", () => {
    render(<SeasonsSection seasons={mockContentDetails} />, {
      wrapper: TestProviders,
    });
    const seasons = screen.getAllByText(/season \d+/i);
    // Number of seasons #seasonNumber +1 for the header
    expect(seasons).toHaveLength(3);
  });
});
