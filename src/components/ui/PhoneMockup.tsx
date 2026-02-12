import React from "react";
import { motion } from "framer-motion";

interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
  imgSrc?: string;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  className = "",
  imgSrc,
}) => {
  return (
    <div
      className={`relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl ${className}`}
    >
      {/* Top Notch / Speaker / Camera */}
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>

      {/* Side Buttons (Volume/Power) */}
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800 relative z-10">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="App Screen"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white flex flex-col relative text-gray-900">
            {/* Status Bar Placeholder */}
            <div className="h-6 w-full bg-transparent flex justify-between items-center px-6 pt-2 text-[10px] font-medium absolute top-0 z-30">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-current rounded-full opacity-20"></div>
                <div className="w-3 h-3 bg-current rounded-full opacity-20"></div>
              </div>
            </div>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneMockup;
