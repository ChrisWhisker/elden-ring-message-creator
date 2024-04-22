"use client";
import React, { useState, useEffect } from "react";
import { search } from "./search";

// Default Home component
export default function Home() {
  useEffect(() => {
    // Load CSV data when the component mounts (equivalent to DOMContentLoaded)
    search("");
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // State to hold the value of the input text
  const [searchText, setSearchText] = useState("");

  // Function to handle text change in the input box
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state with the new text value
    setSearchText(event.target.value);
    
    // Call the imported function with the new text as an argument
    search(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Container for search text and input box */}
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <div className="mr-4">Search:</div>
        {/* Input text box with onChange event handler */}
        <input
          type="text"
          className="border border-gray-300 px-3 py-1 rounded-md"
          placeholder="finger"
          value={searchText}
          onChange={handleInputChange} // Call handleInputChange function when text changes
        />
      </div>
      <div id="buttonContainer">
        {/* Buttons will be dynamically added here */}
    </div>
    </main>
  );
}
