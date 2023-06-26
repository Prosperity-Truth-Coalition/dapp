import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 xl:px-28">
      <div>
        <img src={"/assets/images/Main-Logo-Mockup-3D.png"} alt="" className="w-[6.5rem] xs:w-36 xl:w-40" />
      </div>
      <Link href={"/dapp"}>
      <button  className="border border-gold rounded-md text-gold text-xs font-[900] px-3 pt-1 pb-2.5 xs:pb-3 xs:px-6 xs:text-base hover:bg-gold hover:text-black transition-all duration-500">
        Enter DAPP
      </button>
      </Link>
    </header>
  );
};

export default Header;
