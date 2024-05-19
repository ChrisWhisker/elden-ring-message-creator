import React from 'react';
import { createRoot } from 'react-dom/client';
import Message from "./message";
import Filter from './filter';
import Word from "./word";

// Button component to render buttons
export class Button extends React.Component<{ word: Word }> {
    handleMessageAdd = () => {
        const word = this.props.word;
        const added = Message.getInstance().add(this);
        if (!added) {
            console.error(`Failed to add '${word.word}'.`);
        } else {
            console.log(`'${word.word}' added successfully.`);
        }
        Filter.refilter();
    };

    render() {
        const word = this.props.word;
        return (
            <button
                onClick={this.handleMessageAdd}
                title={`${word.category}: "${word.word}"`}
                style={{
                    backgroundColor: "#472f17",
                    padding: "10px 20px",
                    margin: "5px",
                    fontFamily: "body-text",
                    borderRadius: "9999px",
                    lineHeight: "normal"
                }}
            >
                {word.word}
                <span style={{
                    fontSize: "10px",
                    fontFamily: "body-text",
                    color: "grey",
                    display: "block",
                    marginTop: "0px"
                }}>{word.category}</span>
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
                        key={obj.toString()}
                        word={obj}
                    />
                ))}
            </div>
        );
    }
}

// ButtonRenderer class to render the buttons
export class ButtonRenderer {
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
