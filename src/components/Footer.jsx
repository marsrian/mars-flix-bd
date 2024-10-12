"use client";
import React from "react";
import MarsWLogo from "/public/MFW.png";
import MarsBLogo from "/public/MFB.png";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const pathName = usePathname();

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-slate-300 dark:bg-slate-900 mt-8 p-8 md:p-20 md:pb-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <Link href="/">
            <Image
              src={MarsWLogo}
              width={100}
              height={60}
              alt="logo"
              className="hidden dark:block w-auto"
            />
            <Image
              src={MarsBLogo}
              width={100}
              height={60}
              alt="logo"
              className="dark:hidden w-auto"
            />
          </Link>
          <p className="text-justify w-full md:w-72 mt-3">
            MarsFlixBD is a huge movie and web series collection website. you
            can free download any movie here.
          </p>
        </div>
        <div className="mt-8 md:mt-0">
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">
            Support
          </h3>
          <ul className="flex flex-col space-y-2 mt-2  md:mt-3">
            <li>
              <Link
                href="/contact-us"
                className={`${
                  pathName === "/contact-us" ? "text-blue-600" : ""
                }`}
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className={`${
                  pathName === "/terms-and-conditions" ? "text-blue-600" : ""
                }`}
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className={`${
                  pathName === "/privacy-policy" ? "text-blue-600" : ""
                }`}
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-8 md:mt-0">
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">
            Follow Us
          </h3>
          <ul className="flex gap-3 mt-2 md:mt-3">
            <Link
              href="https://www.facebook.com/profile.php?id=61556193720658"
              target="_blank"
              className="hover:text-slate-400"
            >
              <FaFacebook className="text-3xl" />
            </Link>
            <Link
              href="https://www.youtube.com/@marsriangaming"
              target="_blank"
              className="hover:text-slate-400"
            >
              <FaYoutube className="text-3xl" />
            </Link>
            <Link
              href="https://twitter.com/marsrian40"
              target="_blank"
              className="hover:text-slate-400"
            >
              <FaXTwitter className="text-3xl" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/afzal-hussain-rian-91606a267/"
              target="_blank"
              className="hover:text-slate-400"
            >
              <FaLinkedin className="text-3xl" />
            </Link>
          </ul>
        </div>
      </div>
      <p className="text-center mt-12">
        © {currentYear}, MarsFlixBD. All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
