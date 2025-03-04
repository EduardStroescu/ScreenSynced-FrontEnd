import userApi from "@api/backend/modules/user.api";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { TestProviders } from "../TestProviders";

beforeAll(async () => {
  vi.mock("@api/backend/modules/user.api", () => ({
    default: {
      logout: vi.fn(),
    },
  }));
});

describe("Account Component", () => {
  let Account;
  let container;

  beforeAll(async () => {
    // Dynamically import the component after mocks are set up
    ({ Account } = await import("@components/Account"));
  });
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    global.localStorage = {
      removeItem: vi.fn(),
      setItem: vi.fn(),
      getItem: vi.fn(),
    };
    act(() => {
      container = render(<Account />, { wrapper: TestProviders }).container;
    });
  });

  it("renders the component", () => {
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders account releated actions", () => {
    const buttons = [
      "Change",
      "Change Password",
      "Change Account Details",
      "Log Out",
    ];
    buttons.forEach((button) => {
      expect(screen.getByText(button)).toBeInTheDocument();
    });
  });

  it("calls the logout function when the logout button is clicked", async () => {
    const logoutButton = screen.getByText("Log Out");
    await act(async () => {
      fireEvent.click(logoutButton);
    });
    expect(userApi.logout).toHaveBeenCalled();
  });

  it("logs the user out even if the logout API fails", async () => {
    // Simulate an API failure
    const errorMessage = "Logout failed";
    userApi.logout.mockRejectedValueOnce({ message: errorMessage });

    const logoutButton = screen.getByText("Log Out");
    await act(async () => {
      fireEvent.click(logoutButton);
    });

    await waitFor(() =>
      expect(localStorage.removeItem).toHaveBeenCalledWith("user"),
    );
  });
});
