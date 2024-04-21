// Populate wordCategories with data from the CSV file
function loadCSV(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Parse the CSV data
            const rows = data.split("\n");
            for (const row of rows) {
                // Split the row by commas while handling quoted cells
                const columns = splitCSVRow(row);
                if (columns.length === 0) continue; // Skip empty rows

                const category = columns[0]; // Get the category name from the first column
                const words = columns.slice(1).map(word => word.trim()); // Get the words for the category

                // Filter out empty strings from words array
                const nonEmptyWords = words.filter(word => word !== "");

                // Add the category and its non-empty words to wordCategories
                wordCategories[category] = nonEmptyWords;
            }

            search(""); // Trigger search with empty string after CSV data is loaded
        })
        .catch(error => {
            console.error("Error loading CSV:", error); // Log error if CSV loading fails
        });
}

// Function to split a CSV row into columns, handling quoted cells containing commas
function splitCSVRow(row) {
    const columns = [];
    let currentColumn = ''; // Buffer for the current column being processed
    let insideQuotes = false;

    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
            // Toggle insideQuotes when encountering a quote
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            // Push the current column to columns array when encountering a comma outside quotes
            columns.push(currentColumn);
            currentColumn = ''; // Reset currentColumn buffer
        } else {
            // Append the character to the current column buffer
            currentColumn += char;
        }
    }

    // Push the last column to columns array
    columns.push(currentColumn);

    return columns;
}
