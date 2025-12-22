import React, { useEffect, useState, useRef } from "react";
import { Corousal } from "./Corousal";
import ThreeGlobe from "./ThreeGlobe";
// import styles from "./Hero.module.css";

export default function Hero({
  tagLine = "Learn smarter with",
  name = "THE SAURON",
  subtitle = "Coding tips, tech breakdowns and gadget insights",
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef(null);

  const words = ["Learner", "Dreamer", "Creator", "Tech nerd", "Thinker", "Gamer", "Traveller"];

  useEffect(() => {
    // Set visible after component mounts
    setIsVisible(true);

    // Word rotation animation
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => {
      clearInterval(wordInterval);
    };
  }, [words.length]);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
      ref={heroRef}
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black z-0"></div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Animated gradient orbs */}
      <div className="  inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>


      {/* Main Content Container - Two Column Layout */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* MOBILE VERSION - Shows on top on mobile */}
          <div className="lg:hidden mt-16 flex items-center justify-center order-1">
            <div className="relative w-full h-[300px]">
              <ThreeGlobe />
            </div>
          </div>

          {/* LEFT COLUMN - 3D Scene (Desktop Only) */}
          <div
            className={`hidden lg:flex relative items-center justify-center transition-all duration-1000 delay-300 ${isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="relative w-full h-[500px]">
              <ThreeGlobe />
            </div>
          </div>

          {/* RIGHT COLUMN - Text Content */}
          <div className="space-y-6 relative z-10 order-2 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Dynamic Word Rotator */}
            <div
              className={`transition-all duration-1000 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              <div className="inline-flex items-center px-5 py-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-white text-lg font-medium mr-3">
                  So, Who Really Am I?&nbsp;
                </p>
                <div className="h-8 overflow-hidden relative">
                  <div
                    className="flex flex-col items-start transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateY(-${currentWordIndex * 32}px)`,
                    }}
                  >
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="text-red-400 font-semibold text-lg py-1 h-8 flex items-center"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tagline badge */}
            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-base bg-white/5 backdrop-blur border border-white/10 text-white transition-all duration-700 delay-500 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              Real builds. Real tests. Real talk.
            </div>

            {/* Main heading */}
            <h1
              className={`text-xl md:text-3xl font-semibold text-white transition-all duration-1000 delay-700 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              {tagLine}
            </h1>

            {/* Highlighted name with crazy effects */}
            <div
              className={`text-2xl md:text-6xl lg:text-7xl font-extrabold transition-all duration-1000 delay-900 relative ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 animate-pulse"></div>

              {/* Main text with multiple effects */}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent animate-gradient-x glitch-text">
                  {name}
                </span>

                {/* Glitch effect layers */}
                <span className="absolute top-0 left-0 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent glitch-layer-1" aria-hidden="true">
                  {name}
                </span>
                <span className="absolute top-0 left-0 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent glitch-layer-2" aria-hidden="true">
                  {name}
                </span>
              </span>
            </div>

            {/* Subtitle */}
            <div
              className={`transition-all duration-1000 delay-1100 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              <p className="text-md text-neutral-300 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </div>

            {/* Simple feature list - minimalist */}
            <div
              className={`flex flex-wrap gap-4 max-w-xl text-sm text-neutral-400 transition-all duration-1000 delay-1300 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                DSA Learning
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                Tech Reviews
              </span>
              {/* <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                Coding Insights
              </span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Corousal section */}
      {/* <div
        className={`absolute bottom-32 left-0 right-0 flex justify-center w-full transition-all duration-1000 delay-1300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <Corousal />
      </div> */}

      {/* CTA Buttons */}
      {/* <div
        className={`absolute bottom-16 left-0 right-0 flex flex-row gap-3 justify-center transition-all duration-1000 delay-1500 ${isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
          }`}
      >
        <a
          href="#services-section"
          className="w-[150px] px-4 py-3 bg-red-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20 text-sm text-center"
        >
          Explore Services
        </a>
        <a
          href="#about-section"
          className="w-[150px] px-4 py-3 bg-transparent text-white border border-white/20 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 text-sm text-center"
        >
          Get in Touch
        </a>
      </div> */}

      {/* Scroll indicator */}
      <div
        className={`hidden lg:block absolute bottom-2 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1700 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Crazy Text Effects */}
      <style jsx>{`
        /* Animated gradient background */
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        /* Glitch effect */
        @keyframes glitch-1 {
          0%, 100% {
            transform: translate(0);
            opacity: 0;
          }
          20% {
            transform: translate(-2px, 2px);
            opacity: 0.8;
          }
          40% {
            transform: translate(-2px, -2px);
            opacity: 0;
          }
          60% {
            transform: translate(2px, 2px);
            opacity: 0.8;
          }
          80% {
            transform: translate(2px, -2px);
            opacity: 0;
          }
        }

        @keyframes glitch-2 {
          0%, 100% {
            transform: translate(0);
            opacity: 0;
          }
          25% {
            transform: translate(2px, -2px);
            opacity: 0.7;
          }
          50% {
            transform: translate(-2px, 2px);
            opacity: 0;
          }
          75% {
            transform: translate(2px, 2px);
            opacity: 0.7;
          }
        }

        .glitch-layer-1 {
          animation: glitch-1 2.5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }

        .glitch-layer-2 {
          animation: glitch-2 3s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }

        .glitch-text {
          position: relative;
          animation: glitch-skew 5s infinite;
        }

        @keyframes glitch-skew {
          0%, 100% {
            transform: skew(0deg);
          }
          20% {
            transform: skew(-0.5deg);
          }
          40% {
            transform: skew(0.5deg);
          }
          60% {
            transform: skew(-0.5deg);
          }
          80% {
            transform: skew(0.5deg);
          }
        }
      `}</style>
    </section>
  );
}