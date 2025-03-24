"use client";

import React from "react";
import { Link } from "react-router-dom";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "./magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { RippleButton } from "./magicui/ripple-button";
import { SparklesText } from "./magicui/sparkles-text";
import { Safari } from "./magicui/safari";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
const Body = () => {
  return (
    <>
      <div className="p-1 border-b relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <DotPattern
          glow={true}
          className={cn(
            "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
          )}
        />
        <Link
          to="/home"
          className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]"
        >
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            Introducing ShadowLock
          </AnimatedGradientText>
          <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </Link>
        <span className="p-5 mx-2 md:mx-25 text-3xl md:text-7xl text-center text-black font-bold mt-2">
          <span className="font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            <SparklesText text="ShadowLock" />
          </span>
          <span> The New Way To Secure Your Credentials</span>
        </span>
        <span className="p-5 mx-2 md:mx-25 text-xs md:text-sm text-center text-black font-light">
          A next-generation password manager built for security, privacy, and
          ease of use. Encrypt, store, and access your credentials with
          confidence
        </span>
        <SignedIn>
          <Link to="/home" className="flex items-center mt-2">
            <RippleButton>Get Started</RippleButton>
          </Link>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center -2 space-x-4">
            <RippleButton>
              <SignInButton />
            </RippleButton>
            <RippleButton>
              <SignUpButton />
            </RippleButton>
          </div>
        </SignedOut>
      </div>
      <div className="relative p-10 md:pt-40 md:px-40 md:pb-20">
        <div className="relative">
          <Safari
            url="https://shadowlock.app"
            className="size-full"
            imageSrc="https://via.placeholder.com/1200x750"
          />
        </div>
      </div>
    </>
  );
};

export default Body;
