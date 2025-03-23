"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Sparkle = ({ id, x, y, color, delay, scale }) => (
  <motion.svg
    key={id}
    className="absolute pointer-events-none"
    initial={{ opacity: 0, x, y }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.4, scale, 0.4],
      rotate: [0, 180, 360],
    }}
    transition={{ duration: 1.5, repeat: Infinity, delay }}
    width="15"
    height="15"
    viewBox="0 0 21 21"
    style={{ left: x, top: y }}
  >
    <path
      d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
      fill={color}
    />
  </motion.svg>
);

export const SparklesText = ({
  text,
  colors = { first: "#9E7AFF", second: "#FE8BBB" },
  className,
  sparklesCount = 15,
  ...props
}) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkle = () => ({
      id: `${Math.random().toString(36).substr(2, 9)}`,
      x: `${Math.random() * 90}%`, // 🔹 Keep sparkles inside text
      y: `${Math.random() * 100}%`,
      color: Math.random() > 0.5 ? colors.first : colors.second,
      delay: Math.random() * 1.5,
      scale: Math.random() * 0.7 + 0.4,
    });

    setSparkles(Array.from({ length: sparklesCount }, generateSparkle));

    const interval = setInterval(() => {
      setSparkles((currentSparkles) =>
        currentSparkles.map((sparkle) => generateSparkle())
      );
    }, 1200); // 🔹 Slower refresh for a smoother effect

    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);

  return (
    <div className={cn("relative inline-block font-bold", className)} {...props}>
      {/* ✅ Gradient Text */}
      <span className="relative z-5 font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        {text}
      </span>

      {/* ✅ Sparkles Wrapper */}
      <span className="absolute z-10 inset-0 flex justify-center items-center overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
      </span>
    </div>
  );
};
