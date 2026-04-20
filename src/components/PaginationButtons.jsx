import { cn } from "@lib/cn";
import { Link } from "@tanstack/react-router";
import PropTypes from "prop-types";

export function PaginationButtons({
  contentType,
  pageNumber,
  totalPages,
  search,
}) {
  return (
    <nav className="col-span-6 flex flex-row items-center justify-around gap-4 p-6 lg:col-span-3">
      <Link
        to={`/${contentType}/$pageNumber`}
        aria-label={`Go back`}
        params={{
          pageNumber:
            Number(pageNumber) > 1
              ? Number(pageNumber) - 1
              : Number(pageNumber),
        }}
        search={search ? search : undefined}
        className={cn(
          "text-md w-full rounded-full bg-cyan-500 px-1 py-1 text-center lg:p-2",
          Number(pageNumber) === 1 ? "hidden" : "block",
        )}
      >
        Go Back
      </Link>
      <Link
        aria-label={`See more`}
        disabled={Number(pageNumber) === totalPages}
        to={`/${contentType}/$pageNumber`}
        params={{
          pageNumber:
            Number(pageNumber) < totalPages
              ? Number(pageNumber) + 1
              : Number(pageNumber),
        }}
        search={search ? search : undefined}
        className="text-md w-full rounded-full bg-cyan-500 px-1 py-1 text-center lg:p-2"
      >
        {Number(pageNumber) === totalPages
          ? "You've reached the end"
          : "See More"}
      </Link>
    </nav>
  );
}

PaginationButtons.propTypes = {
  contentType: PropTypes.string.isRequired,
  pageNumber: PropTypes.string.isRequired,
  totalPages: PropTypes.number,
  search: PropTypes.object,
};
