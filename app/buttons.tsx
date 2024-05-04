import React from 'react';
import { createRoot } from 'react-dom/client';
import Message from "./message";
import Filter from './filter';
import Word from "./word";

// Define the type for the props of the Button component
interface ButtonProps {
    title: string;
    textContent: string;
}

// Button component to render buttons
const Button: React.FC<ButtonProps> = ({ title, textContent }) => {
    // Function to handle adding a word to the message
    const handleMessageAdd = () => {
        const word = new Word(title, textContent);
        const added = Message.getInstance().add(word);
        if (!added) {
            console.error(`Failed to add '${title}'.`);
        } else {
            console.log(`'${title}' added successfully.`);
        }

        Filter.refilter();
    };

    return (
        <button
            onClick={handleMessageAdd}
            title={`${title}: "${textContent}"`}
            style={{
                backgroundColor: "#472f17",
                padding: "10px 20px",
                margin: "5px",
                fontFamily: "body-text",
                borderRadius: "9999px",
                lineHeight: "normal"
            }}
        >
            {textContent}
            <span style={{
                fontSize: "10px",
                fontFamily: "body-text",
                color: "grey",
                display: "block",
                marginTop: "0px"
            }}>{title}</span>
        </button>
    );
};

// Define the type for the props of the ButtonContainer component
interface ButtonContainerProps {
    words: Word[];
}

// ButtonContainer component to contain buttons
const ButtonContainer: React.FC<ButtonContainerProps> = ({ words }) => {
    return (
        <div id="buttonContainer">
            {words.map((obj, index) => (
                <Button
                    key={index}
                    title={obj.category}
                    textContent={obj.word}
                />
            ))}
        </div>
    );
};

// Render the buttons
const renderButtons = (words: Word[]): void => {
    const buttonContainer = document.getElementById("buttonContainer");
    if (buttonContainer) {
        const root = createRoot(buttonContainer);
        root.render(<ButtonContainer words={words} />);
    } else {
        console.error("Button container not found");
    }
};

export default renderButtons;
