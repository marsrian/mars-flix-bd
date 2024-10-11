"use client"
import { Circles } from "react-loader-spinner";

const Spinner = () => {
  return (
    <Circles
      height="20"
      width="20"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Spinner;