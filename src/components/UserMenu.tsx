"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { signOutUser } from "@/app/actions/authActions";

type Props = {
  user: Session["user"];
};

export default function UserMenu({ user }: Props) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded={isDropdownVisible}
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <Image
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
            src={user?.image || "/images/user.png"}
            alt="user photo"
          />
        </button>
        <div
          className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ${
            isDropdownVisible ? "block" : "hidden"
          }`}
          style={{ top: "calc(100% + 0.5rem)" }}
          id="dropdown"
        >
          <div className="py-3 px-4">
            <span className="block text-sm font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              {user?.email}
            </span>
          </div>
          <ul className="py-1 text-gray-500 dark:text-gray-400">
            <li>
              <a
                color="danger"
                onClick={async () => signOutUser()}
                className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
