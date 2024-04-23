"use client";
import React, { useState, useEffect } from "react";
import { search } from "./search";

// Default Home component
export default function Home() {
  useEffect(() => {
    // Code here will be executed when the component mounts
    search(""); // Call the search function with an empty string as the initial search value
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // State to hold the value of the input text
  const [searchText, setSearchText] = useState("");

  // Function to handle text change in the input box
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state with the new text value
    setSearchText(event.target.value);
    
    // Call the search function with the new text as an argument
    search(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* Title and description */}
      <h1 className="text-6xl title-text">Elden scribE</h1>
      <h2 className="text-2xl body-text">Easily create messages for Elden Ring</h2>
      {/* Spacer to fill extra vertical space */}
      <div className="flex-grow"></div>
      {/* Container for search text and input box */}
      <div className="z-10  w-full max-w-5xl items-center body-text text-sm lg:flex">
        <div className="mr-4 body-text">Search:</div>
        {/* Input text box with onChange event handler */}
        <input
          type="text"
          className="border border-gray-300 px-3 py-1 rounded-md"
          placeholder="finger"
          value={searchText}
          onChange={handleInputChange} // Call handleInputChange function when text changes
        />
      </div>
      {/* Spacer to create distance between elements */}
      <div className="h-4"></div>
      {/* Container for buttons */}
      <div className="w-full max-w-5xl" style={{ height: "400px", overflowY: "auto" }}>
        {/* Container for buttons with vertical scroll */}
        <div id="buttonContainer" className="flex justify-between">
          {/* Buttons will be dynamically added here */}
        </div>
      </div>
    </main>
  );
}
