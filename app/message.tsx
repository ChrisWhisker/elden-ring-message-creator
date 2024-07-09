// Define the type for the message
import Word from "./word";
import Filter from "./filter";
import { Button } from "./buttons";

export default class Message {
    // Words that make up a message
    template1: Button | null = null;
    clause1: Button | null = null;
    conjunction: Button | null = null;
    template2: Button | null = null;
    clause2: Button | null = null;

    messageText: string = ""; // The text of the message
    wordButtons: Button[] = []; // Array of buttons for each Word in the message
    renderedButtons: JSX.Element[] = [];
    onUpdate: (() => void) | null = null; // Callback function for message update

    // Singleton instance
    private static instance: Message | null = null;

    private constructor() {
        // Private constructor to prevent instantiation outside the class
    }

    // Static method to get the singleton instance
    public static getInstance(): Message {
        // If the instance doesn't exist, create a new one
        if (!Message.instance) {
            Message.instance = new Message();
        }
        // Return the existing instance
        return Message.instance;
    }

    // Update the message text and buttons array
    update(): void {
        const buttons: Button[] = []; // Temporary array to hold word buttons

        const addTemplateAndClause = (template: Button | null, clause: Button | null) => {
            if (template) { // If template exists
                buttons.push(template);
                if (clause) { // If clause exists
                    const regex = /\*\*\*\*/g;
                    this.messageText += template.props.word.text.replace(regex, clause.props.word.text) + ' ';
                    buttons.push(clause);
                } else { // If clause does not exist
                    this.messageText += template.props.word.text + " ";
                }
            } else if (clause) { // If clause exists
                this.messageText += `[template] ${clause.props.word.text} `;
                buttons.push(clause);
            }
        };

        if (!this.template1 && !this.template2 && !this.conjunction && !this.clause1 && !this.clause2) {
            // If no words are present, display a placeholder message
            this.messageText = "Your message will appear here.";
        } else {
            this.messageText = ""; // Clear the message text
            // Add the first part of the message
            addTemplateAndClause(this.template1, this.clause1);
            // Add the conjunction
            if (this.conjunction) {
                this.messageText += this.conjunction.props.word.text + " ";
                buttons.push(this.conjunction);
            } else if (this.template2 || this.clause2) {
                this.messageText += "[conjunction] ";
            }
            // Add the second part of the message
            addTemplateAndClause(this.template2, this.clause2);
        }

        // Update the wordButtons array with the new buttons
        this.wordButtons = buttons;
        this.renderedButtons = [];
        for (const button of this.wordButtons) {
            this.renderedButtons.push(button.render());
        }

        // Set onUpdate callback if not already set, then call it
        if (!this.onUpdate) {
            this.onUpdate = () => {}; // Replace with your desired behavior if not set
        }

        // Call the onUpdate callback
        this.onUpdate();
    }

    // Function to handle click events on buttons
    private handleClick(button: Button): void {
        this.remove(button);
        Filter.refilter(); // Redo the search to update the buttons
    }

    // Add a word to the message
    add(button: Button): boolean {
        const word: Word = button.props.word;
        console.log(`Adding word: ${word.text} (${word.category})`);

        if (this.wordButtons.includes(button)) {
            console.error("Word is already in message");
            return false;
        }
        
        this.wordButtons.push(button);

        switch (word.category) {
            case "Templates":
                if (!this.template1) {
                    this.template1 = button;
                } else if (!this.template2) {
                    this.template2 = button;
                } else {
                    console.error("Only two templates allowed");
                    return false;
                }
                break;
            case "Conjunctions":
                if (!this.conjunction) {
                    this.conjunction = button;
                } else {
                    console.error("Only one conjunction allowed");
                    return false;
                }
                break;
            default:
                if (!this.clause1) {
                    this.clause1 = button;
                } else if (!this.clause2) {
                    this.clause2 = button;
                } else {
                    console.error("Only two clauses allowed");
                    return false;
                }
        }
        this.update();
        return true;
    }

    // Remove a word from the message
    remove(button: Button): boolean {
        console.log(`Removing word: ${button.props.word.text}`);

        switch (button) {
            case this.template1:
                this.template1 = null;
                break;
            case this.template2:
                this.template2 = null;
                break;
            case this.conjunction:
                this.conjunction = null;
                break;
            case this.clause1:
                this.clause1 = null;
                break;
            case this.clause2:
                this.clause2 = null;
                break;
            default:
                console.error("Word is not in message");
                return false;
        }
        this.update();
        return true;
    }
}
