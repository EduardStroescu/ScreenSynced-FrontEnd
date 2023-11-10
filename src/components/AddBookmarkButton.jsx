import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { bookmarkApi } from "../api/backend/modules/bookmark.api";
import { useUser } from "../store";
import { BookmarkIcon } from "./";

export function AddBookmarkButton({
  children,
  size,
  className,
  contentId,
  mediaType,
}) {
  const { user, setOverlay, bookmarkList, setBookmarkList } = useUser();
  const queryClient = useQueryClient();

  const addBookmarkMutation = useMutation((body) => bookmarkApi.add(body), {
    onSuccess: (response) => {
      setBookmarkList([...bookmarkList, response]);
      queryClient.invalidateQueries(["bookmarks"]);
      toast.success("Bookmark Added");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeBookmarkMutation = useMutation(
    (bookmarkId) => bookmarkApi.remove({ bookmarkId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookmarks"]);
        setBookmarkList(
          [...bookmarkList].filter(
            (e) => e.mediaId.toString() !== contentId.toString(),
          ),
        );
        toast.success("Bookmark Removed");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const onAddBookmark = async () => {
    if (!user) return setOverlay(true);

    if (addBookmarkMutation.isLoading) return;

    if (
      bookmarkList.map((item) => item.mediaId).includes(contentId.toString())
    ) {
      removeBookmarkMutation.mutate(
        bookmarkList.find((e) => e.mediaId.toString() === contentId.toString())
          .id,
      );
      return;
    }

    const body = {
      mediaId: contentId,
      mediaType: mediaType,
    };

    addBookmarkMutation.mutate(body);
  };

  const isBookmarked = bookmarkList
    .map((item) => item.mediaId)
    .includes(contentId?.toString())
    ? "fill-cyan-500"
    : "";

  return (
    <button className={className} onClick={() => onAddBookmark()}>
      <BookmarkIcon className={`${size} ${isBookmarked}`} />
      {children}
    </button>
  );
}
