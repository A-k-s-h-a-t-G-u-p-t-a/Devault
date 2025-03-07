"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import GitHubForm from "@/components/GitHubForm";

export default function RoleForm() {
  
  return (
    <GitHubForm/>
  );
}
