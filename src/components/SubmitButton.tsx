import React from "react";

interface SubmitButtonProps {
  isValid: boolean;
  isSubmitting: boolean;
  actionType: "register" | "login"; // Use a union type for actionType
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isValid,
  isSubmitting,
  actionType,
}) => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      disabled={!isValid}
    >
      {isSubmitting
        ? actionType === "register"
          ? "Creating account..."
          : "Logging in..."
        : actionType === "register"
        ? "Create an account"
        : "Log in"}
    </button>
  );
};
