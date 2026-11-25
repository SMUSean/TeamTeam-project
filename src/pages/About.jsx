import { useState } from "react";
import { FaVolumeUp, FaPause } from "react-icons/fa";

const ABOUT_TEXT =
  "Nestled in the heart of Halifax, Nova Scotia, the St. Margaret's Bay Area Woodland Conservation Site is a sanctuary of natural beauty and biodiversity. Spanning an impressive 200 acres, this conservation area is a verdant tapestry of towering trees, lush undergrowth, and vibrant wildlife. The woodland is home to a diverse range of flora and fauna, including the majestic Red Maple, the delicate Wild Carrot, and the robust Coltsfoot. The Sheep Laurel and Multiflora Rose add a splash of color to the landscape, while the Star-nose Mole and the Little Brown Bat represent some of the unique wildlife species that inhabit the area. The St. Margaret’s Bay Area Woodland Conservation Site is not just a haven for wildlife, but also a living testament to our natural heritage. It is a place where the past meets the present, where the whispering winds carry stories of times long gone, and where every leaf and stone is a piece of history waiting to be discovered.";

const VISION_TEXT =
  "We envision the St. Margaret’s Bay Area Woodland Conservation Site as a thriving ecosystem, teeming with life and serving as a model for conservation efforts. We strive to create a space where nature can flourish, where future generations can experience the wonder of the woodland, and where the legacy of our natural heritage is safeguarded for years to come.";

const MISSION_TEXT =
  "Our mission is to preserve and enhance the ecological integrity of the St. Margaret’s Bay Area Woodland Conservation Site. We are committed to protecting its diverse habitats, promoting sustainable use, and fostering an appreciation for our natural heritage through education and community engagement.";

const About = () => {
  const [speakingText, setSpeakingText] = useState("");

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

  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-[calc(100vh-5rem)]">
      {/* About Section */}
      <section className="relative h-[calc(100vh-5rem)] snap-start flex items-center justify-center px-6">
        <img
          className="absolute inset-0 object-cover h-full w-full"
          src="/fern-leaves.jpg"
          alt="Fern leaves woodland background"
        />
        <div className="absolute inset-0 bg-[#2A2030]/55 dark:bg-black/70" />

        <div className="relative z-10 max-w-4xl w-full text-center text-white bg-white/15 dark:bg-gray-900/75 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/25 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f2f2b8]">
              ABOUT
            </h1>
            <button
              onClick={() => handleSpeakText(ABOUT_TEXT)}
              className="text-[#f0E68C] hover:scale-110 p-2 rounded-full transition-transform cursor-pointer"
              aria-label="Read out loud"
            >
              {speakingText === ABOUT_TEXT ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>
          <p className="text-base sm:text-lg leading-relaxed font-normal text-white/95">
            {ABOUT_TEXT}
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative h-[calc(100vh-5rem)] snap-start flex items-center justify-center px-6">
        <img
          className="absolute inset-0 object-cover h-full w-full"
          src="/red-maple.jpg"
          alt="Red maple forest background"
        />
        <div className="absolute inset-0 bg-[#2A2030]/50 dark:bg-black/70" />

        <div className="relative z-10 max-w-4xl w-full text-center text-white bg-white/15 dark:bg-gray-900/75 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/25 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1
              data-cy="vision-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f2f2b8]"
            >
              OUR VISION
            </h1>
            <button
              onClick={() => handleSpeakText(VISION_TEXT)}
              className="text-[#f0E68C] hover:scale-110 p-2 rounded-full transition-transform cursor-pointer"
              aria-label="Read out loud"
            >
              {speakingText === VISION_TEXT ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>
          <p className="text-base sm:text-lg leading-relaxed font-normal text-white/95">
            {VISION_TEXT}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative h-[calc(100vh-5rem)] snap-start flex items-center justify-center px-6">
        <img
          className="absolute inset-0 object-cover h-full w-full"
          src="/ferns.jpg"
          alt="Forest ferns background"
        />
        <div className="absolute inset-0 bg-[#2A2030]/55 dark:bg-black/70" />

        <div className="relative z-10 max-w-4xl w-full text-center text-white bg-white/15 dark:bg-gray-900/75 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/25 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1
              data-cy="mission-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f2f2b8]"
            >
              OUR MISSION
            </h1>
            <button
              onClick={() => handleSpeakText(MISSION_TEXT)}
              className="text-[#f0E68C] hover:scale-110 p-2 rounded-full transition-transform cursor-pointer"
              aria-label="Read out loud"
            >
              {speakingText === MISSION_TEXT ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>
          <p className="text-base sm:text-lg leading-relaxed font-normal text-white/95">
            {MISSION_TEXT}
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
