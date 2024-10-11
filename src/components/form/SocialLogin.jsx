"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";

const SocialLogin = () => {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  
  const handleSocialLogin = (provider) => {
    const resp = signIn(provider, {
      redirect: true,
      callbackUrl: path ? path : "/",
    });
  };
  return (
    <div className="flex flex-col justify-center">
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex items-center gap-2 justify-center border border-gray-300 rounded-md p-4 w-80 mx-auto"
      >
        <BsGoogle /> Sign up with Google
      </button>
    </div>
  );
};

export default SocialLogin;
