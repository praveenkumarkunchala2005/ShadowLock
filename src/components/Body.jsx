"use client";

import React from "react";
import { Link } from "react-router-dom";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "./magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { RippleButton } from "./magicui/ripple-button";
import { ShineBorder } from "./magicui/shine-border";
const Body = () => {
  return (
    <>
      <div className="border-b relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
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
        <span className="p-5 mx-30 text-7xl text-center text-black font-bold">
          ShadowLock The New Way To Secure Your Credentials
        </span>
        <span className="p-5 mx-30 text-xs text-center text-black font-light">
          A next-generation password manager built for security, privacy, and
          ease of use. Encrypt, store, and access your credentials with
          confidence
        </span>
        <Link to="/home" className="flex items-center">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
          <RippleButton>Get Started</RippleButton>
        </Link>
      </div>
    </>
  );
};

export default Body;
