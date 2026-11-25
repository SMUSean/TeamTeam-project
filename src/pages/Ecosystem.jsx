/**
 * @file Ecosystem.js
 * @description React page/component for displaying information about the Woodland Conservation Site's ecosystem. Includes text-to-speech functionality and interactive visuals for flora, fauna, and fungi.
 * @author Alexander Colpitts, Freddy Rideout, Jaden Eisenhauer, Ashesh Pahari
 *
 */
import React, { useState } from "react";
import { IoPaw } from "react-icons/io5";
import { PiPlantFill } from "react-icons/pi";
import { TbMushroomFilled, TbTrees } from "react-icons/tb";
import { FaVolumeUp, FaPause } from "react-icons/fa";
import deer from "../assets/deer.jpg";
import fern from "../assets/fern.png";
import lake from "../assets/lake.jpg";
import heron from "../assets/heron.jpg";
import coyote from "../assets/coyote.jpg";

const Ecosystem = () => {
  const [speakingText, setSpeakingText] = useState("");

  /**
   * Toggles text-to-speech narration for the selected ecosystem item.
   * @author Raish Raj Joshi
   * @param {string} text - Description text to speak aloud.
   */
  const handleSpeakText = (text) => {
    if (speakingText === text) {
      window.speechSynthesis.cancel();
      setSpeakingText("");
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-CA";
      utterance.onend = () => {
        setSpeakingText("");
      };
      window.speechSynthesis.speak(utterance);
      setSpeakingText(text);
    }
  };

  // Wildlife species rendered in a balanced 3-column row of 3D flip cards
  const wildlifeCards = [
    {
      name: "Great Blue Heron",
      image: heron,
      text: "Herons are wading birds known for their long legs and necks, often found near water bodies.",
    },
    {
      name: "White-Tailed Deer",
      image: deer,
      text: "Deer are graceful herbivores, commonly found in forests and grasslands.",
    },
    {
      name: "Eastern Coyote",
      image: coyote,
      text: "The coyote is a highly adaptable, opportunistic predator, playing a key role in maintaining the balance of local ecosystems by controlling populations of small mammals.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-border via-light-background to-light-border dark:from-gray-900 dark:via-dark-background dark:to-gray-900 text-light-text dark:text-dark-text pb-16">
      {/* Top Hero & Wildlife Section */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-14">
        <div className="bg-white/75 dark:bg-dark-border/85 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-black/5 dark:border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Heading & Description */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3">
              <TbTrees className="text-green-700 dark:text-green-400 text-4xl md:text-5xl shrink-0" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-light-primary dark:text-dark-primary">
                Ecosystem
              </h2>
              <button
                onClick={() =>
                  handleSpeakText(
                    "This woodland conservation site is home to a diverse and vibrant ecosystem, teeming with life and natural beauty. Our woodlands are characterized by a rich variety of flora and fauna, each playing a crucial role in maintaining the ecological balance."
                  )
                }
                className="bg-transparent text-[#5B2C6F] dark:text-[#e6c875] hover:opacity-80 rounded-full p-2 transition-all cursor-pointer"
                aria-label="Read out loud"
              >
                {speakingText ===
                "This woodland conservation site is home to a diverse and vibrant ecosystem, teeming with life and natural beauty. Our woodlands are characterized by a rich variety of flora and fauna, each playing a crucial role in maintaining the ecological balance." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>
            <p className="text-base md:text-lg leading-relaxed opacity-95">
              This woodland conservation site is home to a diverse and vibrant
              ecosystem, teeming with life and natural beauty. Our woodlands are
              characterized by a rich variety of flora and fauna, each playing a
              crucial role in maintaining the ecological balance.
            </p>
          </div>

          {/* Right: Balanced Lake Image */}
          <div className="lg:col-span-7">
            <img
              src={lake}
              alt="Conservation site lake"
              className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Wildlife Flip Cards in a Balanced 3-Column Row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {wildlifeCards.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center gap-3 bg-white/60 dark:bg-dark-border/75 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-black/5 dark:border-white/10 w-full max-w-xs"
            >
              <div className="relative w-52 h-52 group perspective cursor-pointer">
                <div
                  className="absolute inset-0 transform transition-transform transform-3d group-hover:[transform:rotateY(180deg)]"
                  style={{ transition: "transform 0.55s ease-in-out" }}
                >
                  <div
                    className="absolute inset-0 rounded-full shadow-md bg-cover bg-center backface-hidden border-4 border-white/40 dark:border-white/10"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-5 bg-[#6D3D86] text-white dark:bg-gray-900 dark:text-dark-text text-sm leading-snug text-center rounded-full backface-hidden [transform:rotateY(180deg)] shadow-inner">
                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-base text-light-primary dark:text-dark-primary">
                  {item.name}
                </span>
                <button
                  onClick={() => handleSpeakText(item.text)}
                  className="bg-transparent text-[#5B2C6F] dark:text-[#e6c875] hover:opacity-80 rounded-full p-1.5 transition-all cursor-pointer"
                  aria-label={`Read ${item.name} description`}
                >
                  {speakingText === item.text ? (
                    <FaPause className="text-lg" />
                  ) : (
                    <FaVolumeUp className="text-lg" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fern Key Features Banner */}
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat shadow-xl py-14 px-6"
        style={{ backgroundImage: `url(${fern})` }}
      >
        <div className="absolute inset-0 bg-[#2A2030]/75 dark:bg-black/75" />
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-[#f2f2b8]">
              Key features of our ecosystem:
            </h3>
            <button
              onClick={() =>
                handleSpeakText(
                  "Yellow Birch Trees: These majestic trees are a hallmark of our woodland, providing habitat and food for numerous species. Their distinctive yellow bark and graceful form make them a standout feature."
                )
              }
              className="bg-transparent text-[#f0E68C] hover:opacity-80 rounded-full p-2 transition-all cursor-pointer"
              aria-label="Read out loud"
            >
              {speakingText ===
              "Yellow Birch Trees: These majestic trees are a hallmark of our woodland, providing habitat and food for numerous species. Their distinctive yellow bark and graceful form make them a standout feature." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>

          <ul className="list-disc list-outside pl-6 space-y-4 text-base md:text-lg leading-relaxed text-white/95">
            <li>
              <strong className="text-[#f2f2b8]">Yellow Birch Trees:</strong>{" "}
              These majestic trees are a hallmark of our woodland, providing
              habitat and food for numerous species. Their distinctive yellow
              bark and graceful form make them a standout feature.
            </li>
            <li>
              <strong className="text-[#f2f2b8]">Wetlands:</strong> Our
              wetlands are vital for water purification, flood control, and
              providing a habitat for a wide range of wildlife. They are a haven
              for birds, amphibians, and aquatic plants.
            </li>
            <li>
              <strong className="text-[#f2f2b8]">Historical Artifacts:</strong>{" "}
              Scattered throughout the woodland are remnants of the past,
              providing insight into how people lived in a time long forgotten.
            </li>
          </ul>
        </div>
      </section>

      {/* Flora, Fauna, and Fungi Section */}
      <section className="max-w-6xl mx-auto px-6 mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/75 dark:bg-dark-border/85 backdrop-blur-md text-light-text dark:text-dark-text p-8 rounded-2xl shadow-xl border border-black/5 dark:border-white/10 hover:-translate-y-1 transition-transform">
          <div className="flex flex-col items-center mb-3">
            <PiPlantFill className="text-green-700 dark:text-green-400 text-5xl mb-2" />
            <div className="flex items-center gap-1">
              <h3 className="text-2xl font-bold text-light-primary dark:text-dark-primary">
                Flora
              </h3>
              <button
                onClick={() =>
                  handleSpeakText(
                    "Our woodlands are adorned with a variety of plant species, including towering Yellow Birch Trees, delicate wildflowers, and lush ferns."
                  )
                }
                className="bg-transparent text-[#5B2C6F] dark:text-[#e6c875] hover:opacity-80 rounded-full p-2 transition-all cursor-pointer"
                aria-label="Read out loud"
              >
                {speakingText ===
                "Our woodlands are adorned with a variety of plant species, including towering Yellow Birch Trees, delicate wildflowers, and lush ferns." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>
          </div>
          <p className="leading-relaxed text-center opacity-90">
            Our woodlands are adorned with a variety of plant species, including
            towering Yellow Birch Trees, delicate wildflowers, and lush ferns.
          </p>
        </div>

        <div className="bg-white/75 dark:bg-dark-border/85 backdrop-blur-md text-light-text dark:text-dark-text p-8 rounded-2xl shadow-xl border border-black/5 dark:border-white/10 hover:-translate-y-1 transition-transform">
          <div className="flex flex-col items-center mb-3">
            <IoPaw className="text-amber-700 dark:text-amber-400 text-5xl mb-2" />
            <div className="flex items-center gap-1">
              <h3 className="text-2xl font-bold text-light-primary dark:text-dark-primary">
                Fauna
              </h3>
              <button
                onClick={() =>
                  handleSpeakText(
                    "Among the fauna, you can find graceful deer, playful foxes, and a myriad of bird species, each contributing to the vibrant ecosystem."
                  )
                }
                className="bg-transparent text-[#5B2C6F] dark:text-[#e6c875] hover:opacity-80 rounded-full p-2 transition-all cursor-pointer"
                aria-label="Read out loud"
              >
                {speakingText ===
                "Among the fauna, you can find graceful deer, playful foxes, and a myriad of bird species, each contributing to the vibrant ecosystem." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>
          </div>
          <p className="leading-relaxed text-center opacity-90">
            Among the fauna, you can find graceful deer, playful foxes, and a
            myriad of bird species, each contributing to the vibrant ecosystem.
          </p>
        </div>

        <div className="bg-white/75 dark:bg-dark-border/85 backdrop-blur-md text-light-text dark:text-dark-text p-8 rounded-2xl shadow-xl border border-black/5 dark:border-white/10 hover:-translate-y-1 transition-transform">
          <div className="flex flex-col items-center mb-3">
            <TbMushroomFilled className="text-purple-700 dark:text-purple-400 text-5xl mb-2" />
            <div className="flex items-center gap-1">
              <h3 className="text-2xl font-bold text-light-primary dark:text-dark-primary">
                Fungi
              </h3>
              <button
                onClick={() =>
                  handleSpeakText(
                    "Woodland fungi play a vital role in the ecosystem, breaking down organic matter and forming symbiotic relationships with trees and plants."
                  )
                }
                className="bg-transparent text-[#5B2C6F] dark:text-[#e6c875] hover:opacity-80 rounded-full p-2 transition-all cursor-pointer"
                aria-label="Read out loud"
              >
                {speakingText ===
                "Woodland fungi play a vital role in the ecosystem, breaking down organic matter and forming symbiotic relationships with trees and plants." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>
          </div>
          <p className="leading-relaxed text-center opacity-90">
            Woodland fungi play a vital role in the ecosystem, breaking down
            organic matter and forming symbiotic relationships with trees and
            plants.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Ecosystem;


