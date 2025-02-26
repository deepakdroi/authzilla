import React from "react";
import Padlock from "@/assets/images/rb_548.png";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import NavMenu from "./NavMenu";

export default async function Navbar() {
  const session = await auth();

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image className="w-8 h-8 mr-2" src={Padlock} alt="logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Authzilla
            </span>
          </Link>

          <div className="flex items-center lg:order-2">
            {session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  signup
                </Link>
              </>
            )}
            <NavMenu />
          </div>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
