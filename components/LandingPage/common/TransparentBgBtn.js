import React from "react";
import { FaChevronRight } from "react-icons/fa";

const TransparentBgBtn = (props) => {
  return (
    <button className="w-full flex items-center justify-center gap-2 text-sm font-[600] text-gold px-6 pt-1 pb-2.5 rounded-md xs:w-fit xl:text-base lg:px-8">
      {props.btnLabel}
      <FaChevronRight className="relative top-0.5" />
    </button>
  );
};

export default TransparentBgBtn;
