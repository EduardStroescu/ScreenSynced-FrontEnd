import userApi from "@api/backend/modules/user.api";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { TestProviders } from "../TestProviders";

const inputData = {
  displayName: { placeholder: "New Display Name", input: "Test1234" },
};

beforeAll(async () => {
  vi.mock("@api/backend/modules/user.api", () => ({
    default: {
      accountUpdate: vi.fn(),
    },
  }));
});

describe("ChangeAccountDetailsForm Component", () => {
  let ChangeAccountDetailsForm;
  const mockAccountUpdateResponse = { data: { id: 1, name: "Test User" } };

  beforeAll(async () => {
    ({ ChangeAccountDetailsForm } = await import(
      "@components/ChangeAccountDetailsForm"
    ));
  });

  beforeEach(() => {
    render(<ChangeAccountDetailsForm />, { wrapper: TestProviders });
  });

  it("renders the component", () => {
    expect(screen.getByText(/update account details/i)).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    userApi.accountUpdate.mockResolvedValueOnce(mockAccountUpdateResponse);

    Object.keys(inputData).forEach((key) => {
      fireEvent.change(
        screen.getByPlaceholderText(inputData[key].placeholder),
        {
          target: { value: inputData[key].input },
        },
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringMatching(/updated/i),
      );
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("handles form submission error", async () => {
    // Mock an error response from the accountUpdate API
    const errorMessage = "Failed to update account details";
    userApi.accountUpdate.mockRejectedValueOnce({ message: errorMessage });

    // Fill in the form fields
    Object.keys(inputData).forEach((key) => {
      fireEvent.change(
        screen.getByPlaceholderText(inputData[key].placeholder),
        {
          target: { value: inputData[key].input },
        },
      );
    });

    // Click the update button to submit the form
    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    // Wait for the error handling to complete
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
