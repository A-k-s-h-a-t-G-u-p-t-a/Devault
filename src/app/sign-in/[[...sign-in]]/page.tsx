"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-900">
      <div className="max-w-md w-full">
        <SignIn afterSignOutUrl="/" afterSignInUrl={"/setup"} />
      </div>
    </div>
  );
}
