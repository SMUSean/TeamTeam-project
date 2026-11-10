/**
 * @file FaunaFloraFunga.jsx
 * @description FFF page, required by terry's software requirement document.
 * @author Yilin Huang, Jaden Eisenhauer
 */
import React from "react";// Reuse gallery styles for card layout and responsiveness
import "../index.css"; // Ensure dark mode and global styles

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
    <div className="flex flex-col items-center justify-center min-w-full min-h-screen text-fffpage-text border-fffpage-border bg-fffpage-background dark:text-dark-text dark:bg-dark-background">
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">Fauna / Flora / Funga</h1>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-5xl">
        {cards.map((card, idx) => (
          <div
            key={card.title}
            className={`
              group relative flex flex-col items-center rounded-2xl shadow-lg
              hover:scale-105 hover:shadow-2xl transition-all duration-300
              border-2 dark:text-dark-text dark:bg-dark-border
              w-80 p-6 text-fffitem-text border-fffitem-border bg-light-background
            `}
            tabIndex={0}
            aria-label={card.title}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-48 h-48 object-cover rounded-xl mb-4 border-4 dark:text-dark-text dark:bg-dark-border shadow-md group-hover:shadow-xl transition"
              draggable={false}
            />
            <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
            <p className="text-base mb-4 text-center">{card.desc}</p>
            {card.audio ? (
              <button
                className="mt-auto rounded-lg font-medium shadow transition "
                disabled
                title="Audio coming soon!"
              >
                🔊 Play Audio (Coming Soon)
              </button>
            ) : (
              <div className="mt-auto rounded-lg font-medium shadow cursor-not-allowed">
                No Audio Available
              </div>
            )}
            {/* Decorative overlay for interactivity */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none transition
              group-hover:bg-transparent group-hover:dark:bg-transparent" />
          </div>
        ))}
      </div>
      <br />
      <div className="mt-8 text-center dark:text-dark-text text-sm">
        <span>
          Explore the wonders of woodland life. Audio for Fauna and Flora coming soon!
        </span>
      </div>
    </div>
  );
}

export default FaunaFloraFunga;
