import { CastSection } from "@components/CastSection";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const mockCast = [
  {
    adult: true,
    cast_id: 1,
    character: "Test Character",
    credit_id: "1",
    gender: 1,
    id: 1,
    known_for_department: "Acting",
    name: "Cast Name",
    order: 1,
    profile_path: "test-path",
  },
  {
    adult: false,
    cast_id: 2,
    character: "Test Character2",
    credit_id: "2",
    gender: 2,
    id: 2,
    known_for_department: "Acting",
    name: "Cast Name2",
    order: 2,
    profile_path: "test-path2",
  },
];

describe("CastSection Component", () => {
  it("renders the component when cast is not empty", () => {
    render(<CastSection cast={mockCast} />);
    expect(screen.getByText("Cast")).toBeInTheDocument();
  });

  it("doesn't render the component when cast is empty", () => {
    render(<CastSection cast={[]} />);
    expect(screen.queryByText(/cast/i)).not.toBeInTheDocument();
  });

  it("renders the cast members", () => {
    render(<CastSection cast={mockCast} />);

    // Check that both cast members are rendered by name
    const castMembers = screen.getAllByText(/cast name/i);
    expect(castMembers).toHaveLength(2);

    const castImages = screen.getAllByAltText(/cast name/i);
    expect(castImages).toHaveLength(2);

    // Check that each image has the correct src attribute
    mockCast.forEach((member, index) => {
      expect(castImages[index]).toHaveAttribute(
        "src",
        `https://image.tmdb.org/t/p/w185${member.profile_path}`,
      );
    });
  });
});
