import Word from './word';

// Define the type for the message
export default class Message {
    templates: Word[] = [];
    conjunction: Word | null = null;
    clauses: Word[] = []; // All words that aren't templates or conjunctions
    wordButtons: JSX.Element[] = []; // Array of buttons for each Word in the message
    onUpdate: ((buttons: JSX.Element[]) => {}) | null = null; // Callback function for message update

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

    // Update the message string and buttons array
    update(): void {
        let buttons: JSX.Element[] = []; // Temporary array to hold word buttons

        const addButton = (word: Word | null, buttonText: string) => {
            buttons.push(
                <button
                    onClick={() => this.handleClick(word)}
                    style={{ marginLeft: '2px', marginRight: '2px' }} // Adjust the margin as needed
                    title={word ? word.word : undefined} // Conditionally set tooltip text
                >
                    <u>{buttonText}</u>
                </button>
            );
        }

        const addTemplateAndClause = (template: Word, clause: Word) => {
            if (template != null) { // If template exists
                if (clause != null) { // If clause exists
                    const clauseIndex = template.word.indexOf("****");
                    addButton(template, template.word.substring(0, clauseIndex));
                    if (clause != null) {
                        addButton(clause, clause.word);
                    }
                    addButton(template, template.word.substring(clauseIndex + 4));
                } else { // If clause does not exist
                    addButton(template, template.word + " ");
                }
            } else if (clause != null) { // If clause exists
                // Add template without clause
                addButton(null, "[template] " + clause.word + " ");
            } else {
                // Add template without clause
                addButton(null, "[template] ");
            }
        }

        // Add the first part of the message
        addTemplateAndClause(this.templates[0], this.clauses[0]);

        // Add the conjunction
        if (this.conjunction != null) { // Check if the conjunction exists
            addButton(this.conjunction, " " + this.conjunction.word + " ");
        } else if (this.templates.length > 1 || this.clauses.length > 1) {
            addButton(null, " [conjunction] ");
        }

        // Add the second part of the message
        if (this.templates.length > 1 || this.clauses.length > 1) {
            addTemplateAndClause(this.templates[1], this.clauses[1]);
        }

        // Update the wordButtons array with the new buttons
        this.wordButtons = buttons;

        // Call the onUpdate callback if it's set
        if (this.onUpdate) {
            this.onUpdate(this.wordButtons);
        }
    }

    // Function to handle click events on buttons
    private handleClick(word: Word | null): void {
        if (word == null) {
            console.log("Clicked on null");
            return;
        }
        console.log("Clicked on word:", word.word);
        // You can perform any desired action here when a button is clicked
    }

    // Add a word to the message
    add(word: Word): boolean {
        switch (word.category) {
            case "Templates":
                if (this.templates.length < 2) {
                    this.templates.push(word);
                } else {
                    console.error("Only two templates allowed");
                    return false;
                }
                break;
            case "Conjunctions":
                if (this.conjunction == null) {
                    this.conjunction = word;
                } else {
                    console.error("Only one conjunction allowed");
                    return false;
                }
                break;
            default:
                if (this.clauses.length < 2) {
                    this.clauses.push(word);
                } else {
                    console.error("Only two clauses allowed");
                    return false;
                }
                break;
        }
        this.update();
        return true;
    }

    // Remove a word from the message
    remove(word: Word): boolean {
        switch (word.category) {
            case "Templates":
                if (!word.removeFromArray(this.templates)) {
                    return false;
                }
                break;
            case "Conjunctions":
                if (this.conjunction == null) {
                    return false;
                }
                this.conjunction = null;
                break;
            default: // Clauses
                if (!word.removeFromArray(this.clauses)) {
                    return false;
                }
                break;
        }
        this.update();
        return true;
    }
}
