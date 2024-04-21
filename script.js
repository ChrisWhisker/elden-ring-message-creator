let buttonContainer;
// Define wordCategories as an empty object
const wordCategories = {};

// Wrap the code inside a DOMContentLoaded event listener to ensure it runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    buttonContainer = document.getElementById("buttonContainer");
    loadCSV("words.csv");
});

function createButtons(strings) {
    // Check if buttonContainer exists
    if (!buttonContainer) {
        console.error("Button container not found");
        return; // Exit the function if buttonContainer is null
    }

    // Clear existing buttons
    buttonContainer.innerHTML = "";

    if (!strings || strings.length === 0) {
        console.error("No strings provided to create buttons");
        return;
    }

    strings.forEach(str => {
        const button = document.createElement("button");
        button.textContent = str;
        buttonContainer.appendChild(button);
    });
}

// Filter the words based on the search query and create a button for each word.
// If the query is empty, display all words.
function search(query) {
    if (query == null) {
        console.error("Query is null. You probably meant to call search with an empty string.");
        return;
    }

    query = query.trim().toLowerCase();
    const results = [];

    // If the query is empty or null, display buttons for all words
    if (query === "") {
        for (const category in wordCategories) {
            // console.log("Adding all words in category: " + category + " to results.");
            for (const word of wordCategories[category]) {
                // console.log("\tAdding word: \"" + word + "\" to results.");
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

    console.log("Searching for: \"" + query + "\". Results:");
    console.log(results);
    createButtons(results);
}



