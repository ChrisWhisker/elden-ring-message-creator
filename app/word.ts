// Define the type for the object containing word and category
export default class Word {
    category: string;
    word: string;
    id: number;

    static nextId: number = 0;

    constructor(category: string, word: string) {
        // Initialize Word with category and word
        this.category = category;
        this.word = word;
        this.id = Word.nextId++;
    }

    // Override the toString method to return a unique value for each Word
    toString(): string {
        // Concatenate category and word to form a unique identifier
        return `${this.category}:${this.word}`;
    }

    // Compare objects based on their properties
    equivalent(other: Word | null): boolean {
        // Check if toString representations of both objects are equal
        return other ? this.toString() === other.toString() : false;
    }

    // Compare objects based on their properties and id
    identical(other: Word | null): boolean {
        return other ? this.equivalent(other) && this.id === other.id : false;
    }

    // Check if the Word is in an array
    // Use this instead of arr.includes(this)
    isInArray(arr: Word[]): boolean {
        // Check if the Word exists in the array
        return this.indexInArray(arr) !== -1;
    }

    // Get the index of the Word in an array or -1 if not found
    indexInArray(arr: Word[]): number {
        // Iterate through the array to find the index of the Word
        for (let i = 0; i < arr.length; i++) {
            if (this.equivalent(arr[i])) {
                // Return the index if Word is found
                return i;
            }
        }
        // Return -1 if Word is not found in the array
        return -1;
    }

    // Remove the Word from an array, if present
    removeFromArray(arr: Word[]): boolean {
        // Get the index of the Word in the array
        const index = this.indexInArray(arr);
        if (index !== -1) {
            // Remove the Word from the array if found
            arr.splice(index, 1);
            return true; // Return true indicating successful removal
        }
        return false; // Return false if Word is not found in the array
    }
}
