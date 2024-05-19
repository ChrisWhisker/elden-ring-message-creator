import Word from './word';
import Message from './message';
import { wordCategories } from './wordCategories';
import { ButtonRenderer } from './buttons';

export default class Filter {
    static query = "";

    // Filter words based on the query
    static filterWords(newQuery: string | null = null): void {
        // Ensure query is not null and convert to lowercase
        this.query = newQuery ? newQuery.trim().toLowerCase() : "";

        // Array to store search results
        const results: Word[] = [];

        // Check if a word can be added based on the category
        const canAddWord = (category: string): boolean => {
            const instance = Message.getInstance();
            switch (category) {
                case "Templates":
                    return !instance.template1 || !instance.template2;
                case "Conjunctions":
                    return !instance.conjunction;
                default:
                    return !instance.clause1 || !instance.clause2;
            }
        };

        // Add a single word to the results array
        const addWord = (category: string, word: string): void => {
            if (canAddWord(category)) {
                const wordObj = new Word(category, word);
                // Check for duplicates before adding
                if (!wordObj.isInArray(results)) {
                    results.push(wordObj);
                }
            }
        };

        // Add all words from a category to results array
        const addWordsFromCategory = (category: string): void => {
            for (const word of wordCategories[category]) {
                addWord(category, word);
            }
        };

        // If query is empty, add all words from all categories
        if (!this.query) {
            for (const category in wordCategories) {
                addWordsFromCategory(category);
            }
        } else {
            // Search for query in all categories
            for (const category in wordCategories) {
                for (const word of wordCategories[category]) {
                    if (word.toLowerCase().includes(this.query)) {
                        addWord(category, word);
                    }
                }
                // Add all words from the category if the category name matches the query
                if (category.toLowerCase().includes(this.query)) {
                    addWordsFromCategory(category);
                }
            }
        }

        // Render buttons for the search results
        ButtonRenderer.renderButtons(results);
    }

    // Refilter the search results using the existing query
    static refilter(): void {
        this.filterWords(this.query);
    }
}
