/**
 * Purpose: Main component displaying information about Natural Burial.
 * Parameters: None
 * @author Thomas Lama, Freddy Rideout, Jaden Eisenhauer
 */

import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp, FaPause } from "react-icons/fa"; // Import icons from react-icons
import backGmarker from "../assets/backGmarker.jpg"; // Import the background image for Marker Options
import burialOptionImage from "../assets/burialOption.jpg"; // Import the Burial Option background image
import firstpic from "../assets/firstpic.jpg"; // Import the firstpic background image
import GPSImage from "../assets/GPS.png"; // Correct relative import
import pineboxImage from "../assets/pinebox.jpg"; // Import the Pinebox image
import shroudImage from "../assets/shroud.jpg"; // Import the Shroud image
import smallBushImage from "../assets/smallBush.jpg";
import WoodpostImage from "../assets/Woodpost.png";

function NaturalBurial() {
  const [speakingText, setSpeakingText] = useState(""); // Track which text is currently being spoken

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

  // State to track visibility of sections
  const [isNaturalInView, setIsNaturalInView] = useState(false);
  const [isBurialOptionsInView, setIsBurialOptionsInView] = useState(false);
  const [isMarkerOptionsInView, setIsMarkerOptionsInView] = useState(false);

  // Refs for each section
  const naturalBurialRef = useRef(null);
  const burialOptionsRef = useRef(null);
  const markerOptionsRef = useRef(null);

  // Use IntersectionObserver to detect when Natural Burial is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNaturalInView(entry.isIntersecting); // Update visibility state
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    const currentNaturalBurialRef = naturalBurialRef.current;
    if (currentNaturalBurialRef) {
      observer.observe(currentNaturalBurialRef); // Observe the section
    }

    return () => {
      if (currentNaturalBurialRef) {
        observer.unobserve(currentNaturalBurialRef); // Clean up observer
      }
    };
  }, []);

  // Use IntersectionObserver to detect when Burial Options is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBurialOptionsInView(entry.isIntersecting); // Update visibility state
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    const currentBurialOptionsRef = burialOptionsRef.current;
    if (currentBurialOptionsRef) {
      observer.observe(currentBurialOptionsRef); // Observe the section
    }

    return () => {
      if (currentBurialOptionsRef) {
        observer.unobserve(currentBurialOptionsRef); // Clean up observer
      }
    };
  }, []);

  // Use IntersectionObserver to detect when Marker Options is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMarkerOptionsInView(entry.isIntersecting); // Update visibility state
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    const currentMarkerOptionsRef = markerOptionsRef.current;
    if (currentMarkerOptionsRef) {
      observer.observe(currentMarkerOptionsRef); // Observe the section
    }

    return () => {
      if (currentMarkerOptionsRef) {
        observer.unobserve(currentMarkerOptionsRef); // Clean up observer
      }
    };
  }, []);

  return (
    <div className="w-full bg-linear-to-r from-light-background to-light-border dark:from-dark-background dark:to-dark-border 
      text-light-whiteText dark:text-dark-text">
      {/* Full Page Background Section for Natural Burial */}
      <div
        ref={naturalBurialRef}
        className={`bg-cover bg-center h-dvh ${isNaturalInView ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `url(${firstpic})`, transition: "opacity 0.5s ease-in-out" }} // Full-page background image for Natural Burial
      >

        {/* Title and Description of Natural Burial */}
        <div className="flex flex-col h-full z-10 text-center place-items-center justify-center">
          <h1 className="w-full text-[6vmin] font-extrabold text-shadow-lg">
            Natural Burial
          </h1>

          <p className="w-full text-[3vmin] leading-loose">
            Natural burial is an eco-friendly approach to burial where the body
            is returned to the earth with minimal environmental impact, using
            biodegradable materials and without harmful chemicals.
          </p>
          <button
              onClick={() =>
                handleSpeakText(
                  "Natural burial is an eco-friendly approach to burial where the body is returned to the earth with minimal environmental impact, using biodegradable materials and without harmful chemicals."
                )
              }
              className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
              aria-label="Read out loud"
            >
              {speakingText ===
                "Natural burial is an eco-friendly approach to burial where the body is returned to the earth with minimal environmental impact, using biodegradable materials and without harmful chemicals." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
        </div>
      </div>

      {/* Burial Options Section with Full Page Background */}
      <div
        ref={burialOptionsRef}
        className={`bg-cover bg-center w-full h-dvh ${isBurialOptionsInView ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `url(${burialOptionImage})`, transition: "opacity 0.5s ease-in-out" }} // Full-page background image for Burial Options
      >

        {/* Burial Options Header */}
        <h2 className="text-[5vmin] w-full h-[7%] font-bold z-10 text-center">
          Burial Options
        </h2>
        <p className="text-[4vmin] w-full h-[7%] z-10 text-center">
          Here are some natural burial options:
        </p>

        <div className="grid grid-cols-2 grid-rows-3 w-full h-[86%] place-items-center justify-center overflow-hidden">
          {/* Burial Option 1: Pinebox */}
          <div className="w-full h-full col-span-1 row-span-3 text-center place-items-center z-10">
            <img
              src={pineboxImage}
              alt="Pinebox"
              className="w-[60%] rounded-full shadow-lg"
            />
            <h1 className="text-[4vmin]">Pinebox</h1>

            <div className="text-[4vmin]">
              <p>
                A biodegradable pine box with no <br /> non-biodegradable
                materials.
              </p>
              <button
                onClick={() =>
                  handleSpeakText(
                    "A biodegradable pine box with no non-biodegradable materials."
                  )
                }
                className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                  "A biodegradable pine box with no non-biodegradable materials." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>
          </div>
          
          {/* Burial Option 2: Shroud */}
          <div className="col-span-1 row-span-1 w-full h-full"></div>
          <div className="col-span-1 w-full h-full place-items-center text-center z-10">
            <img
              src={shroudImage}
              alt="Shroud"
              className="w-[50%] rounded-full shadow-lg"
            />
            <h3 className="text-[4vmin]">Shroud</h3>
            <p className="text-[4vmin]">
              A simple biodegradable cloth shroud.&nbsp;
            </p>
            <button
              onClick={() =>
                handleSpeakText("A simple biodegradable cloth shroud.")
              }
              className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
              aria-label="Read out loud"
            >
              {speakingText === "A simple biodegradable cloth shroud." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Marker Options Section with Full Page Background Image */}
      <div
        ref={markerOptionsRef}
        className={`w-full h-dvh ${isMarkerOptionsInView ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `url(${backGmarker})`, transition: "opacity 0.5s ease-in-out" }} // Full-page background image for Marker Options
      >
        {/* Marker Options Content */}
        <div className="w-full h-full z-10">
          {/* Marker Options Header */}
          <h1 className="h-[10%] text-[6vmin] font-bold z-10 text-center">
            Marker Options
          </h1>
          <p className="h-[7%] text-[4vmin] z-10 text-center">
            Here are some marker options for natural burials:
          </p>

          {/* Options Container with Flexbox */}
          <div className="flex flex-row w-full h-[83%] items-center justify-center gap-[2.5%]">
            {/* Marker Option 1: Small Bush */}
            <div className="flex flex-col w-[30%] h-full items-center text-center">
              <p className="h-[15%] text-[6vmin]">
                Small Bush
              </p>

              {/* Small Bush Image */}
              <img
                src={smallBushImage}
                alt="Small Bush"
                className="w-full h-[55%] rounded"
              />

              <p className="h-[15%] text-[4vmin]">
                A small bush or shrub can be planted to mark the burial site.
              </p>

              <button
                onClick={() =>
                  handleSpeakText(
                    " A small bush or shrub can be planted to mark the burial site."
                  )
                }
                className="h-[5%] bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                  " A small bush or shrub can be planted to mark the burial site." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>

            {/* Marker Option 2: GPS Coordinate/ No Marker */}
            <div className="flex flex-col w-[30%] h-full items-center text-center">
              <p className="h-[15%] text-[6vmin]">
                GPS Coordinate
              </p>

              {/* GPS Image */}
              <img
                src={GPSImage}
                alt="GPS Coordinate"
                className="w-full h-[55%] rounded"
              />

              <p className="h-[15%] text-[4vmin] mt-4">
                Identify with GPS coordinates, rather than a physical marker.
              </p>

              <button
                onClick={() =>
                  handleSpeakText(
                    " The burial site can be identified by GPS coordinates, without a physical marker."
                  )
                }
                className="h-[5%] bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                  " The burial site can be identified by GPS coordinates, without a physical marker." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>

            {/* Marker Option 3: Biodegradable Wood Post */}
            <div className="flex flex-col w-[30%] h-full items-center text-center">
              <p className="h-[15%] text-[6vmin]">
                Wood Post
              </p>

              <img
                src={WoodpostImage}
                alt="Wood Post"
                className="w-full h-[55%] rounded"
              />

              <p className="h-[15%] text-[4vmin] text-center">
                A small, biodegradable wood post can be used as a marker.
              </p>

              <button
                onClick={() =>
                  handleSpeakText(
                    "A small, biodegradable wood post can be used as a marker."
                  )
                }
                className="h-[5%] bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                  "A small, biodegradable wood post can be used as a marker." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NaturalBurial;
