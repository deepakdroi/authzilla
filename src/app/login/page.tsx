"use client";
import React, { useState } from "react";
import { LoginValidation } from "@/utils/UserValidation";
import Image from "next/image";
import Padlock from "@/assets/images/rb_548.png";
import Link from "next/link";
import formatErrorMessage from "@/utils/errorMessageFormat";
import axios from "axios";

export default function Login() {
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

    const validation = LoginValidation.safeParse(fields);
    if (!validation.success) {
      console.log(validation.error?.flatten().fieldErrors);
      const { errorFields, errorMessages } = formatErrorMessage(
        validation.error?.flatten().fieldErrors
      );
      setErrorFields(errorFields);
      setErrorMessages(errorMessages);
    } else {
      try {
        const response = await axios.post("/api/login", fields);
        if (response.data.error) {
          setServerError(response.data.error);
        }
        setSuccess(true);
      } catch (err: any) {
        if (err.response.status === 400) {
          console.log("Bad request: " + err.response.data.error);
          setServerError(
            err.response.data.error ||
              "Bad request. Please check credentials before logging in."
          );
        } else if (err.response.status === 500) {
          console.log("Internal server error: " + err.response.data.error);
          setServerError(
            err.response.data.error ||
              "Internal server error. Please try again."
          );
        } else {
          setServerError(
            err.response.data.error ||
              "An error occurred while trying to login."
          );
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
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
                {errorFields.includes("email") && (
                  <p className="text-xs text-red-500 dark:text-red-400">
                    {errorMessages[errorFields.indexOf("email")]}
                  </p>
                )}
              </div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {errorFields.includes("password") && (
                  <p className="text-xs text-red-500 dark:text-red-400">
                    {errorMessages[errorFields.indexOf("password")]}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
              {serverError && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {serverError}
                </p>
              )}
              {success && (
                <p className="text-xs text-green-500 dark:text-green-400">
                  Success while logging in.
                </p>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&aps;t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
