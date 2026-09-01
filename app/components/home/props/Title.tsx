import React from "react";

interface TitleProps {
  text1: string;
  text2: string;
}

const Title: React.FC<TitleProps> = ({ text1, text2 }) => {
  return (
    <div className="flex-col text-2xl gap-2 items-center mb-3 font-heading">
      <p className="dark:text-white text-black font-bold">
        {text1} <span className="text-gray-500 dark:text-gray-400 font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;
