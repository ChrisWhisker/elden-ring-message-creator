import Word from './word';

// Define the type for the message
export default class Message {
    templates: Word[] = [];
    conjunction: Word | null = null;
    clauses: Word[] = []; // All words that aren't templates or conjunctions
    asString: string = "";
    clickableTextObjects = []; // Array of clickable text objects TODO: Implement this
    onUpdate: ((message: string) => void) | null = null; // Callback function for message update

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

    // Update the message string TODO: Also update the clickableTextObjects (one for each Word object in the message)
    update(): void {
        let newString: string = "";

        // Add the first template & clause
        if (this.templates.length > 0) {
            if (this.clauses.length > 0) {
                newString += this.templates[0].word.replaceAll("****", this.clauses[0].word) + " ";
            } else {
                newString += this.templates[0].word + " ";
            }
        } else if (this.clauses.length > 0) {
            newString += "[template] " + this.clauses[0].word + " ";
        }

        // Add the conjunction
        if (this.conjunction != null) {
            newString += this.conjunction.word + " ";
        } else if (this.templates.length > 1) {
            newString += "[conjunction] ";
        }

        // Add the second template & clause
        if (this.templates.length > 1) {
            if (this.clauses.length > 1) {
                newString += this.templates[1].word.replaceAll("****", this.clauses[1].word) + " ";
            } else {
                newString += this.templates[1].word + " ";
            }
        } else if (this.clauses.length > 1) {
            newString += "[template] " + this.clauses[1].word + " ";
        }

        console.log("New string: " + newString);
        this.asString = newString;

        // Call the onUpdate callback if it's set
        if (this.onUpdate) {
            this.onUpdate(this.asString);
        }
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
