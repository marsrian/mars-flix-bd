import React from "react";
import SignUpForm from "@/components/form/SignUpForm";
// import SocialLogin from "@/components/form/SocialLogin";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div>
      <SignUpForm />
      {/* <p className="text-center my-4">Or SignIn with </p> */}
      {/* <SocialLogin /> */}
    </div>
  );
};

export default SignUpPage;
