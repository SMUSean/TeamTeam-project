/**
 * @file narrationAdapter.js
 * @description Adapter for browser speech synthesis API.
 * Provides functions to start and stop text-to-speech narration for map markers.
 * 
 * @author Afif Mahmud
 */

let currentUtterance = null;

function isSupported() {
    return (
        typeof window !== "undefined" &&
        "speechSynthesis" in window &&
        typeof window.SpeechSynthesisUtterance === "function"
    );
}

export function stopNarration() {
    if (!isSupported()) return;
    if (currentUtterance) {
        window.speechSynthesis.cancel();
        currentUtterance = null;
    }
}

/**
 * Speak the given text. Returns true if narration started, false otherwise.
 *
 * callbacks:
 *   onStart: called when we begin speaking this utterance.
 *   onEnd:   called when this utterance finishes or is cancelled.
 */
export function startNarration(text, { onStart, onEnd } = {}) {
    if (!isSupported() || !text || typeof text !== "string") {
        if (onEnd) onEnd();
        return false;
    }

    // Stop any currently running narration.
    stopNarration();

    const utterance = new window.SpeechSynthesisUtterance(text);

    // Optional tuning.
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
        currentUtterance = utterance;
        if (onStart) onStart();
    };

    utterance.onend = () => {
        if (currentUtterance === utterance) {
            currentUtterance = null;
        }
        if (onEnd) onEnd();
    };

    utterance.onerror = () => {
        if (currentUtterance === utterance) {
            currentUtterance = null;
        }
        if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
}
