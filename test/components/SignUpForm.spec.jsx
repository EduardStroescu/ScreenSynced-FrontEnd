import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import userApi from "@api/backend/modules/user.api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { TestProviders } from "../TestProviders";

const inputData = {
  email: { placeholder: "Email", input: "test@example.com" },
  password: { placeholder: "Password", input: "password123" },
  confirmPassword: { placeholder: "Confirm Password", input: "password123" },
  displayName: { placeholder: "Display Name", input: "Test1234" },
};

const outputData = Object.fromEntries(
  Object.entries(inputData).map(([key, value]) => [key, value.input]),
);

const mockSetOverlayType = vi.fn();

beforeAll(async () => {
  vi.mock("@lib/providers/OverlayProvider", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOverlayContext: vi.fn(() => ({
        setOverlayType: mockSetOverlayType,
      })),
    };
  });
  vi.mock("@api/backend/modules/user.api", () => ({
    default: {
      signup: vi.fn(),
    },
  }));
});

describe("SignUpForm Component", () => {
  let SignUpForm;
  const mockSignUpResponse = { data: { id: 1, name: "Test User" } };
  const mockNavigate = vi.fn();

  beforeAll(async () => {
    useNavigate.mockReturnValue(mockNavigate);
    // Dynamically import the component after mocks are set up
    ({ SignUpForm } = await import("@components/SignUpForm"));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component", () => {
    render(<SignUpForm />, { wrapper: TestProviders });
    expect(
      screen.getByRole("heading", { name: /register/i }),
    ).toBeInTheDocument();
  });

  it("renders all the inputs", () => {
    render(<SignUpForm />, { wrapper: TestProviders });

    Object.keys(inputData).forEach((key) => {
      expect(
        screen.getByPlaceholderText(inputData[key].placeholder),
      ).toBeInTheDocument();
    });
  });

  it("renders the sign up button", () => {
    render(<SignUpForm />, { wrapper: TestProviders });
    const signUpButton = screen.getByRole("button", { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    userApi.signup.mockResolvedValueOnce(mockSignUpResponse);

    render(<SignUpForm acceptsRedirect={true} />, { wrapper: TestProviders });

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
      expect(toast.success).toHaveBeenCalledWith(
        "Account created successfully!",
      );
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/account" });
    });
  });

  it("handles form submission error", async () => {
    const errorMessage = "Invalid credentials";
    userApi.signup.mockRejectedValueOnce({ message: errorMessage });

    render(<SignUpForm />, { wrapper: TestProviders });

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
    render(<SignUpForm acceptsRedirect={true} />, { wrapper: TestProviders });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/login" });
  });

  it("calls setOverlayType with 'login' when Log In button is clicked and acceptsRedirect is false", async () => {
    render(<SignUpForm acceptsRedirect={false} />, { wrapper: TestProviders });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockSetOverlayType).toHaveBeenCalledWith("sign-in");
  });

  it("closes the overlay when the close icon is clicked and acceptsRedirect is false", async () => {
    render(<SignUpForm acceptsRedirect={false} />, { wrapper: TestProviders });

    fireEvent.click(screen.getByRole("button", { name: /close panel/i }));

    expect(mockSetOverlayType).toHaveBeenCalledWith(null);
  });

  it("displays validation errors when inputs are invalid", async () => {
    render(<SignUpForm />, { wrapper: TestProviders });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
      expect(
        screen.getByText(/the password must be at least 8 characters/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /the confirmation password must be at least 8 characters/i,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/display name must be at least 8 characters/i),
      ).toBeInTheDocument();
    });
  });
});
