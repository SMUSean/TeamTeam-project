/**
 * Purpose: React component containing functionality and styles(Tailwind) for the About Page of the website, including a Text-to-Speech feature for the page's textual content.
 * @author Tania Terence, Jaden Eisenhauer
 */
import { useState } from "react"; // React hook for managing state
import { FaVolumeUp, FaPause } from "react-icons/fa"; // Icons for text-to-speech buttons

/**
 * About component
 * @returns the About page as a JSX Element.
 */
const About = () => {
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
      {/*Snap Effect when scrolling*/}
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen">

        {/*About Section*/}
        <section className="relative h-screen snap-start">

          {/*
          * Background image for About section
          * Image source credit: https://www.pexels.com/
          */}
          <div className="absolute inset-0">
            <img
              className="absolute object-cover h-screen w-full"
              src="/fern-leaves.jpg"
              alt="Background Image"
            />
          </div>

          {/*Text content (About) and background overlay*/}
          <div className="absolute flex flex-col items-center justify-center h-screen bg-gray-900/60 dark:bg-gray-900/70">
            <div className="text-center text-light-whiteText bg-[#567c3a]/58 py-[25px] dark:bg-[#567c3a]/0 dark:text-dark-whiteText">
              <h1 className="text-[25px] sm:text-[35px]">
                <b>ABOUT </b>
                <button
                onClick={() =>
                  handleSpeakText(
                    "Nestled in the heart of Halifax, Nova Scotia, the St. Margaret's Bay Area Woodland Conservation Site is a sanctuary of natural beauty and biodiversity. Spanning an impressive 200 acres, this conservation area is a verdant tapestry of towering trees, lush undergrowth, and vibrant wildlife. The woodland is home to a diverse range of flora and fauna, including the majestic Red Maple, the delicate Wild Carrot, and the robust Coltsfoot. The Sheep Laurel and Multiflora Rose add a splash of color to the landscape, while the Star-nose Mole and the Little Brown Bat represent some of the unique wildlife species that inhabit the area. The St. Margaret’s Bay Area Woodland Conservation Site isnot just a haven for wildlife, but also a living testament to our natural heritage. It is a place where the past meets the present, where the whispering winds carry stories of times long gone, and where every leaf and stone is a piece of history waiting to be discovered."
                  )
                }
                className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all"
                aria-label="Read out loud"
              >
                {speakingText ===
                "Nestled in the heart of Halifax, Nova Scotia, the St. Margaret's Bay Area Woodland Conservation Site is a sanctuary of natural beauty and biodiversity. Spanning an impressive 200 acres, this conservation area is a verdant tapestry of towering trees, lush undergrowth, and vibrant wildlife. The woodland is home to a diverse range of flora and fauna, including the majestic Red Maple, the delicate Wild Carrot, and the robust Coltsfoot. The Sheep Laurel and Multiflora Rose add a splash of color to the landscape, while the Star-nose Mole and the Little Brown Bat represent some of the unique wildlife species that inhabit the area. The St. Margaret’s Bay Area Woodland Conservation Site isnot just a haven for wildlife, but also a living testament to our natural heritage. It is a place where the past meets the present, where the whispering winds carry stories of times long gone, and where every leaf and stone is a piece of history waiting to be discovered." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
              </h1>
              <br />
              <p className="text-[16.5px] font-medium sm:text-[21px] px-[25px] sm:px-[280px]">
                
                Nestled in the heart of Halifax, Nova Scotia, the St. Margaret’s
                Bay Area Woodland Conservation Site is a sanctuary of natural
                beauty and biodiversity. Spanning an impressive 200 acres, this
                conservation area is a verdant tapestry of towering trees, lush
                undergrowth, and vibrant wildlife. The woodland is home to a
                diverse range of flora and fauna, including the majestic Red
                Maple, the delicate Wild Carrot, and the robust Coltsfoot. The
                Sheep Laurel and Multiflora Rose add a splash of color to the
                landscape, while the Star-nose Mole and the Little Brown Bat
                represent some of the unique wildlife species that inhabit the
                area. The St. Margaret’s Bay Area Woodland Conservation Site is
                not just a haven for wildlife, but also a living testament to our
                natural heritage. It is a place where the past meets the present,
                where the whispering winds carry stories of times long gone, and
                where every leaf and stone is a piece of history waiting to be
                discovered.
              </p>
            </div>
          </div>
        </section>

        {/*Vision Section*/}
        <section className="relative h-screen snap-start">

          {/*
          * Background image for Vision section
          * Image source credit: https://www.inaturalist.org/
          */}
          <div className="absolute inset-0">
            <img
              className="absolute object-cover h-screen w-full"
              src="/red-maple.jpg"
              alt="Background Image"
            />
          </div>

          {/*Text content (Vision) and background overlay*/}
          <div className="absolute flex flex-col items-center justify-center h-screen bg-gray-900/40 dark:bg-gray-900/70">
            <div className="text-center text-light-whiteText bg-[#823d37]/75 py-[25px] dark:bg-[#823d37]/0 dark:text-dark-whiteText">
              <h1 data-cy="vision-heading" className="text-[25px] sm:text-[35px]">
                <b>OUR VISION </b>
                 <button
                onClick={() =>
                  handleSpeakText(
                    "We envision the St. Margaret’s Bay Area Woodland Conservation Site as a thriving ecosystem, teeming with life and serving as a model for conservation efforts. We strive to create a space where nature can flourish, where future generations can experience the wonder of the woodland, and where the legacy of our natural heritage is safeguarded for years to come."
                  )
                }
                className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all"
                aria-label="Read out loud"
              >
                {speakingText ===
                "We envision the St. Margaret’s Bay Area Woodland Conservation Site as a thriving ecosystem, teeming with life and serving as a model for conservation efforts. We strive to create a space where nature can flourish, where future generations can experience the wonder of the woodland, and where the legacy of our natural heritage is safeguarded for years to come." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
              </h1>
              <br />
              <p className="text-[18px] font-medium sm:text-[21px] px-[20px] sm:px-[250px]">
                We envision the St. Margaret’s Bay Area Woodland Conservation Site
                as a thriving ecosystem, teeming with life and serving as a model
                for conservation efforts. We strive to create a space where nature
                can flourish, where future generations can experience the wonder
                of the woodland, and where the legacy of our natural heritage is
                safeguarded for years to come.
              </p>
            </div>
          </div>
        </section>

        {/*Mission Section*/}
        <section className="relative h-screen snap-start">

          {/*
          * Background image for Mission section
          * Image source credit: https://www.inaturalist.org/
          */}
          <div className="absolute inset-0">
            <img
              className="absolute object-cover h-screen w-full"
              src="/ferns.jpg"
              alt="Background Image"
            />
          </div>

          {/*Text content (Mission) and overlay*/}
          <div className="absolute flex flex-col items-center justify-center h-screen bg-gray-900/50 dark:bg-gray-900/70">
            <div className="text-center text-light-whiteText bg-[#5c7335]/70 py-[25px] dark:bg-[#5c7335]/0 dark:text-dark-whiteText">
              <h1
                data-cy="mission-heading"
                className="text-[25px] sm:text-[35px]"
              >
                <b>OUR MISSION </b>
                <button
                onClick={() =>
                  handleSpeakText(
                    "Our mission is to preserve and enhance the ecological integrity of the St. Margaret’s Bay Area Woodland Conservation Site. We are committed to protecting its diverse habitats, promoting sustainable use, and fostering an appreciation for our natural heritage through education and community engagement."
                  )
                }
                className="bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all"
                aria-label="Read out loud"
              >
                {speakingText ===
                "Our mission is to preserve and enhance the ecological integrity of the St. Margaret’s Bay Area Woodland Conservation Site. We are committed to protecting its diverse habitats, promoting sustainable use, and fostering an appreciation for our natural heritage through education and community engagement." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
      
              </h1>
              <br />
              <p className="text-[18px] font-medium sm:text-[21px] px-[20px] sm:px-[250px]">
                Our mission is to preserve and enhance the ecological integrity of
                the St. Margaret’s Bay Area Woodland Conservation Site. We are
                committed to protecting its diverse habitats, promoting
                sustainable use, and fostering an appreciation for our natural
                heritage through education and community engagement.
              </p>
            </div>
          </div>

        </section>

      </div>

    </div>
  );
};

export default About;


