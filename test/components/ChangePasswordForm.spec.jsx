import { useNavigate } from "@tanstack/react-router";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { TestProviders } from "../TestProviders";
import { ChangePasswordForm } from "@components/ChangePasswordForm";

import userApi from "@api/backend/modules/user.api";
import { toast } from "react-toastify";

const mockFormData = {
  password: { placeholder: "Current Password", input: "password123" },
  newPassword: { placeholder: "New Password", input: "password123" },
  confirmNewPassword: {
    placeholder: "Confirm New Password",
    input: "password123",
  },
};

const mockSetOverlayType = vi.fn();

beforeAll(() => {
  vi.mock("@lib/providers/OverlayProvider", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOverlayContext: vi.fn(() => ({
        setOverlayType: mockSetOverlayType,
        overlayType: "random",
      })),
    };
  });
  vi.mock("@api/backend/modules/user.api", () => ({
    default: {
      passwordUpdate: vi.fn(),
    },
  }));
});

describe("ChangePasswordForm Component", () => {
  const mockNavigate = vi.fn();

  beforeAll(async () => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  beforeEach(() => {
    render(<ChangePasswordForm />, { wrapper: TestProviders });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component", () => {
    expect(
      screen.getByRole("heading", { name: /change password/i }),
    ).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    userApi.passwordUpdate.mockResolvedValueOnce({
      response: { id: 1, name: "Test User" },
    });

    // Sequentially fill in the form inputs
    await act(async () => {
      for (const key of Object.keys(mockFormData)) {
        fireEvent.change(
          screen.getByPlaceholderText(mockFormData[key].placeholder),
          {
            target: { value: mockFormData[key].input },
          },
        );
      }
    });

    // Click the submit button
    userEvent.click(screen.getByRole("button", { name: /change password/i }));

    // Wait for form submission to complete and assertions
    await waitFor(() => {
      expect(userApi.passwordUpdate).toHaveBeenCalledWith({
        password: "password123",
        newPassword: "password123",
        confirmNewPassword: "password123",
      });
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
    });
  });

  it("handles form submission error", async () => {
    const errorMessage = "Invalid credentials";
    userApi.passwordUpdate.mockRejectedValueOnce({
      message: errorMessage,
    });

    // Fill in the form inputs
    await act(async () => {
      for (const key of Object.keys(mockFormData)) {
        fireEvent.change(
          screen.getByPlaceholderText(mockFormData[key].placeholder),
          {
            target: { value: mockFormData[key].input },
          },
        );
      }
    });

    // Click the submit button
    userEvent.click(screen.getByRole("button", { name: /change password/i }));

    // Wait for the error toast to be called
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("displays validation errors when inputs are invalid", async () => {
    userEvent.click(screen.getByRole("button", { name: /change password/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/the password must be at least 8 characters/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/new password must be at least 8 characters/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /confirmation password must be at least 8 characters/i,
        ),
      ).toBeInTheDocument();
    });
  });

  it("closes the overlay when the close icon is clicked", async () => {
    userEvent.click(screen.getByRole("button", { name: /close panel/i }));

    await waitFor(() => {
      expect(mockSetOverlayType).toHaveBeenCalledWith(null);
    });
  });
});
