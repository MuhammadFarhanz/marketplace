import React from "react";

const UserIcon = () => {
  return (
    <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <path
          fill="currentColor"
          d="M12 2a5 5 0 110 10 5 5 0 010-10zm0 1.429a3.571 3.571 0 100 7.142 3.571 3.571 0 000-7.142z"
        ></path>
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M3 18.25c0-2.486 4.542-4 9.028-4 4.486 0 8.972 1.514 8.972 4v3H3v-3z"
        ></path>
        <circle
          cx="12"
          cy="7"
          r="4.25"
          stroke="currentColor"
          strokeWidth="1.5"
        ></circle>
      </g>
    </svg>
  );
};

export default UserIcon;
