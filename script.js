var buttonContainer;

// Wrap the code inside a DOMContentLoaded event listener to ensure it runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    buttonContainer = document.getElementById("buttonContainer");

    loadCSV("words.csv");
    // Call the createButtons function initially
    search("");
});

// Define wordCategories as an empty object
const wordCategories = {};

function loadCSV(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Parse the CSV data
            const rows = data.split("\n");
            for (const row of rows) {
                const columns = row.split(",");
                const category = columns[0].trim(); // Get the category name from the first column
                const words = columns.slice(1).map(word => word.trim()); // Get the words for the category

                // Add the category and its words to wordCategories
                wordCategories[category] = words;
            }

            // Call the createButtons function
            createButtons([]);
        })
        .catch(error => {
            console.error("Error loading CSV:", error);
        });
}

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
        // If no strings are provided, create buttons for all categories and words
        for (const category in wordCategories) {
            // Create buttons for words in category
            for (const word of wordCategories[category]) {
                const wordButton = document.createElement("button");
                wordButton.textContent = word;
                buttonContainer.appendChild(wordButton);
            }
        }
    }
}

function search(query) {
    const results = [];
    query = query.toLowerCase();

    // If the query is empty or null, display buttons for all words
    if (!query || query.trim() === "") {
        for (const category in wordCategories) {
            for (const word of wordCategories[category]) {
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

