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
class Button extends React.Component<ButtonProps> {
    handleMessageAdd = () => {
        const { title, textContent } = this.props;
        const word = new Word(title, textContent);
        const added = Message.getInstance().add(word);
        if (!added) {
            console.error(`Failed to add '${title}'.`);
        } else {
            console.log(`'${title}' added successfully.`);
        }
        Filter.refilter();
    };

    render() {
        const { title, textContent } = this.props;
        return (
            <button
                onClick={this.handleMessageAdd}
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
    }
}

// ButtonContainer component to contain buttons
class ButtonContainer extends React.Component<{ words: Word[] }> {
    render() {
        const { words } = this.props;
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
    }
}

// ButtonRenderer class to render the buttons
class ButtonRenderer {
    static root: any; // Declare a static variable to store the root

    static renderButtons(words: Word[]): void {
        const buttonContainer = document.getElementById("buttonContainer");
        if (buttonContainer) {
            if (!ButtonRenderer.root) {
                // If root doesn't exist, create it
                ButtonRenderer.root = createRoot(buttonContainer);
            }
            ButtonRenderer.root.render(<ButtonContainer words={words} />);
        } else {
            console.error("Button container not found");
        }
    }
}

export default ButtonRenderer;
