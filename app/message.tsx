import Word from './word';

// Define the type for the message
export default class Message {
    templates: Word[] = [];
    conjunction: Word | null = null;
    clauses: Word[] = []; // All words that aren't templates or conjunctions
    asString: string = "";
    wordLinks: JSX.Element[] = []; // Array of hyperlinks for each Word in the message
    onUpdate: ((links: JSX.Element[]) => {}) | null = null; // Callback function for message update

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

    // Override the toString method to return a unique value for each WordObject
    toString(): string {
        return this.asString;
    }

    // Update the message string and hyperlinks array
    update(): void {
        console.log("Updating message...");

        let newString: string = "";
        let hyperlinks: JSX.Element[] = []; // Temporary array to hold word hyperlinks

        const addHyperlink = (word: Word | null, linkText: string) => {
            hyperlinks.push(
                <a href="#" onClick={() => this.handleClick(word)}>
                    {linkText}
                </a>
            );
        }

        // Add the first template & clause
        if (this.templates.length > 0) { // Check if the first template exists
            if (this.clauses.length > 0) {
                newString += this.templates[0].word.replaceAll("****", this.clauses[0].word) + " ";
                const clauseIndex = this.templates[0].word.indexOf("****");
                // Add first part of template
                addHyperlink(this.templates[0], this.templates[0].word.substring(0, clauseIndex) + " ");
                // Add clause
                addHyperlink(this.clauses[0], this.clauses[0].word + " ");
                // Add second part of template
                addHyperlink(this.templates[0], this.templates[0].word.substring(clauseIndex + 4) + " ");
            } else {
                newString += this.templates[0].word + " ";
                addHyperlink(this.templates[0], this.templates[0].word + " ");
            }
        } else if (this.clauses.length > 0) {
            newString += "[template] " + this.clauses[0].word + " ";
            // Add template without clause
            addHyperlink(null, "[template] ");
        }

        // Add the conjunction
        if (this.conjunction != null) { // Check if the conjunction exists
            newString += this.conjunction.word + " ";
            addHyperlink(this.conjunction, this.conjunction.word + " ");
        } else if (this.templates.length > 1) {
            newString += "[conjunction] ";
            addHyperlink(null, "[conjunction] ");
        }

        if (this.templates.length > 1) { // Check if the second template exists
            if (this.clauses.length > 1) {
                newString += this.templates[1].word.replaceAll("****", this.clauses[1].word) + " ";
                const clauseIndex = this.templates[1].word.indexOf("****");
                // Add first part of template
                addHyperlink(this.templates[1], this.templates[1].word.substring(0, clauseIndex) + " ");
                // Add clause
                addHyperlink(this.clauses[1], this.clauses[1].word + " ");
                // Add second part of template
                addHyperlink(this.templates[1], this.templates[1].word.substring(clauseIndex + 4) + " ");
            } else {
                newString += this.templates[1].word + " ";
                addHyperlink(this.templates[1], this.templates[1].word + " ");
            }
        } else if (this.clauses.length > 1) {
            newString += "[template] " + this.clauses[1].word + " ";
            // Add template without clause
            addHyperlink(null, "[template] ");
        }

        // Update the asString property with the new string
        this.asString = newString;
        // Update the wordLinks array with the new hyperlinks
        this.wordLinks = hyperlinks;

        // Call the onUpdate callback if it's set
        if (this.onUpdate) {
            this.onUpdate(this.wordLinks);
        }
    }

    // Function to handle click events on hyperlinks
    private handleClick(word: Word): void {
        console.log("Clicked on word:", word.word);
        // You can perform any desired action here when a hyperlink is clicked
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
