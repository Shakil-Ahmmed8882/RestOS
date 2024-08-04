import React from "react";
import { Close } from "../../../assets/icons/Icons";

const RSModal = ({ setOpen, open, children }) => {
  return (
    <section className={`${open ? "visible translate-x-0 opacity-100" : " translate-x-80 invisible opacity-0 "}
    transition500 relative py-2`}>
      {children}
      <button className="absolute top-5 right-3 bg-[#d3d3d343] text-[black] p-3 rounded-full font-bold" onClick={() => setOpen(false)}><Close/></button>
    </section>
  );
};

export default RSModal;
