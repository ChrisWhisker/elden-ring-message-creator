import Word from "./word";
import Message from "./message";
import wordCategories from "./wordCategories";
import { ButtonRenderer } from "./buttons";

interface WordCategory {
  word: string;
  keywords: string;
}

export default class Filter {
  // Search query
  static query: string = "";
  // Array to store search results
  static results: Word[] = [];
  // Set to track added words
  static addedWords: Set<string> = new Set();

  // Refilter function to be used within the class
  public static refilter(): void {
    Filter.filterWords(Filter.query);
  }

  // Check if a word can be added based on the category
  private static canAddWord(category: string): boolean {
    const instance = Message.getInstance();
    switch (category) {
      case "Templates":
        return !instance.template1 || !instance.template2;
      case "Conjunctions":
        return !instance.conjunction;
      default:
        return !instance.clause1 || !instance.clause2;
    }
  }

  // Add a single word to the specified results array if it is not already present
  private static addWord(category: string, word: WordCategory, targetArray: Word[]): void {
    if (Filter.canAddWord(category)) {
      const wordObj = new Word(category, word.word);
      // Check for duplicates before adding using a Set
      if (!Filter.addedWords.has(word.word)) {
        targetArray.push(wordObj);
        Filter.addedWords.add(word.word);
      }
    }
  }

  // Add all words from a category to the specified results array if they are not already present
  private static addWordsFromCategory(category: string, targetArray: Word[]): void {
    for (const word of wordCategories[category]) {
      Filter.addWord(category, word, targetArray);
    }
  }

  // Filter words based on the query
  static filterWords(newQuery: string | null = null): void {
    // Clear the results array and addedWords set
    Filter.results = [];
    Filter.addedWords.clear();
    // Ensure query is not null and convert to lowercase
    Filter.query = newQuery ? newQuery.trim().toLowerCase() : "";

    // Arrays to store different types of matches
    let directMatches: Word[] = [];
    let categoryMatches: Word[] = [];
    let keywordMatches: Word[] = [];

    // If query is empty, add all words from all categories
    if (!Filter.query) {
      for (const category in wordCategories) {
        Filter.addWordsFromCategory(category, directMatches);
      }
    } else {
      // Split the query into individual words
      const queryWords = Filter.query.split(" ");

      // Search for each query word in all categories
      for (const category in wordCategories) {
        for (const word of wordCategories[category]) {
          // Check if any query word matches the current word
          if (queryWords.some((queryWord) => word.word.toLowerCase().includes(queryWord))) {
            Filter.addWord(category, word, directMatches);
          }
        }
        // Add all words from the category if the category name matches the query
        if (queryWords.some((queryWord) => category.toLowerCase().includes(queryWord))) {
          Filter.addWordsFromCategory(category, categoryMatches);
        }
        // Check if any query word matches any of the word's keywords
        for (const word of wordCategories[category]) {
          if (queryWords.some((queryWord) => word.keywords.toLowerCase().includes(queryWord))) {
            Filter.addWord(category, word, keywordMatches);
          }
        }
      }
    }

    // Combine the results arrays in the desired order
    Filter.results = [...directMatches, ...categoryMatches, ...keywordMatches];

    // Render buttons for the search results
    ButtonRenderer.renderButtons(Filter.results);
  }
}
