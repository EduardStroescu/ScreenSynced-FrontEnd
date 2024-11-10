import { bookmarkApi } from "@api/backend/modules/bookmark.api";
import { AddBookmarkButton } from "@components/AddBookmarkButton";
import { useUserStore } from "@lib/store";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { beforeAll, describe, expect, it, vi } from "vitest";

beforeAll(async () => {
  vi.mock("@api/backend/modules/bookmark.api", () => ({
    bookmarkApi: {
      add: vi.fn(),
      remove: vi.fn(),
    },
  }));
});

describe("AddBookmarkButton Component", () => {
  it("renders the component", () => {
    render(<AddBookmarkButton mediaType="movie" />);
    expect(screen.getByLabelText(/add bookmark/i)).toBeInTheDocument();
  });

  it("applies the passed styles", () => {
    render(<AddBookmarkButton mediaType="movie" className="w-full bg-black" />);
    const bookmarkButton = screen.getByLabelText(/add bookmark/i);
    expect(bookmarkButton).toHaveClass("bg-black w-full");
  });

  it("renders the button as an active bookmark when it is already added", async () => {
    useUserStore.setState({
      bookmarkList: [{ id: 1, mediaId: 1, mediaType: "movie" }],
    });
    const { container } = render(
      <AddBookmarkButton mediaType="movie" contentId={1} />,
    );

    const starSvg = container.querySelector("svg");
    expect(starSvg).toHaveClass("fill-cyan-500");
  });

  it("adds a bookmark when the button is clicked", async () => {
    bookmarkApi.add.mockResolvedValueOnce({
      response: {
        id: 1,
        mediaId: 1,
        userId: 1,
      },
    });
    useUserStore.setState({ bookmarkList: [] });
    useUserStore.setState({ user: { id: 1 } });
    render(<AddBookmarkButton mediaType="movie" contentId={1} />);

    await userEvent.click(screen.getByLabelText(/add bookmark/i));

    expect(bookmarkApi.add).toHaveBeenCalledWith({
      mediaId: 1,
      mediaType: "movie",
    });
    expect(toast.success).toHaveBeenCalledWith("Bookmark Added");
  });

  it("removes a bookmark when it was already added", async () => {
    useUserStore.setState({
      bookmarkList: [{ id: 1, mediaId: 1, mediaType: "movie" }],
    });
    useUserStore.setState({ user: { id: 1 } });
    render(<AddBookmarkButton mediaType="movie" contentId={1} />);

    await userEvent.click(screen.getByLabelText(/add bookmark/i));

    expect(bookmarkApi.remove).toHaveBeenCalledWith({
      bookmarkId: 1,
    });
  });

  it("shows an error toast if the bookmark API fails", async () => {
    bookmarkApi.add.mockRejectedValue("Failed to add bookmark");
    useUserStore.setState({
      bookmarkList: [],
    });
    useUserStore.setState({ user: { id: 1 } });
    render(<AddBookmarkButton mediaType="movie" contentId={1} />);

    await userEvent.click(screen.getByLabelText(/add bookmark/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to add bookmark, please try again later!",
      );
    });
  });
});
