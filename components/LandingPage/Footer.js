import React from "react";

const Footer = () => {
  return (
    <footer className="text-white py-10 flex flex-col gap-8 xl:px-28">
      <div className="flex flex-col gap-5 md:flex-row md:gap-16">
        <div className="flex flex-col gap-5 md:relative -top-[18px]">
          <h1 className="text-[2rem] font-[900] leading-[1.5] xs:text-[2.5rem] lg:text-5xl lg:leading-[1.5]">
            JOIN <span className="text-gold">PTC</span>{" "}
            <span className="block">COMMUNITY</span>
          </h1>

          <p className="text-sm font-[100]">
            A coalition of like-minded people who know that truth is the onlyway
            to prosperity in life.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="font-[600] flex gap-2 items-center">
              <h1>DISCORD</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="text-sm font-[100]">
              Join our Discord community and stay connected with the latest
              updated on PTC
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className=" flex gap-2 items-center">
              <h1 className="font-[600]">TWITTER</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="text-sm font-[100]">
              Follow us on Twitter and stay up to date by engaging with PTC.
            </p>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gold"></div>

      <div className="text-sm text-center px-[10%]">
        <p>
          <span className="font-[900]">Prosperity Truth Coalition</span>{" "}
          2023 ©All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
