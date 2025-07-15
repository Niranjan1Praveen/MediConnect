import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import LogoTicker from "@/sections/LogoTicker";
import Navbar from "@/sections/Navbar";
import React from "react";
import SignUpOptions from "@/sections/SignupOptions";
import { Particles } from "@/components/magicui/particles";
const Home = () => {
  return (
    <>
      <div className="relative w-full">
        <Navbar />
        <Particles
          className="absolute inset-0 z-0"
          quantity={40}
          ease={90}
          refresh
        />
        <Hero />
        <LogoTicker />
      </div>

      <Introduction />
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Features />
        <SignUpOptions />
        <Particles
          className="absolute inset-0 z-0"
          quantity={40}
          ease={90}
          refresh
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;
