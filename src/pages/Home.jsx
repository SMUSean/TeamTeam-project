/**
 * @file Home.jsx
 * @author Ashesh Pahari
 */
import React from "react";
import { Link } from "react-router-dom";
import firstpic from "../assets/firstpic.jpg";

export default function Home() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start text-light-text dark:text-dark-text bg-gradient-to-b from-light-border via-light-background to-light-border dark:from-gray-900 dark:via-dark-background dark:to-gray-900 pb-20">
      {/* Hero Banner Section with Gradient Vignette */}
      <div className="relative w-full h-[60vh] min-h-[420px] overflow-hidden shadow-2xl">
        <img
          src={firstpic}
          alt="St. Margarets Bay Woodland"
          className="w-full h-full object-cover filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            St. Margarets Bay Stewardship
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 font-light drop-shadow">
            Conserving our woodlands, protecting local wildlife, and keeping nature pristine for generations to come.
          </p>
          <div className="flex gap-4">
            <Link
              to="/ecosystem"
              className="px-8 py-3 rounded-xl bg-[#6D3D86] text-white font-semibold shadow-lg hover:bg-[#5b3270] transition transform hover:-translate-y-0.5"
            >
              Explore Ecosystem
            </Link>
            <Link
              to="/gallery"
              className="px-8 py-3 rounded-xl bg-white/20 backdrop-blur-md text-white font-semibold border border-white/30 hover:bg-white/30 transition transform hover:-translate-y-0.5"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Summary Cards */}
      <div className="max-w-6xl w-full mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/70 dark:bg-dark-border/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-black/5 dark:border-white/10 flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-3 text-light-primary dark:text-dark-primary">
            Woodland Conservation
          </h3>
          <p className="text-sm md:text-base opacity-90 leading-relaxed">
            Protecting native flora like yellow birch trees and vital wetlands that maintain local ecological balance.
          </p>
        </div>

        <div className="bg-white/70 dark:bg-dark-border/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-black/5 dark:border-white/10 flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-3 text-light-primary dark:text-dark-primary">
            Community & Stewardship
          </h3>
          <p className="text-sm md:text-base opacity-90 leading-relaxed">
            Collaborating with local members and researchers to foster sustainable outdoor education and low-impact enjoyment.
          </p>
        </div>

        <div className="bg-white/70 dark:bg-dark-border/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-black/5 dark:border-white/10 flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-3 text-light-primary dark:text-dark-primary">
            Verified Galleries
          </h3>
          <p className="text-sm md:text-base opacity-90 leading-relaxed">
            Explore authentic photographs of regional fauna, flora, and fungi captured across our conservation area.
          </p>
        </div>
      </div>
    </div>
  );
}


