/* eslint-disable react/prop-types */
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  vi.mock("@tanstack/react-query", () => ({
    useQuery: vi.fn(() => ({ data: undefined })),
    useQueries: vi.fn(),
    useMutation: vi.fn((config) => {
      return {
        ...config,
        mutateAsync: async (variables, options = {}) => {
          try {
            // Call the mutationFn provided to `useMutation`
            const result = await config.mutationFn(variables);

            // Call the `onSuccess` handler passed in the config, if provided
            if (config.onSuccess) {
              config.onSuccess(result);
            }

            // If `mutateAsync` was called with an options object, handle `onSuccess`/`onError` there as well
            if (options.onSuccess) {
              options.onSuccess(result);
            }

            return result;
          } catch (error) {
            // Call the `onError` handler passed in the config, if an error occurs
            if (config.onError) {
              config.onError(error);
            }

            if (options.onError) {
              options.onError(error);
            }
          }
        },
        isPending: false,
      };
    }),
    useQueryClient: vi.fn(() => ({
      invalidateQueries: vi.fn(),
      removeQueries: vi.fn(),
      refetchQueries: vi.fn(),
      setQueryData: vi.fn(),
    })),
  }));
  vi.mock("framer-motion", async (importOriginal) => ({
    ...(await importOriginal()),
    useInView: vi.fn(),
  }));
  vi.mock("@tanstack/react-router", () => ({
    useRouter: vi.fn(() => ({
      invalidate: vi.fn(),
    })),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
    useLocation: vi.fn(() => ({
      search: "",
    })),
    // eslint-disable-next-line no-unused-vars
    Link: ({ to, params = {}, preloadDelay, search, children, ...props }) => {
      let href = to;
      if (Object.keys(params).length) {
        Object.keys(params).forEach((param) => {
          href = href.replace(
            `$${param}${search ? `?${search.values}` : ""}`,
            params[param],
          );
        });
      }
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    },
  }));

  vi.mock("react-toastify", () => ({
    toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
  }));

  // eslint-disable-next-line no-undef
  global.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  });
});
