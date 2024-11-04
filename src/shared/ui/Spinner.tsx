import { Spinner as NextUISpinner } from "@nextui-org/react";
import React from "react";

const Spinner = () => {
  return (
    <>
      <div className="fixed min-h-screen w-full inset-0 opacity-10 bg-[black] filter z-[9999] flex justify-center items-center">
        <NextUISpinner color="default" />
      </div>
    </>
  );
};

export default Spinner;
