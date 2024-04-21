let buttonContainer;
// Define wordCategories as an empty object
const wordCategories = {};

// Wrap the code inside a DOMContentLoaded event listener to ensure it runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    buttonContainer = document.getElementById("buttonContainer");

    loadCSV("words.csv");

    console.log("wordCategories:", wordCategories);

    // Call the createButtons function initially
    search("");
});

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
        // Filter out duplicate strings
        const uniqueStrings = [...new Set(strings)];

        uniqueStrings.forEach(str => {
            const button = document.createElement("button");
            button.textContent = str;
            buttonContainer.appendChild(button);
        });
    } else {
        // // If no strings are provided, create buttons for all categories and words
        // for (const category in wordCategories) {
        //     // Create buttons for words in category
        //     for (const word of wordCategories[category]) {
        //         const wordButton = document.createElement("button");
        //         wordButton.textContent = word;
        //         buttonContainer.appendChild(wordButton);
        //     }
        // }
    }
}

// Filter the words based on the search query
// 3 cases:
// 1. if query is empty or null, display all buttons.
// 2. if query is not empty and matches a category name or a word, display matching words.
// 3. if query is not empty and does not match any category name or word, do not display any buttons.
function search(query) {
    if (query == null) {
        console.error("Query is null. You probably meant to call search with an empty string.");
        return;
    }

    query = query.trim().toLowerCase();
    console.log("Searching for: [" + query + "]")
    const results = [];

    // If the query is empty or null, display buttons for all words
    if (query === "") {
        console.log("Empty query. Displaying all buttons");

        for (const category in wordCategories) {
            console.log("Adding all words in category: " + category + " to results.");
            for (const word of wordCategories[category]) {
                console.log("\tAdding word: \"" + word + "\" to results.");
                results.push(word);
            }
        }
    } else {
        // Search for matching words
        let found = false;
        for (const category in wordCategories) {
            // Search the category name
            if (category.toLowerCase().includes(query)) {
                for (const word of wordCategories[category]) {
                    results.push(word);
                    found = true;
                }
            }

            // Search the words in the category
            for (const word of wordCategories[category]) {
                if (word.toLowerCase().includes(query)) {
                    results.push(word);
                    found = true;
                }
            }
        }

        // If no words match the query, do not display any buttons
        if (!found) {
            createButtons([]);
            return;
        }
    }

    createButtons(results);
}



