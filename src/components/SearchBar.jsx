import { useNavigate } from "@tanstack/react-router";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { CloseIcon, SearchIcon } from "@components/Icons";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function SearchBarDesktop() {
  const navigate = useNavigate({ from: "/" });

  const searchForm = useFormik({
    initialValues: {
      searchTerm: "",
    },
    validationSchema: Yup.object({
      searchTerm: Yup.string().required("A search term is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      navigate({ to: `/search/${values.searchTerm}/1` });
      resetForm();
    },
  });

  useEffect(() => {
    if (searchForm.errors.searchTerm) {
      toast.info(searchForm.errors.searchTerm);
    }
  }, [searchForm.errors.searchTerm]);

  return (
    <form className="relative" onSubmit={searchForm.handleSubmit}>
      <input
        type="search"
        name="searchTerm"
        value={searchForm.values.searchTerm}
        onChange={searchForm.handleChange}
        className="w-96 rounded-md border border-cyan-500 bg-black/60 text-center backdrop-blur-sm focus:rounded-md focus:border focus:border-cyan-300 focus:outline-0"
        placeholder="Search"
      />
      <button type="submit" value="Search">
        <SearchIcon className={"absolute right-1 top-1 w-4 stroke-cyan-500"} />
      </button>
    </form>
  );
}

export function SearchBarMobile({ setSearchModalOpen }) {
  const navigate = useNavigate({ from: "/" });

  const searchForm = useFormik({
    initialValues: {
      searchTerm: "",
    },
    validationSchema: Yup.object({
      searchTerm: Yup.string().required("A search term is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      navigate({ to: `/search/${values.searchTerm}/1` });
      resetForm();
      setSearchModalOpen(false);
    },
  });

  useEffect(() => {
    if (searchForm.errors.searchTerm) {
      toast.info(searchForm.errors.searchTerm);
    }
  }, [searchForm.errors.searchTerm]);

  return (
    <div className="absolute left-0 top-4 z-[5000] flex w-full flex-col gap-4 px-4">
      <button
        onClick={() => setSearchModalOpen(false)}
        className="z-[6000] self-end rounded-full bg-cyan-600 p-2"
      >
        <CloseIcon aria-label="Close Panel" />
      </button>
      <form onSubmit={searchForm.handleSubmit}>
        <input
          type="search"
          name="searchTerm"
          value={searchForm.values.searchTerm}
          onChange={searchForm.handleChange}
          className="w-full rounded-md border border-cyan-500 bg-black/60 text-center backdrop-blur-sm focus:rounded-md focus:border focus:border-cyan-300 focus:outline-0"
          placeholder="Search"
        />
        <button type="submit" value="Search">
          <SearchIcon
            className={"absolute right-6 top-14 w-4 stroke-cyan-500"}
          />
        </button>
      </form>
    </div>
  );
}

SearchBarMobile.propTypes = {
  setSearchModalOpen: PropTypes.func.isRequired,
};
