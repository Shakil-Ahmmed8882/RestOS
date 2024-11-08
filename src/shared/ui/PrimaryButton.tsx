import React from "react";

const PrimaryButton = ({ handleClick, text, className }) => {
  return (
    <>
      <button
        type="submit"
        onClick={handleClick}
        className={`${className} bg-primaryColor w-full p-2 rounded-lg active:scale-90 transition-all duration-500 text-[white]`}
      >
        {text}
      </button>
    </>
  );
};

export default PrimaryButton;
