import React from "react";

/**
 * Component to display an error message if a form field is touched and has an error.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.touched - Indicates if the field has been touched.
 * @param {string} props.error - The error message to display.
 * @returns {JSX.Element|null} The JSX element for displaying the error message or null if no error.
 */

const ErrorField = ({ touched, error }: any) => {
  return (
    <div className="text-red-500">
      {touched && error && <span>{error}</span>}
    </div>
  );
};

export default ErrorField;
