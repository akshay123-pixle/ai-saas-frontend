// Success.jsx
import React from 'react';

const Success = ({ message = "Operation completed successfully!" }) => {
  return (
    <div className="flex items-center justify-center min-h-[100px] bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
      <svg
        className="w-6 h-6 mr-2 fill-current text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414L9 12.414l4.707-4.707z" />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Success;
