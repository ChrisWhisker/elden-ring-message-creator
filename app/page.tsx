"use client"; // Enables useState, useEffect, and useRef hooks

import React, { useState, useEffect, useRef } from "react";
import Filter from "./filter";
import Message from './message';

const Home = () => {
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

    // State for input text, message text, and message buttons
    const [searchText, setSearchText] = useState<string>("");
    const [messageText, setMessageText] = useState<string>("");
    const [renderedButtons, setRenderedButtons] = useState<JSX.Element[]>([]);

    // useEffect to run code when component mounts
    useEffect(() => {
        const handleMount = () => {
            Filter.filterWords();
            Message.getInstance().update(); // Update message text

            if (inputRef.current) {
                inputRef.current.focus(); // Focus input element
            }
        };

        handleMount();

        return () => {
            Message.getInstance().onUpdate = null; // Cleanup
        };
    }, []);

    // Function to handle text change in input box
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchText(value);
        Filter.filterWords(value); // Call filter function
    };

    // useEffect to listen for changes in Message instance
    useEffect(() => {
        const handleUpdate = () => {
            setMessageText(Message.getInstance().messageText);
            setRenderedButtons(Message.getInstance().renderedButtons);
        };

        Message.getInstance().onUpdate = handleUpdate;

        return () => {
            Message.getInstance().onUpdate = null; // Cleanup
        };
    }, []);

    return (
        <main className="flex flex-col min-h-screen items-center p-4 lg:p-8 xl:p-12">
            <div id="Header" className="text-center">
                <h1 className="text-6xl title-text">
                    <span style={{ fontSize: '3.33rem' }}>E</span>
                    <span style={{ fontSize: '3rem' }}>lden scrib</span>
                    <span style={{ fontSize: '3.33rem' }}>E</span>
                </h1>
                <h2 className="text-lg body-text">Easily create messages for Elden Ring</h2>
            </div>
            <div className="h-4"></div>
            <div id="Filter label & input" className="z-10 w-full max-w-5xl items-center body-text text-sm lg:flex">
                <div className="mr-4 body-text">Filter words:</div>
                <input
                    id="inputBox"
                    ref={inputRef}
                    type="text"
                    className="border border-gray-300 px-3 py-1 rounded-md"
                    value={searchText}
                    onChange={handleInputChange}
                />
            </div>
            <div className="h-4"></div>
            <div className="w-full max-w-5xl flex-grow flex flex-col overflow-hidden">
                <div id="wordBank" className="flex justify-between flex-wrap flex-grow overflow-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
                    {/* Placeholder for dynamically added buttons */}
                </div>
            </div>
            <div id="messageContainer" className="body-text text-center w-full max-w-5xl p-4 m-4 flex flex-col items-center" style={{ borderColor: '#dfaf37', borderWidth: '1px', borderStyle: 'solid' }}>
                <div>
                    {messageText}
                </div>
                <div className="flex justify-center w-full">
                    {renderedButtons}
                </div>
            </div>
            <div className="body-text mt-auto text-center" style={{ color: "grey" }}>
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
        </main>
    );
};

export default Home;
