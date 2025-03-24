import React, { useEffect, useRef } from "react";
import Body from "../components/Body";

const Landing = () => {
  return (
    <div className="relative w-full max-h-min   ">
      <div className="absolute top-0 left-0 w-full h-full min-h-screen"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow">
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Landing;
