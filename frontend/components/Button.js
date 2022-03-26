import React from "react";

export default function Button( props ) {
  const { text, onClick, className } = props;
  return (
    <div
      className=" max-w-sm mx-auto rounded-xl bg-gray-500 text-center"
      onClick={onClick}
    >
      <span
        className="block py-2 px-3 rounded-xl bg-gray-700 
      text-xl hover:bg-green-700 text-white cursor-pointer"
      >{text}
      </span>
    </div>
  );
}
