import React from "react";

const Loader = () => (
  <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 opacity-60 z-50 flex items-center justify-center overflow-hidden">
    <span className="flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-blue-500 "></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
    </span>
  </div>
);

export default Loader;
