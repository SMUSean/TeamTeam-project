/**
 * @file CustomCursor.jsx
 * @description Custom cursor component that follows the mouse with a larger, contrasting design.
 * This component creates a custom cursor that replaces the default browser cursor,
 * providing a more distinctive visual experience. The cursor is styled via CSS to appear
 * as a larger pointer arrow pointing to the right, using the dark mode text color.
 * 
 * Key Features:
 * - Tracks mouse position in real-time
 * - Shows/hides based on mouse presence in the document
 * - Positioned absolutely to follow cursor movement
 * - Styled via CSS class 'custom-cursor' (see index.css)
 * 
 * @author Samson Mate
 */

import React, { useEffect, useState } from 'react';

/**
 * CustomCursor Component
 * @description Creates a custom cursor element that follows the mouse pointer.
 * The cursor visibility and position are managed through React state and event listeners.
 * 
 * @returns {JSX.Element} A div element styled as a custom cursor
 */
export default function CustomCursor() {
  // Track the current cursor position (x, y coordinates)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Control cursor visibility (hidden when mouse leaves the document)
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Effect hook to set up mouse tracking event listeners
   * Updates cursor position on mouse movement and manages visibility
   */
  useEffect(() => {
    /**
     * Updates cursor position when mouse moves
     * @param {MouseEvent} e - Mouse event containing clientX and clientY coordinates
     */
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    /**
     * Shows cursor when mouse enters the document
     */
    const handleMouseEnter = () => setIsVisible(true);
    
    /**
     * Hides cursor when mouse leaves the document
     */
    const handleMouseLeave = () => setIsVisible(false);

    // Attach event listeners for mouse tracking
    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup: Remove event listeners when component unmounts
    // This prevents memory leaks and ensures proper event handling
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Render the custom cursor div with dynamic positioning
  // The actual cursor appearance is defined in index.css via the 'custom-cursor' class
  return (
    <div
      className="custom-cursor"
      style={{
        left: `${position.x}px`,  // Position cursor at mouse X coordinate
        top: `${position.y}px`,    // Position cursor at mouse Y coordinate
        opacity: isVisible ? 1 : 0, // Fade in/out based on visibility state
      }}
    />
  );
}

