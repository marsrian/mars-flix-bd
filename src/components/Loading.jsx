import React from "react";

const Loading = ({ loadingInfo }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-100px)]">
      <span className="loader"></span>
      <p className="text-center">{loadingInfo}</p>
    </div>
  );
};

export default Loading;