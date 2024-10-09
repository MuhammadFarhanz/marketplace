import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SearchInput = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values: any) => {
      router.push(`/search/${values.search}`);
    },
  });

  return (
    <div className="rounded-sm ">
      <form
        onSubmit={formik.handleSubmit}
        className=" relative flex w-full items-center overflow-hidden rounded-md border border-black bg-white sm:h-[39px]"
      >
        <div className="grid h-full w-12 place-items-center text-[#9E9E9E]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          onChange={formik.handleChange}
          value={formik.values.search}
          name="search"
          className="peer h-full w-full pr-2 text-sm text-gray-700 outline-none"
          type="text"
          id="search"
          placeholder="Search something.."
        />
      </form>
    </div>
  );
};

export default SearchInput;
