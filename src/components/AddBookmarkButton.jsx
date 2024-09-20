import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import { bookmarkApi } from "../api/backend/modules/bookmark.api";
import { useUserStore, useUserStoreActions } from "../store";
import { BookmarkIcon } from "./Icons";

export function AddBookmarkButton({
  children,
  size,
  className,
  contentId = 1,
  mediaType = "movie",
}) {
  const { user, bookmarkList } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      bookmarkList: state.bookmarkList,
    })),
  );
  const { setOverlay, setBookmarkList } = useUserStoreActions();
  const queryClient = useQueryClient();
  const router = useRouter();

  const addBookmarkMutation = useMutation({
    mutationFn: (body) => bookmarkApi.add(body),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.removeQueries({ queryKey: ["bookmarks"] });
      router.invalidate();
      setBookmarkList([...bookmarkList, response]);
      queryClient.refetchQueries({ queryKey: ["bookmarks"] });
      toast.success("Bookmark Added");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: (bookmarkId) => bookmarkApi.remove({ bookmarkId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.removeQueries({ queryKey: ["bookmarks"] });
      router.invalidate();
      setBookmarkList(bookmarkList.filter((e) => e.mediaId !== contentId));
      toast.info("Bookmark Removed");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onAddBookmark = async () => {
    if (!user) return setOverlay(true);

    if (addBookmarkMutation.isLoading) return;

    if (bookmarkList.map((item) => item.mediaId).includes(contentId)) {
      removeBookmarkMutation.mutateAsync(
        bookmarkList.find((e) => e.mediaId === contentId).id,
      );
      return;
    }

    const body = {
      mediaId: contentId,
      mediaType: mediaType,
    };

    addBookmarkMutation.mutateAsync(body);
  };

  const isBookmarked = bookmarkList
    .map((item) => item.mediaId)
    .includes(contentId)
    ? "fill-cyan-500"
    : "";

  return (
    <button
      title="Add Bookmark"
      aria-label="Add Bookmark"
      className={className}
      onClick={() => onAddBookmark()}
    >
      <BookmarkIcon className={`${size} ${isBookmarked}`} />
      {children}
    </button>
  );
}

AddBookmarkButton.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string,
  className: PropTypes.string,
  contentId: PropTypes.number,
  mediaType: PropTypes.oneOf(["tv", "movie"]).isRequired,
};
