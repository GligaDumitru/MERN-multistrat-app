import React from "react";

const LayoutPage = ({ children }) => {
  return (
    <div className="container max-w-9xl px-4 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default LayoutPage;
