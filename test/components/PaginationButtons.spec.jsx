/* eslint-disable react/prop-types */
import { PaginationButtons } from "@components/PaginationButtons";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("PaginationButtons Component", () => {
  it("renders the component", () => {
    const { container } = render(
      <PaginationButtons contentType="movies" context="1" totalPages={10} />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("doesn't render the previous button when context is 1", () => {
    render(
      <PaginationButtons contentType="movies" context="1" totalPages={10} />,
    );

    const previousButton = screen.queryByText(/go back/i);
    expect(previousButton).toHaveClass("hidden");
  });

  it("renders the previous button when a previous page exists", () => {
    render(
      <PaginationButtons contentType="movies" context="2" totalPages={10} />,
    );

    const previousButton = screen.getByText(/go back/i);
    expect(previousButton).toBeInTheDocument();
  });

  it("renders the next button", () => {
    render(
      <PaginationButtons contentType="movies" context="1" totalPages={10} />,
    );

    const nextButton = screen.getByText(/see more/i);
    expect(nextButton).toBeInTheDocument();
  });

  it("renders 'You've reached the end' when context is equal to totalPages", () => {
    render(
      <PaginationButtons contentType="movies" context="10" totalPages={10} />,
    );

    const nextButton = screen.queryByText(/You've reached the end/i);
    expect(nextButton).toBeInTheDocument();
  });

  describe("has the correct href according to the contentType", () => {
    it("when contentType is movies", () => {
      render(
        <PaginationButtons contentType="movies" context="1" totalPages={10} />,
      );

      const nextButton = screen.getByText(/see more/i);
      expect(nextButton).toHaveAttribute("href", "/movies/2");
    });
    it("when contentType is series", () => {
      render(
        <PaginationButtons contentType="series" context="1" totalPages={10} />,
      );

      const nextButton = screen.getByText(/see more/i);
      expect(nextButton).toHaveAttribute("href", "/series/2");
    });
    it("when contentType is discover", () => {
      render(
        <PaginationButtons
          contentType="discover"
          context="1"
          totalPages={10}
        />,
      );

      const nextButton = screen.getByText(/see more/i);
      expect(nextButton).toHaveAttribute("href", "/discover/2");
    });
  });
});
