import { useNavigate } from "@tanstack/react-router";

import { CloseIcon, SearchIcon } from "@components/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOverlayContext } from "@lib/providers/OverlayProvider";
import { searchFormSchema } from "@lib/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function SearchBarDesktop() {
  const navigate = useNavigate({ from: "/" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchTerm: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(searchFormSchema),
  });

  const search = async (values) => {
    navigate({ to: `/search/${values.searchTerm}/1` });
  };

  useEffect(() => {
    if (errors.searchTerm) {
      toast.info(errors.searchTerm.message);
    }
  }, [errors.searchTerm]);

  return (
    <form className="relative" onSubmit={handleSubmit(search)}>
      <input
        {...register("searchTerm")}
        type="search"
        name="searchTerm"
        className="w-96 rounded-md border border-cyan-500 bg-black/60 py-0.5 pl-6 text-center backdrop-blur-sm focus:rounded-md focus:border focus:border-cyan-300 focus:outline-0"
        placeholder="Search"
      />
      <button
        type="submit"
        value="Search"
        className="absolute left-1 top-1.5 w-4"
      >
        <SearchIcon className="stroke-cyan-500" />
      </button>
    </form>
  );
}

export function SearchBarMobile() {
  const navigate = useNavigate({ from: "/" });
  const { setOverlayType } = useOverlayContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchTerm: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(searchFormSchema),
  });

  const search = async (values) => {
    navigate({ to: `/search/${values.searchTerm}/1` });
    setOverlayType(null);
  };

  useEffect(() => {
    if (errors.searchTerm) {
      toast.info(errors.searchTerm.message);
    }
  }, [errors.searchTerm]);

  return (
    <div className="absolute left-0 top-4 z-[5000] flex w-full flex-col gap-4 px-4">
      <button
        onClick={() => setOverlayType(null)}
        className="z-[6000] self-end rounded-full bg-cyan-600 p-2"
      >
        <CloseIcon aria-label="Close Panel" />
      </button>
      <form onSubmit={handleSubmit(search)} className="relative">
        <input
          {...register("searchTerm")}
          type="search"
          name="searchTerm"
          placeholder="Search"
          className="w-full rounded-md border border-cyan-500 bg-black/60 py-1 pl-8 text-center backdrop-blur-sm focus:rounded-md focus:border focus:border-cyan-300 focus:outline-0"
        />
        <button
          type="submit"
          value="Search"
          className="absolute left-2 top-2 w-4"
        >
          <SearchIcon className="stroke-cyan-500" />
        </button>
      </form>
    </div>
  );
}
