let buttonContainer; // Declare a variable to store reference to the button container element

// Define wordCategories as an empty object
const wordCategories = {};

// Wrap the code inside a DOMContentLoaded event listener to ensure it runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    buttonContainer = document.getElementById("buttonContainer"); // Get the button container element by its ID
    loadCSV("words.csv"); // Load CSV data when the DOM content is loaded
});

// Function to create buttons based on an array of strings
function createButtons(strings) {
    // Check if buttonContainer exists
    if (!buttonContainer) {
        console.error("Button container not found"); // Log an error if buttonContainer is null
        return; // Exit the function if buttonContainer is null
    }

    // Clear existing buttons in the buttonContainer
    buttonContainer.innerHTML = "";

    // Check if the strings array is empty or null
    if (!strings || strings.length === 0) {
        console.error("No strings provided to create buttons"); // Log an error if no strings are provided
        return; // Exit the function if no strings are provided
    }

    // Create a button for each string in the strings array
    strings.forEach(str => {
        const button = document.createElement("button"); // Create a new button element
        button.textContent = str; // Set the button text content to the current string
        buttonContainer.appendChild(button); // Append the button to the buttonContainer
    });
}

// Filter the words based on the search query and create a button for each word.
// If the query is empty, display all words.
function search(query) {
    if (query == null) {
        console.error("Query is null. You probably meant to call search with an empty string."); // Log an error if the query is null
        return; // Exit the function if the query is null
    }

    query = query.trim().toLowerCase(); // Trim and convert the query to lowercase
    const results = []; // Initialize an array to store search results

    // If the query is empty or null, display buttons for all words
    if (query === "") {
        // Iterate through each category in wordCategories
        for (const category in wordCategories) {
            // Iterate through each word in the current category and add it to the results array
            for (const word of wordCategories[category]) {
                results.push(word);
            }
        }
    } else {
        // Search for matching words
        let found = false; // Flag to track if any matching words are found
        // Iterate through each category in wordCategories
        for (const category in wordCategories) {
            // Search the category name for the query string
            if (category.toLowerCase().includes(query)) {
                // Iterate through each word in the current category and add it to the results array
                for (const word of wordCategories[category]) {
                    results.push(word);
                    found = true;
                }
            }
            // Iterate through each word in the current category
            for (const word of wordCategories[category]) {
                // Search the word for the query string
                if (word.toLowerCase().includes(query)) {
                    results.push(word);
                    found = true;
                }
            }
        }

        // If no words match the query, do not display any buttons
        if (!found) {
            createButtons([]); // Create empty buttons array
            return; // Exit the function
        }
    }

    console.log("Searching for: \"" + query + "\". Results:"); // Log the search query and results to the console
    console.log(results); // Log the search results array to the console
    createButtons(results); // Create buttons for the search results
}
