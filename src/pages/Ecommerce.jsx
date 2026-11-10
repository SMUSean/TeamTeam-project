/**
 * @file Ecommerce.jsx
 * @description eCommerce page for purchasing local, eco-friendly products/services.
 * @author Yilin Huang, Jaden Eisenhauer
 */

import React from "react";

const products = [
  {
    name: "Native Tree Sapling",
    description:
      "Support reforestation by purchasing a native tree sapling. Each purchase helps restore local woodland and includes planting guidance.",
    price: "$15.00",
    image: "/src/assets/fern.png",
    type: "product",
  },
  {
    name: "Guided Nature Walk",
    description:
      "Join a local expert for a guided walk through the woodland. Learn about native plants, wildlife, and conservation efforts.",
    price: "$25.00",
    image: "/src/assets/heron.jpg",
    type: "service",
  },
];

export default function Ecommerce() {
  return (
    <div className="min-w-full min-h-screen mx-auto py-10 px-4 dark:bg-dark-background dark:text-dark-text bg-light-border text-light-text">
      <h1 className="text-3xl font-bold mb-6 text-center">
        eCommerce: Support Local Conservation
      </h1>
      <p className="mb-8 text-center">
        Purchase eco-friendly products and services that directly support our woodland conservation efforts.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((item) => (
          <div
            key={item.name}
            className="rounded-lg shadow-md p-6 flex flex-col items-center dark:bg-dark-border dark:text-dark-text bg-light-background text-light-text"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded mb-4 border"
            />
            <h2 className="text-xl mb-2 ">
              {item.name}
            </h2>
            <p className="mb-4  text-center">{item.description}</p>
            <span className="text-lg mb-2">{item.price}</span>
            <button
              className="mt-auto px-6 py-2 rounded transition-colors duration-200"
              disabled
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
