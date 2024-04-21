// console.log("Hello from script.js!");

const wordCategories = {
    "Category1": ["word1", "word2", "word3"],
    "Category2": ["word4", "word5"],
    "Category3": ["word6", "word7", "word8"],
    "Category4": ["word9"],
    "Category5": ["word10", "word11", "word12"]
};

// Find all words that contain the query
function search(query) {
    const categoryResults = [];
    const results = [];
    for (const category in wordCategories) {

        // Search the category name
        if (category.includes(query)) {
            categoryResults.push(category);
        }

        // Search the words in the category
        for (const word of wordCategories[category]) {
            if (word.includes(query)) {
                results.push(word);
            }
        }
    }
    console.log(results + categoryResults);
    return results + categoryResults;
}
