import React from 'react';
import { createRoot } from 'react-dom/client';
import Message from "./message";
import Filter from './filter';
import Word from "./word";

// Button component to render buttons
export class Button extends React.Component<{ word: Word }> {

    private inMessage: boolean = false;

    getInMessage(): boolean { return this.inMessage; }

    handleMessageAdd = () => {
        let copy: Button = new Button(this.props);
        copy.inMessage = true;
        const added = Message.getInstance().add(copy);
        if (added) {
            Filter.refilter();
        }
    };

    handleMessageRemove = () => {
        const removed = Message.getInstance().remove(this);
        if (removed) {
            Filter.refilter();
        }

    }

    render() {
        const word = this.props.word;
        return (
            <button
                key={word.toString()}
                onClick={this.inMessage ? this.handleMessageRemove : this.handleMessageAdd}
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

// WordBank component to contain buttons
class WordBank extends React.Component<{ words: Word[] }> {
    render() {
        const { words } = this.props;
        return (
            <div id="wordBank">
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
        const wordBank = document.getElementById("wordBank");
        if (wordBank) {
            if (!ButtonRenderer.root) {
                // If root doesn't exist, create it
                ButtonRenderer.root = createRoot(wordBank);
            }
            ButtonRenderer.root.render(<WordBank words={words} />);
        } else {
            console.error("Button container not found");
        }
    }
}
