import React from "react";
import fern from "../assets/fern.png";
import heron from "../assets/heron.jpg";

const products = [
  {
    name: "Native Tree Sapling",
    description:
      "Support reforestation by purchasing a native tree sapling. Each purchase helps restore local woodland and includes planting guidance.",
    price: "$15.00",
    image: fern,
    type: "product",
  },
  {
    name: "Guided Nature Walk",
    description:
      "Join a local expert for a guided walk through the woodland. Learn about native plants, wildlife, and conservation efforts.",
    price: "$25.00",
    image: heron,
    type: "service",
  },
];

export default function Ecommerce() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 dark:text-dark-text text-light-text">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        eCommerce: Support Local Conservation
      </h1>
      <p className="mb-10 text-center max-w-2xl mx-auto opacity-90">
        Purchase eco-friendly products and services that directly support our woodland conservation efforts.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl shadow-lg p-8 flex flex-col items-center bg-white/60 dark:bg-dark-border border border-black/10 dark:border-white/10"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-36 h-36 object-cover rounded-xl mb-5 shadow-sm border border-black/10 dark:border-white/15"
            />
            <h2 className="text-xl font-semibold mb-2">
              {item.name}
            </h2>
            <p className="mb-5 text-center text-sm md:text-base leading-relaxed opacity-90">
              {item.description}
            </p>
            <span className="text-xl font-bold mb-4 text-light-primary dark:text-dark-primary">
              {item.price}
            </span>
            <button
              className="mt-auto px-6 py-2.5 rounded-lg bg-[#6D3D86]/70 dark:bg-dark-highlight/70 text-white/90 font-medium cursor-not-allowed"
              disabled
              title="Online checkout coming soon"
            >
              Purchase (Coming Soon)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
