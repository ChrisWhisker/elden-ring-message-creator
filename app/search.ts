import renderButtons from './buttons';
import Word from './word';
import Message from './message';
import { wordCategories } from './wordCategories';

// Search for words and filter results
const search = (query: string) => {
    // Ensure query is not null and convert to lowercase
    query = query ? query.trim().toLowerCase() : "";

    // Array to store search results
    const results: Word[] = [];

    // Add a single word to the results array
    const addWord = (category: string, word: string) => {
        // Check if the word can be added based on the category
        switch(category) {
            case "Templates":
                if (Message.getInstance().templates.length > 1) {
                    return;
                }
                break;
            case "Conjunctions":
                if (Message.getInstance().conjunction != null) {
                    return;
                }
                break;
            default:
                if (Message.getInstance().clauses.length > 1) {
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
    if (query === "") {
        for (const category in wordCategories) {
            addWordsFromCategory(category);
        }
    } else {
        // Search for query in all categories
        for (const category in wordCategories) {
            for (const word of wordCategories[category]) {
                if (word.toLowerCase().includes(query)) {
                    addWord(category, word);
                }
            }
            // Add all words from the category if the category name matches the query
            if (category.toLowerCase().includes(query)) {
                addWordsFromCategory(category);
            }
        }
    }

    // Render buttons for the search results
    renderButtons(results);
};

// Refilter the search results using the existing query
const refilter = () => {
    const input = document.getElementById('inputBox') as HTMLInputElement;
    if (input) {
        // Search with existing filter to remove unavailable words
        search(input.value);
    } else {
        console.log('Filter input box could not be found.');
    }
}

export { search, refilter };
