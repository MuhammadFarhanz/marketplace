import { FieldInputProps, FormikProps } from "formik";
import React from "react";

interface Props {
  field: FieldInputProps<string>;
  placeholder: string;
  form: FormikProps<any>;
}

const TextAreaInput = ({ field, form, ...props }: Props) => (
  <textarea
    className={`h-48 max-h-80 w-full rounded-sm border
      px-3 py-2 leading-tight text-gray-700 focus:outline-none
      ${
        form.touched[field.name] && form.errors[field.name]
          ? "border border-red-500"
          : "border-black"
      }`}
    {...field}
    {...props}
  />
);

export default TextAreaInput;
