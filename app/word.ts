// Define the type for the object containing word and category
export default class WordObject {
    category: string;
    word: string;

    constructor(category: string, word: string) {
        this.category = category;
        this.word = word;
    }

    // Override the toString method to return a unique value for each WordObject
    toString(): string {
        return `${this.category}:${this.word}`;
    }

    // Override the equals method to compare objects based on their properties
    equals(other: WordObject): boolean {
        return this.toString() === other.toString();
    }

    // Check if the WordObject is in an array
    // Use this instead of arr.includes(this)
    isInArray(arr: WordObject[]): boolean {
        return this.indexInArray(arr) !== -1;
    }

    // Get the index of the WordObject in an array or -1 if not found
    indexInArray(arr: WordObject[]): number {
        for (let i = 0; i < arr.length; i++) {
            if (this.equals(arr[i])) {
                return i;
            }
        }
        return -1;
    }

    removeFromArray(arr: WordObject[]): boolean {
        const index = this.indexInArray(arr);
        if (index !== -1) {
            arr.splice(index, 1);
            return true;
        }
        return false;
    }
}