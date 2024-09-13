import React, { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

/**
 * Represents a form field with a label and child elements.
 *
 * This component is used to wrap form input elements with a label for better
 * organization and accessibility.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the form field.
 * @param {ReactNode} props.children - The child elements to be wrapped by the form field.
 * @returns {JSX.Element} The JSX element representing the form field.
 */

const FormField = ({ label, children }: Props) => (
  <div className="mb-4">
    <label className="mb-2 block text-sm font-bold text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

export default FormField;
