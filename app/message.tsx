import Word from './word';
import Filter from './filter';
import { Button } from './buttons';

// Define the type for the message
export default class Message {
    // Words that make up a message
    template1: Word | null = null;
    template2: Word | null = null;
    conjunction: Word | null = null;
    clause1: Word | null = null;
    clause2: Word | null = null;

    messageText: string = ""; // The text of the message
    wordButtons: JSX.Element[] = []; // Array of buttons for each Word in the message
    onUpdate: ((buttons: JSX.Element[]) => void) | null = null; // Callback function for message update

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

        const addButton = (word: Word | null, buttonText: string) => {
            console.log("Adding button:", buttonText);
            buttons.push(
                <button
                    onClick={() => word && this.handleClick(word)} // Only invoke handleClick if word is not null
                    disabled={!word} // Disable the button if word is null
                    style={{ margin: '0 2px' }} // Adjust the margin as needed
                    title={word ? `${word.category}: ${word.word}` : undefined} // Conditionally set tooltip text
                >
                    {word ? <u>{buttonText}</u> : buttonText}
                </button>
            );
        };

        const addTemplateAndClause = (template: Word | null, clause: Word | null) => {
            console.log("Adding template and clause:", template, clause);

            if (template) { // If template exists
                if (clause) { // If clause exists
                    const clauseIndex = template.word.indexOf("****");
                    addButton(template, template.word.substring(0, clauseIndex));
                    addButton(clause, clause.word);
                    addButton(template, template.word.substring(clauseIndex + 4));
                    this.messageText += `${template.word.substring(0, clauseIndex)}${clause.word}${template.word.substring(clauseIndex + 4)}`;
                } else { // If clause does not exist
                    addButton(template, template.word);
                    this.messageText += template.word;
                }
            } else if (clause) { // If clause exists
                addButton(null, "[template]");
                addButton(clause, clause.word);
                this.messageText += `[template] ${clause.word}`;
            } else {
                addButton(null, "[template]");
                this.messageText += "[template]";
            }
        };

        if (!this.template1 && !this.template2 && !this.conjunction && !this.clause1 && !this.clause2) {
            // If no words are present, display a placeholder message
            addButton(null, "Your message will appear here.");
            this.messageText = "Your message will appear here.";
        } else {
            this.messageText = ""; // Clear the message text
            // Add the first part of the message
            addTemplateAndClause(this.template1, this.clause1);
            // Add the conjunction
            addButton(this.conjunction, this.conjunction ? this.conjunction.word : "[conjunction]");
            this.messageText += ` ${this.conjunction ? this.conjunction.word : "[conjunction]"} `;
            // Add the second part of the message
            addTemplateAndClause(this.template2, this.clause2);
        }

        // Update the wordButtons array with the new buttons
        this.wordButtons = buttons;

        // Call the onUpdate callback if it's set
        if (this.onUpdate) {
            this.onUpdate(this.wordButtons);
        }

        console.log("Updated message:", this.messageText);
    }

    // Function to handle click events on buttons
    private handleClick(word: Word): void {
        console.log("Clicked on word:", word.word);
        this.remove(word);
        Filter.refilter(); // Redo the search to update the buttons
    }

    // Add a word to the message
    add(button: Button): boolean {
        const word: Word = button.props.word;
        console.log(`Adding word: ${word.word} (${word.category})`);

        switch (word.category) {
            case "Templates":
                if (!this.template1) {
                    this.template1 = word;
                } else if (!this.template2) {
                    this.template2 = word;
                } else {
                    console.error("Only two templates allowed");
                    return false;
                }
                break;
            case "Conjunctions":
                if (!this.conjunction) {
                    this.conjunction = word;
                } else {
                    console.error("Only one conjunction allowed");
                    return false;
                }
                break;
            default:
                if (!this.clause1) {
                    this.clause1 = word;
                } else if (!this.clause2) {
                    this.clause2 = word;
                } else {
                    console.error("Only two clauses allowed");
                    return false;
                }
        }
        this.update();
        return true;
    }

    // Remove a word from the message
    remove(word: Word): boolean {
        console.log(`Removing word: ${word.toString})`);

        switch (word) {
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
