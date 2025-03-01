import { bookmarkApi } from "@api/backend/modules/bookmark.api";
import { BookmarkIcon } from "@components/Icons";
import { useUpdateQueryCache } from "@hooks/useUpdateQueryCache";
import { useAuthContext } from "@lib/providers/AuthProvider";
import { useOverlayContext } from "@lib/providers/OverlayProvider";
import { useBookmarksQuery } from "@lib/queries";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { memo } from "react";
import { toast } from "react-toastify";

export const AddBookmarkButton = memo(
  ({ children, iconSize, className, contentId, mediaType }) => {
    const { user } = useAuthContext();
    const { data: bookmarkList } = useBookmarksQuery(user);
    const { setOverlayType } = useOverlayContext();
    const updateQueryCache = useUpdateQueryCache();

    const addBookmarkMutation = useMutation({
      mutationFn: (body) => bookmarkApi.add(body),
      onSuccess: (response) => {
        updateQueryCache(["bookmarks", user?.id], (prevBookmarks) => [
          ...prevBookmarks,
          response,
        ]);
        toast.success("Bookmark Added");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const removeBookmarkMutation = useMutation({
      mutationFn: (bookmarkId) => bookmarkApi.remove({ bookmarkId }),
      onSuccess: () => {
        updateQueryCache(["bookmarks", user?.id], (prevBookmarks) =>
          prevBookmarks.filter((e) => e.mediaId !== contentId),
        );
        toast.info("Bookmark Removed");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const onAddBookmark = async () => {
      if (!user) return setOverlayType("sign-in");
      if (!contentId) return;

      if (addBookmarkMutation.isLoading) return;

      if (bookmarkList.map((item) => item.mediaId).includes(contentId)) {
        await removeBookmarkMutation.mutateAsync(
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
      ?.map((item) => item.mediaId)
      .includes(contentId)
      ? "fill-cyan-500"
      : "";

    return (
      <button
        title="Add Bookmark"
        aria-label="Add Bookmark"
        className={className}
        onClick={onAddBookmark}
      >
        <BookmarkIcon className={`${iconSize} ${isBookmarked}`} />
        {children}
      </button>
    );
  },
);

AddBookmarkButton.displayName = "AddBookmarkButton";

AddBookmarkButton.propTypes = {
  children: PropTypes.node,
  iconSize: PropTypes.string,
  className: PropTypes.string,
  contentId: PropTypes.number,
  mediaType: PropTypes.oneOf(["tv", "movie"]).isRequired,
};
