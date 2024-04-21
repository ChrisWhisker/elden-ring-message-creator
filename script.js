var buttonContainer;

// Wrap the code inside a DOMContentLoaded event listener to ensure it runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    buttonContainer = document.getElementById("buttonContainer");

    // Call the createButtons function initially
    createButtons();
});

const wordCategories = {
    "Category1": ["word1", "word2", "word3"],
    "Category2": ["word4", "word5"],
    "Category3": ["word6", "word7", "word8"],
    "Category4": ["word9"],
    "Category5": ["word10", "word11", "word12"]
};

function createButtons(strings) {
    // Check if buttonContainer exists
    if (!buttonContainer) {
        console.error("Button container not found");
        return; // Exit the function if buttonContainer is null
    }

    // Clear existing buttons
    buttonContainer.innerHTML = "";

    // If strings is provided and not empty, create buttons for the provided strings
    if (strings && strings.length > 0) {
        strings.forEach(str => {
            const button = document.createElement("button");
            button.textContent = str;
            buttonContainer.appendChild(button);
        });
    } else {
        // If no strings are provided, create buttons for all categories and words
        for (const category in wordCategories) {
            // Create button for category
            const categoryButton = document.createElement("button");
            categoryButton.textContent = category;
            buttonContainer.appendChild(categoryButton);

            // Create buttons for words in category
            for (const word of wordCategories[category]) {
                const wordButton = document.createElement("button");
                wordButton.textContent = word;
                buttonContainer.appendChild(wordButton);
            }
        }
    }
}


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
}
