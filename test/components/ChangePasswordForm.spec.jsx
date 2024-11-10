import { useNavigate } from "@tanstack/react-router";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { useUserStore } from "@lib/store";

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

beforeAll(() => {
  vi.mock("@api/backend/modules/user.api", () => ({
    default: {
      passwordUpdate: vi.fn(),
    },
  }));
});

describe("ChangePasswordForm Component", () => {
  let ChangePasswordForm;
  const mockNavigate = vi.fn();

  beforeAll(async () => {
    useNavigate.mockReturnValue(mockNavigate);
    // Dynamically import the component after mocks are set up
    ({ ChangePasswordForm } = await import("@components/ChangePasswordForm"));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component", () => {
    render(<ChangePasswordForm />);
    expect(
      screen.getByRole("heading", { name: /change password/i }),
    ).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    userApi.passwordUpdate.mockResolvedValueOnce({
      response: { id: 1, name: "Test User" },
    });

    render(<ChangePasswordForm />);

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
    userApi.passwordUpdate.mockResolvedValueOnce({
      error: { message: errorMessage },
    });

    render(<ChangePasswordForm />);

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
    render(<ChangePasswordForm />);

    userEvent.click(screen.getByRole("button", { name: /change password/i }));

    await waitFor(() => {
      expect(screen.getByText(/a password is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/a new password is required/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/the confirmation password is required/i),
      ).toBeInTheDocument();
    });
  });

  it("closes the overlay when the close icon is clicked", async () => {
    const mockSetOverlay = vi.spyOn(
      useUserStore.getState().actions,
      "setOverlay",
    );
    render(<ChangePasswordForm />);

    userEvent.click(screen.getByRole("button", { name: /close panel/i }));

    await waitFor(() => {
      expect(mockSetOverlay).toHaveBeenCalledWith(false);
    });
  });
});
