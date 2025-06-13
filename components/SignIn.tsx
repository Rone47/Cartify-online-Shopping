import { SignInButton } from "@clerk/nextjs";
import React from "react";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button className="text-sm text-shop_dark_green font-semibold hover:text-shop_light_green hoverEffect cursor-pointer">
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
