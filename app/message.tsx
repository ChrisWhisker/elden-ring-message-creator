import Word from './word';
import Filter from './filter';
import { Button } from './buttons';

// Define the type for the message
export default class Message {
    // Words that make up a message
    template1: Button | null = null;
    template2: Button | null = null;
    conjunction: Button | null = null;
    clause1: Button | null = null;
    clause2: Button | null = null;

    messageText: string = ""; // The text of the message
    wordButtons: JSX.Element[] = []; // Array of buttons for each Word in the message
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

    // Update the buttons array
    update(): void {
        const buttons: JSX.Element[] = []; // Temporary array to hold word buttons

        const addTemplateAndClause = (template: Button | null, clause: Button | null) => {
            console.log("Adding template and clause:", template, clause);

            if (template) { // If template exists
                if (clause) { // If clause exists
                    const clauseIndex = template.props.word.word.indexOf("****");
                    this.messageText += `${template.props.word.word.substring(0, clauseIndex)}${clause.props.word.word}${template.props.word.word.substring(clauseIndex + 4)}`;
                    buttons.push(clause.render());
                } else { // If clause does not exist
                    this.messageText += template.props.word.word;
                }
                buttons.push(template.render());
            } else if (clause) { // If clause exists
                this.messageText += `[template] ${clause.props.word.word}`;
                buttons.push(clause.render());
            } else {
                this.messageText += "[template]";
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
            this.messageText += ` ${this.conjunction ? this.conjunction.props.word.word : "[conjunction]"} `;
            if (this.conjunction) {
                buttons.push(this.conjunction.render());
            }
            // Add the second part of the message
            addTemplateAndClause(this.template2, this.clause2);
        }

        // Update the wordButtons array with the new buttons
        this.wordButtons = buttons;

        // Call the onUpdate callback if it's set
        if (this.onUpdate) {
            this.onUpdate();
        }

        console.log("Updated message:", this.messageText);
        console.log("Updated buttons:", this.wordButtons);
    }

    // Function to handle click events on buttons
    private handleClick(button: Button): void {
        console.log("Clicked on word:", button.props.word.word);
        this.remove(button);
        Filter.refilter(); // Redo the search to update the buttons
    }

    // Add a word to the message
    add(button: Button): boolean {
        const word: Word = button.props.word;
        console.log(`Adding word: ${word.word} (${word.category})`);
        this.wordButtons.push(button.render());

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
        console.log(`Removing word: ${button.props.word.word.toString})`);

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
