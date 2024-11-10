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
    useQuery: vi.fn(),
    useQueries: vi.fn(),
    useMutation: vi.fn((config) => ({
      mutateAsync: async (variables) => {
        try {
          const result = await config.mutationFn(variables);
          if (config.onSuccess) config.onSuccess(result);
          return result;
        } catch (error) {
          if (config.onError) config.onError(error);
        }
      },
      isLoading: false,
    })),
    useQueryClient: vi.fn(() => ({
      invalidateQueries: vi.fn(),
      removeQueries: vi.fn(),
      refetchQueries: vi.fn(),
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
    Link: ({ to, params = {}, preloadDelay, children, ...props }) => {
      let href = to;
      if (Object.keys(params).length) {
        Object.keys(params).forEach((param) => {
          href = href.replace(`$${param}`, params[param]);
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
    addListener: vi.fn(), // Mocking addListener
    removeListener: vi.fn(), // Mocking removeListener
  });
});
