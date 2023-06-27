import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const One ="/assets/images/one.png";
const Coin ="/assets/images/vuL6vbn.png";

const OfficialPartners = () => {
  const images = [
    { image: One, title: "ONE TOKEN" },
    { image: Coin, title: "ZOIN TOKEN" },
    // { image: One, title: "Image 3" },
    // { image: Coin, title: "Image 4" },
  ]; // Add more images with titles if needed
  const [startIndex, setStartIndex] = useState(0);


  const goToPreviousSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 2 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === images.length - 2 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full text-white py-5 flex flex-col gap-8 xl:px-28">
      <h1 className="text-xl text-center font-[600] mb-5 sm:text-2xl lg:text-4xl">
        OFFICIAL PARTNERS
      </h1>

      <div className="w-full flex gap-2 justify-between items-center">
        <button onClick={goToPreviousSlide}>
          <FaChevronLeft className="text-2xl text-white xs:text-3xl lg:text-5xl" />
        </button>

        <div className="flex flex-col gap-5 overflow-hidden lg:gap-20 lg:flex-row">
          {images
            .slice(startIndex, startIndex + 2)
            .map((item, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="flex gap-2 items-center xs:gap-4">
                  <img
                    src={item.image}
                    alt=""
                    className="max-w-[80px] lg:max-w-[100px]"
                  />
                  <p className="text-sm text-center font-[300] xs:text-base">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <button onClick={goToNextSlide}>
          <FaChevronRight className="text-2xl text-white xs:text-3xl lg:text-5xl" />
        </button>
      </div>
    </div>
  );
};

export default OfficialPartners;
