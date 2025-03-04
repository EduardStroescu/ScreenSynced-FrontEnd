import { useNavigate } from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { TestProviders } from "../TestProviders";

describe("SearchBar Component", () => {
  const mockNavigate = vi.fn();
  beforeAll(async () => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Desktop version", () => {
    let SearchBarDesktop;
    beforeAll(async () => {
      // Dynamically import the component after mocks are set up
      ({ SearchBarDesktop } = await import("@components/SearchBar"));
    });

    it("renders the component", () => {
      render(<SearchBarDesktop />, { wrapper: TestProviders });
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
    });

    it("renders the search input", () => {
      render(<SearchBarDesktop />, { wrapper: TestProviders });
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
    });

    it("renders the search button", () => {
      render(<SearchBarDesktop />, { wrapper: TestProviders });
      expect(
        screen.getByRole("button", { name: /search/i }),
      ).toBeInTheDocument();
    });

    it("navigates to the search page when the search button is clicked", async () => {
      render(<SearchBarDesktop />, { wrapper: TestProviders });
      fireEvent.change(screen.getByRole("searchbox"), {
        target: { value: "test" },
      });
      const searchButton = screen.getByRole("button", { name: /search/i });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith({ to: "/search/test/1" });
        expect(screen.getByRole("searchbox")).toBeEmptyDOMElement();
      });
    });

    it("fires a validation error toast when the search input is empty", async () => {
      render(<SearchBarDesktop />, { wrapper: TestProviders });
      fireEvent.change(screen.getByRole("searchbox"), {
        target: { value: "" },
      });
      const searchButton = screen.getByRole("button", { name: /search/i });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(toast.info).toHaveBeenCalledWith("A search term is required");
      });
    });
  });

  describe("Mobile version", () => {
    let SearchBarMobile;
    beforeAll(async () => {
      // Dynamically import the component after mocks are set up
      ({ SearchBarMobile } = await import("@components/SearchBar"));
    });
    it("renders the component", () => {
      render(<SearchBarMobile setSearchModalOpen={vi.fn} />, {
        wrapper: TestProviders,
      });
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
    });

    it("renders the search input", () => {
      render(<SearchBarMobile setSearchModalOpen={vi.fn} />, {
        wrapper: TestProviders,
      });
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
    });

    it("renders the search button", () => {
      render(<SearchBarMobile setSearchModalOpen={vi.fn} />, {
        wrapper: TestProviders,
      });
      expect(
        screen.getByRole("button", { name: /search/i }),
      ).toBeInTheDocument();
    });

    it("navigates to the search page when the search button is clicked", async () => {
      render(<SearchBarMobile setSearchModalOpen={vi.fn} />, {
        wrapper: TestProviders,
      });
      fireEvent.change(screen.getByRole("searchbox"), {
        target: { value: "test" },
      });
      const searchButton = screen.getByRole("button", { name: /search/i });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith({ to: "/search/test/1" });
        expect(screen.getByRole("searchbox")).toBeEmptyDOMElement();
      });
    });

    it("fires a validation error toast when the search input is empty", async () => {
      render(<SearchBarMobile setSearchModalOpen={vi.fn} />, {
        wrapper: TestProviders,
      });
      fireEvent.change(screen.getByRole("searchbox"), {
        target: { value: "" },
      });
      const searchButton = screen.getByRole("button", { name: /search/i });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(toast.info).toHaveBeenCalledWith("A search term is required");
      });
    });
  });
});
