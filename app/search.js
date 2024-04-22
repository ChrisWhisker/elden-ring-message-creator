"use client";

let buttonContainer; // Declare a variable to store reference to the button container element

// Define wordCategories as an empty object
const wordCategories = {
    "Templates": ["**** ahead", "No **** ahead", "**** required ahead", "Be wary of ****", "Try ****", "Likely ****", "First off\, ****", "Seek ****", "Still no ****...", "Why is it always ****?", "If only I had a ****...", "Didn't expect ****...", "Visions of ****...", "Could this be a ****?", "Time for ****", "****\, O ****", "Behold\, ****!", "Offer ****", "Praise the ****!", "Let there be ****", "Ahh\, ****...", "****", "****!", "****?", "****..."],
    "Enemies": ["enemy", "weak foe", "strong foe", "monster", "dragon", "boss", "sentry", "group", "pack", "decoy", "undead", "soldier", "knight", "cavalier", "archer", "sniper", "mage", "ordnance", "monarch", "lord", "demi-human", "outsider", "giant", "horse", "dog", "wolf", "rat", "beast", "bird", "raptor", "snake", "crab", "prawn", "octopus", "bug", "scarab", "slug", "wraith", "skeleton", "monstrosity", "ill-omened creature"],
    "People": ["Tarnished", "warrior", "swordfighter", "knight", "samurai", "sorcerer", "cleric", "sage", "merchant", "teacher", "master", "friend", "lover", "old dear", "old codger", "angel", "fat coinpurse", "pauper", "good sort", "wicked sort", "plump sort", "skinny sort", "lovable sort", "pathetic sort", "strange sort", "nimble sort", "laggardly sort", "invisible sort", "unfathomable sort", "giant sort", "sinner", "thief", "liar", "dastard", "traitor", "pair", "trio", "noble", "aristocrat", "hero", "champion", "monarch", "lord", "god"],
    "Things": ["item", "necessary item", "precious item", "something", "something incredible", "treasure chest", "corpse", "coffin", "trap", "armament", "shield", "bow", "projectile weapon", "armor", "talisman", "skill", "sorcery", "incantation", "map", "material", "flower", "grass", "tree", "fruit", "seed", "mushroom", "tear", "crystal", "butterfly", "bug", "dung", "grace", "door", "key", "ladder", "lever", "lift", "spiritspring", "sending gate", "stone astrolabe", "Birdseye Telescope", "message", "bloodstain", "Erdtree", "Elden Ring"],
    "Battle Tactics": ["close-quarters battle", "ranged battle", "horseback battle", "luring out", "defeating one-by-one", "taking on all at once", "rushing in", "stealth", "mimicry", "confusion", "pursuit", "fleeing", "summoning", "circling around", "jumping off", "dashing through", "brief respite"],
    "Actions": ["attacking", "jump attack", "running attack", "critical hit", "two-handing", "blocking", "parrying", "guard counter", "sorcery", "incantation", "skill", "summoning", "throwing", "healing", "running", "rolling", "backstepping", "jumping", "crouching", "target lock", "item crafting", "gesturing"],
    "Situations": ["morning", "noon", "evening", "night", "clear sky", "overcast", "rain", "storm", "mist", "snow", "patrolling", "procession", "crowd", "surprise attack", "ambush", "pincer attack", "beating to a pulp", "battle", "reinforcements", "ritual", "explosion", "high spot", "defensible spot", "climbable spot", "bright spot", "dark spot", "open area", "cramped area", "hiding place", "sniping spot", "recon spot", "safety", "danger", "gorgeous view", "detour", "hidden path", "secret passage", "shortcut", "dead end", "looking away", "unnoticed", "out of stamina"],
    "Places": ["high road", "checkpoint", "bridge", "castle", "fort", "city", "ruins", "church", "tower", "camp site", "house", "cemetery", "underground tomb", "tunnel", "cave", "evergaol", "great tree", "cellar", "surface", "underground", "forest", "river", "lake", "bog", "mountain", "valley", "cliff", "waterside", "nest", "hole"],
    "Directions": ["east", "west", "south", "north", "ahead", "behind", "left", "right", "center", "up", "down", "edge"],
    "Body Parts": ["head", "stomach", "back", "arms", "legs", "rump", "tail", "core", "fingers"],
    "Affinities": ["physical", "standard", "striking", "slashing", "piercing", "fire", "lightning", "magic", "holy", "poison", "toxic", "scarlet rot", "blood loss", "frost", "sleep", "madness", "death"],
    "Concepts": ["life", "Death", "light", "dark", "stars", "fire", "Order", "chaos", "joy", "wrath", "suffering", "sadness", "comfort", "bliss", "misfortune", "good fortune", "bad luck", "hope", "despair", "victory", "defeat", "research", "faith", "abundance", "rot", "loyalty", "injustice", "secret", "opportunity", "pickle", "clue", "friendship", "love", "bravery", "vigor", "fortitude", "confidence", "distracted", "unguarded", "introspection", "regret", "resignation", "futility", "on the brink", "betrayal", "revenge", "destruction", "recklessness", "calmness", "vigilance", "tranquility", "sound", "tears", "sleep", "depths", "dregs", "fear", "sacrifice", "ruin"],
    "Phrases": ["good luck", "look carefully", "listen carefully", "think carefully", "well done", "I did it!", "I've failed...", "here!", "not here!", "don't you dare!", "do it!", "I can't take this...", "don't think", "so lonely...", "here again...", "just getting started", "stay calm", "keep moving", "turn back", "give up", "don't give up", "help me...", "I don't believe it...", "too high up", "I want to go home...", "it's like a dream...", "seems familiar...", "beautiful...", "you don't have the right", "are you ready?"],
    "Conjunctions": ["and then", "or", "but", "therefore", "in short", "except", "by the way", "so to speak", "all the more", "\,"]
};

// Create buttons based on an array of strings
const createButtons = (strings) => {
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

        // Apply styles to the button
        button.style.backgroundColor = "#472f17"; // Set background color to light blue
        button.style.padding = "10px 20px"; // Add padding to the button
        button.style.margin = "5px"; // Add margin to the button
        button.style.fontFamily = "body";

        buttonContainer.appendChild(button); // Append the button to the buttonContainer
    });
}

// Search wordCategories and create buttons for the matching words
const search = (query) => {
    if (buttonContainer == null) {
        buttonContainer = document.getElementById("buttonContainer"); // Get the button container element by its ID
    }

    if (query == null) {
        console.error("Query is null. You probably meant to call search with an empty string."); // Log an error if the query is null
        return; // Exit the function if the query is null
    }

    query = query.trim().toLowerCase(); // Trim and convert the query to lowercase
    const results = []; // Initialize an array to store search results

    // Function to add words from a category to the results array
    const addWordsFromCategory = (category) => {
        for (const word of wordCategories[category]) {
            results.push(word);
        }
    };

    // If the query is empty, display buttons for all words
    if (query === "") {
        for (const category in wordCategories) {
            addWordsFromCategory(category);
        }
    } else {
        let found = false; // Flag to track if any matching words are found
        for (const category in wordCategories) {
            if (category.toLowerCase().includes(query)) {
                addWordsFromCategory(category);
                found = true;
            }
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

    // console.log("Searching for: \"" + query + "\". Results:");
    // console.log(results);
    createButtons(results);
};

export { search };