import renderButtons from './buttons';
import Word from './word';
import Message from './message';
import { wordCategories } from './wordCategories';

export default class Filter {

    static query = "";

    // Filter words based on the query
    static filterWords = (newQuery?: string | null) => {
        // Ensure query is not null and convert to lowercase
        this.query = newQuery ? newQuery.trim().toLowerCase() : "";

        // Array to store search results
        const results: Word[] = [];

        // Add a single word to the results array
        const addWord = (category: string, word: string) => {
            // Check if the word can be added based on the category
            switch (category) {
                case "Templates":
                    if (Message.getInstance().template1 && Message.getInstance().template2) {
                        return;
                    }
                    break;
                case "Conjunctions":
                    if (Message.getInstance().conjunction) {
                        return;
                    }
                    break;
                default:
                    if (Message.getInstance().clause1 && Message.getInstance().clause2) {
                        return;
                    }
                    break;
            }
            let wordObj: Word = new Word(category, word);
            // Check for duplicates before adding
            if (!wordObj.isInArray(results)) {
                results.push(wordObj);
            }
        }

        // Add all words from a category to results array
        const addWordsFromCategory = (category: string) => {
            for (const word of wordCategories[category]) {
                addWord(category, word);
            }
        };

        // If query is empty, add all words from all categories
        if (this.query === "") {
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
        renderButtons(results);
    }

    // Refilter the search results using the existing query
    static refilter = () => {
        this.filterWords(Filter.query);
    }
}
