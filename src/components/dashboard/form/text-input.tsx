import { FieldInputProps, FormikProps } from "formik";
import React from "react";

interface Props {
  field: FieldInputProps<string>;
  placeholder: string;
  form: FormikProps<any>;
}

/**
 * Represents a text input field for forms.
 *
 * This component provides a styled text input field that can be easily integrated
 * with Formik forms. It automatically handles validation errors and styling.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {FieldInputProps<string>} props.field - The FieldInputProps for the input field.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {FormikProps<any>} props.form - The FormikProps for the form.
 * @returns {JSX.Element} The JSX element representing the text input field.
 */

const TextInput = ({ field, form, ...props }: Props) => (
  <input
    className={`focus:shadow-outline w-full appearance-none rounded-sm border  px-3 py-[6px]
     text-gray-700 focus:outline-none ${
       form.touched[field.name] && form.errors[field.name]
         ? "border border-red-500"
         : "border-black"
     }`}
    {...field}
    {...props}
  />
);

export default TextInput;
