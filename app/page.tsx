"use client"; // Do not remove. Enables useState, useEffect, and useRef hooks

import React, { useState, useEffect, useRef } from "react";
import Filter from "./filter";
import Message from "./message";
import Head from "next/head";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [renderedButtons, setRenderedButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const handleMount = () => {
      Filter.filterWords();
      Message.getInstance().update();

      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    handleMount();

    return () => {
      Message.getInstance().onUpdate = null;
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
    Filter.filterWords(value);
  };

  useEffect(() => {
    const handleUpdate = () => {
      setMessageText(Message.getInstance().messageText);
      setRenderedButtons(Message.getInstance().renderedButtons);
    };

    Message.getInstance().onUpdate = handleUpdate;
    Message.getInstance().update();

    return () => {
      Message.getInstance().onUpdate = null;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Elden Ring Message Creator</title>
        <meta name="google-site-verification" content="LaNn_j2AC0c6w99SOPU92YGo2TBb2lYwkVyz75b7tf4" />
      </Head>
      <main className="flex flex-col min-h-screen items-center p-4 lg:p-8 xl:p-12">
        <div className="absolute top-4 right-4 flex space-x-2">
          <a href="https://github.com/ChrisWhisker" target="_blank" rel="noopener noreferrer" className="mx-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.334-1.758-1.334-1.758-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.774.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.305-.535-1.535.117-3.195 0 0 1.007-.322 3.3 1.23.957-.266 1.983-.399 3.005-.404 1.02.005 2.048.138 3.008.404 2.29-1.552 3.295-1.23 3.295-1.23.653 1.66.24 2.89.118 3.195.77.84 1.233 1.91 1.233 3.22 0 4.607-2.807 5.623-5.48 5.92.43.37.813 1.096.813 2.207v3.277c0 .32.218.694.825.577C20.565 22.092 24 17.597 24 12.297 24 5.67 18.627.297 12 .297z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/chrisworcester/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.997 3H3.003C2.448 3 2 3.449 2 4.002v15.996C2 20.55 2.447 21 3.003 21h16.994c.555 0 1.003-.449 1.003-1.002V4.002C21 3.449 20.552 3 19.997 3zm-11.47 14.648h-2.91v-8.88h2.91v8.88zm-1.453-10.07c-.93 0-1.683-.753-1.683-1.683 0-.93.753-1.684 1.683-1.684.931 0 1.684.754 1.684 1.684 0 .93-.753 1.683-1.684 1.683zm11.062 10.07h-2.907v-4.855c0-1.157-.023-2.646-1.613-2.646-1.616 0-1.863 1.263-1.863 2.566v4.934h-2.906v-8.88h2.788v1.215h.039c.388-.735 1.337-1.51 2.753-1.51 2.942 0 3.483 1.936 3.483 4.455v5.72z" />
            </svg>
          </a>
        </div>
        <div id="Header" className="text-center">
          <h1 className="text-6xl title-text">
            <span style={{ fontSize: "3.33rem" }}>E</span>
            <span style={{ fontSize: "3rem" }}>lden scrib</span>
            <span style={{ fontSize: "3.33rem" }}>E</span>
          </h1>
          <h2 className="text-lg body-text">Easily create messages for Elden Ring</h2>
        </div>
        <div className="h-20"></div>
        <div
          id="Filter input"
          className="z-10 w-full max-w-5xl flex items-center justify-center body-text text-sm lg:text-base"
        >
          <input
            id="inputBox"
            ref={inputRef}
            type="text"
            className="inputBox w-full lg:w-96 px-4 py-2 rounded border border-gray-400 focus:border-yellow-400 focus:outline-none"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Filter words"
          />
        </div>
        <div className="h-4"></div>
        <div className="max-w-5xl h-full w-full flex flex-col overflow-hidden align-items-start">
          <div
            id="wordBank"
            className="w-full flex-wrap flex-grow overflow-auto"
            style={{
              height: "calc(100vh - 400px)",
              borderRadius: 5,
              backgroundColor: "rgba(222, 184, 135, 0.075)",
              scrollbarWidth: "thin",
              scrollbarColor: "#d4af37 rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Word bank buttons will be dynamically added here */}
          </div>
        </div>
        <div
          id="messageContainer"
          className="body-text text-center w-full max-w-5xl p-4 m-4 flex flex-col items-center"
          style={{
            height: "100px",
            borderColor: "#dfaf37",
            borderWidth: "1px",
            borderStyle: "solid",
            color: "#d4af37",
          }}
        >
          <div>{messageText}</div>
          <div className="flex justify-center w-full space-x-2">{renderedButtons}</div>
        </div>
        <hr className="w-full mt-6 border-gray-300 mt-auto" />
        <div className="body-text text-center" style={{ color: "silver", fontSize: "0.8rem" }}>
          <br />© 2024 Chris Worcester. All Rights Reserved.
        </div>
      </main>
    </>
  );
};

export default Home;
