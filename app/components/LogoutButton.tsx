"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-sm text-neutral-600 hover:text-neutral-900"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
