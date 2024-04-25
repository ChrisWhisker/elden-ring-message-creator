import React from 'react';
import { createRoot } from 'react-dom/client';
import Message from "./message";
import Word from "./word";

// Define the type for the props of the Button component
interface ButtonProps {
    onClick: () => void;
    title: string;
    textContent: string;
}

// Button component to render buttons
const Button: React.FC<ButtonProps> = ({ onClick, title, textContent }) => {
    // Function to handle adding a word to the message
    const handleMessageAdd = () => {
        // Get the singleton instance of Message
        const messageInstance = Message.getInstance();
        // Create a Word object
        const word = new Word(title, textContent);
        // Call the add function and check if it was successful
        const added = messageInstance.add(word);
        if (!added) {
            console.log("Failed to add word.");
        }
    };

    return (
        <button
            onClick={handleMessageAdd} // Call handleMessageAdd instead of onClick directly
            title={`${title}: "${textContent}"`}
            style={{
                backgroundColor: "#472f17",
                padding: "10px 20px",
                margin: "5px",
                fontFamily: "body-text",
                borderRadius: "9999px", // Make the button pill-shaped
                lineHeight: "normal" // Reset line height to default
            }}
        >
            {textContent}
            <span style={{
                fontSize: "10px",
                fontFamily: "body-text",
                color: "grey",
                display: "block",
                marginTop: "0px" // Adjust margin to reduce space between text and category
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
                    onClick={() => { }}
                    title={obj.category}
                    textContent={obj.word}
                />
            ))}
        </div>
    );
};

// Render the buttons
const renderButtons = (words: Word[]) => {
    const buttonContainer = document.getElementById("buttonContainer");
    if (buttonContainer) {
        const root = createRoot(buttonContainer);
        root.render(<ButtonContainer words={words} />);
    } else {
        console.error("Button container not found");
    }
};

export default renderButtons;
