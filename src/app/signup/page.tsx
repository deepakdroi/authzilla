"use client";

import Image from "next/image";
import React, { useState } from "react";
import Padlock from "@/assets/images/rb_548.png";
import Link from "next/link";
import { UserValidation } from "@/utils/UserValidation";
import formatErrorMessage from "@/utils/errorMessageFormat";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Signup() {
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorFields([]);
    setErrorMessages([]);
    setLoading(true);
    setServerError(null);

    const formData = new FormData(e.currentTarget);
    const fields = Object.fromEntries(formData);
    console.log(fields);

    const validation = UserValidation.safeParse(fields);

    if (!validation.success) {
      console.log(validation.error.flatten().fieldErrors);
      const { errorFields, errorMessages } = formatErrorMessage(
        validation.error.flatten().fieldErrors
      );
      setErrorFields(errorFields);
      setErrorMessages(errorMessages);
      setLoading(false);
    } else {
      try {
        const response = await axios.post("/api/signup", fields);
        if (response.data.error) {
          console.log("error:", response.data.error);
          setServerError(response.data.error);
        }
        setSuccess(true);
        redirect("/login");
      } catch (err: any) {
        if (err.response) {
          if (err.response.status === 400) {
            console.error("Bad Request:", err.response.data.error);
            setServerError(
              err.response.data.error || "Bad Request. Please check your input."
            );
          } else if (err.response.status === 500) {
            console.error("Server Error:", err.response.data.error);
            setServerError("Internal Server Error. Please try again later.");
          } else {
            console.error("Unexpected Error:", err.response.data.error);
            setServerError("An unexpected error occurred.");
          }
        } else {
          console.error("Error:", err.message);
          setServerError("An error occurred while submitting the form.");
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image className="w-8 h-8 mr-2" src={Padlock} alt="logo" />
          Authzilla
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="First Name"
                  required
                />
              </div>
              {errorFields.includes("firstName") && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errorMessages[errorFields.indexOf("firstName")]}
                </p>
              )}
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Last Name"
                  required
                />
              </div>
              {errorFields.includes("lastName") && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errorMessages[errorFields.indexOf("lastName")]}
                </p>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              {errorFields.includes("email") && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errorMessages[errorFields.indexOf("email")]}
                </p>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {errorFields.includes("password") && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errorMessages[errorFields.indexOf("password")]}
                </p>
              )}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <Link
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      href="#"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create an account"}
              </button>
              {serverError && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {serverError}
                </p>
              )}
              {success && (
                <p className="text-xs text-green-500 dark:text-green-400">
                  Account created successfully!
                </p>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
