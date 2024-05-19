"use client"; // Enables useState, useEffect, and useRef hooks

import React, { useState, useEffect, useRef } from "react";
import Filter from "./filter";
import Message from './message';

// Define the default Home component
export default function Home() {
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref to hold a reference to the input element

    // useEffect hook to run code when the component mounts
    useEffect(() => {
        // Call the search function with an empty string as the initial search value
        Filter.filterWords();
        Message.getInstance().update(); // Update the message text

        // Focus the input element when the component mounts
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // State to hold the value of the input text
    const [searchText, setSearchText] = useState(""); // Initialize searchText state with an empty string
    // State to hold the message text
    const [messageText, setMessageText] = useState("");
    // State to hold the message buttons
    const [messageButtons, setMessageButtons] = useState<JSX.Element[]>([]);

    // Function to handle text change in the input box
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the state with the new text value
        setSearchText(event.target.value);
        // Call the search function with the new text as an argument
        Filter.filterWords(event.target.value);
    };

    // useEffect hook to listen for changes in the Message instance
    useEffect(() => {
        // Define a callback function that matches the expected type
        const handleUpdate: () => {} = () => {
            setMessageText(Message.getInstance().messageText);
            setMessageButtons(Message.getInstance().wordButtons);
            return {}; // Return an empty object as required by the type
        };

        // Set the callback function for message updates
        Message.getInstance().onUpdate = handleUpdate;

        // Remove the callback function when the component unmounts
        return () => {
            Message.getInstance().onUpdate = null;
        };
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        // Main container for the Home component
        <main className="flex min-h-screen flex-col items-center p-6 lg:p-24 xl:p-24">
            {/* Title and description */}
            <h1 className="text-6xl title-text">Elden scribE</h1>
            <h2 className="text-2xl body-text">Easily create messages for Elden Ring</h2>
            {/* Spacer to fill extra vertical space */}
            <div className="flex-grow"></div>
            {/* Container for filter label and input box */}
            <div className="z-10 w-full max-w-5xl items-center body-text text-sm lg:flex">
                <div className="mr-4 body-text">Filter words:</div>
                {/* Input text box with onChange event handler */}
                <input
                    id="inputBox"
                    ref={inputRef} // Connect the ref to the input element
                    type="text"
                    className="border border-gray-300 px-3 py-1 rounded-md"
                    value={searchText}
                    onChange={handleInputChange} // Call handleInputChange function when text changes
                />
            </div>
            {/* Spacer to create distance between elements */}
            <div className="h-4"></div>
            {/* Container for buttons */}
            <div className="w-full max-w-5xl overflow-auto sm:h-64 md:h-96 lg:h-128 xl:h-144">
                {/* Container for buttons with vertical scroll */}
                <div id="wordBank" className="flex justify-between flex-wrap">
                    {/* Buttons will be dynamically added here */}
                </div>
            </div>
            {/* Display the message text and buttons */}
            <div id="messageContainer"
                className="body-text text-center w-full max-w-5xl p-4 m-4 flex flex-col items-center"
                style={{ borderColor: '#dfaf37', borderWidth: '1px', borderStyle: 'solid' }}>
                <div>
                    {messageText}
                </div>
                <div className="flex justify-center w-full">
                    {messageButtons}
                </div>
            </div>
            {/* Spacer to create distance between elements */}
            <div className="h-4"></div>
            {/* Footer */}
            <div className="body-text" style={{ color: "grey" }}>
                {/* Footer links */}
                Created by Chris Worcester |{" "}
                <u>
                    <a href="https://www.linkedin.com/in/chrisworcester/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </u>{" "}
                |{" "}
                <u>
                    <a href="https://github.com/ChrisWhisker" target="_blank" rel="noopener noreferrer">
                        Github
                    </a>
                </u>
            </div>
        </main> // End of main container
    );
}
