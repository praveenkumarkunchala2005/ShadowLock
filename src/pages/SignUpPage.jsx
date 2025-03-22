import { SignUp } from '@clerk/clerk-react'
import React from "react";

const SignUpPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col items-center justify-center h-max">
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage