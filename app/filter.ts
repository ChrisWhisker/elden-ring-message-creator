import Word from './word';
import Message from './message';
import wordCategories from './wordCategories';
import { ButtonRenderer } from './buttons';

interface WordCategory {
    word: string;
    synonyms: string[];
}

export default class Filter {
    // Search query
    static query: string = "";
    // Array to store search results
    static results: Word[] = [];

    // Refilter function to be used within the class
    public static refilter(): void {
        Filter.filterWords(Filter.query);
    };

    // Check if a word can be added based on the category
    private static canAddWord(category: string): boolean {
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
    private static addWord(category: string, word: WordCategory): void {
        if (Filter.canAddWord(category)) {
            const wordObj = new Word(category, word.word);
            // Check for duplicates before adding
            if (!wordObj.isInArray(Filter.results)) {
                Filter.results.push(wordObj);
            }
        }
    };

    // Add all words from a category to results array
    private static addWordsFromCategory(category: string): void {
        for (const word of wordCategories[category]) {
            Filter.addWord(category, word);
        }
    };

    // Filter words based on the query
    static filterWords(newQuery: string | null = null): void {
        // Clear the results array
        Filter.results = [];
        // Ensure query is not null and convert to lowercase
        Filter.query = newQuery ? newQuery.trim().toLowerCase() : "";
        console.log(`Filtering words with query: ${Filter.query}`);

        // If query is empty, add all words from all categories
        if (!Filter.query) {
            for (const category in wordCategories) {
                Filter.addWordsFromCategory(category);
            }
        } else {
            // Split the query into individual words
            const queryWords = Filter.query.split(" ");

            // Search for each query word in all categories
            for (const category in wordCategories) {
                for (const word of wordCategories[category]) {
                    // Check if any query word matches the current word
                    if (queryWords.some(queryWord => word.word.toLowerCase().includes(queryWord))) {
                        Filter.addWord(category, word);
                    }

                    // Check if any query word matches any of the word's synonyms
                    for (const synonym of word.synonyms) {
                        if (queryWords.some(queryWord => synonym.toLowerCase().includes(queryWord))) {
                            Filter.addWord(category, word);
                        }
                    }
                }
                // Add all words from the category if the category name matches the query
                if (queryWords.some(queryWord => category.toLowerCase().includes(queryWord))) {
                    Filter.addWordsFromCategory(category);
                }
            }
        }

        console.log(`Found ${Filter.results.length} results`);

        // Render buttons for the search results
        ButtonRenderer.renderButtons(Filter.results);
    }
}
