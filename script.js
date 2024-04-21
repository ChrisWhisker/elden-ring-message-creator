
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
    query = query.toLowerCase();

    for (const category in wordCategories) {
        // Search the category name
        if (category.includes(query)) {
            console.log("Category: " + category);
            categoryResults.push(category);
        }

        // Search the words in the category
        for (const word of wordCategories[category]) {
            if (word.includes(query)) {
                results.push(word);
            }
        }
    }

    // Add categories at the end
    categoryResults.forEach(category => {
        results.push(category);
    });

    createButtons(results);
    return results;
}

function createButtons(strings) {
    const buttonContainer = document.getElementById("buttonContainer");

    // Remove existing buttons
    while (buttonContainer.firstChild) {
        buttonContainer.removeChild(buttonContainer.firstChild);
    }


    // Create buttons for each string
    strings.forEach(str => {
        const button = document.createElement("button");
        button.textContent = str;
        buttonContainer.appendChild(button);
    });
}
