import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import userApi from "@api/backend/modules/user.api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { useUserStore } from "@lib/store";

beforeAll(async () => {
  vi.mock("@api/backend/modules/user.api", () => ({
    default: {
      signin: vi.fn(),
    },
  }));
});

describe("SignInForm Component", () => {
  let SignInForm;
  const mockNavigate = vi.fn();
  const mockSignInResponse = { data: { id: 1, name: "Test User" } };

  beforeAll(async () => {
    useNavigate.mockReturnValue(mockNavigate);
    // Dynamically import the component after mocks are set up
    ({ SignInForm } = await import("@components/SignInForm"));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component", () => {
    render(<SignInForm />);
    expect(
      screen.getByRole("heading", { name: /log in/i }),
    ).toBeInTheDocument();
  });

  it("renders all the inputs", () => {
    render(<SignInForm />);
    const inputNames = ["email", "password"];
    inputNames.forEach((name) => {
      expect(
        screen.getByPlaceholderText(new RegExp(name, "i")),
      ).toBeInTheDocument();
    });
  });

  it("renders the sign in button", () => {
    render(<SignInForm />);
    const signInButton = screen.getByRole("button", { name: /log in/i });
    expect(signInButton).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    userApi.signin.mockResolvedValueOnce({ response: mockSignInResponse });

    render(<SignInForm acceptsRedirect={true} />);

    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    // Wait for form submission and response handling
    await waitFor(() => {
      expect(userApi.signin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(toast.success).toHaveBeenCalledWith("Logged In");
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/account" });
    });
  });

  it("handles form submission error", async () => {
    const errorMessage = "Invalid credentials";
    userApi.signin.mockResolvedValueOnce({ error: { message: errorMessage } });

    render(<SignInForm />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(userApi.signin).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("navigates to the signup page when the Sign Up button is clicked and acceptsRedirect is true", async () => {
    render(<SignInForm acceptsRedirect={true} />);

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/signup" });
    });
  });

  it("calls setOverlayType with 'sign-up' when Sign Up button is clicked and acceptsRedirect is false", async () => {
    const mockSetOverlayType = vi.spyOn(
      useUserStore.getState().actions,
      "setOverlayType",
    );
    render(<SignInForm acceptsRedirect={false} />);

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockSetOverlayType).toHaveBeenCalledWith("sign-up");
    });
  });

  it("closes the overlay when the close icon is clicked and acceptsRedirect is false", async () => {
    const mockSetOverlay = vi.spyOn(
      useUserStore.getState().actions,
      "setOverlay",
    );
    render(<SignInForm acceptsRedirect={false} />);

    fireEvent.click(screen.getByRole("button", { name: /close panel/i }));

    await waitFor(() => {
      expect(mockSetOverlay).toHaveBeenCalledWith(false);
    });
  });

  it("displays validation errors when inputs are invalid", async () => {
    render(<SignInForm />);
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/an email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/a password is required/i)).toBeInTheDocument();
    });
  });
});
