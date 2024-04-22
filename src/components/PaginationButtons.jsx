import { Link } from "@tanstack/react-router";

export function PaginationButtons({ contentType, context, totalPages }) {
  return (
    <nav className="col-span-6 flex flex-row items-center justify-around gap-4 p-6 lg:col-span-3">
      <Link
        to={`/${contentType}/$pageNumber`}
        params={{
          pageNumber:
            Number(context) > 1 ? Number(context) - 1 : Number(context),
        }}
        className={`${
          Number(context) === 1 ? "hidden" : "block"
        } text-md w-full rounded-full bg-cyan-500 px-1 py-1 text-center lg:p-2`}
      >
        Go Back
      </Link>
      <Link
        disabled={Number(context) === totalPages}
        to={`/${contentType}/$pageNumber`}
        params={{
          pageNumber:
            Number(context) < totalPages
              ? Number(context) + 1
              : Number(context),
        }}
        className="text-md w-full rounded-full bg-cyan-500 px-1 py-1 text-center lg:p-2"
      >
        {Number(context) === totalPages ? "You've reached the end" : "See More"}
      </Link>
    </nav>
  );
}
