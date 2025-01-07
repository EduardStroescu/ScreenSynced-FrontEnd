/* eslint-disable react/prop-types */
import { Bookmarks } from "@components/Bookmarks";
import { useQueries } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { useInView } from "framer-motion";
import { describe, expect, it } from "vitest";

const mockBookmarksData = [
  {
    id: 1,
    mediaId: 101,
    mediaType: "movie",
    userId: 1,
  },
  {
    id: 2,
    mediaId: 102,
    mediaType: "movie",
    userId: 1,
  },
  {
    id: 3,
    mediaId: 103,
    mediaType: "tv",
    userId: 1,
  },
  {
    id: 4,
    mediaId: 104,
    mediaType: "tv",
    userId: 1,
  },
];

const mockBookmarksApiReponse = [
  [
    {
      data: {
        id: 1,
        mediaId: 101,
        title: "Movie 1",
        posterPath: "posterPath",
      },
    },
    {
      data: {
        id: 2,
        mediaId: 102,
        title: "Movie 1",
        posterPath: "posterPath",
      },
    },
  ],
  [
    {
      data: {
        id: 3,
        mediaId: 103,
        title: "TV 1",
        posterPath: "posterPath",
      },
    },
    {
      data: {
        id: 4,
        mediaId: 104,
        title: "TV 2",
        posterPath: "posterPath",
      },
    },
  ],
];

describe("Bookmarks Component", () => {
  it("renders the component", () => {
    render(<Bookmarks bookmarksQuery={[]} />);
    expect(screen.getByText(/bookmarks/i)).toBeInTheDocument();
  });

  it("renders no bookmarks when bookmarksQuery is empty", () => {
    render(<Bookmarks bookmarksQuery={[]} />);
    expect(screen.queryByText(/None added yet/i)).toBeInTheDocument();

    const discoverNowButton = screen.queryByText(/discover now/i);
    expect(discoverNowButton).toBeInTheDocument();
    expect(discoverNowButton).toHaveAttribute("href", "/discover/1");
  });

  it("renders bookmarks when bookmarksQuery is not empty", () => {
    useInView.mockReturnValue(true);
    useQueries
      .mockImplementationOnce(() => mockBookmarksApiReponse[0])
      .mockImplementationOnce(() => mockBookmarksApiReponse[1]);
    render(<Bookmarks bookmarksQuery={mockBookmarksData} />);

    const movieBookmarks = screen.getAllByText(/^movie$/i);
    expect(movieBookmarks).toHaveLength(2);

    const tvBookmarks = screen.getAllByText(/^tv$/i);
    expect(tvBookmarks).toHaveLength(2);
  });
});