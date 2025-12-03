"use client";

import Lottie from "lottie-react";
import animationData from "@/public/loading.json";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Lottie animationData={animationData} loop className="w-40 h-40" />
    </div>
  );
}
