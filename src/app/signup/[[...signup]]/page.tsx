"use client"
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return <div className="flex flex-col items-center justify-center h-screen">
        <SignUp afterSignOutUrl="/" />
    </div>
}
