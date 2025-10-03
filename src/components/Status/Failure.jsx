// Failure.jsx
import React from 'react';

const Failure = ({ message = "Something went wrong. Please try again." }) => {
  return (
    <div className="flex items-center justify-center min-h-[100px] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <svg
        className="w-6 h-6 mr-2 fill-current text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11h2v5h-2V7zm0 6h2v2h-2v-2z" />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Failure;
