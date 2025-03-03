import userApi from "@api/backend/modules/user.api";
import { placeholderAvatar } from "@lib/const";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { toast } from "react-toastify";
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

beforeAll(async () => {
  vi.mock("@api/backend/modules/user.api", () => ({
    default: {
      avatarUpdate: vi.fn(),
    },
  }));
});

// eslint-disable-next-line no-undef
global.FileReader = vi.fn().mockImplementation(function () {
  this.readAsDataURL = vi.fn(function (file) {
    // Dynamically generate the base64 result based on the file name
    setTimeout(() => {
      this.result = `data:image/png;base64,${file.name}`;
      this.onloadend(); // Trigger the onloadend event manually
    }, 0);
  });
});

describe("ChangeAvatarForm Component", () => {
  let ChangeAvatarForm;
  let container;

  beforeAll(async () => {
    // Dynamically import the component after mocks are set up
    ({ ChangeAvatarForm } = await import("@components/ChangeAvatarForm"));
  });

  beforeEach(() => {
    act(() => {
      container = render(<ChangeAvatarForm />, {
        wrapper: TestProviders,
      }).container;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component", () => {
    const image = screen.getByRole("img", { name: /avatar/i });
    expect(image).toHaveAttribute("src", placeholderAvatar);
  });

  it("should update the avatar image preview when a new file is selected", async () => {
    const image = screen.getByRole("img", { name: /avatar/i });

    // Find the file input element
    const fileInput = container.querySelector('input[name="avatar"]');

    // Create a mock file and trigger the change event
    const fileName = "avatar";
    const file = new File(["avatar"], fileName, { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for the image preview to update
    await waitFor(() => {
      expect(image).toHaveAttribute("src", "data:image/png;base64,avatar");
    });
  });

  it("should submit the form successfully", async () => {
    const mockSuccessResponse = { data: { id: 1, name: "Test User" } };
    userApi.avatarUpdate.mockResolvedValueOnce({
      response: mockSuccessResponse,
    });

    // Find the file input element
    const fileInput = container.querySelector('input[name="avatar"]');

    // Create a mock file and trigger the change event
    const fileName = "avatar";
    const file = new File(["avatar"], fileName, { type: "image/png" });

    const image = screen.getByRole("img", { name: /avatar/i });
    const button = screen.getByRole("button", { name: /update avatar/i });
    // Simulate file input change
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    // Wait for the avatar to be set and the button to be enabled
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    await waitFor(() => {
      expect(image).toHaveAttribute("src", "data:image/png;base64,avatar");
    });

    // Simulate button click
    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(userApi.avatarUpdate).toHaveBeenCalledWith({
        avatar: "data:image/png;base64,avatar",
      });
      expect(toast.success).toHaveBeenCalledWith(
        "Avatar updated successfully!",
      );
    });
  });

  it("should handle form submission error", async () => {
    const errorMessage = "Failed to update avatar";
    userApi.avatarUpdate.mockRejectedValueOnce({
      message: errorMessage,
    });

    // Find the file input element
    const fileInput = container.querySelector('input[name="avatar"]');

    // Create a mock file and trigger the change event
    const fileName = "avatar";
    const file = new File(["avatar"], fileName, { type: "image/png" });

    const image = screen.getByRole("img", { name: /avatar/i });
    const button = screen.getByRole("button", { name: /update avatar/i });
    // Simulate file input change
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    // Wait for the avatar to be set and the button to be enabled
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    await waitFor(() => {
      expect(image).toHaveAttribute("src", "data:image/png;base64,avatar");
    });

    // Simulate button click
    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(userApi.avatarUpdate).toHaveBeenCalledWith({
        avatar: "data:image/png;base64,avatar",
      });
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  it("should not submit the form if the avatar is not changed", async () => {
    const errorMessage = "Failed to update avatar";
    userApi.avatarUpdate.mockResolvedValueOnce({
      error: { message: errorMessage },
    });

    const button = screen.getByRole("button", { name: /update avatar/i });
    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(userApi.avatarUpdate).not.toHaveBeenCalled();
    });
  });
});
