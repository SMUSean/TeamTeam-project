/**
 * @file FaunaFloraFunga.jsx
 * @description FFF page, required by terry's software requirement document.
 * @author Yilin Huang, Jaden Eisenhauer, Ashesh Pahari
 */
import React from "react";
import { FaVolumeUp } from "react-icons/fa";
import "../index.css";

const fauna = {
  title: "Fauna",
  img: "/deer_in_forests.jpg",
  desc: "Fauna represents the animal life of the woodland. Deer are gentle inhabitants, playing a vital role in the forest ecosystem. Listen to the sounds of the forest and imagine the rustle of leaves as a deer passes by.",
  audio: true,
};

const flora = {
  title: "Flora",
  img: "/colorful_flowers.jpg",
  desc: "Flora encompasses the vibrant plant life. These colorful flowers bring beauty and diversity, supporting pollinators and enriching the woodland. Enjoy the visual feast and imagine the gentle hum of bees.",
  audio: true,
};

const funga = {
  title: "Funga",
  img: "/cute_mushroom_in_forests.jpg",
  desc: "Funga includes the fascinating world of fungi. Mushrooms are essential decomposers, recycling nutrients and supporting the health of the forest. Marvel at their unique forms and hidden networks.",
  audio: false,
};

const cards = [fauna, flora, funga];

function FaunaFloraFunga() {
  return (
    <div className="flex flex-col items-center justify-center min-w-full min-h-[calc(100vh-5rem)] py-12 px-6 bg-gradient-to-b from-light-border via-light-background to-light-border dark:from-gray-900 dark:via-dark-background dark:to-gray-900 text-light-text dark:text-dark-text">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-center tracking-wide text-light-primary dark:text-dark-primary">
        Fauna / Flora / Funga
      </h1>
      <p className="text-sm md:text-base opacity-85 mb-10 text-center max-w-2xl">
        Explore the wonders of woodland life across animals, plants, and forest fungi.
      </p>

      {/* Responsive 3-column card grid for Fauna, Flora, and Funga */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative flex flex-col items-center rounded-3xl shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border border-black/10 dark:border-white/10 bg-white/75 dark:bg-dark-border/85 backdrop-blur-md p-7 text-light-text dark:text-dark-text"
            tabIndex={0}
            aria-label={card.title}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-48 h-48 object-cover rounded-2xl mb-5 border-2 border-white/60 dark:border-white/15 shadow-md"
              draggable={false}
            />
            <h2 className="text-2xl font-bold mb-2 text-light-primary dark:text-dark-primary">
              {card.title}
            </h2>
            <p className="text-sm md:text-base leading-relaxed mb-6 text-center opacity-90">
              {card.desc}
            </p>
            {card.audio ? (
              <button
                className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6D3D86]/75 dark:bg-dark-highlight/75 text-white/95 text-sm font-semibold shadow-sm cursor-not-allowed"
                disabled
                title="Audio coming soon!"
              >
                <FaVolumeUp />
                <span>Play Audio (Coming Soon)</span>
              </button>
            ) : (
              <div className="mt-auto inline-flex items-center px-5 py-2.5 rounded-xl bg-black/10 dark:bg-white/10 text-sm font-medium opacity-75 cursor-not-allowed">
                No Audio Available
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaunaFloraFunga;


