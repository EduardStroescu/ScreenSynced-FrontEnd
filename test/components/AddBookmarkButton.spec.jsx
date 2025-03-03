import { bookmarkApi } from "@api/backend/modules/bookmark.api";
import { AddBookmarkButton } from "@components/AddBookmarkButton";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { TestProviders } from "../TestProviders";
import { useQuery } from "@tanstack/react-query";

beforeAll(async () => {
  vi.mock("@api/backend/modules/bookmark.api", () => ({
    bookmarkApi: {
      add: vi.fn(),
      remove: vi.fn(),
    },
  }));
  vi.mock("@lib/providers/AuthProvider", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useAuthContext: vi.fn(() => ({
        user: { id: 1 },
      })),
    };
  });
});

describe("AddBookmarkButton Component", () => {
  it("renders the component", () => {
    render(
      <AddBookmarkButton
        mediaType="movie"
        contentId={1}
        className="w-full bg-black"
      />,
      { wrapper: TestProviders },
    );

    expect(screen.getByLabelText(/add bookmark/i)).toBeInTheDocument();
  });

  it("applies the passed styles", () => {
    render(
      <AddBookmarkButton
        mediaType="movie"
        contentId={1}
        className="w-full bg-black"
      />,
      { wrapper: TestProviders },
    );

    const bookmarkButton = screen.getByLabelText(/add bookmark/i);
    expect(bookmarkButton).toHaveClass("bg-black w-full");
  });

  it("renders the button as an active bookmark when it is already added", async () => {
    useQuery.mockReturnValue({
      data: [{ id: 1, mediaId: 1, mediaType: "movie" }],
    });

    const { container } = render(
      <AddBookmarkButton
        mediaType="movie"
        contentId={1}
        className="w-full bg-black"
      />,
      { wrapper: TestProviders },
    );

    await waitFor(() => {
      const starSvg = container.querySelector("svg");
      expect(starSvg).toHaveClass("fill-cyan-500");
    });
  });

  it("adds a bookmark when the button is clicked", async () => {
    useQuery.mockReturnValue({ data: [] });

    render(
      <AddBookmarkButton
        mediaType="movie"
        contentId={1}
        className="w-full bg-black"
      />,
      { wrapper: TestProviders },
    );

    bookmarkApi.add.mockResolvedValueOnce({
      response: {
        id: 1,
        mediaId: 1,
        userId: 1,
      },
    });

    await userEvent.click(screen.getByLabelText(/add bookmark/i));

    expect(bookmarkApi.add).toHaveBeenCalledWith({
      mediaId: 1,
      mediaType: "movie",
    });
    expect(toast.success).toHaveBeenCalledWith("Bookmark Added");
  });

  it("removes a bookmark when it was already added", async () => {
    useQuery.mockReturnValue({
      data: [{ id: 1, mediaId: 1, mediaType: "movie" }],
    });

    render(
      <AddBookmarkButton
        mediaType="movie"
        contentId={1}
        className="w-full bg-black"
      />,
      { wrapper: TestProviders },
    );

    bookmarkApi.remove.mockResolvedValueOnce({
      response: {
        id: 1,
        mediaId: 1,
        userId: 1,
      },
    });

    await userEvent.click(screen.getByLabelText(/add bookmark/i));

    expect(bookmarkApi.remove).toHaveBeenCalledWith({
      bookmarkId: 1,
    });
  });

  it("shows an error toast if the bookmark API fails", async () => {
    useQuery.mockReturnValue({ data: [] });
    render(
      <AddBookmarkButton
        mediaType="movie"
        contentId={1}
        className="w-full bg-black"
      />,
      { wrapper: TestProviders },
    );

    bookmarkApi.add.mockRejectedValueOnce({
      message: "Failed to add bookmark",
    });

    await userEvent.click(screen.getByLabelText(/add bookmark/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to add bookmark");
    });
  });
});
