import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import userApi from "@api/backend/modules/user.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { useUserStore } from "@lib/store";

const inputData = {
  email: { placeholder: "Email", input: "test@example.com" },
  password: { placeholder: "Password", input: "password123" },
  confirmPassword: { placeholder: "Confirm Password", input: "password123" },
  displayName: { placeholder: "Display Name", input: "Test1234" },
};

const outputData = Object.fromEntries(
  Object.entries(inputData).map(([key, value]) => [key, value.input]),
);

beforeAll(async () => {
  vi.mock("@api/backend/modules/user.api", () => ({
    default: {
      signup: vi.fn(),
    },
  }));
});

describe("SignUpForm Component", () => {
  let SignUpForm;
  const mockNavigate = vi.fn();
  const mockSignUpResponse = { data: { id: 1, name: "Test User" } };

  beforeAll(async () => {
    useNavigate.mockReturnValue(mockNavigate);
    useMutation.mockImplementation(({ mutationFn }) => ({
      mutateAsync: mutationFn,
    }));
    // Dynamically import the component after mocks are set up
    ({ SignUpForm } = await import("@components/SignUpForm"));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component", () => {
    render(<SignUpForm />);
    expect(
      screen.getByRole("heading", { name: /register/i }),
    ).toBeInTheDocument();
  });

  it("renders all the inputs", () => {
    render(<SignUpForm />);

    Object.keys(inputData).forEach((key) => {
      expect(
        screen.getByPlaceholderText(inputData[key].placeholder),
      ).toBeInTheDocument();
    });
  });

  it("renders the sign up button", () => {
    render(<SignUpForm />);
    const signUpButton = screen.getByRole("button", { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    userApi.signup.mockResolvedValueOnce({ response: mockSignUpResponse });

    render(<SignUpForm acceptsRedirect={true} />);

    // Fill in form fields
    Object.keys(inputData).forEach((key) => {
      fireEvent.change(
        screen.getByPlaceholderText(inputData[key].placeholder),
        {
          target: { value: inputData[key].input },
        },
      );
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Wait for form submission and response handling
    await waitFor(() => {
      expect(userApi.signup).toHaveBeenCalledWith(outputData);
      expect(toast.success).toHaveBeenCalledWith("Sign in successful!");
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/account" });
    });
  });

  it("handles form submission error", async () => {
    const errorMessage = "Invalid credentials";
    userApi.signup.mockResolvedValueOnce({ error: { message: errorMessage } });

    render(<SignUpForm />);

    // Fill in form fields
    Object.keys(inputData).forEach((key) => {
      fireEvent.change(
        screen.getByPlaceholderText(inputData[key].placeholder),
        {
          target: { value: inputData[key].input },
        },
      );
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(userApi.signup).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("navigates to the login page when the Log In button is clicked and acceptsRedirect is true", async () => {
    render(<SignUpForm acceptsRedirect={true} />);

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/login" });
  });

  it("calls setOverlayType with 'login' when Log In button is clicked and acceptsRedirect is false", async () => {
    const mockSetOverlayType = vi.spyOn(
      useUserStore.getState().actions,
      "setOverlayType",
    );
    render(<SignUpForm acceptsRedirect={false} />);

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockSetOverlayType).toHaveBeenCalledWith("login");
  });

  it("closes the overlay when the close icon is clicked and acceptsRedirect is false", async () => {
    const mockSetOverlay = vi.spyOn(
      useUserStore.getState().actions,
      "setOverlay",
    );
    render(<SignUpForm acceptsRedirect={false} />);

    fireEvent.click(screen.getByRole("button", { name: /close panel/i }));

    expect(mockSetOverlay).toHaveBeenCalledWith(false);
  });

  it("displays validation errors when inputs are invalid", async () => {
    render(<SignUpForm />);

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/an email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/a password is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/confirm password is required/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/a display name is required/i),
      ).toBeInTheDocument();
    });
  });
});
