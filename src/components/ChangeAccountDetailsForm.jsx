import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import userApi from "@api/backend/modules/user.api";
import { CloseIcon } from "@components/Icons";
import { useUserStoreActions } from "@lib/store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function ChangeAccountDetailsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setOverlay } = useUserStoreActions();

  const updateAccountDetailsMutation = useMutation({
    mutationFn: (values) => userApi.accountUpdate(values),
  });

  const updateAccountDetailsForm = useFormik({
    initialValues: {
      displayName: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(8, "The displayName must be at least 8 characters")
        .required("A displayName is required"),
    }),
    onSubmit: async (values) => {
      if (isLoading) return;
      setIsLoading(true);
      const { response, error } =
        await updateAccountDetailsMutation.mutateAsync(values);

      if (response) {
        setIsLoading(false);
        updateAccountDetailsForm.resetForm();
        setUser(response);
        setOverlay(false);
        toast.success("Display Name Updated!");
      }

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    },
  });

  return (
    <section className="flex w-[30%] flex-col justify-center gap-6 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] px-6 py-4 text-black">
      <header className="flex flex-col pb-6">
        <button
          onClick={() => setOverlay(false)}
          className="self-end pb-6 text-white"
        >
          <CloseIcon
            aria-label="Close panel"
            className={"hover:stroke-cyan-500"}
          />
        </button>
        <h1 className="self-center font-londrina text-5xl text-white">
          Update Account Details
        </h1>
      </header>
      <div className="flex flex-col justify-center gap-8">
        <form
          onSubmit={updateAccountDetailsForm.handleSubmit}
          className="flex flex-col justify-center gap-4 text-white"
        >
          <input
            type="text"
            placeholder="New Display Name"
            name="displayName"
            value={updateAccountDetailsForm.values.displayName}
            onChange={updateAccountDetailsForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {updateAccountDetailsForm.touched.displayName &&
            updateAccountDetailsForm.errors.displayName && (
              <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
                {updateAccountDetailsForm.errors.displayName}
              </div>
            )}

          <button
            type="submit"
            value="Send"
            className="my-5 rounded border-2 border-cyan-500 bg-[#005f70] px-4 py-1 text-white hover:bg-cyan-500"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
}
