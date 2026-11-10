/**
 * @file Ecosystem.js
 * @description React page/component for displaying information about the Woodland Conservation Site's ecosystem. Includes text-to-speech functionality and interactive visuals for flora, fauna, and fungi.
 * @author Alexander Colpitts, Freddy Rideout, Jaden Eisenhauer
 *
 */

import React from "react";
import { useState } from "react";
import { IoPaw } from "react-icons/io5";
import { PiPlantFill } from "react-icons/pi";
import { TbMushroomFilled } from "react-icons/tb";
import { TbTrees } from "react-icons/tb";
import { FaVolumeUp, FaPause } from "react-icons/fa";
import deer from "../assets/deer.jpg";
import fern from "../assets/fern.png";
import lake from "../assets/lake.jpg";
import heron from "../assets/heron.jpg";
import coyote from "../assets/coyote.jpg";

/**
 * Ecosystem Component
 * @returns {JSX.Element} Component rendering the ecosystem information.
 */
const Ecosystem = () => {
  /**
   * State to track the currently spoken text.
   * @type {[string, Function]}
   */
  const [speakingText, setSpeakingText] = useState("");

  /**
   * Handles text-to-speech functionality.
   * Toggles speech synthesis for the provided text.
   *
   * @author Raish Raj Joshi
   *
   * @param {string} text - Text to be spoken.
   */
  const handleSpeakText = (text) => {
    if (speakingText === text) {
      // Pause if the same text is being spoken
      window.speechSynthesis.pause();
      window.speechSynthesis.cancel(); // Stop any ongoing speech immediately
      setSpeakingText(""); // Reset the speaking text
    } else {
      // Stop current speech and start new text
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-CA";

      utterance.onend = () => {
        setSpeakingText(""); // Reset after speaking
      };

      window.speechSynthesis.speak(utterance);
      setSpeakingText(text); // Update speaking text
    }
  };

  return (
    <div>
      {/* Ecosystem Section */}
      <section>
        {/* Ecosystem Heading and TTS Button*/}
        <div className="flex items-center">
          <TbTrees className="text-green-700 dark:text-green-300 text-[8vmin] mr-3" />
          <h2 className="text-[7vmin] text-light-primary dark:text-dark-primary">Ecosystem</h2>
          <button
            onClick={() =>
              handleSpeakText(
                "This woodland conservation site is home to a diverse and vibrant ecosystem, teeming with life and natural beauty. Our woodlands are characterized by a rich variety of flora and fauna, each playing a crucial role in maintaining the ecological balance."
              )
            }
            className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
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
        <div className="flex items-center justify-center">
          <div className="w-[95%] grid grid-cols-2">
            {/* Ecosystem Decscriptive Text and Lake Image */}
            <div className="flex flex-col justify-center items-center text-light-text dark:text-dark-text">
              <p className="text-[2vmin] leading-relaxed w-[75%]">
                This woodland conservation site is home to a diverse and vibrant
                ecosystem, teeming with life and natural beauty. Our woodlands
                are characterized by a rich variety of flora and fauna, each
                playing a crucial role in maintaining the ecological balance.
              </p>
              <img
                src={lake}
                alt="Lake"
                className="sm:pr-0 h-auto rounded shadow-md"
              />
            </div>

            {/* Flipping Images and TTS Buttons */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative w-64 h-64 group transform-3d perspective">
                <div
                  className="absolute inset-0 transform transition-transform transform-3d group-hover:[transform:rotateY(180deg)]"
                  style={{ transition: "transform 0.5s ease-in-out" }}
                >
                  {/* Heron Image */}
                  <div
                    className="absolute inset-0 rounded-full shadow-md bg-cover bg-center backface-hidden"
                    style={{ backgroundImage: `url(${heron})` }}
                  ></div>

                  {/* Text on back side of image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-light-background text-black dark:bg-dark-border dark:text-dark-text text-center rounded-full backface-hidden [transform:rotateY(180deg)]">
                    <p>
                      Herons are wading birds known for their long legs and
                      necks, often found near water bodies.
                    </p>
                  </div>
                </div>
                {/* TTS Button */}
                <button
                  onClick={() =>
                    handleSpeakText(
                      "Herons are wading birds known for their long legs and necks, often found near water bodies."
                    )
                  }
                  className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                  aria-label="Read out loud"
                >
                  {speakingText ===
                  "Herons are wading birds known for their long legs and necks, often found near water bodies." ? (
                    <FaPause className="text-xl" />
                  ) : (
                    <FaVolumeUp className="text-xl" />
                  )}
                </button>
              </div>
              <div className="relative w-64 h-64 group transform-3d perspective">
                <div
                  className="absolute inset-0 transform transition-transform transform-3d group-hover:[transform:rotateY(180deg)]"
                  style={{ transition: "transform 0.5s ease-in-out" }}
                >
                  {/* Deer Image */}
                  <div
                    className="absolute inset-0 rounded-full shadow-md bg-cover bg-center backface-hidden"
                    style={{ backgroundImage: `url(${deer})` }}
                  ></div>

                  {/* Text on back side of image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-light-background text-black dark:bg-dark-border dark:text-dark-text text-center rounded-full backface-hidden [transform:rotateY(180deg)]">
                    <p>
                      Deer are graceful herbivores, commonly found in forests
                      and grasslands.
                    </p>
                  </div>
                </div>
                {/* TTS Button */}
                <button
                  onClick={() =>
                    handleSpeakText(
                      "Deer are graceful herbivores, commonly found in forests and grasslands."
                    )
                  }
                  className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                  aria-label="Read out loud"
                >
                  {speakingText ===
                  "Deer are graceful herbivores, commonly found in forests and grasslands." ? (
                    <FaPause className="text-xl" />
                  ) : (
                    <FaVolumeUp className="text-xl" />
                  )}
                </button>
              </div>
              <div className="relative w-64 h-64 group transform-3d perspective">
                <div
                  className="absolute inset-0 transform transition-transform transform-3d group-hover:[transform:rotateY(180deg)]"
                  style={{ transition: "transform 0.5s ease-in-out" }}
                >
                  {/* Coyote Image */}
                  <div
                    className="absolute inset-0 rounded-full shadow-md bg-cover bg-center backface-hidden"
                    style={{ backgroundImage: `url(${coyote})` }}
                  ></div>

                  {/* Text on back side of image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-light-background text-light-text dark:bg-dark-border dark:text-dark-text text-center rounded-full backface-hidden [transform:rotateY(180deg)]">
                    <p>
                      The coyote is a highly adaptable, opportunistic predator,
                      playing a key role in maintaining the balance of local
                      ecosystems by controlling populations of small mammals.
                    </p>
                  </div>
                </div>
                {/* TTS Button */}
                <button
                  onClick={() =>
                    handleSpeakText(
                      "The coyote is a highly adaptable, opportunistic predator, playing a key role in maintaining the balance of local ecosystems by controlling populations of small mammals."
                    )
                  }
                  className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                  aria-label="Read out loud"
                >
                  {speakingText ===
                  "The coyote is a highly adaptable, opportunistic predator, playing a key role in maintaining the balance of local ecosystems by controlling populations of small mammals." ? (
                    <FaPause className="text-xl" />
                  ) : (
                    <FaVolumeUp className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fern Background Image */}
      <div className="flex justify-center">
        <section
          className="relative w-full bg-cover bg-center bg-no-repeat bg-opacity-50 shadow-md"
          style={{ backgroundImage: `url(${fern})` }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gray-600/60"></div>
          <div className="relative z-10">
            {/* Key Features Intro and TTS Button */}
            <div className="flex items-start">
              <p className="light-disc leading-relaxed text-xl text-light-whiteText dark:text-dark-whiteText">
                Key features of our ecosystem:
              </p>
              {/* TTS Button */}
              <button
                onClick={() =>
                  handleSpeakText(
                    "Yellow Birch Trees: These majestic trees are a hallmark of our woodland, providing habitat and food for numerous species. Their distinctive yellow bark and graceful form make them a standout feature."
                  )
                }
                className="bg-transparent text-blue-500 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                "Yellow Birch Trees: These majestic trees are a hallmark of our woodland, providing habitat and food for numerous species. Their distinctive yellow bark and graceful form make them a standout feature." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
              <br></br>
            </div>
            {/* Key Features Dotted List */}
            <ul className="list-disc list-inside text-lg text-light-whiteText dark:text-dark-whiteText sm:px-40">
              <li>
                <b className="text-xl">Yellow Birch Trees:</b> These majestic
                trees are a hallmark of our woodland, providing habitat and food
                for numerous species. Their distinctive yellow bark and graceful
                form make them a standout feature.
              </li>
              <li>
                <b className="text-xl">Wetlands:</b> Our wetlands are vital for
                water purification, flood control, and providing a habitat for a
                wide range of wildlife. They are a haven for birds, amphibians,
                and aquatic plants.
              </li>
              <li>
                <b className="text-xl">Historical Artifacts:</b> Scattered
                throughout the woodland are remnants of the past, providing
                insight into how people lived in a time long forgotten.
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Flora, Fauna, and Fungi Section */}
      <div className="grid grid-cols-3 gap-8 w-full">
        <div
          className="bg-light-background text-light-text dark:bg-dark-border dark:text-dark-text rounded-lg shadow-lg hover:scale-105 transition-all"
          style={{ transition: "all 0.5s" }}
        >
          {/* Flora Section */}
          <div className="flex flex-col items-center">
            <PiPlantFill className="text-green-700 text-6xl mb-2" />
            <div className="flex items-center">
              {/* Flora Heading */}
              <h3 className="text-[3vmin] text-light-primary">
                Flora
              </h3>
              {/* TTS Button */}
              <button
                onClick={() =>
                  handleSpeakText(
                    "Our woodlands are adorned with a variety of plant species, including towering Yellow Birch Trees, delicate wildflowers, and lush ferns."
                  )
                }
                className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
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
          {/* Flora Descriptive Text */}
          <p className="leading-relaxed text-center">
            Our woodlands are adorned with a variety of plant species, including
            towering Yellow Birch Trees, delicate wildflowers, and lush ferns.
          </p>
        </div>

        <div
          className="bg-light-background text-light-text dark:bg-dark-border dark:text-dark-text p-4 rounded-lg shadow-lg hover:scale-105 transition-all"
          style={{ transition: "all 0.5s" }}
        >
          {/* Fauna Section */}
          <div className="flex flex-col items-center">
            <IoPaw className="text-orange-700 text-6xl mb-2" />
            <div className="flex items-center">
              {/* Fauna Heading */}
              <h3 className="text-[3vmin] text-light-primary">Fauna</h3>
              {/* TTS Button */}
              <button
                onClick={() =>
                  handleSpeakText(
                    "Among the fauna, you can find graceful deer, playful foxes, and a myriad of bird species, each contributing to the vibrant ecosystem."
                  )
                }
                className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
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
          {/* Fauna Descriptive Text */}
          <p className="leading-relaxed text-center">
            Among the fauna, you can find graceful deer, playful foxes, and a
            myriad of bird species, each contributing to the vibrant ecosystem.
          </p>
        </div>

        <div
          className="bg-light-background text-light-text dark:bg-dark-border dark:text-dark-text p-4 rounded-lg shadow-lg hover:scale-105 transition-all"
          style={{ transition: "all 0.5s" }}
        >
          {/* Fungi Section */}
          <div className="flex flex-col items-center">
            <TbMushroomFilled className="text-purple-700 text-6xl mb-2" />
            <div className="flex items-center">
              {/* Fungi Heading */}
              <h3 className="text-[3vmin] text-light-primary">Fungi</h3>
              {/* TTS Button */}
              <button
                onClick={() =>
                  handleSpeakText(
                    "Woodland fungi play a vital role in the ecosystem, breaking down organic matter and forming symbiotic relationships with trees and plants."
                  )
                }
                className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
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
          {/* Fauna Descriptive Text */}
          <p className="text-lg leading-relaxed text-center mx-20">
            Woodland fungi play a vital role in the ecosystem, breaking down
            organic matter and forming symbiotic relationships with trees and
            plants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ecosystem;
