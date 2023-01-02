import React from "react";
import PrimaryButton from "../PrimaryButton";

const AddUserNavBar = (props) => {
  return (
    <li>
      <PrimaryButton className={`flex space-x-4 ${props.active ? 'underline decoration-primaryBlue font-medium decoration-4 underline-offset-8' : 'no-underline'}`}>
        <span className={`${props.search ? "xl:hidden" : "md:hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </span>
        <span>Add User</span>
      </PrimaryButton>
    </li>
  );
};

export default AddUserNavBar;