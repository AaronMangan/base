import React from 'react';

const FloatingButton = ({callback}) => {
  return (
    <button
      className="fixed flex items-center justify-center text-white transition-all bg-blue-500 rounded-full shadow-lg w-14 h-14 bottom-8 right-8 hover:bg-blue-600"
      onClick={callback}
    >
      <span className="pb-1 text-5xl font-bold leading-none">+</span>
    </button>
  );
};

export default FloatingButton;
